# Fleet Manager

> UAVmatrix Fleet Manager tracks every UAVcast-Pro drone on one live map, with remote control, missions, VPN streaming to ground stations and team roles.

UAVmatrix Fleet Manager is a web app at [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) for running many drones from one place. Every drone that runs UAVcast-Pro can be paired to your organization. After that you see it on a live map, open its terminal, send commands, upload missions and route its video and telemetry to the ground stations your pilots use.

![Fleet Manager dashboard with stats cards, UAV status list and recent activity](https://docs.uavmatrix.com/img/screenshots/fleet-manager/dashboard.webp)

*Dashboard: stats cards, the UAV Status list and Recent Activity from several team members.*

## What you can do with it

[Add your first dronePair a UAVcast-Pro drone with an 8-digit code in about two minutes.](https://docs.uavmatrix.com/fleet-manager/pair-uav/)[Track the fleet liveEvery drone on one map, with status rings, a 5-minute trail and follow mode.](https://docs.uavmatrix.com/fleet-manager/map/)[Control drones remotelyFlight modes, arm and disarm, missions and preflight calibration from the browser.](https://docs.uavmatrix.com/fleet-manager/fleet/remote-control/)[Stream to ground stationsSend video and MAVLink from many drones to QGroundControl or Mission Planner over VPN.](https://docs.uavmatrix.com/fleet-manager/network/stream-bindings/)[Invite your teamOwner, Admin and Viewer roles per organization.](https://docs.uavmatrix.com/fleet-manager/team/)[Plan missionsDraw waypoints, save missions for the organization and upload them to any drone.](https://docs.uavmatrix.com/fleet-manager/missions/)

## How it fits together

Fleet Manager never talks to the flight controller directly. UAVcast-Pro on the drone's companion computer does that, and keeps one encrypted connection to Fleet Manager:

1. **Pairing.** UAVcast-Pro asks Fleet Manager for a pairing code. You type the code into Fleet Manager. Fleet Manager then hands the drone its own client certificate.
2. **Control channel.** The drone connects to Fleet Manager's MQTT broker over TLS on port **8883**, authenticated with that certificate. Telemetry, heartbeats, commands, terminal sessions and remote access to the UAVcast-Pro web interface all travel over this connection. It works through NAT and cellular networks because the drone always connects outward.
3. **Data channel (optional).** Video and MAVLink to a ground station go peer to peer over your organization's private VPN, a WireGuard network run by Fleet Manager. Without VPN, Fleet Manager still shows and controls the drone, but it doesn't route streams.

## Concepts

| Term | What it means in Fleet Manager |
| --- | --- |
| **Organization** | Your company or team. Drones, missions, the VPN network and members belong to one organization. Each user can own one organization and be a member of any number of others. |
| **UAV** | A drone (or rover, boat or other vehicle) running UAVcast-Pro, paired to one organization at a time. Fleet Manager identifies it by a device ID that UAVcast-Pro derives from the companion computer's CPU serial and boot disk, so it keeps its identity across reboots and network changes. |
| **Pairing** | Linking a UAV to an organization with an 8-digit code that UAVcast-Pro shows. The code is valid for 5 minutes. |
| **Ground station (GCS)** | A laptop or PC running QGroundControl, Mission Planner or similar, joined to your organization's VPN so it can receive streams. |
| **Stream binding** | A rule that says "send this UAV's video and telemetry to that ground station". Each binding gets its own UDP ports, so one ground station can receive many drones at once. |
| **Roles** | **Owner**, **Admin** or **Viewer**, set per organization. Viewers can watch; Admins and the Owner can pair, control and configure. See [Roles and permissions](https://docs.uavmatrix.com/fleet-manager/team/roles-and-permissions/). |
| **Licenses and seats** | Every paired UAV needs an active UAVcast-Pro license owned by a member of the organization. Team members don't use up seats. See [Licenses](https://docs.uavmatrix.com/fleet-manager/licenses/). |
| **Status and alerts** | Online, offline, no-MAVLink and GPS warnings on the map and fleet list, plus system announcements. See [Status indicators and notifications](https://docs.uavmatrix.com/fleet-manager/alerts-and-status/). |

## What you need

Fleet Manager is included with your UAVcast-Pro license: no separate subscription, no extra seats.

> Fleet Manager is included with a UAVcast-Pro license. Each drone you pair needs one.
>
> [Buy UAVcast-Pro](https://uavmatrix.com/checkout) · [See plans and pricing](https://uavmatrix.com/products)

- A UAVmatrix account (the same one you use at [uavmatrix.com](https://uavmatrix.com/) to buy licenses).
- At least one companion computer with UAVcast-Pro installed and its license activated. See [Installation](https://docs.uavmatrix.com/get-started/installation/) and [Activate your license](https://docs.uavmatrix.com/get-started/license-activation/).
- Internet on the drone with outbound HTTPS (443) and TCP **8883** open.

## Start here

1. [Set up your organization](https://docs.uavmatrix.com/fleet-manager/set-up-organization/)
2. [Add your first drone](https://docs.uavmatrix.com/fleet-manager/pair-uav/)
3. [Connect a ground station](https://docs.uavmatrix.com/fleet-manager/connect-gcs/)
4. [Invite your team](https://docs.uavmatrix.com/fleet-manager/team/)

Source: https://docs.uavmatrix.com/fleet-manager/
