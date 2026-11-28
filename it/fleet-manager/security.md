# Sicurezza e privacy

> Come Fleet Manager protegge i droni con certificati TLS per singolo drone, isola le organizzazioni su VPN WireGuard private, applica i ruoli e archivia i dati.

Questa pagina è rivolta alle persone che devono approvare Fleet Manager: responsabili della sicurezza, dell'IT e delle operazioni.

## Connessione del drone

- **Certificati client per singolo drone.** Durante l'accoppiamento, Fleet Manager emette a ogni drone il proprio certificato client TLS. Il drone lo usa per connettersi al broker MQTT di Fleet Manager sulla porta **8883**, l'unico listener pubblico del broker. Non esistono password condivise.
- **Ogni drone può usare solo i propri topic.** L'identità del certificato è l'ID dispositivo del drone, e il broker permette a un drone di pubblicare e sottoscrivere solo sotto i propri topic. Un drone compromesso non può leggere né comandare un altro.
- **Solo connessioni in uscita.** I droni si connettono verso Fleet Manager. Non apri porte in ingresso sul drone o sulla sua rete.
- **Finestra di accoppiamento breve.** I codici di accoppiamento sono 8 cifre casuali, validi 5 minuti e utilizzabili una sola volta. Le verifiche dei codici sono limitate (10 verifiche e 5 tentativi di accoppiamento per utente al minuto). Il certificato e la chiave VPN del drone vengono consegnati solo fino al primo collegamento del drone, e mai oltre 15 minuti dopo la scadenza del codice.
- **Aggiornamenti dei certificati.** Quando Fleet Manager rafforza lo schema dei certificati, i droni più vecchi vengono contrassegnati con **Re-pair required** invece di essere considerati attendibili senza controlli.

## VPN privata per organizzazione

- Ogni organizzazione ottiene una propria rete sul server VPN di Fleet Manager (`vpn-connect.uavmatrix.com`), un server di controllo self-hosted compatibile con Tailscale. Il traffico tra i dispositivi è cifrato end-to-end con WireGuard. I dispositivi di un'organizzazione non possono vedere quelli di un'altra: il server VPN applica una regola di accesso separata per ogni organizzazione. Se Fleet Manager non riesce a confermare questo isolamento, nasconde la chiave di autenticazione (auth key) invece di fornirla, con il messaggio *VPN isolation could not be verified, so the auth key is hidden.*
- Per unirsi serve una chiave di autenticazione (auth key) che possono creare solo Owner e Admin. Le chiavi scadono dopo 90 giorni. I droni ricevono la chiave automaticamente durante l'accoppiamento o con **Push to Drone**, e solo con il consenso di un Owner o di un Admin.
- Rimuovere un dispositivo in **Network** lo elimina anche dal server VPN.

## Controllo degli accessi

- L'accesso avviene tramite il tuo account UAVmatrix. Fleet Manager non memorizza password.
- Tre ruoli per organizzazione (Owner, Admin, Viewer), applicati sul server per ogni azione. Vedi [Ruoli e permessi](https://docs.uavmatrix.com/it/fleet-manager/team/roles-and-permissions/).
- Il terminale SSH e l'accesso remoto a UAVcast-Pro sono limitati a Owner e Admin.
- I link di invito sono cifrati, possono essere usati una sola volta e scadono dopo 7 giorni.
- UAVmatrix può sospendere account o organizzazioni che violano i termini. Gli utenti sospesi vedono **Account Suspended** o **Organization Suspended**, con il motivo e un contatto di supporto.

## Dati conservati da Fleet Manager

| Dati | Conservazione |
| --- | --- |
| Telemetria (posizione, altitudine, velocità, rotta, batteria, modalità, stato di armamento, GPS, stato dei servizi), una volta al secondo | Secondo l'impostazione di conservazione dell'organizzazione: da 7 giorni a 1 anno (predefinito 1 anno). Compressa dopo 7 giorni. Eliminata quando il drone viene rimosso. |
| Nomi e intervalli di tempo dei voli salvati | Fino all'eliminazione, oppure fino alla rimozione del drone |
| Comandi inviati ai droni, con indicazione di chi li ha inviati | Fino alla rimozione del drone |
| Registro attività (chi ha accoppiato, rimosso, invitato o modificato i ruoli) | Conservato quando droni o membri vengono rimossi |
| Missioni | Fino all'eliminazione, oppure fino all'eliminazione dell'organizzazione |
| Ticket di supporto e relativi screenshot | Conservati per il supporto |

Fleet Manager non memorizza video. Video e MAVLink verso le stazioni di terra viaggiano sulla VPN tra i tuoi dispositivi, e Fleet Manager non li registra.

Il terminale e il proxy remoto di UAVcast-Pro passano attraverso la connessione cifrata di Fleet Manager verso il drone; il loro contenuto non viene memorizzato.

Il traffico VPN passa direttamente tra i tuoi dispositivi quando le reti lo consentono. Quando non lo consentono (ad esempio dietro un NAT restrittivo o su una rete mobile), passa dai server relay pubblici di Tailscale (DERP). In entrambi i casi il traffico resta cifrato end-to-end con WireGuard; UAVmatrix non gestisce alcun relay.

## Terze parti

- **Mappe:** i tile delle mappe provengono da Esri; il livello dello spazio aereo da OpenAIP, tramite Fleet Manager.
- **FleetBot:** i messaggi della chat vengono inviati ad Anthropic per generare le risposte. Non viene inviato nient'altro della tua organizzazione. Vedi [Supporto e FleetBot](https://docs.uavmatrix.com/it/fleet-manager/support/#ask-fleetbot).
- **Analisi di prodotto e segnalazioni di errore:** Fleet Manager usa PostHog per le analisi di utilizzo, ad esempio quali pagine vengono aperte e quali pulsanti vengono usati, e per segnalare gli errori dell'app.

Source: https://docs.uavmatrix.com/it/fleet-manager/security/
