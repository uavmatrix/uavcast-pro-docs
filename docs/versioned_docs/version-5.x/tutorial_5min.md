---
slug: /quick-start
title: Quick Start Tutorial
authors: Bernt Christian Egeland
tags: []
sidebar_position: 4
---

# Quick Start Tutorial

This guide will help you set up UAVcast-Pro v5 and establish a connection between your flight controller and ground control station.

## 1. License Activation

1. Access the UAVcast-Pro web interface
2. Navigate to the License section
3. Enter your license key
4. Click Activate

:::info
Ensure your Raspberry Pi has internet access during activation.
:::

## 2. Connect Flight Controller

1. Navigate to the Flight Controller page
2. Choose your connection method:
  - **USB** (Recommended): Connect FC using USB cable
  - **GPIO**: Connect TX, RX, and Ground pins
3. Verify mavlink connection status shows "Connected"

:::tip Troubleshooting
If status doesn't show "Connected":
- Check physical connections
- Ensure flight controller is powered
- Change usb cable
:::

## 3. Set Up ZeroTier Network

UAVcast-Pro uses ZeroTier for secure, easy-to-configure VPN connections.

1. Access [uavnet.uavmatrix.com](https://uavnet.uavmatrix.com) using credentials provided in your license email.
2. Click "Create Network"
3. Note your Network ID for later use

:::note
Access to uavnet.uavmatrix.com is provided automatically upon license activation.
:::

## 4. Connect Ground Control Station PC

1. Download ZeroTier from [zerotier.com](https://www.zerotier.com/download/)
2. Install ZeroTier on your GCS computer
3. Join your network:
  - Windows: Right-click ZeroTier icon → Join Network
  - Linux: `sudo zerotier-cli join <your-network-id>`
  - macOS: Click ZeroTier menu bar icon → Join Network
4. Enter your Network ID
5. Approve the connection in uavnet.uavmatrix.com network dashboard

## 5. Configure UAVcast-Pro VPN

Goto the VPN page to learn more about the diffrent VPN providers. [setup-vpn](/docs/5.x/setup-vpn)
1. Navigate to VPN page in UAVcast-Pro
2. Select "ZeroTier" as VPN type
3. Enter your Network ID
4. Click Connect
5. Verify connection status

## 6. Verify Connectivity

Ensure both devices show as connected in [uavnet.uavmatrix.com](https://uavnet.uavmatrix.com)  
Both should have assigned ZeroTier managed IPs

## 7. Configure Ground Control Station

1. Navigate to Ground Control Station page in UAVcast-Pro
2. Configure streaming settings:
  - Destination IP: Your GCS computer's ZeroTier IP
  - Telemetry Port: 14550 (default)
  - Video Port: 5600 (default)

:::tip Default Ports
Mission Planner and QGroundControl are pre-configured for these ports when using UDP.
:::

## 8. Firewall Configuration

:::warning Important
Ensure these ports are open in your firewall:
- UDP 14550 (Telemetry)
- UDP 5600 (Video Stream)
:::

To open ports:
- **Windows**: Windows Firewall → Advanced Settings → Inbound Rules → New Rule
- **Linux**: `sudo ufw allow 14550/udp` and `sudo ufw allow 5600/udp`

## Verification

Your setup is complete when:
1. UAVcast-Pro shows connected status for Flight Controller
2. ZeroTier shows connected status
3. GCS receives telemetry data
4. Video stream is visible (if configured)

:::tip Troubleshooting
If connection issues occur:
1. Verify all ZeroTier connections are authorized
2. Check firewall settings
3. Confirm correct IP addresses are used
4. Verify port settings match on both ends
:::
