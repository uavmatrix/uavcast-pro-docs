# GStreamer no macOS

> Instale o GStreamer em um Mac com Homebrew ou pacote oficial e reproduza o vídeo H.264 e o áudio Opus do drone UAVcast-Pro com gst-launch-1.0, além do aviso de firewall do macOS.

O GStreamer reproduz a transmissão de vídeo do UAVcast-Pro em uma janela a partir do Terminal. Use-o para testar o caminho do vídeo, assistir a uma segunda câmera ao lado do QGroundControl ou ouvir o áudio. Funciona em Macs com Apple silicon e Intel.

## Antes de começar

No drone, adicione um destino em [Estações de Controle Terrestre](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/) com o endereço IP deste Mac (**Ajustes do Sistema → Rede**; use o endereço VPN em 4G) e com **Ativar Vídeo** ativado.

## Instalar o GStreamer

**Homebrew**

```bash
brew install gstreamer
```

A fórmula do Homebrew inclui os conjuntos de plugins base, good, bad, ugly e libav, por isso `avdec_h264` está presente.

**Pacote oficial**

1. Baixe o pacote de **runtime** para macOS em [gstreamer.freedesktop.org/download](https://gstreamer.freedesktop.org/download/) e instale-o.

2. Adicione-o ao seu PATH no Terminal:

   ```bash
   echo 'export PATH="/Library/Frameworks/GStreamer.framework/Versions/1.0/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

Verifique a instalação com `gst-launch-1.0 --version` e o decodificador H.264 com `gst-inspect-1.0 avdec_h264` (ele mostra os detalhes do elemento; *No such element or plugin* significa que ele está ausente).

## Reproduzir o vídeo

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Na primeira vez, o macOS pergunta se o `gst-launch-1.0` pode aceitar conexões de rede de entrada. Selecione **Permitir**. Uma janela abre quando o primeiro keyframe chega; pressione **Ctrl+C** no Terminal para parar.

> **O que você deve ver**
>
> 1. O terminal exibe `Setting pipeline to PLAYING ...` e aguarda o vídeo.
> 2. Quando os primeiros pacotes chegam, `-v` imprime linhas contendo `caps = application/x-rtp`.
> 3. Uma janela de vídeo abre com a imagem da câmera.
>
> Se parar após o passo 1, nenhum vídeo chega a este computador: veja a tabela de solução de problemas abaixo.

- **Câmera 2** em [transmissão dupla](https://docs.uavmatrix.com/pt/uavcast-pro/camera/multi-camera/): execute novamente com `port=5601`.
- **Menor latência** em um link bom: substitua `rtpjitterbuffer` por `rtpjitterbuffer latency=0`.
- Se nenhuma janela aparecer mesmo com pacotes chegando, substitua `autovideosink` por `osxvideosink`.

## Ouvir o áudio

```bash
gst-launch-1.0 udpsrc port=5602 caps="application/x-rtp, media=(string)audio, clock-rate=(int)48000, encoding-name=(string)OPUS, payload=(int)97" ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

O áudio precisa de **Áudio** e **Enviar áudio para as estações de solo** ativados na página **Câmera** do drone.

## Solução de problemas

| Mensagem ou sintoma | Solução |
| --- | --- |
| *command not found: gst-launch-1.0* | Homebrew: execute `brew doctor`. Pacote oficial: adicione a pasta `bin` do framework ao PATH, como mostrado acima. |
| *no element "avdec_h264"* | O plugin libav está ausente. Reinstale com o Homebrew ou instale o pacote de runtime oficial completo. |
| Executa, mas sem janela | Nada chega. Verifique o IP de destino, **Ativar Vídeo** e se você permitiu conexões de entrada (**Ajustes do Sistema → Rede → Firewall → Opções**). |
| Erro de bind ao iniciar | O QGroundControl ou outro GStreamer já usa a porta. Feche-o. |

Source: https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/gstreamer-macos/
