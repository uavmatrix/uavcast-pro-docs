# Android 与平板

> 在 Android 手机或平板上通过 QGroundControl 接收 UAVcast-Pro 遥测和实时视频，支持通过 Wi-Fi 或经由 VPN 的 4G 连接，并提供 iPad 的浏览器方案。

适用于 Android 的 QGroundControl 与桌面版一样，在 UDP 14550 端口接收 UAVcast-Pro 遥测，在 UDP 5600 端口接收视频。通过 4G 连接时，请在平板上安装 Tailscale 或 ZeroTier 应用，以便无人机能够访问它。

## 在 Android 上设置 QGroundControl

1. 从 [Google Play](https://play.google.com/store/apps/details?id=org.mavlink.qgroundcontrol) 安装 **QGroundControl**。

2. 将平板连接到无人机发送数据所用的网络：

   - **同一 Wi-Fi**：在 **Settings → Wi-Fi →（您的网络）→ Advanced** 或类似位置查找平板的 IP。
   - **通过 4G**：安装 [ZeroTier One](https://play.google.com/store/apps/details?id=com.zerotier.one) 或 [Tailscale](https://play.google.com/store/apps/details?id=com.tailscale.ipn) 应用，加入与无人机相同的网络（参见 [VPN](https://docs.uavmatrix.com/zh-cn/uavcast-pro/connectivity/vpn/)），并记下平板的 VPN 地址。

3. 在无人机上，于 [地面控制站](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/) 中添加目标地址，填入平板的 IP，并开启 **启用遥测** 和 **启用视频**。

4. 打开 QGroundControl。接收到遥测数据后，飞行器会显示出来。

5. 设置视频：点击 **Q** 图标 → **Application Settings** → **Video**（在较旧版本中，为 **General** 下的 **Video** 部分），将 **Source** 设置为 **UDP h.264 Video Stream**，并确认 UDP 地址使用端口 `5600`。

正常工作时，**Fly** 视图会在地图上显示无人机，工具栏中显示飞行模式和电池状态，角落的小视频窗口中显示摄像头画面。点击该窗口即可切换视频与地图。

> **保持 VPN 应用连接**
>
> Android 可能会为节省电量而停止后台的 VPN 应用。请将 ZeroTier 或 Tailscale 排除在电池优化之外，并在飞行时保持 VPN 开启。

有关视频设置、低延迟模式和常见问题的详细信息，请参阅 [QGroundControl 页面](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/qgroundcontrol/)。

## iPad、iPhone 及其他设备：使用浏览器

UAVcast-Pro Web 界面可在任何现代浏览器中运行。在 iPad 或手机上，打开 `http://<drone-ip>`（4G 下使用 VPN 地址），然后使用 [飞行地图](https://docs.uavmatrix.com/zh-cn/uavcast-pro/flight-map/)：实时地图、座舱 HUD、摄像头视频、解锁/上锁以及 RTL。此处的视频为实时预览（WebRTC），因此浏览器必须能够访问无人机的 8889 端口。

## 常见问题

| 现象 | 解决方法 |
| --- | --- |
| 4G 下飞行器始终未出现 | 平板上的 VPN 应用已关闭，或目标地址使用的是 Wi-Fi IP。请使用平板的 VPN 地址。 |
| 屏幕关闭后即失效 | Android 暂停了 VPN 应用。请关闭该应用的电池优化。 |
| 遥测正常，但没有视频 | 检查 **Enable Video**、摄像头以及 QGroundControl 中的视频来源设置。 |

Source: https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/android/
