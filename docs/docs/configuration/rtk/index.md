---
slug: /configuration-rtk
title: NTRIP / RTK Corrections
authors: Bernt Christian Egeland
tags: []
---

# NTRIP / RTK Corrections

UAVcast-Pro can stream RTCM3 corrections from an NTRIP caster over the cellular link directly to the flight controller, giving you centimeter-grade RTK positioning without needing a dedicated base station on site. Works with any standard NTRIP v1 or v2 caster.

Find the page under **Flight Controller → NTRIP / RTK**.

## How it works

```
NTRIP Caster (Internet)
      │  RTCM3 over TCP / TLS
      ▼
UAVcast-Pro (Raspberry Pi over LTE / WiFi)
      │  MAVLink GPS_RTCM_DATA, fragmented
      ▼
Flight Controller (ArduPilot / PX4)
      │  Applied to onboard GNSS receiver
      ▼
Centimeter-accurate position fix
```

UAVcast connects to the caster, requests a mountpoint, receives RTCM3 frames, repackages them as MAVLink `GPS_RTCM_DATA` (fragmenting when needed), and forwards them to the flight controller. ArduPilot or PX4 hands the bytes straight to the GNSS receiver, which uses them to compute an RTK Float or RTK Fixed solution.

## What you need

- A **GNSS receiver capable of RTK** on the aircraft (u-blox F9P, ZED-F9P, Septentrio, etc.) connected to the flight controller in the normal way.
- An **NTRIP caster** account. Options:
  - **rtk2go.com** &mdash; free, community-run, requires a real email address as the username (no password).
  - **National / regional networks** &mdash; many countries have public networks (CORS in the US, SWEPOS in Sweden, etc.).
  - **Commercial services** &mdash; Trimble VRS Now, Hexagon SmartNet, Topcon TopNET, etc. usually require TLS.
- A **cellular link** (LTE modem) or local Internet from the Pi.

## Configuration

### Caster

This is the address of the NTRIP server providing RTCM corrections.

- **Caster host** &mdash; the hostname (e.g. `rtk2go.com`, `ntrip.example.com`).
- **Port** &mdash; the TCP port. Almost always `2101` for plain casters; commercial TLS casters sometimes use `2102` or `443`.
- **Mountpoint** &mdash; the named stream you want to subscribe to. Use **Browse mountpoints** to fetch the caster's sourcetable and pick from the list.
- **Use TLS (HTTPS)** &mdash; enable for commercial casters that require encrypted transport. Most public casters use plain TCP and TLS should be off.

:::tip Picking a mountpoint
The mountpoint determines the message types and the base station location. For a fixed nearby base, pick the one closest to your operating area. For a VRS or nearest-mount caster, the choice is usually a generic mountpoint that requires an NMEA GGA position upstream &mdash; see the GGA section below.
:::

### Authentication

Most commercial casters require a username and password. Leave empty for fully anonymous casters.

- **Username** &mdash; provided by the caster operator.
- **Password** &mdash; provided by the caster operator.
- **Test connection** &mdash; runs a one-shot authentication probe and reports whether the caster accepts the credentials, without keeping the stream open.

:::info rtk2go.com
rtk2go.com requires a real email address (any valid format) as the username and **no password**. Leave the password field blank.
:::

### Mountpoint browser

The **Browse mountpoints** button fetches the caster's sourcetable (a list of every stream the caster advertises) and presents it in a searchable dialog. Each entry shows:

- Mountpoint name
- Identifier / location
- RTCM message types carried
- Approximate base station coordinates
- Network and country

Selecting a row populates the mountpoint field. This is the fastest way to find the geographically closest base.

### GGA upstream (VRS / nearest-mount)

Some casters (VRS and "nearest-mountpoint" services) require an NMEA `$GPGGA` position to be sent **upstream** so they can generate corrections for your location.

- **Send GGA upstream** &mdash; enable when the caster requires it. Most fixed-base casters do not.
- **Send interval (seconds)** &mdash; how often to send the position. 5–10 seconds is typical.
- **Position source:**
  - **Live position from flight controller** &mdash; uses the autopilot's current GPS reading. This is the normal mode in flight.
  - **Fixed manual position** &mdash; uses the latitude / longitude / altitude you enter. Useful for bench testing or as a fallback when the flight controller has not yet reported a GPS fix.

If GGA is enabled but the flight controller has no GPS yet, UAVcast falls back to the manual position so the caster does not drop the connection.

