# Fleet Manager

> O UAVmatrix Fleet Manager acompanha cada drone UAVcast-Pro em um único mapa ao vivo, com controle remoto, missões, streaming por VPN para estações de controle terrestre e funções de equipe.

O UAVmatrix Fleet Manager é um aplicativo web disponível em [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) para operar muitos drones a partir de um único lugar. Todo drone que executa o UAVcast-Pro pode ser pareado à sua organização. Depois disso, você o vê em um mapa ao vivo, abre o terminal dele, envia comandos, carrega missões e direciona o vídeo e a telemetria para as estações de controle terrestre usadas pelos seus pilotos.

![Painel do Fleet Manager com cartões de estatísticas, lista de status dos UAVs e atividade recente](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/dashboard.webp)

*Painel: cartões de estatísticas, a lista **UAV Status** e **Recent Activity** de vários membros da equipe.*

## O que você pode fazer com ele

[Adicione seu primeiro dronePareie um drone UAVcast-Pro com um código de 8 dígitos em cerca de dois minutos.](https://docs.uavmatrix.com/pt/fleet-manager/pair-uav/)[Acompanhe a frota ao vivoCada drone em um único mapa, com anéis de status, um rastro de 5 minutos e modo de acompanhamento.](https://docs.uavmatrix.com/pt/fleet-manager/map/)[Controle drones remotamenteModos de voo, armar e desarmar, missões e calibração pré-voo pelo navegador.](https://docs.uavmatrix.com/pt/fleet-manager/fleet/remote-control/)[Transmita para estações de controle terrestreEnvie vídeo e MAVLink de muitos drones para o QGroundControl ou o Mission Planner pela VPN.](https://docs.uavmatrix.com/pt/fleet-manager/network/stream-bindings/)[Convide sua equipePapéis de Owner, Admin e Viewer por organização.](https://docs.uavmatrix.com/pt/fleet-manager/team/)[Planeje missõesDesenhe pontos de rota, salve missões para a organização e envie-as a qualquer drone.](https://docs.uavmatrix.com/pt/fleet-manager/missions/)

## Como tudo se encaixa

O Fleet Manager nunca se comunica diretamente com o controlador de voo. Quem faz isso é o UAVcast-Pro no computador companheiro do drone, que mantém uma única conexão criptografada com o Fleet Manager:

1. **Pareamento.** O UAVcast-Pro pede ao Fleet Manager um código de pareamento. Você digita o código no Fleet Manager. Em seguida, o Fleet Manager entrega ao drone o seu próprio certificado de cliente.
2. **Canal de controle.** O drone se conecta ao broker MQTT do Fleet Manager via TLS na porta **8883**, autenticado com esse certificado. Telemetria, heartbeats, comandos, sessões de terminal e acesso remoto à interface web do UAVcast-Pro passam por essa conexão. Ela funciona através de NAT e de redes celulares porque o drone sempre se conecta para fora.
3. **Canal de dados (opcional).** Vídeo e MAVLink para uma estação de controle terrestre trafegam ponto a ponto pela rede privada virtual (VPN) da sua organização, uma rede WireGuard executada pelo Fleet Manager. Sem VPN, o Fleet Manager continua exibindo e controlando o drone, mas não encaminha os streams.

## Conceitos

| Termo | O que significa no Fleet Manager |
| --- | --- |
| **Organization** | Sua empresa ou equipe. Drones, missões, a rede VPN e os membros pertencem a uma organização. Cada usuário pode ser proprietário de uma organização e membro de quantas outras forem. |
| **UAV** | Um drone (ou rover, barco ou outro veículo) executando UAVcast-Pro, pareado a uma organização por vez. O Fleet Manager o identifica por um ID de dispositivo que o UAVcast-Pro deriva do número de série da CPU e do disco de inicialização do computador companheiro, então ele mantém sua identidade entre reinicializações e mudanças de rede. |
| **Pairing** | Vinculação de um UAV a uma organização com um código de 8 dígitos exibido pelo UAVcast-Pro. O código é válido por 5 minutos. |
| **Ground station (GCS)** | Um notebook ou PC executando QGroundControl, Mission Planner ou similar, conectado à VPN da sua organização para receber os streams. |
| **Stream binding** | Uma regra que diz "envie o vídeo e a telemetria deste UAV para aquela estação de controle terrestre". Cada vinculação recebe suas próprias portas UDP, para que uma mesma estação possa receber muitos drones ao mesmo tempo. |
| **Roles** | **Owner**, **Admin** ou **Viewer**, definidos por organização. Viewers podem acompanhar; Admins e o Owner podem parear, controlar e configurar. Veja [Roles e permissões](https://docs.uavmatrix.com/pt/fleet-manager/team/roles-and-permissions/). |
| **Licenses and seats** | Todo UAV pareado precisa de uma licença ativa do UAVcast-Pro pertencente a um membro da organização. Os membros da equipe não consomem vagas. Veja [Licenças](https://docs.uavmatrix.com/pt/fleet-manager/licenses/). |
| **Status and alerts** | Avisos de online, offline, sem MAVLink e de GPS no mapa e na lista da frota, além de anúncios do sistema. Veja [Indicadores de status e notificações](https://docs.uavmatrix.com/pt/fleet-manager/alerts-and-status/). |

## O que você precisa

O Fleet Manager está incluído na sua licença do UAVcast-Pro: sem assinatura separada, sem vagas extras.

> O Fleet Manager está incluído na licença do UAVcast-Pro. Cada drone que você parear precisa de uma.
>
> [Comprar UAVcast-Pro](https://uavmatrix.com/pt/checkout) · [Ver planos e preços](https://uavmatrix.com/pt/products)

- Uma conta UAVmatrix (a mesma que você usa em [uavmatrix.com](https://uavmatrix.com/) para comprar licenças).
- Pelo menos um computador companheiro com o UAVcast-Pro instalado e sua licença ativada. Veja [Instalação](https://docs.uavmatrix.com/pt/get-started/installation/) e [Ative sua licença](https://docs.uavmatrix.com/pt/get-started/license-activation/).
- Internet no drone com HTTPS de saída (443) e TCP **8883** liberados.

## Primeiros passos

1. [Configure sua organização](https://docs.uavmatrix.com/pt/fleet-manager/set-up-organization/)
2. [Adicione seu primeiro drone](https://docs.uavmatrix.com/pt/fleet-manager/pair-uav/)
3. [Conecte uma estação de controle terrestre](https://docs.uavmatrix.com/pt/fleet-manager/connect-gcs/)
4. [Convide sua equipe](https://docs.uavmatrix.com/pt/fleet-manager/team/)

Source: https://docs.uavmatrix.com/pt/fleet-manager/
