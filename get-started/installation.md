# Install UAVcast-Pro

> Install UAVcast-Pro with one command on a 64-bit Raspberry Pi OS, Debian or Ubuntu system (arm64 or amd64), then open the web interface and create an admin user.

Install in one command

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
```

Run it on the companion computer (64-bit Raspberry Pi OS, Debian or Ubuntu, with internet). The steps below explain what it does and how to prepare the device.

> You need a UAVcast-Pro license to activate the drone. Buy one in the UAVmatrix store.
>
> [Buy UAVcast-Pro](https://uavmatrix.com/checkout) · [See plans and pricing](https://uavmatrix.com/products)

UAVcast-Pro installs with one command on any 64-bit, Debian-based Linux system: Raspberry Pi OS, Debian or Ubuntu, on arm64 or amd64. The installer downloads the latest release, installs its dependencies and services, and prints the address of the web interface when it's done. It takes about 10 minutes, or about 30 minutes on a Raspberry Pi Zero 2 W, 2 or 3.

## Before you begin

- A 64-bit OS on the companion computer. Check with `uname -m`: it must print `aarch64` or `x86_64`.
- At least 500 MB free on the root disk (`df -h /`).
- Internet access on the device during the install.
- SSH or a keyboard and screen on the device, and a user with `sudo` rights.

## Step 1: Flash the operating system

**Raspberry Pi**

1. Open [Raspberry Pi Imager](https://www.raspberrypi.com/software/) and choose your Pi model.
2. Choose **Raspberry Pi OS (64-bit)**. The **Lite** version is enough and leaves more CPU for video.
3. Open the OS customisation settings. Set a hostname, a username and password, your Wi-Fi network and country, and enable SSH.
4. Write the card, put it in the Pi and power it up.

Ubuntu Server 64-bit for Raspberry Pi also works.

**Other arm64 boards**

Flash the vendor's 64-bit Ubuntu or Debian image (for example JetPack's Ubuntu on NVIDIA Jetson), complete the first-boot setup and enable SSH.

Arm64 boards other than a Raspberry Pi need UAVcast-Pro 6.5.3 or later; older installers stop with *Device is not a Raspberry Pi*.

**x86-64 PC**

Install a 64-bit Debian or Ubuntu (Server or Desktop). The installer doesn't check the release version, so use a current, supported release, for example Ubuntu 22.04 LTS or newer.

Then log in over SSH and update the system:

```bash
sudo apt update && sudo apt full-upgrade -y
```

## Step 2: Run the installer

On the drone:

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
```

The installer:

1. Detects the architecture and downloads the matching release to `/opt/uavcast-pro`.
2. Installs the system packages it needs: NetworkManager, ModemManager, GStreamer, v4l-utils, Redis, Python and more.
3. On a Raspberry Pi, frees the GPIO UART for the flight controller (removes the serial console from `cmdline.txt`, moves Bluetooth off the UART) and raises the camera memory pool for two-camera setups. Your original `config.txt` and `cmdline.txt` are backed up first.
4. Installs ZeroTier, Tailscale, mavlink-router and MediaMTX.
5. Installs and starts the UAVcast-Pro services.
6. Checks that the key tools are present and prints the web address.

When it finishes you see:

```text
✅ Installation completed successfully!

Please reboot your device to complete the installation.

To access the UAVcast-Pro web interface, open your browser and navigate to:
http://192.168.1.50
```

Reboot so the UART and camera changes take effect:

```bash
sudo reboot
```

> **Let slow boards finish**
>
> On a Pi Zero 2 W the progress bar can sit still for minutes while apt works. Don't start a second install: the installer refuses to run twice and a second copy only slows the first one down. The full log is in `/opt/uavcast-pro/installer.log`.

### Install a specific version

List the versions available for your architecture:

```bash
curl -fsSL https://install.uavmatrix.com | bash -s -- -l
```

Install one of them with `-b`:

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2
```

You can also switch versions later from the web interface. See [Update UAVcast-Pro](https://docs.uavmatrix.com/get-started/updating/).

## Step 3: Open the web interface

On a computer on the same network, open a browser and go to the address the installer printed, for example `http://192.168.1.50`. The web interface runs on port **80**.

If you don't know the address:

