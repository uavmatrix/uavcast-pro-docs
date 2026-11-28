# RTK 校正資料未送達

> NTRIP 卡在連線中、沒有轉發 RTCM，或無法達到 RTK 固定？請檢查 caster 主機、連接埠、掛載點、憑證、GGA 上行與 GPS 接收器。

在**飛行控制器 → NTRIP / RTK** 下，狀態無法達到**傳輸校正資料**，**已轉發的 RTCM 訊息**維持為零，或校正資料雖然有送達，但飛行控制器始終無法超過 **3D 定位** 或 **RTK 浮動**。

這條鏈路有四個環節：網際網路 → caster → UAVcast-Pro → 飛行控制器 → GPS 接收器。請找出第一個中斷的環節。

![NTRIP / RTK 頁籤，包含狀態面板、計數器、caster 回應行，以及 GPS 品質卡片](https://docs.uavmatrix.com/zh-tw/img/screenshots/uavcast-pro/flight-controller--ntrip.webp)

*飛行控制器 → NTRIP / RTK：尚未設定 caster 的裝置，狀態為**已停用**，計數器為零，**Caster 回應**為空。正常狀態為**傳輸校正資料**、caster 回應為 200，且計數器持續增加。*

| 您會看到的畫面 | 可能原因 | 從此開始 |
| --- | --- | --- |
| 狀態為連線中或錯誤，沒有 caster 回應 | 主機或連接埠錯誤、TLS 設定不符，或沒有網際網路 | [檢查 1](https://docs.uavmatrix.com/zh-tw/troubleshooting/rtk-corrections-not-arriving/#check-1) |
| Caster 回應 401 Unauthorized | 使用者名稱、密碼或掛載點錯誤 | [檢查 2](https://docs.uavmatrix.com/zh-tw/troubleshooting/rtk-corrections-not-arriving/#check-2) |
| 日誌顯示 caster 回傳了 sourcetable | 掛載點名稱錯誤 | [檢查 2](https://docs.uavmatrix.com/zh-tw/troubleshooting/rtk-corrections-not-arriving/#check-2) |
| 已連線，但沒有 RTCM 資料，每隔數秒重新連線 | Caster 需要先取得 GGA 位置 | [檢查 3](https://docs.uavmatrix.com/zh-tw/troubleshooting/rtk-corrections-not-arriving/#check-3) |
| 已轉發 RTCM，但定位仍停在 3D 定位 | 飛行控制器連線中斷，或接收器不支援 RTK | [檢查 4](https://docs.uavmatrix.com/zh-tw/troubleshooting/rtk-corrections-not-arriving/#check-4) |
| RTK 浮動，從未達到 RTK 固定 | 天空視野、與基站的距離，或等待時間 | [檢查 5](https://docs.uavmatrix.com/zh-tw/troubleshooting/rtk-corrections-not-arriving/#check-5) |

## 檢查 1：連到 caster

1. 檢查 **Caster host** 與 **Port**。多數公開 caster 使用連接埠 `2101` 的純 TCP。
2. **Use TLS (HTTPS)** 必須與 caster 相符。商業 caster（Trimble、Hexagon、Topcon 等）通常需要 TLS，一般仍使用連接埠 2101，有時為 2102 或 443。公開 caster 通常不使用 TLS。
3. 確認無人機有網際網路連線。**儀表板 → 行動網路**應顯示已連線。若未連線，請參閱[4G 數據機已連線但 Raspberry Pi 無網路](https://docs.uavmatrix.com/zh-tw/troubleshooting/modem-no-internet/)。
4. 部分行動方案會封鎖不常用的對外連接埠。若 caster 提供連接埠 443，請試試看。

## 檢查 2：憑證與掛載點

1. 按下**測試連線**。出現 **Caster 已接受憑證。** 表示使用者名稱與密碼正確。
2. 若使用 rtk2go.com，**Username** 請填入真實的電子郵件地址，**Password** 請留空。
3. 按下**瀏覽掛載點**，從清單中選擇掛載點，而不要手動輸入名稱。建議選擇靠近您飛行地點的掛載點。

若 caster 回傳的是 sourcetable 而非資料，NTRIP 日誌會顯示 *caster returned sourcetable — check mountpoint*。這表示掛載點名稱錯誤，或該掛載點已不存在。

## 檢查 3：傳送 GGA 上行

VRS 與最近掛載點型的 caster 只有在知道您的位置後才會傳送校正資料。掛載點瀏覽器中的 **NMEA** 欄位會在這些掛載點上顯示**需要**。

1. 開啟**傳送 GGA 上行**（預設為開啟）。**傳送間隔（秒）**預設為 10。
2. **位置來源**：飛行時請使用**來自飛行控制器的即時位置**。在飛行控制器回報 GPS 定位之前，UAVcast-Pro 會使用**固定的手動位置**，因此台架測試時請輸入您附近的緯度與經度。
3. 觀察**最後傳送的 GGA**是否持續更新。

UAVcast-Pro 會在 caster 停止傳送資料時自動重新連線，日誌會顯示 *no data from caster for …s — reconnecting*。短暫的網際網路中斷之後，校正資料會在數秒內恢復。

## 檢查 4：從 UAVcast-Pro 到接收器

校正資料會透過飛行控制器連線送到 GPS，形式為 MAVLink `GPS_RTCM_DATA`。

1. 飛行控制器必須在**飛行控制器 → 連線**中顯示為**已連接**。若未連接，請參閱[沒有 MAVLink 心跳訊號](https://docs.uavmatrix.com/zh-tw/troubleshooting/no-mavlink-heartbeat/)。
2. 查看 **GPS 品質**卡片。**No RTK status from receiver**（接收器未回報 RTK 狀態）表示飛行控制器從未回報 RTK 狀態。所連接的 GPS 通常不支援 RTK：RTK 需要載波相位 RTK 接收器，例如 u-blox F9P、Here3+ 或 Septentrio Mosaic。標準的 M8N 或 M10 導航模組無法用於 RTK。
3. **近期訊息類型**應包含您接收器所使用的衛星系統（例如 1077 GPS、1087 GLONASS、1097 Galileo、1127 BeiDou），以及基站位置訊息（1005 或 1006）。

## 檢查 5：有浮動但從未固定

- 讓天線有開闊的天空。樹木、建築物以及無人機本身的電子設備會造成多路徑效應與雜訊。
- 請耐心等待。即使在良好條件下，冷啟動也可能需要一到兩分鐘。
- 選擇較近的基站。精度與取得固定解的機率會隨著與基站的距離而下降。
- **GPS 品質**中的**最後校正**應維持在數秒以內。若持續增加，表示校正資料在連線過程中遺失。

## 仍然無法運作？

在選取 **NTRIP 用戶端**的情況下[下載日誌](https://docs.uavmatrix.com/zh-tw/troubleshooting/collect-logs/)，並連同您的 caster 供應商與 GPS 型號，寄送至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**。完整設定請參閱[透過 4G 使用 NTRIP 基準站取得 RTK GPS](https://docs.uavmatrix.com/zh-tw/guides/rtk-ntrip-caster/)。

相關頁面：[NTRIP / RTK 設定](https://docs.uavmatrix.com/zh-tw/uavcast-pro/flight-controller/ntrip-rtk/)

Source: https://docs.uavmatrix.com/zh-tw/troubleshooting/rtk-corrections-not-arriving/