## Status panel

Once connected, the status panel shows live counters:

- **Status** &mdash; Disabled / Disconnected / Connecting / Streaming corrections / Error
- **Total received** &mdash; cumulative bytes pulled from the caster
- **Throughput** &mdash; bytes per minute, useful for confirming the stream is actually flowing
- **Last RTCM frame** &mdash; "just now", "5s ago", "2m ago"; if this climbs, the caster has gone quiet
- **RTCM messages forwarded** &mdash; total frames fragmented and pushed to the flight controller
- **Recent message types** &mdash; e.g. `1005, 1077, 1087, 1097`, useful for diagnosing whether you are receiving a full constellation
- **Caster response** &mdash; the HTTP-style response line from the caster (`ICY 200 OK`, `SOURCETABLE 200 OK`, error codes)
- **Flight controller RTK fix** &mdash; pulled from the autopilot's `GPS_RAW_INT` / `GPS2_RAW`: No GPS / 3D fix / RTK Float / RTK Fixed

When the chain is healthy, you should see:

1. Caster response `ICY 200 OK`
2. RTCM messages forwarded climbing steadily
3. Last RTCM frame "just now"
4. Flight controller RTK fix progressing from 3D → RTK Float → RTK Fixed within 30–60 s of good sky

## Common configurations

### Public community caster (rtk2go.com)

```
Caster host:  rtk2go.com
Port:         2101
Mountpoint:   <pick the nearest one from the sourcetable>
TLS:          off
Username:     you@example.com
Password:     (blank)
GGA upstream: off (most rtk2go mountpoints are single-base)
```

### Commercial VRS caster (Trimble VRS Now, Hexagon SmartNet, etc.)

```
Caster host:  <provider hostname>
Port:         2101 (sometimes 2102 / 443 for TLS)
Mountpoint:   <provider VRS mountpoint>
TLS:          on (check with provider)
Username:     <provider username>
Password:     <provider password>
GGA upstream: on, interval 5–10 s, source = live FC position
```

### Local single-base caster

```
Caster host:  <your base station IP / hostname>
Port:         2101
Mountpoint:   <as advertised by your base>
TLS:          off
Username:     (whatever the base requires; often blank)
Password:     (whatever the base requires; often blank)
GGA upstream: off
```

## Troubleshooting

### Status stuck on "Connecting"

- Hostname or port wrong. Confirm with the provider; try `telnet host port` from the Pi to see if the port is reachable.
- Firewall on the LTE side blocking outbound 2101. Try a different port if the provider supports it.

### "Caster response: 401 Unauthorized"

- Username or password wrong, or the wrong mountpoint. Use **Test connection** to verify.
- rtk2go.com requires an email address as username; double-check it is a valid format.

### "Caster response: SOURCETABLE 200 OK"

- The mountpoint name is wrong (the caster returned the sourcetable instead of a stream). Open **Browse mountpoints** and pick a valid one.

### Connected, but RTCM messages forwarded does not climb

- Some VRS casters need GGA upstream before they emit corrections. Enable **Send GGA upstream**.
- The caster may have dropped the stream silently. Watch **Last RTCM frame** &mdash; if it climbs, reconnect.

### Connected, RTCM forwarded, but flight controller never reaches RTK Float

- The GNSS receiver is not RTK-capable (a generic NEO-M8N will not work; you need an F9P or equivalent).
- The receiver is not receiving the MAVLink `GPS_RTCM_DATA` messages &mdash; check the flight controller's serial routing and that UAVcast's MAVLink connection is live.
- The base station is too far away. Most casters give RTK Fixed up to ~30 km from the base; beyond ~50 km Float is the best you get.

### RTK Float but never RTK Fixed

- Open sky helps. Trees, buildings, and multipath suppress the fix.
- Wait longer. Cold starts can take a minute or two even under perfect conditions.
- Check that the receiver is actually outputting at the rate the flight controller expects (5 Hz is typical for ArduPilot, 10 Hz for PX4).

## Related pages

- [Flight Controller](/docs/6.x/configuration-flight-controller) &mdash; configure the MAVLink connection that delivers RTCM to the autopilot
- [Cell Modem](/docs/6.x/configuration-cell-modem) &mdash; the typical Internet link used to reach the caster
- [Data Streams](/docs/6.x/configuration-data-streams) &mdash; chart GPS fix type, satellite count, position accuracy live
