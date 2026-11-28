# 动态DNS

> 使用 UAVcast-Pro 动态DNS（No-IP、DynDNS、DuckDNS 或通用 URL）让主机名始终指向无人机变化的公网 IP，并说明何时 VPN 是更好的选择。

动态DNS 可使主机名（例如 `mydrone.ddns.net`）始终指向无人机当前的公网 IP 地址。UAVcast-Pro 每 5 分钟检查一次公网 IP，并在其变化时更新您的 DNS 服务商。在侧边栏中打开 **动态DNS**。

> **大多数蜂窝链路需要改用 VPN**
>
> 只有当无人机的公网 IP 能够接收传入连接时，动态DNS 才有帮助。大多数移动运营商会将 SIM 卡置于运营商级 NAT 之后，因此公网 IP 属于运营商，而不是您的无人机。除非您的 SIM 卡拥有公网 IP 地址（通常称为 "static" 或 "M2M"），否则请使用 [VPN](https://docs.uavmatrix.com/zh-cn/uavcast-pro/connectivity/vpn/)。

动态DNS 不会改变 UAVcast-Pro 发送遥测和视频的目标地址：这些数据始终发送到 [地面控制站](https://docs.uavmatrix.com/zh-cn/uavcast-pro/ground-stations/) 中设置的 IP 地址。它用于从外部访问无人机的 Web 界面或 SSH。

## 设置步骤

1. 在您的 DNS 服务商（No-IP、DynDNS 或 DuckDNS）处创建主机名。
2. 在 UAVcast-Pro 中，前往 **动态DNS**。将 **启用动态DNS？** 设置为 **是**。
3. 选择您的 **DNS 系统**。
4. 输入您的账户用户名（该字段标签为 **动态DNS配置**）、您的 **密码**，并在 **别名** 中输入主机名。对于 DuckDNS，请将令牌填入用户名字段；**密码** 中可填写任意内容（表单要求必填，DuckDNS 会忽略此项）。离开字段时即自动保存。
5. 选择 **连接** 以启动更新程序。它会立即发送当前 IP，然后每 5 分钟检查一次。**断开连接** 可停止更新程序。

![动态DNS 管理器，启用动态DNS 设置为否，用户名、密码和别名字段为空，DNS 系统为 noip](https://docs.uavmatrix.com/zh-cn/img/screenshots/uavcast-pro/dynamic-dns.webp)

*启用之前的动态DNS 管理器。*

## 设置参考

| 设置 | 默认值 | 可选值 | 说明 |
| --- | --- | --- | --- |
| **启用动态DNS？** | **否** | **是**、**否** |  |
| **DNS 系统** | **No-IP** | **No-IP**、**DynDNS**、**DuckDNS**、**通用** |  |
| **DNS网址** | 留空 | 更新 URL | 仅适用于 **通用**。服务商提供的兼容 DynDNS 的更新 URL。 |
| **动态DNS配置**（用户名） | 留空 |  | 您的 DNS 账户用户名；对于 DuckDNS，则填写令牌。界面中该字段的标签不太准确，它实际上是用户名。 |
| **密码** | 留空 |  | 您的 DNS 账户密码。表单要求填写；DuckDNS 会忽略此项。 |
| **别名** | 留空 | 主机名 | 要更新的主机名，例如 `mydrone.ddns.net`。 |
| 更新间隔 | 5 分钟 | 固定 |  |

[仪表盘](https://docs.uavmatrix.com/zh-cn/uavcast-pro/dashboard/) 中的 **动态DNS** 行会显示更新程序是否正在运行。**操作日志** 会显示每次更新以及服务商的回复。

Source: https://docs.uavmatrix.com/zh-cn/uavcast-pro/connectivity/dynamic-dns/
