# Audio

> Añade sonido de un micrófono USB o del micrófono integrado de una webcam a la vista previa en vivo de UAVcast-Pro, y envíalo a las estaciones de control en tierra como stream RTP/Opus en el Puerto de Video + 2.

UAVcast-Pro puede añadir sonido desde un micrófono USB o desde el micrófono integrado de una cámara USB. El audio se codifica en Opus, que consume poca CPU y ancho de banda. Siempre se reproduce en la vista previa en vivo, y también puedes enviarlo a las estaciones de control en tierra como un stream RTP independiente. Lo encontrarás en la tarjeta **Audio** de **Cámara → Ajustes de cámara**.

## Activar audio

1. Conecta un micrófono USB o usa una webcam con micrófono integrado.
2. En **Cámara → Ajustes de cámara**, activa **Audio**.
3. Deja **Dispositivo de audio** en **Automático (micrófono de la cámara si está presente)**, o elige un dispositivo. Usa **Tono de prueba (no necesita micrófono)** para probar la ruta de audio sin micrófono.
4. Observa el indicador. **Audio en vivo** con un medidor de nivel en movimiento significa que se está capturando sonido.
5. En **Vista Previa en Vivo**, activa el sonido del reproductor. Los navegadores inician la vista previa silenciada.

![Tarjeta de audio en la página Cámara con el interruptor de audio desactivado y el estado Audio desactivado](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/camera--audio.webp)

*Cámara → Audio, desactivado. Actívalo para elegir el micrófono y la tasa de bits.*

Un micrófono que falla nunca interrumpe el video. En su lugar, el indicador muestra **Error de audio** con el motivo.

## Enviar audio a las estaciones de control en tierra

Activa **Enviar audio a las estaciones de control en tierra**. UAVcast-Pro envía entonces un stream RTP/Opus independiente a cada estación que recibe video, en el **Puerto de Video + 2** de ese destino. Con el puerto de video predeterminado, es `5602`. Por eso, dos destinos en el mismo ordenador necesitan puertos de video separados al menos por 3, por ejemplo `5600` y `5603`.

QGroundControl y Mission Planner ignoran el audio. Reprodúcelo con GStreamer:

```bash
gst-launch-1.0 udpsrc port=5602 caps="application/x-rtp, media=(string)audio, clock-rate=(int)48000, encoding-name=(string)OPUS, payload=(int)97" ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

El stream es Opus a 48 kHz, con tipo de carga útil RTP 97. VLC puede reproducirlo con un archivo SDP que describa esos valores.

## Referencia de ajustes

| Ajuste | Predeterminado | Valores | Notas |
| --- | --- | --- | --- |
| **Audio** | Desactivado | Activado, desactivado | Cambiar cualquier ajuste de audio reinicia el servicio de cámara. |
| **Dispositivo de audio** | **Automático (micrófono de la cámara si está presente)** | Automático, dispositivos de captura detectados, **Tono de prueba (no necesita micrófono)** | Un dispositivo guardado que esté desconectado aparece como *(no conectado)*. |
| **Tasa de bits** | `64 kbps` | 24, 32, 48, 64, 96, 128 kbps | Entre 32 y 64 kbps basta para voz y ruido de motor. |
| **Enviar audio a las estaciones de control en tierra** | Desactivado | Activado, desactivado | RTP/Opus al Puerto de Video + 2 de cada destino con video habilitado. |

## Solución de problemas

- *No se encontró ningún dispositivo de captura de audio*: conecta un micrófono USB o una cámara con micrófono integrado. En el dron, `arecord -l` muestra los dispositivos de captura.
- **Sin señal**: el dispositivo está abierto pero en silencio. Revisa el interruptor de silencio del micrófono o prueba **Tono de prueba**.
- Hay audio en la vista previa pero no en la estación de control en tierra: asegúrate de que **Enviar audio a las estaciones de control en tierra** esté activado, de que el destino tenga **Habilitar Video** activado y de que tu receptor escuche en el Puerto de Video + 2.

Source: https://docs.uavmatrix.com/es/uavcast-pro/camera/audio/
