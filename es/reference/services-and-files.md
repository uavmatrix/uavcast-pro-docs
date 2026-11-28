# Servicios, archivos y opciones del instalador

> Los servicios de systemd que instala UAVcast-Pro, dónde guarda su base de datos, registros y grabaciones, opciones del instalador para versiones y comandos SSH útiles.

Para cuando trabajas en el dispositivo por SSH: qué servicios componen UAVcast-Pro, dónde viven sus archivos y cómo instalar una versión específica.

## Servicios

UAVcast-Pro se ejecuta como un conjunto de servicios de systemd. Cada uno se reinicia solo si falla.

| Servicio | Qué hace |
| --- | --- |
| `uavcast-web` | La interfaz web (Node.js). Escucha en el puerto 80, a menos que hayas cambiado **Puerto del Servidor**. |
| `uavcast-factory` | API en segundo plano: licencia, módem, VPN, red, registros, almacenamiento de grabaciones y la conexión con Fleet Manager. |
| `mavlink-manager` | Enlace con el controlador de vuelo y enrutador de telemetría hacia las estaciones de control en tierra. Arranca sin esperar a internet. |
| `uavcast-camera` | Captura de cámara, codificación H.264 y el stream de video UDP. Arranca sin esperar a internet. |
| `mediamtx` | Servidor de medios para la vista previa en el navegador, RTSP y grabaciones. |
| `uavcast-ntrip` | Cliente NTRIP para correcciones RTK. |
| `uavcast-dns` | Actualizador de DNS dinámico. |
| `redis-server` | Bus de mensajes interno del que dependen los demás servicios. |
| `zerotier-one`, `tailscaled` | Clientes VPN, instalados por el instalador de UAVcast-Pro. |

Comandos útiles:

```bash
sudo systemctl status uavcast-web            # is it running?
sudo systemctl restart uavcast-camera        # restart one service
journalctl -u mavlink-manager -f             # follow a service's log live
journalctl -u uavcast-web --since yesterday  # read recent history
```

## Archivos y carpetas

Todo se encuentra en `/opt/uavcast-pro`.

| Ruta | Contenido |
| --- | --- |
| `/opt/uavcast-pro/uavcast.db` | Base de datos de ajustes (SQLite). Respáldala desde **Aplicación → Base de Datos → Respaldar Base de Datos**. |
| `/opt/uavcast-pro/logs/` | Registros de los servicios, rotados automáticamente. Descárgalos desde **Aplicación → Registro**. |
| `/opt/uavcast-pro/recordings/` | Grabaciones de cámara y registros de telemetría en el almacenamiento interno (a menos que **Ubicación de almacenamiento** apunte a una unidad USB u otra carpeta). |
| `/opt/uavcast-pro/missions/` | Misiones guardadas. |
| `/opt/uavcast-pro/installer.log` | Registro de la última instalación. |
| `/etc/systemd/system/uavcast-web.service` | Servicio de la interfaz web, incluido `SERVER_PORT`. |

## Opciones del instalador

El instalador es un único comando. Vuelve a ejecutarlo en cualquier momento para reparar o actualizar una instalación.

```bash
# Install or update to the latest version
curl -fsSL https://install.uavmatrix.com | sudo bash

# List the versions available for this device's architecture
curl -fsSL https://install.uavmatrix.com | bash -s -- -l

# Install a specific version
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2
```

| Opción | Significado |
| --- | --- |
| `-l` | Lista las versiones disponibles para esta arquitectura (arm64 o amd64). |
| `-b <version>` | Instala esa versión en lugar de la más reciente. |

El instalador detecta la arquitectura y el sistema operativo, instala paquetes del sistema, ZeroTier, Tailscale y los paquetes de cámara, configura el UART de la Raspberry Pi, prepara los servicios e inicia la interfaz web. Su registro está en `/opt/uavcast-pro/installer.log`.

También puedes actualizar desde la interfaz web: **Aplicación → Actualizar Aplicación**, luego **Selecciona la versión para actualizar** y por último **Actualizar Ahora**.

## Puntos de integración

UAVcast-Pro no tiene una API REST pública. Para integrarlo, usa:

- **MAVLink sobre UDP** hacia cada destino de estación de control en tierra (puerto 14550 de forma predeterminada), con cualquier software compatible con MAVLink.
- **Video** sobre RTP/UDP (puerto 5600) o RTSP desde el dron (puerto 8554). Consulta [VLC y RTSP](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/vlc-and-rtsp/).
- **Inyectores** para enviar tus propios valores de sensores al flujo MAVLink por HTTP, UDP o serie. Consulta [Inyectores](https://docs.uavmatrix.com/es/uavcast-pro/flight-controller/injectors/).

Source: https://docs.uavmatrix.com/es/reference/services-and-files/
