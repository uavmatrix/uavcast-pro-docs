# Áudio

> Adicione som de um microfone USB ou do microfone integrado de uma webcam à pré-visualização ao vivo do UAVcast-Pro e envie-o às estações de controle terrestre como um fluxo RTP/Opus na Porta de Vídeo + 2.

O UAVcast-Pro pode adicionar som de um microfone USB ou do microfone integrado de uma câmera USB. O áudio é codificado em Opus, que consome pouca CPU e pouca largura de banda. Ele sempre toca na pré-visualização ao vivo, e você também pode enviá-lo às suas estações de controle terrestre como um fluxo RTP separado. Encontre-o no cartão **Áudio** em **Câmera → Configurações da câmera**.

## Ativar o áudio

1. Conecte um microfone USB ou use uma webcam com microfone integrado.
2. Em **Câmera → Configurações da câmera**, ative **Áudio**.
3. Deixe o **Dispositivo de áudio** em **Automático (microfone da câmera, se houver)** ou escolha um dispositivo. Use **Tom de teste (não precisa de microfone)** para testar o caminho sem microfone.
4. Observe o indicador. **Áudio ao vivo** com um medidor de nível em movimento significa que o som está sendo capturado.
5. Em **Visualização ao Vivo**, desative o mudo do player. Os navegadores iniciam a pré-visualização sem som.

![Cartão de áudio na página Câmera com a chave Áudio desligada e o status Áudio desativado](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/camera--audio.webp)

*Câmera → Áudio, desligado. Ligue para escolher o microfone e a taxa de bits.*

Um microfone com falha nunca interrompe o vídeo. O indicador mostra **Erro de áudio** com o motivo.

## Enviar áudio às estações de controle terrestre

Ative **Enviar áudio para as estações de solo**. O UAVcast-Pro então envia um fluxo RTP/Opus separado para cada estação de controle terrestre que recebe vídeo, na **Porta de Vídeo + 2** desse destino. Com a porta de vídeo padrão, isso é `5602`. Dois destinos no mesmo computador precisam, portanto, de portas de vídeo com pelo menos 3 de diferença, por exemplo `5600` e `5603`.

QGroundControl e Mission Planner ignoram o áudio. Reproduza-o com o GStreamer:

```bash
gst-launch-1.0 udpsrc port=5602 caps="application/x-rtp, media=(string)audio, clock-rate=(int)48000, encoding-name=(string)OPUS, payload=(int)97" ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

O fluxo é Opus a 48 kHz, com tipo de payload RTP 97. O VLC pode reproduzi-lo com um arquivo SDP que descreva esses valores.

## Referência de configurações

| Configuração | Padrão | Valores | Observações |
| --- | --- | --- | --- |
| **Áudio** | Desativado | Ativado, desativado | Alterar qualquer configuração de áudio reinicia o serviço da câmera. |
| **Dispositivo de áudio** | **Automático (microfone da câmera, se houver)** | Automático, dispositivos de captura detectados, **Tom de teste (não precisa de microfone)** | Um dispositivo salvo que estiver desconectado aparece como *(não conectado)*. |
| **Taxa de Bits** | `64 kbps` | 24, 32, 48, 64, 96, 128 kbps | De 32 a 64 kbps é mais que suficiente para voz e ruído de motor. |
| **Enviar áudio para as estações de solo** | Desativado | Ativado, desativado | RTP/Opus para a Porta de Vídeo + 2 em cada destino com vídeo ativado. |

## Solução de problemas

- *Nenhum dispositivo de captura de áudio encontrado*: conecte um microfone USB ou uma câmera com microfone integrado. No drone, `arecord -l` lista os dispositivos de captura.
- **Sem sinal**: o dispositivo está aberto, mas em silêncio. Verifique a chave de mudo do microfone ou tente o **Tom de teste**.
- Áudio na pré-visualização, mas não na estação de controle terrestre: confirme que **Enviar áudio para as estações de solo** está ativado, que o destino tem **Ativar Vídeo** ligado e que seu receptor escuta na Porta de Vídeo + 2.

Source: https://docs.uavmatrix.com/pt/uavcast-pro/camera/audio/
