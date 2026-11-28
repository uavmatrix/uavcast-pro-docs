# Seguridad y privacidad

> Cómo Fleet Manager protege los drones con certificados TLS por dron, aísla las organizaciones en VPN WireGuard privadas, aplica los roles y almacena los datos.

Esta página es para las personas que deben aprobar Fleet Manager: responsables de seguridad, y gerentes de TI y de operaciones.

## Conexión del dron

- **Certificados de cliente por dron.** Al emparejar, Fleet Manager emite a cada dron su propio certificado de cliente TLS. El dron lo usa para conectarse al broker MQTT de Fleet Manager por el puerto **8883**, el único listener público del broker. No hay contraseña compartida.
- **Cada dron solo puede usar sus propios topics.** La identidad del certificado es el ID de dispositivo del dron, y el broker solo permite que un dron publique y se suscriba bajo sus propios topics. Un dron comprometido no puede leer ni controlar a otro.
- **Solo salida.** Los drones se conectan hacia afuera, hacia Fleet Manager. No abres puertos de entrada en el dron ni en su red.
- **Ventana de emparejamiento corta.** Los códigos de emparejamiento son 8 dígitos aleatorios, válidos durante 5 minutos y de un solo uso. Las verificaciones de código tienen límite de frecuencia (10 verificaciones y 5 intentos de emparejamiento por usuario por minuto). El certificado y la clave VPN del dron solo se entregan hasta que el dron se conecta por primera vez, y nunca más tarde de 15 minutos después de que venza el código.
- **Actualizaciones de certificados.** Cuando Fleet Manager endurece el esquema de certificados, los drones más antiguos se marcan como **Re-pair required** en lugar de confiar en ellos en silencio.

## VPN privada por organización

- Cada organización tiene su propia red en el servidor VPN de Fleet Manager (`vpn-connect.uavmatrix.com`), un servidor de control autoalojado compatible con Tailscale. El tráfico entre dispositivos está cifrado de extremo a extremo con WireGuard. Los dispositivos de una organización no pueden ver los dispositivos de otra: el servidor VPN aplica una regla de acceso separada para cada organización. Si Fleet Manager no puede confirmar ese aislamiento, oculta la clave de autenticación (*VPN isolation could not be verified, so the auth key is hidden.*) en lugar de entregar una clave.
- Unirse requiere una clave de autenticación que solo pueden crear los Owner y Admin. Las claves vencen a los 90 días. Los drones reciben la clave automáticamente durante el emparejamiento o con **Push to Drone**, y solo con el consentimiento de un Owner o Admin.
- Quitar un dispositivo en **Network** lo elimina del servidor VPN.

## Control de acceso

- El inicio de sesión se hace con tu cuenta de UAVmatrix. Fleet Manager no almacena contraseñas.
- Tres roles por organización (Owner, Admin, Viewer), aplicados en el servidor para cada acción. Consulta [Roles y permisos](https://docs.uavmatrix.com/es/fleet-manager/team/roles-and-permissions/).
- La terminal SSH y el acceso remoto a UAVcast-Pro están limitados a los Owner y Admin.
- Los enlaces de invitación están cifrados, se pueden usar una sola vez y vencen a los 7 días.
- UAVmatrix puede suspender cuentas u organizaciones que incumplan los términos. Los usuarios suspendidos ven **Account Suspended** u **Organization Suspended** con el motivo y un contacto de soporte.

## Datos que almacena Fleet Manager

| Dato | Se conserva |
| --- | --- |
| Telemetría (posición, altitud, velocidad, rumbo, batería, modo, estado de armado, GPS, estado de los servicios), una vez por segundo | Según la configuración de retención de la organización: de 7 días a 1 año (predeterminado: 1 año). Se comprime después de 7 días. Se elimina cuando se quita el dron. |
| Nombres y rangos de tiempo de vuelos guardados | Hasta que se eliminen, o hasta que se quite el dron |
| Comandos enviados a los drones, con quién los envió | Hasta que se quite el dron |
| Registro de actividad (quién emparejó, quitó, invitó o cambió roles) | Se conserva cuando se quitan drones o miembros |
| Misiones | Hasta que se eliminen, o hasta que se elimine la organización |
| Tickets de soporte y sus capturas de pantalla | Se conservan para soporte |

Fleet Manager no almacena video. El video y el MAVLink hacia las estaciones de control viajan por la VPN entre tus dispositivos, y Fleet Manager no los graba.

La terminal y el proxy remoto de UAVcast-Pro pasan por la conexión cifrada de Fleet Manager hacia el dron; su contenido no se almacena.

El tráfico VPN va directamente entre tus dispositivos cuando las redes lo permiten. Cuando no lo permiten (por ejemplo, detrás de un NAT estricto o de una operadora móvil), recurre a los servidores de relevo públicos de Tailscale (DERP). El tráfico sigue cifrado de extremo a extremo con WireGuard en ambos casos; UAVmatrix no opera ningún relevo.

## Terceros

- **Mapas:** las teselas de mapa provienen de Esri; la capa de espacio aéreo, de OpenAIP a través de Fleet Manager.
- **FleetBot:** los mensajes del chat se envían a Anthropic para generar las respuestas. No se envía nada más de tu organización. Consulta [Soporte y FleetBot](https://docs.uavmatrix.com/es/fleet-manager/support/#ask-fleetbot).
- **Analíticas de producto y reportes de errores:** Fleet Manager usa PostHog para analíticas de uso, como qué páginas se abren y qué botones se usan, y para reportar errores de la aplicación.

Source: https://docs.uavmatrix.com/es/fleet-manager/security/
