# 支持的硬件

> 与 UAVcast-Pro v6 兼容的主板、操作系统、飞行控制器、摄像头、LTE 调制解调器和 RTK 接收机：Raspberry Pi、Jetson 及其他 arm64 主板，以及 x86 计算机。

UAVcast-Pro v6 可在任何运行 Raspberry Pi OS、Debian 或 Ubuntu 的 64 位 Linux 计算机上运行，支持 **arm64** 或 **amd64** 架构（除 Raspberry Pi 外的 arm64 主板从 UAVcast-Pro 6.5.3 起支持）。下表列出了已检测和经过测试的设备。关于电源、接线和采购建议，请参阅 [硬件要求](https://docs.uavmatrix.com/zh-cn/get-started/hardware-requirements/)。

## 伴随计算机

| 主板 | 架构 | TELEM 串口 | 说明 |
| --- | --- | --- | --- |
| Raspberry Pi 5 | arm64 | GPIO UART（`uart0`） | 视频性能最佳。连续编码需要主动散热。 |
| Raspberry Pi 4 | arm64 | GPIO UART | 推荐的全能之选。 |
| Raspberry Pi 3 | arm64 | GPIO UART | 适合遥测以及中等设置下的一个摄像头。 |
| Raspberry Pi Zero 2 W | arm64 | GPIO UART | 可用，但安装较慢，视频能力有限。适用于一个摄像头、低分辨率。 |
| Raspberry Pi Compute Module | arm64 | 取决于载板 | 安装程序支持已在 v6.3.1 中修复。 |
| NVIDIA Jetson（Nano、Orin Nano、Xavier NX、AGX、TX2） | arm64 | 40 针接口上的 `ttyTHS*` | USB 摄像头。Jetson 的 CSI 摄像头不由摄像头服务器处理，需要手动编写 **自定义处理管道**。 |
| Orange Pi（Zero、Zero 2、3、4、5、Plus） | arm64 | `ttyS*`，取决于型号 | USB 摄像头。可能需要在设备树中启用 UART。 |
| Banana Pi 及其他 arm64 主板 | arm64 | 取决于型号 | USB 摄像头。 |
| x86 迷你主机、Intel NUC、笔记本电脑 | amd64 | USB 转串口适配器 | USB 摄像头。 |

> **非 Raspberry Pi 的 arm64 主板**
>
> Jetson、Orange Pi、Banana Pi 及其他非 Raspberry Pi 的 arm64 主板需要 UAVcast-Pro 6.5.3 或更高版本。旧版安装程序会在这些设备上停止，并显示 *Device is not a Raspberry Pi*。

**仅限 Raspberry Pi：** CSI 摄像头（rpicam/libcamera）需要 Raspberry Pi。在 Pi 上，安装程序会启用 UART 并移除串口控制台；在 Pi 3/4/Zero 2 W 上，还会禁用蓝牙，以释放完整的 UART。

## 操作系统

| 操作系统 | 状态 |
| --- | --- |
| Raspberry Pi OS（64 位） | 在 Raspberry Pi 上推荐使用。CSI 摄像头需要此系统。 |
| Debian（64 位） | 支持。 |
| Ubuntu（64 位），包括用于 Raspberry Pi 的 Ubuntu | 支持。Pi 上的 CSI 摄像头无法在 Ubuntu 上工作，因为 Raspberry Pi 摄像头软件栈未打包提供；USB 摄像头可以使用。 |
| 任何 32 位操作系统 | **不支持。** 安装程序会停止并显示 *No installation candidate*。 |

## 飞行控制器

UAVcast-Pro v6 可通过 USB 或 TELEM 串口与任何 MAVLink 飞行控制器配合使用：包括 ArduPilot（Copter、Plane、Rover、VTOL 及其他飞行器类型）和 PX4，支持 Pixhawk 和 Cube 系列主板，以及 Matek、Holybro、CUAV 等厂商的产品。飞行地图和 Fleet Manager 中的飞行模式名称和模式按钮遵循 ArduPilot；使用 PX4 时，请通过地面站切换模式。

## 摄像头

| 类型 | 示例 | 说明 |
| --- | --- | --- |
| Raspberry Pi CSI | Camera Module 2 和 3、HQ Camera，以及其他 libcamera 传感器（imx219、imx708 …） | Raspberry Pi OS 或 Debian。在带两个接口的主板（Pi 5、Compute Module）上可连接两个 CSI 摄像头。 |
| USB（UVC） | Logitech C920、C615 及大多数 UVC 网络摄像头 | 任何操作系统。 |
| 其他来源 | IP 摄像头、HDMI 采集 | 通过 **自定义处理管道**。 |

最多支持两个摄像头，可切换使用或同时推流。可使用 USB 麦克风或摄像头内置麦克风采集音频。

## LTE / 4G 调制解调器

| 类型 | 工作方式 | 示例 |
| --- | --- | --- |
| **HiLink** | 调制解调器是一台小型路由器，显示为网络适配器（`cdc_ether`、`huawei_cdc_ncm`、`rndis_host` 驱动） | Huawei E3372h、E8372h |
| **传统（PPP）** | 由 ModemManager 管理；UAVcast-Pro 负责连接、选择 APN 并自动重连 | Huawei E3372s、USB 载板上的 Quectel 和 Sierra Wireless 模块 |

传统调制解调器必须受 ModemManager 支持：请参阅 [ModemManager 支持设备列表](https://www.freedesktop.org/wiki/Software/ModemManager/SupportedDevices/)。请选择频段与您的运营商相匹配的型号。

## RTK GPS 接收机

NTRIP 改正数据需要飞行控制器上配备支持 RTK（载波相位）的接收机，例如基于 u-blox ZED-F9P 的模块、CubePilot Here3+ 或 Septentrio Mosaic。M8N、M9N 或 M10 等标准导航模块无法使用 RTK 改正数据。

Source: https://docs.uavmatrix.com/zh-cn/reference/supported-hardware/
