# 通过 4G 超视距飞行

> 使用 UAVcast-Pro、蜂窝调制解调器和 Fleet Manager VPN 通过 4G/LTE 飞行无人机，并在 QGroundControl 或 Mission Planner 中查看遥测和实时视频。

本指南将带您从台架调试一直到通过蜂窝网络完成飞行：在 QGroundControl 或 Mission Planner 中查看遥测和实时视频，前提是两端都有网络覆盖。本指南使用 [Fleet Manager](https://docs.uavmatrix.com/zh-cn/fleet-manager/) 附带的 VPN，该 VPN 包含在您的 UAVcast-Pro 许可证中，因此双方都无需公网 IP 或端口转发。

**所需时间：** 约一小时。 **所需物品：**

- 一台伴随计算机（Raspberry Pi 4 或 5，或其他[受支持的主板](https://docs.uavmatrix.com/zh-cn/reference/supported-hardware/)），已[安装](https://docs.uavmatrix.com/zh-cn/get-started/installation/) UAVcast-Pro 并[激活许可证](https://docs.uavmatrix.com/zh-cn/get-started/license-activation/)。
- 一个 MAVLink 飞行控制器（ArduPilot 或 PX4），以及 USB 数据线或 TELEM 接线。
- 一个 USB 4G/LTE 调制解调器和一张数据 SIM 卡。请先在手机上禁用 SIM PIN，可省去不少麻烦。
- 摄像头（如需视频）。
- 一台安装了 QGroundControl 或 Mission Planner 的笔记本电脑，以及 [Tailscale 客户端](https://tailscale.com/download)。
- 一个您担任 Owner 或 Admin 的 [Fleet Manager 组织](https://docs.uavmatrix.com/zh-cn/fleet-manager/set-up-organization/)。

> **超视距飞行规则**
>
> 在大多数国家，超视距（BVLOS）飞行需要获得授权。UAVcast-Pro 提供通信链路；运行审批、风险评估和故障保护措施由您自行负责。

## 整体架构

```text
Flight controller ──USB/UART── UAVcast-Pro ──4G──► internet ──► laptop
                                    │                               │
                                    └──── Fleet Manager VPN ────────┘
                  telemetry and video on the ports of the stream binding
```

无人机将 MAVLink 和 H.264 视频发送到笔记本电脑的 VPN 地址。VPN 使笔记本电脑能够通过 4G 访问无人机，就像两者位于同一个本地网络中一样。

> **想要运行自己的 VPN？**
>
> 您可以使用自己的 ZeroTier 网络或 Tailscale tailnet 代替 Fleet Manager：请参阅 [VPN](https://docs.uavmatrix.com/zh-cn/uavcast-pro/connectivity/vpn/) 和 [通过 Tailscale 远程访问](https://docs.uavmatrix.com/zh-cn/guides/remote-access-tailscale/)。下面的第 1、2 步以及第 7 至 9 步保持不变。

## 1. 连接飞行控制器

1. 通过 USB 将飞行控制器连接到伴随计算机，或接线到 TELEM 端口（TX→RX、RX→TX、GND→GND），并在该端口上启用 MAVLink（ArduPilot 上为 `SERIALx_PROTOCOL = 2`，PX4 上为 `MAV_x_CONFIG`）。
2. 在 UAVcast-Pro 中打开 **飞行控制器 → 连接**。在 **Link type** 下选择 **USB** 或 **UART / 串口**，并将 **端口** 和 **波特率** 保持为 **自动**。
3. 等待状态显示 **已连接**，并在 **飞行器** 中出现一架飞行器。如果状态一直停留在 **无心跳**，请参阅 [无 MAVLink 心跳](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-mavlink-heartbeat/)。

## 2. 设置调制解调器

1. 插入调制解调器并打开 **调制解调器**。
2. 将 **启用蜂窝调制解调器？** 设为 **是**，并选择 **调制解调器类型**：对于作为 USB 网络适配器工作的调制解调器（例如 Huawei E3372h），选择 **HiLink**；其他调制解调器选择 **Traditional (PPP)**。
3. 对于 Traditional 调制解调器，将 **接入点名称（可选）** 留空。UAVcast-Pro 会为您的 SIM 卡查找接入点并记住它。
4. 在 **调制解调器信息** 下，等待运营商和 IPv4 地址出现。
5. 前往 **网络**，选择 **调制解调器优先（户外模式）**，这样即使附近有 Wi-Fi，流量也会通过调制解调器发出。

详细信息请参阅 [蜂窝调制解调器](https://docs.uavmatrix.com/zh-cn/uavcast-pro/connectivity/cellular-modem/)。如果调制解调器已连接但无法加载内容，请参阅 [调制解调器已连接，但无法访问互联网](https://docs.uavmatrix.com/zh-cn/troubleshooting/modem-no-internet/)。

## 3. 在 Fleet Manager 中启用 VPN

在 Fleet Manager 中打开 **Network**。如果显示 **Enable VPN Network**，请选择它。这将创建您组织的专用网络。请参阅 [网络与 VPN](https://docs.uavmatrix.com/zh-cn/fleet-manager/network/)。

## 4. 配对无人机并将其接入 VPN

1. 在 UAVcast-Pro 中，前往 **管理 → Fleet Management**，然后选择 **Connect to Fleet Manager**。记下 8 位配对码。
2. 在 Fleet Manager 中，前往 **Fleet → Pair Device**，输入配对码并确认设备。
3. 在 **VPN Connection** 步骤中，保持 **Enable VPN for this UAV** 勾选，然后选择 **Complete Pairing**。
4. 无人机会出现在 **Network → Connected Devices** 下，类型为 **UAV**，并带有 `100.x.y.z` 地址。

完整操作步骤请参阅 [将您的第一架无人机添加到 Fleet Manager](https://docs.uavmatrix.com/zh-cn/fleet-manager/pair-uav/)。

## 5. 将笔记本电脑接入 VPN

1. 在笔记本电脑上安装 Tailscale。您无需 Tailscale 账户：Fleet Manager 运行自己的 VPN 服务器。
2. 在 Fleet Manager 中，前往 **Network → Devices**，在 **Connect a Device** 下复制 **GCS Connection Command**，然后以管理员身份在笔记本电脑上运行（macOS 和 Linux 上使用 `sudo`）。
3. 笔记本电脑会出现在 **Connected Devices** 中。在 **Type** 列中选择 **Configure**，选择 **Ground Control Station (GCS)**，然后选择 **Complete Setup**。
4. 测试：在笔记本电脑上执行 `ping <drone VPN IP>`。随后即可在浏览器中打开 `http://<drone VPN IP>/`，访问无人机的 Web 界面。

详细信息和截图请参阅 [连接地面控制站](https://docs.uavmatrix.com/zh-cn/fleet-manager/connect-gcs/)。

## 6. 将遥测和视频发送到笔记本电脑

1. 在 Fleet Manager 中，前往 **Network → Stream Bindings**，然后选择 **Add Binding**。
2. 选择无人机和笔记本电脑，然后选择 **Create Binding**。Fleet Manager 会将目标地址发送给无人机；该地址会出现在无人机的 **地面控制站** 页面中，并带有云图标。
3. 在 **Ports** 列中查看绑定的视频和遥测端口。对于笔记本电脑上的第一架无人机，默认端口为 `5600` 和 `14550`。
4. 在笔记本电脑上，于防火墙中允许这些端口的入站 UDP（命令参见 [无视频，检查 3](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-video-in-gcs/#check-3)）。

## 7. 启动摄像头

1. 打开 **摄像头 → 摄像头设置**，将 **启用摄像头？** 设为 **是**，然后在 **选择摄像头** 中选择摄像头。
2. 对于 LTE，建议从 **分辨率** 1280×720、**选择帧率** 15–20 以及 **码率：** 约 1000–1500 kbps 开始。
3. 设置会随您的更改自动保存。如果摄像头尚未运行，请按 **启动**。

## 8. 打开地面控制站

- **QGroundControl** 会自动连接到 UDP 14550。如需视频，请在视频设置中，将 **Source** 设为 **UDP h.264 Video Stream**，并使用绑定的视频端口。
- **Mission Planner**：选择 **UDP**，点击 **Connect**，然后输入绑定的遥测端口。如需视频，请按 [Mission Planner](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/mission-planner/) 页面中的说明设置 GStreamer 源。

## 9. 起飞前在 4G 网络下测试

1. 关闭伴随计算机的 Wi-Fi，或将无人机带离其 Wi-Fi 覆盖范围，使唯一的通信路径为调制解调器。
2. 检查仪表盘：**蜂窝网络** 已连接，**VPN** 已连接，**地面站** 为 *发送中*，**视频** 为 *运行中*。
3. 在地面上观察链路 10 分钟，最好在起飞场地进行。注意视频卡顿和遥测中断。
4. 在 **飞行控制器 → 连接** 中，检查 **地面站故障保护信息**。如果显示 **警告 - 故障保护已禁用**，请在飞行控制器上启用地面站故障保护（ArduPilot：Plane 上为 `FS_GCS_ENABL`，Copter 上为 `FS_GCS_ENABLE`；PX4：`NAV_DLL_ACT`），并选择其动作，以便链路断开时无人机能够自动响应。

> **记录每次飞行**
>
> 在 **摄像头 → 录制 → 设置** 下开启 **解锁时自动录制**。您将获得每次飞行的视频和遥测日志，供之后复盘：[录制飞行并进行复盘](https://docs.uavmatrix.com/zh-cn/guides/recording-flight-review/)。

> **UAVnet 即将停用**
>
> UAVnet 是 UAVmatrix 的托管 ZeroTier 控制器，即将停止服务，并由 Fleet Manager 取代。如果您的无人机目前使用 UAVnet 网络，请按上文所述将其迁移到 Fleet Manager VPN。

## 后续步骤

- [通过多个地面控制站进行传输](https://docs.uavmatrix.com/zh-cn/guides/multiple-ground-stations/)
- [从 NTRIP caster 添加 RTK 校正数据](https://docs.uavmatrix.com/zh-cn/guides/rtk-ntrip-caster/)
- 需要管理多架无人机？[使用 Fleet Manager 批量接入机队](https://docs.uavmatrix.com/zh-cn/guides/fleet-onboarding/)

Source: https://docs.uavmatrix.com/zh-cn/guides/bvlos-4g/
