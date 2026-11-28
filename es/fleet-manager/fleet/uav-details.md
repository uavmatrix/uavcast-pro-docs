# Detalles del dron

> La página de un dron en Fleet Manager muestra telemetría en vivo y el estado de la computadora de a bordo, una terminal SSH y el registro MAVLink, y permite reiniciar o eliminar.

Cada dron tiene su propia página. Ábrela con **Details** en una tarjeta de [Fleet](https://docs.uavmatrix.com/es/fleet-manager/fleet/), desde el Dashboard, o con **View UAV** al final del emparejamiento.

El encabezado muestra el nombre, una insignia de estado en vivo, **Re-pair required** si es necesario, la organización, el **ID** y **Last seen**. Los Owners y Admins también ven **Rename** y **Remove**.

La página tiene cuatro pestañas: **Overview**, **Terminal**, **Logs** y **Actions**.

## Resumen

Datos en vivo, enviados al navegador a medida que llegan.

![Pestaña Overview de los detalles del dron con la tarjeta UAVcast Application y la tarjeta MAVLink / Flight Controller](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/drone-detail.webp)

*Pestaña Overview de un VTOL armado en AUTO: tarjeta UAVcast Application con CPU Temp, CPU, Memory y Disk, y tarjeta MAVLink / Flight Controller con batería, GPS, altitud y rumbo.*

**UAVcast Application** describe la computadora de a bordo: estado de conexión (**Connected**, **Waiting for data...** o **Connecting...**), **Hostname**, **Uptime**, **CPU Temp**, **CPU**, uso de **Memory** y **Disk**, los servicios de UAVcast-Pro y su estado, y las direcciones de red del dron (LAN y VPN). También tiene los botones para [abrir UAVcast-Pro de forma remota](https://docs.uavmatrix.com/es/fleet-manager/fleet/remote-uavcast/): **Open via Proxy** y, cuando el dron está en la VPN, **Open via VPN**.

**MAVLink / Flight Controller** muestra lo que informa el controlador de vuelo: **ARMED** o **DISARMED**, las marcas **FAILSAFE** y **GCS FAILSAFE**, **Battery**, **GPS** (satélites y fijación), **Altitude** y **Heading**.

> **Vigila la CPU Temp en días calurosos**
>
> Una Raspberry Pi que se calienta reduce su velocidad, y el video es lo primero que se afecta. Si **CPU Temp** sube durante un vuelo, consulta [Subtensión y limitación](https://docs.uavmatrix.com/es/troubleshooting/undervoltage-and-throttling/).

### Estaciones de control en tierra conectadas

Debajo de las tarjetas, **Connected Ground Stations** enumera las estaciones de control en tierra que reciben los streams de este dron, con los interruptores **Video** y **Telemetry** y los botones **Pause** / **Resume**. **Add GCS** (Owners y Admins) vincula otra estación de control en tierra a este dron. Crea la misma vinculación de stream que **Network → Stream Bindings**, con los siguientes puertos libres en esa estación de control en tierra, y envía el nuevo destino al dron. Consulta [Vinculaciones de stream](https://docs.uavmatrix.com/es/fleet-manager/network/stream-bindings/).

## Terminal

Una sesión SSH en el navegador hacia la computadora de a bordo, a través de la conexión cifrada de Fleet Manager. No se necesitan reenvío de puertos ni VPN. Solo para Owners y Admins. El dron debe estar en línea.

Selecciona **Connect** para abrir un shell. Los botones de comandos rápidos ejecutan comprobaciones comunes por ti: `df -h`, `free -h`, `top -bn1`, `ip a`, `ip r`, `uptime`, `dmesg` y `ps aux`. **Disconnect** cierra la sesión.

![Pestaña Terminal con una sesión SSH que muestra la salida de df -h y los botones de comandos rápidos](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/drone-detail--terminal.webp)

*Pestaña Terminal conectada a un dron en campo, después de ejecutar el comando rápido df -h.*

> **Es un shell en vivo en la aeronave**
>
> La terminal es un shell real en la computadora de a bordo. Reiniciar servicios o la red mientras el dron está en vuelo puede cortar la telemetría y el video. Úsala en tierra, a menos que sepas lo que hace cada comando.

## Registros

Una vista en vivo de los mensajes de telemetría y latido que el dron envía a Fleet Manager, con los filtros **Telemetry** y **Heartbeat**, **Auto-scroll**, **Pause** y borrado. **Download logs** guarda en un archivo de texto lo que está en pantalla (`mavlink-log-<id>-<time>.txt`), útil para enviarlo por correo a soporte con tu número de ticket (los tickets solo admiten una imagen).

Este es un registro en vivo, no un archivo de registros de vuelo. Fleet Manager almacena la telemetría para el [historial de vuelos](https://docs.uavmatrix.com/es/fleet-manager/map/flight-history/), pero no guarda ni exporta archivos DataFlash o `.tlog`. Estos permanecen en el controlador de vuelo y en tu software de estación de control en tierra.

![Pestaña Logs con una lista desplazable de entradas de telemetría y latido y los interruptores Telemetry, Heartbeat y Auto-scroll](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/drone-detail--logs.webp)

*Pestaña Logs transmitiendo entradas TELEMETRY y HEARTBEAT, con Telemetry, Heartbeat y Auto-scroll activados.*

## Acciones

**System Actions** tiene **Reboot** (reinicia la computadora de a bordo) y **Shutdown** (apaga la computadora de a bordo). Ambas requieren que el dron esté en línea. Para confirmar, escribes el nombre de la acción.

Estas acciones afectan solo a la computadora de a bordo, no al controlador de vuelo. Un apagado no se puede deshacer de forma remota: alguien debe volver a encender el dron.

![Pestaña Actions con la tarjeta System Actions y los botones Reboot y Shutdown](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/drone-detail--actions.webp)

*Pestaña Actions con el diálogo Confirm Reboot abierto, que pide escribir reboot para confirmar.*

## Cambiar nombre

Selecciona **Rename**, introduce el nombre nuevo en **Edit UAV** y guarda. El nombre se sincroniza con UAVcast-Pro cuando el dron está en línea.

## Eliminar

**Remove** elimina el dron de la organización y lo desempareja. Consulta [Volver a emparejar, eliminar o transferir un dron](https://docs.uavmatrix.com/es/fleet-manager/fleet/remove-or-transfer/).

Source: https://docs.uavmatrix.com/es/fleet-manager/fleet/uav-details/
