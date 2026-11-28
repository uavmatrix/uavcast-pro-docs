# DNS dinámico

> Mantén un nombre de host apuntando a la IP pública cambiante de tu dron con el DNS dinámico de UAVcast-Pro (No-IP, DynDNS, DuckDNS o una URL genérica), y cuándo una VPN es la mejor opción.

El DNS dinámico mantiene un nombre de host, como `mydrone.ddns.net`, apuntando a la dirección IP pública actual del dron. UAVcast-Pro comprueba la IP pública cada 5 minutos y actualiza tu proveedor de DNS cuando cambia. Abre **DNS Dinámico** en la barra lateral.

> **La mayoría de los enlaces celulares necesitan una VPN**
>
> El DNS dinámico solo sirve si la IP pública del dron puede recibir conexiones entrantes. La mayoría de los operadores móviles colocan las SIM detrás de un NAT a nivel de operador, así que la IP pública pertenece al operador, no a tu dron. Usa una [VPN](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/vpn/) a menos que tu SIM tenga una dirección IP pública (a menudo "estática" o "M2M").

El DNS dinámico no cambia a dónde envía UAVcast-Pro la telemetría y el video: estos siempre van a las direcciones IP de las [Estaciones de Control en Tierra](https://docs.uavmatrix.com/es/uavcast-pro/ground-stations/). Sirve para acceder a la interfaz web del dron o a SSH desde el exterior.

## Configurarlo

1. Crea un nombre de host con tu proveedor de DNS (No-IP, DynDNS o DuckDNS).
2. En UAVcast-Pro, ve a **DNS Dinámico**. Pon **¿Habilitar DNS Dinámico?** en **Sí**.
3. Elige tu **Sistema DNS**.
4. Introduce el nombre de usuario de tu cuenta (el campo se llama **Configuración de DNS Dinámico**), tu **Contraseña** y el nombre de host en **Alias**. Para DuckDNS, pon tu token en el campo de usuario y cualquier valor en **Contraseña** (el formulario lo exige, pero DuckDNS lo ignora). Los campos se guardan al salir de cada uno.
5. Selecciona **Conectar** para iniciar el actualizador. Envía la IP actual de inmediato y después comprueba cada 5 minutos. **Desconectar** lo detiene.

![Gestor de DNS Dinámico con Habilitar DNS Dinámico en No, campos de usuario, contraseña y alias vacíos, y Sistema DNS en noip](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/dynamic-dns.webp)

*Gestor de DNS Dinámico antes de habilitarlo.*

## Referencia de ajustes

| Ajuste | Predeterminado | Valores | Notas |
| --- | --- | --- | --- |
| **¿Habilitar DNS Dinámico?** | **No** | **Sí**, **No** |  |
| **Sistema DNS** | **No-IP** | **No-IP**, **DynDNS**, **DuckDNS**, **Genérico** |  |
| **URL de DNS** | vacío | URL de actualización | Solo para **Genérico**. La URL de actualización compatible con DynDNS del proveedor. |
| **Configuración de DNS Dinámico** (usuario) | vacío |  | Tu nombre de usuario de la cuenta DNS, o tu token para DuckDNS. La interfaz denomina este campo de forma confusa; en realidad es el nombre de usuario. |
| **Contraseña** | vacío |  | Tu contraseña de la cuenta DNS. Obligatoria en el formulario; ignorada en DuckDNS. |
| **Alias** | vacío | nombre de host | El nombre de host a actualizar, por ejemplo `mydrone.ddns.net`. |
| Intervalo de actualización | 5 minutos | fijo |  |

La fila **DNS Dinámico** del [Tablero](https://docs.uavmatrix.com/es/uavcast-pro/dashboard/) muestra si el actualizador está en ejecución. Los **Registros de Acción** muestran cada actualización y la respuesta del proveedor.

Source: https://docs.uavmatrix.com/es/uavcast-pro/connectivity/dynamic-dns/
