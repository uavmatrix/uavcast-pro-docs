# QGroundControl

> 在 Windows、macOS 或 Linux 上将 UAVcast-Pro 遥测数据和实时 H.264 视频接入 QGroundControl：UDP 14550 自动连接，视频源为端口 5600 的 UDP h.264，低延迟模式及故障排除。

QGroundControl 默认在 UDP 端口 14550 上监听 MAVLink，因此 UAVcast-Pro 无人机的遥测数据一到达，它就会显示该无人机。视频方面，只需将视频源一次性设置为 **UDP h.264 Video Stream**（端口 5600）。QGroundControl 内置了 GStreamer，因此无需再安装其他软件。该方法在 Windows、macOS 和 Linux 上的操作相同；平板电脑请参阅 [Android](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/android/)。

## 开始之前

- 在无人机上，于[地面控制站](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/)中添加一个目标地址，填写本计算机的 IP 地址（即 4G 网络上的 VPN 地址），并开启 **启用遥测**。如需视频，还需开启 **启用视频**。
- 摄像头已在 **摄像头 → 摄像头设置** 中开启推流。
- 从 [qgroundcontrol.com](https://qgroundcontrol.com/) 获取 QGroundControl。

## 遥测

启动 QGroundControl。收到第一个数据包后几秒内，飞行器即会出现，工具栏显示其飞行模式和电池电量。

![QGroundControl 飞行视图已连接到 ArduPilot 飞行器：工具栏显示 Not Ready 和 Stabilize，地图上有一个五航点任务，飞行器显示 No GPS Lock，左下角的视频窗口显示 WAITING FOR VIDEO](https://docs.uavmatrix.com/zh-cn/img/screenshots/gcs/qgroundcontrol--fly-view.webp)

*遥测正常：工具栏显示飞行器的状态和飞行模式（Not Ready、Stabilize）。这是没有 GPS 的台架测试环境，因此显示 No GPS Lock for Vehicle。在下方完成视频设置之前，视频窗口（左下角）会显示 WAITING FOR VIDEO。*

没有显示？请检查 QGroundControl 的自动 UDP 连接是否开启：点击 **Q** 图标 → **Application Settings**，然后在 **AutoConnect to the following devices** 中勾选 **UDP**（默认已勾选）。根据 QGroundControl 版本不同，自动连接列表可能位于 **Comm Links** 页面或 **General** 页面。如果在无人机上将**遥测端口**设为 14550 以外的值，请改为添加链接：**Application Settings** → **Comm Links** → **Add**，选择 **UDP**，输入所选端口，然后点击 **Connect**。

## 视频

1. 点击 **Q** 图标（左上角）→ **Application Settings**。
2. 打开 **Video** 页面。在较旧的版本中，视频设置是 **General** 页面中的 **Video** 部分。
3. 将 **Source** 设为 **UDP h.264 Video Stream**。
4. 检查 UDP 地址。默认的 `0.0.0.0:5600` 监听端口 5600，与无人机的默认**视频端口**相符。如果在无人机上更改了**视频端口**，请在此处使用该端口。当前版本将该字段称为 **UDP URL**；较旧的版本则显示 **UDP Port** 数字。
5. 返回 **Fly** 视图。视频会出现在角落的小窗口中。点击该窗口即可在视频与地图之间切换。

*QGroundControl 应用程序设置示意图：Video 页面中 Source 设置为 UDP h.264 Video Stream，UDP 地址为 0.0.0.0:5600，并启用了 Low Latency Mode。*

*示意图 QGroundControl 简化示意图。(1) Q 图标 → Application Settings，(2) Video，(3) Source 设为 UDP h.264 Video Stream，(4) UDP URL 端口为 5600。*

### 低延迟模式

在同一视频设置中，开启 **Low Latency Mode**。QGroundControl 会丢弃迟到的帧，而不是缓存它们，在链路良好时可明显减少延迟。在较弱的 4G 链路上，画面可能会卡顿；如出现这种情况，请再次关闭该选项。

## 防火墙

- **Windows**：Windows 询问时，允许 QGroundControl 访问**专用**和**公用**网络。VPN 适配器（ZeroTier、Tailscale）通常会被归类为公用网络。如需手动开放端口，请参阅 [Mission Planner：Windows 防火墙](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/mission-planner/#allow-mission-planner-through-the-windows-firewall)，两者的规则相同。
- **macOS**：macOS 询问时，允许 QGroundControl 接收传入连接。
- **Linux**：如果 `ufw` 处于启用状态，请运行 `sudo ufw allow 14550/udp` 和 `sudo ufw allow 5600:5602/udp`。

## 第二个摄像头和音频

QGroundControl 只播放一路视频流。开启[双流](https://docs.uavmatrix.com/zh-cn/uavcast-pro/camera/multi-camera/)后，摄像头 2 的视频会发送到端口 5601：将 UDP 端口改为 `5601` 即可观看，或在 QGroundControl 旁边打开一个 GStreamer 窗口观看摄像头 2（[Windows](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-windows/)、[Linux](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-linux/)、[macOS](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-macos/)）。

QGroundControl 会忽略音频。请使用 GStreamer 在视频端口 + 2（`5602`）上播放音频。

## 常见问题

| 症状 | 原因和解决方法 |
| --- | --- |
| *Waiting For Vehicle Connection* | 没有遥测数据到达本计算机。请检查目标地址 IP（4G 上的 VPN IP）、**启用遥测**以及防火墙。 |
| 遥测正常，但视频窗口显示无视频 | **启用视频**未开启、摄像头未运行、视频源不是 **UDP h.264 Video Stream**，或 UDP 5600 被阻止。 |
| 视频出现后在 4G 上卡住 | 丢包。请降低无人机上的码率，将**流恢复速率**设为 15–30 帧，并关闭 **Low Latency Mode**。 |
| 飞行器出现两次 | 有两个目标地址指向本计算机，或第二个链接与自动连接重复。请删除其中一个。 |
| 启动 GStreamer 测试时视频停止 | 同一个 UDP 端口只能由一个程序监听。请关闭其中一个程序。 |

更多检查：[QGroundControl 或 Mission Planner 中没有视频](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-video-in-gcs/)。

Source: https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/qgroundcontrol/
