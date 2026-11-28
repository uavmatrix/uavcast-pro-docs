# Mission Planner

> Conecta Mission Planner a un dron UAVcast-Pro: MAVLink por UDP 14550, video H.264 en vivo en el HUD con la fuente GStreamer exacta, firewall de Windows, una segunda cámara y errores comunes.

Mission Planner recibe la telemetría de UAVcast-Pro por el puerto UDP 14550 y muestra el video en vivo en su HUD a través de una fuente GStreamer en el puerto 5600. La telemetría necesita un solo clic; el video necesita un pipeline pegado una vez, que Mission Planner recuerda.

## Antes de empezar

- En el dron, un destino en [Control en Tierra](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/) con la IP de esta PC (la dirección VPN por 4G), **Habilitar Telemetría** activado y, para el video, **Habilitar Video** activado.
- La cámara transmitiendo en **Cámara → Ajustes de cámara**.
- Una versión actual de Mission Planner en Windows. Encuentra la IP de esta PC con `ipconfig` en un Símbolo del sistema.

## Conectar la telemetría

1. En la esquina superior derecha de Mission Planner, elige **UDP** en el menú desplegable de conexión. La tasa de baudios se ignora.
2. Selecciona **Connect**.
3. Cuando pida el puerto de escucha, deja `14550` (o el **Puerto de Telemetría** que configuraste en el dron) y selecciona **OK**.
4. Mission Planner descarga los parámetros y el dron aparece en el mapa.

![Vista Flight Data de Mission Planner conectada por UDP: el recuadro de conexión superior derecho muestra UDP, el enlace UDP14550-1-QUADRO y el botón DISCONNECT; el HUD muestra DISARMED, Unhealthy AHRS y GPS: No Fix](https://docs.uavmatrix.com/es/img/screenshots/gcs/mission-planner--connected.webp)

*Conectado. El recuadro superior derecho muestra UDP y el enlace UDP14550-1-QUADRO, y el botón ahora dice DISCONNECT. Es una configuración de banco sin GPS, por lo que el HUD muestra DISARMED, Unhealthy AHRS y GPS: No Fix.*

## Mostrar el video en el HUD

1. Haz clic derecho en el HUD (el horizonte artificial) y elige **Video → Set GStreamer Source**.

2. Pega este pipeline y selecciona **OK**:

   ```text
   udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
   ```

3. El video reemplaza el fondo del HUD en unos segundos. Los datos de vuelo se mantienen encima de él.

*Ilustración de Mission Planner: menú contextual del clic derecho sobre el HUD con Video resaltado y su elemento del submenú Set GStreamer Source.*

*Ilustración Mission Planner, simplificado. (1) Haz clic derecho en el HUD, (2) Video, (3) Set GStreamer Source, luego pega el pipeline.*

Mission Planner usa su propia copia de GStreamer para el HUD, así que no necesitas la instalación separada de [GStreamer en Windows](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/gstreamer-windows/) para esto. Si Mission Planner ofrece descargar GStreamer, acéptalo.

Mantén el final del pipeline exactamente como se muestra: Mission Planner necesita `video/x-raw,format=BGRA ! appsink name=outsink` para dibujar la imagen. Cambia solo el puerto.

### Latencia más baja

`rtpjitterbuffer` suaviza los paquetes que llegan tarde, a costa de unos 200 ms de retraso. En un buen enlace puedes reducirlo:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer latency=0 ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink sync=false
```

En un enlace 4G débil, mantén el búfer de jitter predeterminado; la imagen se fragmenta menos.

## Permitir Mission Planner en el firewall de Windows

Windows pregunta la primera vez que Mission Planner escucha en la red. Permítelo en las redes **Privadas** y **Públicas**. Un adaptador de ZeroTier o Tailscale suele clasificarse como **Público**, así que marcar solo Privada bloquea la VPN.

Si descartaste el aviso, abre los puertos en un PowerShell como administrador:

```powershell
New-NetFirewallRule -DisplayName "UAVcast-Pro telemetry" -Direction Inbound -Protocol UDP -LocalPort 14550 -Action Allow
New-NetFirewallRule -DisplayName "UAVcast-Pro video" -Direction Inbound -Protocol UDP -LocalPort 5600-5602 -Action Allow
```

## Segunda cámara (doble stream)

Con el [doble stream](https://docs.uavmatrix.com/es/uavcast-pro/camera/multi-camera/) activado, la cámara 2 va a **Puerto de Video (Cámara 2)**, por defecto `5601`. El HUD de Mission Planner muestra una sola fuente. Cambia la fuente del HUD al puerto 5601 cuando necesites la cámara 2, o mira la cámara 2 en una ventana de GStreamer aparte: consulta [GStreamer en Windows](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/gstreamer-windows/).

Mission Planner ignora el audio (Puerto de Video + 2). Reprodúcelo con GStreamer.

## Problemas comunes

| Síntoma | Causa y solución |
| --- | --- |
| Conecta por Wi-Fi, pero nada por 4G | El destino usa la IP de la LAN. Usa la IP VPN de esta PC. |
| *No heartbeat packets received* | El dron no envía a esta PC: IP incorrecta, **Habilitar Telemetría** desactivado o el firewall bloquea UDP 14550. |
| La telemetría funciona, el HUD sigue negro | **Habilitar Video** está desactivado para este destino, la cámara no está transmitiendo o UDP 5600 está bloqueado. Prueba con [GStreamer en Windows](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/gstreamer-windows/). |
| El video se congela o se ve gris con manchas | Pérdida de paquetes. Reduce el bitrate en el dron y configura **Tasa de Recuperación del Stream** en 15–30 fotogramas. |
| El video se detiene cuando se abre otro programa | Solo un programa puede escuchar en un puerto UDP. Cierra la ventana de GStreamer o QGroundControl que también usa 5600. |

Más verificaciones: [Sin video en QGroundControl o Mission Planner](https://docs.uavmatrix.com/es/troubleshooting/no-video-in-gcs/) y [Sin telemetría en la estación de control en tierra](https://docs.uavmatrix.com/es/troubleshooting/no-telemetry-in-gcs/).

Source: https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/mission-planner/
