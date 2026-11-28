# Referencia de ajustes

> Todos los ajustes de UAVcast-Pro en una sola página, con su etiqueta exacta, valor predeterminado y rango: controlador de vuelo, NTRIP, estaciones de control en tierra, cámara, grabación, módem y VPN.

Todos los ajustes de la interfaz web de UAVcast-Pro, agrupados por página, con la etiqueta exactamente como la muestra la aplicación y el valor predeterminado en una instalación nueva. Las páginas que cambian ajustes en vivo los aplican de inmediato, salvo que se indique lo contrario. Las páginas de funciones explican cada área en detalle; esta página sirve para consultar datos.

## Controlador de Vuelo → Conexión

| Ajuste | Predeterminado | Valores y notas |
| --- | --- | --- |
| **Enlace habilitado** | Activado | Activa o desactiva el enlace con el controlador de vuelo. |
| **Tipo de enlace** | **USB** | **USB** (el puerto USB propio del controlador de vuelo) o **UART / Serie** (puerto TELEM en los pines GPIO o en un cable USB-serie). |
| **Puerto** | **Automático** | Automático encuentra el controlador de vuelo y lo sigue si cambia el número de dispositivo. **Ruta personalizada…** acepta un dispositivo como `/dev/ttyAMA0`. |
| **Tasa de baudios** | **Automática** | Debe coincidir con `SERIALx_BAUD` del controlador de vuelo. Automática prueba 57600, 115200, 921600, 1500000, 460800, 230400 y 500000. No se usa con USB. |

Botones: **Detección automática** (busca en todos los puertos y velocidades, y guarda el resultado), **Conectar**, **Reiniciar enlace**, **Detener**. Los cambios se aplican de inmediato, sin reiniciar.

## Controlador de Vuelo → NTRIP / RTK

| Ajuste | Predeterminado | Valores y notas |
| --- | --- | --- |
| **Habilitar cliente NTRIP** | Desactivado |  |
| **Host del caster** | vacío | Nombre de host del caster NTRIP. |
| **Puerto** | `2101` | Algunos casters TLS usan 2102 o 443. |
| **Punto de montaje** | vacío | Elige uno con **Explorar puntos de montaje**. |
| **Usar TLS (HTTPS)** | Desactivado | Para casters que requieren TLS. |
| **Usuario** / **Contraseña** | vacío | rtk2go.com: dirección de correo electrónico como usuario, sin contraseña. |
| **Enviar GGA upstream** | Activado | Lo necesitan los casters VRS y los de punto más cercano. |
| **Intervalo de envío (segundos)** | `10` |  |
| **Fuente de posición** | **Posición en vivo desde el controlador de vuelo** | O **Posición manual fija** (**Latitud**, **Longitud**, **Alt (m)**), que también se usa como respaldo antes de la primera fijación de GPS. |

## Controlador de Vuelo → Inyectores

| Ajuste | Predeterminado | Valores y notas |
| --- | --- | --- |
| **Tipo de entrada** |  | **HTTP**, **UDP** o **Serie**. No se puede cambiar después de crear el inyector. |
| **sysid MAVLink** | `1` | Igual que el controlador de vuelo. |
| **compid MAVLink** | `194` | Carga útil de usuario. |
| **Prefijo de nombre** | vacío | Hasta 8 caracteres ASCII, antepuestos a cada nombre de señal. |
| **Límite de tasa (Hz por señal)** |  | Máximo de muestras por segundo para cada nombre de señal. |
| **Protocolo** (UDP, Serie) |  | **Clave=Valor (líneas)** o **JSON** (`{name, value}`). |
| **Puerto** / **Dirección de escucha** (UDP) |  | Elige un puerto libre, por ejemplo 14600. `0.0.0.0` = todas las interfaces, `127.0.0.1` = solo local. |
| **Ruta del dispositivo** / **Baudios** (Serie) |  | Por ejemplo `/dev/ttyUSB0`; la tasa de baudios debe coincidir con la del emisor. |

## Control en Tierra

Una tarjeta por destino.

| Ajuste | Predeterminado en un destino nuevo | Valores y notas |
| --- | --- | --- |
| **Nombre** | vacío | Hasta 50 caracteres. |
| **IP o Host de Destino** | vacío | Una dirección IPv4. Es obligatoria antes de poder activar el video o la telemetría. |
| **Puerto de Telemetría** | `14550` | 1–65535. |
| **Puerto de Video** | `5600` | 1–65535. |
| **Puerto de Video (Cámara 2)** | vacío (= Puerto de Video + 1) | Solo se muestra cuando **Dual stream** está activado. |
| **Habilitar Endpoint** | Activado | Desactivado detiene todo hacia este destino: telemetría, video y audio. |
| **Habilitar Video** | **Desactivado** |  |
| **Habilitar Telemetría** | **Desactivado** |  |
| **Read Only** | Desactivado | La estación de control en tierra recibe telemetría, pero no puede cambiar nada en el vehículo. Esto se aplica a partir de UAVcast-Pro 6.5.3; en versiones anteriores, Read Only no bloquea la escritura de parámetros. |

## Cámara → Ajustes de cámara

