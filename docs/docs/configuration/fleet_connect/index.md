---
slug: /configuration-fleet-connect
title: Fleet Connect
authors: Bernt Christian Egeland
tags: []
---

# Fleet Connect

Fleet Connect connects your ground station computer straight to a drone running UAVcast-Pro. You get telemetry (MAVLink) and video over the internet, for example when the drone uses 4G/LTE.

There is no VPN to set up, no IP addresses to type, no port forwarding and no account to create.

## What it is

Fleet Connect has two parts:

- **On the drone:** a switch in UAVcast-Pro. You find it on the **Ground Control Stations** page, in the **Fleet Connect** card at the top.
- **On the ground station computer:** the free **Fleet Connect** desktop app for Windows, macOS and Linux.

Fleet Connect is an alternative to the VPN options ([ZeroTier and Tailscale](../vpn/index.md)) and to typing a ground station IP address by hand. Those options keep working as before. You can use whichever suits you.

## What you need

- A UAVcast-Pro version that includes Fleet Connect.
- An internet connection on the drone.
- An internet connection on the ground station computer.
- The Fleet Connect app on the ground station computer.

### Download the app

| Computer | Download |
|----------|----------|
| Windows | [Fleet Connect for Windows](https://rs.srv1.uavmatrix.com/fleet-connect/Fleet-Connect-setup.exe) |
| macOS | [Fleet Connect for macOS](https://rs.srv1.uavmatrix.com/fleet-connect/Fleet-Connect.dmg) |
| Linux | [Fleet Connect for Linux (AppImage)](https://rs.srv1.uavmatrix.com/fleet-connect/Fleet-Connect.AppImage) or [.deb package](https://rs.srv1.uavmatrix.com/fleet-connect/fleet-connect.deb) |

These links always give the newest version. The same downloads are on the **Fleet Connect** card in UAVcast-Pro, on the drone's page in Fleet Manager, and on the dashboard of your UAVmatrix store account.

See [Installing on Windows and macOS](#installing-on-windows-and-macos) for the warning shown on first start.

## How it works

Each drone has a permanent **Connect ID**. It is a 64-character code. It is created the first time you switch Fleet Connect on.

The Connect ID tells the app which drone to connect to. It is not a password. On its own, it gives no access to the drone.

When you connect:

1. The drone and the app each contact a UAVmatrix server.
2. The server introduces them to each other. That is all it does.
3. The drone and the app then try to connect directly to each other. Telemetry and video travel straight between the drone and the computer, for the lowest delay. The app shows **Direct**.
4. Some mobile and company networks do not allow a direct path. Then the traffic is passed along through the UAVmatrix server instead. The app shows **Relayed**. It still works, with somewhat more delay.

Everything sent between the drone and the computer is encrypted end to end. The UAVmatrix server cannot read your telemetry or video, also when it is relaying.

The app hands telemetry and video to your computer on the usual ports. Your ground station software finds the drone just as if it were on the same network:

| Data | UDP port |
|------|----------|
| Telemetry | 14550 |
| Video | 5600 |
| Second camera | 5601 (video port + 1) |

## Set up the drone

Fleet Connect is off until you switch it on.

1. In UAVcast-Pro, open **Ground Control Stations**.
2. On the **Fleet Connect** card, switch **Enable** on.
3. A Connect ID appears. Click **Copy Connect ID**.

The card now shows **Waiting for ground station**.

## Set up the computer

1. Install and open the Fleet Connect app.
2. Paste the Connect ID. You can use the **Paste** button.
3. Click **Connect**.

The first time, the app shows **Waiting for approval** and the name of this computer. Now approve it on the drone (see below).

:::tip
The app remembers the last Connect ID. Next time you start it, it reconnects by itself.
:::

## Approving a ground station

When a new computer connects, the Fleet Connect card in UAVcast-Pro shows **"computer name" wants to connect**, with a short ID. You get three buttons:

- **Allow** — full access.
- **View only** — can watch, but cannot control the drone.
- **Deny** — blocks this computer.

Until you approve it, that computer receives nothing from the drone and cannot send anything to it.

:::warning Check the short ID
The computer name in the request is chosen by the computer that connects, so anyone can pick any name. Before you allow someone else, compare the short ID with theirs. It matches the first characters of **This app's ID** in their Fleet Connect app. They find it at the bottom of the app window, and under **Help → About Fleet Connect**.
:::

### Devices and Blocked lists

- Approved computers are remembered in the **Devices** list. They connect without asking again.
- Each device shows **Connected** or **Not connected**.
- **Remove** takes a device off the list. It must ask for approval again next time.
- Denied computers go to the **Blocked** list. You can unblock them there.

Changes take effect within about a second, also while the computer is connected.

## What each ground station gets

Each device in the **Devices** list has three switches:

- **Telemetry** — sends MAVLink telemetry to this computer.
- **Video** — sends video to this computer.
- **View only** — this computer can watch, but not control.

With **View only** on, the computer still sees telemetry and can read parameters and the mission. Anything that would control the drone is not passed on. This includes arming, mode changes, parameter changes, mission uploads and manual/RC control.

:::note
**View only** needs **Telemetry** to be on.

In View only, your ground station software may show warnings. This is because some of its requests are not answered.
:::

## Sharing with another person

You can let another person receive telemetry and video from your drone, for example a colleague, a customer or an observer. You decide whether they can control the drone or only watch.

1. Send them the Connect ID.
2. They install Fleet Connect, paste the Connect ID and click **Connect**. Their app shows **Waiting for approval**.
3. Ask them for the short ID of their app. It is shown at the bottom of their Fleet Connect window, and under **Help → About Fleet Connect**.
4. On the drone, open the Fleet Connect card. Their request shows their computer name and short ID. Check that the short ID matches.
5. Click **Allow** to give full access, or **View only** to let them watch without control.

:::warning
A computer you approve with **Allow** can control the drone, just like your own ground station. Use **View only** for anyone who should only watch.
:::

### Sharing in view only mode

Choose **View only** when you approve the request. The other person then:

- sees the drone's telemetry in their ground station software,
- sees the video,
- can read the parameters and the mission,
- cannot arm, change flight mode, change parameters, upload a mission or fly the drone.

Their Fleet Connect app shows a **View only** badge, so they know why commands have no effect.

You can change this at any time in the **Devices** list on the Fleet Connect card:

- Switch **View only** on or off for that computer.
- Switch **Video** off if they only need telemetry. This saves mobile data on the drone.
- Click **Remove** to end their access. They have to ask again next time.

Changes apply within about a second, also while they are connected.

### Several ground stations at once

Several computers can be connected to one drone at the same time. Each one gets its own copy of the video. So every extra viewer uses more mobile data and upload capacity on the drone.

## Using it with your ground station software

Connect with Fleet Connect first. Then open your ground station software.

### QGroundControl

- QGroundControl listens on UDP port 14550 by default, so it finds the drone by itself.
- For video, open the video settings and choose a **UDP H.264** video stream on port **5600**.

### Mission Planner

1. In the connection box, choose **UDP**.
2. Click **Connect**.
3. Enter port **14550**.

:::tip
If nothing shows up, check that the flight controller is connected in UAVcast-Pro. With no telemetry from the flight controller, there is nothing to show.
:::

## Video in the app

If GStreamer is installed on your computer, the app shows an **Open video** button. It opens the H.264 video in its own window.

This needs the GStreamer H.264 decoder (the "libav" plugin). Without GStreamer the button is not shown. Use the video in your ground station software instead.

## Ports

You can change the ports the app uses:

1. Disconnect.
2. Open the **Ports** section in the app.
3. Change the telemetry port (default 14550) or the video port (default 5600).

A second camera always uses the video port + 1.

## More than one drone

The app connects to one drone at a time. To switch:

1. Disconnect.
2. Paste the other drone's Connect ID and connect.

The other drone asks for approval once, the first time.

## Updates

- The app checks for a new version when it starts and offers to install it.
- You can also use **File → Check for updates**.
- Updating restarts the app and disconnects from the drone.
- You can see your installed version under **Help → About Fleet Connect**.

## Closing the app

If you close the window while connected, the app asks first:

- **Minimize and stay connected** — the connection keeps running.
- **Disconnect and close** — the connection ends.

Telemetry and video stop when the app is closed.

## Security

- Everything between the drone and the computer is encrypted end to end.
- No computer gets data or control until you approve it on the drone.
- Use **View only** for people who should only watch.
- Removing or blocking a computer takes effect right away.
- The Connect ID alone gives no access.

## Privacy

- You do not need an account or registration to use Fleet Connect.
- The app has no analytics, advertising or tracking, and does not send usage statistics.
- Telemetry and video are encrypted between the drone and the computer. UAVmatrix cannot see or store them.
- To set up a connection, the drone and the app contact UAVmatrix's servers. Like any internet service, these servers see the technical information needed for this: the network addresses of the two devices, and their Connect ID and app ID. This is used only to set up and carry the connection.
- The app also contacts UAVmatrix's server to check for a new version.
- The lists of approved and blocked computers are stored on the drone, not on UAVmatrix's servers.

## Installing on Windows and macOS

:::warning Security warning when installing
The installers are not code-signed, so your computer shows a warning the first time.

- **Windows:** you see "Windows protected your PC". Click **More info**, then **Run anyway**.
- **macOS:** the first time, right-click the app and choose **Open**. Or allow it under **System Settings → Privacy & Security**.
- **Linux:** no warning. Use the AppImage or the .deb package.
:::

## Troubleshooting

### The app stays on "Connecting…"

- The drone is offline, or
- Fleet Connect is not enabled on the drone, or
- The Connect ID is wrong. It must be exactly 64 characters, using only 0–9 and a–f.

### The app shows "Waiting for approval"

Approve this computer on the drone's **Fleet Connect** card.

### The app shows "Access denied"

This computer is in the drone's **Blocked** list. Unblock it there and connect again.

### The app shows "Relayed" instead of "Direct"

The network does not allow a direct path. It still works, with more delay. Trying another network on the computer side can help.

### Connected, but no telemetry

- Check the flight controller connection in UAVcast-Pro.
- Check that **Telemetry** is on for this device.

### Connected, but no video

- Check that the camera is streaming in UAVcast-Pro.
- Check that **Video** is on for this device.
- In your ground station software, check the video port.

### Commands have no effect

This device is set to **View only**. The app shows a **View only** badge.

## Limits

- The app connects to one drone at a time.
- The built-in **Open video** button plays H.264 video.
- Both the drone and the computer need internet.
- Fleet Connect needs UAVmatrix's servers to be reachable to start a connection.

## Related Pages

- [Ground Control Stations](../ground_controller/index.md) - Where the Fleet Connect card lives
- [VPN/Private Network](../vpn/index.md) - ZeroTier or Tailscale, the alternative to Fleet Connect
- [Camera](../camera/index.md) - Configure video streaming
- [Flight Controller](../flight_controller/index.md) - Configure the MAVLink source
