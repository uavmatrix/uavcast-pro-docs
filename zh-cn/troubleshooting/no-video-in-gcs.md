# QGroundControl 或 Mission Planner 中没有视频

> 遥测正常，但 QGroundControl 或 Mission Planner 中视频一直是黑屏？请检查摄像头、启用视频、目标 IP、UDP 5600 和地面站。

遥测数据已经到达，无人机也已显示在地图上，但视频区域仍然是黑屏，或者 QGroundControl 的视频窗口显示 **WAITING FOR VIDEO**。请按顺序完成以下检查。大多数情况可通过检查 2 或检查 3 解决。

![QGroundControl Fly 视图已连接到 ArduPilot 飞行器：工具栏显示 Not Ready 和 Stabilize，地图上有一条五个航点的任务，并显示 No GPS Lock for Vehicle，左下角的视频窗口显示 WAITING FOR VIDEO](https://docs.uavmatrix.com/zh-cn/img/screenshots/gcs/qgroundcontrol--fly-view.webp)

*QGroundControl 中的症状：遥测数据已到达（工具栏中显示 Not Ready、Stabilize；由于此台架没有 GPS，因此显示 No GPS Lock），但左下角的视频窗口显示 WAITING FOR VIDEO。*

| 您会看到 | 可能原因 | 从此处开始 |
| --- | --- | --- |
| GCS 和 UAVcast-Pro 实时预览中的视频均为黑屏 | 无人机上的摄像头没有运行 | [检查 1](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-video-in-gcs/#check-1) |
| 实时预览正常，但地面站仍为黑屏 | 该地面站未启用视频，或 IP 错误 | [检查 2](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-video-in-gcs/#check-2) |
| 家中 Wi-Fi 下正常，4G 下黑屏 | 目标地址使用的是本地 IP，而不是 VPN IP | [检查 2](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-video-in-gcs/#check-2) |
| 所有设置看起来都正确，但 Windows 上仍然黑屏 | 防火墙阻止了入站 UDP 5600 端口 | [检查 3](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-video-in-gcs/#check-3) |
| QGroundControl 能显示视频，Mission Planner 不能 | Mission Planner 未设置 GStreamer 源 | [检查 4](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-video-in-gcs/#check-4) |

## 检查 1：确认无人机上的摄像头正在推流

如果无人机没有产生视频，任何地面站设置都无济于事。

1. 打开 UAVcast-Pro 网页界面，进入 **摄像头 → 摄像头设置**。
2. 检查 **启用摄像头？** 是否为 **是**，并且 **Select Camera** 中已选择摄像头。
3. 检查摄像头是否正在运行：仪表盘中的 **视频** 行应显示 **Running**。如果已停止，请在摄像头页面点击 **启动**（摄像头运行时，按钮显示为 **重启**）。
4. 启用 **Enable Live Preview?**，并查看 **Live Preview**。如果能看到画面，说明摄像头工作正常，可以继续检查 2。
5. 如果 **Select Camera** 显示 **No cameras available**，请前往 [未检测到摄像头](https://docs.uavmatrix.com/zh-cn/troubleshooting/camera-not-detected/)。

![UAVcast-Pro 摄像头设置页面，CAM 1 已启用，Live Preview 面板显示 No Video Available](https://docs.uavmatrix.com/zh-cn/img/screenshots/uavcast-pro/camera.webp)

*摄像头 → 摄像头设置，CAM 1 已启用。在勾选 Enable Live Preview? 之前，Live Preview 显示 No Video Available。*

> **预览不是地面站的视频流**
>
> 浏览器预览通过内置媒体服务器（WebRTC，端口 8889）传输。地面站接收的是通过 UDP 发送的单独 H.264 视频流。预览正常只能证明摄像头工作正常，并不能证明 UDP 视频流已到达您的笔记本电脑。

如果摄像头页面上的 **Action Logs** 提示摄像头 *does not support* 某个分辨率，请在 **Resolution** 中选择其他值。UAVcast-Pro 会回退到支持的最大尺寸，并在日志中记录所使用的尺寸。

## 检查 2：检查地面站目标地址

UAVcast-Pro 只会将视频发送到已开启视频的目标地址。遥测和视频的开关是分开的，**新建目标地址时两者默认均为关闭**。

1. 前往 **地面控制站**，找到运行地面站的电脑对应的卡片。
2. 确保 **启用终端** 和 **启用视频** 均已开启。
3. 检查 **目标IP或主机**。它必须是地面站电脑从无人机端看到的 IPv4 地址。不接受主机名。
4. 检查 **视频端口** 是否为 `5600`，或为地面站所监听的端口。
5. 字段会在您离开或按下 Enter 键后保存。绿色勾号表示已保存成功。

![视频端口 5600，并已开启启用视频开关](https://docs.uavmatrix.com/zh-cn/img/screenshots/uavcast-pro/ground-control--video-enabled.webp)

*地面控制站：已开启启用视频、视频端口为 5600 的目标地址。*

> **通过 4G 飞行？请使用 VPN IP**
>
> 通过蜂窝链路时，无人机无法访问您笔记本电脑的本地地址（如 `192.168.1.20`）。请使用笔记本电脑在 VPN（Fleet Manager VPN、Tailscale 或 ZeroTier）上的地址。在 Windows 上，运行 `ipconfig` 并查找 Tailscale 或 ZeroTier 适配器。

使用 Fleet Manager？添加流绑定（stream binding）时会自动为您创建目标地址，同一地面站上的每架额外无人机都会获得独立的端口。请检查绑定上显示的视频端口，而不是 5600。 请参阅 [流绑定](https://docs.uavmatrix.com/zh-cn/fleet-manager/network/stream-bindings/)。

## 检查 3：允许 UDP 5600 通过防火墙

视频以入站 UDP 流量的形式到达。在 Windows 上，即使遥测可以通过（因为地面站已为其申请了例外规则），此类流量默认也会被阻止。

**Windows**

以管理员身份打开 **PowerShell**，然后运行：

```powershell
New-NetFirewallRule -DisplayName "UAV Video" -Direction Inbound -Protocol UDP -LocalPort 5600 -Action Allow
New-NetFirewallRule -DisplayName "MAVLink Telemetry" -Direction Inbound -Protocol UDP -LocalPort 14550 -Action Allow
```

ZeroTier 和 Tailscale 适配器通常被归类为 *Public* 网络。以这种方式创建的规则会应用于所有网络配置文件。

**Linux**

```bash
sudo ufw allow 5600/udp comment 'UAV Video'
sudo ufw allow 14550/udp comment 'MAVLink Telemetry'
```

**macOS**

macOS 防火墙会允许您批准的应用程序接收入站 UDP。如果您在 QGroundControl 首次启动时点击了 *Deny*，请在 **System Settings → Network → Firewall → Options** 中重新允许。

## 检查 4：在地面站中设置视频

**QGroundControl**

1. 点击 **Q** 图标，然后点击 **Application Settings**。
2. 打开视频设置（**Video**，或旧版本中的 **General → Video**）。
3. 将 **Source** 设置为 **UDP h.264 Video Stream**，并确认 UDP 地址使用端口 `5600`（当前版本中为 **UDP URL** `0.0.0.0:5600`，旧版本中为 **UDP Port** `5600`）。
4. 返回 Fly 视图。视频窗口应在几秒钟内显示画面。

**Mission Planner**

Mission Planner 在 HUD 中显示视频。如果仍然是黑屏，请手动设置源：

1. 在 HUD 上右键单击，选择 **Video → Set GStreamer Source**。
2. 粘贴以下管道命令并确认：

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

## 检查 5：在没有地面站的情况下测试视频流

这一步将地面站软件排除在外。如果弹出了一个显示视频的窗口，说明无人机、网络和防火墙均正常，问题出在地面站设置上。

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

> **Windows：请选择 Complete 安装**
>
> 安装 GStreamer（MSVC 64-bit runtime）时，请选择 **Complete**。Typical 安装不包含 H.264 解码器，命令会失败并提示 `no element "avdec_h264"`。

在再次打开地面站之前，请关闭此测试：同一时间只有一个程序可以监听端口 5600。分步接收端设置请参阅：[Mission Planner](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/mission-planner/)、[QGroundControl](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/qgroundcontrol/)，以及 GStreamer 在 [Windows](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-windows/)、[Linux](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-linux/) 或 [macOS](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-macos/) 上的设置。

> **视频已正常，但通过 4G 时卡顿？**
>
> 请参阅 [视频卡顿或延迟](https://docs.uavmatrix.com/zh-cn/troubleshooting/choppy-or-delayed-video/)。

## 仍然没有视频？

在日志列表中选中 **Camera Server**，然后[下载日志](https://docs.uavmatrix.com/zh-cn/troubleshooting/collect-logs/)，并连同您的 UAVcast-Pro 版本、摄像头型号和所用的地面站一起发送至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**。

相关链接：[摄像头设置](https://docs.uavmatrix.com/zh-cn/uavcast-pro/camera/) · [地面控制站](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/)

Source: https://docs.uavmatrix.com/zh-cn/troubleshooting/no-video-in-gcs/
