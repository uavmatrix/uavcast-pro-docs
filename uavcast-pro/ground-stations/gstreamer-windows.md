# GStreamer on Windows

> Install GStreamer on Windows (MSVC 64-bit, Complete), add it to PATH and play UAVcast-Pro H.264 video and Opus audio with gst-launch-1.0 in PowerShell or cmd. Firewall and fixes.

GStreamer plays the UAVcast-Pro video stream in its own window, without a ground station program. Use it to test whether video reaches the PC, to watch a second camera next to Mission Planner or QGroundControl, or to hear the audio track. It takes about five minutes to set up.

## Before you begin

On the drone, add a destination on [Ground Control Stations](https://docs.uavmatrix.com/uavcast-pro/ground-stations/) with this PC's IP address (`ipconfig` shows it; use the VPN address over 4G) and **Enable Video** on.

## Step 1: Install GStreamer

1. Go to [gstreamer.freedesktop.org/download](https://gstreamer.freedesktop.org/download/) and download the Windows **runtime** installer for **MSVC 64-bit** (not the development installer, and not MinGW).
2. Run it and choose **Complete** when asked for the installation type.
3. Note the install folder. Newer installers use `C:\Program Files\gstreamer\1.0\msvc_x86_64`, older ones `C:\gstreamer\1.0\msvc_x86_64`.

> **Choose Complete, not Typical**
>
> The **Typical** installation leaves out the H.264 decoder (`avdec_h264`). The command below then fails with *no element "avdec_h264"*. Run the installer again and pick **Complete**.

## Step 2: Add GStreamer to PATH

So you can run `gst-launch-1.0` from any folder, add its `bin` folder to your user PATH. In PowerShell (no administrator rights needed), with your install folder:

```powershell
$bin = "C:\Program Files\gstreamer\1.0\msvc_x86_64\bin"
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
[Environment]::SetEnvironmentVariable("Path", "$userPath;$bin", "User")
```

Close and reopen the terminal, then check:

```powershell
gst-launch-1.0 --version
```

Or use the Windows settings: search for **Edit environment variables for your account**, select **Path** → **Edit** → **New**, and paste the `bin` folder.

## Step 3: Play the video

**PowerShell**

```powershell
gst-launch-1.0 -v udpsrc port=5600 'caps=application/x-rtp,media=video,clock-rate=90000,encoding-name=H264,payload=96' ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Keep the single quotes around `caps=…`: without them PowerShell splits the value at the commas.

**Command Prompt (cmd)**

```bat
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

A window opens as soon as the first keyframe arrives. Close it, or press **Ctrl+C** in the terminal, to stop.

> **What you should see**
>
> 1. The terminal prints `Setting pipeline to PLAYING ...` and waits for video.
> 2. When the first packets arrive, `-v` prints lines containing `caps = application/x-rtp`.
> 3. A video window opens with the camera picture.
>
> If it stops after step 1, no video reaches this computer: see the troubleshooting table below.

For camera 2 in [dual stream](https://docs.uavmatrix.com/uavcast-pro/camera/multi-camera/), run the same command in a second terminal with `port=5601`.

### Lower-latency variant

On a good link, drop the jitter buffer delay:

```powershell
gst-launch-1.0 udpsrc port=5600 'caps=application/x-rtp,media=video,clock-rate=90000,encoding-name=H264,payload=96' ! rtpjitterbuffer latency=0 ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

On 4G, keep the default jitter buffer (the first command); it hides late packets.

### A double-click shortcut

Save this as `uavcast-video.cmd` on the desktop and double-click it:

```bat
@echo off
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
pause
```

If GStreamer isn't on PATH, add `cd /d "C:\Program Files\gstreamer\1.0\msvc_x86_64\bin"` as the second line.

## Hear the audio

Turn on **Audio** and **Send audio to ground stations** on the drone's **Camera** page. Audio arrives on Video Port + 2:

```powershell
gst-launch-1.0 udpsrc port=5602 'caps=application/x-rtp,media=audio,encoding-name=OPUS,clock-rate=48000,payload=97' ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

## Allow it through the firewall

The first time `gst-launch-1.0` listens, Windows asks whether to allow it. Tick **Private** and **Public** (VPN adapters are often Public). To open the ports for any program instead, in an administrator PowerShell:

```powershell
New-NetFirewallRule -DisplayName "UAVcast-Pro video and audio" -Direction Inbound -Protocol UDP -LocalPort 5600-5602 -Action Allow
```

## Troubleshooting

| Message or symptom | Fix |
| --- | --- |
| *'gst-launch-1.0' is not recognized…* | GStreamer isn't on PATH. Do step 2 and open a new terminal, or run it from the `bin` folder. |
| *WARNING: erroneous pipeline: no element "avdec_h264"* | Typical installation. Reinstall with **Complete**. |
| *no element "rtph264depay"* or *"udpsrc"* | Same cause: the plugin sets weren't installed. Reinstall with **Complete**. |
| Runs, but no window opens | Nothing arrives. Check the destination IP on the drone (VPN IP over 4G), **Enable Video**, the camera, and the firewall. With `-v`, a line with `caps = application/x-rtp` appears once packets arrive. |
| *Could not get/set settings from/on resource* or a bind error | Another program (Mission Planner, QGroundControl, a second GStreamer) already listens on that port. Close it. |
| Picture smears grey or freezes | Packet loss. Lower the bitrate on the drone and set **Stream Recovery Rate** to 15–30 frames. |
| *erroneous pipeline: could not parse caps* in PowerShell | The quotes around `caps=…` are missing or are double quotes with spaces. Use the PowerShell command exactly as shown. |

Linux or Mac? See [GStreamer on Linux](https://docs.uavmatrix.com/uavcast-pro/ground-stations/gstreamer-linux/) or [GStreamer on macOS](https://docs.uavmatrix.com/uavcast-pro/ground-stations/gstreamer-macos/).

Source: https://docs.uavmatrix.com/uavcast-pro/ground-stations/gstreamer-windows/
