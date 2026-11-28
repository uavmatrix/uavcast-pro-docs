# Pipeline GStreamer personalizzata

> Usa una pipeline GStreamer personalizzata in UAVcast-Pro per trasmettere una telecamera IP RTSP, una termocamera, H.265 o un pattern di test, con esempi e spiegazione del comportamento di anteprima e destinazioni.

Quando il supporto integrato alle telecamere non copre la tua telecamera, puoi fornire a UAVcast-Pro una tua pipeline GStreamer. I casi tipici sono una telecamera IP RTSP o gimbal, una termocamera, H.265 o l'invio verso un indirizzo fisso. UAVcast-Pro esegue la pipeline come servizio della telecamera, la riavvia se si interrompe e può comunque alimentare l'anteprima dal vivo e il registratore.

## Impostare una pipeline personalizzata

1. Vai su **Telecamera → Impostazioni telecamera**.
2. Clicca lo slot **CAM 1** e scegli **Inserisci Pipeline Personalizzata**.
3. Scrivi la pipeline in **Pipeline Personalizzata**, senza il prefisso `gst-launch-1.0`. (Se la incolli con il prefisso, UAVcast-Pro lo rimuove.)
4. Seleziona **Avvia** (o **Riavvia**) e controlla il **Registro Azioni** per eventuali errori.

> **Una pipeline personalizzata ignora la tua lista di stazioni di controllo a terra**
>
> La pipeline decide dove va il video. **Porta Video** e **Attiva Video** nelle [Stazioni di Controllo a Terra](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/) non hanno effetto: inserisci l'indirizzo e la porta della stazione di controllo a terra nell'`udpsink` della pipeline.

Testa la pipeline via SSH con `gst-launch-1.0 -v <pipeline>` prima di incollarla. Lì i messaggi di errore sono più chiari.

## Esempi

```text
videotestsrc ! x264enc ! video/x-h264, stream-format=byte-stream ! rtph264pay ! udpsink host=192.168.0.100 port=5600
```

```text
rtspsrc location=rtsp://192.168.144.25:8554/main.264 latency=0 ! rtph264depay ! h264parse ! rtph264pay config-interval=1 pt=96 ! udpsink host=10.147.17.20 port=5600 sync=false
```

```text
v4l2src device=/dev/video0 ! video/x-raw,width=1280,height=720,framerate=30/1 ! videoconvert ! x264enc tune=zerolatency speed-preset=superfast bitrate=1500 key-int-max=30 ! h264parse config-interval=1 ! rtph264pay pt=96 ! udpsink host=10.147.17.20 port=5600 sync=false
```

```text
videotestsrc ! x264enc tune=zerolatency ! rtph264pay pt=96 ! multiudpsink clients=10.147.17.20:5600,10.147.17.21:5600
```

Sostituisci gli indirizzi IP con quelli delle tue stazioni di controllo a terra (indirizzi VPN su 4G).

## Anteprima dal vivo e registrazione

Con **Abilitare Anteprima dal Vivo?** spuntato, UAVcast-Pro aggiunge alla tua pipeline un ramo che invia il video codificato al media server integrato, così anteprima, finestra video della Mappa di Volo e registrazione continuano a funzionare. Trova automaticamente il punto giusto:

- Se la pipeline contiene `tee name=t`, aggiunge un ramo da quel tee.
- Altrimenti divide il flusso subito prima di `rtph264pay` o `rtph265pay`.
- Per una sorgente RTSP senza un parser riconosciuto, lascia la pipeline così com'è e non c'è anteprima.

Per il risultato più prevedibile, termina il flusso codificato con `h264parse` e un `tee name=t`, e metti il tuo `udpsink` su un ramo di quel tee.

## Limiti

- Doppio flusso, commutazione RC e impostazioni per singola telecamera non si applicano a una pipeline personalizzata. La pipeline è l'intera configurazione video.
- Risoluzione, FPS, bitrate e impostazioni di capovolgimento sono nascosti, perché la pipeline li imposta.

Source: https://docs.uavmatrix.com/it/uavcast-pro/camera/custom-pipeline/
