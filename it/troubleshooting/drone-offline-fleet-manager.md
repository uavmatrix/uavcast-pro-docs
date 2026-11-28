# Il drone risulta Offline in Fleet Manager

> L'UAV accoppiato risulta Offline o Re-pair required in Fleet Manager? Controlla la connessione internet del drone, la porta 8883 in uscita, Fleet Management di UAVcast-Pro e la licenza.

L'UAV è accoppiato, ma Fleet Manager lo mostra come **Offline** (in grigio sulla mappa della flotta), la sua telemetria è ferma, oppure ha il badge **Re-pair required**.

Fleet Manager segna un UAV come offline quando non riceve nulla da esso per 20 secondi. Il drone comunica con Fleet Manager tramite una connessione MQTT cifrata, sulla propria connessione internet.

| Cosa vedi | Causa probabile | Inizia da |
| --- | --- | --- |
| Offline, e Fleet Management in UAVcast-Pro indica Disconnected | Il drone non ha internet, oppure la porta 8883 è bloccata | [Controllo 1](https://docs.uavmatrix.com/it/troubleshooting/drone-offline-fleet-manager/#check-1) |
| Badge Re-pair required, oppure This UAV must be re-paired | Il drone ha un certificato vecchio | [Controllo 2](https://docs.uavmatrix.com/it/troubleshooting/drone-offline-fleet-manager/#check-2) |
| Offline subito dopo aver reinstallato o ripristinato UAVcast-Pro | L'accoppiamento è stato rimosso sul drone | [Controllo 3](https://docs.uavmatrix.com/it/troubleshooting/drone-offline-fleet-manager/#check-3) |
| Online, ma senza posizione né batteria | Controllore di volo non collegato a UAVcast-Pro | [Controllo 4](https://docs.uavmatrix.com/it/troubleshooting/drone-offline-fleet-manager/#check-4) |

## Verifica 1: la connessione del drone a Fleet Manager

1. Apri UAVcast-Pro sul drone e vai su **Fleet Management**. **Fleet Connection** mostra **Connected** oppure **Disconnected**, e **Last Connected**.
2. Se è **Disconnected**, verifica che il drone abbia internet: la riga **Cellular** della dashboard, oppure `curl -I https://fleet-manager.uavmatrix.com` sul dispositivo. Risolvi prima il collegamento con [Modem connesso, ma senza internet](https://docs.uavmatrix.com/it/troubleshooting/modem-no-internet/).
3. Il drone deve poter aprire una **connessione TCP in uscita sulla porta 8883** (MQTT su TLS). Alcune reti aziendali, il Wi-Fi pubblico e alcuni piani SIM IoT consentono solo le porte web. Prova un'altra rete, oppure chiedi al provider di aprire la porta 8883.
4. Controlla data e ora sul dispositivo con `date`. La connessione usa certificati, che falliscono su un dispositivo con l'orologio sbagliato.
5. Assicurati che la licenza del drone sia ancora attiva (**Applicazione → Gestore Licenze**).

## Verifica 2: Re-pair required

Fleet Manager ha cambiato il modo in cui i droni si connettono, e gli UAV accoppiati prima di quel cambiamento devono essere accoppiati di nuovo una volta. Non si perde nulla: l'UAV mantiene nome e storico, e non serve rimuoverlo in Fleet Manager.

1. In UAVcast-Pro sul drone, apri **Fleet Management** e premi **Disconnect from Fleet**, poi conferma.
2. Premi **Connect to Fleet Manager**. Compare un **Pairing Code** a 8 cifre con un conto alla rovescia.
3. In Fleet Manager, vai su **Fleet → Pair Device**, scegli l'organizzazione e inserisci il codice.

## Verifica 3: il drone ha perso l'accoppiamento

Una reinstallazione con reset del database, **Reset Database** oppure **Disconnect from Fleet**, rimuove l'accoppiamento sul drone, che quindi smette di riportare dati. Riaccoppialo come nella verifica 2. Accoppiarlo nella stessa organizzazione riutilizza la voce UAV esistente.

## Verifica 4: online, ma senza telemetria

Posizione, batteria e modalità di volo provengono dal controllore di volo. Se l'UAV è online ma questi campi sono vuoti, UAVcast-Pro non riesce a sentire il controllore di volo: vedi [Nessun heartbeat MAVLink](https://docs.uavmatrix.com/it/troubleshooting/no-mavlink-heartbeat/).

## Ancora offline?

[Scarica i log](https://docs.uavmatrix.com/it/troubleshooting/collect-logs/) dal drone con **Tutti i Log** selezionato e inviali a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, indicando il nome dell'UAV e l'organizzazione. Altri problemi di Fleet Manager sono trattati in [Risoluzione dei problemi di Fleet Manager](https://docs.uavmatrix.com/it/fleet-manager/troubleshooting/).

Correlati: [Accoppiamento Fleet Manager in UAVcast-Pro](https://docs.uavmatrix.com/it/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/it/troubleshooting/drone-offline-fleet-manager/
