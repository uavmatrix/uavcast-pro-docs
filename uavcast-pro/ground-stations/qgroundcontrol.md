# QGroundControl

> Get UAVcast-Pro telemetry and live H.264 video into QGroundControl on Windows, macOS or Linux: UDP 14550 auto-connect, Video Source UDP h.264 on port 5600, low latency mode and fixes.

QGroundControl listens for MAVLink on UDP port 14550 by default, so a UAVcast-Pro drone appears as soon as its telemetry arrives. For video, set the video source to **UDP h.264 Video Stream** on port 5600 once. QGroundControl has GStreamer built in, so there is nothing else to install. This works the same on Windows, macOS and Linux; for tablets see [Android](https://docs.uavmatrix.com/uavcast-pro/ground-stations/android/).

## Before you begin

- On the drone, a destination on [Ground Control Stations](https://docs.uavmatrix.com/uavcast-pro/ground-stations/) with this computer's IP address (the VPN address over 4G), **Enable Telemetry** on, and **Enable Video** on for video.
- The camera streaming on **Camera → Camera settings**.
- QGroundControl from [qgroundcontrol.com](https://qgroundcontrol.com/).

## Telemetry

Start QGroundControl. Within a few seconds of the first packet the vehicle appears and the toolbar shows its flight mode and battery.

![QGroundControl Fly view connected to an ArduPilot vehicle: toolbar with Not Ready and Stabilize, a five-waypoint mission on the map with No GPS Lock for Vehicle, and the video window in the bottom-left corner showing WAITING FOR VIDEO](https://docs.uavmatrix.com/img/screenshots/gcs/qgroundcontrol--fly-view.webp)

*Telemetry working: the toolbar shows the vehicle's state and flight mode (Not Ready, Stabilize). This is a bench setup without GPS, hence No GPS Lock for Vehicle. The video window (bottom left) says WAITING FOR VIDEO until video is set up below.*

Nothing appears? Check that automatic UDP connection is on: **Q** icon → **Application Settings**, then **AutoConnect to the following devices** → **UDP** ticked (the default). Depending on your QGroundControl version, the AutoConnect list is on the **Comm Links** page or on the **General** page. If you set a **Telemetry Port** other than 14550 on the drone, add a link instead: **Application Settings** → **Comm Links** → **Add**, type **UDP**, the port you chose, then **Connect**.

## Video

1. Click the **Q** icon (top left) → **Application Settings**.
2. Open the **Video** page. In older versions, video is a **Video** section on the **General** page.
3. Set **Source** to **UDP h.264 Video Stream**.
4. Check the UDP address. The default `0.0.0.0:5600` listens on port 5600, which matches the drone's default **Video Port**. If you changed **Video Port** on the drone, use that port here. Current versions call the field **UDP URL**; older ones show a **UDP Port** number.
5. Go back to the **Fly** view. The video appears in the small window in the corner. Click it to swap video and map.

*Illustration of QGroundControl Application Settings: the Video page with Source set to UDP h.264 Video Stream, the UDP address 0.0.0.0:5600 and Low Latency Mode.*

*Illustration QGroundControl, simplified. (1) Q icon → Application Settings, (2) Video, (3) Source UDP h.264 Video Stream, (4) UDP URL with port 5600.*

### Low latency mode

In the same video settings, turn on **Low Latency Mode**. QGroundControl then drops late frames instead of buffering them, which cuts the delay noticeably on a good link. On a weak 4G link it can make the picture stutter; turn it off again if it does.

## Firewall

- **Windows**: allow QGroundControl on **Private** and **Public** networks when Windows asks. VPN adapters (ZeroTier, Tailscale) are often classified as Public. To open the ports by hand, see [Mission Planner: Windows firewall](https://docs.uavmatrix.com/uavcast-pro/ground-stations/mission-planner/#allow-mission-planner-through-the-windows-firewall); the same rules apply.
- **macOS**: allow incoming connections for QGroundControl when macOS asks.
- **Linux**: if `ufw` is active, run `sudo ufw allow 14550/udp` and `sudo ufw allow 5600:5602/udp`.

## Second camera and audio

QGroundControl plays one video stream. With [dual stream](https://docs.uavmatrix.com/uavcast-pro/camera/multi-camera/) on, camera 2 goes to port 5601: change the UDP port to `5601` to watch it, or open camera 2 in a GStreamer window ([Windows](https://docs.uavmatrix.com/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/uavcast-pro/ground-stations/gstreamer-linux/), [macOS](https://docs.uavmatrix.com/uavcast-pro/ground-stations/gstreamer-macos/)) next to QGroundControl.

QGroundControl ignores audio. Play it with GStreamer on Video Port + 2 (`5602`).

## Common problems

| Symptom | Cause and fix |
| --- | --- |
| *Waiting For Vehicle Connection* | No telemetry reaches this computer. Check the destination IP (VPN IP over 4G), **Enable Telemetry**, and the firewall. |
| Telemetry works, video window says no video | **Enable Video** is off, the camera isn't running, the source isn't **UDP h.264 Video Stream**, or UDP 5600 is blocked. |
| Video appears, then freezes over 4G | Packet loss. Lower the bitrate on the drone, set **Stream Recovery Rate** to 15–30 frames, and turn **Low Latency Mode** off. |
| Vehicle appears twice | Two destinations point at this computer, or a second link duplicates the auto-connect. Remove one. |
| Video stops when you start a GStreamer test | Only one program can listen on a UDP port. Close one of them. |

More checks: [No video in QGroundControl or Mission Planner](https://docs.uavmatrix.com/troubleshooting/no-video-in-gcs/).

Source: https://docs.uavmatrix.com/uavcast-pro/ground-stations/qgroundcontrol/
