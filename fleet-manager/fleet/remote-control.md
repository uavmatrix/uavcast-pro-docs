# Remote control

> Change flight modes, arm or disarm, run missions and start a preflight calibration from Fleet Manager's UAV control panel, with safety checks.

The **UAV Control Panel** sends commands to the flight controller through UAVcast-Pro over Fleet Manager's encrypted connection. It works over any internet link the drone has, including 4G, and doesn't need the VPN.

Open it with **Operations** on a [Fleet](https://docs.uavmatrix.com/fleet-manager/fleet/) card, or **Controls** in a drone's popup on the [Fleet Map](https://docs.uavmatrix.com/fleet-manager/map/). On the map, the panel also has **Terminal** and **Logs** tabs.

![UAV Control Panel with Flight Mode, Mission and Actions columns for an armed quadcopter](https://docs.uavmatrix.com/img/screenshots/fleet-manager/control-panel.webp)

*UAV Control Panel for an armed quadcopter in LOITER: Flight Mode with the RTL, Circle and Loiter buttons, Mission with an 18-waypoint survey selected, and Actions with Arm and Disarm.*

Only **Owners** and **Admins** can send commands. See [Roles and permissions](https://docs.uavmatrix.com/fleet-manager/team/roles-and-permissions/).

> **Remote commands move real aircraft**
>
> A command from Fleet Manager acts on the aircraft as if a ground station sent it. Keep a pilot with a ground station or RC transmitter in control of every flight, follow your local rules for remote and BVLOS operations, and treat Fleet Manager as a supervision and dispatch tool, not your only link.

## Header

The header shows the drone's status, **ARMED** and **FAILSAFE** flags, a **GCS Failsafe** badge, the map color picker (**Change map color**, with **Reset to auto**) and a **Details** link to the [UAV page](https://docs.uavmatrix.com/fleet-manager/fleet/uav-details/).

If the flight controller's GCS failsafe is off, the panel warns: **GCS Failsafe not enabled. Without GCS failsafe, the vehicle will not return to launch if it loses connection to the ground station.** Set up the failsafe in your ground station software (ArduPilot parameter `FS_GCS_ENABLE`) before flying beyond visual line of sight.

## Flight Mode

Pick a mode from the drop-down, or use the quick buttons **RTL**, **Circle** and **Loiter** (**Hold** on rovers). Every mode change asks for confirmation, and the more dangerous the mode, the stronger the check:

| Confirmation | Modes |
| --- | --- |
| Simple **Change to *MODE*?** | STABILIZE, ALT_HOLD, LOITER, POSHOLD, BRAKE, FLOWHOLD, HOLD, FBWA, FBWB, CRUISE, QHOVER, QLOITER, QSTABILIZE |
| Confirmation with a description of what the mode does | AUTO, GUIDED, RTL, SMART_RTL, CIRCLE, FOLLOW, ZIGZAG, QRTL, TAKEOFF, AVOID_ADSB, ACRO, MANUAL |
| Type the mode name to confirm | LAND, SPORT, AUTOTUNE, FLIP, DRIFT, THROW, QLAND, QACRO, AUTOROTATE |

![Mode change confirmation dialog asking to type LAND to confirm](https://docs.uavmatrix.com/img/screenshots/fleet-manager/control-panel--mode-confirm.webp)

*Confirmation for LAND, a mode that must be typed to confirm.*

The mode lists are ArduPilot's (Copter, Plane, Rover and Sub). On a PX4 flight controller, use your ground station to change modes.

## Mission

Runs [missions](https://docs.uavmatrix.com/fleet-manager/missions/) saved in your organization:

- **Select mission** picks a saved mission. The counter shows the current and total waypoint, for example `3/18`, or **None**.
- **Start** first reads the mission on the drone and compares it with the one you selected. If they differ, **Mission Not Loaded on Drone** offers **Upload & Start**.
- **Stop**, **Read** (fetch the mission from the drone) and **Clear**.

Each action asks you to confirm.

## Actions

- **Arm** and **Disarm**. The arm dialog says **This will arm the UAV. Ensure all personnel are clear of the propellers before arming.** Tick **Force arm (bypass pre-arm checks)** only on the bench: it skips the checks that stop an unsafe takeoff.
- **Select action... → Preflight Calibration** calibrates the gyroscope and levels the accelerometer. Keep the vehicle completely still on a level surface, then select **Start Calibration**.

![Arm confirmation dialog with propeller warning and Force arm checkbox](https://docs.uavmatrix.com/img/screenshots/fleet-manager/control-panel--arm-confirm.webp)

*Arm dialog with the propeller warning and the Force arm (bypass pre-arm checks) box unticked.*

Arm, disarm and preflight calibration need UAVcast-Pro **6.3.0_rc13** or later on the drone. On older versions the panel shows **UAVcast Upgrade Required**. See [Updating](https://docs.uavmatrix.com/get-started/updating/).

## When a command doesn't go through

- The drone must be online. Commands to an offline drone fail.
- Fleet Manager waits for the drone to acknowledge each command. If the flight controller refuses, for example arming with failed pre-arm checks, the error appears in the panel and on the drone's status messages.
- Messages from the flight controller (pre-arm failures, mode changes) show in the drone's popup on the map and in the [Logs](https://docs.uavmatrix.com/fleet-manager/fleet/uav-details/#logs) tab.

For phone-sized screens, see [Lite view](https://docs.uavmatrix.com/fleet-manager/lite-view/).

Source: https://docs.uavmatrix.com/fleet-manager/fleet/remote-control/
