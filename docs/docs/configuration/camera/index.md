---
slug: /configuration-camera
title: Camera
authors: Bernt Christian Egeland
tags: []
---

# Camera

![Alt text](img/camera_page.png)

The Camera page allows you to configure video streaming from your Raspberry Pi camera or USB cameras to your ground control station. UAVcast-Pro v6 features an integrated HLS-based live preview directly in the web interface.

## Overview

UAVcast-Pro v6 uses a dual-stream architecture for video:

**GStreamer** - Primary video streaming:
- H.264 video encoding
- UDP streaming to ground control stations
- Low latency for flight operations
- Support for Raspberry Pi Camera and USB cameras
- Custom pipeline support
- Configurable resolution, FPS, and bitrate

**MediaMTX** - Internal preview only:
- HLS stream for web browser preview
- Live camera preview in UAVcast-Pro interface
- Uses the same GStreamer source
- Approximately 2-3 seconds latency (normal for HLS)


### Raspberry Pi Camera
- **Pi Camera Module v1/v2**: Uses `libcamera` or `rpicam`
- **Pi Camera Module 3**: Full support with libcamera
- **HQ Camera**: Supported


### USB Cameras
Auto-detected USB cameras appear in the dropdown:
- Logitech C615
- Logitech C920
- Most V4L2-compatible USB cameras

Check available cameras: `v4l2-ctl --list-devices`

## Video Configuration

### Resolution

Available resolutions:
- **320x240** (QVGA) - Low bandwidth
- **640x480** (VGA) - Standard definition
- **1280x720** (HD/720p) - High definition
- **1920x1080** (Full HD/1080p) - Maximum quality

:::tip Bandwidth Considerations
Higher resolution requires more bandwidth:
- 320x240: ~300-500 Kbps
- 640x480: ~800-1200 Kbps
- 1280x720: ~1500-3000 Kbps
- 1920x1080: ~3000-6000 Kbps

Choose based on your available network bandwidth (4G/WiFi/Ethernet).
:::

### Frame Rate (FPS)

- **Range:** 5-30 FPS
- **Recommended:** 15-20 FPS for most applications
- **Low bandwidth:** 10-15 FPS
- **High quality:** 25-30 FPS

### Bitrate

- **Range:** 500-8000 Kbps
- **Recommended:** 1500-3000 Kbps
- **Low bandwidth:** 800-1500 Kbps
- **High quality:** 3000-5000 Kbps

Bitrate directly affects video quality and bandwidth usage.

### Keyframe Interval

- **Default:** 30 frames
- Affects video seeking and startup time
- Lower values: faster startup, higher bandwidth
- Higher values: slower startup, lower bandwidth

## Raspberry Pi Camera Specific Settings

### Rotation
- **0°** - No rotation (default)
- **90°** - Rotate 90° clockwise
- **180°** - Upside down
- **270°** - Rotate 270° clockwise

### Flip
- **Horizontal Flip:** Mirror image left-right
- **Vertical Flip:** Mirror image top-bottom

Useful for mounting the camera in different orientations.

## Multi-Camera Switching

UAVcast-Pro supports dual camera configurations with instant switching between cameras during flight.

![Multi-Camera UI](img/multi_camera.jpg)

### Adding a Second Camera

1. Select your primary camera (Camera 1)
2. Click **Add Camera** button
3. Select a second camera from the dropdown

:::info Resolution Notice
Camera 2 uses the same resolution and FPS settings as Camera 1. Configure your desired resolution before adding the second camera.
:::

### Switching Cameras

**Manual Switching:**
- Click on the camera badge (CAM 1 or CAM 2) to switch
- Active camera shows a checkmark and highlighted border
- Use the switch button between badges for quick toggle

**RC Channel Switching:**

Control camera switching from your transmitter during flight:

1. Enable **RC Channel Switching** in the camera settings
2. Select an RC channel (1-18)
3. The camera switches based on PWM value:
   - **PWM < 1500** → Camera 1
   - **PWM > 1500** → Camera 2

When RC switching is enabled:
- Manual switching is disabled
- Current PWM value displays in real-time
- Camera indicator shows which camera is active

:::tip Flight Controller Setup
Assign a switch on your transmitter to the selected RC channel. A 2-position switch works well for camera toggling.
:::


## Live Preview
UAVcast-Pro v6 includes an integrated HLS video player powered by **MediaMTX**:

1. Enable **Live Preview** toggle
2. Start the camera service
3. MediaMTX converts the camera stream to HLS format
4. Video appears in the preview window

**Preview Features:**
- Real-time video playback
- Play/pause controls
- Fullscreen mode
- Approximately 2-3 seconds latency (normal for HLS)
- Works in any modern browser

