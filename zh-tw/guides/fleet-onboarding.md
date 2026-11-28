# 使用 Fleet Manager 完成無人機機隊上線

> 規劃授權，然後為 20 台以上的 UAVcast-Pro 無人機命名、配對並連接至 UAVmatrix Fleet Manager，包含團隊角色、組織 VPN 與串流綁定。

本指南說明如何一次將約 20 台無人機加入 [UAVmatrix Fleet Manager](https://docs.uavmatrix.com/zh-tw/fleet-manager/)：包括授權、命名、配對、組織 VPN，以及將地面站連接至無人機。本指南假設每台無人機都已執行 UAVcast-Pro、飛行控制器已連接，且可存取網際網路。

## 1. 規劃授權

有兩項規則決定無人機能否配對：

- **每台無人機都需要裝置上有有效的 UAVcast-Pro 授權。**一組授權可涵蓋多台無人機：其 **Allowed Devices** 數量即為插槽數。若要為 20 台無人機配對，您總共需要 20 個插槽，可來自一組或多組授權。
- **授權必須由您要配對加入的組織成員所擁有。**Fleet Manager 會將購買授權之商店帳號的電子郵件地址，與成員的電子郵件地址進行比對。若採購是以其他帳號購買授權，請邀請該帳號加入組織，或請支援團隊將採購用的電子郵件新增至您的使用者。

請在配對當天之前先確認此事：若某台無人機的授權屬於組織外的人員，系統會以 **License is not owned by any member of this organization** 拒絕配對。

## 2. 設定組織與團隊

1. 使用您的 uavmatrix.com 帳號登入 [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/)，並建立組織。請參閱[設定組織](https://docs.uavmatrix.com/zh-tw/fleet-manager/set-up-organization/)。
2. 在 **Team**（團隊）下邀請您的成員。**Owner** 與 **Admin** 可以配對、控制及移除無人機；**Viewer** 僅能檢視。請參閱[角色與權限](https://docs.uavmatrix.com/zh-tw/fleet-manager/team/roles-and-permissions/)。
3. 若無人機數量很多，可將配對工作分配給兩至三位 Admin。每位使用者每分鐘最多可完成 5 次配對；此限制可防止暴力猜測，同時也會減緩單一人連續為 20 台無人機配對的速度。

## 3. 配對前為每台無人機命名

無人機在 UAVcast-Pro 中的名稱，會成為它在 Fleet Manager 中的名稱。請先約定命名規則，例如 `SURVEY-01` … `SURVEY-20`，並依此為機身貼上標籤。

在每台無人機上，開啟 UAVcast-Pro → **Fleet Management**，並填寫 **Device Name**。若未命名，無人機將以其主機名稱顯示。之後您仍可在 Fleet Manager 中重新命名。

## 4. 逐一配對無人機

每台都要重複此步驟。若將兩個瀏覽器視窗並排（一個是無人機的 UAVcast-Pro，另一個是 Fleet Manager），每台約需一分鐘。

1. 在 UAVcast-Pro 中開啟 **Fleet Management**，然後按下 **Connect to Fleet Manager**。畫面會出現 8 位數的 **Pairing Code**（配對碼），並於 5 分鐘後過期。
2. 在 Fleet Manager 中，前往 **Fleet → Pair Device**。
3. **Select Organization**，然後 **Enter Pairing Code**。
4. **Confirm Device**：確認名稱、主機名稱、架構與 UAVcast 版本，以確保您配對的是預期的那台無人機。
5. **VPN Connection**：若地面站應透過組織的 VPN 連線至無人機，請勾選 **Enable VPN for this UAV**。若無人機已使用 Tailscale，**Replace existing VPN with Fleet Manager network** 會將它移至組織的網路。
6. **Complete Pairing**。在 UAVcast-Pro 中，**Fleet Connection** 會變為 **Connected**。

![Fleet Manager 配對精靈的 Confirm Device 步驟，顯示 UAV 名稱、主機名稱、架構與 UAVcast 版本](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/pair-device--confirm.webp)

*Fleet → Pair Device，Confirm Device 步驟。*

錯誤及其含義：請參閱[配對碼無效或已過期](https://docs.uavmatrix.com/zh-tw/troubleshooting/pairing-code-invalid/)。完整的精靈流程請參閱[配對第一台無人機](https://docs.uavmatrix.com/zh-tw/fleet-manager/pair-uav/)。

## 5. 檢查機隊

開啟 **Fleet**。每台無人機都應列為在線。在 **Fleet Map** 上，每台無人機會在飛行控制器取得定位後，出現在其 GPS 位置。顯示 **Offline** 的無人機表示已超過 20 秒未回報：請參閱[Fleet Manager 中無人機離線](https://docs.uavmatrix.com/zh-tw/troubleshooting/drone-offline-fleet-manager/)。

## 6. 連接地面站

1. 前往 **Network**，若組織的 VPN 尚未開啟，請按下 **Enable VPN Network**。
2. 按下 **Connect a Device**，選擇 **Ground Control Station (GCS)**，並複製 **GCS Connection Command**。請在已安裝 Tailscale 的**地面站筆電**上於終端機執行此指令。請勿將其貼到 UAVcast-Pro 中。
3. 地面站連線後，會出現在 **Ground Stations** 下。
4. 在 **Stream Bindings** 下，按下 **Add Stream Binding**，並將每台無人機連結至應接收其串流的地面站。無人機必須在線上，因為 Fleet Manager 會將目的地推送給它。
5. 每個綁定都會在該地面站上取得自己的一組連接埠：第一台無人機使用預設值 5600（視訊）與 14550（遙測），之後每台無人機各取得下一組可用的連接埠。請依各綁定所示的連接埠設定地面站軟體。

![Fleet Manager 的 Network 頁面，串流綁定將多台無人機連結至同一地面站，並自動分配連接埠](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/network--stream-bindings.webp)

*Network → Stream Bindings：每個綁定會顯示其地面站，以及視訊與遙測連接埠。*

詳細說明：[連接地面站](https://docs.uavmatrix.com/zh-tw/fleet-manager/connect-gcs/) 與 [串流綁定](https://docs.uavmatrix.com/zh-tw/fleet-manager/network/stream-bindings/)。

> **雙路串流與音訊**
>
> 每個綁定在地面站上都有自己的一組連接埠，並在視訊連接埠之後保留空間，供無人機的第二台攝影機與音訊使用，因此多台無人機可共用同一個地面站。

## 7. 日常營運

- **需要重新配對**：當 Fleet Manager 顯示此標記時，請在 UAVcast-Pro 中將該無人機重新配對一次。它會保留名稱與紀錄。請參閱[移除或轉移 UAV](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/remove-or-transfer/)。
- **更換無人機的 SD 卡或主機板本身不會釋放任何插槽**：請先在使用同一授權的任一台無人機上，前往 **應用程式 → 許可證管理器 → 已啟動設備**，取消註冊舊裝置，然後再配對新裝置。
- **遠端操作無人機**：Fleet Manager 中的 UAV 詳細資訊頁面提供終端機、日誌，以及重新開機等動作。請參閱[UAV 詳細資訊](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/uav-details/)。

Source: https://docs.uavmatrix.com/zh-tw/guides/fleet-onboarding/
