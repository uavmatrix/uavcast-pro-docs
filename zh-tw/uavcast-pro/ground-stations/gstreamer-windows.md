# Windows 上的 GStreamer

> 在 Windows（MSVC 64 位元、Complete 安裝）上安裝 GStreamer、將其加入 PATH，並在 PowerShell 或 cmd 中以 gst-launch-1.0 播放 UAVcast-Pro H.264 影像與 Opus 音訊。包括防火牆與常見問題的修復方式。

GStreamer 會在自己的視窗中播放 UAVcast-Pro 影像串流，不需要地面站程式。您可以用它測試影像是否抵達電腦、在 Mission Planner 或 QGroundControl 旁觀看第二台攝影機，或收聽音軌。設定約需五分鐘。

## 開始之前

在無人機上，於 [地面控制站](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/) 新增目標，填入此電腦的 IP 位址（`ipconfig` 可顯示；透過 4G 時使用 VPN 位址），並開啟**啟用視訊**。

## 步驟 1：安裝 GStreamer

1. 前往 [gstreamer.freedesktop.org/download](https://gstreamer.freedesktop.org/download/)，下載 **MSVC 64-bit** 的 Windows **runtime** 安裝程式（不是開發用安裝程式，也不是 MinGW）。
2. 執行安裝程式，並在詢問安裝類型時選擇 **Complete**（完整）。
3. 記下安裝資料夾。較新的安裝程式使用 `C:\Program Files\gstreamer\1.0\msvc_x86_64`，較舊版本則使用 `C:\gstreamer\1.0\msvc_x86_64`。

> **請選擇 Complete，而非 Typical**
>
> **Typical** 安裝會省略 H.264 解碼器（`avdec_h264`）。之後下方的指令會失敗，並出現 *no element "avdec_h264"*。請重新執行安裝程式，並選擇 **Complete**。

## 步驟 2：將 GStreamer 加入 PATH

為了能在任何資料夾中執行 `gst-launch-1.0`，請將其 `bin` 資料夾加入您的使用者 PATH。在 PowerShell 中（不需要系統管理員權限），並以您的安裝資料夾為準：

```powershell
$bin = "C:\Program Files\gstreamer\1.0\msvc_x86_64\bin"
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
[Environment]::SetEnvironmentVariable("Path", "$userPath;$bin", "User")
```

關閉並重新開啟終端機，然後檢查：

```powershell
gst-launch-1.0 --version
```

或使用 Windows 設定：搜尋**編輯您帳戶的環境變數**，選取 **Path** → **編輯** → **新增**，然後貼上 `bin` 資料夾。

## 步驟 3：播放影像

**PowerShell**

```powershell
gst-launch-1.0 -v udpsrc port=5600 'caps=application/x-rtp,media=video,clock-rate=90000,encoding-name=H264,payload=96' ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

請保留 `caps=…` 兩側的單引號：若沒有它們，PowerShell 會在逗號處將值切開。

**命令提示字元（cmd）**

```bat
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

偵測到第一個關鍵影格後會開啟視窗。關閉視窗，或在終端機中按下 **Ctrl+C**，即可停止。

> **您應該看到的畫面**
>
> 1. 終端機會印出 `Setting pipeline to PLAYING ...` 並等待影像。
> 2. 第一批封包抵達後，`-v` 會印出包含 `caps = application/x-rtp` 的行。
> 3. 影像視窗會顯示攝影機畫面。
>
> 若在第 1 步之後停止，表示沒有影像抵達此電腦：請參閱下方的疑難排解表格。

若要觀看[雙路串流](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/multi-camera/)的攝影機 2，請在第二個終端機中以 `port=5601` 執行相同的指令。

### 低延遲變體

連線品質良好時，可縮短抖動緩衝區的延遲：

```powershell
gst-launch-1.0 udpsrc port=5600 'caps=application/x-rtp,media=video,clock-rate=90000,encoding-name=H264,payload=96' ! rtpjitterbuffer latency=0 ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

在 4G 上，請保留預設的抖動緩衝區（第一個指令），它能隱藏較晚抵達的封包。

### 雙擊捷徑

將此內容儲存為桌面上的 `uavcast-video.cmd`，然後雙擊執行：

```bat
@echo off
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
pause
```

若 GStreamer 不在 PATH 中，請將 `cd /d "C:\Program Files\gstreamer\1.0\msvc_x86_64\bin"` 加為第二行。

## 收聽音訊

在無人機的**攝影機**頁面中開啟**音訊**與**傳送音訊到地面站**。音訊會抵達視訊連接埠 + 2：

```powershell
gst-launch-1.0 udpsrc port=5602 'caps=application/x-rtp,media=audio,encoding-name=OPUS,clock-rate=48000,payload=97' ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

## 允許防火牆通過

`gst-launch-1.0` 第一次開始監聽時，Windows 會詢問是否允許。請勾選**私人**與**公用**（VPN 介面卡通常被歸類為**公用**）。若要為任何程式開啟連接埠，請在系統管理員 PowerShell 中執行：

```powershell
New-NetFirewallRule -DisplayName "UAVcast-Pro video and audio" -Direction Inbound -Protocol UDP -LocalPort 5600-5602 -Action Allow
```

## 疑難排解

| 訊息或現象 | 解決方式 |
| --- | --- |
| *'gst-launch-1.0' is not recognized…* | GStreamer 不在 PATH 中。請執行步驟 2 並開啟新的終端機，或從 `bin` 資料夾執行。 |
| *WARNING: erroneous pipeline: no element "avdec_h264"* | 使用了 Typical 安裝。請以 **Complete** 重新安裝。 |
| *no element "rtph264depay"* 或 *"udpsrc"* | 原因相同：外掛集未安裝。請以 **Complete** 重新安裝。 |
| 執行正常，但沒有視窗開啟 | 沒有任何資料抵達。請檢查無人機上的目標 IP（4G 時為 VPN IP）、**啟用視訊**、攝影機與防火牆。使用 `-v` 時，封包抵達後會出現包含 `caps = application/x-rtp` 的行。 |
| *Could not get/set settings from/on resource* 或綁定錯誤 | 其他程式（Mission Planner、QGroundControl 或第二個 GStreamer）已在監聽該連接埠。請關閉它。 |
| 畫面出現灰色殘影或凍結 | 封包遺失。請降低無人機上的位元率，並將**串流恢復速率**設為 15–30 個影格。 |
| *erroneous pipeline: could not parse caps*（PowerShell 中） | `caps=…` 周圍的引號遺失，或使用了帶有空格的雙引號。請完全依照所示的 PowerShell 指令使用。 |

使用 Linux 或 Mac？請參閱 [Linux 上的 GStreamer](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/gstreamer-linux/) 或 [macOS 上的 GStreamer](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/gstreamer-macos/)。

Source: https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/gstreamer-windows/
