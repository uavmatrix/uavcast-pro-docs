# 快速入门

> 将 MAVLink 飞控连接到 UAVcast-Pro，先在局域网内、再通过 4G/LTE，在 Mission Planner 或 QGroundControl 中获取遥测和实时视频。

本指南介绍如何让已安装 UAVcast-Pro 的无人机在 Mission Planner 或 QGroundControl 中获取实时遥测和视频。我们先在本地网络中完成设置（出错的可能性较少），然后再切换到 4G/LTE。本地部分约需 10 分钟。

## 开始之前

- 已安装 UAVcast-Pro 并已重启设备。参见[安装](https://docs.uavmatrix.com/zh-cn/get-started/installation/)。
- 许可证密钥。参见[许可证与激活](https://docs.uavmatrix.com/zh-cn/get-started/license-activation/)。
- 飞控已通过 USB 或 TELEM 接口连接到伴随计算机，并已通电。
- 已连接摄像头（可选）。
- 一台与无人机处于**同一网络**中的笔记本电脑，运行 Mission Planner 或 QGroundControl。记下笔记本电脑的 IP 地址（Windows 上使用 `ipconfig`，Linux 上使用 `ip a`，macOS 上使用**系统设置 → 网络**）。

## 1. 激活许可证

> 激活无人机需要 UAVcast-Pro 许可证。请在 UAVmatrix 商店购买。
>
> [购买 UAVcast-Pro](https://uavmatrix.com/zh/checkout) · [查看套餐和价格](https://uavmatrix.com/zh/products)

1. 在浏览器中打开 `http://<drone-ip>`，您将进入**应用程序**页面。
2. 将密钥粘贴到**输入许可证密钥**中，然后选择**验证**。

侧边栏随即解锁。现在进入**用户**，选择**添加用户**并创建管理员账户，以免网络中的任何人都能打开网页界面。

## 2. 连接飞行控制器

1. 进入**飞行控制器 → 连接**。
2. 在 **Link type** 下，根据接线选择 **USB** 或 **UART / Serial**。
3. 将**端口**和**波特率**保持为**自动**。
4. 如果状态面板显示**链路已停止**，请选择**连接**。
5. 等待状态变为**已连接**。**Mavlink信息**会显示飞行器类型、飞行模式、GPS 和电池信息，顶部栏会显示 **FC 已连接**。

![飞行控制器连接页面，显示通过 USB 已连接、连接检查中四个步骤均已通过，以及 MAVLink 检查器](https://docs.uavmatrix.com/zh-cn/img/screenshots/uavcast-pro/flight-controller.webp)

*飞行控制器 → 连接，USB 链路正常。*

如果停留在**等待设备**、**正在检测波特率**或**无心跳**状态，请选择**自动检测**并查看**连接检查**面板：它会指出第一个出现的问题。更多内容参见[飞行控制器](https://docs.uavmatrix.com/zh-cn/uavcast-pro/flight-controller/)。

## 3. 将遥测和视频发送到笔记本电脑

1. 进入**地面控制站**。已有一个空的目标地址卡片。
2. 输入**名称**，例如 `Laptop`。
3. 在**目标IP或主机**中输入笔记本电脑的 IPv4 地址，例如 `192.168.1.20`，然后按 Enter。出现绿色对勾表示已保存。
4. 将**遥测端口**保持为 `14550`，**视频端口**保持为 `5600`。
5. 打开**启用遥测**开关。
6. 如果有摄像头，请打开**启用视频**开关。

字段在离开时自动保存，没有保存按钮。

## 4. 启动摄像头

如果没有摄像头，可跳过此步骤。

1. 进入**摄像头 → 摄像头设置**。
2. 将**启用摄像头？**设为**是**。
3. 点击 **CAM 1** 插槽，并选择摄像头，例如 *Raspberry Pi Camera - imx708 (CSI)*，或 USB 网络摄像头。
4. 在**摄像头设置**下选择**分辨率**。建议从 `1280x720` 或摄像头支持的最接近尺寸开始。
5. 将**帧率**保持为**自动**，并将**比特率**保持为 `0`（自动）。
6. 在**流设置**下勾选**启用实时预览？**，然后选择**启动**。**实时预览**将显示画面。

## 5. 打开地面站

**QGroundControl**

QGroundControl 默认监听 UDP 14550，因此无人机会在几秒钟内自动出现。

如需视频：点击 **Q** 图标 → **Application Settings** → **Video**（在较旧的版本中，为 **General** 下的 **Video** 部分）。将 **Source** 设为 **UDP h.264 Video Stream**，并保持默认 UDP 端口 `5600`。视频将显示在 Fly 视图中。

**Mission Planner**

在右上角选择 **UDP**，选择 **Connect**，并接受端口 `14550`。

![Mission Planner 飞行数据视图通过 UDP 连接：右上角连接框显示 UDP、链路 UDP14550-1-QUADRO 和 DISCONNECT 按钮；HUD 显示 DISARMED、Unhealthy AHRS 和 GPS: No Fix](https://docs.uavmatrix.com/zh-cn/img/screenshots/gcs/mission-planner--connected.webp)

*Mission Planner 通过 UDP 14550 连接：右上角的连接框显示链路和 DISCONNECT。台架测试未接 GPS，因此 HUD 显示 Unhealthy AHRS 和 GPS: No Fix。*

如需视频：在 HUD 上右键点击 → **Video** → **Set GStreamer Source**，然后粘贴：

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

包含截图和故障排除的完整教程：[Mission Planner](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/mission-planner/)、[QGroundControl](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/qgroundcontrol/)、[Android](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/android/)，以及 [Windows](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-windows/)、[Linux](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-linux/) 或 [macOS](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-macos/) 上的 GStreamer 安装指南。

> **Windows 防火墙**
>
> 除非应用请求了例外，否则 Windows 会阻止传入的 UDP。如果遥测或视频未能到达，请允许 Mission Planner 或 QGroundControl 通过**专用网络和公用网络**的防火墙，或开放 UDP 14550 和 5600。

现在，局域网中已能获取遥测和视频。仪表盘中的**地面站**一行将显示 *发送中 · … 数据包/秒*。

## 6. 通过 4G/LTE 飞行

通过蜂窝网络连接时，无人机没有笔记本电脑可以访问的地址，因此两者都需要加入同一个 VPN。Fleet Manager VPN 包含在许可证中。

1. 插入调制解调器。在**调制解调器**页面中，将**调制解调器类型**设为 **HiLink** 或 **传统（PPP）**。将**接入点名称**（APN）留空：UAVcast-Pro 会自动查找 APN。参见[蜂窝调制解调器](https://docs.uavmatrix.com/zh-cn/uavcast-pro/connectivity/cellular-modem/)。
2. 登录 [Fleet Manager](https://fleet-manager.uavmatrix.com/)，打开 **Network**，如尚未启用，请选择 **Enable VPN Network**。
3. 配对无人机：在 UAVcast-Pro 中进入**管理 → Fleet Management → Connect to Fleet Manager**，然后在 Fleet Manager 的 **Fleet → Pair Device** 中输入配对码。保持勾选 **Enable VPN for this UAV**。
4. 将笔记本电脑接入 VPN：安装 Tailscale，并运行 Fleet Manager **Network** 页面中的 **GCS Connection Command**，然后将笔记本电脑标记为 **Ground Control Station (GCS)**。
5. 在 **Network → Stream Bindings** 中，添加一条从无人机到笔记本电脑的流绑定。Fleet Manager 会将目标地址发送给无人机，**Ports** 列会显示需要监听的端口。
6. 在**网络**页面中选择**调制解调器优先（户外模式）**，使 Wi-Fi 断开时流量通过调制解调器传输。

完整教程：[通过 4G 进行超视距飞行](https://docs.uavmatrix.com/zh-cn/guides/bvlos-4g/)。如果您已经运行了自己的 Tailscale 或 ZeroTier 网络，也可以改为将无人机和笔记本电脑加入该网络，并使用笔记本电脑的 VPN IP 作为目标地址：参见 [VPN](https://docs.uavmatrix.com/zh-cn/uavcast-pro/connectivity/vpn/)。

> **通过 LTE 飞行前请设置地面站故障保护**
>
> 蜂窝链路可能会断开。请确保飞控已配置地面站故障保护（ArduPilot 上为 `FS_GCS_ENABLE`，PX4 上为 `NAV_DLL_ACT`）。顶部栏会显示**地面站故障保护已启用**或**地面站故障保护已禁用**。

## 后续步骤

- [双摄像头、RC 切换与双路流](https://docs.uavmatrix.com/zh-cn/uavcast-pro/camera/multi-camera/)
- [在无人机上录制每次飞行](https://docs.uavmatrix.com/zh-cn/uavcast-pro/camera/recordings/)
- [通过 4G 使用 NTRIP 获取 RTK 修正](https://docs.uavmatrix.com/zh-cn/uavcast-pro/flight-controller/ntrip-rtk/)
- [将无人机与 Fleet Manager 配对](https://docs.uavmatrix.com/zh-cn/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/zh-cn/get-started/quick-start/
