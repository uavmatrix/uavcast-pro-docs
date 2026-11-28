# Control remoto

> Cambia los modos de vuelo, arma o desarma, ejecuta misiones e inicia una calibración previa al vuelo desde el UAV Control Panel de Fleet Manager, con verificaciones de seguridad.

El **UAV Control Panel** envía comandos al controlador de vuelo a través de UAVcast-Pro, por la conexión cifrada de Fleet Manager. Funciona con cualquier enlace de internet que tenga el dron, incluido 4G, y no necesita la VPN.

Ábrelo con **Operations** en una tarjeta de [Fleet](https://docs.uavmatrix.com/es/fleet-manager/fleet/), o con **Controls** en la ventana emergente de un dron en el [Fleet Map](https://docs.uavmatrix.com/es/fleet-manager/map/). En el mapa, el panel también tiene las pestañas **Terminal** y **Logs**.

![UAV Control Panel con las columnas Flight Mode, Mission y Actions para un cuadricóptero armado](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/control-panel.webp)

*UAV Control Panel de un cuadricóptero armado en LOITER: Flight Mode con los botones RTL, Circle y Loiter, Mission con un levantamiento de 18 puntos de ruta seleccionado, y Actions con Arm y Disarm.*

Solo los **Owners** y **Admins** pueden enviar comandos. Consulta [Roles y permisos](https://docs.uavmatrix.com/es/fleet-manager/team/roles-and-permissions/).

> **Los comandos remotos mueven aeronaves reales**
>
> Un comando de Fleet Manager actúa sobre la aeronave como si lo enviara una estación de control en tierra. Mantén a un piloto con una estación de control en tierra o un transmisor RC en control de cada vuelo, sigue las normas locales para operaciones remotas y BVLOS, y considera Fleet Manager una herramienta de supervisión y despacho, no tu único enlace.

## Encabezado

El encabezado muestra el estado del dron, las marcas **ARMED** y **FAILSAFE**, una insignia **GCS Failsafe**, el selector de color del mapa (**Change map color**, con **Reset to auto**) y un enlace **Details** a la [página del dron](https://docs.uavmatrix.com/es/fleet-manager/fleet/uav-details/).

Si el failsafe GCS del controlador de vuelo está desactivado, el panel muestra una advertencia: **GCS Failsafe not enabled. Without GCS failsafe, the vehicle will not return to launch if it loses connection to the ground station.** Configura el failsafe en tu software de estación de control en tierra (parámetro de ArduPilot `FS_GCS_ENABLE`) antes de volar más allá de la línea de visión directa.

## Modo de vuelo

Elige un modo en la lista desplegable, o usa los botones rápidos **RTL**, **Circle** y **Loiter** (**Hold** en rovers). Cada cambio de modo pide confirmación, y cuanto más peligroso es el modo, más fuerte es la verificación:

| Confirmación | Modos |
| --- | --- |
| Simple **Change to *MODE*?** | STABILIZE, ALT_HOLD, LOITER, POSHOLD, BRAKE, FLOWHOLD, HOLD, FBWA, FBWB, CRUISE, QHOVER, QLOITER, QSTABILIZE |
| Confirmación con una descripción de lo que hace el modo | AUTO, GUIDED, RTL, SMART_RTL, CIRCLE, FOLLOW, ZIGZAG, QRTL, TAKEOFF, AVOID_ADSB, ACRO, MANUAL |
| Escribe el nombre del modo para confirmar | LAND, SPORT, AUTOTUNE, FLIP, DRIFT, THROW, QLAND, QACRO, AUTOROTATE |

![Diálogo de confirmación de cambio de modo que pide escribir LAND para confirmar](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/control-panel--mode-confirm.webp)

*Confirmación de LAND, un modo que debe escribirse para confirmar.*

Las listas de modos son las de ArduPilot (Copter, Plane, Rover y Sub). En un controlador de vuelo PX4, usa tu estación de control en tierra para cambiar los modos.

## Misión

Ejecuta las [misiones](https://docs.uavmatrix.com/es/fleet-manager/missions/) guardadas en tu organización:

- **Select mission** elige una misión guardada. El contador muestra el punto de ruta actual y el total, por ejemplo `3/18`, o **None**.
- **Start** primero lee la misión del dron y la compara con la que seleccionaste. Si son diferentes, **Mission Not Loaded on Drone** ofrece **Upload & Start**.
- **Stop**, **Read** (obtiene la misión del dron) y **Clear**.

Cada acción pide confirmación.

## Acciones

- **Arm** y **Disarm**. El diálogo de armado dice **This will arm the UAV. Ensure all personnel are clear of the propellers before arming.** Marca **Force arm (bypass pre-arm checks)** solo en el banco de pruebas: omite las verificaciones que impiden un despegue inseguro.
- **Select action... → Preflight Calibration** calibra el giroscopio y nivela el acelerómetro. Mantén el vehículo completamente quieto sobre una superficie nivelada y luego selecciona **Start Calibration**.

![Diálogo de confirmación de armado con la advertencia sobre las hélices y la casilla Force arm](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/control-panel--arm-confirm.webp)

*Diálogo de armado con la advertencia de hélices y la casilla Force arm (bypass pre-arm checks) sin marcar.*

Armar, desarmar y la calibración previa al vuelo requieren UAVcast-Pro **6.3.0_rc13** o posterior en el dron. En versiones anteriores, el panel muestra **UAVcast Upgrade Required**. Consulta [Actualización](https://docs.uavmatrix.com/es/get-started/updating/).

## Cuando un comando no se completa

- El dron debe estar en línea. Los comandos a un dron sin conexión fallan.
- Fleet Manager espera a que el dron confirme cada comando. Si el controlador de vuelo lo rechaza, por ejemplo al armar con verificaciones previas al armado fallidas, el error aparece en el panel y en los mensajes de estado del dron.
- Los mensajes del controlador de vuelo (fallos previos al armado, cambios de modo) se muestran en la ventana emergente del dron en el mapa y en la pestaña [Logs](https://docs.uavmatrix.com/es/fleet-manager/fleet/uav-details/#logs).

Para pantallas de teléfono, consulta [Vista Lite](https://docs.uavmatrix.com/es/fleet-manager/lite-view/).

Source: https://docs.uavmatrix.com/es/fleet-manager/fleet/remote-control/
