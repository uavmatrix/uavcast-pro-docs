# Nessun heartbeat MAVLink dal controllore di volo

> UAVcast-Pro mostra No heartbeat o In attesa del dispositivo? Controlla il cavo USB, il cablaggio TELEM, il protocollo SERIAL e il baud rate, poi usa Rileva automaticamente.

La pagina **Controllore di Volo → Connessione** mostra **No heartbeat**, **In attesa del dispositivo**, **Rilevamento baud rate** o **Ricerca**, e la riga **Controllore di volo** della dashboard non diventa mai verde. UAVcast-Pro non riesce ancora a rilevare il controllore di volo.

La pagina include una **Verifica connessione** in tempo reale che controlla ogni passaggio una volta al secondo e spiega il primo problema che trova. Leggila per prima: di solito è più veloce di questa pagina.

![Scheda Verifica connessione con quattro righe: controllore di volo collegato, dati leggibili dal controllore di volo, controllore di volo che risponde e invia alla stazione di terra](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/flight-controller--connection-check.webp)

*La Verifica connessione su un collegamento funzionante: tutti e quattro i passaggi sono superati. Quando il collegamento non funziona, il primo passaggio che fallisce viene contrassegnato e spiegato.*

| Cosa vedi | Causa probabile | Inizia da |
| --- | --- | --- |
| In attesa del dispositivo, oppure Controllore di volo collegato: Non rilevato | Nessun cavo dati, oppure la scheda non è alimentata | [Controllo 1](https://docs.uavmatrix.com/it/troubleshooting/no-mavlink-heartbeat/#check-1) |
| Segnale sul cavo, ma nessun dato leggibile | Baud rate errato, TX e RX invertiti, oppure la porta non è impostata su MAVLink | [Controllo 2](https://docs.uavmatrix.com/it/troubleshooting/no-mavlink-heartbeat/#check-2) |
| I dati leggibili mostrano una percentuale alta di danneggiati | Cavo allentato o lungo, massa mancante o disturbi elettrici | [Controllo 3](https://docs.uavmatrix.com/it/troubleshooting/no-mavlink-heartbeat/#check-3) |
| La porta risulta in uso da un altro programma | Un altro programma occupa la porta seriale | [Controllo 4](https://docs.uavmatrix.com/it/troubleshooting/no-mavlink-heartbeat/#check-4) |
| Stato Disattivato o Arrestato | Il collegamento è spento | [Controllo 5](https://docs.uavmatrix.com/it/troubleshooting/no-mavlink-heartbeat/#check-5) |

## Controllo 1: il controllore di volo viene rilevato?

**Tramite USB:**

1. Assicurati che il controllore di volo sia alimentato e che il suo cavo USB arrivi al computer di bordo.
2. Prova un altro cavo. Molti cavi USB servono solo per la ricarica e non trasportano dati. Se la scheda si accende ma **Controllore di volo collegato** indica **Non rilevato**, il cavo è di solito la causa.
3. In **Tipo di collegamento**, scegli **USB** e lascia **Porta** su **Automatico**. Automatico trova il controllore di volo e lo segue anche se il numero del dispositivo cambia.

**Tramite una porta TELEM (UART / Seriale):**

1. In **Tipo di collegamento**, scegli **UART / Seriale**.
2. Controlla il cablaggio: TX del controllore di volo → RX sul computer di bordo, RX → TX e GND → GND. Un filo di massa mancante è una causa comune.
3. Non alimentare mai il Raspberry Pi dalla porta TELEM. Alimentalo separatamente.

> **Porta seriale del Raspberry Pi**
>
> L'installer abilita la UART del Pi e rimuove la console seriale da `cmdline.txt`. Su Pi 3, 4 o Zero 2 W disabilita anche il Bluetooth, così la UART completa è libera. Se hai reinstallato il sistema operativo dopo UAVcast-Pro, esegui di nuovo l'installer.

## Controllo 2: allinea le impostazioni della porta sul controllore di volo

Su una porta TELEM, il controllore di volo deve parlare MAVLink alla velocità su cui ascolta UAVcast-Pro. Le connessioni USB non usano il baud rate.

1. Collega il controllore di volo a Mission Planner o QGroundControl tramite USB.
2. Apri l'elenco completo dei parametri e trova la porta seriale a cui hai collegato i cavi: `SERIAL1` per TELEM1, `SERIAL2` per TELEM2.
3. Imposta `SERIALx_PROTOCOL` su `2` (MAVLink2). Scrivi i parametri e riavvia il controllore di volo.
4. Annota `SERIALx_BAUD`. In UAVcast-Pro, lascia **Velocità di trasmissione** su **Automatico**, oppure scegli lo stesso valore.

Con **Automatico**, UAVcast-Pro prova 57600, 115200, 921600, 1500000, 460800, 230400 e 500000 baud e ricorda la velocità che ha funzionato. Lo stato mostra *Provo … baud (n di 7)* durante la ricerca.

> **Lascia che UAVcast-Pro cerchi al posto tuo**
>
> Premi **Rileva automaticamente**. Il sistema sospende il collegamento, ascolta su ogni porta e velocità, quindi salva ciò che trova. L'operazione può richiedere fino a un minuto. Se riporta **Nessun controllore di volo trovato**, apri **Mostra cosa è stato provato** per vedere ogni porta e velocità testate.

## Controllo 3: dati danneggiati

Se **Dati leggibili dal controllore di volo** mostra una percentuale *danneggiati*, i byte arrivano ma sono corrotti. Di solito dipende da un cavo allentato o lungo, da un filo di massa mancante o dal rumore di motori e cavi di alimentazione.

- Reinserisci i connettori e accorcia il cavo.
- Fai passare i cavi del segnale lontano dai cavi ESC e dalla batteria.
- Prova un valore `SERIALx_BAUD` più basso, per esempio 57600 o 115200.

## Controllo 4: porta in uso

L'elenco **Porta** contrassegna le porte che un altro programma occupa (*in uso da …*). Chiudi quel programma, per esempio un MAVProxy o un secondo router che hai avviato tu, oppure scegli un'altra porta.

## Controllo 5: il collegamento è attivo?

In alto nella pagina, **Collegamento attivo** deve essere attivato. Se lo stato indica **Collegamento arrestato**, premi **Connetti**. Le impostazioni si applicano subito, senza riavvio.

## Ancora nessun heartbeat?

[Scarica i log](https://docs.uavmatrix.com/it/troubleshooting/collect-logs/) con **Mavlink Manager** selezionato. Il file `diagnostics.txt` incluso elenca le porte seriali, chi le occupa e gli eventi USB e di alimentazione del kernel: sono le informazioni di cui il supporto ha bisogno per i problemi di collegamento.

Quando il controllore di volo mostra **Connesso** ma la stazione di terra continua ad aspettare, vai a [Nessuna telemetria nella stazione di terra](https://docs.uavmatrix.com/it/troubleshooting/no-telemetry-in-gcs/).

Correlati: [Connessione del controllore di volo](https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/) · [Requisiti hardware](https://docs.uavmatrix.com/it/get-started/hardware-requirements/)

Source: https://docs.uavmatrix.com/it/troubleshooting/no-mavlink-heartbeat/
