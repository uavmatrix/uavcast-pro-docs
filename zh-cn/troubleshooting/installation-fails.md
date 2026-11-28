# 安装失败

> 解决 UAVcast-Pro 安装程序的错误，例如 No installation candidate found 或 failed dependencies：请检查 64 位操作系统、互联网连接、磁盘空间和安装日志。

您运行了 `curl -fsSL https://install.uavmatrix.com | sudo bash`，但它因错误而停止、长时间挂起，或在完成后仍无法正常使用 Web 界面。

| 您会看到 | 可能原因 | 从此处开始 |
| --- | --- | --- |
| No installation candidate for … found! | 32 位操作系统或不支持的架构 | [检查 1](https://docs.uavmatrix.com/zh-cn/troubleshooting/installation-fails/#check-1) |
| Failed to update package lists, or Failed to install dependencies | 没有互联网连接，或 apt 配置损坏 | [检查 2](https://docs.uavmatrix.com/zh-cn/troubleshooting/installation-fails/#check-2) |
| 在 Pi Zero 2 W 上长时间挂起 | 内存不足且存储速度慢 | [检查 3](https://docs.uavmatrix.com/zh-cn/troubleshooting/installation-fails/#check-3) |
| Service failed to start | 安装后某个组件无法启动 | [检查 4](https://docs.uavmatrix.com/zh-cn/troubleshooting/installation-fails/#check-4) |

## 检查 1：64 位操作系统

UAVcast-Pro v6 需要 64 位操作系统：arm64 或 amd64（x86 PC）。在 arm64 上，Raspberry Pi 以外的主板（Jetson 和其他 ARM 主板）需要 UAVcast-Pro 6.5.3 或更高版本；较旧的安装程序会以 *Device is not a Raspberry Pi* 为由停止。

```bash
dpkg --print-architecture   # must print arm64 or amd64
uname -m                    # aarch64 or x86_64
```

如果看到 `armhf`、`armv7l` 或 `i686`，说明您使用的是 32 位操作系统。请使用 Raspberry Pi Imager 刷写 **Raspberry Pi OS (64-bit)**，然后重新安装。支持的系统包括 Raspberry Pi OS、Debian 和 Ubuntu；请参阅[支持的硬件](https://docs.uavmatrix.com/zh-cn/reference/supported-hardware/)。

## 检查 2：互联网与 apt

安装程序会下载 UAVcast-Pro 和系统软件包，并安装 ZeroTier 和 Tailscale。

1. 检查互联网连接：`curl -I https://install.uavmatrix.com`。
2. 手动运行 `sudo apt update`，并修复其显示的任何错误，例如已过期密钥的第三方软件源。
3. 再次运行安装程序。多次运行是安全的。

## 检查 3：低功耗主板

在 Raspberry Pi Zero 2 W 上，安装所需时间比在 Pi 4 或 5 上长得多，安装程序会显示预计时间。请耐心等待其完成。请使用高速 SD 卡和稳定的电源：安装过程中因欠压而重启，会留下未完成的安装。

## 检查 4：阅读安装日志

安装程序会将所有输出写入 `/opt/uavcast-pro/installer.log`。

```bash
sudo tail -n 100 /opt/uavcast-pro/installer.log
```

请查看最后几行错误信息。如果安装程序在创建 `/opt/uavcast-pro` 之前就失败了，日志位于 `/tmp/uavcast-installer.log`。

## 安装指定版本

若要列出适用于您架构的可用版本，或安装其中某个版本：

```bash
curl -fsSL https://install.uavmatrix.com | bash -s -- -l          # list versions
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2  # install 6.5.2
```

## 仍然失败？

请将 `/opt/uavcast-pro/installer.log`、`cat /etc/os-release` 和 `dpkg --print-architecture` 的输出，以及您的主板型号，发送至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**。

相关内容：[安装 UAVcast-Pro](https://docs.uavmatrix.com/zh-cn/get-started/installation/)

Source: https://docs.uavmatrix.com/zh-cn/troubleshooting/installation-fails/
