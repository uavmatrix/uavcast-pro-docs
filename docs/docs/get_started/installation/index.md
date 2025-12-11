---
slug: /installation
title: Installation
authors: Bernt Christian Egeland
tags: []
sidebar_position: 2
---

# Installation

:::warning Critical Requirements
UAVcast-Pro v6 requires a 64-bit operating system. 32-bit systems are NOT compatible.
:::

## Supported Platforms

UAVcast-Pro supports both **arm64** and **amd64** architectures, enabling installation on a wide range of hardware:

| Architecture | Supported Devices |
|--------------|-------------------|
| **arm64** | Raspberry Pi (Zero 2W, 3, 4, 5), NVIDIA Jetson Nano, Orange Pi, and other arm64 SBCs |
| **amd64** | x86/x64 computers, Intel NUC, mini PCs, and standard desktop/laptop hardware |

## Operating System Requirements

**For Raspberry Pi:**
- Raspberry Pi OS 64-bit (recommended) - [Download](https://www.raspberrypi.com/software/operating-systems/)
- Ubuntu 64-bit for Raspberry Pi - [Download](https://ubuntu.com/download/raspberry-pi)

**For other arm64 devices (Jetson Nano, etc.):**
- Ubuntu 64-bit or compatible Debian-based distribution

**For amd64 devices:**
- Ubuntu 64-bit (20.04 LTS or newer recommended)
- Debian 64-bit or compatible distributions

## Operating System Installation

1. Download the appropriate 64-bit operating system for your device
2. Install using the recommended imaging tool for your platform:
   - **Raspberry Pi:** Use Raspberry Pi Imager
   - **Jetson Nano:** Use balenaEtcher or NVIDIA SDK Manager
   - **amd64:** Standard OS installation or imaging tool
3. Complete the initial OS setup and ensure your system is up to date:

```bash
sudo apt update
sudo apt upgrade
```

## UAVcast-Pro Installation

### Installing Latest Version

Install UAVcast-Pro by running this command in your terminal:

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
```

The installation script will:
1. Detect your system architecture (arm64/amd64) and OS
2. Install required system dependencies
3. Download and install UAVcast-Pro v6
4. Configure systemd services
5. Set up the database
6. Start the web interface

:::info Installation Time
Installation typically takes 5-10 minutes depending on your internet connection and device.
:::

### Installing Specific Version

You can list all available versions for your architecture:

```bash
curl -fsSL https://install.uavmatrix.com | bash -s -- -l
```

To install a specific version:

```bash
curl -fsSL https://install.uavmatrix.com | bash -s -- -b 5.0.8
```

### Post-Installation Steps

1. The installer will validate all components
2. Once complete, you'll see a success message with access information
3. Access the web interface using:
   - Your device's IP address: `http://<device-ip>/`
   - Default hostname (Raspberry Pi): `http://raspberrypi.local/`
   - Default port: `80` (configurable later)


5. Continue with the [Quick Start Tutorial](/docs/6.x/quick-start)

### System Requirements

**Hardware (arm64):**
- Raspberry Pi Zero 2W, 3, 4, 5, or newer
- NVIDIA Jetson Nano or other arm64 SBCs
- Minimum 2GB storage space (8GB+ recommended)

**Hardware (amd64):**
- x86/x64 compatible computer (Intel NUC, mini PC, laptop, etc.)
- Minimum 2GB storage space (8GB+ recommended)

**Software:**
- 64-bit Linux operating system (Raspberry Pi OS, Ubuntu, or Debian-based)
- Active internet connection during installation

**Supported Accessories:**
- MAVLink-compatible flight controllers
- USB cameras and CSI cameras (Raspberry Pi)
- 4G/LTE USB modems
- Network interfaces (Ethernet, WiFi)

### Finding Your Device IP Address

If you don't know your device's IP address:

**Method 1: Check your router**
- Log into your router's admin panel
- Look for connected devices
- Find your device in the device list

**Method 2: Use hostname (Raspberry Pi)**
- Try accessing `http://raspberrypi.local/`
- Works on most networks with mDNS support

**Method 3: Connect a monitor**
- Connect HDMI monitor and keyboard
- Log in and run: `hostname -I`

**Method 4: Network scanner**
- Use a network scanner app (e.g., Fing, Advanced IP Scanner)
- Scan your network for connected devices

### Upgrading from Previous Versions

:::danger Important Database Changes
UAVcast-Pro v6 uses a completely new database structure and architecture. Data and configurations from version 4.x or 5.x cannot be imported.
:::

**If you're upgrading from UAVcast-Pro 4.x or 5.x:**

1. **Backup your current settings:**
   - Take screenshots of all configuration pages
   - Document your GCS destinations
   - Note camera and modem settings
   - Save any custom configurations

2. **Prepare for fresh installation:**
   - Install the latest Raspberry Pi OS 64-bit
   - Format your SD card (backup any important data first)

3. **Perform fresh installation:**
   - Run the installation command above
   - Follow the Quick Start guide
   - Manually reconfigure your settings

4. **What's different in v6:**
   - Completely redesigned UI
   - New user authentication system
   - Enhanced multi-user support
   - Improved service management
   - New features (Mission Planner, HUD, etc.)

### Troubleshooting Installation

**Installation fails with "unsupported OS" error:**
- Verify you're using a 64-bit operating system
- Check: `uname -m` should show `aarch64` (arm64) or `x86_64` (amd64)
- If it shows `armv7l` or `i686`, you're on 32-bit (not supported)

**Installation hangs or times out:**
- Check your internet connection
- Try running again (installation is idempotent)
- Check available disk space: `df -h`

**Cannot access web interface after installation:**
- Verify UAVcast-Pro service is running: `sudo systemctl status uavcast-web`
- Check for port conflicts (port 80 in use)
- Try accessing via IP address instead of hostname
- Check firewall settings

**Need help?**
- Join our [Discord](https://discord.gg/xwqMTXh)
- Contact support: support@uavmatrix.com

