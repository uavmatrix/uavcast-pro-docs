# 远程打开 UAVcast-Pro

> 无需与无人机位于同一网络，即可通过 Fleet Manager 访问无人机的 UAVcast-Pro 设置，既可以使用内置代理（无需 VPN），也可以直接通过组织的 VPN。

您无需与无人机位于同一网络，即可更改其 UAVcast-Pro 设置（摄像头、调制解调器、地面站等）。在[无人机页面](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/uav-details/)上，**UAVcast Application** 卡片有两个按钮：

| 按钮 | 连接方式 | 用途 |
| --- | --- | --- |
| **Open via Proxy** | 通过 Fleet Manager 与无人机之间的加密连接。适用于任何在线无人机，无需 VPN。 | 配置更改和基本管理。 |
| **Open via VPN** | 直接打开 `http://<drone VPN address>`。仅当无人机已接入组织的 VPN 时显示，并且您的计算机也必须接入该 VPN。 | 所有功能，包括实时飞行地图和遥测。 |

代理仅供 Owner 和 Admin 使用。对于 Viewer，Fleet Manager 会拒绝访问，并显示 **Access denied. Only administrators can access UAVcast remotely.**

## 通过代理打开

1. 在无人机页面上，选择 **Open via Proxy**。
2. 阅读 **Remote UAVcast Access via Proxy** 对话框，然后选择 **Continue**。
3. UAVcast-Pro 会在新标签页中打开，并显示其 **Application** 页面。请使用该无人机的 UAVcast-Pro 用户登录：代理不会传递您的 Fleet Manager 登录信息。（尚未创建 UAVcast-Pro 用户的无人机无需登录即可打开。）

![Remote UAVcast Access via Proxy 对话框，列出了不可用的功能](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/drone-detail--proxy-warning.webp)

*Remote UAVcast Access via Proxy 对话框，列出了不可用的 WebSocket 功能：实时遥测、MAVLink 连接状态和飞行地图。*

代理只转发普通的页面请求，不支持实时连接。**WebSocket features unavailable** 表示以下功能无法通过代理使用：

- 实时遥测和即时更新
- MAVLink 连接状态
- 飞行地图

每个请求有 30 秒的完成时间。在网速较慢的情况下，较大的页面可能会超时，并显示 **Request timed out. UAVcast may be unreachable.** 如果无人机处于离线状态，则会显示 **Drone is offline. UAVcast interface is not available.**

> **通过代理修改网络设置时请务必谨慎**
>
> 代理通过无人机自身的互联网连接运行。如果您更改了调制解调器、网络优先级或 VPN 设置，导致无人机失去互联网连接，代理也会随之中断，届时您需要现场访问才能修复。

## 通过 VPN 打开

按照连接地面控制站的相同方式，将您的计算机接入组织的 VPN（参见[连接地面控制站](https://docs.uavmatrix.com/zh-cn/fleet-manager/connect-gcs/)）。之后，**Open via VPN** 会直接打开无人机的界面，并支持所有实时功能。如果需要做的不只是更改设置，这种方式更为合适。

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remote-uavcast/
