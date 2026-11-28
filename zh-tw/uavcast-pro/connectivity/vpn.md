# VPN

> 使用 Fleet Manager VPN，或您自己的 Tailscale 或 ZeroTier 網路，將無人機與地面站置於同一個私有網路，讓遙測與視訊可透過 4G/LTE 運作。

在 4G/LTE 網路下，無人機取得的是行動業者配發的位址，地面站無法直接連到它。VPN 可以解決這個問題：無人機與地面站加入同一個私有網路，並在該網路上取得固定位址，不論它們位於何處、使用哪種網路都能連線。請在側邊欄開啟 **Virtual Private Network**（虛擬專用網路）。

最快速的方式是 **Fleet Manager VPN**，它已包含在您的 UAVcast-Pro 許可證中。如果您已經自行架設 Tailscale tailnet 或 ZeroTier 網路，UAVcast-Pro 也可以加入該網路。

![虛擬專用網路頁面，已啟用 VPN、選取 Tailscale，顯示 Fleet Manager 分頁，且 VPN 資訊顯示未連線](https://docs.uavmatrix.com/zh-tw/img/screenshots/uavcast-pro/private-network.webp)

*在尚未配對或登入的無人機上，選取 Tailscale 的虛擬專用網路頁面。*

## 應該使用哪一種？

|  | Fleet Manager VPN | Tailscale | ZeroTier |
| --- | --- | --- | --- |
| 帳戶 | 您的 Fleet Manager 組織（已包含在許可證中） | 您自己的 Tailscale 帳戶 | 您自己的 ZeroTier 網路（自行管理） |
| 在無人機上設定 | 配對期間或配對後按一下即可完成 | 使用瀏覽器連結登入或使用認證金鑰 | 貼上網路 ID |
| 地面站 | 從 Fleet Manager 的 **Network** 頁面加入，串流透過串流綁定設定 | 加入您的 tailnet | 加入您的網路 |
| 適用對象 | 大多數操作者，以及所有機隊 | 已在使用 Tailscale 的團隊 | 已在使用 ZeroTier 的團隊 |

透過本頁面，一架無人機一次只能加入一個 VPN。

> **UAVnet 即將停用**
>
> UAVnet 是 UAVmatrix 的託管 ZeroTier 控制器，位於 uavnet.uavmatrix.com，將逐步停用並改由 Fleet Manager 取代。如果您的無人機使用 UAVnet 網路，請將其移至 Fleet Manager VPN。本頁面上的 **Open UAVNet Controller** 按鈕會開啟 UAVnet。

## Fleet Manager VPN

Fleet Manager VPN 是您組織的私有網路，由 Fleet Manager 透過 Tailscale 用戶端營運。您不需要 Tailscale 帳戶。

1. 在 Fleet Manager 中開啟 **Network**，如果尚未啟用，請選擇 **Enable VPN Network**。請參閱 [網路與 VPN](https://docs.uavmatrix.com/zh-tw/fleet-manager/network/)。
2. [配對無人機](https://docs.uavmatrix.com/zh-tw/uavcast-pro/fleet-pairing/)，並在配對精靈中保持勾選 **Enable VPN for this UAV**。已配對的無人機可從本頁面的 **Fleet Manager** 分頁加入（見下文），或在 Fleet Manager 的 **Network** 頁面使用 **Push to Drone**。
3. 在 Fleet Manager 的 **Network** 頁面中，將每個地面站加入網路：[連接地面站](https://docs.uavmatrix.com/zh-tw/fleet-manager/connect-gcs/)。
4. 使用[串流綁定](https://docs.uavmatrix.com/zh-tw/fleet-manager/network/stream-bindings/)將串流傳送至該地面站。Fleet Manager 會自動在無人機的[地面控制站](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/)頁面中為您新增目的地。

關於透過 4G 進行的逐步飛行設定，請參閱[透過 4G 進行超視距飛行](https://docs.uavmatrix.com/zh-tw/guides/bvlos-4g/)。

## Tailscale

在您自己的 tailnet 中使用，或在已配對的無人機上使用 Fleet Manager VPN。UAVcast-Pro 會安裝 Tailscale。請在三個分頁中選擇無人機的登入方式。

**網頁登入**

1. 將 **Enable VPN**（啟用 VPN）設為 **是**，並在 **Services**（服務）中選擇 **Tailscale**。
2. 在 **網頁登入** 中，選擇 **生成登入 URL**，然後選擇 **認證此裝置**。
3. 在新開啟的分頁中登入 Tailscale，並核准此裝置。
4. 返回 UAVcast-Pro，狀態會變為 **已連接**，並顯示 **IPv4 位址**、**主機名** 和 **Tailnet**。

**認證金鑰**

1. 在 [Tailscale 管理控制台](https://login.tailscale.com/admin/settings/keys)中產生認證金鑰。請將其設為預先核准；若要設定多架無人機，請將其設為可重複使用。
2. 在 UAVcast-Pro 中選擇 **Tailscale**，開啟 **認證金鑰**，貼上金鑰（`tskey-auth-…`），並可選擇設定 **主機名（可選）**。
3. 選擇 **使用認證金鑰連接**。

適用於手邊沒有瀏覽器的無人機，或需要以相同方式設定多架無人機的情況。

**Fleet Manager**

如果無人機已[與 Fleet Manager 配對](https://docs.uavmatrix.com/zh-tw/uavcast-pro/fleet-pairing/)，且您的組織已啟用 VPN，請選擇 **Connect to Fleet Manager VPN**。連線最多可能需要 30 秒。狀態接著會顯示 **Connected to Fleet Manager**。

尚未配對？此分頁會顯示 **Not Paired with Fleet Manager**，並提供 **Go to Fleet Manager Pairing** 連結。

請在地面站上安裝 Tailscale，登入同一個 tailnet，並在地面控制站中將其 Tailscale IP（`100.x.y.z`）作為目的地。

連線後，**Interface Down**（關閉介面）會關閉 Tailscale 介面但不會登出，**Interface Up**（啟用介面）會重新啟用它，**註銷** 則會將裝置從 tailnet 移除。

> **Fleet Manager VPN 會取代您自己的 Tailscale 登入**
>
> Fleet Manager VPN 在 Tailscale 上運作，並使用 Fleet Manager 自己的登入伺服器。連線至此 VPN 會使無人機登出您自己的 tailnet。如果您的 SSH 工作階段透過該 tailnet 進行，連線將會中斷。請從本地網路執行此操作。

## ZeroTier

如果您自行營運 ZeroTier 網路，例如在 ZeroTier Central 或您自己的控制器上，請使用此方式。

### 加入無人機

1. 在 UAVcast-Pro 中，前往 **虛擬專用網路**。
2. 將 **Enable VPN**（啟用 VPN）設為 **是**。
3. 在 **Services**（服務）中，選擇 **ZeroTier**。
4. 將 16 碼的網路 ID 貼到 **Network ID** 中，然後選擇 **加入網絡**。
5. 如果網路為私有網路，請在 ZeroTier 控制器中授權該無人機。接著 **ZeroTier 網路** 面板會顯示 **已連接** 與 **裝置 IP**。

**存取被拒絕**（ACCESS_DENIED）表示該成員尚未取得授權。

### 加入地面站

1. 在地面站電腦上安裝 [ZeroTier One](https://www.zerotier.com/download/)。
2. 加入相同的網路 ID：在 Windows 和 macOS 上，從 ZeroTier 系統匣或選單列圖示中選擇 **Join New Network**；在 Linux 上，執行 `sudo zerotier-cli join <network-id>`。
3. 在控制器中授權該地面站，並記下其取得的 IP 位址。

在[地面控制站](https://docs.uavmatrix.com/zh-tw/uavcast-pro/ground-stations/)中，將 **Destination IP or Host**（目標 IP 或主機）設為地面站的 **ZeroTier** IP。遙測與視訊現在會透過 VPN 傳輸。

> **在 Wi-Fi 與 4G 之間切換**
>
> ZeroTier 和 Tailscale 會跟隨目前最佳的網路。您可以在現場先使用 Wi-Fi，當 Wi-Fi 超出範圍時，連線會自動切換至數據機，而無需更改任何位址。

## 設定參考

| 設定 | 預設值 | 可用值 | 說明 |
| --- | --- | --- | --- |
| **Enable VPN**（啟用 VPN） | **否** | **是**、**否** |  |
| **Services**（服務） | **ZeroTier** | **ZeroTier**、**Tailscale** | 在啟用 VPN 之前為停用狀態。 |
| **Network ID**（網路 ID，ZeroTier） | 空白 | 16 碼的 ZeroTier 網路 ID | 來自您自己的 ZeroTier 控制器。 |
| **認證金鑰**（Tailscale） | 空白 | `tskey-auth-…` |  |
| **主機名（可選）**（Tailscale） | 系統主機名 | 文字 | 顯示於 Tailscale 管理控制台中的名稱。 |

## 疑難排解

| 症狀 | 檢查項目 |
| --- | --- |
| ZeroTier 顯示 **存取被拒絕** | 請在 ZeroTier 控制器中授權該成員。 |
| 已連線，但地面站沒有遙測 | 目的地仍使用區域網路 IP。請改用地面站的 VPN IP，並在其防火牆中允許 UDP 14550 和 5600。 |
| *無可用的 VPN 資訊* | VPN 已停用，或服務未執行。請檢查 **Enable VPN** 及**操作日誌**。 |
| Tailscale 網頁登入顯示*無認證 URL* | 請改用 **認證金鑰** 分頁。 |

這些介面會以 `zt…`（ZeroTier）或 `tailscale0` 的形式出現在[網路](https://docs.uavmatrix.com/zh-tw/uavcast-pro/connectivity/networks/)頁面中，並標示為 **VPN**。

仍無法解決？請參閱 [VPN 已連線但無法連到無人機](https://docs.uavmatrix.com/zh-tw/troubleshooting/vpn-cant-reach-drone/)。

Source: https://docs.uavmatrix.com/zh-tw/uavcast-pro/connectivity/vpn/
