# QGroundControl 或 Mission Planner 沒有視訊

> 遙測正常，但 QGroundControl 或 Mission Planner 的視訊仍是黑畫面？請檢查攝影機、啟用視訊、目標 IP、UDP 5600 與地面站。

遙測已送達，無人機也顯示在地圖上，但視訊區域仍是黑的，或 QGroundControl 的視訊視窗顯示 **WAITING FOR VIDEO**。請依序完成以下檢查。多數情況可以由檢查 2 或檢查 3 解決。

![QGroundControl 的 Fly 檢視，已連接至 ArduPilot 飛行器：工具列顯示 Not Ready 與 Stabilize，地圖上是五個航點的任務，飛行器顯示 No GPS Lock，左下角的視訊視窗顯示 WAITING FOR VIDEO](https://docs.uavmatrix.com/zh-tw/img/screenshots/gcs/qgroundcontrol--fly-view.webp)

*QGroundControl 中的症狀：遙測已送達（工具列顯示 Not Ready、Stabilize；此台架環境沒有 GPS，因此顯示 No GPS Lock），但左下角的視訊視窗顯示 WAITING FOR VIDEO。*

| 您會看到的畫面 | 可能原因 | 從此開始 |
| --- | --- | --- |
| 地面站與 UAVcast-Pro 即時預覽的視訊皆為黑畫面 | 無人機上的攝影機未在執行 | [檢查 1](https://docs.uavmatrix.com/zh-tw/troubleshooting/no-video-in-gcs/#check-1) |
| 即時預覽正常，但地面站仍為黑畫面 | 此地面站未開啟啟用視訊，或 IP 錯誤 | [檢查 2](https://docs.uavmatrix.com/zh-tw/troubleshooting/no-video-in-gcs/#check-2) |
| 在家中 Wi-Fi 下正常，透過 4G 則為黑畫面 | 目標位址使用本地 IP，而非 VPN IP | [檢查 2](https://docs.uavmatrix.com/zh-tw/troubleshooting/no-video-in-gcs/#check-2) |
| 設定看起來都正確，但在 Windows 上仍為黑畫面 | 防火牆阻擋了連接埠 5600 的傳入 UDP | [檢查 3](https://docs.uavmatrix.com/zh-tw/troubleshooting/no-video-in-gcs/#check-3) |
| QGroundControl 顯示視訊，但 Mission Planner 沒有 | Mission Planner 未設定 GStreamer 來源 | [檢查 4](https://docs.uavmatrix.com/zh-tw/troubleshooting/no-video-in-gcs/#check-4) |

## 檢查 1：確認攝影機正在無人機上串流

若無人機沒有產生視訊，任何地面站設定都無法解決問題。

1. 開啟 UAVcast-Pro 網頁介面，前往**攝影機 → 攝影機設定**。
2. 確認**啟用攝影機？**為**是**，並在**選擇攝影機**中選定攝影機。
3. 確認攝影機正在執行：儀表板的**視訊**列應顯示**執行中**。若已停止，請在攝影機頁面按下**啟動**（攝影機執行中時按鈕會顯示**重啟**）。
4. 開啟**啟用即時預覽？**並查看**即時預覽**。若看到畫面，表示攝影機正常，可以前往檢查 2。
5. 若**選擇攝影機**顯示**沒有可用的攝影機**，請前往[UAVcast-Pro 無法偵測攝影機（CSI 與 USB）](https://docs.uavmatrix.com/zh-tw/troubleshooting/camera-not-detected/)。

![UAVcast-Pro 攝影機設定頁面，已啟用 CAM 1，即時預覽面板顯示暫無可用視訊](https://docs.uavmatrix.com/zh-tw/img/screenshots/uavcast-pro/camera.webp)

*攝影機 → 攝影機設定，已啟用 CAM 1。在勾選**啟用即時預覽？**之前，**即時預覽**會顯示**暫無可用視訊**。*

> **預覽不是地面站的串流**
>
> 瀏覽器預覽是透過內建的媒體伺服器（連接埠 8889 上的 WebRTC）。地面站則會透過 UDP 取得獨立的 H.264 串流。預覽正常只能證明攝影機運作正常，無法證明 UDP 串流已經送達您的筆電。

若攝影機頁面上的**操作日誌**表示攝影機*不支援*某個解析度，請在**解析度**中選擇其他值。UAVcast-Pro 會退回到支援的最大尺寸，並記錄它所使用的尺寸。

## 檢查 2：檢查地面站目標位址

UAVcast-Pro 只會將視訊傳送到已開啟視訊的目標位址。遙測與視訊各有獨立的開關，而**新的目標位址兩者預設皆為關閉**。

1. 前往**地面控制站**，找到執行地面站軟體那台電腦的卡片。
2. 確認**啟用終端**與**啟用視訊**皆已開啟。
3. 檢查**目標IP或主機**。它必須是從無人機角度看到的地面站電腦 IPv4 位址。不接受主機名稱。
4. 檢查**視訊連接埠**是否為 `5600`，或是地面站所監聽的連接埠。
5. 欄位會在您離開或按下 Enter 時儲存。綠色勾號表示已儲存成功。

![視訊連接埠 5600，且啟用視訊開關已開啟](https://docs.uavmatrix.com/zh-tw/img/screenshots/uavcast-pro/ground-control--video-enabled.webp)

*地面控制站：已開啟啟用視訊、視訊連接埠為 5600 的目標位址。*

> **透過 4G 飛行？請使用 VPN IP**
>
> 透過行動網路時，無人機無法連到您筆電的本地位址（例如 `192.168.1.20`）。請使用您的筆電在 VPN 上取得的位址（Fleet Manager VPN、Tailscale 或 ZeroTier）。在 Windows 上，請執行 `ipconfig`，並找出 Tailscale 或 ZeroTier 的網路卡。

使用 Fleet Manager 嗎？新增串流綁定時會為您建立目標位址，而同一個地面站上每架額外的無人機都會有各自的連接埠。請檢查綁定上顯示的視訊連接埠，而非 5600。 請參閱[串流綁定](https://docs.uavmatrix.com/zh-tw/fleet-manager/network/stream-bindings/)。

## 檢查 3：允許 UDP 5600 通過防火牆

視訊是以傳入的 UDP 流量抵達。在 Windows 上，即使遙測能正常通過（因為地面站已要求開放例外規則），這類流量預設仍會被阻擋。

**Windows**

以**系統管理員身分開啟 PowerShell**，並執行：

```powershell
New-NetFirewallRule -DisplayName "UAV Video" -Direction Inbound -Protocol UDP -LocalPort 5600 -Action Allow
New-NetFirewallRule -DisplayName "MAVLink Telemetry" -Direction Inbound -Protocol UDP -LocalPort 14550 -Action Allow
```

ZeroTier 與 Tailscale 網路卡常被歸類為*公用*網路。以這種方式建立的規則會套用至所有設定檔。

**Linux**

```bash
sudo ufw allow 5600/udp comment 'UAV Video'
sudo ufw allow 14550/udp comment 'MAVLink Telemetry'
```

**macOS**

macOS 防火牆會允許您核准的應用程式接收傳入的 UDP。若您在 QGroundControl 首次啟動時按了*拒絕*，請在**系統設定 → 網路 → 防火牆 → 選項**中重新允許。

## 檢查 4：在地面站中設定視訊

**QGroundControl**

1. 點擊 **Q** 圖示，然後點擊 **Application Settings**。
2. 開啟視訊設定（**Video**，舊版則為 **General → Video**）。
3. 將**來源**設為 **UDP h.264 Video Stream**，並確認 UDP 位址使用連接埠 `5600`（目前版本為 **UDP URL** `0.0.0.0:5600`，舊版為 **UDP Port** `5600`）。
4. 返回 Fly 檢視。視訊畫面應在數秒內顯示畫面。

**Mission Planner**

Mission Planner 會在 HUD 中顯示視訊。若仍是黑畫面，請手動設定來源：

1. 在 HUD 上按右鍵，選擇 **Video → Set GStreamer Source**。
2. 貼上以下管線並確認：

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

## 檢查 5：不使用地面站測試串流

此測試會排除地面站軟體。若開啟了一個顯示視訊的視窗，表示無人機、網路與防火牆都正常，問題出在地面站的設定。

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

> **Windows：請選擇完整安裝**
>
> 安裝 GStreamer（MSVC 64 位元執行階段）時，請選擇**完整**。典型安裝會略過 H.264 解碼器，指令會失敗並顯示 `no element "avdec_h264"`。

在再次開啟地面站之前，請關閉此測試：同一時間只有一個程式能監聽連接埠 5600。逐步的接收端設定說明請見 [Mission Planner](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/mission-planner/)、[QGroundControl](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/qgroundcontrol/)，以及 [Windows](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/gstreamer-windows/)、[Linux](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/gstreamer-linux/) 或 [macOS](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/gstreamer-macos/) 上的 GStreamer。

> **有視訊了，但透過 4G 時卡頓？**
>
> 請參閱 [4G 下視訊卡頓、延遲或灰色色塊](https://docs.uavmatrix.com/zh-tw/troubleshooting/choppy-or-delayed-video/)。

## 仍然沒有視訊？

在日誌清單中選取 **Camera Server** 的情況下[下載日誌](https://docs.uavmatrix.com/zh-tw/troubleshooting/collect-logs/)，並連同您的 UAVcast-Pro 版本、攝影機型號與您使用的地面站，寄送至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**。

相關頁面：[攝影機設定](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/) · [地面控制站](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/)

Source: https://docs.uavmatrix.com/zh-tw/troubleshooting/no-video-in-gcs/
