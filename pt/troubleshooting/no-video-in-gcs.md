# Sem vídeo no QGroundControl ou no Mission Planner

> A telemetria funciona, mas o vídeo continua preto no QGroundControl ou no Mission Planner? Verifique a câmera, Ativar Vídeo, o IP de destino, a UDP 5600 e a estação de controle terrestre.

A telemetria chega e o drone aparece no mapa, mas a área de vídeo continua preta, ou a janela de vídeo do QGroundControl mostra **WAITING FOR VIDEO**. Siga as verificações na ordem. A maioria dos casos se resolve com a verificação 2 ou 3.

![Visão Fly do QGroundControl conectado a um veículo ArduPilot: barra de ferramentas com Not Ready e Stabilize, uma missão de cinco pontos de rota no mapa com No GPS Lock for Vehicle, e a janela de vídeo no canto inferior esquerdo mostrando WAITING FOR VIDEO](https://docs.uavmatrix.com/pt/img/screenshots/gcs/qgroundcontrol--fly-view.webp)

*O sintoma no QGroundControl: a telemetria chega (Not Ready e Stabilize na barra de ferramentas; No GPS Lock porque esta bancada não tem GPS), mas a janela de vídeo no canto inferior esquerdo diz WAITING FOR VIDEO.*

| O que você vê | Causa provável | Comece em |
| --- | --- | --- |
| Vídeo preto na estação de controle terrestre e na pré-visualização ao vivo do UAVcast-Pro | A câmera não está em execução no drone | [Verificação 1](https://docs.uavmatrix.com/pt/troubleshooting/no-video-in-gcs/#check-1) |
| A pré-visualização funciona, a estação continua preta | **Ativar Vídeo** está desativado para esta estação, ou o IP está errado | [Verificação 2](https://docs.uavmatrix.com/pt/troubleshooting/no-video-in-gcs/#check-2) |
| Funcionava no Wi-Fi de casa, preto pelo 4G | O destino usa um IP local em vez do IP da VPN | [Verificação 2](https://docs.uavmatrix.com/pt/troubleshooting/no-video-in-gcs/#check-2) |
| Tudo parece certo, mas continua preto no Windows | O firewall bloqueia UDP de entrada na porta 5600 | [Verificação 3](https://docs.uavmatrix.com/pt/troubleshooting/no-video-in-gcs/#check-3) |
| O QGroundControl mostra vídeo, o Mission Planner não | O Mission Planner não tem uma fonte GStreamer definida | [Verificação 4](https://docs.uavmatrix.com/pt/troubleshooting/no-video-in-gcs/#check-4) |

## Verificação 1: confirme que a câmera está transmitindo no drone

Se o drone não estiver produzindo vídeo, nenhuma configuração da estação de controle terrestre vai resolver.

1. Abra a interface web do UAVcast-Pro e vá para **Câmera → Configurações da câmera**.
2. Confira se **Ativar Câmera?** está em **Sim** e se uma câmera está escolhida em **Selecionar Câmera**.
3. Confira se a câmera está em execução: a linha **Video** do painel deve dizer **Running**. Se estiver parada, pressione **Iniciar** na página Câmera (o botão mostra **Reiniciar** enquanto a câmera está em execução).
4. Ative **Ativar Pré-visualização ao Vivo?** e observe a **Visualização ao Vivo**. Se aparecer uma imagem, a câmera funciona e você pode seguir para a verificação 2.
5. Se **Selecionar Câmera** disser **No cameras available**, vá para [Câmera não detectada](https://docs.uavmatrix.com/pt/troubleshooting/camera-not-detected/).

![Página Configurações da câmera do UAVcast-Pro com CAM 1 ativada e o painel Visualização ao Vivo mostrando No Video Available](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/camera.webp)

*Câmera → Configurações da câmera com CAM 1 ativada. A Visualização ao Vivo mostra No Video Available até que **Ativar Pré-visualização ao Vivo?** seja marcado.*

> **A pré-visualização não é a transmissão da estação**
>
> A pré-visualização no navegador passa pelo servidor de mídia integrado (WebRTC na porta 8889). A estação de controle terrestre recebe uma transmissão H.264 separada por UDP. Uma pré-visualização funcionando prova que a câmera funciona, mas não que a transmissão UDP chega ao seu notebook.

Se os **Registros de Ações** na página Câmera disserem que a câmera *does not support* uma resolução, escolha outro valor em **Resolução**. O UAVcast-Pro usa o maior tamanho suportado e registra qual foi usado.

## Verificação 2: confira o destino na estação de controle terrestre

O UAVcast-Pro só envia vídeo para destinos em que o vídeo está ativado. Telemetria e vídeo têm chaves separadas, e **ambas ficam desativadas em um novo destino**.

1. Vá para **Estações de Controle Terrestre** e encontre o cartão do computador que executa sua estação.
2. Confira se **Ativar Endpoint** e **Ativar Vídeo** estão ligados.
3. Confira **IP ou Host de Destino**. Deve ser o endereço IPv4 do computador da estação, visto a partir do drone. Nomes de host não são aceitos.
4. Confira se **Porta de Vídeo** é `5600`, ou a porta em que sua estação escuta.
5. Os campos são salvos quando você sai deles ou pressiona Enter. Uma marca verde confirma o salvamento.

![Porta de Vídeo 5600 e a chave Ativar Vídeo ligada](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/ground-control--video-enabled.webp)

*Estações de Controle Terrestre: um destino com Ativar Vídeo ligado e Porta de Vídeo 5600.*

> **Voando pelo 4G? Use o IP da VPN**
>
> Em um link celular, o drone não consegue alcançar o endereço local do seu notebook (como `192.168.1.20`). Use o endereço que o notebook tem na VPN (Fleet Manager VPN, Tailscale ou ZeroTier). No Windows, execute `ipconfig` e procure o adaptador Tailscale ou ZeroTier.

Usando o Fleet Manager? Os destinos são criados para você quando você adiciona uma vinculação de fluxo, e cada drone extra na mesma estação recebe suas próprias portas. Confira a porta de vídeo mostrada na vinculação, não a 5600. Veja [Vinculações de fluxo](https://docs.uavmatrix.com/pt/fleet-manager/network/stream-bindings/).

## Verificação 3: libere a UDP 5600 no firewall

O vídeo chega como tráfego UDP de entrada. No Windows, isso é bloqueado por padrão, mesmo quando a telemetria passa, porque a estação solicitou uma exceção.

**Windows**

Abra o **PowerShell como Administrador** e execute:

```powershell
New-NetFirewallRule -DisplayName "UAV Video" -Direction Inbound -Protocol UDP -LocalPort 5600 -Action Allow
New-NetFirewallRule -DisplayName "MAVLink Telemetry" -Direction Inbound -Protocol UDP -LocalPort 14550 -Action Allow
```

Os adaptadores ZeroTier e Tailscale costumam ser classificados como rede *Public*. Uma regra criada assim se aplica a todos os perfis.

**Linux**

```bash
sudo ufw allow 5600/udp comment 'UAV Video'
sudo ufw allow 14550/udp comment 'MAVLink Telemetry'
```

**macOS**

O firewall do macOS permite UDP de entrada para os apps que você aprova. Se você clicou em *Deny* quando o QGroundControl foi iniciado pela primeira vez, permita-o novamente em **System Settings → Network → Firewall → Options**.

## Verificação 4: configure o vídeo na sua estação de controle terrestre

**QGroundControl**

1. Clique no ícone **Q** e depois em **Application Settings**.
2. Abra as configurações de vídeo (**Video**, ou **General → Video** nas versões mais antigas).
3. Defina **Source** como **UDP h.264 Video Stream** e confira se o endereço UDP usa a porta `5600` (**UDP URL** `0.0.0.0:5600` nas versões atuais, **UDP Port** `5600` nas mais antigas).
4. Volte para a visão Fly. O bloco de vídeo deve mostrar uma imagem em alguns segundos.

**Mission Planner**

O Mission Planner mostra o vídeo no HUD. Se ele continuar preto, defina a fonte manualmente:

1. Clique com o botão direito no HUD e escolha **Video → Set GStreamer Source**.
2. Cole este pipeline e confirme:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

## Verificação 5: teste o fluxo sem uma estação de controle terrestre

Isso tira o software da estação do caminho. Se uma janela com vídeo abrir, o drone, a rede e o firewall estão bem, e o problema está nas configurações da estação.

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

> **Windows: escolha a instalação Complete**
>
> Ao instalar o GStreamer (runtime MSVC 64-bit), escolha **Complete**. A instalação Typical deixa de fora o decodificador H.264, e o comando falha com `no element "avdec_h264"`.

Feche o teste antes de abrir sua estação novamente: só um programa pode escutar na porta 5600 por vez. Configuração passo a passo do receptor: [Mission Planner](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/mission-planner/), [QGroundControl](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/qgroundcontrol/), e GStreamer no [Windows](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/gstreamer-linux/) ou [macOS](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/gstreamer-macos/).

> **Vídeo funciona, mas trava pelo 4G?**
>
> Veja [Vídeo travando ou com atraso](https://docs.uavmatrix.com/pt/troubleshooting/choppy-or-delayed-video/).

## Ainda sem vídeo?

[Baixe os logs](https://docs.uavmatrix.com/pt/troubleshooting/collect-logs/) com **Camera Server** selecionado na lista de logs e envie-os para **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, junto com a versão do UAVcast-Pro, o modelo da câmera e a estação de controle terrestre que você usa.

Relacionados: [Configurações da câmera](https://docs.uavmatrix.com/pt/uavcast-pro/camera/) · [Estações de Controle Terrestre](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/)

Source: https://docs.uavmatrix.com/pt/troubleshooting/no-video-in-gcs/
