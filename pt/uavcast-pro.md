# UAVcast-Pro

> Referência da interface web do UAVcast-Pro: painel, controlador de voo, mapa de voo, estações de controle terrestre, câmera, modem, VPN, pareamento com o Fleet Manager, usuários e configurações.

Esta seção explica cada página da interface web do UAVcast-Pro, na ordem da barra lateral do aplicativo. Cada página informa para que serve a tela, como configurá-la e lista cada configuração com seu padrão. Novo no UAVcast-Pro? Comece pelo [Início rápido](https://docs.uavmatrix.com/pt/get-started/quick-start/).

## Operações

[PainelSaúde do controlador de voo, GPS, links, vídeo e energia de relance.](https://docs.uavmatrix.com/pt/uavcast-pro/dashboard/)[Fluxos de DadosPainéis ao vivo personalizados para qualquer valor MAVLink ou de sensor.](https://docs.uavmatrix.com/pt/uavcast-pro/data-streams/)[Controlador de VooLink USB ou UART com detecção automática de porta e baud rate, NTRIP/RTK e injetores.](https://docs.uavmatrix.com/pt/uavcast-pro/flight-controller/)[Mapa de VooMapa ao vivo, HUD de cabine, armar/desarmar, modos, missões, rádio, inspetor e análise de registros de voo.](https://docs.uavmatrix.com/pt/uavcast-pro/flight-map/)[Estações de controle terrestre e vídeoDestinos, além de configuração passo a passo do Mission Planner, QGroundControl, GStreamer, Android e VLC.](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/)

## Conectividade

[ModemModems 4G/LTE HiLink e tradicionais com APN automático.](https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/cellular-modem/)[Rede Privada VirtualA VPN do Fleet Manager, ou sua própria rede Tailscale ou ZeroTier.](https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/vpn/)[DNS DinâmicoMantenha um hostname apontado para o IP público do drone.](https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/dynamic-dns/)[RedesInterfaces e prioridade entre Wi-Fi e modem.](https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/networks/)

## Mídia

[Configurações da câmeraCâmeras CSI e USB, resolução, taxa de bits, H.264 de baixa latência via UDP.](https://docs.uavmatrix.com/pt/uavcast-pro/camera/)[Duas câmerasTroca por canal RC ou transmissão dupla.](https://docs.uavmatrix.com/pt/uavcast-pro/camera/multi-camera/)[ÁudioÁudio do microfone na pré-visualização e nas estações de controle terrestre.](https://docs.uavmatrix.com/pt/uavcast-pro/camera/audio/)[GravaçõesGravação de vídeo e telemetria no drone, com revisão de voo.](https://docs.uavmatrix.com/pt/uavcast-pro/camera/recordings/)

## Gerenciamento

[Fleet ManagementPareie o drone com o UAVmatrix Fleet Manager.](https://docs.uavmatrix.com/pt/uavcast-pro/fleet-pairing/)[UsersLogin de administrador e usuários somente leitura.](https://docs.uavmatrix.com/pt/uavcast-pro/users/)[AplicaçãoPorta, idioma, registros para suporte, backup e restauração do banco de dados.](https://docs.uavmatrix.com/pt/uavcast-pro/application-settings/)

## Portas em resumo

| Porta | Direção | Usada para |
| --- | --- | --- |
| TCP 80 | Navegador → drone | Interface web (configurável) e injetores HTTP |
| UDP 14550 | Drone → estação de controle terrestre | Telemetria MAVLink (por destino, configurável) |
| UDP 5600 | Drone → estação de controle terrestre | Vídeo, câmera 1 (por destino, configurável) |
| UDP 5601 | Drone → estação de controle terrestre | Vídeo, câmera 2 com transmissão dupla (Porta de Vídeo + 1 por padrão) |
| UDP 5602 | Drone → estação de controle terrestre | Áudio (Porta de Vídeo + 2) |
| TCP 8889, UDP 8189 | Navegador → drone | Pré-visualização ao vivo (sinalização e mídia WebRTC) |
| TCP 8883 | Drone → Fleet Manager | Conexão com o Fleet Manager (MQTT sobre TLS) |
| TCP 2101 | Drone → caster NTRIP | Correções RTK (porta do caster) |
| UDP 14600 | Sensor → drone | Injetor UDP (padrão, configurável) |

Source: https://docs.uavmatrix.com/pt/uavcast-pro/
