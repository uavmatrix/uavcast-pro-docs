# Licencias y plazas

> Cómo las licencias de UAVcast-Pro y las ranuras de dispositivo determinan qué drones puedes vincular en Fleet Manager, y cómo usar licencias compradas con otro correo.

Fleet Manager está incluido con tu licencia de UAVcast-Pro. No tiene suscripción, plazas ni planes propios. Lo que puedes vincular lo determinan tus licencias de UAVcast-Pro de la [tienda de UAVmatrix](https://uavmatrix.com/):

- **Drones:** cada dron vinculado ejecuta UAVcast-Pro con una licencia activada. Cada activación usa una de las **Device Slots** (ranuras de dispositivo) de la licencia en la tienda ("2 of 5 device slots used"). ¿Necesitas más drones? Compra más licencias o más ranuras. **Fleet → Need more devices? → View Plans** te lleva a la tienda.
- **Miembros del equipo:** sin costo. Fleet Manager no limita cuántas personas puedes invitar, y los miembros no necesitan una licencia propia.

> Fleet Manager está incluido con una licencia de UAVcast-Pro. Cada dron que vincules necesita una.
>
> [Comprar UAVcast-Pro](https://uavmatrix.com/es/checkout) · [Ver planes y precios](https://uavmatrix.com/es/products)

## Qué revisa Fleet Manager al vincular

Cuando introduces un código de emparejamiento, Fleet Manager busca la licencia activada en ese dron y comprueba que:

1. la licencia existe y está activa, no vencida y no reembolsada, y
2. su **correo del propietario** (la cuenta de la tienda que la compró) pertenece a un **miembro de la organización** a la que estás vinculando, con cualquier rol.

Si ambas condiciones se cumplen, el dron queda vinculado. Fleet Manager vuelve a comprobarlo cada vez que se vuelve a vincular el dron.

| Mensaje en el asistente de vinculación | Significado |
| --- | --- |
| **License is not owned by any member of this organization** | La licencia pertenece a una cuenta de la tienda cuyo correo no es miembro de esta organización. |
| **License has expired** | Ya pasó la fecha de vencimiento de la licencia. |
| **License has been refunded** | La licencia fue devuelta. |
| **Invalid license key** | La tienda no reconoce la licencia del dron. Revisa la activación en UAVcast-Pro. |

La licencia también se revisa antes, cuando UAVcast-Pro pide un código de emparejamiento. Si UAVcast-Pro muestra **Invalid or inactive license** en lugar de un código, la licencia está vencida, reembolsada o no está vinculada a una cuenta de la tienda.

Para problemas de activación en el propio dron, consulta [Activa tu licencia](https://docs.uavmatrix.com/es/get-started/license-activation/) y [La licencia no se activa](https://docs.uavmatrix.com/es/troubleshooting/license-activation-failed/).

## Quién debe ser dueño de las licencias

Fleet Manager compara por correo electrónico, así que planifica quién compra:

- **Lo más sencillo:** el Owner de la organización compra todas las licencias con el correo con el que inicia sesión en Fleet Manager.
- **Varios compradores:** cuentan las licencias de cualquier miembro, incluidos los Viewers. Un compañero que compra puede ser Viewer.
- **Drones de clientes:** si un cliente compró las licencias, invita el correo del cliente en la tienda a tu organización (basta con el rol Viewer).

## Licencias compradas con otro correo

Un caso común: las licencias se compraron con `purchasing@company.com`, pero el piloto inicia sesión en Fleet Manager como `anna@company.com`. La vinculación falla con **License is not owned by any member of this organization**.

Tienes dos formas de solucionarlo:

1. **Invita el correo de compra** a la organización. Esa cuenta debe iniciar sesión una vez para aceptar la invitación.
2. **Pide a soporte de UAVmatrix que añada un correo de licencia** a tu cuenta. Soporte puede añadir uno o más correos adicionales a un usuario de Fleet Manager. Las licencias que pertenezcan a cualquiera de esos correos contarán como del usuario al vincular, en todas las organizaciones a las que pertenezca.

Para solicitarlo, abre un ticket desde el globo de soporte (categoría **General Inquiry**) o escribe a [support@uavmatrix.com](mailto:support@uavmatrix.com) desde la dirección con la que inicias sesión, e indica el otro u otros correos con los que se compraron las licencias. Consulta [Soporte](https://docs.uavmatrix.com/es/fleet-manager/support/).

Ten en cuenta:

- Los correos se comparan sin distinguir mayúsculas de minúsculas.
- Cada correo adicional puede pertenecer a un único usuario de Fleet Manager.
- Solo el soporte de UAVmatrix puede añadir o quitar estos correos. No aparecen en tu propia configuración.
- Las licencias permanecen en la cuenta original de la tienda. Esto solo cambia quién cuenta como propietario en Fleet Manager al vincular.

## Mover licencias entre drones

Una licencia se activa por dispositivo en UAVcast-Pro, no en Fleet Manager. Para moverla, libera la ranura de dispositivo en UAVcast-Pro o en la tienda, actívala en el nuevo dron y luego [vincula el nuevo dron](https://docs.uavmatrix.com/es/fleet-manager/pair-uav/). Consulta [Reemplazar la computadora de a bordo](https://docs.uavmatrix.com/es/fleet-manager/fleet/remove-or-transfer/#replace-the-companion-computer).

Source: https://docs.uavmatrix.com/es/fleet-manager/licenses/
