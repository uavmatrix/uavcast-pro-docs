# GStreamer no Windows

> Instale o GStreamer no Windows (MSVC 64 bits, Complete), adicione-o ao PATH e reproduza o vídeo H.264 e o áudio Opus do UAVcast-Pro com gst-launch-1.0 no PowerShell ou cmd. Firewall e correções.

O GStreamer reproduz a transmissão de vídeo do UAVcast-Pro em sua própria janela, sem precisar de um programa de estação de controle terrestre. Use-o para testar se o vídeo chega ao PC, para assistir a uma segunda câmera ao lado do Mission Planner ou do QGroundControl, ou para ouvir a faixa de áudio. A configuração leva cerca de cinco minutos.

## Antes de começar

No drone, adicione um destino em [Estações de Controle Terrestre](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/) com o endereço IP deste PC (`ipconfig` mostra o endereço; use o endereço VPN em 4G) e com **Ativar Vídeo** ativado.

## Passo 1: instalar o GStreamer

1. Acesse [gstreamer.freedesktop.org/download](https://gstreamer.freedesktop.org/download/) e baixe o instalador de **runtime** para Windows, versão **MSVC 64-bit** (não o instalador de desenvolvimento, nem o MinGW).
2. Execute-o e escolha **Complete** quando for pedido o tipo de instalação.
3. Anote a pasta de instalação. Instaladores mais recentes usam `C:\Program Files\gstreamer\1.0\msvc_x86_64`; os mais antigos, `C:\gstreamer\1.0\msvc_x86_64`.

> **Escolha Complete, não Typical**
>
> A instalação **Typical** deixa de fora o decodificador H.264 (`avdec_h264`). O comando abaixo então falha com *no element "avdec_h264"*. Execute o instalador novamente e escolha **Complete**.

## Passo 2: adicionar o GStreamer ao PATH

Para executar `gst-launch-1.0` de qualquer pasta, adicione a pasta `bin` ao PATH do seu usuário. No PowerShell (não são necessários direitos de administrador), com a sua pasta de instalação:

```powershell
$bin = "C:\Program Files\gstreamer\1.0\msvc_x86_64\bin"
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
[Environment]::SetEnvironmentVariable("Path", "$userPath;$bin", "User")
```

Feche e reabra o terminal e depois verifique:

```powershell
gst-launch-1.0 --version
```

Ou use as configurações do Windows: pesquise por **Editar as variáveis de ambiente para sua conta**, selecione **Path** → **Editar** → **Novo** e cole a pasta `bin`.

## Passo 3: reproduzir o vídeo

**PowerShell**

```powershell
gst-launch-1.0 -v udpsrc port=5600 'caps=application/x-rtp,media=video,clock-rate=90000,encoding-name=H264,payload=96' ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Mantenha as aspas simples em volta de `caps=…`: sem elas, o PowerShell divide o valor nas vírgulas.

**Prompt de Comando (cmd)**

```bat
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Uma janela abre assim que o primeiro keyframe chega. Feche-a ou pressione **Ctrl+C** no terminal para parar.

> **O que você deve ver**
>
> 1. O terminal exibe `Setting pipeline to PLAYING ...` e aguarda o vídeo.
> 2. Quando os primeiros pacotes chegam, `-v` imprime linhas contendo `caps = application/x-rtp`.
> 3. Uma janela de vídeo abre com a imagem da câmera.
>
> Se parar após o passo 1, nenhum vídeo chega a este computador: veja a tabela de solução de problemas abaixo.

Para a câmera 2 em [transmissão dupla](https://docs.uavmatrix.com/pt/uavcast-pro/camera/multi-camera/), execute o mesmo comando em um segundo terminal com `port=5601`.

### Variante de menor latência

Em um link bom, reduza o atraso do jitter buffer:

```powershell
gst-launch-1.0 udpsrc port=5600 'caps=application/x-rtp,media=video,clock-rate=90000,encoding-name=H264,payload=96' ! rtpjitterbuffer latency=0 ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Em 4G, mantenha o jitter buffer padrão (o primeiro comando); ele oculta pacotes atrasados.

### Atalho com duplo clique

Salve isto como `uavcast-video.cmd` na área de trabalho e clique duas vezes nele:

```bat
@echo off
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
pause
```

Se o GStreamer não estiver no PATH, adicione `cd /d "C:\Program Files\gstreamer\1.0\msvc_x86_64\bin"` como segunda linha.

## Ouvir o áudio

Ative **Áudio** e **Enviar áudio para as estações de solo** na página **Câmera** do drone. O áudio chega na Porta de Vídeo + 2:

```powershell
gst-launch-1.0 udpsrc port=5602 'caps=application/x-rtp,media=audio,encoding-name=OPUS,clock-rate=48000,payload=97' ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

## Permitir no firewall

Na primeira vez que o `gst-launch-1.0` escutar, o Windows pergunta se deve permitir. Marque **Privada** e **Pública** (adaptadores VPN costumam ser Públicos). Para abrir as portas para qualquer programa, em vez disso, use um PowerShell como administrador:

```powershell
New-NetFirewallRule -DisplayName "UAVcast-Pro video and audio" -Direction Inbound -Protocol UDP -LocalPort 5600-5602 -Action Allow
```

## Solução de problemas

| Mensagem ou sintoma | Solução |
| --- | --- |
| *'gst-launch-1.0' is not recognized…* | O GStreamer não está no PATH. Faça o passo 2 e abra um novo terminal, ou execute-o a partir da pasta `bin`. |
| *WARNING: erroneous pipeline: no element "avdec_h264"* | Instalação Typical. Reinstale com **Complete**. |
| *no element "rtph264depay"* ou *"udpsrc"* | Mesma causa: os conjuntos de plugins não foram instalados. Reinstale com **Complete**. |
| Executa, mas nenhuma janela abre | Nada chega. Verifique o IP de destino no drone (IP VPN em 4G), **Ativar Vídeo**, a câmera e o firewall. Com `-v`, uma linha com `caps = application/x-rtp` aparece quando os pacotes chegam. |
| *Could not get/set settings from/on resource* ou erro de bind | Outro programa (Mission Planner, QGroundControl, um segundo GStreamer) já escuta essa porta. Feche-o. |
| A imagem fica cinza e borrada ou trava | Perda de pacotes. Reduza a taxa de bits no drone e defina **Taxa de Recuperação do Stream** para 15–30 quadros. |
| *erroneous pipeline: could not parse caps* no PowerShell | As aspas em volta de `caps=…` estão ausentes ou são aspas duplas com espaços. Use o comando do PowerShell exatamente como mostrado. |

Linux ou Mac? Veja [GStreamer no Linux](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/gstreamer-linux/) ou [GStreamer no macOS](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/gstreamer-macos/).

Source: https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/gstreamer-windows/
