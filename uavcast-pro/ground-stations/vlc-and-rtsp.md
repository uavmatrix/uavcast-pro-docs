# VLC and RTSP

> Play UAVcast-Pro H.264 RTP video in VLC with an SDP file, or pull the camera from the drone over RTSP on port 8554 for a recording PC, video wall or third-party software.

VLC can play the UAVcast-Pro stream with a small SDP file that describes it. If you'd rather pull the video from the drone than have it pushed to you, the drone's media server also offers each camera over RTSP. Both add more delay than QGroundControl, Mission Planner or GStreamer, so use them for watching and recording, not for flying.

## Play the UDP stream in VLC

1. On the drone, add a destination on [Ground Control Stations](https://docs.uavmatrix.com/uavcast-pro/ground-stations/) with this computer's IP and **Enable Video** on.

2. Save this as `uavcast.sdp`:

   ```text
   v=0
   o=- 0 0 IN IP4 127.0.0.1
   s=UAVcast-Pro
   c=IN IP4 0.0.0.0
   t=0 0
   m=video 5600 RTP/AVP 96
   a=rtpmap:96 H264/90000
   ```

3. Open it in VLC with **Media → Open File**.

For camera 2 in dual stream, make a copy with `m=video 5601`. To add the audio track, append:

```text
m=audio 5602 RTP/AVP 97
a=rtpmap:97 opus/48000/2
```

To cut the delay, lower **Network caching** in VLC (**Tools → Preferences → Show settings: All → Input / Codecs**). Expect more delay than GStreamer anyway.

## Pull the video from the drone over RTSP

While the camera runs with **Enable Live Preview?** ticked or with camera recording enabled, the drone's media server publishes each camera over RTSP (TCP only) on port 8554:

```text
rtsp://<drone-ip>:8554/camera     # camera 1
rtsp://<drone-ip>:8554/camera2    # camera 2 (dual stream)
```

Open it in VLC (**Media → Open Network Stream**), in a video management system, or with GStreamer:

```bash
gst-launch-1.0 rtspsrc location=rtsp://192.168.1.50:8554/camera latency=100 ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Use this on the local network or over the VPN. Don't forward port 8554 to the internet: the stream has no password.

## Which method should I use?

| You want | Use |
| --- | --- |
| To fly with video | [QGroundControl](https://docs.uavmatrix.com/uavcast-pro/ground-stations/qgroundcontrol/) or [Mission Planner](https://docs.uavmatrix.com/uavcast-pro/ground-stations/mission-planner/) |
| A quick test, a second camera window, or audio | GStreamer on [Windows](https://docs.uavmatrix.com/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/uavcast-pro/ground-stations/gstreamer-linux/) or [macOS](https://docs.uavmatrix.com/uavcast-pro/ground-stations/gstreamer-macos/) |
| VLC because it's already installed | The SDP file above |
| A PC or system that should fetch the video itself | RTSP |

Source: https://docs.uavmatrix.com/uavcast-pro/ground-stations/vlc-and-rtsp/
