# VPN

> Pon tu dron y tu estación de control en una misma red privada con la VPN de Fleet Manager, o con tu propia red de Tailscale o ZeroTier, para que la telemetría y el video funcionen por 4G/LTE.

Por 4G/LTE, tu dron obtiene una dirección de la operadora móvil que tu estación de control no puede alcanzar. Una VPN soluciona esto: el dron y la estación de control se unen a la misma red privada y obtienen direcciones fijas dentro de ella, estén donde estén y usen la red que usen. Abre **Red Privada Virtual** en la barra lateral.

La forma más rápida es la **VPN de Fleet Manager**, que está incluida con tu licencia de UAVcast-Pro. Si ya usas tu propia tailnet de Tailscale o tu propia red de ZeroTier, UAVcast-Pro puede unirse a esa red en su lugar.

![Página Red Privada Virtual con la VPN habilitada, Tailscale seleccionado, la pestaña Fleet Manager e Información de VPN mostrando No Conectado](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/private-network.webp)

*Red Privada Virtual con Tailscale seleccionado en un dron que todavía no está emparejado ni ha iniciado sesión.*

## ¿Cuál debo usar?

|  | Fleet Manager VPN | Tailscale | ZeroTier |
| --- | --- | --- | --- |
| Cuenta | Tu organización de Fleet Manager (incluida con tu licencia) | Tu propia cuenta de Tailscale | Tu propia red de ZeroTier (autogestionada) |
| Configuración en el dron | Un clic durante o después del emparejamiento | Inicia sesión con un enlace del navegador o con una clave de autenticación | Pega un ID de red |
| Estaciones de control | Se unen desde la página **Network** de Fleet Manager, con flujos configurados mediante vinculaciones de stream | Únete a tu tailnet | Únete a tu red |
| Ideal para | La mayoría de los operadores, y toda flota | Equipos que ya usan Tailscale | Equipos que ya usan ZeroTier |

El dron solo puede estar en una VPN a la vez desde esta página.

> **UAVnet se está retirando**
>
> UAVnet, el controlador de ZeroTier alojado por UAVmatrix en uavnet.uavmatrix.com, se está descontinuando en favor de Fleet Manager. Si tus drones usan una red UAVnet, pásalos a la VPN de Fleet Manager. El botón **Abrir Controlador UAVNet** de esta página abre UAVnet.

## Fleet Manager VPN

La VPN de Fleet Manager es la red privada de tu organización, gestionada por Fleet Manager a través del cliente de Tailscale. No necesitas una cuenta de Tailscale.

