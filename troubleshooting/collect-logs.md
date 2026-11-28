# Collect logs for support

> Download the UAVcast-Pro log archive with diagnostics.txt from Application, Logging, or over SSH, and send it to UAVmatrix support with the right details.

One log download answers most of the questions support would otherwise ask. Each archive includes the service logs you choose plus a `diagnostics.txt` snapshot: version, OS and board, settings, the generated telemetry router config, serial devices and who holds them, and power and USB events from the kernel. Passwords, keys and tokens are never included.

## Download from the web interface

1. Go to **Application** and scroll to **Logging**.
2. In the first list, keep **All Logs**, or pick the service that matches the problem (see the table).
3. In the second list, pick a time range that covers the problem. The default is **Last 2 hours**.
4. Press **Download**. Your browser saves a `.zip` file.

![Application page Logging card with the log list set to All Logs, the time range set to Last 2 hours and the Download button](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/application--logging.webp)

*Application → Logging with All Logs and Last 2 hours selected.*

| Problem | Pick in the log list |
| --- | --- |
| Flight controller link, no heartbeat, no telemetry | **Mavlink Manager** |
| Camera, video, preview | **Camera Server** |
| Modem, cellular | **Modem Manager** |
| ZeroTier, Tailscale | **VPN Manager** |
| RTK, NTRIP | **NTRIP Client** |
| License | **License Manager** |
| Dynamic DNS | **DNS Manager** |
| Installation | **Application Installer** |
| Not sure | **All Logs** |

Only admins can download logs. **Prune All Logs** deletes every log file and cannot be undone, so download first.

## From the command line

If the web interface does not open, collect the logs over SSH:

```bash
sudo tar czf ~/uavcast-logs.tar.gz /opt/uavcast-pro/logs /opt/uavcast-pro/installer.log
journalctl -u uavcast-web -u uavcast-factory -u mavlink-manager -u uavcast-camera --since "2 hours ago" > ~/uavcast-journal.txt
```

Copy both files to your computer, for example with `scp`.

## Send them to support

E-mail **[support@uavmatrix.com](mailto:support@uavmatrix.com)** and include:

- the log archive,
- your UAVcast-Pro version (shown at the bottom of the sidebar),
- the board, OS, flight controller, camera and modem you use,
- what you expected, what happened, and what you have already tried from these pages.

You can also ask in the [UAVmatrix Discord](https://discord.gg/xwqMTXh). Don't post log files publicly: they contain IP addresses and device names.

Related: [Application settings](https://docs.uavmatrix.com/uavcast-pro/application-settings/)

Source: https://docs.uavmatrix.com/troubleshooting/collect-logs/
