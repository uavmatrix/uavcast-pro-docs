# Mission Planner

> Conecte o Mission Planner a um drone UAVcast-Pro: MAVLink sobre UDP 14550, vídeo H.264 ao vivo no HUD com a fonte GStreamer exata, firewall do Windows, segunda câmera e erros comuns.

O Mission Planner recebe a telemetria do UAVcast-Pro pela porta UDP 14550 e mostra o vídeo ao vivo no seu HUD por meio de uma fonte GStreamer na porta 5600. A telemetria exige um clique; o vídeo exige um pipeline colado uma única vez, que o Mission Planner lembra.

## Antes de começar

- No drone, um destino em [Estações de Controle Terrestre](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/) com o endereço IP deste PC (o endereço VPN em 4G), com **Ativar Telemetria** ativado e **Ativar Vídeo** ativado para o vídeo.
- A câmera transmitindo em **Câmera → Configurações da câmera**.
- Uma versão atual do Mission Planner no Windows. Descubra o IP deste PC com `ipconfig` em um Prompt de Comando.

## Conectar a telemetria

1. No canto superior direito do Mission Planner, escolha **UDP** na lista de conexão. A baud rate é ignorada.
2. Selecione **Connect**.
3. Quando pedir a porta de escuta, mantenha `14550` (ou a **Porta de Telemetria** que você definiu no drone) e selecione **OK**.
4. O Mission Planner baixa os parâmetros e o drone aparece no mapa.

![Visualização Flight Data do Mission Planner conectada por UDP: a caixa de conexão no canto superior direito mostra UDP, o link UDP14550-1-QUADRO e o botão DISCONNECT; o HUD mostra DISARMED, Unhealthy AHRS e GPS: No Fix](https://docs.uavmatrix.com/pt/img/screenshots/gcs/mission-planner--connected.webp)

*Conectado. A caixa no canto superior direito mostra UDP e o link UDP14550-1-QUADRO, e o botão agora diz DISCONNECT. Esta é uma configuração de bancada sem GPS, por isso o HUD mostra DISARMED, Unhealthy AHRS e GPS: No Fix.*

## Mostrar o vídeo no HUD

1. Clique com o botão direito no HUD (o horizonte artificial) e escolha **Video → Set GStreamer Source**.

2. Cole este pipeline e selecione **OK**:

   ```text
   udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
   ```

3. O vídeo substitui o fundo do HUD em alguns segundos. Os dados de voo permanecem sobre ele.

*Ilustração do Mission Planner: menu de clique com o botão direito sobre o HUD, com Video destacado e seu submenu Set GStreamer Source.*

*Ilustração Mission Planner, simplificado. (1) Clique com o botão direito no HUD, (2) Video, (3) Set GStreamer Source, depois cole o pipeline.*

O Mission Planner usa a própria cópia do GStreamer para o HUD, então você não precisa da instalação separada de [GStreamer no Windows](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/gstreamer-windows/) para isso. Se o Mission Planner oferecer baixar o GStreamer, aceite.

Mantenha o final do pipeline exatamente como mostrado: o Mission Planner precisa de `video/x-raw,format=BGRA ! appsink name=outsink` para desenhar a imagem. Altere apenas a porta.

### Menor latência

O `rtpjitterbuffer` suaviza pacotes que chegam atrasados, ao custo de cerca de 200 ms de atraso. Em um link bom, você pode reduzi-lo:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer latency=0 ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink sync=false
```

Em um link 4G fraco, mantenha o jitter buffer padrão; a imagem falha menos.

## Permitir o Mission Planner no firewall do Windows

O Windows pergunta na primeira vez que o Mission Planner escuta a rede. Permita-o nas redes **Privada** e **Pública**. Um adaptador ZeroTier ou Tailscale costuma ser classificado como **Pública**, então marcar apenas Privada bloqueia a VPN.

Se você ignorou o aviso, abra as portas em um PowerShell como administrador:

```powershell
New-NetFirewallRule -DisplayName "UAVcast-Pro telemetry" -Direction Inbound -Protocol UDP -LocalPort 14550 -Action Allow
New-NetFirewallRule -DisplayName "UAVcast-Pro video" -Direction Inbound -Protocol UDP -LocalPort 5600-5602 -Action Allow
```

## Segunda câmera (transmissão dupla)

Com a [transmissão dupla](https://docs.uavmatrix.com/pt/uavcast-pro/camera/multi-camera/) ativada, a câmera 2 vai para a **Porta de Vídeo (Câmera 2)**, por padrão `5601`. O HUD do Mission Planner mostra uma única fonte. Ou troque a fonte do HUD para a porta 5601 quando precisar da câmera 2, ou assista à câmera 2 em uma janela GStreamer separada: veja [GStreamer no Windows](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/gstreamer-windows/).

O áudio (Porta de Vídeo + 2) é ignorado pelo Mission Planner. Reproduza-o com o GStreamer.

## Problemas comuns

| Sintoma | Causa e solução |
| --- | --- |
| Conecta pelo Wi-Fi, nada em 4G | O destino usa o IP da LAN. Use o IP VPN deste PC. |
| *No heartbeat packets received* | O drone não está enviando para este PC: IP errado, **Ativar Telemetria** desligado ou o firewall bloqueia a UDP 14550. |
| A telemetria funciona, mas o HUD continua preto | **Ativar Vídeo** está desligado para este destino, a câmera não está em execução ou a UDP 5600 está bloqueada. Teste com [GStreamer no Windows](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/gstreamer-windows/). |
| O vídeo trava ou fica cinza e borrado | Perda de pacotes. Reduza a taxa de bits no drone e defina **Taxa de Recuperação do Stream** para 15–30 quadros. |
| O vídeo para quando outro programa é aberto | Apenas um programa pode escutar uma porta UDP. Feche a janela do GStreamer ou o QGroundControl que também usa a 5600. |

Mais verificações: [Sem vídeo no QGroundControl ou no Mission Planner](https://docs.uavmatrix.com/pt/troubleshooting/no-video-in-gcs/) e [Sem telemetria na estação de controle terrestre](https://docs.uavmatrix.com/pt/troubleshooting/no-telemetry-in-gcs/).

Source: https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/mission-planner/
