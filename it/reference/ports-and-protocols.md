# Porte e protocolli

> Ogni porta usata da UAVcast-Pro e Fleet Manager: MAVLink UDP 14550, video UDP 5600, telecamera 2 e audio, web, anteprima, RTSP, NTRIP e MQTT 8883.

Usa questa pagina per configurare i firewall sulla stazione di terra, sulla rete del drone e nelle reti aziendali. Sono mostrati i valori predefiniti; dove una porta può essere modificata, viene indicata l'impostazione.

## Stazione di controllo a terra: traffico in entrata

UAVcast-Pro **invia** telemetria e video a ogni stazione di terra. La stazione di terra deve solo accettare UDP in entrata; per questo non serve nulla in ascolto sul drone.

| Porta (predefinita) | Protocollo | Cosa | Impostazione |
| --- | --- | --- | --- |
| **14550** | UDP | Telemetria MAVLink, in entrambe le direzioni una volta che la GCS risponde | **Stazioni di Controllo a Terra → Porta Telemetria** |
| **5600** | UDP | Video: H.264 in RTP, payload type 96 | **Porta Video** |
| **Porta Video + 1** (5601) | UDP | Video della telecamera 2 quando **Doppio flusso** è attivo | **Porta Video (Telecamera 2)** (vuoto = Porta Video + 1) |
| **Porta Video + 2** (5602) | UDP | Audio: Opus in RTP, payload type 97, quando **Invia audio alle stazioni di terra** è attivo | Segue la **Porta Video** |

> **La porta TCP 5760 è chiusa**
>
> Dalla v6.5.0 il router della telemetria non è più in ascolto sulla porta TCP 5760. Le stazioni di terra si connettono via UDP alle destinazioni che aggiungi.

**Con le associazioni del flusso (stream binding) di Fleet Manager**, il primo drone associato a una stazione di terra usa 5600/14550, e ogni drone aggiuntivo ottiene un proprio blocco di porte: una porta video con spazio per la telecamera 2 e l'audio subito dopo, e una porta di telemetria. Leggi le porte di ogni associazione.

## Drone: servizi a cui ti connetti

| Porta | Protocollo | Cosa | Note |
| --- | --- | --- | --- |
| **80** | TCP (HTTP) | Interfaccia web | Modificabile in **Applicazione → Impostazioni → Porta Server** (80 o superiore). |
| **8889** | TCP (HTTP) | Anteprima dal vivo nel browser (WebRTC) | Usata da **Telecamera → Anteprima dal Vivo** e dalle finestre video della mappa di volo. |
| 8189 | UDP | Media WebRTC per l'anteprima dal vivo | Valore predefinito del media server. |
| **9996** | TCP (HTTP) | Riproduzione delle registrazioni | Usata dalla libreria delle registrazioni e dal lettore di revisione del volo. |
| **8554** | TCP (RTSP) | Copia RTSP del flusso della telecamera (`/camera`, `/camera2`) | Disponibile mentre l'anteprima dal vivo o la registrazione sono attive. |
| 8888 | TCP (HTTP) | Copia HLS del flusso della telecamera | Non usata dall'interfaccia web. |
| Iniettore HTTP | TCP (HTTP) | `http://<drone>/api/inject/<token>` | Servita sulla porta dell'interfaccia web. Vedi [Iniettori](https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/injectors/). |
| Iniettore UDP | UDP | A tua scelta (14600 è un valore predefinito sicuro) | Impostata per ogni iniettore in **Controllore di Volo → Iniettori**. |

Tramite VPN, queste porte devono essere raggiungibili sull'indirizzo VPN del drone. Non serve alcun port forwarding dal lato cellulare.

## Drone: traffico in uscita

Il drone apre autonomamente queste connessioni. Le reti che consentono solo traffico web bloccheranno alcune di esse.

| Destinazione | Porta | Protocollo | Cosa |
| --- | --- | --- | --- |
| Stazioni di terra | 14550, 5600 (+1, +2) | UDP | Telemetria, video, audio |
| `uavmatrix.com` | 443 | HTTPS | Attivazione della licenza e controlli periodici |
| `install.uavmatrix.com` | 443 | HTTPS | Installer e aggiornamenti |
| `fleet-manager.uavmatrix.com` | 443 | HTTPS | Accoppiamento con Fleet Manager |
| Broker di Fleet Manager | **8883** | MQTT su TLS (certificati client) | Stato, telemetria e comandi di Fleet Manager |
| `vpn-connect.uavmatrix.com` | 443 | HTTPS | Server di login VPN di Fleet Manager |
| Il tuo caster NTRIP | 2101 (o come impostato) | TCP, TLS opzionale | Correzioni RTCM |
| ZeroTier / Tailscale | ZeroTier 9993, Tailscale 41641 (e 443 come riserva) | UDP | Tunnel VPN |
| Il tuo provider DNS | 443 | HTTPS | Aggiornamenti del DNS dinamico |

## All'interno del drone (solo locale)

Queste porte sono usate tra i servizi interni di UAVcast-Pro e non richiedono regole firewall:

| Porta | Cosa |
| --- | --- |
| 6379 | Redis, bus di messaggi interno |
| 12550, 12551 | Router della telemetria verso l'app UAVcast-Pro e verso il client NTRIP |
| 8090 | Listener HTTP degli iniettori (raggiunto tramite `/api/inject/…` sulla porta 80) |
| 9997 | API del media server |
| 5000 | API del servizio in background di UAVcast-Pro, usata dall'interfaccia web |

## Regole firewall per la stazione di controllo a terra

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

Aggiungi altre porte se usi altre porte di telemetria o video, oppure più droni tramite le associazioni del flusso (stream binding) di Fleet Manager.

Source: https://docs.uavmatrix.com/it/reference/ports-and-protocols/
