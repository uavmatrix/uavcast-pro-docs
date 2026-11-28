# 連接飛行控制器

> 透過 USB 或 UART 將 Pixhawk 或其他 ArduPilot、PX4 飛行控制器連接至 UAVcast-Pro，支援自動偵測連接埠與鮑率，並提供即時連線檢查。

UAVcast-Pro 會從您的飛行控制器（ArduPilot、PX4 或其他 MAVLink 自動駕駛儀）透過 USB 或 UART（TELEM 連接埠）讀取 MAVLink，並將其轉送給您新增的每一個地面站。**Port**（連接埠）與 **Baud rate**（鮑率）預設為 **Automatic**（自動），系統會自行找到飛行控制器、記住成功的設定，並在重新開機、USB 瞬斷或較晚通電後自動重新連線。您可以在 **Flight Controller → Connection**（飛行控制器 → 連線）中找到此設定。

![飛行控制器連線頁面，顯示 Connected、連線檢查的四個已通過步驟，以及 MAVLink 檢查器](https://docs.uavmatrix.com/zh-tw/img/screenshots/uavcast-pro/flight-controller.webp)

*飛行控制器 → 連線，透過 USB 連接 Pixhawk。*

## 透過 USB 連接

1. 使用支援資料傳輸的線材，將飛行控制器的 USB 連接埠接到伴隨電腦。
2. 前往 **Flight Controller → Connection**（飛行控制器 → 連線），並在 **Link type**（連線類型）下選擇 **USB**。
3. 將 **Port** 保持為 **Automatic**（自動）。USB 連線不使用鮑率。
4. 如果狀態面板顯示 **Link stopped**（連線已停止），請選擇 **Connect**（連接）。

數秒內，狀態會顯示 **CONNECTED**，並附上飛行器類型與系統 ID，例如 *Connected to Quadrotor (system 1) on ArduPilot fmuv2 (ttyACM0)*。

## 透過 TELEM 連接埠（UART）連接

1. 接好 TELEM 連接埠：飛行控制器的 **TX → RX**（連接至伴隨電腦），**RX → TX**，以及 **GND → GND**。若兩塊板子都有各自的電源，請勿接上 5 V。
2. 在飛行控制器上，將該連接埠設為 MAVLink 2：若使用 TELEM2，則設定 `SERIAL2_PROTOCOL = 2`。記下 `SERIAL2_BAUD`。
3. 在 UAVcast-Pro 中，於 **Link type**（連線類型）下選擇 **UART / Serial**。
4. 將 **Port** 與 **Baud rate** 保持為 **Automatic**（自動），或手動選擇連接埠（在 Raspberry Pi 上，GPIO UART 會標示為 **recommended**（建議））與符合 `SERIALx_BAUD` 的鮑率。
5. 如果連線已停止，請選擇 **Connect**（連接）。

變更會立即生效，無須重新啟動任何項目。

> **自動鮑率**
>
> 在自動模式下，UAVcast-Pro 會依序嘗試 57600、115200、921600、1500000、460800、230400 與 500000 鮑率，並從上次成功的鮑率開始。若心跳停止 20 秒，但仍有資料送達（例如在您變更 `SERIALx_BAUD` 之後），系統會重新搜尋。

## 設定參考

| 設定 | 預設值 | 可用值 | 說明 |
| --- | --- | --- | --- |
| **Link enabled**（啟用連線） | 開啟 | 開啟、關閉 | 關閉後會釋放序列埠，並停止傳送遙測給所有地面站。 |
| **Link type**（連線類型） | **USB** | **USB**、**UART / Serial** | 決定 **Automatic** 會搜尋哪些連接埠。 |
| **Port**（連接埠） | **Automatic** | **Automatic**、偵測到的連接埠、**Custom path…**（自訂路徑…） | Automatic 會優先使用穩定的 `/dev/serial/by-id/…` 路徑，並在裝置編號變更時跟隨該裝置。Custom path 可使用任何裝置，例如 `/dev/ttyAMA0`。若連接埠正被其他程式使用，會顯示 *in use by …*（正由…使用）。 |
| **Baud rate**（鮑率） | **Automatic** | **Automatic** 或固定鮑率 | USB 會忽略此設定。手動設定時必須與 `SERIALx_BAUD` 相符。 |

## 閱讀狀態面板

| 狀態 | 意義 |
| --- | --- |
| **Connected**（已連接） | 正在接收心跳。**Connected for**（已連接時間）、**Last heartbeat**（上次心跳）與 **Auto-reconnects**（自動重新連線次數）可顯示連線健康狀況。 |
| **Waiting for device**（等待裝置） | 連接埠不存在。飛行控制器可能未插上、未供電，或仍在開機中。 |
| **Detecting baud rate**（偵測鮑率中） | 正在嘗試各種鮑率（*Trying 115200 baud (2 of 7)*，即正在嘗試 115200 鮑率（第 2／7 個））。 |
| **No heartbeat**（無心跳） | 連接埠已開啟，但沒有收到有效的 MAVLink：鮑率錯誤、TX／RX 接反，或連接埠未設定為 MAVLink。 |
| **Reconnecting**（重新連線中） | 連線已中斷，正在自動恢復。 |
| **Searching**（搜尋中） | **Auto-detect**（自動偵測）正在掃描每個連接埠與速率。此過程最多可能需要一分鐘。 |
| **Off**（關閉）／**Stopped**（已停止） | 連線已關閉或停止。請選擇 **Connect**（連接）。 |

### 連線檢查

**Connection check**（連線檢查）卡片每秒更新一次，會追蹤資料從線路到地面站的完整路徑。第一列不是綠色的項目即為問題所在：

1. **Flight controller plugged in**（飛行控制器已插上，USB 時）或 **Serial port available**（序列埠可用，UART 時）。*Not detected*（未偵測到）通常表示使用的是僅供充電的 USB 線，或沒有供電。
2. **Signal on the wire**（線路上有訊號）：連接埠有收到位元組。
3. **Readable flight controller data**（可讀取的飛行控制器資料）：位元組可解碼為 MAVLink。*% damaged*（損壞百分比）表示接線鬆動或過長、缺少接地，或電源線造成干擾。
4. **Flight controller responding**（飛行控制器有回應）：收到飛行器的心跳。
5. **Sending to ground station**（傳送至地面站）：每個已啟用目的地的每秒封包數，或 *No ground station set up*（未設定地面站）。

### 自動偵測

**Auto-detect**（自動偵測）會暫停連線，監聽每個序列埠的每種鮑率，儲存找到的連接埠與速率，並以此啟動連線。當您不確定飛行控制器使用哪個連接埠或鮑率時，請使用此功能。**Show what was tried**（顯示嘗試過的設定）會列出每一次嘗試。

## MAVLink 檢查器面板

右側欄會顯示飛行器的即時狀態：連線、**GCS Failsafe Information**（GCS 故障保護資訊）、**Vehicle Information**（飛行器資訊，包括類型、控制器、飛行模式與解鎖狀態）、**Battery Status**（電池狀態）、**GPS Information**（GPS 資訊）以及飛行資料。若面板顯示 **Warning - Failsafe Disabled**（警告 - 故障保護已停用），表示飛行控制器沒有 GCS 故障保護。在透過行動網路飛行前，請啟用此功能（ArduPilot 為 `FS_GCS_ENABLE`）。

## 安全性：不開放遙測連接埠

UAVcast-Pro 不接受傳入的遙測連線。mavlink-router 通常會開啟的 TCP 伺服器（連接埠 5760）已被關閉，因此只有您在[地面控制站](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/)中新增的地面站才會收到遙測，且僅在 **Enable Telemetry**（啟用遙測）開啟時才會收到。

> **從舊版本升級**
>
> 較舊的版本預設使用 `/dev/ttyACM0` 與 57600 鮑率，並接受連接埠 5760 上的 TCP 連線。自 v6.4.3 起，每個裝置都會一次性切換為 **Automatic**（自動），並優先嘗試舊的連接埠與鮑率。自 v6.5.0 起，TCP 5760 已關閉：請將您的電腦新增為地面站，並改用 UDP 連線。

## 相關連結

- [NTRIP / RTK 校正](https://docs.uavmatrix.com/zh-tw/uavcast-pro/flight-controller/ntrip-rtk/)
- [注入器：將您自己的感測器資料送入 MAVLink](https://docs.uavmatrix.com/zh-tw/uavcast-pro/flight-controller/injectors/)
- [地面控制站](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/)
- [疑難排解：沒有 MAVLink 心跳](https://docs.uavmatrix.com/zh-tw/troubleshooting/no-mavlink-heartbeat/)

Source: https://docs.uavmatrix.com/zh-tw/uavcast-pro/flight-controller/
