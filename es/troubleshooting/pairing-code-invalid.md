# Código de emparejamiento no válido o vencido

> Soluciona Invalid pairing code, This pairing code has expired y License is not owned by any member of this organization al emparejar un dron con Fleet Manager.

Ingresaste el código de UAVcast-Pro en el asistente **Pair Device** de Fleet Manager, y fue rechazado.

El emparejamiento funciona en esta dirección: **UAVcast-Pro muestra el código, tú lo escribes en Fleet Manager**. El código tiene 8 dígitos y es válido durante 5 minutos.

![Asistente Pair UAV de Fleet Manager con la notificación de error This pairing code has expired](https://docs.uavmatrix.com/es/img/screenshots/fleet-manager/pair-device--code-expired.webp)

*Fleet Manager rechaza un código: el error aparece como notificación en el paso Pairing Code. Aquí, This pairing code has expired.*

| Error en Fleet Manager | Causa | Solución |
| --- | --- | --- |
| **Pairing code must be 8 digits** / **Please enter a valid 8-digit code** | Muy pocos dígitos, o letras | [Comprobación 1](https://docs.uavmatrix.com/es/troubleshooting/pairing-code-invalid/#check-1) |
| **Invalid pairing code** | Un error de escritura, o un código que nunca existió | [Comprobación 1](https://docs.uavmatrix.com/es/troubleshooting/pairing-code-invalid/#check-1) |
| **This pairing code has expired** | Pasaron más de 5 minutos | [Comprobación 2](https://docs.uavmatrix.com/es/troubleshooting/pairing-code-invalid/#check-2) |
| **This pairing code has already been used** | El código ya se usó una vez | [Comprobación 2](https://docs.uavmatrix.com/es/troubleshooting/pairing-code-invalid/#check-2) |
| **License is not owned by any member of this organization** | La licencia del dron pertenece a una cuenta fuera de la organización | [Comprobación 3](https://docs.uavmatrix.com/es/troubleshooting/pairing-code-invalid/#check-3) |
| **Invalid license key** / **License has expired** / **License has been refunded** | La licencia del dron no es válida en la tienda | [Comprobación 4](https://docs.uavmatrix.com/es/troubleshooting/pairing-code-invalid/#check-4) |
| **This UAV is already paired to an organization** | Ya está emparejado con otra organización | [Comprobación 5](https://docs.uavmatrix.com/es/troubleshooting/pairing-code-invalid/#check-5) |
| **Too many attempts. Please wait a minute and try again.** | Límite de velocidad tras varios intentos seguidos | Espera un minuto |

## Comprobación 1: Escribe el código actual

1. En UAVcast-Pro, ve a **Fleet Management** y presiona **Connect to Fleet Manager**.
2. Copia los 8 dígitos que aparecen debajo de **Pairing Code**.
3. En Fleet Manager, ve a **Fleet → Pair Device**, elige la organización e ingresa el código en **Enter Pairing Code**.

## Comprobación 2: Obtén un código nuevo

Un código es válido durante 5 minutos y funciona una sola vez. Cuando **Expires in** llegue a cero, presiona **Connect to Fleet Manager** de nuevo en UAVcast-Pro para obtener un código nuevo. Si UAVcast-Pro no puede obtener ningún código, muestra *Unable to connect to Fleet Manager. Please check your internet connection.*: primero corrige la conexión a internet del dron.

## Comprobación 3: Licencia de alguien fuera de la organización

Fleet Manager solo acepta un dron cuya licencia de UAVcast-Pro fue comprada por un miembro de la organización a la que emparejas. La coincidencia se hace con la dirección de correo electrónico de la cuenta de la tienda que es dueña de la licencia.

Corrígelo de una de estas formas:

- Invita a la cuenta que compró la licencia a la organización (**Team**) y luego vuelve a emparejar.
- Empareja en una organización donde el dueño de la licencia sea miembro.
- Si la licencia se compró con otra dirección de correo tuya, pide a **[support@uavmatrix.com](mailto:support@uavmatrix.com)** que agregue esa dirección como correo de licencia en tu usuario de Fleet Manager.

Consulta [Licencias en Fleet Manager](https://docs.uavmatrix.com/es/fleet-manager/licenses/).

## Comprobación 4: Licencia no válida

Abre **Aplicación → Gestor de Licencias** en el dron y revisa **Estado de la Licencia**. Una licencia vencida o reembolsada debe renovarse en [uavmatrix.com](https://uavmatrix.com/). Si UAVcast-Pro no tiene una licencia activa, no puede solicitar un código (*No se encontró una licencia válida. Activa primero tu licencia.*): consulta [La licencia no se activa](https://docs.uavmatrix.com/es/troubleshooting/license-activation-failed/).

## Comprobación 5: Ya emparejado en otro lugar

Un dron pertenece a una sola organización. Para moverlo, primero quítalo de la organización anterior. Volver a emparejar en la misma organización está permitido y conserva el historial del dron. Consulta [Quitar o transferir un dron](https://docs.uavmatrix.com/es/fleet-manager/fleet/remove-or-transfer/).

## ¿Sigue rechazado?

Envía el texto exacto del error, el nombre de host del dron y el nombre de la organización a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Relacionado: [Emparejamiento de Fleet Manager en UAVcast-Pro](https://docs.uavmatrix.com/es/uavcast-pro/fleet-pairing/) · [Empareja tu primer dron](https://docs.uavmatrix.com/es/fleet-manager/pair-uav/)

Source: https://docs.uavmatrix.com/es/troubleshooting/pairing-code-invalid/
