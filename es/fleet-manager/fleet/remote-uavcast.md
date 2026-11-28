# Abrir UAVcast-Pro de forma remota

> Accede a la configuración de UAVcast-Pro de un dron desde cualquier lugar a través de Fleet Manager, ya sea mediante el proxy integrado sin VPN o directamente por la VPN de tu organización.

Puedes cambiar la configuración de UAVcast-Pro de un dron (cámara, módem, estaciones de control en tierra, etc.) sin estar en la misma red que el dron. En la [página del dron](https://docs.uavmatrix.com/es/fleet-manager/fleet/uav-details/), la tarjeta **UAVcast Application** tiene dos botones:

| Botón | Cómo se conecta | Úsalo para |
| --- | --- | --- |
| **Open via Proxy** | A través de la conexión cifrada de Fleet Manager con el dron. Funciona con cualquier dron en línea, sin VPN. | Cambios de configuración y gestión básica. |
| **Open via VPN** | Abre `http://<drone VPN address>` directamente. Solo se muestra cuando el dron está en la VPN de tu organización, y tu computadora también debe estar en esa VPN. | Todo, incluido el mapa de vuelo en vivo y la telemetría. |

El proxy es para Owners y Admins. Fleet Manager lo rechaza a los Viewers con **Access denied. Only administrators can access UAVcast remotely.**

## Abrir mediante proxy

1. En la página del dron, selecciona **Open via Proxy**.
2. Lee el diálogo **Remote UAVcast Access via Proxy** y selecciona **Continue**.
3. UAVcast-Pro se abre en una pestaña nueva, en su página **Application**. Inicia sesión con el usuario de UAVcast-Pro del dron: el proxy no transmite tu inicio de sesión de Fleet Manager. (Un dron que todavía no tiene usuarios de UAVcast-Pro se abre sin inicio de sesión.)

![Diálogo Remote UAVcast Access via Proxy que enumera las funciones no disponibles](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/drone-detail--proxy-warning.webp)

*Diálogo Remote UAVcast Access via Proxy, que enumera las funciones de WebSocket no disponibles: telemetría en vivo, estado de la conexión MAVLink y el mapa de vuelo.*

El proxy transporta solicitudes de página normales, no conexiones en vivo. **WebSocket features unavailable** significa que estas funciones no funcionan a través de él:

- telemetría en vivo y actualizaciones en tiempo real
- estado de la conexión MAVLink
- el mapa de vuelo

Cada solicitud tiene 30 segundos para completarse. En un enlace lento, las páginas grandes pueden agotar el tiempo con **Request timed out. UAVcast may be unreachable.** Si el dron está sin conexión, verás **Drone is offline. UAVcast interface is not available.**

> **Ten cuidado con la configuración de red a través del proxy**
>
> El proxy funciona sobre la propia conexión de internet del dron. Si cambias el módem, la prioridad de red o la configuración de la VPN y el dron pierde internet, el proxy también deja de funcionar, y necesitarás acceso local para repararlo.

## Abrir mediante VPN

Conecta tu computadora a la VPN de la organización de la misma forma que una estación de control en tierra (consulta [Conectar una estación de control en tierra](https://docs.uavmatrix.com/es/fleet-manager/connect-gcs/)). Después, **Open via VPN** abre la interfaz del dron directamente, con todas las funciones en vivo. Es la mejor opción para cualquier cosa más allá de cambiar un ajuste.

Source: https://docs.uavmatrix.com/es/fleet-manager/fleet/remote-uavcast/
