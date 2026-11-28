# Mission Planner

> Collega Mission Planner a un drone UAVcast-Pro: MAVLink su UDP 14550, video H.264 in diretta nell'HUD con la sorgente GStreamer esatta, firewall di Windows, una seconda telecamera ed errori comuni.

Mission Planner riceve la telemetria di UAVcast-Pro sulla porta UDP 14550 e mostra il video in diretta nel suo HUD tramite una sorgente GStreamer sulla porta 5600. La telemetria richiede un solo clic; il video richiede una pipeline incollata una volta sola, che Mission Planner ricorda.

## Prima di iniziare

- Sul drone, una destinazione in [Stazioni di Controllo a Terra](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/) con l'indirizzo IP di questo PC (l'indirizzo VPN via 4G), **Attiva Telemetria** attivo e **Attiva Video** attivo per il video.
- La telecamera in streaming su **Telecamera → Impostazioni telecamera**.
- Una versione aggiornata di Mission Planner su Windows. Trova l'IP di questo PC con `ipconfig` in un Prompt dei comandi.

## Collega la telemetria

1. Nell'angolo in alto a destra di Mission Planner, scegli **UDP** nel menu a tendina di connessione. Il baud rate viene ignorato.
2. Seleziona **Connect**.
3. Quando ti chiede la porta di ascolto, mantieni `14550` (o la **Porta Telemetria** che hai impostato sul drone) e seleziona **OK**.
4. Mission Planner scarica i parametri e il drone compare sulla mappa.

![Vista Flight Data di Mission Planner collegata via UDP: il riquadro di connessione in alto a destra mostra UDP, il link UDP14550-1-QUADRO e il pulsante DISCONNECT; l'HUD mostra DISARMED, Unhealthy AHRS e GPS: No Fix](https://docs.uavmatrix.com/it/img/screenshots/gcs/mission-planner--connected.webp)

*Collegato. Il riquadro in alto a destra mostra UDP e il link UDP14550-1-QUADRO, e il pulsante ora dice DISCONNECT. Questa è una configurazione da banco senza GPS, quindi l'HUD mostra DISARMED, Unhealthy AHRS e GPS: No Fix.*

## Mostra il video nell'HUD

1. Fai clic destro sull'HUD (l'orizzonte artificiale) e scegli **Video → Set GStreamer Source**.

2. Incolla questa pipeline e seleziona **OK**:

   ```text
   udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
   ```

3. Il video sostituisce lo sfondo dell'HUD entro pochi secondi. I dati di volo restano sopra di esso.

*Illustrazione di Mission Planner: menu del tasto destro sull'HUD con Video evidenziato e la voce del sottomenu Set GStreamer Source.*

*Illustrazione Mission Planner, semplificato. (1) Clic destro sull'HUD, (2) Video, (3) Set GStreamer Source, poi incolla la pipeline.*

Mission Planner usa una propria copia di GStreamer per l'HUD, quindi non serve l'installazione separata da [GStreamer su Windows](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/gstreamer-windows/). Se Mission Planner offre di scaricare GStreamer, accettalo.

Mantieni la fine della pipeline esattamente come mostrato: Mission Planner ha bisogno di `video/x-raw,format=BGRA ! appsink name=outsink` per disegnare l'immagine. Cambia solo la porta.

### Latenza più bassa

`rtpjitterbuffer` elimina i pacchetti in ritardo al costo di circa 200 ms di ritardo. Su un buon collegamento puoi ridurlo:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer latency=0 ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink sync=false
```

Su un collegamento 4G debole, mantieni il jitter buffer predefinito: l'immagine si spezza meno.

## Consenti Mission Planner nel firewall di Windows

Windows chiede la prima volta che Mission Planner si mette in ascolto sulla rete. Consentilo per le reti **Privata** e **Pubblica**. Un adattatore ZeroTier o Tailscale è spesso classificato come **Pubblica**, quindi spuntare solo Privata blocca la VPN.

Se hai chiuso il messaggio, apri le porte in una PowerShell come amministratore:

```powershell
New-NetFirewallRule -DisplayName "UAVcast-Pro telemetry" -Direction Inbound -Protocol UDP -LocalPort 14550 -Action Allow
New-NetFirewallRule -DisplayName "UAVcast-Pro video" -Direction Inbound -Protocol UDP -LocalPort 5600-5602 -Action Allow
```

## Seconda telecamera (doppio flusso)

Con il [doppio flusso](https://docs.uavmatrix.com/it/uavcast-pro/camera/multi-camera/) attivo, la camera 2 va alla **Porta Video (Telecamera 2)**, per impostazione predefinita `5601`. L'HUD di Mission Planner mostra una sola sorgente. Puoi cambiare la sorgente dell'HUD sulla porta 5601 quando ti serve la camera 2, oppure guardare la camera 2 in una finestra GStreamer separata: vedi [GStreamer su Windows](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/gstreamer-windows/).

L'audio (Porta Video + 2) viene ignorato da Mission Planner. Riproducilo con GStreamer.

## Problemi comuni

| Sintomo | Causa e soluzione |
| --- | --- |
| Si connette via Wi-Fi, ma nulla via 4G | La destinazione usa l'IP LAN. Usa l'IP VPN di questo PC. |
| *No heartbeat packets received* | Il drone non invia a questo PC: IP sbagliato, **Attiva Telemetria** disattivo, oppure il firewall blocca la UDP 14550. |
| La telemetria funziona, l'HUD resta nero | **Attiva Video** è disattivo per questa destinazione, la telecamera non è in esecuzione, oppure la UDP 5600 è bloccata. Prova con [GStreamer su Windows](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/gstreamer-windows/). |
| Il video si blocca o diventa grigio e sfocato | Perdita di pacchetti. Abbassa il bitrate sul drone e imposta **Tasso di Recupero del Stream** a 15–30 fotogrammi. |
| Il video si interrompe quando si apre un altro programma | Solo un programma può essere in ascolto su una porta UDP. Chiudi la finestra GStreamer o QGroundControl che usa anche la 5600. |

Altri controlli: [Nessun video in QGroundControl o Mission Planner](https://docs.uavmatrix.com/it/troubleshooting/no-video-in-gcs/) e [Nessuna telemetria nella stazione di terra](https://docs.uavmatrix.com/it/troubleshooting/no-telemetry-in-gcs/).

Source: https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/mission-planner/
