# Solución de problemas de Fleet Manager

> Soluciona problemas comunes de Fleet Manager: errores de emparejamiento, drones atascados en PAIRING o sin conexión, Re-pair required, streams faltantes y comandos fallidos.

Empieza por lo que ves. Cada fila enlaza a la solución, ya sea más abajo o en las páginas compartidas de [solución de problemas](https://docs.uavmatrix.com/es/troubleshooting/).

| Lo que ves | Causa probable | Ir a |
| --- | --- | --- |
| **Invalid pairing code**, **This pairing code has expired**, **This pairing code has already been used** | Error de escritura, código de más de 5 minutos, o código ya reclamado | [Código de emparejamiento inválido o vencido](https://docs.uavmatrix.com/es/troubleshooting/pairing-code-invalid/) |
| **License is not owned by any member of this organization** | Licencia comprada con un correo que no es miembro | [Licencias compradas con otro correo](https://docs.uavmatrix.com/es/fleet-manager/licenses/#licenses-bought-with-another-email) |
| **This UAV is already paired to an organization** | El dron todavía pertenece a otra organización | [Mover un dron](https://docs.uavmatrix.com/es/fleet-manager/fleet/remove-or-transfer/#move-a-drone-to-another-organization) |
| UAVcast-Pro muestra **No valid license found** o **Invalid or inactive license** | Licencia no activada en el dron, vencida o reembolsada | [La licencia no se activa](https://docs.uavmatrix.com/es/troubleshooting/license-activation-failed/) |
| No aparece el botón **Pair Device** | Eres Viewer | [Roles y permisos](https://docs.uavmatrix.com/es/fleet-manager/team/roles-and-permissions/) |
| Dron atascado en **PAIRING** | El dron todavía no se conectó al broker | [Atascado en PAIRING](https://docs.uavmatrix.com/es/fleet-manager/troubleshooting/#stuck-on-pairing) |
| Dron **OFFLINE** | Sin internet, puerto 8883 bloqueado, o UAVcast-Pro no está en ejecución | [Dron sin conexión en Fleet Manager](https://docs.uavmatrix.com/es/troubleshooting/drone-offline-fleet-manager/) |
| **Re-pair required** | Certificado de conexión antiguo | [Volver a emparejar un dron](https://docs.uavmatrix.com/es/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone) |
| **NO MAVLINK** en el mapa | UAVcast-Pro no tiene datos del controlador de vuelo | [Sin latido MAVLink](https://docs.uavmatrix.com/es/troubleshooting/no-mavlink-heartbeat/) |
| Falla el enlace: **Failed to send configuration to drone - it may be offline** | Dron sin conexión o no confirmó en 15 s | [La vinculación no se guarda](https://docs.uavmatrix.com/es/fleet-manager/troubleshooting/#binding-wont-save) |
| La vinculación existe, pero no hay telemetría ni video en la estación de control | Firewall, puerto incorrecto o stream desactivado | [Sin stream en la estación de control](https://docs.uavmatrix.com/es/fleet-manager/troubleshooting/#no-stream-at-the-ground-station) |
| La estación de control se unió a la VPN pero no llega al dron | Tipo de dispositivo, dron fuera de la VPN, o UDP bloqueado | [VPN conectada pero sin acceso al dron](https://docs.uavmatrix.com/es/troubleshooting/vpn-cant-reach-drone/) |
| Los comandos no funcionan, **UAVcast Upgrade Required** | Dron sin conexión, rol Viewer o UAVcast-Pro antiguo | [Los comandos fallan](https://docs.uavmatrix.com/es/fleet-manager/troubleshooting/#commands-fail) |
| **Request timed out. UAVcast may be unreachable.** al abrir UAVcast-Pro de forma remota | Enlace lento a través del proxy | [El proxy es lento o incompleto](https://docs.uavmatrix.com/es/fleet-manager/troubleshooting/#proxy-is-slow-or-incomplete) |
| El correo de invitación nunca llegó | Filtro de spam o dirección incorrecta | [Invitación no recibida](https://docs.uavmatrix.com/es/fleet-manager/troubleshooting/#invitation-not-received) |

## Atascado en PAIRING

**PAIRING** significa que Fleet Manager aceptó el código y espera el primer latido del dron por MQTT.

1. Revisa la página **Fleet Management** de UAVcast-Pro. Si todavía dice **Waiting for Manager to confirm pairing...**, el dron no obtuvo su certificado. Verifica que tenga internet.

2. Verifica el TCP 8883 saliente desde el dron:

   ```bash
   nc -vz fleet-manager.uavmatrix.com 8883
   ```

3. Si ingresaste un código **anterior** del mismo dron (por ejemplo, después de seleccionar **Connect to Fleet Manager** dos veces), UAVcast-Pro no lo está esperando. Selecciona **Disconnect from Fleet** si aparece, obtén un código nuevo y vuelve a emparejar en la misma organización. El dron conserva su registro.

El dron tiene 15 minutos después del vencimiento del código para obtener su certificado. Después de eso, vuelve a emparejar.

## La vinculación no se guarda

Fleet Manager solo guarda una vinculación después de que el dron la confirme. Verifica que el dron muestre **ONLINE** y vuelve a intentarlo. Si el dron está en línea pero las vinculaciones siguen fallando, puede que el dron no esté en la VPN: revisa **Network → Connected Devices** para ver si aparece con el tipo **UAV**, o usa **Push to Drone**.

## Sin stream en la estación de control

1. En **Network → Stream Bindings**, verifica que **Video** y **Telemetry** estén activados y anota los **Ports**.
2. Verifica que el software de la estación de control escuche exactamente en esos puertos. Solo el primer dron en una laptop usa 5600 / 14550; cada dron adicional tiene sus propios puertos.
3. Permite UDP entrante en esos puertos en el firewall de la laptop. En Windows, permite QGroundControl o Mission Planner en las redes **Private** y **Public**.
4. Ejecuta `tailscale status` en la laptop y verifica que el dron aparezca en la lista.

Más detalle: [Sin telemetría en la estación de control](https://docs.uavmatrix.com/es/troubleshooting/no-telemetry-in-gcs/) y [Sin video en la estación de control](https://docs.uavmatrix.com/es/troubleshooting/no-video-in-gcs/).

## Los comandos fallan

- El dron debe estar **ONLINE**.
- Solo los Owner y Admin pueden enviar comandos. Los Viewers no reciben los botones de comando, y el servidor rechaza los comandos que envíen.
- Armar, desarmar y la calibración previa al vuelo requieren UAVcast-Pro 6.3.0_rc13 o posterior. [Actualiza UAVcast-Pro](https://docs.uavmatrix.com/es/get-started/updating/).
- El controlador de vuelo puede rechazar un comando, por ejemplo al armar con verificaciones previas al armado fallidas. Lee su mensaje en el popup del mapa o en la pestaña **Logs**.

## El proxy es lento o incompleto

**Open via Proxy** envía cada solicitud de página por el enlace del dron, con 30 segundos por solicitud, y no transporta las funciones en vivo (WebSocket). En un enlace celular débil, espera a que la página termine de cargar, o únete a la VPN y usa **Open via VPN**. Consulta [Abrir UAVcast-Pro de forma remota](https://docs.uavmatrix.com/es/fleet-manager/fleet/remote-uavcast/).

## Invitación no recibida

Pide a la persona que revise la carpeta de spam. En **Team**, revisa el correo bajo **Pending Invitations**. Si es incorrecto, **Revoke** la invitación y vuelve a invitar. Las invitaciones vencen a los 7 días.

## Sigues atascado

Abre un ticket desde el botón de soporte con una captura de pantalla, o escribe a [support@uavmatrix.com](mailto:support@uavmatrix.com). Incluye el nombre del dron y su ID de dispositivo (en su página UAV). Envía el paquete de registros de UAVcast-Pro (un ZIP) a [support@uavmatrix.com](mailto:support@uavmatrix.com) con tu número de ticket, ya que los tickets solo admiten una imagen. Consulta [Soporte](https://docs.uavmatrix.com/es/fleet-manager/support/) y [Recopilar registros](https://docs.uavmatrix.com/es/troubleshooting/collect-logs/).

Source: https://docs.uavmatrix.com/es/fleet-manager/troubleshooting/
