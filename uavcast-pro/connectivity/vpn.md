# VPN

> Put your drone and ground station on one private network with the Fleet Manager VPN, or your own Tailscale or ZeroTier network, so telemetry and video work over 4G/LTE.

Over 4G/LTE your drone gets an address from the mobile operator that your ground station can't reach. A VPN fixes that: the drone and the ground station join the same private network and get fixed addresses on it, wherever they are and whatever network they use. Open **Virtual Private Network** in the sidebar.

The quickest way is the **Fleet Manager VPN**, which is included with your UAVcast-Pro license. If you already run your own Tailscale tailnet or ZeroTier network, UAVcast-Pro can join that instead.

![Virtual Private Network page with VPN enabled, Tailscale selected, the Fleet Manager tab, and VPN Information showing Not Connected](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/private-network.webp)

*Virtual Private Network with Tailscale selected on a drone that is not paired or logged in yet.*

## Which one should I use?

|  | Fleet Manager VPN | Tailscale | ZeroTier |
| --- | --- | --- | --- |
| Account | Your Fleet Manager organization (included with your license) | Your own Tailscale account | Your own ZeroTier network (self-managed) |
| Set up on the drone | One click during or after pairing | Log in with a browser link or an auth key | Paste a network ID |
| Ground stations | Joined from Fleet Manager's **Network** page, streams set with stream bindings | Join your tailnet | Join your network |
| Best for | Most operators, and every fleet | Teams already on Tailscale | Teams already on ZeroTier |

The drone can be on one VPN at a time through this page.

> **UAVnet is being retired**
>
> UAVnet, UAVmatrix's hosted ZeroTier controller at uavnet.uavmatrix.com, is being discontinued in favour of Fleet Manager. If your drones use a UAVnet network, move them to the Fleet Manager VPN. The **Open UAVNet Controller** button on this page opens UAVnet.

## Fleet Manager VPN

The Fleet Manager VPN is your organization's private network, run by Fleet Manager on the Tailscale client. You don't need a Tailscale account.

