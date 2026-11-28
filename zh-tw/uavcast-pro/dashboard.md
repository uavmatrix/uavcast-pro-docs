# 儀表板

> 透過 UAVcast-Pro 儀表板檢查飛行控制器、GPS、電池、地面站連線、行動網路、VPN、RTK、視訊，以及 Raspberry Pi 的電源、溫度與降頻狀態。

儀表板是伴隨電腦的飛行前檢查清單。一張狀態卡會告訴您飛行控制器、GPS、電池、地面站連線、數據機、VPN、RTK、視訊與電源供應是否正常，並顯示摘要，例如 *All systems normal* 或 *2 problems*。其下方為系統資訊、網路流量、記憶體與儲存空間。請在側邊欄開啟 **Dashboard**（儀表板）。

![UAVcast-Pro 儀表板，狀態卡顯示 2 problems，系統資訊包含溫度，以及網路流量圖表](https://docs.uavmatrix.com/zh-tw/img/screenshots/uavcast-pro/dashboard.webp)

*測試機上的儀表板：兩個問題（沒有 GPS 定位、VPN 未連線），以及系統資訊與網路流量。*

## 狀態卡

此卡片分為三組。每一列都有一個彩色圓點：綠色表示正常，琥珀色表示警告，紅色表示問題。

| 列 | 範例值 | 若不是綠色該怎麼辦 |
| --- | --- | --- |
| **Flight controller**（飛行控制器） | *Armed*、*Disarmed*、*Link stopped*、*Connecting…* | 請參閱[飛行控制器](https://docs.uavmatrix.com/zh-tw/uavcast-pro/flight-controller/)。 |
| **GPS** | *3D fix · 14 satellites*、*RTK fixed*、*No fix*、*No GPS* | 請在戶外等待定位，或檢查 GPS 接線。 |
| **Battery**（電池） | 電壓與電量百分比 | 請充電，或檢查飛行控制器的電池監測設定。 |
| **Ground station**（地面站） | *Sending to 2 · 16 packets/s*、*Not sending*、*1 set up · waiting for flight controller*、*None set up* | 請參閱[地面控制站](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/)。 |
| **Cellular**（行動網路） | 業者與訊號，或 *No modem detected* | 請參閱[行動數據機](https://docs.uavmatrix.com/zh-tw/uavcast-pro/connectivity/cellular-modem/)。 |
| **VPN** | *Connected*、*Not connected*、*Turned off* | 請參閱 [VPN](https://docs.uavmatrix.com/zh-tw/uavcast-pro/connectivity/vpn/)。 |
| **RTK corrections**（RTK 校正） | *Connecting…*、*Error - check settings*、*Turned off* | 請參閱 [NTRIP / RTK](https://docs.uavmatrix.com/zh-tw/uavcast-pro/flight-controller/ntrip-rtk/)。 |
| **Video**（視訊） | *Running*、*Stopped*、*Turned off* | 請參閱[攝影機](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/)。 |
| **Dynamic DNS**（動態 DNS） | *Running*、*Turned off* | 請參閱[動態 DNS](https://docs.uavmatrix.com/zh-tw/uavcast-pro/connectivity/dynamic-dns/)。 |
| **Power supply**（電源供應） | *Stable*、*Voltage too low - use a stronger power supply*、*Slowed down (heat or power)*、*Voltage dropped since start-up* | 請參閱[電源與溫度](https://docs.uavmatrix.com/zh-tw/uavcast-pro/dashboard/#power-and-temperature)。 |

任一列出現 *Service failed - restarting* 表示服務已當機，並正在自動重新啟動。如果持續顯示，請從 **Application → Logging**（應用程式 → 日誌）下載日誌。

## 電源與溫度

在 Raspberry Pi 上，**System Information**（系統資訊）會顯示 **Power**（電源）、**CPU throttling**（CPU 限制）與 **Temperature**（溫度）：

- **Voltage too low - use a stronger power supply**（電壓過低，請使用較強的電源供應）：Pi 目前電壓不足。這會導致 USB 重設，數據機或飛行控制器可能因此中斷。飛行前請先修正電源供應。
- **Voltage dropped since start-up**（自開機後電壓曾下降）：自開機以來的某個時間點發生過。通常是數據機發射時的尖峰電流所造成。
- **Slowed down (heat or power)**（因溫度或電源而降速）：CPU 已受到限制。視訊編碼會最先受到影響。請加裝散熱片或改善通風，或修正電源供應。

當 Pi 接近其限制點時，溫度列會變為紅色。

## 其他卡片

| 卡片 | 顯示內容 |
| --- | --- |
| **System Information**（系統資訊） | **Operating System**（作業系統）、**Hardware**（硬體，CPU 與核心數）、**Uptime**（運行時間）、電源與 **Temperature**（溫度）。 |
| **Network Traffic**（網路流量） | 每個介面的接收與傳送總量及速率。可選擇 **Last 50** 至 **Last 1000** 的取樣數。適合用來檢查視訊在數據機上使用了多少流量。 |
| **Memory Usage**（記憶體使用） | **Total**（總計）、**Used**（已用）與 **Free**（可用）。資料每 10 秒收集一次。 |
| **Storage**（儲存空間） | 每個分割區的 **Total**（總計）、**Used**（已用）與 **Free**（可用）。 |

開機後，圖表需要幾分鐘的資料才會顯示內容。

## 功能導覽

第一次開啟網頁介面時，導覽會提供逐步介紹主要頁面的服務。您可以選擇 **Skip Tour**（跳過導覽），或選擇 **Never Show Again**（不再顯示）。若要再次啟動，請前往 **Application → Settings → Take a Tour**（應用程式 → 設定 → 功能導覽）。

電源問題的詳細說明：[欠壓與降頻](https://docs.uavmatrix.com/zh-tw/troubleshooting/undervoltage-and-throttling/)。

Source: https://docs.uavmatrix.com/zh-tw/uavcast-pro/dashboard/
