# Stazioni di controllo a terra

> Aggiungi destinazioni delle stazioni di terra in UAVcast-Pro per inviare telemetria MAVLink (UDP 14550) e video H.264 (UDP 5600) a Mission Planner, QGroundControl o più PC.

Una destinazione indica a UAVcast-Pro dove inviare telemetria e video. Ogni destinazione è un indirizzo IP più una porta per la telemetria e una porta per il video. UAVcast-Pro invia a tutte le destinazioni attive contemporaneamente tramite UDP, quindi Mission Planner su un laptop e QGroundControl su un tablet possono ricevere entrambi il drone. Apri **Stazioni di Controllo a Terra** nella barra laterale.

![Pagina Stazioni di Controllo a Terra con due schede di destinazione e il pulsante Aggiungi Destinazione](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/ground-control.webp)

*Due schede di destinazione: una disattivata e vuota, e una attiva con telemetria e video abilitati.*

## Aggiungi una destinazione

1. Seleziona **Aggiungi Destinazione**. Compare una nuova scheda. (Una installazione nuova ha già una scheda vuota.)
2. Inserisci un **Nome**, per esempio `Laptop pilota`.
3. Inserisci l'indirizzo IPv4 del computer della stazione di terra in **IP o Host di Destinazione** e premi Invio. Un segno di spunta verde significa che è salvato.
4. Controlla **Porta Telemetria** (predefinita `14550`) e **Porta Video** (predefinita `5600`). Usa le porte su cui ascolta la tua stazione di terra.
5. Attiva **Attiva Telemetria** e, se vuoi il video, **Attiva Video**.

Ogni campo viene salvato quando premi Invio o esci dal campo. Non c'è un pulsante **Salva**. Il routing della telemetria recepisce la modifica entro pochi secondi.

> **Usa un indirizzo IPv4, non un nome host**
>
> Nonostante l'etichetta **IP o Host di Destinazione**, UAVcast-Pro accetta solo un indirizzo IPv4 come `192.168.1.20` o un indirizzo VPN come `10.147.17.5`. I nomi host vengono rifiutati con *Inserisci un indirizzo IPv4 valido, per esempio 192.168.1.10.*

## Quale indirizzo IP usare

| Dove si trova la stazione di terra | Usa |
| --- | --- |
| Stessa rete Wi-Fi o Ethernet del drone | L'indirizzo LAN della stazione di terra, per esempio `192.168.1.20`. |
| Ovunque, via 4G/LTE | L'indirizzo **VPN** della stazione di terra (ZeroTier, Tailscale o Fleet Manager). Vedi [VPN](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/vpn/). |
| Più computer | Una destinazione per computer. |

## Impostazioni della destinazione

