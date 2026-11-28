# 为支持人员收集日志

> 从应用程序的日志部分或通过 SSH 下载包含 diagnostics.txt 的 UAVcast-Pro 日志压缩包，并附上正确的信息发送给 UAVmatrix 支持团队。

一次日志下载即可回答支持人员通常会询问的大部分问题。每个压缩包包含您选择的服务日志，以及一份 `diagnostics.txt` 快照：版本、操作系统和主板、设置、生成的遥测路由器配置、串口设备及其占用者，以及内核中的电源和 USB 事件。密码、密钥和令牌均不会包含在内。

## 通过 Web 界面下载

1. 前往 **应用程序**，向下滚动到 **日志**。
2. 在第一个列表中保留 **所有日志**，或选择与问题相符的服务（见下表）。
3. 在第二个列表中选择能覆盖问题发生时段的时间范围。默认值为 **最近 2 小时**。
4. 点击 **下载**。浏览器会保存一个 `.zip` 文件。

![应用程序页面的日志卡片，日志列表设为所有日志，时间范围设为最近 2 小时，并显示下载按钮](https://docs.uavmatrix.com/zh-cn/img/screenshots/uavcast-pro/application--logging.webp)

*应用程序 → 日志，已选择所有日志和最近 2 小时。*

| 问题 | 在日志列表中选择 |
| --- | --- |
| 飞控链路、无心跳、无遥测 | **Mavlink Manager** |
| 摄像头、视频、预览 | **Camera Server** |
| 调制解调器、蜂窝网络 | **Modem Manager** |
| ZeroTier、Tailscale | **VPN Manager** |
| RTK、NTRIP | **NTRIP Client** |
| 许可证 | **License Manager** |
| 动态 DNS | **DNS Manager** |
| 安装 | **Application Installer** |
| 不确定 | **所有日志** |

只有管理员可以下载日志。**清除所有日志** 会删除全部日志文件，且无法撤销，因此请务必先下载。

## 通过命令行

如果无法打开 Web 界面，请通过 SSH 收集日志：

```bash
sudo tar czf ~/uavcast-logs.tar.gz /opt/uavcast-pro/logs /opt/uavcast-pro/installer.log
journalctl -u uavcast-web -u uavcast-factory -u mavlink-manager -u uavcast-camera --since "2 hours ago" > ~/uavcast-journal.txt
```

使用 `scp` 等工具，将这两个文件复制到您的计算机。

## 发送给支持团队

请发送电子邮件至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**，并包含以下内容：

- 日志压缩包，
- 您的 UAVcast-Pro 版本（显示在侧边栏底部），
- 您使用的主板、操作系统、飞控、摄像头和调制解调器，
- 您的预期结果、实际发生的情况，以及您已通过这些页面尝试过的操作。

您也可以在 [UAVmatrix Discord](https://discord.gg/xwqMTXh) 中提问。请勿公开发布日志文件，因为其中包含 IP 地址和设备名称。

相关内容：[应用程序设置](https://docs.uavmatrix.com/zh-cn/uavcast-pro/application-settings/)

Source: https://docs.uavmatrix.com/zh-cn/troubleshooting/collect-logs/
