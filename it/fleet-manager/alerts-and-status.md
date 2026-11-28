# Indicatori di stato e notifiche

> Cosa significano gli indicatori di Fleet Manager per offline, assenza di MAVLink, GPS, failsafe e batteria, oltre agli annunci di sistema, alla pagina di stato e agli avvisi.

Fleet Manager mostra i problemi dove stai già guardando: sulla mappa, nell'elenco della flotta e nella pagina di ogni drone. Questa pagina elenca ogni indicatore e cosa fare al riguardo.

## Indicatori del drone

| Indicatore | Dove | Significato | Prima cosa da verificare |
| --- | --- | --- | --- |
| **OFFLINE**, marcatore grigio con badge orologio | Flotta, mappa, pagina UAV | Nessun dato ricevuto da UAVcast-Pro da 20 secondi | Il collegamento internet del drone e la porta 8883. Vedi [Drone offline in Fleet Manager](https://docs.uavmatrix.com/it/troubleshooting/drone-offline-fleet-manager/). |
| **NO MAVLINK**, anello arancione con **!** | Mappa | UAVcast-Pro è online ma non riceve dati dal controllore di volo da 10 secondi | Alimentazione e cavo del controllore di volo. Vedi [Nessun heartbeat MAVLink](https://docs.uavmatrix.com/it/troubleshooting/no-mavlink-heartbeat/). |
| Anello rosso tratteggiato, **NO GPS** | Mappa | Nessun satellite o nessun fix | Visuale del cielo dall'antenna e cavo GPS. |
| Anello giallo tratteggiato, **WEAK GPS** | Mappa | Meno di 6 satelliti oppure solo un fix 2D | Attendi più satelliti prima del volo. |
| Batteria in giallo / rosso | Schede della flotta | Sotto il 50 % / sotto il 20 % | Pianifica l'atterraggio. |
| **ARMED** | Pagina UAV, pannello di controllo, popup sulla mappa | Motori armati | Considera il velivolo come se fosse attivo. |
| **FAILSAFE** | Pagina UAV, pannello di controllo | Il controllore di volo è in failsafe | I messaggi del controllore di volo, mostrati nel popup della mappa e in **Logs**. |
| **GCS FAILSAFE** / **GCS Failsafe not enabled** | Pagina UAV, pannello di controllo | Failsafe della stazione di controllo a terra attivato, oppure non configurato | Imposta `FS_GCS_ENABLE` prima dei voli BVLOS. |
| **Re-pair required** | Flotta, pagina UAV | Il drone usa un vecchio certificato di connessione | [Riaccoppia il drone](https://docs.uavmatrix.com/it/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone). |
| **Signal** poor | Popup sulla mappa | Tempo di andata e ritorno verso il drone superiore a 600 ms, oppure tre ping persi | Copertura cellulare o collegamento congestionato. |

Gli indicatori si aggiornano in tempo reale mentre la pagina è aperta. Fleet Manager controlla i droni offline ogni 5 secondi.

![Primo piano della mappa con marcatori che mostrano anelli offline, nessun MAVLink e GPS debole](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/map--indicators.webp)

*Primo piano di quattro marcatori: un drone sano, uno OFFLINE con badge orologio, uno NO MAVLINK con anello arancione e uno WEAK GPS con anello giallo tratteggiato.*

## Registro attività

Le modifiche apportate dal tuo team (accoppiamenti, rimozioni di droni, associazioni dei flussi, inviti, modifiche dei ruoli, VPN) vengono registrate sotto **Recent Activity** nella [Dashboard](https://docs.uavmatrix.com/it/fleet-manager/dashboard/), insieme a chi le ha effettuate.

## Annunci di sistema

Quando UAVmatrix ha una manutenzione programmata o un incidente, in cima a ogni pagina compare un banner: blu per le informazioni, ambra per un avviso, rosso per un evento critico. Se lo chiudi, resta nascosto finché non apri Fleet Manager in una nuova sessione del browser.

## Pagina di stato

**System → Status** (pagina **System Status**) mostra se Fleet Manager funziona normalmente: **All systems operational**, oppure **We're experiencing some issues** con gli **Active Incidents**. **Past Incidents** elenca gli ultimi incidenti risolti con la rispettiva **Resolution**. Controllala per prima cosa quando molti droni vanno offline contemporaneamente.

![Pagina System Status con All systems operational e un elenco di incidenti passati](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/status.webp)

*System Status che mostra All systems operational e due Past Incidents contrassegnati come Resolved.*

## Avvisi via email e webhook

Fleet Manager non invia ancora avvisi via email, SMS o webhook per gli eventi dei droni (ad esempio batteria scarica o drone offline). Tieni aperta la mappa o l'elenco della flotta nella sala di controllo e affidati ai failsafe del controllore di volo per la batteria e per la perdita del collegamento.

Source: https://docs.uavmatrix.com/it/fleet-manager/alerts-and-status/
