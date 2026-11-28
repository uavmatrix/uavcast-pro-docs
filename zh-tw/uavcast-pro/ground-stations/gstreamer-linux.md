# Linux 上的 GStreamer

> 在 Ubuntu、Debian 或 Fedora 上安裝 GStreamer，並以 gst-launch-1.0 播放 UAVcast-Pro H.264 無人機影像與 Opus 音訊，包括第二台攝影機、低延遲與 ufw 設定。

GStreamer 能以一道指令在視窗中播放 UAVcast-Pro 影像串流。您可以用它測試影像路徑、觀看第二台攝影機，或收聽音訊。適用於任何桌面 Linux，包括作為地面站使用的 Raspberry Pi。

## 開始之前

在無人機上，於 [地面控制站](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/) 新增目標，填入此電腦的 IP 位址（`ip -4 addr`；透過 4G 時使用 VPN 位址），並開啟**啟用視訊**。

## 安裝 GStreamer

**Ubuntu / Debian / Raspberry Pi OS**

```bash
sudo apt update
sudo apt install gstreamer1.0-tools gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-libav
```

`gstreamer1.0-libav` 提供 H.264 解碼器（`avdec_h264`）。若沒有它，下方的指令會失敗。

**Fedora**

```bash
sudo dnf install gstreamer1 gstreamer1-plugins-good gstreamer1-plugins-bad-free gstreamer1-plugin-libav
```

基於專利考量，Fedora 官方儲存庫省略了大部分 H.264 支援，因此此步驟之後 `avdec_h264` 仍可能缺失。若下方的檢查失敗，請啟用 [RPM Fusion](https://rpmfusion.org/)，並依照其多媒體指南安裝完整的編解碼函式庫。

請確認 H.264 解碼器已存在：

```bash
gst-inspect-1.0 avdec_h264
```

它會印出該元件的詳細資訊。*No such element or plugin* 表示解碼器缺失。

## 播放影像

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

偵測到第一個關鍵影格後會開啟視窗。按下 **Ctrl+C** 即可停止。

> **您應該看到的畫面**
>
> 1. 終端機會印出 `Setting pipeline to PLAYING ...` 並等待影像。
> 2. 第一批封包抵達後，`-v` 會印出包含 `caps = application/x-rtp` 的行。
> 3. 影像視窗會顯示攝影機畫面。
>
> 若在第 1 步之後停止，表示沒有影像抵達此電腦：請參閱下方的疑難排解表格。

- **攝影機 2**（[雙路串流](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/multi-camera/)）：以 `port=5601` 再次執行。
- **較低延遲**（連線品質良好時）：將 `rtpjitterbuffer` 替換為 `rtpjitterbuffer latency=0`。在 4G 上請保留預設值。

## 收聽音訊

開啟**傳送音訊到地面站**後，音訊會抵達視訊連接埠 + 2：

```bash
gst-launch-1.0 udpsrc port=5602 caps="application/x-rtp, media=(string)audio, clock-rate=(int)48000, encoding-name=(string)OPUS, payload=(int)97" ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

## 防火牆

大多數桌面發行版不會封鎖傳入的 UDP。若 `ufw` 已啟用：

```bash
sudo ufw allow 5600:5602/udp
sudo ufw allow 14550/udp
```

## 疑難排解

| 訊息或現象 | 解決方式 |
| --- | --- |
| *no element "avdec_h264"* | 安裝 `gstreamer1.0-libav`。 |
| *no element "rtph264depay"* | 安裝 `gstreamer1.0-plugins-good`。 |
| 執行正常，但沒有視窗 | 沒有任何資料抵達。請檢查無人機上的目標 IP、**啟用視訊**與防火牆。`sudo tcpdump -ni any udp port 5600` 可顯示封包是否抵達此電腦。 |
| 啟動時出現綁定錯誤 | 其他程式（QGroundControl、另一個 GStreamer）正在監聽該連接埠。請關閉它。 |
| 視窗已開啟，但畫面出現灰色殘影 | 封包遺失。請降低無人機上的位元率，並將**串流恢復速率**設為 15–30 個影格。 |

Source: https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/gstreamer-linux/
