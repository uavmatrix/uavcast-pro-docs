# 無人機在 Fleet Manager 中顯示離線

> 已配對的 UAV 在 Fleet Manager 中顯示 Offline 或 Re-pair required？請檢查無人機的網際網路連線、對外連接埠 8883、UAVcast-Pro Fleet Management 與授權。

無人機已完成配對，但 Fleet Manager 將其顯示為 **Offline**（在機隊地圖上為灰色），其遙測資料已凍結，或帶有 **Re-pair required** 標記。

Fleet Manager 若在 20 秒內未收到無人機的任何訊息，就會將該無人機標示為離線。無人機透過其自身的網際網路連線，以加密的 MQTT 連線與 Fleet Manager 通訊。

| 您會看到的畫面 | 可能原因 | 從此開始 |
| --- | --- | --- |
| 離線，且 UAVcast-Pro Fleet Management 顯示 Disconnected | 無人機沒有網際網路連線，或連接埠 8883 被封鎖 | [檢查 1](https://docs.uavmatrix.com/zh-tw/troubleshooting/drone-offline-fleet-manager/#check-1) |
| 「Re-pair required」標記，或顯示「This UAV must be re-paired」 | 無人機持有舊的憑證 | [檢查 2](https://docs.uavmatrix.com/zh-tw/troubleshooting/drone-offline-fleet-manager/#check-2) |
| 重新安裝或重設 UAVcast-Pro 後立即離線 | 無人機上的配對已被移除 | [檢查 3](https://docs.uavmatrix.com/zh-tw/troubleshooting/drone-offline-fleet-manager/#check-3) |
| 已上線，但沒有位置或電量資料 | 飛行控制器未連接至 UAVcast-Pro | [檢查 4](https://docs.uavmatrix.com/zh-tw/troubleshooting/drone-offline-fleet-manager/#check-4) |

## 檢查 1：無人機與 Fleet Manager 的連線

1. 在無人機上開啟 UAVcast-Pro，並前往 **Fleet Management**。**Fleet Connection** 會顯示 **Connected** 或 **Disconnected**，以及 **Last Connected**。
2. 若狀態為 **Disconnected**，請確認無人機已連上網際網路：檢查儀表板的 **Cellular** 列，或在裝置上執行 `curl -I https://fleet-manager.uavmatrix.com`。請先依照[數據機已連線但無網路](https://docs.uavmatrix.com/zh-tw/troubleshooting/modem-no-internet/)修復連線。
3. 無人機必須能夠對外建立 **連接埠 8883 的 TCP 連線**（透過 TLS 的 MQTT）。部分企業網路、公共 Wi-Fi 與部分物聯網 SIM 方案只允許網頁連接埠。請嘗試其他網路，或請電信業者開放 8883。
4. 使用 `date` 檢查裝置上的日期與時間。連線使用憑證，若裝置時鐘錯誤，憑證驗證就會失敗。
5. 確認無人機上的授權仍然有效（**應用程式 → 許可證管理器**）。

## 檢查 2：需要重新配對

Fleet Manager 已變更無人機的連線方式，因此在變更之前配對的無人機，必須重新配對一次。不會遺失任何資料：無人機會保留其名稱與歷史紀錄，您無須在 Fleet Manager 中移除它。

1. 在無人機上的 UAVcast-Pro 中開啟 **Fleet Management**，按下 **Disconnect from Fleet**，然後確認。
2. 按下 **Connect to Fleet Manager**。畫面會出現 8 位數的 **Pairing Code** 與倒數計時。
3. 在 Fleet Manager 中前往 **Fleet → Pair Device**，選擇組織並輸入配對碼。

## 檢查 3：無人機遺失配對

重新安裝並重設資料庫、執行**重設資料庫**，或執行 **Disconnect from Fleet**，都會移除無人機上的配對，使其停止回報。請依照檢查 2 重新配對。配對至相同的組織時，會沿用既有的無人機項目。

## 檢查 4：已上線，但沒有遙測資料

位置、電量與飛行模式皆來自飛行控制器。若無人機已上線，但這些欄位為空，代表 UAVcast-Pro 無法接收飛行控制器的資料：請參閱[沒有 MAVLink 心跳](https://docs.uavmatrix.com/zh-tw/troubleshooting/no-mavlink-heartbeat/)。

## 仍然離線？

請從無人機[下載日誌](https://docs.uavmatrix.com/zh-tw/troubleshooting/collect-logs/)，並選取**所有日誌**，然後將日誌連同無人機名稱與組織寄送至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**。其他 Fleet Manager 問題已在 [Fleet Manager 故障排除](https://docs.uavmatrix.com/zh-tw/fleet-manager/troubleshooting/)中說明。

相關頁面：[UAVcast-Pro 中的 Fleet Manager 配對](https://docs.uavmatrix.com/zh-tw/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/zh-tw/troubleshooting/drone-offline-fleet-manager/
