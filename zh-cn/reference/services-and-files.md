# 服务、文件与安装程序选项

> UAVcast-Pro 安装的 systemd 服务、数据库、日志和录像的存放位置，安装程序的版本选项，以及常用的 SSH 命令。

适用于通过 SSH 操作设备时：了解 UAVcast-Pro 由哪些服务组成、文件存放在哪里，以及如何安装指定版本。

## 服务

UAVcast-Pro 以一组 systemd 服务的形式运行。每个服务在失败时都会自动重启。

| 服务 | 作用 |
| --- | --- |
| `uavcast-web` | Web 界面（Node.js）。除非您更改了 **服务器端口**，否则监听 80 端口。 |
| `uavcast-factory` | 后台 API：许可证、调制解调器、VPN、网络、日志、录制存储以及 Fleet Manager 连接。 |
| `mavlink-manager` | 飞行控制器链路以及发送至地面站的遥测路由器。无需等待互联网即可启动。 |
| `uavcast-camera` | 摄像头采集、H.264 编码以及 UDP 视频流。无需等待互联网即可启动。 |
| `mediamtx` | 媒体服务器，用于浏览器预览、RTSP 和录像。 |
| `uavcast-ntrip` | 用于 RTK 改正数据的 NTRIP 客户端。 |
| `uavcast-dns` | 动态 DNS 更新程序。 |
| `redis-server` | 其他服务所依赖的内部消息总线。 |
| `zerotier-one`、`tailscaled` | VPN 客户端，由 UAVcast-Pro 安装程序安装。 |

常用命令：

```bash
sudo systemctl status uavcast-web            # is it running?
sudo systemctl restart uavcast-camera        # restart one service
journalctl -u mavlink-manager -f             # follow a service's log live
journalctl -u uavcast-web --since yesterday  # read recent history
```

## 文件与文件夹

所有内容都位于 `/opt/uavcast-pro` 下。

| 路径 | 内容 |
| --- | --- |
| `/opt/uavcast-pro/uavcast.db` | 设置数据库（SQLite）。可在 **应用程序 → 数据库 → 备份数据库** 中进行备份。 |
| `/opt/uavcast-pro/logs/` | 服务日志，自动轮转。可在 **应用程序 → 日志** 中下载。 |
| `/opt/uavcast-pro/recordings/` | 内部存储中的摄像头录像和遥测日志（除非 **存储位置** 指向 USB 驱动器或其他文件夹）。 |
| `/opt/uavcast-pro/missions/` | 已保存的任务。 |
| `/opt/uavcast-pro/installer.log` | 上次安装的日志。 |
| `/etc/systemd/system/uavcast-web.service` | Web 界面服务，包括 `SERVER_PORT`。 |

## 安装程序选项

安装程序是一条命令。可随时重新运行，以修复或更新安装。

```bash
# Install or update to the latest version
curl -fsSL https://install.uavmatrix.com | sudo bash

# List the versions available for this device's architecture
curl -fsSL https://install.uavmatrix.com | bash -s -- -l

# Install a specific version
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2
```

| 选项 | 含义 |
| --- | --- |
| `-l` | 列出此架构（arm64 或 amd64）可用的版本。 |
| `-b <version>` | 安装指定版本，而非最新版本。 |

安装程序会检测架构和操作系统，安装系统软件包、ZeroTier、Tailscale 和摄像头软件包，配置 Raspberry Pi 的 UART，设置服务并启动 Web 界面。其日志位于 `/opt/uavcast-pro/installer.log`。

您也可以通过 Web 界面更新：进入 **应用程序 → 更新应用**，在 **选择要更新的版本** 中选择版本，然后点击 **立即更新**。

## 集成点

UAVcast-Pro 没有公开的 REST API。如需集成，可使用：

- **通过 UDP 的 MAVLink**：发送至每个地面站目标地址（默认端口 14550），适用于任何支持 MAVLink 的软件。
- **视频**：通过 RTP/UDP（端口 5600），或从无人机通过 RTSP（端口 8554）获取。参见 [VLC 与 RTSP](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/vlc-and-rtsp/)。
- **注入器**：通过 HTTP、UDP 或串口，将您自己的传感器数值推送到 MAVLink 数据流中。参见 [注入器](https://docs.uavmatrix.com/zh-cn/uavcast-pro/flight-controller/injectors/)。

Source: https://docs.uavmatrix.com/zh-cn/reference/services-and-files/
