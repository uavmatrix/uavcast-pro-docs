# Inicio rápido

> Conecta un controlador de vuelo MAVLink a UAVcast-Pro y obtén telemetría y video en vivo en Mission Planner o QGroundControl, primero en tu LAN y luego por 4G/LTE.

Esta guía lleva un dron con UAVcast-Pro instalado hasta tener telemetría y video en vivo en Mission Planner o QGroundControl. Lo harás primero en tu red local, donde hay menos cosas que pueden salir mal, y después cambiarás a 4G/LTE. La parte local toma unos 10 minutos.

## Antes de comenzar

- UAVcast-Pro instalado y el dispositivo reiniciado. Consulta [Instalación](https://docs.uavmatrix.com/es/get-started/installation/).
- Tu clave de licencia. Consulta [Licencias y activación](https://docs.uavmatrix.com/es/get-started/license-activation/).
- El controlador de vuelo conectado a la computadora de a bordo por USB o un puerto TELEM, y con energía.
- Una cámara conectada (opcional).
- Una laptop con Mission Planner o QGroundControl en la **misma red** que el dron. Anota la dirección IP de la laptop (`ipconfig` en Windows, `ip a` en Linux, **Configuración del sistema → Red** en macOS).

## 1. Activa la licencia

> Necesitas una licencia de UAVcast-Pro para activar el dron. Cómprala en la tienda de UAVmatrix.
>
> [Comprar UAVcast-Pro](https://uavmatrix.com/es/checkout) · [Ver planes y precios](https://uavmatrix.com/es/products)

1. Abre `http://<ip-del-dron>` en un navegador. Llegarás a **Aplicación**.
2. Pega tu clave en **Ingresar Clave de Licencia** y selecciona **Validar**.

La barra lateral se desbloquea. Ahora ve a **Usuarios**, selecciona **Agregar Usuario** y crea una cuenta de administrador, para que nadie de la red pueda acceder a la interfaz web.

## 2. Conecta el controlador de vuelo

1. Ve a **Controlador de Vuelo → Conexión**.
2. En **Tipo de Conexión**, elige **USB** o **UART / Serie** según tu cableado.
3. Deja **Puerto** y **Tasa de Baudios** en **Automático**.
4. Si el panel de estado indica **Enlace detenido**, selecciona **Conectar**.
5. Espera a que el estado cambie a **Conectado**. **Información de Mavlink** se llena con el tipo de vehículo, el modo de vuelo, el GPS y la batería, y la barra superior muestra **FC conectado**.

![Página Conexión del Controlador de Vuelo que muestra Conectado por USB, la verificación de conexión con cuatro pasos superados y el Inspector MAVLink](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/flight-controller.webp)

*Controlador de Vuelo → Conexión con un enlace USB funcionando.*

¿Atascado en **Esperando dispositivo**, **Detectando tasa de baudios** o **Sin heartbeat**? Selecciona **Detección automática** y lee el panel **Verificación de conexión**: indica lo primero que está mal. Más información en [Controlador de vuelo](https://docs.uavmatrix.com/es/uavcast-pro/flight-controller/).

## 3. Envía telemetría y video a tu laptop

1. Ve a **Control en Tierra**. Ya hay una tarjeta de destino vacía.
2. Escribe un **Nombre**, por ejemplo `Laptop`.
3. En **IP o Host de Destino**, escribe la dirección IPv4 de tu laptop, por ejemplo `192.168.1.20`, y pulsa Enter. Una marca verde indica que se guardó.
4. Deja **Puerto de Telemetría** en `14550` y **Puerto de Video** en `5600`.
5. Activa **Habilitar Telemetría**.
6. Activa **Habilitar Video** si tienes una cámara.

Los campos se guardan al salir de ellos. No hay botón Guardar.

## 4. Inicia la cámara

Omite este paso si no tienes cámara.

1. Ve a **Cámara → Ajustes de cámara**.
2. Pon **¿Habilitar Cámara?** en **Sí**.
3. Haz clic en la ranura **CAM 1** y elige tu cámara, por ejemplo *Raspberry Pi Camera - imx708 (CSI)* o tu webcam USB.
4. En **Configuración de Cámara**, elige una **Resolución**. Empieza con `1280x720` o el tamaño más cercano que ofrezca tu cámara.
5. Deja **Seleccionar FPS** en **Automático** y **Tasa de bits** en `0` (automático).
6. En **Configuración de Stream**, marca **¿Activar Vista Previa en Vivo?** y selecciona **Iniciar**. La **Vista previa en vivo** muestra la imagen.

## 5. Abre tu estación de control

**QGroundControl**

QGroundControl escucha en UDP 14550 de forma predeterminada, así que el dron aparece solo en unos segundos.

Para el video: haz clic en el icono **Q** → **Application Settings** → **Video** (en versiones anteriores, la sección **Video** de **General**). Configura **Source** en **UDP h.264 Video Stream** y deja el puerto UDP predeterminado `5600`. El video se muestra vista Fly.

**Mission Planner**

En la esquina superior derecha elige **UDP**, selecciona **Connect** y acepta el puerto `14550`.

![Vista Flight Data de Mission Planner conectada por UDP: el cuadro de conexión superior derecho muestra UDP, el enlace UDP14550-1-QUADRO y el botón DISCONNECT; el HUD muestra DISARMED, Unhealthy AHRS y GPS: No Fix](https://docs.uavmatrix.com/es/img/screenshots/gcs/mission-planner--connected.webp)

*Mission Planner conectado por UDP 14550: el cuadro de conexión (arriba a la derecha) muestra el enlace y DISCONNECT. Configuración de banco sin GPS, por eso el HUD muestra Unhealthy AHRS y GPS: No Fix.*

Para el video: haz clic derecho en el HUD → **Video** → **Set GStreamer Source** y pega:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

Guías completas con capturas y soluciones: [Mission Planner](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/mission-planner/), [QGroundControl](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/qgroundcontrol/), [Android](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/android/), y GStreamer en [Windows](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/gstreamer-linux/) o [macOS](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/gstreamer-macos/).

> **Firewall de Windows**
>
> Windows bloquea el UDP entrante a menos que la aplicación haya solicitado una excepción. Si la telemetría o el video no llegan, permite Mission Planner o QGroundControl en el firewall para redes **privadas y públicas**, o abre los puertos UDP 14550 y 5600.

Ahora tienes telemetría y video en tu red local. La fila **Ground station** del tablero muestra *Sending · … packets/s*.

## 6. Vuela sobre 4G/LTE

Sobre una red celular, el dron no tiene una dirección a la que tu laptop pueda acceder, así que ambos se unen a la misma VPN. La VPN de Fleet Manager está incluida con tu licencia.

1. Conecta el módem. En **Módem**, pon **Tipo de módem** en **HiLink** o **Tradicional (PPP)**. Deja **Nombre del Punto de Acceso** vacío: UAVcast-Pro detecta el APN. Consulta [Módem celular](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/cellular-modem/).
2. Inicia sesión en [Fleet Manager](https://fleet-manager.uavmatrix.com/), abre **Network** y selecciona **Enable VPN Network** si aún no está activada.
3. Vincula el dron: en UAVcast-Pro, ve a **Gestión → Fleet Management → Connect to Fleet Manager** e introduce el código en Fleet Manager, en **Fleet → Pair Device**. Mantén marcada **Enable VPN for this UAV**.
4. Conecta la laptop a la VPN: instala Tailscale y ejecuta el **GCS Connection Command** de la página **Network** de Fleet Manager; después marca la laptop como **Ground Control Station (GCS)**.
5. En **Network → Stream Bindings**, agrega un vínculo desde el dron a la laptop. Fleet Manager envía el destino al dron, y la columna **Ports** muestra en qué puertos escuchar.
6. En **Redes**, selecciona **Prioridad Módem (Modo Exterior)** para que el tráfico pase por el módem cuando se cae el Wi-Fi.

Guía completa: [Volar más allá del alcance visual por 4G](https://docs.uavmatrix.com/es/guides/bvlos-4g/). ¿Ya tienes tu propia red de Tailscale o ZeroTier? Únete el dron y la laptop a ella y usa la IP VPN de la laptop como destino: consulta [VPN](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/vpn/).

> **Configura un failsafe de GCS antes de volar sobre LTE**
>
> Los enlaces celulares se caen. Asegúrate de que el controlador de vuelo tenga configurado un failsafe de GCS (`FS_GCS_ENABLE` en ArduPilot, `NAV_DLL_ACT` en PX4). La barra superior muestra **Failsafe GCS habilitado** o **Failsafe GCS deshabilitado**.

## Próximos pasos

- [Dos cámaras, cambio por RC y flujo doble](https://docs.uavmatrix.com/es/uavcast-pro/camera/multi-camera/)
- [Graba cada vuelo en el dron](https://docs.uavmatrix.com/es/uavcast-pro/camera/recordings/)
- [Correcciones RTK por 4G con NTRIP](https://docs.uavmatrix.com/es/uavcast-pro/flight-controller/ntrip-rtk/)
- [Vincula el dron con Fleet Manager](https://docs.uavmatrix.com/es/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/es/get-started/quick-start/