- Try the hostname you set in Raspberry Pi Imager, for example `http://raspberrypi.local`. This needs mDNS, which works on most home networks and on macOS, Linux and Windows 10 or newer.
- Look for the device in your router's list of connected clients.
- On the device, run `hostname -I`.

The first page you see is **Application**, because UAVcast-Pro has no license yet. The sidebar stays greyed out (*Feature requires license*) until the device is licensed.

## Step 4: Activate your license

On **Application → License Manager**, paste your key into **Enter License Key** and select **Validate**. The device needs internet access for this. The full flow, device slots and moving a license are covered in [Licensing & activation](https://docs.uavmatrix.com/get-started/license-activation/).

## Step 5: Create an admin user

A fresh install has **no users and no login**: anyone who can reach the web interface has full admin access. Create an admin account before the drone goes on a shared network or the internet.

1. Go to **Users** in the sidebar (under **Management**).
2. Select **Add User**.
3. Enter a **Username** (at least 3 characters) and a **Password** (at least 6 characters). The first user is always **Admin**.
4. Select **Create User**.

From now on the web interface asks for a login. Sessions last 7 days. See [Users & access](https://docs.uavmatrix.com/uavcast-pro/users/) for read-only accounts.

## What gets installed

| Item | Location |
| --- | --- |
| Application, binaries, database (`uavcast.db`), logs | `/opt/uavcast-pro` |
| Installer log | `/opt/uavcast-pro/installer.log` |
| systemd services | `uavcast-web`, `uavcast-factory`, `mavlink-manager`, `uavcast-camera`, `uavcast-ntrip`, `uavcast-dns`, `mediamtx`, `internet-check` |
| MAVLink router config | `/etc/mavlink-router/main.conf` (generated by UAVcast-Pro, don't edit) |

Check that the web service is running:

```bash
sudo systemctl status uavcast-web
```

## Uninstall

The installer binary has an uninstall mode. It stops and removes all UAVcast-Pro services, the settings database and the program files in `/opt/uavcast-pro`, and purges ZeroTier, Tailscale and Redis if UAVcast-Pro installed them. General packages such as NetworkManager, ModemManager and GStreamer stay.

```bash
sudo /opt/uavcast-pro/factory/ApplicationInstaller --uninstall
```

From UAVcast-Pro 6.5.3, flight recordings in `/opt/uavcast-pro/recordings` are kept. Add `--delete-recordings` to remove them too, or `--purge-deps` to also remove ZeroTier, Tailscale and Redis that were installed before UAVcast-Pro. On earlier versions, uninstalling deletes the whole `/opt/uavcast-pro` folder, recordings included, so copy recordings you want to keep first.

> **Unregister the license first**
>
> Uninstalling doesn't free the license slot. Unregister the device on **Application → License Manager** before you wipe it, or you can't free the slot without another device. See [Licensing & activation](https://docs.uavmatrix.com/get-started/license-activation/#unregister-a-device).

## Upgrading from UAVcast-Pro 4.x or 5.x

Version 6 is a complete rewrite and can't import settings from 4.x or 5.x. Write down your ground station, camera and modem settings, flash a fresh 64-bit OS and install version 6.

If the installer reports *An older version of UAVcast-Pro has been detected at /opt/UAVcast-Pro*, remove it first. This deletes the old settings:

```bash
sudo rm -rf /opt/UAVcast-Pro
```

## If the install fails

| Message or symptom | Fix |
| --- | --- |
| *No installation candidate for … found!* | The OS is 32-bit or the architecture isn't supported. Check `uname -m` and reflash with a 64-bit image. |
| *Not enough free space. … need 500MB* | Free space or use a bigger card. |
| *Another process is currently using the system package manager* | An automatic update is running. Wait a few minutes and run the installer again. |
| *Another installer is already running* | Let the first one finish. |
| *Installation completed with errors* with a red ✗ | Run the installer again. If it repeats, send `/opt/uavcast-pro/installer.log` to [support@uavmatrix.com](mailto:support@uavmatrix.com). |
| Web page doesn't load | Check `sudo systemctl status uavcast-web`, try the IP instead of the hostname, and make sure nothing else uses port 80. |

More fixes: [Installation fails](https://docs.uavmatrix.com/troubleshooting/installation-fails/) and [Web interface won't open](https://docs.uavmatrix.com/troubleshooting/web-interface-wont-open/).

Source: https://docs.uavmatrix.com/get-started/installation/
