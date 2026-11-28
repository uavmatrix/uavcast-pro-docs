# Impostazioni telecamera

> Configura una telecamera Raspberry Pi CSI o una webcam USB in UAVcast-Pro e trasmetti video H.264 a bassa latenza via UDP verso QGroundControl o Mission Planner. Risoluzione, FPS e bitrate.

UAVcast-Pro acquisisce il video da una telecamera CSI di Raspberry Pi o da una webcam USB, lo codifica in H.264 e lo invia come RTP via UDP a ogni stazione di controllo a terra con **Attiva Video** attivo. Mission Planner e QGroundControl lo riproducono direttamente sulla porta 5600. Una copia dello stream alimenta l'anteprima dal vivo nell'interfaccia web e il registratore di bordo. Apri **Telecamera → Impostazioni telecamera**.

![Pannello di Controllo Telecamera con CAM 1 impostata su una telecamera Raspberry Pi, impostazioni di risoluzione, FPS, bitrate e tasso di recupero dello stream, e il pannello Anteprima dal Vivo](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/camera.webp)

*Telecamera → Impostazioni telecamera con una telecamera Raspberry Pi come CAM 1 a 1536×864 e 30 FPS, bitrate Auto. Qui l'Anteprima dal Vivo è disattivata.*

## Configurare la telecamera

1. Collega la telecamera e vai su **Telecamera → Impostazioni telecamera**.
2. Imposta **Attivare la Telecamera?** su **Sì**.
3. Clicca lo slot **CAM 1** e scegli la telecamera. Le telecamere CSI compaiono come *Raspberry Pi Camera - imx708 (CSI)* o simile; le telecamere USB con il loro nome.
4. In **Impostazioni Stream**, scegli una **Risoluzione** supportata dalla tua telecamera. Le dimensioni non supportate sono contrassegnate.
5. Lascia **Seleziona FPS** su **Auto** e **Bitrate** su `0` (auto) per iniziare.
6. In **Impostazioni Stream**, spunta **Abilitare Anteprima dal Vivo?** e seleziona **Avvia**.
7. Nelle [Stazioni di Controllo a Terra](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/), attiva **Attiva Video** per ogni stazione che deve ricevere il video.

Se nell'elenco non compare alcuna telecamera, consulta il **Registro Azioni** in fondo alla pagina: mostra ogni dispositivo controllato dal rilevatore di telecamere e il motivo per cui è stato saltato.

## Riferimento impostazioni

