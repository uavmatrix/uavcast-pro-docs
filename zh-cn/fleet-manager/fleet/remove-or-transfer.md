# 重新配对、移除或转移无人机

> 在 Fleet Manager 提示时重新配对无人机，将其从组织中移除，转移到其他组织，或更换伴随计算机。

无人机同一时间只能属于一个组织。本页介绍您可以对现有无人机执行的三项操作：重新配对、移除以及迁移到其他位置。

## 重新配对无人机

重新配对会更新无人机的连接证书。无人机在 Fleet Manager 中的记录会保留：名称、遥测历史、已保存的飞行记录和流绑定都不会改变。

在以下情况下需要重新配对：

- Fleet Manager 在无人机上显示 **Re-pair required**，或在其页面上显示 **This UAV must be re-paired** 横幅。Fleet Manager 已升级为更新、更严格的证书，而此无人机仍在使用旧证书。
- 有人在 UAVcast-Pro 中选择了 **Disconnect from Fleet**。

![无人机页面，显示 This UAV must be re-paired 横幅](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/drone-detail--repair-required.webp)

*无人机页面上的 This UAV must be re-paired 横幅，说明了 Disconnect 和 Connect to Fleet Manager 的操作步骤。*

1. 在无人机的 UAVcast-Pro 界面中，打开 **Fleet Management**，然后选择 **Disconnect from Fleet**。确认 **Disconnect from Fleet?**。如果页面已显示 **Connect to Fleet Manager**，则跳过此步骤。
2. 选择 **Connect to Fleet Manager**，获取一个新的 8 位配对码。
3. 在 Fleet Manager 中前往 **Fleet → Pair Device**，选择**同一个组织**并输入配对码。按照[添加您的第一架无人机](https://docs.uavmatrix.com/zh-cn/fleet-manager/pair-uav/)中的向导操作。

请勿先在 Fleet Manager 中移除无人机。移除会删除其历史记录；重新配对则会保留历史记录。

## 移除无人机

当无人机被报废、出售或将迁移到其他组织时，请使用此操作。仅限 Owner 和 Admin。

1. 打开无人机的[无人机页面](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/uav-details/)，然后选择 **Remove**。
2. 确认 **Delete UAV**。

如果无人机在线，Fleet Manager 会先通知 UAVcast-Pro 取消配对，并最多等待 5 秒以获取响应。随后，UAVcast-Pro 会再次显示 **Connect to Fleet Manager**，并退出组织的 VPN。

如果无人机离线或未响应，**UAVcast Not Responding** 会询问是否继续。选择 **Delete Anyway** 只会将其从 Fleet Manager 中移除。之后，当您能够连接到该无人机时，请在 UAVcast-Pro 中自行选择 **Disconnect from Fleet**。在此之前，无人机仍会认为自己处于配对状态。

![Delete UAV 确认对话框，警告遥测数据和命令历史将被移除](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/drone-detail--delete.webp)

*报废机型的 Delete UAV 对话框，警告所有遥测数据和命令历史将被永久删除。*

### 移除时会删除哪些内容

| 删除的内容 | 保留的内容 |
| --- | --- |
| 无人机记录及其名称 | **Recent Activity** 中的记录 |
| 所有已存储的遥测和飞行历史，包括已保存的飞行记录 | 已保存的任务（它们属于组织） |
| 命令历史和流绑定 | UAVcast-Pro 许可证，它仍保持在无人机上的激活状态 |
| 无人机的 VPN 设备 |  |

> **此操作无法撤销**
>
> 移除无人机之前无法导出飞行历史。如果您需要这些数据，请先通过[飞行历史](https://docs.uavmatrix.com/zh-cn/fleet-manager/map/flight-history/)回放或记录所需内容。

## 将无人机转移到其他组织

Fleet Manager 没有针对单架无人机的“转移”按钮，因为历史记录会保留在记录它的组织中。如需迁移无人机，请执行以下步骤：

1. 在当前组织中[移除该无人机](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remove-or-transfer/#remove-a-drone)。该组织中的历史记录会被删除。
2. 确认该无人机的 UAVcast-Pro 许可证归新组织的成员所有。参见[许可证](https://docs.uavmatrix.com/zh-cn/fleet-manager/licenses/)。
3. 在新组织中[配对该无人机](https://docs.uavmatrix.com/zh-cn/fleet-manager/pair-uav/)。

如果您尝试配对仍属于其他组织的无人机，Fleet Manager 会停止并显示 **This UAV is already paired to an organization**。只有该组织的 Owner 或 Admin 才能释放它。

如果要移交**整个机队**及其历史记录（例如公司出售时），请保留该组织，并[转移所有权](https://docs.uavmatrix.com/zh-cn/fleet-manager/team/#transfer-ownership)给新的所有者。

## 更换伴随计算机

Fleet Manager 通过设备 ID 识别无人机，该 ID 由 UAVcast-Pro 根据伴随计算机的 CPU 序列号及其启动磁盘（SD 卡或 SSD）计算得出。更换新的伴随计算机，或在同一台计算机上更换新的 SD 卡或 SSD，都会显示为一架**新的**无人机。在同一块主板和磁盘上重新安装 UAVcast-Pro 会保持相同的设备 ID。

1. 在 Fleet Manager 中移除旧的无人机（或在不再需要其历史记录之前保留它）。
2. 在新计算机上安装 UAVcast-Pro 并激活许可证。参见[激活您的许可证](https://docs.uavmatrix.com/zh-cn/get-started/license-activation/)。
3. 将其作为新无人机进行配对，并重新创建其流绑定。

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remove-or-transfer/
