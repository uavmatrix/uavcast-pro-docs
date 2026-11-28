# Dashboard

> Leggi la dashboard di UAVcast-Pro per controllare controllore di volo, GPS, batteria, collegamento con la stazione di controllo a terra, modem cellulare, VPN, RTK, video e alimentazione, temperatura e limitazione del Raspberry Pi.

La dashboard è la checklist pre-volo del computer di bordo (companion computer). Una scheda di stato indica se controllore di volo, GPS, batteria, collegamento con la stazione di controllo a terra, modem, VPN, RTK, video e alimentazione sono in buono stato, con un riepilogo come *Tutti i sistemi normali* o *2 problemi*. Sotto la scheda trovi le informazioni di sistema, il traffico di rete, la memoria e l'archiviazione. Apri **Dashboard** nella barra laterale.

![Dashboard di UAVcast-Pro con la scheda di stato che mostra 2 problemi, le informazioni di sistema con la temperatura e il grafico del traffico di rete](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/dashboard.webp)

*Dashboard su un'unità da banco: due problemi (nessun fix GPS, VPN non connessa), informazioni di sistema e traffico di rete.*

## Scheda di stato

La scheda ha tre gruppi. Ogni riga ha un puntino colorato: verde è normale, ambra è un avviso, rosso è un problema.

| Riga | Valori di esempio | Cosa fare se non è verde |
| --- | --- | --- |
| **Controllore di volo** | *Armato*, *Disarmato*, *Collegamento fermo*, *Connessione in corso...* | Vedi [Controllore di volo](https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/). |
| **GPS** | *Fix 3D · 14 satelliti*, *RTK fisso*, *Nessun fix*, *Nessun GPS* | Attendi un fix all'aperto oppure controlla il cablaggio del GPS. |
| **Batteria** | tensione e percentuale | Ricarica la batteria oppure controlla la configurazione del monitor batteria del controllore di volo. |
| **Stazione di controllo a terra** | *Invio a 2 · 16 pacchetti/s*, *Nessun invio*, *1 configurata · in attesa del controllore di volo*, *Nessuna configurata* | Vedi [Stazioni di controllo a terra](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/). |
| **Cellulare** | operatore e segnale, *Nessun modem rilevato* | Vedi [Modem cellulare](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/cellular-modem/). |
| **VPN** | *Connessa*, *Non connessa*, *Disattivata* | Vedi [VPN](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/vpn/). |
| **Correzioni RTK** | *Connessione in corso...*, *Errore - controlla le impostazioni*, *Disattivate* | Vedi [NTRIP / RTK](https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/ntrip-rtk/). |
| **Video** | *In esecuzione*, *Fermo*, *Disattivato* | Vedi [Telecamera](https://docs.uavmatrix.com/it/uavcast-pro/camera/). |
| **DNS dinamico** | *In esecuzione*, *Disattivato* | Vedi [DNS dinamico](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/dynamic-dns/). |
| **Alimentazione** | *Stabile*, *Tensione troppo bassa - usa un alimentatore più potente*, *Rallentata (calore o alimentazione)*, *Tensione calata dall'avvio* | Vedi [Alimentazione](https://docs.uavmatrix.com/it/uavcast-pro/dashboard/#power-and-temperature). |

*Servizio non riuscito - riavvio in corso* su qualsiasi riga significa che il servizio si è bloccato ed è stato riavviato automaticamente. Se il messaggio persiste, scarica i log da **Applicazione → Registrazione Log**.

## Alimentazione e temperatura

Su un Raspberry Pi, **Informazioni di Sistema** mostra **Alimentazione**, **Limitazione CPU** e **Temperatura**:

- **Tensione troppo bassa - usa un alimentatore più potente**: il Pi è in sottotensione in questo momento. Questo causa reset USB, quindi il modem o il controllore di volo possono disconnettersi. Risolvi l'alimentazione prima di volare.
- **Tensione calata dall'avvio**: è successo in un momento qualsiasi dall'avvio. Spesso è causato dai picchi di trasmissione del modem.
- **Rallentata (calore o alimentazione)**: la CPU è limitata. La codifica video è la prima a risentirne. Aggiungi un dissipatore o un flusso d'aria, oppure correggi l'alimentazione.

La barra della temperatura diventa rossa quando il Pi si avvicina alla soglia di limitazione.

## Altre schede

| Scheda | Mostra |
| --- | --- |
| **Informazioni di Sistema** | **Sistema Operativo**, **Hardware** (CPU e core), **Tempo di Attività**, alimentazione e **Temperatura**. |
| **Traffico di Rete** | Totali e velocità ricevuti e trasmessi per interfaccia. Scegli da **Ultimi 50** a **Ultimi 1000** campioni. Utile per verificare quanto consuma il video sul modem. |
| **Utilizzo Memoria** | **Totale**, **Utilizzato** e **Libero**. I dati vengono raccolti ogni 10 secondi. |
| **Archiviazione** | **Totale**, **Utilizzato** e **Libero** per ogni partizione. |

I grafici hanno bisogno di qualche minuto di dati dopo l'avvio prima di mostrare qualcosa.

## Tour guidato

La prima volta che apri l'interfaccia web, un tour ti propone di guidarti nelle pagine principali. Puoi scegliere **Salta Tour** oppure **Non mostrare più**. Riavvialo da **Applicazione → Impostazioni → Fai un Tour**.

Problemi di alimentazione in dettaglio: [Sottotensione e limitazione](https://docs.uavmatrix.com/it/troubleshooting/undervoltage-and-throttling/).

Source: https://docs.uavmatrix.com/it/uavcast-pro/dashboard/
