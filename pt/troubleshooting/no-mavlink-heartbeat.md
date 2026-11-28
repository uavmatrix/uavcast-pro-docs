# Sem heartbeat MAVLink do controlador de voo

> O UAVcast-Pro mostra No heartbeat ou Waiting for device? Verifique o cabo USB, a fiação TELEM, o protocolo SERIAL e a taxa de transmissão, depois use Auto-detect.

A página **Controlador de Voo → Conexão** mostra **No heartbeat**, **Waiting for device**, **Detecting baud rate** ou **Searching**, e a linha **Controlador de voo** do painel nunca fica verde. O UAVcast-Pro ainda não consegue ouvir o controlador de voo.

A página tem uma **Connection check** ao vivo que testa cada etapa uma vez por segundo e explica o primeiro problema que encontrar. Leia-a primeiro: normalmente é mais rápido do que esta página.

![Cartão Connection check com quatro linhas: controlador de voo conectado, dados legíveis do controlador de voo, controlador de voo respondendo e enviando para a estação de controle terrestre](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/flight-controller--connection-check.webp)

*A Connection check com um link funcionando: as quatro etapas passam. Quando o link falha, a primeira etapa que falhou é marcada e explicada.*

| O que você vê | Causa provável | Comece em |
| --- | --- | --- |
| Waiting for device, ou Flight controller plugged in: Not detected | Sem cabo de dados, ou a placa não está alimentada | [Verificação 1](https://docs.uavmatrix.com/pt/troubleshooting/no-mavlink-heartbeat/#check-1) |
| Sinal no fio, mas sem dados legíveis | Taxa de transmissão errada, TX/RX invertidos, ou a porta não está configurada para MAVLink | [Verificação 2](https://docs.uavmatrix.com/pt/troubleshooting/no-mavlink-heartbeat/#check-2) |
| Dados legíveis com alta % de dados danificados | Fio solto ou longo, falta de terra, ou ruído elétrico | [Verificação 3](https://docs.uavmatrix.com/pt/troubleshooting/no-mavlink-heartbeat/#check-3) |
| Porta aparece em uso por outro programa | Outro programa está usando a porta serial | [Verificação 4](https://docs.uavmatrix.com/pt/troubleshooting/no-mavlink-heartbeat/#check-4) |
| Status Off ou Stopped | O link está desligado | [Verificação 5](https://docs.uavmatrix.com/pt/troubleshooting/no-mavlink-heartbeat/#check-5) |

## Verificação 1: o controlador de voo é detectado?

**Via USB:**

1. Certifique-se de que o controlador de voo está alimentado e que o cabo USB dele vai até o computador companheiro.
2. Tente outro cabo. Muitos cabos USB só carregam e não transmitem dados. Se a placa acender, mas **Flight controller plugged in** disser **Not detected**, o cabo é a causa mais comum.
3. Em **Link type**, escolha **USB** e deixe **Porta** em **Automático**. O modo automático encontra o controlador de voo e o acompanha se o número do dispositivo mudar.

**Por uma porta TELEM (UART / Serial):**

1. Em **Link type**, escolha **UART / Serial**.
2. Confira a fiação: TX do controlador de voo para RX do computador companheiro, RX para TX, e GND para GND. Um fio de terra faltando é uma causa comum.
3. Nunca alimente o Raspberry Pi pela porta TELEM. Alimente-o separadamente.

> **Porta serial do Raspberry Pi**
>
> O instalador ativa a UART do Pi e remove o console serial de `cmdline.txt`. Em um Pi 3, 4 ou Zero 2 W, ele também desativa o Bluetooth para que a UART completa fique livre. Se você instalou o sistema operacional novamente depois do UAVcast-Pro, execute o instalador outra vez.

## Verificação 2: ajuste as configurações de porta no controlador de voo

Em uma porta TELEM, o controlador de voo deve falar MAVLink na mesma velocidade em que o UAVcast-Pro escuta. Conexões USB não usam taxa de transmissão.

1. Conecte o controlador de voo ao Mission Planner ou ao QGroundControl por USB.
2. Abra a lista completa de parâmetros e encontre a porta serial que você ligou: `SERIAL1` para TELEM1, `SERIAL2` para TELEM2.
3. Defina `SERIALx_PROTOCOL` como `2` (MAVLink2). Grave os parâmetros e reinicie o controlador de voo.
4. Anote `SERIALx_BAUD`. No UAVcast-Pro, deixe **Baud rate** em **Automático**, ou escolha o mesmo valor.

Com **Automático**, o UAVcast-Pro testa as taxas 57600, 115200, 921600, 1500000, 460800, 230400 e 500000 baud e lembra a que funcionou. O status mostra *Trying … baud (n of 7)* durante a busca.

> **Deixe o UAVcast-Pro procurar para você**
>
> Pressione **Auto-detect**. Ele pausa o link, escuta todas as portas e taxas de transmissão, e depois salva o que encontrar. Isso pode levar até um minuto. Se aparecer **No flight controller found**, abra **Show what was tried** para ver cada porta e velocidade testadas.

## Verificação 3: dados danificados

Se **Readable flight controller data** mostrar uma porcentagem de *damaged*, os bytes estão chegando, mas corrompidos. Normalmente isso significa um fio solto ou longo, um fio de terra faltando, ou ruído dos motores e dos cabos de energia.

- Reconecte os conectores e encurte o cabo.
- Afaste os fios de sinal dos cabos do ESC e da bateria.
- Tente um `SERIALx_BAUD` mais baixo, por exemplo 57600 ou 115200.

## Verificação 4: porta em uso

A lista de **Porta** marca as portas que outro programa está usando (*in use by …*). Encerre esse programa, por exemplo um MAVProxy ou um segundo roteador que você iniciou, ou escolha outra porta.

## Verificação 5: o link está ligado?

No topo da página, **Link enabled** deve estar ativado. Se o status disser **Link stopped**, pressione **Conectar**. As configurações são aplicadas imediatamente, sem reiniciar.

## Ainda sem heartbeat?

[Baixe os logs](https://docs.uavmatrix.com/pt/troubleshooting/collect-logs/) com **Mavlink Manager** selecionado. O arquivo `diagnostics.txt` incluído lista os dispositivos seriais, quem os está usando, e os eventos de USB e de energia do kernel, que é o que o suporte precisa para problemas de link.

Quando o controlador de voo mostrar **Connected**, mas sua estação de controle terrestre ainda estiver esperando, vá para [Sem telemetria na estação de controle terrestre](https://docs.uavmatrix.com/pt/troubleshooting/no-telemetry-in-gcs/).

Relacionados: [Conexão do controlador de voo](https://docs.uavmatrix.com/pt/uavcast-pro/flight-controller/) · [Requisitos de hardware](https://docs.uavmatrix.com/pt/get-started/hardware-requirements/)

Source: https://docs.uavmatrix.com/pt/troubleshooting/no-mavlink-heartbeat/
