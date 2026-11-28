# Flight history

> Replay a drone's recorded flight on the Fleet Manager map, read duration, max altitude and speed, save named flights and set telemetry retention.

Fleet Manager records each drone's telemetry once per second while it is connected: position, altitude, speed, heading, battery, flight mode, armed state and GPS. **Flight history** replays that recording on the map.

## Open a drone's history

On **Fleet Map**, select the drone's marker and then **History** in the popup. The drawer ***name* - Flight History** opens at the bottom of the map.

![Flight history drawer under the map with a session picker, playback controls, stats and a replayed flight path](https://docs.uavmatrix.com/img/screenshots/fleet-manager/map--history.webp)

*Flight history for an inspection drone: the saved flight Turbine blade inspection selected, playback at 4x, and Duration, Max Alt, Max Speed and Avg Battery.*

## Pick a session

**Select flight session** lists:

1. **Saved flights** first (with a bookmark icon), the ones your team has named.
2. Then one entry per **day** with recorded telemetry, for the last 30 days.

A day groups all telemetry from that date, so several flights on one day appear as one session. Save the stretch you care about as a named flight to find it again quickly.

## Play it back

- Play and pause, step back or forward by 5 % of the session, or jump to the start or end. Drag the timeline to scrub.
- Speeds: **0.5x**, **1x** (real time), **2x**, **4x**, **8x**, **10x** and **20x**.
- Keyboard: **Space** play/pause, **←** / **→** step, **Esc** close.

On the map, a green **Start** and a red **End** marker frame the flight. The part already played is drawn in cyan, the rest dashed in grey, and a drone icon labelled with its altitude moves along the path.

The stats panel shows **Duration**, **Max Alt**, **Max Speed** and **Avg Battery**, and **Current Position** shows **Alt**, **Speed**, **Heading** and **Mode** at the playback point.

## Save, rename and delete flights

Owners and Admins can save, rename and delete named flights. Viewers can play them back.

- **Save and name this flight** saves the current time range under a name (up to 100 characters), for example "Survey over Field A". Two saved flights can't overlap: **A saved session already exists for this time range**.
- **Rename flight** changes the name.
- **Delete saved flight** removes the name only. **Delete Saved Flight?** explains that the telemetry itself is not deleted.

## How long history is kept

Owners and Admins set retention per organization in **Settings → History** (**Telemetry History**):

- **Retention:** 7, 14, 30, 60 or 90 days, **6 months** or **1 year**. The default and the maximum is 1 year.
- **Prune Now** deletes data older than 7, 14, 30, 60 or 90 days right away (default 30), after the **Prune Old History** confirmation.
- **Delete Drone History** (trash icon per drone) or **Select All** → **Delete Selected (n)** clears history for chosen drones.
- Cards show **Storage Used**, **Total Records** and **Retention**.

Fleet Manager removes data past the retention period once a day. Older data is compressed after 7 days, so a year of history for a large fleet stays practical.

![Settings History tab with retention selector, prune options and per-drone history list](https://docs.uavmatrix.com/img/screenshots/fleet-manager/settings--history.webp)

*Settings → History for an organization with 46 drones: Storage Used, Total Records, Retention 90 days, and the per-drone list with Delete buttons.*

> **No log export**
>
> Fleet Manager doesn't export flight history as a file, and it doesn't store video or flight controller logs (`.tlog`, DataFlash). Keep those from your ground station software or the flight controller's SD card. For video recordings on the drone, see [Recordings and flight review](https://docs.uavmatrix.com/guides/recording-flight-review/).

Removing a drone deletes its whole history, saved flights included. See [Remove or transfer a drone](https://docs.uavmatrix.com/fleet-manager/fleet/remove-or-transfer/).

Source: https://docs.uavmatrix.com/fleet-manager/map/flight-history/
