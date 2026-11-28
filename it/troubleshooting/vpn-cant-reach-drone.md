# VPN connessa ma nessun accesso al drone

> VPN di Fleet Manager, Tailscale o ZeroTier dice connesso ma non puoi fare ping al drone? Controlla l'autorizzazione, la rete o tailnet, internet e l'IP della stazione di terra.

Sia il drone sia il tuo laptop dichiarano di essere sulla VPN, ma `ping` all'indirizzo VPN del drone va in timeout, l'interfaccia web non si apre tramite la VPN, oppure telemetria e video non arrivano.

| Cosa vedi | Causa probabile | Inizia da |
| --- | --- | --- |
| La rete ZeroTier mostra ACCESS_DENIED, oppure nessun indirizzo IP | Il drone non è autorizzato sulla rete | [Controllo 1](https://docs.uavmatrix.com/it/troubleshooting/vpn-cant-reach-drone/#check-1) |
| Il drone va bene, il laptop non ottiene indirizzo o ne ottiene uno errato | Il laptop è entrato in un’altra rete o tailnet | [Controllo 2](https://docs.uavmatrix.com/it/troubleshooting/vpn-cant-reach-drone/#check-2) |
| Tailscale funzionava per settimane, poi si è fermato | La chiave del dispositivo è scaduta | [Controllo 3](https://docs.uavmatrix.com/it/troubleshooting/vpn-cant-reach-drone/#check-3) |
| La VPN sul drone non si connette mai sul campo | Il drone non ha internet tramite il modem | [Controllo 4](https://docs.uavmatrix.com/it/troubleshooting/vpn-cant-reach-drone/#check-4) |
| Il ping funziona, ma non arrivano telemetria o video | La destinazione della stazione di terra usa l’IP sbagliato | [Controllo 5](https://docs.uavmatrix.com/it/troubleshooting/vpn-cant-reach-drone/#check-5) |

## Controllo 1: autorizza il drone sulla rete

**ZeroTier:**

1. In UAVcast-Pro, apri **Rete Privata Virtuale**. Controlla che **Attiva VPN** sia **Sì**, che **Servizi** sia **ZeroTier** e che **ID Rete** corrisponda a quello del tuo controller ZeroTier.
2. Guarda la tua rete in **Reti Connesse**. Se il suo badge di stato indica **ACCESS_DENIED**, il drone è entrato ma non è autorizzato.
3. Nel tuo controller ZeroTier, apri la rete e autorizza il membro con l'ID nodo del drone.
4. Torna in UAVcast-Pro e attendi che la rete mostri lo stato `OK` e un indirizzo IP. Quello è l'indirizzo da usare dal laptop.

Su una rete ZeroTier privata, ogni dispositivo che entra (drone, laptop, tablet) deve essere autorizzato una volta nel controller prima di ottenere un indirizzo. (Anche le reti UAVnet sono private; UAVnet è in dismissione, quindi passa alla VPN di Fleet Manager.)

**Tailscale:** il drone mostra **Connesso** con un **Indirizzo IPv4** (100.x.y.z) quando è entrato. Se indica **Non Connesso**, usa **Login Web → Genera URL di login**, oppure la scheda **Chiave di Autenticazione** con una chiave presa dalla console di amministrazione di Tailscale.

## Controllo 2: porta il laptop sulla stessa rete

Entrambe le estremità devono trovarsi sulla stessa rete ZeroTier o sulla stessa tailnet.

- **ZeroTier**: sul laptop, unisciti allo stesso ID Rete e autorizza anche il laptop nel tuo controller. Su Windows, controlla l'icona ZeroTier nella barra delle applicazioni; su Linux esegui `sudo zerotier-cli listnetworks`. Lo stato deve essere `OK`.
- **Tailscale**: un client Tailscale appartiene a una sola tailnet alla volta. Sul laptop, esegui `tailscale status`. Il drone deve comparire nell'elenco. In caso contrario, il laptop è collegato a un altro account o a un'altra tailnet.
- **VPN di Fleet Manager**: se il drone è stato accoppiato con Fleet Manager e VPN, si trova nella rete della tua organizzazione, non nella tua Tailscale personale. Collega il laptop con il comando che Fleet Manager mostra sotto **Network** (`tailscale up --login-server=… --authkey=…`) ed eseguilo **sul laptop, mai sul drone**. Vedi [Collegare una stazione di terra](https://docs.uavmatrix.com/it/fleet-manager/connect-gcs/).

> **L'accoppiamento può sostituire la VPN del drone**
>
> Quando accoppi un drone in Fleet Manager con **Replace existing VPN with Fleet Manager network**, il drone lascia la sua attuale rete Tailscale e entra nella rete dell'organizzazione. I laptop sulla vecchia tailnet non possono più raggiungerlo.

## Controllo 3: chiave Tailscale scaduta

Le chiavi dei dispositivi Tailscale scadono. Quando la chiave del drone scade, il drone esce dalla tailnet finché non effettua di nuovo l'accesso. Il campo **Scade** nella pagina **Rete Privata Virtuale** mostra la data. Nella console di amministrazione di Tailscale puoi disattivare la scadenza della chiave per il drone, così non esce dalla rete durante un progetto.

## Controllo 4: il drone deve prima avere internet

La VPN passa attraverso la connessione internet propria del drone. Se il modem non ha internet, la VPN risulta disconnessa oppure non ottiene mai un indirizzo. Sistema prima la connessione: [Modem connesso, ma senza internet](https://docs.uavmatrix.com/it/troubleshooting/modem-no-internet/).

## Controllo 5: raggiungibile, ma senza dati

Se `ping <ip-vpn-drone>` funziona:

- **Interfaccia web**: apri `http://<ip-vpn-drone>/`. L'anteprima dal vivo richiede anche che la porta 8889 sia raggiungibile tramite la VPN.
- **Telemetria e video**: vengono inviati *dal* drone *verso* l'indirizzo impostato in **Stazioni di Controllo a Terra → IP o Host di Destinazione**. Deve essere l'indirizzo VPN del laptop, non quello del drone, e non l'indirizzo Wi-Fi del laptop. Poi consulta [Nessuna telemetria](https://docs.uavmatrix.com/it/troubleshooting/no-telemetry-in-gcs/) oppure [Nessun video](https://docs.uavmatrix.com/it/troubleshooting/no-video-in-gcs/).
- **Lenta, ma funzionante**: Tailscale mostra il **Relay** in uso. Una connessione tramite relay funziona ma aggiunge ritardo. Alcune reti cellulari non consentono connessioni dirette, quindi un relay può essere il massimo ottenibile con quell'operatore.

## Ancora irraggiungibile?

[Scarica i log](https://docs.uavmatrix.com/it/troubleshooting/collect-logs/) con **VPN Manager** selezionato e inviali a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, insieme all'output di `zerotier-cli listnetworks` o `tailscale status` sia dal drone sia dal laptop.

Correlati: [Impostazioni VPN](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/vpn/) · [Rete di Fleet Manager](https://docs.uavmatrix.com/it/fleet-manager/network/)

Source: https://docs.uavmatrix.com/it/troubleshooting/vpn-cant-reach-drone/
