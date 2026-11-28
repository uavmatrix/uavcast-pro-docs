# Dashboard

> Read the UAVcast-Pro dashboard to check the flight controller, GPS, battery, ground station link, cellular, VPN, RTK, video and Raspberry Pi power, temperature and throttling.

The dashboard is the pre-flight checklist for the companion computer. One status card tells you whether the flight controller, GPS, battery, ground station link, modem, VPN, RTK, video and power supply are healthy, with a summary such as *All systems normal* or *2 problems*. Below it you find system information, network traffic, memory and storage. Open **Dashboard** in the sidebar.

![UAVcast-Pro dashboard with the status card showing 2 problems, system information with temperature, and the network traffic chart](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/dashboard.webp)

*Dashboard on a bench unit: two problems (no GPS fix, VPN not connected), system information and network traffic.*

## Status card

The card has three groups. Each row has a coloured dot: green is fine, amber is a warning, red is a problem.

| Row | Example values | What to do if it's not green |
| --- | --- | --- |
| **Flight controller** | *Armed*, *Disarmed*, *Link stopped*, *Connecting…* | See [Flight controller](https://docs.uavmatrix.com/uavcast-pro/flight-controller/). |
| **GPS** | *3D fix · 14 satellites*, *RTK fixed*, *No fix*, *No GPS* | Wait for a fix outdoors, or check the GPS wiring. |
| **Battery** | voltage and percentage | Charge or check the flight controller's battery monitor setup. |
| **Ground station** | *Sending to 2 · 16 packets/s*, *Not sending*, *1 set up · waiting for flight controller*, *None set up* | See [Ground control stations](https://docs.uavmatrix.com/uavcast-pro/ground-stations/). |
| **Cellular** | operator and signal, *No modem detected* | See [Cellular modem](https://docs.uavmatrix.com/uavcast-pro/connectivity/cellular-modem/). |
| **VPN** | *Connected*, *Not connected*, *Turned off* | See [VPN](https://docs.uavmatrix.com/uavcast-pro/connectivity/vpn/). |
| **RTK corrections** | *Connecting…*, *Error - check settings*, *Turned off* | See [NTRIP / RTK](https://docs.uavmatrix.com/uavcast-pro/flight-controller/ntrip-rtk/). |
| **Video** | *Running*, *Stopped*, *Turned off* | See [Camera](https://docs.uavmatrix.com/uavcast-pro/camera/). |
| **Dynamic DNS** | *Running*, *Turned off* | See [Dynamic DNS](https://docs.uavmatrix.com/uavcast-pro/connectivity/dynamic-dns/). |
| **Power supply** | *Stable*, *Voltage too low - use a stronger power supply*, *Slowed down (heat or power)*, *Voltage dropped since start-up* | See [Power](https://docs.uavmatrix.com/uavcast-pro/dashboard/#power-and-temperature). |

*Service failed - restarting* on any row means the service crashed and is being restarted automatically. If it keeps showing, download the logs from **Application → Logging**.

## Power and temperature

On a Raspberry Pi, **System Information** shows **Power**, **CPU throttling** and **Temperature**:

- **Voltage too low - use a stronger power supply**: the Pi is under-voltage right now. This causes USB resets, so the modem or flight controller can drop out. Fix the supply before flying.
- **Voltage dropped since start-up**: it happened at some point since boot. Often caused by the modem's transmit peaks.
- **Slowed down (heat or power)**: the CPU is throttled. Video encoding suffers first. Add a heatsink or airflow, or fix the supply.

The temperature bar turns red as the Pi approaches its throttling point.

## Other cards

| Card | Shows |
| --- | --- |
| **System Information** | **Operating System**, **Hardware** (CPU and cores), **Uptime**, power and **Temperature**. |
| **Network Traffic** | Received and transmitted totals and rates per interface. Choose **Last 50** to **Last 1000** samples. Handy for checking how much the video uses on the modem. |
| **Memory Usage** | **Total**, **Used** and **Free**. Data is collected every 10 seconds. |
| **Storage** | **Total**, **Used** and **Free** per partition. |

The charts need a few minutes of data after boot before they show anything.

## Guided tour

The first time you open the web interface, a tour offers to walk you through the main pages. You can **Skip Tour** or choose **Never Show Again**. Start it again from **Application → Settings → Take a Tour**.

Power problems in detail: [Under-voltage and throttling](https://docs.uavmatrix.com/troubleshooting/undervoltage-and-throttling/).

Source: https://docs.uavmatrix.com/uavcast-pro/dashboard/
