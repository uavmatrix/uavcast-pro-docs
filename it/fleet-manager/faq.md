# FAQ di Fleet Manager

> Risposte alle domande più comuni su Fleet Manager: limiti dei droni, licenze, VPN, stazioni di controllo a terra, ArduPilot e PX4, conservazione dei dati e spostamento dei droni.

### Di cosa ho bisogno per usare Fleet Manager?

Un account UAVmatrix e droni con UAVcast-Pro e una licenza attivata. La licenza di ogni drone deve essere di proprietà di un membro della tua organizzazione. Vedi [Licenze e posti](https://docs.uavmatrix.com/it/fleet-manager/licenses/).

### Fleet Manager ha costi extra?

No. Fleet Manager è incluso nella tua licenza UAVcast-Pro. Non c'è un abbonamento separato e i membri del team sono gratuiti.

### Quanti droni posso gestire?

Fleet Manager stesso non impone alcun limite. Ogni drone richiede una propria attivazione di licenza UAVcast-Pro, quindi il numero di droni dipende dalle licenze e dagli slot dispositivo che possiedi.

### I membri del team hanno bisogno di una licenza?

No. Puoi invitare tutti gli Admin e i Viewer che ti servono. Vedi [Invita il tuo team](https://docs.uavmatrix.com/it/fleet-manager/team/).

### Quali ruoli esistono?

**Owner**, **Admin** e **Viewer**. Non esiste un ruolo "Member". Vedi [Ruoli e permessi](https://docs.uavmatrix.com/it/fleet-manager/team/roles-and-permissions/).

### Da dove arriva il Pairing Code?

Dal drone. In UAVcast-Pro apri **Fleet Management → Connect to Fleet Manager**. Viene mostrato un codice a 8 cifre valido per 5 minuti. Lo inserisci in Fleet Manager in **Fleet → Pair Device**. Vedi [Aggiungi il tuo primo drone](https://docs.uavmatrix.com/it/fleet-manager/pair-uav/).

### Fleet Manager funziona su 4G/LTE?

Sì. Il drone si connette verso l'esterno a Fleet Manager sulla porta TCP 8883, quindi funziona anche dietro un NAT dell'operatore senza un IP pubblico. L'operatore non deve bloccare la porta 8883.

### Mi serve la VPN?

Solo per inviare video e telemetria dai droni alle stazioni di controllo a terra tramite Fleet Manager. La mappa, la telemetria, i comandi, le missioni, il terminale e l'accesso remoto a UAVcast-Pro funzionano tutti senza di essa. Vedi [Rete e VPN](https://docs.uavmatrix.com/it/fleet-manager/network/).

### Una stazione di controllo a terra può ricevere più droni?

Sì. Ogni [associazione di flusso](https://docs.uavmatrix.com/it/fleet-manager/network/stream-bindings/) ha un proprio blocco di porte su quella stazione di controllo a terra, con spazio per una seconda telecamera e per l'audio. Il primo drone usa 5600 / 14550.

### Posso continuare a usare la mia rete ZeroTier o Tailscale?

Sì, se non ti servono le associazioni di flusso di Fleet Manager. Puoi rifiutare la VPN durante l'accoppiamento. Se la accetti, un drone già su una rete Tailscale viene spostato sulla rete della tua organizzazione. Un drone su ZeroTier mantiene la propria rete ZeroTier e si unisce alla rete dell'organizzazione accanto ad essa: la rete ZeroTier viene abbandonata solo quando disaccoppi il drone.

### Funziona con ArduPilot e PX4?

Fleet Manager funziona con qualsiasi controllore di volo MAVLink con cui UAVcast-Pro comunica, ArduPilot o PX4: mappa live, telemetria, stato, terminale e associazioni di flusso sono gli stessi. I controlli della modalità di volo usano le modalità di ArduPilot per Copter, Plane, Rover e Sub, e l'elenco dei comandi di missione segue la nomenclatura di ArduPilot. Quindi su PX4 cambia le modalità e pianifica le missioni dalla stazione di controllo a terra.

### Posso pilotare un drone solo da Fleet Manager?

Fleet Manager può cambiare modalità, armare, avviare, mettere in pausa e fermare le missioni. Non è pensato per il controllo manuale con le levette. Tieni sempre un pilota con una stazione di controllo a terra o un trasmettitore RC in controllo e rispetta le normative locali.

### Per quanto tempo viene conservata la cronologia dei voli?

Fino a 1 anno per impostazione predefinita. Owner e Admin possono ridurlo a 7, 14, 30, 60 o 90 giorni oppure a 6 mesi. Vedi [Cronologia dei voli](https://docs.uavmatrix.com/it/fleet-manager/map/flight-history/#how-long-history-is-kept).

### Posso esportare i log di volo?

Non al momento. Fleet Manager riproduce i voli sulla mappa, ma non esporta file né memorizza `.tlog`, DataFlash o video.

### Fleet Manager invia avvisi via email?

Non ancora. Lo stato è mostrato in tempo reale su mappa, elenco della flotta e pagine UAV. Vedi [Indicatori di stato e notifiche](https://docs.uavmatrix.com/it/fleet-manager/alerts-and-status/).

### Cosa succede quando un drone perde la connessione?

Dopo 20 secondi senza dati viene mostrato come **OFFLINE** e si riconnette da solo quando il collegamento torna disponibile. I failsafe del controllore di volo decidono cosa fa il velivolo: Fleet Manager non invia alcun comando in caso di perdita di connessione.

### Come sposto un drone in un'altra organizzazione?

Rimuovilo dall'organizzazione attuale (questo elimina la sua cronologia lì), poi accoppialo alla nuova. Vedi [Riaccoppia, rimuovi o trasferisci un drone](https://docs.uavmatrix.com/it/fleet-manager/fleet/remove-or-transfer/).

### Ho acquistato licenze con un'altra email. Cosa faccio?

Invita quell'email nell'organizzazione oppure chiedi al supporto di aggiungerla come email di licenza extra sul tuo account. Vedi [Licenze acquistate con un'altra email](https://docs.uavmatrix.com/it/fleet-manager/licenses/#licenses-bought-with-another-email).

### C'è un'app mobile?

C'è una [vista Lite](https://docs.uavmatrix.com/it/fleet-manager/lite-view/) ottimizzata per il telefono, nel browser.

### I miei dati sono al sicuro?

Ogni drone ha il proprio certificato client TLS, ogni organizzazione ha una propria VPN cifrata e i ruoli sono applicati lato server. Vedi [Sicurezza e privacy](https://docs.uavmatrix.com/it/fleet-manager/security/).

Source: https://docs.uavmatrix.com/it/fleet-manager/faq/
