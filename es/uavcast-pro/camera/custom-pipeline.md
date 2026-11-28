# Pipeline de GStreamer personalizado

> Usa un pipeline de GStreamer personalizado en UAVcast-Pro para transmitir una cámara IP RTSP, una cámara térmica, H.265 o un patrón de prueba, con ejemplos y el comportamiento de la vista previa y de los destinos.

Cuando el soporte de cámaras integrado no cubre tu cámara, proporciona a UAVcast-Pro tu propio pipeline de GStreamer. Los casos típicos son una cámara IP RTSP o de gimbal, una cámara térmica, H.265 o el envío a una dirección fija. UAVcast-Pro ejecuta el pipeline como servicio de cámara, lo reinicia si falla y puede seguir alimentando la vista previa en vivo y el grabador.

## Configurar un pipeline personalizado

1. Ve a **Cámara → Ajustes de cámara**.
2. Haz clic en la ranura **CAM 1** y elige **Ingresar Pipeline Personalizado**.
3. Escribe el pipeline en **Pipeline Personalizado**, sin el prefijo `gst-launch-1.0`. (Si lo pegas con el prefijo, UAVcast-Pro lo elimina.)
4. Selecciona **Iniciar** (o **Reiniciar**) y revisa los **Registros de Acción** por si hay errores.

> **Un pipeline personalizado ignora tu lista de estaciones de control en tierra**
>
> El pipeline decide a dónde va el video. **Puerto de Video** y **Habilitar Video** en las [Estaciones de Control en Tierra](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/) no tienen efecto: coloca la dirección y el puerto de la estación en el `udpsink` del pipeline.

Prueba el pipeline por SSH con `gst-launch-1.0 -v <pipeline>` antes de pegarlo. Los mensajes de error son más claros allí.

## Ejemplos

```text
videotestsrc ! x264enc ! video/x-h264, stream-format=byte-stream ! rtph264pay ! udpsink host=192.168.0.100 port=5600
```

```text
rtspsrc location=rtsp://192.168.144.25:8554/main.264 latency=0 ! rtph264depay ! h264parse ! rtph264pay config-interval=1 pt=96 ! udpsink host=10.147.17.20 port=5600 sync=false
```

```text
v4l2src device=/dev/video0 ! video/x-raw,width=1280,height=720,framerate=30/1 ! videoconvert ! x264enc tune=zerolatency speed-preset=superfast bitrate=1500 key-int-max=30 ! h264parse config-interval=1 ! rtph264pay pt=96 ! udpsink host=10.147.17.20 port=5600 sync=false
```

```text
videotestsrc ! x264enc tune=zerolatency ! rtph264pay pt=96 ! multiudpsink clients=10.147.17.20:5600,10.147.17.21:5600
```

Reemplaza las direcciones IP por las de tus estaciones de control en tierra (direcciones VPN sobre 4G).

## Vista previa en vivo y grabación

Con la opción **¿Activar Vista Previa en Vivo?** marcada, UAVcast-Pro añade a tu pipeline una rama que envía el video codificado al servidor de medios integrado, de modo que la vista previa, la ventana de video del Mapa de Vuelo y la grabación sigan funcionando. Encuentra el lugar adecuado automáticamente:

- Si tu pipeline tiene `tee name=t`, añade una rama desde ese tee.
- Si no, divide el stream justo antes de `rtph264pay` o `rtph265pay`.
- Para una fuente RTSP sin un parser reconocido, deja el pipeline como está y no habrá vista previa.

Para obtener un resultado más predecible, termina tu stream codificado con `h264parse` y un `tee name=t`, y coloca tu propio `udpsink` en una rama de ese tee.

## Limitaciones

- Dual stream, el cambio por RC y los ajustes por cámara no se aplican a un pipeline personalizado. El pipeline es toda la configuración de video.
- Los ajustes de Resolución, FPS, Tasa de bits y Configuración de Volteo quedan ocultos, porque los define el pipeline.

Source: https://docs.uavmatrix.com/es/uavcast-pro/camera/custom-pipeline/
