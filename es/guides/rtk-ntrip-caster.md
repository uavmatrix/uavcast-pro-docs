# GPS RTK por 4G con un caster NTRIP

> Transmite correcciones RTCM3 desde un caster NTRIP por LTE hasta tu controlador de vuelo con UAVcast-Pro para RTK Fijo, sin estación base en el sitio.

UAVcast-Pro puede obtener correcciones RTCM3 de un caster NTRIP a través de la conexión a internet propia del dron y pasarlas al controlador de vuelo. Obtienes posicionamiento RTK Float o RTK Fijo sin llevar una estación base ni una radio aparte. Funciona cualquier caster NTRIP v1 o v2 estándar.

```text
NTRIP caster ──RTCM3 over TCP/TLS──► UAVcast-Pro ──MAVLink GPS_RTCM_DATA──► flight controller ──► RTK GPS
      ▲                                    │
      └──────── GGA position (VRS) ────────┘
```

**Necesitas:**

- Un GPS compatible con RTK en el controlador de vuelo, como un módulo u-blox F9P, Here3+ o Septentrio Mosaic. Los módulos de navegación estándar M8N/M10 no pueden hacer RTK.
- UAVcast-Pro con el controlador de vuelo **Conectado** e internet en el dron.
- Una cuenta en un caster: una red CORS nacional, un servicio comercial (Trimble, Hexagon, Topcon …) o el caster comunitario gratuito rtk2go.com.

## 1. Ingresa el caster

1. Abre **Controlador de Vuelo → NTRIP / RTK**.
2. Ingresa **Host del caster** y **Puerto** (normalmente `2101`).
3. Activa **Usar TLS (HTTPS)** solo si tu proveedor lo requiere. Los casters comerciales a menudo sí, los públicos rara vez.
4. Ingresa **Usuario** y **Contraseña**. Para rtk2go.com, usa tu correo electrónico como usuario y deja la contraseña vacía.
5. Presiona **Probar conexión**. Espera a que aparezca **El caster aceptó las credenciales.**

## 2. Elige un punto de montaje

1. Presiona **Explorar puntos de montaje**. UAVcast-Pro carga la lista del caster.
2. Elige el punto de montaje más cercano a donde vuelas. La lista muestra **Formato**, **GNSS**, **País**, **Ubicación** y si necesita una posición (**NMEA**: **Requerido**).
3. Presiona **Seleccionar**. El nombre aparece en **Punto de montaje**.

![Tarjeta del caster con Habilitar cliente NTRIP, host del caster, puerto 2101, campo de punto de montaje, botón Explorar puntos de montaje y Usar TLS](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/flight-controller--ntrip-caster.webp)

*La tarjeta del caster. Explorar puntos de montaje, junto al campo Punto de montaje, abre la lista de puntos de montaje.*

## 3. Envía tu posición (casters VRS y de punto de montaje más cercano)

Los casters VRS y de punto de montaje más cercano generan correcciones para tu ubicación, así que necesitan tu posición como una sentencia NMEA GGA.

1. Deja **Enviar GGA upstream** activado (el predeterminado) con **Intervalo de envío (segundos)** en 10.
2. Deja **Position source** en **Posición en vivo desde el controlador de vuelo**.
3. Ingresa también **Latitud**, **Longitud** y **Alt (m)** en la posición manual. UAVcast-Pro la usa hasta que el controlador de vuelo tenga señal GPS.

Para una sola base fija, GGA no es perjudicial, pero puedes desactivarlo.

## 4. Inicia el stream

Activa **Habilitar cliente NTRIP**. En cuestión de segundos, el panel de estado debe mostrar:

1. **Estado**: **Transmitiendo correcciones**, con **Respuesta del caster** como `ICY 200 OK`.
2. **Mensajes RTCM reenviados** en aumento y **Último frame RTCM** en *justo ahora*.
3. **Tipos de mensaje recientes** con tus constelaciones, por ejemplo 1005, 1077, 1087, 1097.
4. La insignia de fijación RTK pasa de **3D fix** a **RTK Float** y luego a **RTK Fijo** con cielo abierto.

![Pestaña NTRIP / RTK con el panel de estado en Disabled y contadores en cero, y la tarjeta de calidad GPS en No fix](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/flight-controller--ntrip.webp)

*El panel de estado y la tarjeta de calidad GPS, mostrados aquí antes de configurar un caster (Disabled, sin fijación GPS). Cuando fluyan las correcciones, estos son los campos que debes vigilar.*

La tarjeta de **Calidad GPS** añade la precisión que informa el receptor y una **Estabilidad de posición (1σ)** medida que no depende de la estimación propia del receptor. El tablero muestra el estado en **RTK corrections** y el tipo de fijación en **GPS**.

## Preajustes

```text
Caster host   rtk2go.com
Port          2101
TLS           off
Username      you@example.com
Password      (empty)
Mountpoint    nearest one from Browse mountpoints
```

```text
Caster host   provider host name
Port          2101 (sometimes 2102 or 443)
TLS           as the provider says
Username      provider account
Password      provider password
Mountpoint    the provider's VRS mountpoint
GGA upstream  on, 10 s, live position from flight controller
```

## Cosas útiles

- Las correcciones viajan por el mismo enlace MAVLink que la telemetría, así que el enlace con el controlador de vuelo debe estar activo.
- Tras una breve caída de internet, las correcciones se reanudan en segundos. Si el caster deja de responder, UAVcast-Pro se reconecta por sí solo.
- La precisión disminuye con la distancia a la estación base. Elige el punto de montaje más cercano o usa un servicio VRS.

## Solución de problemas

Si se queda en **Conectando**, recibe una respuesta `401`, no hay datos RTCM o no hay fijación RTK: [Las correcciones RTK no llegan](https://docs.uavmatrix.com/es/troubleshooting/rtk-corrections-not-arriving/). Todos los ajustes de esta página se describen en [NTRIP / RTK](https://docs.uavmatrix.com/es/uavcast-pro/flight-controller/ntrip-rtk/).

Source: https://docs.uavmatrix.com/es/guides/rtk-ntrip-caster/
