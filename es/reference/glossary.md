# Glosario

> Explicaciones sencillas de los términos de la documentación de UAVcast-Pro y Fleet Manager: MAVLink, GCS, latido, APN, HiLink, NTRIP, RTCM, VRS, ZeroTier, Tailscale.

### AGL / AMSL

Altitud sobre el nivel del suelo (aquí: sobre el punto de despegue) y sobre el nivel medio del mar. UAVcast-Pro usa estos términos desde la v6.5.0, en reemplazo de REL y MSL.

### APN (Nombre del Punto de Acceso)

El nombre de la puerta de enlace de la operadora a través de la cual se conecta un módem celular. UAVcast-Pro lo detecta automáticamente cuando **Nombre del Punto de Acceso (Opcional)** está vacío.

### ArduPilot

Firmware de piloto automático de código abierto para multicópteros, aviones, VTOL, rovers y embarcaciones. UAVcast-Pro funciona con ArduPilot y con cualquier otro controlador de vuelo MAVLink, como PX4. Sus botones de modo de vuelo usan los nombres de modo de ArduPilot.

### Clave de Autenticación (auth key)

Una clave de Tailscale que inicia sesión de un dispositivo en una tailnet sin necesidad de navegador. Fleet Manager usa claves de autenticación para conectar las estaciones de control en tierra a la VPN de la organización.

### Tasa de bits

Cuántos bits por segundo produce el codificador de video. Tiene que caber dentro de la subida de tu conexión, con margen.

### Cámara CSI

Una cámara conectada al conector de cinta de la Raspberry Pi, como la Camera Module 3.

### Destino

En UAVcast-Pro, una entrada de estación de control en tierra en **Control en Tierra**: una dirección IP con un puerto de telemetría y un puerto de video.

### Dual stream

Transmitir dos cámaras a la estación de control al mismo tiempo, en dos puertos de video.

### Fleet Manager

El panel web de UAVmatrix para monitorear y controlar muchos drones UAVcast-Pro dentro de una organización.

### GCS (estación de control en tierra)

El software, y la computadora en la que se ejecuta, que usas para monitorear y dar órdenes al dron: QGroundControl, Mission Planner, MAVProxy.

### Failsafe GCS

Un ajuste del controlador de vuelo que hace que el dron actúe por su cuenta (regresar, aterrizar o quedarse en loiter) cuando deja de recibir la señal de la estación de control en tierra.

### GGA

Una sentencia NMEA con tu posición. Los casters VRS y los casters NTRIP de punto más cercano la necesitan para calcular correcciones para tu ubicación.

### H.264

El formato de compresión de video que envía UAVcast-Pro. Todas las estaciones de control comunes pueden decodificarlo.

### Latido (heartbeat)

El mensaje MAVLink que un controlador de vuelo envía aproximadamente una vez por segundo para indicar «aquí estoy». *Sin latido* significa que el enlace no transporta MAVLink legible.

### Módem HiLink

Un módem USB con router integrado que se conecta por sí mismo y aparece en Linux como un adaptador de red.

### Inyector

Un listener de UAVcast-Pro (HTTP, UDP o serie) que convierte tus propios valores de sensores en mensajes MAVLink `NAMED_VALUE_FLOAT`.

### Keyframe

Un cuadro de video completo desde el que el decodificador puede empezar. Los keyframes más frecuentes permiten recuperarse más rápido de la pérdida de paquetes. Se configura con **Tasa de Recuperación del Stream**.

### MAVLink

El protocolo de mensajes entre controladores de vuelo y estaciones de control en tierra.

### Punto de montaje

Un flujo de correcciones con nombre en un caster NTRIP, normalmente vinculado a una estación base o a un servicio VRS.

### MQTT

El protocolo de mensajería que usan los drones para comunicarse con Fleet Manager, cifrado con TLS en el puerto 8883.

### NTRIP / caster NTRIP

Un protocolo, y el servidor que lo implementa, para transmitir correcciones GNSS por internet.

### Código de emparejamiento (Pairing Code)

El código de 8 dígitos que UAVcast-Pro muestra cuando conectas un dron a Fleet Manager. Es válido durante 5 minutos, una sola vez.

### Solo lectura (destino)

Un destino de estación de control en tierra que recibe telemetría, pero no puede cambiar nada en el vehículo: las órdenes, los cambios de modo y las escrituras de parámetros y misiones desde ese destino están bloqueados. Esto se aplica a partir de UAVcast-Pro 6.5.3; en versiones anteriores, Read Only no bloquea la escritura de parámetros.

### Solo lectura (usuario)

Un rol de usuario de UAVcast-Pro que puede ver las páginas, pero no puede cambiar ajustes ni controlar el dron.

### RTCM3

El formato de mensajes estándar para correcciones GNSS.

### RTK, RTK Float, RTK Fixed

Posicionamiento cinemático en tiempo real con correcciones. Float es una solución aproximada; Fixed es la solución de precisión centimétrica.

### RTP / UDP

El transporte que usa UAVcast-Pro para el video y la telemetría: rápido y sin retransmisiones, lo que mantiene baja la latencia.

### SERIALx_PROTOCOL / SERIALx_BAUD

Parámetros de ArduPilot que definen qué habla un puerto serie (2 = MAVLink2) y a qué velocidad.

### Vinculación de stream

En Fleet Manager, un enlace que envía el video y la telemetría de un dron a una estación de control en tierra, en puertos propios.

### sysid / compid

ID de sistema MAVLink (qué vehículo) e ID de componente (qué parte de él). El controlador de vuelo suele ser sysid 1, compid 1.

### Tailnet

Una red privada de Tailscale.

### Tailscale

Una VPN basada en WireGuard. UAVcast-Pro puede unirse a tu tailnet o a la red de la organización de Fleet Manager.

### UAVnet

El controlador de red ZeroTier alojado por UAVmatrix en uavnet.uavmatrix.com. Se está descontinuando a favor de la VPN de Fleet Manager; los usuarios existentes deben migrar a Fleet Manager.

### VRS (estación de referencia virtual)

Un servicio de correcciones que calcula las correcciones para tu posición a partir de una red de estaciones base. Necesita GGA en sentido ascendente (upstream).

### ZeroTier

Una VPN peer-to-peer. UAVcast-Pro puede unirse a tu propia red ZeroTier.

Source: https://docs.uavmatrix.com/es/reference/glossary/
