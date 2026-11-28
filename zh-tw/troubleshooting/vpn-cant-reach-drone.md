# VPN 已連線，但無法連到無人機

> Fleet Manager VPN、Tailscale 或 ZeroTier 顯示已連線，但無法 ping 通無人機？請檢查授權、網路或 tailnet、網際網路與地面站 IP。

無人機與您的筆電都顯示已在 VPN 上，但對無人機 VPN 位址的 `ping` 逾時、網頁介面無法透過 VPN 開啟，或遙測與視訊沒有送達。

| 您會看到的畫面 | 可能原因 | 從此開始 |
| --- | --- | --- |
| ZeroTier 網路顯示存取被拒絕，或沒有 IP 位址 | 無人機未獲得此網路的授權 | [檢查 1](https://docs.uavmatrix.com/zh-tw/troubleshooting/vpn-cant-reach-drone/#check-1) |
| 無人機正常，但筆電沒有取得位址或取得了錯誤的位址 | 筆電加入了其他網路或 tailnet | [檢查 2](https://docs.uavmatrix.com/zh-tw/troubleshooting/vpn-cant-reach-drone/#check-2) |
| Tailscale 運作數週後停止 | 裝置金鑰已過期 | [檢查 3](https://docs.uavmatrix.com/zh-tw/troubleshooting/vpn-cant-reach-drone/#check-3) |
| 無人機上的 VPN 在現場從未連線 | 無人機無法透過數據機連上網際網路 | [檢查 4](https://docs.uavmatrix.com/zh-tw/troubleshooting/vpn-cant-reach-drone/#check-4) |
| Ping 正常，但沒有遙測或視訊 | 地面站目標位址使用了錯誤的 IP | [檢查 5](https://docs.uavmatrix.com/zh-tw/troubleshooting/vpn-cant-reach-drone/#check-5) |

## 檢查 1：授權無人機加入網路

**ZeroTier：**

1. 在 UAVcast-Pro 中開啟**虛擬專用網路**。確認**啟用 VPN**為**是**、**服務**為 **ZeroTier**，且**網路 ID**是您 ZeroTier 控制器中的那一個。
2. 在**已連接網路**下查看您的網路。若其狀態標籤顯示**存取被拒絕**，表示無人機已加入，但尚未獲得授權。
3. 在您的 ZeroTier 控制器中開啟該網路，並以無人機的節點 ID 授權此成員。
4. 回到 UAVcast-Pro，等待直到網路顯示狀態 `OK` 與 IP 位址。這就是您從筆電使用的位址。

在私有的 ZeroTier 網路上，每一台加入的裝置（無人機、筆電、平板）都必須先在控制器中授權一次，才會取得位址。（UAVnet 網路同樣是私有的；UAVnet 即將淘汰，請改用 Fleet Manager VPN。）

**Tailscale：**無人機加入後會顯示**已連接**，並顯示 **IPv4 位址**（100.x.y.z）。若顯示**未連接**，請使用**網頁登入 → 生成登入 URL**，或在 Tailscale 管理控制台取得金鑰後，使用**認證金鑰**頁籤。

## 檢查 2：讓筆電位於同一個網路

兩端必須位於同一個 ZeroTier 網路或同一個 tailnet。

- **ZeroTier**：在筆電上加入相同的網路 ID，並同樣在您的控制器中授權筆電。在 Windows 上，請查看 ZeroTier 系統匣圖示；在 Linux 上請執行 `sudo zerotier-cli listnetworks`。狀態必須為 `OK`。
- **Tailscale**：Tailscale 用戶端一次只能加入一個 tailnet。請在筆電上執行 `tailscale status`。無人機必須出現在清單中。若沒有，表示筆電登入的是其他帳號或 tailnet。
- **Fleet Manager VPN**：若無人機是透過 Fleet Manager 與 VPN 配對，它會位於您組織的網路，而非您個人的 Tailscale。請使用 Fleet Manager 在 **Network** 下提供的指令連接筆電（`tailscale up --login-server=… --authkey=…`），並**只在筆電上執行，切勿在無人機上執行**。請參閱[將地面站連接到 Fleet Manager VPN](https://docs.uavmatrix.com/zh-tw/fleet-manager/connect-gcs/)。

> **配對可能會取代無人機的 VPN**
>
> 當您在 Fleet Manager 中配對無人機並勾選 **Replace existing VPN with Fleet Manager network** 時，無人機會離開目前的 Tailscale 網路，並加入組織的網路。仍在舊 tailnet 上的筆電將無法再連到該無人機。

## 檢查 3：Tailscale 金鑰已過期

Tailscale 裝置金鑰會過期。當無人機的金鑰過期時，它會離開 tailnet，直到重新登入為止。**虛擬專用網路**頁面上的**到期**欄位會顯示日期。在 Tailscale 管理控制台中，您可以為無人機關閉金鑰到期功能，避免它在專案進行中途離線。

## 檢查 4：無人機需要先有網際網路

VPN 是透過無人機自身的網際網路連線運作的。若數據機沒有網際網路，VPN 會顯示為已中斷，或從未取得位址。請先修復連線：[4G 數據機已連線但 Raspberry Pi 無網路](https://docs.uavmatrix.com/zh-tw/troubleshooting/modem-no-internet/)。

## 檢查 5：可以連線，但沒有資料

若 `ping <drone-vpn-ip>` 可以運作：

- **網頁介面**：開啟 `http://<drone-vpn-ip>/`。即時預覽也需要 VPN 上可連到的連接埠 8889。
- **遙測與視訊**：這些資料是從無人機傳送到 **地面控制站 → 目標IP或主機** 中所填入的位址。該位址必須是筆電的 VPN 位址，而非無人機的位址，也不是筆電的 Wi-Fi 位址。接著請參閱[沒有遙測](https://docs.uavmatrix.com/zh-tw/troubleshooting/no-telemetry-in-gcs/)或[沒有視訊](https://docs.uavmatrix.com/zh-tw/troubleshooting/no-video-in-gcs/)。
- **速度慢但可運作**：Tailscale 會顯示正在使用 **Relay**（中繼）。中繼連線可以運作，但會增加延遲。部分行動網路不允許直接連線，因此在該業者的網路上，中繼可能是最好的選擇。

## 仍然無法連線？

在選取 **VPN 管理器**的情況下[下載日誌](https://docs.uavmatrix.com/zh-tw/troubleshooting/collect-logs/)，並寄送至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**，同時附上無人機與筆電上 `zerotier-cli listnetworks` 或 `tailscale status` 的輸出。

相關頁面：[VPN 設定](https://docs.uavmatrix.com/zh-tw/uavcast-pro/connectivity/vpn/) · [Fleet Manager VPN - 無人機與地面站的私有網路](https://docs.uavmatrix.com/zh-tw/fleet-manager/network/)

Source: https://docs.uavmatrix.com/zh-tw/troubleshooting/vpn-cant-reach-drone/
