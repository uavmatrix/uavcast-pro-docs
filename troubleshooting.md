# Troubleshooting

> Fix no video, no MAVLink heartbeat, modem and VPN problems, license errors and Fleet Manager pairing. Start from what you see and follow the checks.

Start from the symptom. Each page below lists the likely causes in the order they happen in the field, with numbered checks that use the exact labels from the UAVcast-Pro and Fleet Manager interfaces.

> **Check the dashboard first**
>
> Open **Dashboard** in UAVcast-Pro. The status card sums up the drone in one line (**All systems normal**, or the number of problems and warnings) and has a row each for **Flight controller**, **Ground station**, **Cellular**, **VPN**, **RTK corrections**, **Video** and **Power supply**. The first red row is usually the place to start.

![UAVcast-Pro dashboard with the status card showing 2 problems: GPS no fix and VPN not connected](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/dashboard.webp)

*Dashboard → status card. Rows with a problem turn red and are counted in the problems badge, here GPS (no fix) and VPN (not connected).*

## Match your symptom

| What you see | Likely cause | Go to |
| --- | --- | --- |
| Telemetry works, but the video area in QGroundControl or Mission Planner is black | **Enable Video** is off for that ground station, wrong IP, or a firewall | [No video in the ground station](https://docs.uavmatrix.com/troubleshooting/no-video-in-gcs/) |
| Video freezes, smears grey or lags seconds behind | Bitrate too high for the link, or keyframes too far apart | [Choppy or delayed video](https://docs.uavmatrix.com/troubleshooting/choppy-or-delayed-video/) |
| Flight Controller page says **No heartbeat**, **Waiting for device** or **Detecting baud rate** | Cable, wiring, port or baud rate | [No MAVLink heartbeat](https://docs.uavmatrix.com/troubleshooting/no-mavlink-heartbeat/) |
| UAVcast-Pro shows the flight controller as **Connected**, the GCS waits for a connection | Telemetry is not sent to the GCS, or the GCS is not listening | [No telemetry in the ground station](https://docs.uavmatrix.com/troubleshooting/no-telemetry-in-gcs/) |
| **No cameras available** in **Select Camera** | CSI camera stack missing, ribbon cable, or USB camera not seen | [Camera not detected](https://docs.uavmatrix.com/troubleshooting/camera-not-detected/) |
| **Invalid license key**, **Maximum activations reached** or **License activation failed** | Wrong key, no free device slot, or no internet | [License won't activate](https://docs.uavmatrix.com/troubleshooting/license-activation-failed/) |
| Modem shows a signal and an operator, but nothing loads | APN, network priority or SIM data | [Modem connected, no internet](https://docs.uavmatrix.com/troubleshooting/modem-no-internet/) |
| The browser can't reach `http://<device-ip>/` after installing | Wrong address, service not running, or port changed | [Web interface won't open](https://docs.uavmatrix.com/troubleshooting/web-interface-wont-open/) |
| The installer stops with an error | 32-bit OS, no internet, or low disk space | [Installation fails](https://docs.uavmatrix.com/troubleshooting/installation-fails/) |
| ZeroTier or Tailscale says connected, but you can't ping or open the drone | Member not authorized, wrong network, or GCS not on the VPN | [VPN connected but can't reach the drone](https://docs.uavmatrix.com/troubleshooting/vpn-cant-reach-drone/) |
| NTRIP status is not **Streaming corrections**, or the fix never reaches **RTK Fixed** | Caster settings, GGA, or a receiver that can't do RTK | [RTK corrections not arriving](https://docs.uavmatrix.com/troubleshooting/rtk-corrections-not-arriving/) |
| **Voltage too low - use a stronger power supply** or **Slowed down (heat or power)** | Weak power supply or cable, overheating | [Undervoltage and throttling](https://docs.uavmatrix.com/troubleshooting/undervoltage-and-throttling/) |
| The drone is **Offline** in Fleet Manager | Drone has no internet, MQTT port blocked, or re-pair required | [Drone offline in Fleet Manager](https://docs.uavmatrix.com/troubleshooting/drone-offline-fleet-manager/) |
| **Invalid pairing code**, **This pairing code has expired** or **License is not owned by any member of this organization** | Code typed wrong or too old, or license owned by someone outside the org | [Pairing code invalid or expired](https://docs.uavmatrix.com/troubleshooting/pairing-code-invalid/) |

## Still stuck?

1. [Collect the log files](https://docs.uavmatrix.com/troubleshooting/collect-logs/). The download includes a `diagnostics.txt` snapshot of your settings and hardware, so support doesn't need to ask for them.
2. Send them to **[support@uavmatrix.com](mailto:support@uavmatrix.com)** with your UAVcast-Pro version, the hardware you use and what you have already tried. You can also ask in the [UAVmatrix Discord](https://discord.gg/xwqMTXh).

Short answers to common questions are in the [FAQ](https://docs.uavmatrix.com/troubleshooting/faq/).

Source: https://docs.uavmatrix.com/troubleshooting/
