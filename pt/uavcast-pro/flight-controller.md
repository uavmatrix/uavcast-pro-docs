# Conecte o controlador de voo

> Conecte um Pixhawk ou qualquer outro controlador de voo ArduPilot ou PX4 ao UAVcast-Pro via USB ou UART, com detecção automática de porta e taxa de transmissão e uma verificação de conexão ao vivo.

O UAVcast-Pro lê MAVLink do seu controlador de voo (ArduPilot, PX4 ou qualquer outro piloto automático MAVLink) via USB ou UART (porta TELEM) e o encaminha para cada estação de controle terrestre que você adicionar. Com **Porta** e **Taxa de Transmissão** em **Automático**, o padrão, ele encontra o controlador de voo sozinho, lembra o que funcionou e se reconecta após uma reinicialização, falha de USB ou energização tardia. Você encontra essa configuração em **Controlador de Voo → Conexão**.

![Página Conexão do Controlador de Voo mostrando Conectado, a Verificação de conexão com quatro etapas aprovadas e o Inspetor MAVLink](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/flight-controller.webp)

*Controlador de Voo → Conexão com um link USB para um Pixhawk.*

## Conectar via USB

1. Conecte a porta USB do controlador de voo ao computador companheiro com um cabo que transmita dados.
2. Acesse **Controlador de Voo → Conexão** e selecione **USB** em **Tipo de Conexão**.
3. Deixe **Porta** em **Automático**. Conexões USB não usam taxa de transmissão.
4. Se o painel de status indicar **Conexão parada**, selecione **Conectar**.

Em poucos segundos, o status mostra **CONECTADO** com o tipo do veículo e o ID do sistema, por exemplo *Conectado a Quadrotor (sistema 1) em ArduPilot fmuv2 (ttyACM0)*.

## Conectar via porta TELEM (UART)

1. Faça a fiação da porta TELEM: **TX** do controlador de voo → **RX** do computador companheiro, **RX** → **TX**, e **GND** → **GND**. Não conecte 5 V se as duas placas tiverem alimentação própria.
2. No controlador de voo, configure a porta para MAVLink 2: para TELEM2, é `SERIAL2_PROTOCOL = 2`. Anote `SERIAL2_BAUD`.
3. No UAVcast-Pro, selecione **UART / Serial** em **Tipo de Conexão**.
4. Deixe **Porta** e **Taxa de Transmissão** em **Automático**, ou escolha a porta (em um Raspberry Pi, a UART GPIO aparece marcada como **recomendada**) e a taxa de transmissão que corresponda a `SERIALx_BAUD`.
5. Selecione **Conectar** se a conexão estiver parada.

As alterações são aplicadas imediatamente. Não é preciso reiniciar nada.

> **Taxa de transmissão automática**
>
> No modo automático, o UAVcast-Pro testa as taxas 57600, 115200, 921600, 1500000, 460800, 230400 e 500000 baud, começando pela última taxa que funcionou. Se os heartbeats pararem por 20 segundos enquanto os dados ainda chegam (por exemplo, depois de alterar `SERIALx_BAUD`), ele faz uma nova busca.

## Referência de configurações

| Configuração | Padrão | Valores | Observações |
| --- | --- | --- | --- |
| **Conexão habilitada** | Ligado | Ligado, desligado | Desligado libera a porta serial e interrompe a telemetria para todas as estações de controle terrestre. |
| **Tipo de Conexão** | **USB** | **USB**, **UART / Serial** | Define em quais portas o modo **Automático** busca. |
| **Porta** | **Automático** | **Automático**, uma porta detectada, **Caminho personalizado…** | O modo Automático prefere o caminho estável `/dev/serial/by-id/…` e acompanha o dispositivo se o número dele mudar. Caminho personalizado aceita qualquer dispositivo, como `/dev/ttyAMA0`. Portas usadas por outro programa mostram *em uso por …*. |
| **Taxa de Transmissão** | **Automático** | **Automático** ou uma taxa fixa | Ignorada para USB. Deve corresponder a `SERIALx_BAUD` quando fixa. |

