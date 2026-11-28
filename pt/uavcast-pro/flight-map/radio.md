# Aba Rádio

> Veja valores PWM dos canais RC em tempo real e o RSSI do controlador de voo na aba Rádio do UAVcast-Pro, para conferir as chaves do transmissor e a troca de câmeras RC.

A aba Rádio mostra a entrada RC que o controlador de voo recebe do seu transmissor: o valor PWM de cada canal e o RSSI (intensidade do sinal). Use-a para conferir a atribuição das chaves, por exemplo o canal que você usa para a [troca de câmeras RC](https://docs.uavmatrix.com/pt/uavcast-pro/camera/multi-camera/), sem precisar conectar uma estação de controle terrestre. Abra **Mapa de Voo → Rádio**.

![Aba Rádio com o indicador RSSI, os quatro canais principais e os canais auxiliares, todos em 0](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/flight-map--radio.webp)

*Mapa de Voo → Rádio em uma bancada sem receptor RC, por isso todos os canais mostram 0.*

## O que você vê

- **RSSI**: a intensidade do sinal do receptor, vinda do controlador de voo, classificada como **Sem Sinal**, **Fraco**, **Razoável**, **Bom** ou **Excelente**. É preciso configurar o RSSI no controlador de voo (`RSSI_TYPE` no ArduPilot).
- **Controles Principais**: **Canal 1 - Roll**, **Canal 2 - Pitch**, **Canal 3 - Acelerador** e **Canal 4 - Yaw**, no layout do Mission Planner.
- **Canais Auxiliares**: os demais canais.

Os valores PWM normalmente variam de 1000 (mín.) a 2000 (máx.). Um canal que nunca se move significa que ele não está mapeado no transmissor ou que o receptor não o envia.

Os valores vêm da mensagem `RC_CHANNELS` do controlador de voo, por isso só são atualizados enquanto a conexão com o controlador de voo estiver **Conectado**.

Source: https://docs.uavmatrix.com/pt/uavcast-pro/flight-map/radio/