:::info Preview Latency vs UDP Streaming
The HLS preview in the web interface has 2-3 seconds latency, which is normal for HLS. This preview uses **MediaMTX** to convert the video stream to HLS format.

For real-time flight operations, UAVcast-Pro uses **GStreamer to stream directly to your ground station via UDP** with minimal latency (typically under 200ms). The UDP stream to your GCS is completely independent and much faster than the web preview.

**Summary:**
- **MediaMTX → HLS → Web Preview**: ~2-3s latency (for monitoring/setup)
- **GStreamer → UDP → GCS**: ~100-200ms latency (for flight operations)
:::

## Custom GStreamer Pipeline
For advanced users or unsupported cameras, you can specify a custom GStreamer pipeline.

**Example for test pattern:**
```bash
videotestsrc ! x264enc ! video/x-h264, stream-format=byte-stream ! rtph264pay ! udpsink host=192.168.1.100 port=5600
```

See [GStreamer documentation](https://gstreamer.freedesktop.org/documentation/) for pipeline syntax.

## Video Streaming Architecture

UAVcast-Pro v6 uses **GStreamer** as the primary video pipeline for streaming to ground control stations:

**How it works:**
1. Camera captures video (Raspberry Pi Camera or USB camera)
2. GStreamer encodes to H.264
3. GStreamer streams via UDP to configured GCS destinations (low latency)
4. Simultaneously, MediaMTX creates an HLS stream for web preview (higher latency, for monitoring only)

**Key Points:**
- UDP streaming to GCS: **Low latency** (~100-200ms) - used for flight operations
- HLS preview in browser: **Higher latency** (~2-3s) - used for setup/monitoring only
- Both streams use the same camera source
- Stopping the camera stops both UDP and HLS streams


## Receiving Video on Ground Station

### Mission Planner / QGroundControl (Easiest Method)

Download and install [Mission Planner](http://ardupilot.org/planner/docs/mission-planner-installation.html) or [QGroundControl](http://qgroundcontrol.com/downloads/). Both applications have built-in GStreamer support and receive UDP video on port 5600 without any extra configuration.

**Setup:**
1. Configure your GCS destination in [Ground Control Stations](/docs/6.x/configuration-ground-controller)
2. Enable video streaming for that destination
3. Start camera in UAVcast-Pro
4. Open Mission Planner or QGC - video appears in HUD automatically

**If video doesn't appear in Mission Planner:**
- Right-click HUD → Video → Set GStreamer Source
- Use default pipeline or enter a custom one

#### Setting Custom GStreamer Source in Mission Planner

If you need to use a custom GStreamer pipeline (e.g., for troubleshooting or using a different port):

1. Right-click on the HUD (video area)
2. Select **Video** → **Set GStreamer Source**
3. Enter your custom pipeline

![Mission Planner GStreamer Source](img/hud-gstreamer.jpg)

**Example custom pipeline:**
```
udpsrc port=5600 caps = "application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

:::info
Mission Planner's default GStreamer pipeline listens on port 5600. If you use a custom pipeline with a different port, make sure to set the same port in UAVcast-Pro's GCS configuration.
:::

---

### Using GStreamer Directly

For more control, or to view video without Mission Planner/QGC, you can install GStreamer and run it directly.

#### Windows

##### Installing GStreamer

1. Download GStreamer from [https://gstreamer.freedesktop.org/download/](https://gstreamer.freedesktop.org/download/)
   - Choose the **MSVC 64-bit** runtime installer (e.g., `gstreamer-1.0-msvc-x86_64-X.XX.X.msi`)

2. Run the installer

:::caution Important - Select Complete Installation
During installation, you **MUST** select **"Complete"** installation type. This installs all the required plugins for video decoding. If you choose "Typical" or "Custom" without all plugins, video streaming will not work.
:::

3. Open a new Command Prompt and navigate to the GStreamer bin folder:
   ```cmd
   cd C:\gstreamer\1.0\msvc_x86_64\bin
   ```
   :::info
   The path may vary depending on your installation. Common paths:
   - `C:\gstreamer\1.0\msvc_x86_64\bin`
   - `C:\gstreamer\1.0\x86_64\bin`
   :::

4. Run the GStreamer receive command (see below)

#### Start GStreamer to Receive UDP Video

Open Command Prompt (Windows) or Terminal (Linux/Mac) and run:

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

:::tip
- Make sure the port number (5600) matches the port configured in UAVcast-Pro for your GCS endpoint
- **Windows Users:** If the command is not recognized, make sure you're in the GStreamer bin folder, or add the GStreamer bin folder to your system PATH
:::

Your computer will now wait for the video stream from the Raspberry Pi. Once UAVcast-Pro starts streaming, you'll see real-time video from your drone.

##### Windows Helper Script

For convenience, save the GStreamer command to a `.cmd` file and double-click to start video:

**UDP Receive (save as `start-udp-video.cmd`):**
```cmd
@echo off
cd /d C:\gstreamer\1.0\msvc_x86_64\bin
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
pause
```

Edit the file with Notepad to change the port number as needed.

#### Ubuntu

```bash
sudo apt-get update
sudo apt-get install gstreamer1.0-tools gstreamer1.0-plugins-good gstreamer1.0-plugins-bad
```

Then run the same GStreamer command as above in Terminal.

#### Mac OS X

Using Homebrew:
```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew update
brew install gstreamer gst-libav gst-plugins-ugly gst-plugins-base gst-plugins-bad gst-plugins-good
```

Then run the same GStreamer command as above in Terminal.

---

### Android

Download and install [QGroundControl](https://play.google.com/store/apps/details?id=org.mavlink.qgroundcontrol) for Android:

1. Find the IP address of your Android device in the app settings
2. Add this IP as a GCS destination in UAVcast-Pro
3. Run QGroundControl - it will automatically detect your vehicle and video stream

Video is received on the default port 5600


## Troubleshooting

### No Video Preview

**Problem:** Preview doesn't show in UAVcast-Pro

**Solutions:**
1. Ensure camera is selected and started
2. Check camera logs for errors
3. Verify camera is connected: `libcamera-hello --list-cameras` or `v4l2-ctl --list-devices`
4. For Pi Camera: ensure it's enabled in raspi-config
5. For USB camera: check cable and USB power
6. **Check browser firewall/security settings:** Some browsers or security software may block media streams
7. Try accessing from a different browser (Chrome, Firefox, Edge)
8. Check MediaMTX service is running: `sudo systemctl status mediamtx`
9. Verify you can access the HLS stream URL directly (check browser console for errors)
10. **If accessing remotely:** Ensure firewall on Raspberry Pi allows incoming connections on the HLS port
11. Clear browser cache and hard refresh (Ctrl+Shift+R)

### Video Stuttering/Choppy

**Problem:** Video playback is not smooth

**Solutions:**
1. Reduce resolution (try 640x480)
2. Lower bitrate (try 1500 Kbps)
3. Reduce FPS (try 15)
4. Check network bandwidth: `iftop` or Dashboard network stats
5. Verify CPU isn't overheating (Dashboard → CPU Metrics)

### GCS Doesn't Receive Video

**Problem:** Ground station shows no video

**Solutions:**
1. Verify Ground Control Station destination is configured correctly
2. Check "Enable Video" toggle is ON for that destination
3. Confirm firewall allows UDP 5600 on GCS computer
4. Test with gst-launch command (see above)
5. Check VPN/network connectivity
6. Verify correct IP address in GCS configuration

### Camera Not Detected

**Problem:** Camera doesn't appear in dropdown

**Solutions:**

**For Raspberry Pi Camera:**
```bash
# Check if camera is detected
libcamera-hello --list-cameras
# Enable camera interface
sudo raspi-config
# Reboot
sudo reboot
```

**For USB Camera:**
```bash
# List video devices
v4l2-ctl --list-devices
# Check device capabilities
v4l2-ctl -d /dev/video0 --all
```

### Poor Video Quality

**Problem:** Video is pixelated or low quality

**Solutions:**
1. Increase bitrate (try 3000 Kbps)
2. Increase resolution if bandwidth allows
3. Ensure adequate lighting
4. Clean camera lens
5. Check camera focus (HQ camera)

## Best Practices

1. **Test indoors first** with known good network before outdoor flights
2. **Start with lower settings** (720p, 15fps, 1500kbps) and increase if bandwidth allows
3. **Use live preview** to verify camera is working before flight
4. **Monitor bandwidth** using Dashboard network statistics
5. **Secure camera mounting** to prevent vibration blur
6. **Protect from sun** direct sunlight can cause lens flare and overheating

## Related Pages

- [Ground Control Stations](/docs/6.x/configuration-ground-controller) - Configure video streaming destinations
- [Dashboard](/docs/6.x/configuration-dashboard) - Monitor camera service status
- [Networks](/docs/6.x/configuration-networks) - Manage network interfaces for streaming
- [Flight Map](/docs/6.x/configuration-map) - View camera feed with live map

## Next Steps

After configuring your camera:

1. Test live preview in UAVcast-Pro web interface
2. Configure video destinations in [Ground Control Stations](/docs/6.x/configuration-ground-controller)
3. Test video reception on your GCS
4. Adjust quality settings based on available bandwidth
