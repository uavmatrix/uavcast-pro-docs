# Mapa de Vuelo

> Sigue tu dron en vivo en el Mapa de Vuelo de UAVcast-Pro con un HUD de cabina, ventanas de video, armado y desarmado, modos de vuelo, RTL, loiter, failsafe GCS y mensajes del controlador de vuelo.

El Mapa de Vuelo es una estación de control en tierra basada en el navegador e integrada en UAVcast-Pro. Muestra el dron en el mapa con su trayectoria, la misión activa y la posición de origen, un HUD de cabina, video en vivo y los mensajes del controlador de vuelo. Puedes armar y desarmar, cambiar el modo de vuelo, iniciar una misión y activar RTL o loiter, todo detrás de cuadros de confirmación. Abre **Mapa de Vuelo → Vista del mapa**.

Está pensado para monitorear y enviar comandos sencillos desde cualquier teléfono, tableta o computadora portátil. Para la planificación completa de misiones y el trabajo con parámetros, sigue usando Mission Planner o QGroundControl junto con él.

![Mapa de Vuelo con el mapa, el HUD de cabina a la derecha y la pestaña Estado con las tarjetas de enlace, batería, controlador de vuelo, telemetría, GPS y actitud](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/flight-map.webp)

*Mapa de Vuelo → Vista del mapa en una unidad de banco sin señal GPS, por lo que el mapa no muestra la posición del dron.*

## Disposición

- **Mapa** (izquierda): el dron con su rumbo, trayectoria, marcador de origen y misión. **Sats** muestra la cantidad de satélites; **Auto-Pan** mantiene el dron centrado. Cambia las capas con el botón de capas (**Mapa de Calles**, **Satélite** y otras). Si el dron no tiene señal, verás **No GPS Lock**: *At least 4 satellites required*.
- **Barra superior**: los botones de **Grabación** (**Telemetría**, **CAM 1**, **CAM 2**), el espacio libre para grabar, la frecuencia de actualización de telemetría (**1 Hz** a **10 Hz**), la tasa de datos actual y un botón que abre el mapa en su propia ventana.
- **Cabina** (derecha): un HUD de actitud con cintas de velocidad y altitud, el modo de vuelo actual, el estado de armado, el voltaje de la batería y el último mensaje de prearmado.
- **Pestañas laterales**: **Estado**, **Indicadores**, **Acciones**, **Mensajes** y **Grabaciones**. Arrastra el borde del panel para cambiar su tamaño; haz doble clic en el tirador para restablecerlo.
- **Ventanas de video**: una por cada stream de video activo. Arrástralas, maximízalas, minimízalas u ocúltalas; las ventanas ocultas se acoplan como pestañas en la parte inferior del mapa.

