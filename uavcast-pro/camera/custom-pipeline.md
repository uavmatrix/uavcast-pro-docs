# Custom GStreamer pipeline

> Use a custom GStreamer pipeline in UAVcast-Pro to stream an RTSP IP camera, a thermal camera, H.265 or a test pattern, with examples and how preview and destinations behave.

When the built-in camera support doesn't cover your camera, give UAVcast-Pro your own GStreamer pipeline. Typical cases are an RTSP IP or gimbal camera, a thermal camera, H.265, or sending to a fixed address. UAVcast-Pro runs the pipeline as the camera service, restarts it if it fails, and can still feed the live preview and the recorder.

## Set up a custom pipeline

1. Go to **Camera → Camera settings**.
2. Click the **CAM 1** slot and choose **Enter Custom Pipeline**.
3. Type the pipeline in **Custom Pipeline**, without the `gst-launch-1.0` prefix. (If you paste it with the prefix, UAVcast-Pro strips it.)
4. Select **Start** (or **Restart**) and check the **Action Logs** for errors.

> **A custom pipeline ignores your ground station list**
>
> The pipeline decides where video goes. **Video Port** and **Enable Video** on [Ground Control Stations](https://docs.uavmatrix.com/uavcast-pro/ground-stations/) have no effect: put the ground station's address and port in the pipeline's `udpsink`.

Test the pipeline over SSH with `gst-launch-1.0 -v <pipeline>` before you paste it. The error messages are clearer there.

## Examples

```text
videotestsrc ! x264enc ! video/x-h264, stream-format=byte-stream ! rtph264pay ! udpsink host=192.168.0.100 port=5600
```

```text
rtspsrc location=rtsp://192.168.144.25:8554/main.264 latency=0 ! rtph264depay ! h264parse ! rtph264pay config-interval=1 pt=96 ! udpsink host=10.147.17.20 port=5600 sync=false
```

```text
v4l2src device=/dev/video0 ! video/x-raw,width=1280,height=720,framerate=30/1 ! videoconvert ! x264enc tune=zerolatency speed-preset=superfast bitrate=1500 key-int-max=30 ! h264parse config-interval=1 ! rtph264pay pt=96 ! udpsink host=10.147.17.20 port=5600 sync=false
```

```text
videotestsrc ! x264enc tune=zerolatency ! rtph264pay pt=96 ! multiudpsink clients=10.147.17.20:5600,10.147.17.21:5600
```

Replace the IP addresses with your ground stations' addresses (VPN addresses over 4G).

## Live preview and recording

With **Enable Live Preview?** ticked, UAVcast-Pro adds a branch to your pipeline that sends the encoded video to the built-in media server, so the preview, the Flight Map video window and recording keep working. It finds the right place automatically:

- If your pipeline has `tee name=t`, it adds a branch from that tee.
- Otherwise it splits the stream just before `rtph264pay` or `rtph265pay`.
- For an RTSP source without a recognised parser, it leaves the pipeline as it is, and there's no preview.

For the most predictable result, end your encoded stream with `h264parse` and a `tee name=t`, and put your own `udpsink` on a branch of that tee.

## Limits

- Dual stream, RC switching and per-camera settings don't apply to a custom pipeline. The pipeline is the whole video setup.
- Resolution, FPS, bitrate and flip settings are hidden, because the pipeline sets them.

Source: https://docs.uavmatrix.com/uavcast-pro/camera/custom-pipeline/
