# Graba vuelos y revísalos

> Graba automáticamente el video de la cámara y la telemetría en el dron al armar, guárdalos en USB o SSD y reproduce video, mapa y datos de vuelo en una misma línea de tiempo.

Desde la v6.5.1, UAVcast-Pro graba en el propio dron: video de la cámara más un registro de telemetría, con un clic en el mapa de vuelo o automáticamente cada vez que armas. La grabación reutiliza el stream que ya está codificado, así que no consume CPU adicional y nunca interrumpe el video en vivo hacia la estación de control en tierra. Después, el reproductor de revisión de vuelo muestra en una sola línea de tiempo el video, el recorrido en el mapa, la vista de cabina y los datos de vuelo.

## 1. Elige dónde se guardan las grabaciones

1. Conecta una unidad USB o un SSD si quieres grabar en ella. Las grabaciones llenan el almacenamiento rápidamente, y un SSD USB es más robusto que una tarjeta SD.
2. Abre **Cámara → Grabaciones** y la pestaña **Ajustes**.
3. En **Ubicación de almacenamiento**, elige el disco o **Almacenamiento interno**. Presiona **Buscar discos de nuevo** si la unidad se conectó después de abrir la página. **O otra carpeta** te permite ingresar una ruta y confirmar con **Usar esta carpeta**.
4. Establece **Mantener libre** (predeterminado 2 GB). La grabación nunca llena el disco más allá de este valor.

![Pestaña Ajustes de Grabaciones con ubicación de almacenamiento, mantener libre, eliminar las grabaciones más antiguas, eliminar grabaciones con más de y grabar automáticamente al armar](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/camera--recordings-settings.webp)

*Cámara → Grabaciones → Ajustes con Almacenamiento interno seleccionado y Grabar automáticamente al armar activado.*

## 2. Decide cuándo grabar

| Ajuste | Predeterminado | Qué hace |
| --- | --- | --- |
| **Grabar automáticamente al armar** | Activado | Inicia cuando los motores se arman y se detiene cuando se desarman. Si el enlace se cae en vuelo, la grabación continúa. |
| **Grabar cámara 1** / **Grabar cámara 2** | Activado | La cámara 2 solo graba cuando la transmisión doble está activa. |
| **Eliminar las grabaciones más antiguas cuando quede poco espacio** | Activado | Funciona como una dashcam: la grabación nunca se detiene por falta de espacio. Si está desactivado, la grabación se detiene en su lugar. |
| **Eliminar grabaciones más antiguas que** | 0 días | 0 conserva las grabaciones hasta que se necesite el espacio. |
| **Duración del archivo** | 1 min | Las grabaciones se guardan en fragmentos de 1 a 30 minutos. Los fragmentos más cortos pierden menos tras un corte de energía. |
| **Grabar telemetría** | **Mientras está armado** | **Siempre mientras esté conectado** también registra en tierra, creando un archivo nuevo en cada armado, desarmado y hora. **Desactivado** graba solo el video. |

## 3. Graba manualmente

En el **Mapa de Vuelo**, los botones **Grabación** inician y detienen cada cámara (**Grabar cámara 1**, **Detener grabación de cámara 1**) y el registro de telemetría. Los usuarios de solo lectura pueden observar, pero no pueden iniciar grabaciones.

## 4. Encuentra un vuelo

Abre **Cámara → Grabaciones → Biblioteca**. Cada vuelo aparece con su video, una miniatura y su telemetría. Una grabación en curso muestra una insignia **Rec**.

![Biblioteca de grabaciones con una barra de almacenamiento y dos vuelos grabados, cada uno con insignias CAM 1 y Telemetry y un botón de reproducción](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/camera--recordings.webp)

*Cámara → Grabaciones → Biblioteca con dos vuelos grabados, cada uno con video de cámara y telemetría.*

Desde la biblioteca puedes:

- **Reproducir** un vuelo en el reproductor de revisión de vuelo,
- **Descargar** clips de video en MP4,
- **Eliminar** una grabación: **Eliminar solo el video** o **Eliminar video y telemetría**.

## 5. Revisa el vuelo

El reproductor de revisión de vuelo reproduce el video junto al recorrido en el mapa, la vista de cabina y los datos de vuelo (**Altitud**, **Velocidad**, **Batería**, **Satélites**, **Modo**) en una sola línea de tiempo.

![Reproductor de revisión de vuelo con el área de video, el mapa, la vista de cabina y una línea de tiempo con controles de reproducción](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/camera--flight-review.webp)

*Reproductor de revisión de vuelo: video, mapa y vista de cabina sobre una misma línea de tiempo.*

- La línea de tiempo marca los cambios de armado, desarmado y modo de vuelo, para que saltes al momento importante.
- Usa **Retroceder 10 segundos** y **Avanzar 10 segundos**, y **Velocidad de reproducción** de 0,5× a 4×.
- Con dos cámaras, **Cambiar diseño de video** alterna entre **Imagen en imagen** y **Lado a lado**; **Mostrar esta cámara en grande** los intercambia.
- Si una grabación no tiene telemetría, el reproductor muestra *No hay registro de telemetría para esta grabación. La telemetría se registra mientras el dron está armado.*

## Cosas útiles

- Las grabaciones se guardan en el dron. Descarga lo que necesites conservar antes de que **Eliminar las grabaciones más antiguas cuando quede poco espacio** las elimine.
- La tarjeta **Almacenamiento** del tablero y el resumen de **Almacenamiento de grabaciones** muestran el espacio libre.
- La grabación continúa con **¿Activar Vista Previa en Vivo?** desactivado.
- Si el servicio de grabación deja de responder, la página muestra *El servicio de grabación no responde.* Reinicia el servicio de cámara desde **Cámara → Ajustes de cámara** y [recopila los registros](https://docs.uavmatrix.com/es/troubleshooting/collect-logs/) si vuelve a ocurrir.

Source: https://docs.uavmatrix.com/es/guides/recording-flight-review/
