# VPN connected but can't reach the drone

> Fleet Manager VPN, Tailscale or ZeroTier says connected but you can't ping the drone? Check authorization, the network or tailnet, internet and the GCS IP.

Both the drone and your laptop say they are on the VPN, but `ping` to the drone's VPN address times out, the web interface won't open over the VPN, or telemetry and video don't arrive.

| What you see | Likely cause | Start at |
| --- | --- | --- |
| ZeroTier network shows ACCESS_DENIED, or no IP address | The drone is not authorized on the network | [Check 1](https://docs.uavmatrix.com/troubleshooting/vpn-cant-reach-drone/#check-1) |
| Drone is fine, the laptop gets no address or the wrong one | The laptop joined another network or tailnet | [Check 2](https://docs.uavmatrix.com/troubleshooting/vpn-cant-reach-drone/#check-2) |
| Tailscale worked for weeks, then stopped | The device key expired | [Check 3](https://docs.uavmatrix.com/troubleshooting/vpn-cant-reach-drone/#check-3) |
| VPN on the drone never connects in the field | The drone has no internet over the modem | [Check 4](https://docs.uavmatrix.com/troubleshooting/vpn-cant-reach-drone/#check-4) |
| Ping works, but no telemetry or video | The ground station destination uses the wrong IP | [Check 5](https://docs.uavmatrix.com/troubleshooting/vpn-cant-reach-drone/#check-5) |

## Check 1: Authorize the drone on the network

**ZeroTier:**

1. In UAVcast-Pro, open **Virtual Private Network**. Check that **Enable VPN** is **Yes**, **Services** is **ZeroTier**, and the **Network ID** is the one from your ZeroTier controller.
2. Look at your network under **Connected Networks**. If its status badge says **ACCESS_DENIED**, the drone joined but is not authorized.
3. In your ZeroTier controller, open the network and authorize the member with the drone's node ID.
4. Back in UAVcast-Pro, wait until the network shows status `OK` and an IP address. That is the address you use from the laptop.

On a private ZeroTier network, every device that joins (drone, laptop, tablet) must be authorized once in the controller before it gets an address. (UAVnet networks are private too; UAVnet is being retired, so move to the Fleet Manager VPN.)

**Tailscale:** the drone shows **Connected** with an **IPv4 Address** (100.x.y.z) when it is in. If it says **Not Connected**, use **Web Login → Generate Login URL**, or the **Auth Key** tab with a key from your Tailscale admin console.

## Check 2: Put the laptop on the same network

Both ends must be on the same ZeroTier network or the same tailnet.

- **ZeroTier**: on the laptop, join the same Network ID and authorize the laptop in your controller too. On Windows, check the ZeroTier tray icon; on Linux run `sudo zerotier-cli listnetworks`. The status must be `OK`.
- **Tailscale**: a Tailscale client is on one tailnet at a time. On the laptop, run `tailscale status`. The drone must be in the list. If not, the laptop is logged in to another account or tailnet.
- **Fleet Manager VPN**: if the drone was paired with Fleet Manager and VPN, it is on your organization's network, not your personal Tailscale. Connect the laptop with the command Fleet Manager gives under **Network** (`tailscale up --login-server=… --authkey=…`) and run it **on the laptop, never on the drone**. See [Connect a ground station](https://docs.uavmatrix.com/fleet-manager/connect-gcs/).

> **Pairing can replace the drone's VPN**
>
> When you pair a drone in Fleet Manager with **Replace existing VPN with Fleet Manager network**, the drone leaves its current Tailscale network and joins the organization's network. Laptops on the old tailnet can no longer reach it.

## Check 3: Expired Tailscale key

Tailscale device keys expire. When the drone's key expires it drops off the tailnet until it logs in again. The **Expires** field on the **Virtual Private Network** page shows the date. In the Tailscale admin console you can turn off key expiry for the drone, so it doesn't drop off in the middle of a project.

## Check 4: The drone needs internet first

The VPN runs over the drone's own internet connection. If the modem has no internet, the VPN shows as disconnected or never gets an address. Fix the connection first: [Modem connected, no internet](https://docs.uavmatrix.com/troubleshooting/modem-no-internet/).

## Check 5: Reachable, but no data

If `ping <drone-vpn-ip>` works:

- **Web interface**: open `http://<drone-vpn-ip>/`. The live preview also needs port 8889 to be reachable over the VPN.
- **Telemetry and video**: these are sent *from* the drone *to* the address in **Ground Control Stations → Destination IP or Host**. It must be the laptop's VPN address, not the drone's, and not the laptop's Wi-Fi address. Then see [No telemetry](https://docs.uavmatrix.com/troubleshooting/no-telemetry-in-gcs/) or [No video](https://docs.uavmatrix.com/troubleshooting/no-video-in-gcs/).
- **Slow, but working**: Tailscale shows the **Relay** in use. A relayed connection works but adds delay. Some cellular networks don't allow direct connections, so a relay may be the best you get on that carrier.

## Still unreachable?

[Download the logs](https://docs.uavmatrix.com/troubleshooting/collect-logs/) with **VPN Manager** selected and send them to **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, with the output of `zerotier-cli listnetworks` or `tailscale status` from both the drone and the laptop.

Related: [VPN settings](https://docs.uavmatrix.com/uavcast-pro/connectivity/vpn/) · [Fleet Manager network](https://docs.uavmatrix.com/fleet-manager/network/)

Source: https://docs.uavmatrix.com/troubleshooting/vpn-cant-reach-drone/
