# Audio

> Add sound from a USB microphone or a webcam's built-in mic to the UAVcast-Pro live preview, and send it to ground stations as an RTP/Opus stream on Video Port + 2.

UAVcast-Pro can add sound from a USB microphone or a USB camera's built-in mic. Audio is encoded as Opus, which costs little CPU and bandwidth. It always plays in the live preview, and you can also send it to your ground stations as a separate RTP stream. Find it in the **Audio** card on **Camera → Camera settings**.

## Turn on audio

1. Plug in a USB microphone, or use a webcam with a built-in mic.
2. On **Camera → Camera settings**, turn on **Audio**.
3. Leave **Audio device** on **Auto (camera microphone if present)**, or pick a device. Use **Test tone (no microphone needed)** to test the path without a mic.
4. Watch the indicator. **Audio live** with a moving level meter means sound is captured.
5. In **Live Preview**, unmute the player. Browsers start the preview muted.

![Audio card on the Camera page with the Audio switch off and the status Audio off](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/camera--audio.webp)

*Camera → Audio, switched off. Turn it on to choose the microphone and bitrate.*

A microphone that fails never interrupts the video. The indicator shows **Audio error** with the reason instead.

## Send audio to ground stations

Turn on **Send audio to ground stations**. UAVcast-Pro then sends a separate RTP/Opus stream to every ground station that receives video, on that destination's **Video Port + 2**. With the default video port that's `5602`. Two destinations on the same computer therefore need video ports at least 3 apart, for example `5600` and `5603`.

QGroundControl and Mission Planner ignore audio. Play it with GStreamer:

```bash
gst-launch-1.0 udpsrc port=5602 caps="application/x-rtp, media=(string)audio, clock-rate=(int)48000, encoding-name=(string)OPUS, payload=(int)97" ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

The stream is Opus at 48 kHz, RTP payload type 97. VLC can play it with an SDP file that describes those values.

## Settings reference

| Setting | Default | Values | Notes |
| --- | --- | --- | --- |
| **Audio** | Off | On, off | Changing any audio setting restarts the camera service. |
| **Audio device** | **Auto (camera microphone if present)** | Auto, detected capture devices, **Test tone (no microphone needed)** | A saved device that is unplugged shows as *(not connected)*. |
| **Bitrate** | `64 kbps` | 24, 32, 48, 64, 96, 128 kbps | 32–64 kbps is plenty for speech and engine noise. |
| **Send audio to ground stations** | Off | On, off | RTP/Opus to Video Port + 2 on every destination with video enabled. |

## Troubleshooting

- *No audio capture device found*: plug in a USB microphone or a camera with a built-in mic. On the drone, `arecord -l` lists capture devices.
- **No signal**: the device is open but silent. Check the mic's mute switch, or try **Test tone**.
- Audio in the preview but not on the ground station: make sure **Send audio to ground stations** is on, that the destination has **Enable Video** on, and that your receiver listens on Video Port + 2.

Source: https://docs.uavmatrix.com/uavcast-pro/camera/audio/
