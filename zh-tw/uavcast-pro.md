# UAVcast-Pro

> UAVcast-Pro 網頁介面參考：儀表板、飛行控制器、飛行地圖、地面控制站、攝影機、數據機、VPN、Fleet Manager 配對、使用者與設定。

本節依應用程式側邊欄的順序，說明 UAVcast-Pro 網頁介面的每個頁面。每個頁面都會說明該畫面的用途、如何設定，並列出每項設定及其預設值。初次使用 UAVcast-Pro 嗎？請從[快速入門](https://docs.uavmatrix.com/zh-tw/get-started/quick-start/)開始。

## Operations

[儀表板一目了然掌握飛行控制器、GPS、連線、視訊與電源的狀態。](https://docs.uavmatrix.com/zh-tw/uavcast-pro/dashboard/)[資料流為任何 MAVLink 或感測器數值建立自訂的即時儀表板。](https://docs.uavmatrix.com/zh-tw/uavcast-pro/data-streams/)[飛行控制器USB 或 UART 連線，可自動偵測連接埠與鮑率，並支援 NTRIP/RTK 與注入器。](https://docs.uavmatrix.com/zh-tw/uavcast-pro/flight-controller/)[飛行地圖即時地圖、座艙 HUD、解鎖/上鎖、飛行模式、任務、遙控、檢視器與記錄分析。](https://docs.uavmatrix.com/zh-tw/uavcast-pro/flight-map/)[地面站與視訊目標位址，以及 Mission Planner、QGroundControl、GStreamer、Android 與 VLC 的逐步設定指南。](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/)

## Connectivity

[數據機HiLink 與傳統 4G/LTE 數據機，並可自動設定 APN。](https://docs.uavmatrix.com/zh-tw/uavcast-pro/connectivity/cellular-modem/)[虛擬專用網路Fleet Manager 提供的 VPN，或您自己的 Tailscale 或 ZeroTier 網路。](https://docs.uavmatrix.com/zh-tw/uavcast-pro/connectivity/vpn/)[動態DNS讓主機名稱持續指向無人機的公用 IP 位址。](https://docs.uavmatrix.com/zh-tw/uavcast-pro/connectivity/dynamic-dns/)[網路網路介面，以及 Wi-Fi 與數據機的優先順序。](https://docs.uavmatrix.com/zh-tw/uavcast-pro/connectivity/networks/)

## Media

[攝影機設定CSI 與 USB 攝影機、解析度、位元率，以及透過 UDP 傳輸的低延遲 H.264。](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/)[雙攝影機RC 通道切換或雙路視訊串流。](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/multi-camera/)[音訊即時預覽與傳送至地面站的麥克風音訊。](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/audio/)[錄製無人機端的視訊與遙測錄製，並可進行飛行回放。](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/recordings/)

## Management

[Fleet Management將無人機與 UAVmatrix Fleet Manager 配對。](https://docs.uavmatrix.com/zh-tw/uavcast-pro/fleet-pairing/)[使用者管理員登錄與唯讀使用者。](https://docs.uavmatrix.com/zh-tw/uavcast-pro/users/)[應用程式連接埠、語言、供支援人員使用的日誌，以及資料庫備份與還原。](https://docs.uavmatrix.com/zh-tw/uavcast-pro/application-settings/)

## 連接埠總覽

| 連接埠 | 方向 | 用途 |
| --- | --- | --- |
| TCP 80 | 瀏覽器 → 無人機 | 網頁介面（可設定）與 HTTP 注入器 |
| UDP 14550 | 無人機 → 地面站 | MAVLink 遙測（依目標位址設定，可調整） |
| UDP 5600 | 無人機 → 地面站 | 視訊，攝影機 1（依目標位址設定，可調整） |
| UDP 5601 | 無人機 → 地面站 | 視訊，雙路視訊串流的攝影機 2（預設為視訊連接埠 + 1） |
| UDP 5602 | 無人機 → 地面站 | 音訊（視訊連接埠 + 2） |
| TCP 8889、UDP 8189 | 瀏覽器 → 無人機 | 即時預覽（WebRTC 信令與媒體） |
| TCP 8883 | 無人機 → Fleet Manager | Fleet Manager 連線（透過 TLS 的 MQTT） |
| TCP 2101 | 無人機 → NTRIP Caster | RTK 校正（Caster 的連接埠） |
| UDP 14600 | 感測器 → 無人機 | UDP 注入器（預設值，可調整） |

Source: https://docs.uavmatrix.com/zh-tw/uavcast-pro/
