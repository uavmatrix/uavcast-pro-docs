# GStreamer no Linux

> Instale o GStreamer no Ubuntu, Debian ou Fedora e reproduza o vídeo H.264 e o áudio Opus do drone UAVcast-Pro com gst-launch-1.0, incluindo segunda câmera, baixa latência e ufw.

O GStreamer reproduz a transmissão de vídeo do UAVcast-Pro em uma janela com um único comando. Use-o para testar o caminho do vídeo, assistir a uma segunda câmera ou ouvir o áudio. Funciona em qualquer Linux de desktop, incluindo um Raspberry Pi usado como estação de controle terrestre.

## Antes de começar

No drone, adicione um destino em [Estações de Controle Terrestre](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/) com o endereço IP deste computador (`ip -4 addr`; use o endereço VPN em 4G) e com **Ativar Vídeo** ativado.

## Instalar o GStreamer

**Ubuntu / Debian / Raspberry Pi OS**

```bash
sudo apt update
sudo apt install gstreamer1.0-tools gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-libav
```

`gstreamer1.0-libav` fornece o decodificador H.264 (`avdec_h264`). Sem ele, o comando abaixo falha.

**Fedora**

```bash
sudo dnf install gstreamer1 gstreamer1-plugins-good gstreamer1-plugins-bad-free gstreamer1-plugin-libav
```

Os repositórios próprios do Fedora deixam de fora a maior parte do suporte a H.264 por razões de patente, então `avdec_h264` pode continuar ausente depois disso. Se a verificação abaixo falhar, ative o [RPM Fusion](https://rpmfusion.org/) e siga o guia de multimídia dele para obter as bibliotecas completas de codecs.

Verifique se o decodificador H.264 está instalado:

```bash
gst-inspect-1.0 avdec_h264
```

Ele mostra os detalhes do elemento. *No such element or plugin* significa que o decodificador está ausente.

## Reproduzir o vídeo

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Uma janela abre quando o primeiro keyframe chega. Pressione **Ctrl+C** para parar.

> **O que você deve ver**
>
> 1. O terminal exibe `Setting pipeline to PLAYING ...` e aguarda o vídeo.
> 2. Quando os primeiros pacotes chegam, `-v` imprime linhas contendo `caps = application/x-rtp`.
> 3. Uma janela de vídeo abre com a imagem da câmera.
>
> Se parar após o passo 1, nenhum vídeo chega a este computador: veja a tabela de solução de problemas abaixo.

- **Câmera 2** em [transmissão dupla](https://docs.uavmatrix.com/pt/uavcast-pro/camera/multi-camera/): execute novamente com `port=5601`.
- **Menor latência** em um link bom: substitua `rtpjitterbuffer` por `rtpjitterbuffer latency=0`. Mantenha o padrão em 4G.

## Ouvir o áudio

Com **Enviar áudio para as estações de solo** ativado, o áudio chega na Porta de Vídeo + 2:

```bash
gst-launch-1.0 udpsrc port=5602 caps="application/x-rtp, media=(string)audio, clock-rate=(int)48000, encoding-name=(string)OPUS, payload=(int)97" ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

## Firewall

A maioria das distribuições de desktop não bloqueia UDP de entrada. Se o `ufw` estiver ativo:

```bash
sudo ufw allow 5600:5602/udp
sudo ufw allow 14550/udp
```

## Solução de problemas

| Mensagem ou sintoma | Solução |
| --- | --- |
| *no element "avdec_h264"* | Instale `gstreamer1.0-libav`. |
| *no element "rtph264depay"* | Instale `gstreamer1.0-plugins-good`. |
| Executa, mas sem janela | Nada chega. Verifique o IP de destino no drone, **Ativar Vídeo** e o firewall. `sudo tcpdump -ni any udp port 5600` mostra se os pacotes chegam ao computador. |
| Erro de bind ao iniciar | Outro programa (QGroundControl, outro GStreamer) escuta a porta. Feche-o. |
| A janela abre, mas a imagem fica cinza e borrada | Perda de pacotes. Reduza a taxa de bits no drone e defina **Taxa de Recuperação do Stream** para 15–30 quadros. |

Source: https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/gstreamer-linux/
