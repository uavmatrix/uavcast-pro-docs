# VPN 已连接但无法访问无人机

> Fleet Manager VPN、Tailscale 或 ZeroTier 显示已连接，但无法 ping 通无人机？请检查授权、网络或 tailnet、互联网以及地面站 IP。

无人机和您的笔记本电脑都显示已接入 VPN，但对无人机 VPN 地址执行 `ping` 超时，通过 VPN 无法打开网页界面，或者遥测和视频数据未能到达。

| 您会看到 | 可能原因 | 从此处开始 |
| --- | --- | --- |
| ZeroTier 网络显示 ACCESS_DENIED，或没有 IP 地址 | 无人机未被授权加入该网络 | [检查 1](https://docs.uavmatrix.com/zh-cn/troubleshooting/vpn-cant-reach-drone/#check-1) |
| 无人机正常，但笔记本电脑未获得地址或获得了错误的地址 | 笔记本电脑加入了其他网络或 tailnet | [检查 2](https://docs.uavmatrix.com/zh-cn/troubleshooting/vpn-cant-reach-drone/#check-2) |
| Tailscale 正常使用数周后停止工作 | 设备密钥已过期 | [检查 3](https://docs.uavmatrix.com/zh-cn/troubleshooting/vpn-cant-reach-drone/#check-3) |
| 无人机上的 VPN 在外场从未连接成功 | 无人机通过调制解调器无法访问互联网 | [检查 4](https://docs.uavmatrix.com/zh-cn/troubleshooting/vpn-cant-reach-drone/#check-4) |
| Ping 正常，但没有遥测或视频 | 地面站目标地址使用了错误的 IP | [检查 5](https://docs.uavmatrix.com/zh-cn/troubleshooting/vpn-cant-reach-drone/#check-5) |

## 检查 1：在网络中授权无人机

**ZeroTier：**

1. 在 UAVcast-Pro 中打开 **虚拟专用网络**。检查 **启用 VPN** 是否为 **是**，**服务** 是否为 **ZeroTier**，并且 **网络 ID** 与您的 ZeroTier 控制器中的一致。
2. 在 **已连接网络** 下查看您的网络。如果其状态标记显示 **ACCESS_DENIED**，说明无人机已加入网络，但尚未获得授权。
3. 在您的 ZeroTier 控制器中打开该网络，并使用无人机的节点 ID 授权该成员。
4. 返回 UAVcast-Pro，等待网络显示状态 `OK` 和 IP 地址。这就是您从笔记本电脑使用的地址。

在私有 ZeroTier 网络中，每台加入的设备（无人机、笔记本电脑、平板电脑）都必须先在控制器中获得一次授权，然后才能获得地址。（UAVnet 网络同样是私有的；UAVnet 即将停用，请迁移至 Fleet Manager VPN。）

**Tailscale：** 无人机接入后会显示 **已连接**，并带有 **IPv4 地址**（100.x.y.z）。如果显示 **未连接**，请使用 **网页登录 → 生成登录 URL**，或在 **认证密钥** 选项卡中使用 Tailscale 管理控制台中的密钥。

## 检查 2：让笔记本电脑处于同一网络

两端必须位于同一个 ZeroTier 网络或同一个 tailnet 中。

- **ZeroTier**：在笔记本电脑上加入相同的 Network ID，并在您的控制器中同样授权笔记本电脑。在 Windows 上，检查 ZeroTier 托盘图标；在 Linux 上运行 `sudo zerotier-cli listnetworks`。状态必须为 `OK`。
- **Tailscale**：Tailscale 客户端一次只能加入一个 tailnet。在笔记本电脑上运行 `tailscale status`。列表中必须包含无人机。如果没有，说明笔记本电脑登录的是其他账户或 tailnet。
- **Fleet Manager VPN**：如果无人机已通过 Fleet Manager 和 VPN 配对，它就位于您组织的网络中，而不是您个人的 Tailscale 中。请在笔记本电脑上运行 Fleet Manager 在 **Network** 下提供的命令（`tailscale up --login-server=… --authkey=…`）。该命令只应在笔记本电脑上运行，切勿在无人机上运行。请参阅 [将地面站连接到 Fleet Manager](https://docs.uavmatrix.com/zh-cn/fleet-manager/connect-gcs/)。

> **配对可能会替换无人机的 VPN**
>
> 在 Fleet Manager 中配对无人机时，如果选择了 **Replace existing VPN with Fleet Manager network**，无人机将离开其当前的 Tailscale 网络，并加入组织的网络。位于旧 tailnet 上的笔记本电脑将无法再访问它。

## 检查 3：Tailscale 密钥已过期

Tailscale 设备密钥会过期。当无人机的密钥过期后，它会从 tailnet 中掉线，直到重新登录。**虚拟专用网络** 页面上的 **过期时间** 字段会显示日期。在 Tailscale 管理控制台中，您可以为无人机关闭密钥过期功能，避免其在项目进行中途掉线。

## 检查 4：无人机首先需要互联网

VPN 通过无人机自身的互联网连接运行。如果调制解调器没有互联网，VPN 会显示为已断开，或始终无法获得地址。请先修复连接：[调制解调器已连接但无互联网](https://docs.uavmatrix.com/zh-cn/troubleshooting/modem-no-internet/)。

## 检查 5：可以访问，但没有数据

如果 `ping <drone-vpn-ip>` 成功：

- **网页界面**：打开 `http://<drone-vpn-ip>/`。实时预览还需要 VPN 上可以访问端口 8889。
- **遥测和视频**：这些数据是从无人机*发送到* **地面控制站 → 目标IP或主机** 中设置的地址的。该地址必须是笔记本电脑的 VPN 地址，而不是无人机的地址，也不是笔记本电脑的 Wi-Fi 地址。然后请参阅 [没有遥测](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-telemetry-in-gcs/) 或 [没有视频](https://docs.uavmatrix.com/zh-cn/troubleshooting/no-video-in-gcs/)。
- **速度慢但可用**：Tailscale 显示正在使用 **Relay**。中继连接可以正常工作，但会增加延迟。某些蜂窝网络不允许直连，因此在该运营商网络下，中继可能是您能获得的最佳连接。

## 仍然无法访问？

选中 **VPN Manager** 后，[下载日志](https://docs.uavmatrix.com/zh-cn/troubleshooting/collect-logs/)，并发送至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**，同时附上无人机和笔记本电脑上 `zerotier-cli listnetworks` 或 `tailscale status` 的输出。

相关链接：[VPN 设置](https://docs.uavmatrix.com/zh-cn/uavcast-pro/connectivity/vpn/) · [Fleet Manager 网络](https://docs.uavmatrix.com/zh-cn/fleet-manager/network/)

Source: https://docs.uavmatrix.com/zh-cn/troubleshooting/vpn-cant-reach-drone/
