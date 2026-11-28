# Flujos de Datos

> Crea tableros de Flujos de Datos en UAVcast-Pro con gráficos, medidores y mosaicos para cualquier campo MAVLink o valor de sensor NAMED_VALUE_FLOAT, con umbrales, historial e importación y exportación de JSON.

Flujos de Datos te permite crear tus propios tableros de telemetría en vivo. Añade mosaicos numéricos, gráficos de líneas, medidores, barras e indicadores de estado, y vincula cada uno a cualquier valor MAVLink que envíe el controlador de vuelo, o a cualquier señal `NAMED_VALUE_FLOAT` de un sensor o de un [inyector](https://docs.uavmatrix.com/es/uavcast-pro/flight-controller/injectors/). Los tableros se guardan en el dron, así que todos los que abran la interfaz web ven los mismos tableros. Abre **Flujos de Datos** en la barra lateral.

Usos típicos: una pantalla del operador de carga útil con lecturas de sensores, un panel de enlace LTE con RSRP y SINR, o un tablero de batería y energía para vuelos largos.

![Página de Flujos de Datos con Aún no hay tableros y el botón Crear tablero](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/mission-data.webp)

*Flujos de Datos antes del primer tablero: Crear tablero crea uno.*

## Crear un tablero

1. Selecciona **Crear tablero** (o **Nuevo tablero** si ya tienes uno), asígnale un **Nombre** y selecciona **Crear**.
2. Selecciona **Editar** para entrar al modo de edición, luego **Añadir widget** y elige un tipo.
3. En la pestaña **Origen**, busca una señal y selecciónala. Un punto verde indica que llegan muestras.
4. Configura el título, las unidades y los decimales en **Visualización**, los límites y los umbrales de color en **Rango**, y las opciones del gráfico en **Gráfico**. Selecciona **Guardar**.
5. Arrastra y redimensiona los widgets, luego selecciona **Listo**.

Solo los administradores pueden crear y editar tableros. Los usuarios de solo lectura pueden verlos.

## Tipos de widget

| Tipo | Muestra |
| --- | --- |
| **Mosaico numérico** | El valor actual, en grande, con prefijo y sufijo opcionales. |
| **Línea compacta** | Una pequeña línea de tendencia debajo del valor. |
| **Gráfico de líneas** | Una o más señales en una ventana de tiempo. |
| **Medidor** | El valor en una escala circular con umbrales de color. |
| **Indicador de barra** | El valor como una barra entre Mín y Máx. |
| **Estado** | Un estado de color según los umbrales, por ejemplo OK / advertencia / alarma. |
| **Tabla de valores nombrados** | Todas las señales `NAMED_VALUE_FLOAT` con **Valor**, **Edad** y **Src**. **Filtrar** acepta una subcadena o un `*.glob`. |

Un widget muestra **Obsoleto** cuando no ha llegado ninguna muestra durante 5 segundos, y *Aún no hay muestras* cuando la señal nunca se ha recibido.

## Señales

- **Campos MAVLink**: cada campo numérico que envía el controlador de vuelo (actitud, VFR HUD, batería, GPS, home, RTK, failsafe, heartbeat y valores de estado) aparece automáticamente, con nombres amigables y unidades cuando se conocen.
- **Valores nombrados**: señales `NAMED_VALUE_FLOAT`, que se muestran como `NAME@sysid:compid`, por ejemplo `LTE_RSRP@1:194`.

Puedes escribir una señal que todavía no envía datos y pulsar Enter para añadirla, así puedes armar el tablero antes de conectar el sensor. Usa el icono de lápiz en una fuente seleccionada para darle un nombre para mostrar.

## Opciones del gráfico

| Opción | Valores |
| --- | --- |
| **Ventana** | **1 min**, **5 min**, **15 min**, **1 hora** o **Personalizado (segundos)** |
| **Curva** | **Lineal**, **Suave (monótona)**, **Escalón**, **Escalón antes**, **Escalón después** o **Spline básica** |
| Otras | **Mostrar leyenda**, **Mostrar cuadrícula**, **Grosor de línea**, **Relleno de área**, **Mostrar puntos de datos**, líneas de referencia de umbral, **Etiqueta del eje Y** |

## Historial

UAVcast-Pro guarda un historial corto de cada señal en el dron (hasta 3600 muestras por señal, unos 60 minutos a 1 Hz), así que los gráficos se llenan en cuanto abres un tablero, incluso después de recargar la página.

## Compartir tableros

- **Exportar JSON** copia el tablero al portapapeles.
- **Importar JSON** crea un tablero a partir de JSON pegado. Úsalo para copiar un tablero a otro dron.
- **Duplicar** y **Renombrar** están en la barra de herramientas; **Eliminar** borra un tablero y sus widgets.
- **Pantalla completa** oculta el resto de la interfaz, para un monitor dedicado.

Source: https://docs.uavmatrix.com/es/uavcast-pro/data-streams/
