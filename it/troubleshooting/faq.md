# Domande frequenti

> Risposte brevi su hardware di UAVcast-Pro, modem LTE, stazioni di terra, porte, uso offline, licenze, aggiornamenti, registrazione e accoppiamento con Fleet Manager.

## Hardware e configurazione

### Mi serve un modem LTE?

No. UAVcast-Pro funziona con qualsiasi connessione IP: 4G/LTE, Wi-Fi o Ethernet. Il modem serve per volare oltre la portata del Wi-Fi. Molti operatori fanno i test sul Wi-Fi e passano al modem prima del volo con **Reti → Priorità Rete → Priorità Modem (Modalità Esterna)**.

### Quali computer possono eseguire UAVcast-Pro?

Qualsiasi scheda o PC Linux a 64 bit su arm64 o amd64 con Raspberry Pi OS, Debian o Ubuntu: Raspberry Pi Zero 2 W, 3, 4 e 5, NVIDIA Jetson, Orange Pi e mini PC x86. Un Raspberry Pi 4 o 5 è la scelta comoda per il video. Vedi [Hardware supportato](https://docs.uavmatrix.com/it/reference/supported-hardware/).

### Quali controllori di volo sono supportati?

Qualsiasi controllore di volo che parli MAVLink via USB o porta TELEM: ArduPilot (Copter, Plane, Rover, VTOL e gli altri tipi di veicolo) e PX4, su schede delle famiglie Pixhawk e Cube, Matek e simili. Telemetria, video e instradamento verso le stazioni di terra funzionano con tutti. I pulsanti delle modalità di volo nella Mappa di Volo e in Fleet Manager usano i nomi delle modalità di ArduPilot; con PX4, cambia le modalità dalla stazione di terra.

### Posso collegarmi tramite la porta USB del controllore di volo?

Sì, ed è l'opzione più semplice: collegalo e lascia **Porta** su **Automatico**. Usa un cavo corto che trasporti dati. Vedi [Nessun heartbeat MAVLink](https://docs.uavmatrix.com/it/troubleshooting/no-mavlink-heartbeat/) se non viene trovato.

## Stazioni di terra e rete

### Quali stazioni di terra funzionano?

Qualsiasi software che accetta MAVLink via UDP, incluso QGroundControl, Mission Planner e MAVProxy. Il video è H.264 su RTP/UDP, che QGroundControl e Mission Planner riproducono direttamente. Anche GStreamer e VLC funzionano: vedi [Stazioni di terra e video](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/).

### Più stazioni di terra possono guardare contemporaneamente?

Sì. Aggiungi una destinazione per computer in **Stazioni di Controllo a Terra**, ciascuna con i propri interruttori per video e telemetria. Usa **Read Only** per le stazioni che devono solo osservare. Vedi [Trasmettere a più stazioni di terra](https://docs.uavmatrix.com/it/guides/multiple-ground-stations/).

### Quali porte usa UAVcast-Pro?

Per impostazione predefinita la telemetria va su UDP **14550** e il video su UDP **5600** su ogni stazione di terra; una seconda telecamera usa la porta video + 1, e l'audio la porta video + 2. L'interfaccia web è sulla porta **80**. L'elenco completo è in [Porte e protocolli](https://docs.uavmatrix.com/it/reference/ports-and-protocols/).

### Serve il port forwarding sul router?

No. Su 4G, metti il drone e la stazione di terra sulla stessa VPN: la VPN di Fleet Manager (inclusa nella licenza), oppure la tua rete Tailscale o ZeroTier. Il drone invia telemetria e video all'indirizzo VPN della stazione di terra. Vedi [Volo oltre la portata visiva via 4G](https://docs.uavmatrix.com/it/guides/bvlos-4g/).

### Posso ancora collegarmi tramite TCP 5760?

No. Dalla v6.5.0 la porta TCP 5760 è chiusa, così solo le stazioni di terra che aggiungi ricevono dati. Aggiungi il tuo computer come destinazione e usa UDP.

### Funziona senza internet?

Sì. Il collegamento con il controllore di volo, la telemetria e il video partono all'accensione senza attendere internet, quindi funzionano una rete Wi-Fi locale o un collegamento radio. L'attivazione della licenza richiede internet una sola volta. Dopo, un controllo di licenza fallito per una connessione persa non disattiva il dispositivo.

## Licenza e account

> Per attivare il drone ti serve una licenza UAVcast-Pro. Acquistala nello store UAVmatrix.
>
> [Acquista UAVcast-Pro](https://uavmatrix.com/it/checkout) · [Vedi piani e prezzi](https://uavmatrix.com/it/products)

### La mia licenza non si attiva. Cosa faccio?

Vedi [La licenza non si attiva](https://docs.uavmatrix.com/it/troubleshooting/license-activation-failed/). Le cause più comuni sono una chiave digitata male, nessuno slot dispositivo libero, oppure nessuna connessione internet sul dispositivo.

### Cosa succede quando la mia licenza scade?

UAVcast-Pro viene bloccato: l'interfaccia web apre solo **Applicazione**, e telemetria, video e gli altri servizi si fermano finché non rinnovi. Rinnova nello store prima della data di scadenza, poi convalida la chiave sul drone. Vedi [Quando una licenza scade](https://docs.uavmatrix.com/it/get-started/license-activation/#when-a-license-expires).

### Fleet Manager è incluso nella mia licenza?

Sì. Fleet Manager, VPN inclusa, è incluso nella tua licenza di UAVcast-Pro senza costi aggiuntivi.

### Ho sostituito la scheda SD. Serve una nuova licenza?

No, ma il dispositivo viene considerato nuovo e occupa uno slot. Annulla la registrazione della vecchia voce in **Applicazione → Gestore Licenze → Dispositivi Attivati**.

### Fleet Manager è un prodotto separato?

Fleet Manager è la dashboard web di UAVmatrix per gestire molti droni su [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/). È incluso nella tua licenza di UAVcast-Pro. Accedi con il tuo account uavmatrix.com, e ogni drone che accoppi richiede una licenza UAVcast-Pro attiva di proprietà di un membro della tua organizzazione. Vedi [Fleet Manager](https://docs.uavmatrix.com/it/fleet-manager/).

### Come accoppio un drone a Fleet Manager?

In UAVcast-Pro, apri **Fleet Management** e premi **Connect to Fleet Manager**. Inserisci il codice a 8 cifre in Fleet Manager, in **Fleet → Pair Device**, entro 5 minuti. Vedi [Accoppia il tuo primo UAV](https://docs.uavmatrix.com/it/fleet-manager/pair-uav/) e, se non funziona, [Codice di accoppiamento non valido o scaduto](https://docs.uavmatrix.com/it/troubleshooting/pairing-code-invalid/).

## Aggiornamenti e dati

### Come aggiorno UAVcast-Pro?

Vai su **Applicazione → Aggiorna Applicazione**, scegli una versione in **Seleziona versione da aggiornare** e premi **Aggiorna Ora**. Se la scheda mostra **Riavvio in Sospeso**, premi **Riavvia Ora**. Puoi anche eseguire di nuovo l'installer.

### Posso importare le impostazioni dalla v4 o v5?

No. La v6 usa un nuovo database, quindi va configurata di nuovo dopo un'installazione pulita. All'interno della v6, usa **Applicazione → Database → Backup Database** e **Ripristina Database** per spostare le impostazioni tra installazioni.

### UAVcast-Pro può registrare video?

Sì, dalla v6.5.1. Registra la telecamera 1 e 2 dalla mappa di volo, oppure automaticamente quando il drone è armato, insieme a un log della telemetria. Vedi [Registra i voli e rivedili](https://docs.uavmatrix.com/it/guides/recording-flight-review/).

### Dove conserva UAVcast-Pro i suoi file?

In `/opt/uavcast-pro`: il database `uavcast.db`, `logs/`, `recordings/` e `missions/`. Vedi [Servizi e file](https://docs.uavmatrix.com/it/reference/services-and-files/).

### Ho dimenticato la password dell'admin.

Nell'interfaccia web non esiste un reset della password. Un altro admin può eliminare il tuo utente da **Users** e crearlo di nuovo. Se eri l'unico admin, il recupero non è self-service: contatta **[support@uavmatrix.com](mailto:support@uavmatrix.com)** con i dettagli elencati in [Password dell'admin dimenticata](https://docs.uavmatrix.com/it/uavcast-pro/users/#forgot-the-admin-password).

### Dove trovo aiuto?

Raccogli i log come descritto in [Raccogli i log per il supporto](https://docs.uavmatrix.com/it/troubleshooting/collect-logs/) e scrivi a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, oppure chiedi sul [Discord di UAVmatrix](https://discord.gg/xwqMTXh).

Source: https://docs.uavmatrix.com/it/troubleshooting/faq/