| Impostazione | Predefinito | Valori | Note |
| --- | --- | --- | --- |
| **Attiva Endpoint** | Attivo | Attivo, disattivato | Interruttore principale. Disattivato interrompe telemetria, video e audio verso questa destinazione, ma mantiene le sue impostazioni. |
| **Nome** | vuoto | fino a 49 caratteri | Mostrato sulla scheda e nella dashboard. |
| **IP o Host di Destinazione** | vuoto | indirizzo IPv4 | Obbligatorio prima di poter attivare telemetria o video. |
| **Porta Telemetria** | `14550` | 1–65535 | Porta UDP su cui la stazione di terra ascolta i messaggi MAVLink. |
| **Porta Video** | `5600` | 1–65535 | Porta UDP per il video RTP H.264 (camera 1). |
| **Porta Video (Telecamera 2)** | vuoto = Porta Video + 1 | 1–65535 | Visibile solo quando il [doppio flusso](https://docs.uavmatrix.com/it/uavcast-pro/camera/multi-camera/) è attivo. |
| **Attiva Video** | Disattivo | Attivo, disattivato | Invia il flusso della telecamera a questa destinazione. |
| **Attiva Telemetria** | Disattivo | Attivo, disattivato | Invia MAVLink a questa destinazione e accetta da essa comandi di ritorno. |
| **Read Only** | Disattivo | Attivo, disattivato | Richiede **Attiva Telemetria**. La stazione di terra riceve la telemetria ma non può modificare nulla sul velivolo: comandi, armo, cambi di modalità, scritture di parametri e di missione, RC override e controllo manuale da essa sono bloccati. Vale a partire da UAVcast-Pro 6.5.3; nelle versioni precedenti, Read Only non blocca le scritture dei parametri. |

L'audio, quando attivi **Invia audio alle stazioni di terra** nella pagina Telecamera, va a ogni destinazione che riceve il video, sulla **Porta Video + 2** (per esempio `5602`). Vedi [Audio](https://docs.uavmatrix.com/it/uavcast-pro/camera/audio/).

Quindi ogni destinazione occupa tre porte lato video: **Porta Video**, + 1 (camera 2) e + 2 (audio). Se due destinazioni puntano allo stesso computer, distanzia le porte video di 3, per esempio `5600` e `5603`. Vedi [Due stazioni su un computer](https://docs.uavmatrix.com/it/guides/multiple-ground-stations/#3-two-stations-on-one-computer).

## Configura il lato ricevente

Scegli il programma che usi a terra. Ogni pagina contiene le impostazioni esatte, il passo per il firewall e le soluzioni per gli errori più comuni.

| Stazione di terra | Telemetria | Video | Pagina |
| --- | --- | --- | --- |
| Mission Planner (Windows) | UDP 14550 | sorgente GStreamer su 5600 | [Mission Planner](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/mission-planner/) |
| QGroundControl (Windows, macOS, Linux) | UDP 14550, si connette da sola | UDP h.264 su 5600 | [QGroundControl](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/qgroundcontrol/) |
| Tablet o telefono Android | QGroundControl, UDP 14550 | UDP h.264 su 5600 | [Android](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/android/) |
| GStreamer su Windows | – | `gst-launch-1.0` su 5600 | [GStreamer su Windows](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/gstreamer-windows/) |
| GStreamer su Linux | – | `gst-launch-1.0` su 5600 | [GStreamer su Linux](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/gstreamer-linux/) |
| GStreamer su macOS | – | `gst-launch-1.0` su 5600 | [GStreamer su macOS](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/gstreamer-macos/) |
| VLC, oppure lettura di RTSP dal drone | – | file SDP, oppure RTSP su 8554 | [VLC e RTSP](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/vlc-and-rtsp/) |

### Cosa invia il drone

| Flusso | Formato | Porta sulla stazione di terra |
| --- | --- | --- |
| Telemetria | MAVLink su UDP | **Porta Telemetria** (predefinita `14550`) |
| Video camera 1 | H.264 in RTP, payload type 96, su UDP | **Porta Video** (predefinita `5600`) |
| Video camera 2 (doppio flusso) | H.264 in RTP, payload type 96, su UDP | **Porta Video (Telecamera 2)** (predefinita Porta Video + 1, `5601`) |
| Audio (opzionale) | Opus in RTP, payload type 97, 48 kHz, su UDP | Porta Video + 2 (`5602`) |

Il drone invia ogni flusso alla destinazione. Non è necessario alcun collegamento verso il drone, ma il firewall della stazione di terra deve lasciar passare i pacchetti UDP in entrata.

## Più stazioni di terra

Aggiungi una destinazione per computer. Se due stazioni di terra girano sullo **stesso** computer (per esempio QGroundControl e uno strumento di logging), assegna porte di telemetria diverse, come `14550` e `14551`, e imposta ogni applicazione sulla sua porta.

Usa **Read Only** per gli osservatori, gli operatori del carico utile o un secondo schermo: vedono tutto ma non possono comandare il velivolo.

## Destinazioni da Fleet Manager

Quando il drone è accoppiato con Fleet Manager e crei lì un'associazione del flusso (stream binding), Fleet Manager aggiunge la destinazione per te. Queste schede mostrano un'icona a nuvola (*Gestito da Fleet Manager*). Modificale in Fleet Manager invece che qui. Vedi [Accoppiamento con Fleet Manager](https://docs.uavmatrix.com/it/uavcast-pro/fleet-pairing/).

## Verifica che i dati arrivino

- La riga **Stazione di terra** nella [Dashboard](https://docs.uavmatrix.com/it/uavcast-pro/dashboard/) mostra *Invio · 16 pacchetti/s* o *Invio a 2 · … pacchetti/s*.
- **Controllore di Volo → Connessione → Verifica connessione** elenca ogni destinazione con la sua frequenza di pacchetti.
- *1 configurata · in attesa del controllore di volo* significa che la destinazione è a posto, ma non arriva ancora telemetria dal controllore di volo.

Gli utenti Read Only vedono questa pagina ma non possono modificarla.

## Risoluzione dei problemi

- [Nessuna telemetria nella stazione di terra](https://docs.uavmatrix.com/it/troubleshooting/no-telemetry-in-gcs/)
- [Nessun video in QGroundControl o Mission Planner](https://docs.uavmatrix.com/it/troubleshooting/no-video-in-gcs/)

Source: https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/
