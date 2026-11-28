# Misiones

> Dibuja misiones de puntos de ruta en el mapa, elige comandos MAVLink y marcos de altitud, guarda misiones para toda la organización y súbelas a cualquier dron en línea.

**Missions** (barra lateral **Fleet Management → Missions**) es un planificador de puntos de ruta en el navegador. Las misiones se guardan para la organización, así que cualquier miembro del equipo puede cargar una, y un Owner o Admin puede subirla a cualquier dron en línea.

![Planificador de misiones con un patrón de búsqueda de puntos de ruta dibujado sobre un mapa satelital](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/missions.webp)

*Planificador de misiones con el estilo Satellite, una cuadrícula de búsqueda de 18 puntos de ruta, Takeoff y Return to Launch, y el encabezado con 18 puntos de ruta y la distancia total.*

Los Viewers pueden abrir y revisar las misiones guardadas. Guardar, subir y eliminar requieren Owner o Admin.

## Planificar una misión

1. Selecciona **Create New** (o **Missions → New Mission**).
2. Haz clic en el mapa para añadir puntos de ruta. Arrastra un punto para moverlo. Mientras colocas, **Next WP** muestra la distancia desde el punto anterior (**Prev:**) y desde el origen (**Home:**).
3. Abre el cajón de puntos de ruta (**n Waypoints**) para editar cada fila: **Command**, **Params**, **Alt**, **Frame** y **Radius**. Arrastra las filas para reordenarlas. La fila **H** es el origen.
4. Define los **Defaults:** para los nuevos puntos de ruta, en la parte superior del cajón: **Alt** (predeterminado 50 m) y **WP Radius** (predeterminado 30 m).

![Cajón de puntos de ruta con columnas de comando, parámetros, coordenadas, altitud, marco, radio y distancia](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/missions--waypoint-drawer.webp)

*Cajón de puntos de ruta con un Takeoff, varias filas Waypoint, un Change Speed y un Return to Launch, con Frame en Relative.*

### Marcos de altitud

| Marco | La altitud se mide desde |
| --- | --- |
| **Relative** (predeterminado) | La posición de origen (home) |
| **Absolute** | El nivel medio del mar |
| **Terrain** | El suelo bajo el punto de ruta (requiere datos de terreno en el controlador de vuelo) |

### Comandos

El selector de **Command** tiene búsqueda y lista los comandos de misión MAVLink que entiende ArduPilot, agrupados así:

- **Navigation:** Waypoint, Takeoff, Land, Return to Launch, Loiter Unlim, Loiter Turns, Loiter Time, Loiter to Alt, Spline Waypoint, Vtol Takeoff, Vtol Land, Payload Place, Delay y más.
- **Conditions:** Delay, Change Alt, Distance, Yaw.
- **Do commands:** Change Speed, Set ROI Location, Set Servo, Set Relay, Jump, Digicam Control, Set Cam Trigg Dist, Mount Control, Gripper, Parachute, VTOL Transition y otros.

Los comandos que tienen parámetros (por ejemplo, tiempo de espera, vueltas de loiter, velocidad o PWM de servo) tienen campos editables en **Params**.

Límites: altitud de 0 a 10 000 m, radio de 1 a 1000 m, y al menos un punto de ruta.

## Guardar

Selecciona **Save**, escribe un **Name** (hasta 100 caracteres) y una **Description** opcional, y confirma **Save Mission**. El encabezado muestra **Unsaved** mientras haya cambios; **Update Mission** los guarda. Abre las misiones guardadas desde **Missions → Saved Missions**.

## Subir a un dron

1. Guarda la misión. Una misión sin guardar no se puede subir (**Mission not saved**).
2. Selecciona **Upload to Drone**, elige el UAV en **Select UAV** y confirma.
3. Espera la confirmación. La subida agota el tiempo de espera a los 30 segundos si el dron no responde.

![Diálogo Upload Mission to Drone con una lista de UAV en línea](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/missions--upload.webp)

*Diálogo Upload Mission to Drone con los UAV en línea entre los que elegir.*

Para volarla, selecciona la misión en el [panel de control](https://docs.uavmatrix.com/es/fleet-manager/fleet/remote-control/#mission) del dron y selecciona **Start**. Si la misión del dron es distinta de la que seleccionaste, el panel ofrece **Upload & Start**.

## Leer una misión desde un dron

En **Missions → Read from Drone**, elige un dron en línea. Su misión actual se carga en el planificador como **Mission from *name***. Guárdala para conservar una copia, por ejemplo antes de sobrescribirla.

> **Revisa la misión en tu estación de control en tierra antes del vuelo**
>
> Fleet Manager sube exactamente lo que planificaste. Antes de un vuelo automático, revisa la misión y los failsafes del vehículo en QGroundControl o Mission Planner, como harías con cualquier otra herramienta de planificación.

Source: https://docs.uavmatrix.com/es/fleet-manager/missions/