## Leia o painel de status

| Estado | Significado |
| --- | --- |
| **Conectado** | Os heartbeats estão chegando. **Conectado há**, **Último heartbeat** e **Reconexões automáticas** mostram a saúde da conexão. |
| **Aguardando dispositivo** | A porta não existe. O controlador de voo está desconectado, sem energia ou ainda inicializando. |
| **Detectando taxa de transmissão** | Testando taxas de transmissão (*Testando 115200 baud (2 de 7)*). |
| **Sem heartbeat** | A porta está aberta, mas nenhum MAVLink válido chega: taxa de transmissão errada, TX/RX invertidos ou a porta não está configurada para MAVLink. |
| **Reconectando** | A conexão caiu e está voltando sozinha. |
| **Buscando** | A **Detecção automática** está verificando todas as portas e velocidades. Isso pode levar até um minuto. |
| **Desligado** / **Parado** | A conexão está desligada ou parada. Selecione **Conectar**. |

### Verificação de conexão

O cartão **Verificação de conexão**, atualizado a cada segundo, acompanha os dados desde o cabo até a estação de controle terrestre. A primeira linha que não estiver verde indica o problema:

1. **Controlador de voo conectado** (USB) ou **Porta serial disponível** (UART). *Não detectado* geralmente significa um cabo USB somente de carga ou falta de energia.
2. **Sinal no cabo**: bytes chegam à porta.
3. **Dados legíveis do controlador de voo**: os bytes são decodificados como MAVLink. *% danificado* indica cabo solto ou longo, falta de terra ou ruído dos cabos de energia.
4. **Controlador de voo respondendo**: heartbeats do veículo.
5. **Enviando para a estação de controle terrestre**: pacotes por segundo para cada destino habilitado, ou *Nenhuma estação de controle terrestre configurada*.

### Detecção automática

A **Detecção automática** pausa a conexão, escuta todas as portas seriais em todas as taxas de transmissão, salva a porta e a velocidade encontradas e inicia a conexão com elas. Use-a quando não souber qual porta ou taxa de transmissão o controlador de voo usa. **Mostrar o que foi testado** lista cada tentativa.

## Painel Inspetor Mavlink

A coluna da direita mostra o estado ao vivo do veículo: conexão, **Informações de Failsafe GCS**, **Informações do Veículo** (tipo, controlador, modo de voo, armado), **Status da Bateria**, **Informações do GPS** e dados de voo. Se o painel mostrar **Aviso - Failsafe Desativado**, o controlador de voo não tem failsafe GCS. Ative-o (`FS_GCS_ENABLE` no ArduPilot) antes de voar sobre um link celular.

## Segurança: nenhuma porta de telemetria aberta

O UAVcast-Pro não aceita conexões de telemetria de entrada. O servidor TCP na porta 5760, que o mavlink-router normalmente abre, está desativado; assim, somente as estações de controle terrestre que você adicionar em [Estações de Controle Terrestre](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/) recebem telemetria, e apenas enquanto **Ativar Telemetria** estiver ligado.

> **Vindo de uma versão anterior**
>
> Versões anteriores usavam `/dev/ttyACM0` por padrão, com 57600 baud, e aceitavam conexões TCP na porta 5760. Desde a v6.4.3, todo dispositivo passa para **Automático** uma única vez, com a porta e a taxa antigas testadas primeiro. Desde a v6.5.0, a TCP 5760 está fechada: adicione seu PC como estação de controle terrestre e conecte-se via UDP.

## Relacionados

- [Correções NTRIP / RTK](https://docs.uavmatrix.com/pt/uavcast-pro/flight-controller/ntrip-rtk/)
- [Injetores: envie seus próprios dados de sensores para o MAVLink](https://docs.uavmatrix.com/pt/uavcast-pro/flight-controller/injectors/)
- [Estações de controle terrestre](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/)
- [Solução de problemas: sem heartbeat MAVLink](https://docs.uavmatrix.com/pt/troubleshooting/no-mavlink-heartbeat/)

Source: https://docs.uavmatrix.com/pt/uavcast-pro/flight-controller/
