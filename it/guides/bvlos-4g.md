# Vola oltre la portata visiva su 4G

> Fai volare un drone su 4G/LTE con UAVcast-Pro, un modem cellulare e la VPN di Fleet Manager, con telemetria e video dal vivo in QGroundControl o Mission Planner.

Questa guida ti accompagna dal banco di lavoro al volo sulla rete cellulare: telemetria e video dal vivo in QGroundControl o Mission Planner, ovunque entrambe le estremità abbiano copertura. Usa la VPN inclusa in [Fleet Manager](https://docs.uavmatrix.com/it/fleet-manager/), compresa nella tua licenza UAVcast-Pro, quindi nessuno dei due lati ha bisogno di un IP pubblico o di port forwarding.

**Tempo:** circa un'ora. **Ti servono:**

- Un computer di bordo (Raspberry Pi 4 o 5, oppure un'altra [scheda supportata](https://docs.uavmatrix.com/it/reference/supported-hardware/)) con UAVcast-Pro [installato](https://docs.uavmatrix.com/it/get-started/installation/) e la [licenza attivata](https://docs.uavmatrix.com/it/get-started/license-activation/).
- Un controllore di volo MAVLink (ArduPilot o PX4), un cavo dati USB oppure il cablaggio TELEM.
- Un modem USB 4G/LTE e una SIM dati. Disattiva prima il PIN della SIM da un telefono: ti eviterà problemi.
- Una telecamera, se vuoi il video.
- Un laptop con QGroundControl o Mission Planner e il [client Tailscale](https://tailscale.com/download).
- Un'[organizzazione Fleet Manager](https://docs.uavmatrix.com/it/fleet-manager/set-up-organization/) in cui sei Owner o Admin.

> **Regole per il volo oltre la linea di vista**
>
> Il volo oltre la linea di vista (BVLOS) richiede un'autorizzazione nella maggior parte dei paesi. UAVcast-Pro ti fornisce il collegamento; l'approvazione operativa, la valutazione del rischio e i failsafe sono di tua responsabilità.

## Come si integra il tutto

```text
Controllore di volo ──USB/UART── UAVcast-Pro ──4G──► internet ──► laptop
                                    │                               │
                                    └──── VPN Fleet Manager ────────┘
                  telemetria e video sulle porte del stream binding
```

Il drone invia MAVLink e video H.264 all'indirizzo VPN del tuo laptop. La VPN rende il laptop raggiungibile via 4G come se entrambi fossero sulla stessa rete locale.

> **Preferisci usare una tua VPN?**
>
> Puoi usare la tua rete ZeroTier o il tuo tailnet Tailscale invece di Fleet Manager: vedi [VPN](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/vpn/) e [Accesso remoto con Tailscale](https://docs.uavmatrix.com/it/guides/remote-access-tailscale/). I passaggi 1, 2 e da 7 a 9 qui sotto restano invariati.

## 1. Collega il controllore di volo

1. Collega il controllore di volo al computer di bordo tramite USB, oppure collega una porta TELEM (TX→RX, RX→TX, GND→GND) e attiva MAVLink su quella porta (`SERIALx_PROTOCOL = 2` su ArduPilot, `MAV_x_CONFIG` su PX4).
2. In UAVcast-Pro, apri **Controllore di Volo → Connessione**. Scegli **USB** oppure **UART / Serial** sotto **Tipo di connessione**, e lascia **Porta** e **Baud rate** su **Automatico**.
3. Attendi lo stato **Connesso** e un velivolo in **Velivolo**. Se resta su **No heartbeat**, consulta [Nessun heartbeat MAVLink](https://docs.uavmatrix.com/it/troubleshooting/no-mavlink-heartbeat/).

## 2. Configura il modem

1. Collega il modem e apri **Modem**.
2. Imposta **Attivare il Modem Cellulare?** su **Sì** e scegli il **Tipo di modem**: **HiLink** per i modem che funzionano come adattatore di rete USB (per esempio Huawei E3372h), **Tradizionale (PPP)** per gli altri.
3. Per un modem tradizionale, lascia vuoto **Nome Punto di Accesso (Opzionale)**. UAVcast-Pro trova l'APN per la tua SIM e lo ricorda.
4. In **Informazioni Modem**, attendi un operatore e un indirizzo IPv4.
5. Vai a **Reti** e scegli **Priorità Modem (Modalità Esterna)**, così il traffico passa dal modem anche quando c'è una rete Wi-Fi nelle vicinanze.

Dettagli: [Modem cellulare](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/cellular-modem/). Se il modem si connette ma non carica nulla: [Modem connesso, ma nessun accesso a internet](https://docs.uavmatrix.com/it/troubleshooting/modem-no-internet/).

## 3. Attiva la VPN in Fleet Manager

In Fleet Manager, apri **Network**. Se compare **Enable VPN Network**, selezionalo. Questo crea la rete privata della tua organizzazione. Vedi [Network e VPN](https://docs.uavmatrix.com/it/fleet-manager/network/).

## 4. Accoppia il drone e mettilo sulla VPN

1. In UAVcast-Pro, vai su **Gestione → Fleet Management** e seleziona **Connect to Fleet Manager**. Annota il codice a 8 cifre.
2. In Fleet Manager, vai su **Fleet → Pair Device**, inserisci il codice e conferma il dispositivo.
3. Nel passaggio **VPN Connection**, lascia spuntato **Enable VPN for this UAV** e seleziona **Complete Pairing**.
4. Il drone compare in **Network → Connected Devices** con il tipo **UAV** e un indirizzo `100.x.y.z`.

Procedura completa: [Aggiungi il tuo primo drone a Fleet Manager](https://docs.uavmatrix.com/it/fleet-manager/pair-uav/).

## 5. Collega il laptop alla VPN

1. Installa Tailscale sul laptop. Non ti serve un account Tailscale: Fleet Manager gestisce un proprio server VPN.
2. In Fleet Manager, in **Network → Devices**, copia il **GCS Connection Command** sotto **Connect a Device** ed eseguilo sul laptop come amministratore (`sudo` su macOS e Linux).
3. Il laptop compare in **Connected Devices**. Nella colonna **Type** seleziona **Configure**, scegli **Ground Control Station (GCS)** e seleziona **Complete Setup**.
4. Test: `ping <IP VPN del drone>` dal laptop. Ora puoi aprire l'interfaccia web del drone all'indirizzo `http://<IP VPN del drone>/`.

Dettagli e screenshot: [Collega una stazione di terra](https://docs.uavmatrix.com/it/fleet-manager/connect-gcs/).

## 6. Invia telemetria e video al laptop

1. In Fleet Manager, vai su **Network → Stream Bindings** e seleziona **Add Binding**.
2. Scegli il drone e il laptop, poi seleziona **Create Binding**. Fleet Manager invia la destinazione al drone; compare nella pagina **Ground Control Stations** del drone con un'icona a nuvola.
3. Leggi le porte video e telemetria del binding nella colonna **Ports**. Per il primo drone su un laptop sono quelle predefinite, `5600` e `14550`.
4. Sul laptop, consenti l'UDP in entrata su quelle porte nel firewall (comandi in [Nessun video, controllo 3](https://docs.uavmatrix.com/it/troubleshooting/no-video-in-gcs/#check-3)).

## 7. Avvia la telecamera

1. Apri **Telecamera → Impostazioni telecamera**, imposta **Attivare la Telecamera?** su **Sì** e scegli la telecamera in **Seleziona Telecamera**.
2. Per LTE, parti con **Risoluzione** 1280×720, **Seleziona FPS** 15–20 e **Bitrate:** intorno a 1000–1500 kbps.
3. Le impostazioni si salvano man mano che le modifichi. Premi **Avvia** se la telecamera non è ancora in funzione.

## 8. Apri la stazione di terra

- **QGroundControl** si connette da solo alla UDP 14550. Per il video, imposta **Source** su **UDP h.264 Video Stream** sulla porta video del binding nelle impostazioni video.
- **Mission Planner**: scegli **UDP**, premi **Connect** e inserisci la porta di telemetria del binding. Per il video, imposta la sorgente GStreamer come descritto nella pagina [Mission Planner](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/mission-planner/).

## 9. Prova su 4G prima di volare

1. Disattiva il Wi-Fi del computer di bordo, oppure allontana il drone da esso, in modo che l'unico percorso sia il modem.
2. Controlla la dashboard: **Cellular** connesso, **VPN** connessa, **Ground station** in *Sending*, **Video** in esecuzione.
3. Osserva il collegamento per 10 minuti a terra, idealmente nel punto di decollo. Cerca blocchi del video e interruzioni della telemetria.
4. In **Controllore di Volo → Connessione**, controlla **Informazioni Failsafe GCS**. Se mostra **Warning - Failsafe Disabled**, attiva il failsafe GCS sul controllore di volo (ArduPilot: `FS_GCS_ENABL` su Plane, `FS_GCS_ENABLE` su Copter; PX4: `NAV_DLL_ACT`) e scegli la sua azione, così il drone agisce da solo quando il collegamento cade.

> **Registra ogni volo**
>
> Attiva **Registra automaticamente quando armato** sotto **Telecamera → Registrazioni → Impostazioni**. Ottieni il video e un log di telemetria di ogni volo per una revisione successiva: [Registra i voli e rivedili](https://docs.uavmatrix.com/it/guides/recording-flight-review/).

> **UAVnet viene dismesso**
>
> UAVnet, il controller ZeroTier ospitato di UAVmatrix, è in via di dismissione a favore di Fleet Manager. Se oggi i tuoi droni usano una rete UAVnet, spostali sulla VPN di Fleet Manager come descritto sopra.

## Passaggi successivi

- [Trasmetti a più stazioni di terra](https://docs.uavmatrix.com/it/guides/multiple-ground-stations/)
- [Aggiungi correzioni RTK da un caster NTRIP](https://docs.uavmatrix.com/it/guides/rtk-ntrip-caster/)
- Gestisci più droni? [Integra una flotta con Fleet Manager](https://docs.uavmatrix.com/it/guides/fleet-onboarding/)

Source: https://docs.uavmatrix.com/it/guides/bvlos-4g/