| Impostazione | Predefinito | Valori | Note |
| --- | --- | --- | --- |
| **Attivare la Telecamera?** | **Sì** | **Sì**, **No** | **No** interrompe del tutto il video. |
| **CAM 1** | Telecamera Raspberry Pi | Telecamere rilevate, **Inserisci Pipeline Personalizzata** | Scegli **Inserisci Pipeline Personalizzata** per scrivere una tua pipeline GStreamer. Vedi [Pipeline personalizzata](https://docs.uavmatrix.com/it/uavcast-pro/camera/custom-pipeline/). |
| **Risoluzione** | `640x480` | Dimensioni riportate dalla telecamera | Se la telecamera non può fornire la dimensione, UAVcast-Pro passa alla dimensione supportata più grande e registra quale ha usato. |
| **Seleziona FPS** | **Auto** | **Auto** o le frequenze supportate dalla telecamera a questa risoluzione | **Auto** lascia scegliere la telecamera. |
| **Bitrate** | `0` (**Auto**) | 0–10000 kbps, a passi di 100 | Imposta un valore fisso per i collegamenti cellulari. |
| **Tasso di Recupero del Stream** | **Auto** | **Auto** (0), 1, 5, 10, 15, 30, 60, 90, 120 fotogrammi | Intervallo dei keyframe. Valori più bassi recuperano più in fretta dopo la perdita di pacchetti e riducono le sfocature grigie sulla VPN, a costo di banda. |
| **Impostazioni capovolgimento** | Disattivato | **Capovolgi Verticalmente**, **Capovolgi Orizzontalmente** | Telecamere CSI. |
| **Rotazione** | `0°` | 0°, 90°, 180°, 270° | Telecamere USB e altre telecamere non CSI. |
| **Abilitare Anteprima dal Vivo?** | Attivo | Attivo, disattivato | Anteprima in questa pagina e nella Mappa di Volo. Anche la registrazione usa questa copia dello stream. |

Le impostazioni si salvano man mano che le cambi. Se uno stream in esecuzione non recepisce una modifica, seleziona **Riavvia** in **Impostazioni Stream**.

## Scegliere le impostazioni per il tuo collegamento

Non esiste un'unica impostazione giusta: il bitrate deve rientrare nella parte più lenta del collegamento, lasciando spazio per la telemetria. Valori di partenza per una telecamera:

| Collegamento | Risoluzione | FPS | Bitrate | Tasso di Recupero del Stream |
| --- | --- | --- | --- | --- |
| Wi-Fi o Ethernet locale | 1920x1080 | 30 | 4000–6000 kbps | Auto |
| 4G/LTE buono | 1280x720 | 30 | 1500–2500 kbps | 30 fotogrammi |
| 4G debole o lungo raggio | 1280x720 o 854x480 | 15–20 | 800–1200 kbps | 15 fotogrammi |

Se l'immagine si blocca o si sfuma di grigio dopo una perdita di pacchetti, abbassa prima il bitrate, poi il **Tasso di Recupero del Stream**, così i keyframe arrivano più spesso.

### Carico CPU

L'indicatore **Carico del sistema** mostra quanto lavora il codificatore. Su un Raspberry Pi 5 ogni stream viene codificato via software (il Pi 5 non ha un codificatore H.264), quindi risoluzioni elevate o due stream possono saturare la CPU. Quando compare l'avviso *CPU is near its limit. Lower the resolution or bitrate.*, riduci risoluzione o bitrate prima di volare.

## Anteprima dal vivo

**Anteprima dal Vivo** riproduce lo stream nel browser tramite il media server integrato (WebRTC sulla porta **8889**). Si trova a qualche centinaio di millisecondi dietro allo stream UDP che riceve la stazione di controllo a terra, a seconda della rete. Usa il pulsante per aprire in una nuova scheda e guardarlo a schermo intero. I browser avviano l'anteprima senza audio; attivalo nel player se usi l'[audio](https://docs.uavmatrix.com/it/uavcast-pro/camera/audio/).

L'anteprima richiede che il browser raggiunga direttamente la porta 8889 del drone. Funziona in LAN e su VPN, ma non tramite **Open via Proxy** di Fleet Manager, che trasporta solo l'interfaccia web. Per l'anteprima usa **Open via VPN**.

## Come viene inviato lo stream

| Stream | Trasporto | Porta sulla stazione di controllo a terra |
| --- | --- | --- |
| Video Telecamera 1 | H.264, RTP su UDP | **Porta Video** (predefinita `5600`) |
| Video Telecamera 2 (doppio flusso) | H.264, RTP su UDP | **Porta Video (Telecamera 2)**, predefinita Porta Video + 1 (`5601`) |
| Audio (opzionale) | Opus, RTP su UDP | Porta Video + 2 (`5602`) |
| Anteprima | WebRTC | Dal browser al drone, porta 8889 |

Il drone invia lo stream alla stazione di controllo a terra. La stazione non deve richiederlo, e nulla sul drone resta in ascolto per connessioni video in entrata.

## Correlati

- [Due telecamere: commutazione RC e doppio flusso](https://docs.uavmatrix.com/it/uavcast-pro/camera/multi-camera/)
- [Audio](https://docs.uavmatrix.com/it/uavcast-pro/camera/audio/)
- [Registrazioni e revisione del volo](https://docs.uavmatrix.com/it/uavcast-pro/camera/recordings/)
- [Pipeline GStreamer personalizzata](https://docs.uavmatrix.com/it/uavcast-pro/camera/custom-pipeline/)
- [Risoluzione dei problemi: telecamera non rilevata](https://docs.uavmatrix.com/it/troubleshooting/camera-not-detected/)
- [Risoluzione dei problemi: video a scatti o in ritardo](https://docs.uavmatrix.com/it/troubleshooting/choppy-or-delayed-video/)

Source: https://docs.uavmatrix.com/it/uavcast-pro/camera/
