# 自訂 GStreamer 管道

> 在 UAVcast-Pro 中使用自訂 GStreamer 管道串流 RTSP IP 攝影機、熱像儀、H.265 或測試圖案，並附範例，以及預覽與目標的運作方式說明。

當內建的攝影機支援無法涵蓋您的攝影機時，可以提供您自己的 GStreamer 管道。常見情況包括 RTSP IP 攝影機或雲台攝影機、熱像儀、H.265，或傳送至固定位址。UAVcast-Pro 會將管道作為攝影機服務執行，若失敗會自動重新啟動，並且仍能為即時預覽與錄製器提供視訊。

## 設定自訂管道

1. 前往 **攝影機 → 攝影機設定**。
2. 點擊 **攝影機 1** 插槽，並選擇 **輸入自訂管道**。
3. 在 **自訂管道** 中輸入管道，不需要 `gst-launch-1.0` 前綴。（若您貼上時包含該前綴，UAVcast-Pro 會將其移除。）
4. 點擊 **啟動**（或 **重啟**），並在 **操作日誌** 中檢查是否有錯誤。

> **自訂管道會忽略地面站清單**
>
> 管道決定視訊的傳送位置。[地面控制站](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/)中的 **視訊連接埠** 與 **啟用視訊** 不會生效：請將地面站的位址與連接埠寫入管道的 `udpsink`。

在貼上管道之前，請先透過 SSH 執行 `gst-launch-1.0 -v <pipeline>` 進行測試。在終端機中的錯誤訊息較為清楚。

## 範例

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

請將 IP 位址替換為您地面站的位址（若透過 4G 使用 VPN，則填入 VPN 位址）。

## 即時預覽與錄製

啟用 **啟用即時預覽？** 後，UAVcast-Pro 會在您的管道中加入一個分支，將編碼後的視訊傳送至內建媒體伺服器，因此即時預覽、飛行地圖的視訊視窗與錄製功能仍可正常運作。它會自動找到合適的位置：

- 若您的管道包含 `tee name=t`，則會從該 tee 加入一個分支。
- 否則會在 `rtph264pay` 或 `rtph265pay` 之前分流串流。
- 對於沒有可辨識解析器的 RTSP 來源，會保留管道原樣，且不會有預覽。

為獲得最可預測的結果，請以 `h264parse` 與 `tee name=t` 結束您的編碼串流，並將您自己的 `udpsink` 放在該 tee 的分支上。

## 限制

- 雙路視訊串流、RC 切換與單攝影機設定不適用於自訂管道。管道即為整個視訊設定。
- 解析度、FPS、位元率與翻轉設定會被隱藏，因為這些均由管道設定。

Source: https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/custom-pipeline/
