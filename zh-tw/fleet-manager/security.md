# 安全性與隱私

> 說明 Fleet Manager 如何以每架無人機專屬的 TLS 憑證保護無人機、以私有 WireGuard VPN 隔離各組織、強制執行角色權限，以及如何儲存資料。

本頁供需要核准 Fleet Manager 的人員閱讀，包括資安人員、IT 與營運主管。

## 無人機連線

- **每架無人機專屬的用戶端憑證。** 配對時，Fleet Manager 會為每架無人機核發其專屬的 TLS 用戶端憑證。無人機使用此憑證連線到 Fleet Manager 的 MQTT 代理伺服器，連接埠為 **8883**，這是該代理伺服器唯一的公開接聽埠。沒有共用密碼。
- **每架無人機只能使用自己的主題。** 憑證的身分即為無人機的裝置 ID，代理伺服器只允許無人機在其自己的主題下發布與訂閱。一架遭入侵的無人機無法讀取或控制另一架。
- **僅限對外連線。** 無人機會主動連線到 Fleet Manager。您不需要在無人機或其網路上開放對內連接埠。
- **配對時間窗很短。** 配對碼為 8 位隨機數字，有效期 5 分鐘，且只能使用一次。配對碼檢查有速率限制（每位使用者每分鐘 10 次配對碼檢查與 5 次配對嘗試）。無人機的憑證與 VPN 金鑰只會在無人機首次連線前發放，且最遲不超過配對碼過期後 15 分鐘。
- **憑證升級。** 當 Fleet Manager 加強憑證機制時，較舊的無人機會被標示為 **Re-pair required**，而不會被默默信任。

## 每個組織的私有 VPN

- 每個組織在 Fleet Manager 的 VPN 伺服器（`vpn-connect.uavmatrix.com`）上都有自己的網路，此伺服器為自架且與 Tailscale 相容的控制伺服器。裝置之間的流量以 WireGuard 進行端對端加密。同一組織的裝置無法看到其他組織的裝置：VPN 伺服器會為每個組織強制執行獨立的存取規則。若 Fleet Manager 無法確認此隔離，會隱藏驗證金鑰（*VPN isolation could not be verified, so the auth key is hidden.*），而不會發放金鑰。
- 加入 VPN 需要驗證金鑰，且只有 Owner 與 Admin 可以建立。金鑰有效期為 90 天。無人機會在配對或 **Push to Drone** 期間自動取得金鑰，且僅在 Owner 或 Admin 同意的情況下進行。
- 在 **Network** 中移除裝置，會將其從 VPN 伺服器中移除。

## 存取控制

- 登入會透過您的 UAVmatrix 帳戶進行。Fleet Manager 不儲存密碼。
- 每個組織有三種角色（Owner、Admin、Viewer），並在伺服器端針對每項操作強制執行。請參閱[角色與權限](https://docs.uavmatrix.com/zh-tw/fleet-manager/team/roles-and-permissions/)。
- SSH 終端機與 UAVcast-Pro 的遠端存取僅限 Owner 與 Admin 使用。
- 邀請連結經過加密、只能使用一次，且 7 天後過期。
- UAVmatrix 可因違反條款而暫停帳戶或組織。被暫停的使用者會看到 **Account Suspended** 或 **Organization Suspended**，並附上原因與支援聯絡方式。

## Fleet Manager 儲存的資料

| 資料 | 保留期限 |
| --- | --- |
| 遙測（位置、高度、速度、航向、電池、模式、解鎖狀態、GPS、服務狀態），每秒一次 | 依組織的保留設定：7 天到 1 年（預設 1 年）。7 天後壓縮。移除無人機時刪除。 |
| 已儲存的飛行名稱與時間範圍 | 直到刪除為止，或無人機被移除為止 |
| 傳送到無人機的指令，以及傳送者 | 直到無人機被移除為止 |
| 活動紀錄（誰配對、移除、邀請、變更角色） | 移除無人機或成員時仍保留 |
| 任務 | 直到刪除為止，或組織被刪除為止 |
| 支援工單及其截圖 | 為支援保留 |

Fleet Manager 不儲存影片。影片與傳送到地面站的 MAVLink 會經由您裝置之間的 VPN 傳輸，Fleet Manager 不會錄製它們。

終端機與遠端 UAVcast-Pro 代理會透過 Fleet Manager 的加密連線傳送到無人機；其內容不會被儲存。

在網路允許的情況下，VPN 流量會直接在您的裝置之間傳輸。若網路不允許（例如位於嚴格的 NAT 或行動電信業者之後），流量會改用 Tailscale 的公開中繼（DERP）伺服器。無論哪一種方式，流量都會以 WireGuard 進行端對端加密；UAVmatrix 不營運中繼伺服器。

## 第三方服務

- **地圖：**地圖圖磚來自 Esri；空域圖層則透過 Fleet Manager 取自 OpenAIP。
- **FleetBot：**聊天訊息會傳送至 Anthropic 以產生回答。您組織的其他資料不會被傳送。請參閱[支援與 FleetBot](https://docs.uavmatrix.com/zh-tw/fleet-manager/support/#ask-fleetbot)。
- **產品分析與錯誤回報：**Fleet Manager 使用 PostHog 進行使用分析（例如開啟了哪些頁面、使用了哪些按鈕），並回報應用程式錯誤。

Source: https://docs.uavmatrix.com/zh-tw/fleet-manager/security/
