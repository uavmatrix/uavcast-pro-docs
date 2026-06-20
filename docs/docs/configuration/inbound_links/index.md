---
slug: /configuration-inbound-links
title: Inbound Links
authors: Bernt Christian Egeland
tags: []
---

# Inbound Links

:::info Availability
Available from UAVcast-Pro **v6.4.1**.
:::

Inbound Links let this vehicle **listen** for an incoming MAVLink stream over the network and merge it into its own MAVLink network, all the way down to the flight controller. It is the inbound counterpart to a [Ground Control Station](/docs/6.x/configuration-ground-controller) destination: instead of sending telemetry *out* to a remote address, an inbound link opens a local UDP port and accepts whatever connects to it.

Find the page under **Operations → Inbound Links**.

## What it's for

A Ground Control Station destination is outbound only, the vehicle pushes its telemetry and video out to an IP you give it. That is perfect for feeding a laptop or tablet, but it means the vehicle has nothing listening for data coming the other way. Inbound Links fill that gap, so any remote MAVLink source can reach this vehicle over the network instead of a wired or radio serial link.

Typical uses:

- **Vehicle to vehicle (follow / swarm):** a leader vehicle streams its position to a follower, so the follower can run ArduPilot Follow mode over 4G or a VPN instead of a pair of telemetry radios.
- **Companion computer:** a process on another machine injects MAVLink into the vehicle.
- **Secondary ground station:** a second GCS that connects *in* to the vehicle rather than the vehicle pushing out to it.

## How it works

Each inbound link binds a UDP port on this device and listens. The remote source simply sends its MAVLink stream to this device's address on the matching port. Incoming messages are merged into the vehicle's MAVLink network and forwarded down to the flight controller, exactly as if they had arrived over a wired link.

Because everything is merged into one stream, your flight controller (and any ground station you are already connected with) will see the remote system appear as an additional MAVLink system. That is expected.

## Adding an Inbound Link

1. Open **Inbound Links** and click **Add Link**.
2. Configure the fields:
   - **Name:** a friendly label (e.g. "Leader rover").
   - **Listen Port:** the UDP port to listen on (default `14550`). This must match the port the remote source sends to.
   - **Telemetry Only:** when on, inbound commands are blocked and only telemetry is accepted. Recommended unless the remote peer should be allowed to command this vehicle.
3. Toggle **Enable Link**. A new link starts disabled until you enable it.

## Configuration fields

### Name

A friendly name to identify the link. It does not affect routing.

### Listen Port

The UDP port this device binds and listens on. The remote source must send to this exact port. Ports `12550` and `12551` are reserved for internal use, and two enabled links cannot share the same port.

### Enable Link

Turns the listener on or off. Disabled links are ignored.

### Telemetry Only

Blocks inbound command and control messages (mode changes, arming, mission upload, RC override and similar) while still accepting telemetry such as position and heartbeat. This lets a peer feed data in without being able to command the vehicle. On by default.

## Example: Follow mode over the network

This replaces the pair of SiK radios many people wire between a leader and a follower.

**On the leader** (the vehicle being followed), use the existing [Ground Control Stations](/docs/6.x/configuration-ground-controller) page:

1. Click **Add Destination**, set the **IP** to the follower's address (for example its Tailscale IP) and the **Telemetry Port** to `14550`, and enable telemetry.

**On the follower** (the vehicle that tracks), use **Inbound Links**:

1. Click **Add Link**, set the **Listen Port** to `14550` (the same port the leader is sending to), leave **Telemetry Only** on, and enable it.

The leader's telemetry port and the follower's listen port must be identical. Then set the follower to **FOLLOW** mode.

:::tip Flight controller settings
The link only carries the data, the follow behaviour itself is configured on the autopilot:

- Give each vehicle a **distinct** `SYSID_THISMAV` (for example leader `3`, follower `1`). If both share an ID the follower cannot tell the leader apart from itself.
- On the follower, set `FOLL_ENABLE = 1` and `FOLL_SYSID` to the leader's system ID, then tune `FOLL_OFS_*`, `FOLL_OFS_TYPE`, `FOLL_DIST_MAX` and `FOLL_POS_P` for the formation and how tightly it tracks.
:::

Only the follower needs an inbound link, the leader just uses a normal Ground Control Station destination. To have several followers track one leader, add a destination on the leader for each follower's IP, and an inbound link on each follower.
