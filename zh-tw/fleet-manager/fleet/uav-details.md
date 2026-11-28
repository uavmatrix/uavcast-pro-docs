# 無人機詳細資訊

> Fleet Manager 中無人機的頁面會顯示即時遙測與伴隨電腦狀態、SSH 終端機與 MAVLink 記錄，並可重新啟動或移除無人機。

每架無人機都有自己的頁面。可以透過 [Fleet](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/) 卡片上的 **Details**、從儀表板，或在配對結束時的 **View UAV** 開啟。

頁面標題列會顯示名稱、即時狀態徽章、需要時的 **Re-pair required**、組織、裝置 **ID**，以及 **Last seen**。Owner 與 Admin 另有 **Rename** 與 **Remove**。

頁面有四個分頁：**Overview**、**Terminal**、**Logs** 與 **Actions**。

## 概覽

即時資料會在抵達時推送到瀏覽器。

![無人機詳細資訊的 Overview 分頁，包含 UAVcast Application 卡片與 MAVLink / Flight Controller 卡片](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/drone-detail.webp)

*已在 AUTO 模式下解鎖的 VTOL 之 Overview 分頁：UAVcast Application 卡片含 CPU Temp、CPU、Memory 與 Disk，MAVLink / Flight Controller 卡片含電池、GPS、高度與航向。*

**UAVcast Application** 描述伴隨電腦：連線狀態（**Connected**、**Waiting for data...** 或 **Connecting...**）、**Hostname**、**Uptime**、**CPU Temp**、**CPU**、**Memory** 與 **Disk** 使用量、UAVcast-Pro 服務及其狀態，以及無人機的網路位址（LAN 與 VPN）。此卡片也有[遠端開啟 UAVcast-Pro](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/remote-uavcast/) 的按鈕：**Open via Proxy**，以及在無人機位於 VPN 上時才會出現的 **Open via VPN**。

**MAVLink / Flight Controller** 顯示飛行控制器回報的資訊：**ARMED** 或 **DISARMED**、**FAILSAFE** 與 **GCS FAILSAFE** 旗標、**Battery**、**GPS**（衛星數與定位）、**Altitude** 與 **Heading**。

> **炎熱天氣下請留意 CPU Temp**
>
> 運轉過熱的 Raspberry Pi 會降速，而視訊首先會受到影響。若飛行期間 **CPU Temp** 持續上升，請參閱[欠壓與降頻](https://docs.uavmatrix.com/zh-tw/troubleshooting/undervoltage-and-throttling/)。

### 已連線的地面站

在卡片下方，**Connected Ground Stations** 會列出接收此無人機串流的地面站，並附有 **Video** 與 **Telemetry** 開關，以及 **Pause** ／ **Resume**。**Add GCS**（Owner 與 Admin）可將另一個地面站綁定到此無人機。它會建立與 **Network → Stream Bindings** 相同的串流綁定，使用該地面站上接續的可用連接埠，並將新的目的地傳送給無人機。請參閱[串流綁定](https://docs.uavmatrix.com/zh-tw/fleet-manager/network/stream-bindings/)。

## 終端機

透過 Fleet Manager 的加密連線，在瀏覽器中開啟通往伴隨電腦的 SSH 工作階段。無需連接埠轉發，也不需要 VPN。僅限 Owner 與 Admin 使用。無人機必須在線上。

選擇 **Connect** 以開啟 shell。快速指令按鈕會為您執行常見檢查：`df -h`、`free -h`、`top -bn1`、`ip a`、`ip r`、`uptime`、`dmesg` 與 `ps aux`。**Disconnect** 會關閉工作階段。

![終端機分頁，SSH 工作階段顯示 df -h 輸出與快速指令按鈕](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/drone-detail--terminal.webp)

*終端機分頁已連到一架野外無人機，並已執行 df -h 快速指令。*

> **這是飛行器上的即時 shell**
>
> 終端機是伴隨電腦上的真實 shell。若無人機在空中時重新啟動服務或網路，可能會中斷遙測與視訊。除非您了解指令的作用，否則請在地面上使用。

## 記錄

即時檢視無人機傳送給 Fleet Manager 的遙測與心跳訊息，可使用 **Telemetry** 與 **Heartbeat** 篩選器、**Auto-scroll**、**Pause** 與清除功能。**Download logs** 會將畫面上的內容儲存為文字檔（`mavlink-log-<id>-<time>.txt`），便於連同工單編號以電子郵件寄給支援團隊（工單只接受圖片）。

這是即時記錄，並非飛行日誌存檔。Fleet Manager 會為[飛行歷史](https://docs.uavmatrix.com/zh-tw/fleet-manager/map/flight-history/)儲存遙測資料，但不會儲存或匯出 DataFlash 或 `.tlog` 檔案。這些檔案仍保存在飛行控制器與地面站軟體中。

![記錄分頁，顯示滾動的遙測與心跳項目清單，以及 Telemetry、Heartbeat 與 Auto-scroll 開關](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/drone-detail--logs.webp)

*記錄分頁正在串流 TELEMETRY 與 HEARTBEAT 項目，Telemetry、Heartbeat 與 Auto-scroll 均已開啟。*

## 動作

**System Actions** 包含 **Reboot**（重新啟動伴隨電腦）與 **Shutdown**（關閉伴隨電腦電源）。兩者都需要無人機在線上。若要確認，請輸入該動作的名稱。

這些動作只作用於伴隨電腦，不會作用於飛行控制器。關機無法遠端復原：必須有人對無人機執行斷電重啟。

![動作分頁，包含 System Actions 卡片與 Reboot、Shutdown 按鈕](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/drone-detail--actions.webp)

*動作分頁，已開啟 Confirm Reboot 對話框，要求輸入 reboot 以確認。*

## 重新命名

選擇 **Rename**，在 **Edit UAV** 中輸入新名稱並儲存。無人機在線上時，名稱會同步到 UAVcast-Pro。

## 移除

**Remove** 會將無人機從組織中刪除，並取消配對。請參閱[移除或轉移無人機](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/remove-or-transfer/)。

Source: https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/uav-details/
