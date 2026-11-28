# Sin telemetría en QGroundControl o Mission Planner

> ¿El controlador de vuelo está conectado en UAVcast-Pro, pero QGroundControl o Mission Planner sigue esperando? Revisa Habilitar Telemetría, la IP, el UDP 14550 y la VPN.

UAVcast-Pro muestra el controlador de vuelo como **Conectado**, pero QGroundControl dice *Waiting for vehicle connection* o Mission Planner agota el tiempo con *No heartbeat packets received*. El dron recibe al controlador de vuelo; la telemetría simplemente no llega a tu estación de control.

Si el propio UAVcast-Pro muestra **Sin heartbeat**, corrige eso primero: [Sin heartbeat MAVLink](https://docs.uavmatrix.com/es/troubleshooting/no-mavlink-heartbeat/).

| Lo que ves | Causa probable | Empieza en |
| --- | --- | --- |
| Tablero: Ground station None set up, o Not sending | No hay destino, o Habilitar Telemetría está desactivado | [Verificación 1](https://docs.uavmatrix.com/es/troubleshooting/no-telemetry-in-gcs/#check-1) |
| El tablero dice Sending, pero la estación de control no ve nada | IP incorrecta, firewall, o la estación de control escucha en otro puerto | [Verificación 2](https://docs.uavmatrix.com/es/troubleshooting/no-telemetry-in-gcs/#check-2) |
| Funcionaba con Wi-Fi, nada por 4G | El destino es una IP local en lugar de la IP de la VPN | [Verificación 3](https://docs.uavmatrix.com/es/troubleshooting/no-telemetry-in-gcs/#check-3) |
| Se conectaba por TCP 5760 y dejó de funcionar tras una actualización | TCP 5760 se cerró en la v6.5.0 | [Verificación 4](https://docs.uavmatrix.com/es/troubleshooting/no-telemetry-in-gcs/#check-4) |
| La telemetría se muestra, pero los comandos y los cambios de modo no hacen nada | Solo lectura está activado para este destino | [Verificación 5](https://docs.uavmatrix.com/es/troubleshooting/no-telemetry-in-gcs/#check-5) |

## Comprobación 1: ¿Se está enviando telemetría?

1. Abre el **Tablero** y lee la fila **Ground station** en la tarjeta de estado.

   - **None set up**: no hay destino. Agrega uno en el paso 2.
   - **Not sending**: existe un destino, pero no sale nada.
   - **Sending to … · n packets/s**: la telemetría sale del dron. Ve a la comprobación 2.

2. Ve a **Control en Tierra**. Presiona **Agregar Destino** si la lista está vacía.

3. En la tarjeta de tu computadora, activa **Enable Endpoint** y **Habilitar Telemetría**. Tanto el video como la telemetría están desactivados en un destino nuevo.

4. Escribe la dirección IPv4 de la computadora en **IP o Host de Destino** y deja **Puerto de Telemetría** en `14550`.

![Sección de telemetría de un destino con Habilitar Telemetría activado y Solo lectura desactivado](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/ground-control--telemetry-enabled.webp)

*Control en Tierra: un destino con Habilitar Telemetría activado.*

> **Las direcciones no válidas se omiten**
>
> UAVcast-Pro solo acepta direcciones IPv4 como `192.168.1.10`. Si intentas guardar un nombre de host, aparece *Ingresa una dirección IPv4 válida, por ejemplo 192.168.1.10.* Una dirección faltante o no válida se omite del enrutador de telemetría, y la **Comprobación de conexión** de la página Controlador de Vuelo la indica.

## Comprobación 2: Asegúrate de que la estación de control escuche

UAVcast-Pro envía MAVLink por UDP a la dirección y al puerto que configuraste. La estación de control debe escuchar en ese puerto.

- **QGroundControl** escucha en UDP 14550 por defecto. Si cambiaste **Puerto de Telemetría**, agrega un enlace de comunicación UDP en el mismo puerto en **Application Settings → Comm Links**.
- **Mission Planner**: elige **UDP** en la lista desplegable de conexión, en la esquina superior derecha, presiona **Connect** y acepta el puerto `14550`.
- Solo un programa puede escuchar en un puerto a la vez. Cierra MAVProxy, un segundo QGroundControl u otra herramienta que pueda estar usando el 14550.
- Permite el UDP 14550 entrante en el firewall. Los comandos están en [Sin video, comprobación 3](https://docs.uavmatrix.com/es/troubleshooting/no-video-in-gcs/#check-3).

## Comprobación 3: Usa la dirección de la VPN sobre celular

Por 4G el dron no puede alcanzar una dirección local como `192.168.1.20`. Coloca la dirección VPN de tu computadora (VPN de Fleet Manager, Tailscale o ZeroTier) en **IP o Host de Destino**.

Desde la computadora, haz ping a la dirección VPN del dron. Si el ping falla, la VPN es el problema: consulta [VPN conectada pero no se alcanza el dron](https://docs.uavmatrix.com/es/troubleshooting/vpn-cant-reach-drone/).

## Comprobación 4: TCP 5760 ya no funciona

Desde la v6.5.0, el enrutador de telemetría no acepta conexiones TCP en el puerto 5760, así que solo reciben datos las estaciones de control que agregas y activas. Si antes conectabas Mission Planner por TCP 5760, agrega tu computadora como destino y conéctate por UDP.

## Comprobación 5: Los comandos se ignoran

Si la telemetría se muestra, pero el armado, los cambios de modo o las cargas de misión no hacen nada, revisa **Solo lectura** en ese destino. Solo lectura bloquea todo lo que cambiaría el vehículo (comandos, cambios de modo y escrituras de parámetros y de misiones), así que la estación de control solo puede observar. Esto se aplica a partir de UAVcast-Pro 6.5.3; en versiones anteriores, Read Only no bloquea la escritura de parámetros. Algunas estaciones de control muestran advertencias en este modo porque parte de sus solicitudes quedan sin respuesta.

## ¿Sigue sin funcionar?

[Descarga los registros](https://docs.uavmatrix.com/es/troubleshooting/collect-logs/) con **Mavlink Manager** seleccionado y envíalos a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**. Indica qué estación de control usas y su dirección IP.

Relacionado: [Estaciones de Control en Tierra](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/) · [Puertos y protocolos](https://docs.uavmatrix.com/es/reference/ports-and-protocols/)

Source: https://docs.uavmatrix.com/es/troubleshooting/no-telemetry-in-gcs/
