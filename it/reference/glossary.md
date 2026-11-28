# Glossario

> Spiegazioni semplici dei termini presenti nella documentazione di UAVcast-Pro e Fleet Manager: MAVLink, GCS, heartbeat, APN, HiLink, NTRIP, RTCM, VRS, ZeroTier, Tailscale.

### AGL / AMSL

Altitudine sopra il livello del suolo (qui: sopra il punto di decollo) e sopra il livello medio del mare. UAVcast-Pro usa questi termini dalla v6.5.0, al posto di REL e MSL.

### APN (Access Point Name)

Il nome del gateway dell'operatore attraverso cui si connette un modem cellulare. UAVcast-Pro lo rileva automaticamente quando **Nome Punto di Accesso (Opzionale)** è vuoto.

### ArduPilot

Firmware autopilota open source per multirotori, aerei, VTOL, rover e barche. UAVcast-Pro funziona con ArduPilot e con qualsiasi altro controllore di volo MAVLink, come PX4. I suoi pulsanti delle modalità di volo usano i nomi delle modalità di ArduPilot.

### Chiave di autenticazione

Una chiave Tailscale che accede un dispositivo a una tailnet senza usare un browser. Fleet Manager usa le chiavi di autenticazione per inserire le stazioni di terra nella VPN dell'organizzazione.

### Bitrate

Quanti bit al secondo produce il codificatore video. Deve stare nei limiti del collegamento in uscita della tua connessione, con un margine.

### Telecamera CSI

Una telecamera collegata al connettore a nastro del Raspberry Pi, come la Camera Module 3.

### Destinazione

In UAVcast-Pro, una voce di stazione di terra sotto **Stazioni di Controllo a Terra**: un indirizzo IP con una porta di telemetria e una porta video.

### Doppio flusso

Trasmissione di due telecamere verso la stazione di terra contemporaneamente, su due porte video.

### Fleet Manager

La dashboard web di UAVmatrix per monitorare e controllare molti droni UAVcast-Pro all'interno di un'unica organizzazione.

### GCS (stazione di controllo a terra)

Il software, e il computer su cui gira, che usi per monitorare e comandare il drone: QGroundControl, Mission Planner, MAVProxy.

### Failsafe GCS

Un'impostazione del controllore di volo che fa agire il drone autonomamente (rientro, atterraggio, loiter) quando smette di ricevere la stazione di terra.

### GGA

Una frase NMEA con la tua posizione. I caster VRS e i caster NTRIP con il mountpoint più vicino ne hanno bisogno per calcolare le correzioni per la tua posizione.

### H.264

Il formato di compressione video che UAVcast-Pro invia. Ogni stazione di terra comune è in grado di decodificarlo.

### Heartbeat

Il messaggio MAVLink che un controllore di volo invia circa una volta al secondo per dire "sono qui". *Nessun heartbeat* significa che il collegamento non trasporta MAVLink leggibile.

### Modem HiLink

Un modem USB con un router integrato che si connette da solo e appare a Linux come scheda di rete.

### Iniettore

Un listener di UAVcast-Pro (HTTP, UDP o seriale) che trasforma i valori dei tuoi sensori in messaggi MAVLink `NAMED_VALUE_FLOAT`.

### Keyframe

Un fotogramma video completo da cui il decodificatore può partire. Keyframe più frequenti recuperano più in fretta dalla perdita di pacchetti. Si imposta con **Tasso di Recupero del Stream**.

### MAVLink

Il protocollo di messaggistica tra controllori di volo e stazioni di terra.

### Mountpoint

Un flusso di correzioni con nome su un caster NTRIP, di solito legato a una singola stazione base o a un servizio VRS.

### MQTT

Il protocollo di messaggistica che i droni usano per comunicare con Fleet Manager, cifrato con TLS sulla porta 8883.

### NTRIP / caster NTRIP

Un protocollo, e il server che lo implementa, per trasmettere le correzioni GNSS via internet.

### Pairing Code

Il codice a 8 cifre che UAVcast-Pro mostra quando colleghi un drone a Fleet Manager. È valido per 5 minuti e utilizzabile una sola volta.

### Read Only (destinazione)

Una destinazione di stazione di terra che riceve la telemetria ma non può modificare nulla sul veicolo: da essa non è possibile inviare comandi, cambi di modalità, scritture di parametri o di missione. Vale a partire da UAVcast-Pro 6.5.3; nelle versioni precedenti, Read Only non blocca le scritture dei parametri.

### Read Only (utente)

Un ruolo utente di UAVcast-Pro che può visualizzare le pagine ma non può modificare le impostazioni né controllare il drone.

### RTCM3

Il formato standard dei messaggi per le correzioni GNSS.

### RTK, RTK Float, RTK Fixed

Posizionamento cinematico in tempo reale con correzioni. Float è una soluzione approssimata; Fixed è la soluzione a livello di centimetro.

### RTP / UDP

Il trasporto che UAVcast-Pro usa per video e telemetria: veloce, senza ritrasmissioni, il che mantiene bassa la latenza.

### SERIALx_PROTOCOL / SERIALx_BAUD

Parametri di ArduPilot che impostano quale protocollo parla una porta seriale (2 = MAVLink2) e a quale velocità.

### Associazione del flusso (stream binding)

In Fleet Manager, un collegamento che invia il video e la telemetria di un drone a una stazione di terra sulle sue porte dedicate.

### sysid / compid

ID di sistema MAVLink (quale veicolo) e ID di componente (quale parte del veicolo). Il controllore di volo è di solito sysid 1, compid 1.

### Tailnet

Una rete privata Tailscale.

### Tailscale

Una VPN basata su WireGuard. UAVcast-Pro può entrare nella tua tailnet o nella rete dell'organizzazione di Fleet Manager.

### UAVnet

Il controller di rete ZeroTier ospitato da UAVmatrix su uavnet.uavmatrix.com. Viene dismesso a favore della VPN di Fleet Manager; gli utenti esistenti dovrebbero passare a Fleet Manager.

### VRS (stazione di riferimento virtuale)

Un servizio di correzioni che calcola le correzioni per la tua posizione a partire da una rete di stazioni base. Richiede GGA in upstream.

### ZeroTier

Una VPN peer-to-peer. UAVcast-Pro può entrare nella tua rete ZeroTier.

Source: https://docs.uavmatrix.com/it/reference/glossary/
