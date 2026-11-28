# QGroundControl

> Ottieni la telemetria di UAVcast-Pro e il video H.264 live in QGroundControl su Windows, macOS o Linux: connessione automatica UDP 14550, sorgente Video UDP h.264 sulla porta 5600, modalità bassa latenza e soluzioni ai problemi.

QGroundControl ascolta MAVLink sulla porta UDP 14550 per impostazione predefinita, quindi un drone UAVcast-Pro appare non appena arriva la sua telemetria. Per il video, imposta una volta sola la sorgente video su **UDP h.264 Video Stream** sulla porta 5600. QGroundControl ha GStreamer integrato, quindi non c'è nient'altro da installare. Funziona allo stesso modo su Windows, macOS e Linux; per i tablet vedi [Android](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/android/).

## Prima di iniziare

- Sul drone, una destinazione in [Stazioni di Controllo a Terra](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/) con l'indirizzo IP di questo computer (l'indirizzo VPN su 4G), **Attiva Telemetria** attivo e, per il video, **Attiva Video** attivo.
- La telecamera in streaming su **Telecamera → Impostazioni telecamera**.
- QGroundControl da [qgroundcontrol.com](https://qgroundcontrol.com/).

## Telemetria

Avvia QGroundControl. Entro pochi secondi dal primo pacchetto il velivolo appare e la barra degli strumenti mostra la sua modalità di volo e la batteria.

![Vista Fly di QGroundControl collegata a un velivolo ArduPilot: barra degli strumenti con Not Ready e Stabilize, una missione a cinque waypoint sulla mappa con No GPS Lock for Vehicle e la finestra video nell'angolo in basso a sinistra che mostra WAITING FOR VIDEO](https://docs.uavmatrix.com/it/img/screenshots/gcs/qgroundcontrol--fly-view.webp)

*Telemetria funzionante: la barra degli strumenti mostra lo stato e la modalità di volo del velivolo (Not Ready, Stabilize). Questa è una configurazione di prova senza GPS, quindi compare No GPS Lock for Vehicle. La finestra video (in basso a sinistra) mostra WAITING FOR VIDEO finché il video non viene configurato più sotto.*

Non appare nulla? Verifica che la connessione UDP automatica sia attiva: icona **Q** → **Application Settings**, poi **AutoConnect to the following devices** → **UDP** selezionato (il valore predefinito). A seconda della versione di QGroundControl, l'elenco AutoConnect si trova nella pagina **Comm Links** oppure nella pagina **General**. Se sul drone hai impostato una **Telemetry Port** diversa da 14550, aggiungi invece un collegamento: **Application Settings** → **Comm Links** → **Add**, scegli **UDP**, la porta che hai scelto, poi **Connect**.

## Video

1. Clicca sull'icona **Q** (in alto a sinistra) → **Application Settings**.
2. Apri la pagina **Video**. Nelle versioni precedenti, il video è una sezione **Video** della pagina **General**.
3. Imposta **Source** su **UDP h.264 Video Stream**.
4. Verifica l'indirizzo UDP. Il valore predefinito `0.0.0.0:5600` ascolta sulla porta 5600, che corrisponde alla **Video Port** predefinita del drone. Se hai cambiato la **Video Port** sul drone, usa qui quella porta. Le versioni attuali chiamano il campo **UDP URL**; quelle più vecchie mostrano un numero di **UDP Port**.
5. Torna alla vista **Fly**. Il video appare nella piccola finestra nell'angolo. Cliccaci sopra per scambiare video e mappa.

*Illustrazione delle Impostazioni applicazione di QGroundControl: la pagina Video con Source impostato su UDP h.264 Video Stream, l'indirizzo UDP 0.0.0.0:5600 e Low Latency Mode.*

*Illustrazione QGroundControl, semplificato. (1) Icona Q → Application Settings, (2) Video, (3) Source UDP h.264 Video Stream, (4) UDP URL con porta 5600.*

### Modalità bassa latenza

Nelle stesse impostazioni video, attiva **Low Latency Mode**. QGroundControl scarta i frame in ritardo invece di accumularli nel buffer, il che riduce sensibilmente il ritardo su un buon collegamento. Su un collegamento 4G debole, però, l'immagine può scattare; in tal caso disattivala di nuovo.

## Firewall

- **Windows**: consenti QGroundControl sulle reti **Private** e **Public** quando Windows lo chiede. Le interfacce VPN (ZeroTier, Tailscale) vengono spesso classificate come Public. Per aprire le porte a mano, vedi [Mission Planner: firewall di Windows](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/mission-planner/#allow-mission-planner-through-the-windows-firewall); valgono le stesse regole.
- **macOS**: consenti le connessioni in entrata per QGroundControl quando macOS lo chiede.
- **Linux**: se `ufw` è attivo, esegui `sudo ufw allow 14550/udp` e `sudo ufw allow 5600:5602/udp`.

## Seconda telecamera e audio

QGroundControl riproduce un solo flusso video. Con il [doppio flusso](https://docs.uavmatrix.com/it/uavcast-pro/camera/multi-camera/) attivo, la telecamera 2 va sulla porta 5601: cambia la porta UDP in `5601` per guardarla, oppure apri la telecamera 2 in una finestra GStreamer ([Windows](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/gstreamer-linux/), [macOS](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/gstreamer-macos/)) accanto a QGroundControl.

QGroundControl ignora l'audio. Riproducilo con GStreamer sulla Video Port + 2 (`5602`).

## Problemi comuni

| Sintomo | Causa e soluzione |
| --- | --- |
| *Waiting For Vehicle Connection* | Nessuna telemetria raggiunge questo computer. Controlla l'IP di destinazione (IP VPN su 4G), **Attiva Telemetria** e il firewall. |
| La telemetria funziona, ma la finestra video indica nessun video | **Attiva Video** è disattivato, la telecamera non è in esecuzione, la sorgente non è **UDP h.264 Video Stream**, oppure la porta UDP 5600 è bloccata. |
| Il video appare, poi si blocca su 4G | Perdita di pacchetti. Abbassa il bitrate sul drone, imposta **Tasso di Recupero del Stream** su 15–30 frame e disattiva **Low Latency Mode**. |
| Il velivolo appare due volte | Due destinazioni puntano a questo computer, oppure un secondo collegamento duplica la connessione automatica. Rimuovine una. |
| Il video si ferma quando avvii un test GStreamer | Su una porta UDP può ascoltare un solo programma alla volta. Chiudine uno. |

Altri controlli: [Nessun video in QGroundControl o Mission Planner](https://docs.uavmatrix.com/it/troubleshooting/no-video-in-gcs/).

Source: https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/qgroundcontrol/