La barra superior de todas las páginas también muestra **FC Connected**, **Armado**/**Desarmado**, el tipo de vehículo, el modo de vuelo y **GCS Failsafe Enabled** o **GCS Failsafe Disabled**.

## Armar y desarmar

1. Abre la pestaña **Acciones** o usa el control de armado debajo de la cabina.
2. Selecciona **Armar**. El cuadro de diálogo advierte *Las hélices pueden empezar a girar. Asegúrate de que nadie esté cerca del dron y de que el área alrededor esté despejada.*
3. Confirma con **Armar**.

Las propias verificaciones de prearmado del controlador de vuelo siguen decidiendo. Si las rechaza, verás *El dron se negó a armarse. Revisa el mensaje PreArm en la pantalla.* El motivo aparece debajo de la cabina y en **Mensajes**.

**Desarmar** detiene los motores de inmediato. El controlador de vuelo lo rechaza mientras el dron está en vuelo.

## Cambiar el modo de vuelo

Elige un modo desde el control de modo de vuelo. La lista corresponde al tipo de vehículo (Copter, Plane, Rover, Sub) y se agrupa en **Modos seguros** (retención de posición y estabilización), **Navegación** (modos autónomos) y **Avanzado** (modos manuales y de emergencia). Los modos de mayor riesgo llevan un icono de advertencia y piden confirmación antes de enviar el comando.

## Pestaña Acciones

| Grupo | Botones | Qué ocurre |
| --- | --- | --- |
| **Misión** | **Leer**, **Ocultar**, **Iniciar**, **Borrar** | **Leer** carga la misión desde el controlador de vuelo en el mapa. **Iniciar** la inicia (con confirmación). **Borrar** elimina la misión del controlador de vuelo y espera su confirmación. |
| **Modos** | **Loiter Unl**, **RTL** | Cambios rápidos de modo. |
| **Prevuelo** | **Calibración de Prevuelo**, **Cargar Misión**, **Limpiar Misión** | La calibración ejecuta la calibración en tierra del controlador de vuelo (giroscopio, barómetro). Solo en tierra. |
| **Comandos de Emergencia** | **Volver al Despegue**, **Loiter Ilimitado** | Requiere confirmación. RTL regresa y aterriza o hace loiter según la configuración del controlador de vuelo. Loiter Ilimitado da vueltas en la posición actual. |
| **Seguridad** | Interruptor **Failsafe GCS** | Escribe `FS_GCS_ENABLE` (Copter) y `FS_GCS_ENABL` (Plane) en el controlador de vuelo. |

> **Activa el failsafe GCS en vuelos con módem celular**
>
> El failsafe GCS se activa cuando el controlador de vuelo deja de recibir latidos MAVLink de una estación de control en tierra. Por 4G/LTE, el enlace puede caerse en cualquier momento. Configura qué hace el failsafe (la acción de `FS_GCS_ENABLE` y `FS_GCS_TIMEOUT`) en tu estación de control en tierra antes de depender de él.

Los usuarios de solo lectura ven la pestaña Acciones, pero no pueden usarla (*Los usuarios de solo lectura no pueden controlar el dron*).

## Mensajes

**Mensajes** muestra cada mensaje de texto del controlador de vuelo. **Alertas activas** muestra los problemas actuales (por ejemplo, fallos de prearmado) separados del **Registro de mensajes**. Activa **Solo problemas** para ocultar los mensajes rutinarios y **Limpiar el registro** para empezar de cero. La pestaña muestra una insignia con la cantidad de alertas activas.

## Pestañas Estado e Indicadores

- **Estado**: tarjetas de **LINK** (pérdida de paquetes, conectado), **FLIGHT CONTROLLER** (armado, modo, vehículo), tasa de datos de telemetría, posición, **GPS** (bloqueo, satélites, **ALTITUDE (AGL)**, **ALTITUDE (AMSL)**) y **BATTERY**.
- **Indicadores**: instrumentos redondos con los mismos datos.

AGL es la altura sobre el punto de despegue; AMSL es la altura sobre el nivel medio del mar.

## Ajustes del mapa

| Ajuste | Qué hace |
| --- | --- |
| **Auto-Pan** | Mantiene el dron en el centro del mapa. |
| **Show Aircraft Heading** | Dibuja una línea de rumbo desde el dron. |
| **Trail Length** | Número de puntos que se guardan en la trayectoria de vuelo. |
| **Trail Color** | Color de la trayectoria. **Clear Trail Path** la elimina. |
| **Show Distance from Home** | Muestra la distancia al marcador de origen. |
| **Reset to Defaults** | Restaura todos los ajustes del mapa. |

## Ventanas independientes

- **Ventana del mapa de vuelo**: el botón de la derecha de la barra superior abre solo el mapa en una nueva ventana (`/flightmapwindow`), con un tamaño pensado para un segundo monitor.
- **Ventana del HUD**: desde la cabina, abre el HUD en su propia ventana (`/hud`).

![HUD de cabina con indicador de actitud, cintas de velocidad y altitud, rumbo y modo de vuelo](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/hud.webp)

*El HUD de cabina en /hud. El horizonte aparece invertido aquí porque el controlador de vuelo de esta unidad de banco está montado al revés.*

## Frecuencia de actualización de telemetría

El selector de frecuencia de la barra superior (**1 Hz**, **2 Hz**, **5 Hz**, **10 Hz**) define con qué frecuencia UAVcast-Pro envía la telemetría al navegador. No cambia lo que reciben tus estaciones de control en tierra. Usa una frecuencia baja si la conexión a la interfaz web es lenta.

## Relacionados

- [Pestaña Planificador de Misión](https://docs.uavmatrix.com/es/uavcast-pro/flight-map/mission-planner/)
- [Radio (canales RC)](https://docs.uavmatrix.com/es/uavcast-pro/flight-map/radio/)
- [Inspector MAVLink](https://docs.uavmatrix.com/es/uavcast-pro/flight-map/inspector/)
- [Analíticas de Vuelo](https://docs.uavmatrix.com/es/uavcast-pro/flight-map/flight-analytics/)
- [Grabaciones y revisión de vuelo](https://docs.uavmatrix.com/es/uavcast-pro/camera/recordings/)

Source: https://docs.uavmatrix.com/es/uavcast-pro/flight-map/
