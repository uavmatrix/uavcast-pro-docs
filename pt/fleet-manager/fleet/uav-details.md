# Detalhes do UAV

> A página de um drone no Fleet Manager mostra telemetria ao vivo e a saúde do computador companheiro, um terminal SSH e o registro MAVLink, além de reiniciar ou remover.

Cada drone tem a sua própria página. Abra-a com **Details** no card da [Frota](https://docs.uavmatrix.com/pt/fleet-manager/fleet/), pelo painel, ou com **View UAV** ao final do pareamento.

O cabeçalho mostra o nome, um selo de status ao vivo, **Re-pair required** quando necessário, a organização, o **ID** do dispositivo e **Last seen**. Owners e Admins também têm **Rename** e **Remove**.

A página tem quatro abas: **Overview**, **Terminal**, **Logs** e **Actions**.

## Overview

Dados ao vivo, enviados ao navegador conforme chegam.

![Aba Overview dos detalhes do UAV com o card UAVcast Application e o card MAVLink / Flight Controller](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/drone-detail.webp)

*Aba Overview de um VTOL armado em AUTO: card UAVcast Application com CPU Temp, CPU, Memory e Disk, e o card MAVLink / Flight Controller com bateria, GPS, altitude e rumo.*

**UAVcast Application** descreve o computador companheiro: o estado da conexão (**Connected**, **Waiting for data...** ou **Connecting...**), **Hostname**, **Uptime**, **CPU Temp**, uso de **CPU**, **Memory** e **Disk**, os serviços do UAVcast-Pro e o estado de cada um, e os endereços de rede do drone (LAN e VPN). Ele também tem os botões para [abrir o UAVcast-Pro remotamente](https://docs.uavmatrix.com/pt/fleet-manager/fleet/remote-uavcast/): **Open via Proxy** e, quando o drone está na VPN, **Open via VPN**.

**MAVLink / Flight Controller** mostra o que o controlador de voo informa: **ARMED** ou **DISARMED**, as sinalizações **FAILSAFE** e **GCS FAILSAFE**, **Battery**, **GPS** (satélites e fixação), **Altitude** e **Heading**.

> **Acompanhe a CPU Temp em dias quentes**
>
> Um Raspberry Pi que esquenta demais reduz o desempenho, e o vídeo é o primeiro a sofrer. Se a **CPU Temp** subir durante um voo, veja [Subtensão e limitação de desempenho](https://docs.uavmatrix.com/pt/troubleshooting/undervoltage-and-throttling/).

### Connected Ground Stations

Abaixo dos cards, **Connected Ground Stations** lista as estações de controle terrestre que recebem os fluxos deste drone, com as chaves **Video** e **Telemetry** e os botões **Pause** / **Resume**. **Add GCS** (Owners e Admins) vincula outra estação de controle terrestre a este drone. Ele cria a mesma vinculação de fluxo de **Network → Stream Bindings**, com as próximas portas livres nessa estação, e envia o novo destino ao drone. Veja [Vinculações de fluxo](https://docs.uavmatrix.com/pt/fleet-manager/network/stream-bindings/).

## Terminal

Uma sessão SSH no navegador para o computador companheiro, pela conexão criptografada do Fleet Manager. Não é preciso redirecionamento de portas nem VPN. Somente Owners e Admins. O drone precisa estar online.

Selecione **Connect** para abrir um shell. Os botões de comandos rápidos executam verificações comuns para você: `df -h`, `free -h`, `top -bn1`, `ip a`, `ip r`, `uptime`, `dmesg` e `ps aux`. **Disconnect** encerra a sessão.

![Aba Terminal com uma sessão SSH mostrando a saída de df -h e os botões de comandos rápidos](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/drone-detail--terminal.webp)

*Aba Terminal conectada a um drone de campo, após executar o comando rápido df -h.*

> **Este é um shell ativo na aeronave**
>
> O terminal é um shell real no computador companheiro. Reiniciar serviços ou a rede com o drone no ar pode interromper a telemetria e o vídeo. Use-o no solo, a não ser que você saiba o que cada comando faz.

## Logs

Uma visualização ao vivo das mensagens de telemetria e de heartbeat que o drone envia ao Fleet Manager, com os filtros **Telemetry** e **Heartbeat**, **Auto-scroll**, **Pause** e limpeza. **Download logs** salva o que está na tela em um arquivo de texto (`mavlink-log-<id>-<time>.txt`), útil para enviar por e-mail ao suporte com o número do seu chamado (os chamados só aceitam uma imagem).

Este é um registro ao vivo, não um arquivo de registros de voo. O Fleet Manager armazena a telemetria para o [histórico de voos](https://docs.uavmatrix.com/pt/fleet-manager/map/flight-history/), mas não armazena nem exporta arquivos DataFlash ou `.tlog`. Esses arquivos ficam no controlador de voo e no seu software de estação de controle terrestre.

![Aba Logs com uma lista em rolagem de entradas de telemetria e heartbeat e as chaves Telemetry, Heartbeat e Auto-scroll](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/drone-detail--logs.webp)

*Aba Logs transmitindo entradas TELEMETRY e HEARTBEAT, com Telemetry, Heartbeat e Auto-scroll ativados.*

## Actions

**System Actions** tem **Reboot** (reinicia o computador companheiro) e **Shutdown** (desliga o computador companheiro). As duas ações exigem que o drone esteja online. Para confirmar, você digita o nome da ação.

Essas ações afetam somente o computador companheiro, não o controlador de voo. Um desligamento não pode ser desfeito remotamente: alguém precisa desligar e religar o drone fisicamente.

![Aba Actions com o card System Actions e os botões Reboot e Shutdown](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/drone-detail--actions.webp)

*Aba Actions com o diálogo Confirm Reboot aberto, pedindo para digitar reboot para confirmar.*

## Rename

Selecione **Rename**, digite o novo nome em **Edit UAV** e salve. O nome é sincronizado com o UAVcast-Pro quando o drone estiver online.

## Remove

**Remove** exclui o drone da organização e o desparelha. Veja [Remover ou transferir um drone](https://docs.uavmatrix.com/pt/fleet-manager/fleet/remove-or-transfer/).

Source: https://docs.uavmatrix.com/pt/fleet-manager/fleet/uav-details/
