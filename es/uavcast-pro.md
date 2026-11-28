# UAVcast-Pro

> Referencia de la interfaz web de UAVcast-Pro: tablero, controlador de vuelo, mapa de vuelo, estaciones de control en tierra, cámara, módem, VPN, vinculación con Fleet Manager, usuarios y ajustes.

Esta sección explica cada página de la interfaz web de UAVcast-Pro, en el orden de la barra lateral de la aplicación. Cada página indica para qué sirve la pantalla, cómo configurarla y enumera cada ajuste con su valor por defecto. ¿Nuevo en UAVcast-Pro? Empieza con la [Guía de inicio rápido](https://docs.uavmatrix.com/es/get-started/quick-start/).

## Operaciones

[TableroEstado del controlador de vuelo, GPS, enlaces, video y energía de un vistazo.](https://docs.uavmatrix.com/es/uavcast-pro/dashboard/)[Flujos de DatosTableros en vivo personalizados para cualquier valor de MAVLink o de sensor.](https://docs.uavmatrix.com/es/uavcast-pro/data-streams/)[Controlador de VueloEnlace USB o UART con detección automática de puerto y tasa de baudios, NTRIP/RTK e inyectores.](https://docs.uavmatrix.com/es/uavcast-pro/flight-controller/)[Mapa de VueloMapa en vivo, HUD de cabina, armar/desarmar, modos, misiones, radio, inspector y análisis de registros.](https://docs.uavmatrix.com/es/uavcast-pro/flight-map/)[Estaciones de control en tierra y videoDestinos, más configuración paso a paso de Mission Planner, QGroundControl, GStreamer, Android y VLC.](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/)

## Conectividad

[MódemMódems HiLink y tradicionales 4G/LTE con APN automático.](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/cellular-modem/)[Red Privada VirtualLa VPN de Fleet Manager, o tu propia red de Tailscale o ZeroTier.](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/vpn/)[DNS DinámicoMantén un nombre de host apuntando a la IP pública del dron.](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/dynamic-dns/)[RedesInterfaces y prioridad Wi-Fi frente a módem.](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/networks/)

## Medios

[Ajustes de cámaraCámaras CSI y USB, resolución, tasa de bits y H.264 de baja latencia sobre UDP.](https://docs.uavmatrix.com/es/uavcast-pro/camera/)[Dos cámarasCambio por canal de radiocontrol o doble stream.](https://docs.uavmatrix.com/es/uavcast-pro/camera/multi-camera/)[AudioAudio del micrófono en la vista previa y hacia las estaciones de control en tierra.](https://docs.uavmatrix.com/es/uavcast-pro/camera/audio/)[GrabacionesGrabación de video y telemetría en el dron, con revisión de vuelo.](https://docs.uavmatrix.com/es/uavcast-pro/camera/recordings/)

## Gestión

[Fleet ManagementVincula el dron con UAVmatrix Fleet Manager.](https://docs.uavmatrix.com/es/uavcast-pro/fleet-pairing/)[UsuariosInicio de sesión de administrador y usuarios de solo lectura.](https://docs.uavmatrix.com/es/uavcast-pro/users/)[AplicaciónPuerto, idioma, registros para soporte, respaldo y restauración de la base de datos.](https://docs.uavmatrix.com/es/uavcast-pro/application-settings/)

## Puertos de un vistazo

| Puerto | Dirección | Uso |
| --- | --- | --- |
| TCP 80 | Navegador → dron | Interfaz web (configurable) e inyectores HTTP |
| UDP 14550 | Dron → estación de control | Telemetría MAVLink (por destino, configurable) |
| UDP 5600 | Dron → estación de control | Video, cámara 1 (por destino, configurable) |
| UDP 5601 | Dron → estación de control | Video, cámara 2 con doble stream (Puerto de Video + 1 por defecto) |
| UDP 5602 | Dron → estación de control | Audio (Puerto de Video + 2) |
| TCP 8889, UDP 8189 | Navegador → dron | Vista previa en vivo (señalización y medios WebRTC) |
| TCP 8883 | Dron → Fleet Manager | Conexión con Fleet Manager (MQTT sobre TLS) |
| TCP 2101 | Dron → caster NTRIP | Correcciones RTK (puerto del caster) |
| UDP 14600 | Sensor → dron | Inyector UDP (por defecto, configurable) |

Source: https://docs.uavmatrix.com/es/uavcast-pro/
