# Connect a ground station

> Join a QGroundControl or Mission Planner laptop to your organization's VPN with one Tailscale command and start receiving drone video and telemetry.

A ground station (GCS) is the laptop or PC where a pilot runs QGroundControl, Mission Planner or similar. To receive a drone's video and telemetry through Fleet Manager, the ground station joins your organization's private VPN. After that you decide which drones stream to it with [stream bindings](https://docs.uavmatrix.com/fleet-manager/network/stream-bindings/).

This takes about five minutes per ground station.

## Before you begin

- **Owner or Admin role.** Viewers can see the **Network** page but not the auth key or the connection command, and can't enable VPN or configure devices. They see *Ask an Owner or Admin of this organization to connect a new device to the VPN.*
- **VPN enabled** for the organization. If **Network** shows **Enable VPN Network**, select it first. See [Network and VPN](https://docs.uavmatrix.com/fleet-manager/network/).
- **Admin rights on the ground station** computer, to install Tailscale and run one command.
- At least one drone [paired](https://docs.uavmatrix.com/fleet-manager/pair-uav/) and joined to the VPN.

> **Fleet Manager runs its own VPN server**
>
> The organization's network uses the Tailscale client but Fleet Manager's own control server, not a tailscale.com account. You don't need to sign up for Tailscale. If the computer is already on another Tailscale network, the command below moves it to your organization's network.

## Join the ground station to the VPN

1. **Install Tailscale** on the ground station from [tailscale.com/download](https://tailscale.com/download) (Windows, macOS or Linux).

2. **Copy the connection command.** In Fleet Manager, open **Network**, stay on the **Devices** tab and find **Connect a Device**. Under **GCS Connection Command**, copy the command. It looks like this:

   ```bash
   tailscale up --authkey=<your-org-key> --login-server=https://vpn-connect.uavmatrix.com
   ```

   ![Connect a Device card with the GCS Computer Only warning and the tailscale up command](https://docs.uavmatrix.com/img/screenshots/fleet-manager/network--connect-device.webp)

   *Network → Devices → Connect a Device, with the GCS Computer Only warning and the copy button next to the command (auth key blurred).*

   > **For the ground station only**
   >
   > Don't paste this command into UAVcast-Pro or run it on the drone. Drones join the VPN during pairing, or with **Push to Drone** on the same page.

3. **Run the command as administrator.**

   - Windows: open **Terminal** or **PowerShell** with **Run as administrator** and paste the command.
   - macOS and Linux: paste it in a terminal, prefixed with `sudo`.

   When the command returns without an error, the computer is on the network. `tailscale status` lists the drones and other devices it can see.

4. **Find the computer in Connected Devices.** Back in Fleet Manager, the computer appears in **Connected Devices** with its hostname and a `100.x.y.z` address. Select **Sync** if it doesn't show up within a few seconds. A new device has the type **Unknown**, and a banner says how many devices need configuration.

5. **Mark it as a ground station.** In the **Type** column, select **Configure**. Choose **Ground Control Station (GCS)**, select **Continue**, then **Complete Setup**.

   ![Device setup wizard asking What type of device is this, with Ground Control Station selected](https://docs.uavmatrix.com/img/screenshots/fleet-manager/network--setup-wizard.webp)

   *Configure dialog: What type of device is this? with Ground Control Station (GCS) selected for a laptop named ops-laptop-03.*

The computer now has the **GCS** badge and appears in the **Ground Station** list when you add a stream binding.

> **Name ground stations after the person or position**
>
> Use **Rename** in the device's actions menu (the **⋯** button) to give it a name like "Field laptop – Team North". Binding lists are much easier to read in a large fleet.

## Start receiving a drone

1. Go to **Network → Stream Bindings** and select **Add Binding**.

2. Choose the **Drone** and the **Ground Station**, then select **Create Binding**. The drone must be online.

3. Read the ports in the **Ports** column, for example `5600 / 14550`.

4. In your ground control software, listen on those ports:

   - **QGroundControl:** telemetry on UDP 14550 connects automatically. For video, open **Application Settings → Video** (under **General** in older versions), set **Source** to **UDP h.264 Video Stream** and the UDP port to the binding's video port (**UDP URL** `0.0.0.0:<port>` in current versions). For further drones, add a UDP link on each binding's telemetry port under **Application Settings → Comm Links**.
   - **Mission Planner:** choose **UDP** in the connection drop-down, select **Connect** and enter the telemetry port.

More detail, including many drones on one ground station: [Stream bindings](https://docs.uavmatrix.com/fleet-manager/network/stream-bindings/) and [Stream to multiple ground stations](https://docs.uavmatrix.com/guides/multiple-ground-stations/).

## The auth key

The command contains a reusable key for your organization's network. It is valid for 90 days and can be used on any number of ground stations. Owners and Admins can select the refresh button in **Connect a Device** to create a new key. Ground stations that have already joined stay connected. If the card says **No valid auth key available. Generate a new key to connect devices.**, the key has expired. Create a new one.

## Remove a ground station

On **Network → Devices**, open the device's actions menu and select **Remove Device**. This removes it from the VPN and deletes its stream bindings. To connect it again later, run the connection command again.

## Troubleshooting

- **Command fails or times out:** check that the computer can reach `https://vpn-connect.uavmatrix.com` and that the key isn't expired.
- **Ground station connected but no telemetry or video:** check that there is a binding, that **Video** and **Telemetry** are switched on, and that the ground station software listens on the binding's ports. The Windows firewall often blocks inbound UDP for a new app. See [No telemetry in the ground station](https://docs.uavmatrix.com/troubleshooting/no-telemetry-in-gcs/) and [No video in the ground station](https://docs.uavmatrix.com/troubleshooting/no-video-in-gcs/).
- **Can't reach the drone over VPN:** see [VPN connected but can't reach the drone](https://docs.uavmatrix.com/troubleshooting/vpn-cant-reach-drone/).

Source: https://docs.uavmatrix.com/fleet-manager/connect-gcs/
