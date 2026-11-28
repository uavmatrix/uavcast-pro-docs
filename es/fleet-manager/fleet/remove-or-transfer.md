# Volver a emparejar, eliminar o transferir un dron

> Vuelve a emparejar un dron cuando Fleet Manager lo pida, elimínalo de tu organización, muévelo a otra o reemplaza su computadora de a bordo.

Un dron pertenece a una sola organización a la vez. Esta página cubre las tres acciones que realizas sobre un dron existente: volver a emparejarlo, eliminarlo y moverlo a otro lugar.

## Volver a emparejar un dron

Volver a emparejar renueva el certificado de conexión del dron. El dron conserva su registro en Fleet Manager: nombre, historial de telemetría, vuelos guardados y vinculaciones de stream se mantienen tal cual.

Lo necesitas cuando:

- Fleet Manager muestra **Re-pair required** en el dron, o el banner **This UAV must be re-paired** en su página. Fleet Manager cambió a un certificado más reciente y estricto, y este dron todavía tiene uno antiguo.
- Alguien seleccionó **Disconnect from Fleet** en UAVcast-Pro.

![Página del dron con el banner This UAV must be re-paired](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/drone-detail--repair-required.webp)

*Página del dron con el banner This UAV must be re-paired, que explica los pasos Disconnect y Connect to Fleet Manager.*

1. En la interfaz de UAVcast-Pro del dron, abre **Fleet Management** y selecciona **Disconnect from Fleet**. Confirma **Disconnect from Fleet?** Si la página ya muestra **Connect to Fleet Manager**, omite este paso.
2. Selecciona **Connect to Fleet Manager** para obtener un código nuevo de 8 dígitos.
3. En Fleet Manager, ve a **Fleet → Pair Device**, elige la **misma organización** e introduce el código. Sigue el asistente como en [Añade tu primer dron](https://docs.uavmatrix.com/es/fleet-manager/pair-uav/).

No elimines primero el dron en Fleet Manager. Eliminarlo borra su historial; volver a emparejarlo lo conserva.

## Eliminar un dron

Úsalo cuando un dron se retira, se vende o se traslada a otra organización. Solo para Owners y Admins.

1. Abre la [página del dron](https://docs.uavmatrix.com/es/fleet-manager/fleet/uav-details/) y selecciona **Remove**.
2. Confirma **Delete UAV**.

Si el dron está en línea, Fleet Manager primero indica a UAVcast-Pro que se desempareje y espera hasta 5 segundos una respuesta. Después, UAVcast-Pro vuelve a mostrar **Connect to Fleet Manager** y sale de la VPN de la organización.

Si el dron está sin conexión o no responde, **UAVcast Not Responding** pregunta si quieres continuar. **Delete Anyway** lo elimina solo de Fleet Manager. Después, la próxima vez que puedas acceder al dron, selecciona tú mismo **Disconnect from Fleet** en UAVcast-Pro. Hasta entonces, el dron seguirá creyendo que está emparejado.

![Diálogo de confirmación Delete UAV que advierte que se eliminarán los datos de telemetría y el historial de comandos](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/drone-detail--delete.webp)

*Diálogo Delete UAV de un fuselaje retirado, que advierte que todos los datos de telemetría y el historial de comandos se eliminarán de forma permanente.*

### Qué borra la eliminación

| Eliminado | Conservado |
| --- | --- |
| El registro del dron y su nombre | Entradas en **Recent Activity** |
| Toda la telemetría almacenada y el historial de vuelos, incluidos los vuelos guardados | Misiones guardadas (pertenecen a la organización) |
| Historial de comandos y vinculaciones de stream | La licencia de UAVcast-Pro, que sigue activada en el dron |
| El dispositivo VPN del dron |  |

> **No se puede deshacer**
>
> No hay exportación del historial de vuelos antes de eliminar un dron. Si necesitas los datos, reproduce o registra primero lo que necesites desde el [Historial de vuelos](https://docs.uavmatrix.com/es/fleet-manager/map/flight-history/).

## Mover un dron a otra organización

Fleet Manager no tiene un botón de "transferencia" para un solo dron, porque el historial se queda con la organización que lo registró. Para mover un dron:

1. En la organización actual, [elimina el dron](https://docs.uavmatrix.com/es/fleet-manager/fleet/remove-or-transfer/#remove-a-drone). Su historial allí se borra.
2. Asegúrate de que la licencia de UAVcast-Pro del dron pertenezca a un miembro de la nueva organización. Consulta [Licencias](https://docs.uavmatrix.com/es/fleet-manager/licenses/).
3. En la nueva organización, [empareja el dron](https://docs.uavmatrix.com/es/fleet-manager/pair-uav/).

Si intentas emparejar un dron que todavía pertenece a otra organización, Fleet Manager se detiene con **This UAV is already paired to an organization**. Solo un Owner o Admin de esa organización puede liberarlo.

Para transferir una **flota completa** con su historial (por ejemplo, cuando se vende una empresa), conserva la organización y [transfiere la propiedad](https://docs.uavmatrix.com/es/fleet-manager/team/#transfer-ownership) al nuevo propietario.

## Reemplazar la computadora de a bordo

Fleet Manager identifica un dron mediante un ID de dispositivo que UAVcast-Pro calcula a partir del número de serie de la CPU de la computadora de a bordo y de su disco de arranque (tarjeta SD o SSD). Una computadora de a bordo nueva, o una tarjeta SD o SSD nueva en la misma, aparece como un dron **nuevo**. Reinstalar UAVcast-Pro en la misma placa y el mismo disco conserva el mismo ID de dispositivo.

1. Elimina el dron anterior en Fleet Manager (o consérvalo hasta que ya no necesites su historial).
2. Instala UAVcast-Pro en la nueva computadora y activa la licencia. Consulta [Activa tu licencia](https://docs.uavmatrix.com/es/get-started/license-activation/).
3. Empárejalo como un dron nuevo y vuelve a crear sus vinculaciones de stream.

Source: https://docs.uavmatrix.com/es/fleet-manager/fleet/remove-or-transfer/
