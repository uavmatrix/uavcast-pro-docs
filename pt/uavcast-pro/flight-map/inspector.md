# Inspetor MAVLink

> Use o MAVLink Inspector do UAVcast-Pro para ver cada mensagem do controlador de voo com sua taxa, ID do sistema e ID do componente, e depurar telemetria e injetores.

O Inspetor lista cada mensagem MAVLink que o UAVcast-Pro recebe, agrupada por veículo, com sua taxa e os valores mais recentes dos campos. Use-o para verificar se o controlador de voo envia o que você espera, para descobrir os nomes exatos dos campos de uma mensagem ou para confirmar que um [injetor](https://docs.uavmatrix.com/pt/uavcast-pro/flight-controller/injectors/) produz mensagens `NAMED_VALUE_FLOAT`. Abra **Mapa de Voo → Inspetor**.

![Inspetor MAVLink com o estado da conexão e a lista de mensagens do sistema 1, mostrando nomes das mensagens, taxas em Hz e contagens](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/flight-map--inspector.webp)

*Mapa de Voo → Inspetor com as mensagens do controlador de voo (sistema 1) e ATTITUDE expandido.*

## O que você vê

**Estado da Conexão MAVLink** no topo: **Conexão**, **Veículo**, **Satélites GPS**, **Total de Mensagens** e **ID do Sistema**.

**Inspetor de Mensagens** abaixo: um grupo por veículo (*Veículo (ID do Sistema: 1)*), e nele uma linha por mensagem com:

- o nome da mensagem,
- **COMP**: o ID do componente que a enviou (1 = piloto automático, 194 = o padrão para injetores),
- a taxa em **Hz** e o número de mensagens recebidas.

Abra uma mensagem para ver seus campos e valores atuais.

## Verificações comuns

| Pergunta | O que procurar |
| --- | --- |
| O GPS está enviando dados? | `GPS_RAW_INT` em 2 a 10 Hz, e `GPS_RTK` se você usar [RTK](https://docs.uavmatrix.com/pt/uavcast-pro/flight-controller/ntrip-rtk/). |
| Por que a telemetria está lenta na estação de controle terrestre? | Taxas baixas em `ATTITUDE`, `VFR_HUD` ou `GLOBAL_POSITION_INT`. Aumente as taxas dos fluxos `SRx_` na porta MAVLink do controlador de voo. |
| Meu injetor funciona? | `NAMED_VALUE_FLOAT` no COMP 194 (ou no compid que você definiu). |

Se a lista mostrar *Aguardando mensagens...*, a conexão com o controlador de voo não está ativa. Consulte [Controlador de voo](https://docs.uavmatrix.com/pt/uavcast-pro/flight-controller/).

Source: https://docs.uavmatrix.com/pt/uavcast-pro/flight-map/inspector/
