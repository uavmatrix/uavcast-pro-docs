# Roles y permisos

> La matriz de permisos exacta para los roles Owner, Admin y Viewer de Fleet Manager: emparejamiento, comandos de vuelo, terminal, misiones, VPN y equipo.

Fleet Manager tiene tres roles, configurados por organización. Una persona puede ser Admin en una organización y Viewer en otra.

| Rol | En resumen |
| --- | --- |
| **Owner** | Todo lo que puede hacer un Admin, más eliminar la organización y transferir la propiedad. Hay exactamente uno por organización: la persona que la creó, o aquella a quien se le transfirió la propiedad. |
| **Admin** | Administra la flota: empareja y quita drones, envía comandos, abre la terminal, planifica y sube misiones, administra la VPN y las vinculaciones de stream, y administra el equipo. |
| **Viewer** | Solo lectura. Ve el panel, la flota, el mapa en vivo, el historial de vuelos, las misiones, la red y el equipo, pero no puede cambiar nada ni dar órdenes. |

Los nuevos miembros se invitan como Admin o Viewer. El rol de Owner solo cambia de manos mediante [Transfer Ownership](https://docs.uavmatrix.com/es/fleet-manager/team/#transfer-ownership).

## Matriz de permisos

La matriz proviene de las reglas de permisos que Fleet Manager aplica en el servidor, así que un botón oculto nunca es lo único que se interpone.

| Acción | Owner | Admin | Viewer |
| --- | --- | --- | --- |
| **Flota y drones** |  |  |  |
| Ver el panel, la lista de la flota, las páginas de UAV y el mapa en vivo | ✓ | ✓ | ✓ |
| Reproducir el historial de vuelos | ✓ | ✓ | ✓ |
| Guardar, renombrar y eliminar vuelos con nombre | ✓ | ✓ | – |
| Emparejar un dron (**Pair Device**) | ✓ | ✓ | – |
| Renombrar un dron o cambiar su color en el mapa | ✓ | ✓ | – |
| Quitar un dron | ✓ | ✓ | – |
| **Comandos** |  |  |  |
| Cambiar el modo de vuelo, RTL, Loiter, Circle | ✓ | ✓ | – |
| Armar, desarmar, armado forzado | ✓ | ✓ | – |
| Calibración previa al vuelo | ✓ | ✓ | – |
| Iniciar, detener y leer misiones en un dron | ✓ | ✓ | – |
| Reiniciar o apagar la computadora de a bordo | ✓ | ✓ | – |
| **Terminal** SSH en la página de UAV | ✓ | ✓ | – |
| **Open via Proxy** (interfaz web de UAVcast-Pro a través de Fleet Manager) | ✓ | ✓ | – |
| **Misiones** |  |  |  |
| Ver misiones guardadas | ✓ | ✓ | ✓ |
| Crear, editar y eliminar misiones | ✓ | ✓ | – |
| **Upload to Drone** | ✓ | ✓ | – |
| **Red y VPN** |  |  |  |
| Ver la página Network, los dispositivos y las vinculaciones de stream | ✓ | ✓ | ✓ |
| Ver la clave de autenticación VPN y el **GCS Connection Command** | ✓ | ✓ | – |
| Habilitar la VPN, generar claves de autenticación, **Push to Drone** | ✓ | ✓ | – |
| Renombrar, cambiar el tipo de, o quitar dispositivos VPN | ✓ | ✓ | – |
| Agregar, pausar o quitar vinculaciones de stream | ✓ | ✓ | – |
| Eliminar la red VPN | ✓ | ✓ | – |
| **Equipo** |  |  |  |
| Ver miembros y roles | ✓ | ✓ | ✓ |
| Invitar miembros (como Admin o Viewer) | ✓ | ✓ | – |
| Cambiar el rol de un miembro (excepto el del Owner) | ✓ | ✓ | – |
| Quitar miembros (excepto al Owner) y revocar invitaciones | ✓ | ✓ | – |
| Transferir la propiedad | ✓ | – | – |
| **Organización y configuración** |  |  |  |
| Renombrar la organización, editar su descripción | ✓ | ✓ | – |
| Cambiar la retención de telemetría, depurar o eliminar el historial | ✓ | ✓ | – |
| Eliminar la organización | ✓ | – | – |
| **Todos** |  |  |  |
| Usar FleetBot, crear y cerrar tus propios tickets de soporte | ✓ | ✓ | ✓ |
| Editar tu propio perfil (en la cuenta de UAVmatrix) | ✓ | ✓ | ✓ |

> **Los Admin pueden administrar a otros Admin**
>
> Un Admin puede invitar a nuevos Admin, degradar a otro Admin a Viewer y quitar a otros Admin. Asigna el rol de Admin solo a personas en las que confiarías para toda la flota. El Owner es el único miembro que un Admin no puede cambiar.

> **Lo que ven los Viewers**
>
> Los Viewers obtienen las mismas páginas, sin los controles. El panel de control del UAV le muestra al Viewer el estado en vivo y los registros, pero no los botones de modo de vuelo, misión o armado, ni la pestaña **Terminal**. En **Network**, los Viewers no ven la clave de autenticación VPN: *Only Owners and Admins can see the VPN auth key.* Fleet Manager también verifica cada comando en el servidor, así que un Viewer no puede enviar ninguno por otro medio.

## Elegir roles para una flota empresarial

| Persona | Rol sugerido |
| --- | --- |
| Gerente de flota u operaciones | Owner (una sola persona) |
| Pilotos, técnicos, la persona que empareja nuevos fuselajes | Admin |
| Clientes que siguen su trabajo en vivo, gerencia, auditores | Viewer |
| Contratistas que necesitan volar tus drones | Admin, quitado cuando termina el trabajo |

## No es un rol: super admin

El personal de UAVmatrix tiene un rol de soporte aparte en todas las organizaciones. Se usa para tareas de soporte, como [agregar correos adicionales de licencia](https://docs.uavmatrix.com/es/fleet-manager/licenses/#licenses-bought-with-another-email) a una cuenta. No forma parte de tu organización y no se puede asignar.

Source: https://docs.uavmatrix.com/es/fleet-manager/team/roles-and-permissions/
