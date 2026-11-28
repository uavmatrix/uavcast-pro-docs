# Ajustes de cámara

> Configura una cámara CSI de Raspberry Pi o una webcam USB en UAVcast-Pro y transmite video H.264 de baja latencia por UDP a QGroundControl o Mission Planner. Resolución, FPS y tasa de bits.

UAVcast-Pro captura video de una cámara CSI de Raspberry Pi o de una webcam USB, lo codifica en H.264 y lo envía como RTP por UDP a cada estación de control en tierra que tenga **Habilitar Video** activado. Mission Planner y QGroundControl lo reproducen directamente en el puerto 5600. Una copia del stream alimenta la vista previa en vivo de la interfaz web y el grabador del dron. Abre **Cámara → Ajustes de cámara**.

![Panel de Control de la Cámara con CAM 1 configurada con una cámara Raspberry Pi, ajustes de cámara para resolución, FPS, tasa de bits y recuperación del stream, y el panel de Vista Previa en Vivo](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/camera.webp)

*Cámara → Ajustes de cámara con una cámara Raspberry Pi como CAM 1 a 1536×864 y 30 FPS, tasa de bits Automática. La Vista Previa en Vivo está desactivada aquí.*

## Configurar la cámara

1. Conecta la cámara y ve a **Cámara → Ajustes de cámara**.
2. Pon **¿Habilitar Cámara?** en **Sí**.
3. Haz clic en la ranura **CAM 1** y elige la cámara. Las cámaras CSI aparecen como *Raspberry Pi Camera - imx708 (CSI)* o similar; las cámaras USB, por su nombre.
4. En **Configuración de Cámara**, elige una **Resolución** que admita tu cámara. Los tamaños no compatibles aparecen marcados.
5. Deja **Seleccionar FPS** en **Automático** y **Tasa de bits** en `0` (automático) para empezar.
6. En **Configuración de Stream**, activa **¿Activar Vista Previa en Vivo?** y selecciona **Iniciar**.
7. En las [Estaciones de Control en Tierra](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/), activa **Habilitar Video** en cada estación que deba recibir video.

Si no aparece ninguna cámara en la lista, consulta los **Registros de Acción** al final de la página: muestran cada dispositivo que revisó el detector de cámaras y el motivo por el que se omitió.

## Referencia de ajustes

