# 飞行历史

> 在 Fleet Manager 地图上回放无人机的已记录飞行，查看持续时间、最大高度和速度，保存命名飞行，并设置遥测数据的保留时间。

Fleet Manager 在每架无人机连接期间，每秒记录一次其遥测数据：位置、高度、速度、航向、电池、飞行模式、解锁状态和 GPS。**飞行历史**会在地图上回放这些记录。

## 打开无人机的历史记录

在 **Fleet Map** 上选择该无人机的标记，然后在弹出窗口中选择 **History**。位于地图底部的 ***name* - Flight History** 抽屉随即打开。

![地图下方的飞行历史抽屉，包含会话选择器、回放控件、统计数据以及回放的飞行路径](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/map--history.webp)

*检查无人机的飞行历史：已选中保存的飞行 Turbine blade inspection，回放速度为 4x，并显示 Duration、Max Alt、Max Speed 和 Avg Battery。*

## 选择会话

**Select flight session** 列出：

1. **已保存的飞行**（带书签图标），即您的团队命名过的飞行，显示在最前面。
2. 过去 30 天内，每个有已记录遥测数据的**日期**对应一项。

同一天的所有遥测数据会归为一组，因此同一天的多次飞行会显示为一个会话。请将您关注的时间段保存为命名飞行，以便快速找到。

## 回放

- 播放和暂停，以会话时长的 5% 为单位后退或前进，或跳转到开头或结尾。拖动时间轴即可快速定位。
- 速度：**0.5x**、**1x**（实时）、**2x**、**4x**、**8x**、**10x** 和 **20x**。
- 键盘操作：**Space** 播放/暂停，**←** / **→** 逐步移动，**Esc** 关闭。

在地图上，绿色的 **Start** 标记和红色的 **End** 标记框定了飞行范围。已播放的部分以青色绘制，其余部分以灰色虚线表示，一个带有高度标注的无人机图标会沿路径移动。

统计面板显示 **Duration**、**Max Alt**、**Max Speed** 和 **Avg Battery**；**Current Position** 则显示回放时间点的 **Alt**、**Speed**、**Heading** 和 **Mode**。

## 保存、重命名和删除飞行

Owner 和 Admin 可以保存、重命名和删除命名飞行。Viewer 可以回放这些飞行。

- **Save and name this flight** 会以某个名称保存当前时间范围（最多 100 个字符），例如"A 区域上空测绘"。两个已保存的飞行不能重叠：**A saved session already exists for this time range**。
- **Rename flight** 用于修改名称。
- **Delete saved flight** 仅删除名称。**Delete Saved Flight?** 会说明遥测数据本身不会被删除。

## 历史记录保留时长

Owner 和 Admin 可在 **Settings → History**（**Telemetry History**）中按组织设置保留时长：

- **Retention**：7、14、30、60 或 90 天，**6 个月**或 **1 年**。默认值和最大值均为 1 年。
- **Prune Now** 会在确认 **Prune Old History** 后，立即删除超过 7、14、30、60 或 90 天的数据（默认为 30 天）。
- **Delete Drone History**（每架无人机旁的垃圾桶图标）或 **Select All** → **Delete Selected (n)**，可清除所选无人机的历史记录。
- 卡片显示 **Storage Used**、**Total Records** 和 **Retention**。

Fleet Manager 每天删除超过保留期的数据。超过 7 天的数据会被压缩，因此大型机队一年的历史数据仍然便于使用。

![Settings 中的 History 选项卡，包含保留时间选择器、清理选项以及每架无人机的历史记录列表](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/settings--history.webp)

*拥有 46 架无人机的组织的 Settings → History：Storage Used、Total Records、Retention 90 天，以及带有 Delete 按钮的每架无人机列表。*

> **不导出日志**
>
> Fleet Manager 不会将飞行历史导出为文件，也不会存储视频或飞控日志（`.tlog`、DataFlash）。请从地面站软件或飞控的 SD 卡中保留这些日志。关于无人机上的视频录制，请参见[录制与飞行回顾](https://docs.uavmatrix.com/zh-cn/guides/recording-flight-review/)。

删除无人机会同时删除其全部历史记录，包括已保存的飞行。参见[移除或转移无人机](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remove-or-transfer/)。

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/map/flight-history/
