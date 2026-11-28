# Servizi, file e opzioni dell'installer

> I servizi systemd installati da UAVcast-Pro, dove vengono salvati database, log e registrazioni, le opzioni dell'installer per le versioni e i comandi SSH utili.

Per quando lavori sul dispositivo via SSH: quali servizi compongono UAVcast-Pro, dove si trovano i suoi file e come installare una versione specifica.

## Servizi

UAVcast-Pro gira come un insieme di servizi systemd. Ciascuno si riavvia da solo se fallisce.

| Servizio | Cosa fa |
| --- | --- |
| `uavcast-web` | L'interfaccia web (Node.js). È in ascolto sulla porta 80, a meno che tu non abbia modificato **Porta Server**. |
| `uavcast-factory` | API in background: licenza, modem, VPN, rete, log, archiviazione delle registrazioni e connessione a Fleet Manager. |
| `mavlink-manager` | Collegamento con il controllore di volo e router della telemetria verso le stazioni di terra. Parte senza attendere internet. |
| `uavcast-camera` | Cattura della telecamera, codifica H.264 e flusso video UDP. Parte senza attendere internet. |
| `mediamtx` | Media server per l'anteprima nel browser, RTSP e registrazioni. |
| `uavcast-ntrip` | Client NTRIP per le correzioni RTK. |
| `uavcast-dns` | Aggiornatore del DNS dinamico. |
| `redis-server` | Bus di messaggi interno da cui dipendono gli altri servizi. |
| `zerotier-one`, `tailscaled` | Client VPN, installati dall'installer di UAVcast-Pro. |

Comandi utili:

```bash
sudo systemctl status uavcast-web            # is it running?
sudo systemctl restart uavcast-camera        # restart one service
journalctl -u mavlink-manager -f             # follow a service's log live
journalctl -u uavcast-web --since yesterday  # read recent history
```

## File e cartelle

Tutto si trova sotto `/opt/uavcast-pro`.

| Percorso | Contenuto |
| --- | --- |
| `/opt/uavcast-pro/uavcast.db` | Database delle impostazioni (SQLite). Fai il backup da **Applicazione → Database → Backup Database**. |
| `/opt/uavcast-pro/logs/` | Log dei servizi, ruotati automaticamente. Scaricali da **Applicazione → Registrazione Log**. |
| `/opt/uavcast-pro/recordings/` | Registrazioni della telecamera e log della telemetria sulla memoria interna (a meno che **Posizione di archiviazione** non punti a un'unità USB o a un'altra cartella). |
| `/opt/uavcast-pro/missions/` | Missioni salvate. |
| `/opt/uavcast-pro/installer.log` | Log dell'ultima installazione. |
| `/etc/systemd/system/uavcast-web.service` | Servizio dell'interfaccia web, incluso `SERVER_PORT`. |

## Opzioni dell'installer

L'installer è un singolo comando. Eseguilo di nuovo in qualsiasi momento per riparare o aggiornare un'installazione.

```bash
# Install or update to the latest version
curl -fsSL https://install.uavmatrix.com | sudo bash

# List the versions available for this device's architecture
curl -fsSL https://install.uavmatrix.com | bash -s -- -l

# Install a specific version
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2
```

| Opzione | Significato |
| --- | --- |
| `-l` | Elenca le versioni disponibili per questa architettura (arm64 o amd64). |
| `-b <version>` | Installa quella versione invece dell'ultima. |

L'installer rileva architettura e sistema operativo, installa i pacchetti di sistema, ZeroTier, Tailscale e i pacchetti della telecamera, configura l'UART del Raspberry Pi, imposta i servizi e avvia l'interfaccia web. Il suo log si trova in `/opt/uavcast-pro/installer.log`.

Puoi anche aggiornare dall'interfaccia web: **Applicazione → Aggiorna Applicazione**, scegli una versione in **Seleziona versione da aggiornare**, poi **Aggiorna Ora**.

## Punti di integrazione

UAVcast-Pro non ha un'API REST pubblica. Per integrarlo, usa:

- **MAVLink su UDP** verso ogni destinazione di stazione di terra (porta 14550 per impostazione predefinita), per qualsiasi software compatibile con MAVLink.
- **Video** via RTP/UDP (porta 5600) oppure RTSP dal drone (porta 8554). Vedi [VLC e RTSP](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/vlc-and-rtsp/).
- **Iniettori** per inviare i valori dei tuoi sensori nel flusso MAVLink via HTTP, UDP o seriale. Vedi [Iniettori](https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/injectors/).

Source: https://docs.uavmatrix.com/it/reference/services-and-files/
