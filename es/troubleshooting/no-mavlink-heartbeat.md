# Sin heartbeat MAVLink del controlador de vuelo

> ¿UAVcast-Pro muestra Sin heartbeat o Esperando dispositivo? Revisa el cable USB, el cableado de TELEM, el protocolo SERIAL y la tasa de baudios, y luego usa Detectar automáticamente.

La página **Controlador de Vuelo → Conexión** muestra **Sin heartbeat**, **Esperando dispositivo**, **Detectando tasa de baudios** o **Buscando**, y la fila **Flight controller** del **Tablero** nunca se vuelve verde. UAVcast-Pro todavía no puede detectar el controlador de vuelo.

La página tiene una **Comprobación de conexión** en vivo que prueba cada paso una vez por segundo y explica el primer problema que encuentra. Léela primero: suele ser más rápido que esta página.

![Tarjeta de comprobación de conexión con cuatro filas: controlador de vuelo conectado, datos legibles del controlador de vuelo, controlador de vuelo respondiendo y enviando a la estación de control](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/flight-controller--connection-check.webp)

*La comprobación de conexión en un enlace funcional: los cuatro pasos aprobados. Cuando el enlace falla, el primer paso fallido se marca y se explica.*

| Lo que ves | Causa probable | Empieza en |
| --- | --- | --- |
| Esperando dispositivo, o Controlador de vuelo conectado: No detectado | No hay cable de datos, o la placa no tiene alimentación | [Verificación 1](https://docs.uavmatrix.com/es/troubleshooting/no-mavlink-heartbeat/#check-1) |
| Hay señal en el cable, pero no hay datos legibles | Tasa de baudios incorrecta, TX/RX invertidos, o el puerto no está configurado en MAVLink | [Verificación 2](https://docs.uavmatrix.com/es/troubleshooting/no-mavlink-heartbeat/#check-2) |
| Los datos legibles muestran un % alto de dañados | Cable suelto o largo, falta de tierra o ruido eléctrico | [Verificación 3](https://docs.uavmatrix.com/es/troubleshooting/no-mavlink-heartbeat/#check-3) |
| El puerto aparece en uso por otro programa | Otro programa tiene el puerto serie | [Verificación 4](https://docs.uavmatrix.com/es/troubleshooting/no-mavlink-heartbeat/#check-4) |
| Estado Desactivado o Detenido | El enlace está apagado | [Verificación 5](https://docs.uavmatrix.com/es/troubleshooting/no-mavlink-heartbeat/#check-5) |

## Comprobación 1: ¿Se detecta el controlador de vuelo?

**Por USB:**

1. Asegúrate de que el controlador de vuelo tenga alimentación y de que su cable USB vaya a la computadora de a bordo.
2. Prueba con otro cable. Muchos cables USB solo cargan y no transportan datos. Si la placa se enciende, pero **Controlador de vuelo conectado** dice **No detectado**, el cable suele ser la causa.
3. En **Tipo de enlace**, elige **USB** y deja **Puerto** en **Automático**. Automático encuentra el controlador de vuelo y lo sigue si cambia el número del dispositivo.

**Por un puerto TELEM (UART / Serial):**

1. En **Tipo de enlace**, elige **UART / Serial**.
2. Revisa el cableado: TX del controlador de vuelo a RX de la computadora de a bordo, RX a TX, y GND a GND. Un cable de tierra faltante es una causa común.
3. Nunca alimentes la Raspberry Pi desde el puerto TELEM. Aliméntala por separado.

> **Puerto serie de la Raspberry Pi**
>
> El instalador habilita el UART de la Pi y elimina la consola serie de `cmdline.txt`. En una Pi 3, 4 o Zero 2 W también deshabilita Bluetooth para liberar el UART completo. Si volviste a instalar el sistema operativo después de UAVcast-Pro, ejecuta el instalador de nuevo.

## Comprobación 2: Iguala la configuración del puerto en el controlador de vuelo

En un puerto TELEM, el controlador de vuelo debe hablar MAVLink a la velocidad en la que escucha UAVcast-Pro. Las conexiones USB no usan tasa de baudios.

1. Conecta el controlador de vuelo a Mission Planner o QGroundControl por USB.
2. Abre la lista completa de parámetros y busca el puerto serie que cableaste: `SERIAL1` para TELEM1, `SERIAL2` para TELEM2.
3. Establece `SERIALx_PROTOCOL` en `2` (MAVLink2). Escribe los parámetros y reinicia el controlador de vuelo.
4. Anota `SERIALx_BAUD`. En UAVcast-Pro, deja **Tasa de baudios** en **Automático** o elige el mismo valor.

Con **Automático**, UAVcast-Pro prueba 57600, 115200, 921600, 1500000, 460800, 230400 y 500000 baudios, y recuerda la tasa que funcionó. El estado muestra *Probando … baudios (n de 7)* mientras busca.

> **Deja que UAVcast-Pro busque por ti**
>
> Presiona **Detectar automáticamente**. Pausa el enlace, escucha en cada puerto y en cada tasa de baudios, y luego guarda lo que encuentra. Puede tardar hasta un minuto. Si informa **No se encontró ningún controlador de vuelo**, abre **Mostrar lo probado** para ver cada puerto y velocidad que se probó.

## Comprobación 3: Datos dañados

Si **Datos legibles del controlador de vuelo** muestra un porcentaje *dañados*, llegan bytes, pero están corruptos. Normalmente esto significa un cable suelto o largo, un cable de tierra faltante o ruido de los motores y de los cables de alimentación.

- Vuelve a conectar los conectores y acorta el cable.
- Aleja los cables de señal de los cables del ESC y de la batería.
- Prueba un `SERIALx_BAUD` más bajo, por ejemplo 57600 o 115200.

## Comprobación 4: Puerto en uso

La lista **Puerto** marca los puertos que otro programa ocupa (*en uso por …*). Detén ese programa, por ejemplo un MAVProxy o un segundo enrutador que hayas iniciado tú, o elige otro puerto.

## Comprobación 5: ¿Está el enlace activado?

En la parte superior de la página, **Enlace habilitado** debe estar activado. Si el estado dice **Enlace detenido**, presiona **Conectar**. Los ajustes se aplican de inmediato, sin reiniciar.

## ¿Sigue sin heartbeat?

[Descarga los registros](https://docs.uavmatrix.com/es/troubleshooting/collect-logs/) con **Mavlink Manager** seleccionado. El archivo `diagnostics.txt` incluido enumera los dispositivos serie, quién los ocupa, y los eventos de USB y de energía del kernel, que es lo que necesita soporte para los problemas de enlace.

Cuando el controlador de vuelo muestre **Conectado**, pero tu estación de control siga esperando, ve a [Sin telemetría en la estación de control](https://docs.uavmatrix.com/es/troubleshooting/no-telemetry-in-gcs/).

Relacionado: [Conexión del controlador de vuelo](https://docs.uavmatrix.com/es/uavcast-pro/flight-controller/) · [Requisitos de hardware](https://docs.uavmatrix.com/es/get-started/hardware-requirements/)

Source: https://docs.uavmatrix.com/es/troubleshooting/no-mavlink-heartbeat/
