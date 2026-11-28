# Conectar el controlador de vuelo

> Conecta una Pixhawk u otro controlador de vuelo ArduPilot o PX4 a UAVcast-Pro por USB o UART, con detección automática de puerto y tasa de baudios y una comprobación de conexión en vivo.

UAVcast-Pro lee MAVLink de tu controlador de vuelo (ArduPilot, PX4 o cualquier otro autopiloto MAVLink) por USB o por UART (puerto TELEM), y lo reenvía a cada estación de control que añadas. Con **Puerto** y **Tasa de baudios** en **Automático**, la opción predeterminada, encuentra el controlador de vuelo por sí solo, recuerda lo que funcionó y se reconecta tras un reinicio, un fallo de USB o un encendido tardío. Lo encontrarás en **Controlador de Vuelo → Conexión**.

![Página Conexión del Controlador de Vuelo que muestra Conectado, la comprobación de conexión con cuatro pasos aprobados y el Inspector MAVLink](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/flight-controller.webp)

*Controlador de Vuelo → Conexión con un enlace USB a una Pixhawk.*

## Conectar por USB

1. Conecta el puerto USB del controlador de vuelo al computador de a bordo con un cable que transmita datos.
2. Ve a **Controlador de Vuelo → Conexión** y selecciona **USB** en **Tipo de enlace**.
3. Deja **Puerto** en **Automático**. Las conexiones USB no usan tasa de baudios.
4. Si el panel de estado dice **Enlace detenido**, selecciona **Conectar**.

En pocos segundos, el estado muestra **Conectado** con el tipo de vehículo y el ID del sistema, por ejemplo *Conectado a Quadrotor (sistema 1) en ArduPilot fmuv2 (ttyACM0)*.

## Conectar por un puerto TELEM (UART)

1. Conecta el puerto TELEM: **TX → RX** (del controlador de vuelo al computador de a bordo), **RX → TX** y **GND → GND**. No conectes 5 V si ambas placas tienen su propia alimentación.
2. En el controlador de vuelo, configura el puerto en MAVLink 2: para TELEM2 es `SERIAL2_PROTOCOL = 2`. Anota `SERIAL2_BAUD`.
3. En UAVcast-Pro, selecciona **UART / Serial** en **Tipo de enlace**.
4. Deja **Puerto** y **Tasa de baudios** en **Automático**, o elige el puerto (en una Raspberry Pi, el UART del GPIO está marcado como **recomendado**) y la tasa de baudios que coincida con `SERIALx_BAUD`.
5. Selecciona **Conectar** si el enlace está detenido.

Los cambios se aplican de inmediato. No necesitas reiniciar nada.

> **Tasa de baudios automática**
>
> En modo automático, UAVcast-Pro prueba 57600, 115200, 921600, 1500000, 460800, 230400 y 500000 baudios, empezando por la última tasa que funcionó. Si los heartbeats se detienen durante 20 segundos mientras siguen llegando datos (por ejemplo, después de cambiar `SERIALx_BAUD`), vuelve a buscar.

## Referencia de ajustes

| Ajuste | Predeterminado | Valores | Notas |
| --- | --- | --- | --- |
| **Enlace habilitado** | Activado | Activado, desactivado | Desactivado libera el puerto serie y detiene la telemetría a todas las estaciones de control. |
| **Tipo de enlace** | **USB** | **USB**, **UART / Serial** | Determina qué puertos busca **Automático**. |
| **Puerto** | **Automático** | **Automático**, un puerto detectado, **Ruta personalizada…** | Automático prefiere la ruta estable `/dev/serial/by-id/…` y sigue al dispositivo si cambia su número. Ruta personalizada acepta cualquier dispositivo, como `/dev/ttyAMA0`. Los puertos usados por otro programa muestran *en uso por …*. |
| **Tasa de baudios** | **Automático** | **Automático** o una tasa fija | Se ignora en USB. Debe coincidir con `SERIALx_BAUD` cuando es fija. |

## Leer el panel de estado

