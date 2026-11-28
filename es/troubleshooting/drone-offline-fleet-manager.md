# El dron aparece como Offline en Fleet Manager

> ¿El UAV emparejado aparece como Offline o Re-pair required en Fleet Manager? Revisa la conexión a internet del dron, el puerto saliente 8883, Fleet Management de UAVcast-Pro y la licencia.

El UAV está emparejado, pero Fleet Manager lo muestra como **Offline** (en gris en el mapa de flota), su telemetría está congelada, o tiene una insignia **Re-pair required**.

Fleet Manager marca un UAV como offline cuando no ha recibido nada de él durante 20 segundos. El dron se comunica con Fleet Manager mediante una conexión MQTT cifrada, a través de su propia conexión a internet.

| Lo que ves | Causa probable | Empieza en |
| --- | --- | --- |
| Offline, y Fleet Management de UAVcast-Pro dice Disconnected | El dron no tiene internet, o el puerto 8883 está bloqueado | [Verificación 1](https://docs.uavmatrix.com/es/troubleshooting/drone-offline-fleet-manager/#check-1) |
| Insignia Re-pair required, o This UAV must be re-paired | El dron tiene un certificado antiguo | [Verificación 2](https://docs.uavmatrix.com/es/troubleshooting/drone-offline-fleet-manager/#check-2) |
| Offline justo después de reinstalar o restablecer UAVcast-Pro | Se eliminó el emparejamiento en el dron | [Verificación 3](https://docs.uavmatrix.com/es/troubleshooting/drone-offline-fleet-manager/#check-3) |
| En línea, pero sin posición ni batería | El controlador de vuelo no está conectado a UAVcast-Pro | [Verificación 4](https://docs.uavmatrix.com/es/troubleshooting/drone-offline-fleet-manager/#check-4) |

## Comprobación 1: conexión del dron con Fleet Manager

1. Abre UAVcast-Pro en el dron y ve a **Fleet Management**. **Fleet Connection** muestra **Connected** o **Disconnected**, y **Last Connected**.
2. Si aparece **Disconnected**, verifica que el dron tenga internet: revisa la fila **Cellular** del tablero, o ejecuta `curl -I https://fleet-manager.uavmatrix.com` en el dispositivo. Primero corrige el enlace con [Módem conectado, sin internet](https://docs.uavmatrix.com/es/troubleshooting/modem-no-internet/).
3. El dron debe poder abrir una **conexión TCP saliente en el puerto 8883** (MQTT sobre TLS). Algunas redes corporativas, el Wi-Fi público y algunos planes de SIM para IoT solo permiten puertos web. Prueba con otra red o pide al proveedor que abra el 8883.
4. Verifica la fecha y la hora del dispositivo con `date`. La conexión usa certificados, que fallan en un dispositivo con el reloj incorrecto.
5. Asegúrate de que la licencia del dron siga activa (**Aplicación → Gestor de Licencias**).

## Comprobación 2: se requiere volver a emparejar

Fleet Manager cambió la forma en que se conectan los drones, y los UAV emparejados antes de ese cambio deben emparejarse una vez más. No se pierde nada: el UAV conserva su nombre e historial, y no necesitas eliminarlo en Fleet Manager.

1. En UAVcast-Pro del dron, abre **Fleet Management** y pulsa **Disconnect from Fleet**, y luego confirma.
2. Pulsa **Connect to Fleet Manager**. Aparecerá un **Pairing Code** de 8 dígitos con una cuenta regresiva.
3. En Fleet Manager, ve a **Fleet → Pair Device**, elige la organización e introduce el código.

## Comprobación 3: el dron perdió su emparejamiento

Reinstalar con un restablecimiento de la base de datos, **Reiniciar Base de Datos** o **Disconnect from Fleet** elimina el emparejamiento del dron, y deja de reportar. Vuelve a emparejarlo como en la comprobación 2. Emparejarlo en la misma organización reutiliza la entrada del UAV existente.

## Comprobación 4: en línea, pero sin telemetría

La posición, la batería y el modo de vuelo provienen del controlador de vuelo. Si el UAV está en línea pero esos campos están vacíos, UAVcast-Pro no puede escuchar al controlador de vuelo: consulta [Sin heartbeat de MAVLink](https://docs.uavmatrix.com/es/troubleshooting/no-mavlink-heartbeat/).

## ¿Sigue fuera de línea?

[Descarga los registros](https://docs.uavmatrix.com/es/troubleshooting/collect-logs/) del dron con **Todos los Registros** seleccionado, y envíalos a **[support@uavmatrix.com](mailto:support@uavmatrix.com)** junto con el nombre del UAV y la organización. Más problemas de Fleet Manager se explican en [Solución de problemas de Fleet Manager](https://docs.uavmatrix.com/es/fleet-manager/troubleshooting/).

Relacionado: [Emparejamiento de Fleet Manager en UAVcast-Pro](https://docs.uavmatrix.com/es/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/es/troubleshooting/drone-offline-fleet-manager/
