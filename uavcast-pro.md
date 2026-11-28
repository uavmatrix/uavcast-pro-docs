# UAVcast-Pro

> Reference for the UAVcast-Pro web interface: dashboard, flight controller, flight map, ground stations, camera, modem, VPN, Fleet Manager pairing, users and settings.

This section explains every page of the UAVcast-Pro web interface, in the order of the app's sidebar. Each page tells you what the screen is for, how to set it up, and lists every setting with its default. New to UAVcast-Pro? Start with the [Quick start](https://docs.uavmatrix.com/get-started/quick-start/).

## Operations

[DashboardHealth of the flight controller, GPS, links, video and power at a glance.](https://docs.uavmatrix.com/uavcast-pro/dashboard/)[Data StreamsCustom live dashboards for any MAVLink or sensor value.](https://docs.uavmatrix.com/uavcast-pro/data-streams/)[Flight ControllerUSB or UART link with automatic port and baud detection, NTRIP/RTK and injectors.](https://docs.uavmatrix.com/uavcast-pro/flight-controller/)[Flight MapLive map, cockpit HUD, arm/disarm, modes, missions, radio, inspector and log analysis.](https://docs.uavmatrix.com/uavcast-pro/flight-map/)[Ground stations and videoDestinations, plus step-by-step Mission Planner, QGroundControl, GStreamer, Android and VLC setup.](https://docs.uavmatrix.com/uavcast-pro/ground-stations/)

## Connectivity

[ModemHiLink and traditional 4G/LTE modems with automatic APN.](https://docs.uavmatrix.com/uavcast-pro/connectivity/cellular-modem/)[Virtual Private NetworkThe Fleet Manager VPN, or your own Tailscale or ZeroTier network.](https://docs.uavmatrix.com/uavcast-pro/connectivity/vpn/)[Dynamic DNSKeep a hostname pointed at the drone's public IP.](https://docs.uavmatrix.com/uavcast-pro/connectivity/dynamic-dns/)[NetworksInterfaces and Wi-Fi vs modem priority.](https://docs.uavmatrix.com/uavcast-pro/connectivity/networks/)

## Media

[Camera settingsCSI and USB cameras, resolution, bitrate, low-latency H.264 over UDP.](https://docs.uavmatrix.com/uavcast-pro/camera/)[Two camerasRC channel switching or dual stream.](https://docs.uavmatrix.com/uavcast-pro/camera/multi-camera/)[AudioMicrophone audio in the preview and to ground stations.](https://docs.uavmatrix.com/uavcast-pro/camera/audio/)[RecordingsOn-drone video and telemetry recording with flight review.](https://docs.uavmatrix.com/uavcast-pro/camera/recordings/)

## Management

[Fleet ManagementPair the drone with UAVmatrix Fleet Manager.](https://docs.uavmatrix.com/uavcast-pro/fleet-pairing/)[UsersAdmin login and read-only users.](https://docs.uavmatrix.com/uavcast-pro/users/)[ApplicationPort, language, logs for support, database backup and restore.](https://docs.uavmatrix.com/uavcast-pro/application-settings/)

## Ports at a glance

| Port | Direction | Used for |
| --- | --- | --- |
| TCP 80 | Browser → drone | Web interface (configurable) and HTTP injectors |
| UDP 14550 | Drone → ground station | MAVLink telemetry (per destination, configurable) |
| UDP 5600 | Drone → ground station | Video, camera 1 (per destination, configurable) |
| UDP 5601 | Drone → ground station | Video, camera 2 with dual stream (Video Port + 1 by default) |
| UDP 5602 | Drone → ground station | Audio (Video Port + 2) |
| TCP 8889, UDP 8189 | Browser → drone | Live preview (WebRTC signalling and media) |
| TCP 8883 | Drone → Fleet Manager | Fleet Manager connection (MQTT over TLS) |
| TCP 2101 | Drone → NTRIP caster | RTK corrections (caster's port) |
| UDP 14600 | Sensor → drone | UDP injector (default, configurable) |

Source: https://docs.uavmatrix.com/uavcast-pro/
