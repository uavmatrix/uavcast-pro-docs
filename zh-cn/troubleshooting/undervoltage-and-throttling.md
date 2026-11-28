# 欠压与降频

> UAVcast-Pro 警告 Voltage too low 或 Slowed down？为 Pi、调制解调器和摄像头配置足够的供电，解决细线和散热问题，并防止意外重启。

仪表盘的 **Power supply** 行出现警告，调制解调器断开，飞行控制器链路重置，或 Pi 在飞行中重启。在无人机上，供电不足引发的奇怪故障比任何软件设置都多。

![仪表盘状态卡片，系统下的 Power supply 行显示 Stable](https://docs.uavmatrix.com/zh-cn/img/screenshots/uavcast-pro/dashboard--status-card.webp)

*仪表盘 → 状态卡片。Power supply 行位于 System 下，此处显示 Stable。出现警告时，该文本会被替换，具体见下表。*

| Power supply 行 | 含义 |
| --- | --- |
| **Stable** | 自启动以来未发生欠压或降频 |
| **Voltage too low - use a stronger power supply** | 当前供电电压低于 Pi 所需的电压 |
| **Voltage dropped since start-up** | 此情况发生在之前，例如调制解调器连接或电机启动时 |
| **Slowed down (heat or power)** | CPU 为防止过热或低电压而降低运行速度 |

这些读数来自 Raspberry Pi 固件，因此仅在 Raspberry Pi 上可用。

## 检查 1：为所有负载配置足够的供电

Pi 通过其 USB 端口为调制解调器和 USB 摄像头供电。4G 调制解调器在连接时以及信号较弱时会产生峰值电流。

1. 使用额定功率远高于 Pi、调制解调器、摄像头以及同一供电线路上其他设备总电流的 5 V BEC 或稳压器。官方 Raspberry Pi 电源规格列出了各型号所需的功率。
2. 切勿通过飞行控制器的 TELEM 或 USB 端口为 Pi 供电。
3. 如果调制解调器耗电超过 Pi 所能通过的电流，请直接从稳压器为调制解调器供电，可通过带外接电源的 USB 集线器，或使用独立供电的 USB 线缆实现。

## 检查 2：线缆和连接器

细线或长线在负载下会损失电压。请为调制解调器使用短而粗的电源线和质量良好的 USB 线缆。对手机充电来说没有问题的线缆，在峰值电流下仍可能导致欠压。

## 检查 3：散热

**系统信息** 下的 **温度** 显示 CPU 温度。在阳光下的密闭机身内运行视频编码的 Pi 会变得很热。请加装散热片或小风扇，并确保机箱内有气流。Pi 5 在持续编码时需要主动散热。

## 检查 4：修复后的检查

**Voltage dropped since start-up** 会一直保持到下次启动。请重启设备，在台架上运行一次典型任务（连接调制解调器，摄像头推流），并确认该行保持为 **Stable**。

## 仍然有警告？

日志下载包含 `diagnostics.txt` 中来自内核的电源和 USB 事件。请[下载日志](https://docs.uavmatrix.com/zh-cn/troubleshooting/collect-logs/)，并附上供电接线的照片，一同发送至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**。

相关链接：[硬件要求](https://docs.uavmatrix.com/zh-cn/get-started/hardware-requirements/) · [仪表盘](https://docs.uavmatrix.com/zh-cn/uavcast-pro/dashboard/)

Source: https://docs.uavmatrix.com/zh-cn/troubleshooting/undervoltage-and-throttling/
