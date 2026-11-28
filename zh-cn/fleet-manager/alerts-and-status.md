# 状态指示器与通知

> 了解 Fleet Manager 中离线、无 MAVLink、GPS、故障保护和电池指示器的含义，以及系统公告、状态页和告警。

Fleet Manager 会在您查看的位置显示问题：地图、Fleet 列表以及每架无人机的页面。本页列出了所有指示器及其处理方法。

## 无人机指示器

| 指示器 | 位置 | 含义 | 首先检查 |
| --- | --- | --- | --- |
| **OFFLINE**，带时钟徽章的灰色标记 | Fleet、地图、无人机页面 | 20 秒内未收到来自 UAVcast-Pro 的任何数据 | 无人机的互联网连接和端口 8883。参见 [Fleet Manager 中的无人机离线](https://docs.uavmatrix.com/zh-cn/troubleshooting/drone-offline-fleet-manager/)。 |
| **NO MAVLINK**，带 **!** 的橙色圆环 | 地图 | UAVcast-Pro 在线，但 10 秒内未收到飞控数据 | 飞控的电源和线缆。参见 [无 MAVLink 心跳](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-mavlink-heartbeat/)。 |
| 红色虚线环，**NO GPS** | 地图 | 没有卫星或没有定位 | 天线的天空视野，GPS 线缆。 |
| 黄色虚线环，**WEAK GPS** | 地图 | 卫星少于 6 颗，或仅为 2D 定位 | 起飞前等待更多卫星。 |
| 电池显示为黄色 / 红色 | Fleet 卡片 | 低于 50% / 低于 20% | 规划降落。 |
| **ARMED** | 无人机页面、控制面板、地图弹窗 | 电机已解锁 | 请将飞行器视为带电状态。 |
| **FAILSAFE** | 无人机页面、控制面板 | 飞控已进入故障保护 | 飞控的消息，显示在地图弹窗和**日志**中。 |
| **GCS FAILSAFE** / **GCS Failsafe not enabled** | 无人机页面、控制面板 | 地面站故障保护已触发，或未配置 | 超视距飞行前设置 `FS_GCS_ENABLE`。 |
| **Re-pair required** | Fleet、无人机页面 | 无人机使用的是旧的连接证书 | [重新配对无人机](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone)。 |
| **Signal** 较差 | 地图弹窗 | 与无人机的往返时延超过 600 毫秒，或连续丢失三次 ping | 蜂窝网络覆盖情况，或链路拥塞。 |

指示器在页面打开时实时更新。Fleet Manager 每 5 秒检查一次离线无人机。

![地图特写，标记显示离线、无 MAVLink 和弱 GPS 圆环](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/map--indicators.webp)

*四个标记的特写：一架状态正常的无人机，一架带时钟徽章的 OFFLINE，一架带橙色圆环的 NO MAVLINK，以及一架带黄色虚线环的 WEAK GPS。*

## 活动日志

团队所做的更改（配对、移除无人机、流绑定、邀请、角色变更、VPN）会记录在[仪表盘](https://docs.uavmatrix.com/zh-cn/fleet-manager/dashboard/)的 **Recent Activity** 下，并注明操作人。

## 系统公告

当 UAVmatrix 进行计划内维护或出现事件时，每个页面顶部都会显示一条横幅：蓝色表示信息，琥珀色表示警告，红色表示严重。关闭横幅后，它会保持隐藏，直到您在新的浏览器会话中打开 Fleet Manager。

## 状态页

**System → Status**（页面 **System Status**）会显示 Fleet Manager 是否运行正常：**All systems operational**，或者 **We're experiencing some issues** 并列出 **Active Incidents**。**Past Incidents** 列出最近已解决的事件及其 **Resolution**。当大量无人机同时离线时，请首先查看此页面。

![系统状态页，显示 All systems operational 以及过往事件列表](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/status.webp)

*系统状态页显示 All systems operational，以及两条标记为 Resolved 的 Past Incidents。*

## 电子邮件和 Webhook 告警

Fleet Manager 尚未针对无人机事件（例如电量低或无人机离线）发送电子邮件、短信或 Webhook 告警。请在控制室保持地图或 Fleet 列表处于打开状态，并依靠飞控自身的故障保护来应对电池和链路丢失。

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/alerts-and-status/
