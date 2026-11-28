# VLC 与 RTSP

> 使用 SDP 文件在 VLC 中播放 UAVcast-Pro H.264 RTP 视频，或通过 RTSP（端口 8554）从无人机拉取摄像头画面，用于录制电脑、视频墙或第三方软件。

VLC 可以借助描述该视频流的小型 SDP 文件播放 UAVcast-Pro 视频流。如果希望从无人机拉取视频，而不是由无人机推送过来，无人机的媒体服务器也会通过 RTSP 提供每个摄像头的画面。这两种方式的延迟都比 QGroundControl、Mission Planner 或 GStreamer 更高，因此适用于观看和录制，而不适用于飞行操控。

## 在 VLC 中播放 UDP 流

1. 在无人机上，于[地面控制站](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/)中添加一个目标地址，填写本计算机的 IP 并开启**启用视频**。

2. 将以下内容保存为 `uavcast.sdp`：

   ```text
   v=0
   o=- 0 0 IN IP4 127.0.0.1
   s=UAVcast-Pro
   c=IN IP4 0.0.0.0
   t=0 0
   m=video 5600 RTP/AVP 96
   a=rtpmap:96 H264/90000
   ```

3. 在 VLC 中通过 **Media → Open File** 打开该文件。

对于双流中的摄像头 2，请复制一份文件并将其中的 `m=video 5601` 改写为该端口。如需添加音频轨道，请追加以下内容：

```text
m=audio 5602 RTP/AVP 97
a=rtpmap:97 opus/48000/2
```

如需减少延迟，请在 VLC 中降低 **Network caching** 设置（路径：**Tools → Preferences → Show settings: All → Input / Codecs**）。与 GStreamer 相比，此方式的延迟仍会更高。

## 通过 RTSP 从无人机拉取视频

当摄像头正在运行且已勾选**启用实时预览？**，或已开启摄像头录制时，无人机的媒体服务器会通过 RTSP（仅 TCP）在端口 8554 上发布每个摄像头的画面：

```text
rtsp://<drone-ip>:8554/camera     # camera 1
rtsp://<drone-ip>:8554/camera2    # camera 2 (dual stream)
```

可在 VLC（**Media → Open Network Stream**）、视频管理系统中打开该地址，或使用 GStreamer 打开：

```bash
gst-launch-1.0 rtspsrc location=rtsp://192.168.1.50:8554/camera latency=100 ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

请仅在本地网络或 VPN 中使用此方式。请勿将端口 8554 转发到互联网：该流没有密码保护。

## 应该使用哪种方式？

| 需求 | 使用方式 |
| --- | --- |
| 带视频飞行 | [QGroundControl](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/qgroundcontrol/) 或 [Mission Planner](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/mission-planner/) |
| 快速测试、第二个摄像头窗口或音频 | [Windows](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-windows/)、[Linux](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-linux/) 或 [macOS](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-macos/) 上的 GStreamer |
| 已安装 VLC，希望直接使用 | 上述 SDP 文件 |
| 需要自行获取视频的 PC 或系统 | RTSP |

Source: https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/vlc-and-rtsp/
