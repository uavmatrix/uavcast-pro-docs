# Installation fails

> Fix UAVcast-Pro installer errors like No installation candidate found or failed dependencies: check the 64-bit OS, internet, disk and installer log.

You ran `curl -fsSL https://install.uavmatrix.com | sudo bash` and it stopped with an error, hung, or finished without a working web interface.

| What you see | Likely cause | Start at |
| --- | --- | --- |
| No installation candidate for … found! | 32-bit OS or an unsupported architecture | [Check 1](https://docs.uavmatrix.com/troubleshooting/installation-fails/#check-1) |
| Failed to update package lists, or Failed to install dependencies | No internet, or a broken apt setup | [Check 2](https://docs.uavmatrix.com/troubleshooting/installation-fails/#check-2) |
| Hangs for a long time on a Pi Zero 2 W | Low memory and slow storage | [Check 3](https://docs.uavmatrix.com/troubleshooting/installation-fails/#check-3) |
| Service failed to start | A component could not start after install | [Check 4](https://docs.uavmatrix.com/troubleshooting/installation-fails/#check-4) |

## Check 1: 64-bit operating system

UAVcast-Pro v6 needs a 64-bit OS: arm64 or amd64 (x86 PCs). On arm64, boards other than a Raspberry Pi (Jetson and other ARM boards) need UAVcast-Pro 6.5.3 or later; older installers stop with *Device is not a Raspberry Pi*.

```bash
dpkg --print-architecture   # must print arm64 or amd64
uname -m                    # aarch64 or x86_64
```

If you see `armhf`, `armv7l` or `i686`, you are on a 32-bit OS. Flash **Raspberry Pi OS (64-bit)** with Raspberry Pi Imager and install again. Supported systems are Raspberry Pi OS, Debian and Ubuntu; see [Supported hardware](https://docs.uavmatrix.com/reference/supported-hardware/).

## Check 2: Internet and apt

The installer downloads UAVcast-Pro and system packages, and installs ZeroTier and Tailscale.

1. Check internet access: `curl -I https://install.uavmatrix.com`.
2. Run `sudo apt update` by hand and fix any errors it shows, for example a third-party repository with an expired key.
3. Run the installer again. It is safe to run it more than once.

## Check 3: Low-power boards

On a Raspberry Pi Zero 2 W the installation takes much longer than on a Pi 4 or 5, and the installer shows a time estimate. Let it finish. Use a fast SD card and a stable power supply: an undervoltage reset during install leaves a half-finished installation.

## Check 4: Read the installer log

The installer writes everything to `/opt/uavcast-pro/installer.log`.

```bash
sudo tail -n 100 /opt/uavcast-pro/installer.log
```

Look at the last error lines. If the installer fails before it can create `/opt/uavcast-pro`, the log is in `/tmp/uavcast-installer.log`.

## Install a specific version

To list the versions available for your architecture, or to install one of them:

```bash
curl -fsSL https://install.uavmatrix.com | bash -s -- -l          # list versions
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2  # install 6.5.2
```

## Still failing?

Send `/opt/uavcast-pro/installer.log`, the output of `cat /etc/os-release` and `dpkg --print-architecture`, and your board model to **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Related: [Install UAVcast-Pro](https://docs.uavmatrix.com/get-started/installation/)

Source: https://docs.uavmatrix.com/troubleshooting/installation-fails/
