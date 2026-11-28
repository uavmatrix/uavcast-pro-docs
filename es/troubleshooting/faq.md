# Preguntas frecuentes

> Respuestas breves sobre el hardware de UAVcast-Pro, los módems LTE, las estaciones de control en tierra, los puertos, el uso sin internet, la licencia, las actualizaciones, la grabación y el emparejamiento con Fleet Manager.

## Hardware y configuración

### ¿Necesito un módem LTE?

No. UAVcast-Pro funciona con cualquier conexión IP: 4G/LTE, Wi-Fi o Ethernet. Un módem es lo que te permite volar fuera del alcance del Wi-Fi. Muchos operadores hacen pruebas por Wi-Fi y cambian al módem antes del vuelo, en **Redes → Prioridad de Red → Prioridad Módem (Modo Exterior)**.

### ¿Qué computadoras pueden ejecutar UAVcast-Pro?

Cualquier placa o PC Linux de 64 bits con arm64 o amd64 que ejecute Raspberry Pi OS, Debian o Ubuntu: Raspberry Pi Zero 2 W, 3, 4 y 5, NVIDIA Jetson, Orange Pi y mini PC x86. Una Raspberry Pi 4 o 5 es la opción cómoda para video. Consulta [Hardware compatible](https://docs.uavmatrix.com/es/reference/supported-hardware/).

### ¿Qué controladores de vuelo son compatibles?

Cualquier controlador de vuelo que hable MAVLink por USB o por un puerto TELEM: ArduPilot (Copter, Plane, Rover, VTOL y los demás tipos de vehículo) y PX4, en placas de las familias Pixhawk y Cube, Matek y similares. La telemetría, el video y el enrutamiento hacia las estaciones de control en tierra funcionan con cualquiera de ellos. Los botones de modo de vuelo en el Mapa de Vuelo y en Fleet Manager usan los nombres de modo de ArduPilot; con PX4, cambia los modos desde tu estación de control en tierra.

### ¿Puedo conectarme por el puerto USB del controlador de vuelo?

Sí, y es la opción más sencilla: conéctalo y deja **Puerto** en **Automático**. Usa un cable corto que transmita datos. Consulta [Sin heartbeat de MAVLink](https://docs.uavmatrix.com/es/troubleshooting/no-mavlink-heartbeat/) si no se encuentra.

## Estaciones de control en tierra y red

### ¿Qué estaciones de control en tierra funcionan?

Cualquier software que reciba MAVLink por UDP, incluidos QGroundControl, Mission Planner y MAVProxy. El video es H.264 sobre RTP/UDP, que QGroundControl y Mission Planner reproducen directamente. GStreamer y VLC también funcionan: consulta [Estaciones de control en tierra y video](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/).

### ¿Pueden ver varias estaciones de control en tierra al mismo tiempo?

Sí. Añade un destino por computadora en **Control en Tierra**, cada uno con sus propios interruptores para video y telemetría. Usa **Solo lectura** para las estaciones que solo deban observar. Consulta [Transmitir a varias estaciones de control en tierra](https://docs.uavmatrix.com/es/guides/multiple-ground-stations/).

### ¿Qué puertos usa UAVcast-Pro?

De forma predeterminada, la telemetría va a UDP **14550** y el video a UDP **5600** en cada estación de control en tierra; una segunda cámara usa el puerto de video + 1, y el audio, el puerto de video + 2. La interfaz web está en el puerto **80**. La lista completa está en [Puertos y protocolos](https://docs.uavmatrix.com/es/reference/ports-and-protocols/).

### ¿Necesito reenvío de puertos en mi router?

No. Por 4G, pon el dron y la estación de control en tierra en la misma VPN: la VPN de Fleet Manager (incluida con tu licencia), o tu propia red de Tailscale o ZeroTier. El dron envía telemetría y video a la dirección VPN de la estación de control en tierra. Consulta [Volar más allá de la línea de visión por 4G](https://docs.uavmatrix.com/es/guides/bvlos-4g/).

### ¿Todavía puedo conectarme por TCP 5760?

No. Desde la v6.5.0, TCP 5760 está cerrado para que solo reciban datos las estaciones de control en tierra que añadas. Añade tu computadora como destino y usa UDP.

### ¿Funciona sin internet?

Sí. El enlace con el controlador de vuelo, la telemetría y el video comienzan al encender el equipo sin esperar a internet, así que funcionan una red Wi-Fi local o un enlace de radio. Activar la licencia requiere internet una vez. Después, un fallo en la verificación de la licencia por una conexión perdida no desactiva el dispositivo.

## Licencia y cuenta

> Necesitas una licencia de UAVcast-Pro para activar el dron. Cómprala en la tienda de UAVmatrix.
>
> [Comprar UAVcast-Pro](https://uavmatrix.com/es/checkout) · [Ver planes y precios](https://uavmatrix.com/es/products)

### ¿Mi licencia no se activa? ¿Qué hago?

Consulta [La licencia no se activa](https://docs.uavmatrix.com/es/troubleshooting/license-activation-failed/). Las causas habituales son una clave mal escrita, no tener espacios libres de dispositivos o no tener internet en el dispositivo.

### ¿Qué pasa cuando vence mi licencia?

UAVcast-Pro queda bloqueado: la interfaz web solo abre **Aplicación**, y la telemetría, el video y los demás servicios se detienen hasta que renueves. Renueva en la tienda antes de la fecha de vencimiento y, después, valida la clave en el dron. Consulta [Cuando una licencia vence](https://docs.uavmatrix.com/es/get-started/license-activation/#when-a-license-expires).

### ¿Fleet Manager está incluido con mi licencia?

Sí. Fleet Manager, incluida su VPN, está incluido con tu licencia de UAVcast-Pro sin costo adicional.

### Reemplacé la tarjeta SD. ¿Necesito una licencia nueva?

No, pero el dispositivo cuenta como nuevo y ocupa un espacio. Desregistra la entrada anterior en **Aplicación → Gestor de Licencias → Dispositivos Activados**.

### ¿Fleet Manager es un producto aparte?

Fleet Manager es el panel web de UAVmatrix para administrar muchos drones en [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/). Está incluido con tu licencia de UAVcast-Pro. Inicias sesión con tu cuenta de uavmatrix.com, y cada dron que emparejes necesita una licencia activa de UAVcast-Pro que sea propiedad de un miembro de tu organización. Consulta [Fleet Manager](https://docs.uavmatrix.com/es/fleet-manager/).

### ¿Cómo emparejo un dron con Fleet Manager?

En UAVcast-Pro, abre **Fleet Management** y pulsa **Connect to Fleet Manager**. Introduce el código de 8 dígitos en Fleet Manager, en **Fleet → Pair Device**, dentro de los 5 minutos. Consulta [Empareja tu primer UAV](https://docs.uavmatrix.com/es/fleet-manager/pair-uav/) y, si falla, [Código de emparejamiento no válido o vencido](https://docs.uavmatrix.com/es/troubleshooting/pairing-code-invalid/).

## Actualizaciones y datos

### ¿Cómo actualizo UAVcast-Pro?

Ve a **Aplicación → Actualizar Aplicación**, elige una versión en **Selecciona la versión para actualizar** y pulsa **Actualizar Ahora**. Si la tarjeta muestra **Reinicio Pendiente**, pulsa **Reiniciar Ahora**. También puedes ejecutar el instalador de nuevo.

### ¿Puedo importar ajustes desde la v4 o la v5?

No. La v6 usa una base de datos nueva, así que configúrala de nuevo después de una instalación limpia. Dentro de la v6, usa **Aplicación → Base de Datos → Respaldar Base de Datos** y **Restaurar Base de Datos** para trasladar ajustes entre instalaciones.

### ¿UAVcast-Pro puede grabar video?

Sí, desde la v6.5.1. Graba la cámara 1 y la 2 desde el mapa de vuelo, o automáticamente mientras el dron está armado, junto con un registro de telemetría. Consulta [Graba vuelos y revísalos](https://docs.uavmatrix.com/es/guides/recording-flight-review/).

### ¿Dónde guarda UAVcast-Pro sus archivos?

En `/opt/uavcast-pro`: la base de datos `uavcast.db`, `logs/`, `recordings/` y `missions/`. Consulta [Servicios y archivos](https://docs.uavmatrix.com/es/reference/services-and-files/).

### Olvidé la contraseña de administrador.

La interfaz web no tiene restablecimiento de contraseña. Otro administrador puede eliminar tu usuario en **Usuarios** y volver a crearlo. Si eras el único administrador, la recuperación no es autoservicio: contacta a **[support@uavmatrix.com](mailto:support@uavmatrix.com)** con los datos indicados en [Olvidé la contraseña de administrador](https://docs.uavmatrix.com/es/uavcast-pro/users/#forgot-the-admin-password).

### ¿Dónde obtengo ayuda?

Recopila los registros como se describe en [Recopilar registros para soporte](https://docs.uavmatrix.com/es/troubleshooting/collect-logs/) y envía un correo a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, o pregunta en el [Discord de UAVmatrix](https://discord.gg/xwqMTXh).

Source: https://docs.uavmatrix.com/es/troubleshooting/faq/
