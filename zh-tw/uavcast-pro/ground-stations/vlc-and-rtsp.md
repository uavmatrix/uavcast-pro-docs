# VLC 與 RTSP

> 使用 SDP 檔案在 VLC 中播放 UAVcast-Pro 的 H.264 RTP 視訊，或透過連接埠 8554 的 RTSP 從無人機擷取攝影機畫面，供錄影電腦、視訊牆或第三方軟體使用。

VLC 可以使用一個描述串流內容的小型 SDP 檔案來播放 UAVcast-Pro 串流。若您不想讓視訊推送到您這裡，而是想從無人機拉取視訊，無人機的媒體伺服器也會透過 RTSP 提供每一支攝影機的影像。這兩種方式都比 QGroundControl、Mission Planner 或 GStreamer 增加更多延遲，因此請用於觀看與錄影，而非用於飛行。

## 在 VLC 中播放 UDP 串流

1. 在無人機上，於 [地面控制站](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/) 新增一個目標位址，填入此電腦的 IP，並開啟 **啟用視訊**。

2. 將以下內容另存為 `uavcast.sdp`：

   ```text
   v=0
   o=- 0 0 IN IP4 127.0.0.1
   s=UAVcast-Pro
   c=IN IP4 0.0.0.0
   t=0 0
   m=video 5600 RTP/AVP 96
   a=rtpmap:96 H264/90000
   ```

3. 使用 **Media → Open File** 在 VLC 中開啟該檔案。

若要播放雙路視訊串流中的攝影機 2，請複製一份檔案，並使用 `m=video 5601`。若要加入音訊軌，請在檔案末尾附加以下內容：

```text
m=audio 5602 RTP/AVP 97
a=rtpmap:97 opus/48000/2
```

若要降低延遲，請在 VLC 中調低 **Network caching**（**Tools → Preferences → Show settings: All → Input / Codecs**）。無論如何，其延遲仍會高於 GStreamer。

## 透過 RTSP 從無人機拉取視訊

當攝影機執行中且已勾選 **啟用即時預覽？**，或已啟用攝影機錄製時，無人機的媒體伺服器會透過連接埠 8554，以 RTSP（僅 TCP）發布每一支攝影機的影像：

```text
rtsp://<drone-ip>:8554/camera     # camera 1
rtsp://<drone-ip>:8554/camera2    # camera 2 (dual stream)
```

可在 VLC（**Media → Open Network Stream**）、視訊管理系統中開啟，或使用 GStreamer 開啟：

```bash
gst-launch-1.0 rtspsrc location=rtsp://192.168.1.50:8554/camera latency=100 ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

請僅在區域網路或 VPN 中使用此方式。請勿將連接埠 8554 轉送至網際網路：此串流沒有密碼保護。

## 我應該使用哪種方式？

| 您的需求 | 使用方式 |
| --- | --- |
| 邊飛行邊觀看視訊 | [QGroundControl](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/qgroundcontrol/) 或 [Mission Planner](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/mission-planner/) |
| 快速測試、第二個攝影機視窗或音訊 | 在 [Windows](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/gstreamer-windows/)、[Linux](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/gstreamer-linux/) 或 [macOS](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/gstreamer-macos/) 上使用 GStreamer |
| 已安裝 VLC，想直接使用 | 上方的 SDP 檔案 |
| 需要由電腦或系統自行擷取視訊 | RTSP |

Source: https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/vlc-and-rtsp/
