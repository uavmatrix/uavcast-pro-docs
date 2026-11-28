# Risoluzione dei problemi di Fleet Manager

> Risolvi i problemi comuni di Fleet Manager: errori di accoppiamento, droni bloccati su PAIRING o offline, Re-pair required, flussi mancanti e comandi non riusciti.

Parti da ciò che vedi. Ogni riga rimanda alla soluzione, qui sotto oppure nelle pagine comuni di [risoluzione dei problemi](https://docs.uavmatrix.com/it/troubleshooting/).

| Cosa vedi | Causa probabile | Vai a |
| --- | --- | --- |
| **Invalid pairing code**, **This pairing code has expired**, **This pairing code has already been used** | Errore di battitura, codice più vecchio di 5 minuti, oppure già utilizzato | [Codice di accoppiamento non valido o scaduto](https://docs.uavmatrix.com/it/troubleshooting/pairing-code-invalid/) |
| **License is not owned by any member of this organization** | Licenza acquistata con un'email che non è un membro | [Licenze acquistate con un'altra email](https://docs.uavmatrix.com/it/fleet-manager/licenses/#licenses-bought-with-another-email) |
| **This UAV is already paired to an organization** | Il drone appartiene ancora a un'altra organizzazione | [Sposta un drone](https://docs.uavmatrix.com/it/fleet-manager/fleet/remove-or-transfer/#move-a-drone-to-another-organization) |
| UAVcast-Pro mostra **No valid license found** o **Invalid or inactive license** | Licenza non attivata sul drone, scaduta o rimborsata | [La licenza non si attiva](https://docs.uavmatrix.com/it/troubleshooting/license-activation-failed/) |
| Nessun pulsante **Pair Device** | Sei un Viewer | [Ruoli e permessi](https://docs.uavmatrix.com/it/fleet-manager/team/roles-and-permissions/) |
| Drone bloccato su **PAIRING** | Il drone non si è ancora connesso al broker | [Bloccato su PAIRING](https://docs.uavmatrix.com/it/fleet-manager/troubleshooting/#stuck-on-pairing) |
| Drone **OFFLINE** | Nessuna connessione Internet, porta 8883 bloccata, oppure UAVcast-Pro non in esecuzione | [Drone offline in Fleet Manager](https://docs.uavmatrix.com/it/troubleshooting/drone-offline-fleet-manager/) |
| **Re-pair required** | Vecchio certificato di connessione | [Riaccoppia un drone](https://docs.uavmatrix.com/it/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone) |
| **NO MAVLINK** sulla mappa | UAVcast-Pro non riceve dati dal controllore di volo | [Nessun heartbeat MAVLink](https://docs.uavmatrix.com/it/troubleshooting/no-mavlink-heartbeat/) |
| Associazione non riuscita: **Failed to send configuration to drone - it may be offline** | Drone offline, oppure non ha confermato entro 15 s | [L'associazione non si salva](https://docs.uavmatrix.com/it/fleet-manager/troubleshooting/#binding-wont-save) |
| L'associazione esiste, ma nella stazione di terra non arrivano telemetria o video | Firewall, porta errata oppure flusso disattivato | [Nessun flusso nella stazione di terra](https://docs.uavmatrix.com/it/fleet-manager/troubleshooting/#no-stream-at-the-ground-station) |
| La stazione di terra è entrata nella VPN ma non raggiunge il drone | Tipo di dispositivo, drone non sulla VPN, oppure UDP bloccato | [VPN connessa ma non raggiunge il drone](https://docs.uavmatrix.com/it/troubleshooting/vpn-cant-reach-drone/) |
| I comandi non funzionano, **UAVcast Upgrade Required** | Drone offline, ruolo Viewer, oppure UAVcast-Pro non aggiornato | [I comandi non riescono](https://docs.uavmatrix.com/it/fleet-manager/troubleshooting/#commands-fail) |
| **Request timed out. UAVcast may be unreachable.** quando apri UAVcast-Pro da remoto | Collegamento lento attraverso il proxy | [Il proxy è lento o incompleto](https://docs.uavmatrix.com/it/fleet-manager/troubleshooting/#proxy-is-slow-or-incomplete) |
| L'email di invito non arriva | Filtro antispam, oppure indirizzo errato | [Invito non ricevuto](https://docs.uavmatrix.com/it/fleet-manager/troubleshooting/#invitation-not-received) |

## Bloccato su PAIRING

**PAIRING** significa che Fleet Manager ha accettato il codice e attende il primo heartbeat del drone tramite MQTT.

1. Guarda la pagina **Fleet Management** di UAVcast-Pro. Se mostra ancora **Waiting for Manager to confirm pairing...**, il drone non ha recuperato il certificato. Verifica che abbia una connessione Internet.

2. Verifica che il drone possa inviare TCP 8883 in uscita:

   ```bash
   nc -vz fleet-manager.uavmatrix.com 8883
   ```

3. Se hai inserito un codice **più vecchio** dello stesso drone (ad esempio dopo aver selezionato **Connect to Fleet Manager** due volte), UAVcast-Pro non lo sta aspettando. Seleziona **Disconnect from Fleet** se è visibile, ottieni un nuovo codice e accoppia di nuovo nella stessa organizzazione. Il drone conserva il suo record.

Il drone ha 15 minuti dalla scadenza del codice per recuperare il certificato. Dopo, accoppia di nuovo.

## L'associazione non si salva

Fleet Manager salva un'associazione solo dopo che il drone l'ha confermata. Verifica che il drone mostri **ONLINE**, poi riprova. Se il drone è online ma le associazioni continuano a fallire, potrebbe non essere sulla VPN: controlla in **Network → Connected Devices** che sia presente con tipo **UAV**, oppure usa **Push to Drone**.

## Nessun flusso nella stazione di terra

1. In **Network → Stream Bindings**, verifica che **Video** e **Telemetry** siano attivi e annota le **Ports**.
2. Verifica che il software della stazione di terra ascolti esattamente su quelle porte. Solo il primo drone su un laptop usa 5600 / 14550; ogni altro drone ha le proprie porte.
3. Consenti il traffico UDP in ingresso su quelle porte nel firewall del laptop. Su Windows, consenti QGroundControl o Mission Planner sulle reti **Private** e **Public**.
4. Esegui `tailscale status` sul laptop e verifica che il drone sia nell'elenco.

Maggiori dettagli: [Nessuna telemetria nella stazione di terra](https://docs.uavmatrix.com/it/troubleshooting/no-telemetry-in-gcs/) e [Nessun video nella stazione di terra](https://docs.uavmatrix.com/it/troubleshooting/no-video-in-gcs/).

## I comandi non riescono

- Il drone deve essere **ONLINE**.
- Solo Owner e Admin possono inviare comandi. I Viewer non vedono i pulsanti dei comandi, e il server rifiuta i comandi che inviano.
- Armare, disarmare e la calibrazione pre-volo richiedono UAVcast-Pro 6.3.0_rc13 o successiva. [Aggiorna UAVcast-Pro](https://docs.uavmatrix.com/it/get-started/updating/).
- Il controllore di volo può rifiutare un comando, ad esempio l'armamento con controlli pre-armo non superati. Leggi il suo messaggio nel popup sulla mappa o nella scheda **Logs**.

## Il proxy è lento o incompleto

**Open via Proxy** trasferisce ogni richiesta di pagina attraverso il collegamento del drone, con 30 secondi per richiesta, e non supporta le funzioni in tempo reale (WebSocket). Su un collegamento cellulare debole, attendi che la pagina finisca di caricarsi, oppure entra nella VPN e usa **Open via VPN**. Vedi [Apri UAVcast-Pro da remoto](https://docs.uavmatrix.com/it/fleet-manager/fleet/remote-uavcast/).

## Invito non ricevuto

Chiedi alla persona di controllare la posta indesiderata (spam). In **Team**, controlla l'email in **Pending Invitations**. Se è sbagliata, **revoca** l'invito e inviane uno nuovo. Gli inviti scadono dopo 7 giorni.

## Ancora bloccato?

Apri un ticket dal pulsante di supporto allegando uno screenshot, oppure scrivi a [support@uavmatrix.com](mailto:support@uavmatrix.com). Includi il nome del drone e il suo ID dispositivo (nella sua pagina UAV). Invia via email il pacchetto di log di UAVcast-Pro (un ZIP) a [support@uavmatrix.com](mailto:support@uavmatrix.com) con il numero del ticket, dato che i ticket accettano solo immagini. Vedi [Supporto](https://docs.uavmatrix.com/it/fleet-manager/support/) e [Raccogli i log](https://docs.uavmatrix.com/it/troubleshooting/collect-logs/).

Source: https://docs.uavmatrix.com/it/fleet-manager/troubleshooting/
