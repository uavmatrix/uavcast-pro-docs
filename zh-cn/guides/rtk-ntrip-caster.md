# 通过 4G 和 NTRIP caster 使用 RTK GPS

> 借助 UAVcast-Pro，通过 LTE 将 NTRIP caster 的 RTCM3 校正数据发送到飞行控制器以获得 RTK 固定解，现场无需基站。

UAVcast-Pro 可以通过无人机自身的互联网链路从 NTRIP caster 获取 RTCM3 校正数据，并将其转发至飞行控制器。无需携带基站或单独的电台，即可获得 RTK Float 或 RTK Fixed 定位。任何标准的 NTRIP v1 或 v2 caster 均可使用。

```text
NTRIP caster ──RTCM3 over TCP/TLS──► UAVcast-Pro ──MAVLink GPS_RTCM_DATA──► flight controller ──► RTK GPS
      ▲                                    │
      └──────── GGA position (VRS) ────────┘
```

**所需条件：**

- 飞行控制器上配备支持 RTK 的 GPS，例如 u-blox F9P 模块、Here3+ 或 Septentrio Mosaic。标准的 M8N/M10 导航模块无法实现 RTK。
- UAVcast-Pro 已使飞行控制器处于 **已连接** 状态，且无人机可访问互联网。
- 一个 caster 账户：可以是国家 CORS 网络、商业服务（Trimble、Hexagon、Topcon 等），或免费的社区 caster rtk2go.com。

## 1. 输入 caster 信息

1. 打开 **飞行控制器 → NTRIP / RTK**。
2. 输入 **Caster 主机** 和 **端口**（通常为 `2101`）。
3. 仅当您的服务商要求时，才开启 **使用 TLS (HTTPS)**。商业 caster 通常需要，公共 caster 则很少需要。
4. 输入 **用户名** 和 **密码**。对于 rtk2go.com，请使用您的邮箱地址作为用户名，并将密码留空。
5. 按下 **测试连接**，等待显示 **Caster 已接受凭据。**

## 2. 选择挂载点

1. 按下 **浏览挂载点**。UAVcast-Pro 将加载 caster 的列表。
2. 选择距离您飞行区域最近的挂载点。列表会显示 **格式**、**GNSS**、**国家**、**位置**，以及是否需要位置信息（**NMEA**：**必需**）。
3. 按下 **选择**。名称将填入 **挂载点**。

![Caster 卡片，包含启用 NTRIP 客户端、Caster 主机、端口 2101、挂载点输入框、浏览挂载点按钮和使用 TLS](https://docs.uavmatrix.com/zh-cn/img/screenshots/uavcast-pro/flight-controller--ntrip-caster.webp)

*Caster 卡片。挂载点输入框旁的浏览挂载点按钮会打开挂载点列表。*

## 3. 发送您的位置（VRS 和最近挂载点类型的 caster）

VRS 和最近挂载点类型的 caster 会为您所在的位置生成校正数据，因此需要您以 NMEA GGA 语句的形式提供位置。

1. 保持 **向上游发送 GGA** 为开启状态（默认），并将 **发送间隔（秒）** 设为 10。
2. 将 **位置来源** 保持为 **来自飞行控制器的实时位置**。
3. 同时在手动位置下输入 **纬度**、**经度** 和 **高度 (m)**。在飞行控制器获得 GPS 定位之前，UAVcast-Pro 将使用此位置。

对于单一固定基站，发送 GGA 不会造成影响，但您也可以将其关闭。

## 4. 启动数据流

开启 **启用 NTRIP 客户端**。几秒钟内，状态面板应显示：

1. **状态**：**正在传输校正数据**，并显示 **Caster 响应**，例如 `ICY 200 OK`。
2. **已转发 RTCM 消息** 数量不断增加，**最后一个 RTCM 帧** 显示为 *刚刚*。
3. **最近的消息类型** 中显示您的星座，例如 1005、1077、1087、1097。
4. 在空旷环境下，RTK 定位标记会从 **3D 定位** 变为 **RTK Float**，然后变为 **RTK 固定**。

![NTRIP / RTK 标签页，状态面板显示已禁用且计数器为零，GPS 质量卡片显示未定位](https://docs.uavmatrix.com/zh-cn/img/screenshots/uavcast-pro/flight-controller--ntrip.webp)

*设置 caster 之前的状态面板和 GPS 质量卡片（已禁用，无 GPS 定位）。校正数据开始传输后，请关注这些字段。*

**GPS 质量** 卡片会显示接收机报告的精度，以及不依赖接收机自身估计的实测 **位置稳定性 (1σ)**。仪表盘在 **RTK 校正** 下显示其状态，并在 **GPS** 下显示定位类型。

## 预设配置

```text
Caster host   rtk2go.com
Port          2101
TLS           off
Username      you@example.com
Password      (empty)
Mountpoint    nearest one from Browse mountpoints
```

```text
Caster host   provider host name
Port          2101 (sometimes 2102 or 443)
TLS           as the provider says
Username      provider account
Password      provider password
Mountpoint    the provider's VRS mountpoint
GGA upstream  on, 10 s, live position from flight controller
```

## 注意事项

- 校正数据与遥测数据通过同一 MAVLink 链路传输，因此飞行控制器的链路必须保持正常。
- 互联网短暂中断后，校正数据会在几秒内恢复。如果 caster 长时间无响应，UAVcast-Pro 会自动重新连接。
- 定位精度会随与基站的距离增加而下降。请选择最近的挂载点，或使用 VRS 服务。

## 故障排除

如果一直停留在 **连接中**、返回 `401` 响应、没有 RTCM 数据或无法获得 RTK 定位，请参阅 [RTK 校正数据未到达](https://docs.uavmatrix.com/zh-cn/troubleshooting/rtk-corrections-not-arriving/)。本页涉及的所有设置均在 [NTRIP / RTK](https://docs.uavmatrix.com/zh-cn/uavcast-pro/flight-controller/ntrip-rtk/) 中说明。

Source: https://docs.uavmatrix.com/zh-cn/guides/rtk-ntrip-caster/
