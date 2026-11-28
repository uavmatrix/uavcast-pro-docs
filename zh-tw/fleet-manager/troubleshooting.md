# Fleet Manager 疑難排解

> 修正常見的 Fleet Manager 問題：配對錯誤、無人機卡在 PAIRING 或離線、需要重新配對、串流遺失與指令失敗。

請從您看到的內容開始。每一列都會連結到修正方法，位於下方或共用的[疑難排解](https://docs.uavmatrix.com/zh-tw/troubleshooting/)頁面。

| 您看到的內容 | 可能原因 | 前往 |
| --- | --- | --- |
| **Invalid pairing code**、**This pairing code has expired**、**This pairing code has already been used** | 輸入錯誤、配對碼已超過 5 分鐘，或已被使用 | [配對碼無效或已過期](https://docs.uavmatrix.com/zh-tw/troubleshooting/pairing-code-invalid/) |
| **License is not owned by any member of this organization** | 授權是以非成員的電子郵件購買 | [以其他電子郵件購買的授權](https://docs.uavmatrix.com/zh-tw/fleet-manager/licenses/#licenses-bought-with-another-email) |
| **This UAV is already paired to an organization** | 無人機仍屬於另一個組織 | [移動無人機](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/remove-or-transfer/#move-a-drone-to-another-organization) |
| UAVcast-Pro 顯示 **No valid license found** 或 **Invalid or inactive license** | 無人機上未啟用授權、授權已過期或已退款 | [授權無法啟用](https://docs.uavmatrix.com/zh-tw/troubleshooting/license-activation-failed/) |
| 沒有 **Pair Device** 按鈕 | 您是 Viewer | [角色與權限](https://docs.uavmatrix.com/zh-tw/fleet-manager/team/roles-and-permissions/) |
| 無人機卡在 **PAIRING** | 無人機尚未連線到代理伺服器 | [卡在 PAIRING](https://docs.uavmatrix.com/zh-tw/fleet-manager/troubleshooting/#stuck-on-pairing) |
| 無人機 **OFFLINE** | 無網際網路、8883 連接埠被封鎖，或 UAVcast-Pro 未執行 | [Fleet Manager 中無人機離線](https://docs.uavmatrix.com/zh-tw/troubleshooting/drone-offline-fleet-manager/) |
| **Re-pair required** | 舊的連線憑證 | [重新配對無人機](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone) |
| 地圖上顯示 **NO MAVLINK** | UAVcast-Pro 沒有來自飛行控制器的資料 | [沒有 MAVLink 心跳訊號](https://docs.uavmatrix.com/zh-tw/troubleshooting/no-mavlink-heartbeat/) |
| 串流綁定失敗：**Failed to send configuration to drone - it may be offline** | 無人機離線，或未在 15 秒內確認 | [串流綁定無法儲存](https://docs.uavmatrix.com/zh-tw/fleet-manager/troubleshooting/#binding-wont-save) |
| 串流綁定已存在，但地面站沒有遙測或視訊 | 防火牆、連接埠錯誤，或串流已關閉 | [地面站沒有串流](https://docs.uavmatrix.com/zh-tw/fleet-manager/troubleshooting/#no-stream-at-the-ground-station) |
| 地面站已加入 VPN，但無法連到無人機 | 裝置類型、無人機不在 VPN 上，或 UDP 被封鎖 | [VPN 已連線但無法連到無人機](https://docs.uavmatrix.com/zh-tw/troubleshooting/vpn-cant-reach-drone/) |
| 指令無法運作，顯示 **UAVcast Upgrade Required** | 無人機離線、Viewer 角色，或 UAVcast-Pro 版本過舊 | [指令失敗](https://docs.uavmatrix.com/zh-tw/fleet-manager/troubleshooting/#commands-fail) |
| 遠端開啟 UAVcast-Pro 時顯示 **Request timed out. UAVcast may be unreachable.** | 經過代理的連線速度慢 | [代理速度慢或不完整](https://docs.uavmatrix.com/zh-tw/fleet-manager/troubleshooting/#proxy-is-slow-or-incomplete) |
| 未收到邀請電子郵件 | 垃圾郵件過濾，或地址錯誤 | [未收到邀請](https://docs.uavmatrix.com/zh-tw/fleet-manager/troubleshooting/#invitation-not-received) |

## 卡在 PAIRING

**PAIRING** 表示 Fleet Manager 已接受配對碼，並正在等待無人機透過 MQTT 送出第一個心跳訊號。

1. 查看 UAVcast-Pro 的 **Fleet Management** 頁面。若仍顯示 **Waiting for Manager to confirm pairing...**，表示無人機尚未取得其憑證。請確認它有網際網路連線。

2. 從無人機檢查是否能對外連線 TCP 8883：

   ```bash
   nc -vz fleet-manager.uavmatrix.com 8883
   ```

3. 若您輸入的是同一架無人機的**舊**配對碼（例如在 **Connect to Fleet Manager** 被選取兩次之後），UAVcast-Pro 並未在等待該配對碼。若顯示 **Disconnect from Fleet**，請選擇它，取得新的配對碼，然後再次配對到同一個組織。無人機會保留其紀錄。

無人機在配對碼過期後有 15 分鐘可以取得其憑證。之後請重新配對。

## 串流綁定無法儲存

Fleet Manager 只會在無人機確認後才儲存串流綁定。請確認無人機顯示 **ONLINE**，然後再試一次。若無人機已上線但串流綁定仍然失敗，無人機可能不在 VPN 上：請在 **Network → Connected Devices** 中檢查其類型是否為 **UAV**，或使用 **Push to Drone**。

## 地面站沒有串流

1. 在 **Network → Stream Bindings** 中，確認 **Video** 與 **Telemetry** 已開啟，並記下 **Ports**。
2. 確認地面站軟體正在監聽這些確切的連接埠。只有筆電上的第一架無人機使用 5600 / 14550；之後的每架無人機都有自己的連接埠。
3. 在筆電的防火牆中允許這些連接埠的入站 UDP。在 Windows 上，請在 **Private** 與 **Public** 網路中允許 QGroundControl 或 Mission Planner。
4. 在筆電上執行 `tailscale status`，確認列表中有該無人機。

更多細節請參閱：[地面站沒有遙測](https://docs.uavmatrix.com/zh-tw/troubleshooting/no-telemetry-in-gcs/)與[地面站沒有視訊](https://docs.uavmatrix.com/zh-tw/troubleshooting/no-video-in-gcs/)。

## 指令失敗

- 無人機必須顯示 **ONLINE**。
- 只有 Owner 與 Admin 可以傳送指令。Viewer 看不到指令按鈕，伺服器也會拒絕來自 Viewer 的指令。
- 解鎖、上鎖與飛行前校準需要 UAVcast-Pro 6.3.0_rc13 或更新版本。請[更新 UAVcast-Pro](https://docs.uavmatrix.com/zh-tw/get-started/updating/)。
- 飛行控制器可能會拒絕指令，例如在預先解鎖檢查失敗時解鎖。請在地圖彈出視窗或 **Logs** 分頁中閱讀其訊息。

## 代理速度慢或不完整

**Open via Proxy** 會透過無人機的連線傳遞每個頁面請求，每個請求的時限為 30 秒，且不支援即時（WebSocket）功能。若行動網路連線不佳，請等待頁面完全載入，或加入 VPN 並使用 **Open via VPN**。請參閱[遠端開啟 UAVcast-Pro](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/remote-uavcast/)。

## 未收到邀請

請對方檢查垃圾郵件。在 **Team** 中，檢查 **Pending Invitations** 下的電子郵件。若地址錯誤，請**撤銷**並重新邀請。邀請會在 7 天後過期。

## 仍無法解決

請透過支援按鈕開啟工單並附上截圖，或寄信至 [support@uavmatrix.com](mailto:support@uavmatrix.com)。請提供無人機名稱與裝置 ID（位於其 UAV 頁面）。由於工單只接受圖片，請將 UAVcast-Pro 記錄檔包（ZIP）與工單編號一併寄至 [support@uavmatrix.com](mailto:support@uavmatrix.com)。請參閱[支援](https://docs.uavmatrix.com/zh-tw/fleet-manager/support/)與[收集記錄檔](https://docs.uavmatrix.com/zh-tw/troubleshooting/collect-logs/)。

Source: https://docs.uavmatrix.com/zh-tw/fleet-manager/troubleshooting/
