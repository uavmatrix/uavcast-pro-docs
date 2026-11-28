# Status indicators and notifications

> What Fleet Manager's offline, no-MAVLink, GPS, failsafe and battery indicators mean, plus system announcements, the status page and alerts.

Fleet Manager shows problems where you are already looking: on the map, on the fleet list and on each drone's page. This page lists every indicator and what to do about it.

## Drone indicators

| Indicator | Where | Meaning | First thing to check |
| --- | --- | --- | --- |
| **OFFLINE**, grey marker with clock badge | Fleet, map, UAV page | Nothing received from UAVcast-Pro for 20 seconds | The drone's internet link and port 8883. See [Drone offline in Fleet Manager](https://docs.uavmatrix.com/troubleshooting/drone-offline-fleet-manager/). |
| **NO MAVLINK**, orange ring with **!** | Map | UAVcast-Pro is online but has had no flight controller data for 10 seconds | Flight controller power and cable. See [No MAVLink heartbeat](https://docs.uavmatrix.com/troubleshooting/no-mavlink-heartbeat/). |
| Red dashed ring, **NO GPS** | Map | No satellites or no fix | Antenna view of the sky, GPS cable. |
| Yellow dashed ring, **WEAK GPS** | Map | Fewer than 6 satellites or only a 2D fix | Wait for more satellites before flight. |
| Battery in yellow / red | Fleet cards | Below 50 % / below 20 % | Plan the landing. |
| **ARMED** | UAV page, control panel, map popup | Motors armed | Treat the aircraft as live. |
| **FAILSAFE** | UAV page, control panel | The flight controller is in failsafe | The flight controller's messages, shown in the map popup and **Logs**. |
| **GCS FAILSAFE** / **GCS Failsafe not enabled** | UAV page, control panel | Ground-station failsafe triggered, or not configured | Set `FS_GCS_ENABLE` before BVLOS flights. |
| **Re-pair required** | Fleet, UAV page | The drone uses an old connection certificate | [Re-pair the drone](https://docs.uavmatrix.com/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone). |
| **Signal** poor | Map popup | Round trip to the drone above 600 ms, or three missed pings | Cellular coverage, or a congested link. |

Indicators update live while the page is open. Fleet Manager checks for offline drones every 5 seconds.

![Map close-up with markers showing offline, no MAVLink and weak GPS rings](https://docs.uavmatrix.com/img/screenshots/fleet-manager/map--indicators.webp)

*Close-up of four markers: a healthy drone, one OFFLINE with clock badge, one NO MAVLINK with orange ring, and one WEAK GPS with yellow dashed ring.*

## Activity log

Changes your team makes (pairing, removing drones, stream bindings, invitations, role changes, VPN) are logged under **Recent Activity** on the [Dashboard](https://docs.uavmatrix.com/fleet-manager/dashboard/), with who made them.

## System announcements

When UAVmatrix has planned maintenance or an incident, a banner appears at the top of every page: blue for information, amber for a warning, red for critical. Dismissing it hides it until you open Fleet Manager in a new browser session.

## Status page

**System → Status** (page **System Status**) shows whether Fleet Manager is working normally: **All systems operational**, or **We're experiencing some issues** with the **Active Incidents**. **Past Incidents** lists the last resolved ones with their **Resolution**. Check it first when many drones go offline at once.

![System Status page with All systems operational and a list of past incidents](https://docs.uavmatrix.com/img/screenshots/fleet-manager/status.webp)

*System Status showing All systems operational and two Past Incidents marked Resolved.*

## Email and webhook alerts

Fleet Manager doesn't send email, SMS or webhook alerts for drone events yet (for example low battery or a drone going offline). Keep the map or fleet list open in the control room, and rely on the flight controller's own failsafes for battery and link loss.

Source: https://docs.uavmatrix.com/fleet-manager/alerts-and-status/