1. En Fleet Manager, abre **Network** y selecciona **Enable VPN Network** si todavía no está activada. Consulta [Red y VPN](https://docs.uavmatrix.com/es/fleet-manager/network/).
2. [Empareja el dron](https://docs.uavmatrix.com/es/uavcast-pro/fleet-pairing/) y mantén marcada la opción **Enable VPN for this UAV** en el asistente de emparejamiento. Un dron que ya está emparejado se une desde la pestaña **Fleet Manager** de esta página (ver abajo), o con **Push to Drone** en la página **Network** de Fleet Manager.
3. Pon cada estación de control en la red desde la página **Network** de Fleet Manager: [Conecta una estación de control](https://docs.uavmatrix.com/es/fleet-manager/connect-gcs/).
4. Envía los streams a ella mediante una [vinculación de stream](https://docs.uavmatrix.com/es/fleet-manager/network/stream-bindings/). Fleet Manager agrega el destino en la página [Control en Tierra](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/) del dron por ti.

Una guía paso a paso para configurar un vuelo por 4G está en [Volar fuera de la línea de visión (BVLOS) por 4G](https://docs.uavmatrix.com/es/guides/bvlos-4g/).

## Tailscale

Usa esto para tu propia tailnet, o para la VPN de Fleet Manager en un dron que ya está emparejado. UAVcast-Pro instala Tailscale. Elige cómo inicia sesión el dron en una de las tres pestañas.

**Inicio de Sesión Web**

1. Configura **Habilitar VPN** en **Sí** y elige **Tailscale** en **Servicios**.
2. En **Inicio de Sesión Web**, selecciona **Generar URL de inicio de sesión** y luego **Autenticar este dispositivo**.
3. Inicia sesión en Tailscale en la nueva pestaña y aprueba el dispositivo.
4. De vuelta en UAVcast-Pro, el estado cambia a **Conectado** y muestra la **Dirección IPv4**, el **Nombre de Host** y la **Tailnet**.

**Clave de Autenticación**

1. En la [consola de administración de Tailscale](https://login.tailscale.com/admin/settings/keys), genera una clave de autenticación. Hazla preaprobada y reutilizable si configuras varios drones.
2. En UAVcast-Pro, elige **Tailscale**, abre **Clave de Autenticación**, pega la clave (`tskey-auth-…`) y, opcionalmente, configura **Nombre de Host (Opcional)**.
3. Selecciona **Conectar con Clave de Autenticación**.

Úsalo para drones a los que no tienes un navegador a mano, o para configurar muchos drones de la misma forma.

**Fleet Manager**

Si el dron está [emparejado con Fleet Manager](https://docs.uavmatrix.com/es/uavcast-pro/fleet-pairing/) y tu organización tiene la VPN habilitada, selecciona **Connect to Fleet Manager VPN**. La conexión puede tardar hasta 30 segundos. Entonces el estado mostrará **Conectado a Fleet Manager**.

¿Todavía no está emparejado? La pestaña dice **Not Paired with Fleet Manager** y enlaza a **Go to Fleet Manager Pairing**.

Instala Tailscale en la estación de control, inicia sesión en la misma tailnet y usa su IP de Tailscale (`100.x.y.z`) como destino en **Control en Tierra**.

Cuando está conectado, **Interfaz Inactiva** desactiva la interfaz de Tailscale sin cerrar sesión, **Interfaz Activa** la vuelve a activar y **Cerrar sesión** elimina el dispositivo de la tailnet.

> **La VPN de Fleet Manager reemplaza tu propio inicio de sesión de Tailscale**
>
> La VPN de Fleet Manager funciona sobre Tailscale, con el servidor de inicio de sesión propio de Fleet Manager. Al conectarte a ella, el dron cierra sesión en tu propia tailnet. Si tu sesión SSH pasa por esa tailnet, se cortará. Hazlo desde la red local.

## ZeroTier

Úsalo si ejecutas tu propia red de ZeroTier, por ejemplo en ZeroTier Central o en tu propio controlador.

### Unir el dron

1. En UAVcast-Pro, ve a **Red Privada Virtual**.
2. Configura **Habilitar VPN** en **Sí**.
3. En **Servicios**, elige **ZeroTier**.
4. Pega el ID de red de 16 caracteres en **ID de Red** y selecciona **Unirse a la Red**.
5. Autoriza el dron en tu controlador de ZeroTier si la red es privada. El panel **ZeroTier Network** mostrará entonces **Conectado** y la **IP del Dispositivo**.

**ACCESS_DENIED** significa que el miembro todavía no está autorizado.

### Unir la estación de control

1. Instala [ZeroTier One](https://www.zerotier.com/download/) en el equipo de la estación de control.
2. Únete al mismo ID de red: en Windows y macOS, desde el icono de ZeroTier de la bandeja del sistema o de la barra de menús (**Join New Network**); en Linux, con `sudo zerotier-cli join <network-id>`.
3. Autorízala en tu controlador y anota la dirección IP que recibe.

En [Control en Tierra](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/), configura **IP o Host de Destino** con la IP de **ZeroTier** de la estación de control. La telemetría y el video ahora pasan por la VPN.

> **Cambiar entre Wi-Fi y 4G**
>
> ZeroTier y Tailscale siguen la mejor red disponible. Puedes empezar en Wi-Fi en el campo, y el enlace pasa al módem cuando el Wi-Fi se pierde fuera de alcance, sin cambiar ninguna dirección.

## Referencia de ajustes

| Ajuste | Predeterminado | Valores | Notas |
| --- | --- | --- | --- |
| **Habilitar VPN** | **No** | **Sí**, **No** |  |
| **Servicios** | **ZeroTier** | **ZeroTier**, **Tailscale** | Deshabilitado hasta habilitar la VPN. |
| **ID de Red** (ZeroTier) | vacío | ID de red de ZeroTier de 16 caracteres | Proviene de tu propio controlador de ZeroTier. |
| **Clave de Autenticación** (Tailscale) | vacío | `tskey-auth-…` |  |
| **Nombre de Host (Opcional)** (Tailscale) | nombre de host del sistema | texto | Nombre que se muestra en la consola de administración de Tailscale. |

## Resolución de problemas

| Síntoma | Qué revisar |
| --- | --- |
| ZeroTier muestra **ACCESS_DENIED** | Autoriza al miembro en tu controlador de ZeroTier. |
| Conectado, pero sin telemetría en la estación de control | El destino todavía usa la IP de la LAN. Usa la IP de VPN de la estación de control y permite UDP 14550 y 5600 en su firewall. |
| *No VPN Information Available* | La VPN está deshabilitada o el servicio no se está ejecutando. Revisa **Habilitar VPN** y los **Registros de Acción**. |
| El inicio de sesión web de Tailscale muestra *No Authentication URL* | Usa la pestaña **Clave de Autenticación** en su lugar. |

Las interfaces aparecen en la página [Redes](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/networks/) como `zt…` (ZeroTier) o `tailscale0`, marcadas como **VPN**.

¿Sigues sin poder resolverlo? Consulta [La VPN está conectada pero no se puede llegar al dron](https://docs.uavmatrix.com/es/troubleshooting/vpn-cant-reach-drone/).

Source: https://docs.uavmatrix.com/es/uavcast-pro/connectivity/vpn/
