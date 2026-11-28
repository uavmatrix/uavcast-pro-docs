# Módem celular (4G/LTE)

> Conecta un módem USB 4G/LTE HiLink o tradicional a UAVcast-Pro, con detección automática del APN, PIN de la SIM, reconexión automática e información de la señal del módem para volar con red celular.

Un módem 4G/LTE da acceso a internet al dron dondequiera que haya cobertura celular, de modo que la telemetría y el video llegan a tu estación de control en tierra mucho más allá del alcance del Wi-Fi. UAVcast-Pro admite módems **HiLink**, que se conectan por sí solos, y módems **Tradicional (PPP)**, que UAVcast-Pro conecta mediante ModemManager. En los módems tradicionales encuentra el APN automáticamente, se conecta al arrancar y se reconecta tras las caídas. Abre **Módem** en la barra lateral.

![Página Módem con Tradicional (PPP) seleccionado, APN en Automático y el panel de no hay módem conectado](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/modem.webp)

*Página Módem con Tradicional (PPP) seleccionado y el APN en Automático, antes de conectar un módem.*

## ¿Qué tipo de módem tengo?

|  | HiLink | Tradicional (PPP) |
| --- | --- | --- |
| Cómo aparece | Una tarjeta de red (`usb0` o `eth1`). El módem ejecuta su propio router y su página web, a menudo en `192.168.8.1`. | Un dispositivo de módem gestionado por ModemManager. La conexión suele aparecer como `ppp0` o `wwan0`. |
| Quién conecta | El propio módem. | UAVcast-Pro, mediante ModemManager y NetworkManager. |
| Ajustes en UAVcast-Pro | Ninguno. Configura el APN en la página web del módem si es necesario. | APN (opcional), usuario, contraseña, PIN. |
| Ejemplos | Huawei E3372h, E8372 | Huawei E3372s, Quectel EC25 / EG25, Sierra Wireless |

¿No estás seguro? Conéctalo y ejecuta `mmcli -L` en el dron. Si ModemManager lo lista, usa **Tradicional (PPP)**. Si no lo lista y aparece una nueva interfaz de red en **Redes**, es HiLink.

## Configurar un módem tradicional

1. Inserta una SIM con datos y conecta el módem al computador de a bordo.
2. Ve a **Módem**. Pon **Habilitar módem** en **Sí** y **Tipo de módem** en **Tradicional (PPP)**.
3. Deja **Nombre del Punto de Acceso (Opcional)** vacío. UAVcast-Pro lo detecta.
4. Introduce el **Código PIN (Opcional)** si tu SIM lo pide.
5. Espera de 30 a 90 segundos. **Información del Módem** muestra el operador, la tecnología y la **Información de IPv4** una vez conectado.

Un módem conectado se conecta automáticamente. Si seleccionas **Desconectar**, permanece desconectado hasta que lo vuelvas a conectar, incluso después de reiniciar.

### Cómo funciona el APN automático

Con el campo APN vacío, UAVcast-Pro prueba, en este orden:

1. el APN que funcionó la última vez con el operador de esta SIM,
2. el APN predeterminado de la red (APN vacío),
3. el APN con el que el módem se conectó a LTE,
4. los APN de internet del operador de la base de datos de proveedores de banda ancha móvil.

El primero que obtenga una dirección de internet se guarda para ese operador. Si introduces una SIM nueva de otro operador, vuelve a detectar. Si tu operador necesita un APN especial (APN privado, SIM M2M o SIM corporativas), escríbelo. Un APN definido manualmente es el único que se prueba.

## Configurar un módem HiLink

1. Conecta el módem. Espera hasta que su LED muestre una conexión fija.
2. En **Módem**, pon **Habilitar módem** en **Sí** y **Tipo de módem** en **HiLink**.
3. Revisa **Información del Módem Hilink**: deberías ver la **Interfaz** y una **Dirección IP**.

Los módems HiLink se conectan, eligen la red y se reconectan por sí solos, así que no tienen botones de conexión. Cambia el APN, el PIN o el modo de red en la página web del propio módem (accede a ella desde la red del dron, a menudo en `http://192.168.8.1`).

## Referencia de ajustes

| Ajuste | Predeterminado | Valores | Notas |
| --- | --- | --- | --- |
| **Habilitar módem** | **Sí** | **Sí**, **No** |  |
| **Tipo de módem** | **Tradicional (PPP)** | **HiLink**, **Tradicional (PPP)** |  |
| **Nombre del Punto de Acceso (Opcional)** | vacío (**Automático**) | APN de tu operador | Solo para módems tradicionales. |
| **Nombre de usuario (Opcional)** / **Contraseña (Opcional)** | vacío |  | Solo para módems tradicionales. La mayoría de los operadores no necesitan ninguno. |
| **Código PIN (Opcional)** | vacío | PIN de la SIM | Solo para módems tradicionales. Déjalo vacío si la SIM no tiene PIN. |

## Información del módem

En los módems tradicionales, **Información del Módem** muestra **Calidad de la Señal**, **Tecnología** (LTE, UMTS …), **Desbloqueo Requerido**, **Estado**, **Fabricante**, **IMEI**, la red (**Operador**, **Código**, **Registro**), **Información de IPv4** (**Dirección IP**, **Puerta de Enlace**, **DNS**, **MTU**) y **Propiedades de Conexión** (**APN**, **Tipo de IP**, **Itinerancia**).

La fila **Cellular** del tablero muestra el mismo resumen de señal.

## Antes de volar sobre red celular

- En [Redes](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/networks/), selecciona **Prioridad Módem (Modo Exterior)** para que el tráfico se mantenga en el módem cuando el Wi-Fi siga al alcance durante el despegue.
- Usa una [VPN](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/vpn/): los operadores celulares no asignan al dron una dirección a la que tu estación de control en tierra pueda llegar.
- Activa el Failsafe GCS en el controlador de vuelo.
- Comprueba la señal en altura: la cobertura está planificada para el suelo, y la señal cambia a medida que asciendes.

## Solución de problemas

| Síntoma | Qué revisar |
| --- | --- |
| *No hay módem conectado* | El módem no se detecta. Revisa la conexión USB y el LED de alimentación del módem. Usa un hub con alimentación si la Raspberry Pi se reinicia al conectarse el módem. |
| **Desbloqueo Requerido** muestra *bloqueado* | Introduce el PIN de la SIM, o desactiva el PIN en un teléfono. |
| Registrado, pero sin dirección IP | APN incorrecto. Escribe el APN del operador en lugar de usar el automático. |
| Se conecta y luego se cae bajo carga | Normalmente es la energía. Revisa la fila **Power supply** del tablero. |

Los **Registros de Acción** muestran cada intento de APN y el motivo por el que falló. Para más ayuda, consulta [Módem conectado pero sin internet](https://docs.uavmatrix.com/es/troubleshooting/modem-no-internet/).

Source: https://docs.uavmatrix.com/es/uavcast-pro/connectivity/cellular-modem/
