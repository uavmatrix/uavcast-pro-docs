# GStreamer on Linux

> Install GStreamer on Ubuntu, Debian or Fedora and play UAVcast-Pro H.264 drone video and Opus audio with gst-launch-1.0, including a second camera, low latency and ufw.

GStreamer plays the UAVcast-Pro video stream in a window with one command. Use it to test the video path, watch a second camera, or hear the audio. Works on any desktop Linux, including a Raspberry Pi used as a ground station.

## Before you begin

On the drone, add a destination on [Ground Control Stations](https://docs.uavmatrix.com/uavcast-pro/ground-stations/) with this computer's IP address (`ip -4 addr`; use the VPN address over 4G) and **Enable Video** on.

## Install GStreamer

**Ubuntu / Debian / Raspberry Pi OS**

```bash
sudo apt update
sudo apt install gstreamer1.0-tools gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-libav
```

`gstreamer1.0-libav` provides the H.264 decoder (`avdec_h264`). Without it the command below fails.

**Fedora**

```bash
sudo dnf install gstreamer1 gstreamer1-plugins-good gstreamer1-plugins-bad-free gstreamer1-plugin-libav
```

Fedora's own repositories leave out most H.264 support for patent reasons, so `avdec_h264` may still be missing after this. If the check below fails, enable [RPM Fusion](https://rpmfusion.org/) and follow its multimedia guide to get the full codec libraries.

Check that the H.264 decoder is there:

```bash
gst-inspect-1.0 avdec_h264
```

It prints the element's details. *No such element or plugin* means the decoder is missing.

## Play the video

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

A window opens once the first keyframe arrives. Press **Ctrl+C** to stop.

> **What you should see**
>
> 1. The terminal prints `Setting pipeline to PLAYING ...` and waits for video.
> 2. When the first packets arrive, `-v` prints lines containing `caps = application/x-rtp`.
> 3. A video window opens with the camera picture.
>
> If it stops after step 1, no video reaches this computer: see the troubleshooting table below.

- **Camera 2** in [dual stream](https://docs.uavmatrix.com/uavcast-pro/camera/multi-camera/): run it again with `port=5601`.
- **Lower latency** on a good link: replace `rtpjitterbuffer` with `rtpjitterbuffer latency=0`. Keep the default on 4G.

## Hear the audio

With **Send audio to ground stations** on, audio arrives on Video Port + 2:

```bash
gst-launch-1.0 udpsrc port=5602 caps="application/x-rtp, media=(string)audio, clock-rate=(int)48000, encoding-name=(string)OPUS, payload=(int)97" ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

## Firewall

Most desktop distributions don't block incoming UDP. If `ufw` is active:

```bash
sudo ufw allow 5600:5602/udp
sudo ufw allow 14550/udp
```

## Troubleshooting

| Message or symptom | Fix |
| --- | --- |
| *no element "avdec_h264"* | Install `gstreamer1.0-libav`. |
| *no element "rtph264depay"* | Install `gstreamer1.0-plugins-good`. |
| Runs, but no window | Nothing arrives. Check the destination IP on the drone, **Enable Video**, and the firewall. `sudo tcpdump -ni any udp port 5600` shows whether packets reach the computer. |
| Bind error on start | Another program (QGroundControl, another GStreamer) listens on the port. Close it. |
| Window opens, picture smears grey | Packet loss. Lower the bitrate on the drone and set **Stream Recovery Rate** to 15–30 frames. |

Source: https://docs.uavmatrix.com/uavcast-pro/ground-stations/gstreamer-linux/
