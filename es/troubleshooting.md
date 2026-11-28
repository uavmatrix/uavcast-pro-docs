# Solución de problemas

> Corrige la falta de video, la ausencia de heartbeat de MAVLink, los problemas de módem y VPN, los errores de licencia y el emparejamiento con Fleet Manager. Empieza por lo que ves y sigue las comprobaciones.

Empieza por el síntoma. Cada página siguiente enumera las causas probables en el orden en que suelen presentarse en campo, con comprobaciones numeradas que usan las etiquetas exactas de las interfaces de UAVcast-Pro y Fleet Manager.

> **Revisa primero el tablero**
>
> Abre **Tablero** en UAVcast-Pro. La tarjeta de estado resume el dron en una línea (**Todos los sistemas normales**, o el número de problemas y advertencias) y tiene una fila para **Flight controller**, **Ground station**, **Cellular**, **VPN**, **RTK corrections**, **Video** y **Power supply**. La primera fila en rojo suele ser el punto de partida.

![Tablero de UAVcast-Pro con la tarjeta de estado mostrando 2 problemas: GPS sin fijación y VPN no conectada](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/dashboard.webp)

*Tablero → tarjeta de estado. Las filas con problemas se muestran en rojo y se cuentan en la insignia de problemas; aquí, GPS (sin fijación) y VPN (no conectada).*

## Encuentra tu síntoma

| Lo que ves | Causa probable | Ir a |
| --- | --- | --- |
| La telemetría funciona, pero el área de video en QGroundControl o Mission Planner está negra | **Habilitar Video** está desactivado para esa estación de control en tierra, la IP es incorrecta o hay un firewall | [Sin video en la estación de control en tierra](https://docs.uavmatrix.com/es/troubleshooting/no-video-in-gcs/) |
| El video se congela, aparece con manchas grises o va con segundos de retraso | Tasa de bits demasiado alta para el enlace, o fotogramas clave demasiado separados | [Video entrecortado, con retraso o gris](https://docs.uavmatrix.com/es/troubleshooting/choppy-or-delayed-video/) |
| La página Flight Controller muestra **Sin heartbeat**, **Esperando dispositivo** o **Detectando tasa de baudios** | Cable, cableado, puerto o tasa de baudios | [Sin heartbeat de MAVLink](https://docs.uavmatrix.com/es/troubleshooting/no-mavlink-heartbeat/) |
| UAVcast-Pro muestra el controlador de vuelo como **Conectado**, y la GCS espera una conexión | La telemetría no se envía a la GCS, o la GCS no está escuchando | [Sin telemetría en la estación de control en tierra](https://docs.uavmatrix.com/es/troubleshooting/no-telemetry-in-gcs/) |
| **No hay cámaras disponibles** en **Seleccionar Cámara** | Falta la pila de cámaras CSI, cable plano o la cámara USB no se detecta | [Cámara no detectada](https://docs.uavmatrix.com/es/troubleshooting/camera-not-detected/) |
| **Clave de licencia no válida**, **Se alcanzó el máximo de activaciones** o **Error de activación de la licencia** | Clave incorrecta, sin espacios libres de dispositivos o sin internet | [La licencia no se activa](https://docs.uavmatrix.com/es/troubleshooting/license-activation-failed/) |
| El módem muestra señal y operador, pero nada carga | APN, prioridad de red o datos de la SIM | [Módem conectado, sin internet](https://docs.uavmatrix.com/es/troubleshooting/modem-no-internet/) |
| El navegador no puede llegar a `http://<device-ip>/` después de instalar | Dirección incorrecta, servicio no ejecutándose o puerto cambiado | [La interfaz web no abre](https://docs.uavmatrix.com/es/troubleshooting/web-interface-wont-open/) |
| El instalador se detiene con un error | SO de 32 bits, sin internet o poco espacio en disco | [La instalación falla](https://docs.uavmatrix.com/es/troubleshooting/installation-fails/) |
| ZeroTier o Tailscale dicen conectado, pero no puedes hacer ping ni abrir el dron | Miembro no autorizado, red incorrecta o la GCS no está en la VPN | [La VPN está conectada, pero no llega al dron](https://docs.uavmatrix.com/es/troubleshooting/vpn-cant-reach-drone/) |
| El estado de NTRIP no es **Transmitiendo correcciones**, o la solución nunca llega a **RTK Fijo** | Ajustes del caster, GGA, o un receptor que no puede hacer RTK | [Las correcciones RTK no llegan](https://docs.uavmatrix.com/es/troubleshooting/rtk-corrections-not-arriving/) |
| **Voltaje bajo: usa una fuente de alimentación más potente** o **Reducida la velocidad (calor o energía)** | Fuente o cable de alimentación débil, sobrecalentamiento | [Subtensión y limitación](https://docs.uavmatrix.com/es/troubleshooting/undervoltage-and-throttling/) |
| El dron aparece como **Offline** en Fleet Manager | El dron no tiene internet, el puerto MQTT está bloqueado o se requiere volver a emparejar | [El dron aparece como Offline en Fleet Manager](https://docs.uavmatrix.com/es/troubleshooting/drone-offline-fleet-manager/) |
| **Invalid pairing code**, **This pairing code has expired** o **License is not owned by any member of this organization** | Código escrito mal o demasiado antiguo, o licencia que pertenece a alguien fuera de la organización | [Código de emparejamiento no válido o vencido](https://docs.uavmatrix.com/es/troubleshooting/pairing-code-invalid/) |

## ¿Sigue atascado?

1. [Recopila los archivos de registro](https://docs.uavmatrix.com/es/troubleshooting/collect-logs/). La descarga incluye una instantánea `diagnostics.txt` de tus ajustes y hardware, así que soporte no tendrá que pedirlos.
2. Envíalos a **[support@uavmatrix.com](mailto:support@uavmatrix.com)** con tu versión de UAVcast-Pro, el hardware que usas y lo que ya probaste. También puedes preguntar en el [Discord de UAVmatrix](https://discord.gg/xwqMTXh).

Las respuestas breves a preguntas comunes están en las [Preguntas frecuentes](https://docs.uavmatrix.com/es/troubleshooting/faq/).

Source: https://docs.uavmatrix.com/es/troubleshooting/
