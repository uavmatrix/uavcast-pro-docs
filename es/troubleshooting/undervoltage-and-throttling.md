# Subvoltaje y limitación

> ¿UAVcast-Pro advierte Voltage too low o Slowed down? Dimensiona la fuente para la Pi, el módem y la cámara, corrige los cables delgados y la refrigeración, y evita reinicios.

La fila **Power supply** del Tablero muestra una advertencia, el módem se desconecta, el enlace con el controlador de vuelo se reinicia o la Pi se reinicia en vuelo. En un dron, una fuente de alimentación subdimensionada causa más fallas extrañas que cualquier ajuste de software.

![Tarjeta de estado del tablero con la fila Power supply bajo System, con el texto Stable](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/dashboard--status-card.webp)

*Tablero → tarjeta de estado. La fila Power supply está bajo System; aquí dice Stable. Las advertencias reemplazan ese texto, como se indica abajo.*

| Fila Power supply | Significado |
| --- | --- |
| **Stable** | Sin subvoltaje ni limitación desde el arranque |
| **Voltage too low - use a stronger power supply** | El voltaje de la fuente está por debajo de lo que la Pi necesita en este momento |
| **Voltage dropped since start-up** | Ocurrió antes, por ejemplo cuando se conectó el módem o cuando arrancaron los motores |
| **Slowed down (heat or power)** | La CPU funciona más lento para protegerse del calor o del bajo voltaje |

Las lecturas provienen del firmware de la Raspberry Pi, así que solo están disponibles en una Raspberry Pi.

## Comprobación 1: Dimensiona la fuente para todo lo que alimenta

La Pi alimenta el módem y la cámara USB a través de sus puertos USB. Un módem 4G consume su corriente máxima cuando se conecta y cuando la señal es débil.

1. Usa un BEC o un regulador de 5 V con capacidad muy superior a la corriente total de la Pi, el módem, la cámara y cualquier otro dispositivo en el mismo riel. Las especificaciones oficiales de la fuente de la Raspberry Pi indican lo que necesita cada modelo.
2. Nunca alimentes la Pi desde el puerto TELEM ni desde el USB del controlador de vuelo.
3. Si el módem consume más de lo que la Pi puede entregar, alimenta el módem directamente desde el regulador, a través de un hub USB con alimentación o de un cable USB con alimentación independiente.

## Comprobación 2: Cables y conectores

Los cables delgados o largos pierden voltaje bajo carga. Usa cables de alimentación cortos y gruesos, y un buen cable USB para el módem. Un cable que sirve para un cargador de teléfono aún puede causar subvoltaje con el consumo máximo.

## Comprobación 3: Calor

**Temperature** en **Información del Sistema** muestra la temperatura de la CPU. Una Pi que codifica video dentro de un fuselaje cerrado al sol se calienta. Agrega un disipador o un pequeño ventilador, y da ventilación al gabinete. Una Pi 5 necesita refrigeración activa para la codificación continua.

## Comprobación 4: Revisa después de la corrección

**Voltage dropped since start-up** permanece hasta el siguiente arranque. Reinicia, ejecuta una misión típica en banco (módem conectado, cámara transmitiendo) y confirma que la fila se mantiene en **Stable**.

## ¿Sigues viendo advertencias?

La descarga de registros incluye los eventos de energía y de USB del kernel en `diagnostics.txt`. [Descarga los registros](https://docs.uavmatrix.com/es/troubleshooting/collect-logs/) y envíalos a **[support@uavmatrix.com](mailto:support@uavmatrix.com)** junto con una foto de tu cableado de alimentación.

Relacionado: [Requisitos de hardware](https://docs.uavmatrix.com/es/get-started/hardware-requirements/) · [Tablero](https://docs.uavmatrix.com/es/uavcast-pro/dashboard/)

Source: https://docs.uavmatrix.com/es/troubleshooting/undervoltage-and-throttling/
