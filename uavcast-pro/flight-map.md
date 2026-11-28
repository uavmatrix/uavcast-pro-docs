# Flight Map

> Track your drone live on the UAVcast-Pro Flight Map with a cockpit HUD, video windows, arm/disarm, flight modes, RTL, loiter, GCS failsafe and flight controller messages.

The Flight Map is a browser-based ground station built into UAVcast-Pro. It shows the drone on a map with its trail, the active mission and home position, a cockpit HUD, live video, and the flight controller's messages. You can arm and disarm, change flight mode, start a mission and trigger RTL or loiter, all behind confirmation dialogs. Open **Flight Map → Map view**.

It's meant for monitoring and simple commands from any phone, tablet or laptop. For full mission planning and parameter work, keep using Mission Planner or QGroundControl alongside it.

![Flight Map with the map, the cockpit HUD on the right and the Status tab with link, battery, flight controller, telemetry, GPS and attitude cards](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/flight-map.webp)

*Flight Map → Map view on a bench unit without a GPS fix, so the map shows no drone position.*

## Layout

- **Map** (left): the drone with heading, trail, home marker and mission. **Sats** shows the satellite count; **Auto-Pan** keeps the drone centred. Switch layers with the layer button (**Street Map**, **Satellite** and others). If the drone has no fix you see **No GPS Lock**: *At least 4 satellites required*.
- **Top bar**: the **Recording** buttons (**Telemetry**, **CAM 1**, **CAM 2**), free recording space, the telemetry update rate (**1 Hz** to **10 Hz**), the current data rate, and a button that opens the map in its own window.
- **Cockpit** (right): an attitude HUD with speed and altitude tapes, the current flight mode, the arm state, battery voltage and the latest pre-arm message.
- **Side tabs**: **Status**, **Gauge**, **Actions**, **Messages** and **Recordings**. Drag the panel edge to resize it; double-click the handle to reset.
- **Video windows**: one per active camera stream. Drag, maximize, minimize or hide them; hidden windows dock as tabs at the bottom of the map.

The top bar across every page also shows **FC Connected**, **Armed**/**Disarmed**, the vehicle type, the flight mode, and **GCS Failsafe Enabled** or **GCS Failsafe Disabled**.

## Arm and disarm

1. Open the **Actions** tab, or use the arm control under the cockpit.
2. Select **Arm**. The dialog warns *The propellers can start spinning. Make sure nobody is near the drone and the area around it is clear.*
3. Confirm with **Arm**.

The flight controller's own pre-arm checks still decide. If it refuses, you see *The drone refused to arm. Check the PreArm message on the screen.* The reason appears under the cockpit and in **Messages**.

**Disarm** stops the motors immediately. The flight controller refuses it while the drone is flying.

## Change flight mode

Pick a mode from the flight mode control. The list matches the vehicle type (Copter, Plane, Rover, Sub) and is grouped into **Safe Modes** (position hold and stabilization), **Navigation** (autonomous modes) and **Advanced** (manual and emergency modes). Modes with a higher risk are marked with a warning icon and ask for confirmation before the command is sent.

## Actions tab

| Group | Buttons | What happens |
| --- | --- | --- |
| **Mission** | **Read**, **Hide**, **Start**, **Clear** | **Read** loads the mission from the flight controller onto the map. **Start** starts it (with confirmation). **Clear** deletes the mission from the flight controller and waits for its confirmation. |
| **Modes** | **Loiter Unl**, **RTL** | Quick mode changes. |
| **Pre Flight** | **Pre Flight Calibration**, **Load Mission**, **Clear Mission** | Calibration runs the flight controller's ground calibration (gyro, baro). Only on the ground. |
| **Emergency Commands** | **Return To Launch**, **Loiter Unlimited** | Behind a confirmation. RTL returns and lands or loiters per the flight controller's settings. Loiter Unlimited circles at the current position. |
| **Failsafe** | **GCS failsafe** switch | Writes `FS_GCS_ENABLE` (Copter) and `FS_GCS_ENABL` (Plane) on the flight controller. |

> **Turn on GCS failsafe for cellular flights**
>
> The GCS failsafe triggers when the flight controller stops receiving MAVLink heartbeats from a ground station. Over 4G/LTE the link can drop at any time. Configure what the failsafe does (`FS_GCS_ENABLE` action, `FS_GCS_TIMEOUT`) in your ground station before you rely on it.

Read-only users see the Actions tab but can't use it (*Read-only users can't control the drone*).

## Messages

**Messages** lists every text message from the flight controller. **Active alerts** shows the current problems (for example pre-arm failures) separately from the **Message log**. Turn on **Problems only** to hide routine messages, and **Clear the log** to start fresh. The tab shows a badge with the number of active alerts.

## Status and Gauge tabs

- **Status**: cards for **LINK** (packet loss, connected), **FLIGHT CONTROLLER** (armed, mode, vehicle), telemetry data rate, position, **GPS** (lock, satellites, **ALTITUDE (AGL)**, **ALTITUDE (AMSL)**) and **BATTERY**.
- **Gauge**: round instruments for the same data.

AGL is the height above the takeoff point; AMSL is above mean sea level.

## Map settings

| Setting | What it does |
| --- | --- |
| **Auto-Pan** | Keeps the drone in the centre of the map. |
| **Show Aircraft Heading** | Draws a heading line from the drone. |
| **Trail Length** | Number of points kept in the flight path trail. |
| **Trail Color** | Colour of the trail. **Clear Trail Path** removes it. |
| **Show Distance from Home** | Shows the distance to the home marker. |
| **Reset to Defaults** | Restores all map settings. |

## Pop-out windows

- **Flight map window**: the button at the right of the top bar opens the map alone in a new window (`/flightmapwindow`), sized for a second monitor.
- **HUD window**: from the cockpit, open the HUD in its own window (`/hud`).

![Cockpit HUD with attitude indicator, speed and altitude tapes, heading and flight mode](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/hud.webp)

*The cockpit HUD at /hud. The horizon is upside down here because this bench unit's flight controller is mounted inverted.*

## Telemetry update rate

The rate selector in the top bar (**1 Hz**, **2 Hz**, **5 Hz**, **10 Hz**) sets how often UAVcast-Pro pushes telemetry to the browser. It doesn't change what your ground stations receive. Use a low rate on a slow connection to the web interface.

## Related

- [Mission Planner tab](https://docs.uavmatrix.com/uavcast-pro/flight-map/mission-planner/)
- [Radio (RC channels)](https://docs.uavmatrix.com/uavcast-pro/flight-map/radio/)
- [MAVLink Inspector](https://docs.uavmatrix.com/uavcast-pro/flight-map/inspector/)
- [Flight Analytics](https://docs.uavmatrix.com/uavcast-pro/flight-map/flight-analytics/)
- [Recordings and flight review](https://docs.uavmatrix.com/uavcast-pro/camera/recordings/)

Source: https://docs.uavmatrix.com/uavcast-pro/flight-map/
