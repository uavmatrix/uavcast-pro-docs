# Android e tablet

> Ricevi la telemetria e il video in diretta di UAVcast-Pro su uno smartphone o tablet Android con QGroundControl, via Wi-Fi o 4G tramite VPN, più l'opzione browser per iPad.

QGroundControl per Android riceve la telemetria di UAVcast-Pro sulla UDP 14550 e il video sulla UDP 5600, esattamente come la versione desktop. Via 4G, installa sul tablet l'app Tailscale o ZeroTier così che il drone possa raggiungerlo.

## Configura QGroundControl su Android

1. Installa **QGroundControl** da [Google Play](https://play.google.com/store/apps/details?id=org.mavlink.qgroundcontrol).

2. Collega il tablet alla rete verso cui invia il drone:

   - **Stesso Wi-Fi**: trova l'IP del tablet in **Impostazioni → Wi-Fi → (la tua rete) → Avanzate** o simile.
   - **Via 4G**: installa l'app [ZeroTier One](https://play.google.com/store/apps/details?id=com.zerotier.one) o [Tailscale](https://play.google.com/store/apps/details?id=com.tailscale.ipn), unisciti alla stessa rete del drone (vedi [VPN](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/vpn/)) e annota l'indirizzo VPN del tablet.

3. Sul drone, aggiungi una destinazione in [Stazioni di Controllo a Terra](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/) con l'IP del tablet, con **Attiva Telemetria** e **Attiva Video** attivi.

4. Apri QGroundControl. Il veicolo compare quando arriva la telemetria.

5. Per il video: icona **Q** → **Application Settings** → **Video** (nelle versioni più vecchie, la sezione **Video** di **General**), imposta **Source** su **UDP h.264 Video Stream** e verifica che l'indirizzo UDP usi la porta `5600`.

Quando funziona, la vista **Fly** mostra il drone sulla mappa con la modalità di volo e la batteria nella barra degli strumenti, e l'immagine della camera nella piccola finestra video in un angolo. Tocca la finestra per scambiare video e mappa.

> **Tieni connessa l'app VPN**
>
> Android può sospendere le app VPN in background per risparmiare batteria. Escludi ZeroTier o Tailscale dall'ottimizzazione della batteria e tieni la VPN attiva durante il volo.

I dettagli sulle impostazioni video, sulla modalità a bassa latenza e sui problemi più comuni sono nella [pagina QGroundControl](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/qgroundcontrol/).

## iPad, iPhone e altri dispositivi: usa il browser

L'interfaccia web di UAVcast-Pro funziona in qualsiasi browser moderno. Su iPad o telefono, apri `http://<drone-ip>` (l'indirizzo VPN via 4G) e usa la [Mappa di Volo](https://docs.uavmatrix.com/it/uavcast-pro/flight-map/): mappa in tempo reale, HUD da cockpit, video della camera, armo/disarmo e RTL. Il video qui è l'anteprima in diretta (WebRTC), quindi il browser deve raggiungere la porta 8889 del drone.

## Problemi comuni

| Sintomo | Soluzione |
| --- | --- |
| Il veicolo non compare mai via 4G | L'app VPN sul tablet è spenta oppure la destinazione usa l'IP Wi-Fi. Usa l'indirizzo VPN del tablet. |
| Funziona finché lo schermo non si spegne | Android ha sospeso l'app VPN. Disattiva l'ottimizzazione della batteria per essa. |
| La telemetria funziona, ma non c'è video | Controlla **Attiva Video**, la camera e le impostazioni della sorgente video in QGroundControl. |

Source: https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/android/
