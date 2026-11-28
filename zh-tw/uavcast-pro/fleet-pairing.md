# 與 Fleet Manager 配對

> 將執行 UAVcast-Pro 的無人機連接至 UAVmatrix Fleet Manager：在無人機上取得配對碼、在 Fleet Manager 中輸入、檢查連線，以及重新命名或取消配對。

配對可將執行 UAVcast-Pro 的無人機連接至您的組織，即 [UAVmatrix Fleet Manager](https://docs.uavmatrix.com/zh-tw/fleet-manager/)，也就是您機隊的雲端儀表板。配對完成後，無人機會與 Fleet Manager 保持以憑證驗證、經加密的連線，並在重新開機或網路變更後自動重新連線。配對需要在無人機上開始，並在 Fleet Manager 中完成。整個流程約需兩分鐘。

## 開始之前

- 無人機上的 UAVcast-Pro 需已啟用**有效的許可證**。若沒有有效許可證，將無法配對（*No valid license found. Please activate your license first.*，即未找到有效的許可證，請先啟用您的許可證）。
- UAVcast-Pro 中需有一位**管理員**使用者。**Fleet Management** 會對唯讀使用者隱藏。
- 您需要一個在組織中具有 **Owner** 或 **Admin** 角色的 Fleet Manager 帳戶。無人機的許可證必須屬於該組織的成員。
- 無人機需連上網際網路，並允許對外的 TCP **8883**（MQTT over TLS）與 HTTPS（443）。

## 配對無人機

1. 在無人機的網頁介面中，前往 **Management → Fleet Management**（管理 → Fleet Management）。
2. 選擇 **Connect to Fleet Manager**。無人機會向 Fleet Manager 請求配對碼，並顯示 **Pairing Code**（配對碼）與 **Expires in**（有效期限）倒數計時，接著顯示 *Waiting for Manager to confirm pairing...*（等待管理端確認配對…）。
3. 在另一個分頁中，登入 [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/)，並前往 **Fleet → Pair Device**。
4. 輸入無人機上顯示的配對碼，並確認裝置資訊（主機名、架構、UAVcast-Pro 版本）與眼前的無人機相符。
5. 在 Fleet Manager 中完成後續步驟（選擇 VPN 與名稱）。
6. 回到無人機，頁面會切換至 **Fleet Connection**，狀態為 **Connected**。

![Connect to Fleet Manager 卡片，含 Connect to Fleet Manager 按鈕](https://docs.uavmatrix.com/zh-tw/img/screenshots/uavcast-pro/fleet--connect.webp)

*尚未配對的無人機上的 Management → Fleet Management 頁面。選擇 Connect to Fleet Manager 後，此卡片會換成 8 位數的 Pairing Code 與 Expires in 倒數計時。*

> **配對碼有效期為 5 分鐘**
>
> 如果在輸入之前已逾期，請再次選擇 **Connect to Fleet Manager** 以取得新的配對碼。

Fleet Manager 端的內容（包括組織、VPN，以及無人機加入機隊後的後續操作）請參閱[將您的第一架無人機新增至 Fleet Manager](https://docs.uavmatrix.com/zh-tw/fleet-manager/pair-uav/)。

## 配對後

**Fleet Connection** 卡片會顯示：

| 欄位 | 意義 |
| --- | --- |
| **Connected**／**Disconnected** | 無人機目前是否與 Fleet Manager 通訊。 |
| **Device Name**（裝置名稱） | 在 Fleet Manager 中顯示的名稱。可在此或 Fleet Manager 中編輯。*Managed by Fleet Manager* 表示名稱是在 Fleet Manager 中設定的。 |
| **Hostname**（主機名）、**Device ID**（裝置 ID） | Fleet Manager 辨識此無人機的方式。 |
| **Manager URL**（管理端 URL） | 無人機所配對的 Fleet Manager 執行個體。 |
| **Last Connected**（上次連線） | 無人機上次連上 Fleet Manager 的時間。 |

Fleet Manager 會從無人機取得：即時遙測（位置、電池、GPS、飛行狀態）、UAVcast-Pro 系統狀態，以及遠端服務控制。Fleet Manager 透過串流綁定建立的地面站目的地會出現在[地面控制站](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/)中，並帶有雲端圖示。

若日後要將無人機加入組織的 VPN，請使用[虛擬專用網路](https://docs.uavmatrix.com/zh-tw/uavcast-pro/connectivity/vpn/)中的 **Fleet Manager** 分頁。

## 取消配對

1. 前往 **Management → Fleet Management**（管理 → Fleet Management）。
2. 選擇 **Disconnect from Fleet**，並確認。

此操作會移除配對關係及無人機的憑證。若要再次在 Fleet Manager 中使用該無人機，請使用新的配對碼重新配對。同時也請在 Fleet Manager 中將該無人機從機隊移除，以免它一直顯示為離線。

## 疑難排解

| 症狀 | 檢查項目 |
| --- | --- |
| *No valid license found. Please activate your license first.* | 請在 **Application**（應用程式）中啟用許可證。請參閱[許可證與啟用](https://docs.uavmatrix.com/zh-tw/get-started/license-activation/)。 |
| Fleet Manager 表示該許可證不屬於組織成員 | 許可證是以非成員的電子郵件購買的。請在 Fleet Manager 中新增該電子郵件（請參閱[許可證](https://docs.uavmatrix.com/zh-tw/fleet-manager/licenses/)），或邀請該帳戶加入組織。 |
| 配對碼已過期 | 請再次選擇 **Connect to Fleet Manager**。 |
| 已配對，但狀態持續顯示 **Disconnected** | 無人機無法透過 TCP 8883 連到 Fleet Manager。部分網路會封鎖此連接埠。請檢查無人機的網際網路連線與防火牆。 |

更多協助：[配對碼無效](https://docs.uavmatrix.com/zh-tw/troubleshooting/pairing-code-invalid/)與[無人機在 Fleet Manager 中離線](https://docs.uavmatrix.com/zh-tw/troubleshooting/drone-offline-fleet-manager/)。

Source: https://docs.uavmatrix.com/zh-tw/uavcast-pro/fleet-pairing/
