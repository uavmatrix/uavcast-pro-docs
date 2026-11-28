# 網路與 VPN

> 在 Fleet Manager 中啟用組織專屬的私有 WireGuard VPN，連接無人機與地面站筆記型電腦，並管理裝置清單。

每個組織都可以擁有自己的私有 VPN：一個由 Fleet Manager 營運、連接您的無人機與地面站的 WireGuard 網狀網路。在此網路中，每個裝置都會取得固定的 `100.x.y.z` 位址，並能直接與其他裝置通訊，無論它位於 4G、Wi-Fi 或衛星網路，都不需要連接埠轉發或公開 IP 位址。

Fleet Manager 會利用此網路轉送[串流綁定](https://docs.uavmatrix.com/zh-tw/fleet-manager/network/stream-bindings/)：將無人機的影像與 MAVLink 傳送到飛行員執行 QGroundControl 或 Mission Planner 的筆記型電腦。

以上功能皆位於 **Network**（側邊欄 **Fleet Management → Network**）。

## 何時需要 VPN？

VPN 為**選用**功能：Fleet Manager 不需要 VPN 也能顯示、標示與控制無人機，透過無人機自身的加密連線即可運作。當您希望串流能傳送到地面站時，請啟用 VPN。

| 建議使用 VPN | 不需要 VPN |
| --- | --- |
| 無人機與地面站位於不同網路（4G、遠端站點） | 無人機與地面站位於同一個本地 Wi-Fi |
| 您希望直接串流影像與遙測 | 您使用直接的 USB 或序列遙測連線 |
| 您需要在各站點之間使用加密連線 | 您在受控環境中進行測試 |
| 您在多個地點營運 |  |

## 啟用 VPN

僅限 Owner 與 Admin。

1. 開啟 **Network**。若 VPN 未啟用，頁面會顯示 **Enable VPN Network**，並說明其提供的功能：基於 WireGuard 的安全連線、低延遲的影像與遙測串流，以及可在任何網路上運作。
2. 選取 **Enable VPN Network**。

![網路頁面，組織尚未啟用 VPN，顯示 Enable VPN Network 卡片](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/network--enable.webp)

*啟用 VPN 前的網路頁面，包含三項優點與 Enable VPN Network 按鈕。*

VPN 啟用後，頁面會顯示四個計數器（**Total Devices**、**Online**、**UAVs**、**Ground Stations**）以及三個分頁：**Devices**、**Stream Bindings** 與 **Settings**。

![網路頁面的 Devices 分頁，顯示狀態計數器與已連線裝置表格](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/network.webp)

*Network → Devices（大型營運者）：Total Devices 51、Online 39、UAVs 44、Ground Stations 7，以及 Connected Devices 表格。*

## 將無人機加入 VPN

無人機不需要手動下指令。有兩種方式：

- **配對時。** 若在配對前已啟用 VPN，配對精靈的 **VPN Connection** 步驟會讓無人機加入。請參閱[新增您的第一架無人機](https://docs.uavmatrix.com/zh-tw/fleet-manager/pair-uav/)。
- **Push to Drone。** 對於在啟用 VPN 之前已配對的無人機，**Devices** 分頁中的 **Push to Drone** 卡片會列出所有不在您網路中的無人機。選取某架無人機旁的 **Connect**，即可向其傳送 VPN 設定。無人機必須處於上線狀態。

若無人機已在其他 Tailscale 網路中，它會帶有 **Existing VPN** 徽章。此時選取 **Connect** 會要求確認（**Existing VPN Connection Detected**），而 **Replace & Connect** 會將其移至您組織的網路。

該無人機會出現在 **Connected Devices** 中，類型為 **UAV**，並附有其 VPN 位址，而 UAV 頁面會新增 **Open via VPN** 按鈕。

## 將地面站加入 VPN

地面站可透過 **Connect a Device** 中的一行 Tailscale 指令加入。請依照[連接地面站](https://docs.uavmatrix.com/zh-tw/fleet-manager/connect-gcs/)的步驟操作。

## 已連線裝置

表格會列出網路中的每個裝置：

| 欄位 | 顯示內容 |
| --- | --- |
| **Status** | 裝置在 VPN 上為上線或離線 |
| **Device** | 名稱與主機名稱 |
| **Type** | **UAV**、**GCS** 或 **Unknown**。未知裝置會有 **Configure** 按鈕。 |
| **IP Address** | 裝置的 VPN 位址（`100.x.y.z`） |
| **Last Check-in** | 裝置最後一次在網路上被看到的時間 |

選取 **Sync** 可從 VPN 伺服器重新整理清單。每列的操作選單包含：

- **Rename**：可讀的名稱，例如「野外筆電 – Team North」。
- **Change Type**：在 **UAV**、**GCS** 與 **Unknown** 之間切換。若為 UAV，請選擇它對應的已配對無人機。
- **Remove Device**：將裝置移出網路。若為無人機，Fleet Manager 會指示它離開 VPN，且其串流綁定也會一併移除。

### 設定未知裝置

新的地面站會顯示為 **Unknown**，橫幅會計算需要設定的裝置數量。選取 **Configure**，並回答 **What type of device is this?**

- **Ground Control Station (GCS)：** 執行 QGroundControl、Mission Planner 或類似軟體的電腦。它會**接收**影像與遙測，並可用於串流綁定。
- **Drone / UAV：** 執行 UAVcast-Pro 的無人機。請選擇它對應的已配對無人機，以便管理其串流。

選取 **Continue**，然後選取 **Complete Setup**。

## Settings 分頁

**Danger Zone → Delete Network** 會永久刪除 VPN 網路、所有已連線的裝置、所有驗證金鑰，以及所有串流綁定。裝置會離開網路，您必須重新連接每個地面站與無人機。

刪除網路也會同時關閉組織的 VPN，並通知上線中的 UAV 離開 VPN。之後 Network 頁面會再次顯示 **Enable VPN Network**，此操作會建立一個新的空白網路。沒有單獨的開關可以關閉 VPN：**Delete Network** 就是關閉的方式。

## 網路需求

| 裝置 | 需要對外連線 |
| --- | --- |
| 無人機（Fleet Manager 連線） | HTTPS（TCP 443）連至 `fleet-manager.uavmatrix.com`，以及 TCP 8883 的 MQTT over TLS |
| 無人機與地面站（VPN） | HTTPS（TCP 443）連至 `vpn-connect.uavmatrix.com`，以及 WireGuard 所需的 UDP。Tailscale 預設使用 UDP 41641。 |

多數行動網路與辦公室網路都允許這些連線。若裝置已加入 VPN 但彼此無法連線，請參閱[VPN 已連線但無法連到無人機](https://docs.uavmatrix.com/zh-tw/troubleshooting/vpn-cant-reach-drone/)。

當兩個裝置無法直接透過 UDP 連線時，其流量會透過 Tailscale 的公開 DERP 中繼伺服器，以 HTTPS（TCP 443）轉送。流量仍為端到端加密，但中繼會增加延遲，因此請盡可能允許對外 UDP。

Source: https://docs.uavmatrix.com/zh-tw/fleet-manager/network/
