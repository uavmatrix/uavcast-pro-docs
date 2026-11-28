# La interfaz web no abre

> ¿No puedes abrir UAVcast-Pro en http://device-ip después de instalar? Encuentra la dirección correcta, revisa el servicio uavcast-web, el puerto del servidor y el puerto 80.

El instalador terminó, pero `http://<device-ip>/` agota el tiempo de espera, rechaza la conexión o muestra la página de otro programa.

| Lo que ves | Causa probable | Empieza en |
| --- | --- | --- |
| Tiempo de espera, o la página nunca carga | Dirección incorrecta, o tu computadora está en otra red | [Verificación 1](https://docs.uavmatrix.com/es/troubleshooting/web-interface-wont-open/#check-1) |
| Conexión rechazada | El servicio web no está en ejecución | [Verificación 2](https://docs.uavmatrix.com/es/troubleshooting/web-interface-wont-open/#check-2) |
| Otra página web, por ejemplo nginx o Apache | Algo más usa el puerto 80 | [Verificación 3](https://docs.uavmatrix.com/es/troubleshooting/web-interface-wont-open/#check-3) |
| Funcionaba antes, pero dejó de funcionar tras un cambio de ajustes | Se cambió el puerto del servidor | [Verificación 4](https://docs.uavmatrix.com/es/troubleshooting/web-interface-wont-open/#check-4) |
| Carga, pero cada página lleva a Aplicación | Todavía no hay una licencia activa | [Verificación 5](https://docs.uavmatrix.com/es/troubleshooting/web-interface-wont-open/#check-5) |

## Comprobación 1: Usa la dirección correcta

La interfaz web se ejecuta en el **puerto 80** por defecto, así que la dirección es simplemente `http://<device-ip>/`.

1. Busca la IP del dispositivo. El instalador la muestra al final. En el dispositivo también puedes ejecutar `hostname -I`.
2. En una Raspberry Pi con el nombre de host predeterminado, prueba `http://raspberrypi.local/`.
3. Usa `http://`, no `https://`. La interfaz web no sirve HTTPS.
4. Asegúrate de que tu computadora esté en la misma red que el dispositivo, o en la misma VPN. Por 4G debes usar la dirección VPN del dron.

## Comprobación 2: ¿Está el servicio web en ejecución?

En el dispositivo, ejecuta:

```bash
sudo systemctl status uavcast-web
```

Debe decir **active (running)**. Si no, inícialo y revisa por qué se detuvo:

```bash
sudo systemctl restart uavcast-web
journalctl -u uavcast-web --since "1 hour ago"
```

La interfaz web también necesita los servicios en segundo plano. Revísalos de la misma forma: `uavcast-factory`, `mavlink-manager`, `uavcast-camera` y `redis-server`. La lista completa está en [Servicios y archivos](https://docs.uavmatrix.com/es/reference/services-and-files/).

## Comprobación 3: El puerto 80 ya está en uso

Si otro servidor web está instalado en el dispositivo, puede estar ocupando el puerto 80. Averigua quién escucha:

```bash
sudo ss -ltnp | grep ':80 '
```

Detén y desactiva el otro servidor (`sudo systemctl disable --now nginx`, por ejemplo) y luego reinicia `uavcast-web`.

## Comprobación 4: Se cambió el puerto del servidor

**Aplicación → Configuración → Puerto del Servidor** mueve la interfaz web a otro puerto, y la dirección pasa a ser `http://<device-ip>:<port>/`. Si no recuerdas el puerto, léelo en el dispositivo:

```bash
grep SERVER_PORT /etc/systemd/system/uavcast-web.service
```

## Comprobación 5: Todas las páginas llevan a Aplicación

Es lo esperado hasta que haya una licencia activa en el dispositivo. Actívala en **Aplicación → Gestor de Licencias**. Si falla, consulta [La licencia no se activa](https://docs.uavmatrix.com/es/troubleshooting/license-activation-failed/).

## Comprobación 6: El instalador no terminó

Si `uavcast-web` no existe (`Unit uavcast-web.service could not be found`), la instalación se detuvo antes de tiempo. Consulta [La instalación falla](https://docs.uavmatrix.com/es/troubleshooting/installation-fails/).

## ¿Aún sin suerte?

Envía la salida de `systemctl status uavcast-web` y de `journalctl -u uavcast-web --since yesterday`, además de `/opt/uavcast-pro/installer.log`, a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Relacionado: [Instalar UAVcast-Pro](https://docs.uavmatrix.com/es/get-started/installation/) · [Ajustes de aplicación](https://docs.uavmatrix.com/es/uavcast-pro/application-settings/)

Source: https://docs.uavmatrix.com/es/troubleshooting/web-interface-wont-open/
