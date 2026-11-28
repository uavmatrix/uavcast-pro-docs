# UAVcast-Pro

> UAVcast-Pro Web 界面参考：仪表盘、飞行控制器、飞行地图、地面控制站、摄像头、调制解调器、VPN、Fleet Manager 配对、用户和设置。

本节按照应用程序侧边栏的顺序，介绍 UAVcast-Pro Web 界面的每一页。每页说明该界面的用途和设置方法，并列出每项设置及其默认值。初次使用 UAVcast-Pro？请从[快速入门](https://docs.uavmatrix.com/zh-cn/get-started/quick-start/)开始。

## 操作

[仪表盘一目了然地查看飞行控制器、GPS、链路、视频和电源的运行状况。](https://docs.uavmatrix.com/zh-cn/uavcast-pro/dashboard/)[数据流为任何 MAVLink 或传感器数值自定义实时仪表盘。](https://docs.uavmatrix.com/zh-cn/uavcast-pro/data-streams/)[飞行控制器通过 USB 或 UART 连接，支持自动检测端口和波特率，并支持 NTRIP/RTK 和注入器。](https://docs.uavmatrix.com/zh-cn/uavcast-pro/flight-controller/)[飞行地图实时地图、座舱 HUD、解锁/上锁、模式、任务、无线电、检查器和日志分析。](https://docs.uavmatrix.com/zh-cn/uavcast-pro/flight-map/)[地面控制站与视频目标地址，以及 Mission Planner、QGroundControl、GStreamer、Android 和 VLC 的分步设置说明。](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/)

## 连接

[调制解调器支持 HiLink 和传统 4G/LTE 调制解调器，自动配置 APN。](https://docs.uavmatrix.com/zh-cn/uavcast-pro/connectivity/cellular-modem/)[虚拟专用网络Fleet Manager VPN，或自有的 Tailscale 或 ZeroTier 网络。](https://docs.uavmatrix.com/zh-cn/uavcast-pro/connectivity/vpn/)[动态DNS让主机名始终指向无人机的公网 IP。](https://docs.uavmatrix.com/zh-cn/uavcast-pro/connectivity/dynamic-dns/)[网络网络接口，以及 Wi-Fi 与调制解调器的优先级。](https://docs.uavmatrix.com/zh-cn/uavcast-pro/connectivity/networks/)

## 媒体

[摄像头设置CSI 和 USB 摄像头、分辨率、码率，以及基于 UDP 的低延迟 H.264。](https://docs.uavmatrix.com/zh-cn/uavcast-pro/camera/)[双摄像头RC 通道切换或双流。](https://docs.uavmatrix.com/zh-cn/uavcast-pro/camera/multi-camera/)[音频预览中的麦克风音频，以及发送到地面站的音频。](https://docs.uavmatrix.com/zh-cn/uavcast-pro/camera/audio/)[录制无人机端的视频和遥测录制，并支持飞行回看。](https://docs.uavmatrix.com/zh-cn/uavcast-pro/camera/recordings/)

## 管理

[Fleet Management将无人机与 UAVmatrix Fleet Manager 配对。](https://docs.uavmatrix.com/zh-cn/uavcast-pro/fleet-pairing/)[用户管理员登录和只读用户。](https://docs.uavmatrix.com/zh-cn/uavcast-pro/users/)[应用程序端口、语言、用于技术支持的日志、数据库备份和恢复。](https://docs.uavmatrix.com/zh-cn/uavcast-pro/application-settings/)

## 端口一览

| 端口 | 方向 | 用途 |
| --- | --- | --- |
| TCP 80 | 浏览器 → 无人机 | Web 界面（可配置）和 HTTP 注入器 |
| UDP 14550 | 无人机 → 地面站 | MAVLink 遥测（每个目标地址可配置） |
| UDP 5600 | 无人机 → 地面站 | 视频，摄像头 1（每个目标地址可配置） |
| UDP 5601 | 无人机 → 地面站 | 视频，双流模式下的摄像头 2（默认为视频端口 + 1） |
| UDP 5602 | 无人机 → 地面站 | 音频（视频端口 + 2） |
| TCP 8889、UDP 8189 | 浏览器 → 无人机 | 实时预览（WebRTC 信令和媒体） |
| TCP 8883 | 无人机 → Fleet Manager | Fleet Manager 连接（基于 TLS 的 MQTT） |
| TCP 2101 | 无人机 → NTRIP 播发服务器 | RTK 改正数（播发服务器的端口） |
| UDP 14600 | 传感器 → 无人机 | UDP 注入器（默认，可配置） |

Source: https://docs.uavmatrix.com/zh-cn/uavcast-pro/
