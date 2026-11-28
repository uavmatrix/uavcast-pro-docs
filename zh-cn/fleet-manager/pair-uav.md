# 添加第一台无人机

> 使用 8 位配对码将运行 UAVcast-Pro 的无人机与您的 Fleet Manager 组织配对，选择 VPN 访问方式，并在机队地图上实时查看该无人机。

配对会将一台运行 UAVcast-Pro 的无人机关联到您的组织。配对完成后，无人机会与 Fleet Manager 保持基于证书认证的连接，并在重启或网络变更后自动重新连接。每台无人机只需配对一次，大约需要两分钟。

您需要同时使用两个浏览器标签页：无人机的 UAVcast-Pro 网页界面和 Fleet Manager。请保持两者都处于打开状态。

## 开始之前

- **已安装 UAVcast-Pro 并激活许可证。** 如果没有有效许可证，UAVcast-Pro 将拒绝开始配对，并显示 **未找到有效许可证，请先激活许可证。** 请参阅[激活许可证](https://docs.uavmatrix.com/zh-cn/get-started/license-activation/)。
- **许可证由您组织的成员持有。** Fleet Manager 会将 UAVmatrix 商店中许可证持有人的电子邮件与组织成员的电子邮件进行比对。请参阅[许可证](https://docs.uavmatrix.com/zh-cn/fleet-manager/licenses/)。
- **组织中的 Owner 或 Admin 角色。** Viewer 看不到 **Pair Device**。请参阅[角色与权限](https://docs.uavmatrix.com/zh-cn/fleet-manager/team/roles-and-permissions/)。
- **无人机可访问互联网**，可通过以太网、Wi-Fi 或蜂窝调制解调器连接，并开放出站 HTTPS（TCP 443）以及 TCP **8883**。端口 8883 承载着与 Fleet Manager 之间的加密 MQTT 连接。
- **较新的 UAVcast-Pro 6 版本。** 配对从无人机 UAVcast-Pro 中的 **管理 → Fleet Management** 开始。在 Fleet Manager 中进行解锁、上锁和飞行前校准需要 UAVcast-Pro 6.3.0_rc13 或更高版本；对于旧版无人机，Fleet Manager 会以版本标记进行提示。

## 配对无人机

1. **在 UAVcast-Pro 中获取配对码。** 打开无人机的网页界面。在侧边栏的 **管理** 下选择 **Fleet Management**，然后选择 **Connect to Fleet Manager**。UAVcast-Pro 会显示 8 位 **Pairing Code**、**Expires in** 倒计时以及 **Waiting for Manager to confirm pairing...**。

   ![UAVcast-Pro 中带有 Connect to Fleet Manager 按钮的 Connect to Fleet Manager 卡片](https://docs.uavmatrix.com/zh-cn/img/screenshots/uavcast-pro/fleet--connect.webp)

   *配对前的 UAVcast-Pro → Fleet Management 页面。选择 Connect to Fleet Manager 后，将显示 8 位配对码、Expires in 倒计时以及 Waiting for Manager to confirm pairing...*

   > **配对码有效期为 5 分钟**
   >
   > 如果在您输入之前倒计时已结束，请再次选择 **Connect to Fleet Manager**。请务必输入当前屏幕上显示的配对码：UAVcast-Pro 只等待其最新生成的配对码。

2. **在 Fleet Manager 中打开 Pair Device。** 前往 **Fleet**，然后选择 **Pair Device**。**Pair UAV** 向导随即打开。

3. **选择组织。** 在 **Organization** 步骤中，选择该无人机应归属的组织，然后选择 **Continue**。列表中仅显示您担任 Owner 或 Admin 的组织。如果您只有一个组织，Fleet Manager 会自动选中该组织并跳过此步骤。

4. **输入配对码。** 在 **Pairing Code** 步骤中，输入 8 位数字，然后选择 **Continue**。Fleet Manager 会查询该配对码并进入 **Confirm Device** 步骤。

   ![Pair UAV 向导的 Pairing Code 步骤，已输入 8 位配对码](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/pair-device--code.webp)

   *Fleet → Pair Device 的 Pairing Code 步骤，进度条显示 Organization 已完成。*

5. **确认设备。** 核对 UAVcast-Pro 发送的详细信息：**Name**、**Hostname**、**OS**、**Architecture** 和 **UAVcast Version**。确保这些信息与您面前的无人机一致，然后选择 **Complete Pairing**。如果您的组织已启用 VPN，按钮将显示 **Continue**，下一步为 VPN 设置。

   ![Confirm Device 步骤，列出名称、主机名、操作系统、架构和 UAVcast 版本](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/pair-device--confirm.webp)

   *Confirm Device 步骤：请核对名称、主机名、OS、架构和 UAVcast Version 是否与您面前的无人机一致。*

6. **选择 VPN 访问（仅在启用 VPN 时）。** 当组织[已启用 VPN](https://docs.uavmatrix.com/zh-cn/fleet-manager/network/)时，会出现 **VPN Connection** 步骤。启用 VPN 后，组织网络中的地面站可以直接通过 4G、Wi-Fi 或卫星接收该无人机的视频和遥测数据，无需端口转发。

   - **Enable VPN for this UAV** 默认勾选。UAVcast-Pro 会在配对完成后立即加入您组织的 VPN。
   - 如果该无人机已位于 Tailscale 网络中，Fleet Manager 会显示 **Existing VPN Connection Detected** 以及该网络的服务器和 IP。该提示框将变为 **Replace existing VPN with Fleet Manager network**，且默认未勾选。仅当您希望无人机退出当前网络时才勾选。

   选择 **Complete Pairing**。

   ![VPN Connection 步骤，已勾选 Enable VPN for this UAV 复选框](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/pair-device--vpn.webp)

   *VPN Connection 步骤，列出三项优势，并已勾选 Enable VPN for this UAV。*

   > **替换 VPN 可能会断开 SSH 会话**
   >
   > 如果您替换现有的 Tailscale 连接，而当前通过该连接访问无人机的 SSH 或浏览器会话会随之断开。请在继续操作前通过本地网络连接无人机，或之后使用其新的 VPN 地址。

7. **为无人机命名。** 随后会出现 **Pairing Complete!** 页面及 **UAV Name** 字段。输入团队成员在地图上能够识别的名称，例如机身尾号或 "Survey-14"，然后选择 **Save**。无人机上线后，名称会同步到 UAVcast-Pro。选择 **View UAV** 可打开其页面。

   ![Pairing Complete 页面，包含 UAV Name 字段和 View UAV 按钮](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/pair-device--complete.webp)

   *Pairing Complete! 页面，UAV Name 字段已修改为机身尾号。*

与此同时，UAVcast-Pro 每 5 秒检查一次，会接收无人机的证书和连接设置（如果您选择了 VPN，还会接收 VPN 密钥）。其 Fleet Management 页面随即切换为 **Connected**。

## 检查连接

无人机会在几秒钟内出现在 **Fleet** 和 **Fleet Map** 中。其状态标识含义如下：

| 标识 | 含义 |
| --- | --- |
| **PAIRING** | Fleet Manager 已签发证书，正在等待无人机的首次心跳。 |
| **ONLINE** | 无人机已连接。UAVcast-Pro 每 5 秒发送一次心跳。 |
| **OFFLINE** | 超过 20 秒未收到任何数据。卡片会显示无人机最后一次被检测到的时间。 |

如果标识一直停留在 **PAIRING** 或变为 **OFFLINE**，请在无人机上检查其能否连接到 Fleet Manager 的 8883 端口：

```bash
nc -vz fleet-manager.uavmatrix.com 8883
```

输出以 `succeeded!` 结尾表示端口已开放。出现其他结果则说明防火墙或运营商阻止了该端口。请参阅 [Fleet Manager 中无人机离线](https://docs.uavmatrix.com/zh-cn/troubleshooting/drone-offline-fleet-manager/)。

## 向地面站发送视频和遥测数据

配对本身不会启动任何数据流。要使用 QGroundControl 或 Mission Planner 飞行，请先将[地面站连接](https://docs.uavmatrix.com/zh-cn/fleet-manager/connect-gcs/)到 VPN，并添加[流绑定](https://docs.uavmatrix.com/zh-cn/fleet-manager/network/stream-bindings/)。Fleet Manager 会为每个绑定分配独立的端口组（包括视频、为摄像头 2 和音频预留的端口，以及遥测端口），因此多台无人机可以同时向同一个地面站传输数据。第一台无人机使用默认端口 5600 和 14550；其他无人机的端口请在绑定的 **Ports** 列中查看。

## 配对失败时

| 提示信息 | 原因与解决方法 |
| --- | --- |
| **Invalid pairing code** | 配对码不存在。请检查数字是否正确，或在 UAVcast-Pro 中获取新的配对码。 |
| **This pairing code has expired** | 已超过 5 分钟。请在 UAVcast-Pro 中再次选择 **Connect to Fleet Manager**。 |
| **This pairing code has already been used** | 该配对码已被认领，可能是您或同事使用的。重新配对前，请先在 **Fleet** 中检查该无人机。 |
| **License is not owned by any member of this organization** | 无人机上的许可证属于某个非成员的电子邮件账户。请邀请该人员加入，或联系支持人员将该邮箱添加到您的账户中。请参阅[许可证](https://docs.uavmatrix.com/zh-cn/fleet-manager/licenses/#licenses-bought-with-another-email)。 |
| **License has expired** / **License has been refunded** | 无人机上的许可证已不再有效。请续费，或在 UAVcast-Pro 中激活其他许可证。 |
| **This UAV is already paired to an organization** | 该无人机属于其他组织，必须先在该组织中将其移除。请参阅[移除或转让无人机](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remove-or-transfer/)。 |
| **Too many attempts. Please wait a minute and try again.** | 一分钟内配对码检查次数超过 10 次，或配对尝试次数超过 5 次。请等待一分钟后重试。 |

更多原因和检查方法：[配对码无效或已过期](https://docs.uavmatrix.com/zh-cn/troubleshooting/pairing-code-invalid/)。

## 重新配对同一台无人机

将同一台无人机重新配对到**同一个**组织时，会保留其名称、遥测历史和流绑定，并仅更新其证书。在 UAVcast-Pro 中选择 **Disconnect from Fleet** 之后，或当 Fleet Manager 显示 **Re-pair required** 时，需要执行此操作。请参阅[重新配对无人机](https://docs.uavmatrix.com/zh-cn/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone)。

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/pair-uav/
