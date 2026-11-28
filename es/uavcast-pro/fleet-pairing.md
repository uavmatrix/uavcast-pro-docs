# Emparejar con Fleet Manager

> Conecta un dron con UAVcast-Pro a UAVmatrix Fleet Manager: obtén el código de emparejamiento en el dron, introdúcelo en Fleet Manager, verifica la conexión, renombra el dron o desemparéjalo.

El emparejamiento conecta un dron con UAVcast-Pro a tu organización en [UAVmatrix Fleet Manager](https://docs.uavmatrix.com/es/fleet-manager/), el panel en la nube de tu flota. Una vez emparejado, el dron mantiene una conexión cifrada y autenticada por certificado con Fleet Manager, y se reconecta por sí solo tras un reinicio o un cambio de red. Empiezas el emparejamiento en el dron y lo terminas en Fleet Manager. Tarda unos dos minutos.

## Antes de empezar

- UAVcast-Pro con una **licencia activada** en el dron. El emparejamiento se rechaza sin ella (*No se encontró una licencia válida. Activa primero tu licencia.*).
- Un usuario **administrador** en UAVcast-Pro. **Fleet Management** está oculto para los usuarios de solo lectura.
- Una cuenta de Fleet Manager con el rol **Owner** o **Admin** en la organización. La licencia del dron debe pertenecer a un miembro de esa organización.
- Internet en el dron, con TCP saliente **8883** (MQTT sobre TLS) y HTTPS (443) permitidos.

## Emparejar el dron

1. En la interfaz web del dron, ve a **Gestión → Fleet Management**.
2. Selecciona **Connect to Fleet Manager**. El dron pide a Fleet Manager un código y muestra un **Pairing Code** con la cuenta regresiva **Expires in**, y luego *Waiting for Manager to confirm pairing...*.
3. En otra pestaña, inicia sesión en [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) y ve a **Fleet → Pair Device**.
4. Introduce el código del dron y confirma que los datos del dispositivo (hostname, arquitectura, versión de UAVcast-Pro) coinciden con el dron que tienes delante.
5. Completa los pasos en Fleet Manager (elección de VPN y nombre).
6. De vuelta en el dron, la página cambia a **Fleet Connection** con el estado **Connected**.

![Tarjeta Connect to Fleet Manager con el botón Connect to Fleet Manager](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/fleet--connect.webp)

*Gestión → Fleet Management en un dron que todavía no está emparejado. Al seleccionar Connect to Fleet Manager, esta tarjeta se reemplaza por el Pairing Code de 8 dígitos y su cuenta regresiva Expires in.*

> **El código es válido durante 5 minutos**
>
> Si se agota antes de introducirlo, selecciona **Connect to Fleet Manager** de nuevo para obtener un código nuevo.

La parte de Fleet Manager, incluidas las organizaciones, la VPN y lo que hay que hacer con el dron una vez que está en la flota, se describe en [Agrega tu primer dron a Fleet Manager](https://docs.uavmatrix.com/es/fleet-manager/pair-uav/).

## Después del emparejamiento

La tarjeta **Fleet Connection** muestra:

| Campo | Significado |
| --- | --- |
| **Connected** / **Disconnected** | Si el dron se está comunicando con Fleet Manager en este momento. |
| **Device Name** | El nombre que se muestra en Fleet Manager. Edítalo aquí o en Fleet Manager. *Managed by Fleet Manager* significa que el nombre se define allí. |
| **Hostname**, **Device ID** | Cómo identifica Fleet Manager a este dron. |
| **Manager URL** | La instancia de Fleet Manager con la que está emparejado el dron. |
| **Last Connected** | Cuándo llegó por última vez el dron a Fleet Manager. |

Lo que Fleet Manager recibe del dron: telemetría en vivo (posición, batería, GPS, estado de vuelo), estado del sistema de UAVcast-Pro y control remoto de servicios. Los destinos de estación de control que Fleet Manager crea mediante vinculaciones de stream aparecen en [Control en Tierra](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/) con un icono de nube.

Para unir el dron a la VPN de tu organización más adelante, usa la pestaña **Fleet Manager** de [Red Privada Virtual](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/vpn/).

## Desemparejar

1. Ve a **Gestión → Fleet Management**.
2. Selecciona **Disconnect from Fleet** y confirma.

Esto elimina el emparejamiento y los certificados del dron. Para volver a usar el dron en Fleet Manager, empareja de nuevo con un código nuevo. Elimina también el dron de tu flota en Fleet Manager, para que no quede listado como sin conexión.

## Resolución de problemas

| Síntoma | Qué revisar |
| --- | --- |
| *No se encontró una licencia válida. Activa primero tu licencia.* | Activa la licencia en **Aplicación**. Consulta [Licencia y activación](https://docs.uavmatrix.com/es/get-started/license-activation/). |
| Fleet Manager indica que la licencia no pertenece a un miembro de la organización | La licencia se compró con un correo que no es miembro de la organización. Agrega ese correo en Fleet Manager (consulta [Licencias](https://docs.uavmatrix.com/es/fleet-manager/licenses/)) o invita esa cuenta a la organización. |
| El código expiró | Selecciona **Connect to Fleet Manager** de nuevo. |
| Emparejado, pero el estado sigue en **Disconnected** | El dron no puede llegar a Fleet Manager por el TCP 8883. Algunas redes lo bloquean. Revisa la conexión a internet y el firewall del dron. |

Más ayuda: [Código de emparejamiento no válido](https://docs.uavmatrix.com/es/troubleshooting/pairing-code-invalid/) y [Dron sin conexión en Fleet Manager](https://docs.uavmatrix.com/es/troubleshooting/drone-offline-fleet-manager/).

Source: https://docs.uavmatrix.com/es/uavcast-pro/fleet-pairing/
