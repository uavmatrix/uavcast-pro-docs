# Correzioni RTK NTRIP che non arrivano

> NTRIP bloccato su Connecting, nessun RTCM inoltrato o nessun RTK Fixed? Controlla host del caster, porta, mountpoint, credenziali, GGA upstream e il ricevitore GPS.

In **Controllore di Volo → NTRIP / RTK** lo stato non raggiunge **Trasmissione correzioni**, il contatore **Messaggi RTCM inoltrati** resta a zero, oppure le correzioni arrivano ma il controllore di volo non supera mai **3D fix** o **RTK Float**.

La catena ha quattro anelli: internet → caster → UAVcast-Pro → controllore di volo → ricevitore GPS. Individua il primo che si interrompe.

![Scheda NTRIP / RTK con il pannello di stato, i contatori e la riga di risposta del caster, e la scheda della qualità GPS](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/flight-controller--ntrip.webp)

*Controllore di Volo → NTRIP / RTK su un'unità senza caster configurato: stato Disabilitato, contatori a zero e Risposta caster vuota. Il caso corretto è Trasmissione correzioni, una risposta del caster 200 e contatori in aumento.*

| Cosa vedi | Causa probabile | Inizia da |
| --- | --- | --- |
| Stato Connecting o Error, nessuna risposta del caster | Host o porta errati, mancata corrispondenza TLS, oppure nessuna connessione internet | [Controllo 1](https://docs.uavmatrix.com/it/troubleshooting/rtk-corrections-not-arriving/#check-1) |
| Risposta del caster 401 Unauthorized | Nome utente, password o mountpoint errati | [Controllo 2](https://docs.uavmatrix.com/it/troubleshooting/rtk-corrections-not-arriving/#check-2) |
| Il log indica che il caster ha restituito la sourcetable | Il nome del mountpoint è errato | [Controllo 2](https://docs.uavmatrix.com/it/troubleshooting/rtk-corrections-not-arriving/#check-2) |
| Connesso, ma nessun dato RTCM, si riconnette ogni pochi secondi | Il caster richiede prima una posizione GGA | [Controllo 3](https://docs.uavmatrix.com/it/troubleshooting/rtk-corrections-not-arriving/#check-3) |
| RTCM inoltrato, il fix resta su 3D fix | Collegamento con il controllore di volo interrotto, oppure ricevitore non compatibile con RTK | [Controllo 4](https://docs.uavmatrix.com/it/troubleshooting/rtk-corrections-not-arriving/#check-4) |
| RTK Float, mai RTK Fixed | Visibilità del cielo, distanza dalla base, oppure tempo | [Controllo 5](https://docs.uavmatrix.com/it/troubleshooting/rtk-corrections-not-arriving/#check-5) |

## Controllo 1: raggiungi il caster

1. Controlla **Host caster** e **Porta**. La maggior parte dei caster pubblici usa TCP semplice sulla porta `2101`.
2. **Usa TLS (HTTPS)** deve corrispondere al caster. I caster commerciali (Trimble, Hexagon, Topcon e altri) spesso richiedono TLS, di solito sempre sulla porta 2101, a volte 2102 o 443. I caster pubblici normalmente non usano TLS.
3. Assicurati che il drone abbia accesso a internet. **Dashboard → Cellulare** dovrebbe risultare connesso. In caso contrario, vedi [Modem connesso, ma senza internet](https://docs.uavmatrix.com/it/troubleshooting/modem-no-internet/).
4. Alcuni piani cellulari bloccano porte in uscita insolite. Se il caster offre la porta 443, provala.

## Controllo 2: credenziali e mountpoint

1. Premi **Testa connessione**. Il messaggio **Il caster ha accettato le credenziali.** significa che nome utente e password sono corretti.
2. Per rtk2go.com, usa un indirizzo e-mail reale come **Nome utente** e lascia **Password** vuota.
3. Premi **Sfoglia mountpoint** e scegli un mountpoint dall'elenco invece di digitarne il nome. Preferisci uno vicino alla zona in cui voli.

Se il caster risponde con la sua sourcetable invece che con i dati, il log NTRIP indica *il caster ha restituito la sourcetable — controlla il mountpoint*. Il nome del mountpoint è errato o non esiste più.

## Controllo 3: invia GGA upstream

I caster VRS e quelli a mountpoint più vicino inviano correzioni solo dopo aver saputo dove ti trovi. La colonna **NMEA** nell'esploratore dei mountpoint indica **Richiesto** per questi mountpoint.

1. Attiva **Invia GGA upstream** (attivo per impostazione predefinita). **Intervallo di invio (secondi)** è 10 per impostazione predefinita.
2. **Sorgente posizione**: **Posizione live dal controllore di volo** è la scelta giusta in volo. Finché il controllore di volo non segnala un fix GPS, UAVcast-Pro usa la **Posizione manuale fissa**, quindi per i test sul banco inserisci una latitudine e una longitudine vicine a te.
3. Osserva l'aggiornamento di **Ultimo GGA inviato**.

UAVcast-Pro si riconnette da solo quando il caster smette di inviare dati, e il log mostra *nessun dato dal caster per …s — riconnessione in corso*. Dopo una breve interruzione di internet, le correzioni riprendono in pochi secondi.

## Controllo 4: dall'UAVcast-Pro al ricevitore

Le correzioni raggiungono il GPS tramite il collegamento con il controllore di volo, come MAVLink `GPS_RTCM_DATA`.

1. Il controllore di volo deve essere **Connesso** in **Controllore di Volo → Connessione**. In caso contrario, vedi [Nessun heartbeat MAVLink](https://docs.uavmatrix.com/it/troubleshooting/no-mavlink-heartbeat/).
2. Guarda la scheda **Qualità GPS**. **Nessuno stato RTK dal ricevitore** significa che il controllore di volo non ha mai segnalato lo stato RTK. Il GPS collegato di solito non è compatibile con RTK: l'RTK richiede un ricevitore RTK a fase portante come u-blox F9P, Here3+ o Septentrio Mosaic. Un modulo di navigazione standard M8N o M10 non funziona per l'RTK.
3. **Tipi di messaggio recenti** dovrebbe includere le costellazioni usate dal ricevitore (per esempio 1077 GPS, 1087 GLONASS, 1097 Galileo, 1127 BeiDou) e un messaggio di posizione della base (1005 o 1006).

## Controllo 5: Float, ma mai Fixed

- Dai all'antenna un cielo libero. Alberi, edifici e l'elettronica del drone causano multipath e rumore.
- Attendi. Un avvio a freddo può richiedere uno o due minuti anche in buone condizioni.
- Scegli una base più vicina. La precisione e la probabilità di ottenere un fix diminuiscono con la distanza dalla stazione base.
- **Ultima correzione** in **Qualità GPS** dovrebbe restare sui pochi secondi. Se cresce, le correzioni si stanno perdendo lungo il collegamento.

## Ancora non funziona?

[Scarica i log](https://docs.uavmatrix.com/it/troubleshooting/collect-logs/) con **NTRIP Client** selezionato e inviali a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, insieme al fornitore del caster e al modello del GPS. La configurazione completa è in [Configurare RTK con un caster NTRIP](https://docs.uavmatrix.com/it/guides/rtk-ntrip-caster/).

Correlati: [Impostazioni NTRIP / RTK](https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/ntrip-rtk/)

Source: https://docs.uavmatrix.com/it/troubleshooting/rtk-corrections-not-arriving/
