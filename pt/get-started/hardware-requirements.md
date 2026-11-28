# Requisitos de hardware

> Quais Raspberry Pi ou computadores Linux, controladores de voo, câmeras e modems 4G/LTE funcionam com o UAVcast-Pro, além dos requisitos de fiação, energia e armazenamento.

O UAVcast-Pro roda em um computador companheiro Linux de 64 bits conectado a qualquer controlador de voo MAVLink (ArduPilot ou PX4). Adicione uma câmera para vídeo e um modem 4G/LTE para voos além do alcance do Wi-Fi. Uma Raspberry Pi 4 ou 5 com uma câmera Pi e um modem USB é a configuração mais comum.

## Computador companheiro

O UAVcast-Pro é instalado em qualquer placa ou PC **64 bits** com Linux, com CPU **arm64** ou **amd64 (x86-64)**, rodando Raspberry Pi OS, Debian ou Ubuntu. Sistemas de 32 bits (`armv7l`, `i686`) não são suportados.

| Placa | Status | Observações |
| --- | --- | --- |
| Raspberry Pi 5 | Suportada | Sem codificador H.264 por hardware. O vídeo é codificado por software, então acompanhe o indicador **Carga do sistema** na página Câmera com resoluções altas ou dois fluxos. |
| Raspberry Pi 4 | Suportada, recomendada | Bom equilíbrio entre CPU, consumo de energia e preço. 2 GB de RAM ou mais. |
| Raspberry Pi 3 / 3B+ | Suportada | Adequada para telemetria e um fluxo 720p. A instalação leva cerca de 30 minutos. |
| Raspberry Pi Zero 2 W | Suportada | A menor e mais leve. A instalação leva cerca de 30 minutos; mantenha o vídeo modesto. |
| Raspberry Pi Compute Module 3+/4 | Suportado | Igual ao modelo Pi correspondente. |
| NVIDIA Jetson, Orange Pi, Banana Pi e outras placas arm64 | Suportadas | Use a imagem de 64 bits do Ubuntu ou Debian do fabricante. O UAVcast-Pro reconhece essas placas e sugere suas portas seriais para o controlador de voo. Use uma câmera USB (câmeras CSI do Raspberry Pi exigem uma Raspberry Pi). |
| PC x86-64 (Intel NUC, mini PC, notebook) | Suportado | Usa a versão amd64. Adaptadores seriais USB aparecem como `/dev/ttyUSB*` ou `/dev/ttyACM*`. |

Execute `uname -m` na placa para verificar a arquitetura. O resultado deve ser `aarch64` ou `x86_64`.

> **Placas arm64 que não são Raspberry Pi**
>
> Jetson, Orange Pi, Banana Pi e outras placas arm64 que não são Raspberry Pi precisam do UAVcast-Pro 6.5.3 ou posterior. Instaladores antigos param nessas placas com *Device is not a Raspberry Pi*.

### Armazenamento

