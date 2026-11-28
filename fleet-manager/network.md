# Network and VPN

> Enable your organization's private WireGuard VPN in Fleet Manager, connect drones and ground station laptops, and manage the devices table.

Every organization can have its own private VPN: a WireGuard mesh network between your drones and your ground stations, run by Fleet Manager. On it, each device gets a fixed `100.x.y.z` address and can reach the others directly, whether it is on 4G, Wi-Fi or satellite, without port forwarding or public IP addresses.

Fleet Manager uses this network to route [stream bindings](https://docs.uavmatrix.com/fleet-manager/network/stream-bindings/): video and MAVLink from a drone to the laptops where pilots run QGroundControl or Mission Planner.

All of this is on **Network** (sidebar **Fleet Management → Network**).

## When do I need VPN?

VPN is **optional**: Fleet Manager shows, maps and controls drones without it, over the drone's own encrypted connection. Turn it on when you want streams to reach ground stations.

| VPN recommended | VPN not required |
| --- | --- |
| Drone and ground station on different networks (4G, remote sites) | Drone and ground station on the same local Wi-Fi |
| You want direct video and telemetry streaming | You use a direct USB or serial telemetry link |
| You need encrypted links between sites | You are testing in a controlled environment |
| You operate across several locations |  |

## Enable VPN

Owners and Admins only.

1. Open **Network**. If VPN is off, the page shows **Enable VPN Network** with what it gives you: secure WireGuard-based connections, low-latency video and telemetry streaming, and working across any network.
2. Select **Enable VPN Network**.

![Network page with the Enable VPN Network card for an organization without VPN](https://docs.uavmatrix.com/img/screenshots/fleet-manager/network--enable.webp)

*Network page before VPN is enabled, with the three benefits and the Enable VPN Network button.*

Once VPN is on, the page shows four counters (**Total Devices**, **Online**, **UAVs**, **Ground Stations**) and three tabs: **Devices**, **Stream Bindings** and **Settings**.

![Network page Devices tab with status counters and a connected devices table](https://docs.uavmatrix.com/img/screenshots/fleet-manager/network.webp)

*Network → Devices for a large operator: Total Devices 51, Online 39, UAVs 44, Ground Stations 7, and the Connected Devices table.*

## Put drones on the VPN

Drones never need a manual command. There are two ways:

- **When pairing.** If VPN is enabled before you pair, the wizard's **VPN Connection** step joins the drone. See [Add your first drone](https://docs.uavmatrix.com/fleet-manager/pair-uav/).
- **Push to Drone.** For drones paired before VPN was enabled, the **Push to Drone** card on the **Devices** tab lists every drone that isn't on your network. Select **Connect** next to a drone to send it the VPN settings. The drone must be online.

If a drone is already on another Tailscale network, it has an **Existing VPN** badge. **Connect** then asks for confirmation (**Existing VPN Connection Detected**) and **Replace & Connect** moves it to your organization's network.

The drone appears in **Connected Devices** with the **UAV** type and its VPN address, and the UAV page gets an **Open via VPN** button.

## Put ground stations on the VPN

Ground stations join with one Tailscale command from **Connect a Device**. Follow [Connect a ground station](https://docs.uavmatrix.com/fleet-manager/connect-gcs/).

## Connected Devices

The table lists every device on the network:

| Column | Shows |
| --- | --- |
| **Status** | Online or offline on the VPN |
| **Device** | Name and hostname |
| **Type** | **UAV**, **GCS** or **Unknown**. Unknown devices have a **Configure** button. |
| **IP Address** | The device's VPN address (`100.x.y.z`) |
| **Last Check-in** | When the device was last seen on the network |

Select **Sync** to refresh the list from the VPN server. Each row's actions menu has:

- **Rename**: a readable name, for example "Field laptop – Team North".
- **Change Type**: switch between **UAV**, **GCS** and **Unknown**. For a UAV, choose which paired drone it is.
- **Remove Device**: takes the device off the network. For a drone, Fleet Manager tells it to leave the VPN, and its stream bindings are removed.

### Configure an unknown device

New ground stations show up as **Unknown**, and a banner counts the devices that need configuration. Select **Configure** and answer **What type of device is this?**

- **Ground Control Station (GCS):** a computer running QGroundControl, Mission Planner or similar. It will **receive** video and telemetry and becomes available for stream bindings.
- **Drone / UAV:** a drone with UAVcast-Pro. Choose which paired drone it is, so you can manage its streaming.

Select **Continue**, then **Complete Setup**.

## Settings tab

**Danger Zone → Delete Network** permanently deletes the VPN network, all connected devices, all authentication keys and all stream bindings. Devices drop off the network, and you'd have to connect every ground station and drone again.

Deleting the network also switches VPN off for the organization, and online UAVs are told to leave the VPN. The Network page then shows **Enable VPN Network** again, which creates a new, empty network. There is no separate switch to turn VPN off: **Delete Network** is the way to do it.

## Network requirements

| Device | Needs outbound |
| --- | --- |
| Drone (Fleet Manager connection) | HTTPS (TCP 443) to `fleet-manager.uavmatrix.com`, TCP 8883 for MQTT over TLS |
| Drone and ground station (VPN) | HTTPS (TCP 443) to `vpn-connect.uavmatrix.com`, plus UDP for WireGuard. Tailscale uses UDP 41641 by default. |

Most cellular and office networks allow this. If devices join the VPN but can't reach each other, see [VPN connected but can't reach the drone](https://docs.uavmatrix.com/troubleshooting/vpn-cant-reach-drone/).

When two devices can't reach each other directly over UDP, their traffic is relayed through Tailscale's public DERP relay servers over HTTPS (TCP 443). It stays end-to-end encrypted, but the relay adds delay, so allow outbound UDP where you can.

Source: https://docs.uavmatrix.com/fleet-manager/network/
