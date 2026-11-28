# VLC y RTSP

> Reproduce el video H.264 RTP de UAVcast-Pro en VLC con un archivo SDP, o toma la cámara del dron por RTSP en el puerto 8554 para una computadora de grabación, un muro de video o software de terceros.

VLC puede reproducir el stream de UAVcast-Pro con un pequeño archivo SDP que lo describe. Si prefieres obtener el video desde el dron en lugar de que se te envíe, el servidor multimedia del dron también ofrece cada cámara por RTSP. Ambos añaden más retardo que QGroundControl, Mission Planner o GStreamer, así que úsalos para ver y grabar, no para volar.

## Reproducir el stream UDP en VLC

1. En el dron, agrega un destino en [Estaciones de control en tierra](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/) con la IP de esta computadora y **Habilitar Video** activado.

2. Guarda este contenido como `uavcast.sdp`:

   ```text
   v=0
   o=- 0 0 IN IP4 127.0.0.1
   s=UAVcast-Pro
   c=IN IP4 0.0.0.0
   t=0 0
   m=video 5600 RTP/AVP 96
   a=rtpmap:96 H264/90000
   ```

3. Ábrelo en VLC con **Media → Open File**.

Para la cámara 2 con doble stream, crea una copia con `m=video 5601`. Para agregar la pista de audio, añade al final:

```text
m=audio 5602 RTP/AVP 97
a=rtpmap:97 opus/48000/2
```

Para reducir el retardo, baja **Network caching** en VLC (**Tools → Preferences → Show settings: All → Input / Codecs**). De todas formas, el retardo será mayor que con GStreamer.

## Obtener el video del dron por RTSP

Mientras la cámara funciona con **¿Activar Vista Previa en Vivo?** marcado, o con la grabación de la cámara habilitada, el servidor multimedia del dron publica cada cámara por RTSP (solo TCP) en el puerto 8554:

```text
rtsp://<drone-ip>:8554/camera     # camera 1
rtsp://<drone-ip>:8554/camera2    # camera 2 (dual stream)
```

Ábrelo en VLC (**Media → Open Network Stream**), en un sistema de gestión de video o con GStreamer:

```bash
gst-launch-1.0 rtspsrc location=rtsp://192.168.1.50:8554/camera latency=100 ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Úsalo en la red local o por la VPN. No reenvíes el puerto 8554 a internet: el stream no tiene contraseña.

## ¿Qué método debes usar?

| Lo que necesitas | Usa |
| --- | --- |
| Volar con video | [QGroundControl](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/qgroundcontrol/) o [Mission Planner](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/mission-planner/) |
| Una prueba rápida, una ventana para una segunda cámara o audio | GStreamer en [Windows](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/gstreamer-linux/) o [macOS](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/gstreamer-macos/) |
| VLC porque ya está instalado | El archivo SDP de arriba |
| Una PC o sistema que deba obtener el video por sí mismo | RTSP |

Source: https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/vlc-and-rtsp/
