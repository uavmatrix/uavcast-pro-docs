# Trasmetti a più stazioni di terra

> Invia telemetria e video dal vivo da un drone a più stazioni QGroundControl o Mission Planner con UAVcast-Pro, con osservatori in sola lettura.

Un drone, più schermi: un pilota su Mission Planner, un operatore del carico utile su QGroundControl, un supervisore che osserva dall'ufficio. UAVcast-Pro invia telemetria e video a ogni destinazione che aggiungi, ciascuna con i propri interruttori.

## Come funziona

Ogni voce sotto **Stazioni di Controllo a Terra** è una destinazione: un indirizzo IPv4 più una porta di telemetria e una porta video. UAVcast-Pro invia:

- telemetria MAVLink via UDP verso **Porta Telemetria** (predefinita 14550) quando **Attiva Telemetria** è attivo,
- video H.264 via RTP/UDP verso **Porta Video** (predefinita 5600) quando **Attiva Video** è attivo,
- nulla affatto quando **Attiva Endpoint** è disattivato.

I comandi di ogni destinazione raggiungono il controllore di volo, a meno che quella destinazione non sia **Read Only**.

## 1. Aggiungi una destinazione per ogni stazione

1. Apri **Stazioni di Controllo a Terra** e premi **Aggiungi Destinazione** una volta per ogni stazione.
2. Dai a ciascuna un **Nome** riconoscibile, per esempio *Pilota – Mission Planner* e *Carico utile – QGC*.
3. Inserisci l'indirizzo IPv4 di ogni computer in **IP o Host di Destinazione**. Via 4G, usa gli indirizzi VPN.
4. Attiva **Attiva Telemetria** e **Attiva Video** dove servono. Una stazione che ha bisogno solo della telemetria risparmia banda con il video disattivato.

![Pagina Stazione di Controllo a Terra con due schede di destinazione e il pulsante Aggiungi Destinazione](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/ground-control.webp)

*Stazione di Controllo a Terra con due schede di destinazione. Aggiungi Destinazione aggiunge una scheda per ogni stazione.*

## 2. Rendi gli osservatori in sola lettura

Per chi deve osservare senza mai pilotare, attiva **Read Only** sulla sua destinazione. La stazione riceve comunque la telemetria in tempo reale, ma non può modificare nulla sul velivolo: comandi, cambi di modalità, armamento, scritture di parametri, scritture di missione e override RC da essa sono bloccati. Vale a partire da UAVcast-Pro 6.5.3; nelle versioni precedenti, Read Only non blocca le scritture dei parametri. Il software della stazione di terra può mostrare avvisi in questa modalità, perché alcune sue richieste (come lo scaricamento dei parametri o della missione) restano senza risposta.

> **Due piloti, un drone**
>
> Senza Read Only, ogni stazione può comandare il drone. Stabilite chi pilota e rendete in sola lettura tutte le altre stazioni.

## 3. Due stazioni su un computer

Due programmi su un computer non possono ascoltare sulla stessa porta. Aggiungi due destinazioni con lo stesso IP e porte diverse, per esempio:

| Destinazione | Porta Telemetria | Porta Video |
| --- | --- | --- |
| Mission Planner | 14550 | 5600 |
| QGroundControl | 14551 | 5603 |

Poi imposta il secondo programma in ascolto su quelle porte (in QGroundControl, aggiungi un link di comunicazione UDP sulla 14551 e imposta la porta UDP video su 5603).

Distanzia le porte video di **3** (5600, 5603, 5606 …). Ogni destinazione usa la propria porta video, più la porta video + 1 per la seconda telecamera nel [doppio flusso](https://docs.uavmatrix.com/it/guides/dual-camera-rc-switching/) e la porta video + 2 per l'[audio](https://docs.uavmatrix.com/it/uavcast-pro/camera/audio/). Porte più vicine entrano in conflitto non appena attivi il doppio flusso o l'audio.

## 4. Attenzione all'uplink

Ogni destinazione video è una copia separata del flusso. Tre destinazioni video a 1500 kbps richiedono circa 4,5 Mbit/s di uplink dal drone. Via 4G, invia il video solo alle stazioni che ne hanno bisogno, oppure abbassa il bitrate in **Telecamera → Impostazioni telecamera**. **Dashboard → Traffico di Rete** mostra cosa invia effettivamente il modem.

## 5. Verifica che ogni stazione riceva dati

Nella **Dashboard**, la riga **Ground station** mostra *Sending to n · x packets/s*. La **Verifica connessione** in **Controllore di Volo → Connessione** elenca ogni uscita verso una stazione di terra e qualsiasi destinazione esclusa perché il suo indirizzo non è valido.

## Con Fleet Manager

In Fleet Manager, le stazioni di terra entrano nella VPN dell'organizzazione e le colleghi ai droni con gli **Stream Bindings** nella pagina **Network**. Ogni drone aggiuntivo associato alla stessa stazione di terra ottiene il proprio blocco di porte. Vedi [Stream binding](https://docs.uavmatrix.com/it/fleet-manager/network/stream-bindings/).

Source: https://docs.uavmatrix.com/it/guides/multiple-ground-stations/
