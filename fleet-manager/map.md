# Live map

> Track every drone in your fleet on one live map with status rings, heading lines, 5-minute trails, follow mode and OpenAIP airspace layers.

**Fleet Map** (sidebar **Overview → Fleet Map**) shows every drone in the selected organization on one map, updated live as telemetry arrives. It is built for a control room: leave it open and you see at a glance which aircraft are up, where they are heading and which ones need attention.

![Fleet map with many colored drone markers, heading lines and flight trails over a region](https://docs.uavmatrix.com/img/screenshots/fleet-manager/map.webp)

*Fleet Map on the Dark style over the Port of Rotterdam: each drone in its own color with heading line and trail, and grey offline markers labelled with how long ago they were seen.*

## Reading a marker

Each drone is drawn in its own color, with an icon for its vehicle type: quadcopter, hexacopter, plane, VTOL, rover, boat or submarine. Rings and badges around the marker flag problems:

| On the marker | Meaning |
| --- | --- |
| Drone's own color, no ring | Online and healthy. |
| Grey marker, grey dashed ring and clock badge | **Offline**: nothing received for 20 seconds. |
| Orange ring with **!** badge | **NO MAVLINK**: UAVcast-Pro is online but has had no telemetry from the flight controller for 10 seconds. Check the flight controller connection. |
| Red dashed ring | **GPS lost**: no satellites or no fix. |
| Yellow dashed ring | **GPS weak**: fewer than 6 satellites or only a 2D fix. |
| **H** marker | The drone's home position, set when it arms. Hover to see its altitude (AMSL). |

Armed or disarmed isn't shown by the marker itself. Open the popup, or use the [control panel](https://docs.uavmatrix.com/fleet-manager/fleet/remote-control/), to see **Armed**.

The label next to the marker reads `Name • FLIGHTMODE`, with **NO MAVLINK**, **NO GPS** or **WEAK GPS** added when they apply, or `Name • OFFLINE • 5 mins ago` for an offline drone.

### Heading line and trail

- The **heading line** is a dashed line in the drone's color pointing where the nose points. It is hidden when the drone is offline.
- The **flight trail** shows the last **5 minutes** of the path, as a dashed line in the drone's color (grey when offline). A new point is added about every 11 m of movement.

## Drone popup

Select a marker to open its popup: name, organization and status, then **Battery**, **Altitude**, **Mode**, **Armed**, **GPS** (satellites and fix type: No Fix, 2D, 3D, DGPS or RTK), **Signal** and, when offline, **Last seen**. The latest status message from the flight controller appears too, which is often the fastest way to read a pre-arm failure.

**Signal** is the round-trip time between Fleet Manager and the drone, measured every 10 seconds: excellent under 100 ms, good under 300 ms, fair under 600 ms, poor above that or after three missed pings.

![Drone popup on the map with battery, altitude, mode, armed, GPS and signal rows and Follow, History and Controls buttons](https://docs.uavmatrix.com/img/screenshots/fleet-manager/map--popup.webp)

*Popup for an armed survey drone in AUTO: Battery 71%, Altitude 85.5 m, GPS 20 sats (3D), Signal 61 ms (Excellent), with Follow, History and Controls.*

Three buttons:

- **Follow** keeps the drone in view. See below.
- **History** opens [flight history](https://docs.uavmatrix.com/fleet-manager/map/flight-history/) for this drone.
- **Controls** opens the [UAV Control Panel](https://docs.uavmatrix.com/fleet-manager/fleet/remote-control/).

## Follow a drone

Select **Follow** in the popup. The map zooms in (to at least zoom level 14) and centers on the drone, then pans only when the drone gets close to the edge of the screen, so the map doesn't jitter. A **Following *name*** banner appears; select its **X**, or **Unfollow**, to stop. Opening **History** also stops following.

![Map following one drone with the Following banner at the top](https://docs.uavmatrix.com/img/screenshots/fleet-manager/map--follow.webp)

*Follow mode on a fixed-wing mapping a corridor, with the Following banner and the trail behind it.*

## Drones without GPS

Drones that are online but have no position yet are listed in a **drones without GPS** box on the map. Select one to open its control panel. The counter **n drones on map** tells you how many are plotted.

## Map Settings

Select the gear button at the top right to open **Map Settings**. Your choices are saved in this browser.

| Section | Option | Default |
| --- | --- | --- |
| **Overlays** | **Airspace Layers**: restricted airspace, airports, heliports | Off |
| **Drone Filter** | **All Drones**, **Online Only** or **Offline Only** | All Drones |
| **Marker Options** | **Heading Line** | On |
|  | **Marker Tooltip**: name label on markers | On |
|  | **Always Visible**: show the label permanently instead of on hover | On |
|  | **Flight Trail**: recent flight path (last 5 min) | On |
| **Map Style** | **Satellite**, **Light** or **Dark** | Dark |

![Map Settings panel with overlays, drone filter, marker options and map style](https://docs.uavmatrix.com/img/screenshots/fleet-manager/map--settings.webp)

*Map Settings panel with Airspace Layers on, Drone Filter set to Online Only and Map Style Satellite.*

> **For a busy map**
>
> With 20+ drones in one area, switch **Always Visible** off so labels only appear on hover, and use **Online Only** to hide parked aircraft.

## Airspace layers

**Airspace Layers** draws restricted airspace, airports and heliports from OpenAIP on top of the map. The layer appears from zoom level 7 and closer. It is one combined layer; you can't toggle categories separately.

> **Not a substitute for official airspace checks**
>
> The airspace layer is for situational awareness. Check NOTAMs and your national drone map or UTM service before each flight.

Source: https://docs.uavmatrix.com/fleet-manager/map/
