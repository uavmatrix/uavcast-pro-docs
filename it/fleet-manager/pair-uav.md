# Aggiungi il tuo primo drone

> Accoppia un drone UAVcast-Pro alla tua organizzazione Fleet Manager con il codice di accoppiamento a 8 cifre, scegli l'accesso VPN e visualizzalo in tempo reale sulla mappa della flotta.

L'accoppiamento collega un drone che esegue UAVcast-Pro alla tua organizzazione. Dopo l'accoppiamento, il drone mantiene una connessione autenticata con certificato verso Fleet Manager e si riconnette da solo dopo un riavvio o un cambio di rete. Accoppi ogni drone una sola volta e l'operazione richiede circa due minuti.

Lavori con due schede del browser: l'interfaccia web di UAVcast-Pro del drone e Fleet Manager. Tieni aperte entrambe.

## Prima di iniziare

- **UAVcast-Pro installato con una licenza attivata.** UAVcast-Pro rifiuta di avviare l'accoppiamento senza una licenza e mostra **No valid license found. Please activate your license first.** Vedi [Attiva la tua licenza](https://docs.uavmatrix.com/it/get-started/license-activation/).
- **La licenza appartiene a un membro della tua organizzazione.** Fleet Manager confronta l'email del proprietario della licenza nello store UAVmatrix con le email dei tuoi membri. Vedi [Licenze](https://docs.uavmatrix.com/it/fleet-manager/licenses/).
- **Ruolo Owner o Admin** nell'organizzazione. I Viewer non vedono **Pair Device**. Vedi [Ruoli e permessi](https://docs.uavmatrix.com/it/fleet-manager/team/roles-and-permissions/).
- **Connessione Internet sul drone** tramite Ethernet, Wi-Fi o modem cellulare, con HTTPS in uscita (TCP 443) e TCP **8883** aperte. La porta 8883 trasporta la connessione MQTT cifrata verso Fleet Manager.
- **Una versione attuale di UAVcast-Pro 6.** L'accoppiamento parte da **Gestione → Fleet Management** in UAVcast-Pro. Armare e disarmare e la calibrazione pre-volo da Fleet Manager richiedono UAVcast-Pro 6.3.0_rc13 o successiva; Fleet Manager li contrassegna con un badge di versione sui droni più vecchi.

## Accoppia il drone

1. **Ottieni un codice di accoppiamento in UAVcast-Pro.** Apri l'interfaccia web del drone. Nella barra laterale, sotto **Gestione**, seleziona **Fleet Management**, poi **Connect to Fleet Manager**. UAVcast-Pro mostra un **Pairing Code** a 8 cifre, un conto alla rovescia **Expires in** e **Waiting for Manager to confirm pairing...**

   ![Scheda Connect to Fleet Manager di UAVcast-Pro con il pulsante Connect to Fleet Manager](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/fleet--connect.webp)

   *UAVcast-Pro → Fleet Management prima dell'accoppiamento. Selezionando Connect to Fleet Manager compaiono il codice a 8 cifre, il conto alla rovescia Expires in e Waiting for Manager to confirm pairing...*

   > **Il codice è valido per 5 minuti**
   >
   > Se il conto alla rovescia scade prima che tu lo inserisca, seleziona di nuovo **Connect to Fleet Manager**. Digita sempre il codice visualizzato in quel momento: UAVcast-Pro attende solo il codice più recente.

2. **Apri Pair Device in Fleet Manager.** Vai su **Fleet** e seleziona **Pair Device**. Si apre la procedura guidata **Pair UAV**.

3. **Scegli l'organizzazione.** Nel passaggio **Organization** scegli l'organizzazione a cui deve appartenere questo drone e seleziona **Continue**. L'elenco mostra solo le organizzazioni in cui sei Owner o Admin. Se ne hai una sola, Fleet Manager la seleziona e salta questo passaggio.

4. **Inserisci il codice.** Nel passaggio **Pairing Code** digita le 8 cifre e seleziona **Continue**. Fleet Manager verifica il codice e passa a **Confirm Device**.

   ![Procedura guidata Pair UAV sul passaggio Pairing Code con un codice a 8 cifre inserito](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/pair-device--code.webp)

   *Fleet → Pair Device, passaggio Pairing Code, con la barra di avanzamento che mostra Organization completato.*

5. **Conferma il dispositivo.** Controlla i dettagli inviati da UAVcast-Pro: **Name**, **Hostname**, **OS**, **Architecture** e **UAVcast Version**. Assicurati che corrispondano al drone che hai davanti, poi seleziona **Complete Pairing**. Se la tua organizzazione ha la VPN attiva, il pulsante dice **Continue** e il passaggio successivo è la VPN.

   ![Passaggio Confirm Device con nome, hostname, OS, architettura e versione di UAVcast](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/pair-device--confirm.webp)

   *Passaggio Confirm Device: verifica che nome, hostname, OS, architettura e UAVcast Version corrispondano al drone che hai davanti.*

