# Hardware compatible

> Placas, sistemas operativos, controladores de vuelo, cámaras, módems LTE y receptores RTK que funcionan con UAVcast-Pro v6: Raspberry Pi, Jetson y otras placas arm64, y PC x86.

UAVcast-Pro v6 funciona en cualquier computadora Linux de 64 bits que ejecute Raspberry Pi OS, Debian o Ubuntu, en **arm64** o **amd64** (las placas arm64 que no son Raspberry Pi tienen soporte a partir de UAVcast-Pro 6.5.3). Las tablas siguientes muestran lo que se detecta y se prueba. Para fuentes de alimentación, cableado y consejos de compra, consulta [Requisitos de hardware](https://docs.uavmatrix.com/es/get-started/hardware-requirements/).

## Computadoras de a bordo

| Placa | Arquitectura | Puerto serie para TELEM | Notas |
| --- | --- | --- | --- |
| Raspberry Pi 5 | arm64 | UART GPIO (`uart0`) | El mejor rendimiento de video. Necesita refrigeración activa para la codificación continua. |
| Raspberry Pi 4 | arm64 | UART GPIO | La opción recomendada para uso general. |
| Raspberry Pi 3 | arm64 | UART GPIO | Adecuada para telemetría y una cámara con ajustes moderados. |
| Raspberry Pi Zero 2 W | arm64 | UART GPIO | Funciona, pero la instalación es lenta y el video es limitado. Una cámara, resolución baja. |
| Raspberry Pi Compute Module | arm64 | Depende de la placa portadora | Soporte del instalador corregido en la v6.3.1. |
| NVIDIA Jetson (Nano, Orin Nano, Xavier NX, AGX, TX2) | arm64 | `ttyTHS*` en el conector de 40 pines | Cámaras USB. El servidor de cámara no maneja las cámaras CSI de Jetson; necesitan un **Pipeline Personalizado** escrito a mano. |
| Orange Pi (Zero, Zero 2, 3, 4, 5, Plus) | arm64 | `ttyS*`, según el modelo | Cámaras USB. Es posible que haya que habilitar el UART en el device tree. |
| Banana Pi y otras placas arm64 | arm64 | Según el modelo | Cámaras USB. |
| PC x86 mini, Intel NUC, portátil | amd64 | Adaptador USB-serie | Cámaras USB. |

> **Placas arm64 que no son Raspberry Pi**
>
> Jetson, Orange Pi, Banana Pi y otras placas arm64 que no son Raspberry Pi necesitan UAVcast-Pro 6.5.3 o posterior. Las versiones anteriores del instalador se detienen en ellas con *Device is not a Raspberry Pi*.

**Solo Raspberry Pi:** las cámaras CSI (rpicam/libcamera) necesitan una Raspberry Pi, y en una Pi el instalador habilita el UART, elimina la consola serie y, en Pi 3/4/Zero 2 W, desactiva Bluetooth para que el UART completo quede libre.

## Sistemas operativos

| Sistema operativo | Estado |
| --- | --- |
| Raspberry Pi OS (64 bits) | Recomendado en Raspberry Pi. Necesario para cámaras CSI. |
| Debian (64 bits) | Compatible. |
| Ubuntu (64 bits), incluido Ubuntu para Raspberry Pi | Compatible. Las cámaras CSI en una Pi no funcionan en Ubuntu, porque la pila de cámaras de Raspberry Pi no está empaquetada; las cámaras USB sí. |
| Cualquier sistema de 32 bits | **No compatible.** El instalador se detiene con *No installation candidate*. |

## Controladores de vuelo

UAVcast-Pro v6 funciona con cualquier controlador de vuelo MAVLink por USB o por un puerto TELEM: ArduPilot (Copter, Plane, Rover, VTOL y otros tipos de vehículo) y PX4, en placas de las familias Pixhawk y Cube, Matek, Holybro, CUAV y otras. Los nombres de los modos de vuelo y los botones de modo en el Mapa de Vuelo y en Fleet Manager siguen a ArduPilot; con PX4, cambia los modos desde tu estación de control en tierra.

## Cámaras

| Tipo | Ejemplos | Notas |
| --- | --- | --- |
| CSI de Raspberry Pi | Camera Module 2 y 3, HQ Camera, otros sensores compatibles con libcamera (imx219, imx708 …) | Raspberry Pi OS o Debian. Dos cámaras CSI en placas con dos conectores (Pi 5, Compute Module). |
| USB (UVC) | Logitech C920, C615 y la mayoría de las webcams UVC | Cualquier sistema operativo. |
| Otras fuentes | Cámaras IP, captura HDMI | Mediante un **Pipeline Personalizado**. |

Hasta dos cámaras, conmutadas o transmitidas al mismo tiempo. Audio desde un micrófono USB o desde el micrófono integrado de una cámara.

## Módems LTE / 4G

| Tipo | Cómo funciona | Ejemplos |
| --- | --- | --- |
| **HiLink** | El módem es un router pequeño y aparece como adaptador de red (controladores `cdc_ether`, `huawei_cdc_ncm`, `rndis_host`) | Huawei E3372h, E8372h |
| **Tradicional (PPP)** | Lo administra ModemManager; UAVcast-Pro lo conecta, elige el APN y se reconecta | Huawei E3372s, módulos Quectel y Sierra Wireless en placas USB |

Los módems tradicionales deben ser compatibles con ModemManager: consulta la [lista de dispositivos compatibles de ModemManager](https://www.freedesktop.org/wiki/Software/ModemManager/SupportedDevices/). Elige un modelo cuyas bandas coincidan con las de tu operadora.

## Receptores GPS RTK

Las correcciones NTRIP necesitan un receptor compatible con RTK (de fase portadora) en el controlador de vuelo, por ejemplo módulos basados en u-blox ZED-F9P, CubePilot Here3+ o Septentrio Mosaic. Los módulos de navegación estándar como M8N, M9N o M10 no pueden usar correcciones RTK.

Source: https://docs.uavmatrix.com/es/reference/supported-hardware/
