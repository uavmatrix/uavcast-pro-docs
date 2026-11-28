# 地面控制站

> 在 UAVcast-Pro 中新增地面站目標，將 MAVLink 遙測（UDP 14550）與 H.264 影像（UDP 5600）串流至 Mission Planner、QGroundControl 或多台電腦。

目標位址會告訴 UAVcast-Pro 要將遙測與影像傳送到哪裡。每個目標都包含一組 IP 位址、一個遙測連接埠與一個影像連接埠。UAVcast-Pro 會同時以 UDP 傳送至每個已啟用的目標，因此一台筆電上的 Mission Planner 與一台平板上的 QGroundControl 都能接收無人機的資料。請在側邊欄中開啟**地面控制站**。

![地面控制站頁面，包含兩張目標卡片與新增目標位址按鈕](https://docs.uavmatrix.com/zh-tw/img/screenshots/uavcast-pro/ground-control.webp)

*兩張目標卡片：一張已停用且為空，另一張為已啟用的目標，並開啟了遙測與影像。*

## 新增目標位址

1. 選擇**新增目標位址**。會出現一張新卡片。（全新安裝時已有一張空白卡片。）
2. 輸入**名稱**，例如 `Pilot laptop`。
3. 在**目標IP或主機**中輸入地面站電腦的 IPv4 位址，然後按下 Enter。出現綠色勾號即表示已儲存。
4. 確認**遙測連接埠**（預設 `14550`）與**視訊連接埠**（預設 `5600`）。請使用您的地面站所監聽的連接埠。
5. 開啟**啟用遙測**，若需要影像，也請開啟**啟用視訊**。

每個欄位都會在您按下 Enter 或離開欄位時儲存。此頁面沒有「儲存」按鈕。遙測路由會在數秒內套用變更。

> **請使用 IPv4 位址，而非主機名稱**
>
> 儘管標籤為**目標IP或主機**，UAVcast-Pro 只接受 IPv4 位址，例如 `192.168.1.20`，或 VPN 位址，例如 `10.147.17.5`。主機名稱會被拒絕，並出現 *請輸入有效的 IPv4 位址，例如 192.168.1.10。*

## 使用哪個 IP 位址

| 地面站所在位置 | 使用 |
| --- | --- |
| 與無人機位於相同的 Wi-Fi 或乙太網路 | 地面站的區域網路位址，例如 `192.168.1.20`。 |
| 任何地方（透過 4G/LTE） | 地面站的 **VPN** 位址（ZeroTier、Tailscale 或 Fleet Manager）。請參閱 [VPN](https://docs.uavmatrix.com/zh-tw/uavcast-pro/connectivity/vpn/)。 |
| 多台電腦 | 每台電腦各設定一個目標。 |

## 目標設定

| 設定 | 預設值 | 可選值 | 說明 |
| --- | --- | --- | --- |
| **啟用終端** | 開啟 | 開啟、關閉 | 總開關。關閉後會停止向此目標傳送遙測、影像與音訊，但會保留其設定。 |
| **名稱** | 空白 | 最多 49 個字元 | 顯示於卡片與儀表板中。 |
| **目標IP或主機** | 空白 | IPv4 位址 | 在開啟遙測或影像之前必須先填寫。 |
| **遙測連接埠** | `14550` | 1–65535 | 地面站監聽 MAVLink 的 UDP 連接埠。 |
| **視訊連接埠** | `5600` | 1–65535 | 攝影機 1 的 H.264 RTP 影像所使用的 UDP 連接埠。 |
| **視訊連接埠（攝影機 2）** | 空白 = 視訊連接埠 + 1 | 1–65535 | 僅在[雙路串流](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/multi-camera/)開啟時顯示。 |
| **啟用視訊** | 關閉 | 開啟、關閉 | 將攝影機串流傳送至此目標。 |
| **啟用遙測** | 關閉 | 開啟、關閉 | 將 MAVLink 傳送至此目標，並接受來自該目標的指令。 |
| **Read Only** | 關閉 | 開啟、關閉 | 需要開啟**啟用遙測**。地面站可接收遙測，但無法變更無人機上的任何內容：指令、解鎖、模式變更、參數寫入、任務寫入、RC 覆寫與手動控制都會被封鎖。 此行為自 UAVcast-Pro 6.5.3 起適用；在較早的版本中，Read Only 不會阻擋參數寫入。 |

當您在攝影機頁面中開啟**傳送音訊到地面站**時，音訊會傳送至每個接收影像的目標，使用**視訊連接埠 + 2**（例如 `5602`）。請參閱[音訊](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/audio/)。

因此，每個目標會佔用三個影像端連接埠：**視訊連接埠**、+ 1（攝影機 2）與 + 2（音訊）。若兩個目標指向同一台電腦，請將其影像連接埠間隔 3，例如 `5600` 與 `5603`。請參閱[同一台電腦上的兩個地面站](https://docs.uavmatrix.com/zh-tw/guides/multiple-ground-stations/#3-two-stations-on-one-computer)。

## 設定接收端

選擇您在地面端使用的程式。每個頁面都有精確的設定、防火牆步驟，以及常見錯誤的修復方式。

| 地面站 | 遙測 | 影像 | 頁面 |
| --- | --- | --- | --- |
| Mission Planner（Windows） | UDP 14550 | 5600 上的 GStreamer 來源 | [Mission Planner](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/mission-planner/) |
| QGroundControl（Windows、macOS、Linux） | UDP 14550，自動連線 | 5600 上的 UDP h.264 | [QGroundControl](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/qgroundcontrol/) |
| Android 平板或手機 | QGroundControl，UDP 14550 | 5600 上的 UDP h.264 | [Android](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/android/) |
| Windows 上的 GStreamer | – | 5600 上的 `gst-launch-1.0` | [Windows 上的 GStreamer](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/gstreamer-windows/) |
| Linux 上的 GStreamer | – | 5600 上的 `gst-launch-1.0` | [Linux 上的 GStreamer](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/gstreamer-linux/) |
| macOS 上的 GStreamer | – | 5600 上的 `gst-launch-1.0` | [macOS 上的 GStreamer](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/gstreamer-macos/) |
| VLC，或從無人機拉取 RTSP | – | SDP 檔案，或 8554 上的 RTSP | [VLC 與 RTSP](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/vlc-and-rtsp/) |

### 無人機傳送的內容

| 串流 | 格式 | 地面站上的連接埠 |
| --- | --- | --- |
| 遙測 | 透過 UDP 傳輸的 MAVLink | **遙測連接埠**（預設 `14550`） |
| 攝影機 1 影像 | UDP 上的 RTP H.264，payload type 96 | **視訊連接埠**（預設 `5600`） |
| 攝影機 2 影像（雙路串流） | UDP 上的 RTP H.264，payload type 96 | **視訊連接埠（攝影機 2）**（預設為視訊連接埠 + 1，即 `5601`） |
| 音訊（選用） | UDP 上的 RTP Opus，payload type 97，48 kHz | 視訊連接埠 + 2（`5602`） |

無人機會將每個串流推送至目標。不需要任何東西連線到無人機，但地面站的防火牆必須允許 UDP 封包進入。

## 多個地面站

每台電腦各新增一個目標。若兩個地面站在**同一台**電腦上執行（例如 QGroundControl 與記錄工具），請為它們指定不同的遙測連接埠，例如 `14550` 與 `14551`，並在每個應用程式中設定對應的連接埠。

觀察者、酬載操作員或第二個螢幕請使用 **Read Only**：他們可以看到所有內容，但無法對飛行器下達指令。

## 來自 Fleet Manager 的目標

當無人機與 Fleet Manager 配對，且您在該處建立串流綁定時，Fleet Manager 會為您新增目標。這些卡片會顯示雲端圖示（*Managed by Fleet Manager*）。請在 Fleet Manager 中變更它們，而非在此處變更。請參閱[與 Fleet Manager 配對](https://docs.uavmatrix.com/zh-tw/uavcast-pro/fleet-pairing/)。

## 檢查資料是否正在流動

- [儀表板](https://docs.uavmatrix.com/zh-tw/uavcast-pro/dashboard/) 中的 **Ground station** 列會顯示 *Sending · 16 packets/s* 或 *Sending to 2 · … packets/s*。
- **飛行控制器 → 連線 → Connection check** 會列出每個目標及其封包速率。
- *1 set up · waiting for flight controller* 表示目標正常，但尚未從飛行控制器收到遙測。

唯讀使用者可以檢視此頁面，但無法變更。

## 疑難排解

- [地面站沒有遙測](https://docs.uavmatrix.com/zh-tw/troubleshooting/no-telemetry-in-gcs/)
- [QGroundControl 或 Mission Planner 沒有影像](https://docs.uavmatrix.com/zh-tw/troubleshooting/no-video-in-gcs/)

Source: https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/
