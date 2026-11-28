# 安裝 UAVcast-Pro

> 在 64 位元 Raspberry Pi OS、Debian 或 Ubuntu 系統（arm64 或 amd64）上以一行指令安裝 UAVcast-Pro，接著開啟網頁介面並建立管理員使用者。

一行指令完成安裝

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
```

在伴隨電腦上執行（64 位元 Raspberry Pi OS、Debian 或 Ubuntu，需連網）。下方步驟說明它做了什麼以及如何準備裝置。

> 啟動無人機需要 UAVcast-Pro 許可證。請在 UAVmatrix 商店購買。
>
> [購買 UAVcast-Pro](https://uavmatrix.com/zh-TW/checkout) · [查看方案與價格](https://uavmatrix.com/zh-TW/products)

UAVcast-Pro 只需一行指令即可安裝於任何 64 位元、基於 Debian 的 Linux 系統：Raspberry Pi OS、Debian 或 Ubuntu，arm64 或 amd64 皆可。安裝程式會下載最新版本、安裝其相依套件與服務，並在完成後顯示網頁介面的位址。安裝約需 10 分鐘；若為 Raspberry Pi Zero 2 W、2 或 3，則約需 30 分鐘。

## 開始之前

- 伴隨電腦上需為 64 位元作業系統。請使用 `uname -m` 檢查，輸出必須為 `aarch64` 或 `x86_64`。
- 根磁碟至少需有 500 MB 可用空間（`df -h /`）。
- 安裝期間，裝置需能連上網際網路。
- 需要 SSH，或在裝置上接好鍵盤與螢幕，並有一位具備 `sudo` 權限的使用者。

## 步驟 1：燒錄作業系統

**樹莓派**

1. 開啟 [Raspberry Pi Imager](https://www.raspberrypi.com/software/)，並選擇您的 Pi 型號。
2. 選擇 **Raspberry Pi OS (64-bit)**。**Lite** 版本已足夠，並能為影像保留更多 CPU 資源。
3. 開啟作業系統的自訂設定。設定主機名稱、使用者名稱與密碼、Wi-Fi 網路與國家/地區，並啟用 SSH。
4. 將映像檔寫入記憶卡，放入 Pi 後開機。

Raspberry Pi 版的 Ubuntu Server 64-bit 也可使用。

**其他 arm64 開發板**

燒錄廠商提供的 64 位元 Ubuntu 或 Debian 映像檔（例如 NVIDIA Jetson 的 JetPack Ubuntu），完成首次開機設定，並啟用 SSH。

非 Raspberry Pi 的 arm64 開發板，需要 UAVcast-Pro 6.5.3 或更新版本；舊版安裝程式會顯示 *Device is not a Raspberry Pi* 並停止。

**x86-64 電腦**

安裝 64 位元的 Debian 或 Ubuntu（伺服器版或桌面版）。安裝程式不會檢查發行版本，因此請使用目前受支援的版本，例如 Ubuntu 22.04 LTS 或更新版本。

接著透過 SSH 登入，並更新系統：

```bash
sudo apt update && sudo apt full-upgrade -y
```

## 步驟 2：執行安裝程式

在無人機上執行：

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
```

安裝程式會執行下列動作：

1. 偵測架構，並將對應的版本下載至 `/opt/uavcast-pro`。
2. 安裝所需的系統套件：NetworkManager、ModemManager、GStreamer、v4l-utils、Redis、Python 等。
3. 在 Raspberry Pi 上，釋放 GPIO UART 供飛行控制器使用（從 `cmdline.txt` 移除序列主控台，並將藍牙從 UART 移開），並提高攝影機記憶體配置以支援雙攝影機。原始的 `config.txt` 與 `cmdline.txt` 會先備份。
4. 安裝 ZeroTier、Tailscale、mavlink-router 與 MediaMTX。
5. 安裝並啟動 UAVcast-Pro 服務。
6. 檢查關鍵工具是否存在，並顯示網頁位址。

完成時您會看到：

```text
✅ Installation completed successfully!

Please reboot your device to complete the installation.

To access the UAVcast-Pro web interface, open your browser and navigate to:
http://192.168.1.50
```

重新開機，使 UART 與攝影機的變更生效：

```bash
sudo reboot
```

> **請耐心等待較慢的開發板**
>
> 在 Pi Zero 2 W 上，進度條可能會停住數分鐘，因為 apt 正在運作。請勿另外啟動第二次安裝：安裝程式禁止重複執行，第二份副本只會拖慢第一份的速度。完整記錄位於 `/opt/uavcast-pro/installer.log`。

### 安裝特定版本

列出適用於您架構的版本：

```bash
curl -fsSL https://install.uavmatrix.com | bash -s -- -l
```

使用 `-b` 安裝其中一個版本：

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2
```

您也可以之後在網頁介面中切換版本。請參閱[更新 UAVcast-Pro](https://docs.uavmatrix.com/zh-tw/get-started/updating/)。

## 步驟 3：開啟網頁介面

在同一網路的電腦上開啟瀏覽器，並前往安裝程式顯示的位址，例如 `http://192.168.1.50`。網頁介面使用連接埠 **80**。

若您不知道位址：

- 嘗試您在 Raspberry Pi Imager 中設定的主機名稱，例如 `http://raspberrypi.local`。這需要 mDNS，在大多數家用網路以及 macOS、Linux、Windows 10 或更新版本上皆可運作。
- 在路由器的已連線用戶端清單中尋找該裝置。
- 在裝置上執行 `hostname -I`。

