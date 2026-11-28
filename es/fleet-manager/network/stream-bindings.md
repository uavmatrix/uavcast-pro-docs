# Vinculaciones de stream

> Enruta video y MAVLink desde cualquier dron a cualquier estación de control en tierra por VPN, cómo Fleet Manager asigna los puertos UDP y la configuración de QGC y Mission Planner.

Una vinculación de stream indica a un dron que envíe su video y su telemetría a una estación de control en tierra a través de la VPN de tu organización. Un dron puede transmitir a varias estaciones, y una estación puede recibir varios drones. Fleet Manager elige los puertos para que los streams nunca colisionen.

## Antes de empezar

- [VPN activada](https://docs.uavmatrix.com/es/fleet-manager/network/#enable-vpn) y el dron en la VPN (tipo **UAV** en **Connected Devices**).
- La estación de control en tierra [conectada y configurada como **GCS**](https://docs.uavmatrix.com/es/fleet-manager/connect-gcs/).
- Rol **Owner o Admin**.
- El dron **en línea**. Fleet Manager envía de inmediato los nuevos destinos a UAVcast-Pro y espera su confirmación.

## Añadir una vinculación

1. Ve a **Network → Stream Bindings** y selecciona **Add Binding**.
2. En **Add Stream Binding**, elige el **Drone** y la **Ground Station**.
3. Selecciona **Create Binding**.

![Diálogo Add Stream Binding con selectores de dron y de estación de control en tierra, y una nota sobre los puertos automáticos](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/network--add-binding.webp)

*Diálogo Add Stream Binding con un dron y una estación de control en tierra seleccionados, y la nota de que los puertos se asignan automáticamente.*

La vinculación aparece en la tabla con **Video** y **Telemetry** activados y sus **Ports** (video / telemetría). UAVcast-Pro empieza a enviar en segundos.

Si el dron no confirma en 15 segundos, Fleet Manager cancela la vinculación con **Failed to send configuration to drone - it may be offline**. Comprueba que el dron esté en línea e inténtalo de nuevo.

## Cómo se asignan los puertos

Los puertos se cuentan **por estación de control en tierra**. Cada vinculación obtiene su propio bloque de puertos UDP en esa estación, así que los drones nunca se solapan:

- un puerto de **video** para la cámara 1, seguido de espacio para la **cámara 2** (doble stream) y el **audio**, que UAVcast-Pro envía a los puertos siguientes al de video;
- un puerto de **telemetría** para MAVLink.

La primera vinculación en una estación usa los valores predeterminados: video **5600** y telemetría **14550**. Las siguientes obtienen el siguiente bloque libre.

Algunas consecuencias que conviene conocer:

- **Cada estación empieza con los valores predeterminados.** El mismo dron puede tener puertos distintos en dos laptops, según lo que reciba cada laptop.
- **Los puertos liberados se reutilizan.** Eliminar una vinculación libera su bloque para la siguiente vinculación nueva con esa laptop.
- **Los puertos no siguen al dron.** Eliminar y volver a añadir una vinculación puede darle puertos distintos. Lee siempre la columna **Ports** antes de configurar el software de la estación de control en tierra.
- Fleet Manager asigna los puertos, y no se pueden editar en la aplicación.
- Un **Puerto de Video (Cámara 2)** definido a mano en el dron se conserva cuando Fleet Manager actualiza sus destinos solo a partir de UAVcast-Pro 6.5.3. En versiones anteriores, la siguiente actualización lo borra.

## Configurar el software de la estación de control en tierra

Usa los puertos de la columna **Ports** de la vinculación. El stream llega desde la dirección VPN del dron.

**QGroundControl**

- **Telemetry:** QGroundControl escucha en UDP 14550 por defecto, así que el primer dron se conecta solo. Para más drones, abre **Application Settings → Comm Links**, añade un enlace de tipo **UDP** con el puerto de telemetría de la vinculación y conéctalo.
- **Video:** en **Application Settings → Video** (en **General** en versiones antiguas), define **Source** como **UDP h.264 Video Stream** y el puerto UDP con el puerto de video de la vinculación (**UDP URL** `0.0.0.0:<port>` en versiones actuales). QGroundControl muestra un video a la vez; para ver varios drones, ejecuta una segunda instancia o usa un reproductor de video para los demás.

**Mission Planner**

- **Telemetry:** en el desplegable de conexión, arriba a la derecha, elige **UDP**, selecciona **Connect** e introduce el puerto de telemetría de la vinculación. Para varios drones, conéctate una vez por puerto; Mission Planner muestra cada vehículo por su ID de sistema.
- **Video:** haz clic derecho en el HUD, elige **Video → Set GStreamer Source** e introduce un pipeline que escuche en el puerto de video de la vinculación. Consulta [Mission Planner](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/mission-planner/) para ver el pipeline exacto.

> **Dale a cada dron su propio ID de sistema MAVLink**
>
> Cuando una estación de control en tierra recibe varios drones, cada controlador de vuelo necesita un `SYSID_THISMAV` único (ArduPilot) o `MAV_SYS_ID` (PX4). De lo contrario, la estación los confunde.

Más sobre cómo manejar muchos vehículos desde una sola estación: [Transmitir a varias estaciones de control en tierra](https://docs.uavmatrix.com/es/guides/multiple-ground-stations/).

## Pausar o eliminar una vinculación

- Desactiva **Video** o **Telemetry** en la tabla para detener ese stream sin perder la vinculación ni sus puertos. Hazlo mientras el dron esté en línea, para que reciba el cambio.
- Selecciona el icono de papelera para eliminar la vinculación. Los puertos quedan libres para la siguiente vinculación con esa estación de control en tierra.

Usa el cuadro de búsqueda y el filtro **Video Status** (**All Video**, **Video On**, **Video Off**) para encontrar vinculaciones en una flota grande.

![Tabla Stream Bindings con drones, estaciones de control en tierra, interruptores de video y telemetría, y puertos](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/network--stream-bindings.webp)

*Pestaña Stream Bindings: cada vinculación muestra su dron, su estación de control en tierra, los interruptores Video y Telemetry y sus puertos.*

## Vinculaciones en la página del UAV

La [página del UAV](https://docs.uavmatrix.com/es/fleet-manager/fleet/uav-details/#connected-ground-stations) de cada dron lista sus estaciones de control en tierra en **Connected Ground Stations**, con los mismos interruptores y **Pause** / **Resume**. **Add GCS** ahí crea una vinculación de la misma forma que **Add Binding** aquí, con los siguientes puertos libres en esa estación.

## ¿No llega ningún stream?

Consulta [No hay telemetría en la estación de control en tierra](https://docs.uavmatrix.com/es/troubleshooting/no-telemetry-in-gcs/) y [No hay video en la estación de control en tierra](https://docs.uavmatrix.com/es/troubleshooting/no-video-in-gcs/). Las causas habituales son un firewall en la laptop que bloquea el UDP entrante, el software de la estación escuchando en el puerto equivocado, o el stream desactivado en la vinculación.

Source: https://docs.uavmatrix.com/es/fleet-manager/network/stream-bindings/
