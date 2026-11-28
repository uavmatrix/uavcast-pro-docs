# Missioni

> Disegna missioni a waypoint sulla mappa, scegli i comandi MAVLink e i sistemi di riferimento dell'altitudine, salva le missioni per l'intera organizzazione e caricale su qualsiasi drone online.

**Missions** (barra laterale **Fleet Management → Missions**) è un pianificatore di waypoint nel browser. Le missioni sono salvate per l'organizzazione, quindi chiunque nel team può caricarne una, e un Owner o un Admin può caricarla su qualsiasi drone online.

![Pianificatore di missione con un disegno di rilievo a waypoint su una mappa satellitare](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/missions.webp)

*Mission Planner nello stile Satellite con una griglia di rilievo di 18 waypoint, Takeoff e Return to Launch, e l'intestazione con 18 waypoint e distanza totale.*

I Viewer possono aprire e consultare le missioni salvate. Salvare, caricare ed eliminare richiede il ruolo Owner o Admin.

## Pianifica una missione

1. Seleziona **Create New** (oppure **Missions → New Mission**).
2. Clicca sulla mappa per aggiungere waypoint. Trascina un waypoint per spostarlo. Durante il posizionamento, **Next WP** mostra la distanza dal waypoint precedente (**Prev:**) e da home (**Home:**).
3. Apri il cassetto dei waypoint (**n Waypoints**) per modificare ogni riga: **Command**, **Params**, **Alt**, **Frame** e **Radius**. Trascina le righe per riordinarle. La riga **H** è home.
4. Imposta i **Defaults:** per i nuovi waypoint, in cima al cassetto: **Alt** (predefinito 50 m) e **WP Radius** (predefinito 30 m).

![Cassetto dei waypoint con colonne per comando, parametri, coordinate, altitudine, sistema di riferimento, raggio e distanza](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/missions--waypoint-drawer.webp)

*Cassetto dei waypoint con un Takeoff, diverse righe Waypoint, un Change Speed e un Return to Launch, con Frame impostato su Relative.*

### Sistemi di riferimento dell'altitudine

| Riferimento | L'altitudine è misurata da |
| --- | --- |
| **Relative** (predefinito) | La posizione home |
| **Absolute** | Il livello medio del mare |
| **Terrain** | Il terreno sotto il waypoint (richiede dati del terreno sul controllore di volo) |

### Comandi

Il selettore **Command** è ricercabile e mostra i comandi di missione MAVLink che ArduPilot riconosce, raggruppati così:

- **Navigazione:** Waypoint, Takeoff, Land, Return to Launch, Loiter Unlim, Loiter Turns, Loiter Time, Loiter to Alt, Spline Waypoint, Vtol Takeoff, Vtol Land, Payload Place, Delay e altri.
- **Condizioni:** Delay, Change Alt, Distance, Yaw.
- **Comandi di azione (Do):** Change Speed, Set ROI Location, Set Servo, Set Relay, Jump, Digicam Control, Set Cam Trigg Dist, Mount Control, Gripper, Parachute, VTOL Transition e altri.

I comandi che richiedono parametri (per esempio tempo di ritardo, giri di loiter, velocità o PWM del servo) hanno campi modificabili in **Params**.

Limiti: altitudine da 0 a 10.000 m, raggio da 1 a 1.000 m, almeno un waypoint.

## Salva

Seleziona **Save**, inserisci un **Name** (fino a 100 caratteri) e una **Description** facoltativa, quindi conferma **Save Mission**. L'intestazione mostra **Unsaved** finché ci sono modifiche; **Update Mission** le salva. Apri le missioni salvate da **Missions → Saved Missions**.

## Carica su un drone

1. Salva la missione. Una missione non salvata non può essere caricata (**Mission not saved**).
2. Seleziona **Upload to Drone**, scegli l'UAV in **Select UAV** e conferma.
3. Attendi la conferma. Il caricamento scade dopo 30 secondi se il drone non risponde.

![Finestra di dialogo Upload Mission to Drone con un elenco di UAV online](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/missions--upload.webp)

*Finestra Upload Mission to Drone con gli UAV online tra cui scegliere.*

Per volarla, seleziona la missione nel [pannello di controllo](https://docs.uavmatrix.com/it/fleet-manager/fleet/remote-control/#mission) del drone e seleziona **Start**. Se la missione sul drone è diversa da quella che hai selezionato, il pannello propone **Upload & Start**.

## Leggi una missione da un drone

In **Missions → Read from Drone**, scegli un drone online. La sua missione attuale viene caricata nel pianificatore come **Mission from *name***. Salvala per conservarne una copia, ad esempio prima di sovrascriverla.

> **Controlla la missione nella stazione di terra prima del volo**
>
> Fleet Manager carica esattamente ciò che hai pianificato. Prima di un volo automatico, controlla la missione e i failsafe del velivolo in QGroundControl o Mission Planner, come faresti con qualsiasi altro strumento di pianificazione.

Source: https://docs.uavmatrix.com/it/fleet-manager/missions/
