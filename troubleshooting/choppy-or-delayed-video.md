# Choppy, laggy or grey video over 4G

> Fix stuttering, grey smears and lag in UAVcast-Pro video over LTE or VPN by matching bitrate, resolution, FPS and Stream Recovery Rate to the link.

The picture arrives, but it stutters, freezes, smears grey blocks across the screen or runs seconds behind. Almost always the stream asks for more than the link can carry, or the encoder sends keyframes too rarely to recover from lost packets.

| What you see | Likely cause | Start at |
| --- | --- | --- |
| Grey or green smears that clear up after a second or two | Packets lost and too few keyframes to recover | [Check 2](https://docs.uavmatrix.com/troubleshooting/choppy-or-delayed-video/#check-2) |
| Smooth on Wi-Fi, stutters or freezes over LTE | Bitrate above what the cellular uplink carries | [Check 1](https://docs.uavmatrix.com/troubleshooting/choppy-or-delayed-video/#check-1) |
| Stutters even on the local network | CPU limit on the drone, or the GCS can not decode fast enough | [Check 3](https://docs.uavmatrix.com/troubleshooting/choppy-or-delayed-video/#check-3) |
| Video is seconds behind the drone | You are looking at the browser preview, or the GCS buffers | [Check 4](https://docs.uavmatrix.com/troubleshooting/choppy-or-delayed-video/#check-4) |

## Check 1: Lower the bitrate and resolution

A cellular uplink is much slower than its download speed and changes as the drone moves between cells. Start low and step up.

1. Go to **Camera → Camera settings**.
2. Set **Resolution** to 1280×720 or lower.
3. Set **Select FPS** to 15 or 20.
4. Move the **Bitrate:** slider to about 1000–1500 kbps. `0` means auto.
5. Settings save as you change them, and the camera picks them up.
6. Fly, or drive, the route you care about. If it holds up, raise one value at a time.

![Camera Settings card with Resolution, Select FPS, Bitrate and Stream Recovery Rate](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/camera--settings.webp)

*Camera → Camera Settings: Resolution, Select FPS, Bitrate and Stream Recovery Rate are the values to tune for the uplink.*

> **How much does the link carry?**
>
> **Dashboard → Network Traffic** shows the live TX rate per interface. If the modem interface sits at the same ceiling whatever bitrate you set, that ceiling is your uplink.

## Check 2: Set a faster Stream Recovery Rate

Grey overlays come from lost packets. The decoder can only repair the picture at the next keyframe. **Stream Recovery Rate** sets how often keyframes are sent.

1. In **Camera → Camera settings**, find **Stream Recovery Rate**.
2. Move the slider from **Auto** towards **Ultra Fast**: fewer frames between keyframes repair the picture sooner but use more bandwidth. Towards **Bandwidth Saver** saves bandwidth but recovers slowly. The hint under the slider (for example *VPN/WiFi Friendly*) tells you what each position suits.
3. Save, and compare. If the link is very slow, combine a faster recovery rate with a lower bitrate (check 1).

On **Auto**, UAVcast-Pro sends one keyframe per second (one every *FPS* frames, or every 30 frames when FPS is on auto).

## Check 3: Look at the CPU load

UAVcast-Pro encodes H.264 in software. On a Raspberry Pi Zero 2 W, or with two cameras streaming at once, the CPU can run out.

1. Open **Camera → Camera settings** and look at the **System load** card.
2. If it says **CPU is near its limit. Lower the resolution or bitrate.**, do exactly that.
3. With **Dual stream** on, lower one stream's resolution or bitrate, or turn the second stream off.
4. Check **Dashboard** for **Slowed down (heat or power)** under **Power supply**. A throttled CPU encodes slower. See [Undervoltage and throttling](https://docs.uavmatrix.com/troubleshooting/undervoltage-and-throttling/).

## Check 4: Know which stream you are watching

The **Live Preview** in the browser and the video window on the **Flight Map** go through the built-in media server, which adds delay. They are for setup, not for flying. The stream to your ground station goes straight over UDP and has much lower latency.

If the ground station itself lags:

- In QGroundControl, check that low-latency mode is on in the video settings.
- In GStreamer pipelines, use `sync=false` on the video sink, as in the [test command](https://docs.uavmatrix.com/troubleshooting/no-video-in-gcs/#check-5).
- Over VPN, make sure ZeroTier or Tailscale reaches the drone directly and not through a relay. Tailscale shows the relay in use under **Relay** on the **Virtual Private Network** page.

## Check 5: Check the cellular signal

Go to **Modem** and look at **Signal Quality** and **Technology** under **Modem Information**. A weak signal, or a fall back from LTE to 3G, cuts the uplink. Move the modem away from the flight controller, ESCs and power wires, or use a modem with external antennas.

## Still choppy?

[Download the logs](https://docs.uavmatrix.com/troubleshooting/collect-logs/) (**Camera Server**, last 30 minutes) and send them to **[support@uavmatrix.com](mailto:support@uavmatrix.com)** with your camera model, resolution, FPS, bitrate and the kind of link you fly on.

Related: [Camera settings](https://docs.uavmatrix.com/uavcast-pro/camera/) · [Cellular modem](https://docs.uavmatrix.com/uavcast-pro/connectivity/cellular-modem/)

Source: https://docs.uavmatrix.com/troubleshooting/choppy-or-delayed-video/
