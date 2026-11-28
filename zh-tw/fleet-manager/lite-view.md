# Lite 檢視

> Lite 檢視是 Fleet Manager 的手機尺寸控制畫面，提供車隊清單、即時電池、GPS 與高度、飛行模式，以及任務的開始、暫停與返航（RTL）。

**Lite Control** 是專為現場使用而設計的手機版 Fleet Manager：按鈕大、只保留必要功能，並透過手機的行動數據即時更新。

## 開啟 Lite 檢視

在手機上登入 Fleet Manager，開啟選單並選擇 **Fleet → Lite View**。您也可以直接前往 `https://fleet-manager.uavmatrix.com/lite`。將其加入主畫面，即可一鍵開啟。

## 車隊清單

清單會顯示每架無人機的狀態與電池（低於 40 % 為橘色，低於 20 % 為紅色）、**Live updates active** 指示燈，以及 **n online / n total** 計數。點選無人機即可開啟其控制畫面。

![手機上的 Lite 檢視車隊清單，顯示多架無人機的狀態與電池](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/lite.webp)

*390 × 844 手機上的 Lite 檢視：車隊清單顯示 33 架上線 / 共 46 架，並列出每架無人機的飛行模式與電池。*

## 無人機畫面

- 顯示 **Vehicle Armed** 與 **Failsafe Active** 橫幅。
- **Battery**、**GPS**、**Altitude** 與 **Speed** 卡片。
- **Device ID**、**Organization**、**Position**，以及 **View Full Details**（開啟完整的 UAV 頁面）。

![Lite 檢視的無人機畫面，包含已解鎖橫幅、狀態卡片與控制按鈕](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/lite--drone.webp)

*已解鎖且處於 AUTO 模式的無人機 Lite 檢視：包含 Vehicle Armed 橫幅、Battery、GPS、Altitude 與 Speed 卡片，以及模式與任務控制。*

### 安全狀態

Lite 檢視會顯示 **ARMED**（*Motors active - exercise caution*）或 **DISARMED**（*Safe to approach*），但沒有解鎖或上鎖按鈕：**基於安全考量，解鎖與上鎖應透過您的地面控制站（QGC、Mission Planner）執行。**

### 飛行模式（Owner 與 Admin）

**Quick Access** 會顯示您針對該載具類型最常使用的模式，**All Modes** 則顯示完整清單。安全模式在簡單確認後即可切換；導航與危險模式則會要求更嚴格的確認 **Change to *MODE*?** 才能切換，與[控制面板](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/remote-control/#flight-mode)相同。

### 任務控制（Owner 與 Admin）

針對無人機上已存在的任務：

- **Start** / **Resume**、**Pause**、**RTL** 與 **Stop**，每項操作都需要確認。地面車（Rover）暫停與停止時會使用 HOLD，而非 LOITER。
- **Jump to Waypoint**：使用 − 與 + 選擇編號，然後點選 **Jump to WP n**。**Currently at waypoint n** 會顯示進度。
- **Refresh Mission Data** 會從無人機重新載入任務。

若無人機沒有任務，您會看到 **No Mission Loaded**。請先在電腦上透過[任務](https://docs.uavmatrix.com/zh-tw/fleet-manager/missions/)上傳任務。

Source: https://docs.uavmatrix.com/zh-tw/fleet-manager/lite-view/