- **Mínimo de 500 MB livres** no disco raiz, ou o instalador para. Um cartão de 8 GB ou maior é o mínimo prático; use 32 GB ou mais se você gravar vídeo no drone.
- Use um cartão microSD de boa qualidade classificado como A1/A2, ou inicialize a partir de um SSD. As gravações também podem ir para um pen drive USB ou SSD (veja [Gravações](https://docs.uavmatrix.com/pt/uavcast-pro/camera/recordings/)).

> **A licença está vinculada ao dispositivo de armazenamento**
>
> O UAVcast-Pro identifica um dispositivo pelo número de série da CPU mais o número de série do disco de boot (cartão SD ou SSD). Trocar para um novo cartão SD conta como um novo dispositivo. Desregistre o antigo primeiro. Veja [Mover sua licença para um novo hardware](https://docs.uavmatrix.com/pt/get-started/license-activation/#move-to-new-hardware).

### Energia

A Raspberry Pi precisa de uma alimentação estável de **5,1 V** que suporte a própria Pi e tudo o que estiver conectado às suas portas USB. Um modem 4G pode consumir bem mais de 500 mA ao transmitir, e uma câmera USB aumenta ainda mais o consumo.

- Alimente a Pi a partir de um BEC ou regulador de 5 V dedicado, dimensionado para toda a carga. A porta TELEM ou USB do controlador de voo não pode alimentar a Pi.
- Se o modem causar queda de tensão na Pi, alimente-a por um hub USB com fonte própria ou por uma fonte separada de 5 V.
- Verifique a linha **Fonte de alimentação** no [Painel](https://docs.uavmatrix.com/pt/uavcast-pro/dashboard/). *Tensão muito baixa - use uma fonte de alimentação mais potente* significa que a Pi está com subtensão neste momento. *Reduzida (calor ou energia)* significa que a CPU está sendo limitada.

## Controlador de voo

O UAVcast-Pro funciona com **qualquer controlador de voo MAVLink**: ArduPilot (Copter, Plane, Rover, Sub) e PX4, nas famílias Pixhawk e Cube, Matek, Holybro, CUAV, mRo e na maioria das outras placas. MAVLink 2 é recomendado.

Os nomes dos modos de voo e os botões de modo (no Mapa de Voo e no Fleet Manager) usam os modos do ArduPilot para Copter, Plane, Rover e Sub. Em um controlador de voo PX4, telemetria, vídeo, roteamento para estações de controle terrestre, mapa e HUD funcionam da mesma forma; use sua estação de controle terrestre para alterar os modos de voo do PX4.

Conecte-o de uma das duas formas:

| Conexão | Fiação | Quando usar |
| --- | --- | --- |
| **USB** | Cabo USB da porta USB do controlador de voo para o computador companheiro. | Mais fácil. Não é preciso configurar a taxa de transmissão. Use um cabo de dados curto e de boa qualidade. |
| **UART / Serial** | TX da porta TELEM → RX do computador, RX → TX do computador, GND → GND. Ou um cabo USB-serial (FTDI). | Quando a porta USB é usada para outra função, ou para uma instalação mais limpa. Ative o MAVLink nessa porta: `SERIALx_PROTOCOL = 2` (MAVLink2) no ArduPilot, `MAV_x_CONFIG` no PX4. |

**Somente Raspberry Pi:** a UART GPIO é `/dev/serial0` (GPIO 14 TX, GPIO 15 RX). O instalador a libera para o controlador de voo: ele desativa o console de login serial e, na Pi 3, 4 e Zero 2 W, move o Bluetooth para fora da UART. Nunca conecte o pino de 5 V do controlador de voo à Pi quando ambos tiverem fonte própria.

Em outras placas, use a UART da própria placa (por exemplo `ttyTHS*` na Jetson, `ttyS*` na Orange Pi) ou um adaptador USB-serial.

| Porta TELEM do controlador de voo | Cabeçalho GPIO da Raspberry Pi |
| --- | --- |
| TX | GPIO 15 (RXD), pino 10 |
| RX | GPIO 14 (TXD), pino 8 |
| GND | GND, por exemplo pino 6 |

TX sempre vai para RX. Deixe o pino de 5 V da porta TELEM desconectado.

O UAVcast-Pro encontra a porta e a taxa de transmissão automaticamente. Veja [Conectar o controlador de voo](https://docs.uavmatrix.com/pt/uavcast-pro/flight-controller/).

## Câmeras

| Câmera | Observações |
| --- | --- |
| Módulos de câmera Raspberry Pi (v1, v2, v3, HQ, Global Shutter) e outras câmeras CSI compatíveis com libcamera | Melhor latência. A Raspberry Pi 5 e os Compute Modules podem rodar duas câmeras CSI. |
| Webcams USB (UVC), como Logitech C920 ou C615 | Plug and play. Detectadas como `/dev/video*`. |
| Fontes HDMI (GoPro, gimbals de câmera) | Por meio de uma ponte HDMI para CSI (aparece como câmera CSI) ou de um stick de captura HDMI USB (aparece como câmera USB). |
| Câmeras IP e qualquer outra fonte que o GStreamer consiga ler | Por meio de um [pipeline personalizado](https://docs.uavmatrix.com/pt/uavcast-pro/camera/custom-pipeline/). |

Duas câmeras podem funcionar ao mesmo tempo, seja alternando por um canal RC ou transmitindo juntas. Veja [Duas câmeras e troca por RC](https://docs.uavmatrix.com/pt/uavcast-pro/camera/multi-camera/). Para áudio, qualquer microfone USB ou webcam com microfone integrado funciona. Veja [Áudio](https://docs.uavmatrix.com/pt/uavcast-pro/camera/audio/).

## Modems 4G/LTE

O UAVcast-Pro oferece suporte a dois tipos de modem USB:

| Tipo | Como funciona | Exemplos |
| --- | --- | --- |
| **HiLink** | O modem é um pequeno roteador. Ele aparece como uma placa de rede (geralmente `eth1` ou `usb0`) e se conecta sozinho. Não há nada a configurar no UAVcast-Pro. | Huawei E3372**h** (firmware HiLink), E8372, a maioria dos "dongles LTE USB com interface web" |
| **Tradicional (PPP)** | Gerenciado pelo ModemManager e pelo NetworkManager. O UAVcast-Pro o conecta, encontra o APN e reconecta após quedas. | Huawei E3372**s** (firmware stick), Quectel EC25 / EG25 / EM06 e módulos Sierra Wireless em um adaptador USB |

Qualquer modem presente na [lista de dispositivos suportados pelo ModemManager](https://www.freedesktop.org/wiki/Software/ModemManager/SupportedDevices/) deve funcionar como modem Tradicional. Use um chip com plano de dados para a sua região e verifique se a operadora bloqueia o tráfego de entrada (uma VPN contorna isso). Veja [Modem celular](https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/cellular-modem/).

## Computador da estação de controle terrestre

Qualquer computador que execute Mission Planner, QGroundControl ou outra estação de controle terrestre MAVLink. Ele recebe telemetria na UDP 14550 e vídeo na UDP 5600 por padrão. Para vídeo no Mission Planner, é preciso ter o GStreamer instalado; o QGroundControl já o inclui.

Source: https://docs.uavmatrix.com/pt/get-started/hardware-requirements/
