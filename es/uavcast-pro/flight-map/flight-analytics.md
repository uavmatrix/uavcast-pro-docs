# Analíticas de Vuelo

> Grafica telemetría MAVLink en vivo o un archivo .tlog grabado en Analíticas de Vuelo de UAVcast-Pro. Elige hasta 10 parámetros, compáralos a lo largo del tiempo y revisa un vuelo en el dron.

Analíticas de Vuelo grafica valores MAVLink a lo largo del tiempo, ya sea en vivo desde el controlador de vuelo o desde un archivo `.tlog` grabado. Úsalo para revisar vibración, caída de batería, mantenimiento de altitud o valores de señal sin copiar registros a una PC. Abre **Mapa de Vuelo → Analíticas de Vuelo**.

![Pestaña Analíticas de Vuelo sin ningún archivo de registro cargado, con el botón Open Log File, el interruptor Live y el panel de parámetros](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/flight-map--flight-analytics.webp)

*Analíticas de Vuelo antes de cargar un registro. Abrir archivo de registro carga un .tlog.*

## Graficar telemetría en vivo

1. Selecciona **Live**. La lista de parámetros se llena a medida que llegan mensajes. Si se queda en *Esperando datos de MAVLink*, conecta primero el controlador de vuelo.
2. Busca en **Parámetros** y marca los valores que quieres graficar. Puedes graficar hasta **10** a la vez.
3. Activa **Acumular datos** para conservar cada punto (*Almacenando todos los puntos de datos*). Desactivado, el gráfico mantiene una ventana móvil (*Últimos … puntos*).

## Analizar un registro grabado

1. Selecciona **Abrir archivo de registro**.
2. En **Seleccionar archivo de registro**, elige un `.tlog` grabado. Los registros de telemetría provienen de [Grabaciones](https://docs.uavmatrix.com/es/uavcast-pro/camera/recordings/) (por defecto, uno por vuelo armado).
3. Marca los parámetros a graficar. La **Duración** y el número de **Parámetros** del archivo se muestran en la parte superior.

**Limpiar todo** elimina todos los parámetros graficados.

## De dónde vienen los registros

La telemetría se registra en el dron según **Grabar telemetría** en **Cámara → Grabaciones → Ajustes**: **Mientras está armado** (predeterminado), **Siempre mientras esté conectado** o **Desactivado**. Los mismos archivos `.tlog` se abren en Mission Planner, MAVExplorer y UAV Log Viewer.

La pestaña lateral **Grabaciones** del Mapa de Vuelo enumera los mismos registros de telemetría con **Mensajes**, **Altitud máx.** y **Distancia**, y permite **Descargar .tlog**, **Eliminar** o **Reproducir** un registro. La reproducción transmite la telemetría grabada al mapa, como si el dron estuviera volando.

Source: https://docs.uavmatrix.com/es/uavcast-pro/flight-map/flight-analytics/
