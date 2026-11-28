# 无人机在 Fleet Manager 中显示为离线

> 已配对的 UAV 在 Fleet Manager 中显示 Offline 或需要 Re-pair required？请检查无人机的互联网连接、出站端口 8883、UAVcast-Pro Fleet Management 和许可证。

UAV 已配对，但 Fleet Manager 将其显示为 **Offline**（在车队地图上为灰色），其遥测数据已冻结，或其带有 **Re-pair required** 标记。

Fleet Manager 在 20 秒内未收到 UAV 的任何消息时，会将其标记为离线。无人机通过自身的互联网连接，使用加密的 MQTT 连接与 Fleet Manager 通信。

| 您会看到 | 可能原因 | 从此处开始 |
| --- | --- | --- |
| Offline，且 UAVcast-Pro Fleet Management 显示 Disconnected | 无人机无法连接互联网，或端口 8883 被阻止 | [检查 1](https://docs.uavmatrix.com/zh-cn/troubleshooting/drone-offline-fleet-manager/#check-1) |
| 出现 Re-pair required 标记，或提示 This UAV must be re-paired | 无人机使用的是旧证书 | [检查 2](https://docs.uavmatrix.com/zh-cn/troubleshooting/drone-offline-fleet-manager/#check-2) |
| 重新安装或重置 UAVcast-Pro 后立即显示离线 | 无人机上的配对信息已被删除 | [检查 3](https://docs.uavmatrix.com/zh-cn/troubleshooting/drone-offline-fleet-manager/#check-3) |
| 在线，但没有位置或电池信息 | 飞控未连接到 UAVcast-Pro | [检查 4](https://docs.uavmatrix.com/zh-cn/troubleshooting/drone-offline-fleet-manager/#check-4) |

## 检查 1：无人机与 Fleet Manager 的连接

1. 在无人机上打开 UAVcast-Pro，前往 **Fleet Management**。**Fleet Connection** 会显示 **Connected** 或 **Disconnected**，以及 **Last Connected**。
2. 如果显示 **Disconnected**，请检查无人机是否能访问互联网：查看仪表盘中的 **Cellular** 行，或在设备上运行 `curl -I https://fleet-manager.uavmatrix.com`。请先参照[已连接调制解调器但无互联网](https://docs.uavmatrix.com/zh-cn/troubleshooting/modem-no-internet/)修复网络连接。
3. 无人机必须能够建立到 **端口 8883** 的出站 TCP 连接（基于 TLS 的 MQTT）。部分企业网络、公共 Wi-Fi 以及一些物联网 SIM 套餐只允许 Web 端口。请尝试其他网络，或请运营商开放 8883 端口。
4. 使用 `date` 检查设备上的日期和时间。该连接依赖证书，时钟错误的设备会导致证书验证失败。
5. 确认无人机上的许可证仍然有效（**应用程序 → 许可证管理器**）。

## 检查 2：需要重新配对（Re-pair required）

Fleet Manager 更改了无人机的连接方式，因此在此更改之前配对的 UAV 需要再配对一次。不会丢失任何内容：UAV 会保留其名称和历史记录，您无需在 Fleet Manager 中将其移除。

1. 在无人机上的 UAVcast-Pro 中打开 **Fleet Management**，点击 **Disconnect from Fleet**，然后确认。
2. 点击 **Connect to Fleet Manager**。屏幕上会出现一个 8 位 **Pairing Code** 及倒计时。
3. 在 Fleet Manager 中，前往 **Fleet → Pair Device**，选择组织并输入该配对码。

## 检查 3：无人机丢失了配对信息

重新安装并重置数据库、执行 **Reset Database**，或点击 **Disconnect from Fleet**，都会删除无人机上的配对信息，导致其停止上报。请按检查 2 的方法重新配对。配对到同一组织时，会复用已有的 UAV 条目。

## 检查 4：在线，但没有遥测数据

位置、电池和飞行模式来自飞控。如果 UAV 在线，但这些字段为空，说明 UAVcast-Pro 无法接收到飞控的数据：请参阅[没有 MAVLink 心跳](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-mavlink-heartbeat/)。

## 仍然离线？

请从无人机上[下载日志](https://docs.uavmatrix.com/zh-cn/troubleshooting/collect-logs/)，选择 **所有日志**，并将其与 UAV 名称和组织一同发送至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**。更多 Fleet Manager 相关问题，请参阅 [Fleet Manager 故障排除](https://docs.uavmatrix.com/zh-cn/fleet-manager/troubleshooting/)。

相关内容：[UAVcast-Pro 中的 Fleet Manager 配对](https://docs.uavmatrix.com/zh-cn/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/zh-cn/troubleshooting/drone-offline-fleet-manager/
