# Windows 上的 GStreamer

> 在 Windows 上安装 GStreamer（MSVC 64 位，Complete 安装），将其添加到 PATH，并在 PowerShell 或 cmd 中使用 gst-launch-1.0 播放 UAVcast-Pro H.264 视频和 Opus 音频。包含防火墙设置和故障修复。

GStreamer 可在独立窗口中播放 UAVcast-Pro 视频流，无需地面站程序。可用于测试视频是否到达本 PC、在 Mission Planner 或 QGroundControl 旁观看第二台摄像头，或收听音频轨道。设置大约需要五分钟。

## 开始之前

在无人机上，于 [地面控制站](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/) 中添加目标地址，填入本 PC 的 IP 地址（使用 `ipconfig` 查看；4G 下使用 VPN 地址），并开启 **启用视频**。

## 步骤 1：安装 GStreamer

1. 访问 [gstreamer.freedesktop.org/download](https://gstreamer.freedesktop.org/download/)，下载 **MSVC 64-bit** 的 Windows **runtime** 安装程序（不是 development 安装程序，也不是 MinGW 版本）。
2. 运行安装程序，并在询问安装类型时选择 **Complete**。
3. 记下安装文件夹。较新的安装程序使用 `C:\Program Files\gstreamer\1.0\msvc_x86_64`，较旧的版本使用 `C:\gstreamer\1.0\msvc_x86_64`。

> **选择 Complete，而不是 Typical**
>
> **Typical** 安装会漏掉 H.264 解码器（`avdec_h264`）。下面的命令会因 *no element "avdec_h264"* 而失败。请重新运行安装程序并选择 **Complete**。

## 步骤 2：将 GStreamer 添加到 PATH

为了能够在任意文件夹中运行 `gst-launch-1.0`，请将其 `bin` 文件夹添加到用户 PATH 中。在 PowerShell 中（无需管理员权限），使用您的安装文件夹：

```powershell
$bin = "C:\Program Files\gstreamer\1.0\msvc_x86_64\bin"
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
[Environment]::SetEnvironmentVariable("Path", "$userPath;$bin", "User")
```

关闭并重新打开终端，然后检查：

```powershell
gst-launch-1.0 --version
```

或者使用 Windows 设置：搜索 **Edit environment variables for your account**，选择 **Path** → **Edit** → **New**，然后粘贴 `bin` 文件夹。

## 步骤 3：播放视频

**PowerShell**

```powershell
gst-launch-1.0 -v udpsrc port=5600 'caps=application/x-rtp,media=video,clock-rate=90000,encoding-name=H264,payload=96' ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

请保留 `caps=…` 外侧的单引号：没有它们，PowerShell 会在逗号处拆分该值。

**命令提示符（cmd）**

```bat
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

收到第一个关键帧后会立即打开窗口。关闭窗口，或在终端中按 **Ctrl+C**，即可停止。

> **应看到的效果**
>
> 1. 终端打印 `Setting pipeline to PLAYING ...` 并等待视频。
> 2. 收到第一个数据包后，`-v` 会打印包含 `caps = application/x-rtp` 的行。
> 3. 视频窗口中显示摄像头画面。
>
> 如果在第 1 步之后停止，说明没有视频到达本计算机：请参阅下方的故障排除表。

如需在[双路视频流](https://docs.uavmatrix.com/zh-cn/uavcast-pro/camera/multi-camera/)中观看摄像头 2，请在第二个终端中运行相同的命令，并使用 `port=5601`。

### 低延迟版本

在网络状况良好时，可减少抖动缓冲区的延迟：

```powershell
gst-launch-1.0 udpsrc port=5600 'caps=application/x-rtp,media=video,clock-rate=90000,encoding-name=H264,payload=96' ! rtpjitterbuffer latency=0 ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

在 4G 下，请保留默认的抖动缓冲区（即第一个命令），它可以掩盖迟到的数据包。

### 双击快捷方式

将此内容保存为桌面上的 `uavcast-video.cmd`，然后双击运行：

```bat
@echo off
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
pause
```

如果 GStreamer 不在 PATH 中，请将 `cd /d "C:\Program Files\gstreamer\1.0\msvc_x86_64\bin"` 添加为第二行。

## 收听音频

在无人机的 **摄像头** 页面中开启 **音频** 和 **将音频发送到地面站**。音频将到达视频端口 + 2：

```powershell
gst-launch-1.0 udpsrc port=5602 'caps=application/x-rtp,media=audio,encoding-name=OPUS,clock-rate=48000,payload=97' ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

## 通过防火墙放行

首次 `gst-launch-1.0` 监听时，Windows 会询问是否允许。请同时勾选 **专用** 和 **公用**（VPN 适配器通常被归类为公用网络）。若要为任意程序开放端口，请在管理员 PowerShell 中运行：

```powershell
New-NetFirewallRule -DisplayName "UAVcast-Pro video and audio" -Direction Inbound -Protocol UDP -LocalPort 5600-5602 -Action Allow
```

## 故障排除

| 消息或现象 | 解决方法 |
| --- | --- |
| *'gst-launch-1.0' is not recognized…* | GStreamer 不在 PATH 中。请执行步骤 2 并打开新终端，或从 `bin` 文件夹中运行。 |
| *WARNING: erroneous pipeline: no element "avdec_h264"* | 使用了 Typical 安装。请以 **Complete** 重新安装。 |
| *no element "rtph264depay"* 或 *"udpsrc"* | 原因相同：未安装插件集。请以 **Complete** 重新安装。 |
| 运行但没有窗口打开 | 没有数据到达。请检查无人机上的目标 IP（4G 下为 VPN IP）、**启用视频**、摄像头以及防火墙。使用 `-v` 时，数据包到达后会出现包含 `caps = application/x-rtp` 的行。 |
| *Could not get/set settings from/on resource* 或绑定错误 | 其他程序（Mission Planner、QGroundControl 或第二个 GStreamer）已在监听该端口。请将其关闭。 |
| 画面出现灰色拖影或冻结 | 丢包。请降低无人机上的码率，并将 **流恢复速率** 设置为 15–30 帧。 |
| PowerShell 中出现 *erroneous pipeline: could not parse caps* | `caps=…` 周围缺少引号，或使用了带空格的双引号。请完全按照 PowerShell 命令所示使用。 |

使用 Linux 或 Mac？请参阅 [Linux 上的 GStreamer](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-linux/) 或 [macOS 上的 GStreamer](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-macos/)。

Source: https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/gstreamer-windows/
