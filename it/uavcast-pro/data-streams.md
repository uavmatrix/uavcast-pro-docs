# Flussi di Dati

> Crea dashboard Flussi di Dati di UAVcast-Pro con grafici, indicatori e riquadri per qualsiasi campo MAVLink o valore di sensore NAMED_VALUE_FLOAT, con soglie, storico e import/export JSON.

Flussi di Dati ti permette di costruire le tue dashboard di telemetria in tempo reale. Aggiungi riquadri numerici, grafici a linee, indicatori e barre, oppure spie di stato, e collega ciascuno a qualsiasi valore MAVLink inviato dal controllore di volo o a qualsiasi segnale `NAMED_VALUE_FLOAT` proveniente da un sensore o da un [iniettore](https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/injectors/). Le dashboard sono memorizzate sul drone, quindi chiunque apra l'interfaccia web vede le stesse schede. Apri **Flussi di Dati** nella barra laterale.

Usi tipici: uno schermo per l'operatore del carico utile con le letture dei sensori, un pannello del collegamento LTE con RSRP e SINR, oppure una scheda su batteria e alimentazione per i voli lunghi.

![Pagina Flussi di Dati con Nessuna dashboard ancora e il pulsante Crea dashboard](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/mission-data.webp)

*Flussi di Dati prima della prima dashboard: Crea dashboard ne avvia una.*

## Crea una dashboard

1. Seleziona **Crea dashboard** (oppure **Nuova dashboard** se ne hai già una), inserisci un **Nome** e seleziona **Crea**.
2. Seleziona **Modifica** per entrare in modalità di modifica, poi **Aggiungi widget** e scegli un tipo.
3. Nella scheda **Origine**, cerca un segnale e selezionalo. Un puntino verde indica che stanno arrivando campioni.
4. Imposta titolo, unità e decimali in **Visualizzazione**, limiti e soglie di colore in **Intervallo**, e opzioni del grafico in **Grafico**. Seleziona **Salva**.
5. Trascina e ridimensiona i widget, poi seleziona **Fatto**.

Solo gli utenti Admin possono creare e modificare le dashboard. Gli utenti Read Only possono visualizzarle.

## Tipi di widget

| Tipo | Mostra |
| --- | --- |
| **Riquadro numerico** | Il valore attuale, in grande, con prefisso e suffisso opzionali. |
| **Sparkline** | Una piccola linea di tendenza sotto il valore. |
| **Grafico a linee** | Uno o più segnali su una finestra temporale. |
| **Indicatore** | Il valore su una scala circolare con soglie colorate. |
| **Barra** | Il valore come barra tra minimo e massimo. |
| **Stato** | Uno stato colorato in base alle soglie, per esempio OK / avviso / allarme. |
| **Tabella valori nominati** | Ogni segnale `NAMED_VALUE_FLOAT` con **Valore**, **Età** e **Src**. **Filtra** accetta una sottostringa o un `*.glob`. |

Un widget mostra **Obsoleto** quando non arriva alcun campione da 5 secondi, e *Nessun campione ancora* quando il segnale non è mai stato ricevuto.

## Segnali

- **Campi MAVLink**: ogni campo numerico inviato dal controllore di volo (assetto, VFR HUD, batteria, GPS, home, RTK, failsafe, heartbeat e valori di stato) compare automaticamente, con nomi leggibili e unità quando sono note.
- **Valori nominati**: segnali `NAMED_VALUE_FLOAT`, mostrati come `NOME@sysid:compid`, per esempio `LTE_RSRP@1:194`.

Puoi digitare un segnale che non sta ancora inviando e premere Invio per aggiungerlo, così puoi costruire la dashboard prima di collegare il sensore. Usa l'icona a matita su un'origine selezionata per assegnarle un nome visualizzato.

## Opzioni del grafico

| Opzione | Valori |
| --- | --- |
| **Finestra** | **1 min**, **5 min**, **15 min**, **1 ora** oppure **Personalizzata (secondi)** |
| **Curva** | **Lineare**, **Morbida (monotona)**, **Gradino**, **Gradino prima**, **Gradino dopo**, **Spline di base** |
| Altro | **Mostra legenda**, **Mostra griglia**, **Spessore linea**, **Riempimento area**, **Mostra punti dati**, **Linee di riferimento delle soglie**, **Etichetta asse Y** |

## Storico

UAVcast-Pro conserva sul drone un breve storico di ogni segnale (fino a 3600 campioni per segnale, circa un'ora a 1 Hz), così i grafici si riempiono non appena apri una dashboard, anche dopo un aggiornamento della pagina.

## Condividi le dashboard

- **Esporta JSON** copia la dashboard negli appunti.
- **Importa JSON** crea una dashboard da un JSON incollato. Usalo per copiare una scheda su un altro drone.
- **Duplica** e **Rinomina** si trovano nella barra degli strumenti; **Elimina** rimuove una dashboard e i suoi widget.
- **Schermo intero** nasconde il resto dell'interfaccia, per un monitor dedicato.

Source: https://docs.uavmatrix.com/it/uavcast-pro/data-streams/
