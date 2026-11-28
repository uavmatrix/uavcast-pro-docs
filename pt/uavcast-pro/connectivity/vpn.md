# VPN

> Coloque seu drone e sua estação de controle terrestre na mesma rede privada com a VPN do Fleet Manager, ou com sua própria rede Tailscale ou ZeroTier, para que a telemetria e o vídeo funcionem via 4G/LTE.

Em 4G/LTE, seu drone recebe da operadora móvel um endereço que sua estação de controle terrestre não consegue alcançar. Uma VPN resolve isso: o drone e a estação de controle terrestre entram na mesma rede privada e recebem endereços fixos nela, onde quer que estejam e qualquer que seja a rede que usem. Abra **Rede Privada Virtual** na barra lateral.

A forma mais rápida é a **VPN do Fleet Manager**, que está incluída na sua licença do UAVcast-Pro. Se você já usa sua própria tailnet do Tailscale ou sua própria rede ZeroTier, o UAVcast-Pro pode entrar nela.

![Página Rede Privada Virtual com a VPN ativada, Tailscale selecionado, a aba Fleet Manager e as Informações da VPN mostrando Não Conectado](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/private-network.webp)

*Rede Privada Virtual com Tailscale selecionado em um drone que ainda não está pareado ou com login feito.*

## Qual devo usar?

|  | VPN do Fleet Manager | Tailscale | ZeroTier |
| --- | --- | --- | --- |
| Conta | Sua organização no Fleet Manager (incluída na licença) | Sua própria conta Tailscale | Sua própria rede ZeroTier (autogerenciada) |
| Configuração no drone | Um clique durante ou após o pareamento | Login com um link no navegador ou uma chave de autenticação | Cole um ID de rede |
| Estações de controle terrestre | Conectadas pela página **Network** do Fleet Manager, com fluxos configurados por vinculações de fluxo | Entram na sua tailnet | Entram na sua rede |
| Ideal para | A maioria dos operadores e todas as frotas | Equipes que já usam Tailscale | Equipes que já usam ZeroTier |

Por esta página, o drone pode estar em uma VPN por vez.

> **O UAVnet está sendo descontinuado**
>
> O UAVnet, controlador ZeroTier hospedado pela UAVmatrix em uavnet.uavmatrix.com, está sendo descontinuado em favor do Fleet Manager. Se seus drones usam uma rede UAVnet, migre-os para a VPN do Fleet Manager. O botão **Open UAVNet Controller** nesta página abre o UAVnet.

## VPN do Fleet Manager

A VPN do Fleet Manager é a rede privada da sua organização, operada pelo Fleet Manager com o cliente Tailscale. Você não precisa de uma conta Tailscale.

