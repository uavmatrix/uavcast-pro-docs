# 实时地图

> 在同一张实时地图上跟踪机队中的每架无人机，包括状态环、航向线、5 分钟航迹、跟随模式以及 OpenAIP 空域图层。

**Fleet Map**（侧边栏 **Overview → Fleet Map**）会在一张地图上显示所选组织中的每架无人机，并随遥测数据的到达实时更新。它专为控制室设计：让它保持打开，您即可一眼看出哪些飞机正在空中、它们正飞往何处，以及哪些需要关注。

![机队地图，包含多个彩色无人机标记、航向线以及覆盖某区域的飞行轨迹](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/map.webp)

*Dark 样式下的 Fleet Map，覆盖鹿特丹港：每架无人机使用各自的颜色，并带有航向线和航迹；灰色为离线标记，标注其最后一次出现距今的时长。*

## 读取标记

每架无人机都以其专属颜色绘制，并带有表示机型的图标：四旋翼、六旋翼、固定翼、VTOL、地面车、船或潜艇。标记周围的环和徽章用于标示问题：

| 标记上的显示 | 含义 |
| --- | --- |
| 无人机的专属颜色，无环 | 在线且状态正常。 |
| 灰色标记、灰色虚线环和时钟徽章 | **Offline**：20 秒内未接收到任何数据。 |
| 橙色环加 **!** 徽章 | **NO MAVLINK**：UAVcast-Pro 在线，但 10 秒内未收到来自飞行控制器的遥测数据。请检查飞行控制器连接。 |
| 红色虚线环 | **GPS lost**：没有卫星或无定位。 |
| 黄色虚线环 | **GPS weak**：卫星数少于 6 颗，或仅有 2D 定位。 |
| **H** 标记 | 无人机的起飞点位置，在解锁时设定。将鼠标悬停可查看其海拔高度（AMSL）。 |

标记本身不显示解锁或上锁状态。请打开弹出窗口，或使用[控制面板](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remote-control/)查看 **Armed**。

标记旁的标签格式为 `Name • FLIGHTMODE`，适用时会附加 **NO MAVLINK**、**NO GPS** 或 **WEAK GPS**；离线无人机则显示 `Name • OFFLINE • 5 mins ago`。

### 航向线和航迹

- **航向线**是以无人机颜色绘制的虚线，指向机头方向。无人机离线时隐藏。
- **飞行航迹**显示路径的最近 **5 分钟**，以无人机颜色绘制的虚线表示（离线时为灰色）。每移动约 11 米添加一个新点。

## 无人机弹出窗口

选择标记即可打开其弹出窗口：名称、组织和状态，然后是 **Battery**、**Altitude**、**Mode**、**Armed**、**GPS**（卫星数和定位类型：No Fix、2D、3D、DGPS 或 RTK）、**Signal**，以及离线时的 **Last seen**。弹出窗口还会显示飞行控制器的最新状态消息，这通常是查看预解锁失败原因最快的方式。

**Signal** 是 Fleet Manager 与无人机之间的往返时间，每 10 秒测量一次：低于 100 毫秒为 Excellent（优秀），低于 300 毫秒为 Good（良好），低于 600 毫秒为 Fair（一般），超过此值或连续三次 ping 未响应则为 Poor（较差）。

![地图上的无人机弹出窗口，包含电量、高度、模式、解锁状态、GPS 和信号等行，以及 Follow、History 和 Controls 按钮](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/map--popup.webp)

*AUTO 模式下已解锁的测绘无人机弹出窗口：Battery 71%、Altitude 85.5 m、GPS 20 颗卫星（3D）、Signal 61 毫秒（Excellent），并带有 Follow、History 和 Controls。*

弹出窗口中有三个按钮：

- **Follow** 使无人机保持在视野中。详见下文。
- **History** 打开该无人机的[飞行历史](https://docs.uavmatrix.com/zh-cn/fleet-manager/map/flight-history/)。
- **Controls** 打开 [UAV 控制面板](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remote-control/)。

## 跟随无人机

在弹出窗口中选择 **Follow**。地图会放大（至少到缩放级别 14）并以无人机为中心，只有当无人机接近屏幕边缘时才会平移，因此地图不会抖动。屏幕上会出现 **Following *name*** 横幅；选择其中的 **X** 或 **Unfollow** 即可停止。打开 **History** 也会停止跟随。

![地图跟随单架无人机，顶部显示 Following 横幅](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/map--follow.webp)

*跟随模式：固定翼无人机正在测绘一条走廊，顶部为 Following 横幅，身后为航迹。*

## 没有 GPS 的无人机

在线但尚无位置信息的无人机会列在地图上的 **drones without GPS** 框中。选择其中一架即可打开其控制面板。计数器 **n drones on map** 显示已绘制在地图上的无人机数量。

## 地图设置

点击右上角的齿轮按钮即可打开 **Map Settings**。您的选择会保存在本浏览器中。

| 部分 | 选项 | 默认值 |
| --- | --- | --- |
| **Overlays** | **Airspace Layers**：限制空域、机场、直升机场 | Off |
| **Drone Filter** | **All Drones**、**Online Only** 或 **Offline Only** | All Drones |
| **Marker Options** | **Heading Line**（航向线） | On |
|  | **Marker Tooltip**：标记上的名称标签 | On |
|  | **Always Visible**：永久显示标签，而非仅在悬停时显示 | On |
|  | **Flight Trail**：最近的飞行路径（最近 5 分钟） | On |
| **Map Style** | **Satellite**、**Light** 或 **Dark** | Dark |

![Map Settings 面板，包含覆盖层、无人机过滤器、标记选项和地图样式](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/map--settings.webp)

*Map Settings 面板：已开启 Airspace Layers，Drone Filter 设为 Online Only，Map Style 设为 Satellite。*

> **繁忙地图**
>
> 若某一区域内有 20 架以上无人机，请关闭 **Always Visible**，使标签仅在悬停时显示；并使用 **Online Only** 隐藏停放的飞机。

## 空域图层

**Airspace Layers** 会在地图上方绘制来自 OpenAIP 的限制空域、机场和直升机场。该图层从缩放级别 7 及更近时显示。它是一个合并图层，无法单独切换各个类别。

> **不能替代官方空域检查**
>
> 该空域图层仅用于态势感知。每次飞行前，请查阅 NOTAM 以及您所在国家的无人机地图或 UTM 服务。

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/map/
