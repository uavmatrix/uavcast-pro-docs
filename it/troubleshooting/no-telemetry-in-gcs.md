# Nessuna telemetria in QGroundControl o Mission Planner

> Controllore di volo collegato in UAVcast-Pro ma QGroundControl o Mission Planner continuano ad aspettare? Controlla Attiva Telemetria, l'IP, UDP 14550 e la VPN.

UAVcast-Pro mostra il controllore di volo come **Connesso**, ma QGroundControl indica *In attesa della connessione del velivolo* oppure Mission Planner va in timeout con *Nessun pacchetto heartbeat ricevuto*. Il drone sente il controllore di volo; la telemetria semplicemente non arriva alla stazione di terra.

Se UAVcast-Pro stesso mostra **No heartbeat**, risolvi prima questo problema: [Nessun heartbeat MAVLink](https://docs.uavmatrix.com/it/troubleshooting/no-mavlink-heartbeat/).

| Cosa vedi | Causa probabile | Inizia da |
| --- | --- | --- |
| Dashboard: Stazione di terra Nessuna configurata, oppure Non in invio | Nessuna destinazione, oppure Attiva Telemetria è disattivato | [Controllo 1](https://docs.uavmatrix.com/it/troubleshooting/no-telemetry-in-gcs/#check-1) |
| La dashboard indica Invio in corso, ma la stazione di terra non vede nulla | IP errato, firewall, oppure la stazione di terra ascolta su un’altra porta | [Controllo 2](https://docs.uavmatrix.com/it/troubleshooting/no-telemetry-in-gcs/#check-2) |
| Funzionava in Wi-Fi, ma non con il 4G | La destinazione è un IP locale invece dell’IP della VPN | [Controllo 3](https://docs.uavmatrix.com/it/troubleshooting/no-telemetry-in-gcs/#check-3) |
| Si collegava tramite TCP 5760, ha smesso di funzionare dopo un aggiornamento | TCP 5760 è stato chiuso nella versione 6.5.0 | [Controllo 4](https://docs.uavmatrix.com/it/troubleshooting/no-telemetry-in-gcs/#check-4) |
| La telemetria si vede, ma comandi e cambi di modalità non hanno effetto | Sola lettura è attiva per questa destinazione | [Controllo 5](https://docs.uavmatrix.com/it/troubleshooting/no-telemetry-in-gcs/#check-5) |

## Controllo 1: la telemetria viene inviata?

1. Apri **Dashboard** e leggi la riga **Stazione di terra** nella scheda di stato.

   - **Nessuna configurata**: non esiste alcuna destinazione. Aggiungila al passaggio 2.
   - **Non in invio**: una destinazione esiste, ma non esce nulla.
   - **Invio a … · n pacchetti/s**: la telemetria lascia il drone. Vai al controllo 2.

2. Vai su **Stazioni di Controllo a Terra**. Premi **Aggiungi Destinazione** se l'elenco è vuoto.

3. Nella scheda del tuo computer, attiva **Attiva Endpoint** e **Attiva Telemetria**. Su una nuova destinazione video e telemetria sono entrambi disattivati.

4. Inserisci l'indirizzo IPv4 del computer in **IP o Host di Destinazione** e lascia **Porta Telemetria** su `14550`.

![Sezione telemetria di una destinazione con Attiva Telemetria attivato e Read Only disattivato](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/ground-control--telemetry-enabled.webp)

*Stazioni di Controllo a Terra: una destinazione con Attiva Telemetria attivato.*

> **Gli indirizzi non validi vengono ignorati**
>
> UAVcast-Pro accetta solo indirizzi IPv4 come `192.168.1.10`. Se provi a salvare un hostname, ricevi il messaggio *Inserisci un indirizzo IPv4 valido, per esempio 192.168.1.10.* Un indirizzo mancante o non valido viene escluso dal router della telemetria, e la **Verifica connessione** nella pagina Controllore di Volo lo elenca.

## Controllo 2: assicurati che la stazione di terra sia in ascolto

UAVcast-Pro invia MAVLink tramite UDP all'indirizzo e alla porta impostati. La stazione di terra deve essere in ascolto su quella porta.

- **QGroundControl** ascolta su UDP 14550 per impostazione predefinita. Se hai cambiato **Porta Telemetria**, aggiungi un comm link UDP sulla stessa porta in **Impostazioni Applicazione → Comm Links**.
- **Mission Planner**: scegli **UDP** nel menu a tendina in alto a destra, premi **Connetti** e accetta la porta `14550`.
- Su una porta può essere in ascolto un solo programma. Chiudi MAVProxy, un secondo QGroundControl o un altro strumento che potrebbe occupare la 14550.
- Consenti l'UDP 14550 in ingresso nel firewall. I comandi sono nel [Controllo 3 di Nessun video](https://docs.uavmatrix.com/it/troubleshooting/no-video-in-gcs/#check-3).

## Controllo 3: usa l'indirizzo VPN tramite cellulare

Con il 4G il drone non può raggiungere un indirizzo locale come `192.168.1.20`. Inserisci l'indirizzo VPN del tuo computer (VPN di Fleet Manager, Tailscale o ZeroTier) in **IP o Host di Destinazione**.

Dal computer, fai un ping all'indirizzo VPN del drone. Se il ping fallisce, il problema è la VPN: vedi [VPN connessa ma nessun accesso al drone](https://docs.uavmatrix.com/it/troubleshooting/vpn-cant-reach-drone/).

## Controllo 4: TCP 5760 non funziona più

Dalla versione 6.5.0 il router della telemetria non accetta connessioni TCP sulla porta 5760, quindi arrivano dati solo alle stazioni di terra che aggiungi e attivi. Se collegavi Mission Planner tramite TCP 5760, aggiungi il tuo computer come destinazione e collegati tramite UDP.

## Controllo 5: i comandi vengono ignorati

Se la telemetria si vede ma armamento, cambi di modalità o caricamenti di missione non fanno nulla, controlla **Read Only** su quella destinazione. Read Only blocca tutto ciò che modificherebbe il velivolo (comandi, cambi di modalità, scritture di parametri e missioni), quindi la stazione di terra può solo osservare. Vale a partire da UAVcast-Pro 6.5.3; nelle versioni precedenti, Read Only non blocca le scritture dei parametri. Alcune stazioni di terra mostrano avvisi in questa modalità perché alcune loro richieste restano senza risposta.

## Ancora nulla?

[Scarica i log](https://docs.uavmatrix.com/it/troubleshooting/collect-logs/) con **Mavlink Manager** selezionato e inviali a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**. Indica quale stazione di terra usi e il suo indirizzo IP.

Correlati: [Stazioni di Controllo a Terra](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/) · [Porte e protocolli](https://docs.uavmatrix.com/it/reference/ports-and-protocols/)

Source: https://docs.uavmatrix.com/it/troubleshooting/no-telemetry-in-gcs/
