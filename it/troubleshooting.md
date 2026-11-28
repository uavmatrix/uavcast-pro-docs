# Risoluzione dei problemi

> Risolvi assenza di video, nessun heartbeat MAVLink, problemi di modem e VPN, errori di licenza e accoppiamento con Fleet Manager. Parti da ciò che vedi e segui le verifiche.

Parti dal sintomo. Ogni pagina qui sotto elenca le cause probabili nell'ordine in cui si presentano sul campo, con verifiche numerate che usano le etichette esatte delle interfacce di UAVcast-Pro e Fleet Manager.

> **Controlla prima la dashboard**
>
> Apri **Dashboard** in UAVcast-Pro. La scheda di stato riassume il drone in una riga (**Tutti i sistemi normali**, oppure il numero di problemi e avvisi) e ha una riga ciascuna per **Controllore di volo**, **Stazione di terra**, **Cellulare**, **VPN**, **Correzioni RTK**, **Video** e **Alimentazione**. La prima riga rossa è di solito il punto da cui partire.

![Dashboard di UAVcast-Pro con la scheda di stato che mostra 2 problemi: GPS senza fix e VPN non connessa](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/dashboard.webp)

*Dashboard → scheda di stato. Le righe con un problema diventano rosse e vengono conteggiate nel badge dei problemi, qui GPS (nessun fix) e VPN (non connessa).*

## Trova il tuo sintomo

| Cosa vedi | Causa probabile | Vai a |
| --- | --- | --- |
| La telemetria funziona, ma l'area video in QGroundControl o Mission Planner è nera | **Attiva Video** è disattivato per quella stazione di terra, IP sbagliato, o un firewall | [Nessun video nella stazione di terra](https://docs.uavmatrix.com/it/troubleshooting/no-video-in-gcs/) |
| Il video si blocca, mostra macchie grigie o è in ritardo di secondi | Bitrate troppo alto per il collegamento, o keyframe troppo distanti | [Video a scatti o in ritardo](https://docs.uavmatrix.com/it/troubleshooting/choppy-or-delayed-video/) |
| La pagina Controllore di Volo mostra **No heartbeat**, **Waiting for device** o **Detecting baud rate** | Cavo, cablaggio, porta o baud rate | [Nessun heartbeat MAVLink](https://docs.uavmatrix.com/it/troubleshooting/no-mavlink-heartbeat/) |
| UAVcast-Pro mostra il controllore di volo come **Connesso**, ma la stazione di terra (GCS) attende una connessione | La telemetria non viene inviata alla GCS, oppure la GCS non è in ascolto | [Nessuna telemetria nella stazione di terra](https://docs.uavmatrix.com/it/troubleshooting/no-telemetry-in-gcs/) |
| **No cameras available** in **Seleziona Telecamera** | Stack della telecamera CSI mancante, cavo a nastro, oppure telecamera USB non vista | [Telecamera non rilevata](https://docs.uavmatrix.com/it/troubleshooting/camera-not-detected/) |
| **Invalid license key**, **Maximum activations reached** o **License activation failed** | Chiave sbagliata, nessuno slot dispositivo libero, oppure nessuna connessione internet | [La licenza non si attiva](https://docs.uavmatrix.com/it/troubleshooting/license-activation-failed/) |
| Il modem mostra un segnale e un operatore, ma non si carica nulla | APN, priorità di rete o dati della SIM | [Modem connesso, ma senza internet](https://docs.uavmatrix.com/it/troubleshooting/modem-no-internet/) |
| Il browser non raggiunge `http://<device-ip>/` dopo l'installazione | Indirizzo sbagliato, servizio non in esecuzione, o porta cambiata | [L'interfaccia web non si apre](https://docs.uavmatrix.com/it/troubleshooting/web-interface-wont-open/) |
| L'installer si ferma con un errore | SO a 32 bit, nessuna connessione internet, o poco spazio su disco | [Installazione non riuscita](https://docs.uavmatrix.com/it/troubleshooting/installation-fails/) |
| ZeroTier o Tailscale risultano connessi, ma non riesci a fare ping o ad aprire il drone | Membro non autorizzato, rete sbagliata, oppure GCS non sulla VPN | [VPN connessa, ma non raggiunge il drone](https://docs.uavmatrix.com/it/troubleshooting/vpn-cant-reach-drone/) |
| Lo stato NTRIP non è **Trasmissione correzioni**, oppure il fix non raggiunge mai **RTK Fixed** | Impostazioni del caster, GGA, oppure un ricevitore che non supporta RTK | [Correzioni RTK non arrivano](https://docs.uavmatrix.com/it/troubleshooting/rtk-corrections-not-arriving/) |
| **Voltage too low - use a stronger power supply** o **Slowed down (heat or power)** | Alimentatore o cavo deboli, surriscaldamento | [Sottotensione e throttling](https://docs.uavmatrix.com/it/troubleshooting/undervoltage-and-throttling/) |
| Il drone è **Offline** in Fleet Manager | Il drone non ha internet, porta MQTT bloccata, oppure è richiesto un nuovo accoppiamento | [Drone offline in Fleet Manager](https://docs.uavmatrix.com/it/troubleshooting/drone-offline-fleet-manager/) |
| **Invalid pairing code**, **This pairing code has expired** o **License is not owned by any member of this organization** | Codice digitato male o troppo vecchio, oppure licenza di proprietà di qualcuno esterno all'organizzazione | [Codice di accoppiamento non valido o scaduto](https://docs.uavmatrix.com/it/troubleshooting/pairing-code-invalid/) |

## Ancora bloccato?

1. [Raccogli i file di log](https://docs.uavmatrix.com/it/troubleshooting/collect-logs/). Il download include uno snapshot `diagnostics.txt` delle tue impostazioni e dell'hardware, così il supporto non deve chiederli.
2. Inviali a **[support@uavmatrix.com](mailto:support@uavmatrix.com)** indicando la versione di UAVcast-Pro, l'hardware che usi e cosa hai già provato. Puoi anche chiedere sul [Discord di UAVmatrix](https://discord.gg/xwqMTXh).

Risposte brevi alle domande più comuni sono nelle [FAQ](https://docs.uavmatrix.com/it/troubleshooting/faq/).

Source: https://docs.uavmatrix.com/it/troubleshooting/
