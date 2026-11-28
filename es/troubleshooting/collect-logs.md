# Recopilar registros para soporte

> Descarga el archivo de registros de UAVcast-Pro con diagnostics.txt desde Aplicación, Registro o por SSH, y envíalo al soporte de UAVmatrix con los datos adecuados.

Una sola descarga de registros responde a la mayoría de las preguntas que, de otro modo, haría el soporte. Cada archivo incluye los registros de servicio que elijas, más una instantánea `diagnostics.txt`: versión, SO y placa, ajustes, la configuración generada del enrutador de telemetría, los dispositivos serie y quién los está usando, y los eventos de energía y USB del kernel. Nunca se incluyen contraseñas, claves ni tokens.

## Descargar desde la interfaz web

1. Ve a **Aplicación** y desplázate hasta **Registro**.
2. En la primera lista, deja **Todos los Registros**, o elige el servicio que corresponda al problema (consulta la tabla).
3. En la segunda lista, elige un rango de tiempo que cubra el problema. El valor predeterminado es **Últimas 2 horas**.
4. Pulsa **Descargar**. Tu navegador guardará un archivo `.zip`.

![Tarjeta Registro de la página Aplicación, con la lista de registros en Todos los Registros, el rango de tiempo en Últimas 2 horas y el botón Descargar](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/application--logging.webp)

*Aplicación → Registro con Todos los Registros y Últimas 2 horas seleccionados.*

| Problema | Elige en la lista de registros |
| --- | --- |
| Enlace con el controlador de vuelo, sin heartbeat, sin telemetría | **Gestor de Mavlink** |
| Cámara, video, vista previa | **Servidor de Cámara** |
| Módem, celular | **Gestor de Módem** |
| ZeroTier, Tailscale | **Gestor de VPN** |
| RTK, NTRIP | **Cliente NTRIP** |
| Licencia | **Gestor de Licencias** |
| DNS dinámico | **Gestor de DNS** |
| Instalación | **Instalador de la Aplicación** |
| No estás seguro | **Todos los Registros** |

Solo los administradores pueden descargar registros. **Purgar Todos los Registros** elimina todos los archivos de registro y no se puede deshacer, así que descarga primero.

## Desde la línea de comandos

Si la interfaz web no abre, recopila los registros por SSH:

```bash
sudo tar czf ~/uavcast-logs.tar.gz /opt/uavcast-pro/logs /opt/uavcast-pro/installer.log
journalctl -u uavcast-web -u uavcast-factory -u mavlink-manager -u uavcast-camera --since "2 hours ago" > ~/uavcast-journal.txt
```

Copia ambos archivos a tu computadora, por ejemplo con `scp`.

## Envíalos a soporte

Envía un correo a **[support@uavmatrix.com](mailto:support@uavmatrix.com)** e incluye:

- el archivo de registros,
- tu versión de UAVcast-Pro (se muestra en la parte inferior de la barra lateral),
- la placa, el SO, el controlador de vuelo, la cámara y el módem que usas,
- lo que esperabas, lo que ocurrió y lo que ya probaste desde estas páginas.

También puedes preguntar en el [Discord de UAVmatrix](https://discord.gg/xwqMTXh). No publiques archivos de registro en público: contienen direcciones IP y nombres de dispositivos.

Relacionado: [Ajustes de la aplicación](https://docs.uavmatrix.com/es/uavcast-pro/application-settings/)

Source: https://docs.uavmatrix.com/es/troubleshooting/collect-logs/
