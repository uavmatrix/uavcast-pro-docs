# Invita a tu equipo

> Invita a pilotos, operadores y clientes a tu organización de Fleet Manager por correo electrónico, cambia roles, revoca invitaciones y transfiere la propiedad.

Cada persona inicia sesión con su propia cuenta de UAVmatrix y recibe un rol en tu organización: **Admin** o **Viewer** (hay exactamente un **Owner**). Fleet Manager no limita la cantidad de miembros, y los miembros no consumen licencias. Consulta [Roles y permisos](https://docs.uavmatrix.com/es/fleet-manager/team/roles-and-permissions/) para ver exactamente lo que puede hacer cada rol.

Todo esto ocurre en **Team** (título de la página **Team Management**). Owner y Admin pueden administrar miembros. Los Viewers solo ven la lista de miembros.

![Página Team Management con la lista de miembros de una organización, con roles e invitaciones pendientes](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/team.webp)

*Team Management de un operador con 13 miembros: un Owner, cuatro Admin y ocho Viewers.*

## Invita a un miembro

1. En **Team**, selecciona **Invite Member**.
2. En **Invite Team Member**, escribe el **Email Address** de la persona, elige la **Organization** (si administras más de una) y el **Role**: **Admin** o **Viewer**.
3. Selecciona **Send Invitation**.

![Diálogo Invite Team Member con campos de correo, organización y rol](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/team--invite.webp)

*Diálogo Invite Team Member con Role configurado como Viewer para un contacto de cliente.*

Fleet Manager envía por correo un enlace de invitación. La invitación aparece en **Pending Invitations** hasta que se acepte, y vence a los **7 días**. No puedes enviar una segunda invitación a un correo que ya tiene una pendiente: revoca primero la anterior.

> **Invita con el correo con el que compraron las licencias**
>
> Si esta persona es propietaria de licencias de UAVcast-Pro para drones que quieres emparejar, invítala con el mismo correo que usó en la tienda de UAVmatrix. Fleet Manager relaciona a los propietarios de licencias con los miembros por correo electrónico. Consulta [Licencias](https://docs.uavmatrix.com/es/fleet-manager/licenses/).

## Acepta una invitación

La persona invitada abre el enlace del correo. La página de invitación muestra la organización, **Invitation sent to** y **Your role** con una breve descripción.

- Si ya inició sesión: selecciona **Accept Invitation**.
- Si no ha iniciado sesión: selecciona **Sign In** bajo **Sign in to accept this invitation**. Los usuarios nuevos seleccionan **Create Account**, que abre el registro de UAVmatrix con el correo ya completado, y luego regresan a la invitación.

![Página de invitación con el nombre de la organización, el correo invitado, la descripción del rol y el botón Accept Invitation](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/invite.webp)

*Página de invitación tal como la ve el invitado: Your role Viewer, acceso solo de lectura a drones y datos de la flota, y Accept Invitation.*

Si la página dice **Invitation Expired**, **Invitation Already Used** o **Already a Member**, pide a un Owner o Admin una nueva invitación, o simplemente inicia sesión.

## Cambia el rol de un miembro

Abre el menú junto a un miembro y selecciona **Change Role → Admin** o **Viewer**. El cambio surte efecto de inmediato; puede que tengas que recargar la página para verlo. Los Admin pueden cambiar el rol de otros Admin. Nadie puede cambiar el rol del Owner: [transfiere la propiedad](https://docs.uavmatrix.com/es/fleet-manager/team/#transfer-ownership) en su lugar.

![Menú de acciones del miembro con Change Role, Transfer Ownership y Remove Member](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/team--member-menu.webp)

*Menú del miembro abierto por el Owner, con Change Role, Transfer Ownership y Remove Member.*

## Quita a un miembro o revoca una invitación

- **Quitar un miembro:** abre el menú del miembro y selecciona **Remove Member**. Pierde el acceso de inmediato. El Owner no puede ser quitado.
- **Revocar una invitación:** en **Pending Invitations**, selecciona **Revoke**. El enlace deja de funcionar.

> **Sin paso de confirmación**
>
> **Remove Member** y **Transfer Ownership** actúan en cuanto los seleccionas. Revisa el nombre antes de hacer clic.

Quitar a un miembro no afecta a los drones. Pero si esa persona es propietaria de las licencias de drones que quieres emparejar más adelante, el emparejamiento fallará hasta que vuelva a ser miembro.

## Transfiere la propiedad

Solo el Owner puede hacer esto. Abre el menú del miembro que debe asumir el cargo y selecciona **Transfer Ownership**. Ese miembro se convierte en **Owner**, y tú pasas a ser **Admin**.

Úsalo cuando la persona que configuró la organización se vaya, o antes de eliminar tu cuenta de UAVmatrix: Fleet Manager no elimina una cuenta que todavía es propietaria de una organización.

## Trabajar con clientes y socios

Un usuario puede ser miembro de cualquier cantidad de organizaciones, con un rol distinto en cada una. Configuraciones típicas:

- **Proveedor de servicios:** tu personal son Admin en tu organización. Cada cliente recibe un rol de Viewer para seguir sus vuelos en vivo en el mapa.
- **Subcontratista:** un socio invita a tu piloto como Admin en su organización. Tu piloto cambia entre ambas con el selector de organizaciones.

Source: https://docs.uavmatrix.com/es/fleet-manager/team/
