# Nessun video in QGroundControl o Mission Planner

> La telemetria funziona ma il video resta nero in QGroundControl o Mission Planner? Controlla la telecamera, Attiva Video, l'IP di destinazione, UDP 5600 e la stazione di terra.

La telemetria arriva e il drone compare sulla mappa, ma l'area video resta nera, oppure la finestra video di QGroundControl mostra **WAITING FOR VIDEO**. Esegui i controlli in ordine. La maggior parte dei casi si risolve con il controllo 2 o 3.

![Vista Fly di QGroundControl collegata a un velivolo ArduPilot: barra degli strumenti con Not Ready e Stabilize, una missione a cinque waypoint sulla mappa con No GPS Lock per il velivolo, e la finestra video nell'angolo in basso a sinistra che mostra WAITING FOR VIDEO](https://docs.uavmatrix.com/it/img/screenshots/gcs/qgroundcontrol--fly-view.webp)

*Il sintomo in QGroundControl: la telemetria arriva (Not Ready, Stabilize nella barra degli strumenti; No GPS Lock perché questo banco di prova non ha GPS), ma la finestra video nell'angolo in basso a sinistra indica WAITING FOR VIDEO.*

| Cosa vedi | Causa probabile | Inizia da |
| --- | --- | --- |
| Il video è nero nella stazione di terra e nell'anteprima dal vivo di UAVcast-Pro | La telecamera non è in funzione sul drone | [Controllo 1](https://docs.uavmatrix.com/it/troubleshooting/no-video-in-gcs/#check-1) |
| L'anteprima dal vivo funziona, la stazione di terra resta nera | Attiva Video è disattivato per questa stazione di terra, oppure l'IP è errato | [Controllo 2](https://docs.uavmatrix.com/it/troubleshooting/no-video-in-gcs/#check-2) |
| Funzionava in Wi-Fi a casa, nero con il 4G | La destinazione usa un IP locale invece dell'IP della VPN | [Controllo 2](https://docs.uavmatrix.com/it/troubleshooting/no-video-in-gcs/#check-2) |
| Sembra tutto corretto, ma su Windows resta nero | Il firewall blocca l'UDP in ingresso sulla porta 5600 | [Controllo 3](https://docs.uavmatrix.com/it/troubleshooting/no-video-in-gcs/#check-3) |
| QGroundControl mostra il video, Mission Planner no | In Mission Planner non è impostata alcuna sorgente GStreamer | [Controllo 4](https://docs.uavmatrix.com/it/troubleshooting/no-video-in-gcs/#check-4) |

## Controllo 1: conferma che la telecamera trasmette sul drone

Se il drone non produce video, nessuna impostazione della stazione di terra servirà a nulla.

1. Apri l'interfaccia web di UAVcast-Pro e vai su **Telecamera → Impostazioni telecamera**.
2. Controlla che **Attivare la Telecamera?** sia **Sì** e che una telecamera sia scelta in **Seleziona Telecamera**.
3. Controlla che la telecamera sia in funzione: la riga **Video** della dashboard deve indicare **In esecuzione**. Se è ferma, premi **Avvia** nella pagina Telecamera (il pulsante diventa **Riavvia** mentre la telecamera è in funzione).
4. Attiva **Abilitare Anteprima dal Vivo?** e guarda **Anteprima dal Vivo**. Se vedi un'immagine, la telecamera funziona e puoi passare al controllo 2.
5. Se **Seleziona Telecamera** indica **Nessuna telecamera disponibile**, vai a [Telecamera non rilevata](https://docs.uavmatrix.com/it/troubleshooting/camera-not-detected/).

![Pagina Impostazioni telecamera di UAVcast-Pro con CAM 1 attivata e il pannello Anteprima dal Vivo che mostra Nessun Video Disponibile](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/camera.webp)

*Telecamera → Impostazioni telecamera con CAM 1 attivata. Anteprima dal Vivo mostra Nessun Video Disponibile finché non è selezionato Abilitare Anteprima dal Vivo?.*

> **L'anteprima non è il flusso verso la stazione di terra**
>
> L'anteprima nel browser passa dal media server integrato (WebRTC sulla porta 8889). La stazione di terra riceve un flusso H.264 separato tramite UDP. Un'anteprima funzionante dimostra che la telecamera funziona, non che il flusso UDP arrivi al tuo laptop.

Se i **Registri azioni** nella pagina Telecamera indicano che una telecamera *non supporta* una risoluzione, scegli un altro valore in **Risoluzione**. UAVcast-Pro passa alla dimensione supportata più grande e registra quella utilizzata.

## Controllo 2: verifica la destinazione della stazione di terra

UAVcast-Pro invia il video solo alle destinazioni in cui il video è attivo. Telemetria e video hanno interruttori separati, e **entrambi sono disattivati su una nuova destinazione**.

1. Vai su **Stazioni di Controllo a Terra** e trova la scheda del computer che esegue la tua stazione di terra.
2. Assicurati che **Attiva Endpoint** e **Attiva Video** siano entrambi attivi.
3. Controlla **IP o Host di Destinazione**. Deve essere l'indirizzo IPv4 del computer della stazione di terra visto dal drone. Gli hostname non sono accettati.
4. Controlla che **Porta Video** sia `5600`, oppure la porta su cui ascolta la tua stazione di terra.
5. I campi vengono salvati quando esci dal campo o premi Invio. Una spunta verde conferma il salvataggio.

![Porta Video 5600 e interruttore Attiva Video acceso](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/ground-control--video-enabled.webp)

*Stazioni di Controllo a Terra: una destinazione con Attiva Video attivo e Porta Video 5600.*

> **Volo con 4G? Usa l'IP della VPN**
>
> Tramite collegamento cellulare il drone non può raggiungere l'indirizzo locale del tuo laptop (come `192.168.1.20`). Usa l'indirizzo che il laptop ha sulla VPN (VPN di Fleet Manager, Tailscale o ZeroTier). Su Windows, esegui `ipconfig` e cerca l'adattatore di Tailscale o ZeroTier.

Usi Fleet Manager? Le destinazioni vengono create automaticamente quando aggiungi un'associazione di flusso, e ogni drone aggiuntivo sulla stessa stazione di terra ottiene le sue porte. Controlla la porta video mostrata nell'associazione, non la 5600. Vedi [Associazioni di flusso](https://docs.uavmatrix.com/it/fleet-manager/network/stream-bindings/).

## Controllo 3: consenti l'UDP 5600 nel firewall

Il video arriva come traffico UDP in ingresso. Su Windows questo è bloccato per impostazione predefinita, anche quando la telemetria passa, perché la stazione di terra ha richiesto un'eccezione.

**Windows**

Apri **PowerShell come amministratore** ed esegui:

```powershell
New-NetFirewallRule -DisplayName "UAV Video" -Direction Inbound -Protocol UDP -LocalPort 5600 -Action Allow
New-NetFirewallRule -DisplayName "MAVLink Telemetry" -Direction Inbound -Protocol UDP -LocalPort 14550 -Action Allow
```

Gli adattatori di ZeroTier e Tailscale spesso sono classificati come rete *Pubblica*. Una regola creata in questo modo si applica a tutti i profili.

**Linux**

```bash
sudo ufw allow 5600/udp comment 'UAV Video'
sudo ufw allow 14550/udp comment 'MAVLink Telemetry'
```

**macOS**

Il firewall di macOS consente l'UDP in ingresso per le app che approvi. Se hai cliccato *Nega* quando QGroundControl è stato avviato per la prima volta, consentilo di nuovo in **Impostazioni di Sistema → Rete → Firewall → Opzioni**.

## Controllo 4: configura il video nella stazione di terra

**QGroundControl**

1. Clicca sull'icona **Q**, poi su **Impostazioni Applicazione**.
2. Apri le impostazioni video (**Video**, oppure **Generale → Video** nelle versioni precedenti).
3. Imposta **Sorgente** su **Flusso video UDP h.264**, e controlla che l'indirizzo UDP usi la porta `5600` (**UDP URL** `0.0.0.0:5600` nelle versioni attuali, **UDP Port** `5600` in quelle precedenti).
4. Torna alla vista Fly. Il riquadro video dovrebbe mostrare un'immagine entro pochi secondi.

**Mission Planner**

Mission Planner mostra il video nell'HUD. Se resta nero, imposta la sorgente a mano:

1. Fai clic con il tasto destro sull'HUD e scegli **Video → Imposta sorgente GStreamer**.
2. Incolla questa pipeline e conferma:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

## Controllo 5: prova il flusso senza stazione di terra

Questo passaggio esclude dal problema il software della stazione di terra. Se si apre una finestra con il video, il drone, la rete e il firewall funzionano e il problema è nelle impostazioni della stazione di terra.

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

> **Windows: scegli l'installazione Completa**
>
> Quando installi GStreamer (runtime MSVC 64 bit), scegli **Completa**. L'installazione Tipica esclude il decoder H.264 e il comando fallisce con `no element "avdec_h264"`.

Chiudi il test prima di riaprire la stazione di terra: su una porta può essere in ascolto un solo programma alla volta. Configurazione passo passo del ricevitore: [Mission Planner](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/mission-planner/), [QGroundControl](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/qgroundcontrol/), e GStreamer su [Windows](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/gstreamer-linux/) o [macOS](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/gstreamer-macos/).

> **Video presente, ma a scatti con il 4G?**
>
> Vedi [Video a scatti o in ritardo](https://docs.uavmatrix.com/it/troubleshooting/choppy-or-delayed-video/).

## Ancora nessun video?

[Scarica i log](https://docs.uavmatrix.com/it/troubleshooting/collect-logs/) con **Camera Server** selezionato nell'elenco dei log, e inviali a **[support@uavmatrix.com](mailto:support@uavmatrix.com)** insieme alla versione di UAVcast-Pro, al modello della telecamera e alla stazione di terra che usi.

Correlati: [Impostazioni telecamera](https://docs.uavmatrix.com/it/uavcast-pro/camera/) · [Stazioni di Controllo a Terra](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/)

Source: https://docs.uavmatrix.com/it/troubleshooting/no-video-in-gcs/
