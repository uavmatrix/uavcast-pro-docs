# Módem 4G conectado, pero sin internet

> ¿El módem LTE muestra señal y operador, pero el dron no tiene internet? Revisa el tipo de módem, el APN, el PIN y los datos de la SIM, la prioridad de red y la ruta predeterminada.

La página **Módem** muestra señal, un operador y quizá una dirección IP, pero el dron no puede llegar a internet: la VPN no se conecta, la licencia no se puede verificar y el video y la telemetría nunca llegan a la estación de control en tierra por LTE.

| Lo que ves | Causa probable | Empieza en |
| --- | --- | --- |
| No hay módem conectado | Linux no ve el módem, o le falta energía | [Verificación 1](https://docs.uavmatrix.com/es/troubleshooting/modem-no-internet/#check-1) |
| Error que menciona un módem HiLink, o no hay botón Conectar para un módem USB | Tipo de módem incorrecto | [Verificación 2](https://docs.uavmatrix.com/es/troubleshooting/modem-no-internet/#check-2) |
| Registrado en la red, pero sin dirección IPv4 | APN o PIN incorrectos, o sin datos en la SIM | [Verificación 3](https://docs.uavmatrix.com/es/troubleshooting/modem-no-internet/#check-3) |
| El módem tiene una dirección IP, pero el internet sigue saliendo por Wi-Fi | La prioridad de red favorece el Wi-Fi | [Verificación 4](https://docs.uavmatrix.com/es/troubleshooting/modem-no-internet/#check-4) |
| Funciona en casa, pero no en campo (o al revés) | Roaming, cobertura o una red doméstica en la subred del módem | [Verificación 5](https://docs.uavmatrix.com/es/troubleshooting/modem-no-internet/#check-5) |

![Página Módem de UAVcast-Pro con Tradicional (PPP) seleccionado y el panel No hay módem conectado](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/modem.webp)

*Página Módem con Tradicional (PPP) seleccionado y sin módem conectado. Con un módem conectado, la tarjeta de la derecha muestra la calidad de la señal, el estado, el operador y la información IPv4.*

## Comprobación 1: ¿se detecta el módem?

Si la página dice **No hay módem conectado**:

1. Verifica que la luz de energía del módem esté encendida y que esté bien insertado en un puerto USB.
2. Un módem puede consumir más corriente de la que suministra un puerto USB de Raspberry Pi. Observa la fila **Power supply** del tablero. Si dice **Voltaje bajo: usa una fuente de alimentación más potente**, corrige primero la energía: [Subtensión y limitación](https://docs.uavmatrix.com/es/troubleshooting/undervoltage-and-throttling/).
3. En la Pi, ejecuta `lsusb` para ver el módem, y `mmcli -L` para ver si ModemManager lo encontró. Un módem HiLink no aparece en `mmcli`; aparece como una interfaz de red en `ip addr`.

El módem aparece en la página por sí solo una vez que se detecta.

## Comprobación 2: elige el tipo de módem correcto

Hay dos tipos de módems USB, y **Tipo de módem** debe coincidir con el tuyo.

|  | **HiLink** | **Tradicional (PPP)** |
| --- | --- | --- |
| Cómo lo ve Linux | Un adaptador de red (el módem es un pequeño router) | Un módem administrado por ModemManager |
| Quién se conecta | El propio módem, automáticamente | UAVcast-Pro, con los botones **Conectar** y **Desconectar** |
| Ejemplo de Huawei | E3372**h** | E3372**s** |

Si eliges **Tradicional (PPP)** para un módem HiLink, el registro dice *Módem HiLink detectado … Cambia el tipo de módem a 'HiLink' en los ajustes.* Cambia **Tipo de módem** y el error desaparece.

## Comprobación 3: APN, PIN y SIM

Para un módem **Tradicional (PPP)**:

1. Deja **Nombre del Punto de Acceso (Opcional)** vacío al principio. UAVcast-Pro prueba entonces el APN predeterminado de tu red y los APN conocidos para la SIM, y recuerda el que funciona (*Se encontró un … que funciona; se usará desde ahora en adelante* en el registro).
2. Si eso falla, introduce el APN que te da tu operador para datos móviles. Algunos operadores también requieren **Nombre de usuario (Opcional)** y **Contraseña (Opcional)**.
3. Si la SIM tiene PIN, introdúcelo en **Código PIN (Opcional)**, o desactiva el PIN colocando la SIM en un teléfono. **Desbloqueo Requerido** en **Información del Módem** indica si la SIM está bloqueada.
4. Coloca la SIM en un teléfono y verifica que los datos móviles funcionen y que el plan tenga datos disponibles.

Para un módem **HiLink**, el APN se configura en la propia página web del módem, normalmente en `http://192.168.8.1`. Ábrela desde la Pi, o conecta el módem a una laptop.

> **UAVcast-Pro sigue intentando**
>
> Un módem tradicional se conecta al arrancar y se reconecta solo tras perder la señal. Si un módem se conecta sin obtener una dirección, UAVcast-Pro lo cambia al modo IP sin procesar (raw-IP) y vuelve a intentarlo. Espera un minuto después del arranque antes de cambiar los ajustes.

## Comprobación 4: haz del módem la ruta predeterminada

Si la Pi también está en Wi-Fi o Ethernet, el tráfico sale por la interfaz con prioridad, no necesariamente por el módem.

1. Ve a **Redes**.
2. En **Prioridad de Red**, elige **Prioridad Módem (Modo Exterior)** antes del vuelo. **Prioridad WiFi (Modo Interior)** ahorra datos celulares en casa, pero envía todo por Wi-Fi.
3. En **Interfaces de Red**, verifica que la interfaz del módem esté marcada como **Predeterminado** y que **Puerta de Enlace Predeterminada** muestre *via* la interfaz del módem.

![Página Redes con Prioridad de Red en Automático y la tabla de interfaces mostrando wlan0 como predeterminada](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/networks.webp)

*Página Redes con Automático (Predeterminado del Sistema) activo y Wi-Fi (wlan0) como ruta predeterminada. Selecciona Prioridad Módem (Modo Exterior) aquí para enrutar por el módem.*

Prueba desde la Pi solo por el módem:

```bash
ping -c 3 -I wwan0 1.1.1.1   # módem tradicional (el nombre de la interfaz puede variar)
ip route                     # la primera línea "default via" es la ruta en uso
```

## Comprobación 5: problemas solo en campo

- **Roaming**: una SIM usada en el extranjero puede necesitar que el operador habilite el roaming. Verifícalo con un teléfono que tenga la misma SIM.
- **Cobertura**: revisa **Calidad de la Señal** y **Tecnología**. Algunas SIM para IoT solo funcionan en ciertas bandas o tecnologías.
- **Conflicto de subred**: los módems HiLink asignan direcciones `192.168.8.x`. Si tu red doméstica u oficina también usa `192.168.8.0/24`, el enrutamiento se rompe. Cambia la LAN o la subred del módem.

## ¿Sigue sin internet?

[Descarga los registros](https://docs.uavmatrix.com/es/troubleshooting/collect-logs/) con **Gestor de Módem** seleccionado, añade la salida de `mmcli -m 0` y `ip route`, y envíalos a **[support@uavmatrix.com](mailto:support@uavmatrix.com)** junto con el modelo del módem y el operador.

Relacionado: [Módem celular](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/cellular-modem/) · [Redes](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/networks/)

Source: https://docs.uavmatrix.com/es/troubleshooting/modem-no-internet/
