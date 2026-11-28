# 仪表盘

> 一目了然地查看 Fleet Manager 仪表盘：无人机总数与在线数量、团队规模、无人机状态列表、入门清单以及最近活动日志。

**Dashboard** 是您登录后看到的第一个页面。它回答三个问题：当前有多少架无人机在线、是哪些无人机，以及您的团队最近做了哪些更改。

![Fleet Manager 仪表盘，包含四张统计卡片、UAV Status 列表和 Recent Activity](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/dashboard.webp)

*仪表盘：四张统计卡片、显示每架无人机电量和 GPS 的 UAV Status，以及团队的 Recent Activity。*

## 统计卡片

| 卡片 | 显示内容 |
| --- | --- |
| **Total UAVs** | 已配对到当前所打开组织的无人机（*In this organization*）。 |
| **Online** | 当前已连接到本组织的无人机，且在最近 20 秒内有数据（*Currently connected*）。 |
| **Organizations** | 您作为成员所属的组织。 |
| **Team Members** | 当前所打开组织的成员。 |

在侧边栏中切换组织，即可查看其他组织的数据。

## 无人机状态

最近出现的无人机列表，显示其状态、电量和最后一次签到时间。选择某架无人机可打开其[无人机页面](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/uav-details/)，或选择 **View All** 前往 [Fleet](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/)。

## 入门指南

新组织会看到一个两步清单，直到两步都完成为止：

1. **Create or Join an Organization**（**Go to Team**）
2. **Pair a UAV (UAVcast)**（**Pair Device**），当组织中至少有一架无人机时即视为完成

第二步请参照[添加您的第一架无人机](https://docs.uavmatrix.com/zh-cn/fleet-manager/pair-uav/)操作。

## 最近活动

组织中最近 10 条事件，以及执行操作的人员。Fleet Manager 记录的内容包括：

- 无人机的配对、重新配对和移除
- 流绑定的创建和移除，地面控制站的分配
- 成员的邀请、移除和角色变更，所有权转移
- VPN 的启用或禁用

即使无人机或成员已被移除，活动日志仍会保留，因此您仍可查看是谁做了哪些操作。

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/dashboard/
