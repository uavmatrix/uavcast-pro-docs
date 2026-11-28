# 安全与隐私

> 了解 Fleet Manager 如何通过每台无人机专用的 TLS 证书保护无人机、在私有 WireGuard VPN 上隔离各个组织、强制执行角色权限以及存储数据。

本页面向需要审批 Fleet Manager 的人员，包括安全负责人、IT 经理和运营经理。

## 无人机连接

- **每台无人机专用的客户端证书。** 配对时，Fleet Manager 会为每台无人机签发其专属的 TLS 客户端证书。无人机使用该证书连接 Fleet Manager 的 MQTT 代理，即代理唯一对外公开的监听端口 **8883**。不使用共享密码。
- **每台无人机只能使用自己的主题。** 证书的身份标识为无人机的设备 ID，代理仅允许无人机在其自身主题下发布和订阅消息。即使一台无人机被攻破，也无法读取或控制另一台无人机。
- **仅允许出站连接。** 无人机主动连接 Fleet Manager，您无需在无人机或其网络上开放入站端口。
- **配对时间窗口较短。** 配对码为 8 位随机数字，有效期 5 分钟，且只能使用一次。配对码检查受速率限制（每位用户每分钟最多 10 次检查和 5 次配对尝试）。无人机的证书和 VPN 密钥仅在无人机首次连接之前发放，且不会晚于配对码过期后 15 分钟。
- **证书升级。** 当 Fleet Manager 收紧证书方案时，旧版无人机会被标记为 **Re-pair required**，而不会被静默信任。

## 每个组织的私有 VPN

- 每个组织在 Fleet Manager 的 VPN 服务器（`vpn-connect.uavmatrix.com`，一台自托管、兼容 Tailscale 的控制服务器）上拥有独立的网络。设备之间的流量使用 WireGuard 进行端到端加密。不同组织的设备之间无法相互访问：VPN 服务器为每个组织执行独立的访问规则。如果 Fleet Manager 无法确认这种隔离，则会隐藏认证密钥（*VPN isolation could not be verified, so the auth key is hidden.*），而不会发放密钥。
- 加入 VPN 需要认证密钥，且只有 Owner 和 Admin 可以创建。密钥有效期为 90 天。配对或 **Push to Drone** 时，无人机会自动接收密钥，且仅在 Owner 或 Admin 同意的情况下进行。
- 在 **Network** 中移除设备，会同时将其从 VPN 服务器中移除。

## 访问控制

- 登录通过您的 UAVmatrix 账户完成。Fleet Manager 不存储任何密码。
- 每个组织有三种角色（Owner、Admin、Viewer），并在服务器端对每项操作强制执行。请参阅[角色与权限](https://docs.uavmatrix.com/zh-cn/fleet-manager/team/roles-and-permissions/)。
- SSH 终端以及对 UAVcast-Pro 的远程访问仅限 Owner 和 Admin 使用。
- 邀请链接经过加密，只能使用一次，并在 7 天后过期。
- 如果账户或组织违反服务条款，UAVmatrix 可以暂停其使用。被暂停的用户会看到 **Account Suspended** 或 **Organization Suspended**，并附有原因和支持联系方式。

## Fleet Manager 存储的数据

| 数据 | 保存期限 |
| --- | --- |
| 遥测数据（位置、高度、速度、航向、电池、模式、解锁状态、GPS、服务状态），每秒一次 | 根据组织的保留设置：7 天至 1 年（默认 1 年）。7 天后压缩存储。移除无人机时删除。 |
| 已保存的飞行名称和时间范围 | 直至删除，或无人机被移除 |
| 发送给无人机的命令及发送者 | 直至无人机被移除 |
| 活动日志（谁进行了配对、移除、邀请或更改角色） | 无人机或成员被移除后仍保留 |
| 任务 | 直至删除，或组织被删除 |
| 支持工单及其截图 | 为支持服务而保留 |

Fleet Manager 不存储视频。前往地面站的视频和 MAVLink 数据通过您设备之间的 VPN 传输，Fleet Manager 不会记录这些数据。

终端和远程 UAVcast-Pro 代理会经由 Fleet Manager 与无人机之间的加密连接传输，其内容不会被存储。

当网络条件允许时，VPN 流量会直接在您的设备之间传输。当无法直接连接时（例如位于严格的 NAT 或移动运营商网络之后），流量会回退到 Tailscale 的公共中继（DERP）服务器。无论哪种方式，流量始终使用 WireGuard 进行端到端加密；UAVmatrix 不运行中继服务器。

## 第三方

- **地图：** 地图图块来自 Esri；空域图层来自 OpenAIP，并通过 Fleet Manager 获取。
- **FleetBot：** 聊天消息会发送至 Anthropic 以生成回答。组织中的其他任何信息均不会发送。请参阅[支持与 FleetBot](https://docs.uavmatrix.com/zh-cn/fleet-manager/support/#ask-fleetbot)。
- **产品分析与错误报告：** Fleet Manager 使用 PostHog 进行使用分析（例如记录打开了哪些页面、点击了哪些按钮），并用于上报应用错误。

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/security/
