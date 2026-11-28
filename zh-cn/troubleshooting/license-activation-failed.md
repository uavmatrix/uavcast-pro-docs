# UAVcast-Pro 许可证无法激活

> 解决 UAVcast-Pro 中的 Invalid license key、Maximum activations reached 和 License activation failed：检查密钥、互联网、可用设备名额和更换过的硬件。

您在 **应用程序 → 许可证管理器** 中输入密钥，点击 **验证**，却收到错误提示，而不是 **许可证激活成功**。在本设备上激活许可证之前，每个页面都会将您返回 **应用程序**。

> 激活无人机需要 UAVcast-Pro 许可证。请在 UAVmatrix 商店购买。
>
> [购买 UAVcast-Pro](https://uavmatrix.com/zh/checkout) · [查看套餐和价格](https://uavmatrix.com/zh/products)

![应用程序页面的许可证管理器，包含许可证密钥输入框、许可证详情以及已激活设备表格](https://docs.uavmatrix.com/zh-cn/img/screenshots/uavcast-pro/application--license-activated.webp)

*已激活设备上的应用程序 → 许可证管理器：许可证详情和已激活设备表格，其中本设备标记为 **当前**。*

| 您会看到 | 可能原因 | 从此处开始 |
| --- | --- | --- |
| Invalid license key，或 Invalid license key format | 输入错误、多余空格，或使用了其他产品的密钥 | [检查 1](https://docs.uavmatrix.com/zh-cn/troubleshooting/license-activation-failed/#check-1) |
| Maximum activations reached | 该密钥上的所有设备名额均已被占用 | [检查 2](https://docs.uavmatrix.com/zh-cn/troubleshooting/license-activation-failed/#check-2) |
| 之前可以使用，但更换 SD 卡或主板后再次要求激活 | 该设备被视为新设备 | [检查 3](https://docs.uavmatrix.com/zh-cn/troubleshooting/license-activation-failed/#check-3) |
| License activation failed，或毫无反应 | 没有互联网连接，或设备时间错误 | [检查 4](https://docs.uavmatrix.com/zh-cn/troubleshooting/license-activation-failed/#check-4) |
| Cannot connect to license service | UAVcast-Pro 后台服务未运行 | [检查 5](https://docs.uavmatrix.com/zh-cn/troubleshooting/license-activation-failed/#check-5) |
| 许可证状态：已过期 | 按时限计的许可证已到期 | [检查 6](https://docs.uavmatrix.com/zh-cn/troubleshooting/license-activation-failed/#check-6) |

## 检查 1：密钥本身

1. 从您的订单邮件或 [uavmatrix.com](https://uavmatrix.com/) 上的账户中复制密钥，然后粘贴到 **许可证密钥** 字段中。手动输入是最常见的错误来源。
2. 确保密钥前后没有空格。
3. 点击 **验证**。

## 检查 2：释放一个设备名额

每个许可证允许的设备数量是固定的（**允许设备数**）。当 **剩余设备数** 为 0 时，激活会失败，并显示 **已达到最大激活数。请先停用其他设备或升级您的许可证。**

1. 在任意已激活该许可证的设备上，打开 **应用程序 → 许可证管理器 → 已激活设备**。
2. 找到您不再使用的设备，点击 **注销**。名额会立即释放。
3. 激活新设备。

如果您无法访问任何已激活的设备，请将许可证密钥发送至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**，他们可以为您释放一个名额。如需增加名额，请在 [uavmatrix.com](https://uavmatrix.com/) 上为该许可证购买更多设备。

## 检查 3：您更换了 SD 卡或主板

许可证与硬件绑定，包括存储设备。全新的 SD 卡、新的 SSD 或新的主板都会被视为新设备，并占用一个新名额。无论是在迁移之前还是之后，请按检查 2 的方法，在 **已激活设备** 中注销旧条目。**此设备上的许可证已激活** 并非错误：该密钥在此设备上已经处于激活状态。

## 检查 4：互联网访问与时间

激活会通过 HTTPS（端口 443）连接 UAVmatrix 许可证服务器，因此设备在激活时需要可用的互联网连接。

1. 在设备上运行 `curl -I https://uavmatrix.com`。您应当收到 HTTP 响应，而不是超时。
2. 如果您使用的是蜂窝调制解调器，请确认其确实有互联网连接：[已连接调制解调器但无互联网](https://docs.uavmatrix.com/zh-cn/troubleshooting/modem-no-internet/)。
3. 使用 `date` 检查日期。时钟错误的设备无法打开 HTTPS 连接。没有实时时钟的主板会在启动后从互联网设置时间，因此请在启动后等待一分钟再重试。

## 检查 5：无法连接到许可证服务

此消息表示 Web 界面无法访问 UAVcast-Pro 自身的后台服务，而不是互联网。请重启该服务后重试：

```bash
sudo systemctl restart uavcast-factory
sudo systemctl status uavcast-factory
```

如果它未能保持 **active (running)** 状态，请在选中 **许可证管理器** 的情况下[收集日志](https://docs.uavmatrix.com/zh-cn/troubleshooting/collect-logs/)。

## 检查 6：许可证已过期

许可证详情中会显示 **许可证状态：** 和 **过期日期：**。已过期的许可证必须在 [uavmatrix.com](https://uavmatrix.com/) 上续费。

> **64 位操作系统**
>
> UAVcast-Pro v6 仅可在 64 位操作系统上运行。如果您已经执行到这一步，说明操作系统没有问题；在 32 位操作系统上，安装程序会更早以 *No installation candidate* 停止。

## 仍然失败？

在选中 **许可证管理器** 的情况下[下载日志](https://docs.uavmatrix.com/zh-cn/troubleshooting/collect-logs/)。日志中包含许可证服务器返回的响应代码，例如没有可用名额时的 `code 550`。请将日志，以及您密钥的前四位和后四位字符，发送至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**。

使用 Fleet Manager 吗？许可证即使激活成功，在配对时仍可能被拒绝。请参阅[配对码无效或已过期](https://docs.uavmatrix.com/zh-cn/troubleshooting/pairing-code-invalid/)。

相关内容：[激活您的许可证](https://docs.uavmatrix.com/zh-cn/get-started/license-activation/)

Source: https://docs.uavmatrix.com/zh-cn/troubleshooting/license-activation-failed/
