# Accoppia con Fleet Manager

> Collega un drone con UAVcast-Pro a UAVmatrix Fleet Manager: ottieni il codice di accoppiamento sul drone, inseriscilo in Fleet Manager, verifica la connessione, rinomina o disaccoppia.

L'accoppiamento collega un drone con UAVcast-Pro alla tua organizzazione in [UAVmatrix Fleet Manager](https://docs.uavmatrix.com/it/fleet-manager/), la dashboard cloud della tua flotta. Una volta accoppiato, il drone mantiene una connessione cifrata con autenticazione tramite certificato verso Fleet Manager e si ricollega da solo dopo un riavvio o un cambio di rete. Avvii l'accoppiamento sul drone e lo completi in Fleet Manager. Richiede circa due minuti.

## Prima di iniziare

- UAVcast-Pro con una **licenza attivata** sul drone. Senza licenza l'accoppiamento viene rifiutato (*Nessuna licenza valida trovata. Attiva prima la tua licenza.*).
- Un utente **Admin** in UAVcast-Pro. La voce **Gestione → Fleet Management** è nascosta per gli utenti Read Only.
- Un account Fleet Manager con il ruolo **Owner** o **Admin** nell'organizzazione. La licenza del drone deve appartenere a un membro di quell'organizzazione.
- Connessione internet sul drone, con la porta TCP **8883** in uscita (MQTT su TLS) e HTTPS (443) consentiti.

## Accoppia il drone

1. Nell'interfaccia web del drone, vai su **Gestione → Fleet Management**.
2. Seleziona **Connect to Fleet Manager**. Il drone chiede a Fleet Manager un codice e mostra un **Pairing Code** con il conto alla rovescia **Expires in**, poi *Waiting for Manager to confirm pairing...*.
3. In un'altra scheda, accedi a [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) e vai su **Fleet → Pair Device**.
4. Inserisci il codice mostrato dal drone e verifica che i dettagli del dispositivo (hostname, architettura, versione di UAVcast-Pro) corrispondano al drone che hai davanti.
5. Completa i passaggi in Fleet Manager (scelta della VPN e nome).
6. Sul drone, la pagina passa a **Fleet Connection** con stato **Connected**.

![Scheda Connect to Fleet Manager con il pulsante Connect to Fleet Manager](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/fleet--connect.webp)

*Gestione → Fleet Management su un drone non ancora accoppiato. Selezionando Connect to Fleet Manager, la scheda viene sostituita dal Pairing Code a 8 cifre con il conto alla rovescia Expires in.*

> **Il codice è valido per 5 minuti**
>
> Se scade prima che tu lo inserisca, seleziona di nuovo **Connect to Fleet Manager** per ottenerne uno nuovo.

La parte di Fleet Manager, incluse le organizzazioni, la VPN e cosa fare con il drone una volta nella flotta, è descritta in [Aggiungi il primo drone a Fleet Manager](https://docs.uavmatrix.com/it/fleet-manager/pair-uav/).

## Dopo l'accoppiamento

La scheda **Fleet Connection** mostra:

| Campo | Significato |
| --- | --- |
| **Connected** / **Disconnected** | Se il drone sta comunicando con Fleet Manager in questo momento. |
| **Device Name** | Il nome mostrato in Fleet Manager. Modificalo qui oppure in Fleet Manager. *Managed by Fleet Manager* significa che il nome è impostato lì. |
| **Hostname**, **Device ID** | Come Fleet Manager identifica questo drone. |
| **Manager URL** | L'istanza di Fleet Manager con cui il drone è accoppiato. |
| **Last Connected** | Quando il drone ha raggiunto Fleet Manager l'ultima volta. |

Fleet Manager riceve dal drone la telemetria live (posizione, batteria, GPS, stato di volo), lo stato di sistema di UAVcast-Pro e il controllo remoto dei servizi. Le destinazioni delle stazioni di controllo a terra che Fleet Manager crea tramite associazioni di flusso compaiono nelle [Stazioni di Controllo a Terra](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/) con un'icona a nuvola.

Per collegare in seguito il drone alla VPN della tua organizzazione, usa la scheda **Fleet Manager** in [Rete Privata Virtuale](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/vpn/).

## Disaccoppia

1. Vai su **Gestione → Fleet Management**.
2. Seleziona **Disconnect from Fleet** e conferma.

Questo rimuove l'accoppiamento e i certificati del drone. Per usare di nuovo il drone in Fleet Manager, accoppialo con un nuovo codice. Rimuovi anche il drone dalla tua flotta in Fleet Manager, così non resta in elenco come offline.

## Risoluzione dei problemi

| Sintomo | Verifica |
| --- | --- |
| *Nessuna licenza valida trovata. Attiva prima la tua licenza.* | Attiva la licenza in **Applicazione**. Vedi [Licenza e attivazione](https://docs.uavmatrix.com/it/get-started/license-activation/). |
| Fleet Manager indica che la licenza non appartiene a un membro dell'organizzazione | La licenza è stata acquistata con un'email che non è membro dell'organizzazione. Aggiungi quell'email in Fleet Manager (vedi [Licenze](https://docs.uavmatrix.com/it/fleet-manager/licenses/)), oppure invita quell'account nell'organizzazione. |
| Codice scaduto | Seleziona di nuovo **Connect to Fleet Manager**. |
| Accoppiato, ma lo stato resta **Disconnected** | Il drone non riesce a raggiungere Fleet Manager sulla porta TCP 8883. Alcune reti la bloccano. Controlla la connessione internet del drone e il firewall. |

Altro aiuto: [Codice di accoppiamento non valido](https://docs.uavmatrix.com/it/troubleshooting/pairing-code-invalid/) e [Drone offline in Fleet Manager](https://docs.uavmatrix.com/it/troubleshooting/drone-offline-fleet-manager/).

Source: https://docs.uavmatrix.com/it/uavcast-pro/fleet-pairing/