| Estado | Significado |
| --- | --- |
| **Conectado** | Llegan heartbeats. **Conectado durante**, **Último heartbeat** y **Reconexiones automáticas** muestran la salud del enlace. |
| **Esperando dispositivo** | El puerto no existe. El controlador de vuelo está desconectado, sin alimentación o todavía arrancando. |
| **Detectando tasa de baudios** | Probando tasas de baudios (*Probando 115200 baudios (2 de 7)*). |
| **Sin heartbeat** | El puerto está abierto, pero no llega MAVLink válido: tasa de baudios incorrecta, TX/RX invertidos o el puerto no está configurado en MAVLink. |
| **Reconectando** | El enlace se cayó y se está recuperando por sí solo. |
| **Buscando** | **Detección automática** está escaneando todos los puertos y velocidades. Puede tardar hasta un minuto. |
| **Desactivado** / **Detenido** | El enlace está apagado o detenido. Selecciona **Conectar**. |

### Comprobación de conexión

La tarjeta **Comprobación de conexión**, que se actualiza cada segundo, sigue los datos desde el cable hasta la estación de control. La primera fila que no está en verde es el problema:

1. **Controlador de vuelo conectado** (USB) o **Puerto serie disponible** (UART). *No detectado* normalmente significa un cable USB solo de carga o falta de alimentación.
2. **Señal en el cable**: llegan bytes al puerto.
3. **Datos legibles del controlador de vuelo**: los bytes se decodifican como MAVLink. *% dañado* indica un cable suelto o demasiado largo, una tierra (GND) ausente o ruido de los cables de potencia.
4. **Controlador de vuelo respondiendo**: heartbeats del vehículo.
5. **Enviando a la estación de control**: paquetes por segundo a cada destino habilitado, o *No hay estación de control configurada*.

### Detección automática

**Detección automática** pausa el enlace, escucha en todos los puertos serie a todas las tasas de baudios, guarda el puerto y la velocidad que encuentra e inicia el enlace con ellos. Úsalo cuando no sepas qué puerto o tasa de baudios usa el controlador de vuelo. **Mostrar lo que se probó** muestra cada intento.

## Panel Inspector MAVLink

La columna de la derecha muestra el estado del vehículo en vivo: conexión, **Información de Failsafe de GCS**, **Información del Vehículo** (tipo, controlador, modo de vuelo, armado), **Estado de la Batería**, **Información de GPS** y datos de vuelo. Si el panel muestra **Warning - Failsafe Disabled**, el controlador de vuelo no tiene failsafe de GCS. Habilítalo (`FS_GCS_ENABLE` en ArduPilot) antes de volar sobre un enlace celular.

## Seguridad: sin puerto de telemetría abierto

UAVcast-Pro no acepta conexiones de telemetría entrantes. El servidor TCP del puerto 5760 que normalmente abre mavlink-router está desactivado, así que solo reciben telemetría las estaciones de control que añadas en [Control en Tierra](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/), y solo mientras **Habilitar Telemetría** esté activado.

> **Si vienes de una versión anterior**
>
> Las versiones anteriores usaban `/dev/ttyACM0` a 57600 baudios por defecto y aceptaban conexiones TCP en el puerto 5760. Desde la v6.4.3, todos los dispositivos pasan a **Automático** una vez, probando primero el puerto y la tasa anteriores. Desde la v6.5.0, TCP 5760 está cerrado: agrega tu PC como estación de control y conéctate por UDP en su lugar.

## Relacionado

- [Correcciones NTRIP / RTK](https://docs.uavmatrix.com/es/uavcast-pro/flight-controller/ntrip-rtk/)
- [Inyectores: envía tus propios datos de sensores a MAVLink](https://docs.uavmatrix.com/es/uavcast-pro/flight-controller/injectors/)
- [Estaciones de control en tierra](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/)
- [Solución de problemas: sin heartbeat de MAVLink](https://docs.uavmatrix.com/es/troubleshooting/no-mavlink-heartbeat/)

Source: https://docs.uavmatrix.com/es/uavcast-pro/flight-controller/