| Ajuste | Predeterminado | Valores y notas |
| --- | --- | --- |
| **¿Habilitar Cámara?** | Sí |  |
| **Seleccionar Cámara** | Cámara de Raspberry Pi | Cámaras CSI y USB detectadas. |
| **Resolución** | 640×480 | Solo se ofrecen los tamaños que admite la cámara. |
| **Seleccionar FPS** | **Automático** | La cámara negocia el valor. |
| **Tasa de bits:** | `0` (automático) | 0–10000 kbps. |
| **Tasa de Recuperación del Stream** | **Automático** | Intervalo de keyframes. Automático = un keyframe por segundo. Los niveles más altos se recuperan antes de la pérdida de paquetes, pero usan más ancho de banda. |
| **Rotación:** / **Configuración de Volteo** | 0°, sin volteo | **Voltear Horizontalmente**, **Voltear Verticalmente**. |
| **¿Activar Vista Previa en Vivo?** | Sí | Vista previa en esta página y en el Mapa de Vuelo. |
| **Pipeline Personalizado** | pipeline de prueba | Reemplaza los destinos de Control en Tierra. Omite el prefijo `gst-launch-1.0`. |
| **Habilitar cambio de cámara por canal RC** | Desactivado |  |
| **Canal RC** | 7 | PWM < 1500 = Cámara 1, PWM > 1500 = Cámara 2. |
| **Igualar Resolución de Cámara 1** | Desactivado | La cámara 2 captura con la resolución de la cámara 1. |
| **Dual stream** | Desactivado | Transmite ambas cámaras al mismo tiempo. |
| **Audio** | Desactivado | Audio Opus en la vista previa. |
| **Dispositivo de audio** | **Automático (micrófono de la cámara si existe)** | O un dispositivo de captura, o **Tono de prueba (no necesita micrófono)**. |
| **Tasa de bits** (audio) | 64 kbps |  |
| **Enviar audio a las estaciones de control en tierra** | Desactivado | RTP/Opus a cada destino de video en Puerto de Video + 2. |

## Cámara → Grabaciones → Ajustes

| Ajuste | Predeterminado | Valores y notas |
| --- | --- | --- |
| **Ubicación de almacenamiento** | **Almacenamiento interno** | Una unidad USB o SSD, o **Otra carpeta**. |
| **Mantener libre** | 2 GB | 0.5–1000 GB. |
| **Eliminar las grabaciones más antiguas cuando se acabe el espacio** | Activado | Desactivado = la grabación se detiene cuando el disco está lleno. |
| **Eliminar grabaciones más antiguas que** | 0 días | 0 las conserva hasta que se necesite el espacio. |
| **Grabar automáticamente al armar** | Activado |  |
| **Grabar cámara 1** / **Grabar cámara 2** | Activado / Activado | La cámara 2 solo con dual stream. |
| **Duración del archivo** | 1 min | De 1 a 30 minutos por archivo. |
| **Grabar telemetría** | **Mientras está armado** | **Siempre mientras esté conectado** o **Desactivado**. |

## Módem

| Ajuste | Predeterminado | Valores y notas |
| --- | --- | --- |
| **¿Habilitar módem celular?** | Sí |  |
| **Tipo de módem** | **Tradicional (PPP)** | O **HiLink**. |
| **Nombre del Punto de Acceso (Opcional)** | vacío (**Automático**) | Déjalo vacío para detectarlo automáticamente. |
| **Nombre de usuario (Opcional)** / **Contraseña (Opcional)** | vacío | La mayoría de las operadoras no necesitan ninguno de los dos. |
| **Código PIN (Opcional)** | vacío | PIN de la SIM, salvo que el PIN esté desactivado. |

## Red Privada Virtual

| Ajuste | Predeterminado | Valores y notas |
| --- | --- | --- |
| **Activar VPN** | No |  |
| **Servicios** | **ZeroTier** | **ZeroTier** o **Tailscale**. |
| **ID de Red** (ZeroTier) | vacío | Proviene de tu propio controlador de ZeroTier. |
| **Clave de Autenticación** / **Nombre de Host (Opcional)** (Tailscale) | vacío | O inicia sesión con **Inicio de Sesión Web**, o usa la pestaña **Fleet Manager** después del emparejamiento. |

## DNS Dinámico

| Ajuste | Predeterminado | Valores y notas |
| --- | --- | --- |
| **¿Habilitar DNS Dinámico?** | No |  |
| **Sistema DNS** | `noip` | `generic` (con **URL de DNS**), `noip`, `dyndns`, `duck`. |
| Nombre de usuario, **Contraseña**, **Alias** | vacío | Proviene de tu proveedor de DNS. |

## Redes

| Ajuste | Predeterminado | Valores y notas |
| --- | --- | --- |
| **Prioridad de Red** | enrutamiento del sistema | **Prioridad WiFi (Modo Interior)**, **Prioridad Módem (Modo Exterior)** o **Automático (Predeterminado del Sistema)**. |

## Fleet Management

| Ajuste | Predeterminado | Valores y notas |
| --- | --- | --- |
| **Device Name** | vacío | Se muestra en Fleet Manager. Si no se define, se usa el nombre de host. |

## Usuarios

| Ajuste | Valores y notas |
| --- | --- |
| **Rol** | **Administrador - Acceso completo** o **Solo lectura - Solo ver**. El primer usuario debe ser administrador. |

## Aplicación

| Ajuste | Predeterminado | Valores y notas |
| --- | --- | --- |
| **Puerto del Servidor** | `80` | 80 o superior. **Enviar y reiniciar el servidor** lo aplica; la dirección queda como `http://<dispositivo>:<puerto>/`. |
| **Idioma** | Idioma del navegador | Inglés, español, portugués, italiano, neerlandés, polaco, turco, ruso, chino (simplificado y tradicional). |
| **Tema Oscuro** |  |  |
| **Registro**: lista de registros / intervalo de tiempo | **Todos los Registros** / **Últimas 2 horas** | Consulta [Recopilar registros](https://docs.uavmatrix.com/es/troubleshooting/collect-logs/). |

**Base de Datos** ofrece **Respaldar Base de Datos**, **Restaurar Base de Datos** (un archivo `.db`) y **Reiniciar Base de Datos**, que borra todos los ajustes.

Source: https://docs.uavmatrix.com/es/reference/settings/
