# Associazioni di flusso

> Instrada video e MAVLink da qualsiasi drone a qualsiasi stazione di terra tramite VPN, come Fleet Manager assegna le porte UDP e la configurazione di QGC e Mission Planner.

Un'associazione di flusso (stream binding) indica a un drone di inviare video e telemetria a una stazione di terra tramite la VPN della tua organizzazione. Un drone può trasmettere a più stazioni di terra, e una stazione di terra può ricevere più droni. Fleet Manager sceglie le porte in modo che i flussi non entrino mai in conflitto.

## Prima di iniziare

- [VPN attiva](https://docs.uavmatrix.com/it/fleet-manager/network/#enable-vpn) e drone sulla VPN (tipo **UAV** in **Connected Devices**).
- La stazione di terra [connessa e configurata come **GCS**](https://docs.uavmatrix.com/it/fleet-manager/connect-gcs/).
- Ruolo **Owner** o **Admin**.
- Il drone **online**. Fleet Manager invia subito le nuove destinazioni a UAVcast-Pro e attende la sua conferma.

## Aggiungi un'associazione

1. Vai su **Network → Stream Bindings** e seleziona **Add Binding**.
2. In **Add Stream Binding**, scegli il **Drone** e la **Ground Station**.
3. Seleziona **Create Binding**.

![Finestra di dialogo Add Stream Binding con selettori di drone e stazione di terra e una nota sulle porte automatiche](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/network--add-binding.webp)

*Finestra Add Stream Binding con un drone e una stazione di terra selezionati, e la nota che le porte vengono assegnate automaticamente.*

L'associazione compare nella tabella con **Video** e **Telemetry** attivati e le sue **Ports** (video / telemetria). UAVcast-Pro inizia a inviare entro pochi secondi.

Se il drone non conferma entro 15 secondi, Fleet Manager annulla l'associazione con **Failed to send configuration to drone - it may be offline**. Verifica che il drone sia online e riprova.

## Come vengono assegnate le porte

Le porte sono contate **per stazione di terra**. Ogni associazione ottiene il proprio blocco di porte UDP su quella stazione di terra, così i droni non si sovrappongono mai:

- una porta **video** per la telecamera 1, seguita dallo spazio per la **telecamera 2** (doppio flusso) e per l'**audio**, che UAVcast-Pro invia alle porte successive a quella video;
- una porta **telemetria** per MAVLink.

La prima associazione su una stazione di terra usa i valori predefiniti, video **5600** e telemetria **14550**. Le associazioni successive ottengono il blocco libero successivo.

Alcune conseguenze da sapere:

- **Ogni stazione di terra parte dai valori predefiniti.** Lo stesso drone può avere porte diverse su due laptop, a seconda di cos'altro riceve ciascun laptop.
- **Le porte liberate vengono riutilizzate.** Rimuovere un'associazione libera il suo blocco per la prossima nuova associazione verso quel laptop.
- **Le porte non seguono il drone.** Rimuovere e riaggiungere un'associazione può assegnare porte diverse. Leggi sempre la colonna **Ports** prima di configurare il software della stazione di terra.
- Le porte sono assegnate da Fleet Manager e non possono essere modificate nell'applicazione.
- Una **Porta Video (Telecamera 2)** impostata a mano sul drone viene mantenuta quando Fleet Manager aggiorna le sue destinazioni solo a partire da UAVcast-Pro 6.5.3. Nelle versioni precedenti l'aggiornamento successivo la cancella.

## Configura il software della stazione di terra

Usa le porte indicate nella colonna **Ports** dell'associazione. Il flusso arriva dall'indirizzo VPN del drone.

**QGroundControl**

- **Telemetria:** QGroundControl ascolta su UDP 14550 per impostazione predefinita, quindi il primo drone si collega da solo. Per altri droni, apri **Application Settings → Comm Links**, aggiungi un collegamento di tipo **UDP** con la porta telemetria dell'associazione e connettilo.
- **Video:** in **Application Settings → Video** (sotto **General** nelle versioni precedenti), imposta **Source** su **UDP h.264 Video Stream** e la porta UDP sulla porta video dell'associazione (**UDP URL** `0.0.0.0:<port>` nelle versioni attuali). QGroundControl mostra un video alla volta; per guardare più droni, avvia una seconda istanza o usa un lettore video per gli altri.

**Mission Planner**

- **Telemetria:** nel menu a discesa della connessione in alto a destra, scegli **UDP**, seleziona **Connect** e inserisci la porta telemetria dell'associazione. Per più droni, connetti una volta per porta; Mission Planner elenca ogni veicolo per system ID.
- **Video:** fai clic destro sull'HUD, scegli **Video → Set GStreamer Source** e inserisci una pipeline che ascolti sulla porta video dell'associazione. Vedi [Mission Planner](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/mission-planner/) per la pipeline esatta.

> **Assegna a ogni drone il proprio ID di sistema MAVLink**
>
> Quando una stazione di terra riceve più droni, ogni controllore di volo ha bisogno di un `SYSID_THISMAV` (ArduPilot) o `MAV_SYS_ID` (PX4) univoco. Altrimenti la stazione di terra li confonde.

Per approfondire la gestione di molti veicoli da una stessa stazione: [Trasmetti a più stazioni di terra](https://docs.uavmatrix.com/it/guides/multiple-ground-stations/).

## Metti in pausa o rimuovi un'associazione

- Disattiva l'interruttore **Video** o **Telemetry** nella tabella per interrompere quel flusso senza perdere l'associazione né le sue porte. Fallo mentre il drone è online, così riceve la modifica.
- Seleziona l'icona del cestino per rimuovere l'associazione. Le porte si liberano per la prossima associazione verso quella stazione di terra.

Usa la casella di ricerca e il filtro **Video Status** (**All Video**, **Video On**, **Video Off**) per trovare le associazioni in una flotta grande.

![Tabella Stream Bindings con elenco di droni, stazioni di terra, interruttori Video e Telemetry e porte](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/network--stream-bindings.webp)

*Scheda Stream Bindings: ogni associazione elenca il suo drone, la stazione di terra, gli interruttori Video e Telemetry e le sue porte.*

## Associazioni nella pagina UAV

La [pagina UAV](https://docs.uavmatrix.com/it/fleet-manager/fleet/uav-details/#connected-ground-stations) di ogni drone elenca le sue stazioni di terra sotto **Connected Ground Stations**, con gli stessi interruttori e **Pause** / **Resume**. **Add GCS** lì crea un'associazione allo stesso modo di **Add Binding** qui, con le porte libere successive su quella stazione di terra.

## Nessun flusso in arrivo?

Vedi [Nessuna telemetria nella stazione di terra](https://docs.uavmatrix.com/it/troubleshooting/no-telemetry-in-gcs/) e [Nessun video nella stazione di terra](https://docs.uavmatrix.com/it/troubleshooting/no-video-in-gcs/). Le cause più comuni sono un firewall sul laptop che blocca l'UDP in ingresso, il software della stazione di terra in ascolto sulla porta sbagliata, oppure il flusso disattivato nell'associazione.

Source: https://docs.uavmatrix.com/it/fleet-manager/network/stream-bindings/
