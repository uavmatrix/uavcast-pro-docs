# Two cameras: RC switching or dual stream

> Connect two cameras to UAVcast-Pro and switch between them from your RC transmitter, or stream both at once with dual stream. Setup, ports and CPU.

UAVcast-Pro handles two cameras, for example a forward camera and a downward or zoom camera. You choose between two modes:

|  | **Switching** (default) | **Dual stream** |
| --- | --- | --- |
| What the ground station gets | One video stream, showing camera 1 or camera 2 | Two video streams at the same time |
| How you choose | The camera badges in the web interface, or an RC channel | Both always live |
| Ports | **Video Port** | Camera 1 on **Video Port**, camera 2 on **Video Port (Camera 2)** (default: Video Port + 1) |
| CPU and bandwidth | One encode | Two encodes, about double the uplink |

## 1. Add the second camera

1. Connect both cameras. Two CSI cameras on a Pi 5, a CSI and a USB camera, or two USB cameras all work.
2. Open **Camera → Camera settings**. The camera slots show **CAM 1** and **CAM 2**.
3. Click **Add Camera** on the second slot and choose the camera.
4. **Resolution and FPS from Camera 1 will be used** in switching mode. If camera 2 supports camera 1's resolution, turn on **Match Camera 1 Resolution**; otherwise camera 2 uses its own resolution and is scaled to match.

If a camera is missing from the list, see [Camera not detected](https://docs.uavmatrix.com/troubleshooting/camera-not-detected/).

## 2a. Switch cameras from your transmitter

1. Under **RC Channel Switching**, turn on **Enable RC channel camera switching**.
2. Choose a free channel in **RC Channel**. The default is channel 7.
3. Map a two-position switch on your transmitter to that channel.
4. Flip the switch and watch **Current PWM**: below 1500 µs selects camera 1, above 1500 µs selects camera 2.

![Camera Control Panel with Enable Camera set to Yes, CAM 1 filled and an empty Add Camera slot](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/camera--control-panel.webp)

*Camera Control Panel with one camera. The RC Channel Switching panel appears below it only once CAM 2 is added and dual stream is off.*

While RC switching is on, the camera badges in the web interface don't switch cameras. Turn RC switching off to select cameras by hand again.

## 2b. Stream both cameras at once

1. Turn on **Dual stream**. The badge shows **Both live**.
2. Each camera now has its own resolution, FPS and bitrate under **Per-camera settings**.
3. Open **Ground Control Stations**. Each destination now shows **Video Port (Camera 2)**. Leave it empty to use **Video Port** + 1 (5601), or enter a port.
4. On the ground station, receive the second stream on that port, for example with a second QGroundControl video source or a GStreamer window: see [Ground stations & video](https://docs.uavmatrix.com/uavcast-pro/ground-stations/#set-up-the-receiving-side) for QGroundControl, Mission Planner and GStreamer on every OS.

> **Watch the CPU**
>
> UAVcast-Pro encodes video in software. With two streams, keep an eye on **System load**. When it says **CPU is near its limit**, lower one stream's resolution or bitrate, or turn the second stream off. A Raspberry Pi 4 or 5 is recommended for dual stream.

The **Flight Map** shows one video window per active stream. You can hide them as tabs at the bottom of the map.

## Port planning

With dual stream on, each destination uses two video ports, and audio (if **Send audio to ground stations** is on) uses video port + 2. If you add more destinations on the same computer, space their video ports at least three apart, for example 5600 and 5610.

## Recording both cameras

Under **Camera → Recordings → Settings**, **Record camera 2** works only when dual stream is on. See [Record flights and review them](https://docs.uavmatrix.com/guides/recording-flight-review/).

Source: https://docs.uavmatrix.com/guides/dual-camera-rc-switching/
