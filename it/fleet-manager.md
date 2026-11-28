# Fleet Manager

> UAVmatrix Fleet Manager traccia ogni drone UAVcast-Pro su un'unica mappa in tempo reale, con controllo remoto, missioni, streaming VPN verso le stazioni di terra e ruoli del team.

UAVmatrix Fleet Manager è un'applicazione web disponibile su [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) per gestire molti droni da un unico punto. Ogni drone che esegue UAVcast-Pro può essere associato alla tua organizzazione. Dopodiché puoi vederlo su una mappa in tempo reale, aprire il suo terminale, inviargli comandi, caricare missioni e instradare il suo video e la sua telemetria verso le stazioni di terra utilizzate dai tuoi piloti.

![Dashboard di Fleet Manager con schede statistiche, elenco dello stato degli UAV e attività recenti](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/dashboard.webp)

*Dashboard: schede statistiche, l'elenco UAV Status e Recent Activity di diversi membri del team.*

## Cosa puoi fare con Fleet Manager

[Aggiungi il tuo primo droneAccoppia un drone UAVcast-Pro con un codice a 8 cifre in circa due minuti.](https://docs.uavmatrix.com/it/fleet-manager/pair-uav/)[Traccia la flotta in tempo realeOgni drone su un'unica mappa, con anelli di stato, una scia di 5 minuti e modalità di inseguimento.](https://docs.uavmatrix.com/it/fleet-manager/map/)[Controlla i droni da remotoModalità di volo, armamento e disarmo, missioni e calibrazione pre-volo dal browser.](https://docs.uavmatrix.com/it/fleet-manager/fleet/remote-control/)[Trasmetti alle stazioni di terraInvia video e MAVLink da molti droni a QGroundControl o Mission Planner tramite VPN.](https://docs.uavmatrix.com/it/fleet-manager/network/stream-bindings/)[Invita il tuo teamRuoli Owner, Admin e Viewer per ogni organizzazione.](https://docs.uavmatrix.com/it/fleet-manager/team/)[Pianifica missioniDisegna waypoint, salva le missioni per l'organizzazione e caricale su qualsiasi drone.](https://docs.uavmatrix.com/it/fleet-manager/missions/)

## Come funziona nel complesso

Fleet Manager non comunica mai direttamente con il controllore di volo. Se ne occupa UAVcast-Pro sul computer di bordo del drone, che mantiene un'unica connessione cifrata verso Fleet Manager:

1. **Accoppiamento.** UAVcast-Pro chiede a Fleet Manager un Pairing Code. Tu inserisci il codice in Fleet Manager. Fleet Manager fornisce poi al drone il proprio certificato client.
2. **Canale di controllo.** Il drone si connette al broker MQTT di Fleet Manager tramite TLS sulla porta **8883**, autenticandosi con quel certificato. Telemetria, heartbeat, comandi, sessioni di terminale e accesso remoto all'interfaccia web di UAVcast-Pro passano tutti da questa connessione. Funziona anche attraverso NAT e reti cellulari, perché il drone si connette sempre verso l'esterno.
3. **Canale dati (facoltativo).** Video e MAVLink verso una stazione di terra viaggiano peer-to-peer sulla rete privata VPN della tua organizzazione, una rete WireGuard gestita da Fleet Manager. Senza VPN, Fleet Manager continua a mostrare e controllare il drone, ma non instrada i flussi.

## Concetti

| Termine | Cosa significa in Fleet Manager |
| --- | --- |
| **Organization** | La tua azienda o il tuo team. Droni, missioni, la rete VPN e i membri appartengono a un'unica organizzazione. Ogni utente può essere Owner di un'organizzazione ed essere membro di un numero qualsiasi di altre. |
| **UAV** | Un drone (oppure un rover, una barca o un altro velivolo) che esegue UAVcast-Pro, associato a una sola organizzazione alla volta. Fleet Manager lo identifica tramite un ID dispositivo che UAVcast-Pro ricava dal numero seriale della CPU e dal disco di avvio del computer di bordo, così il drone mantiene la propria identità anche dopo riavvii e cambi di rete. |
| **Accoppiamento** (Pairing) | Collegamento di un UAV a un'organizzazione tramite un codice a 8 cifre mostrato da UAVcast-Pro. Il codice è valido per 5 minuti. |
| **Stazione di controllo a terra (GCS)** | Un laptop o PC con QGroundControl, Mission Planner o simili, collegato alla VPN della tua organizzazione per poter ricevere i flussi. |
| **Associazione di flusso** (stream binding) | Una regola che indica "invia video e telemetria di questo UAV a quella stazione di terra". Ogni associazione ottiene le proprie porte UDP, così una stazione di terra può ricevere molti droni contemporaneamente. |
| **Ruoli** | **Owner**, **Admin** o **Viewer**, impostati per organizzazione. I Viewer possono solo guardare; Admin e Owner possono accoppiare, controllare e configurare. Vedi [Ruoli e permessi](https://docs.uavmatrix.com/it/fleet-manager/team/roles-and-permissions/). |
| **Licenze e posti** | Ogni UAV accoppiato richiede una licenza UAVcast-Pro attiva di proprietà di un membro dell'organizzazione. I membri del team non consumano posti. Vedi [Licenze](https://docs.uavmatrix.com/it/fleet-manager/licenses/). |
| **Stato e avvisi** | Avvisi di online, offline, assenza di MAVLink e GPS sulla mappa e nell'elenco della flotta, oltre agli annunci di sistema. Vedi [Indicatori di stato e notifiche](https://docs.uavmatrix.com/it/fleet-manager/alerts-and-status/). |

## Cosa ti serve

Fleet Manager è incluso nella tua licenza UAVcast-Pro: nessun abbonamento separato, nessun posto aggiuntivo.

> Fleet Manager è incluso con una licenza UAVcast-Pro. Ogni drone che abbini ne richiede una.
>
> [Acquista UAVcast-Pro](https://uavmatrix.com/it/checkout) · [Vedi piani e prezzi](https://uavmatrix.com/it/products)

- Un account UAVmatrix (lo stesso che usi su [uavmatrix.com](https://uavmatrix.com/) per acquistare le licenze).
- Almeno un computer di bordo con UAVcast-Pro installato e la licenza attivata. Vedi [Installazione](https://docs.uavmatrix.com/it/get-started/installation/) e [Attiva la tua licenza](https://docs.uavmatrix.com/it/get-started/license-activation/).
- Connessione internet sul drone, con HTTPS in uscita (443) e TCP **8883** aperti.

## Inizia qui

1. [Configura la tua organizzazione](https://docs.uavmatrix.com/it/fleet-manager/set-up-organization/)
2. [Aggiungi il tuo primo drone](https://docs.uavmatrix.com/it/fleet-manager/pair-uav/)
3. [Collega una stazione di terra](https://docs.uavmatrix.com/it/fleet-manager/connect-gcs/)
4. [Invita il tuo team](https://docs.uavmatrix.com/it/fleet-manager/team/)

Source: https://docs.uavmatrix.com/it/fleet-manager/
