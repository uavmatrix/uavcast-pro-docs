# Requisitos de hardware

> Qué Raspberry Pi o computadora Linux, controlador de vuelo, cámara y módem 4G/LTE son compatibles con UAVcast-Pro, además de los requisitos de cableado, energía y almacenamiento.

UAVcast-Pro se ejecuta en una computadora Linux de 64 bits a bordo, conectada a cualquier controlador de vuelo MAVLink (ArduPilot o PX4). Agrega una cámara para video y un módem 4G/LTE para vuelos fuera del alcance del Wi-Fi. La configuración más común es una Raspberry Pi 4 o 5 con una cámara Pi y un módem USB.

## Computadora de a bordo

UAVcast-Pro se instala en cualquier placa o PC Linux de **64 bits** con CPU **arm64** o **amd64 (x86-64)** que ejecute Raspberry Pi OS, Debian o Ubuntu. Los sistemas de 32 bits (`armv7l`, `i686`) no son compatibles.

| Placa | Estado | Notas |
| --- | --- | --- |
| Raspberry Pi 5 | Compatible | No tiene codificador H.264 por hardware. El video se codifica por software, así que vigila el indicador **Carga del sistema** en la página Cámara con resoluciones altas o dos flujos. |
| Raspberry Pi 4 | Compatible, recomendada | Buen equilibrio entre CPU, consumo y precio. 2 GB de RAM o más. |
| Raspberry Pi 3 / 3B+ | Compatible | Adecuada para telemetría y un flujo de 720p. La instalación tarda unos 30 minutos. |
| Raspberry Pi Zero 2 W | Compatible | La más pequeña y ligera. La instalación tarda unos 30 minutos; mantén el video moderado. |
| Raspberry Pi Compute Module 3+/4 | Compatible | Igual que el modelo Pi correspondiente. |
| NVIDIA Jetson, Orange Pi, Banana Pi y otras placas arm64 | Compatible | Usa la imagen de Ubuntu o Debian de 64 bits del fabricante. UAVcast-Pro reconoce estas placas y sugiere sus puertos serie para el controlador de vuelo. Usa una cámara USB (las cámaras CSI de Raspberry Pi requieren una Pi). |
| PC x86-64 (Intel NUC, mini PC, laptop) | Compatible | Usa la compilación amd64. Los adaptadores serie USB aparecen como `/dev/ttyUSB*` o `/dev/ttyACM*`. |

Ejecuta `uname -m` en la placa para comprobar la arquitectura. Debe mostrar `aarch64` o `x86_64`.

> **Placas arm64 que no son Raspberry Pi**
>
> Jetson, Orange Pi, Banana Pi y otras placas arm64 que no son Raspberry Pi necesitan UAVcast-Pro 6.5.3 o posterior. Los instaladores anteriores se detienen en ellas con *Device is not a Raspberry Pi*.

### Almacenamiento

