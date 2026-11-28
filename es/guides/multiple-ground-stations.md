# Transmite a varias estaciones de control en tierra

> Envía telemetría y video en vivo desde un dron a varias estaciones de QGroundControl o Mission Planner con UAVcast-Pro, con observadores de solo lectura.

Un dron, varias pantallas: un piloto en Mission Planner, un operador de carga útil en QGroundControl, un supervisor que observa desde la oficina. UAVcast-Pro envía telemetría y video a cada destino que añadas, cada uno con sus propios interruptores.

## Cómo funciona

Cada entrada en **Control en Tierra** es un destino: una dirección IPv4 más un puerto de telemetría y un puerto de video. UAVcast-Pro envía:

- telemetría MAVLink por UDP al **Puerto de Telemetría** (predeterminado 14550) cuando **Habilitar Telemetría** está activo,
- video H.264 por RTP/UDP al **Puerto de Video** (predeterminado 5600) cuando **Habilitar Video** está activo,
- nada en absoluto cuando **Habilitar Endpoint** está desactivado.

Los comandos de cada destino llegan al controlador de vuelo, salvo que ese destino sea **Read Only**.

## 1. Añade un destino por estación

1. Abre **Control en Tierra** y presiona **Agregar Destino** una vez por cada estación.
2. Asigna a cada uno un **Nombre** que reconozcas en el campo, por ejemplo *Piloto – Mission Planner* y *Carga útil – QGC*.
3. Ingresa la dirección IPv4 de cada computadora en **IP o Host de Destino**. Por 4G, usa direcciones VPN.
4. Activa **Habilitar Telemetría** y **Habilitar Video** donde se necesiten. Una estación que solo necesita telemetría ahorra ancho de banda con el video desactivado.

![Página de Control en Tierra con dos tarjetas de destino y el botón Agregar Destino](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/ground-control.webp)

*Control en Tierra con dos tarjetas de destino. Agregar Destino añade una tarjeta por estación.*

## 2. Haz que los observadores sean de solo lectura

Para quien deba observar pero nunca volar, activa **Read Only** en su destino. La estación sigue recibiendo telemetría en vivo, pero no puede cambiar nada en el vehículo: los comandos, cambios de modo, armado, escritura de parámetros, escritura de misiones y sobrescrituras de RC desde ella quedan bloqueados. Esto se aplica a partir de UAVcast-Pro 6.5.3; en versiones anteriores, Read Only no bloquea la escritura de parámetros. El software de la estación de control en tierra puede mostrar advertencias en este modo, porque algunas de sus solicitudes (como descargar parámetros o la misión) quedan sin respuesta.

> **Dos pilotos, un dron**
>
> Sin Read Only, cada estación puede dar órdenes al dron. Acuerda quién vuela y haz que todas las demás estaciones sean de solo lectura.

## 3. Dos estaciones en una misma computadora

Dos programas en una misma computadora no pueden escuchar en el mismo puerto. Añade dos destinos con la misma IP y puertos distintos, por ejemplo:

| Destino | Puerto de Telemetría | Puerto de Video |
| --- | --- | --- |
| Mission Planner | 14550 | 5600 |
| QGroundControl | 14551 | 5603 |

Luego configura el segundo programa para escuchar en esos puertos (en QGroundControl, añade un enlace de comunicación UDP en el 14551 y establece el puerto UDP de video en el 5603).

Separa los puertos de video **de 3 en 3** (5600, 5603, 5606 …). Cada destino usa su puerto de video, más el puerto de video + 1 para la segunda cámara en [transmisión doble](https://docs.uavmatrix.com/es/guides/dual-camera-rc-switching/) y el puerto de video + 2 para el [audio](https://docs.uavmatrix.com/es/uavcast-pro/camera/audio/). Si los puertos están más cerca, chocan en cuanto activas la transmisión doble o el audio.

## 4. Ten en cuenta el enlace de subida

Cada destino de video es una copia separada del stream. Tres destinos de video a 1500 kbps necesitan alrededor de 4,5 Mbit/s de subida desde el dron. Por 4G, envía video solo a las estaciones que lo necesitan, o reduce la tasa de bits en **Cámara → Ajustes de cámara**. **Tablero → Tráfico de Red** muestra lo que el módem envía realmente.

## 5. Comprueba que cada estación recibe datos

En **Tablero**, la fila **Ground station** muestra *Sending to n · x packets/s*. La **Comprobación de conexión** en **Controlador de Vuelo → Conexión** enumera cada salida a estación de control en tierra y cualquier destino omitido por tener una dirección no válida.

## Con Fleet Manager

En Fleet Manager, las estaciones de control en tierra se unen a la VPN de la organización y las conectas con los drones mediante **Stream Bindings** en la página **Network**. Cada dron adicional vinculado a la misma estación de control en tierra obtiene su propio bloque de puertos. Consulta [Vinculaciones de stream](https://docs.uavmatrix.com/es/fleet-manager/network/stream-bindings/).

Source: https://docs.uavmatrix.com/es/guides/multiple-ground-stations/
