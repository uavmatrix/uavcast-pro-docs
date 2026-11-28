# Correções NTRIP / RTK

> Transmita correções RTCM3 de um caster NTRIP via 4G/LTE para o seu controlador de voo, para posicionamento RTK Fixed. Configurações de caster, mountpoint, VRS e GGA.

O UAVcast-Pro tem um cliente NTRIP integrado. Ele se conecta a um caster NTRIP v1 ou v2 pelo link de internet do drone, recebe correções RTCM3 e as repassa ao controlador de voo como MAVLink `GPS_RTCM_DATA`, da mesma forma que a função "Inject GPS" do Mission Planner, mas a partir do próprio drone. Você não precisa de uma estação de controle terrestre nem de uma estação base no local. Abra-o em **Controlador de Voo → NTRIP / RTK**.

## Antes de começar

- Um GPS compatível com RTK no controlador de voo: um receptor multifrequência de fase de portadora, como u-blox F9P, Holybro H-RTK, CUAV C-RTK, Here3+ ou Septentrio Mosaic. Um GPS M8/M10 padrão ignora as correções.
- Uma conta com um caster NTRIP: uma rede CORS nacional, um serviço comercial (Trimble, Hexagon, Topcon e outros) ou [RTK2go](http://rtk2go.com/). Você precisa do host, da porta, do mountpoint e, normalmente, de um nome de usuário e uma senha.
- Internet no drone e um controlador de voo conectado.

## Configure o cliente NTRIP

1. Acesse **Controlador de Voo → NTRIP / RTK**.
2. Em **Caster**, digite o **Host do caster** (por exemplo `ntrip.example.com`) e a **Porta** (`2101` para a maioria dos casters).
3. Digite o **Usuário** e a **Senha** em **Autenticação**. Selecione **Testar conexão** para verificá-los: *Caster aceitou as credenciais.*
4. Selecione **Procurar mountpoints**, escolha o mais próximo da lista e selecione **Selecionar**. Ou digite-o em **Mountpoint**.
5. Se o mountpoint for um fluxo VRS ou de "base mais próxima" (a coluna **NMEA** diz **Required**), mantenha **Enviar GGA upstream** ativado.
6. Ative **Ativar cliente NTRIP**.

O cartão **Estado** muda para **Transmitindo correções** e mostra **Total recebido**, **Taxa de transferência**, **Último frame RTCM** e **Tipos de mensagem recentes**. Com céu limpo, **Fixação RTK do controlador de voo** passa de **Fixação 3D** para **RTK Float** e depois **RTK Fixed**, geralmente em um ou dois minutos.

![Aba NTRIP / RTK com o painel de estado mostrando Desativado e contadores zerados, e o cartão de qualidade do GPS](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/flight-controller--ntrip.webp)

*Controlador de Voo → NTRIP / RTK antes de configurar um caster: estado Desativado, contadores zerados e sem fixação de GPS.*

## Referência de configurações

| Configuração | Padrão | Valores | Observações |
| --- | --- | --- | --- |
| **Ativar cliente NTRIP** | Desligado | Ligado, desligado |  |
| **Host do caster** | vazio | nome de host ou IP | Obrigatório. |
| **Porta** | `2101` | 1–65535 | Alguns casters TLS usam 2102 ou 443. |
| **Mountpoint** | vazio | nome do mountpoint do caster | Obrigatório. Use **Procurar mountpoints** para ler a sourcetable do caster. |
| **Usar TLS (HTTPS)** | Desligado | Ligado, desligado | Para casters que exigem TLS. A maioria dos casters públicos usa TCP simples. |
| **Usuário** / **Senha** | vazio |  | Deixe vazio para casters anônimos. A RTK2go exige um endereço de e-mail real como usuário e nenhuma senha. |
| **Enviar GGA upstream** | Ligado | Ligado, desligado | Envia sua posição como NMEA `$GPGGA` para que casters VRS e de mountpoint mais próximo possam calcular as correções para a sua localização. |
| **Intervalo de envio (segundos)** | `10` | segundos | Com que frequência o GGA é enviado. |
| **Fonte da posição** | **Posição ao vivo do controlador de voo** | **Posição ao vivo do controlador de voo**, **Posição manual fixa** |  |
| **Latitude** / **Longitude** / **Altitude (m)** | `0` |  | Posição manual. Também usada como alternativa até que o controlador de voo tenha uma fixação de GPS. |

## Leia o cartão de qualidade do GPS

O cartão **Qualidade GPS** mostra a fixação ao vivo do controlador de voo, além de uma medição que não depende da estimativa do próprio receptor:

- **Tipo de fixação** e **Satélites**.
- **Precisão horizontal** e **Precisão vertical**: a estimativa do próprio receptor.
- **Estabilidade de posição (1σ)**: o quanto a posição realmente se move enquanto o drone está parado, medido em uma janela curta. Em voo, mostra **Em movimento**.
- **Última correção**: tempo desde o último frame RTCM encaminhado. Se isso continuar aumentando, as correções pararam.

Se aparecer **No RTK status from receiver**, o controlador de voo nunca informou o status RTK. Normalmente, o GPS não é compatível com RTK. As correções continuam sendo encaminhadas.

## Por link celular

As correções são pequenas (normalmente de 1 a 5 kbit/s), então cabem com facilidade junto com a telemetria e o vídeo. Após uma queda curta de internet, o cliente se reconecta em segundos. Uma conexão silenciosa com o caster é detectada em até 15 segundos e reaberta.

O [Painel](https://docs.uavmatrix.com/pt/uavcast-pro/dashboard/) mostra o estado do cliente na linha **Correções RTK**.

## Solução de problemas

| Sintoma | Verificar |
| --- | --- |
| Estado **Erro**, **Resposta do caster** mostra `401` | Usuário ou senha incorretos, ou a conta não tem permissão neste mountpoint. |
| **Conectado**, mas sem frames RTCM | O mountpoint precisa de GGA. Ative **Enviar GGA upstream** e verifique se o controlador de voo tem uma fixação 3D, ou defina uma posição manual. |
| RTCM chega, mas a fixação continua em **Fixação 3D** | O GPS não é compatível com RTK, ou os sistemas GNSS do mountpoint não correspondem ao seu receptor. Verifique a coluna **GNSS** na sourcetable. |
| **RTK Float**, nunca **RTK Fixed** | Base muito distante (procure ficar abaixo de 20 a 30 km), visão limitada do céu ou multicaminho. Tente um mountpoint mais próximo. |

O **Registro do serviço NTRIP** na parte inferior da página mostra cada conexão, reconexão e resposta do caster.

Mais verificações: [Correções RTK não chegam](https://docs.uavmatrix.com/pt/troubleshooting/rtk-corrections-not-arriving/).

Source: https://docs.uavmatrix.com/pt/uavcast-pro/flight-controller/ntrip-rtk/