6. **Scegli l'accesso VPN (solo se la VPN è attiva).** Il passaggio **VPN Connection** appare quando l'organizzazione ha la [VPN attiva](https://docs.uavmatrix.com/it/fleet-manager/network/). Con la VPN attiva, le stazioni di terra della rete della tua organizzazione ricevono direttamente il video e la telemetria di questo drone, tramite 4G, Wi-Fi o satellite, senza port forwarding.

   - **Enable VPN for this UAV** è selezionata per impostazione predefinita. UAVcast-Pro si unisce alla VPN della tua organizzazione subito dopo l'accoppiamento.
   - Se il drone è già su una rete Tailscale, Fleet Manager mostra **Existing VPN Connection Detected** con il server e l'IP di quella rete. La casella cambia in **Replace existing VPN with Fleet Manager network** e non è selezionata. Selezionala solo se vuoi che il drone lasci la rete attuale.

   Seleziona **Complete Pairing**.

   ![Passaggio VPN Connection con la casella Enable VPN for this UAV selezionata](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/pair-device--vpn.webp)

   *Passaggio VPN Connection, con i tre vantaggi elencati e Enable VPN for this UAV selezionata.*

   > **Sostituire una VPN può interrompere la sessione SSH**
   >
   > Se sostituisci una connessione Tailscale esistente e la tua sessione SSH o del browser verso il drone passa da quella connessione, la sessione si interrompe. Connettiti al drone tramite la rete locale prima di continuare, oppure usa in seguito il suo nuovo indirizzo VPN.

7. **Assegna un nome al drone.** Compare **Pairing Complete!** con un campo **UAV Name**. Digita un nome riconoscibile dal tuo team sulla mappa, come il numero di registrazione del velivolo oppure Survey-14, e seleziona **Save**. Il nome si sincronizza con UAVcast-Pro quando il drone è online. Seleziona **View UAV** per aprire la sua pagina.

   ![Schermata Pairing Complete con il campo UAV Name e il pulsante View UAV](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/pair-device--complete.webp)

   *Pairing Complete! con il campo UAV Name compilato con un numero di registrazione.*

Nel frattempo UAVcast-Pro, che controlla ogni 5 secondi, riceve il certificato del drone e le impostazioni di connessione (e la chiave VPN, se hai scelto la VPN). La sua pagina Fleet Management passa a **Connected**.

## Verifica la connessione

Il drone compare in **Fleet** e in **Fleet Map** dopo pochi secondi. Il suo badge mostra:

| Badge | Significato |
| --- | --- |
| **PAIRING** | Fleet Manager ha emesso il certificato e attende il primo heartbeat del drone. |
| **ONLINE** | Il drone è connesso. UAVcast-Pro invia un heartbeat ogni 5 secondi. |
| **OFFLINE** | Nessun dato ricevuto per 20 secondi. La scheda mostra quando il drone è stato visto l'ultima volta. |

Se il badge resta su **PAIRING** oppure passa a **OFFLINE**, verifica dal drone che riesca a raggiungere Fleet Manager sulla porta 8883:

```bash
nc -vz fleet-manager.uavmatrix.com 8883
```

Una riga che termina con `succeeded!` significa che la porta è aperta. Qualsiasi altro risultato indica un firewall o un operatore che blocca la porta. Vedi [Drone offline in Fleet Manager](https://docs.uavmatrix.com/it/troubleshooting/drone-offline-fleet-manager/).

## Invia video e telemetria a una stazione di terra

L'accoppiamento non avvia alcun flusso. Per volare da QGroundControl o Mission Planner, [collega una stazione di terra](https://docs.uavmatrix.com/it/fleet-manager/connect-gcs/) alla VPN e aggiungi un'[associazione del flusso (stream binding)](https://docs.uavmatrix.com/it/fleet-manager/network/stream-bindings/). Fleet Manager assegna a ogni associazione un proprio blocco di porte (video, spazio per la telecamera 2 e audio, e telemetria), così più droni possono trasmettere verso la stessa stazione di terra contemporaneamente. Il primo drone usa i valori predefiniti, 5600 e 14550; leggi quelli degli altri droni dalla colonna **Ports** dell'associazione.

## Se l'accoppiamento non riesce

| Messaggio | Causa e soluzione |
| --- | --- |
| **Invalid pairing code** | Il codice non esiste. Controlla le cifre oppure ottieni un nuovo codice in UAVcast-Pro. |
| **This pairing code has expired** | Sono passati più di 5 minuti. Seleziona di nuovo **Connect to Fleet Manager** in UAVcast-Pro. |
| **This pairing code has already been used** | Il codice è già stato utilizzato, da te o da un collega. Controlla il drone in **Fleet** prima di accoppiarlo di nuovo. |
| **License is not owned by any member of this organization** | La licenza del drone appartiene a un'email che non è un membro. Invita quella persona, oppure chiedi al supporto di aggiungere l'email al tuo account. Vedi [Licenze](https://docs.uavmatrix.com/it/fleet-manager/licenses/#licenses-bought-with-another-email). |
| **License has expired** / **License has been refunded** | La licenza del drone non è più attiva. Rinnovala oppure attivane un'altra in UAVcast-Pro. |
| **This UAV is already paired to an organization** | Il drone appartiene a un'altra organizzazione e va prima rimosso da lì. Vedi [Rimuovi o trasferisci un drone](https://docs.uavmatrix.com/it/fleet-manager/fleet/remove-or-transfer/). |
| **Too many attempts. Please wait a minute and try again.** | Più di 10 verifiche del codice o 5 tentativi di accoppiamento in un minuto. Attendi un minuto. |

Altre cause e controlli: [Codice di accoppiamento non valido o scaduto](https://docs.uavmatrix.com/it/troubleshooting/pairing-code-invalid/).

## Accoppiare di nuovo lo stesso drone

Accoppiare di nuovo un drone nella **stessa** organizzazione mantiene il suo nome, la cronologia della telemetria e le associazioni dei flussi, e rinnova soltanto il suo certificato. Ti serve dopo aver selezionato **Disconnect from Fleet** in UAVcast-Pro, oppure quando Fleet Manager mostra **Re-pair required**. Vedi [Riaccoppia un drone](https://docs.uavmatrix.com/it/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone).

Source: https://docs.uavmatrix.com/it/fleet-manager/pair-uav/
