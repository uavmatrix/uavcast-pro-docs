# Incorpora una flota de drones con Fleet Manager

> Planifica las licencias y luego nombra, empareja y conecta más de 20 drones UAVcast-Pro a UAVmatrix Fleet Manager, con roles de equipo, la VPN de la organización y las vinculaciones de stream.

Esta guía explica cómo incorporar una flota de, por ejemplo, 20 drones a [UAVmatrix Fleet Manager](https://docs.uavmatrix.com/es/fleet-manager/) de una sola vez: licencias, nombres, emparejamiento, la VPN de la organización y la conexión de las estaciones de control en tierra con los drones. Supone que cada dron ya ejecuta UAVcast-Pro con su controlador de vuelo conectado y acceso a internet.

## 1. Planifica las licencias

Dos reglas determinan si un dron puede emparejarse:

- **Cada dron necesita una licencia activa de UAVcast-Pro** en el dispositivo. Una licencia puede cubrir varios drones: su contador **Dispositivos Permitidos** indica el número de ranuras. Para 20 drones necesitas 20 ranuras en total, distribuidas en una o más licencias.
- **La licencia debe pertenecer a un miembro de la organización** en la que la emparejas. Fleet Manager compara la dirección de correo electrónico de la cuenta de la tienda que compró la licencia con las direcciones de correo de los miembros. Si las licencias se compraron con otra cuenta, invita esa cuenta a la organización o pide a soporte que añada el correo de compra a tu usuario.

Compruébalo antes del día del emparejamiento: un dron cuya licencia pertenece a alguien ajeno a la organización será rechazado con **License is not owned by any member of this organization**.

## 2. Configura la organización y el equipo

1. Inicia sesión en [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) con tu cuenta de uavmatrix.com y crea la organización. Consulta [Configurar una organización](https://docs.uavmatrix.com/es/fleet-manager/set-up-organization/).
2. En **Team**, invita a tu gente. Owner y Admin pueden emparejar, controlar y quitar drones; los Viewer solo pueden observar. Consulta [Roles y permisos](https://docs.uavmatrix.com/es/fleet-manager/team/roles-and-permissions/).
3. Reparte el trabajo de emparejamiento entre dos o tres Admin si tienes muchos drones. Cada usuario puede completar 5 emparejamientos por minuto; el límite impide adivinar por fuerza bruta y también ralentiza que una sola persona empareje 20 drones seguidos.

## 3. Nombra cada dron antes de emparejarlo

El nombre que tiene un dron en UAVcast-Pro se convierte en su nombre en Fleet Manager. Acuerda un patrón, por ejemplo `SURVEY-01` … `SURVEY-20`, y etiqueta los fuselajes en consecuencia.

En cada dron, abre UAVcast-Pro → **Fleet Management** y completa **Device Name**. Sin nombre, el dron aparece con su nombre de host. Más adelante puedes renombrarlo en Fleet Manager.

## 4. Empareja cada dron

Repite el proceso con cada dron. Con dos ventanas del navegador una al lado de la otra (la de UAVcast-Pro del dron y la de Fleet Manager), cada uno toma alrededor de un minuto.

1. En UAVcast-Pro, abre **Fleet Management** y presiona **Connect to Fleet Manager**. Aparece un **Pairing Code** de 8 dígitos. Caduca a los 5 minutos.
2. En Fleet Manager, ve a **Fleet → Pair Device**.
3. Selecciona **Select Organization** y luego **Enter Pairing Code**.
4. **Confirm Device**: revisa el nombre, el nombre de host, la arquitectura y la versión de UAVcast, para emparejar el dron que crees estar emparejando.
5. **VPN Connection**: marca **Enable VPN for this UAV** si las estaciones de control en tierra deben llegar al dron a través de la VPN de la organización. Si el dron ya usa Tailscale, **Replace existing VPN with Fleet Manager network** lo mueve a la red de la organización.
6. Selecciona **Complete Pairing**. En UAVcast-Pro, **Fleet Connection** cambia a **Connected**.

![Asistente de emparejamiento de Fleet Manager en el paso Confirm Device, con el nombre del UAV, el nombre de host, la arquitectura y la versión de UAVcast](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/pair-device--confirm.webp)

*Fleet → Pair Device, paso Confirm Device.*

Errores y su significado: [Código de emparejamiento no válido o caducado](https://docs.uavmatrix.com/es/troubleshooting/pairing-code-invalid/). El asistente completo se describe en [Empareja tu primer UAV](https://docs.uavmatrix.com/es/fleet-manager/pair-uav/).

## 5. Revisa la flota

Abre **Fleet**. Cada dron debe aparecer como en línea. En **Fleet Map**, cada dron aparece en su posición GPS en cuanto su controlador de vuelo obtiene señal. Un dron que muestra **Offline** no ha informado durante 20 segundos: consulta [Dron sin conexión en Fleet Manager](https://docs.uavmatrix.com/es/troubleshooting/drone-offline-fleet-manager/).

## 6. Conecta las estaciones de control en tierra

1. Ve a **Network** y presiona **Enable VPN Network** si la VPN de la organización aún no está activa.
2. Presiona **Connect a Device**, elige **Ground Control Station (GCS)** y copia el **GCS Connection Command**. Ejecútalo en una terminal **en la laptop de la estación de control en tierra**, con Tailscale instalado. No lo pegues en UAVcast-Pro.
3. La laptop aparece en **Ground Stations** una vez conectada.
4. En **Stream Bindings**, presiona **Add Stream Binding** y vincula cada dron con la estación de control en tierra que debe recibirlo. El dron debe estar en línea, porque Fleet Manager le envía el destino.
5. Cada vinculación obtiene su propio bloque de puertos en esa estación de control en tierra: el primer dron usa los predeterminados, 5600 (video) y 14550 (telemetría), y cada dron adicional recibe el siguiente bloque libre. Configura el software de la estación de control en tierra con los puertos que se muestran en cada vinculación.

![Página Network de Fleet Manager con vinculaciones de stream que conectan varios drones a una estación de control en tierra con puertos asignados automáticamente](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/network--stream-bindings.webp)

*Network → Stream Bindings: cada vinculación muestra su estación de control en tierra y sus puertos de video y telemetría.*

Detalles: [Conecta una estación de control en tierra](https://docs.uavmatrix.com/es/fleet-manager/connect-gcs/) y [Vinculaciones de stream](https://docs.uavmatrix.com/es/fleet-manager/network/stream-bindings/).

> **Dual stream y audio**
>
> Cada vinculación obtiene su propio bloque de puertos en la estación de control en tierra, con espacio para la segunda cámara del dron y el audio después de su puerto de video, de modo que varios drones pueden compartir una misma estación de control en tierra.

## 7. Uso diario

- **Re-pair required**: cuando Fleet Manager muestre esta insignia, vuelve a emparejar el dron una vez desde UAVcast-Pro. Conserva su nombre y su historial. Consulta [Quitar o transferir un UAV](https://docs.uavmatrix.com/es/fleet-manager/fleet/remove-or-transfer/).
- **Al reemplazar la tarjeta SD o la placa de un dron** no se libera nada por sí solo: desregistra el dispositivo anterior en **Aplicación → Gestor de Licencias → Dispositivos Activados** en cualquier dron que use la misma licencia, y luego empareja el nuevo.
- **Trabajo remoto en un dron**: la página de detalles del UAV en Fleet Manager tiene una terminal, registros y acciones como reiniciar. Consulta [Detalles del UAV](https://docs.uavmatrix.com/es/fleet-manager/fleet/uav-details/).

Source: https://docs.uavmatrix.com/es/guides/fleet-onboarding/
