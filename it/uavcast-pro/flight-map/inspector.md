# Ispettore MAVLink

> Usa l'Ispettore MAVLink di UAVcast-Pro per vedere ogni messaggio del controllore di volo con la sua frequenza, l'ID di sistema e l'ID componente, e per fare il debug di telemetria e iniettori.

L'Ispettore elenca ogni messaggio MAVLink ricevuto da UAVcast-Pro, raggruppato per velivolo, con la sua frequenza e gli ultimi valori dei campi. Usalo per verificare che il controllore di volo invii ciò che ti aspetti, per trovare i nomi esatti dei campi di un messaggio o per confermare che un [iniettore](https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/injectors/) produce messaggi `NAMED_VALUE_FLOAT`. Apri **Mappa di Volo → Ispettore**.

![Ispettore MAVLink con stato della connessione e la lista dei messaggi per il sistema 1, con nomi dei messaggi, frequenze in Hz e conteggi](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/flight-map--inspector.webp)

*Mappa di Volo → Ispettore con i messaggi del controllore di volo (sistema 1) e ATTITUDE espanso.*

## Cosa vedi

**Stato della connessione MAVLink** in alto: **Connessione**, **Velivolo**, **Satelliti GPS**, **Messaggi totali** e **ID Sistema**.

**Ispettore Messaggi** sotto: un gruppo per velivolo (*Velivolo (ID Sistema: 1)*) e al suo interno una riga per messaggio, con:

- il nome del messaggio,
- **COMP**: l'ID del componente che l'ha inviato (1 = autopilota, 194 = il valore predefinito per gli iniettori),
- la frequenza in **Hz** e il numero di messaggi ricevuti.

Apri un messaggio per vedere i suoi campi e i valori attuali.

## Controlli tipici

| Domanda | Cosa cercare |
| --- | --- |
| Il GPS invia dati? | `GPS_RAW_INT` a 2–10 Hz, e `GPS_RTK` se usi [RTK](https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/ntrip-rtk/). |
| Perché la telemetria è lenta nella stazione di terra? | Frequenze basse su `ATTITUDE`, `VFR_HUD` o `GLOBAL_POSITION_INT`. Aumenta le frequenze dello stream `SRx_` sulla porta MAVLink del controllore di volo. |
| Il mio iniettore funziona? | `NAMED_VALUE_FLOAT` sotto COMP 194 (o il compid che hai impostato). |

Se l'elenco mostra *In attesa di messaggi...*, il collegamento con il controllore di volo non è attivo. Vedi [Controllore di volo](https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/).

Source: https://docs.uavmatrix.com/it/uavcast-pro/flight-map/inspector/
