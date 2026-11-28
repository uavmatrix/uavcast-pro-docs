# 设置组织

> 使用您的 UAVmatrix 账户登录 Fleet Manager，创建无人机和团队所属的组织，并可对其进行切换、重命名或删除。

Fleet Manager 中的所有内容都隶属于某个组织：无人机、任务、VPN 网络、流绑定和团队成员。请在配对第一台无人机之前创建组织。

## 登录

Fleet Manager 没有单独的密码。它使用您的 UAVmatrix 账户登录，即您在 [uavmatrix.com](https://uavmatrix.com/) 购买和管理 UAVcast-Pro 许可证时所用的同一账户。

1. 前往 [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/)，然后选择 **Sign In**（或 **Get Started**）。
2. 在跳转到的 UAVmatrix 页面上登录。如果您还没有账户，请在该页面创建。
3. 返回 Fleet Manager 的 **Dashboard**。

> **请使用拥有您许可证的电子邮件登录**
>
> Fleet Manager 只会接受许可证由组织成员持有的无人机（按电子邮件匹配）。使用购买许可证时所用的账户登录，可以避免之后提交支持请求。请参阅[许可证](https://docs.uavmatrix.com/zh-cn/fleet-manager/licenses/)。

个人资料详情（姓名、电子邮件和密码）在您的 UAVmatrix 账户中管理，而非在 Fleet Manager 中管理。**Settings → Profile** 中提供了相关链接。

## 创建组织

1. 打开侧边栏顶部的组织切换器，然后选择 **Create organization**。如果您还没有组织，**Fleet** 和 **Network** 等页面也会显示 **No Organization Yet** 以及 **Create Organization** 按钮。
2. 输入 **Organization Name**（2 至 50 个字符），例如贵公司名称或 "Survey Operations North"。如有需要，可以添加 **Description (optional)**。
3. 选择 **Create**。

![Create Organization 对话框，包含 Organization Name 和 Description 字段](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/onboarding--create-organization.webp)

*Create Organization 对话框，已填写公司名称示例，如 Nordic Aerial Survey AS。*

您将成为该组织的 **Owner**。Fleet Manager 还会在后台为该组织创建一个私有 VPN 网络。在您[启用 VPN](https://docs.uavmatrix.com/zh-cn/fleet-manager/network/) 之前，该网络保持关闭状态。

> **每位用户只能拥有一个组织**
>
> 每位用户只能创建（拥有）一个组织。如果您尝试创建第二个，Fleet Manager 会提示 **You already own an organization**。您仍然可以在任意数量的其他组织中担任 Admin 或 Viewer，例如客户或合作伙伴的组织。

## 切换组织

如果您属于多个组织，侧边栏顶部的切换器会在 **Organizations** 下列出这些组织。您选择的组织决定了 **Fleet**、**Fleet Map**、**Missions**、**Network** 以及仪表盘所显示的内容。Fleet Manager 会在此浏览器中记住您的选择。

![侧边栏组织切换器展开，列出两个组织](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/dashboard--organization-switcher.webp)

*组织切换器展开，列出 Nordwind Aerial Services 和 Nordwind R&D Sandbox。*

## 重命名或删除组织

前往 **Settings → Organizations**。该标签页列出您担任 Owner 或 Admin 的组织。

- **重命名或更改描述：** Owner 或 Admin。编辑 **Name** 或 **Description**，然后选择 **Save Changes**。
- **删除：** 仅 Owner 可操作。选择 **Delete Organization** 并确认。此操作将移除该组织的所有无人机、其遥测历史记录、任务、流绑定和团队成员关系，且无法撤销。

![Settings 的 Organizations 标签页，包含名称、描述和 Delete Organization 按钮](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/settings--organizations.webp)

*Owner 视角下的 Settings → Organizations，包含 Save Changes 和 Delete Organization。*

> **删除组织前请先取消配对无人机**
>
> 删除组织并不会通知无人机。在您于 UAVcast-Pro 中对每台无人机选择 **Disconnect from Fleet** 之前，它们会持续尝试重新连接。请先在各无人机的 UAV 页面中将其移除（参阅[移除或转让无人机](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remove-or-transfer/)），以便 Fleet Manager 为您完成取消配对。

如果要将组织移交给他人，请[转让所有权](https://docs.uavmatrix.com/zh-cn/fleet-manager/team/#transfer-ownership)。

## 后续步骤

- [添加第一台无人机](https://docs.uavmatrix.com/zh-cn/fleet-manager/pair-uav/)
- [邀请团队成员](https://docs.uavmatrix.com/zh-cn/fleet-manager/team/)

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/set-up-organization/
