# No video in QGroundControl or Mission Planner

> Telemetry works but video stays black in QGroundControl or Mission Planner? Check the camera, Enable Video, the destination IP, UDP 5600 and the GCS.

Telemetry arrives and the drone shows on the map, but the video area stays black, or QGroundControl's video window says **WAITING FOR VIDEO**. Work through the checks in order. Most cases are solved by check 2 or 3.

![QGroundControl Fly view connected to an ArduPilot vehicle: toolbar with Not Ready and Stabilize, a five-waypoint mission on the map with No GPS Lock for Vehicle, and the video window in the bottom-left corner showing WAITING FOR VIDEO](https://docs.uavmatrix.com/img/screenshots/gcs/qgroundcontrol--fly-view.webp)

*The symptom in QGroundControl: telemetry arrives (Not Ready, Stabilize in the toolbar; No GPS Lock because this bench setup has no GPS), but the video window in the bottom-left corner says WAITING FOR VIDEO.*

| What you see | Likely cause | Start at |
| --- | --- | --- |
| Video is black in the GCS and in the UAVcast-Pro live preview | The camera is not running on the drone | [Check 1](https://docs.uavmatrix.com/troubleshooting/no-video-in-gcs/#check-1) |
| Live preview works, the ground station stays black | Enable Video is off for this ground station, or the IP is wrong | [Check 2](https://docs.uavmatrix.com/troubleshooting/no-video-in-gcs/#check-2) |
| Worked on Wi-Fi at home, black over 4G | The destination uses a local IP instead of the VPN IP | [Check 2](https://docs.uavmatrix.com/troubleshooting/no-video-in-gcs/#check-2) |
| Everything looks right, still black on Windows | The firewall blocks incoming UDP on port 5600 | [Check 3](https://docs.uavmatrix.com/troubleshooting/no-video-in-gcs/#check-3) |
| QGroundControl shows video, Mission Planner does not | Mission Planner has no GStreamer source set | [Check 4](https://docs.uavmatrix.com/troubleshooting/no-video-in-gcs/#check-4) |

## Check 1: Confirm the camera is streaming on the drone

If the drone isn't producing video, no ground station setting will help.

1. Open the UAVcast-Pro web interface and go to **Camera → Camera settings**.
2. Check that **Enable Camera?** is **Yes** and that a camera is chosen in **Select Camera**.
3. Check that the camera runs: the dashboard's **Video** row should say **Running**. If it is stopped, press **Start** on the Camera page (the button reads **Restart** while the camera runs).
4. Turn on **Enable Live Preview?** and look at **Live Preview**. If you see a picture, the camera works and you can go to check 2.
5. If **Select Camera** says **No cameras available**, go to [Camera not detected](https://docs.uavmatrix.com/troubleshooting/camera-not-detected/).

![UAVcast-Pro Camera settings page with CAM 1 enabled and the Live Preview panel showing No Video Available](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/camera.webp)

*Camera → Camera settings with CAM 1 enabled. Live Preview shows No Video Available until Enable Live Preview? is ticked.*

> **The preview is not the ground station stream**
>
> The browser preview goes through the built-in media server (WebRTC on port 8889). The ground station gets a separate H.264 stream over UDP. A working preview proves the camera works, not that the UDP stream reaches your laptop.

If the **Action Logs** on the Camera page say a camera *does not support* a resolution, pick another value in **Resolution**. UAVcast-Pro falls back to the largest supported size and logs which one it used.

## Check 2: Check the ground station destination

UAVcast-Pro only sends video to destinations where video is switched on. Telemetry and video have separate switches, and **both are off on a new destination**.

1. Go to **Ground Control Stations** and find the card for the computer that runs your ground station.
2. Make sure **Enable Endpoint** and **Enable Video** are both on.
3. Check **Destination IP or Host**. It must be the IPv4 address of the ground station computer as seen from the drone. Hostnames are not accepted.
4. Check that **Video Port** is `5600`, or the port your ground station listens on.
5. Fields save when you leave them or press Enter. A green tick confirms the save.

![Video Port 5600 and the Enable Video switch turned on](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/ground-control--video-enabled.webp)

*Ground Control Stations: a destination with Enable Video on and Video Port 5600.*

> **Flying over 4G? Use the VPN IP**
>
> Over a cellular link the drone can't reach your laptop's local address (like `192.168.1.20`). Use the address your laptop has on the VPN (Fleet Manager VPN, Tailscale or ZeroTier). On Windows, run `ipconfig` and look for the Tailscale or ZeroTier adapter.

Using Fleet Manager? Destinations are created for you when you add a stream binding, and each extra drone on the same ground station gets its own ports. Check the video port shown on the binding, not 5600. See [Stream bindings](https://docs.uavmatrix.com/fleet-manager/network/stream-bindings/).

## Check 3: Allow UDP 5600 through the firewall

Video arrives as incoming UDP traffic. On Windows this is blocked by default, even when telemetry gets through because the ground station asked for an exception.

**Windows**

Open **PowerShell as Administrator** and run:

```powershell
New-NetFirewallRule -DisplayName "UAV Video" -Direction Inbound -Protocol UDP -LocalPort 5600 -Action Allow
New-NetFirewallRule -DisplayName "MAVLink Telemetry" -Direction Inbound -Protocol UDP -LocalPort 14550 -Action Allow
```

The ZeroTier and Tailscale adapters are often classed as a *Public* network. A rule created this way applies to all profiles.

**Linux**

```bash
sudo ufw allow 5600/udp comment 'UAV Video'
sudo ufw allow 14550/udp comment 'MAVLink Telemetry'
```

**macOS**

The macOS firewall allows incoming UDP for apps you approve. If you clicked *Deny* when QGroundControl first started, allow it again in **System Settings → Network → Firewall → Options**.

## Check 4: Set up video in your ground station

**QGroundControl**

1. Click the **Q** icon, then **Application Settings**.
2. Open the video settings (**Video**, or **General → Video** in older versions).
3. Set **Source** to **UDP h.264 Video Stream**, and check that the UDP address uses port `5600` (**UDP URL** `0.0.0.0:5600` in current versions, **UDP Port** `5600` in older ones).
4. Go back to the Fly view. The video tile should show a picture within a few seconds.

**Mission Planner**

Mission Planner shows video in the HUD. If it stays black, set the source by hand:

1. Right-click the HUD and choose **Video → Set GStreamer Source**.
2. Paste this pipeline and confirm:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

## Check 5: Test the stream without a ground station

This takes the ground station software out of the picture. If a window with video opens, the drone, network and firewall are fine and the problem is in the GCS settings.

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

> **Windows: choose the Complete installation**
>
> When you install GStreamer (MSVC 64-bit runtime), pick **Complete**. The Typical installation leaves out the H.264 decoder and the command fails with `no element "avdec_h264"`.

Close the test before you open your ground station again: only one program can listen on port 5600 at a time. Step-by-step receiver setup: [Mission Planner](https://docs.uavmatrix.com/uavcast-pro/ground-stations/mission-planner/), [QGroundControl](https://docs.uavmatrix.com/uavcast-pro/ground-stations/qgroundcontrol/), and GStreamer on [Windows](https://docs.uavmatrix.com/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/uavcast-pro/ground-stations/gstreamer-linux/) or [macOS](https://docs.uavmatrix.com/uavcast-pro/ground-stations/gstreamer-macos/).

> **Video now, but choppy over 4G?**
>
> See [Choppy or delayed video](https://docs.uavmatrix.com/troubleshooting/choppy-or-delayed-video/).

## Still no video?

[Download the logs](https://docs.uavmatrix.com/troubleshooting/collect-logs/) with **Camera Server** selected in the log list, and send them to **[support@uavmatrix.com](mailto:support@uavmatrix.com)** together with your UAVcast-Pro version, the camera model and the ground station you use.

Related: [Camera settings](https://docs.uavmatrix.com/uavcast-pro/camera/) · [Ground Control Stations](https://docs.uavmatrix.com/uavcast-pro/ground-stations/)

Source: https://docs.uavmatrix.com/troubleshooting/no-video-in-gcs/
