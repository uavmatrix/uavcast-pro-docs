# Fleet Manager 常見問題

> Fleet Manager 常見問題解答：無人機數量限制、授權、VPN、地面站、ArduPilot 與 PX4、資料保留，以及移動無人機。

### 使用 Fleet Manager 需要什麼？

一個 UAVmatrix 帳戶，以及執行 UAVcast-Pro 且已啟動授權的無人機。每架無人機的授權必須由您組織的成員擁有。請參閱[授權與席次](https://docs.uavmatrix.com/zh-tw/fleet-manager/licenses/)。

### Fleet Manager 需要額外付費嗎？

不需要。Fleet Manager 已包含在您的 UAVcast-Pro 授權中。沒有另外的訂閱，團隊成員也是免費的。

### 我可以管理多少架無人機？

Fleet Manager 本身沒有數量限制。每架無人機都需要自己的 UAVcast-Pro 授權啟動，因此無人機數量取決於您擁有的授權與裝置席次。

### 團隊成員需要授權嗎？

不需要。您可以邀請任意數量的 Admin 與 Viewer。請參閱[邀請您的團隊](https://docs.uavmatrix.com/zh-tw/fleet-manager/team/)。

### 有哪些角色？

**Owner**、**Admin** 與 **Viewer**。沒有「Member」角色。請參閱[角色與權限](https://docs.uavmatrix.com/zh-tw/fleet-manager/team/roles-and-permissions/)。

### 配對碼從哪裡來？

從無人機取得。在 UAVcast-Pro 中，開啟 **Fleet Management → Connect to Fleet Manager**。它會顯示一組 8 位數代碼，有效期為 5 分鐘。您要在 Fleet Manager 的 **Fleet → Pair Device** 中輸入此代碼。請參閱[新增您的第一架無人機](https://docs.uavmatrix.com/zh-tw/fleet-manager/pair-uav/)。

### Fleet Manager 能透過 4G／LTE 運作嗎？

可以。無人機會以 TCP 8883 主動連線到 Fleet Manager，因此即使位於電信商 NAT 之後，沒有公開 IP 也能運作。電信商不得封鎖連接埠 8883。

### 我需要 VPN 嗎？

只有在需要透過 Fleet Manager 將無人機的視訊與遙測傳送到地面站時才需要。地圖、遙測、指令、任務、終端機，以及 UAVcast-Pro 的遠端存取，都不需要 VPN 即可運作。請參閱[網路與 VPN](https://docs.uavmatrix.com/zh-tw/fleet-manager/network/)。

### 一個地面站可以接收多架無人機嗎？

可以。每個[串流綁定](https://docs.uavmatrix.com/zh-tw/fleet-manager/network/stream-bindings/)都會在該地面站上取得自己的一組連接埠，並有空間容納第二台攝影機與音訊。第一架無人機使用 5600 ／ 14550。

### 我可以繼續使用自己的 ZeroTier 或 Tailscale 網路嗎？

可以，前提是您不需要 Fleet Manager 的串流綁定。配對時可以拒絕 VPN。若您接受，已位於 Tailscale 網路上的無人機會移至您組織的網路。已位於 ZeroTier 上的無人機會保留其 ZeroTier 網路，並與組織的網路一同加入；只有在您取消配對該無人機時，才會離開 ZeroTier。

### 支援 ArduPilot 與 PX4 嗎？

Fleet Manager 支援 UAVcast-Pro 所連接的任何 MAVLink 飛行控制器，包括 ArduPilot 或 PX4：即時地圖、遙測、狀態、終端機與串流綁定的功能都相同。飛行模式控制項使用 ArduPilot 針對 Copter、Plane、Rover 與 Sub 的模式，任務指令清單也遵循 ArduPilot 的命名，因此若使用 PX4，請由地面站切換模式並規劃任務。

### 我可以只靠 Fleet Manager 飛行無人機嗎？

Fleet Manager 可以切換模式、解鎖，以及開始、暫停與停止任務。但它並非為手動搖桿控制而設計。請務必由飛行員透過地面站或 RC 遙控器保持控制，並遵守當地法規。

### 飛行歷史會保留多久？

預設最多 1 年。Owner 與 Admin 可以將其縮短為 7、14、30、60 或 90 天，或 6 個月。請參閱[飛行歷史](https://docs.uavmatrix.com/zh-tw/fleet-manager/map/flight-history/#how-long-history-is-kept)。

### 我可以匯出飛行記錄嗎？

目前不行。Fleet Manager 可以在地圖上重播飛行，但不會匯出檔案，也不會儲存 `.tlog`、DataFlash 或視訊。

### Fleet Manager 會以電子郵件發送警示嗎？

目前還不會。狀態會即時顯示在地圖、Fleet 清單與 UAV 頁面上。請參閱[狀態指示與通知](https://docs.uavmatrix.com/zh-tw/fleet-manager/alerts-and-status/)。

### 無人機失去連線時會怎樣？

在 20 秒沒有資料後，它會顯示為 **OFFLINE**，並在連線恢復時自動重新連線。飛行器會依照飛行控制器本身的故障保護行動；連線中斷時，Fleet Manager 不會下達任何指令。

### 如何將無人機移到另一個組織？

先將它從目前的組織中移除（這會刪除該組織中的歷史紀錄），然後將它配對到新的組織。請參閱[移除或轉移無人機](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/remove-or-transfer/)。

### 我用不同的電子郵件購買了授權，該怎麼辦？

將該電子郵件邀請加入組織，或請求支援人員將其新增為您帳戶的額外授權電子郵件。請參閱[以其他電子郵件購買的授權](https://docs.uavmatrix.com/zh-tw/fleet-manager/licenses/#licenses-bought-with-another-email)。

### 有行動應用程式嗎？

瀏覽器中有適合手機的 [Lite 檢視](https://docs.uavmatrix.com/zh-tw/fleet-manager/lite-view/)。

### 我的資料安全嗎？

每架無人機都有自己的 TLS 用戶端憑證，每個組織都有自己加密的 VPN，角色權限則在伺服器端強制執行。請參閱[安全性與隱私](https://docs.uavmatrix.com/zh-tw/fleet-manager/security/)。

Source: https://docs.uavmatrix.com/zh-tw/fleet-manager/faq/
