# Preguntas frecuentes de Fleet Manager

> Respuestas a preguntas comunes sobre Fleet Manager: límites de drones, licencias, VPN, estaciones de control en tierra, ArduPilot y PX4, retención de datos y traslado de drones.

### ¿Qué necesito para usar Fleet Manager?

Una cuenta de UAVmatrix y drones con UAVcast-Pro y una licencia activada. La licencia de cada dron debe pertenecer a un miembro de tu organización. Consulta [Licencias y cupos](https://docs.uavmatrix.com/es/fleet-manager/licenses/).

### ¿Fleet Manager tiene un costo adicional?

No. Fleet Manager está incluido con tu licencia de UAVcast-Pro. No hay una suscripción aparte, y los miembros del equipo no tienen costo.

### ¿Cuántos drones puedo gestionar?

Fleet Manager en sí no establece ningún límite. Cada dron necesita su propia activación de licencia de UAVcast-Pro, así que el número de drones depende de las licencias y los espacios para dispositivos que tengas.

### ¿Los miembros del equipo necesitan licencia?

No. Invita a todos los Admins y Viewers que necesites. Consulta [Invita a tu equipo](https://docs.uavmatrix.com/es/fleet-manager/team/).

### ¿Qué roles existen?

**Owner**, **Admin** y **Viewer**. No existe un rol "Member". Consulta [Roles y permisos](https://docs.uavmatrix.com/es/fleet-manager/team/roles-and-permissions/).

### ¿De dónde sale el código de emparejamiento?

Del dron. En UAVcast-Pro, abre **Fleet Management → Connect to Fleet Manager**. Muestra un código de 8 dígitos válido durante 5 minutos. Lo escribes en Fleet Manager en **Fleet → Pair Device**. Consulta [Añade tu primer dron](https://docs.uavmatrix.com/es/fleet-manager/pair-uav/).

### ¿Fleet Manager funciona con 4G/LTE?

Sí. El dron se conecta hacia afuera con Fleet Manager por el puerto TCP 8883, así que funciona detrás de NAT de operadora sin una IP pública. La operadora no debe bloquear el puerto 8883.

### ¿Necesito la VPN?

Solo para enviar video y telemetría desde los drones a las estaciones de control en tierra a través de Fleet Manager. El mapa, la telemetría, los comandos, las misiones, la terminal y el acceso remoto a UAVcast-Pro funcionan sin ella. Consulta [Red y VPN](https://docs.uavmatrix.com/es/fleet-manager/network/).

### ¿Una estación de control en tierra puede recibir varios drones?

Sí. Cada [vinculación de stream](https://docs.uavmatrix.com/es/fleet-manager/network/stream-bindings/) tiene su propio bloque de puertos en esa estación de control en tierra, con espacio para una segunda cámara y audio. El primer dron usa 5600 / 14550.

### ¿Puedo seguir usando mi propia red de ZeroTier o Tailscale?

Sí, si no necesitas las vinculaciones de stream de Fleet Manager. Puedes rechazar la VPN al emparejar. Si la aceptas, un dron que ya esté en una red de Tailscale se mueve a la red de tu organización. Un dron en ZeroTier conserva su red de ZeroTier y se une a la red de la organización junto a ella; ZeroTier solo se abandona al desemparejar el dron.

### ¿Funciona con ArduPilot y PX4?

Fleet Manager funciona con cualquier controlador de vuelo MAVLink con el que hable UAVcast-Pro, ya sea ArduPilot o PX4: el mapa en vivo, la telemetría, el estado, la terminal y las vinculaciones de stream son los mismos. Los controles de modo de vuelo usan los modos de ArduPilot para Copter, Plane, Rover y Sub, y la lista de comandos de misión sigue la nomenclatura de ArduPilot. Por eso, en PX4 cambia los modos y planifica las misiones desde tu estación de control en tierra.

### ¿Puedo volar un dron solo desde Fleet Manager?

Fleet Manager puede cambiar modos, armar y iniciar, pausar y detener misiones. No está diseñado para el control manual con palancas. Mantén siempre a un piloto con una estación de control en tierra o un transmisor RC en control, y respeta la normativa local.

### ¿Cuánto tiempo se conserva el historial de vuelos?

Hasta 1 año de forma predeterminada. Los Owners y Admins pueden reducirlo a 7, 14, 30, 60 o 90 días, o a 6 meses. Consulta [Historial de vuelos](https://docs.uavmatrix.com/es/fleet-manager/map/flight-history/#how-long-history-is-kept).

### ¿Puedo exportar los registros de vuelo?

Por ahora, no. Fleet Manager reproduce los vuelos en el mapa, pero no exporta archivos ni guarda `.tlog`, DataFlash o video.

### ¿Fleet Manager envía alertas por correo electrónico?

Todavía no. El estado se muestra en vivo en el mapa, en la lista de Fleet y en las páginas de los drones. Consulta [Indicadores de estado y notificaciones](https://docs.uavmatrix.com/es/fleet-manager/alerts-and-status/).

### ¿Qué pasa cuando un dron pierde la conexión?

Después de 20 segundos sin datos, se muestra como **OFFLINE**, y vuelve a conectarse por sí solo cuando regresa su enlace. Los failsafes propios del controlador de vuelo deciden qué hace la aeronave; Fleet Manager no envía comandos al perder la conexión.

### ¿Cómo muevo un dron a otra organización?

Elimínalo de la organización actual (esto borra su historial allí) y luego emparéjalo con la nueva. Consulta [Volver a emparejar, eliminar o transferir un dron](https://docs.uavmatrix.com/es/fleet-manager/fleet/remove-or-transfer/).

### Compré licencias con otro correo electrónico. ¿Y ahora qué?

Invita ese correo a la organización o pide a soporte que lo añada como correo de licencia adicional en tu cuenta. Consulta [Licencias compradas con otro correo electrónico](https://docs.uavmatrix.com/es/fleet-manager/licenses/#licenses-bought-with-another-email).

### ¿Hay una aplicación móvil?

Hay una [vista Lite](https://docs.uavmatrix.com/es/fleet-manager/lite-view/) adaptada al teléfono en el navegador.

### ¿Mis datos están seguros?

Cada dron tiene su propio certificado de cliente TLS, cada organización tiene su propia VPN cifrada y los roles se aplican en el servidor. Consulta [Seguridad y privacidad](https://docs.uavmatrix.com/es/fleet-manager/security/).

Source: https://docs.uavmatrix.com/es/fleet-manager/faq/
