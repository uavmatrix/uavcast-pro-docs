# Inyectores

> Usa los inyectores de UAVcast-Pro para enviar lecturas de sensores desde scripts, Arduinos o el módem LTE al flujo MAVLink por HTTP, UDP o serie, para que QGC y Mission Planner las vean.

Un inyector alimenta datos desde fuera de UAVcast-Pro, como un script de Python, un Arduino o un sensor en la red, al flujo MAVLink como mensajes `NAMED_VALUE_FLOAT` (o `NAMED_VALUE_INT`). Cada estación de control conectada recibe los valores como telemetría normal: Mission Planner los muestra en la pestaña **Status** y QGroundControl en el Inspector MAVLink. También aparecen automáticamente en los tableros de [Flujos de Datos](https://docs.uavmatrix.com/es/uavcast-pro/data-streams/). Abre **Controlador de Vuelo → Inyectores**.

Usos típicos: sensores de radiación, gas o clima en el computador de a bordo, valores de señal LTE (RSRP, SINR) para monitorear el enlace, o valores que calculan tus propios scripts.

## Elige un transporte

| Tipo | Cómo llegan los datos | Ideal para |
| --- | --- | --- |
| **HTTP** | POST de JSON a una URL única con un token secreto | Lo más sencillo. Cualquier cosa que pueda hacer una petición HTTP. |
| **UDP** | Paquetes a un puerto del dron, como líneas `NAME=VALUE` o JSON | Mínima sobrecarga, redes locales de confianza. Sin autenticación. |
| **Serial** | Líneas leídas desde un dispositivo `/dev/tty*` | Sensores cableados, como un Arduino por USB. |

El tipo no se puede cambiar después de crear el inyector.

## Crear un inyector

1. Ve a **Controlador de Vuelo → Inyectores** y selecciona **Añadir inyector**.
2. Introduce un **Nombre** (solo se muestra en la interfaz) y elige el **Tipo de entrada**.
3. Mantén **MAVLink sysid** en `1` para que los valores pertenezcan al mismo vehículo que el controlador de vuelo, y **MAVLink compid** en `194` (carga útil del usuario), salvo que necesites otra cosa.
4. Opcional: configura un **Prefijo de nombre**, por ejemplo `BAL_`, para que `RAD1` se envíe como `BAL_RAD1`.
5. Para UDP o Serial, completa los ajustes del listener. Luego selecciona **Crear**.
6. Selecciona **Enviar señal de prueba** en la tarjeta del inyector para enviar un valor y verificarlo en tu estación de control.

![Pestaña Inyectores con Aún no hay inyectores, usos típicos, los transportes HTTP, UDP y Serial y el botón Añadir inyector](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/flight-controller--injectors.webp)

*Controlador de Vuelo → Inyectores antes del primer inyector: usos típicos y los tres transportes.*

## Enviar datos

**HTTP**

Después de crear un inyector HTTP, su tarjeta muestra el **Endpoint HTTP**. La URL tiene la forma `http://<drone-ip>/api/inject/<token>` y pasa por el puerto normal de la interfaz web. **Copiar URL** la copia.

```bash
curl -X POST http://192.168.1.50/api/inject/<token> \
  -H "Content-Type: application/json" \
  -d '{"name":"RAD1","value":0.077}'
```

```bash
curl -X POST http://192.168.1.50/api/inject/<token> \
  -H "Content-Type: application/json" \
  -d '{"samples":[{"name":"TEMP","value":21.4},{"name":"HUM","value":48}]}'
```

La respuesta cuenta lo que pasó: `{"accepted":2,"rateLimited":0,"rejected":0}`. El token es la única protección. Si se filtra, selecciona **Rotar token** y actualiza tu cliente.

**UDP**

El inyector escucha en el **Puerto** `14600` y en la **Dirección de escucha** `0.0.0.0` (todas las interfaces) por defecto. Usa `127.0.0.1` si el emisor corre en el propio dron.

```bash
echo "RAD1=0.077" | nc -u -w1 192.168.1.50 14600
```

```python
import json, socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.sendto(json.dumps({"name": "RAD1", "value": 0.077}).encode(), ("192.168.1.50", 14600))
```

**Serie**

El inyector lee líneas terminadas en salto de línea desde la **Ruta del dispositivo** (por defecto `/dev/ttyUSB0`) a los **Baudios** (por defecto `115200`). Cada línea es una muestra: `NAME=VALUE` para el protocolo Key=Value, o un objeto JSON. Se reconecta por sí solo si el dispositivo se desconecta.

```cpp
void setup() { Serial.begin(115200); }
void loop() {
  Serial.print("LIGHT=");
  Serial.println(analogRead(A0));
  delay(200);
}
```

> **Los nombres MAVLink tienen 10 caracteres**
>
> Los nombres de `NAMED_VALUE_FLOAT` están limitados a 10 caracteres, incluido el prefijo. Mantén el prefijo corto (hasta 8 caracteres) y los nombres compactos.

## Referencia de ajustes

| Ajuste | Predeterminado | Valores | Notas |
| --- | --- | --- | --- |
| **Nombre** | vacío | texto | Etiqueta solo en la interfaz. |
| **Tipo de entrada** | **HTTP** | **HTTP**, **UDP**, **Serie** | Fijo después de crear. |
| **Habilitado** | Activado | Activado, desactivado | Desactivado conserva la configuración, pero detiene el listener. |
| **MAVLink sysid** | `1` | 1–255 | Igual que el controlador de vuelo: agrupa los valores con ese vehículo. |
| **MAVLink compid** | `194` | 0–255 | 194 es común para sensores de carga útil del usuario. |
| **Prefijo de nombre** | vacío | hasta 8 caracteres ASCII | Se agrega delante de cada nombre de señal. |
| **Límite de tasa (Hz por señal)** | `10` | muestras por segundo | Las muestras adicionales se descartan y se cuentan como **Limitados**. Protege el enlace de un emisor descontrolado. |
| **Protocolo** (UDP, Serie) | **Key=Value (por líneas)** | **Key=Value (por líneas)**, **JSON** (`{name, value}`) |  |
| **Puerto** (UDP) | `14600` | 1–65535 |  |
| **Dirección de escucha** (UDP) | `0.0.0.0` | dirección IP | `127.0.0.1` acepta solo emisores locales. |
| **Ruta del dispositivo** (Serie) | `/dev/ttyUSB0` | ruta del dispositivo | Ejecuta `ls /dev/tty*` para encontrarlo. |
| **Baudios** (Serie) | `115200` |  | Debe coincidir con el emisor. |

Cada tarjeta muestra los contadores **Aceptados**, **Limitados** y **Rechazados**, para que veas si llegan datos y si son válidos.

Los inyectores se ejecutan dentro de los servicios de UAVcast-Pro y arrancan con el sistema, así que los valores siguen fluyendo sin tener la interfaz web abierta.

Source: https://docs.uavmatrix.com/es/uavcast-pro/flight-controller/injectors/
