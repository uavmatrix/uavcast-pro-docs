# Pair with Fleet Manager

> Connect a drone running UAVcast-Pro to UAVmatrix Fleet Manager: get the pairing code on the drone, enter it in Fleet Manager, check the connection, rename or unpair.

Pairing connects a drone running UAVcast-Pro to your organization in [UAVmatrix Fleet Manager](https://docs.uavmatrix.com/fleet-manager/), the cloud dashboard for your fleet. Once paired, the drone keeps a certificate-authenticated, encrypted connection to Fleet Manager and reconnects by itself after a reboot or a network change. You start pairing on the drone and finish it in Fleet Manager. It takes about two minutes.

## Before you begin

- UAVcast-Pro with an **activated license** on the drone. Pairing is refused without one (*No valid license found. Please activate your license first.*).
- An **admin** user in UAVcast-Pro. **Fleet Management** is hidden for read-only users.
- A Fleet Manager account with the **Owner** or **Admin** role in the organization. The drone's license must belong to a member of that organization.
- Internet on the drone, with outbound TCP **8883** (MQTT over TLS) and HTTPS (443) allowed.

## Pair the drone

1. On the drone's web interface, go to **Management → Fleet Management**.
2. Select **Connect to Fleet Manager**. The drone asks Fleet Manager for a code and shows a **Pairing Code** with an **Expires in** countdown, then *Waiting for Manager to confirm pairing...*.
3. In another tab, sign in at [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) and go to **Fleet → Pair Device**.
4. Enter the code from the drone and confirm the device details (hostname, architecture, UAVcast-Pro version) match the drone in front of you.
5. Finish the steps in Fleet Manager (VPN choice and name).
6. Back on the drone, the page switches to **Fleet Connection** with status **Connected**.

![Connect to Fleet Manager card with the Connect to Fleet Manager button](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/fleet--connect.webp)

*Management → Fleet Management on a drone that isn't paired yet. Selecting Connect to Fleet Manager replaces this card with the 8-digit Pairing Code and its Expires in countdown.*

> **The code is valid for 5 minutes**
>
> If it runs out before you enter it, select **Connect to Fleet Manager** again for a new code.

The Fleet Manager side, including organizations, VPN and what to do with the drone once it's in the fleet, is covered in [Add your first drone to Fleet Manager](https://docs.uavmatrix.com/fleet-manager/pair-uav/).

## After pairing

The **Fleet Connection** card shows:

| Field | Meaning |
| --- | --- |
| **Connected** / **Disconnected** | Whether the drone is talking to Fleet Manager right now. |
| **Device Name** | The name shown in Fleet Manager. Edit it here or in Fleet Manager. *Managed by Fleet Manager* means the name is set there. |
| **Hostname**, **Device ID** | How Fleet Manager identifies this drone. |
| **Manager URL** | The Fleet Manager instance the drone is paired with. |
| **Last Connected** | When the drone last reached Fleet Manager. |

What Fleet Manager gets from the drone: live telemetry (position, battery, GPS, flight state), UAVcast-Pro system status, and remote service control. Ground station destinations that Fleet Manager creates through stream bindings show up on [Ground Control Stations](https://docs.uavmatrix.com/uavcast-pro/ground-stations/) with a cloud icon.

To join the drone to your organization's VPN later, use the **Fleet Manager** tab on [Virtual Private Network](https://docs.uavmatrix.com/uavcast-pro/connectivity/vpn/).

## Unpair

1. Go to **Management → Fleet Management**.
2. Select **Disconnect from Fleet** and confirm.

This removes the pairing and the drone's certificates. To use the drone in Fleet Manager again, pair it again with a new code. Remove the drone from your fleet in Fleet Manager too, so it doesn't stay listed as offline.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| *No valid license found. Please activate your license first.* | Activate the license on **Application**. See [Licensing & activation](https://docs.uavmatrix.com/get-started/license-activation/). |
| Fleet Manager says the license isn't owned by a member of the organization | The license was bought with an email that isn't a member. Add that email in Fleet Manager (see [Licenses](https://docs.uavmatrix.com/fleet-manager/licenses/)), or invite that account to the organization. |
| Code expired | Select **Connect to Fleet Manager** again. |
| Paired, but status stays **Disconnected** | The drone can't reach Fleet Manager on TCP 8883. Some networks block it. Check the drone's internet connection and firewall. |

More help: [Pairing code invalid](https://docs.uavmatrix.com/troubleshooting/pairing-code-invalid/) and [Drone offline in Fleet Manager](https://docs.uavmatrix.com/troubleshooting/drone-offline-fleet-manager/).

Source: https://docs.uavmatrix.com/uavcast-pro/fleet-pairing/
