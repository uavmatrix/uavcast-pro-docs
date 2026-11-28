# Fleet

> La pagina Fleet elenca ogni UAV della tua organizzazione con stato in tempo reale, batteria e ultimo segnale, ed è dove accoppi i droni e apri i controlli.

**Fleet** (barra laterale **Fleet Management → Fleet**) elenca ogni UAV dell'organizzazione selezionata. Si aggiorna in tempo reale, quindi puoi lasciarla aperta su uno schermo a parete accanto alla [mappa](https://docs.uavmatrix.com/it/fleet-manager/map/).

![Pagina Fleet con una griglia di schede UAV che mostrano stato online e offline, batteria e ultimo segnale](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/fleet.webp)

*Pagina Fleet con UAV (46): schede ONLINE con i livelli di batteria e schede OFFLINE attenuate con gli orari di Last seen.*

## Schede UAV

L'intestazione mostra **UAVs (n)**. Ogni scheda mostra:

- **Name** e un badge di stato: **ONLINE**, **OFFLINE** o **PAIRING**.
- **Battery** in percentuale. Diventa gialla sotto il 50 % e rossa sotto il 20 %.
- **Last seen**, come tempo relativo. Le schede offline sono attenuate.
- **Re-pair required**, quando il drone deve essere accoppiato di nuovo (vedi [Riaccoppia un drone](https://docs.uavmatrix.com/it/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone)).

Un drone risulta offline dopo **20 secondi** senza messaggi da UAVcast-Pro, che invia un heartbeat ogni 5 secondi.

Due pulsanti su ogni scheda:

- **Operations** apre il [pannello di controllo](https://docs.uavmatrix.com/it/fleet-manager/fleet/remote-control/): modalità di volo, armo e disarmo, missioni.
- **Details** apre la [pagina UAV](https://docs.uavmatrix.com/it/fleet-manager/fleet/uav-details/): telemetria in tempo reale, terminale, log, azioni di sistema, rinomina e rimozione.

## Pulsanti della pagina

- **Pair Device** avvia la [procedura guidata di accoppiamento](https://docs.uavmatrix.com/it/fleet-manager/pair-uav/). Solo per Owner e Admin.
- **Refresh** ricarica l'elenco.
- **Need more devices?** → **View Plans** apre lo store UAVmatrix, dove acquisti altre licenze UAVcast-Pro. Vedi [Licenze](https://docs.uavmatrix.com/it/fleet-manager/licenses/).

## Banner di riaccoppiamento

Quando uno o più droni usano un certificato di connessione più vecchio, in alto compare un banner che dice **n UAV(s) must be re-paired**. Riaccoppia ogni drone elencato una sola volta: mantiene il nome e la cronologia. Vedi [Riaccoppia un drone](https://docs.uavmatrix.com/it/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone).

![Pagina Fleet con un banner di riaccoppiamento e badge Re-pair required su due schede](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/fleet--repair-required.webp)

*Pagina Fleet con il banner 2 UAVs must be re-paired e il badge Re-pair required sulle due schede interessate.*

## Suggerimenti per flotte grandi

- **Dai ai droni nomi riconoscibili sulla mappa.** I nomi compaiono nelle etichette della mappa e negli elenchi delle associazioni. Un numero di coda o un ruolo ("Inspection-07") è meglio dell'hostname predefinito. Rinominali dalla pagina UAV.
- **Assegna a ogni drone un colore proprio.** Fleet Manager assegna automaticamente i colori da una tavolozza di 24 colori. Imposta un colore fisso nel pannello di controllo (**Change map color**) per i droni che il team deve riconoscere a colpo d'occhio.
- **Usa le organizzazioni per separare i clienti.** Ogni drone appartiene a una sola organizzazione. Se operi per più clienti che devono vedere solo i propri droni, assegna a ciascuno un'organizzazione.

Source: https://docs.uavmatrix.com/it/fleet-manager/fleet/
