# La licencia de UAVcast-Pro no se activa

> Corrige Clave de licencia no válida, Se alcanzó el máximo de activaciones y Error de activación de la licencia en UAVcast-Pro: la clave, internet, los espacios libres y el hardware reemplazado.

Introduces la clave en **Aplicación → Gestor de Licencias**, pulsas **Validar** y obtienes un error en lugar de **Licencia activada con éxito**. Mientras no haya una licencia activa en este dispositivo, todas las páginas te devuelven a **Aplicación**.

> Necesitas una licencia de UAVcast-Pro para activar el dron. Cómprala en la tienda de UAVmatrix.
>
> [Comprar UAVcast-Pro](https://uavmatrix.com/es/checkout) · [Ver planes y precios](https://uavmatrix.com/es/products)

![Página Aplicación con el Gestor de Licencias: campo de clave de licencia, Detalles de la Licencia y la tabla de Dispositivos Activados](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/application--license-activated.webp)

*Aplicación → Gestor de Licencias en un dispositivo activado: Detalles de la Licencia y la tabla de Dispositivos Activados, con este dispositivo marcado como Actual.*

| Lo que ves | Causa probable | Empieza en |
| --- | --- | --- |
| Clave de licencia no válida, o formato de clave no válido | Error de escritura, espacios de más, o una clave de otro producto | [Verificación 1](https://docs.uavmatrix.com/es/troubleshooting/license-activation-failed/#check-1) |
| Se alcanzó el máximo de activaciones | Todos los espacios de dispositivo de la clave están en uso | [Verificación 2](https://docs.uavmatrix.com/es/troubleshooting/license-activation-failed/#check-2) |
| Funcionaba antes, pero vuelve a pedir activación tras una tarjeta SD o placa nueva | El dispositivo cuenta como uno nuevo | [Verificación 3](https://docs.uavmatrix.com/es/troubleshooting/license-activation-failed/#check-3) |
| Error de activación de la licencia, o no pasa nada | Sin internet, o la hora incorrecta en el dispositivo | [Verificación 4](https://docs.uavmatrix.com/es/troubleshooting/license-activation-failed/#check-4) |
| No se puede conectar con el servicio de licencias | El servicio en segundo plano de UAVcast-Pro no está en ejecución | [Verificación 5](https://docs.uavmatrix.com/es/troubleshooting/license-activation-failed/#check-5) |
| Estado de la Licencia: Vencida | Una licencia por tiempo limitado venció | [Verificación 6](https://docs.uavmatrix.com/es/troubleshooting/license-activation-failed/#check-6) |

## Comprobación 1: la clave en sí

1. Copia la clave de tu correo de pedido o de tu cuenta en [uavmatrix.com](https://uavmatrix.com/), y pégala en el campo **Clave de Licencia**. Escribirla a mano es la fuente de errores más común.
2. Asegúrate de que no haya espacios antes ni después de la clave.
3. Pulsa **Validar**.

## Comprobación 2: libera un espacio de dispositivo

Cada licencia permite un número fijo de dispositivos (**Dispositivos Permitidos**). Cuando **Dispositivos Restantes** es 0, la activación falla con **Se alcanzó el máximo de activaciones. Desactiva otro dispositivo primero o mejora tu licencia.**

1. En cualquier dispositivo donde la licencia esté activa, abre **Aplicación → Gestor de Licencias → Dispositivos Activados**.
2. Busca el dispositivo que ya no uses y pulsa **Desregistrar**. El espacio se libera de inmediato.
3. Activa el nuevo dispositivo.

Si no puedes acceder a ningún dispositivo activado, contacta a **[support@uavmatrix.com](mailto:support@uavmatrix.com)** con la clave de licencia y podrán liberar un espacio. Para añadir espacios, compra más dispositivos para la licencia en [uavmatrix.com](https://uavmatrix.com/).

## Comprobación 3: cambiaste la tarjeta SD o la placa

La licencia está vinculada al hardware, incluido el dispositivo de almacenamiento. Una tarjeta SD nueva, un SSD nuevo o una placa nueva cuentan como dispositivo nuevo y ocupan un espacio. Desregistra la entrada anterior en **Dispositivos Activados**, antes o después de cambiar, como en la comprobación 2. **La licencia ya está activada en este dispositivo** no es un error: la clave ya estaba activa aquí.

## Comprobación 4: acceso a internet y hora

La activación se conecta al servidor de licencias de UAVmatrix por HTTPS (puerto 443), así que el dispositivo necesita internet funcionando en ese momento.

1. En el dispositivo, ejecuta `curl -I https://uavmatrix.com`. Deberías obtener una respuesta HTTP, no un tiempo de espera.
2. Si usas un módem celular, verifica que realmente tenga internet: [Módem conectado, sin internet](https://docs.uavmatrix.com/es/troubleshooting/modem-no-internet/).
3. Revisa la fecha con `date`. Un dispositivo con el reloj incorrecto no puede abrir conexiones HTTPS. Las placas sin reloj en tiempo real toman la hora de internet después del arranque, así que espera un minuto tras el arranque y vuelve a intentar.

## Comprobación 5: no se puede conectar con el servicio de licencias

Este mensaje significa que la interfaz web no puede llegar al servicio en segundo plano de UAVcast-Pro, no a internet. Reinícialo y vuelve a intentar:

```bash
sudo systemctl restart uavcast-factory
sudo systemctl status uavcast-factory
```

Si no se mantiene en **active (running)**, [recopila los registros](https://docs.uavmatrix.com/es/troubleshooting/collect-logs/) con **Gestor de Licencias** seleccionado.

## Comprobación 6: licencia vencida

Los detalles de la licencia muestran **Estado de la Licencia:** y **Fecha de Expiración:**. Una licencia vencida debe renovarse en [uavmatrix.com](https://uavmatrix.com/).

> **Sistema operativo de 64 bits**
>
> UAVcast-Pro v6 solo se ejecuta en un SO de 64 bits. Si llegaste hasta aquí, el SO está bien; en un SO de 32 bits, el instalador ya se detiene con *No installation candidate*.

## ¿Sigue fallando?

[Descarga los registros](https://docs.uavmatrix.com/es/troubleshooting/collect-logs/) con **Gestor de Licencias** seleccionado. Contienen el código de respuesta del servidor de licencias, por ejemplo `code 550` para la falta de espacios libres. Envíalos junto con los primeros y últimos cuatro caracteres de tu clave a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

¿Usas Fleet Manager? Una licencia que se activa bien aún puede ser rechazada al emparejar. Consulta [Código de emparejamiento no válido o vencido](https://docs.uavmatrix.com/es/troubleshooting/pairing-code-invalid/).

Relacionado: [Activa tu licencia](https://docs.uavmatrix.com/es/get-started/license-activation/)

Source: https://docs.uavmatrix.com/es/troubleshooting/license-activation-failed/
