# Drone aparece como Offline no Fleet Manager

> UAV pareado aparece como Offline ou com Re-pair required no Fleet Manager? Verifique a internet do drone, a porta de saída 8883, o Fleet Management do UAVcast-Pro e a licença.

O UAV está pareado, mas o Fleet Manager o mostra como **Offline** (em cinza no mapa da frota), a telemetria dele está congelada, ou ele tem o selo **Re-pair required**.

O Fleet Manager marca um UAV como offline quando não recebe nada dele por 20 segundos. O drone se comunica com o Fleet Manager por uma conexão MQTT criptografada, pela sua própria conexão de internet.

| O que você vê | Causa provável | Comece em |
| --- | --- | --- |
| Offline, e o Fleet Management do UAVcast-Pro diz Desconectado | O drone não tem internet, ou a porta 8883 está bloqueada | [Verificação 1](https://docs.uavmatrix.com/pt/troubleshooting/drone-offline-fleet-manager/#check-1) |
| Selo Re-pair required, ou This UAV must be re-paired | O drone tem um certificado antigo | [Verificação 2](https://docs.uavmatrix.com/pt/troubleshooting/drone-offline-fleet-manager/#check-2) |
| Offline logo depois de reinstalar ou redefinir o UAVcast-Pro | O pareamento foi removido no drone | [Verificação 3](https://docs.uavmatrix.com/pt/troubleshooting/drone-offline-fleet-manager/#check-3) |
| Online, mas sem posição ou bateria | Controlador de voo não conectado ao UAVcast-Pro | [Verificação 4](https://docs.uavmatrix.com/pt/troubleshooting/drone-offline-fleet-manager/#check-4) |

## Verificação 1: a conexão do drone com o Fleet Manager

1. Abra o UAVcast-Pro no drone e vá em **Fleet Management**. **Fleet Connection** mostra **Connected** ou **Disconnected**, e **Last Connected**.
2. Se estiver **Disconnected**, verifique se o drone tem internet: a linha **Celular** do painel, ou `curl -I https://fleet-manager.uavmatrix.com` no dispositivo. Corrija antes o link com [Modem conectado, sem internet](https://docs.uavmatrix.com/pt/troubleshooting/modem-no-internet/).
3. O drone precisa conseguir abrir uma **conexão TCP de saída na porta 8883** (MQTT sobre TLS). Algumas redes corporativas, Wi-Fi público e alguns planos de SIM para IoT só permitem portas web. Tente outra rede ou peça à operadora que libere a 8883.
4. Verifique a data e a hora no dispositivo com `date`. A conexão usa certificados, que falham em um dispositivo com relógio errado.
5. Confirme que a licença do drone ainda está ativa (**Aplicação → Gerenciador de Licença**).

## Verificação 2: Re-pair required

O Fleet Manager mudou a forma como os drones se conectam, e os UAVs pareados antes dessa mudança precisam ser pareados mais uma vez. Nada se perde: o UAV mantém o nome e o histórico, e você não precisa removê-lo no Fleet Manager.

1. No UAVcast-Pro do drone, abra **Fleet Management**, pressione **Disconnect from Fleet** e confirme.
2. Pressione **Connect to Fleet Manager**. Um **Pairing Code** de 8 dígitos aparece com uma contagem regressiva.
3. No Fleet Manager, vá em **Fleet → Pair Device**, escolha a organização e digite o código.

## Verificação 3: o drone perdeu o pareamento

Uma reinstalação com **Redefinir Banco de Dados**, ou o **Disconnect from Fleet**, remove o pareamento no drone, e ele para de reportar. Pareie-o de novo como na verificação 2. Parear na mesma organização reaproveita a entrada de UAV existente.

## Verificação 4: online, mas sem telemetria

Posição, bateria e modo de voo vêm do controlador de voo. Se o UAV está online, mas esses campos estão vazios, o UAVcast-Pro não consegue ouvir o controlador de voo: veja [Sem heartbeat MAVLink](https://docs.uavmatrix.com/pt/troubleshooting/no-mavlink-heartbeat/).

## Ainda offline?

[Baixe os logs](https://docs.uavmatrix.com/pt/troubleshooting/collect-logs/) do drone com **Todos os Logs** selecionado e envie para **[support@uavmatrix.com](mailto:support@uavmatrix.com)** com o nome do UAV e a organização. Outros problemas do Fleet Manager estão em [Solução de problemas do Fleet Manager](https://docs.uavmatrix.com/pt/fleet-manager/troubleshooting/).

Relacionado: [Pareamento do Fleet Manager no UAVcast-Pro](https://docs.uavmatrix.com/pt/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/pt/troubleshooting/drone-offline-fleet-manager/
