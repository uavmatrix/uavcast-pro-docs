# La instalación falla

> Corrige errores del instalador de UAVcast-Pro como No installation candidate found o failed dependencies: revisa el SO de 64 bits, internet, el disco y el registro del instalador.

Ejecutaste `curl -fsSL https://install.uavmatrix.com | sudo bash` y se detuvo con un error, se quedó colgado o terminó sin una interfaz web funcional.

| Lo que ves | Causa probable | Empieza en |
| --- | --- | --- |
| No installation candidate for … found! | SO de 32 bits o arquitectura no compatible | [Verificación 1](https://docs.uavmatrix.com/es/troubleshooting/installation-fails/#check-1) |
| Failed to update package lists, o Failed to install dependencies | Sin internet, o una configuración de apt rota | [Verificación 2](https://docs.uavmatrix.com/es/troubleshooting/installation-fails/#check-2) |
| Se queda colgado mucho tiempo en una Pi Zero 2 W | Poca memoria y almacenamiento lento | [Verificación 3](https://docs.uavmatrix.com/es/troubleshooting/installation-fails/#check-3) |
| Service failed to start | Un componente no pudo iniciar después de la instalación | [Verificación 4](https://docs.uavmatrix.com/es/troubleshooting/installation-fails/#check-4) |

## Comprobación 1: sistema operativo de 64 bits

UAVcast-Pro v6 necesita un SO de 64 bits: arm64 o amd64 (PC x86). En arm64, las placas que no son Raspberry Pi (Jetson y otras placas ARM) necesitan UAVcast-Pro 6.5.3 o posterior; los instaladores anteriores se detienen con *Device is not a Raspberry Pi*.

```bash
dpkg --print-architecture   # debe mostrar arm64 o amd64
uname -m                    # aarch64 o x86_64
```

Si ves `armhf`, `armv7l` o `i686`, estás en un SO de 32 bits. Graba **Raspberry Pi OS (64-bit)** con Raspberry Pi Imager e instala de nuevo. Los sistemas compatibles son Raspberry Pi OS, Debian y Ubuntu; consulta [Hardware compatible](https://docs.uavmatrix.com/es/reference/supported-hardware/).

## Comprobación 2: internet y apt

El instalador descarga UAVcast-Pro y los paquetes del sistema, e instala ZeroTier y Tailscale.

1. Verifica el acceso a internet: `curl -I https://install.uavmatrix.com`.
2. Ejecuta `sudo apt update` manualmente y corrige los errores que muestre, por ejemplo un repositorio de terceros con una clave vencida.
3. Vuelve a ejecutar el instalador. Es seguro ejecutarlo más de una vez.

## Comprobación 3: placas de bajo consumo

En una Raspberry Pi Zero 2 W la instalación tarda mucho más que en una Pi 4 o 5, y el instalador muestra una estimación de tiempo. Déjalo terminar. Usa una tarjeta SD rápida y una fuente de alimentación estable: un reinicio por subtensión durante la instalación deja una instalación a medias.

## Comprobación 4: lee el registro del instalador

El instalador escribe todo en `/opt/uavcast-pro/installer.log`.

```bash
sudo tail -n 100 /opt/uavcast-pro/installer.log
```

Revisa las últimas líneas de error. Si el instalador falla antes de poder crear `/opt/uavcast-pro`, el registro está en `/tmp/uavcast-installer.log`.

## Instalar una versión específica

Para listar las versiones disponibles para tu arquitectura, o para instalar una de ellas:

```bash
curl -fsSL https://install.uavmatrix.com | bash -s -- -l          # listar versiones
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2  # instalar 6.5.2
```

## ¿Sigue fallando?

Envía `/opt/uavcast-pro/installer.log`, la salida de `cat /etc/os-release` y `dpkg --print-architecture`, y el modelo de tu placa a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Relacionado: [Instalar UAVcast-Pro](https://docs.uavmatrix.com/es/get-started/installation/)

Source: https://docs.uavmatrix.com/es/troubleshooting/installation-fails/
