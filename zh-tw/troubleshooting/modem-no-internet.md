# 4G 數據機已連線但無網路

> LTE 數據機顯示訊號與電信業者，但無人機沒有網際網路？請檢查數據機類型、APN、SIM PIN 與數據、網路優先順序，以及預設路由。

**數據機**頁面顯示訊號、電信業者，甚至可能有 IP 位址，但無人機仍無法連上網際網路：VPN 無法連線、無法檢查授權，且 LTE 下的視訊與遙測都無法送達地面站。

| 您會看到的畫面 | 可能原因 | 從此開始 |
| --- | --- | --- |
| 未連接數據機 | Linux 未偵測到數據機，或其缺少電源 | [檢查 1](https://docs.uavmatrix.com/zh-tw/troubleshooting/modem-no-internet/#check-1) |
| 提及 HiLink 數據機的錯誤，或 USB 隨身碟沒有連線按鈕 | 數據機類型錯誤 | [檢查 2](https://docs.uavmatrix.com/zh-tw/troubleshooting/modem-no-internet/#check-2) |
| 已註冊至網路，但沒有 IPv4 位址 | APN 或 PIN 錯誤，或 SIM 卡沒有數據 | [檢查 3](https://docs.uavmatrix.com/zh-tw/troubleshooting/modem-no-internet/#check-3) |
| 數據機已有 IP 位址，但網際網路流量仍經由 Wi-Fi | 網路優先順序偏向 Wi-Fi | [檢查 4](https://docs.uavmatrix.com/zh-tw/troubleshooting/modem-no-internet/#check-4) |
| 在家可用，外出時無法使用（反之亦然） | 漫遊、訊號覆蓋，或家用網路位於數據機的子網路 | [檢查 5](https://docs.uavmatrix.com/zh-tw/troubleshooting/modem-no-internet/#check-5) |

![UAVcast-Pro 數據機頁面，已選取傳統型（PPP），並顯示未連接數據機面板](https://docs.uavmatrix.com/zh-tw/img/screenshots/uavcast-pro/modem.webp)

*數據機頁面已選取傳統型（PPP），且未插入數據機。連接數據機後，右側卡片會顯示訊號品質、狀態、電信業者與 IPv4 資訊。*

## 檢查 1：是否偵測到數據機？

若頁面顯示**未連接數據機**：

1. 檢查數據機的電源指示燈是否亮起，並確認它已牢固插入 USB 連接埠。
2. 數據機的耗電量可能超過 Raspberry Pi 的 USB 連接埠所能供應的電流。請留意儀表板的 **Power supply** 列。若顯示 **Voltage too low - use a stronger power supply**，請先解決電源問題：[欠壓與降速](https://docs.uavmatrix.com/zh-tw/troubleshooting/undervoltage-and-throttling/)。
3. 在 Pi 上執行 `lsusb` 以查看數據機，並執行 `mmcli -L` 以確認 ModemManager 是否已找到它。HiLink 數據機不會出現在 `mmcli` 中；它會以網路介面的形式出現在 `ip addr` 中。

數據機被偵測到後，會自動出現在此頁面上。

## 檢查 2：選擇正確的數據機類型

USB 數據機分為兩種，**數據機類型**必須與您的數據機相符。

|  | **HiLink** | **傳統型（PPP）** |
| --- | --- | --- |
| Linux 如何識別 | 網路轉接器（數據機本身就是一台小型路由器） | 由 ModemManager 管理的數據機 |
| 由誰連線 | 數據機本身，自動連線 | UAVcast-Pro，透過**連接**與**斷開連接**按鈕 |
| Huawei 範例 | E3372**h** | E3372**s** |

若您為 HiLink 數據機選擇了**傳統型（PPP）**，日誌會顯示 *HiLink modem detected … Please change your modem type to 'HiLink' in settings.*（偵測到 HiLink 數據機……請在設定中將數據機類型改為 'HiLink'。）變更**數據機類型**後，錯誤即會消失。

## 檢查 3：APN、PIN 與 SIM 卡

若為**傳統型（PPP）**數據機：

1. 請先將**存取點名稱 (可選)**留空。UAVcast-Pro 會嘗試您網路的預設 APN 以及 SIM 卡已知的 APN，並記住可用的那一個（日誌會顯示 *Found a working … it will be used from now on*，即找到可用的……，之後將會使用它）。
2. 若失敗，請輸入電信業者提供的行動數據 APN。部分電信業者也需要 **使用者名稱 (可選)** 與 **密碼 (可選)**。
3. 若 SIM 卡有 PIN 碼，請在 **PIN碼 (可選)** 中輸入，或將 SIM 卡放入手機中停用 PIN。**數據機資訊**下的 **需要解鎖**會顯示 SIM 卡是否被鎖定。
4. 將 SIM 卡放入手機，確認行動數據可以使用，且方案仍有剩餘數據。

若為 **HiLink** 數據機，APN 是在數據機自身的網頁中設定，通常位於 `http://192.168.8.1`。請從 Pi 開啟該網頁，或將數據機插到筆電上。

> **UAVcast-Pro 會持續嘗試**
>
> 傳統型數據機會在開機時連線，並在訊號中斷後自行重新連線。若數據機已連線但未取得位址，UAVcast-Pro 會將其切換為 raw-IP 模式並再次嘗試。變更設定前，請先等待開機後約一分鐘。

## 檢查 4：將數據機設為預設路由

若 Pi 同時連接 Wi-Fi 或乙太網路，流量會經由優先順序較高的介面傳送，而不一定是數據機。

1. 前往**網路**。
2. 在**網路優先順序**下，於飛行前選擇**數據機優先（戶外模式）**。**WiFi優先（室內模式）**可在家中節省行動數據，但會將所有流量經由 Wi-Fi 傳送。
3. 在**網路介面**中，確認數據機介面已標示為**預設**，且**預設閘道**顯示經由數據機介面（*via*）傳送。

![網路頁面，網路優先順序設為自動，介面表格顯示 wlan0 為預設](https://docs.uavmatrix.com/zh-tw/img/screenshots/uavcast-pro/networks.webp)

*網路頁面已啟用自動（系統預設），Wi-Fi（wlan0）為預設路由。若要經由數據機路由，請在此選擇數據機優先（戶外模式）。*

僅透過數據機從 Pi 進行測試：

```bash
ping -c 3 -I wwan0 1.1.1.1   # Traditional modem (interface name may differ)
ip route                     # the first "default via" line is the route in use
```

## 檢查 5：僅限外地的問題

- **漫遊**：在國外使用的 SIM 卡，可能需要電信業者啟用漫遊。請使用同一張 SIM 卡的手機進行確認。
- **訊號覆蓋**：請查看**訊號品質**與**技術**。部分物聯網 SIM 卡只能在特定頻段或技術下運作。
- **子網路衝突**：HiLink 數據機會分配 `192.168.8.x` 位址。若您的家用或辦公室網路也使用 `192.168.8.0/24`，路由就會失效。請變更區域網路或數據機的子網路。

## 仍然沒有網際網路？

請在選取**數據機管理器**的情況下[下載日誌](https://docs.uavmatrix.com/zh-tw/troubleshooting/collect-logs/)，加上 `mmcli -m 0` 與 `ip route` 的輸出，並連同數據機型號與電信業者，寄送至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**。

相關頁面：[行動數據機](https://docs.uavmatrix.com/zh-tw/uavcast-pro/connectivity/cellular-modem/) · [網路](https://docs.uavmatrix.com/zh-tw/uavcast-pro/connectivity/networks/)

Source: https://docs.uavmatrix.com/zh-tw/troubleshooting/modem-no-internet/
