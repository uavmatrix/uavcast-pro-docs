# Video entrecortado, con retraso o gris por 4G

> Corrige el video entrecortado, las manchas grises y el retraso de UAVcast-Pro sobre LTE o VPN ajustando la tasa de bits, la resolución, los FPS y la Tasa de Recuperación del Stream según el enlace.

La imagen llega, pero se entrecorta, se congela, muestra bloques grises o va con segundos de retraso. Casi siempre el stream pide más de lo que el enlace puede transportar, o el codificador envía los fotogramas clave con muy poca frecuencia para recuperarse de los paquetes perdidos.

| Lo que ves | Causa probable | Empieza en |
| --- | --- | --- |
| Manchas grises o verdes que se limpian después de uno o dos segundos | Paquetes perdidos y muy pocos fotogramas clave para recuperarse | [Verificación 2](https://docs.uavmatrix.com/es/troubleshooting/choppy-or-delayed-video/#check-2) |
| Fluido por Wi-Fi, pero se entrecorta o se congela por LTE | Tasa de bits superior a lo que transporta el enlace celular | [Verificación 1](https://docs.uavmatrix.com/es/troubleshooting/choppy-or-delayed-video/#check-1) |
| Se entrecorta incluso en la red local | Límite de CPU en el dron, o la GCS no puede decodificar lo bastante rápido | [Verificación 3](https://docs.uavmatrix.com/es/troubleshooting/choppy-or-delayed-video/#check-3) |
| El video va con segundos de retraso respecto al dron | Estás viendo la vista previa del navegador, o la GCS almacena en búfer | [Verificación 4](https://docs.uavmatrix.com/es/troubleshooting/choppy-or-delayed-video/#check-4) |

## Comprobación 1: reduce la tasa de bits y la resolución

Un enlace celular de subida es mucho más lento que su velocidad de descarga y cambia a medida que el dron se mueve entre celdas. Empieza con valores bajos y súbelos poco a poco.

1. Ve a **Cámara → Ajustes de cámara**.
2. Establece **Resolución** en 1280×720 o menos.
3. Establece **Seleccionar FPS** en 15 o 20.
4. Mueve el control deslizante **Tasa de bits:** a aproximadamente 1000–1500 kbps. `0` significa automático.
5. Los ajustes se guardan a medida que los cambias, y la cámara los aplica.
6. Vuela, o conduce, la ruta que te interesa. Si se mantiene estable, sube un valor a la vez.

![Tarjeta Configuración de Cámara con Resolución, Seleccionar FPS, Tasa de bits y Tasa de Recuperación del Stream](https://docs.uavmatrix.com/es/img/screenshots/uavcast-pro/camera--settings.webp)

*Cámara → Configuración de Cámara: Resolución, Seleccionar FPS, Tasa de bits y Tasa de Recuperación del Stream son los valores que conviene ajustar según el enlace de subida.*

> **¿Cuánto transporta el enlace?**
>
> **Tablero → Tráfico de Red** muestra la tasa TX en vivo por interfaz. Si la interfaz del módem se mantiene en el mismo techo sin importar la tasa de bits que definas, ese techo es tu enlace de subida.

## Comprobación 2: configura una Tasa de Recuperación del Stream más rápida

Las manchas grises provienen de paquetes perdidos. El decodificador solo puede reparar la imagen en el siguiente fotograma clave. **Tasa de Recuperación del Stream** define con qué frecuencia se envían los fotogramas clave.

1. En **Cámara → Ajustes de cámara**, busca **Tasa de Recuperación del Stream**.
2. Mueve el control deslizante desde **Auto** hacia **Ultra rápida**: menos cuadros entre fotogramas clave repara la imagen más pronto, pero usa más ancho de banda. Hacia **Ahorro de ancho de banda** ahorra ancho de banda, pero se recupera con lentitud. La sugerencia debajo del control deslizante (por ejemplo *Compatible con VPN/WiFi*) indica para qué es adecuada cada posición.
3. Guarda y compara. Si el enlace es muy lento, combina una tasa de recuperación más rápida con una tasa de bits más baja (comprobación 1).

En **Auto**, UAVcast-Pro envía un fotograma clave por segundo (uno cada *FPS* cuadros, o cada 30 cuadros cuando los FPS están en automático).

## Comprobación 3: revisa la carga de la CPU

UAVcast-Pro codifica H.264 por software. En una Raspberry Pi Zero 2 W, o con dos cámaras transmitiendo a la vez, la CPU puede quedarse sin capacidad.

1. Abre **Cámara → Ajustes de cámara** y revisa la tarjeta **Carga del sistema**.
2. Si dice **La CPU está cerca de su límite. Reduce la resolución o la tasa de bits.**, haz exactamente eso.
3. Con **Doble stream** activado, reduce la resolución o la tasa de bits de un stream, o desactiva el segundo stream.
4. Revisa el **Tablero** para ver **Reducida la velocidad (calor o energía)** en **Power supply**. Una CPU limitada codifica más lento. Consulta [Subtensión y limitación](https://docs.uavmatrix.com/es/troubleshooting/undervoltage-and-throttling/).

## Comprobación 4: sabe qué stream estás viendo

La **Vista Previa en Vivo** del navegador y la ventana de video en el **Mapa de Vuelo** pasan por el servidor de medios integrado, que añade retraso. Sirven para la configuración, no para volar. El stream hacia tu estación de control en tierra va directamente por UDP y tiene una latencia mucho menor.

Si la estación de control en tierra en sí presenta retraso:

- En QGroundControl, verifica que el modo de baja latencia esté activado en los ajustes de video.
- En las canalizaciones de GStreamer, usa `sync=false` en el sumidero de video, como en el [comando de prueba](https://docs.uavmatrix.com/es/troubleshooting/no-video-in-gcs/#check-5).
- Por VPN, asegúrate de que ZeroTier o Tailscale lleguen directamente al dron y no a través de un relé. Tailscale muestra el relé en uso bajo **Relé**, en la página de **Red Privada Virtual**.

## Comprobación 5: revisa la señal celular

Ve a **Módem** y revisa **Calidad de la Señal** y **Tecnología** en **Información del Módem**. Una señal débil, o una caída de LTE a 3G, reduce el enlace de subida. Aleja el módem del controlador de vuelo, de los ESC y de los cables de alimentación, o usa un módem con antenas externas.

## ¿Sigue entrecortado?

[Descarga los registros](https://docs.uavmatrix.com/es/troubleshooting/collect-logs/) (**Servidor de Cámara**, últimos 30 minutos) y envíalos a **[support@uavmatrix.com](mailto:support@uavmatrix.com)** junto con el modelo de tu cámara, la resolución, los FPS, la tasa de bits y el tipo de enlace con el que vuelas.

Relacionado: [Ajustes de cámara](https://docs.uavmatrix.com/es/uavcast-pro/camera/) · [Módem celular](https://docs.uavmatrix.com/es/uavcast-pro/connectivity/cellular-modem/)

Source: https://docs.uavmatrix.com/es/troubleshooting/choppy-or-delayed-video/
