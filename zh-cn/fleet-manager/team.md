# 邀请团队成员

> 通过电子邮件邀请飞手、操作人员和客户加入您的 Fleet Manager 组织，更改角色、撤销邀请并转让所有权。

每位成员都使用自己的 UAVmatrix 账户登录，并在您的组织中拥有一个角色：**Admin** 或 **Viewer**（有且仅有一位 **Owner**）。Fleet Manager 对成员数量没有限制，成员也不占用许可证。请参阅[角色与权限](https://docs.uavmatrix.com/zh-cn/fleet-manager/team/roles-and-permissions/)，了解每个角色的具体权限。

所有操作均在 **Team** 页面（页面标题为 **Team Management**）中进行。Owner 和 Admin 可以管理成员。Viewer 只能查看成员列表。

![Team Management 页面，列出组织的成员、角色及待处理邀请](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/team.webp)

*运营方的 Team Management 页面，共 13 名成员：1 名 Owner、4 名 Admin 和 8 名 Viewer。*

## 邀请成员

1. 在 **Team** 页面中选择 **Invite Member**。
2. 在 **Invite Team Member** 中输入对方的 **Email Address**，如果您管理多个组织，请选择 **Organization**，然后选择 **Role**：**Admin** 或 **Viewer**。
3. 选择 **Send Invitation**。

![Invite Team Member 对话框，包含电子邮件、组织和角色字段](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/team--invite.webp)

*Invite Team Member 对话框，角色设置为 Viewer，适用于客户联系人。*

Fleet Manager 会发送邀请链接。在被接受之前，该邀请会列在 **Pending Invitations** 下，并在 **7 天**后过期。对于已有待处理邀请的电子邮件，您无法再次发送邀请：请先撤销旧邀请。

> **请使用对方购买许可证时的电子邮件进行邀请**
>
> 如果此人持有您要配对的无人机的 UAVcast-Pro 许可证，请使用其在 UAVmatrix 商店中所用的电子邮件进行邀请。Fleet Manager 通过电子邮件将许可证持有人与成员进行匹配。请参阅[许可证](https://docs.uavmatrix.com/zh-cn/fleet-manager/licenses/)。

## 接受邀请

受邀者打开邮件中的链接。邀请页面会显示组织、**Invitation sent to**，以及带有简要说明的 **Your role**。

- 已登录：选择 **Accept Invitation**。
- 未登录：在 **Sign in to accept this invitation** 下选择 **Sign In**。新用户请选择 **Create Account**，这将打开已填入该电子邮件的 UAVmatrix 注册页面，完成后再返回邀请页面。

![邀请页面，包含组织名称、受邀电子邮件、角色说明和 Accept Invitation 按钮](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/invite.webp)

*受邀者看到的邀请页面：Your role 为 Viewer，即仅可查看无人机和机队数据，并提供 Accept Invitation 按钮。*

如果页面显示 **Invitation Expired**、**Invitation Already Used** 或 **Already a Member**，请联系 Owner 或 Admin 重新发送邀请，或直接登录即可。

## 更改成员角色

打开成员旁的菜单，然后选择 **Change Role → Admin** 或 **Viewer**。更改会立即生效；对方可能需要刷新页面才能看到变化。Admin 可以更改其他 Admin 的角色。任何人都无法更改 Owner 的角色：如需更改，请[转让所有权](https://docs.uavmatrix.com/zh-cn/fleet-manager/team/#transfer-ownership)。

![成员操作菜单，包含 Change Role、Transfer Ownership 和 Remove Member](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/team--member-menu.webp)

*Owner 打开的成员菜单，显示 Change Role、Transfer Ownership 和 Remove Member。*

## 移除成员或撤销邀请

- **移除成员：** 打开该成员的菜单并选择 **Remove Member**。对方会立即失去访问权限。Owner 无法被移除。
- **撤销邀请：** 在 **Pending Invitations** 下选择 **Revoke**。邀请链接将失效。

> **没有确认步骤**
>
> **Remove Member** 和 **Transfer Ownership** 在您选择后即刻生效。点击前请先核对姓名。

移除成员不会影响无人机。但如果该成员持有您之后要配对的无人机的许可证，那么在其重新成为成员之前，这些无人机的配对都会失败。

## 转让所有权

只有 Owner 可以执行此操作。打开接替者的菜单，然后选择 **Transfer Ownership**。该成员将成为 **Owner**，而您将成为 **Admin**。

当组织的创建者离开时，或在删除您的 UAVmatrix 账户之前，请使用此功能：Fleet Manager 不会删除仍拥有组织的账户。

## 与客户和合作伙伴协作

用户可以同时属于任意数量的组织，并在每个组织中担任不同的角色。常见的设置方式如下：

- **服务提供商：** 您的员工在您的组织中担任 Admin。每位客户获得 Viewer 角色，以便在地图上实时跟踪其飞行任务。
- **分包商：** 合作伙伴在其组织中以 Admin 身份邀请您的飞手。飞手可以通过组织切换器在两个组织之间切换。

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/team/