| Ajuste | Predeterminado | Valores | Notas |
| --- | --- | --- | --- |
| **¿Habilitar Cámara?** | **Sí** | **Sí**, **No** | **No** detiene el video por completo. |
| **CAM 1** | Cámara Raspberry Pi | Cámaras detectadas, **Ingresar Pipeline Personalizado** | Elige **Ingresar Pipeline Personalizado** para escribir tu propio pipeline de GStreamer. Consulta [Pipeline personalizado](https://docs.uavmatrix.com/es/uavcast-pro/camera/custom-pipeline/). |
| **Resolución** | `640x480` | Tamaños que informa la cámara | Si la cámara no puede entregar el tamaño, UAVcast-Pro usa el tamaño compatible más grande y registra cuál usó. |
| **Seleccionar FPS** | **Automático** | **Automático** o las tasas que admite la cámara con esta resolución | **Automático** deja que la cámara elija. |
| **Tasa de bits** | `0` (**Automático**) | 0–10000 kbps, en pasos de 100 | Define un valor fijo para enlaces celulares. |
| **Tasa de Recuperación del Stream** | **Automático** | **Automático** (0), 1, 5, 10, 15, 30, 60, 90, 120 cuadros | Intervalo de fotogramas clave. Valores más bajos se recuperan más rápido tras pérdidas de paquetes y corrigen el emborronado gris sobre VPN, a costa de ancho de banda. |
| **Configuración de Volteo** | Desactivado | **Voltear Verticalmente**, **Voltear Horizontalmente** | Cámaras CSI. |
| **Rotación** | `0°` | 0°, 90°, 180°, 270° | Cámaras USB y otras cámaras no CSI. |
| **¿Activar Vista Previa en Vivo?** | Activado | Activado, desactivado | Vista previa en esta página y en el Mapa de Vuelo. La grabación también usa esta copia del stream. |

Los ajustes se guardan a medida que los cambias. Si un stream en ejecución no aplica un cambio, selecciona **Reiniciar** en **Configuración de Stream**.

## Elegir ajustes para tu enlace

No existe un ajuste único correcto: la tasa de bits debe caber en la parte más lenta del enlace y dejar margen para la telemetría. Estos son puntos de partida para una cámara:

| Enlace | Resolución | FPS | Tasa de bits | Tasa de Recuperación del Stream |
| --- | --- | --- | --- | --- |
| Wi-Fi local o Ethernet | 1920x1080 | 30 | 4000–6000 kbps | Automático |
| 4G/LTE con buena señal | 1280x720 | 30 | 1500–2500 kbps | 30 cuadros |
| 4G con señal débil o largo alcance | 1280x720 o 854x480 | 15–20 | 800–1200 kbps | 15 cuadros |

Si la imagen se congela o se emborrona en gris tras una pérdida de paquetes, reduce primero la tasa de bits y luego baja la **Tasa de Recuperación del Stream** para que los fotogramas clave lleguen con más frecuencia.

### Carga de CPU

El indicador **Carga del sistema** muestra cuánto trabaja el codificador. En una Raspberry Pi 5, cada stream se codifica por software (la Pi 5 no tiene codificador H.264), así que las resoluciones altas o dos streams pueden saturar la CPU. Cuando avise *La CPU está cerca de su límite. Reduce la resolución o la tasa de bits.*, hazlo antes de volar.

## Vista previa en vivo

**Vista Previa en Vivo** reproduce el stream en el navegador a través del servidor de medios integrado (WebRTC en el puerto **8889**). Va unos cientos de milisegundos por detrás del stream UDP que recibe tu estación de control en tierra, según la red. Usa el botón de abrir en una pestaña nueva para verlo a pantalla completa. Los navegadores inician la vista previa silenciada; activa el sonido en el reproductor si usas [audio](https://docs.uavmatrix.com/es/uavcast-pro/camera/audio/).

La vista previa necesita que el navegador llegue directamente al puerto 8889 del dron. Funciona en la LAN y por VPN, pero no a través de **Open via Proxy** de Fleet Manager, que solo transporta la interfaz web. Usa **Open via VPN** para la vista previa.

## Cómo se envía el stream

| Stream | Transporte | Puerto en la estación de control en tierra |
| --- | --- | --- |
| Video de la cámara 1 | H.264, RTP sobre UDP | **Puerto de Video** (predeterminado `5600`) |
| Video de la cámara 2 (dual stream) | H.264, RTP sobre UDP | **Puerto de Video (Cámara 2)**, predeterminado Puerto de Video + 1 (`5601`) |
| Audio (opcional) | Opus, RTP sobre UDP | Puerto de Video + 2 (`5602`) |
| Vista previa | WebRTC | Del navegador al dron, puerto 8889 |

El dron envía el stream a la estación de control en tierra. La estación no necesita solicitarlo, y nada en el dron escucha conexiones de video entrantes.

## Relacionado

- [Dos cámaras: cambio por RC y stream dual](https://docs.uavmatrix.com/es/uavcast-pro/camera/multi-camera/)
- [Audio](https://docs.uavmatrix.com/es/uavcast-pro/camera/audio/)
- [Grabaciones y revisión de vuelo](https://docs.uavmatrix.com/es/uavcast-pro/camera/recordings/)
- [Pipeline personalizado de GStreamer](https://docs.uavmatrix.com/es/uavcast-pro/camera/custom-pipeline/)
- [Solución de problemas: cámara no detectada](https://docs.uavmatrix.com/es/troubleshooting/camera-not-detected/)
- [Solución de problemas: video entrecortado o con retraso](https://docs.uavmatrix.com/es/troubleshooting/choppy-or-delayed-video/)

Source: https://docs.uavmatrix.com/es/uavcast-pro/camera/
