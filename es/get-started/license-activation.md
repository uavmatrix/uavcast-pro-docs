# Licencias y activación

> Cómo comprar una licencia de UAVcast-Pro, activarla en un dron, revisar los espacios de dispositivos, renovarla y moverla a una nueva Raspberry Pi o tarjeta SD dando de baja el dispositivo anterior.

UAVcast-Pro necesita una clave de licencia activada en cada dron. Compras una licencia en la tienda UAVmatrix, pegas la clave en **Aplicación → Gestor de Licencias** del dron y seleccionas **Validar**. Cada licencia tiene una cantidad de espacios para dispositivos. Activar un dron usa un espacio; darlo de baja libera ese espacio para otro dron.

> Necesitas una licencia de UAVcast-Pro para activar el dron. Cómprala en la tienda de UAVmatrix.
>
> [Comprar UAVcast-Pro](https://uavmatrix.com/es/checkout) · [Ver planes y precios](https://uavmatrix.com/es/products)

## Comprar una licencia

Las licencias se venden en [uavmatrix.com/products](https://uavmatrix.com/products/). Cada licencia incluye actualizaciones durante todo su período y [Fleet Manager](https://docs.uavmatrix.com/es/fleet-manager/), incluida su VPN para acceder al dron por 4G.

| Plan | Espacios para dispositivos | Vigencia |
| --- | --- | --- |
| Basic | 1 | 1 año |
| Silver | 2 | 1 año |
| Gold | 4 | 2 años |

La página de la tienda siempre muestra los planes y precios vigentes. No hay licencias de prueba gratuitas.

Después del pago recibes un correo de confirmación del pedido con la **clave de licencia**, cinco grupos de cuatro caracteres.

La clave también aparece en tu cuenta de la tienda, en **Licencias**, junto con sus espacios para dispositivos y su fecha de vencimiento.

> **El período de la licencia comienza con la primera activación**
>
> Una licencia comprada hoy y activada el próximo mes vence un período después de la fecha de activación, no de la fecha de compra.

## Activar la licencia en un dron

El dron necesita acceso a Internet mientras lo activas (Wi-Fi, Ethernet o el módem).

1. Abre la interfaz web de UAVcast-Pro. Un dispositivo sin licencia siempre abre **Aplicación**.
2. En **Gestor de Licencias**, pega la clave en **Ingresar Clave de Licencia**.
3. Selecciona **Validar**. Verás *License activated successfully* y se desbloquea el resto de la barra lateral.

![Gestor de Licencias de UAVcast-Pro que muestra una licencia activa con nombre registrado, dispositivos permitidos y restantes, fecha de vencimiento y la tabla de dispositivos activados](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/application--license-activated.webp)

*Aplicación → Gestor de Licencias después de la activación. El dispositivo actual aparece marcado como Actual en Dispositivos Activados.*

**Detalles de la Licencia** muestra:

| Campo | Significado |
| --- | --- |
| **Nombre Registrado:** | La cuenta de la tienda a la que pertenece la licencia. |
| **Estado de la Licencia:** | **Activa**, **Inactiva** o **Vencida**. |
| **Dispositivos Permitidos:** | Total de espacios para dispositivos. |
| **Dispositivos Restantes:** | Espacios libres. |
| **Fecha de Activación:** / **Fecha de Expiración:** | Cuándo comenzó y termina el período de la licencia. |

**Dispositivos Activados** enumera cada dron de esta licencia con su **Nombre del Dispositivo**, **Nombre del Host** y **Fecha de Activación**. El dron en el que estás aparece marcado como **Actual**. Selecciona **Editar** para ponerle a un dispositivo un nombre que reconozcas.

### Errores de activación

| Mensaje | Qué hacer |
| --- | --- |
| *Maximum activations reached. Please deactivate another device first or upgrade your license.* | Todos los espacios están en uso. [Da de baja un dispositivo](https://docs.uavmatrix.com/es/get-started/license-activation/#unregister-a-device) o agrega espacios. |
| *Invalid license key* | Revisa si hay errores de escritura o espacios de más. Copia la clave desde tu cuenta de la tienda. |
| *License already activated on this device* | No hay nada que hacer. Este dispositivo ya tiene un espacio (por ejemplo, después de reinstalar con la misma tarjeta SD). |
| *Network error! Could not fetch license details…* | El dispositivo no tiene Internet. Revisa **Redes** e inténtalo de nuevo. |

## Cómo se verifica la licencia

- El dron verifica la licencia con el servidor de licencias de UAVmatrix cada **4 horas**.
- Si no se puede acceder al servidor, el dron conserva el último estado conocido. Puedes volar sin conexión a Internet; nada se bloquea mientras estás sin conexión.
- Un dispositivo se identifica por el número de serie de su CPU y el número de serie de su disco de arranque (tarjeta SD o SSD). Reinstalar en la misma Pi y con la misma tarjeta mantiene la misma identidad y el mismo espacio. Una nueva tarjeta SD o SSD cuenta como **dispositivo nuevo**.
- Los datos de licencia del dron están cifrados con esa identidad, así que una [copia de seguridad de la base de datos](https://docs.uavmatrix.com/es/uavcast-pro/application-settings/#database) restaurada en otro hardware necesita volver a activar la licencia.

## Dar de baja un dispositivo

Dar de baja libera un espacio de inmediato. Puedes dar de baja **cualquier** dispositivo de la licencia desde **cualquier** dron donde la licencia esté activa, no solo desde el dron en el que estás.

1. Ve a **Aplicación → Gestor de Licencias → Dispositivos Activados**.
2. Busca el dispositivo y selecciona **Desregistrar**. Verás *Device unregistered successfully*.

Si das de baja el dron con el que estás trabajando, quedará sin licencia y la interfaz web se bloqueará en la página **Aplicación** hasta que actives de nuevo una clave.

> **No puedes dar de baja desde la tienda**
>
> La tienda muestra los dispositivos registrados pero no puede eliminarlos. Da de baja desde UAVcast-Pro en uno de los dispositivos de la licencia. Si todos los dispositivos de la licencia se pierden o se borran, escribe a [support@uavmatrix.com](mailto:support@uavmatrix.com) con tu clave de licencia.

## Mover a nuevo hardware

Usa esto cuando cambies la Pi, sustituyas la tarjeta SD o pases de un banco de pruebas al avión.

1. En el dispositivo **anterior**, ve a **Aplicación → Gestor de Licencias** y selecciona **Desregistrar** junto a él. Hazlo antes de borrar la tarjeta.
2. Instala UAVcast-Pro en el nuevo hardware. Consulta [Instalación](https://docs.uavmatrix.com/es/get-started/installation/).
3. Activa la misma clave en el nuevo dispositivo.

Si el dispositivo anterior ya no funciona, da de baja desde otro dron de la misma licencia o contacta con soporte.

## Renovar o actualizar

Desde tu cuenta de la tienda, abre la licencia y selecciona **Opciones de actualización**:

- **Extender suscripción** agrega otro período. Si la licencia sigue vigente, el nuevo período se suma a la fecha de vencimiento actual; si ya venció, comienza en la fecha de renovación. La clave no cambia.
- **Agregar dispositivos** agrega espacios a la licencia. Una licencia vencida debe renovarse primero.
- **Cambiar de plan** mueve la licencia a un plan con más espacios.

El dron toma la nueva fecha de vencimiento y los nuevos espacios en su próxima verificación, dentro de 4 horas. Para actualizarlo de inmediato, selecciona **Cambiar** en **Gestor de Licencias**, escribe la misma clave y selecciona **Validar**.

## Cuando una licencia vence

> **Una licencia vencida bloquea UAVcast-Pro**
>
> Cuando una licencia vence, UAVcast-Pro ya no puede usarse en ninguno de sus drones. No sigue funcionando con la versión instalada.

Cuando el servidor de licencias informa que la licencia venció, el dron se marca como sin licencia: la interfaz web solo abre **Aplicación**, y la telemetría, el video, NTRIP y el DNS dinámico se detienen en el siguiente reinicio de sus servicios. Renueva la licencia antes de la fecha de vencimiento para evitar interrupciones, y valida la clave de nuevo en el dron (o espera a su próxima verificación, dentro de 4 horas) para desbloquearlo.

## Licencias y Fleet Manager

Fleet Manager está incluido con tu licencia de UAVcast-Pro y usa la misma licencia. Un dron solo puede vincularse a una organización si su licencia pertenece a un miembro de esa organización. Si compraste la licencia con un correo distinto del que usas para iniciar sesión en Fleet Manager, agrega ese correo en Fleet Manager (consulta [Licencias en Fleet Manager](https://docs.uavmatrix.com/es/fleet-manager/licenses/)). Consulta [Vincular un dron con Fleet Manager](https://docs.uavmatrix.com/es/uavcast-pro/fleet-pairing/).

Problemas de activación: consulta [Falló la activación de la licencia](https://docs.uavmatrix.com/es/troubleshooting/license-activation-failed/).

Source: https://docs.uavmatrix.com/es/get-started/license-activation/
