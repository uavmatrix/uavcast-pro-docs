# Sin video en QGroundControl o Mission Planner

> ¿La telemetría funciona, pero el video sigue en negro en QGroundControl o Mission Planner? Revisa la cámara, Habilitar Video, la IP de destino, el UDP 5600 y la estación de control.

Llega la telemetría y el dron aparece en el mapa, pero el área de video permanece en negro, o la ventana de video de QGroundControl dice **WAITING FOR VIDEO**. Sigue las comprobaciones en orden. La mayoría de los casos se resuelven con la comprobación 2 o la 3.

![Vista Fly de QGroundControl conectada a un vehículo ArduPilot: barra de herramientas con Not Ready y Stabilize, una misión de cinco puntos de ruta en el mapa con No GPS Lock for Vehicle, y la ventana de video en la esquina inferior izquierda mostrando WAITING FOR VIDEO](https://docs.uavmatrix.com/es/img/screenshots/gcs/qgroundcontrol--fly-view.webp)

*El síntoma en QGroundControl: la telemetría llega (Not Ready y Stabilize en la barra de herramientas; No GPS Lock porque esta configuración de banco no tiene GPS), pero la ventana de video en la esquina inferior izquierda dice WAITING FOR VIDEO.*

| Lo que ves | Causa probable | Empieza en |
| --- | --- | --- |
| El video está en negro en la estación de control y en la vista previa en vivo de UAVcast-Pro | La cámara no está transmitiendo en el dron | [Verificación 1](https://docs.uavmatrix.com/es/troubleshooting/no-video-in-gcs/#check-1) |
| La vista previa en vivo funciona, pero la estación de control sigue en negro | Habilitar Video está desactivado para esta estación de control, o la IP es incorrecta | [Verificación 2](https://docs.uavmatrix.com/es/troubleshooting/no-video-in-gcs/#check-2) |
| Funcionaba en Wi-Fi en casa, en negro por 4G | El destino usa una IP local en lugar de la IP de la VPN | [Verificación 2](https://docs.uavmatrix.com/es/troubleshooting/no-video-in-gcs/#check-2) |
| Todo parece correcto, pero sigue en negro en Windows | El firewall bloquea el UDP entrante en el puerto 5600 | [Verificación 3](https://docs.uavmatrix.com/es/troubleshooting/no-video-in-gcs/#check-3) |
| QGroundControl muestra video, Mission Planner no | Mission Planner no tiene una fuente GStreamer configurada | [Verificación 4](https://docs.uavmatrix.com/es/troubleshooting/no-video-in-gcs/#check-4) |

## Comprobación 1: Confirma que la cámara transmite en el dron

Si el dron no produce video, ninguna configuración de la estación de control servirá de ayuda.

1. Abre la interfaz web de UAVcast-Pro y ve a **Cámara → Ajustes de cámara**.
2. Revisa que **¿Habilitar Cámara?** esté en **Sí** y que haya una cámara elegida en **Seleccionar Cámara**.
3. Revisa que la cámara esté en marcha: la fila **Video** del Tablero debe decir **Running**. Si está detenida, presiona **Iniciar** en la página Cámara (el botón dice **Reiniciar** mientras la cámara funciona).
4. Activa **¿Activar Vista Previa en Vivo?** y observa **Vista Previa en Vivo**. Si ves una imagen, la cámara funciona y puedes pasar a la comprobación 2.
5. Si **Seleccionar Cámara** dice **No hay cámaras disponibles**, ve a [Cámara no detectada](https://docs.uavmatrix.com/es/troubleshooting/camera-not-detected/).

![Página de ajustes de cámara de UAVcast-Pro con CAM 1 habilitada y el panel de Vista Previa en Vivo mostrando Sin video disponible](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/camera.webp)

*Cámara → Ajustes de cámara con CAM 1 habilitada. Vista Previa en Vivo muestra Sin video disponible hasta que se marque ¿Activar Vista Previa en Vivo?.*

> **La vista previa no es el stream de la estación de control**
>
> La vista previa del navegador pasa por el servidor de medios integrado (WebRTC en el puerto 8889). La estación de control recibe un stream H.264 separado por UDP. Una vista previa que funciona demuestra que la cámara funciona, pero no que el stream UDP llegue a tu portátil.

Si los **Registros de Acción** de la página Cámara dicen que una cámara *no admite* una resolución, elige otro valor en **Resolución**. UAVcast-Pro usa el tamaño compatible más grande y registra cuál utilizó.

## Comprobación 2: Revisa el destino de la estación de control

UAVcast-Pro solo envía video a los destinos donde el video está activado. La telemetría y el video tienen interruptores separados, y **ambos están desactivados en un destino nuevo**.

1. Ve a **Control en Tierra** y busca la tarjeta de la computadora que ejecuta tu estación de control.
2. Asegúrate de que **Enable Endpoint** y **Habilitar Video** estén activados.
3. Revisa **IP o Host de Destino**. Debe ser la dirección IPv4 de la computadora de la estación de control, vista desde el dron. No se aceptan nombres de host.
4. Revisa que **Puerto de Video** sea `5600`, o el puerto en el que escucha tu estación de control.
5. Los campos se guardan al salir de ellos o al presionar Enter. Una marca verde confirma el guardado.

![Puerto de Video 5600 y el interruptor Habilitar Video activado](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/ground-control--video-enabled.webp)

*Control en Tierra: un destino con Habilitar Video activado y Puerto de Video 5600.*

> **¿Volando por 4G? Usa la IP de la VPN**
>
> Sobre un enlace celular, el dron no puede alcanzar la dirección local de tu portátil (como `192.168.1.20`). Usa la dirección que tu portátil tiene en la VPN (VPN de Fleet Manager, Tailscale o ZeroTier). En Windows, ejecuta `ipconfig` y busca el adaptador de Tailscale o ZeroTier.

¿Usas Fleet Manager? Los destinos se crean por ti cuando agregas una vinculación de stream, y cada dron adicional en la misma estación de control recibe sus propios puertos. Revisa el puerto de video que aparece en la vinculación, no el 5600. Consulta [Vinculaciones de stream](https://docs.uavmatrix.com/es/fleet-manager/network/stream-bindings/).

## Comprobación 3: Permite el UDP 5600 en el firewall

El video llega como tráfico UDP entrante. En Windows esto está bloqueado por defecto, incluso cuando la telemetría sí llega, porque la estación de control solicitó una excepción.

**Windows**

Abre **PowerShell como administrador** y ejecuta:

```powershell
New-NetFirewallRule -DisplayName "UAV Video" -Direction Inbound -Protocol UDP -LocalPort 5600 -Action Allow
New-NetFirewallRule -DisplayName "MAVLink Telemetry" -Direction Inbound -Protocol UDP -LocalPort 14550 -Action Allow
```

Los adaptadores de ZeroTier y Tailscale suelen clasificarse como red *Pública*. Una regla creada así se aplica a todos los perfiles.

**Linux**

```bash
sudo ufw allow 5600/udp comment 'UAV Video'
sudo ufw allow 14550/udp comment 'MAVLink Telemetry'
```

**macOS**

El firewall de macOS permite el UDP entrante para las apps que apruebes. Si presionaste *Denegar* cuando QGroundControl se inició por primera vez, vuelve a permitirlo en **Ajustes del Sistema → Red → Firewall → Opciones**.

## Comprobación 4: Configura el video en tu estación de control

**QGroundControl**

1. Haz clic en el icono **Q** y luego en **Application Settings**.
2. Abre los ajustes de video (**Video**, o **General → Video** en versiones anteriores).
3. Establece **Source** en **UDP h.264 Video Stream** y verifica que la dirección UDP use el puerto `5600` (**UDP URL** `0.0.0.0:5600` en las versiones actuales, **UDP Port** `5600` en las anteriores).
4. Vuelve a la vista Fly. El mosaico de video debe mostrar una imagen en pocos segundos.

**Mission Planner**

Mission Planner muestra el video en el HUD. Si sigue en negro, configura la fuente manualmente:

1. Haz clic derecho en el HUD y elige **Video → Set GStreamer Source**.
2. Pega este pipeline y confirma:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

## Comprobación 5: Prueba el stream sin la estación de control

Esto saca el software de la estación de control del proceso. Si se abre una ventana con video, el dron, la red y el firewall están bien, y el problema está en la configuración de la estación de control.

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

> **Windows: elige la instalación Complete**
>
> Al instalar GStreamer (runtime MSVC de 64 bits), elige **Complete**. La instalación Typical omite el decodificador H.264 y el comando falla con `no element "avdec_h264"`.

Cierra la prueba antes de volver a abrir tu estación de control: solo un programa puede escuchar en el puerto 5600 a la vez. Configuración del receptor paso a paso: [Mission Planner](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/mission-planner/), [QGroundControl](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/qgroundcontrol/), y GStreamer en [Windows](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/gstreamer-linux/) o [macOS](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/gstreamer-macos/).

> **¿Video ahora, pero entrecortado por 4G?**
>
> Consulta [Video entrecortado o con retraso](https://docs.uavmatrix.com/es/troubleshooting/choppy-or-delayed-video/).

## ¿Sigue sin video?

[Descarga los registros](https://docs.uavmatrix.com/es/troubleshooting/collect-logs/) con **Camera Server** seleccionado en la lista de registros y envíalos a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, junto con tu versión de UAVcast-Pro, el modelo de cámara y la estación de control que usas.

Relacionado: [Ajustes de cámara](https://docs.uavmatrix.com/es/uavcast-pro/camera/) · [Estaciones de Control en Tierra](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/)

Source: https://docs.uavmatrix.com/es/troubleshooting/no-video-in-gcs/
