# Quick start

> Connect a MAVLink flight controller to UAVcast-Pro and get telemetry and live video in Mission Planner or QGroundControl, first on your LAN, then over 4G/LTE.

This guide takes a drone with UAVcast-Pro installed to live telemetry and video in Mission Planner or QGroundControl. You'll do it on your local network first, where there are fewer things that can go wrong, and then switch to 4G/LTE. The local part takes about 10 minutes.

## Before you begin

- UAVcast-Pro installed and the device rebooted. See [Installation](https://docs.uavmatrix.com/get-started/installation/).
- Your license key. See [Licensing & activation](https://docs.uavmatrix.com/get-started/license-activation/).
- The flight controller connected to the companion computer over USB or a TELEM port, and powered.
- A camera connected (optional).
- A laptop with Mission Planner or QGroundControl on the **same network** as the drone. Note the laptop's IP address (`ipconfig` on Windows, `ip a` on Linux, **System Settings → Network** on macOS).

## 1. Activate the license

> You need a UAVcast-Pro license to activate the drone. Buy one in the UAVmatrix store.
>
> [Buy UAVcast-Pro](https://uavmatrix.com/checkout) · [See plans and pricing](https://uavmatrix.com/products)

1. Open `http://<drone-ip>` in a browser. You land on **Application**.
2. Paste your key into **Enter License Key** and select **Validate**.

The sidebar unlocks. Now go to **Users**, select **Add User** and create an admin account, so the web interface isn't open to anyone on the network.

## 2. Connect the flight controller

1. Go to **Flight Controller → Connection**.
2. Under **Link type**, pick **USB** or **UART / Serial** to match your wiring.
3. Leave **Port** and **Baud rate** on **Automatic**.
4. If the status panel says **Link stopped**, select **Connect**.
5. Wait for the state to change to **Connected**. **Mavlink Information** fills with the vehicle type, flight mode, GPS and battery, and the top bar shows **FC Connected**.

![Flight Controller Connection page showing Connected over USB, the Connection check with four passed steps, and the MAVLink Inspector](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/flight-controller.webp)

*Flight Controller → Connection with a working USB link.*

Stuck on **Waiting for device**, **Detecting baud rate** or **No heartbeat**? Select **Auto-detect** and read the **Connection check** panel: it names the first thing that's wrong. More in [Flight controller](https://docs.uavmatrix.com/uavcast-pro/flight-controller/).

## 3. Send telemetry and video to your laptop

1. Go to **Ground Control Stations**. There is already one empty destination card.
2. Enter a **Name**, for example `Laptop`.
3. In **Destination IP or Host**, enter your laptop's IPv4 address, for example `192.168.1.20`, and press Enter. A green check means it's saved.
4. Leave **Telemetry Port** at `14550` and **Video Port** at `5600`.
5. Turn on **Enable Telemetry**.
6. Turn on **Enable Video** if you have a camera.

Fields save as you leave them. There is no Save button.

## 4. Start the camera

Skip this if you have no camera.

1. Go to **Camera → Camera settings**.
2. Set **Enable Camera?** to **Yes**.
3. Click the **CAM 1** slot and choose your camera, for example *Raspberry Pi Camera - imx708 (CSI)* or your USB webcam.
4. Under **Camera Settings**, pick a **Resolution**. Start with `1280x720` or the closest size your camera offers.
5. Leave **Select FPS** on **Auto** and **Bitrate** at `0` (auto).
6. Under **Stream Settings**, tick **Enable Live Preview?** and select **Start**. **Live Preview** shows the picture.

## 5. Open your ground station

**QGroundControl**

QGroundControl listens on UDP 14550 by default, so the drone appears by itself within a few seconds.

For video: click the **Q** icon → **Application Settings** → **Video** (in older versions, the **Video** section of **General**). Set **Source** to **UDP h.264 Video Stream** and keep the default UDP port `5600`. The video shows in the Fly view.

**Mission Planner**

In the top-right corner choose **UDP**, select **Connect** and accept port `14550`.

![Mission Planner Flight Data view connected over UDP: the top-right connection box shows UDP, the link UDP14550-1-QUADRO and the DISCONNECT button; the HUD shows DISARMED, Unhealthy AHRS and GPS: No Fix](https://docs.uavmatrix.com/img/screenshots/gcs/mission-planner--connected.webp)

*Mission Planner connected over UDP 14550: the connection box (top right) shows the link and DISCONNECT. Bench setup without GPS, hence Unhealthy AHRS and GPS: No Fix on the HUD.*

For video: right-click the HUD → **Video** → **Set GStreamer Source**, and paste:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

Full walkthroughs with screenshots and fixes: [Mission Planner](https://docs.uavmatrix.com/uavcast-pro/ground-stations/mission-planner/), [QGroundControl](https://docs.uavmatrix.com/uavcast-pro/ground-stations/qgroundcontrol/), [Android](https://docs.uavmatrix.com/uavcast-pro/ground-stations/android/), and GStreamer on [Windows](https://docs.uavmatrix.com/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/uavcast-pro/ground-stations/gstreamer-linux/) or [macOS](https://docs.uavmatrix.com/uavcast-pro/ground-stations/gstreamer-macos/).

> **Windows firewall**
>
> Windows blocks incoming UDP unless the app asked for an exception. If telemetry or video doesn't arrive, allow Mission Planner or QGroundControl through the firewall for **private and public** networks, or open UDP 14550 and 5600.

You now have telemetry and video on your local network. The dashboard's **Ground station** row reads *Sending · … packets/s*.

## 6. Fly over 4G/LTE

Over a cellular network the drone has no address your laptop can reach, so both join the same VPN. The Fleet Manager VPN is included with your license.

1. Plug in the modem. On **Modem**, set **Modem type** to **HiLink** or **Traditional (PPP)**. Leave **Access Point Name** empty: UAVcast-Pro finds the APN. See [Cellular modem](https://docs.uavmatrix.com/uavcast-pro/connectivity/cellular-modem/).
2. Sign in to [Fleet Manager](https://fleet-manager.uavmatrix.com/), open **Network** and select **Enable VPN Network** if it isn't on yet.
3. Pair the drone: in UAVcast-Pro, **Management → Fleet Management → Connect to Fleet Manager**, then enter the code in Fleet Manager under **Fleet → Pair Device**. Keep **Enable VPN for this UAV** ticked.
4. Put the laptop on the VPN: install Tailscale and run the **GCS Connection Command** from Fleet Manager's **Network** page, then mark the laptop as a **Ground Control Station (GCS)**.
5. In **Network → Stream Bindings**, add a binding from the drone to the laptop. Fleet Manager sends the destination to the drone, and the **Ports** column shows which ports to listen on.
6. On **Networks**, select **Modem Priority (Outdoor Mode)** so traffic goes over the modem when Wi-Fi drops.

Full walkthrough: [Fly beyond visual range over 4G](https://docs.uavmatrix.com/guides/bvlos-4g/). Already run your own Tailscale or ZeroTier network? Join the drone and the laptop to it instead and use the laptop's VPN IP as the destination: see [VPN](https://docs.uavmatrix.com/uavcast-pro/connectivity/vpn/).

> **Set a GCS failsafe before flying over LTE**
>
> Cellular links drop. Make sure the flight controller has a GCS failsafe configured (`FS_GCS_ENABLE` on ArduPilot, `NAV_DLL_ACT` on PX4). The top bar shows **GCS Failsafe Enabled** or **GCS Failsafe Disabled**.

## Next steps

- [Two cameras, RC switching and dual stream](https://docs.uavmatrix.com/uavcast-pro/camera/multi-camera/)
- [Record every flight on the drone](https://docs.uavmatrix.com/uavcast-pro/camera/recordings/)
- [RTK corrections over 4G with NTRIP](https://docs.uavmatrix.com/uavcast-pro/flight-controller/ntrip-rtk/)
- [Pair the drone with Fleet Manager](https://docs.uavmatrix.com/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/get-started/quick-start/
