# What is UAVcast-Pro?

> UAVcast-Pro turns a Raspberry Pi or Linux companion computer into a 4G/LTE link for MAVLink telemetry and H.264 video. See how it works with Fleet Manager.

UAVcast-Pro is software for a companion computer on your drone, usually a Raspberry Pi. It reads MAVLink from any MAVLink flight controller (ArduPilot or PX4), streams H.264 video from one or two cameras, and sends both to your ground control station over Wi-Fi, Ethernet or a 4G/LTE modem. You set it up and monitor it from a web interface that runs on the drone.

UAVmatrix Fleet Manager is the cloud dashboard that goes with it. Pair a drone running UAVcast-Pro with Fleet Manager and you can see the whole fleet on one map, open a remote terminal, plan missions and route video and telemetry to ground stations without port forwarding. Fleet Manager is included with every UAVcast-Pro license.

## How the pieces connect

```text
 Flight controller ──USB/UART──►  Companion computer running UAVcast-Pro
 (ArduPilot, PX4)                  │  MAVLink router, camera server, modem,
 Camera(s) ──CSI/USB────────────►  │  VPN, NTRIP client, recorder, web UI
                                   │
                                   ├── UDP 14550 (telemetry) ─┐
                                   ├── UDP 5600  (video)    ──┼─► Mission Planner / QGroundControl
                                   │                          │   over LAN, VPN or 4G
                                   └── MQTT/TLS 8883 ─────────┴─► Fleet Manager (optional)
```

- **On the drone**: UAVcast-Pro owns the flight controller's serial port and forwards MAVLink to every ground station you add. The camera server encodes H.264 and sends RTP over UDP to the same ground stations. Nothing listens for incoming telemetry connections unless you add it.
- **Between drone and ground**: on a local network the ground station's own IP is enough. Over 4G the drone has no public address, so you put both ends on a VPN. The [Fleet Manager VPN](https://docs.uavmatrix.com/uavcast-pro/connectivity/vpn/), included with every license, does this for you; UAVcast-Pro can also join your own Tailscale or ZeroTier network.
- **In the cloud**: when paired, the drone keeps an outbound, certificate-authenticated MQTT connection to Fleet Manager. See [Pair a drone with Fleet Manager](https://docs.uavmatrix.com/uavcast-pro/fleet-pairing/).

## What you can do with it

| Area | What it does | Page |
| --- | --- | --- |
| Telemetry | Auto-detects the flight controller port and baud rate, routes MAVLink to any number of ground stations, optional read-only destinations | [Flight controller](https://docs.uavmatrix.com/uavcast-pro/flight-controller/), [Ground control stations](https://docs.uavmatrix.com/uavcast-pro/ground-stations/) |
| Video | Raspberry Pi CSI and USB cameras, two cameras with RC switching or dual stream, audio, custom GStreamer pipelines | [Camera & video](https://docs.uavmatrix.com/uavcast-pro/camera/) |
| Recording | Records each flight's video and telemetry on the drone, with a flight review player | [Recordings](https://docs.uavmatrix.com/uavcast-pro/camera/recordings/) |
| Flight map | Live map, cockpit HUD, arm/disarm, RTL and loiter, mission planner, MAVLink inspector, log analysis | [Flight map](https://docs.uavmatrix.com/uavcast-pro/flight-map/) |
| Connectivity | 4G/LTE modems with automatic APN, the Fleet Manager VPN or your own Tailscale or ZeroTier network, dynamic DNS, Wi-Fi vs modem priority | [Connectivity](https://docs.uavmatrix.com/uavcast-pro/connectivity/) |
| RTK | NTRIP client that sends RTCM3 corrections to the flight controller | [NTRIP / RTK](https://docs.uavmatrix.com/uavcast-pro/flight-controller/ntrip-rtk/) |
| Custom data | Bridge sensors and scripts into MAVLink and chart them | [Injectors](https://docs.uavmatrix.com/uavcast-pro/flight-controller/injectors/), [Data Streams](https://docs.uavmatrix.com/uavcast-pro/data-streams/) |

## What you need

- A 64-bit Linux companion computer (arm64 or amd64). Raspberry Pi 3, 4, 5 and Zero 2 W are the common choice; x86 mini PCs work too, and NVIDIA Jetson, Orange Pi and other arm64 boards from UAVcast-Pro 6.5.3. See [Hardware requirements](https://docs.uavmatrix.com/get-started/hardware-requirements/).
- A MAVLink flight controller: ArduPilot or PX4. Flight-mode buttons follow ArduPilot's mode names.
- A UAVcast-Pro license from the [UAVmatrix store](https://uavmatrix.com/products/). See [Licensing & activation](https://docs.uavmatrix.com/get-started/license-activation/).
- For flights beyond Wi-Fi range: a 4G/LTE modem and a data SIM.

## Next steps

[Quick startFrom a fresh Raspberry Pi to telemetry and video in Mission Planner or QGroundControl.](https://docs.uavmatrix.com/get-started/quick-start/)[Install UAVcast-ProOne command on Raspberry Pi OS, Debian or Ubuntu (arm64 and amd64).](https://docs.uavmatrix.com/get-started/installation/)[Activate your licenseActivate on a device, check device slots and move the license to new hardware.](https://docs.uavmatrix.com/get-started/license-activation/)

Source: https://docs.uavmatrix.com/get-started/overview/
