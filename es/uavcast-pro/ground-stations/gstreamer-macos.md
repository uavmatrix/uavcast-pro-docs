# GStreamer en macOS

> Instala GStreamer en una Mac con Homebrew o con el paquete oficial y reproduce el video H.264 y el audio Opus del dron UAVcast-Pro con gst-launch-1.0, además del aviso del firewall de macOS.

GStreamer reproduce el stream de video de UAVcast-Pro en una ventana desde Terminal. Úsalo para probar la ruta del video, ver una segunda cámara junto a QGroundControl o escuchar el audio. Funciona en Macs con Apple silicon e Intel.

## Antes de empezar

En el dron, añade un destino en [Control en Tierra](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/) con la IP de esta Mac (**Ajustes del Sistema → Red**; usa la dirección VPN por 4G) y activa **Habilitar Video**.

## Instalar GStreamer

**Homebrew**

```bash
brew install gstreamer
```

La fórmula de Homebrew incluye los conjuntos de plugins base, good, bad, ugly y libav, así que `avdec_h264` está incluido.

**Paquete oficial**

1. Descarga el paquete **runtime** para macOS desde [gstreamer.freedesktop.org/download](https://gstreamer.freedesktop.org/download/) e instálalo.

2. Añádelo a tu PATH en Terminal:

   ```bash
   echo 'export PATH="/Library/Frameworks/GStreamer.framework/Versions/1.0/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

Verifica la instalación con `gst-launch-1.0 --version`, y el decodificador H.264 con `gst-inspect-1.0 avdec_h264` (muestra los detalles del elemento; *No such element or plugin* significa que falta).

## Reproducir el video

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

La primera vez, macOS pregunta si `gst-launch-1.0` puede aceptar conexiones de red entrantes. Selecciona **Permitir**. Se abre una ventana cuando llega el primer fotograma clave; presiona **Ctrl+C** en Terminal para detener.

> **Lo que deberías ver**
>
> 1. La terminal imprime `Setting pipeline to PLAYING ...` y espera el video.
> 2. Cuando llegan los primeros paquetes, `-v` imprime líneas que contienen `caps = application/x-rtp`.
> 3. Se abre una ventana de video con la imagen de la cámara.
>
> Si se detiene después del paso 1, ningún video llega a esta computadora: consulta la tabla de resolución de problemas de abajo.

- **Cámara 2** en [doble stream](https://docs.uavmatrix.com/es/uavcast-pro/camera/multi-camera/): ejecútalo de nuevo con `port=5601`.
- **Latencia más baja** en un buen enlace: reemplaza `rtpjitterbuffer` por `rtpjitterbuffer latency=0`.
- Si no aparece ninguna ventana aunque lleguen paquetes, reemplaza `autovideosink` por `osxvideosink`.

## Escuchar el audio

```bash
gst-launch-1.0 udpsrc port=5602 caps="application/x-rtp, media=(string)audio, clock-rate=(int)48000, encoding-name=(string)OPUS, payload=(int)97" ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

El audio necesita que **Audio** y **Enviar audio a estaciones de control en tierra** estén activados en la página **Cámara** del dron.

## Resolución de problemas

| Mensaje o síntoma | Solución |
| --- | --- |
| *command not found: gst-launch-1.0* | Homebrew: ejecuta `brew doctor`. Paquete oficial: añade la carpeta `bin` del framework al PATH como se muestra arriba. |
| *no element "avdec_h264"* | Falta el plugin libav. Reinstala con Homebrew o instala el paquete oficial completo. |
| Se ejecuta, pero no hay ventana | No llega nada. Revisa la IP de destino, **Habilitar Video** y que hayas permitido las conexiones entrantes (**Ajustes del Sistema → Red → Firewall → Opciones**). |
| Error de bind al iniciar | QGroundControl u otro GStreamer ya usa el puerto. Ciérralo. |

Source: https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/gstreamer-macos/
