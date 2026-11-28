# Fleet Manager docs screenshots

Seeded, local-only Fleet Manager run plus a manifest-driven Playwright capture. It produces the
`fleet-manager/*` images in `website/static/img/screenshots/fleet-manager/` (WebP, light and `.dark`)
and their `manifest.json`.

Nothing here talks to production. The app runs as a dev server against throwaway local containers
(TimescaleDB, Redis, Mosquitto) and local stubs (Headscale API, Store license tables). Email/SMTP,
Stripe, PostHog, OpenSky, OpenAIP and the Anthropic API are all disabled through `fm.env`.

## Re-run everything (one command)

```bash
cd website/scripts/screenshots/fleet-manager
FM_DIR=/home/sinamics/core/uavmatrix-fleet-manager ./run.sh
```

`FM_DIR` is a checkout of the `uavmatrix-fleet-manager` app with `npm install` done
(if npm 10 crashes with an arborist `edgesOut` error, use `npx npm@11 install`).
`run.sh` then:

1. starts `fm-docs-shots-db` (TimescaleDB, port 55433), `fm-docs-shots-redis` (16390) and
   `fm-docs-shots-mqtt` (Mosquitto, 18831), all bound to 127.0.0.1,
2. runs the app's Prisma migrations and `seed.ts`,
3. starts `mock-headscale.mjs` (18085), the Fleet Manager dev server (`start-app.mjs`, 3107) and
   `simulate.ts` (the live UAV fleet over MQTT),
4. runs `capture.ts`, then stops everything and removes the containers.

Options: pass capture flags through (`./run.sh --only=map,team --light`), keep the stack up with
`KEEP=1 ./run.sh`, and stop it later with `./run.sh --down`. With the stack up you can re-run
`npx tsx capture.ts --only=<id-substring>` on its own.

## What the seed creates

`seed.ts` writes through the app's own generated Prisma client, so the UI renders real rows.
The dataset is defined in `lib/fleet-data.ts` (shared with the simulator) and is fictional,
all e-mail addresses use `example.com`:

- **Nordwind Aerial Services** (VPN enabled) and an empty **Nordwind R&D Sandbox** org.
- 46 UAVs in three regions: Port of Rotterdam (16), Norway coast (Bergen, Mongstad, Ålesund: 16)
  and the Permian Basin, Texas (14). Raspberry Pi 5/4 and Jetson Orin companions, quad/hexa/VTOL/fixed-wing.
  21 flying (armed, live telemetry on survey grids, orbits, corridors), 12 on the ground, 13 offline or
  in maintenance, one with weak GPS and one with no MAVLink for the marker-state shot.
- 13 members (Owner, 4 Admins, 8 Viewers), 2 pending invitations (one with a real encrypted token for
  the invite page), a UAVmatrix staff super-admin, and a brand-new user with no organization.
- 6 ground stations, 24 stream bindings with incrementing ports (5600/14550, 5601/14551, ...).
- ~300 past flights as 1 Hz telemetry over the last two weeks (~300k rows) and ~40 saved flights,
  7 missions with waypoints, 140 commands, alerts, an activity timeline, 4 support tickets,
  2 resolved status incidents.
- Extra license e-mails on the Owner, a local Store stand-in (database `store`) with licenses, and
  three pairing codes: valid, expired, and a license owned by someone outside the org.

## Files

| File | Purpose |
|---|---|
| `run.sh` | One-command orchestration (containers, migrate, seed, services, capture, teardown) |
| `fm.env` | Local-only environment for the app and scripts |
| `seed.ts` | Resets and seeds the local DB (+ Store stand-in, Better Auth sessions for the capture) |
| `simulate.ts` | Publishes UAVcast heartbeats/telemetry to the local broker, answers commands, terminal |
| `mock-headscale.mjs` | Minimal Headscale v0.23 API stub serving the seeded VPN nodes |
| `start-app.mjs` | Runs `next dev` for `FM_DIR` with `fm.env` |
| `capture.ts` | Runs the manifest, writes raw PNGs to `raw/` and WebP + `manifest.json` to `static/` |
| `lib/shots.ts` | The screenshot manifest (ids, routes, interactions, crops) |
| `lib/fleet-data.ts` | Sites, drones and deterministic flight paths shared by seed and simulator |
| `probe.ts`, `contact-sheet.ts` | Dev helpers to eyeball routes and review raw captures |

## Capture standard

1440×900 viewport at deviceScaleFactor 2 (phone shots 390×844), light theme plus `.dark` variant,
no cursor, toasts hidden (except the two pairing-error shots), map tiles fully loaded. WebP via sharp,
quality 88 (82 for map-tile shots), effort 6. Raw PNGs stay in `raw/` (git-ignored).

## Known gaps

- `map--airspace` needs a real OpenAIP API key, so it is not captured.
- There is no separate sign-in screen: `/sign-in` redirects straight to the UAVmatrix Store OAuth page.
- The Logs tab shows raw telemetry/heartbeat JSON (that is what the app streams), not MAVLink message names.
