# Stream bindings

> Route video and MAVLink from any drone to any ground station over VPN, how Fleet Manager assigns UDP ports, and QGC and Mission Planner setup.

A stream binding tells a drone to send its video and telemetry to one ground station over your organization's VPN. One drone can stream to several ground stations, and one ground station can receive several drones. Fleet Manager picks the ports so that streams never collide.

## Before you begin

- [VPN enabled](https://docs.uavmatrix.com/fleet-manager/network/#enable-vpn) and the drone on the VPN (type **UAV** in **Connected Devices**).
- The ground station [connected and configured as **GCS**](https://docs.uavmatrix.com/fleet-manager/connect-gcs/).
- **Owner or Admin** role.
- The drone **online**. Fleet Manager sends the new destinations to UAVcast-Pro right away and waits for it to confirm.

## Add a binding

1. Go to **Network → Stream Bindings** and select **Add Binding**.
2. In **Add Stream Binding**, choose the **Drone** and the **Ground Station**.
3. Select **Create Binding**.

![Add Stream Binding dialog with drone and ground station selectors and a note on automatic ports](https://docs.uavmatrix.com/img/screenshots/fleet-manager/network--add-binding.webp)

*Add Stream Binding dialog with a drone and a ground station selected, and the note that ports are assigned automatically.*

The binding appears in the table with **Video** and **Telemetry** switched on and its **Ports** (video / telemetry). UAVcast-Pro starts sending within seconds.

If the drone doesn't confirm within 15 seconds, Fleet Manager cancels the binding with **Failed to send configuration to drone - it may be offline**. Check that the drone is online and try again.

## How ports are assigned

Ports are counted **per ground station**. Each binding gets its own block of UDP ports on that ground station, so drones never overlap:

- a **video** port for camera 1, followed by room for **camera 2** (dual stream) and **audio**, which UAVcast-Pro sends to the next ports after the video port;
- a **telemetry** port for MAVLink.

The first binding on a ground station uses the defaults, video **5600** and telemetry **14550**. Later bindings get the next free block.

A few consequences worth knowing:

- **Every ground station starts at the defaults.** The same drone can have different ports on two laptops, depending on what else each laptop receives.
- **Freed ports are reused.** Removing a binding frees its block for the next new binding to that laptop.
- **Ports don't follow the drone.** Removing and re-adding a binding can give it different ports. Always read the **Ports** column before setting up the ground station software.
- Ports are assigned by Fleet Manager and can't be edited in the app.
- A **Video Port (Camera 2)** set by hand on the drone is kept when Fleet Manager updates its destinations only from UAVcast-Pro 6.5.3. On earlier versions the next update clears it.

## Set up the ground station software

Use the ports from the binding's **Ports** column. The stream arrives from the drone's VPN address.

**QGroundControl**

- **Telemetry:** QGroundControl listens on UDP 14550 by default, so the first drone connects by itself. For more drones, open **Application Settings → Comm Links**, add a link of type **UDP** with the binding's telemetry port, and connect it.
- **Video:** in **Application Settings → Video** (under **General** in older versions), set **Source** to **UDP h.264 Video Stream** and the UDP port to the binding's video port (**UDP URL** `0.0.0.0:<port>` in current versions). QGroundControl shows one video at a time; to watch several drones, run a second instance or use a video player for the others.

**Mission Planner**

- **Telemetry:** in the connection drop-down at the top right, choose **UDP**, select **Connect** and enter the binding's telemetry port. For several drones, connect once per port; Mission Planner lists each vehicle by system ID.
- **Video:** right-click the HUD, choose **Video → Set GStreamer Source** and enter a pipeline that listens on the binding's video port. See [Mission Planner](https://docs.uavmatrix.com/uavcast-pro/ground-stations/mission-planner/) for the exact pipeline.

> **Give each drone its own MAVLink system ID**
>
> When one ground station receives several drones, each flight controller needs a unique `SYSID_THISMAV` (ArduPilot) or `MAV_SYS_ID` (PX4). Otherwise the ground station mixes them up.

More on running many vehicles from one station: [Stream to multiple ground stations](https://docs.uavmatrix.com/guides/multiple-ground-stations/).

## Pause or remove a binding

- Switch **Video** or **Telemetry** off in the table to stop that stream without losing the binding or its ports. Do this while the drone is online, so it gets the change.
- Select the trash icon to remove the binding. The ports become free for the next binding to that ground station.

Use the search box and the **Video Status** filter (**All Video**, **Video On**, **Video Off**) to find bindings in a large fleet.

![Stream Bindings table listing drones, ground stations, video and telemetry switches and ports](https://docs.uavmatrix.com/img/screenshots/fleet-manager/network--stream-bindings.webp)

*Stream Bindings tab: each binding lists its drone, ground station, Video and Telemetry switches and its ports.*

## Bindings on the UAV page

Each drone's [UAV page](https://docs.uavmatrix.com/fleet-manager/fleet/uav-details/#connected-ground-stations) lists its ground stations under **Connected Ground Stations**, with the same switches and **Pause** / **Resume**. **Add GCS** there creates a binding the same way as **Add Binding** here, with the next free ports on that ground station.

## No stream arriving?

See [No telemetry in the ground station](https://docs.uavmatrix.com/troubleshooting/no-telemetry-in-gcs/) and [No video in the ground station](https://docs.uavmatrix.com/troubleshooting/no-video-in-gcs/). The usual causes are a firewall on the laptop blocking inbound UDP, the ground station software listening on the wrong port, or the stream switched off in the binding.

Source: https://docs.uavmatrix.com/fleet-manager/network/stream-bindings/
