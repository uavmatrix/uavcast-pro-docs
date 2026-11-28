# Fleet Manager

> UAVmatrix Fleet Manager 可在同一张实时地图上跟踪每架运行 UAVcast-Pro 的无人机，并支持远程控制、任务、向地面站的 VPN 数据流传输以及团队角色。

UAVmatrix Fleet Manager 是一款网页应用，网址为 [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/)，可在一个地方管理多架无人机。每架运行 UAVcast-Pro 的无人机都可以与您的组织配对。配对完成后，您可以在实时地图上看到它，打开其终端、发送命令、上传任务，并将其视频和遥测数据路由到飞手使用的地面站。

![Fleet Manager 仪表盘，包含统计卡片、UAV Status 列表和 Recent Activity](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/dashboard.webp)

*仪表盘：统计卡片、UAV Status 列表，以及来自多位团队成员的 Recent Activity。*

## 您可以做什么

[添加第一架无人机使用 8 位代码，在约两分钟内配对一架运行 UAVcast-Pro 的无人机。](https://docs.uavmatrix.com/zh-cn/fleet-manager/pair-uav/)[实时跟踪机队所有无人机显示在同一张地图上，包含状态环、5 分钟航迹和跟随模式。](https://docs.uavmatrix.com/zh-cn/fleet-manager/map/)[远程控制无人机在浏览器中进行飞行模式切换、解锁与上锁、任务规划以及起飞前校准。](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remote-control/)[向地面站传输数据流通过 VPN 将多架无人机的视频和 MAVLink 发送到 QGroundControl 或 Mission Planner。](https://docs.uavmatrix.com/zh-cn/fleet-manager/network/stream-bindings/)[邀请团队成员为每个组织分配 Owner、Admin 和 Viewer 角色。](https://docs.uavmatrix.com/zh-cn/fleet-manager/team/)[规划任务绘制航点、为组织保存任务，并将其上传到任意无人机。](https://docs.uavmatrix.com/zh-cn/fleet-manager/missions/)

## 整体架构

Fleet Manager 从不直接与飞行控制器通信。这一工作由无人机伴随计算机上的 UAVcast-Pro 完成，它与 Fleet Manager 保持一条加密连接：

1. **配对。** UAVcast-Pro 向 Fleet Manager 申请配对码。您在 Fleet Manager 中输入该代码，随后 Fleet Manager 会为无人机分配其专属的客户端证书。
2. **控制通道。** 无人机使用该证书通过 TLS 在 **8883** 端口连接到 Fleet Manager 的 MQTT 代理，并完成身份验证。遥测、心跳、命令、终端会话以及对 UAVcast-Pro 网页界面的远程访问，均通过此连接传输。由于无人机始终主动向外连接，因此该连接可穿越 NAT 和蜂窝网络。
3. **数据通道（可选）。** 视频和 MAVLink 发往地面站时，通过贵组织的私有 VPN 点对点传输，该 VPN 是由 Fleet Manager 运行的 WireGuard 网络。若不使用 VPN，Fleet Manager 仍可显示和控制无人机，但不会路由数据流。

## 基本概念

| 术语 | 在 Fleet Manager 中的含义 |
| --- | --- |
| **Organization** | **组织**：您的公司或团队。无人机、任务、VPN 网络和成员都隶属于同一个组织。每位用户可以拥有一个组织，并可同时成为任意数量其他组织的成员。 |
| **UAV** | **UAV**：运行 UAVcast-Pro 的无人机（或地面车、船只或其他载具），同一时间只能与一个组织配对。Fleet Manager 通过 UAVcast-Pro 根据伴随计算机的 CPU 序列号和启动磁盘生成的设备 ID 来识别它，因此无人机在重启和网络变化后仍能保持其身份。 |
| **Pairing** | **配对**：使用 UAVcast-Pro 显示的 8 位代码，将 UAV 与某个组织关联。该代码有效期为 5 分钟。 |
| **Ground station (GCS)** | **地面控制站（GCS）**：运行 QGroundControl、Mission Planner 或类似软件的笔记本电脑或 PC，已加入贵组织的 VPN 以便接收数据流。 |
| **Stream binding** | **流绑定**：一条规则，表示“将此 UAV 的视频和遥测数据发送到该地面站”。每个绑定都有其自己的 UDP 端口，因此一台地面站可以同时接收多架无人机的数据。 |
| **Roles** | **角色**：**Owner**、**Admin** 或 **Viewer**，按组织设置。Viewer 可以查看；Admin 和 Owner 可以配对、控制和配置。参见 [角色与权限](https://docs.uavmatrix.com/zh-cn/fleet-manager/team/roles-and-permissions/)。 |
| **Licenses and seats** | **许可证与席位**：每架已配对的 UAV 都需要一个由组织成员拥有的有效 UAVcast-Pro 许可证。团队成员不占用席位。参见 [许可证](https://docs.uavmatrix.com/zh-cn/fleet-manager/licenses/)。 |
| **Status and alerts** | **状态与警报**：地图和无人机列表上的在线、离线、无 MAVLink 以及 GPS 警告，另加系统公告。参见 [状态指示器与通知](https://docs.uavmatrix.com/zh-cn/fleet-manager/alerts-and-status/)。 |

## 所需条件

Fleet Manager 已包含在您的 UAVcast-Pro 许可证中：无需单独订阅，也无需额外席位。

> Fleet Manager 已包含在 UAVcast-Pro 许可证中。每架配对的无人机都需要一个许可证。
>
> [购买 UAVcast-Pro](https://uavmatrix.com/zh/checkout) · [查看套餐和价格](https://uavmatrix.com/zh/products)

- 一个 UAVmatrix 账户（与您在 [uavmatrix.com](https://uavmatrix.com/) 购买许可证时使用的账户相同）。
- 至少一台安装了 UAVcast-Pro 并已激活许可证的伴随计算机。参见 [安装](https://docs.uavmatrix.com/zh-cn/get-started/installation/) 和 [激活您的许可证](https://docs.uavmatrix.com/zh-cn/get-started/license-activation/)。
- 无人机端可访问互联网，并已开放出站 HTTPS（443）和 TCP **8883** 端口。

## 从这里开始

1. [设置您的组织](https://docs.uavmatrix.com/zh-cn/fleet-manager/set-up-organization/)
2. [添加第一架无人机](https://docs.uavmatrix.com/zh-cn/fleet-manager/pair-uav/)
3. [连接地面站](https://docs.uavmatrix.com/zh-cn/fleet-manager/connect-gcs/)
4. [邀请团队成员](https://docs.uavmatrix.com/zh-cn/fleet-manager/team/)

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/
