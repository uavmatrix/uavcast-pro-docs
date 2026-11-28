# Avvio rapido

> Collega un controllore di volo MAVLink a UAVcast-Pro e ottieni telemetria e video in diretta in Mission Planner o QGroundControl, prima sulla rete locale e poi via 4G/LTE.

Questa guida porta un drone con UAVcast-Pro installato alla telemetria e al video in diretta in Mission Planner o QGroundControl. Lavorerai prima sulla rete locale, dove ci sono meno cose che possono andare storte, e poi passerai al 4G/LTE. La parte locale richiede circa 10 minuti.

## Prima di iniziare

- UAVcast-Pro installato e dispositivo riavviato. Vedi [Installazione](https://docs.uavmatrix.com/it/get-started/installation/).
- La tua chiave di licenza. Vedi [Licenze e attivazione](https://docs.uavmatrix.com/it/get-started/license-activation/).
- Il controllore di volo collegato al computer di bordo tramite USB o una porta TELEM, e alimentato.
- Una telecamera collegata (facoltativa).
- Un laptop con Mission Planner o QGroundControl sulla **stessa rete** del drone. Annota l'indirizzo IP del laptop (`ipconfig` su Windows, `ip a` su Linux, **Impostazioni di Sistema → Rete** su macOS).

## 1. Attiva la licenza

> Per attivare il drone ti serve una licenza UAVcast-Pro. Acquistala nello store UAVmatrix.
>
> [Acquista UAVcast-Pro](https://uavmatrix.com/it/checkout) · [Vedi piani e prezzi](https://uavmatrix.com/it/products)

1. Apri `http://<drone-ip>` in un browser. Atterri sulla pagina **Applicazione**.
2. Incolla la chiave in **Inserisci Chiave di Licenza** e seleziona **Convalida**.

La barra laterale si sblocca. Ora vai su **Users**, seleziona **Add User** e crea un account Admin, così l'interfaccia web non è aperta a chiunque sulla rete.

## 2. Collega il controllore di volo

1. Vai su **Controllore di Volo → Connessione**.
2. In **Tipo di Connessione**, scegli **USB** o **UART / Seriale** in base al cablaggio.
3. Lascia **Porta** e **Velocità di Trasmissione** su **Automatico**.
4. Se il pannello di stato mostra **Link stopped**, seleziona **Connetti**.
5. Attendi che lo stato passi a **Connesso**. **Informazioni Mavlink** si riempie con tipo di veicolo, modalità di volo, GPS e batteria, e la barra in alto mostra **FC Connected**.

![Pagina Connessione del Controllore di Volo che mostra Connected over USB, il pannello Connection check con quattro passaggi superati e il MAVLink Inspector](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/flight-controller.webp)

*Controllore di Volo → Connessione con un collegamento USB funzionante.*

Bloccato su **Waiting for device**, **Detecting baud rate** o **No heartbeat**? Seleziona **Auto-detect** e leggi il pannello **Connection check**: indica il primo problema. Maggiori dettagli in [Controllore di volo](https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/).

## 3. Invia telemetria e video al laptop

1. Vai su **Stazioni di Controllo a Terra**. C'è già una scheda di destinazione vuota.
2. Inserisci un **Nome**, ad esempio `Laptop`.
3. In **IP o Host di Destinazione**, inserisci l'indirizzo IPv4 del laptop, ad esempio `192.168.1.20`, e premi Invio. Un segno di spunta verde indica che è salvato.
4. Lascia **Porta Telemetria** su `14550` e **Porta Video** su `5600`.
5. Attiva l'interruttore **Attiva Telemetria**.
6. Attiva l'interruttore **Attiva Video** se hai una telecamera.

I campi vengono salvati quando esci da ciascuno di essi. Non c'è un pulsante Salva.

## 4. Avvia la telecamera

Salta questo passaggio se non hai una telecamera.

1. Vai su **Telecamera → Impostazioni telecamera**.
2. Imposta **Attivare la Telecamera?** su **Sì**.
3. Clicca sullo slot **CAM 1** e scegli la telecamera, ad esempio *Raspberry Pi Camera - imx708 (CSI)* o la tua webcam USB.
4. In **Camera Settings**, scegli una **Risoluzione**. Parti da `1280x720` o dalla dimensione più vicina che la tua telecamera offre.
5. Lascia **Seleziona FPS** su **Auto** e **Bitrate** su `0` (auto).
6. In **Stream Settings**, spunta **Abilitare Anteprima dal Vivo?** e seleziona **Avvia**. **Anteprima dal Vivo** mostra l'immagine.

## 5. Apri la stazione di terra

**QGroundControl**

QGroundControl ascolta sulla porta UDP 14550 per impostazione predefinita, quindi il drone compare da solo entro pochi secondi.

Per il video: clicca sull'icona **Q** → **Application Settings** → **Video** (nelle versioni meno recenti, la sezione **Video** di **General**). Imposta **Source** su **UDP h.264 Video Stream** e mantieni la porta UDP predefinita `5600`. Il video compare nella vista Fly.

**Mission Planner**

In alto a destra scegli **UDP**, seleziona **Connect** e accetta la porta `14550`.

![Vista Flight Data di Mission Planner connessa via UDP: nel riquadro di connessione in alto a destra compaiono UDP, il collegamento UDP14550-1-QUADRO e il pulsante DISCONNECT; l'HUD mostra DISARMED, Unhealthy AHRS e GPS: No Fix](https://docs.uavmatrix.com/it/img/screenshots/gcs/mission-planner--connected.webp)

*Mission Planner connesso via UDP 14550: il riquadro di connessione (in alto a destra) mostra il collegamento e DISCONNECT. Configurazione da banco senza GPS, da cui Unhealthy AHRS e GPS: No Fix nell'HUD.*

Per il video: clic destro sull'HUD → **Video** → **Set GStreamer Source** e incolla:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

Guide complete con screenshot e soluzioni: [Mission Planner](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/mission-planner/), [QGroundControl](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/qgroundcontrol/), [Android](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/android/), e GStreamer su [Windows](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/gstreamer-linux/) o [macOS](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/gstreamer-macos/).

> **Firewall di Windows**
>
> Windows blocca l'UDP in ingresso a meno che l'app non abbia chiesto un'eccezione. Se telemetria o video non arrivano, consenti Mission Planner o QGroundControl attraverso il firewall per le reti **private e pubbliche**, oppure apri le porte UDP 14550 e 5600.

Ora hai telemetria e video sulla rete locale. La riga **Ground station** della dashboard mostra *Sending · … packets/s*.

## 6. Vola su 4G/LTE

Su una rete cellulare il drone non ha un indirizzo raggiungibile dal laptop, quindi entrambi si collegano alla stessa VPN. La VPN di Fleet Manager è inclusa nella tua licenza.

1. Collega il modem. In **Modem**, imposta **Tipo di modem** su **HiLink** o **Tradizionale (PPP)**. Lascia vuoto **Nome Punto di Accesso**: UAVcast-Pro trova l'APN. Vedi [Modem cellulare](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/cellular-modem/).
2. Accedi a [Fleet Manager](https://fleet-manager.uavmatrix.com/), apri **Network** e seleziona **Enable VPN Network** se non è ancora attiva.
3. Accoppia il drone: in UAVcast-Pro vai su **Gestione → Fleet Management → Connect to Fleet Manager**, poi inserisci il codice in Fleet Manager sotto **Fleet → Pair Device**. Lascia spuntata la voce **Enable VPN for this UAV**.
4. Collega il laptop alla VPN: installa Tailscale ed esegui il **GCS Connection Command** dalla pagina **Network** di Fleet Manager, poi contrassegna il laptop come **Ground Control Station (GCS)**.
5. In **Network → Stream Bindings**, aggiungi un'associazione del flusso (stream binding) dal drone al laptop. Fleet Manager invia la destinazione al drone, e la colonna **Ports** mostra su quali porte mettersi in ascolto.
6. In **Reti**, seleziona **Priorità Modem (Modalità Esterna)** in modo che il traffico passi dal modem quando il Wi-Fi cade.

Guida completa: [Volo oltre la portata visiva via 4G](https://docs.uavmatrix.com/it/guides/bvlos-4g/). Hai già una tua rete Tailscale o ZeroTier? Collega invece il drone e il laptop a quella rete e usa l'IP VPN del laptop come destinazione: vedi [VPN](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/vpn/).

> **Imposta un failsafe GCS prima di volare su LTE**
>
> I collegamenti cellulari si interrompono. Assicurati che il controllore di volo abbia un failsafe GCS configurato (`FS_GCS_ENABLE` su ArduPilot, `NAV_DLL_ACT` su PX4). La barra in alto mostra **GCS Failsafe Enabled** o **GCS Failsafe Disabled**.

## Prossimi passi

- [Due telecamere, commutazione RC e doppio flusso](https://docs.uavmatrix.com/it/uavcast-pro/camera/multi-camera/)
- [Registra ogni volo sul drone](https://docs.uavmatrix.com/it/uavcast-pro/camera/recordings/)
- [Correzioni RTK via 4G con NTRIP](https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/ntrip-rtk/)
- [Accoppia il drone con Fleet Manager](https://docs.uavmatrix.com/it/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/it/get-started/quick-start/
