# Integre uma frota de drones com o Fleet Manager

> Planeje as licenças e depois nomeie, pareie e conecte mais de 20 drones UAVcast-Pro ao Fleet Manager da UAVmatrix, com funções de equipe, a VPN da organização e as vinculações de fluxo.

Este guia mostra como trazer uma frota de, digamos, 20 drones para o [UAVmatrix Fleet Manager](https://docs.uavmatrix.com/pt/fleet-manager/) de uma só vez: licenças, nomes, pareamento, a VPN da organização e a ligação das estações de controle terrestre aos drones. Ele pressupõe que cada drone já execute o UAVcast-Pro com o controlador de voo conectado e acesso à internet.

## 1. Planeje as licenças

Duas regras determinam se um drone pode ser pareado:

- **Todo drone precisa de uma licença ativa do UAVcast-Pro** no dispositivo. Uma licença pode cobrir vários drones: a contagem de **Dispositivos Permitidos** é o número de vagas. Para 20 drones, você precisa de 20 vagas no total, distribuídas em uma ou mais licenças.
- **A licença deve pertencer a um membro da organização** na qual você faz o pareamento. O Fleet Manager compara o endereço de e-mail da conta da loja que comprou a licença com os endereços de e-mail dos membros. Se a compra foi feita com outra conta, convide essa conta para a organização ou peça ao suporte para adicionar o e-mail da compra ao seu usuário.

Verifique isso antes do dia do pareamento: um drone cuja licença pertence a alguém de fora é recusado com **License is not owned by any member of this organization**.

## 2. Configure a organização e a equipe

1. Entre em [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) com sua conta uavmatrix.com e crie a organização. Veja [Configure uma organização](https://docs.uavmatrix.com/pt/fleet-manager/set-up-organization/).
2. Em **Team**, convide seus colegas. Owners e Admins podem parear, controlar e remover drones; Viewers só podem acompanhar. Veja [Funções e permissões](https://docs.uavmatrix.com/pt/fleet-manager/team/roles-and-permissions/).
3. Divida o trabalho de pareamento entre dois ou três Admins se tiver muitos drones. Cada usuário pode concluir 5 pareamentos por minuto; o limite impede tentativas de adivinhação por força bruta e também desacelera uma pessoa que pareie 20 drones em sequência.

## 3. Nomeie cada drone antes do pareamento

O nome que um drone tem no UAVcast-Pro se torna seu nome no Fleet Manager. Combine um padrão, por exemplo `SURVEY-01` … `SURVEY-20`, e identifique as aeronaves de acordo.

Em cada drone, abra UAVcast-Pro → **Fleet Management** e preencha **Device Name**. Sem um nome, o drone aparece com seu hostname. Você pode renomeá-lo depois no Fleet Manager.

## 4. Pareie cada drone

Repita para cada drone. Com duas janelas do navegador lado a lado (o UAVcast-Pro do drone e o Fleet Manager), cada pareamento leva cerca de um minuto.

1. No UAVcast-Pro, abra **Fleet Management** e clique em **Connect to Fleet Manager**. Um **Pairing Code** de 8 dígitos aparece. Ele expira após 5 minutos.
2. No Fleet Manager, acesse **Fleet → Pair Device**.
3. **Select Organization**, depois **Enter Pairing Code**.
4. **Confirm Device**: confira o nome, o hostname, a arquitetura e a versão do UAVcast, para ter certeza de que está pareando o drone que você pretende parear.
5. **VPN Connection**: marque **Enable VPN for this UAV** se as estações de controle terrestre devem alcançar o drone pela VPN da organização. Se o drone já usa o Tailscale, **Replace existing VPN with Fleet Manager network** move-o para a rede da organização.
6. **Complete Pairing**. No UAVcast-Pro, **Fleet Connection** muda para **Conectado**.

![Assistente de pareamento do Fleet Manager na etapa Confirm Device, mostrando o nome do UAV, o hostname, a arquitetura e a versão do UAVcast](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/pair-device--confirm.webp)

*Fleet → Pair Device, etapa Confirm Device.*

Erros e seus significados: [Código de pareamento inválido ou expirado](https://docs.uavmatrix.com/pt/troubleshooting/pairing-code-invalid/). O assistente completo é descrito em [Pareie seu primeiro UAV](https://docs.uavmatrix.com/pt/fleet-manager/pair-uav/).

## 5. Verifique a frota

Abra **Fleet**. Todo drone deve aparecer como online. Em **Fleet Map**, cada drone aparece na sua posição GPS assim que o controlador de voo tiver uma fixação. Um drone que mostra **Offline** não informa há 20 segundos: veja [Drone offline no Fleet Manager](https://docs.uavmatrix.com/pt/troubleshooting/drone-offline-fleet-manager/).

## 6. Conecte as estações de controle terrestre

1. Acesse **Network** e clique em **Enable VPN Network** se a VPN da organização ainda não estiver ativa.
2. Clique em **Connect a Device**, escolha **Ground Control Station (GCS)** e copie o **GCS Connection Command**. Execute-o em um terminal **no notebook da estação de controle terrestre**, com o Tailscale instalado. Não o cole no UAVcast-Pro.
3. O notebook aparece em **Ground Stations** assim que estiver conectado.
4. Em **Stream Bindings**, clique em **Add Stream Binding** e vincule cada drone à estação de controle terrestre que deve recebê-lo. O drone precisa estar online, porque o Fleet Manager envia o destino a ele.
5. Cada binding recebe seu próprio bloco de portas nessa estação: o primeiro drone usa os padrões, 5600 (vídeo) e 14550 (telemetria), e cada drone adicional recebe o próximo bloco livre. Configure o software da estação com as portas exibidas em cada binding.

![Página Network do Fleet Manager com vinculações de fluxo ligando vários drones a uma estação de controle terrestre, com portas atribuídas automaticamente](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/network--stream-bindings.webp)

*Network → Stream Bindings: cada binding mostra sua estação de controle terrestre e suas portas de vídeo e telemetria.*

Detalhes: [Conecte uma estação de controle terrestre](https://docs.uavmatrix.com/pt/fleet-manager/connect-gcs/) e [Vinculações de fluxo](https://docs.uavmatrix.com/pt/fleet-manager/network/stream-bindings/).

> **Transmissão dupla e áudio**
>
> Cada binding recebe seu próprio bloco de portas na estação de controle terrestre, com espaço para a segunda câmera do drone e para o áudio após a porta de vídeo, de modo que vários drones possam compartilhar uma mesma estação.

## 7. Rotina diária

- **Re-pair required**: quando o Fleet Manager mostrar este selo, pareie o drone novamente uma vez pelo UAVcast-Pro. Ele mantém o nome e o histórico. Veja [Remova ou transfira um UAV](https://docs.uavmatrix.com/pt/fleet-manager/fleet/remove-or-transfer/).
- **Trocar o cartão SD ou a placa de um drone** não libera nada por si só: cancele o registro do dispositivo antigo em **Aplicação → Gerenciador de Licença → Dispositivos Ativados** em qualquer drone que use a mesma licença e depois pareie o novo.
- **Trabalho remoto em um drone**: a página de detalhes do UAV no Fleet Manager tem um terminal, registros e ações como reiniciar. Veja [Detalhes do UAV](https://docs.uavmatrix.com/pt/fleet-manager/fleet/uav-details/).

Source: https://docs.uavmatrix.com/pt/guides/fleet-onboarding/
