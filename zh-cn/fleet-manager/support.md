# 支持与 FleetBot

> 在 Fleet Manager 中获取帮助：向 FleetBot 助手提问、提交附带截图的支持工单、查看工单状态并检查系统状态。

在 Fleet Manager 的每个页面上都可以快速获取帮助：右下角的圆形支持按钮会打开一个面板，其中包含两个标签页：**FleetBot** 和 **Ticket**。

## 向 FleetBot 提问

**FleetBot** 是一款 AI 助手，熟悉 Fleet Manager 的页面和功能。您可以提出诸如 "How do I connect a second ground station?" 之类的问题，它会附上相关页面的链接作为回答。

![支持面板的 FleetBot 标签页，显示一个问题及其回答，回答中包含指向 Network 页面的链接](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/support-bubble--fleetbot.webp)

*支持面板的 FleetBot 标签页，回答如何添加流绑定，并附有 Network → Stream Bindings 的链接。*

- 在 **Ask FleetBot...** 中输入问题并发送。
- 每个对话最多可包含 20 条消息，每条消息最多 2,000 个字符。如果达到上限，请开始新的对话。
- FleetBot 的回答可能有误，尤其是涉及数字时。如果其回答与本文档不一致，请以本文档为准。

> **FleetBot 能看到什么**
>
> FleetBot 只接收您在聊天中输入的内容，不会接收无人机的数据。消息会发送至 Anthropic 的 Claude AI 模型以生成回答。请勿粘贴认证密钥、密码或许可证密钥。

## 提交支持工单

1. 打开支持面板，选择 **Ticket** 标签页。
2. 选择 **Category**：**Bug Report**、**Feature Request**、**General Inquiry** 或 **Question**。
3. 输入 **Subject**（5 至 200 个字符）和 **Message**（20 至 5,000 个字符）。请说明涉及的无人机、您的操作以及预期结果。
4. 可选：添加截图。**Capture** 会通过浏览器截取屏幕（由您选择窗口），**Upload** 可附加不超过 5 MB 的图片文件。
5. 选择 **Submit Ticket**。

![支持面板的 Ticket 标签页，包含类别、主题、消息和截图字段](https://docs.uavmatrix.com/zh-cn/img/screenshots/fleet-manager/support-bubble--ticket.webp)

*Ticket 标签页已填写为 Bug Report，内容为无人机卡在 PAIRING 状态，并可使用 Capture 或 Upload 添加可选截图。*

您会获得一个工单编号，例如 `SUP-7KQ2XA`。Fleet Manager 还会记录您当时所在的页面和浏览器信息，以便支持人员复现问题。

> **无人机问题请附上日志**
>
> 对于无人机端的问题，日志最有帮助。工单仅接受图片，因此请将 UAVcast-Pro 日志包（ZIP 文件，参见[收集日志](https://docs.uavmatrix.com/zh-cn/troubleshooting/collect-logs/)）或无人机 **Logs** 标签页中的 **Download logs** 文件发送至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**，并在邮件主题中附上您的工单编号（例如 `SUP-7KQ2XA`）。

## 跟踪工单

**Settings → Support** 会列出您的工单及其状态：**Open**、**In Progress**、**Resolved** 或 **Closed**。打开某个工单即可查看详细信息和附带的截图。问题解决后，请选择 **Close Ticket**。您也可以在此处使用 **Create Support Ticket** 创建工单。

## 隐藏支持按钮

选择面板标题栏中的隐藏图标（**Hide support bubble**），或在 **Settings → Support** 中关闭 **Support Chat Bubble**。如需重新显示，请在同一位置开启。您始终可以通过 **Settings → Support** 提交工单。

## 其他获取帮助的方式

- **系统状态：** **System → Status** 显示当前及过往的事件。如果大量无人机同时离线，请先查看此处。参见[状态指示器与通知](https://docs.uavmatrix.com/zh-cn/fleet-manager/alerts-and-status/#status-page)。
- **电子邮件：** [support@uavmatrix.com](mailto:support@uavmatrix.com)。
- **社区：** [UAVmatrix Discord](https://discord.gg/xwqMTXh)。

Source: https://docs.uavmatrix.com/zh-cn/fleet-manager/support/
