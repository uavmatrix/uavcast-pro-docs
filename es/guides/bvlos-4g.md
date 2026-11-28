# Volar más allá del alcance visual por 4G

> Vuela un dron por 4G/LTE con UAVcast-Pro, un módem celular y la VPN de Fleet Manager, con telemetría y video en vivo en QGroundControl o Mission Planner.

Esta guía lleva un dron desde el banco de pruebas hasta un vuelo a través de la red celular: telemetría y video en vivo en QGroundControl o Mission Planner, siempre que ambos extremos tengan cobertura. Usa la VPN que incluye [Fleet Manager](https://docs.uavmatrix.com/es/fleet-manager/), que viene con tu licencia de UAVcast-Pro, así que ninguno de los dos lados necesita una IP pública ni reenvío de puertos.

**Tiempo:** alrededor de una hora. **Necesitas:**

- Una computadora de a bordo (Raspberry Pi 4 o 5, u otra [placa compatible](https://docs.uavmatrix.com/es/reference/supported-hardware/)) con UAVcast-Pro [instalado](https://docs.uavmatrix.com/es/get-started/installation/) y la [licencia activada](https://docs.uavmatrix.com/es/get-started/license-activation/).
- Un controlador de vuelo MAVLink (ArduPilot o PX4), un cable de datos USB o cableado TELEM.
- Un módem USB 4G/LTE y una SIM de datos. Desactiva primero el PIN de la SIM en un teléfono; te ahorrará problemas.
- Una cámara, si quieres video.
- Una laptop con QGroundControl o Mission Planner, y el [cliente de Tailscale](https://tailscale.com/download).
- Una [organización en Fleet Manager](https://docs.uavmatrix.com/es/fleet-manager/set-up-organization/) en la que seas Owner o Admin.

> **Reglas para volar fuera de la línea de visión directa (BVLOS)**
>
> Volar fuera de la línea de visión directa (BVLOS) requiere autorización en la mayoría de los países. UAVcast-Pro te proporciona el enlace; la aprobación operacional, la evaluación de riesgos y los sistemas de seguridad son tu responsabilidad.

## Cómo encaja todo

```text
Flight controller ──USB/UART── UAVcast-Pro ──4G──► internet ──► laptop
                                    │                               │
                                    └──── Fleet Manager VPN ────────┘
                  telemetry and video on the ports of the stream binding
```

El dron envía MAVLink y video H.264 a la dirección VPN de tu laptop. La VPN hace que la laptop sea accesible por 4G como si ambos estuvieran en la misma red local.

> **¿Prefieres usar tu propia VPN?**
>
> Puedes usar tu propia red de ZeroTier o tu tailnet de Tailscale en lugar de Fleet Manager: consulta [VPN](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/vpn/) y [Acceso remoto con Tailscale](https://docs.uavmatrix.com/es/guides/remote-access-tailscale/). Los pasos 1, 2 y 7 a 9 de abajo siguen siendo los mismos.

## 1. Conecta el controlador de vuelo

1. Conecta el controlador de vuelo a la computadora de a bordo por USB, o cablea un puerto TELEM (TX→RX, RX→TX, GND→GND) y habilita MAVLink en ese puerto (`SERIALx_PROTOCOL = 2` en ArduPilot, `MAV_x_CONFIG` en PX4).
2. En UAVcast-Pro, abre **Controlador de Vuelo → Conexión**. Elige **USB** o **UART / Serial** en **Tipo de enlace**, y deja **Puerto** y **Tasa de baudios** en **Automático**.
3. Espera a que el estado sea **Conectado** y aparezca un vehículo en **Vehículo**. Si sigue en **Sin heartbeat**, consulta [Sin heartbeat de MAVLink](https://docs.uavmatrix.com/es/troubleshooting/no-mavlink-heartbeat/).

## 2. Configura el módem

1. Conecta el módem y abre **Módem**.
2. Establece **¿Habilitar módem celular?** en **Sí** y elige el **Tipo de módem**: **HiLink** para módems que funcionan como adaptador de red USB (por ejemplo, Huawei E3372h), **Tradicional (PPP)** para el resto.
3. En un módem tradicional, deja **Nombre del Punto de Acceso (Opcional)** vacío. UAVcast-Pro encuentra el APN de tu SIM y lo recuerda.
4. En **Información del Módem**, espera a que aparezcan un operador y una dirección IPv4.
5. Ve a **Redes** y elige **Prioridad Módem (Modo Exterior)**, para que el tráfico salga por el módem incluso cuando haya Wi-Fi cerca.

Detalles: [Módem celular](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/cellular-modem/). Si el módem se conecta pero no carga nada: [Módem conectado, sin internet](https://docs.uavmatrix.com/es/troubleshooting/modem-no-internet/).

## 3. Activa la VPN en Fleet Manager

En Fleet Manager, abre **Network**. Si muestra **Enable VPN Network**, selecciónalo. Esto crea la red privada de tu organización. Consulta [Red y VPN](https://docs.uavmatrix.com/es/fleet-manager/network/).

## 4. Empareja el dron y ponlo en la VPN

1. En UAVcast-Pro, ve a **Gestión → Fleet Management** y selecciona **Connect to Fleet Manager**. Anota el código de 8 dígitos.
2. En Fleet Manager, ve a **Fleet → Pair Device**, ingresa el código y confirma el dispositivo.
3. En el paso **VPN Connection**, deja marcada la opción **Enable VPN for this UAV** y selecciona **Complete Pairing**.
4. El dron aparece en **Network → Connected Devices** con el tipo **UAV** y una dirección `100.x.y.z`.

Guía completa: [Añade tu primer dron a Fleet Manager](https://docs.uavmatrix.com/es/fleet-manager/pair-uav/).

## 5. Conecta la laptop a la VPN

1. Instala Tailscale en la laptop. No necesitas una cuenta de Tailscale: Fleet Manager ejecuta su propio servidor VPN.
2. En Fleet Manager, en **Network → Devices**, copia el **GCS Connection Command** bajo **Connect a Device** y ejecútalo en la laptop como administrador (`sudo` en macOS y Linux).
3. La laptop aparece en **Connected Devices**. En la columna **Type**, selecciona **Configure**, elige **Ground Control Station (GCS)** y selecciona **Complete Setup**.
4. Prueba: `ping <drone VPN IP>` desde la laptop. Ya puedes abrir la interfaz web del dron en `http://<drone VPN IP>/`.

Detalles y capturas de pantalla: [Conecta una estación de control en tierra](https://docs.uavmatrix.com/es/fleet-manager/connect-gcs/).

## 6. Envía telemetría y video a la laptop

1. En Fleet Manager, ve a **Network → Stream Bindings** y selecciona **Add Binding**.
2. Elige el dron y la laptop, y luego selecciona **Create Binding**. Fleet Manager envía el destino al dron; aparece en la página **Control en Tierra** del dron con un ícono de nube.
3. Consulta los puertos de video y telemetría de la vinculación de stream en la columna **Ports**. Para el primer dron en una laptop, son los predeterminados, `5600` y `14550`.
4. En la laptop, permite UDP entrante en esos puertos en el cortafuegos (firewall) (comandos en [Sin video, comprobación 3](https://docs.uavmatrix.com/es/troubleshooting/no-video-in-gcs/#check-3)).

## 7. Inicia la cámara

1. Abre **Cámara → Ajustes de cámara**, establece **¿Habilitar Cámara?** en **Sí** y elige la cámara en **Seleccionar Cámara**.
2. Para LTE, empieza con **Resolución** 1280×720, **Seleccionar FPS** 15–20 y **Tasa de bits:** alrededor de 1000–1500 kbps.
3. Los ajustes se guardan al cambiarlos. Presiona **Iniciar** si la cámara aún no está en funcionamiento.

## 8. Abre la estación de control en tierra

- **QGroundControl** se conecta sola al UDP 14550. Para el video, en los ajustes de video, establece **Source** en **UDP h.264 Video Stream** en el puerto de video de la vinculación.
- **Mission Planner**: elige **UDP**, presiona **Connect**, e ingresa el puerto de telemetría de la vinculación. Para el video, configura la fuente de GStreamer como se describe en la página de [Mission Planner](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/mission-planner/).

## 9. Prueba con 4G antes de volar

1. Apaga el Wi-Fi de la computadora de a bordo, o aleja el dron de ella, para que la única ruta sea el módem.
2. Revisa el tablero: **Cellular** conectado, **VPN** conectada, **Ground station** *Sending*, **Video** en ejecución.
3. Observa el enlace durante 10 minutos en tierra, idealmente en el sitio de despegue. Busca congelamientos de video y pérdidas de telemetría.
4. En **Controlador de Vuelo → Conexión**, revisa **Información de Failsafe de GCS**. Si muestra **Advertencia - Failsafe deshabilitado**, habilita el failsafe de GCS en el controlador de vuelo (ArduPilot: `FS_GCS_ENABL` en Plane, `FS_GCS_ENABLE` en Copter; PX4: `NAV_DLL_ACT`) y elige su acción, para que el dron actúe por sí mismo cuando se caiga el enlace.

> **Graba cada vuelo**
>
> Activa **Grabar automáticamente al armar** en **Cámara → Grabaciones → Ajustes**. Así obtienes el video y un registro de telemetría de cada vuelo para revisarlo más tarde: [Graba vuelos y revísalos](https://docs.uavmatrix.com/es/guides/recording-flight-review/).

> **UAVnet se está retirando**
>
> UAVnet, el controlador ZeroTier alojado de UAVmatrix, se está descontinuando en favor de Fleet Manager. Si tus drones usan hoy una red de UAVnet, muévelos a la VPN de Fleet Manager como se describe arriba.

## Próximos pasos

- [Transmite a varias estaciones de control en tierra](https://docs.uavmatrix.com/es/guides/multiple-ground-stations/)
- [Añade correcciones RTK desde un caster NTRIP](https://docs.uavmatrix.com/es/guides/rtk-ntrip-caster/)
- ¿Administras varios drones? [Incorpora una flota con Fleet Manager](https://docs.uavmatrix.com/es/guides/fleet-onboarding/)

Source: https://docs.uavmatrix.com/es/guides/bvlos-4g/
