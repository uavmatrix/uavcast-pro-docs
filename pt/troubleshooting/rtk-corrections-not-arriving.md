# Correções RTK não chegam

> NTRIP preso em Connecting, nenhum RTCM encaminhado ou sem RTK Fixed? Verifique o host do caster, a porta, o mountpoint, as credenciais, o GGA upstream e o receptor GPS.

Em **Controlador de Voo → NTRIP / RTK**, o status não chega a **Transmitindo correções**, **RTCM messages forwarded** continua em zero, ou as correções chegam, mas o controlador de voo nunca passa de **Fixação 3D** ou **RTK Float**.

A cadeia tem quatro elos: internet → caster → UAVcast-Pro → controlador de voo → receptor GPS. Encontre o primeiro que falha.

![Aba NTRIP / RTK com o painel de status, os contadores, a linha de resposta do caster e o cartão de qualidade GPS](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/flight-controller--ntrip.webp)

*Controlador de Voo → NTRIP / RTK em uma unidade sem caster configurado: status Disabled, contadores em zero e Caster response vazio. O normal é Transmitindo correções, uma resposta 200 do caster e contadores crescendo.*

| O que você vê | Causa provável | Comece em |
| --- | --- | --- |
| Status Connecting ou Error, sem resposta do caster | Host ou porta errados, incompatibilidade de TLS, ou sem internet | [Verificação 1](https://docs.uavmatrix.com/pt/troubleshooting/rtk-corrections-not-arriving/#check-1) |
| Resposta do caster 401 Unauthorized | Usuário, senha ou mountpoint errados | [Verificação 2](https://docs.uavmatrix.com/pt/troubleshooting/rtk-corrections-not-arriving/#check-2) |
| O registro diz que o caster retornou a sourcetable | O nome do mountpoint está errado | [Verificação 2](https://docs.uavmatrix.com/pt/troubleshooting/rtk-corrections-not-arriving/#check-2) |
| Conectado, mas sem dados RTCM, reconecta a cada poucos segundos | O caster precisa primeiro de uma posição GGA | [Verificação 3](https://docs.uavmatrix.com/pt/troubleshooting/rtk-corrections-not-arriving/#check-3) |
| RTCM encaminhado, mas a fixação fica em Fixação 3D | Link com o controlador de voo caído, ou receptor sem suporte a RTK | [Verificação 4](https://docs.uavmatrix.com/pt/troubleshooting/rtk-corrections-not-arriving/#check-4) |
| RTK Float, nunca RTK Fixed | Visão do céu, distância até a base, ou tempo | [Verificação 5](https://docs.uavmatrix.com/pt/troubleshooting/rtk-corrections-not-arriving/#check-5) |

## Verificação 1: alcance o caster

1. Confira o **Host do caster** e a **Porta**. A maioria dos casters públicos usa TCP simples na porta `2101`.
2. **Usar TLS (HTTPS)** deve corresponder ao caster. Casters comerciais (Trimble, Hexagon, Topcon e outros) costumam exigir TLS, normalmente ainda na porta 2101, às vezes 2102 ou 443. Casters públicos normalmente não usam TLS.
3. Certifique-se de que o drone tem internet. **Painel → Celular** deve estar conectado. Se não estiver, veja [Modem conectado, sem internet](https://docs.uavmatrix.com/pt/troubleshooting/modem-no-internet/).
4. Alguns planos de celular bloqueiam portas de saída incomuns. Se o caster oferecer a porta 443, tente-a.

## Verificação 2: credenciais e mountpoint

1. Pressione **Testar conexão**. **Caster accepted the credentials.** significa que usuário e senha estão corretos.
2. Para rtk2go.com, use um endereço de e-mail real como **Usuário** e deixe a **Senha** vazia.
3. Pressione **Procurar mountpoints** e escolha um mountpoint da lista em vez de digitar o nome. Prefira um próximo da região onde você voa.

Se o caster responder com sua sourcetable em vez de dados, o registro NTRIP diz *caster returned sourcetable — check mountpoint*. O nome do mountpoint está errado ou não existe mais.

## Verificação 3: envie GGA upstream

Casters VRS e de mountpoint mais próximo só enviam correções depois de saber onde você está. A coluna **NMEA** no navegador de mountpoints mostra **Required** para esses mountpoints.

1. Ative **Enviar GGA upstream** (ativado por padrão). **Send interval (seconds)** tem padrão 10.
2. **Position source**: **Live position from flight controller** é o correto em voo. Até o controlador de voo informar uma fixação GPS, o UAVcast-Pro usa a **Fixed manual position**, então digite uma latitude e longitude próximas a você para testes em bancada.
3. Observe a atualização de **Last GGA sent**.

O UAVcast-Pro reconecta sozinho quando o caster fica em silêncio, e o registro mostra *no data from caster for …s — reconnecting*. Depois de uma queda curta de internet, as correções são retomadas em poucos segundos.

## Verificação 4: do UAVcast-Pro ao receptor

As correções chegam ao GPS pelo link com o controlador de voo, como MAVLink `GPS_RTCM_DATA`.

1. O controlador de voo deve estar **Connected** em **Controlador de Voo → Conexão**. Se não estiver, veja [Sem heartbeat MAVLink do controlador de voo](https://docs.uavmatrix.com/pt/troubleshooting/no-mavlink-heartbeat/).
2. Veja o cartão **Qualidade GPS**. **No RTK status from receiver** significa que o controlador de voo nunca informou status RTK. O GPS conectado geralmente não tem suporte a RTK: RTK exige um receptor RTK de fase de portadora, como u-blox F9P, Here3+ ou Septentrio Mosaic. Um módulo de navegação comum M8N ou M10 não faz RTK.
3. **Recent message types** deve incluir as constelações que seu receptor usa (por exemplo 1077 GPS, 1087 GLONASS, 1097 Galileo, 1127 BeiDou) e uma mensagem de posição da base (1005 ou 1006).

## Verificação 5: Float, mas nunca Fixed

- Dê à antena céu aberto. Árvores, prédios e a própria eletrônica do drone causam multipath e ruído.
- Espere. Uma partida a frio pode levar um ou dois minutos, mesmo em boas condições.
- Escolha uma base mais próxima. A precisão e a chance de fixação caem com a distância da estação base.
- **Última correção** em **Qualidade GPS** deve ficar em alguns segundos. Se crescer, as correções estão se perdendo no link.

## Ainda não funciona?

[Baixe os logs](https://docs.uavmatrix.com/pt/troubleshooting/collect-logs/) com **NTRIP Client** selecionado e envie-os, junto com o provedor do caster e o modelo do GPS, para **[support@uavmatrix.com](mailto:support@uavmatrix.com)**. A configuração completa está em [Configurar RTK com um caster NTRIP](https://docs.uavmatrix.com/pt/guides/rtk-ntrip-caster/).

Relacionados: [Configurações de NTRIP / RTK](https://docs.uavmatrix.com/pt/uavcast-pro/flight-controller/ntrip-rtk/)

Source: https://docs.uavmatrix.com/pt/troubleshooting/rtk-corrections-not-arriving/
