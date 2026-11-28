# Update UAVcast-Pro

> Update UAVcast-Pro from the web interface or the command line, install an older version, and what happens to your settings, server port and recordings.

Update UAVcast-Pro from **Application → Update Application** in the web interface, or by running the installer again over SSH. Both keep your settings, users, license and recordings. The drone needs internet access, and you must reboot when the update finishes.

> **Never update before a flight**
>
> An update stops all UAVcast-Pro services, including telemetry and video, and needs a reboot. Update on the ground with the aircraft disarmed.

## Update from the web interface

1. Go to **Application**. The **Update Application** card shows **Current Version** and **Latest Version**. A green *New version … available* banner appears when there is a newer release.
2. Leave **Select version to update** on the latest version, or pick another one.
3. Select **Update to …** (or **Update Now**). **Progress** shows the download and install steps. This takes a few minutes, longer on a Pi Zero 2 W or Pi 3.
4. When the **Pending Restart** banner appears, select **Restart Now**. The device reboots.
5. Open the web interface again and check **Current Version**.

![Update Application card with current and latest version, a New version available banner and the Update button](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/application--update-available.webp)

*Application → Update Application with a newer version available.*

## Update from the command line

Run the installer again. It replaces the program files and keeps the database:

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
sudo reboot
```

To install a particular version, list the versions (no root needed), then install one with `-b`:

```bash
# List the versions available for this device
curl -fsSL https://install.uavmatrix.com | bash -s -- -l

# Install a specific version
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.1
```

## Go back to an older version

Pick the older version in **Select version to update** and update as usual, or use `-b` on the command line. Settings made in a newer version may not exist in the older one.

## What an update keeps and replaces

| Kept | Replaced |
| --- | --- |
| Settings database (`/opt/uavcast-pro/uavcast.db`): ground stations, camera, modem, VPN, users, license | Program files in `/opt/uavcast-pro` (`build`, `dist`, `factory`, `install`) |
| Recordings and telemetry logs | systemd service files |
| ZeroTier and Tailscale membership | System packages UAVcast-Pro depends on (updated by apt) |

From UAVcast-Pro 6.5.3, a custom **Server Port** set on the Application page is kept when you update. Earlier versions reset it to 80: after updating from one of them, open the web interface on port 80 and save your port again.

## See what changed

Each release is listed with its changes in the [changelog](https://docs.uavmatrix.com/reference/changelog/). Read it before updating a drone that flies operationally.

Source: https://docs.uavmatrix.com/get-started/updating/
