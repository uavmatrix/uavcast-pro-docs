# Glossário

> Explicações simples dos termos das documentações do UAVcast-Pro e do Fleet Manager: MAVLink, GCS, heartbeat, APN, HiLink, NTRIP, RTCM, VRS, ZeroTier, Tailscale.

### AGL / AMSL

Altitude acima do solo (aqui: acima do ponto de decolagem) e acima do nível médio do mar. O UAVcast-Pro usa esses termos desde a v6.5.0, substituindo REL e MSL.

### APN (Access Point Name)

O nome do gateway da operadora pelo qual um modem celular se conecta. O UAVcast-Pro o detecta automaticamente quando **Nome do Ponto de Acesso (Opcional)** está vazio.

### ArduPilot

Firmware de piloto automático de código aberto para multirrotores, aviões, VTOL, rovers e barcos. O UAVcast-Pro funciona com o ArduPilot e com qualquer outro controlador de voo MAVLink, como o PX4. Seus botões de modo de voo usam os nomes de modo do ArduPilot.

### Chave de autenticação

Uma chave do Tailscale que faz um dispositivo entrar em uma tailnet sem navegador. O Fleet Manager usa chaves de autenticação para colocar as estações de controle terrestre na VPN da organização.

### Bitrate

Quantos bits por segundo o codificador de vídeo produz. Ele precisa caber no uplink da sua conexão, com folga.

### Câmera CSI

Uma câmera no conector de cabo flat do Raspberry Pi, como a Camera Module 3.

### Destino

No UAVcast-Pro, uma entrada de estação de controle terrestre em **Estações de Controle Terrestre**: um endereço IP com uma porta de telemetria e uma porta de vídeo.

### Transmissão dupla

Transmissão de duas câmeras para a estação de controle terrestre ao mesmo tempo, em duas portas de vídeo.

### Fleet Manager

O painel web da UAVmatrix para monitorar e controlar muitos drones UAVcast-Pro em uma mesma organização.

### GCS (estação de controle terrestre)

O software, e o computador em que ele roda, usados para monitorar e comandar o drone: QGroundControl, Mission Planner, MAVProxy.

### Failsafe GCS

Uma configuração do controlador de voo que faz o drone agir sozinho (retornar, pousar, fazer loiter) quando ele para de receber a estação de controle terrestre.

### GGA

Uma sentença NMEA com a sua posição. Os casters VRS e os casters de mountpoint mais próximo precisam dela para calcular as correções para a sua localização.

### H.264

O formato de compressão de vídeo que o UAVcast-Pro envia. Todas as estações de controle terrestre comuns conseguem decodificá-lo.

### Heartbeat

A mensagem MAVLink que um controlador de voo envia cerca de uma vez por segundo para dizer "estou aqui". *Sem heartbeat* significa que o link não transporta MAVLink legível.

### Modem HiLink

Um modem USB com roteador embutido que se conecta sozinho e aparece para o Linux como um adaptador de rede.

### Injetor

Um listener do UAVcast-Pro (HTTP, UDP ou serial) que transforma os valores dos seus próprios sensores em mensagens MAVLink `NAMED_VALUE_FLOAT`.

### Quadro-chave

Um quadro de vídeo completo a partir do qual o decodificador pode começar. Quadros-chave mais frequentes se recuperam mais rápido da perda de pacotes. Configurado com **Taxa de Recuperação do Stream**.

### MAVLink

O protocolo de mensagens entre controladores de voo e estações de controle terrestre.

### Mountpoint

Um fluxo de correções com nome em um caster NTRIP, normalmente ligado a uma estação base ou a um serviço VRS.

### MQTT

O protocolo de mensagens que os drones usam para se comunicar com o Fleet Manager, criptografado com TLS na porta 8883.

### NTRIP / caster NTRIP

Um protocolo, e o servidor que o implementa, para transmitir correções GNSS pela internet.

### Código de pareamento

O código de 8 dígitos que o UAVcast-Pro mostra quando você conecta um drone ao Fleet Manager. É válido por 5 minutos, uma única vez.

### Somente leitura (destino)

Um destino de estação de controle terrestre que recebe telemetria, mas não pode alterar nada no veículo: comandos, mudanças de modo, gravações de parâmetros e de missão enviados por ele são bloqueados. Isso vale a partir do UAVcast-Pro 6.5.3; em versões anteriores, **Somente leitura** não bloqueia gravações de parâmetros.

### Somente leitura (usuário)

Uma função de usuário do UAVcast-Pro que pode visualizar páginas, mas não pode alterar configurações nem controlar o drone.

### RTCM3

O formato padrão de mensagens para correções GNSS.

### RTK, RTK Float, RTK Fixed

Posicionamento cinemático em tempo real com correções. Float é uma solução aproximada; Fixed é a solução de precisão centimétrica.

### RTP / UDP

O transporte que o UAVcast-Pro usa para vídeo e telemetria: rápido e sem retransmissões, o que mantém a latência baixa.

### SERIALx_PROTOCOL / SERIALx_BAUD

Parâmetros do ArduPilot que definem qual protocolo uma porta serial fala (2 = MAVLink2) e em que velocidade.

### Vinculação de fluxo

No Fleet Manager, um link que envia o vídeo e a telemetria de um drone para uma estação de controle terrestre, em portas próprias.

### sysid / compid

ID de sistema MAVLink (qual veículo) e ID de componente (qual parte do veículo). O controlador de voo geralmente é sysid 1, compid 1.

### Tailnet

Uma rede privada do Tailscale.

### Tailscale

Uma VPN baseada em WireGuard. O UAVcast-Pro pode entrar na sua tailnet ou na rede da organização do Fleet Manager.

### UAVnet

O controlador de rede ZeroTier hospedado pela UAVmatrix em uavnet.uavmatrix.com. Ele está sendo descontinuado em favor da VPN do Fleet Manager; os usuários existentes devem migrar para o Fleet Manager.

### VRS (estação de referência virtual)

Um serviço de correção que calcula as correções para a sua posição a partir de uma rede de estações base. Precisa de GGA upstream.

### ZeroTier

Uma VPN peer-to-peer. O UAVcast-Pro pode entrar na sua própria rede ZeroTier.

Source: https://docs.uavmatrix.com/pt/reference/glossary/
