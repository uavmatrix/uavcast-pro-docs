# Onboard a fleet of drones with Fleet Manager

> Plan licenses, then name, pair and connect 20+ UAVcast-Pro drones to UAVmatrix Fleet Manager, with team roles, the organization VPN and stream bindings.

This guide walks through bringing a fleet of, say, 20 drones into [UAVmatrix Fleet Manager](https://docs.uavmatrix.com/fleet-manager/) in one go: licenses, naming, pairing, the organization VPN, and wiring ground stations to drones. It assumes each drone already runs UAVcast-Pro with its flight controller connected and internet access.

## 1. Plan the licenses

Two rules decide whether a drone can be paired:

- **Every drone needs an active UAVcast-Pro license** on the device. One license can cover several drones: its **Allowed Devices** count is the number of slots. For 20 drones you need 20 slots in total, across one or more licenses.
- **The license must be owned by a member of the organization** you pair into. Fleet Manager matches the e-mail address of the store account that bought the license with the members' e-mail addresses. If purchasing bought the licenses under another account, invite that account to the organization, or ask support to add the purchasing e-mail to your user.

Check this before the pairing day: a drone whose license belongs to an outsider is refused with **License is not owned by any member of this organization**.

## 2. Set up the organization and team

1. Sign in to [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) with your uavmatrix.com account and create the organization. See [Set up an organization](https://docs.uavmatrix.com/fleet-manager/set-up-organization/).
2. Under **Team**, invite your people. Owners and Admins can pair, control and remove drones; Viewers can only watch. See [Roles and permissions](https://docs.uavmatrix.com/fleet-manager/team/roles-and-permissions/).
3. Split the pairing work between two or three Admins if you have many drones. Each user can complete 5 pairings per minute; the limit stops brute-force guessing, and also slows down one person pairing 20 drones back to back.

## 3. Name every drone before pairing

The name a drone has in UAVcast-Pro becomes its name in Fleet Manager. Agree on a pattern, for example `SURVEY-01` … `SURVEY-20`, and label the airframes to match.

On each drone, open UAVcast-Pro → **Fleet Management** and fill in **Device Name**. Without a name the drone appears with its hostname. You can rename it in Fleet Manager later.

## 4. Pair each drone

Repeat for every drone. With two browser windows side by side (the drone's UAVcast-Pro and Fleet Manager), each takes about a minute.

1. In UAVcast-Pro, open **Fleet Management** and press **Connect to Fleet Manager**. An 8-digit **Pairing Code** appears. It expires after 5 minutes.
2. In Fleet Manager, go to **Fleet → Pair Device**.
3. **Select Organization**, then **Enter Pairing Code**.
4. **Confirm Device**: check the name, hostname, architecture and UAVcast version, so you pair the drone you think you are pairing.
5. **VPN Connection**: tick **Enable VPN for this UAV** if ground stations should reach the drone over the organization's VPN. If the drone already uses Tailscale, **Replace existing VPN with Fleet Manager network** moves it to the organization's network.
6. **Complete Pairing**. In UAVcast-Pro, **Fleet Connection** changes to **Connected**.

![Fleet Manager pairing wizard on the Confirm Device step showing UAV name, hostname, architecture and UAVcast version](https://docs.uavmatrix.com/img/screenshots/fleet-manager/pair-device--confirm.webp)

*Fleet → Pair Device, Confirm Device step.*

Errors and what they mean: [Pairing code invalid or expired](https://docs.uavmatrix.com/troubleshooting/pairing-code-invalid/). The full wizard is described in [Pair your first UAV](https://docs.uavmatrix.com/fleet-manager/pair-uav/).

## 5. Check the fleet

Open **Fleet**. Every drone should be listed as online. On **Fleet Map**, each drone appears at its GPS position once its flight controller has a fix. A drone that shows **Offline** has not reported for 20 seconds: see [Drone offline in Fleet Manager](https://docs.uavmatrix.com/troubleshooting/drone-offline-fleet-manager/).

## 6. Connect the ground stations

1. Go to **Network** and press **Enable VPN Network** if the organization's VPN is not on yet.
2. Press **Connect a Device**, choose **Ground Control Station (GCS)** and copy the **GCS Connection Command**. Run it in a terminal **on the ground station laptop**, with Tailscale installed. Do not paste it into UAVcast-Pro.
3. The laptop appears under **Ground Stations** once it is connected.
4. Under **Stream Bindings**, press **Add Stream Binding** and link each drone to the ground station that should receive it. The drone must be online, because Fleet Manager pushes the destination to it.
5. Each binding gets its own block of ports on that ground station: the first drone uses the defaults, 5600 (video) and 14550 (telemetry), and each further drone gets the next free block. Set up the ground station software with the ports shown on each binding.

![Fleet Manager Network page with stream bindings linking several drones to one ground station with auto-assigned ports](https://docs.uavmatrix.com/img/screenshots/fleet-manager/network--stream-bindings.webp)

*Network → Stream Bindings: each binding shows its ground station and its video and telemetry ports.*

Details: [Connect a ground station](https://docs.uavmatrix.com/fleet-manager/connect-gcs/) and [Stream bindings](https://docs.uavmatrix.com/fleet-manager/network/stream-bindings/).

> **Dual stream and audio**
>
> Each binding gets its own block of ports on the ground station, with room for the drone's second camera and audio after its video port, so several drones can share one ground station.

## 7. Day-to-day

- **Re-pair required**: when Fleet Manager shows this badge, re-pair the drone once from UAVcast-Pro. It keeps its name and history. See [Remove or transfer a UAV](https://docs.uavmatrix.com/fleet-manager/fleet/remove-or-transfer/).
- **Replacing a drone's SD card or board** frees nothing by itself: unregister the old device under **Application → License Manager → Activated Devices** on any drone that uses the same license, then pair the new one.
- **Remote work on a drone**: the UAV details page in Fleet Manager has a terminal, logs and actions such as reboot. See [UAV details](https://docs.uavmatrix.com/fleet-manager/fleet/uav-details/).

Source: https://docs.uavmatrix.com/guides/fleet-onboarding/
