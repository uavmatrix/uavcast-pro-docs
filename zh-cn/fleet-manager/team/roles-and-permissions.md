# 角色与权限

> Fleet Manager 中 Owner、Admin 和 Viewer 角色的完整权限矩阵：配对、飞行命令、终端、任务、VPN 和团队管理。

Fleet Manager 共有三种角色，按组织单独设置。同一人员可以在一个组织中担任 Admin，而在另一个组织中担任 Viewer。

| 角色 | 简要说明 |
| --- | --- |
| **Owner** | 拥有 Admin 的全部权限，另外还可以删除组织和转让所有权。每个组织有且仅有一位 Owner：即创建该组织的人，或获得所有权转让的人。 |
| **Admin** | 负责管理机队：配对和移除无人机，发送命令，打开终端，规划和上传任务，管理 VPN 和流绑定，并管理团队。 |
| **Viewer** | 只读。可查看仪表盘、机队、实时地图、飞行历史、任务、网络和团队，但不能更改或控制任何内容。 |

新成员以 Admin 或 Viewer 的身份受邀加入。Owner 角色只能通过[转让所有权](https://docs.uavmatrix.com/zh-cn/fleet-manager/team/#transfer-ownership)交接。

## 权限矩阵

该矩阵源自 Fleet Manager 在服务器端执行的权限规则，因此隐藏某个按钮从来都不是唯一的限制手段。

| 操作 | Owner | Admin | Viewer |
| --- | --- | --- | --- |
| **机队与无人机** |  |  |  |
| 查看仪表盘、机队列表、UAV 页面和实时地图 | ✓ | ✓ | ✓ |
| 回放飞行历史 | ✓ | ✓ | ✓ |
| 保存、重命名和删除已命名的飞行 | ✓ | ✓ | – |
| 配对无人机（**Pair Device**） | ✓ | ✓ | – |
| 重命名无人机、更改其地图颜色 | ✓ | ✓ | – |
| 移除无人机 | ✓ | ✓ | – |
| **命令** |  |  |  |
| 更改飞行模式、RTL、Loiter、Circle | ✓ | ✓ | – |
| 解锁、上锁、强制解锁 | ✓ | ✓ | – |
| 飞行前校准 | ✓ | ✓ | – |
| 在无人机上启动、停止和读取任务 | ✓ | ✓ | – |
| 重启或关闭伴随计算机 | ✓ | ✓ | – |
| 在 UAV 页面中使用 SSH **Terminal** | ✓ | ✓ | – |
| **Open via Proxy**（通过 Fleet Manager 访问 UAVcast-Pro 网页界面） | ✓ | ✓ | – |
| **任务** |  |  |  |
| 查看已保存的任务 | ✓ | ✓ | ✓ |
| 创建、编辑和删除任务 | ✓ | ✓ | – |
| **Upload to Drone** | ✓ | ✓ | – |
| **网络与 VPN** |  |  |  |
| 查看 Network 页面、设备和流绑定 | ✓ | ✓ | ✓ |
| 查看 VPN 认证密钥和 **GCS Connection Command** | ✓ | ✓ | – |
| 启用 VPN、生成认证密钥、**Push to Drone** | ✓ | ✓ | – |
| 重命名、更改类型或移除 VPN 设备 | ✓ | ✓ | – |
| 添加、暂停或移除流绑定 | ✓ | ✓ | – |
| 删除 VPN 网络 | ✓ | ✓ | – |
| **团队** |  |  |  |
| 查看成员及其角色 | ✓ | ✓ | ✓ |
| 邀请成员（以 Admin 或 Viewer 身份） | ✓ | ✓ | – |
| 更改成员角色（Owner 除外） | ✓ | ✓ | – |
| 移除成员（Owner 除外）、撤销邀请 | ✓ | ✓ | – |
| 转让所有权 | ✓ | – | – |
| **组织与设置** |  |  |  |
| 重命名组织、编辑其描述 | ✓ | ✓ | – |
| 更改遥测保留期限、清理或删除历史记录 | ✓ | ✓ | – |
| 删除组织 | ✓ | – | – |
| **所有人** |  |  |  |
| 使用 FleetBot，创建和关闭自己的支持工单 | ✓ | ✓ | ✓ |
| 编辑自己的个人资料（在 UAVmatrix 账户中） | ✓ | ✓ | ✓ |

> **Admin 可以管理其他 Admin**
>
> Admin 可以邀请新的 Admin，将其他 Admin 降级为 Viewer，并移除其他 Admin。请仅将 Admin 角色授予您信任能够管理整个机队的人员。Owner 是 Admin 唯一无法更改的成员。

> **Viewer 可以看到的内容**
>
> Viewer 看到的页面与其他角色相同，但没有控制功能。UAV 控制面板会向 Viewer 显示实时状态和日志，但不显示飞行模式、任务或解锁按钮，也没有 Terminal 标签页。在 **Network** 页面上，Viewer 无法看到 VPN 认证密钥：*Only Owners and Admins can see the VPN auth key.* 此外，Fleet Manager 会在服务器端检查每条命令，因此 Viewer 无法通过其他方式发送命令。

## 为企业机队选择角色

| 人员 | 建议角色 |
| --- | --- |
| 机队或运营经理 | Owner（仅一人） |
| 飞手、技术人员、负责配对新机身的人员 | Admin |
| 跟踪任务进展的客户、管理层、审计人员 | Viewer |
| 需要驾驶您无人机的承包商 | Admin，任务结束后移除 |

## 并非角色：超级管理员

UAVmatrix 工作人员拥有一种跨所有组织的独立支持角色。该角色用于处理支持任务，例如[为账户添加额外的许可证电子邮件](https://docs.uavmatrix.com/zh-cn/fleet-manager/licenses/#licenses-bought-with-another-email)。它不属于您的组织，也无法被分配。

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/team/roles-and-permissions/
