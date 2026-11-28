# 与 Fleet Manager 配对

> 将运行 UAVcast-Pro 的无人机连接到 UAVmatrix Fleet Manager：在无人机上获取配对码，在 Fleet Manager 中输入，检查连接，以及重命名或取消配对。

配对可将运行 UAVcast-Pro 的无人机连接到您的组织，即 [UAVmatrix Fleet Manager](https://docs.uavmatrix.com/zh-cn/fleet-manager/)，这是用于管理机队的云端仪表盘。配对完成后，无人机会与 Fleet Manager 保持经过证书认证的加密连接，并在重启或网络变化后自动重新连接。您先在无人机上开始配对，然后在 Fleet Manager 中完成。整个过程大约需要两分钟。

## 开始之前

- 无人机上的 UAVcast-Pro 需要已**激活的许可证**。没有许可证时将拒绝配对（*未找到有效许可证，请先激活许可证。*）。
- UAVcast-Pro 中的**管理员**用户。只读用户看不到 **Fleet Management**。
- 在组织中拥有 **Owner** 或 **Admin** 角色的 Fleet Manager 账户。无人机的许可证必须属于该组织的成员。
- 无人机需要联网，并允许出站 TCP **8883**（基于 TLS 的 MQTT）和 HTTPS（443）。

## 配对无人机

1. 在无人机的 Web 界面中，进入 **管理 → Fleet Management**。
2. 选择 **Connect to Fleet Manager**。无人机会向 Fleet Manager 请求代码，并显示 **Pairing Code** 以及 **Expires in** 倒计时，然后显示 *Waiting for Manager to confirm pairing...*。
3. 在另一个标签页中登录 [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/)，然后进入 **Fleet → Pair Device**。
4. 输入无人机上显示的代码，并确认设备详细信息（主机名、架构、UAVcast-Pro 版本）与您面前的无人机一致。
5. 在 Fleet Manager 中完成后续步骤（选择 VPN 并设置名称）。
6. 回到无人机，页面会切换到 **Fleet Connection**，状态为 **Connected**。

![Connect to Fleet Manager 卡片，包含 Connect to Fleet Manager 按钮](https://docs.uavmatrix.com/zh-cn/img/screenshots/uavcast-pro/fleet--connect.webp)

*尚未配对的无人机上的 管理 → Fleet Management 页面。选择 Connect to Fleet Manager 后，此卡片会被替换为 8 位 Pairing Code 及其 Expires in 倒计时。*

> **配对码有效期为 5 分钟**
>
> 如果在输入之前已过期，请再次选择 **Connect to Fleet Manager** 获取新代码。

Fleet Manager 端的内容（包括组织、VPN，以及无人机加入机队后的操作）请参阅[将第一台无人机添加到 Fleet Manager](https://docs.uavmatrix.com/zh-cn/fleet-manager/pair-uav/)。

## 配对之后

**Fleet Connection** 卡片会显示以下内容：

| 字段 | 含义 |
| --- | --- |
| **Connected** / **Disconnected** | 无人机当前是否正在与 Fleet Manager 通信。 |
| **Device Name** | 在 Fleet Manager 中显示的名称。可在此处或 Fleet Manager 中编辑。*Managed by Fleet Manager* 表示名称已在 Fleet Manager 中设置。 |
| **Hostname**、**Device ID** | Fleet Manager 识别该无人机的方式。 |
| **Manager URL** | 无人机所配对的 Fleet Manager 实例。 |
| **Last Connected** | 无人机最后一次连接到 Fleet Manager 的时间。 |

Fleet Manager 从无人机获取的内容包括：实时遥测（位置、电池、GPS、飞行状态）、UAVcast-Pro 系统状态，以及远程服务控制。Fleet Manager 通过流绑定创建的地面站目标地址，会以云图标显示在[地面控制站](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/)页面中。

稍后若要将无人机加入组织的 VPN，请使用[虚拟专用网络](https://docs.uavmatrix.com/zh-cn/uavcast-pro/connectivity/vpn/)页面上的 **Fleet Manager** 标签页。

## 取消配对

1. 进入 **管理 → Fleet Management**。
2. 选择 **Disconnect from Fleet**，并确认。

此操作会删除配对信息和无人机的证书。如需再次在 Fleet Manager 中使用该无人机，请使用新代码重新配对。同时，也请在 Fleet Manager 中将该无人机从机队中移除，以免它一直显示为离线。

## 故障排除

| 症状 | 检查项 |
| --- | --- |
| *未找到有效许可证，请先激活许可证。* | 在 **应用程序** 中激活许可证。参阅[许可证与激活](https://docs.uavmatrix.com/zh-cn/get-started/license-activation/)。 |
| Fleet Manager 提示该许可证不属于组织成员 | 购买许可证时使用的电子邮件不是组织成员。请在 Fleet Manager 中添加该邮箱（参阅[许可证](https://docs.uavmatrix.com/zh-cn/fleet-manager/licenses/)），或邀请该账户加入组织。 |
| 代码已过期 | 再次选择 **Connect to Fleet Manager**。 |
| 已配对，但状态一直为 **Disconnected** | 无人机无法通过 TCP 8883 连接到 Fleet Manager。某些网络会阻止该端口。请检查无人机的互联网连接和防火墙。 |

更多帮助：[配对码无效](https://docs.uavmatrix.com/zh-cn/troubleshooting/pairing-code-invalid/)和[Fleet Manager 中无人机离线](https://docs.uavmatrix.com/zh-cn/troubleshooting/drone-offline-fleet-manager/)。

Source: https://docs.uavmatrix.com/zh-cn/uavcast-pro/fleet-pairing/
