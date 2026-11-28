# GStreamer on macOS

> Install GStreamer on a Mac with Homebrew or the official package and play UAVcast-Pro H.264 drone video and Opus audio with gst-launch-1.0, plus the macOS firewall prompt.

GStreamer plays the UAVcast-Pro video stream in a window from the Terminal. Use it to test the video path, watch a second camera next to QGroundControl, or hear the audio. Works on Apple silicon and Intel Macs.

## Before you begin

On the drone, add a destination on [Ground Control Stations](https://docs.uavmatrix.com/uavcast-pro/ground-stations/) with this Mac's IP address (**System Settings → Network**; use the VPN address over 4G) and **Enable Video** on.

## Install GStreamer

**Homebrew**

```bash
brew install gstreamer
```

The Homebrew formula includes the base, good, bad, ugly and libav plugin sets, so `avdec_h264` is there.

**Official package**

1. Download the macOS **runtime** package from [gstreamer.freedesktop.org/download](https://gstreamer.freedesktop.org/download/) and install it.

2. Add it to your PATH in Terminal:

   ```bash
   echo 'export PATH="/Library/Frameworks/GStreamer.framework/Versions/1.0/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

Check the install with `gst-launch-1.0 --version`, and check the H.264 decoder with `gst-inspect-1.0 avdec_h264` (it prints the element's details; *No such element or plugin* means it's missing).

## Play the video

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

The first time, macOS asks whether `gst-launch-1.0` may accept incoming network connections. Select **Allow**. A window opens once the first keyframe arrives; press **Ctrl+C** in Terminal to stop.

> **What you should see**
>
> 1. The terminal prints `Setting pipeline to PLAYING ...` and waits for video.
> 2. When the first packets arrive, `-v` prints lines containing `caps = application/x-rtp`.
> 3. A video window opens with the camera picture.
>
> If it stops after step 1, no video reaches this computer: see the troubleshooting table below.

- **Camera 2** in [dual stream](https://docs.uavmatrix.com/uavcast-pro/camera/multi-camera/): run it again with `port=5601`.
- **Lower latency** on a good link: replace `rtpjitterbuffer` with `rtpjitterbuffer latency=0`.
- If no window appears even though packets arrive, replace `autovideosink` with `osxvideosink`.

## Hear the audio

```bash
gst-launch-1.0 udpsrc port=5602 caps="application/x-rtp, media=(string)audio, clock-rate=(int)48000, encoding-name=(string)OPUS, payload=(int)97" ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

Audio needs **Audio** and **Send audio to ground stations** turned on on the drone's **Camera** page.

## Troubleshooting

| Message or symptom | Fix |
| --- | --- |
| *command not found: gst-launch-1.0* | Homebrew: run `brew doctor`. Official package: add the framework `bin` folder to PATH as shown above. |
| *no element "avdec_h264"* | The libav plugin is missing. Reinstall with Homebrew, or install the full official runtime package. |
| Runs, but no window | Nothing arrives. Check the destination IP, **Enable Video**, and that you allowed incoming connections (**System Settings → Network → Firewall → Options**). |
| Bind error on start | QGroundControl or another GStreamer already uses the port. Close it. |

Source: https://docs.uavmatrix.com/uavcast-pro/ground-stations/gstreamer-macos/
