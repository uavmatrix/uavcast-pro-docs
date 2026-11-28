# Fleet Manager 故障排除

> 解决 Fleet Manager 的常见问题：配对错误、无人机卡在 PAIRING 或离线、需要重新配对、数据流缺失以及命令失败。

从您看到的现象开始排查。每一行都链接到相应的解决方法，该方法可能位于下文，也可能位于共享的[故障排除](https://docs.uavmatrix.com/zh-cn/troubleshooting/)页面中。

| 您看到的现象 | 可能原因 | 前往 |
| --- | --- | --- |
| **Invalid pairing code**、**This pairing code has expired**、**This pairing code has already been used** | 输入错误、配对码超过 5 分钟，或已被使用 | [配对码无效或已过期](https://docs.uavmatrix.com/zh-cn/troubleshooting/pairing-code-invalid/) |
| **License is not owned by any member of this organization** | 许可证使用的电子邮件不是组织成员 | [使用其他电子邮件购买的许可证](https://docs.uavmatrix.com/zh-cn/fleet-manager/licenses/#licenses-bought-with-another-email) |
| **This UAV is already paired to an organization** | 该无人机仍属于其他组织 | [迁移无人机](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remove-or-transfer/#move-a-drone-to-another-organization) |
| UAVcast-Pro 显示 **No valid license found** 或 **Invalid or inactive license** | 无人机上的许可证未激活、已过期或已退款 | [许可证无法激活](https://docs.uavmatrix.com/zh-cn/troubleshooting/license-activation-failed/) |
| 没有 **Pair Device** 按钮 | 您是 Viewer | [角色与权限](https://docs.uavmatrix.com/zh-cn/fleet-manager/team/roles-and-permissions/) |
| 无人机卡在 **PAIRING** | 无人机尚未连接到代理 | [卡在 PAIRING 状态](https://docs.uavmatrix.com/zh-cn/fleet-manager/troubleshooting/#stuck-on-pairing) |
| 无人机显示 **OFFLINE** | 无互联网连接、8883 端口被阻止，或 UAVcast-Pro 未运行 | [Fleet Manager 中无人机离线](https://docs.uavmatrix.com/zh-cn/troubleshooting/drone-offline-fleet-manager/) |
| **Re-pair required** | 旧的连接证书 | [重新配对无人机](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone) |
| 地图上显示 **NO MAVLINK** | UAVcast-Pro 未从飞行控制器获取数据 | [没有 MAVLink 心跳](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-mavlink-heartbeat/) |
| 绑定失败：**Failed to send configuration to drone - it may be offline** | 无人机离线，或未在 15 秒内确认 | [绑定无法保存](https://docs.uavmatrix.com/zh-cn/fleet-manager/troubleshooting/#binding-wont-save) |
| 已有绑定，但地面站没有遥测或视频 | 防火墙、端口错误，或数据流已关闭 | [地面站没有数据流](https://docs.uavmatrix.com/zh-cn/fleet-manager/troubleshooting/#no-stream-at-the-ground-station) |
| 地面站已加入 VPN，但无法连接无人机 | 设备类型错误、无人机未加入 VPN，或 UDP 被阻止 | [VPN 已连接但无法访问无人机](https://docs.uavmatrix.com/zh-cn/troubleshooting/vpn-cant-reach-drone/) |
| 命令无法使用，显示 **UAVcast Upgrade Required** | 无人机离线、角色为 Viewer，或 UAVcast-Pro 版本过旧 | [命令失败](https://docs.uavmatrix.com/zh-cn/fleet-manager/troubleshooting/#commands-fail) |
| 远程打开 UAVcast-Pro 时显示 **Request timed out. UAVcast may be unreachable.** | 经由代理的链路速度慢 | [代理速度慢或内容不完整](https://docs.uavmatrix.com/zh-cn/fleet-manager/troubleshooting/#proxy-is-slow-or-incomplete) |
| 未收到邀请邮件 | 被垃圾邮件过滤器拦截，或地址有误 | [未收到邀请](https://docs.uavmatrix.com/zh-cn/fleet-manager/troubleshooting/#invitation-not-received) |

## 卡在 PAIRING 状态

**PAIRING** 表示 Fleet Manager 已接受配对码，并正在等待无人机通过 MQTT 发送首次心跳。

1. 查看 UAVcast-Pro 的 **Fleet Management** 页面。如果仍显示 **Waiting for Manager to confirm pairing...**，说明无人机尚未获取其证书。请检查无人机是否已连接互联网。

2. 在无人机上检查其出站 TCP 8883 端口：

   ```bash
   nc -vz fleet-manager.uavmatrix.com 8883
   ```

3. 如果您输入的是同一台无人机的**旧**配对码（例如两次选择了 **Connect to Fleet Manager** 之后），UAVcast-Pro 不会等待该配对码。如有显示，请选择 **Disconnect from Fleet**，获取新的配对码，然后重新配对到同一组织。无人机会保留其记录。

无人机需要在配对码过期后的 15 分钟内获取其证书。超过该时间后，请重新配对。

## 绑定无法保存

只有在无人机确认后，Fleet Manager 才会保存绑定。请检查无人机是否显示 **ONLINE**，然后重试。如果无人机在线但绑定仍然失败，则无人机可能未加入 VPN：请在 **Network → Connected Devices** 中检查其类型是否为 **UAV**，或使用 **Push to Drone**。

## 地面站没有数据流

1. 在 **Network → Stream Bindings** 中，检查 **Video** 和 **Telemetry** 是否已开启，并记下 **Ports**。
2. 检查地面站软件是否正在监听这些确切的端口。只有笔记本电脑上的第一台无人机使用 5600 / 14550；之后的每台无人机都有自己的端口。
3. 在笔记本电脑的防火墙中允许这些端口的入站 UDP。在 Windows 上，请允许 QGroundControl 或 Mission Planner 通过 **Private** 和 **Public** 网络。
4. 在笔记本电脑上运行 `tailscale status`，检查无人机是否已列出。

更多详情：[地面站无遥测数据](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-telemetry-in-gcs/)和[地面站无视频](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-video-in-gcs/)。

## 命令失败

- 无人机必须处于 **ONLINE** 状态。
- 只有 Owner 和 Admin 可以发送命令。Viewer 看不到命令按钮，服务器也会拒绝来自 Viewer 的命令。
- 解锁、上锁和飞行前校准需要 UAVcast-Pro 6.3.0_rc13 或更高版本。请[更新 UAVcast-Pro](https://docs.uavmatrix.com/zh-cn/get-started/updating/)。
- 飞行控制器可能会拒绝某条命令，例如在飞行前检查未通过时解锁。请在地图弹窗或 **Logs** 标签页中查看其提示信息。

## 代理速度慢或内容不完整

**Open via Proxy** 会通过无人机的链路传递每个页面请求，每个请求最长等待 30 秒，且不支持实时（WebSocket）功能。在信号较弱的蜂窝网络上，请等待页面完全加载，或加入 VPN 后使用 **Open via VPN**。请参阅[远程打开 UAVcast-Pro](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remote-uavcast/)。

## 未收到邀请

请让对方检查垃圾邮件文件夹。在 **Team** 页面的 **Pending Invitations** 下检查该电子邮件地址。如果地址有误，请**撤销**该邀请并重新发送。邀请将在 7 天后过期。

## 仍然无法解决

请通过支持按钮提交附带截图的工单，或发送电子邮件至 [support@uavmatrix.com](mailto:support@uavmatrix.com)。请提供无人机名称和设备 ID（位于其 UAV 页面）。由于工单仅接受图片，请将 UAVcast-Pro 日志包（ZIP）连同工单编号发送至 [support@uavmatrix.com](mailto:support@uavmatrix.com)。参见[支持](https://docs.uavmatrix.com/zh-cn/fleet-manager/support/)和[收集日志](https://docs.uavmatrix.com/zh-cn/troubleshooting/collect-logs/)。

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/troubleshooting/
