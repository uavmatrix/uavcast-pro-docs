# NTRIP / RTK 修正数据

> 通过 4G/LTE 将 NTRIP Caster 的 RTCM3 修正数据发送至飞行控制器，以实现 RTK Fixed 定位。包括 Caster、挂载点、VRS 和 GGA 设置。

UAVcast-Pro 内置 NTRIP 客户端。它通过无人机的互联网连接连接到 NTRIP v1 或 v2 Caster，接收 RTCM3 修正数据，并以 MAVLink `GPS_RTCM_DATA` 的形式将其传递给飞行控制器。其方式与 Mission Planner 的 "Inject GPS" 相同，但由无人机自身完成。您无需现场的地面站或基站。请在 **飞行控制器 → NTRIP / RTK** 下打开该功能。

## 开始之前

- 飞行控制器上需要具备 RTK 能力的 GPS：多频、载波相位接收机，例如 u-blox F9P、Holybro H-RTK、CUAV C-RTK、Here3+ 或 Septentrio Mosaic。标准 M8/M10 GPS 会忽略修正数据。
- 一个 NTRIP Caster 账户：可以是国家 CORS 网络、商业服务（Trimble、Hexagon、Topcon 等），或 [RTK2go](http://rtk2go.com/)。您需要主机、端口、挂载点，通常还需要用户名和密码。
- 无人机需要联网，并已连接飞行控制器。

## 设置 NTRIP 客户端

1. 进入 **飞行控制器 → NTRIP / RTK**。
2. 在 **Caster** 下，输入 **Caster 主机**（例如 `ntrip.example.com`）和 **端口**（大多数 Caster 使用 `2101`）。
3. 在 **认证** 下输入 **用户名** 和 **密码**。选择 **测试连接** 进行检查：*Caster 已接受凭据。*
4. 选择 **浏览挂载点**，在列表中选择最近的挂载点，然后选择 **选择**。也可以直接在 **挂载点** 中输入。
5. 如果挂载点是 VRS 或“最近基站”流（**NMEA** 列显示 **必需**），请保持 **向上游发送 GGA** 为开启状态。
6. 打开 **启用 NTRIP 客户端**。

**状态**卡片会变为 *正在传输修正数据*，并显示 **接收总量**、**吞吐量**、**最近 RTCM 帧** 和 **最近消息类型**。在天空开阔的情况下，**飞行控制器 RTK 定位** 通常会在一两分钟内从 **3D 定位** 变为 **RTK 浮点**，然后变为 **RTK 固定**。

![NTRIP / RTK 标签页，状态面板显示已禁用且计数器为零，以及 GPS 质量卡片](https://docs.uavmatrix.com/zh-cn/img/screenshots/uavcast-pro/flight-controller--ntrip.webp)

*设置 Caster 之前的 飞行控制器 → NTRIP / RTK：状态为已禁用，计数器为零，且无 GPS 定位。*

## 设置参考

| 设置 | 默认值 | 取值 | 说明 |
| --- | --- | --- | --- |
| **启用 NTRIP 客户端** | 关 | 开、关 |  |
| **Caster 主机** | 空 | 主机名或 IP | 必填。 |
| **端口** | `2101` | 1–65535 | 某些 TLS Caster 使用 2102 或 443。 |
| **挂载点** | 空 | Caster 的挂载点名称 | 必填。使用 **浏览挂载点** 读取 Caster 的 sourcetable。 |
| **使用 TLS (HTTPS)** | 关 | 开、关 | 适用于要求 TLS 的 Caster。大多数公共 Caster 使用普通 TCP。 |
| **用户名** / **密码** | 空 |  | 匿名 Caster 请留空。RTK2go 要求使用真实的电子邮件地址作为用户名，且无需密码。 |
| **向上游发送 GGA** | 开 | 开、关 | 以 NMEA `$GPGGA` 形式发送您的位置，以便 VRS 和最近挂载点 Caster 能为您所在位置生成修正数据。 |
| **发送间隔（秒）** | `10` | 秒 | GGA 的发送频率。 |
| **位置来源** | **飞行控制器实时位置** | **飞行控制器实时位置**、**固定手动位置** |  |
| **纬度** / **经度** / **高度（米）** | `0` |  | 手动位置。在飞行控制器获得 GPS 定位之前，也会用作备用。 |

## 阅读 GPS 质量卡片

**GPS 质量**卡片显示来自飞行控制器的实时定位信息，以及一项不依赖接收机自身估算的测量值：

- **定位类型**和**卫星数**。
- **水平精度**和**垂直精度**：接收机自身的估算值。
- **位置稳定性 (1σ)**：无人机静止时位置实际漂移的幅度，在较短的时间窗口内测得。飞行中会显示 **移动中**。
- **最近修正**：距离上次转发 RTCM 帧的时间。如果该值持续增加，说明修正数据已中断。

如果显示 **接收机无 RTK 状态**，说明飞行控制器从未报告过 RTK 状态，通常是因为 GPS 不支持 RTK。修正数据仍会被转发。

## 通过蜂窝链路使用

修正数据很小（通常为 1 至 5 kbit/s），因此可以轻松与遥测和视频共存。短暂断网后，客户端会在几秒内重新连接。若 Caster 连接长时间无数据，会在 15 秒内被检测到并重新打开。

[仪表盘](https://docs.uavmatrix.com/zh-cn/uavcast-pro/dashboard/)会在 **RTK 修正数据** 行中显示客户端的状态。

## 故障排除

| 症状 | 检查项 |
| --- | --- |
| 状态为 **错误**，**Caster response** 显示 `401` | 用户名或密码错误，或该账户无权访问此挂载点。 |
| **已连接**，但没有 RTCM 帧 | 挂载点需要 GGA。请开启 **向上游发送 GGA**，并确保飞行控制器已获得 3D 定位，或设置手动位置。 |
| 已收到 RTCM，但定位仍为 **3D 定位** | GPS 不支持 RTK，或挂载点的 GNSS 系统与您的接收机不匹配。请检查 sourcetable 中的 **GNSS** 列。 |
| **RTK 浮点**，从未变为 **RTK 固定** | 基站距离过远（建议在 20 至 30 公里以内）、天空视野不佳或存在多路径干扰。请尝试更近的挂载点。 |

页面底部的 **NTRIP 服务日志** 会显示每一次连接、重新连接以及 Caster 的回复。

更多检查项：[RTK 修正数据未到达](https://docs.uavmatrix.com/zh-cn/troubleshooting/rtk-corrections-not-arriving/)。

Source: https://docs.uavmatrix.com/zh-cn/uavcast-pro/flight-controller/ntrip-rtk/
