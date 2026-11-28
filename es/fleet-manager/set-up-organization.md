# Configura tu organización

> Inicia sesión en Fleet Manager con tu cuenta de UAVmatrix, crea la organización a la que pertenecen tus drones y tu equipo, y cámbiala, renómbrala o elimínala.

Todo en Fleet Manager pertenece a una organización: drones, misiones, la red VPN, las vinculaciones de stream y los miembros del equipo. Crea una antes de emparejar tu primer dron.

## Inicia sesión

Fleet Manager no tiene una contraseña aparte. Inicia sesión con tu cuenta de UAVmatrix, la misma que usas en [uavmatrix.com](https://uavmatrix.com/) para comprar y administrar licencias de UAVcast-Pro.

1. Ve a [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) y selecciona **Sign In** (o **Get Started**).
2. Inicia sesión en la página de UAVmatrix a la que se te envía. Si aún no tienes cuenta, crea una allí.
3. Vuelves al **Dashboard** de Fleet Manager.

> **Inicia sesión con el correo que es dueño de tus licencias**
>
> Fleet Manager solo acepta un dron cuando su licencia de UAVcast-Pro pertenece a un miembro de la organización, con coincidencia por correo electrónico. Iniciar sesión con la cuenta con la que compraste las licencias te evita una solicitud de soporte más adelante. Consulta [Licencias](https://docs.uavmatrix.com/es/fleet-manager/licenses/).

Los datos del perfil (nombre, correo electrónico, contraseña) se administran en tu cuenta de UAVmatrix, no en Fleet Manager. **Settings → Profile** enlaza allí.

## Crea la organización

1. Abre el selector de organizaciones en la parte superior de la barra lateral y selecciona **Create organization**. Si aún no tienes organización, páginas como **Fleet** y **Network** también muestran **No Organization Yet** con un botón **Create Organization**.
2. Escribe un **Organization Name** (de 2 a 50 caracteres), por ejemplo el nombre de tu empresa o "Survey Operations North". Agrega una **Description (optional)** si lo deseas.
3. Selecciona **Create**.

![Diálogo Create Organization con los campos Organization Name y Description](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/onboarding--create-organization.webp)

*Diálogo Create Organization, completado con un nombre de empresa como Nordic Aerial Survey AS.*

Te conviertes en **Owner** de la organización. Fleet Manager también crea en segundo plano una red VPN privada para la organización. Permanece apagada hasta que [habilites la VPN](https://docs.uavmatrix.com/es/fleet-manager/network/).

> **Una organización por propietario**
>
> Cada usuario puede crear (ser dueño de) una organización. Si intentas crear una segunda, Fleet Manager responde **You already own an organization**. Aun así puedes ser Admin o Viewer en cualquier cantidad de otras organizaciones, por ejemplo la de un cliente o un socio.

## Cambia entre organizaciones

Si perteneces a más de una organización, el selector en la parte superior de la barra lateral las lista bajo **Organizations**. La organización que elijas determina lo que muestran **Fleet**, **Fleet Map**, **Missions**, **Network** y el panel. Fleet Manager recuerda tu elección en este navegador.

![Selector de organizaciones de la barra lateral abierto, con dos organizaciones listadas](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/dashboard--organization-switcher.webp)

*Selector de organizaciones abierto, con Nordwind Aerial Services y Nordwind R&D Sandbox.*

## Renombra o elimina la organización

Ve a **Settings → Organizations**. La pestaña lista las organizaciones en las que eres Owner o Admin.

- **Renombrar o cambiar la descripción:** Owner o Admin. Edita **Name** o **Description** y selecciona **Save Changes**.
- **Eliminar:** solo Owner. Selecciona **Delete Organization** y confirma. Esto elimina todos los drones, su historial de telemetría, las misiones, las vinculaciones de stream y las membresías del equipo, y no se puede deshacer.

![Pestaña Organizations de Settings con nombre, descripción y el botón Delete Organization](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/settings--organizations.webp)

*Settings → Organizations para el Owner, con Save Changes y Delete Organization.*

> **Desempareja los drones antes de eliminar una organización**
>
> Eliminar la organización no avisa a los drones. Seguirán intentando reconectarse hasta que selecciones **Disconnect from Fleet** en UAVcast-Pro en cada uno. Quita primero los drones desde su página UAV (consulta [Quitar o transferir un dron](https://docs.uavmatrix.com/es/fleet-manager/fleet/remove-or-transfer/)) para que Fleet Manager los desempareje por ti.

Para entregar la organización a otra persona, [transfiere la propiedad](https://docs.uavmatrix.com/es/fleet-manager/team/#transfer-ownership).

## Siguientes pasos

- [Añade tu primer dron](https://docs.uavmatrix.com/es/fleet-manager/pair-uav/)
- [Invita a tu equipo](https://docs.uavmatrix.com/es/fleet-manager/team/)

Source: https://docs.uavmatrix.com/es/fleet-manager/set-up-organization/
