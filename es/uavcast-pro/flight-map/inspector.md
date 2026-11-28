# Inspector MAVLink

> Usa el Inspector MAVLink de UAVcast-Pro para ver cada mensaje del controlador de vuelo con su frecuencia, ID de sistema e ID de componente, y depurar la telemetría y los inyectores.

El Inspector enumera cada mensaje MAVLink que recibe UAVcast-Pro, agrupado por vehículo, con su frecuencia y los últimos valores de sus campos. Úsalo para comprobar que el controlador de vuelo envía lo que esperas, para encontrar los nombres exactos de los campos de un mensaje o para confirmar que un [inyector](https://docs.uavmatrix.com/es/uavcast-pro/flight-controller/injectors/) produce mensajes `NAMED_VALUE_FLOAT`. Abre **Mapa de Vuelo → Inspector**.

![Inspector MAVLink con el estado de conexión y la lista de mensajes del sistema 1, con nombres de mensaje, frecuencias en Hz y contadores](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/flight-map--inspector.webp)

*Mapa de Vuelo → Inspector con los mensajes del controlador de vuelo (sistema 1) y ATTITUDE expandido.*

## Lo que ves

**Estado de Conexión MAVLink** en la parte superior: **Conexión**, **Vehículo**, **Satélites GPS**, **Mensajes Totales** e **ID del Sistema**.

**Inspector de Mensajes** debajo: un grupo por vehículo (*Vehículo (ID del Sistema: 1)*), y dentro de él, una fila por mensaje con:

- el nombre del mensaje,
- **COMP**: el ID de componente que lo envió (1 = piloto automático, 194 = el valor predeterminado de los inyectores),
- la frecuencia en **Hz** y la cantidad de mensajes recibidos.

Abre un mensaje para ver sus campos y sus valores actuales.

## Revisiones típicas

| Pregunta | Qué buscar |
| --- | --- |
| ¿El GPS envía datos? | `GPS_RAW_INT` a 2 a 10 Hz, y `GPS_RTK` si usas [RTK](https://docs.uavmatrix.com/es/uavcast-pro/flight-controller/ntrip-rtk/). |
| ¿Por qué la telemetría es lenta en la estación de control? | Frecuencias bajas en `ATTITUDE`, `VFR_HUD` o `GLOBAL_POSITION_INT`. Aumenta las frecuencias `SRx_` en el puerto MAVLink del controlador de vuelo. |
| ¿Funciona mi inyector? | `NAMED_VALUE_FLOAT` bajo COMP 194 (o el compid que configuraste). |

Si la lista dice *Esperando mensajes...*, el enlace con el controlador de vuelo no está conectado. Consulta [Controlador de vuelo](https://docs.uavmatrix.com/es/uavcast-pro/flight-controller/).

Source: https://docs.uavmatrix.com/es/uavcast-pro/flight-map/inspector/
