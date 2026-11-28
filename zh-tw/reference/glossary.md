# 術語表

> UAVcast-Pro 與 Fleet Manager 文件中術語的白話說明：MAVLink、GCS、heartbeat、APN、HiLink、NTRIP、RTCM、VRS、ZeroTier、Tailscale。

### 離地高度（AGL）／海平面高度（AMSL）

離地高度是指高於地面的高度（此處指高於起飛點），海平面高度則是指高於平均海平面的高度。UAVcast-Pro 自 v6.5.0 起採用這些名詞，取代 REL 與 MSL。

### APN（存取點名稱）

行動數據機所連線之電信業者閘道的名稱。當 **Access Point Name (Optional)** 留空時，UAVcast-Pro 會自動偵測。

### ArduPilot

適用於多旋翼、固定翼、VTOL、地面車與船艇的開源自動駕駛韌體。UAVcast-Pro 可搭配 ArduPilot，也可搭配任何其他 MAVLink 飛行控制器，例如 PX4。其飛行模式按鈕採用 ArduPilot 的模式名稱。

### 認證金鑰（Auth key）

一種 Tailscale 金鑰，可在不使用瀏覽器的情況下，讓裝置登入 tailnet。Fleet Manager 利用認證金鑰，將地面站加入組織的 VPN。

### 位元率（Bitrate）

視訊編碼器每秒產生的位元數。必須在您的網路連線上傳頻寬內，並預留足夠餘裕。

### CSI 攝影機

連接於 Raspberry Pi 排線連接器上的攝影機，例如 Camera Module 3。

### 目標位址

在 UAVcast-Pro 的 **Ground Control Stations** 下的一筆地面站項目，包含一個 IP 位址、一個遙測連接埠與一個視訊連接埠。

### 雙路視訊串流

同時透過兩個視訊連接埠，將兩台攝影機的畫面串流至地面站。

### Fleet Manager

UAVmatrix 的網頁儀表板，用於在同一個組織內監控並控制多台 UAVcast-Pro 無人機。

### GCS（地面控制站）

用來監控並操控無人機的軟體及其所在的電腦，例如 QGroundControl、Mission Planner、MAVProxy。

### GCS 故障保護

飛行控制器的一項設定，當無人機與地面站失去連線時，會讓無人機自行執行動作（返航、降落或懸停）。

### GGA

包含您位置資訊的 NMEA 語句。VRS 及最近掛載點的 NTRIP Caster 需要此資訊，才能計算適用於您所在位置的校正資料。

### H.264

UAVcast-Pro 所傳送的視訊壓縮格式。常見的地面站軟體皆可解碼。

### 心跳（Heartbeat）

飛行控制器約每秒傳送一次的 MAVLink 訊息，用來表示「我在這裡」。*No heartbeat* 表示連線中沒有可讀取的 MAVLink 資料。

### HiLink 數據機

一種內建路由器的 USB 數據機，可自動連線，並在 Linux 中以網路介面卡的形式出現。

### 注入器

UAVcast-Pro 的一種監聽器（HTTP、UDP 或序列埠），可將您自有的感測器數值轉換為 MAVLink `NAMED_VALUE_FLOAT` 訊息。

### 關鍵影格

一個完整的視訊影格，解碼器可以從此處開始解碼。關鍵影格越頻繁，封包遺失後恢復得越快。可透過 **串流恢復速率** 設定。

### MAVLink

飛行控制器與地面站之間的訊息傳遞通訊協定。

### 掛載點

NTRIP Caster 上具名的校正資料串流，通常對應一個基準站或一項 VRS 服務。

### MQTT

無人機與 Fleet Manager 通訊所使用的訊息傳遞通訊協定，以 TLS 加密，使用連接埠 8883。

### NTRIP／NTRIP Caster

一種通訊協定，以及提供 GNSS 校正資料串流的伺服器，可透過網際網路傳送 GNSS 校正資料。

### 配對碼

當您將無人機連線至 Fleet Manager 時，UAVcast-Pro 所顯示的 8 位數代碼。有效期限為 5 分鐘，且只能使用一次。

### Read Only（目標位址）

一種地面站目標位址，可接收遙測資料，但無法變更飛行器上的任何內容：從該目標位址發出的指令、模式變更、參數與任務寫入都會被封鎖。此行為自 UAVcast-Pro 6.5.3 起適用；在較早的版本中，Read Only 不會阻擋參數寫入。

### 唯讀（使用者）

UAVcast-Pro 的一種使用者角色，可檢視各頁面，但無法變更設定或控制無人機。

### RTCM3

GNSS 校正資料的標準訊息格式。

### RTK、RTK Float、RTK Fixed

搭配校正資料的即時動態定位。Float 為近似解；Fixed 為公分級精度的解。

### RTP／UDP

UAVcast-Pro 用於視訊與遙測的傳輸方式：速度快，且不重傳，可維持低延遲。

### SERIALx_PROTOCOL／SERIALx_BAUD

ArduPilot 參數，用來設定序列埠所使用的通訊協定（2 = MAVLink2）以及傳輸速率。

### 串流綁定

在 Fleet Manager 中，將某台無人機的視訊與遙測資料，透過其專屬連接埠傳送至某一台地面站的連結。

### sysid／compid

MAVLink 的系統 ID（哪一台飛行器）與元件 ID（飛行器的哪個部分）。飛行控制器通常為 sysid 1、compid 1。

### Tailnet

一個私有的 Tailscale 網路。

### Tailscale

以 WireGuard 為基礎的 VPN。UAVcast-Pro 可加入您的 tailnet，或加入 Fleet Manager 組織網路。

### UAVnet

UAVmatrix 託管的 ZeroTier 網路控制器，位於 uavnet.uavmatrix.com。此服務即將停止，改由 Fleet Manager VPN 取代；現有使用者應改用 Fleet Manager。

### VRS（虛擬參考站）

一種校正服務，透過基準站網路為您的位置計算校正資料。需要 GGA 上行傳送。

### ZeroTier

點對點 VPN。UAVcast-Pro 可加入您自己的 ZeroTier 網路。

Source: https://docs.uavmatrix.com/zh-tw/reference/glossary/
