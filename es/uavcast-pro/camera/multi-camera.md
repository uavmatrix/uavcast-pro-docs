# Dos cámaras: cambio por RC y stream dual

> Conecta dos cámaras a UAVcast-Pro y cambia entre ellas desde tu transmisor de RC, o transmite ambas a la vez a QGroundControl o Mission Planner en puertos UDP separados.

UAVcast-Pro maneja dos cámaras, por ejemplo una cámara FPV frontal y una cámara inferior o de gimbal. Puedes usarlas de dos formas:

- **Cambio**: un solo stream, y eliges qué cámara lo alimenta, desde la interfaz web o desde un canal RC de tu transmisor. Usa el ancho de banda y la CPU de un solo stream.
- **Stream dual**: ambas cámaras transmiten al mismo tiempo, cada una a su propio puerto UDP, y cada una con su propia resolución, FPS y tasa de bits. Usa el doble de ancho de banda y de CPU.

Combinaciones admitidas: CSI + USB, dos cámaras USB, o dos cámaras CSI en placas con dos conectores de cámara (Raspberry Pi 5, placas portadoras de Compute Module).

## Añadir la segunda cámara

1. Ve a **Cámara → Ajustes de cámara**. Asegúrate de que **CAM 1** tenga una cámara.
2. Selecciona **Añadir Cámara** junto a CAM 1 y elige la segunda cámara. Aparece en la ranura **CAM 2**.
3. Haz clic en una ranura para convertir esa cámara en la activa (*Haz clic para cambiar a la cámara 2*).

En modo de cambio, ambas cámaras comparten la resolución y la tasa de cuadros de la Cámara 1 (*Se usarán la resolución y los FPS de la Cámara 1*). Si la Cámara 2 no admite ese tamaño, usa su resolución nativa y se escala, a menos que actives **Igualar Resolución de Cámara 1** en una cámara que lo admita.

## Cambiar de cámara desde tu transmisor de RC

**Cambio por canal RC** aparece cuando hay dos cámaras configuradas y el stream dual está desactivado.

1. En tu transmisor, asigna un interruptor de dos posiciones a un canal libre, por ejemplo el canal 7. Comprueba en Mission Planner o en **Mapa de Vuelo → Radio** que el canal se mueve entre aproximadamente 1000 y 2000 µs.
2. En **Cambio por canal RC**, activa **Habilitar cambio de cámara por canal RC**.
3. Elige el **Canal RC**.
4. Mueve el interruptor y observa **PWM actual**. Por debajo de 1500 se selecciona la Cámara 1; por encima de 1500, la Cámara 2.

![Panel de Control de la Cámara con CAM 1 ocupada y una ranura vacía de Añadir Cámara](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/camera--control-panel.webp)

*Las ranuras de cámara: CAM 1 en uso y Añadir Cámara para la segunda cámara. El cambio por canal RC aparece cuando ambas ranuras están ocupadas y el stream dual está desactivado.*

Mientras el cambio por RC está activado, hacer clic en una ranura de cámara no hace nada: el transmisor tiene el control. Desactiva el cambio por RC para elegir las cámaras manualmente.

| Ajuste | Predeterminado | Valores | Notas |
| --- | --- | --- | --- |
| **Habilitar cambio de cámara por canal RC** | Desactivado | Activado, desactivado |  |
| **Canal RC** | Canal 7 | Canal 1–18 | Se lee de la entrada RC del controlador de vuelo. |
| Punto de cambio | 1500 µs | fijo | PWM < 1500 = Cámara 1, PWM > 1500 = Cámara 2. |

## Transmitir ambas cámaras a la vez (stream dual)

1. Con dos cámaras configuradas, activa **Dual stream** en la página Cámara. La insignia muestra **Ambas en vivo**.
2. En **Configuración por cámara**, define la resolución, los FPS y la tasa de bits de cada cámara.
3. En las [Estaciones de Control en Tierra](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/), cada destino ahora tiene **Puerto de Video (Cámara 2)**. Déjalo vacío para usar **Puerto de Video** + 1 (`5601`), o introduce otro puerto. Con varios destinos en un mismo ordenador, separa sus puertos de video de 3 en 3 (`5600`, `5603` …) para que la cámara 2 y el audio no caigan en el puerto de otro destino.
4. Configura un segundo receptor de video en la estación de control en tierra para ese puerto.

La Cámara 1 va al **Puerto de Video** de cada estación de control en tierra (predeterminado `5600`), y la Cámara 2 al **Puerto de Video (Cámara 2)** (predeterminado `5601`).

QGroundControl muestra un stream de video a la vez. Para ver la Cámara 2, ejecuta un segundo receptor, por ejemplo una segunda instancia de QGroundControl en el puerto 5601, Mission Planner con una fuente GStreamer en el 5601, o GStreamer directamente:

```bash
gst-launch-1.0 udpsrc port=5601 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264" ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

> **Vigila la CPU y el enlace**
>
> Dos streams duplican la carga de codificación y el ancho de banda. Vigila la **Carga del sistema** (*La CPU está cerca de su límite. Reduce la resolución o la tasa de bits de un stream, o desactiva el segundo stream.*) y mantén la tasa de bits combinada bien dentro de tu enlace celular. Una división habitual es 1280x720 a 1500 kbps para la cámara principal y 854x480 a 600 kbps para la segunda.

El Mapa de Vuelo muestra una ventana de video por cada stream activo. Las grabaciones pueden incluir ambas cámaras: consulta **Grabar cámara 2** en [Grabaciones](https://docs.uavmatrix.com/es/uavcast-pro/camera/recordings/).

## Solución de problemas

- **Segunda cámara que falta en la lista**: dos cámaras CSI requieren una placa con dos puertos de cámara. En una Raspberry Pi, reinicia después de instalar UAVcast-Pro: el instalador amplía el pool de memoria de la cámara (CMA) para que dos cámaras puedan funcionar juntas.
- **Imagen de la Cámara 2 estirada**: la Cámara 2 se escala a la resolución de la Cámara 1 en modo de cambio. Usa cámaras con la misma relación de aspecto, o activa **Igualar Resolución de Cámara 1**.
- **El cambio no hace nada**: revisa **PWM actual**. *Sin señal* significa que el controlador de vuelo no informa la entrada RC en ese canal.

Source: https://docs.uavmatrix.com/es/uavcast-pro/camera/multi-camera/
