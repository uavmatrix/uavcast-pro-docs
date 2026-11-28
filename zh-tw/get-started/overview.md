# 什麼是 UAVcast-Pro？

> UAVcast-Pro 可將 Raspberry Pi 或 Linux 伴隨電腦轉變為 4G/LTE 連線，用於傳輸 MAVLink 遙測與 H.264 影像。了解它如何與 Fleet Manager 協同運作。

UAVcast-Pro 是安裝在無人機上伴隨電腦（通常為 Raspberry Pi）的軟體。它會從任何 MAVLink 飛行控制器（ArduPilot 或 PX4）讀取 MAVLink，從一或兩台攝影機串流 H.264 影像，並透過 Wi-Fi、乙太網路或 4G/LTE 數據機，將兩者傳送到您的地面控制站。您可透過在無人機上執行的網頁介面進行設定與監控。

UAVmatrix Fleet Manager 是與之搭配的雲端儀表板。將執行 UAVcast-Pro 的無人機與 Fleet Manager 配對後，您可以在同一張地圖上查看整個機隊、開啟遠端終端機、規劃任務，並在無需連接埠轉送的情況下，將影像與遙測路由至地面站。每份 UAVcast-Pro 許可證都包含 Fleet Manager。

## 各部分如何連接

```text
 Flight controller ──USB/UART──►  Companion computer running UAVcast-Pro
 (ArduPilot, PX4)                  │  MAVLink router, camera server, modem,
 Camera(s) ──CSI/USB────────────►  │  VPN, NTRIP client, recorder, web UI
                                   │
                                   ├── UDP 14550 (telemetry) ─┐
                                   ├── UDP 5600  (video)    ──┼─► Mission Planner / QGroundControl
                                   │                          │   over LAN, VPN or 4G
                                   └── MQTT/TLS 8883 ─────────┴─► Fleet Manager (optional)
```

- **在無人機上**：UAVcast-Pro 負責管理飛行控制器的序列埠，並將 MAVLink 轉送給您新增的每一個地面站。攝影機伺服器會以 H.264 編碼，並透過 UDP 以 RTP 將影像傳送至相同的地面站。除非您另行新增，否則不會有任何程式監聽傳入的遙測連線。
- **無人機與地面之間**：在本地網路上，地面站自身的 IP 位址即已足夠。透過 4G 連線時，無人機沒有公開位址，因此需要將兩端都放在 VPN 上。每份許可證都包含的 [Fleet Manager VPN](https://docs.uavmatrix.com/zh-tw/uavcast-pro/connectivity/vpn/) 會為您處理此事；UAVcast-Pro 也能加入您自己的 Tailscale 或 ZeroTier 網路。
- **雲端**：配對後，無人機會保持一條由憑證驗證的向外 MQTT 連線至 Fleet Manager。請參閱[將無人機與 Fleet Manager 配對](https://docs.uavmatrix.com/zh-tw/uavcast-pro/fleet-pairing/)。

## 您可以用它做什麼

| 領域 | 功能 | 頁面 |
| --- | --- | --- |
| 遙測 | 自動偵測飛行控制器的序列埠與鮑率，將 MAVLink 路由至任意數量的地面站，並可選擇唯讀的目的地 | [飛行控制器](https://docs.uavmatrix.com/zh-tw/uavcast-pro/flight-controller/)、[地面控制站](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/) |
| 影像 | Raspberry Pi CSI 與 USB 攝影機、透過 RC 切換或雙路串流的雙攝影機、音訊、自訂 GStreamer 管道 | [攝影機與影像](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/) |
| 錄製 | 在無人機上錄製每次飛行的影像與遙測，並附有飛行回放播放器 | [錄製](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/recordings/) |
| 飛行地圖 | 即時地圖、座艙 HUD、解鎖與上鎖、返航與懸停、任務規劃器、MAVLink 檢查器、日誌分析 | [飛行地圖](https://docs.uavmatrix.com/zh-tw/uavcast-pro/flight-map/) |
| 連線 | 具自動 APN 的 4G/LTE 數據機、Fleet Manager VPN 或您自己的 Tailscale 或 ZeroTier 網路、動態DNS、Wi-Fi 與數據機優先順序 | [連線](https://docs.uavmatrix.com/zh-tw/uavcast-pro/connectivity/) |
| RTK | 將 RTCM3 校正資料傳送至飛行控制器的 NTRIP 用戶端 | [NTRIP / RTK](https://docs.uavmatrix.com/zh-tw/uavcast-pro/flight-controller/ntrip-rtk/) |
| 自訂資料 | 將感測器與腳本橋接至 MAVLink 並繪製圖表 | [注入器](https://docs.uavmatrix.com/zh-tw/uavcast-pro/flight-controller/injectors/)、[資料流](https://docs.uavmatrix.com/zh-tw/uavcast-pro/data-streams/) |

## 您需要準備什麼

- 64 位元 Linux 伴隨電腦（arm64 或 amd64）。Raspberry Pi 3、4、5 與 Zero 2 W 是常見選擇；x86 迷你電腦同樣適用，而 NVIDIA Jetson、Orange Pi 及其他 arm64 開發板則需要 UAVcast-Pro 6.5.3 或更新版本。請參閱[硬體需求](https://docs.uavmatrix.com/zh-tw/get-started/hardware-requirements/)。
- MAVLink 飛行控制器：ArduPilot 或 PX4。飛行模式按鈕採用 ArduPilot 的模式名稱。
- 來自 [UAVmatrix 商店](https://uavmatrix.com/products/)的 UAVcast-Pro 許可證。請參閱[許可證與啟動](https://docs.uavmatrix.com/zh-tw/get-started/license-activation/)。
- 若需在 Wi-Fi 範圍之外飛行：4G/LTE 數據機與數據 SIM 卡。

## 後續步驟

[快速入門從全新的 Raspberry Pi 開始，在 Mission Planner 或 QGroundControl 中取得遙測與影像。](https://docs.uavmatrix.com/zh-tw/get-started/quick-start/)[安裝 UAVcast-Pro在 Raspberry Pi OS、Debian 或 Ubuntu（arm64 與 amd64）上以一行指令安裝。](https://docs.uavmatrix.com/zh-tw/get-started/installation/)[啟動您的許可證在裝置上啟動許可證、查看裝置名額，並將許可證移至新硬體。](https://docs.uavmatrix.com/zh-tw/get-started/license-activation/)

Source: https://docs.uavmatrix.com/zh-tw/get-started/overview/
