# Mission Planner

> 将 Mission Planner 连接到 UAVcast-Pro 无人机：通过 UDP 14550 传输 MAVLink，使用精确的 GStreamer 源在 HUD 中显示 H.264 实时视频，并说明 Windows 防火墙、第二台摄像头和常见错误。

Mission Planner 通过 UDP 14550 端口接收 UAVcast-Pro 遥测，并通过 5600 端口上的 GStreamer 源在其 HUD 中显示实时视频。遥测只需一次点击即可连接；视频需要粘贴一次管道（pipeline），Mission Planner 会记住该设置。

## 开始之前

- 在无人机上，于 [地面控制站](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/) 中添加目标地址，填入本 PC 的 IP 地址（4G 下使用 VPN 地址），并开启 **启用遥测**；如需视频，还需开启 **启用视频**。
- 摄像头已在 **摄像头 → 摄像头设置** 中开始推流。
- 在 Windows 上运行最新版 Mission Planner。在命令提示符中使用 `ipconfig` 查找本 PC 的 IP。

## 连接遥测

1. 在 Mission Planner 右上角的连接下拉列表中选择 **UDP**。波特率将被忽略。
2. 选择 **Connect**。
3. 出现提示输入监听端口时，保持 `14550`（或您在无人机上设置的 **遥测端口**），然后选择 **OK**。
4. Mission Planner 会下载参数，无人机会出现在地图上。

![Mission Planner 飞行数据视图通过 UDP 连接：右上角连接框显示 UDP、链路 UDP14550-1-QUADRO 以及 DISCONNECT 按钮；HUD 显示 DISARMED、Unhealthy AHRS 和 GPS: No Fix](https://docs.uavmatrix.com/zh-cn/img/screenshots/gcs/mission-planner--connected.webp)

*已连接。右上角的框显示 UDP 和链路 UDP14550-1-QUADRO，按钮现在显示为 DISCONNECT。这是没有 GPS 的台架设置，因此 HUD 显示 DISARMED、Unhealthy AHRS 和 GPS: No Fix。*

## 在 HUD 中显示视频

1. 右键单击 HUD（人工地平仪），选择 **Video → Set GStreamer Source**。

2. 粘贴以下管道，然后选择 **OK**：

   ```text
   udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
   ```

3. 几秒钟内，视频会替换 HUD 背景。飞行数据仍显示在视频之上。

*Mission Planner 示意图：HUD 上的右键菜单中 Video 已高亮，其子菜单项为 Set GStreamer Source。*

*示意图 Mission Planner（简化版）。（1）右键单击 HUD，（2）Video，（3）Set GStreamer Source，然后粘贴管道。*

Mission Planner 为 HUD 使用其自带的 GStreamer 副本，因此无需单独安装[Windows 上的 GStreamer](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-windows/)。如果 Mission Planner 提示下载 GStreamer，请允许。

请完全保留管道末尾的内容：Mission Planner 需要 `video/x-raw,format=BGRA ! appsink name=outsink` 才能绘制画面。只需修改端口。

### 降低延迟

`rtpjitterbuffer` 可平滑处理迟到的数据包，但代价是约 200 ms 的延迟。在网络状况良好时，可以降低该延迟：

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer latency=0 ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink sync=false
```

在较弱的 4G 链路上，请保留默认的抖动缓冲区；这样画面不易破碎。

## 允许 Mission Planner 通过 Windows 防火墙

Windows 会在 Mission Planner 首次监听网络时询问。请同时允许 **专用** 和 **公用** 网络。ZeroTier 或 Tailscale 适配器通常被归类为 **公用**，因此只勾选专用网络会阻断 VPN。

如果您关闭了该提示，请在管理员 PowerShell 中开放端口：

```powershell
New-NetFirewallRule -DisplayName "UAVcast-Pro telemetry" -Direction Inbound -Protocol UDP -LocalPort 14550 -Action Allow
New-NetFirewallRule -DisplayName "UAVcast-Pro video" -Direction Inbound -Protocol UDP -LocalPort 5600-5602 -Action Allow
```

## 第二台摄像头（双路视频流）

开启[双路视频流](https://docs.uavmatrix.com/zh-cn/uavcast-pro/camera/multi-camera/)后，摄像头 2 会发送到 **视频端口（摄像头 2）**，默认为 `5601`。Mission Planner 的 HUD 只显示一个源。需要查看摄像头 2 时，可以将 HUD 源切换为端口 5601；或者在单独的 GStreamer 窗口中观看摄像头 2：参见 [Windows 上的 GStreamer](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-windows/)。

Mission Planner 会忽略音频（视频端口 + 2）。请使用 GStreamer 播放音频。

## 常见问题

| 现象 | 原因和解决方法 |
| --- | --- |
| 在 Wi-Fi 下可连接，4G 下无法连接 | 目标地址使用的是局域网 IP。请使用本 PC 的 VPN IP。 |
| *No heartbeat packets received* | 无人机未向本 PC 发送数据：IP 错误、**启用遥测** 已关闭，或防火墙阻止了 UDP 14550。 |
| 遥测正常，HUD 一直黑屏 | 该目标地址未开启 **启用视频**，摄像头未运行，或 UDP 5600 被阻止。请使用 [Windows 上的 GStreamer](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-windows/) 进行测试。 |
| 视频卡顿或出现灰色拖影 | 丢包。请降低无人机上的码率，并将 **流恢复速率** 设置为 15–30 帧。 |
| 其他程序打开时视频停止 | 同一 UDP 端口只能由一个程序监听。请关闭同样使用 5600 端口的 GStreamer 窗口或 QGroundControl。 |

更多检查项：[QGroundControl 或 Mission Planner 中无视频](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-video-in-gcs/) 以及 [地面站中无遥测](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-telemetry-in-gcs/)。

Source: https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/mission-planner/