1. No Fleet Manager, abra **Network** e selecione **Enable VPN Network**, caso ainda não esteja ativada. Veja [Rede e VPN](https://docs.uavmatrix.com/pt/fleet-manager/network/).
2. [Pareie o drone](https://docs.uavmatrix.com/pt/uavcast-pro/fleet-pairing/) e mantenha **Enable VPN for this UAV** marcado no assistente de pareamento. Um drone que já está pareado entra pela aba **Fleet Manager** desta página (veja abaixo), ou com **Push to Drone** na página **Network** do Fleet Manager.
3. Coloque cada estação de controle terrestre na rede pela página **Network** do Fleet Manager: [Conecte uma estação de controle terrestre](https://docs.uavmatrix.com/pt/fleet-manager/connect-gcs/).
4. Envie os fluxos para ela com uma [vinculação de fluxo](https://docs.uavmatrix.com/pt/fleet-manager/network/stream-bindings/). O Fleet Manager adiciona o destino na página [Estações de Controle Terrestre](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/) do drone para você.

Uma configuração de voo passo a passo via 4G está em [Voe além do alcance visual via 4G](https://docs.uavmatrix.com/pt/guides/bvlos-4g/).

## Tailscale

Use isto para a sua própria tailnet, ou para a VPN do Fleet Manager em um drone já pareado. O UAVcast-Pro instala o Tailscale. Escolha como o drone faz login em uma das três abas.

**Login Web**

1. Defina **Ativar VPN** como **Sim** e escolha **Tailscale** em **Serviços**.
2. Em **Login Web**, selecione **Gerar URL de login** e, em seguida, **Autenticar este dispositivo**.
3. Faça login no Tailscale na nova aba e aprove o dispositivo.
4. De volta ao UAVcast-Pro, o status muda para **Conectado** e mostra o **Endereço IPv4**, o **Nome do Host** e a **Tailnet**.

**Chave de Autenticação**

1. No [console de administração do Tailscale](https://login.tailscale.com/admin/settings/keys), gere uma chave de autenticação. Torne-a pré-aprovada; torne-a reutilizável se for configurar vários drones.
2. No UAVcast-Pro, escolha **Tailscale**, abra **Chave de Autenticação**, cole a chave (`tskey-auth-…`) e, opcionalmente, defina **Nome do Host (Opcional)**.
3. Selecione **Conectar com Chave de Autenticação**.

Use isto para drones sem um navegador por perto, ou para configurar vários drones da mesma forma.

**Fleet Manager**

Se o drone estiver [pareado com o Fleet Manager](https://docs.uavmatrix.com/pt/uavcast-pro/fleet-pairing/) e sua organização tiver a VPN ativada, selecione **Connect to Fleet Manager VPN**. A conexão pode levar até 30 segundos. Em seguida, o status mostra **Conectado ao Fleet Manager**.

Ainda não está pareado? A aba mostra **Not Paired with Fleet Manager** e um link para **Go to Fleet Manager Pairing**.

Instale o Tailscale na estação de controle terrestre, faça login na mesma tailnet e use o IP Tailscale dela (`100.x.y.z`) como destino em Estações de Controle Terrestre.

Quando conectado, **Interface Desativada** desativa a interface Tailscale sem fazer logout, **Interface Ativada** a reativa e **Sair** remove o dispositivo da tailnet.

> **A VPN do Fleet Manager substitui o seu próprio login Tailscale**
>
> A VPN do Fleet Manager roda no Tailscale com o servidor de login próprio do Fleet Manager. Conectar-se a ela desconecta o drone da sua tailnet. Se a sua sessão SSH passar por essa tailnet, ela será interrompida. Faça isso a partir da rede local.

## ZeroTier

Use isto se você mantém sua própria rede ZeroTier, por exemplo no ZeroTier Central ou no seu próprio controlador.

### Conectar o drone

1. No UAVcast-Pro, acesse **Rede Privada Virtual**.
2. Defina **Ativar VPN** como **Sim**.
3. Em **Serviços**, escolha **ZeroTier**.
4. Cole o ID da sua rede de 16 caracteres em **ID da Rede** e selecione **Entrar na Rede**.
5. Autorize o drone no seu controlador ZeroTier se a rede for privada. Em seguida, o painel **ZeroTier Network** mostra **Conectado** e o **IP do Dispositivo**.

**ACESSO_NEGADO** significa que o membro ainda não foi autorizado.

### Conectar a estação de controle terrestre

1. Instale o [ZeroTier One](https://www.zerotier.com/download/) no computador da estação de controle terrestre.
2. Entre na mesma rede pelo ID: no Windows e no macOS, pelo ícone do ZeroTier na bandeja ou na barra de menus (**Join New Network**); no Linux, com `sudo zerotier-cli join <network-id>`.
3. Autorize-a no seu controlador e anote o endereço IP que ela recebe.

Em [Estações de Controle Terrestre](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/), defina **IP ou Host de Destino** como o IP **ZeroTier** da estação de controle terrestre. A telemetria e o vídeo agora passam pela VPN.

> **Alternando entre Wi-Fi e 4G**
>
> O ZeroTier e o Tailscale seguem a melhor rede disponível. Você pode começar no Wi-Fi no campo, e o link passa para o modem quando o Wi-Fi sai de alcance, sem alterar nenhum endereço.

## Referência de configurações

| Configuração | Padrão | Valores | Observações |
| --- | --- | --- | --- |
| **Ativar VPN** | **Não** | **Sim**, **Não** |  |
| **Serviços** | **ZeroTier** | **ZeroTier**, **Tailscale** | Desativado até que a VPN seja ativada. |
| **ID da Rede** (ZeroTier) | vazio | ID de rede do ZeroTier de 16 caracteres | Do seu próprio controlador ZeroTier. |
| **Chave de Autenticação** (Tailscale) | vazio | `tskey-auth-…` |  |
| **Nome do Host (Opcional)** (Tailscale) | nome do host do sistema | texto | Nome exibido no console de administração do Tailscale. |

## Solução de problemas

| Sintoma | Verificar |
| --- | --- |
| ZeroTier mostra **ACESSO_NEGADO** | Autorize o membro no seu controlador ZeroTier. |
| Conectado, mas sem telemetria na estação de controle terrestre | O destino ainda usa o IP da LAN. Use o IP da VPN da estação de controle terrestre e libere UDP 14550 e 5600 no firewall dela. |
| *Nenhuma Informação VPN Disponível* | A VPN está desativada ou o serviço não está em execução. Verifique **Ativar VPN** e os **Registros de Ações**. |
| Login web do Tailscale mostra *Nenhuma URL de autenticação* | Use a aba **Chave de Autenticação**. |

As interfaces aparecem na página [Redes](https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/networks/) como `zt…` (ZeroTier) ou `tailscale0`, marcadas como **VPN**.

Ainda com problemas? Veja [VPN conectada, mas o drone não pode ser alcançado](https://docs.uavmatrix.com/pt/troubleshooting/vpn-cant-reach-drone/).

Source: https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/vpn/