1. In Fleet Manager, open **Network** and select **Enable VPN Network** if it isn't on yet. See [Network and VPN](https://docs.uavmatrix.com/fleet-manager/network/).
2. [Pair the drone](https://docs.uavmatrix.com/uavcast-pro/fleet-pairing/) and keep **Enable VPN for this UAV** ticked in the pairing wizard. A drone that is already paired joins from the **Fleet Manager** tab on this page (see below), or with **Push to Drone** on Fleet Manager's **Network** page.
3. Put each ground station on the network from Fleet Manager's **Network** page: [Connect a ground station](https://docs.uavmatrix.com/fleet-manager/connect-gcs/).
4. Send streams to it with a [stream binding](https://docs.uavmatrix.com/fleet-manager/network/stream-bindings/). Fleet Manager adds the destination on the drone's [Ground Control Stations](https://docs.uavmatrix.com/uavcast-pro/ground-stations/) page for you.

A step-by-step flight setup over 4G is in [Fly beyond visual range over 4G](https://docs.uavmatrix.com/guides/bvlos-4g/).

## Tailscale

Use this for your own tailnet, or for the Fleet Manager VPN on a drone that is already paired. UAVcast-Pro installs Tailscale. Choose how the drone logs in on one of the three tabs.

**Web Login**

1. Set **Enable VPN** to **Yes** and choose **Tailscale** in **Services**.
2. On **Web Login**, select **Generate Login URL**, then **Authenticate this device**.
3. Log in to Tailscale in the new tab and approve the device.
4. Back in UAVcast-Pro the status changes to **Connected** and shows the **IPv4 Address**, **Host Name** and **Tailnet**.

**Auth Key**

1. In the [Tailscale admin console](https://login.tailscale.com/admin/settings/keys), generate an auth key. Make it pre-approved; make it reusable if you set up several drones.
2. In UAVcast-Pro, choose **Tailscale**, open **Auth Key**, paste the key (`tskey-auth-…`) and optionally set **Hostname (Optional)**.
3. Select **Connect with Auth Key**.

Use this for drones without a browser at hand, or for setting up many drones the same way.

**Fleet Manager**

If the drone is [paired with Fleet Manager](https://docs.uavmatrix.com/uavcast-pro/fleet-pairing/) and your organization has the VPN enabled, select **Connect to Fleet Manager VPN**. Connecting can take up to 30 seconds. The status then shows **Connected to Fleet Manager**.

Not paired yet? The tab says **Not Paired with Fleet Manager** and links to **Go to Fleet Manager Pairing**.

Install Tailscale on the ground station, log in to the same tailnet, and use its Tailscale IP (`100.x.y.z`) as the destination on Ground Control Stations.

When connected, **Interface Down** takes the Tailscale interface down without logging out, **Interface Up** brings it back, and **Logout** removes the device from the tailnet.

> **The Fleet Manager VPN replaces your own Tailscale login**
>
> The Fleet Manager VPN runs on Tailscale with Fleet Manager's own login server. Connecting to it logs the drone out of your own tailnet. If your SSH session runs over that tailnet, it drops. Do this from the local network.

## ZeroTier

Use this if you run your own ZeroTier network, for example in ZeroTier Central or on your own controller.

### Join the drone

1. In UAVcast-Pro, go to **Virtual Private Network**.
2. Set **Enable VPN** to **Yes**.
3. In **Services**, choose **ZeroTier**.
4. Paste your 16-character network ID into **Network ID** and select **Join Network**.
5. Authorize the drone in your ZeroTier controller if the network is private. The **ZeroTier Network** panel then shows **Connected** and the **Device IP**.

**ACCESS_DENIED** means the member isn't authorized yet.

### Join the ground station

1. Install [ZeroTier One](https://www.zerotier.com/download/) on the ground station computer.
2. Join the same network ID: on Windows and macOS from the ZeroTier tray or menu-bar icon (**Join New Network**); on Linux with `sudo zerotier-cli join <network-id>`.
3. Authorize it in your controller and note the IP address it gets.

On [Ground Control Stations](https://docs.uavmatrix.com/uavcast-pro/ground-stations/), set **Destination IP or Host** to the ground station's **ZeroTier** IP. Telemetry and video now go through the VPN.

> **Switching between Wi-Fi and 4G**
>
> ZeroTier and Tailscale follow the best available network. You can start on Wi-Fi at the field and the link moves to the modem when Wi-Fi goes out of range, without changing any address.

## Settings reference

| Setting | Default | Values | Notes |
| --- | --- | --- | --- |
| **Enable VPN** | **No** | **Yes**, **No** |  |
| **Services** | **ZeroTier** | **ZeroTier**, **Tailscale** | Disabled until VPN is enabled. |
| **Network ID** (ZeroTier) | empty | 16-character ZeroTier network ID | From your own ZeroTier controller. |
| **Auth Key** (Tailscale) | empty | `tskey-auth-…` |  |
| **Hostname (Optional)** (Tailscale) | system hostname | text | Name shown in the Tailscale admin console. |

## Troubleshooting

| Symptom | Check |
| --- | --- |
| ZeroTier shows **ACCESS_DENIED** | Authorize the member in your ZeroTier controller. |
| Connected, but no telemetry at the ground station | The destination still uses the LAN IP. Use the ground station's VPN IP, and allow UDP 14550 and 5600 in its firewall. |
| *No VPN Information Available* | VPN is disabled or the service isn't running. Check **Enable VPN** and the **Action Logs**. |
| Tailscale web login shows *No Authentication URL* | Use the **Auth Key** tab instead. |

The interfaces appear on the [Networks](https://docs.uavmatrix.com/uavcast-pro/connectivity/networks/) page as `zt…` (ZeroTier) or `tailscale0`, marked **VPN**.

Still stuck? See [VPN connected but the drone can't be reached](https://docs.uavmatrix.com/troubleshooting/vpn-cant-reach-drone/).

Source: https://docs.uavmatrix.com/uavcast-pro/connectivity/vpn/
