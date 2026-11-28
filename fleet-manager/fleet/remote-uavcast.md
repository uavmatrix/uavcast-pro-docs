# Open UAVcast-Pro remotely

> Reach a drone's UAVcast-Pro settings from anywhere through Fleet Manager, either via the built-in proxy without VPN or directly over your organization's VPN.

You can change a drone's UAVcast-Pro settings (camera, modem, ground stations and so on) without being on the same network as the drone. On the [UAV page](https://docs.uavmatrix.com/fleet-manager/fleet/uav-details/), the **UAVcast Application** card has two buttons:

| Button | How it connects | Use it for |
| --- | --- | --- |
| **Open via Proxy** | Through Fleet Manager's encrypted connection to the drone. Works for any online drone, no VPN needed. | Configuration changes and basic management. |
| **Open via VPN** | Opens `http://<drone VPN address>` directly. Shown only when the drone is on your organization's VPN, and your computer must be on that VPN too. | Everything, including the live flight map and telemetry. |

The proxy is for Owners and Admins. Fleet Manager refuses it for Viewers with **Access denied. Only administrators can access UAVcast remotely.**

## Open via Proxy

1. On the UAV page, select **Open via Proxy**.
2. Read the **Remote UAVcast Access via Proxy** dialog and select **Continue**.
3. UAVcast-Pro opens in a new tab on its **Application** page. Sign in with the drone's UAVcast-Pro user: the proxy doesn't pass on your Fleet Manager login. (A drone that has no UAVcast-Pro users yet opens without a login.)

![Remote UAVcast Access via Proxy dialog listing features that are unavailable](https://docs.uavmatrix.com/img/screenshots/fleet-manager/drone-detail--proxy-warning.webp)

*Remote UAVcast Access via Proxy dialog, listing WebSocket features unavailable: live telemetry, MAVLink connection status and the flight map.*

The proxy carries ordinary page requests, not live connections. **WebSocket features unavailable** means these don't work through it:

- live telemetry and real-time updates
- MAVLink connection status
- the flight map

Each request has 30 seconds to complete. On a slow link, large pages can time out with **Request timed out. UAVcast may be unreachable.** If the drone is offline you get **Drone is offline. UAVcast interface is not available.**

> **Be careful with network settings through the proxy**
>
> The proxy runs over the drone's own internet connection. If you change the modem, network priority or VPN settings and the drone loses internet, the proxy goes with it, and you'll need local access to fix it.

## Open via VPN

Join your computer to the organization's VPN the same way as a ground station (see [Connect a ground station](https://docs.uavmatrix.com/fleet-manager/connect-gcs/)). Then **Open via VPN** opens the drone's interface directly, with all live features. It is the better choice for anything beyond changing a setting.

Source: https://docs.uavmatrix.com/fleet-manager/fleet/remote-uavcast/
