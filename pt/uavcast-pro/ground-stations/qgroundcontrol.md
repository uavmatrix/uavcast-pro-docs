# QGroundControl

> Receba a telemetria e o vídeo H.264 ao vivo do UAVcast-Pro no QGroundControl no Windows, macOS ou Linux: conexão automática UDP 14550, fonte de vídeo UDP h.264 na porta 5600, modo de baixa latência e soluções de problemas.

O QGroundControl escuta MAVLink na porta UDP 14550 por padrão, então um drone UAVcast-Pro aparece assim que sua telemetria chega. Para o vídeo, defina uma vez a fonte de vídeo como **UDP h.264 Video Stream** na porta 5600. O QGroundControl tem o GStreamer embutido, então não há nada mais para instalar. Isso funciona da mesma forma no Windows, macOS e Linux; para tablets, veja [Android](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/android/).

## Antes de começar

- No drone, um destino em [Estações de Controle Terrestre](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/) com o endereço IP deste computador (o endereço da VPN sobre 4G), **Ativar Telemetria** ligado e **Ativar Vídeo** ligado para o vídeo.
- A câmera transmitindo em **Câmera → Configurações da câmera**.
- O QGroundControl, disponível em [qgroundcontrol.com](https://qgroundcontrol.com/).

## Telemetria

Inicie o QGroundControl. Em poucos segundos após o primeiro pacote, o veículo aparece e a barra de ferramentas mostra seu modo de voo e a bateria.

![Fly view do QGroundControl conectado a um veículo ArduPilot: barra de ferramentas com Not Ready e Stabilize, uma missão de cinco pontos de rota no mapa com No GPS Lock for Vehicle, e a janela de vídeo no canto inferior esquerdo mostrando WAITING FOR VIDEO](https://docs.uavmatrix.com/pt/img/screenshots/gcs/qgroundcontrol--fly-view.webp)

*Telemetria funcionando: a barra de ferramentas mostra o estado do veículo e o modo de voo (Not Ready, Stabilize). Esta é uma configuração de bancada sem GPS, por isso aparece No GPS Lock for Vehicle. A janela de vídeo (canto inferior esquerdo) mostra WAITING FOR VIDEO até que o vídeo seja configurado abaixo.*

Nada aparece? Verifique se a conexão UDP automática está ativada: ícone **Q** → **Application Settings** e, em seguida, **AutoConnect to the following devices** → **UDP** marcado (o padrão). Dependendo da versão do QGroundControl, a lista AutoConnect fica na página **Comm Links** ou na página **General**. Se você definiu uma **Porta de Telemetria** diferente de 14550 no drone, adicione um link: **Application Settings** → **Comm Links** → **Add**, escolha **UDP**, a porta escolhida e clique em **Connect**.

## Vídeo

1. Clique no ícone **Q** (canto superior esquerdo) → **Application Settings**.
2. Abra a página **Video**. Em versões mais antigas, o vídeo é uma seção **Video** na página **General**.
3. Defina **Source** como **UDP h.264 Video Stream**.
4. Verifique o endereço UDP. O padrão `0.0.0.0:5600` escuta na porta 5600, que corresponde à **Porta de Vídeo** padrão do drone. Se você alterou a **Porta de Vídeo** no drone, use essa porta aqui. Versões atuais chamam o campo de **UDP URL**; as mais antigas mostram um número de **UDP Port**.
5. Volte à visualização **Fly**. O vídeo aparece na pequena janela no canto. Clique nela para trocar o vídeo e o mapa de lugar.

*Ilustração das Configurações do Aplicativo do QGroundControl: a página Video com Source definido como UDP h.264 Video Stream, o endereço UDP 0.0.0.0:5600 e o Low Latency Mode.*

*Ilustração QGroundControl, simplificado. (1) ícone Q → Application Settings, (2) Video, (3) Source UDP h.264 Video Stream, (4) UDP URL com a porta 5600.*

### Modo de baixa latência

Nas mesmas configurações de vídeo, ative **Low Latency Mode**. O QGroundControl então descarta os quadros atrasados em vez de armazená-los em buffer, o que reduz bastante o atraso em um bom link. Em um link 4G fraco, isso pode deixar a imagem travando; desative-o novamente se isso acontecer.

## Firewall

- **Windows**: permita o QGroundControl nas redes **Private** e **Public** quando o Windows perguntar. Adaptadores de VPN (ZeroTier, Tailscale) costumam ser classificados como Public. Para abrir as portas manualmente, veja [Mission Planner: firewall do Windows](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/mission-planner/#allow-mission-planner-through-the-windows-firewall); as mesmas regras se aplicam.
- **macOS**: permita conexões de entrada para o QGroundControl quando o macOS perguntar.
- **Linux**: se o `ufw` estiver ativo, execute `sudo ufw allow 14550/udp` e `sudo ufw allow 5600:5602/udp`.

## Segunda câmera e áudio

O QGroundControl reproduz um único fluxo de vídeo. Com a [transmissão dupla](https://docs.uavmatrix.com/pt/uavcast-pro/camera/multi-camera/) ativada, a câmera 2 vai para a porta 5601: altere a porta UDP para `5601` para assisti-la, ou abra a câmera 2 em uma janela do GStreamer ([Windows](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/gstreamer-linux/), [macOS](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/gstreamer-macos/)) ao lado do QGroundControl.

O QGroundControl ignora o áudio. Reproduza-o com o GStreamer na Porta de Vídeo + 2 (`5602`).

## Problemas comuns

| Sintoma | Causa e solução |
| --- | --- |
| *Waiting For Vehicle Connection* | Nenhuma telemetria chega a este computador. Verifique o IP de destino (IP da VPN sobre 4G), **Ativar Telemetria** e o firewall. |
| A telemetria funciona, mas a janela de vídeo diz que não há vídeo | **Ativar Vídeo** está desativado, a câmera não está em execução, a fonte não é **UDP h.264 Video Stream** ou a UDP 5600 está bloqueada. |
| O vídeo aparece e depois trava sobre 4G | Perda de pacotes. Reduza a taxa de bits no drone, defina **Taxa de Recuperação do Stream** como 15–30 quadros e desative o **Low Latency Mode**. |
| O veículo aparece duas vezes | Dois destinos apontam para este computador, ou um segundo link duplica a conexão automática. Remova um deles. |
| O vídeo para quando você inicia um teste do GStreamer | Apenas um programa pode escutar em uma porta UDP. Feche um deles. |

Mais verificações: [Sem vídeo no QGroundControl ou no Mission Planner](https://docs.uavmatrix.com/pt/troubleshooting/no-video-in-gcs/).

Source: https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/qgroundcontrol/
