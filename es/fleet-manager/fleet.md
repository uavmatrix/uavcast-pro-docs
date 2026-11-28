# Fleet

> La página Fleet muestra cada dron de tu organización con su estado en vivo, batería y último contacto, y es donde emparejas drones y abres los controles.

**Fleet** (barra lateral **Fleet Management → Fleet**) muestra cada dron de la organización seleccionada. Se actualiza en vivo, así que puedes dejarla abierta en una pantalla de pared junto al [mapa](https://docs.uavmatrix.com/es/fleet-manager/map/).

![Página Fleet con una cuadrícula de tarjetas de drones que muestran estado en línea o sin conexión, batería y última vez visto](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/fleet.webp)

*Página Fleet con UAVs (46): tarjetas ONLINE con niveles de batería, y tarjetas OFFLINE atenuadas con los tiempos de Last seen.*

## Tarjetas de drones

El encabezado muestra **UAVs (n)**. Cada tarjeta muestra:

- **Name** y una insignia de estado: **ONLINE**, **OFFLINE** o **PAIRING**.
- **Battery** en porcentaje. Se pone amarillo por debajo del 50 % y rojo por debajo del 20 %.
- **Last seen**, como tiempo relativo. Las tarjetas sin conexión se atenúan.
- **Re-pair required**, cuando el dron debe volver a emparejarse (consulta [Volver a emparejar un dron](https://docs.uavmatrix.com/es/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone)).

Un dron cuenta como sin conexión después de **20 segundos** sin mensajes de UAVcast-Pro, que envía un latido cada 5 segundos.

Dos botones en cada tarjeta:

- **Operations** abre el [panel de control](https://docs.uavmatrix.com/es/fleet-manager/fleet/remote-control/): modos de vuelo, armar y desarmar, misiones.
- **Details** abre la [página del dron](https://docs.uavmatrix.com/es/fleet-manager/fleet/uav-details/): telemetría en vivo, terminal, registros, acciones del sistema, cambiar nombre y eliminar.

## Botones de la página

- **Pair Device** inicia el [asistente de emparejamiento](https://docs.uavmatrix.com/es/fleet-manager/pair-uav/). Solo para Owners y Admins.
- **Refresh** vuelve a cargar la lista.
- **Need more devices?** → **View Plans** abre la tienda de UAVmatrix, donde compras más licencias de UAVcast-Pro. Consulta [Licencias](https://docs.uavmatrix.com/es/fleet-manager/licenses/).

## Banner de volver a emparejar

Cuando uno o más drones usan un certificado de conexión más antiguo, un banner en la parte superior dice **n UAV(s) must be re-paired**. Vuelve a emparejar cada dron de la lista una vez; conserva su nombre e historial. Consulta [Volver a emparejar un dron](https://docs.uavmatrix.com/es/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone).

![Página Fleet con un banner de volver a emparejar y las insignias Re-pair required en dos tarjetas](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/fleet--repair-required.webp)

*Página Fleet con el banner 2 UAVs must be re-paired y la insignia Re-pair required en las dos tarjetas afectadas.*

## Consejos para flotas grandes

- **Nombra los drones para el mapa.** Los nombres aparecen en las etiquetas del mapa y en las listas de vinculación. Un número de matrícula o un rol ("Inspection-07") es mejor que el nombre de host predeterminado. Cámbialo desde la página del dron.
- **Asigna a cada dron su propio color.** Fleet Manager asigna colores automáticamente desde una paleta de 24 colores. Define un color fijo en el panel de control (**Change map color**) para los drones que tu equipo debe reconocer de un vistazo.
- **Usa organizaciones para separar clientes.** Un dron pertenece a una sola organización. Si operas para varios clientes que solo deben ver sus propios drones, asigna una organización a cada uno.

Source: https://docs.uavmatrix.com/es/fleet-manager/fleet/
