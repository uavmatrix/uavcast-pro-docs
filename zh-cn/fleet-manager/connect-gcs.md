# 连接地面控制站

> 使用一条 Tailscale 命令，将 QGroundControl 或 Mission Planner 笔记本电脑加入组织的 VPN，开始接收无人机的视频和遥测数据。

地面控制站（GCS）是飞手运行 QGroundControl、Mission Planner 或类似软件的笔记本电脑或台式机。要通过 Fleet Manager 接收无人机的视频和遥测数据，地面控制站需要加入组织的私有 VPN。之后，您可以通过[流绑定](https://docs.uavmatrix.com/zh-cn/fleet-manager/network/stream-bindings/)决定哪些无人机向它传输数据。

每台地面控制站大约需要五分钟即可完成设置。

## 开始之前

- **Owner 或 Admin 角色。** Viewer 可以查看 **Network** 页面，但无法查看认证密钥或连接命令，也无法启用 VPN 或配置设备。他们会看到 *Ask an Owner or Admin of this organization to connect a new device to the VPN.*
- **已为组织启用 VPN。** 如果 **Network** 显示 **Enable VPN Network**，请先选择它。参见 [Network 与 VPN](https://docs.uavmatrix.com/zh-cn/fleet-manager/network/)。
- **地面控制站计算机的管理员权限**，用于安装 Tailscale 并运行一条命令。
- 至少有一架无人机已[配对](https://docs.uavmatrix.com/zh-cn/fleet-manager/pair-uav/)并加入 VPN。

> **Fleet Manager 运行自己的 VPN 服务器**
>
> 组织网络使用的是 Tailscale 客户端，但控制服务器是 Fleet Manager 自己的，而不是 tailscale.com 账户。您无需注册 Tailscale。如果该计算机已连接到其他 Tailscale 网络，下面的命令会将其切换到您组织的网络。

## 将地面控制站加入 VPN

1. 从 [tailscale.com/download](https://tailscale.com/download) 在地面控制站上**安装 Tailscale**（支持 Windows、macOS 或 Linux）。

2. **复制连接命令。** 在 Fleet Manager 中打开 **Network**，停留在 **Devices** 标签页，找到 **Connect a Device**。在 **GCS Connection Command** 下复制命令。它看起来像这样：

   ```bash
   tailscale up --authkey=<your-org-key> --login-server=https://vpn-connect.uavmatrix.com
   ```

   ![Connect a Device 卡片，包含 GCS Computer Only 警告和 tailscale up 命令](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/network--connect-device.webp)

   *Network → Devices → Connect a Device，显示 GCS Computer Only 警告以及命令旁边的复制按钮（认证密钥已模糊处理）。*

   > **仅适用于地面控制站**
   >
   > 请勿将此命令粘贴到 UAVcast-Pro 中，也不要在无人机上运行。无人机会在配对期间或通过同一页面上的 **Push to Drone** 加入 VPN。

3. **以管理员身份运行命令。**

   - Windows：打开 **Terminal** 或 **PowerShell**，选择 **Run as administrator**，然后粘贴命令。
   - macOS 和 Linux：在终端中粘贴命令，并在前面加上 `sudo`。

   命令返回且没有错误时，说明计算机已加入网络。`tailscale status` 会列出它能看到的无人机和其他设备。

4. **在 Connected Devices 中找到计算机。** 返回 Fleet Manager，计算机会出现在 **Connected Devices** 中，并显示其主机名和 `100.x.y.z` 地址。如果几秒内没有显示，请选择 **Sync**。新设备的类型为 **Unknown**，横幅会提示有多少台设备需要配置。

5. **将其标记为地面控制站。** 在 **Type** 列中选择 **Configure**。选择 **Ground Control Station (GCS)**，选择 **Continue**，然后选择 **Complete Setup**。

   ![设备设置向导，询问 这是什么类型的设备，并已选择 Ground Control Station](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/network--setup-wizard.webp)

   *Configure 对话框：这是什么类型的设备？已为名为 ops-laptop-03 的笔记本电脑选择 Ground Control Station (GCS)。*

计算机现在带有 **GCS** 徽章，并会出现在添加流绑定时的 **Ground Station** 列表中。

> **以人员或岗位命名地面站**
>
> 在设备的操作菜单（**⋯** 按钮）中使用 **Rename**，为其设置类似 "Field laptop – Team North" 的名称。在大型机队中，绑定列表会更容易阅读。

## 开始接收无人机数据

1. 前往 **Network → Stream Bindings**，选择 **Add Binding**。

2. 选择 **Drone** 和 **Ground Station**，然后选择 **Create Binding**。无人机必须处于在线状态。

3. 查看 **Ports** 列中的端口，例如 `5600 / 14550`。

4. 在地面控制软件中监听这些端口：

   - **QGroundControl：** 14550 UDP 上的遥测会自动连接。对于视频，打开 **Application Settings → Video**（旧版本中位于 **General** 下），将 **Source** 设置为 **UDP h.264 Video Stream**，并将 UDP 端口设置为绑定的视频端口（当前版本中为 **UDP URL** `0.0.0.0:<port>`）。如需接收更多无人机的数据，请在 **Application Settings → Comm Links** 中为每个绑定的遥测端口添加一个 UDP 链路。
   - **Mission Planner：** 在连接下拉列表中选择 **UDP**，选择 **Connect**，然后输入遥测端口。

更多详细信息（包括一台地面站接收多架无人机）请参见[流绑定](https://docs.uavmatrix.com/zh-cn/fleet-manager/network/stream-bindings/)和[将流传输到多台地面站](https://docs.uavmatrix.com/zh-cn/guides/multiple-ground-stations/)。

## 认证密钥

命令中包含一个可重复使用的组织网络密钥。该密钥有效期为 90 天，可用于任意数量的地面控制站。Owner 和 Admin 可以选择 **Connect a Device** 中的刷新按钮来创建新密钥。已加入的地面控制站会保持连接。如果卡片显示 **No valid auth key available. Generate a new key to connect devices.**，说明密钥已过期，请创建新密钥。

## 移除地面控制站

在 **Network → Devices** 中，打开设备的操作菜单并选择 **Remove Device**。这会将其从 VPN 中移除，并删除其流绑定。如需稍后重新连接，请再次运行连接命令。

## 故障排除

- **命令失败或超时：** 请检查计算机能否访问 `https://vpn-connect.uavmatrix.com`，并确认密钥未过期。
- **地面控制站已连接，但没有遥测或视频：** 请检查是否存在绑定，**Video** 和 **Telemetry** 是否已开启，以及地面控制软件是否在监听绑定的端口。新应用的入站 UDP 流量常被 Windows 防火墙阻止。参见[地面控制站无遥测数据](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-telemetry-in-gcs/)和[地面控制站无视频](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-video-in-gcs/)。
- **无法通过 VPN 访问无人机：** 参见 [VPN 已连接但无法访问无人机](https://docs.uavmatrix.com/zh-cn/troubleshooting/vpn-cant-reach-drone/)。

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/connect-gcs/
