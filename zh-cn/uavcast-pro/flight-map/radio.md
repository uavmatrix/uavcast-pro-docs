# Radio 标签页

> 在 UAVcast-Pro 的 Radio 标签页中查看飞行控制器的实时 RC 通道 PWM 值和 RSSI，检查发射机开关和 RC 摄像头切换。

Radio 标签页显示飞行控制器从发射机接收的 RC 输入：每个通道的 PWM 值和 RSSI（信号强度）。无需连接地面站，即可用它检查开关分配，例如用于 [RC 摄像头切换](https://docs.uavmatrix.com/zh-cn/uavcast-pro/camera/multi-camera/) 的通道。打开 **飞行地图 → Radio**。

![Radio 标签页，显示 RSSI 徽章、四个主通道和辅助通道，所有数值均为 0](https://docs.uavmatrix.com/zh-cn/img/screenshots/uavcast-pro/flight-map--radio.webp)

*飞行地图 → Radio，台架设备未连接 RC 接收机，因此所有通道均显示为 0。*

## 显示内容

- **RSSI**：飞行控制器报告的接收机信号强度，分为 **无信号**、**弱**、**一般**、**良好** 或 **优秀**。需要在飞行控制器上设置 RSSI（在 ArduPilot 上为 `RSSI_TYPE`）。
- **主控制**：**通道 1 - 横滚（Roll）**、**通道 2 - 俯仰（Pitch）**、**通道 3 - 油门（Throttle）** 和 **通道 4 - 偏航（Yaw）**，采用 Mission Planner 的布局。
- **辅助通道**：其余通道。

PWM 值通常在 1000（最小）到 2000（最大）之间。如果某个通道始终不变，表示该通道未在发射机上映射，或接收机未发送该通道。

这些数值来自飞行控制器的 `RC_CHANNELS` 消息，因此仅当飞行控制器链路为 **已连接** 状态时才会更新。

Source: https://docs.uavmatrix.com/zh-cn/uavcast-pro/flight-map/radio/
