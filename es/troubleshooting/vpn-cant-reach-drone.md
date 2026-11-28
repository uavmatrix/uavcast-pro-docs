# VPN conectada pero no se alcanza el dron

> ¿La VPN de Fleet Manager, Tailscale o ZeroTier dice conectada, pero no puedes hacer ping al dron? Revisa la autorización, la red o tailnet, internet y la IP de la estación de control.

Tanto el dron como tu portátil dicen estar en la VPN, pero `ping` a la dirección VPN del dron agota el tiempo de espera, la interfaz web no abre por la VPN, o la telemetría y el video no llegan.

| Lo que ves | Causa probable | Empieza en |
| --- | --- | --- |
| La red ZeroTier muestra ACCESS_DENIED, o no tiene dirección IP | El dron no está autorizado en la red | [Verificación 1](https://docs.uavmatrix.com/es/troubleshooting/vpn-cant-reach-drone/#check-1) |
| El dron está bien, pero el portátil no obtiene dirección o recibe una incorrecta | El portátil se unió a otra red o tailnet | [Verificación 2](https://docs.uavmatrix.com/es/troubleshooting/vpn-cant-reach-drone/#check-2) |
| Tailscale funcionó durante semanas y luego dejó de funcionar | La clave del dispositivo venció | [Verificación 3](https://docs.uavmatrix.com/es/troubleshooting/vpn-cant-reach-drone/#check-3) |
| La VPN del dron nunca se conecta en campo | El dron no tiene internet a través del módem | [Verificación 4](https://docs.uavmatrix.com/es/troubleshooting/vpn-cant-reach-drone/#check-4) |
| El ping funciona, pero no hay telemetría ni video | El destino de la estación de control usa una IP incorrecta | [Verificación 5](https://docs.uavmatrix.com/es/troubleshooting/vpn-cant-reach-drone/#check-5) |

## Comprobación 1: Autoriza el dron en la red

**ZeroTier:**

1. En UAVcast-Pro, abre **Red Privada Virtual**. Revisa que **Habilitar VPN** esté en **Sí**, que **Servicios** sea **ZeroTier**, y que el **ID de Red** sea el de tu controlador ZeroTier.
2. Revisa tu red en **Redes Conectadas**. Si su insignia de estado dice **ACCESS_DENIED**, el dron se unió, pero no está autorizado.
3. En tu controlador ZeroTier, abre la red y autoriza al miembro con el ID de nodo del dron.
4. De vuelta en UAVcast-Pro, espera a que la red muestre el estado `OK` y una dirección IP. Esa es la dirección que usas desde el portátil.

En una red ZeroTier privada, cada dispositivo que se una (dron, portátil, tableta) debe autorizarse una vez en el controlador antes de obtener una dirección. (Las redes UAVnet también son privadas; UAVnet se está retirando, así que pásate a la VPN de Fleet Manager).

**Tailscale:** el dron muestra **Conectado** con una **Dirección IPv4** (100.x.y.z) cuando está dentro. Si dice **No Conectado**, usa **Inicio de Sesión Web → Generar URL de inicio de sesión**, o la pestaña **Clave de Autenticación** con una clave de tu consola de administración de Tailscale.

## Comprobación 2: Pon el portátil en la misma red

Ambos extremos deben estar en la misma red ZeroTier o en el mismo tailnet.

- **ZeroTier**: en el portátil, únete al mismo ID de Red y autoriza también el portátil en tu controlador. En Windows, revisa el icono de ZeroTier en la bandeja; en Linux, ejecuta `sudo zerotier-cli listnetworks`. El estado debe ser `OK`.
- **Tailscale**: un cliente de Tailscale pertenece a un solo tailnet a la vez. En el portátil, ejecuta `tailscale status`. El dron debe aparecer en la lista. Si no aparece, el portátil inició sesión con otra cuenta o tailnet.
- **VPN de Fleet Manager**: si el dron se emparejó con Fleet Manager y VPN, está en la red de tu organización, no en tu Tailscale personal. Conecta el portátil con el comando que Fleet Manager muestra en **Network** (`tailscale up --login-server=… --authkey=…`) y ejecútalo **en el portátil, nunca en el dron**. Consulta [Conecta una estación de control](https://docs.uavmatrix.com/es/fleet-manager/connect-gcs/).

> **El emparejamiento puede reemplazar la VPN del dron**
>
> Cuando emparejas un dron en Fleet Manager con **Replace existing VPN with Fleet Manager network**, el dron sale de su red Tailscale actual y se une a la red de la organización. Los portátiles en el tailnet anterior ya no pueden alcanzarlo.

## Comprobación 3: Clave de Tailscale vencida

Las claves de dispositivo de Tailscale vencen. Cuando la clave del dron vence, este sale del tailnet hasta que vuelve a iniciar sesión. El campo **Expira** de la página **Red Privada Virtual** muestra la fecha. En la consola de administración de Tailscale puedes desactivar el vencimiento de la clave del dron, para que no salga del tailnet a mitad de un proyecto.

## Comprobación 4: El dron necesita internet primero

La VPN funciona sobre la conexión a internet propia del dron. Si el módem no tiene internet, la VPN aparece como desconectada o nunca obtiene una dirección. Primero corrige la conexión: [Módem conectado, sin internet](https://docs.uavmatrix.com/es/troubleshooting/modem-no-internet/).

## Comprobación 5: Alcanzable, pero sin datos

Si `ping <drone-vpn-ip>` funciona:

- **Interfaz web**: abre `http://<drone-vpn-ip>/`. La vista previa en vivo también necesita que el puerto 8889 sea alcanzable por la VPN.
- **Telemetría y video**: se envían *desde* el dron *hacia* la dirección indicada en **Control en Tierra → IP o Host de Destino**. Debe ser la dirección VPN del portátil, no la del dron, ni la dirección Wi-Fi del portátil. Luego consulta [Sin telemetría](https://docs.uavmatrix.com/es/troubleshooting/no-telemetry-in-gcs/) o [Sin video](https://docs.uavmatrix.com/es/troubleshooting/no-video-in-gcs/).
- **Lenta, pero funciona**: Tailscale muestra el **Relé** en uso. Una conexión por relé funciona, pero añade retraso. Algunas redes celulares no permiten conexiones directas, así que un relé puede ser lo mejor que obtengas con esa operadora.

## ¿Sigue sin alcanzarse?

[Descarga los registros](https://docs.uavmatrix.com/es/troubleshooting/collect-logs/) con **VPN Manager** seleccionado y envíalos a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, junto con la salida de `zerotier-cli listnetworks` o `tailscale status` desde el dron y desde el portátil.

Relacionado: [Ajustes de VPN](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/vpn/) · [Red de Fleet Manager](https://docs.uavmatrix.com/es/fleet-manager/network/)

Source: https://docs.uavmatrix.com/es/troubleshooting/vpn-cant-reach-drone/
