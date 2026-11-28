# Sem telemetria no QGroundControl ou no Mission Planner

> Controlador de voo conectado no UAVcast-Pro, mas o QGroundControl ou o Mission Planner continua aguardando? Verifique Ativar Telemetria, o IP, a UDP 14550 e a VPN.

O UAVcast-Pro mostra o controlador de voo como **Connected**, mas o QGroundControl diz *Waiting for vehicle connection* ou o Mission Planner expira com *No heartbeat packets received*. O drone recebe o controlador de voo; a telemetria apenas não chega à sua estação de controle terrestre.

Se o próprio UAVcast-Pro mostrar **No heartbeat**, corrija isso primeiro: [Sem heartbeat MAVLink do controlador de voo](https://docs.uavmatrix.com/pt/troubleshooting/no-mavlink-heartbeat/).

| O que você vê | Causa provável | Comece em |
| --- | --- | --- |
| Painel: Ground station None set up, ou Not sending | Nenhum destino, ou **Ativar Telemetria** está desativado | [Verificação 1](https://docs.uavmatrix.com/pt/troubleshooting/no-telemetry-in-gcs/#check-1) |
| O painel diz Sending, mas a estação de controle terrestre não vê nada | IP errado, firewall, ou a estação escuta em outra porta | [Verificação 2](https://docs.uavmatrix.com/pt/troubleshooting/no-telemetry-in-gcs/#check-2) |
| Funcionava no Wi-Fi, nada pelo 4G | O destino é um IP local em vez do IP da VPN | [Verificação 3](https://docs.uavmatrix.com/pt/troubleshooting/no-telemetry-in-gcs/#check-3) |
| Conectava por TCP 5760, parou após uma atualização | TCP 5760 foi fechada na v6.5.0 | [Verificação 4](https://docs.uavmatrix.com/pt/troubleshooting/no-telemetry-in-gcs/#check-4) |
| A telemetria aparece, mas comandos e mudanças de modo não funcionam | **Somente leitura** está ativado para este destino | [Verificação 5](https://docs.uavmatrix.com/pt/troubleshooting/no-telemetry-in-gcs/#check-5) |

## Verificação 1: a telemetria está sendo enviada?

1. Abra o **Painel** e leia a linha **Ground station** no cartão de status.

   - **None set up**: não há destino. Adicione um na etapa 2.
   - **Not sending**: existe um destino, mas nada está saindo.
   - **Sending to … · n packets/s**: a telemetria sai do drone. Vá para a verificação 2.

2. Vá para **Estações de Controle Terrestre**. Pressione **Adicionar Destino** se a lista estiver vazia.

3. No cartão do seu computador, ative **Ativar Endpoint** e **Ativar Telemetria**. Vídeo e telemetria ficam desativados em um novo destino.

4. Digite o endereço IPv4 do computador em **IP ou Host de Destino** e mantenha **Porta de Telemetria** em `14550`.

![Seção de telemetria de um destino com Ativar Telemetria ligado e Somente leitura desligado](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/ground-control--telemetry-enabled.webp)

*Estações de Controle Terrestre: um destino com Ativar Telemetria ligado.*

> **Endereços inválidos são ignorados**
>
> O UAVcast-Pro aceita apenas endereços IPv4, como `192.168.1.10`. Se você tentar salvar um nome de host, verá *Enter a valid IPv4 address, for example 192.168.1.10.* Um endereço ausente ou inválido fica de fora do roteador de telemetria, e a **Connection check** na página Controlador de Voo lista esse problema.

## Verificação 2: certifique-se de que a estação está escutando

O UAVcast-Pro envia MAVLink por UDP para o endereço e a porta que você definiu. A estação de controle terrestre deve escutar nessa porta.

- **QGroundControl** escuta na UDP 14550 por padrão. Se você alterou **Porta de Telemetria**, adicione um comm link UDP na mesma porta em **Application Settings → Comm Links**.
- **Mission Planner**: escolha **UDP** na lista de conexão no canto superior direito, pressione **Connect** e aceite a porta `14550`.
- Só um programa pode escutar em uma porta. Feche o MAVProxy, um segundo QGroundControl ou outra ferramenta que possa estar usando a 14550.
- Permita UDP 14550 de entrada no firewall. Os comandos estão em [Sem vídeo, verificação 3](https://docs.uavmatrix.com/pt/troubleshooting/no-video-in-gcs/#check-3).

## Verificação 3: use o endereço da VPN pelo 4G

Pelo 4G, o drone não consegue alcançar um endereço local como `192.168.1.20`. Coloque o endereço de VPN do seu computador (Fleet Manager VPN, Tailscale ou ZeroTier) em **IP ou Host de Destino**.

A partir do computador, faça ping no endereço VPN do drone. Se o ping falhar, a VPN é o problema: veja [VPN conectada, mas não consegue alcançar o drone](https://docs.uavmatrix.com/pt/troubleshooting/vpn-cant-reach-drone/).

## Verificação 4: TCP 5760 não funciona mais

Desde a v6.5.0, o roteador de telemetria não aceita conexões TCP na porta 5760, então apenas as estações de controle terrestre que você adiciona e ativa recebem dados. Se você conectava o Mission Planner por TCP 5760, adicione seu computador como destino e conecte por UDP.

## Verificação 5: comandos são ignorados

Se a telemetria aparece, mas armar, trocar de modo ou enviar missões não faz nada, verifique **Somente leitura** nesse destino. **Somente leitura** bloqueia tudo o que alteraria o veículo (comandos, mudanças de modo, gravações de parâmetros e de missão), então a estação só pode observar. Isso vale a partir do UAVcast-Pro 6.5.3; em versões anteriores, **Somente leitura** não bloqueia gravações de parâmetros. Algumas estações de controle terrestre mostram avisos nesse modo, porque parte das requisições delas fica sem resposta.

## Ainda sem resultado?

[Baixe os logs](https://docs.uavmatrix.com/pt/troubleshooting/collect-logs/) com **Mavlink Manager** selecionado e envie-os para **[support@uavmatrix.com](mailto:support@uavmatrix.com)**. Informe qual estação de controle terrestre você usa e o endereço IP dela.

Relacionados: [Estações de Controle Terrestre](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/) · [Portas e protocolos](https://docs.uavmatrix.com/pt/reference/ports-and-protocols/)

Source: https://docs.uavmatrix.com/pt/troubleshooting/no-telemetry-in-gcs/
