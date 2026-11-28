# Cámara no detectada

> ¿UAVcast-Pro muestra No hay cámaras disponibles? Revisa el cable plano CSI, rpicam-hello, la compatibilidad de cámaras en Ubuntu y v4l2-ctl para cámaras USB.

**Cámara → Ajustes de cámara** muestra **No hay cámaras disponibles** en **Seleccionar Cámara**, la cámara que necesitas no aparece en la lista, o los **Registros de Acción** dicen *No se detectó ninguna cámara*.

| Lo que ves | Causa probable | Empieza en |
| --- | --- | --- |
| Falta una cámara CSI de Raspberry Pi (cable plano) | Cable, conector o la pila de la cámara | [Verificación 1](https://docs.uavmatrix.com/es/troubleshooting/camera-not-detected/#check-1) |
| Cámara CSI en Ubuntu | Ubuntu no incluye la pila de cámaras de Raspberry Pi por defecto | [Verificación 2](https://docs.uavmatrix.com/es/troubleshooting/camera-not-detected/#check-2) |
| Falta una cámara USB | Linux no la ve, o no es un dispositivo de captura de video | [Verificación 3](https://docs.uavmatrix.com/es/troubleshooting/camera-not-detected/#check-3) |
| La cámara aparece en la lista, pero el video nunca inicia | Resolución no compatible o otro programa la tiene en uso | [Verificación 4](https://docs.uavmatrix.com/es/troubleshooting/camera-not-detected/#check-4) |

## Comprobación 1: cámara CSI de Raspberry Pi

1. Apaga la Pi. Vuelve a colocar el cable plano en ambos extremos, con los contactos orientados correctamente, y cierra los seguros del conector. Una Pi 5 y una Pi Zero 2 W necesitan el cable más estrecho de 22 pines.

2. Arranca la Pi y ejecuta esto en ella:

   ```bash
   rpicam-hello --list-cameras
   ```

   En las imágenes antiguas de Raspberry Pi OS, el comando es `libcamera-hello --list-cameras`.

3. Si la cámara no aparece aquí, Linux no puede verla. Prueba con otro cable o cámara antes de cambiar algo en UAVcast-Pro.

4. Si aparece, reinicia la cámara desde la página de Cámara (**Reiniciar**, o **Detener** y luego **Iniciar**) y vuelve a abrir **Seleccionar Cámara**. Cada cámara CSI aparece como una entrada propia, por ejemplo *CSI Camera 0 - imx708 (libcamera)*.

> **Dos cámaras CSI**
>
> Para dos cámaras, el controlador de la cámara necesita más memoria. Desde la v6.2.2, el instalador aumenta automáticamente la memoria CMA en `config.txt` para configuraciones con varias cámaras. Reinicia después de instalar si añadiste la segunda cámara más tarde.

## Comprobación 2: cámara CSI en Ubuntu o Debian

UAVcast-Pro usa `rpicam-vid` para las cámaras CSI. El instalador instala `rpicam-apps` (o `rpicam-apps-core`) en Raspberry Pi OS y Debian. En Ubuntu, la pila de cámaras de Raspberry Pi no está empaquetada, y el registro dice *Cámara CSI no disponible: Ubuntu requiere compilar libcamera desde el código fuente. Las cámaras USB son compatibles.*

Usa Raspberry Pi OS de 64 bits si necesitas una cámara CSI, o usa una cámara USB en Ubuntu.

## Comprobación 3: cámara USB

1. Conecta la cámara directamente a la computadora de a bordo, no a través de un hub sin alimentación.

2. Ejecuta:

   ```bash
   v4l2-ctl --list-devices
   ```

3. Si la cámara no aparece, Linux no la ve. Revisa `lsusb` y prueba con otro puerto y otro cable.

4. Si aparece, reinicia la cámara con **Reiniciar** en la página de Cámara y vuelve a abrir **Seleccionar Cámara**.

La mayoría de las webcams UVC funcionan, por ejemplo la Logitech C920 y la C615. No aparecen las cámaras que solo entregan un formato que el codificador no acepta, ni los dispositivos que no son de captura de video (algunas tarjetas de captura).

## Comprobación 4: aparece en la lista, pero el video no inicia

- Si el registro dice *La cámara … no admite …x… - transmitiendo en …x… en su lugar*, elige en **Resolución** una resolución que la cámara admita.
- Cierra cualquier otro programa que use la cámara. Solo un programa puede abrirla a la vez.
- Si **¿Habilitar Cámara?** muestra *Permisos insuficientes*, actualiza a la v6.5.2 o posterior, que corrigió este problema.

## ¿Sigue sin detectarse?

[Descarga los registros](https://docs.uavmatrix.com/es/troubleshooting/collect-logs/) con **Todos los Registros** seleccionado, añade la salida de `rpicam-hello --list-cameras` o `v4l2-ctl --list-devices`, y envía todo a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Relacionado: [Ajustes de cámara](https://docs.uavmatrix.com/es/uavcast-pro/camera/) · [Hardware compatible](https://docs.uavmatrix.com/es/reference/supported-hardware/)

Source: https://docs.uavmatrix.com/es/troubleshooting/camera-not-detected/
