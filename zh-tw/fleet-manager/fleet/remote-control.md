# 遠端控制

> 在 Fleet Manager 的 UAV 控制面板中切換飛行模式、解鎖或上鎖、執行任務，並啟動飛行前校準，同時進行安全檢查。

**UAV Control Panel** 會透過 UAVcast-Pro，經由 Fleet Manager 的加密連線向飛行控制器傳送指令。它可以透過無人機所擁有的任何網際網路連線運作，包括 4G，且不需要 VPN。

請在 [Fleet](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/) 卡片上選擇 **Operations** 開啟它，或在[Fleet 地圖](https://docs.uavmatrix.com/zh-tw/fleet-manager/map/)上點擊無人機彈出視窗中的 **Controls**。在地圖上，控制面板另有 **Terminal** 與 **Logs** 分頁。

![UAV 控制面板，包含 Flight Mode、Mission 與 Actions 欄位，顯示已解鎖的四旋翼](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/control-panel.webp)

*已解鎖四旋翼在 LOITER 模式下的 UAV 控制面板：Flight Mode 含 RTL、Circle 與 Loiter 按鈕，Mission 已選取一個 18 個航點的測繪任務，Actions 含 Arm 與 Disarm。*

只有 **Owner** 與 **Admin** 可以傳送指令。請參閱[角色與權限](https://docs.uavmatrix.com/zh-tw/fleet-manager/team/roles-and-permissions/)。

> **遠端指令會移動真實的飛行器**
>
> 來自 Fleet Manager 的指令，會如同地面站傳送的指令一樣作用於飛行器。每次飛行都必須由飛行員透過地面站或 RC 遙控器保持控制，遵守您所在地區有關遠端與 BVLOS 操作的規定，並將 Fleet Manager 視為監督與派遣工具，而非您唯一的連線。

## 標題列

標題列顯示無人機的狀態、**ARMED** 與 **FAILSAFE** 旗標、**GCS Failsafe** 徽章、地圖顏色選擇器（**Change map color**，含 **Reset to auto**），以及連到 [UAV page](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/uav-details/) 的 **Details** 連結。

若飛行控制器的 GCS 故障保護已關閉，面板會顯示警告：**GCS Failsafe not enabled. Without GCS failsafe, the vehicle will not return to launch if it loses connection to the ground station.** 在超出目視視距飛行前，請先於地面站軟體中設定故障保護（ArduPilot 參數 `FS_GCS_ENABLE`）。

## Flight Mode

從下拉選單中選擇模式，或使用快速按鈕 **RTL**、**Circle** 與 **Loiter**（對於 rover 則為 **Hold**）。每次切換模式都會要求確認，模式越危險，檢查越嚴格：

| 確認方式 | 模式 |
| --- | --- |
| 簡單的 **Change to *MODE*?** | STABILIZE、ALT_HOLD、LOITER、POSHOLD、BRAKE、FLOWHOLD、HOLD、FBWA、FBWB、CRUISE、QHOVER、QLOITER、QSTABILIZE |
| 附模式用途說明的確認 | AUTO、GUIDED、RTL、SMART_RTL、CIRCLE、FOLLOW、ZIGZAG、QRTL、TAKEOFF、AVOID_ADSB、ACRO、MANUAL |
| 需輸入模式名稱以確認 | LAND、SPORT、AUTOTUNE、FLIP、DRIFT、THROW、QLAND、QACRO、AUTOROTATE |

![模式切換確認對話框，要求輸入 LAND 以確認](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/control-panel--mode-confirm.webp)

*LAND 的確認畫面。此模式必須輸入名稱才能確認。*

這些模式清單來自 ArduPilot（Copter、Plane、Rover 與 Sub）。若使用 PX4 飛行控制器，請由地面站切換模式。

## Mission

執行組織中已儲存的[任務](https://docs.uavmatrix.com/zh-tw/fleet-manager/missions/)：

- **Select mission** 會選取已儲存的任務。計數器會顯示目前與總航點數，例如 `3/18`，或 **None**。
- **Start** 會先讀取無人機上的任務，並與您所選的任務比較。若兩者不同，會出現 **Mission Not Loaded on Drone** 並提供 **Upload & Start**。
- **Stop**、**Read**（從無人機讀取任務）與 **Clear**。

每個動作都會要求確認。

## Actions

- **Arm** 與 **Disarm**。解鎖對話框會顯示 **This will arm the UAV. Ensure all personnel are clear of the propellers before arming.** 只有在工作台上測試時，才勾選 **Force arm (bypass pre-arm checks)**：它會略過阻止不安全起飛的檢查。
- **Select action... → Preflight Calibration** 會校準陀螺儀並校平加速度計。請將飛行器完全靜置於水平表面上，然後選擇 **Start Calibration**。

![解鎖確認對話框，包含螺旋槳警告與 Force arm 勾選框](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/control-panel--arm-confirm.webp)

*解鎖對話框，含螺旋槳警告，Force arm（略過解鎖前檢查）勾選框未勾選。*

解鎖、上鎖與飛行前校準需要無人機上的 UAVcast-Pro **6.3.0_rc13** 或更新版本。在較舊的版本上，面板會顯示 **UAVcast Upgrade Required**。請參閱[更新](https://docs.uavmatrix.com/zh-tw/get-started/updating/)。

## 指令未成功時

- 無人機必須在線上。傳送給離線無人機的指令會失敗。
- Fleet Manager 會等待無人機確認每一個指令。若飛行控制器拒絕指令，例如在解鎖前檢查失敗時解鎖，錯誤會顯示在面板中，也會顯示在無人機的狀態訊息中。
- 來自飛行控制器的訊息（解鎖前檢查失敗、模式變更）會顯示在地圖上無人機的彈出視窗中，以及[記錄](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/uav-details/#logs)分頁。

若要使用手機尺寸的螢幕，請參閱 [Lite 檢視](https://docs.uavmatrix.com/zh-tw/fleet-manager/lite-view/)。

Source: https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/remote-control/
