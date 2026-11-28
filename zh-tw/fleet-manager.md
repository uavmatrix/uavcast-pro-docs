# Fleet Manager

> UAVmatrix Fleet Manager 可在同一張即時地圖上追蹤每一架執行 UAVcast-Pro 的無人機，並提供遠端控制、任務、透過 VPN 串流至地面站，以及團隊角色管理。

UAVmatrix Fleet Manager 是一款網頁應用程式，網址為 [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/)，讓您能從單一位置管理多架無人機。每架執行 UAVcast-Pro 的無人機都可以配對到您的組織。配對完成後，您就能在即時地圖上看到它、開啟其終端機、傳送指令、上傳任務，並將其影像與遙測資料傳送至飛行員使用的地面站。

![Fleet Manager 儀表板，包含統計卡片、UAV Status 清單與近期活動](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/dashboard.webp)

*儀表板：統計卡片、UAV Status 清單，以及來自多位團隊成員的 Recent Activity。*

## 您可以用它做什麼

[新增您的第一架無人機使用 8 位數配對碼，約兩分鐘內即可配對 UAVcast-Pro 無人機。](https://docs.uavmatrix.com/zh-tw/fleet-manager/pair-uav/)[即時追蹤車隊在同一張地圖上查看每架無人機，包含狀態環、5 分鐘航跡與跟隨模式。](https://docs.uavmatrix.com/zh-tw/fleet-manager/map/)[遠端控制無人機在瀏覽器中操作飛行模式、解鎖與上鎖、任務以及飛行前校準。](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/remote-control/)[串流至地面站透過 VPN，將多架無人機的影像與 MAVLink 傳送至 QGroundControl 或 Mission Planner。](https://docs.uavmatrix.com/zh-tw/fleet-manager/network/stream-bindings/)[邀請您的團隊每個組織可設定 Owner、Admin 與 Viewer 角色。](https://docs.uavmatrix.com/zh-tw/fleet-manager/team/)[規劃任務繪製航點、將任務儲存給組織，並上傳至任一架無人機。](https://docs.uavmatrix.com/zh-tw/fleet-manager/missions/)

## 運作方式

Fleet Manager 不會直接與飛行控制器通訊。無人機伴隨電腦上的 UAVcast-Pro 負責此工作，並與 Fleet Manager 維持一條加密連線：

1. **配對。** UAVcast-Pro 向 Fleet Manager 請求配對碼，您再將該配對碼輸入 Fleet Manager。接著 Fleet Manager 會將專屬的用戶端憑證交給無人機。
2. **控制通道。** 無人機以該憑證，透過 TLS 連線至 Fleet Manager 的 MQTT 代理程式，連接埠為 **8883**。遙測、心跳、指令、終端機工作階段，以及對 UAVcast-Pro 網頁介面的遠端存取，都會經由此連線傳輸。由於無人機一律主動向外連線，因此可穿越 NAT 與行動網路運作。
3. **資料通道（選用）。** 影像與 MAVLink 傳送至地面站時，會透過您組織的私有 VPN（由 Fleet Manager 營運的 WireGuard 網路）以點對點方式進行。若未使用 VPN，Fleet Manager 仍可顯示與控制無人機，但不會轉送串流。

## 基本概念

| 名詞 | 在 Fleet Manager 中的意義 |
| --- | --- |
| **組織** | 您的公司或團隊。無人機、任務、VPN 網路與成員都隸屬於同一個組織。每位使用者可以擁有一個組織，並可以同時是任意數量其他組織的成員。 |
| **UAV** | 執行 UAVcast-Pro 的無人機（或地面車、船隻或其他載具），同一時間只能配對到一個組織。Fleet Manager 透過 UAVcast-Pro 從伴隨電腦的 CPU 序號與開機磁碟推導出的裝置 ID 來識別它，因此即使重新開機或網路變更，仍能保有其身分。 |
| **配對** | 使用 UAVcast-Pro 顯示的 8 位數配對碼，將 UAV 連結到某個組織。配對碼有效期為 5 分鐘。 |
| **地面站（GCS）** | 執行 QGroundControl、Mission Planner 或類似軟體的筆記型電腦或電腦，並已加入您組織的 VPN，以便接收串流。 |
| **串流綁定** | 一條規則，表示「將此 UAV 的影像與遙測傳送至該地面站」。每個綁定都有專屬的 UDP 連接埠，因此一個地面站可以同時接收多架無人機的資料。 |
| **角色** | **Owner**、**Admin** 或 **Viewer**，依組織設定。Viewer 可以觀看；Admin 與 Owner 可以配對、控制及設定。請參閱[角色與權限](https://docs.uavmatrix.com/zh-tw/fleet-manager/team/roles-and-permissions/)。 |
| **許可證與席位** | 每架已配對的 UAV 都需要由組織成員擁有的有效 UAVcast-Pro 許可證。團隊成員不會佔用席位。請參閱[許可證](https://docs.uavmatrix.com/zh-tw/fleet-manager/licenses/)。 |
| **狀態與警示** | 地圖與車隊清單上的上線、離線、無 MAVLink 與 GPS 警告，以及系統公告。請參閱[狀態指示燈與通知](https://docs.uavmatrix.com/zh-tw/fleet-manager/alerts-and-status/)。 |

## 需求

Fleet Manager 已包含在您的 UAVcast-Pro 許可證中：不需要另外訂閱，也不需要額外席位。

> Fleet Manager 已包含在 UAVcast-Pro 許可證中。每架配對的無人機都需要一個許可證。
>
> [購買 UAVcast-Pro](https://uavmatrix.com/zh-TW/checkout) · [查看方案與價格](https://uavmatrix.com/zh-TW/products)

- 一個 UAVmatrix 帳戶（與您在 [uavmatrix.com](https://uavmatrix.com/) 購買許可證時所用的帳戶相同）。
- 至少一台安裝 UAVcast-Pro 並已啟用許可證的伴隨電腦。請參閱[安裝](https://docs.uavmatrix.com/zh-tw/get-started/installation/)與[啟用您的許可證](https://docs.uavmatrix.com/zh-tw/get-started/license-activation/)。
- 無人機需能連上網際網路，並開放對外的 HTTPS（443）與 TCP **8883**。

## 開始使用

1. [設定您的組織](https://docs.uavmatrix.com/zh-tw/fleet-manager/set-up-organization/)
2. [新增您的第一架無人機](https://docs.uavmatrix.com/zh-tw/fleet-manager/pair-uav/)
3. [連接地面站](https://docs.uavmatrix.com/zh-tw/fleet-manager/connect-gcs/)
4. [邀請您的團隊](https://docs.uavmatrix.com/zh-tw/fleet-manager/team/)

Source: https://docs.uavmatrix.com/zh-tw/fleet-manager/
