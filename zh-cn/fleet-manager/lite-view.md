# 轻量视图

> 轻量视图是 Fleet Manager 的手机尺寸控制界面：包括机队列表、实时电池、GPS 和高度、飞行模式，以及任务的开始、暂停和 RTL。

**Lite Control** 是 Fleet Manager 的手机版本，供现场使用：按钮大、仅保留核心功能，并通过手机移动数据实时更新。

## 打开轻量视图

在手机上登录 Fleet Manager，打开菜单并选择 **Fleet → Lite View**。您也可以直接访问 `https://fleet-manager.uavmatrix.com/lite`。将其添加到主屏幕，即可一键访问。

## 机队列表

列表显示每架无人机的状态和电量（低于 40% 显示橙色，低于 20% 显示红色）、**Live updates active** 指示器，以及 **n online / n total** 计数。点击某架无人机即可打开其控制界面。

![手机上的轻量视图机队列表，显示多架无人机的状态和电量](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/lite.webp)

*390 × 844 手机上的轻量视图：机队列表显示 33 online / 46 total，并列出每架无人机的飞行模式和电量。*

## 无人机界面

- **Vehicle Armed** 和 **Failsafe Active** 横幅。
- **Battery**、**GPS**、**Altitude** 和 **Speed** 卡片。
- **Device ID**、**Organization**、**Position**，以及 **View Full Details**（打开完整的 UAV 页面）。

![轻量视图无人机界面，包含已解锁横幅、状态卡片和控制按钮](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/lite--drone.webp)

*AUTO 模式下已解锁无人机的轻量视图：Vehicle Armed 横幅、Battery、GPS、Altitude 和 Speed 卡片，以及模式和任务控制。*

### 安全状态

轻量视图会显示 **ARMED**（*Motors active - exercise caution*）或 **DISARMED**（*Safe to approach*），但没有解锁或上锁按钮：**出于安全考虑，解锁和上锁应通过地面控制站（QGC、Mission Planner）进行。**

### 飞行模式（Owner 和 Admin）

**Quick Access** 显示您针对该飞行器类型最常用的模式，**All Modes** 显示完整列表。安全模式在简单确认后切换；导航模式和危险模式会要求您通过更严格的检查，并弹出 **Change to *MODE*?** 确认框，与[控制面板](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remote-control/#flight-mode)中的做法相同。

### 任务控制（Owner 和 Admin）

对于无人机上已有的任务：

- **Start** / **Resume**、**Pause**、**RTL** 和 **Stop**，每项操作都需要确认。地面车（Rover）使用 HOLD 而非 LOITER 来暂停和停止。
- **Jump to Waypoint**：使用 − 和 + 选择编号，然后点击 **Jump to WP n**。**Currently at waypoint n** 显示当前进度。
- **Refresh Mission Data** 会从无人机重新加载任务。

如果无人机上没有任务，您会看到 **No Mission Loaded**。请先在电脑上通过[任务](https://docs.uavmatrix.com/zh-cn/fleet-manager/missions/)功能上传任务。

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/lite-view/
