# Lite view

> Lite view is Fleet Manager's phone-sized control screen: fleet list, live battery, GPS and altitude, flight modes and mission start, pause and RTL.

**Lite Control** is a phone-friendly version of Fleet Manager for use in the field: big buttons, the essentials only, and live updates over your phone's mobile data.

## Open Lite view

On your phone, sign in to Fleet Manager, open the menu and select **Fleet → Lite View**. You can also go straight to `https://fleet-manager.uavmatrix.com/lite`. Add it to your home screen for one-tap access.

## Fleet list

The list shows every drone with its status and battery (orange below 40 %, red below 20 %), a **Live updates active** indicator and the count **n online / n total**. Tap a drone to open its control screen.

![Lite view fleet list on a phone with several drones, status and battery](https://docs.uavmatrix.com/img/screenshots/fleet-manager/lite.webp)

*Lite view on a 390 × 844 phone: Fleet list with 33 online / 46 total, flight mode and battery per drone.*

## Drone screen

- Banners for **Vehicle Armed** and **Failsafe Active**.
- Cards for **Battery**, **GPS**, **Altitude** and **Speed**.
- **Device ID**, **Organization**, **Position** and **View Full Details** (opens the full UAV page).

![Lite view drone screen with armed banner, status cards and control buttons](https://docs.uavmatrix.com/img/screenshots/fleet-manager/lite--drone.webp)

*Lite view for an armed drone in AUTO: Vehicle Armed banner, Battery, GPS, Altitude and Speed cards, and the mode and mission controls.*

### Safety status

Lite view shows **ARMED** (*Motors active - exercise caution*) or **DISARMED** (*Safe to approach*), but has no arm or disarm button: **For safety, arm/disarm should be performed via your Ground Control Station (QGC, Mission Planner).**

### Flight Mode (Owner and Admin)

**Quick Access** shows the modes you use most for the vehicle type, **All Modes** the full list. Safe modes switch after a simple confirmation; navigation and dangerous modes ask **Change to *MODE*?** with a stronger check, as in the [control panel](https://docs.uavmatrix.com/fleet-manager/fleet/remote-control/#flight-mode).

### Mission Control (Owner and Admin)

For a mission already on the drone:

- **Start** / **Resume**, **Pause**, **RTL** and **Stop**, each with a confirmation. Rovers use HOLD instead of LOITER to pause and stop.
- **Jump to Waypoint**: pick the number with − and +, then **Jump to WP n**. **Currently at waypoint n** shows progress.
- **Refresh Mission Data** reloads the mission from the drone.

If the drone has no mission, you see **No Mission Loaded**. Upload one from [Missions](https://docs.uavmatrix.com/fleet-manager/missions/) on a computer first.

Source: https://docs.uavmatrix.com/fleet-manager/lite-view/
