# Video a scatti, in ritardo o grigio su 4G

> Risolvi scatti, macchie grigie e ritardi nel video di UAVcast-Pro su LTE o VPN allineando bitrate, risoluzione, FPS e Tasso di Recupero del Stream al collegamento.

L'immagine arriva, ma scatta, si blocca, mostra blocchi grigi sullo schermo oppure è in ritardo di secondi. Quasi sempre il flusso richiede più di quanto il collegamento riesce a trasportare, oppure il codificatore invia i keyframe troppo raramente per recuperare i pacchetti persi.

| Cosa vedi | Causa probabile | Inizia da |
| --- | --- | --- |
| Macchie grigie o verdi che si risolvono dopo uno o due secondi | Pacchetti persi e keyframe troppo rari per recuperare | [Controllo 2](https://docs.uavmatrix.com/it/troubleshooting/choppy-or-delayed-video/#check-2) |
| Fluido sul Wi-Fi, ma scatta o si blocca su LTE | Bitrate superiore a quello che il collegamento cellulare in uplink può trasportare | [Controllo 1](https://docs.uavmatrix.com/it/troubleshooting/choppy-or-delayed-video/#check-1) |
| Scatta anche sulla rete locale | Limite della CPU sul drone, oppure la GCS non riesce a decodificare abbastanza velocemente | [Controllo 3](https://docs.uavmatrix.com/it/troubleshooting/choppy-or-delayed-video/#check-3) |
| Il video è in ritardo di secondi rispetto al drone | Stai guardando l'anteprima nel browser, oppure la GCS usa un buffer | [Controllo 4](https://docs.uavmatrix.com/it/troubleshooting/choppy-or-delayed-video/#check-4) |

## Verifica 1: riduci bitrate e risoluzione

Un uplink cellulare è molto più lento della velocità di download e cambia mentre il drone passa da una cella all'altra. Parti da valori bassi e aumenta gradualmente.

1. Vai su **Telecamera → Impostazioni telecamera**.
2. Imposta **Risoluzione** su 1280×720 o inferiore.
3. Imposta **Seleziona FPS** su 15 o 20.
4. Sposta il cursore **Bitrate:** su circa 1000–1500 kbps. `0` significa automatico.
5. Le impostazioni vengono salvate man mano che le modifichi, e la telecamera le applica.
6. Vola, o guida, il percorso che ti interessa. Se regge, aumenta un valore alla volta.

![Scheda Impostazioni telecamera con Risoluzione, Seleziona FPS, Bitrate e Tasso di Recupero del Stream](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/camera--settings.webp)

*Telecamera → Impostazioni telecamera: Risoluzione, Seleziona FPS, Bitrate e Tasso di Recupero del Stream sono i valori da regolare in base al collegamento in uplink.*

> **Quanta banda offre il collegamento?**
>
> **Dashboard → Traffico di Rete** mostra la velocità TX in tempo reale per ogni interfaccia. Se l'interfaccia del modem resta allo stesso limite qualunque bitrate tu imposti, quel limite è la capacità del tuo uplink.

## Verifica 2: imposta un Tasso di Recupero del Stream più veloce

Le macchie grigie derivano da pacchetti persi. Il decodificatore può riparare l'immagine solo al keyframe successivo. **Tasso di Recupero del Stream** imposta con quale frequenza vengono inviati i keyframe.

1. In **Telecamera → Impostazioni telecamera**, trova **Tasso di Recupero del Stream**.
2. Sposta il cursore da **Auto** verso **Ultra Fast**: meno fotogrammi tra un keyframe e l'altro riparano l'immagine più in fretta, ma usano più banda. Verso **Bandwidth Saver** si risparmia banda, ma il recupero è lento. Il suggerimento sotto il cursore (ad esempio *VPN/WiFi Friendly*) indica a cosa è adatta ciascuna posizione.
3. Salva e confronta. Se il collegamento è molto lento, combina un tasso di recupero più veloce con un bitrate più basso (verifica 1).

Con **Auto**, UAVcast-Pro invia un keyframe al secondo (uno ogni *FPS* fotogrammi, oppure ogni 30 fotogrammi quando FPS è impostato su auto).

## Verifica 3: controlla il carico della CPU

UAVcast-Pro codifica H.264 via software. Su un Raspberry Pi Zero 2 W, oppure con due telecamere in streaming contemporaneo, la CPU può esaurirsi.

1. Apri **Telecamera → Impostazioni telecamera** e guarda la scheda **Carico del sistema**.
2. Se riporta **CPU is near its limit. Lower the resolution or bitrate.**, fai esattamente questo: riduci risoluzione o bitrate.
3. Con **Doppio flusso** attivo, abbassa risoluzione o bitrate di un flusso, oppure disattiva il secondo flusso.
4. Controlla la **Dashboard** per **Slowed down (heat or power)** sotto **Alimentazione**. Una CPU rallentata codifica più lentamente. Vedi [Sottotensione e throttling](https://docs.uavmatrix.com/it/troubleshooting/undervoltage-and-throttling/).

## Verifica 4: sappi quale flusso stai guardando

L'**Anteprima dal Vivo** nel browser e la finestra video sulla **Mappa di Volo** passano dal media server integrato, che aggiunge ritardo. Servono per la configurazione, non per volare. Il flusso verso la tua stazione di terra va direttamente via UDP e ha una latenza molto più bassa.

Se è la stazione di terra stessa a essere in ritardo:

- In QGroundControl, verifica che la modalità a bassa latenza sia attiva nelle impostazioni video.
- Nelle pipeline GStreamer, usa `sync=false` sul video sink, come nel [comando di test](https://docs.uavmatrix.com/it/troubleshooting/no-video-in-gcs/#check-5).
- Via VPN, assicurati che ZeroTier o Tailscale raggiungano il drone direttamente e non tramite un relay. Tailscale mostra il relay in uso sotto **Relay** nella pagina **Rete Privata Virtuale**.

## Verifica 5: controlla il segnale cellulare

Vai su **Modem** e controlla **Qualità del Segnale** e **Tecnologia** sotto **Informazioni Modem**. Un segnale debole, oppure un ritorno da LTE a 3G, riduce l'uplink. Allontana il modem dal controllore di volo, dagli ESC e dai cavi di alimentazione, oppure usa un modem con antenne esterne.

## Ancora a scatti?

[Scarica i log](https://docs.uavmatrix.com/it/troubleshooting/collect-logs/) (**Camera Server**, ultimi 30 minuti) e inviali a **[support@uavmatrix.com](mailto:support@uavmatrix.com)** con il modello della telecamera, la risoluzione, gli FPS, il bitrate e il tipo di collegamento che usi in volo.

Correlati: [Impostazioni telecamera](https://docs.uavmatrix.com/it/uavcast-pro/camera/) · [Modem cellulare](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/cellular-modem/)

Source: https://docs.uavmatrix.com/it/troubleshooting/choppy-or-delayed-video/
