# Accesso remoto con Tailscale

> Raggiungi il drone su LTE con Tailscale e UAVcast-Pro, senza port forwarding: accedi tramite URL o chiave di autenticazione, aggiungi il laptop come GCS e disattiva la scadenza delle chiavi.

Tailscale è una VPN basata su WireGuard. Se il tuo team la usa già, è il modo più rapido per raggiungere un drone via 4G: il drone e il tuo laptop entrano nello stesso tailnet e comunicano tra loro sui loro indirizzi `100.x.y.z`.

Non hai un tailnet? La VPN di Fleet Manager, inclusa nella tua licenza, fa lo stesso senza un account Tailscale: vedi [Vola oltre la portata visiva su 4G](https://docs.uavmatrix.com/it/guides/bvlos-4g/) e [Integra una flotta](https://docs.uavmatrix.com/it/guides/fleet-onboarding/).

**Ti serve:** UAVcast-Pro con internet sul drone (Wi-Fi o modem), un account Tailscale e il client Tailscale sul tuo laptop.

## 1. Accedi del drone a Tailscale

1. In UAVcast-Pro, apri **Rete Privata Virtuale**.

2. Imposta **Attiva VPN** su **Sì** e **Servizi** su **Tailscale**.

3. Scegli come accedere:

   - **Login Web**: premi **Genera URL di login**, poi **Autentica questo dispositivo** e accedi con il tuo account Tailscale nella pagina che si apre.
   - **Chiave di Autenticazione**: crea una chiave di autenticazione nella console di amministrazione Tailscale, incollala nel campo **Chiave di Autenticazione**, imposta facoltativamente **Nome Host (Opzionale)** e premi **Connetti con Chiave di Autenticazione**. Usala quando configuri droni per qualcun altro, o molti insieme.

4. Attendi **Connesso**. Annota l'**Indirizzo IPv4** (100.x.y.z).

![Pagina Rete Privata Virtuale con Attiva VPN su Sì, Servizi su Tailscale, le schede Fleet Manager, Login Web e Chiave di Autenticazione, e Informazioni VPN che mostra Non Connesso](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/private-network.webp)

*Rete Privata Virtuale con Servizi impostato su Tailscale, prima che il drone sia connesso (Non Connesso). Dopo l'accesso, Informazioni VPN mostra i dettagli della connessione.*

> **Disattiva la scadenza delle chiavi per i droni**
>
> Le chiavi dei dispositivi Tailscale scadono, e un drone con una chiave scaduta esce dal tailnet finché qualcuno non lo riaccede. Il campo **Expires** mostra quando. Nella console di amministrazione Tailscale, disattiva la scadenza delle chiavi per i droni che installi.

## 2. Metti il laptop nello stesso tailnet

Installa Tailscale sul laptop e accedi con lo stesso account o tailnet. Esegui `tailscale status`: il drone deve essere nell'elenco. Poi:

```bash
ping <drone tailscale ip>
```

Apri l'interfaccia web del drone all'indirizzo `http://<drone tailscale ip>/`.

## 3. Invia telemetria e video al laptop

1. In UAVcast-Pro, vai su **Stazioni di Controllo a Terra** e premi **Aggiungi Destinazione**.
2. In **IP o Host di Destinazione**, inserisci l'**indirizzo IPv4 Tailscale del laptop** (esegui `tailscale ip -4` sul laptop).
3. Attiva **Attiva Telemetria** e **Attiva Video**.
4. Consenti UDP 14550 e 5600 in entrata sul firewall del laptop. Windows spesso tratta l'adattatore Tailscale come rete pubblica.

Apri QGroundControl o Mission Planner. La telemetria arriva su UDP 14550 e il video su UDP 5600.

## 4. Verifica la qualità della connessione

Il campo **Relay** nella pagina **Rete Privata Virtuale** indica se il traffico passa da un relay Tailscale. Un percorso con relay funziona ma aggiunge ritardo. Alcuni operatori cellulari non consentono connessioni dirette, quindi verifica con l'operatore con cui voli.

## Risoluzione dei problemi

- Non riesci a fare ping al drone: [VPN connessa ma non raggiungi il drone](https://docs.uavmatrix.com/it/troubleshooting/vpn-cant-reach-drone/)
- Il ping funziona, ma non c'è telemetria: [Nessuna telemetria nella stazione di terra](https://docs.uavmatrix.com/it/troubleshooting/no-telemetry-in-gcs/)
- Se il drone viene in seguito accoppiato con Fleet Manager e scegli **Replace existing VPN with Fleet Manager network**, esce dal tuo tailnet ed entra nella rete dell'organizzazione.

Source: https://docs.uavmatrix.com/it/guides/remote-access-tailscale/
