# 注入器

> 使用 UAVcast-Pro 注入器，通过 HTTP、UDP 或串口将脚本、Arduino 或 LTE 调制解调器中的传感器读数推送到 MAVLink 数据流中，以便 QGC 和 Mission Planner 查看这些数据。

注入器会将 UAVcast-Pro 外部的数据（例如 Python 脚本、Arduino 或网络上的传感器）作为 `NAMED_VALUE_FLOAT`（或 `NAMED_VALUE_INT`）消息送入 MAVLink 数据流。每个已连接的地面站都会将这些数值作为普通遥测接收：Mission Planner 会在 **Status** 标签页中显示它们，QGroundControl 则在 MAVLink Inspector 中显示。它们也会自动出现在[数据流](https://docs.uavmatrix.com/zh-cn/uavcast-pro/data-streams/)仪表板中。请打开 **飞行控制器 → 注入器**。

典型用途：伴随计算机上的辐射、气体或气象传感器，用于链路监控的 LTE 信号值（RSRP、SINR），或您自己的脚本计算出的数值。

## 选择传输方式

| 类型 | 数据到达方式 | 最适用于 |
| --- | --- | --- |
| **HTTP** | 向带有密钥令牌的唯一 URL 发送 JSON（POST） | 最简单。任何能发出 HTTP 请求的程序。 |
| **UDP** | 发送到无人机端口的数据包，格式为 `NAME=VALUE` 行或 JSON | 开销最低，适用于可信的本地网络。无身份验证。 |
| **串口** | 从 `/dev/tty*` 设备读取的行 | 有线连接的传感器，例如通过 USB 连接的 Arduino。 |

创建注入器后无法更改其类型。

## 创建注入器

1. 进入 **飞行控制器 → 注入器**，然后选择 **添加注入器**。
2. 输入 **名称**（仅在界面中显示），并选择 **输入类型**。
3. 保持 **MAVLink sysid** 为 `1`，使这些数值与飞行控制器属于同一架飞行器；除非另有需要，**MAVLink compid** 保持为 `194`（用户载荷）。
4. 可选：设置 **名称前缀**，例如 `BAL_`，这样 `RAD1` 将以 `BAL_RAD1` 发送。
5. 对于 UDP 或串口，填写监听器设置，然后选择 **创建**。
6. 在注入器的卡片上选择 **发送测试信号**，发送一个数值，并在地面站中进行检查。

![注入器标签页，显示尚无注入器、典型用途、HTTP、UDP 和串口三种传输方式，以及添加注入器按钮](https://docs.uavmatrix.com/zh-cn/img/screenshots/uavcast-pro/flight-controller--injectors.webp)

*首个注入器创建之前的 飞行控制器 → 注入器 页面：典型用途和三种传输方式。*

## 发送数据

**HTTP**

创建 HTTP 注入器后，其卡片会显示 **HTTP 端点**。URL 的格式为 `http://<drone-ip>/api/inject/<token>`，并通过常规 Web 界面端口访问。选择 **复制 URL** 即可复制。

```bash
curl -X POST http://192.168.1.50/api/inject/<token> \
  -H "Content-Type: application/json" \
  -d '{"name":"RAD1","value":0.077}'
```

```bash
curl -X POST http://192.168.1.50/api/inject/<token> \
  -H "Content-Type: application/json" \
  -d '{"samples":[{"name":"TEMP","value":21.4},{"name":"HUM","value":48}]}'
```

响应会统计处理结果：`{"accepted":2,"rateLimited":0,"rejected":0}`。令牌是唯一的保护措施。如果令牌泄露，请选择 **轮换令牌**，并更新您的客户端。

**UDP**

注入器默认监听 **端口** `14600` 和 **绑定地址** `0.0.0.0`（所有接口）。如果发送方运行在无人机本机上，请使用 `127.0.0.1`。

```bash
echo "RAD1=0.077" | nc -u -w1 192.168.1.50 14600
```

```python
import json, socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.sendto(json.dumps({"name": "RAD1", "value": 0.077}).encode(), ("192.168.1.50", 14600))
```

**串口**

注入器会以 **设备路径**（默认 `/dev/ttyUSB0`）和 **波特率**（默认 `115200`）读取以换行符结尾的行。每行为一个样本：Key=Value 协议为 `NAME=VALUE`，或为 JSON 对象。如果设备被拔出，它会自动重新连接。

```cpp
void setup() { Serial.begin(115200); }
void loop() {
  Serial.print("LIGHT=");
  Serial.println(analogRead(A0));
  delay(200);
}
```

> **MAVLink 名称最长为 10 个字符**
>
> `NAMED_VALUE_FLOAT` 名称限制为 10 个字符，包括前缀。请将前缀保持简短（最多 8 个字符），并使名称紧凑。

## 设置参考

| 设置 | 默认值 | 取值 | 说明 |
| --- | --- | --- | --- |
| **名称** | 空 | 文本 | 仅用于界面中的标签。 |
| **输入类型** | **HTTP** | **HTTP**、**UDP**、**串口** | 创建后不可更改。 |
| **启用** | 开 | 开、关 | 关闭后保留配置，但停止监听器。 |
| **MAVLink sysid** | `1` | 1–255 | 与飞行控制器一致时，可将这些数值归入同一架飞行器。 |
| **MAVLink compid** | `194` | 0–255 | 194 常用于用户载荷传感器。 |
| **名称前缀** | 空 | 最多 8 个 ASCII 字符 | 添加到每个信号名称之前。 |
| **速率限制（每信号 Hz）** | `10` | 每秒样本数 | 超出的样本会被丢弃，并计入 **已限速**。可防止失控的发送方占满链路。 |
| **协议**（UDP、串口） | **Key=Value（按行分隔）** | **Key=Value（按行分隔）**、**JSON**（`{name, value}`） |  |
| **端口**（UDP） | `14600` | 1–65535 |  |
| **绑定地址**（UDP） | `0.0.0.0` | IP 地址 | `127.0.0.1` 仅接受本地发送方。 |
| **设备路径**（串口） | `/dev/ttyUSB0` | 设备路径 | 运行 `ls /dev/tty*` 查找设备。 |
| **波特率**（串口） | `115200` |  | 必须与发送方一致。 |

每张卡片会显示 **已接受**、**已限速** 和 **已拒绝** 计数器，便于您查看数据是否到达，以及数据是否有效。

注入器运行在 UAVcast-Pro 服务内部，并在开机时启动，因此即使未打开 Web 界面，数值也会持续流动。

Source: https://docs.uavmatrix.com/zh-cn/uavcast-pro/flight-controller/injectors/
