# 攝影機設定

> 在 UAVcast-Pro 中設定 Raspberry Pi 攝影機或 USB 網路攝影機，並透過 UDP 將低延遲 H.264 視訊串流至 QGroundControl 或 Mission Planner，包含解析度、FPS 與位元率。

UAVcast-Pro 會從 Raspberry Pi CSI 攝影機或 USB 網路攝影機擷取視訊，編碼為 H.264，並以 RTP over UDP 傳送給每個已開啟 **啟用視訊** 的地面站。Mission Planner 與 QGroundControl 可直接在連接埠 5600 播放。串流的副本會用於網頁介面中的即時預覽，以及無人機上的錄製器。請開啟 **攝影機 → 攝影機設定**。

![攝影機控制面板，攝影機 1 設為 Raspberry Pi 攝影機，並顯示解析度、FPS、位元率與串流恢復設定，以及即時預覽面板](https://docs.uavmatrix.com/zh-tw/img/screenshots/uavcast-pro/camera.webp)

*攝影機 → 攝影機設定，攝影機 1 為 Raspberry Pi 攝影機，解析度 1536×864、30 FPS，位元率為自動。此處即時預覽為關閉狀態。*

## 設定攝影機

1. 連接攝影機，然後前往 **攝影機 → 攝影機設定**。
2. 將 **啟用攝影機？** 設為 **是**。
3. 點擊 **攝影機 1** 插槽，並選擇攝影機。CSI 攝影機會顯示為 *Raspberry Pi Camera - imx708 (CSI)* 或類似名稱；USB 攝影機則顯示其名稱。
4. 在 **攝影機設定** 下，選擇攝影機支援的 **解析度**。不支援的尺寸會被標示。
5. 起始時請將 **選擇 FPS** 保留為 **自動**，並將 **位元率** 保留為 `0`（自動）。
6. 在 **串流設定** 下，勾選 **啟用即時預覽？**，然後點擊 **啟動**。
7. 在[地面控制站](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/)中，為每個需要接收視訊的地面站開啟 **啟用視訊**。

若清單中沒有出現攝影機，請查看頁面底部的 **操作日誌**。其中會顯示攝影機偵測器檢查過的每個裝置，以及略過該裝置的原因。

## 設定參考

| 設定 | 預設值 | 可選值 | 說明 |
| --- | --- | --- | --- |
| **啟用攝影機？** | **是** | **是**、**否** | **否** 會完全停止視訊。 |
| **攝影機 1** | Raspberry Pi 攝影機 | 已偵測到的攝影機、**輸入自訂管道** | 選擇 **輸入自訂管道** 即可撰寫您自己的 GStreamer 管道。請參閱[自訂管道](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/custom-pipeline/)。 |
| **解析度** | `640x480` | 攝影機回報的尺寸 | 若攝影機無法提供該尺寸，UAVcast-Pro 會退回至攝影機支援的最大尺寸，並記錄實際使用的尺寸。 |
| **選擇 FPS** | **自動** | **自動**，或攝影機在此解析度下支援的幀率 | **自動** 會由攝影機自行選擇。 |
| **位元率** | `0`（**自動**） | 0–10000 kbps，以 100 為單位調整 | 行動網路連線建議設定固定值。 |
| **串流恢復速率** | **自動** | **自動**（0）、1、5、10、15、30、60、90、120 幀 | 關鍵影格間隔。數值較低可在封包遺失後更快恢復，並改善 VPN 上的灰色殘影，但會增加頻寬用量。 |
| **翻轉設定** | 關閉 | **垂直翻轉**、**水平翻轉** | 適用於 CSI 攝影機。 |
| **旋轉** | `0°` | 0°、90°、180°、270° | 適用於 USB 及其他非 CSI 攝影機。 |
| **啟用即時預覽？** | 開啟 | 開啟、關閉 | 本頁與飛行地圖中的預覽。錄製也會使用此串流副本。 |

設定會在您變更時自動儲存。若執行中的串流未套用變更，請在 **串流設定** 下點擊 **重啟**。

## 依連線選擇設定

沒有單一正確的設定：位元率必須落在連線最慢的環節之內，並保留足夠的頻寬給遙測。以下是單一攝影機的起始參考值：

| 連線 | 解析度 | FPS | 位元率 | 串流恢復速率 |
| --- | --- | --- | --- | --- |
| 本機 Wi-Fi 或乙太網路 | 1920x1080 | 30 | 4000–6000 kbps | 自動 |
| 良好的 4G/LTE | 1280x720 | 30 | 1500–2500 kbps | 30 幀 |
| 較弱的 4G 或遠距離 | 1280x720 或 854x480 | 15–20 | 800–1200 kbps | 15 幀 |

若封包遺失後畫面凍結或出現灰色殘影，請先降低位元率，再降低 **串流恢復速率**，使關鍵影格更頻繁地出現。

### CPU 負載

**系統負載** 指示器會顯示編碼器的工作量。在 Raspberry Pi 5 上，所有串流都以軟體編碼（Pi 5 沒有 H.264 硬體編碼器），因此高解析度或兩路串流可能讓 CPU 滿載。當它顯示 *CPU 接近上限。請降低解析度或位元率。* 的警告時，請在起飛前先行調整。

## 即時預覽

**即時預覽** 會透過內建媒體伺服器（WebRTC，連接埠 **8889**）在瀏覽器中播放串流。依網路狀況而定，它會比地面站接收的 UDP 串流延遲數百毫秒。點擊開啟新分頁按鈕即可全螢幕觀看。瀏覽器預設會以靜音開始預覽；若您使用[音訊](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/audio/)，請在播放器中取消靜音。

預覽需要瀏覽器能直接連到無人機的連接埠 8889。它可以在區域網路與 VPN 上運作，但無法透過 Fleet Manager 的 **Open via Proxy** 使用，因為該功能只會轉送網頁介面。預覽請改用 **Open via VPN**。

## 串流傳送方式

| 串流 | 傳輸方式 | 地面站上的連接埠 |
| --- | --- | --- |
| 攝影機 1 視訊 | H.264，RTP over UDP | **視訊連接埠**（預設 `5600`） |
| 攝影機 2 視訊（雙路串流） | H.264，RTP over UDP | **視訊連接埠（攝影機 2）**，預設為視訊連接埠 + 1（`5601`） |
| 音訊（選用） | Opus，RTP over UDP | 視訊連接埠 + 2（`5602`） |
| 預覽 | WebRTC | 瀏覽器連至無人機，連接埠 8889 |

無人機會主動將串流推送至地面站。地面站不需要請求串流，無人機上也沒有任何程式會監聽傳入的視訊連線。

## 相關頁面

- [雙攝影機：RC 切換與雙路串流](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/multi-camera/)
- [音訊](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/audio/)
- [錄製與飛行回放](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/recordings/)
- [自訂 GStreamer 管道](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/custom-pipeline/)
- [疑難排解：未偵測到攝影機](https://docs.uavmatrix.com/zh-tw/troubleshooting/camera-not-detected/)
- [疑難排解：視訊卡頓或延遲](https://docs.uavmatrix.com/zh-tw/troubleshooting/choppy-or-delayed-video/)

Source: https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/
