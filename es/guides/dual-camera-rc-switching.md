# Dos cámaras: cambio por RC o transmisión doble

> Conecta dos cámaras a UAVcast-Pro y cambia entre ellas desde tu transmisor de RC, o transmite ambas a la vez con dual stream. Configuración, puertos y CPU.

UAVcast-Pro maneja dos cámaras, por ejemplo una cámara frontal y una cámara inferior o de zoom. Puedes elegir entre dos modos:

|  | **Cambio** (predeterminado) | **Dual stream** |
| --- | --- | --- |
| Lo que recibe la estación de control en tierra | Un stream de video, que muestra la cámara 1 o la cámara 2 | Dos streams de video al mismo tiempo |
| Cómo eliges | Las insignias de cámara en la interfaz web, o un canal de RC | Ambas siempre activas |
| Puertos | **Puerto de Video** | Cámara 1 en **Puerto de Video**, cámara 2 en **Puerto de Video (Cámara 2)** (predeterminado: Puerto de Video + 1) |
| CPU y ancho de banda | Una codificación | Dos codificaciones, alrededor del doble de enlace de subida |

## 1. Añade la segunda cámara

1. Conecta ambas cámaras. Funcionan dos cámaras CSI en una Pi 5, una CSI y una USB, o dos cámaras USB.
2. Abre **Cámara → Ajustes de cámara**. Las ranuras de cámara muestran **CAM 1** y **CAM 2**.
3. Haz clic en **Añadir cámara** en la segunda ranura y elige la cámara.
4. En modo de cambio se usarán **la resolución y los FPS de la cámara 1**. Si la cámara 2 admite la resolución de la cámara 1, activa **Igualar Resolución de Cámara 1**; si no, la cámara 2 usa su propia resolución y se escala para igualarla.

Si una cámara no aparece en la lista, consulta [Cámara no detectada](https://docs.uavmatrix.com/es/troubleshooting/camera-not-detected/).

## 2a. Cambia de cámara desde tu transmisor

1. En **Cambio de canal RC**, activa **Habilitar cambio de cámara por canal RC**.
2. Elige un canal libre en **Canal RC**. El predeterminado es el canal 7.
3. Asigna un interruptor de dos posiciones de tu transmisor a ese canal.
4. Mueve el interruptor y observa **Current PWM**: por debajo de 1500 µs selecciona la cámara 1, por encima de 1500 µs selecciona la cámara 2.

![Panel de Control de la Cámara con ¿Habilitar Cámara? en Sí, CAM 1 ocupada y una ranura vacía para añadir cámara](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/camera--control-panel.webp)

*Panel de Control de la Cámara con una cámara. El panel de cambio por canal RC aparece debajo solo cuando se añade CAM 2 y la transmisión doble está desactivada.*

Mientras el cambio por RC esté activo, las insignias de cámara de la interfaz web no cambian de cámara. Desactiva el cambio por RC para volver a seleccionar las cámaras manualmente.

## 2b. Transmite ambas cámaras a la vez

1. Activa **Dual stream**. La insignia muestra **Ambas activas**.
2. Cada cámara ahora tiene su propia resolución, FPS y tasa de bits en **Configuración por cámara**.
3. Abre **Control en Tierra**. Cada destino ahora muestra **Puerto de Video (Cámara 2)**. Déjalo vacío para usar **Puerto de Video** + 1 (5601), o ingresa un puerto.
4. En la estación de control en tierra, recibe el segundo stream en ese puerto, por ejemplo con una segunda fuente de video de QGroundControl o una ventana de GStreamer: consulta [Estaciones de control en tierra y video](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/#set-up-the-receiving-side) para QGroundControl, Mission Planner y GStreamer en cada sistema operativo.

> **Vigila la CPU**
>
> UAVcast-Pro codifica el video por software. Con dos streams, vigila **Carga del sistema**. Cuando indique **La CPU está cerca de su límite**, reduce la resolución o la tasa de bits de un stream, o desactiva el segundo stream. Se recomienda una Raspberry Pi 4 o 5 para la transmisión doble.

El **Mapa de Vuelo** muestra una ventana de video por cada stream activo. Puedes ocultarlas como pestañas en la parte inferior del mapa.

## Planificación de puertos

Con dual stream activo, cada destino usa dos puertos de video, y el audio (si **Send audio to ground stations** está activo) usa el puerto de video + 2. Si añades más destinos en la misma computadora, separa sus puertos de video por lo menos tres unidades, por ejemplo 5600 y 5610.

## Grabación de ambas cámaras

En **Cámara → Grabaciones → Ajustes**, **Grabar cámara 2** solo funciona cuando la transmisión doble está activa. Consulta [Graba vuelos y revísalos](https://docs.uavmatrix.com/es/guides/recording-flight-review/).

Source: https://docs.uavmatrix.com/es/guides/dual-camera-rc-switching/
