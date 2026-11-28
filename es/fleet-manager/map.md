# Mapa en vivo

> Sigue cada dron de tu flota en un único mapa en vivo, con anillos de estado, líneas de rumbo, estelas de 5 minutos, modo de seguimiento y capas de espacio aéreo de OpenAIP.

**Fleet Map** (barra lateral **Overview → Fleet Map**) muestra cada dron de la organización seleccionada en un único mapa, actualizado en vivo a medida que llega la telemetría. Está pensado para una sala de control: déjalo abierto y verás de un vistazo qué aeronaves están en el aire, hacia dónde se dirigen y cuáles necesitan atención.

![Mapa de flota con muchos marcadores de drones de colores, líneas de rumbo y estelas de vuelo sobre una región](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/map.webp)

*Fleet Map con el estilo Dark sobre el Puerto de Róterdam: cada dron en su propio color, con línea de rumbo y estela, y marcadores grises fuera de línea con el tiempo transcurrido desde que se vieron.*

## Leer un marcador

Cada dron se dibuja en su propio color, con un icono de su tipo de vehículo: cuadricóptero, hexacóptero, avión, VTOL, rover, bote o submarino. Los anillos e insignias alrededor del marcador señalan problemas:

| En el marcador | Significado |
| --- | --- |
| Color propio del dron, sin anillo | En línea y en buen estado. |
| Marcador gris, anillo punteado gris e insignia de reloj | **Offline**: no se ha recibido nada durante 20 segundos. |
| Anillo naranja con insignia **!** | **NO MAVLINK**: UAVcast-Pro está en línea, pero no ha recibido telemetría del controlador de vuelo durante 10 segundos. Revisa la conexión con el controlador de vuelo. |
| Anillo punteado rojo | **GPS lost**: sin satélites o sin fijación. |
| Anillo punteado amarillo | **GPS weak**: menos de 6 satélites o solo una fijación 2D. |
| Marcador **H** | La posición de origen del dron, establecida al armarse. Pasa el cursor para ver su altitud (AMSL). |

El propio marcador no muestra si el dron está armado o desarmado. Abre la ventana emergente o usa el [panel de control](https://docs.uavmatrix.com/es/fleet-manager/fleet/remote-control/) para ver **Armed**.

La etiqueta junto al marcador muestra `Name • FLIGHTMODE`, con **NO MAVLINK**, **NO GPS** o **WEAK GPS** añadidos cuando corresponda, o `Name • OFFLINE • 5 mins ago` para un dron fuera de línea.

### Línea de rumbo y estela

- La **línea de rumbo** es una línea discontinua del color del dron que apunta hacia donde apunta el morro. Se oculta cuando el dron está fuera de línea.
- La **estela de vuelo** muestra los últimos **5 minutos** de la trayectoria, como una línea discontinua del color del dron (gris si está fuera de línea). Se añade un nuevo punto aproximadamente cada 11 m de movimiento.

## Ventana emergente del dron

Selecciona un marcador para abrir su ventana emergente: nombre, organización y estado, luego **Battery**, **Altitude**, **Mode**, **Armed**, **GPS** (satélites y tipo de fijación: No Fix, 2D, 3D, DGPS o RTK), **Signal** y, si está fuera de línea, **Last seen**. También aparece el último mensaje de estado del controlador de vuelo, que suele ser la forma más rápida de leer un fallo de prearmado.

**Signal** es el tiempo de ida y vuelta entre Fleet Manager y el dron, medido cada 10 segundos: excelente por debajo de 100 ms, bueno por debajo de 300 ms, regular por debajo de 600 ms, y deficiente por encima de eso o tras tres pings sin respuesta.

![Ventana emergente del dron en el mapa con filas de batería, altitud, modo, armado, GPS y señal, y botones Follow, History y Controls](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/map--popup.webp)

*Ventana emergente de un dron de topografía armado en AUTO: Battery 71%, Altitude 85.5 m, GPS 20 sats (3D), Signal 61 ms (Excellent), con Follow, History y Controls.*

Tres botones:

- **Follow** mantiene el dron en vista. Consulta más abajo.
- **History** abre el [historial de vuelo](https://docs.uavmatrix.com/es/fleet-manager/map/flight-history/) de este dron.
- **Controls** abre el [UAV Control Panel](https://docs.uavmatrix.com/es/fleet-manager/fleet/remote-control/).

## Seguir un dron

Selecciona **Follow** en la ventana emergente. El mapa se acerca (hasta al menos el nivel de zoom 14) y se centra en el dron, y solo se desplaza cuando el dron se acerca al borde de la pantalla, para que el mapa no vibre. Aparece un banner **Following *name***; selecciona su **X**, o **Unfollow**, para detenerlo. Abrir **History** también detiene el seguimiento.

![Mapa siguiendo un dron con el banner Following en la parte superior](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/map--follow.webp)

*Modo de seguimiento de un ala fija que cartografía un corredor, con el banner Following y la estela detrás.*

## Drones sin GPS

Los drones que están en línea pero aún no tienen posición aparecen en un cuadro **drones without GPS** en el mapa. Selecciona uno para abrir su panel de control. El contador **n drones on map** indica cuántos están trazados.

## Ajustes del mapa

Selecciona el botón de engranaje en la esquina superior derecha para abrir **Map Settings**. Tus opciones se guardan en este navegador.

| Sección | Opción | Predeterminado |
| --- | --- | --- |
| **Overlays** | **Airspace Layers**: zonas aéreas restringidas, aeropuertos, helipuertos | Off |
| **Drone Filter** | **All Drones**, **Online Only** u **Offline Only** | All Drones |
| **Marker Options** | **Heading Line** | On |
|  | **Marker Tooltip**: etiqueta con el nombre en los marcadores | On |
|  | **Always Visible**: muestra la etiqueta de forma permanente en lugar de solo al pasar el cursor | On |
|  | **Flight Trail**: trayectoria reciente (últimos 5 min) | On |
| **Map Style** | **Satellite**, **Light** o **Dark** | Dark |

![Panel de Map Settings con capas, filtro de drones, opciones de marcadores y estilo de mapa](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/map--settings.webp)

*Panel de Map Settings con Airspace Layers activado, Drone Filter en Online Only y estilo de mapa Satellite.*

> **Para un mapa con mucha actividad**
>
> Con 20 o más drones en una misma zona, desactiva **Always Visible** para que las etiquetas aparezcan solo al pasar el cursor, y usa **Online Only** para ocultar las aeronaves estacionadas.

## Capas de espacio aéreo

**Airspace Layers** dibuja sobre el mapa las zonas aéreas restringidas, los aeropuertos y los helipuertos de OpenAIP. La capa aparece desde el nivel de zoom 7 y más cerca. Es una sola capa combinada; no puedes activar las categorías por separado.

> **No sustituye las verificaciones oficiales del espacio aéreo**
>
> La capa de espacio aéreo es para la conciencia situacional. Consulta los NOTAM y tu mapa nacional de drones o servicio UTM antes de cada vuelo.

Source: https://docs.uavmatrix.com/es/fleet-manager/map/
