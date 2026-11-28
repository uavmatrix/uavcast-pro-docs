#!/usr/bin/env bash
# One-command Fleet Manager docs screenshot run, entirely local:
#   throwaway TimescaleDB + Redis + Mosquitto containers -> migrate -> seed ->
#   mock Headscale + Fleet Manager dev server + simulated UAV fleet -> capture -> tear down.
#
#   FM_DIR=/path/to/uavmatrix-fleet-manager ./run.sh [capture args, e.g. --only=map --light]
#   KEEP=1 ./run.sh          # leave the stack running afterwards (stop with ./run.sh --down)
#   ./run.sh --down          # stop everything
set -euo pipefail

# Tear the stack down however the script ends (error, Ctrl+C, kill), unless KEEP is set.
# Registered before anything is created; it only acts once this run has started
# creating resources (STARTED=1), and it keeps the original exit status.
STARTED=0
CLEANED=0
cleanup() {
  local rc=$?
  [[ -n "${1:-}" ]] && rc=$1
  trap - EXIT INT TERM
  if [[ $CLEANED -eq 0 && $STARTED -eq 1 ]]; then
    CLEANED=1
    if [[ -z "${KEEP:-}" ]]; then down; else echo "KEEP set: stack left running (stop with ./run.sh --down)"; fi
  fi
  exit "$rc"
}
trap cleanup EXIT
trap 'cleanup 130' INT
trap 'cleanup 143' TERM

cd "$(dirname "$0")"
HERE="$PWD"
export FM_DIR="${FM_DIR:-/home/sinamics/core/uavmatrix-fleet-manager}"
LOGS="$HERE/.logs"; mkdir -p "$LOGS" "$HERE/.state"
DB=fm-docs-shots-db; REDIS=fm-docs-shots-redis; MQTT=fm-docs-shots-mqtt
PIDS="$HERE/.state/pids"

down() {
  if [[ -f "$PIDS" ]]; then
    # each service runs in its own process group (setsid): kill the whole group
    while read -r pid; do kill -- "-$pid" 2>/dev/null || kill "$pid" 2>/dev/null || true; done < "$PIDS"
    rm -f "$PIDS"
  fi
  docker rm -f "$DB" "$REDIS" "$MQTT" >/dev/null 2>&1 || true
  echo "stack stopped"
}
if [[ "${1:-}" == "--down" ]]; then trap - EXIT INT TERM; down; exit 0; fi

[[ -d "$FM_DIR/node_modules" ]] || { echo "Run 'npm install' in $FM_DIR first (npx npm@11 install if npm 10 crashes)"; exit 1; }
[[ -d node_modules ]] || npm install --no-audit --no-fund

echo "== containers"
STARTED=1
docker inspect "$DB" >/dev/null 2>&1 || docker run -d --name "$DB" -e POSTGRES_USER=fleet -e POSTGRES_PASSWORD=fleet_docs \
  -e POSTGRES_DB=fleet -p 127.0.0.1:55433:5432 timescale/timescaledb:2.17.2-pg16 >/dev/null
docker inspect "$REDIS" >/dev/null 2>&1 || docker run -d --name "$REDIS" -p 127.0.0.1:16390:6379 redis:7-alpine \
  redis-server --requirepass docs_redis >/dev/null
docker inspect "$MQTT" >/dev/null 2>&1 || docker run -d --name "$MQTT" -p 127.0.0.1:18831:1883 \
  -v "$HERE/mosquitto.conf:/mosquitto/config/mosquitto.conf:ro" eclipse-mosquitto:2 >/dev/null
until docker exec "$DB" pg_isready -U fleet -q; do sleep 1; done
sleep 2

echo "== migrate + seed"
node lib/prisma.mjs migrate deploy >"$LOGS/migrate.log" 2>&1
node_modules/.bin/tsx seed.ts

echo "== services"
: > "$PIDS"
setsid node mock-headscale.mjs >"$LOGS/headscale.log" 2>&1 & echo $! >> "$PIDS"
setsid node start-app.mjs >"$LOGS/next.log" 2>&1 & echo $! >> "$PIDS"
for i in $(seq 1 120); do curl -sf -o /dev/null http://127.0.0.1:3107/api/health && break; sleep 1; done
curl -s -o /dev/null --max-time 180 http://127.0.0.1:3107/sign-in || true   # warm up compilation
setsid node_modules/.bin/tsx simulate.ts >"$LOGS/sim.log" 2>&1 & echo $! >> "$PIDS"
sleep 8

echo "== capture"
set +e
node_modules/.bin/tsx capture.ts "$@"
status=$?
set -e

exit $status   # the EXIT trap tears the stack down (unless KEEP is set)
