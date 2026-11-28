# Dettagli UAV

> La pagina di un drone in Fleet Manager mostra telemetria live e stato del computer di bordo, un terminale SSH e il log MAVLink, con riavvio o rimozione.

Ogni drone ha una propria pagina. Aprila con **Details** sulla scheda della [Flotta](https://docs.uavmatrix.com/it/fleet-manager/fleet/), dalla dashboard oppure con **View UAV** alla fine dell'accoppiamento.

L'intestazione mostra il nome, un badge di stato live, **Re-pair required** se necessario, l'organizzazione, l'**ID** del dispositivo e **Last seen**. Owner e Admin ottengono anche **Rename** e **Remove**.

La pagina ha quattro schede: **Overview**, **Terminal**, **Logs** e **Actions**.

## Panoramica

Dati in tempo reale, inviati al browser man mano che arrivano.

![Scheda Overview dei dettagli UAV con la scheda UAVcast Application e la scheda MAVLink / Flight Controller](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/drone-detail.webp)

*Scheda Overview di un VTOL armato in AUTO: scheda UAVcast Application con CPU Temp, CPU, Memory e Disk, e scheda MAVLink / Flight Controller con batteria, GPS, altitudine e Heading.*

**UAVcast Application** descrive il computer di bordo: stato della connessione (**Connected**, **Waiting for data...** o **Connecting...**), **Hostname**, **Uptime**, utilizzo di **CPU Temp**, **CPU**, **Memory** e **Disk**, i servizi di UAVcast-Pro e il loro stato, e gli indirizzi di rete del drone (LAN e VPN). Contiene anche i pulsanti per [aprire UAVcast-Pro da remoto](https://docs.uavmatrix.com/it/fleet-manager/fleet/remote-uavcast/): **Open via Proxy** e, quando il drone è sulla VPN, **Open via VPN**.

**MAVLink / Flight Controller** mostra ciò che riporta il controllore di volo: **ARMED** o **DISARMED**, i flag **FAILSAFE** e **GCS FAILSAFE**, **Battery**, **GPS** (satelliti e fix), **Altitude** e **Heading**.

> **Controlla la CPU Temp nelle giornate calde**
>
> Un Raspberry Pi che si surriscalda rallenta, e il video è la prima cosa a risentirne. Se **CPU Temp** sale durante un volo, vedi [Sottotensione e throttling](https://docs.uavmatrix.com/it/troubleshooting/undervoltage-and-throttling/).

### Stazioni di controllo a terra collegate

Sotto le schede, **Connected Ground Stations** elenca le stazioni di controllo a terra che ricevono i flussi di questo drone, con gli interruttori **Video** e **Telemetry** e i pulsanti **Pause** / **Resume**. **Add GCS** (Owner e Admin) collega un'altra stazione di controllo a terra a questo drone. Crea la stessa associazione di flusso di **Network → Stream Bindings**, con le porte libere successive su quella stazione, e invia la nuova destinazione al drone. Vedi [Associazioni dei flussi](https://docs.uavmatrix.com/it/fleet-manager/network/stream-bindings/).

## Terminale

Una sessione SSH nel browser verso il computer di bordo, sulla connessione cifrata di Fleet Manager. Non servono port forwarding né VPN. Solo Owner e Admin. Il drone deve essere online.

Seleziona **Connect** per aprire una shell. I pulsanti dei comandi rapidi eseguono per te i controlli più comuni: `df -h`, `free -h`, `top -bn1`, `ip a`, `ip r`, `uptime`, `dmesg` e `ps aux`. **Disconnect** chiude la sessione.

![Scheda Terminal con una sessione SSH che mostra l'output di df -h e i pulsanti dei comandi rapidi](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/drone-detail--terminal.webp)

*Scheda Terminal collegata a un drone sul campo, dopo aver eseguito il comando rapido df -h.*

> **Questa è una shell live sul velivolo**
>
> Il terminale è una vera shell sul computer di bordo. Riavviare servizi o la rete mentre il drone è in volo può interrompere telemetria e video. Usalo a terra, a meno che tu non sappia cosa fa un comando.

## Log

Una vista live dei messaggi di telemetria e heartbeat che il drone invia a Fleet Manager, con i filtri **Telemetry** e **Heartbeat**, **Auto-scroll**, **Pause** e cancellazione. **Download logs** salva ciò che è sullo schermo in un file di testo (`mavlink-log-<id>-<time>.txt`), utile da inviare via email al supporto insieme al numero del ticket (i ticket accettano solo un'immagine).

Si tratta di un log live, non di un archivio dei log di volo. Fleet Manager conserva la telemetria per la [cronologia dei voli](https://docs.uavmatrix.com/it/fleet-manager/map/flight-history/), ma non memorizza né esporta file DataFlash o `.tlog`. Questi restano sul controllore di volo e nel software della stazione di controllo a terra.

![Scheda Logs con un elenco scorrevole di voci di telemetria e heartbeat e gli interruttori Telemetry, Heartbeat e Auto-scroll](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/drone-detail--logs.webp)

*Scheda Logs che trasmette voci TELEMETRY e HEARTBEAT, con Telemetry, Heartbeat e Auto-scroll attivi.*

## Azioni

**System Actions** contiene **Reboot** (Riavvia il computer di bordo) e **Shutdown** (Spegni il computer di bordo). Entrambe richiedono che il drone sia online. Per confermare, digiti il nome dell'azione.

Queste azioni agiscono solo sul computer di bordo, non sul controllore di volo. Uno spegnimento non si può annullare da remoto: qualcuno deve spegnere e riaccendere fisicamente il drone.

![Scheda Actions con la scheda System Actions e i pulsanti Reboot e Shutdown](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/drone-detail--actions.webp)

*Scheda Actions con la finestra Confirm Reboot aperta, che chiede di digitare reboot per confermare.*

## Rinomina

Seleziona **Rename**, inserisci il nuovo nome in **Edit UAV** e salva. Il nome viene sincronizzato con UAVcast-Pro quando il drone è online.

## Rimuovi

**Remove** elimina il drone dall'organizzazione e lo disaccoppia. Vedi [Riaccoppia, rimuovi o trasferisci un drone](https://docs.uavmatrix.com/it/fleet-manager/fleet/remove-or-transfer/).

Source: https://docs.uavmatrix.com/it/fleet-manager/fleet/uav-details/
