# Frequently asked questions

> Short answers about UAVcast-Pro hardware, LTE modems, ground stations, ports, offline use, licensing, updates, recording and Fleet Manager pairing.

## Hardware and setup

### Do I need an LTE modem?

No. UAVcast-Pro works over any IP connection: 4G/LTE, Wi-Fi or Ethernet. A modem is what lets you fly beyond Wi-Fi range. Many operators test on Wi-Fi and switch to the modem before flight with **Networks → Network Priority → Modem Priority (Outdoor Mode)**.

### Which computers can run UAVcast-Pro?

Any 64-bit Linux board or PC on arm64 or amd64 running Raspberry Pi OS, Debian or Ubuntu: Raspberry Pi Zero 2 W, 3, 4 and 5, NVIDIA Jetson, Orange Pi and x86 mini PCs. A Raspberry Pi 4 or 5 is the comfortable choice for video. See [Supported hardware](https://docs.uavmatrix.com/reference/supported-hardware/).

### Which flight controllers are supported?

Any flight controller that speaks MAVLink over USB or a TELEM port: ArduPilot (Copter, Plane, Rover, VTOL and the other vehicle types) and PX4, on Pixhawk and Cube family boards, Matek and similar. Telemetry, video and routing to ground stations work with any of them. The flight-mode buttons in the Flight Map and in Fleet Manager use ArduPilot's mode names; with PX4, change modes from your ground station.

### Can I connect over the flight controller's USB port?

Yes, and it is the simplest option: plug it in and leave **Port** on **Automatic**. Use a short cable that carries data. See [No MAVLink heartbeat](https://docs.uavmatrix.com/troubleshooting/no-mavlink-heartbeat/) if it isn't found.

## Ground stations and network

### Which ground stations work?

Any software that takes MAVLink over UDP, including QGroundControl, Mission Planner and MAVProxy. Video is H.264 over RTP/UDP, which QGroundControl and Mission Planner play directly. GStreamer and VLC work too: see [Ground stations & video](https://docs.uavmatrix.com/uavcast-pro/ground-stations/).

### Can several ground stations watch at the same time?

Yes. Add one destination per computer under **Ground Control Stations**, each with its own switches for video and telemetry. Use **Read Only** for stations that should only watch. See [Stream to multiple ground stations](https://docs.uavmatrix.com/guides/multiple-ground-stations/).

### Which ports does UAVcast-Pro use?

By default telemetry goes to UDP **14550** and video to UDP **5600** on each ground station; a second camera uses the video port + 1, and audio the video port + 2. The web interface is on port **80**. The full list is in [Ports and protocols](https://docs.uavmatrix.com/reference/ports-and-protocols/).

### Do I need port forwarding on my router?

No. Over 4G, put the drone and the ground station on the same VPN: the Fleet Manager VPN (included with your license), or your own Tailscale or ZeroTier network. The drone sends telemetry and video to the ground station's VPN address. See [Fly beyond visual range over 4G](https://docs.uavmatrix.com/guides/bvlos-4g/).

### Can I still connect over TCP 5760?

No. Since v6.5.0, TCP 5760 is closed so only the ground stations you add get data. Add your computer as a destination and use UDP.

### Does it work without internet?

Yes. The flight controller link, telemetry and video start at power-on without waiting for internet, so a local Wi-Fi network or radio link works. Activating the license needs internet once. After that, a failed license check because of a lost connection does not disable the device.

## License and account

> You need a UAVcast-Pro license to activate the drone. Buy one in the UAVmatrix store.
>
> [Buy UAVcast-Pro](https://uavmatrix.com/checkout) · [See plans and pricing](https://uavmatrix.com/products)

### My license won't activate. What now?

See [License won't activate](https://docs.uavmatrix.com/troubleshooting/license-activation-failed/). The usual causes are a mistyped key, no free device slot, or no internet on the device.

### What happens when my license expires?

UAVcast-Pro is locked: the web interface only opens **Application**, and telemetry, video and the other services stop until you renew. Renew in the store before the expiry date, then validate the key on the drone. See [When a license expires](https://docs.uavmatrix.com/get-started/license-activation/#when-a-license-expires).

### Is Fleet Manager included with my license?

Yes. Fleet Manager, including its VPN, is included with your UAVcast-Pro license at no extra cost.

### I replaced the SD card. Do I need a new license?

No, but the device counts as new and takes a slot. Unregister the old entry under **Application → License Manager → Activated Devices**.

### Is Fleet Manager a separate product?

Fleet Manager is UAVmatrix's web dashboard for managing many drones at [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/). It is included with your UAVcast-Pro license. You sign in with your uavmatrix.com account, and each drone you pair needs an active UAVcast-Pro license owned by a member of your organization. See [Fleet Manager](https://docs.uavmatrix.com/fleet-manager/).

### How do I pair a drone with Fleet Manager?

In UAVcast-Pro, open **Fleet Management** and press **Connect to Fleet Manager**. Enter the 8-digit code in Fleet Manager under **Fleet → Pair Device** within 5 minutes. See [Pair your first UAV](https://docs.uavmatrix.com/fleet-manager/pair-uav/) and, if it fails, [Pairing code invalid or expired](https://docs.uavmatrix.com/troubleshooting/pairing-code-invalid/).

## Updates and data

### How do I update UAVcast-Pro?

Go to **Application → Update Application**, pick a version in **Select version to update** and press **Update Now**. If the card shows **Pending Restart**, press **Restart Now**. You can also run the installer again.

### Can I import settings from v4 or v5?

No. v6 uses a new database, so set it up again after a fresh install. Within v6, use **Application → Database → Backup Database** and **Restore Database** to move settings between installs.

### Can UAVcast-Pro record video?

Yes, since v6.5.1. It records camera 1 and 2 from the flight map, or automatically while the drone is armed, together with a telemetry log. See [Record flights and review them](https://docs.uavmatrix.com/guides/recording-flight-review/).

### Where does UAVcast-Pro keep its files?

Under `/opt/uavcast-pro`: the database `uavcast.db`, `logs/`, `recordings/` and `missions/`. See [Services and files](https://docs.uavmatrix.com/reference/services-and-files/).

### I forgot the admin password.

There is no password reset in the web interface. Another admin can delete your user under **Users** and create it again. If you were the only admin, recovery isn't self-service: contact **[support@uavmatrix.com](mailto:support@uavmatrix.com)** with the details listed in [Forgot the admin password](https://docs.uavmatrix.com/uavcast-pro/users/#forgot-the-admin-password).

### Where do I get help?

Collect the logs as described in [Collect logs for support](https://docs.uavmatrix.com/troubleshooting/collect-logs/) and e-mail **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, or ask in the [UAVmatrix Discord](https://discord.gg/xwqMTXh).

Source: https://docs.uavmatrix.com/troubleshooting/faq/