您首先看到的頁面是**應用程式**，因為 UAVcast-Pro 尚未取得授權。在裝置取得授權之前，側邊欄會呈灰色（*此功能需要許可證*）。

## 步驟 4：啟動您的許可證

前往**應用程式 → 許可證管理器**，將金鑰貼入**輸入許可證密鑰**，然後選擇**驗證**。裝置需要網際網路連線才能完成此操作。完整流程、裝置名額與移轉許可證的方式，請參閱[許可證與啟動](https://docs.uavmatrix.com/zh-tw/get-started/license-activation/)。

## 步驟 5：建立管理員使用者

全新安裝時**沒有任何使用者，也沒有登入機制**：任何能連上網頁介面的人，都擁有完整的管理員權限。在無人機接入共用網路或網際網路之前，請先建立管理員帳戶。

1. 前往側邊欄中的**使用者**（位於 **Management** 區段下）。
2. 選擇**新增使用者**。
3. 輸入**使用者名稱**（至少 3 個字元）與**密碼**（至少 6 個字元）。第一位使用者一律為**管理員**。
4. 選擇**建立使用者**。

此後網頁介面會要求登入。工作階段會保持 7 天。唯讀帳戶請參閱[使用者與存取權限](https://docs.uavmatrix.com/zh-tw/uavcast-pro/users/)。

## 安裝內容

| 項目 | 位置 |
| --- | --- |
| 應用程式、執行檔、資料庫（`uavcast.db`）、日誌 | `/opt/uavcast-pro` |
| 安裝程式日誌 | `/opt/uavcast-pro/installer.log` |
| systemd 服務 | `uavcast-web`、`uavcast-factory`、`mavlink-manager`、`uavcast-camera`、`uavcast-ntrip`、`uavcast-dns`、`mediamtx`、`internet-check` |
| MAVLink 路由器設定 | `/etc/mavlink-router/main.conf`（由 UAVcast-Pro 產生，請勿編輯） |

確認網頁服務正在執行：

```bash
sudo systemctl status uavcast-web
```

## 解除安裝

安裝程式內建解除安裝模式。它會停止並移除所有 UAVcast-Pro 服務、設定資料庫，以及 `/opt/uavcast-pro` 中的程式檔案；若 ZeroTier、Tailscale 與 Redis 是由 UAVcast-Pro 安裝的，也會一併清除。NetworkManager、ModemManager 與 GStreamer 等一般套件會保留。

```bash
sudo /opt/uavcast-pro/factory/ApplicationInstaller --uninstall
```

從 UAVcast-Pro 6.5.3 起，`/opt/uavcast-pro/recordings` 中的飛行錄製內容會被保留。加上 `--delete-recordings` 可一併刪除錄製內容；加上 `--purge-deps` 則可同時移除在 UAVcast-Pro 之前就已安裝的 ZeroTier、Tailscale 與 Redis。在較早的版本中，解除安裝會刪除整個 `/opt/uavcast-pro` 資料夾（包括錄製內容），因此請先複製要保留的錄製內容。

> **請先註銷許可證**
>
> 解除安裝並不會釋放授權名額。在清除裝置之前，請先於**應用程式 → 許可證管理器**中註銷該裝置，否則您將需要另一台裝置才能釋放名額。請參閱[註銷裝置](https://docs.uavmatrix.com/zh-tw/get-started/license-activation/#unregister-a-device)。

## 從 UAVcast-Pro 4.x 或 5.x 升級

第 6 版是完全重寫的版本，無法匯入 4.x 或 5.x 的設定。請先記下您的地面站、攝影機與數據機設定，燒錄全新的 64 位元作業系統，然後安裝第 6 版。

若安裝程式回報 *An older version of UAVcast-Pro has been detected at /opt/UAVcast-Pro*，請先移除舊版。此操作會刪除舊設定：

```bash
sudo rm -rf /opt/UAVcast-Pro
```

## 安裝失敗時

| 訊息或症狀 | 解決方式 |
| --- | --- |
| *No installation candidate for … found!* | 作業系統為 32 位元，或不支援該架構。請使用 `uname -m` 檢查，並以 64 位元映像檔重新燒錄。 |
| *Not enough free space. … need 500MB* | 釋放空間，或改用容量較大的記憶卡。 |
| *Another process is currently using the system package manager* | 自動更新正在執行。請等待數分鐘後，再重新執行安裝程式。 |
| *Another installer is already running* | 請等待第一個安裝程式完成。 |
| *Installation completed with errors* 並出現紅色 ✗ | 請重新執行安裝程式。若問題重複出現，請將 `/opt/uavcast-pro/installer.log` 寄送至 [support@uavmatrix.com](mailto:support@uavmatrix.com)。 |
| 網頁無法開啟 | 檢查 `sudo systemctl status uavcast-web`，嘗試以 IP 取代主機名稱，並確認沒有其他程式佔用連接埠 80。 |

更多解決方式：[安裝失敗](https://docs.uavmatrix.com/zh-tw/troubleshooting/installation-fails/)與[網頁介面無法開啟](https://docs.uavmatrix.com/zh-tw/troubleshooting/web-interface-wont-open/)。

Source: https://docs.uavmatrix.com/zh-tw/get-started/installation/