- **Mínimo 500 MB libres** en el disco raíz, o el instalador se detiene. Una tarjeta de 8 GB o más es el mínimo práctico; usa 32 GB o más si grabas video en el dron.
- Usa una microSD de buena calidad clasificada A1/A2, o arranca desde un SSD. Las grabaciones también pueden guardarse en una unidad USB o un SSD (consulta [Grabaciones](https://docs.uavmatrix.com/es/uavcast-pro/camera/recordings/)).

> **La licencia está vinculada al dispositivo de almacenamiento**
>
> UAVcast-Pro identifica un dispositivo por el número de serie de su CPU más el número de serie del disco de arranque (tarjeta SD o SSD). Cambiar a una nueva tarjeta SD cuenta como un dispositivo nuevo. Primero da de baja el anterior. Consulta [Mueve tu licencia a nuevo hardware](https://docs.uavmatrix.com/es/get-started/license-activation/#move-to-new-hardware).

### Energía

La Raspberry Pi necesita una alimentación estable de **5.1 V** que pueda soportar la Pi y todo lo conectado a sus puertos USB. Un módem 4G puede consumir bastante más de 500 mA cuando transmite, y una cámara USB añade más consumo.

- Alimenta la Pi desde un BEC o regulador de 5 V dedicado, dimensionado para toda la carga. El puerto TELEM o USB del controlador de vuelo no puede alimentar la Pi.
- Si el módem provoca caídas de voltaje en la Pi, aliméntala desde un hub USB con alimentación propia o desde una fuente de 5 V independiente.
- Revisa la fila **Power supply** en el [Tablero](https://docs.uavmatrix.com/es/uavcast-pro/dashboard/). *Voltage too low - use a stronger power supply* indica que la Pi tiene bajo voltaje en este momento. *Slowed down (heat or power)* indica que la CPU está limitando su velocidad.

## Controlador de vuelo

UAVcast-Pro funciona con **cualquier controlador de vuelo MAVLink**: ArduPilot (Copter, Plane, Rover, Sub) y PX4, en las familias Pixhawk y Cube, Matek, Holybro, CUAV, mRo y la mayoría de las demás placas. Se recomienda MAVLink 2.

Los nombres de los modos de vuelo y los botones de modo (en el Mapa de Vuelo y en Fleet Manager) usan los modos de ArduPilot para Copter, Plane, Rover y Sub. En un controlador de vuelo PX4, la telemetría, el video, el enrutamiento hacia las estaciones de control, el mapa y el HUD funcionan igual; usa tu estación de control para cambiar los modos de vuelo de PX4.

Conéctalo de una de estas dos formas:

| Enlace | Cableado | Cuándo usarlo |
| --- | --- | --- |
| **USB** | Cable USB desde el puerto USB del controlador de vuelo a la computadora de a bordo. | La opción más sencilla. No hay que configurar la tasa de baudios. Usa un cable de datos corto y de buena calidad. |
| **UART / Serie** | Puerto TELEM TX → RX de la computadora, RX → TX de la computadora, GND → GND. O un cable USB-serie (FTDI). | Cuando el puerto USB se usa para otra cosa, o para una instalación más limpia. Habilita MAVLink en ese puerto: `SERIALx_PROTOCOL = 2` (MAVLink2) en ArduPilot, `MAV_x_CONFIG` en PX4. |

**Solo Raspberry Pi:** el UART de GPIO es `/dev/serial0` (GPIO 14 TX, GPIO 15 RX). El instalador lo libera para el controlador de vuelo: deshabilita la consola de inicio de sesión serie y, en Pi 3, 4 y Zero 2 W, mueve el Bluetooth fuera del UART. Nunca conectes el pin de 5 V del controlador de vuelo a la Pi cuando ambos tienen su propia alimentación.

En otras placas, usa el UART de la placa (por ejemplo `ttyTHS*` en Jetson, `ttyS*` en Orange Pi) o un adaptador USB-serie.

| Puerto TELEM del controlador de vuelo | Cabecera GPIO de Raspberry Pi |
| --- | --- |
| TX | GPIO 15 (RXD), pin 10 |
| RX | GPIO 14 (TXD), pin 8 |
| GND | GND, por ejemplo pin 6 |

TX siempre va a RX. Deja sin conectar el pin de 5 V del puerto TELEM.

UAVcast-Pro detecta automáticamente el puerto y la tasa de baudios. Consulta [Conectar el controlador de vuelo](https://docs.uavmatrix.com/es/uavcast-pro/flight-controller/).

## Cámaras

| Cámara | Notas |
| --- | --- |
| Módulos de cámara Raspberry Pi (v1, v2, v3, HQ, Global Shutter) y otras cámaras CSI compatibles con libcamera | La mejor latencia. La Raspberry Pi 5 y los Compute Module pueden usar dos cámaras CSI. |
| Webcams USB (UVC) como Logitech C920 o C615 | Conectar y usar. Aparecen como `/dev/video*`. |
| Fuentes HDMI (GoPro, gimbals de cámara) | Mediante un puente HDMI a CSI (aparece como cámara CSI) o un capturador USB HDMI (aparece como cámara USB). |
| Cámaras IP y cualquier otra fuente que GStreamer pueda leer | Mediante un [pipeline personalizado](https://docs.uavmatrix.com/es/uavcast-pro/camera/custom-pipeline/). |

Dos cámaras pueden funcionar al mismo tiempo, ya sea cambiando con un canal de RC o transmitiéndolas juntas. Consulta [Dos cámaras y cambio por RC](https://docs.uavmatrix.com/es/uavcast-pro/camera/multi-camera/). Para audio, funciona cualquier micrófono USB o una webcam con micrófono integrado. Consulta [Audio](https://docs.uavmatrix.com/es/uavcast-pro/camera/audio/).

## Módems 4G/LTE

UAVcast-Pro admite dos tipos de módem USB:

| Tipo | Funcionamiento | Ejemplos |
| --- | --- | --- |
| **HiLink** | El módem es un router pequeño. Aparece como una tarjeta de red (normalmente `eth1` o `usb0`) y se conecta solo. No hay nada que configurar en UAVcast-Pro. | Huawei E3372**h** (firmware HiLink), E8372, la mayoría de los dongles LTE USB con interfaz web |
| **Tradicional (PPP)** | Administrado por ModemManager y NetworkManager. UAVcast-Pro lo conecta, detecta el APN y se vuelve a conectar tras las caídas. | Huawei E3372**s** (firmware de dispositivo USB), módulos Quectel EC25 / EG25 / EM06 y Sierra Wireless en un adaptador USB |

Cualquier módem de la [lista de dispositivos compatibles de ModemManager](https://www.freedesktop.org/wiki/Software/ModemManager/SupportedDevices/) debería funcionar como módem tradicional. Usa una SIM con plan de datos para tu región y comprueba si tu operador bloquea el tráfico entrante (una VPN lo soluciona). Consulta [Módem celular](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/cellular-modem/).

## Computadora de la estación de control

Cualquier computadora que ejecute Mission Planner, QGroundControl u otra estación de control MAVLink. Recibe la telemetría por UDP 14550 y el video por UDP 5600 de forma predeterminada. Para ver video en Mission Planner necesitas tener GStreamer instalado; QGroundControl lo incluye de serie.

Source: https://docs.uavmatrix.com/es/get-started/hardware-requirements/
