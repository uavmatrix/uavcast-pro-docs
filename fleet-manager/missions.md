# Missions

> Draw waypoint missions on the map, choose MAVLink commands and altitude frames, save missions for the whole organization and upload them to any online drone.

**Missions** (sidebar **Fleet Management → Missions**) is a waypoint planner in the browser. Missions are saved for the organization, so anyone on the team can load one, and an Owner or Admin can upload it to any online drone.

![Mission Planner with a waypoint survey pattern drawn on a satellite map](https://docs.uavmatrix.com/img/screenshots/fleet-manager/missions.webp)

*Mission Planner on the Satellite style with an 18-waypoint survey grid, Takeoff and Return to Launch, and the header showing 18 waypoints and total distance.*

Viewers can open and look at saved missions. Saving, uploading and deleting need Owner or Admin.

## Plan a mission

1. Select **Create New** (or **Missions → New Mission**).
2. Click on the map to add waypoints. Drag a waypoint to move it. While placing, **Next WP** shows the distance from the previous waypoint (**Prev:**) and from home (**Home:**).
3. Open the waypoint drawer (**n Waypoints**) to edit each row: **Command**, **Params**, **Alt**, **Frame** and **Radius**. Drag rows to reorder. Row **H** is home.
4. Set **Defaults:** for new waypoints at the top of the drawer: **Alt** (default 50 m) and **WP Radius** (default 30 m).

![Waypoint drawer with columns for command, params, coordinates, altitude, frame, radius and distance](https://docs.uavmatrix.com/img/screenshots/fleet-manager/missions--waypoint-drawer.webp)

*Waypoint drawer with a Takeoff, several Waypoint rows, a Change Speed and a Return to Launch, Frame set to Relative.*

### Altitude frames

| Frame | Altitude is measured from |
| --- | --- |
| **Relative** (default) | The home position |
| **Absolute** | Mean sea level |
| **Terrain** | The ground below the waypoint (needs terrain data on the flight controller) |

### Commands

The **Command** picker is searchable and lists the MAVLink mission commands ArduPilot understands, grouped as:

- **Navigation:** Waypoint, Takeoff, Land, Return to Launch, Loiter Unlim, Loiter Turns, Loiter Time, Loiter to Alt, Spline Waypoint, Vtol Takeoff, Vtol Land, Payload Place, Delay and more.
- **Conditions:** Delay, Change Alt, Distance, Yaw.
- **Do commands:** Change Speed, Set ROI Location, Set Servo, Set Relay, Jump, Digicam Control, Set Cam Trigg Dist, Mount Control, Gripper, Parachute, VTOL Transition and others.

Commands that take parameters (for example delay time, loiter turns, speed or servo PWM) get editable fields in **Params**.

Limits: altitude 0 to 10,000 m, radius 1 to 1,000 m, at least one waypoint.

## Save

Select **Save**, enter a **Name** (up to 100 characters) and an optional **Description**, and confirm **Save Mission**. The header shows **Unsaved** while there are changes; **Update Mission** saves them. Open saved missions from **Missions → Saved Missions**.

## Upload to a drone

1. Save the mission. An unsaved mission can't be uploaded (**Mission not saved**).
2. Select **Upload to Drone**, choose the UAV under **Select UAV** and confirm.
3. Wait for the confirmation. The upload times out after 30 seconds if the drone doesn't answer.

![Upload Mission to Drone dialog with a list of online UAVs](https://docs.uavmatrix.com/img/screenshots/fleet-manager/missions--upload.webp)

*Upload Mission to Drone dialog with the online UAVs to choose from.*

To fly it, select the mission in the drone's [control panel](https://docs.uavmatrix.com/fleet-manager/fleet/remote-control/#mission) and select **Start**. If the mission on the drone differs from the one you selected, the panel offers **Upload & Start**.

## Read a mission from a drone

Under **Missions → Read from Drone**, choose an online drone. Its current mission loads into the planner as **Mission from *name***. Save it to keep a copy, for example before you overwrite it.

> **Check the mission in your ground station before flight**
>
> Fleet Manager uploads exactly what you planned. Before an automatic flight, check the mission and the vehicle's failsafes in QGroundControl or Mission Planner, as you would with any other planning tool.

Source: https://docs.uavmatrix.com/fleet-manager/missions/
