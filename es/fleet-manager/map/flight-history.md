# Historial de vuelo

> Reproduce el vuelo grabado de un dron en el mapa de Fleet Manager, consulta la duración, la altitud y la velocidad máximas, guarda vuelos con nombre y define la retención de telemetría.

Fleet Manager registra la telemetría de cada dron una vez por segundo mientras está conectado: posición, altitud, velocidad, rumbo, batería, modo de vuelo, estado de armado y GPS. **Flight history** reproduce esa grabación en el mapa.

## Abrir el historial de un dron

En **Fleet Map**, selecciona el marcador del dron y luego **History** en la ventana emergente. Se abre el cajón ***name* - Flight History** en la parte inferior del mapa.

![Cajón de historial de vuelo bajo el mapa con selector de sesión, controles de reproducción, estadísticas y trayectoria reproducida](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/map--history.webp)

*Historial de vuelo de un dron de inspección: el vuelo guardado Turbine blade inspection seleccionado, reproducción a 4x, y Duration, Max Alt, Max Speed y Avg Battery.*

## Elegir una sesión

**Select flight session** muestra:

1. Primero los **Saved flights** (con icono de marcador), los que tu equipo ha nombrado.
2. Después, una entrada por **día** con telemetría registrada, de los últimos 30 días.

Un día agrupa toda la telemetría de esa fecha, así que varios vuelos del mismo día aparecen como una sola sesión. Guarda el tramo que te interese como vuelo con nombre para encontrarlo rápido.

## Reproducirlo

- Reproduce y pausa, retrocede o avanza un 5 % de la sesión, o salta al inicio o al final. Arrastra la línea de tiempo para navegar por ella.
- Velocidades: **0.5x**, **1x** (tiempo real), **2x**, **4x**, **8x**, **10x** y **20x**.
- Teclado: **Space** reproducir o pausar, **←** / **→** avanzar o retroceder, **Esc** cerrar.

En el mapa, un marcador verde **Start** y uno rojo **End** enmarcan el vuelo. La parte ya reproducida se dibuja en cian, el resto en línea discontinua gris, y un icono de dron con su altitud se mueve a lo largo de la trayectoria.

El panel de estadísticas muestra **Duration**, **Max Alt**, **Max Speed** y **Avg Battery**, y **Current Position** muestra **Alt**, **Speed**, **Heading** y **Mode** en el punto de reproducción.

## Guardar, renombrar y eliminar vuelos

Owners y Admins pueden guardar, renombrar y eliminar vuelos con nombre. Los Viewers pueden reproducirlos.

- **Save and name this flight** guarda el rango de tiempo actual con un nombre (hasta 100 caracteres), por ejemplo "Survey over Field A". Dos vuelos guardados no pueden solaparse: **A saved session already exists for this time range**.
- **Rename flight** cambia el nombre.
- **Delete saved flight** solo quita el nombre. **Delete Saved Flight?** explica que la telemetría en sí no se elimina.

## Cuánto tiempo se conserva el historial

Owners y Admins definen la retención por organización en **Settings → History** (**Telemetry History**):

- **Retention:** 7, 14, 30, 60 o 90 días, **6 months** o **1 year**. El valor predeterminado y el máximo es 1 año.
- **Prune Now** elimina de inmediato los datos más antiguos de 7, 14, 30, 60 o 90 días (predeterminado 30), tras la confirmación **Prune Old History**.
- **Delete Drone History** (icono de papelera por dron) o **Select All** → **Delete Selected (n)** borra el historial de los drones elegidos.
- Las tarjetas muestran **Storage Used**, **Total Records** y **Retention**.

Fleet Manager elimina los datos que superan el periodo de retención una vez al día. Los datos de más de 7 días se comprimen, así que un año de historial de una flota grande sigue siendo manejable.

![Pestaña History de Settings con selector de retención, opciones de depuración y lista de historial por dron](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/settings--history.webp)

*Settings → History de una organización con 46 drones: Storage Used, Total Records, Retention de 90 días y la lista por dron con botones Delete.*

> **Sin exportación de registros**
>
> Fleet Manager no exporta el historial de vuelo como archivo, y no guarda video ni registros del controlador de vuelo (`.tlog`, DataFlash). Consérvalos desde tu software de estación de control en tierra o desde la tarjeta SD del controlador de vuelo. Para las grabaciones de video en el dron, consulta [Grabaciones y revisión de vuelo](https://docs.uavmatrix.com/es/guides/recording-flight-review/).

Eliminar un dron borra todo su historial, incluidos los vuelos guardados. Consulta [Eliminar o transferir un dron](https://docs.uavmatrix.com/es/fleet-manager/fleet/remove-or-transfer/).

Source: https://docs.uavmatrix.com/es/fleet-manager/map/flight-history/
