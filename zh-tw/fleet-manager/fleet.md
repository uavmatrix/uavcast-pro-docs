# Fleet

> Fleet 頁面列出組織中的每架無人機，包含即時狀態、電量與最後回報時間，也是配對無人機與開啟控制項的地方。

**Fleet**（側邊欄 **Fleet Management → Fleet**）列出所選組織中的每一架無人機。它會即時更新，因此您可以將它開在牆面螢幕上，搭配[地圖](https://docs.uavmatrix.com/zh-tw/fleet-manager/map/)一起使用。

![Fleet 頁面，顯示無人機卡片格線，包含在線與離線狀態、電量與最後上線時間](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/fleet.webp)

*Fleet 頁面，共 46 架無人機：ONLINE 卡片顯示電量，變暗的 OFFLINE 卡片顯示 Last seen 時間。*

## 無人機卡片

標題會顯示 **UAVs (n)**。每張卡片顯示：

- **Name** 與狀態徽章：**ONLINE**、**OFFLINE** 或 **PAIRING**。
- **Battery**（百分比）。低於 50 % 時變為黃色，低於 20 % 時變為紅色。
- **Last seen**（相對時間）。離線卡片會變暗。
- **Re-pair required**，表示此無人機必須再次配對（請參閱[重新配對無人機](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone)）。

無人機在 20 秒內未收到 UAVcast-Pro 的訊息，即視為離線；UAVcast-Pro 每 5 秒傳送一次心跳。

每張卡片上有兩個按鈕：

- **Operations** 會開啟[控制面板](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/remote-control/)：飛行模式、解鎖與上鎖、任務。
- **Details** 會開啟 [UAV page](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/uav-details/)：即時遙測、終端機、記錄、系統動作、重新命名與移除。

## 頁面上的按鈕

- **Pair Device** 會啟動[配對精靈](https://docs.uavmatrix.com/zh-tw/fleet-manager/pair-uav/)。僅限 Owner 與 Admin。
- **Refresh** 會重新載入清單。
- **Need more devices?** → **View Plans** 會開啟 UAVmatrix 商店，您可以在那裡購買更多 UAVcast-Pro 授權。請參閱[授權](https://docs.uavmatrix.com/zh-tw/fleet-manager/licenses/)。

## 重新配對橫幅

當一架或多架無人機使用舊的連線憑證時，頁面頂端會出現橫幅，顯示 **n UAV(s) must be re-paired**。請對每架列出的無人機重新配對一次；它會保留名稱與歷史紀錄。請參閱[重新配對無人機](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone)。

![Fleet 頁面顯示重新配對橫幅，以及兩張卡片上的 Re-pair required 徽章](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/fleet--repair-required.webp)

*Fleet 頁面顯示橫幅 2 UAVs must be re-paired，以及兩張受影響卡片上的 Re-pair required 徽章。*

## 大型機群的建議

- **為地圖上的無人機命名。** 名稱會顯示在地圖標籤與綁定清單中。尾號或角色（例如「Inspection-07」）比預設主機名稱更容易辨識。請在 UAV page 中重新命名。
- **為每架無人機設定專屬顏色。** Fleet Manager 會自動從 24 色調色盤中指派顏色。若希望團隊能一眼辨識某些無人機，請在控制面板中設定固定顏色（**Change map color**）。
- **使用組織區隔客戶。** 無人機只屬於一個組織。若您為多位客戶營運，且每位客戶只應看到自己的無人機，請為每位客戶建立一個組織。

Source: https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/
