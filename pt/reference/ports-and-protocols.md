# Portas e protocolos

> Todas as portas que o UAVcast-Pro e o Fleet Manager usam: MAVLink UDP 14550, vídeo UDP 5600, câmera 2 e áudio, web, visualização, RTSP, NTRIP e MQTT 8883.

Use esta página para configurar firewalls na estação de controle terrestre, na rede do drone e em redes corporativas. Os padrões são mostrados; quando uma porta puder ser alterada, a configuração correspondente é indicada.

## Estação de controle terrestre: tráfego de entrada

O UAVcast-Pro **envia** telemetria e vídeo para cada estação de controle terrestre. A estação só precisa aceitar UDP de entrada; nada precisa escutar no drone para isso.

| Porta (padrão) | Protocolo | O que é | Configuração |
| --- | --- | --- | --- |
| **14550** | UDP | Telemetria MAVLink, em ambas as direções assim que a estação de controle terrestre responde | **Estações de Controle Terrestre → Porta de Telemetria** |
| **5600** | UDP | Vídeo: H.264 em RTP, tipo de payload 96 | **Porta de Vídeo** |
| **Porta de Vídeo + 1** (5601) | UDP | Vídeo da câmera 2 quando **Transmissão dupla** está ativada | **Porta de Vídeo (Câmera 2)** (vazio = Porta de Vídeo + 1) |
| **Porta de Vídeo + 2** (5602) | UDP | Áudio: Opus em RTP, tipo de payload 97, quando **Enviar áudio para as estações de solo** está ativado | Segue a **Porta de Vídeo** |

> **A TCP 5760 está fechada**
>
> Desde a v6.5.0, o roteador de telemetria não escuta na TCP 5760. As estações de controle terrestre se conectam por UDP aos destinos que você adicionar.

**Com vinculações de fluxo do Fleet Manager**, o primeiro drone vinculado a uma estação de controle terrestre usa 5600/14550, e cada drone adicional recebe seu próprio bloco de portas: uma porta de vídeo com espaço para a câmera 2 e o áudio logo depois, e uma porta de telemetria. Leia as portas em cada vinculação.

## Drone: serviços aos quais você se conecta

| Porta | Protocolo | O que é | Observações |
| --- | --- | --- | --- |
| **80** | TCP (HTTP) | Interface web | Altere em **Aplicação → Configurações → Porta do Servidor** (80 ou superior). |
| **8889** | TCP (HTTP) | Visualização ao vivo no navegador (WebRTC) | Usada por **Câmera → Visualização ao Vivo** e pelas janelas de vídeo do Mapa de Voo. |
| 8189 | UDP | Mídia WebRTC para a visualização ao vivo | Padrão do servidor de mídia. |
| **9996** | TCP (HTTP) | Reprodução de gravações | Usada pela biblioteca de gravações e pelo player de revisão de voo. |
| **8554** | TCP (RTSP) | Cópia RTSP do fluxo da câmera (`/camera`, `/camera2`) | Disponível enquanto a visualização ao vivo ou a gravação estiver ativa. |
| 8888 | TCP (HTTP) | Cópia HLS do fluxo da câmera | Não é usada pela interface web. |
| Injetor HTTP | TCP (HTTP) | `http://<drone>/api/inject/<token>` | Servido na porta da interface web. Veja [Injetores](https://docs.uavmatrix.com/pt/uavcast-pro/flight-controller/injectors/). |
| Injetor UDP | UDP | Você escolhe (14600 é um padrão seguro) | Definida por injetor em **Controlador de Voo → Injetores**. |

Por VPN, essas portas precisam estar acessíveis no endereço VPN do drone. Não é necessário redirecionamento de portas no lado celular.

## Drone: tráfego de saída

O próprio drone abre estas conexões. Redes que permitem apenas tráfego web bloquearão algumas delas.

| Destino | Porta | Protocolo | O que é |
| --- | --- | --- | --- |
| Estações de controle terrestre | 14550, 5600 (+1, +2) | UDP | Telemetria, vídeo, áudio |
| `uavmatrix.com` | 443 | HTTPS | Ativação de licença e verificações periódicas |
| `install.uavmatrix.com` | 443 | HTTPS | Instalador e atualizações |
| `fleet-manager.uavmatrix.com` | 443 | HTTPS | Pareamento com o Fleet Manager |
| Broker do Fleet Manager | **8883** | MQTT sobre TLS (certificados de cliente) | Status, telemetria e comandos do Fleet Manager |
| `vpn-connect.uavmatrix.com` | 443 | HTTPS | Servidor de login da VPN do Fleet Manager |
| Seu caster NTRIP | 2101 (ou conforme configurado) | TCP, TLS opcional | Correções RTCM |
| ZeroTier / Tailscale | ZeroTier 9993, Tailscale 41641 (e 443 como alternativa) | UDP | Túneis de VPN |
| Seu provedor de DNS | 443 | HTTPS | Atualizações de DNS dinâmico |

## Dentro do drone (somente local)

Estas portas são usadas entre os próprios serviços do UAVcast-Pro e não precisam de regras de firewall:

| Porta | O que é |
| --- | --- |
| 6379 | Redis, barramento interno de mensagens |
| 12550, 12551 | Roteador de telemetria para o aplicativo UAVcast-Pro e para o cliente NTRIP |
| 8090 | Listener HTTP do injetor (acessado por `/api/inject/…` na porta 80) |
| 9997 | API do servidor de mídia |
| 5000 | API do serviço em segundo plano do UAVcast-Pro, usada pela interface web |

## Regras de firewall para a estação de controle terrestre

**Windows**

```powershell
New-NetFirewallRule -DisplayName "MAVLink Telemetry" -Direction Inbound -Protocol UDP -LocalPort 14550 -Action Allow
New-NetFirewallRule -DisplayName "UAV Video" -Direction Inbound -Protocol UDP -LocalPort 5600-5602 -Action Allow
```

**Linux (UFW)**

```bash
sudo ufw allow 14550/udp comment 'MAVLink Telemetry'
sudo ufw allow 5600:5602/udp comment 'UAV Video and audio'
```

Adicione mais portas se usar outras portas de telemetria ou vídeo, ou vários drones por meio de vinculações de fluxo do Fleet Manager.

Source: https://docs.uavmatrix.com/pt/reference/ports-and-protocols/
