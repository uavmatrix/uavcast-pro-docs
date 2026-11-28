# VPN conectada, mas não consegue alcançar o drone

> Fleet Manager VPN, Tailscale ou ZeroTier diz conectado, mas você não consegue fazer ping no drone? Verifique a autorização, a rede ou tailnet, a internet e o IP da estação de controle terrestre.

Tanto o drone quanto o seu notebook dizem estar na VPN, mas o `ping` para o endereço VPN do drone expira, a interface web não abre pela VPN, ou a telemetria e o vídeo não chegam.

| O que você vê | Causa provável | Comece em |
| --- | --- | --- |
| A rede ZeroTier mostra ACCESS_DENIED, ou nenhum endereço IP | O drone não está autorizado na rede | [Verificação 1](https://docs.uavmatrix.com/pt/troubleshooting/vpn-cant-reach-drone/#check-1) |
| O drone está bem, o notebook não recebe endereço ou recebe o errado | O notebook entrou em outra rede ou tailnet | [Verificação 2](https://docs.uavmatrix.com/pt/troubleshooting/vpn-cant-reach-drone/#check-2) |
| O Tailscale funcionou por semanas, depois parou | A chave do dispositivo expirou | [Verificação 3](https://docs.uavmatrix.com/pt/troubleshooting/vpn-cant-reach-drone/#check-3) |
| A VPN no drone nunca conecta em campo | O drone não tem internet pelo modem | [Verificação 4](https://docs.uavmatrix.com/pt/troubleshooting/vpn-cant-reach-drone/#check-4) |
| O ping funciona, mas sem telemetria ou vídeo | O destino da estação de controle terrestre usa o IP errado | [Verificação 5](https://docs.uavmatrix.com/pt/troubleshooting/vpn-cant-reach-drone/#check-5) |

## Verificação 1: autorize o drone na rede

**ZeroTier:**

1. No UAVcast-Pro, abra **Rede Privada Virtual**. Confira se **Ativar VPN** está em **Sim**, **Serviços** está em **ZeroTier**, e o **ID da Rede** é o do seu controlador ZeroTier.
2. Veja sua rede em **Redes Conectadas**. Se o selo de status disser **ACCESS_DENIED**, o drone entrou, mas não está autorizado.
3. No seu controlador ZeroTier, abra a rede e autorize o membro com o ID de nó do drone.
4. De volta ao UAVcast-Pro, espere até que a rede mostre o status `OK` e um endereço IP. Esse é o endereço que você usa a partir do notebook.

Em uma rede ZeroTier privada, cada dispositivo que entra (drone, notebook, tablet) precisa ser autorizado uma vez no controlador antes de receber um endereço. (As redes UAVnet também são privadas; a UAVnet está sendo desativada, então migre para a Fleet Manager VPN.)

**Tailscale:** o drone mostra **Conectado** com um **Endereço IPv4** (100.x.y.z) quando está dentro. Se disser **Não Conectado**, use **Login Web → Gerar URL de login**, ou a aba **Chave de Autenticação** com uma chave do seu console de administração do Tailscale.

## Verificação 2: coloque o notebook na mesma rede

Os dois lados precisam estar na mesma rede ZeroTier ou na mesma tailnet.

- **ZeroTier**: no notebook, entre na mesma Network ID e autorize o notebook também no seu controlador. No Windows, verifique o ícone do ZeroTier na bandeja; no Linux, execute `sudo zerotier-cli listnetworks`. O status deve ser `OK`.
- **Tailscale**: um cliente Tailscale está em uma tailnet por vez. No notebook, execute `tailscale status`. O drone deve estar na lista. Se não estiver, o notebook está logado em outra conta ou tailnet.
- **Fleet Manager VPN**: se o drone foi pareado com o Fleet Manager e a VPN, ele está na rede da sua organização, não no seu Tailscale pessoal. Conecte o notebook com o comando que o Fleet Manager mostra em **Network** (`tailscale up --login-server=… --authkey=…`) e execute-o **no notebook, nunca no drone**. Veja [Conectar uma estação de controle terrestre](https://docs.uavmatrix.com/pt/fleet-manager/connect-gcs/).

> **O pareamento pode substituir a VPN do drone**
>
> Quando você pareia um drone no Fleet Manager com **Replace existing VPN with Fleet Manager network**, o drone deixa a rede Tailscale atual e entra na rede da organização. Notebooks na tailnet antiga não conseguem mais alcançá-lo.

## Verificação 3: chave do Tailscale expirada

As chaves de dispositivo do Tailscale expiram. Quando a chave do drone expira, ele sai da tailnet até fazer login de novo. O campo **Expira** na página **Rede Privada Virtual** mostra a data. No console de administração do Tailscale, você pode desativar a expiração da chave do drone, para que ele não saia no meio de um projeto.

## Verificação 4: o drone precisa de internet primeiro

A VPN roda pela própria conexão de internet do drone. Se o modem não tiver internet, a VPN aparece como desconectada ou nunca recebe um endereço. Corrija a conexão primeiro: [Modem conectado, sem internet](https://docs.uavmatrix.com/pt/troubleshooting/modem-no-internet/).

## Verificação 5: alcançável, mas sem dados

Se `ping <drone-vpn-ip>` funcionar:

- **Interface web**: abra `http://<drone-vpn-ip>/`. A pré-visualização ao vivo também precisa que a porta 8889 esteja acessível pela VPN.
- **Telemetria e vídeo**: são enviados *do* drone *para* o endereço em **Estações de Controle Terrestre → IP ou Host de Destino**. Deve ser o endereço VPN do notebook, não o do drone, e não o endereço Wi-Fi do notebook. Depois veja [Sem telemetria](https://docs.uavmatrix.com/pt/troubleshooting/no-telemetry-in-gcs/) ou [Sem vídeo](https://docs.uavmatrix.com/pt/troubleshooting/no-video-in-gcs/).
- **Lento, mas funcionando**: o Tailscale mostra o **Relay** em uso. Uma conexão por relay funciona, mas adiciona atraso. Algumas redes celulares não permitem conexões diretas, então um relay pode ser o máximo que a operadora oferece.

## Ainda inalcançável?

[Baixe os logs](https://docs.uavmatrix.com/pt/troubleshooting/collect-logs/) com **VPN Manager** selecionado e envie-os para **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, com a saída de `zerotier-cli listnetworks` ou `tailscale status` do drone e do notebook.

Relacionados: [Configurações de VPN](https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/vpn/) · [Rede do Fleet Manager](https://docs.uavmatrix.com/pt/fleet-manager/network/)

Source: https://docs.uavmatrix.com/pt/troubleshooting/vpn-cant-reach-drone/
