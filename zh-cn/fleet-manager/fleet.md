# Fleet 页面

> Fleet 页面列出组织中的每架无人机，并显示实时状态、电量和最后签到时间，也是配对无人机和打开控制面板的入口。

**Fleet**（侧边栏 **Fleet Management → Fleet**）列出所选组织中的每架无人机。它会实时更新，因此您可以在[地图](https://docs.uavmatrix.com/zh-cn/fleet-manager/map/)旁边的大屏幕上一直打开它。

![Fleet 页面，以网格形式显示无人机卡片，包含在线和离线状态、电量和最后在线时间](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/fleet.webp)

*Fleet 页面，共 46 架无人机：ONLINE 卡片显示电量，灰显的 OFFLINE 卡片显示 Last seen 时间。*

## 无人机卡片

页眉显示 **UAVs (n)**。每张卡片包括：

- **名称**以及状态徽章：**ONLINE**、**OFFLINE** 或 **PAIRING**。
- **电量**（百分比）。低于 50% 显示为黄色，低于 20% 显示为红色。
- **Last seen**，以相对时间显示。离线卡片会变暗。
- **Re-pair required**：当无人机需要再次配对时显示（参见[重新配对无人机](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone)）。

如果 UAVcast-Pro 在 **20 秒**内没有发送消息，无人机将被视为离线。UAVcast-Pro 每 5 秒发送一次心跳。

每张卡片上有两个按钮：

- **Operations** 打开[控制面板](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remote-control/)：飞行模式、解锁与上锁、任务。
- **Details** 打开[无人机页面](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/uav-details/)：实时遥测、终端、日志、系统操作、重命名和移除。

## 页面上的按钮

- **Pair Device** 启动[配对向导](https://docs.uavmatrix.com/zh-cn/fleet-manager/pair-uav/)。仅限 Owner 和 Admin。
- **Refresh** 重新加载列表。
- **Need more devices?** → **View Plans** 打开 UAVmatrix 商店，您可以在那里购买更多 UAVcast-Pro 许可证。参见[许可证](https://docs.uavmatrix.com/zh-cn/fleet-manager/licenses/)。

## 重新配对横幅

当一架或多架无人机使用的是较旧的连接证书时，页面顶部会显示一条横幅，内容为 **n UAV(s) must be re-paired**。请对列出的每架无人机重新配对一次；它会保留原有名称和历史记录。参见[重新配对无人机](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone)。

![Fleet 页面，顶部有重新配对横幅，两张卡片上显示 Re-pair required 徽章](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/fleet--repair-required.webp)

*Fleet 页面，横幅显示 2 UAVs must be re-paired，两张受影响的卡片上显示 Re-pair required 徽章。*

## 大型机队使用技巧

- **为无人机命名，便于在地图上识别。** 名称会显示在地图标签和绑定列表中。使用机尾号或角色（例如 "Inspection-07"）比默认主机名更容易辨认。可在无人机页面上重命名。
- **为每架无人机设置独立颜色。** Fleet Manager 会从 24 色调色板中自动分配颜色。对于需要团队一眼识别的无人机，可在控制面板中设置固定颜色（**Change map color**）。
- **使用组织区分客户。** 每架无人机只属于一个组织。如果您为多个客户提供服务，且各客户只应看到自己的无人机，请为每个客户分别创建一个组织。

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/
