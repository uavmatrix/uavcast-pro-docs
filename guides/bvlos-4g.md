# Fly beyond visual range over 4G

> Fly a drone over 4G/LTE with UAVcast-Pro, a cellular modem and the Fleet Manager VPN, with telemetry and live video in QGroundControl or Mission Planner.

This guide takes a drone from the bench to a flight over the cellular network: telemetry and live video in QGroundControl or Mission Planner, wherever both ends have coverage. It uses the VPN that comes with [Fleet Manager](https://docs.uavmatrix.com/fleet-manager/), which is included with your UAVcast-Pro license, so neither side needs a public IP or port forwarding.

**Time:** about an hour. **You need:**

- A companion computer (Raspberry Pi 4 or 5, or another [supported board](https://docs.uavmatrix.com/reference/supported-hardware/)) with UAVcast-Pro [installed](https://docs.uavmatrix.com/get-started/installation/) and the [license activated](https://docs.uavmatrix.com/get-started/license-activation/).
- A MAVLink flight controller (ArduPilot or PX4), a USB data cable or TELEM wiring.
- A USB 4G/LTE modem and a data SIM. Disable the SIM PIN in a phone first, it saves trouble.
- A camera, if you want video.
- A laptop with QGroundControl or Mission Planner, and the [Tailscale client](https://tailscale.com/download).
- A [Fleet Manager organization](https://docs.uavmatrix.com/fleet-manager/set-up-organization/) where you are Owner or Admin.

> **Rules for beyond-visual-line-of-sight flight**
>
> Flying beyond visual line of sight (BVLOS) needs an authorization in most countries. UAVcast-Pro gives you the link; the operational approval, the risk assessment and the fail-safes are your responsibility.

## How it fits together

```text
Flight controller ──USB/UART── UAVcast-Pro ──4G──► internet ──► laptop
                                    │                               │
                                    └──── Fleet Manager VPN ────────┘
                  telemetry and video on the ports of the stream binding
```

The drone sends MAVLink and H.264 video to your laptop's VPN address. The VPN makes the laptop reachable over 4G as if both were on the same local network.

> **Prefer to run your own VPN?**
>
> You can use your own ZeroTier network or Tailscale tailnet instead of Fleet Manager: see [VPN](https://docs.uavmatrix.com/uavcast-pro/connectivity/vpn/) and [Remote access with Tailscale](https://docs.uavmatrix.com/guides/remote-access-tailscale/). Steps 1, 2 and 7 to 9 below stay the same.

## 1. Connect the flight controller

1. Plug the flight controller into the companion computer over USB, or wire a TELEM port (TX→RX, RX→TX, GND→GND) and enable MAVLink on that port (`SERIALx_PROTOCOL = 2` on ArduPilot, `MAV_x_CONFIG` on PX4).
2. In UAVcast-Pro, open **Flight Controller → Connection**. Choose **USB** or **UART / Serial** under **Link type**, and leave **Port** and **Baud rate** on **Automatic**.
3. Wait for the status **Connected** and a vehicle in **Vehicle**. If it stays at **No heartbeat**, see [No MAVLink heartbeat](https://docs.uavmatrix.com/troubleshooting/no-mavlink-heartbeat/).

## 2. Set up the modem

1. Plug in the modem and open **Modem**.
2. Set **Enable cellular Modem?** to **Yes** and pick the **Modem type**: **HiLink** for modems that act as a USB network adapter (for example Huawei E3372h), **Traditional (PPP)** for the rest.
3. For a Traditional modem, leave **Access Point Name (Optional)** empty. UAVcast-Pro finds the APN for your SIM and remembers it.
4. Under **Modem Information**, wait for an operator and an IPv4 address.
5. Go to **Networks** and choose **Modem Priority (Outdoor Mode)**, so traffic leaves over the modem even when Wi-Fi is around.

Details: [Cellular modem](https://docs.uavmatrix.com/uavcast-pro/connectivity/cellular-modem/). If the modem connects but nothing loads: [Modem connected, no internet](https://docs.uavmatrix.com/troubleshooting/modem-no-internet/).

## 3. Turn on the VPN in Fleet Manager

In Fleet Manager, open **Network**. If it shows **Enable VPN Network**, select it. This creates your organization's private network. See [Network and VPN](https://docs.uavmatrix.com/fleet-manager/network/).

## 4. Pair the drone and put it on the VPN

1. In UAVcast-Pro, go to **Management → Fleet Management** and select **Connect to Fleet Manager**. Note the 8-digit code.
2. In Fleet Manager, go to **Fleet → Pair Device**, enter the code and confirm the device.
3. On the **VPN Connection** step, keep **Enable VPN for this UAV** ticked and select **Complete Pairing**.
4. The drone appears under **Network → Connected Devices** with the **UAV** type and a `100.x.y.z` address.

Full walkthrough: [Add your first drone to Fleet Manager](https://docs.uavmatrix.com/fleet-manager/pair-uav/).

## 5. Put the laptop on the VPN

1. Install Tailscale on the laptop. You don't need a Tailscale account: Fleet Manager runs its own VPN server.
2. In Fleet Manager, on **Network → Devices**, copy the **GCS Connection Command** under **Connect a Device** and run it on the laptop as administrator (`sudo` on macOS and Linux).
3. The laptop appears in **Connected Devices**. In the **Type** column, select **Configure**, choose **Ground Control Station (GCS)** and select **Complete Setup**.
4. Test: `ping <drone VPN IP>` from the laptop. You can now open the drone's web interface at `http://<drone VPN IP>/`.

Details and screenshots: [Connect a ground station](https://docs.uavmatrix.com/fleet-manager/connect-gcs/).

## 6. Send telemetry and video to the laptop

1. In Fleet Manager, go to **Network → Stream Bindings** and select **Add Binding**.
2. Choose the drone and the laptop, then select **Create Binding**. Fleet Manager sends the destination to the drone; it appears on the drone's **Ground Control Stations** page with a cloud icon.
3. Read the binding's video and telemetry ports in the **Ports** column. For the first drone on a laptop they are the defaults, `5600` and `14550`.
4. On the laptop, allow incoming UDP on those ports in the firewall (commands in [No video, check 3](https://docs.uavmatrix.com/troubleshooting/no-video-in-gcs/#check-3)).

## 7. Start the camera

1. Open **Camera → Camera settings**, set **Enable Camera?** to **Yes** and choose the camera in **Select Camera**.
2. For LTE, start with **Resolution** 1280×720, **Select FPS** 15–20 and **Bitrate:** around 1000–1500 kbps.
3. Settings save as you change them. Press **Start** if the camera isn't running yet.

## 8. Open the ground station

- **QGroundControl** connects to UDP 14550 by itself. For video, set **Source** to **UDP h.264 Video Stream** on the binding's video port in the video settings.
- **Mission Planner**: choose **UDP**, press **Connect**, enter the binding's telemetry port. For video, set the GStreamer source as described on the [Mission Planner](https://docs.uavmatrix.com/uavcast-pro/ground-stations/mission-planner/) page.

## 9. Test on 4G before you fly

1. Turn off the companion computer's Wi-Fi, or take the drone away from it, so the only path is the modem.
2. Check the dashboard: **Cellular** connected, **VPN** connected, **Ground station** *Sending*, **Video** running.
3. Watch the link for 10 minutes on the ground, ideally at the take-off site. Look for video freezes and telemetry gaps.
4. On **Flight Controller → Connection**, check **GCS Failsafe Information**. If it shows **Warning - Failsafe Disabled**, enable the GCS failsafe on the flight controller (ArduPilot: `FS_GCS_ENABL` on Plane, `FS_GCS_ENABLE` on Copter; PX4: `NAV_DLL_ACT`) and choose its action, so the drone acts on its own when the link drops.

> **Record every flight**
>
> Turn on **Record automatically when armed** under **Camera → Recordings → Settings**. You get the video and a telemetry log of every flight for later review: [Record flights and review them](https://docs.uavmatrix.com/guides/recording-flight-review/).

> **UAVnet is being retired**
>
> UAVnet, UAVmatrix's hosted ZeroTier controller, is being discontinued in favour of Fleet Manager. If your drones use a UAVnet network today, move them to the Fleet Manager VPN as described above.

## Next steps

- [Stream to multiple ground stations](https://docs.uavmatrix.com/guides/multiple-ground-stations/)
- [Add RTK corrections from an NTRIP caster](https://docs.uavmatrix.com/guides/rtk-ntrip-caster/)
- Managing several drones? [Onboard a fleet with Fleet Manager](https://docs.uavmatrix.com/guides/fleet-onboarding/)

Source: https://docs.uavmatrix.com/guides/bvlos-4g/
