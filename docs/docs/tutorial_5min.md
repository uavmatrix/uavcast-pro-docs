---
slug: /quick-start
title: Quick Start Tutorial
authors: Bernt Christian Egeland
tags: []
sidebar_position: 4
---

# Quick Start Tutorial

This guide will help you set up UAVcast-Pro v6 and establish a connection between your flight controller and ground control station.

## Prerequisites

Before starting this tutorial, ensure you have:
- Raspberry Pi (Zero 2W, 3, 4, 5, or newer)
- Raspberry Pi OS 64-bit installed ([Installation Guide](/docs/6.x/installation))
- UAVcast-Pro v6 installed and running
- Valid UAVcast-Pro license key
- Flight controller with MAVLink support

:::info Need to Install UAVcast-Pro?
If you haven't installed UAVcast-Pro yet, follow the [Installation Guide](/docs/6.x/installation) first. Installation takes approximately 5-10 minutes.

Quick install command:
```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
```
:::

## 1. Access Web Interface

After installation, access the UAVcast-Pro web interface:
1. Open a web browser on a computer connected to the same network
2. Navigate to `http://<your-raspberry-pi-ip>/` or `http://raspberrypi.local/`
3. You should see the UAVcast-Pro login/dashboard page

:::tip Finding Your IP Address
If you need help finding your Raspberry Pi's IP address, see the [Installation Guide](/docs/6.x/installation#finding-your-raspberry-pi-ip-address).
:::

## 2. License Activation

1. Navigate to the **Application** page in the sidebar
2. Go to the **License** section
3. Enter your license key
4. Click **Activate**

:::info
Ensure your Raspberry Pi has internet access during activation. The license will be validated against UAVmatrix servers.
:::

## 3. Connect Flight Controller

1. Navigate to the **Flight Controller** page in the sidebar
2. Choose your connection method:
   - **USB** (Recommended): Connect FC using USB cable - device will auto-detect
   - **Serial**: Use GPIO pins (TX, RX, and Ground)
3. Configure settings:
   - Set baud rate (default: 57600 for most controllers)
   - Configure internal telemetry address if needed
4. Enable the flight controller
5. Verify MAVLink connection status shows "Connected"

:::tip Troubleshooting
If status doesn't show "Connected":
- Check physical connections
- Ensure flight controller is powered
- Try a different USB cable
- Verify correct baud rate
- Check that the flight controller is outputting MAVLink telemetry
:::

## 4. Set Up VPN Connection

UAVcast-Pro v6 supports two VPN providers: **ZeroTier** and **Tailscale**. This guide uses ZeroTier.

### Set Up ZeroTier Network

