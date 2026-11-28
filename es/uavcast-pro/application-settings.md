# Configuración de la aplicación, registros y copias de seguridad

> Cambia el puerto web y el idioma de UAVcast-Pro, descarga los registros para soporte con el modo de depuración, y haz copias de seguridad, restaura o restablece la base de datos de configuración desde la página Aplicación.

La página **Aplicación** contiene todo lo relacionado con UAVcast-Pro: la licencia, las actualizaciones, los ajustes de la interfaz, la descarga de registros y la base de datos de configuración. Solo es visible para los administradores y es la única página que funciona antes de que el dispositivo tenga licencia. Abre **Gestión → Aplicación**.

![Página Aplicación con Gestor de Licencias y Actualizar Aplicación a la izquierda, y las tarjetas Configuración, Registro y Base de Datos a la derecha](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/application.webp)

*Gestión → Aplicación.*

| Tarjeta | Se explica en |
| --- | --- |
| **Gestor de Licencias** | [Licencia y activación](https://docs.uavmatrix.com/es/get-started/license-activation/) |
| **Actualizar Aplicación** | [Actualizar UAVcast-Pro](https://docs.uavmatrix.com/es/get-started/updating/) |
| **Configuración**, **Registro**, **Base de Datos** | Esta página |

## Configuración

| Ajuste | Predeterminado | Valores | Notas |
| --- | --- | --- | --- |
| **Tomar un Recorrido** |  |  | Reinicia el recorrido guiado por la interfaz. |
| **Tema Oscuro** | Activado | Activado, desactivado | Se guarda por navegador. También está en el selector de tema de la barra superior. |
| **Puerto del Servidor** | `80` | 1–65535 | Puerto de la interfaz web. Consulta más abajo. |
| **Idioma** | Idioma del navegador; si no, inglés | Inglés, Español, 简体中文, 繁體中文, Italiano, Nederlands, Polski, Português, Русский, Türkçe | También está en el menú de usuario, en la parte inferior de la barra lateral. |

### Cambiar el puerto de la interfaz web

1. Ingresa el nuevo puerto en **Puerto del Servidor**.
2. Selecciona **Enviar y reiniciar el servidor**. Un cuadro de diálogo muestra la **Nueva URL**, por ejemplo `http://192.168.1.50:8080`.
3. Espera unos segundos y abre la nueva URL.

Los marcadores y los enlaces a la dirección anterior dejan de funcionar. Un puerto cambiado muestra la advertencia *El puerto del servidor se ha cambiado del puerto predeterminado 80.* A partir de UAVcast-Pro 6.5.3, el puerto se conserva al actualizar; las versiones anteriores lo restablecen a 80.

## Registro

UAVcast-Pro registra cada servicio por separado. Descárgalos cuando algo falle y envíalos a soporte.

1. Activa **Modo de Depuración** para obtener más detalle. Reproduce el problema.
2. En **Selecciona los registros para descargar**, deja **Todos los Registros** o elige un servicio.
3. En **Selecciona el rango de tiempo**, elige un intervalo que cubra el problema (desde **Últimos 10 minutos** hasta **Todo el Tiempo**).
4. Selecciona **Descargar**. Obtendrás un archivo zip.
5. Envíalo por correo electrónico a [support@uavmatrix.com](mailto:support@uavmatrix.com) con una breve descripción de lo sucedido. Después, desactiva de nuevo el **Modo de Depuración**.

La descarga incluye una captura `diagnostics.txt` (configuración, puertos serie, eventos de energía y USB) que agiliza la atención de soporte.

| Registro | Incluye |
| --- | --- |
| **Mavlink Manager**, **Mavlink Publisher** | Enlace con el controlador de vuelo, enrutamiento hacia las estaciones de control en tierra |
| **Camera Server**, **Camera Detector** | Pipeline de video, detección de cámaras |
| **Modem Manager**, **Modem Detector** | Conexión del módem, intentos de APN |
| **VPN Manager** | ZeroTier y Tailscale |
| **NTRIP Client** | Correcciones RTK |
| **DNS Manager** | Actualizaciones del DNS dinámico |
| **License Manager** | Activación y comprobación de la licencia cada 4 horas |
| **Application Updater**, **Application Installer** | Actualizaciones e instalaciones |
| **Backend API Server** | La API interna |

**Purgar Todos los Registros** elimina todos los archivos de registro. No se puede deshacer; hazlo antes de reproducir un problema si quieres un registro limpio. En el dron, los registros están en `/opt/uavcast-pro/logs`.

Todas las páginas tienen además una consola de **Registros de Acción** que muestra el registro en vivo del servicio de cada página.

## Base de datos

Todos los ajustes (estaciones de control en tierra, controlador de vuelo, cámara, módem, VPN, NTRIP, usuarios, tableros, inyectores y datos de la licencia) se guardan en una única base de datos SQLite, `/opt/uavcast-pro/uavcast.db`.

| Acción | Qué hace |
| --- | --- |
| **Respaldar Base de Datos** | Descarga la base de datos como `uavcast_backup.db`. |
| **Restaurar Base de Datos** | Sube una copia de seguridad `.db` y reemplaza los ajustes actuales, incluidos los usuarios. |
| **Reiniciar Base de Datos** | Restablece a los valores predeterminados los ajustes de estaciones de control en tierra, controlador de vuelo, cámara, VPN y DNS dinámico. Se conservan los usuarios, la licencia, el módem, NTRIP, los ajustes de grabación, los tableros, los inyectores y el emparejamiento con Fleet Manager. No se puede deshacer. |

Usa las copias de seguridad para conservar una configuración que sabes que funciona antes de hacer cambios, o para configurar un segundo dron de la misma manera. Reinicia después de restaurar para que cada servicio arranque con los ajustes restaurados.

> **Restaurar en otro hardware**
>
> Los datos de la licencia en la base de datos están ligados al dispositivo de origen. Después de restaurar una copia de seguridad en otra Raspberry Pi o en otra tarjeta SD, activa la licencia en el nuevo dispositivo. La restauración también trae los usuarios y contraseñas de la copia de seguridad.

Source: https://docs.uavmatrix.com/es/uavcast-pro/application-settings/
