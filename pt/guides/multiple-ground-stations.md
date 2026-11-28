# Transmita para várias estações de controle terrestre

> Envie telemetria e vídeo ao vivo de um drone para várias estações QGroundControl ou Mission Planner com o UAVcast-Pro, com observadores somente leitura.

Um drone, várias telas: um piloto no Mission Planner, um operador de carga útil no QGroundControl, um supervisor acompanhando do escritório. O UAVcast-Pro envia telemetria e vídeo para cada destino que você adicionar, cada um com suas próprias chaves.

## Como funciona

Cada entrada em **Estações de Controle Terrestre** é um destino: um endereço IPv4 mais uma porta de telemetria e uma porta de vídeo. O UAVcast-Pro envia:

- telemetria MAVLink por UDP para a **Porta de Telemetria** (padrão 14550) quando **Ativar Telemetria** está ligado,
- vídeo H.264 por RTP/UDP para a **Porta de Vídeo** (padrão 5600) quando **Ativar Vídeo** está ligado,
- nada, quando **Ativar Endpoint** está desligado.

Os comandos de todos os destinos chegam ao controlador de voo, a menos que aquele destino esteja marcado como **Somente leitura**.

## 1. Adicione um destino por estação

1. Abra **Estações de Controle Terrestre** e clique em **Adicionar Destino** uma vez para cada estação.
2. Dê a cada uma um **Nome** que você reconheça no campo, por exemplo *Piloto – Mission Planner* e *Carga útil – QGC*.
3. Digite o endereço IPv4 de cada computador em **IP ou Host de Destino**. Pela 4G, use os endereços da VPN.
4. Ative **Ativar Telemetria** e **Ativar Vídeo** onde forem necessários. Uma estação que só precisa de telemetria economiza largura de banda com o vídeo desligado.

![Página Estações de Controle Terrestre com dois cartões de destino e o botão Adicionar Destino](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/ground-control.webp)

*Estação de Controle Terrestre com dois cartões de destino. Adicionar Destino cria um cartão por estação.*

## 2. Torne os observadores somente leitura

Para quem deve acompanhar, mas nunca pilotar, ative **Somente leitura** no destino dessa pessoa. A estação continua recebendo telemetria ao vivo, mas não pode alterar nada no veículo: comandos, mudanças de modo, armamento, gravações de parâmetros, gravações de missão e substituições de canais RC vindas dela são bloqueados. Isso vale a partir do UAVcast-Pro 6.5.3; em versões anteriores, **Somente leitura** não bloqueia gravações de parâmetros. O software da estação de controle terrestre pode exibir avisos neste modo, porque algumas de suas solicitações (como baixar os parâmetros ou a missão) ficam sem resposta.

> **Dois pilotos, um drone**
>
> Sem a opção Somente leitura, qualquer estação pode comandar o drone. Combinem quem pilota e deixem todas as outras estações como somente leitura.

## 3. Duas estações em um mesmo computador

Dois programas em um mesmo computador não podem escutar a mesma porta. Adicione dois destinos com o mesmo IP e portas diferentes, por exemplo:

| Destino | Porta de Telemetria | Porta de Vídeo |
| --- | --- | --- |
| Mission Planner | 14550 | 5600 |
| QGroundControl | 14551 | 5603 |

Depois, configure o segundo programa para escutar essas portas (no QGroundControl, adicione um link de comunicação UDP na 14551 e defina a porta UDP de vídeo como 5603).

Espace as portas de vídeo em **3 unidades** (5600, 5603, 5606 …). Cada destino usa sua porta de vídeo, mais a porta de vídeo + 1 para a segunda câmera na [transmissão dupla](https://docs.uavmatrix.com/pt/guides/dual-camera-rc-switching/) e a porta de vídeo + 2 para o [áudio](https://docs.uavmatrix.com/pt/uavcast-pro/camera/audio/). Portas mais próximas entre si entram em conflito assim que você ativa a transmissão dupla ou o áudio.

## 4. Atenção ao uplink

Cada destino de vídeo é uma cópia separada do fluxo. Três destinos de vídeo a 1500 kbps precisam de cerca de 4,5 Mbit/s de uplink do drone. Pela 4G, envie vídeo somente para as estações que precisam dele, ou reduza a taxa de bits em **Câmera → Configurações da câmera**. **Painel → Tráfego de Rede** mostra o que o modem realmente envia.

## 5. Verifique se cada estação recebe dados

No **Painel**, a linha **Estação de controle terrestre** mostra *Enviando para n · x pacotes/s*. A **Verificação de conexão** em **Controlador de Voo → Conexão** lista cada saída de estação de controle terrestre e qualquer destino deixado de fora por ter um endereço inválido.

## Com o Fleet Manager

No Fleet Manager, as estações de controle terrestre entram na VPN da organização, e você as conecta aos drones com **Stream Bindings** na página **Network**. Cada drone adicional vinculado à mesma estação recebe seu próprio bloco de portas. Veja [Vinculações de fluxo](https://docs.uavmatrix.com/pt/fleet-manager/network/stream-bindings/).

Source: https://docs.uavmatrix.com/pt/guides/multiple-ground-stations/
