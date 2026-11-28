# Rede e VPN

> Ative a rede privada WireGuard da sua organização no Fleet Manager, conecte drones e notebooks de estações de controle terrestre e gerencie a tabela de dispositivos.

Toda organização pode ter sua própria rede privada virtual (VPN): uma malha WireGuard entre seus drones e suas estações de controle terrestre, executada pelo Fleet Manager. Nela, cada dispositivo recebe um endereço fixo `100.x.y.z` e pode alcançar os outros diretamente, esteja ele em 4G, Wi-Fi ou satélite, sem redirecionamento de portas nem endereços IP públicos.

O Fleet Manager usa essa rede para encaminhar [vinculações de fluxo](https://docs.uavmatrix.com/pt/fleet-manager/network/stream-bindings/): vídeo e MAVLink de um drone para os notebooks onde os pilotos executam QGroundControl ou Mission Planner.

Tudo isso fica em **Network** (barra lateral **Fleet Management → Network**).

## Quando preciso de VPN?

A VPN é **opcional**: o Fleet Manager mostra, mapeia e controla drones sem ela, pela conexão criptografada própria do drone. Ative-a quando quiser que os fluxos cheguem às estações de controle terrestre.

| VPN recomendada | VPN não necessária |
| --- | --- |
| Drone e estação de controle terrestre em redes diferentes (4G, locais remotos) | Drone e estação de controle terrestre na mesma rede Wi-Fi local |
| Você quer transmissão direta de vídeo e telemetria | Você usa um link de telemetria direto por USB ou serial |
| Você precisa de links criptografados entre locais | Você está testando em um ambiente controlado |
| Você opera em vários locais |  |

## Ativar a VPN

Somente Owners e Admins.

1. Abra **Network**. Se a VPN estiver desativada, a página mostra **Enable VPN Network** com o que ela oferece: conexões seguras baseadas em WireGuard, streaming de vídeo e telemetria com baixa latência e funcionamento em qualquer rede.
2. Selecione **Enable VPN Network**.

![Página Network antes da ativação da VPN, com o cartão Enable VPN Network para uma organização sem VPN](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/network--enable.webp)

*Página Network antes de ativar a VPN, com os três benefícios e o botão Enable VPN Network.*

Quando a VPN estiver ativa, a página mostra quatro contadores (**Total Devices**, **Online**, **UAVs**, **Ground Stations**) e três abas: **Devices**, **Stream Bindings** e **Settings**.

![Página Network, aba Devices, com contadores de status e uma tabela de dispositivos conectados](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/network.webp)

*Network → Devices de um grande operador: Total Devices 51, Online 39, UAVs 44, Ground Stations 7, e a tabela Connected Devices.*

## Colocar drones na VPN

Os drones nunca precisam de um comando manual. Há duas formas:

- **Ao parear.** Se a VPN estiver ativada antes do pareamento, a etapa **VPN Connection** do assistente conecta o drone. Veja [Adicione seu primeiro drone](https://docs.uavmatrix.com/pt/fleet-manager/pair-uav/).
- **Push to Drone.** Para drones pareados antes da ativação da VPN, o cartão **Push to Drone** na aba **Devices** lista todos os drones que não estão na sua rede. Selecione **Connect** ao lado de um drone para enviar a ele as configurações da VPN. O drone precisa estar online.

Se um drone já estiver em outra rede Tailscale, ele exibe um selo **Existing VPN**. **Connect** então pede confirmação (**Existing VPN Connection Detected**), e **Replace & Connect** move o drone para a rede da sua organização.

O drone aparece em **Connected Devices** com o tipo **UAV** e seu endereço VPN, e a página do UAV ganha um botão **Open via VPN**.

## Colocar estações de controle terrestre na VPN

As estações de controle terrestre entram com um único comando do Tailscale, em **Connect a Device**. Siga [Conecte uma estação de controle terrestre](https://docs.uavmatrix.com/pt/fleet-manager/connect-gcs/).

## Connected Devices

A tabela lista todos os dispositivos da rede:

| Coluna | Mostra |
| --- | --- |
| **Status** | Online ou offline na VPN |
| **Device** | Nome e hostname |
| **Type** | **UAV**, **GCS** ou **Unknown**. Dispositivos desconhecidos têm um botão **Configure**. |
| **IP Address** | O endereço VPN do dispositivo (`100.x.y.z`) |
| **Last Check-in** | Quando o dispositivo foi visto pela última vez na rede |

Selecione **Sync** para atualizar a lista a partir do servidor VPN. O menu de ações de cada linha tem:

- **Rename**: um nome legível, por exemplo "Notebook de campo – Equipe Norte".
- **Change Type**: alterna entre **UAV**, **GCS** e **Unknown**. Para um UAV, escolha qual drone pareado ele é.
- **Remove Device**: remove o dispositivo da rede. Para um drone, o Fleet Manager o instrui a sair da VPN, e suas vinculações de fluxo são removidas.

### Configurar um dispositivo desconhecido

Novas estações de controle terrestre aparecem como **Unknown**, e um banner conta os dispositivos que precisam de configuração. Selecione **Configure** e responda **What type of device is this?**

- **Ground Control Station (GCS):** um computador executando QGroundControl, Mission Planner ou similar. Ele vai **receber** vídeo e telemetria e fica disponível para vinculações de fluxo.
- **Drone / UAV:** um drone com UAVcast-Pro. Escolha qual drone pareado ele é, para que você possa gerenciar a transmissão dele.

Selecione **Continue** e depois **Complete Setup**.

## Aba Settings

**Danger Zone → Delete Network** exclui permanentemente a rede VPN, todos os dispositivos conectados, todas as chaves de autenticação e todas as vinculações de fluxo. Os dispositivos saem da rede, e você precisaria conectar novamente cada estação de controle terrestre e cada drone.

Excluir a rede também desativa a VPN da organização, e os UAVs online são instruídos a sair da VPN. A página Network então mostra **Enable VPN Network** novamente, o que cria uma nova rede vazia. Não há um interruptor separado para desligar a VPN: **Delete Network** é a forma de fazer isso.

## Requisitos de rede

| Dispositivo | Precisa de saída para |
| --- | --- |
| Drone (conexão com o Fleet Manager) | HTTPS (TCP 443) para `fleet-manager.uavmatrix.com`, e TCP 8883 para MQTT sobre TLS |
| Drone e estação de controle terrestre (VPN) | HTTPS (TCP 443) para `vpn-connect.uavmatrix.com`, além de UDP para WireGuard. O Tailscale usa UDP 41641 por padrão. |

A maioria das redes celulares e de escritório permite isso. Se os dispositivos entrarem na VPN mas não conseguirem se alcançar, veja [VPN conectada, mas não consigo alcançar o drone](https://docs.uavmatrix.com/pt/troubleshooting/vpn-cant-reach-drone/).

Quando dois dispositivos não conseguem se comunicar diretamente por UDP, o tráfego deles é retransmitido pelos servidores de relay DERP públicos do Tailscale via HTTPS (TCP 443). Ele continua criptografado de ponta a ponta, mas o relay adiciona atraso, então libere UDP de saída sempre que possível.

Source: https://docs.uavmatrix.com/pt/fleet-manager/network/