1. Access [uavnet.uavmatrix.com](https://uavnet.uavmatrix.com) using credentials provided in your license email
2. Click "Create Network"
3. Note your Network ID for later use

:::note
Access to uavnet.uavmatrix.com is provided automatically upon license activation.
:::

### Connect Ground Control Station PC

1. Download ZeroTier from [zerotier.com](https://www.zerotier.com/download/)
2. Install ZeroTier on your GCS computer
3. Join your network:
   - **Windows**: Right-click ZeroTier icon → Join Network
   - **Linux**: `sudo zerotier-cli join <your-network-id>`
   - **macOS**: Click ZeroTier menu bar icon → Join Network
4. Enter your Network ID
5. Approve the connection in uavnet.uavmatrix.com network dashboard

### Configure UAVcast-Pro VPN

1. Navigate to **VPN/Private Network** page in UAVcast-Pro
2. Select "ZeroTier" as VPN provider
3. Enter your Network ID
4. Enable the VPN service
5. Verify connection status shows "Connected"

:::tip Alternative: Tailscale
UAVcast-Pro v6 also supports Tailscale. See the [VPN Configuration](/docs/6.x/configuration-vpn) page for details.
:::

## 5. Verify VPN Connectivity

1. Check that both devices show as connected in [uavnet.uavmatrix.com](https://uavnet.uavmatrix.com)
2. Both devices should have assigned ZeroTier managed IPs
3. Note your Raspberry Pi's ZeroTier IP address for the next step

## 6. Configure Ground Control Station

1. Navigate to **Ground Control Stations** page in UAVcast-Pro
2. Click **Add Destination** to create a new GCS endpoint
3. Configure the destination:
   - **Name**: Give it a descriptive name (e.g., "Mission Planner Laptop")
   - **Destination IP**: Your GCS computer's ZeroTier IP address
   - **Telemetry Port**: 14550 (default for MAVLink)
   - **Video Port**: 5600 (default for video streaming)
   - **Enable Telemetry**: Toggle ON to stream telemetry data
   - **Enable Video**: Toggle ON to stream video (optional)
4. Click **Save**

:::tip Multiple Destinations
UAVcast-Pro v6 supports multiple GCS destinations. You can add separate configurations for Mission Planner, QGroundControl, or other ground stations.
:::

:::info Default Ports
Mission Planner and QGroundControl are pre-configured for these ports when using UDP:
- Telemetry: 14550
- Video: 5600
:::

## 7. Configure Camera (Optional)

If you want to stream live video:

1. Navigate to **Camera** page
2. Select your camera from the dropdown (auto-detected cameras will appear)
3. Configure video settings:
   - **Resolution**: Choose based on your bandwidth (start with 720p)
   - **FPS**: Frame rate (15-30 recommended)
   - **Bitrate**: Video quality in kbps (1500-3000 recommended)
4. Enable **Live Preview** to see video in the web interface
5. Start the camera service


## 8. Firewall Configuration

:::warning Important
Ensure these ports are open in your firewall on the GCS computer:
- **UDP 14550** (MAVLink Telemetry)
- **UDP 5600** (Video Stream)
:::

**To open ports:**

- **Windows**: Windows Firewall → Advanced Settings → Inbound Rules → New Rule → Port → UDP → Specific ports: 14550, 5600
- **Linux**:
  ```bash
  sudo ufw allow 14550/udp
  sudo ufw allow 5600/udp
  ```
- **macOS**: System Preferences → Security & Privacy → Firewall → Firewall Options

## 9. Connect Your Ground Control Software

1. Open Mission Planner or QGroundControl on your GCS computer
2. The software should automatically detect incoming MAVLink telemetry on port 14550
3. If using video, enable video reception in your GCS software (usually automatic on port 5600)

## Verification & Testing

Your setup is complete when:

✅ UAVcast-Pro Dashboard shows:
- Flight Controller status: Connected
- VPN status: Connected
- Camera status: Running (if enabled)

✅ Ground Control Station shows:
- Live telemetry data (altitude, GPS, battery, etc.)
- Flight map with UAV position
- Video stream (if camera is configured)

:::tip Troubleshooting
If connection issues occur:

**No Telemetry:**
1. Verify Flight Controller shows "Connected" in UAVcast-Pro
2. Check ZeroTier connections are authorized
3. Confirm correct GCS IP address in Ground Control Station settings
4. Verify firewall allows UDP 14550
5. Check GCS software is listening on port 14550

**No Video:**
1. Verify camera is started in UAVcast-Pro (check Camera page)
2. Check video preview works in UAVcast-Pro web interface
3. Confirm firewall allows UDP 5600
4. Try reducing resolution or bitrate if video is choppy
5. Check camera logs for errors

**General Issues:**
- Use UAVcast-Pro Dashboard to check service status
- Check logs in each configuration page for detailed error messages
- Verify network connectivity between devices (ping test)
- Restart services from UAVcast-Pro if needed
:::

## Next Steps

Now that your basic setup is complete, explore additional features:

- [Flight Map](/docs/6.x/configuration-map) - View live flight path and mission waypoints
- [Mission Planner](/docs/6.x/configuration-map) - Plan and upload missions
- [Network Management](/docs/6.x/configuration-networks) - Configure network failover
- [4G Modem Setup](/docs/6.x/configuration-cell-modem) - Add cellular connectivity
- [User Management](/docs/6.x/configuration-users) - Add additional users with different access levels
