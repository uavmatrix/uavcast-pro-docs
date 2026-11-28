# RTK corrections not arriving

> NTRIP stuck on Connecting, no RTCM forwarded or no RTK Fixed? Check caster host, port, mountpoint, credentials, GGA upstream and the GPS receiver.

Under **Flight Controller → NTRIP / RTK** the status does not reach **Streaming corrections**, **RTCM messages forwarded** stays at zero, or corrections flow but the flight controller never gets past **3D fix** or **RTK Float**.

The chain has four links: internet → caster → UAVcast-Pro → flight controller → GPS receiver. Find the first one that breaks.

![NTRIP / RTK tab with the status panel, counters and caster response line, and the GPS quality card](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/flight-controller--ntrip.webp)

*Flight Controller → NTRIP / RTK on a unit without a caster configured: status Disabled, counters at zero and Caster response empty. Healthy is Streaming corrections, a 200 caster response and climbing counters.*

| What you see | Likely cause | Start at |
| --- | --- | --- |
| Status Connecting or Error, no caster response | Wrong host or port, TLS mismatch, or no internet | [Check 1](https://docs.uavmatrix.com/troubleshooting/rtk-corrections-not-arriving/#check-1) |
| Caster response 401 Unauthorized | Wrong username, password or mountpoint | [Check 2](https://docs.uavmatrix.com/troubleshooting/rtk-corrections-not-arriving/#check-2) |
| Log says caster returned sourcetable | The mountpoint name is wrong | [Check 2](https://docs.uavmatrix.com/troubleshooting/rtk-corrections-not-arriving/#check-2) |
| Connected, but no RTCM data, reconnects every few seconds | The caster needs a GGA position first | [Check 3](https://docs.uavmatrix.com/troubleshooting/rtk-corrections-not-arriving/#check-3) |
| RTCM forwarded, fix stays at 3D fix | Flight controller link down, or receiver not RTK-capable | [Check 4](https://docs.uavmatrix.com/troubleshooting/rtk-corrections-not-arriving/#check-4) |
| RTK Float, never RTK Fixed | Sky view, distance to the base, or time | [Check 5](https://docs.uavmatrix.com/troubleshooting/rtk-corrections-not-arriving/#check-5) |

## Check 1: Reach the caster

1. Check **Caster host** and **Port**. Most public casters use plain TCP on port `2101`.
2. **Use TLS (HTTPS)** must match the caster. Commercial casters (Trimble, Hexagon, Topcon and others) often need TLS, usually still on port 2101, sometimes 2102 or 443. Public casters normally don't use TLS.
3. Make sure the drone has internet. **Dashboard → Cellular** should be connected. If not, see [Modem connected, no internet](https://docs.uavmatrix.com/troubleshooting/modem-no-internet/).
4. Some cellular plans block unusual outbound ports. If the caster offers port 443, try it.

## Check 2: Credentials and mountpoint

1. Press **Test connection**. **Caster accepted the credentials.** means username and password are right.
2. For rtk2go.com, use a real e-mail address as **Username** and leave **Password** empty.
3. Press **Browse mountpoints** and pick a mountpoint from the list instead of typing the name. Prefer one close to where you fly.

If the caster answers with its sourcetable instead of data, the NTRIP log says *caster returned sourcetable — check mountpoint*. The mountpoint name is wrong or no longer exists.

## Check 3: Send GGA upstream

VRS and nearest-mountpoint casters only send corrections after they know where you are. The **NMEA** column in the mountpoint browser says **Required** for those mountpoints.

1. Turn on **Send GGA upstream** (on by default). **Send interval (seconds)** defaults to 10.
2. **Position source**: **Live position from flight controller** is right in flight. Until the flight controller reports a GPS fix, UAVcast-Pro uses the **Fixed manual position**, so enter a latitude and longitude near you for bench tests.
3. Watch **Last GGA sent** update.

UAVcast-Pro reconnects by itself when the caster goes quiet, and the log shows *no data from caster for …s — reconnecting*. After a short internet drop, corrections resume within seconds.

## Check 4: From UAVcast-Pro to the receiver

Corrections reach the GPS through the flight controller link, as MAVLink `GPS_RTCM_DATA`.

1. The flight controller must be **Connected** on **Flight Controller → Connection**. If not, see [No MAVLink heartbeat](https://docs.uavmatrix.com/troubleshooting/no-mavlink-heartbeat/).
2. Look at the **GPS quality** card. **No RTK status from receiver** means the flight controller has never reported RTK status. The connected GPS is usually not RTK-capable: RTK needs a carrier-phase RTK receiver such as a u-blox F9P, Here3+ or Septentrio Mosaic. A standard M8N or M10 navigation module won't do RTK.
3. **Recent message types** should include the constellations your receiver uses (for example 1077 GPS, 1087 GLONASS, 1097 Galileo, 1127 BeiDou) and a base position message (1005 or 1006).

## Check 5: Float, but never Fixed

- Give the antenna open sky. Trees, buildings and the drone's own electronics cause multipath and noise.
- Wait. A cold start can take a minute or two even in good conditions.
- Pick a closer base. Accuracy and the chance of a fix drop with distance from the base station.
- **Last correction** in **GPS quality** should stay at a few seconds. If it grows, corrections are being lost on the link.

## Still not working?

[Download the logs](https://docs.uavmatrix.com/troubleshooting/collect-logs/) with **NTRIP Client** selected and send them, with your caster provider and GPS model, to **[support@uavmatrix.com](mailto:support@uavmatrix.com)**. The full setup is in [Set up RTK with an NTRIP caster](https://docs.uavmatrix.com/guides/rtk-ntrip-caster/).

Related: [NTRIP / RTK settings](https://docs.uavmatrix.com/uavcast-pro/flight-controller/ntrip-rtk/)

Source: https://docs.uavmatrix.com/troubleshooting/rtk-corrections-not-arriving/
