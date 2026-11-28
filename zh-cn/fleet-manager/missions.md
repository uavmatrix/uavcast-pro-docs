# 任务

> 在地图上绘制航点任务，选择 MAVLink 命令和高度坐标系，为整个组织保存任务，并将其上传到任意在线无人机。

**Missions**（侧边栏 **Fleet Management → Missions**）是浏览器中的航点规划器。任务会为组织保存，因此团队中的任何人都可以加载任务，Owner 或 Admin 可以将其上传到任意在线无人机。

![任务规划器，卫星地图上绘制了航点测绘路线](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/missions.webp)

*卫星样式下的 Mission Planner，包含 18 个航点的测绘网格、Takeoff 和 Return to Launch，标题栏显示 18 个航点及总距离。*

Viewer 可以打开并查看已保存的任务。保存、上传和删除需要 Owner 或 Admin 权限。

## 规划任务

1. 选择 **Create New**（或 **Missions → New Mission**）。
2. 在地图上点击以添加航点。拖动航点即可移动它。放置航点时，**Next WP** 会显示与上一个航点的距离（**Prev:**）以及与起飞点的距离（**Home:**）。
3. 打开航点抽屉（**n Waypoints**）编辑每一行：**Command**、**Params**、**Alt**、**Frame** 和 **Radius**。拖动行可重新排序。**H** 行表示起飞点。
4. 在抽屉顶部设置 **Defaults:**，即新航点的默认值：**Alt**（默认 50 米）和 **WP Radius**（默认 30 米）。

![航点抽屉，包含命令、参数、坐标、高度、坐标系、半径和距离等列](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/missions--waypoint-drawer.webp)

*航点抽屉中包含一个 Takeoff、若干 Waypoint 行、一个 Change Speed 和一个 Return to Launch，Frame 设为 Relative。*

### 高度坐标系

| 坐标系 | 高度测量基准 |
| --- | --- |
| **Relative**（默认） | 起飞点位置 |
| **Absolute** | 平均海平面 |
| **Terrain** | 航点下方的地面（需要飞行控制器上有地形数据） |

### 命令

**Command** 选择器支持搜索，列出 ArduPilot 所支持的 MAVLink 任务命令，分组如下：

- **Navigation：** Waypoint、Takeoff、Land、Return to Launch、Loiter Unlim、Loiter Turns、Loiter Time、Loiter to Alt、Spline Waypoint、Vtol Takeoff、Vtol Land、Payload Place、Delay 等。
- **Conditions：** Delay、Change Alt、Distance、Yaw。
- **Do commands：** Change Speed、Set ROI Location、Set Servo、Set Relay、Jump、Digicam Control、Set Cam Trigg Dist、Mount Control、Gripper、Parachute、VTOL Transition 以及其他命令。

需要参数的命令（例如延迟时间、悬停圈数、速度或舵机 PWM）会在 **Params** 中提供可编辑的字段。

限制：高度为 0 至 10,000 米，半径为 1 至 1,000 米，且至少需要一个航点。

## 保存

选择 **Save**，输入 **Name**（最多 100 个字符）和可选的 **Description**，然后确认 **Save Mission**。存在未保存的更改时，标题栏会显示 **Unsaved**；**Update Mission** 会保存这些更改。在 **Missions → Saved Missions** 中可打开已保存的任务。

## 上传到无人机

1. 保存任务。未保存的任务无法上传（**Mission not saved**）。
2. 选择 **Upload to Drone**，在 **Select UAV** 下选择 UAV 并确认。
3. 等待确认。如果无人机在 30 秒内未响应，上传将超时。

![Upload Mission to Drone 对话框，列出在线的 UAV](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/missions--upload.webp)

*Upload Mission to Drone 对话框，可从中选择在线的 UAV。*

要执行该任务，请在无人机的[控制面板](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remote-control/#mission)中选择该任务，然后选择 **Start**。如果无人机上的任务与您选择的任务不同，控制面板会提供 **Upload & Start**。

## 从无人机读取任务

在 **Missions → Read from Drone** 下，选择一架在线无人机。其当前任务会以 **Mission from *name*** 的形式加载到规划器中。请将其保存，以留存一份副本，例如在覆盖之前。

> **飞行前请在地面站中检查任务**
>
> Fleet Manager 会精确上传您规划的内容。在自动飞行前，请像使用其他规划工具一样，在 QGroundControl 或 Mission Planner 中检查任务以及载具的故障保护设置。

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/missions/
