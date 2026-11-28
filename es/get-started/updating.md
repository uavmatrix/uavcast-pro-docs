# Actualizar UAVcast-Pro

> Actualiza UAVcast-Pro desde la interfaz web o la línea de comandos, instala una versión anterior y descubre qué pasa con tus ajustes, el puerto del servidor y las grabaciones.

Actualiza UAVcast-Pro desde **Aplicación → Actualizar Aplicación** en la interfaz web, o ejecutando de nuevo el instalador por SSH. Ambas opciones conservan tus ajustes, usuarios, licencia y grabaciones. El dron necesita acceso a Internet, y debes reiniciar cuando termine la actualización.

> **No actualices antes de un vuelo**
>
> Una actualización detiene todos los servicios de UAVcast-Pro, incluidos la telemetría y el video, y requiere un reinicio. Actualiza en tierra, con el avión desarmado.

## Actualizar desde la interfaz web

1. Ve a **Aplicación**. La tarjeta **Actualizar Aplicación** muestra la **Versión Actual** y la **Última Versión**. Aparece un banner verde *Nueva versión … disponible* cuando hay una versión más reciente.
2. Deja **Selecciona la versión para actualizar** en la última versión, o elige otra.
3. Selecciona **Actualizar a …** (o **Actualizar Ahora**). **Progreso** muestra los pasos de descarga e instalación. Esto tarda unos minutos, más en una Pi Zero 2 W o una Pi 3.
4. Cuando aparezca el banner **Reinicio Pendiente**, selecciona **Reiniciar Ahora**. El dispositivo se reinicia.
5. Vuelve a abrir la interfaz web y comprueba la **Versión Actual**.

![Tarjeta Actualizar Aplicación con la versión actual y la última versión, un banner de Nueva versión disponible y el botón de actualizar](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/application--update-available.webp)

*Aplicación → Actualizar Aplicación con una versión más reciente disponible.*

## Actualizar desde la línea de comandos

Ejecuta de nuevo el instalador. Reemplaza los archivos del programa y conserva la base de datos:

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
sudo reboot
```

Para instalar una versión específica, lista las versiones (no hace falta ser root) y luego instala una con `-b`:

```bash
# Lista las versiones disponibles para este dispositivo
curl -fsSL https://install.uavmatrix.com | bash -s -- -l

# Instala una versión específica
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.1
```

## Volver a una versión anterior

Elige la versión anterior en **Selecciona la versión para actualizar** y actualiza como de costumbre, o usa `-b` en la línea de comandos. Los ajustes creados en una versión más nueva pueden no existir en la anterior.

## Qué conserva y qué reemplaza una actualización

| Se conserva | Se reemplaza |
| --- | --- |
| Base de datos de ajustes (`/opt/uavcast-pro/uavcast.db`): estaciones de control, cámara, módem, VPN, usuarios, licencia | Archivos del programa en `/opt/uavcast-pro` (`build`, `dist`, `factory`, `install`) |
| Grabaciones y registros de telemetría | Archivos de servicio de systemd |
| Pertenencia a ZeroTier y Tailscale | Paquetes del sistema de los que depende UAVcast-Pro (actualizados por apt) |

A partir de UAVcast-Pro 6.5.3, el **Puerto del Servidor** personalizado definido en la página Aplicación se conserva al actualizar. Las versiones anteriores lo restablecen a 80: después de actualizar desde una de ellas, abre la interfaz web en el puerto 80 y vuelve a guardar tu puerto.

## Consulta qué cambió

Cada versión aparece en el [registro de cambios](https://docs.uavmatrix.com/es/reference/changelog/) con sus novedades. Léelo antes de actualizar un dron que esté en operación.

Source: https://docs.uavmatrix.com/es/get-started/updating/
