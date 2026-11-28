# Due telecamere: commutazione RC o doppio flusso

> Collega due telecamere a UAVcast-Pro e passa dall'una all'altra con il trasmettitore RC, oppure trasmettile entrambe insieme con il doppio flusso. Configurazione, porte e CPU.

UAVcast-Pro gestisce due telecamere, per esempio una telecamera frontale e una telecamera rivolta verso il basso o con zoom. Puoi scegliere tra due modalità:

|  | **Commutazione** (predefinita) | **Doppio flusso** |
| --- | --- | --- |
| Cosa riceve la stazione di terra | Un unico flusso video, che mostra la telecamera 1 o la telecamera 2 | Due flussi video contemporaneamente |
| Come scegli | I badge delle telecamere nell'interfaccia web, oppure un canale RC | Entrambe sempre attive |
| Porte | **Porta Video** | Telecamera 1 su **Porta Video**, telecamera 2 su **Porta Video (Telecamera 2)** (predefinita: Porta Video + 1) |
| CPU e banda | Una codifica | Due codifiche, circa il doppio dell'uplink |

## 1. Aggiungi la seconda telecamera

1. Collega entrambe le telecamere. Due telecamere CSI su un Pi 5, una CSI e una USB, oppure due telecamere USB funzionano tutte.
2. Apri **Telecamera → Impostazioni telecamera**. Gli slot delle telecamere mostrano **CAM 1** e **CAM 2**.
3. Clicca **Aggiungi Telecamera** sul secondo slot e scegli la telecamera.
4. **La risoluzione e gli FPS della Telecamera 1 verranno usati** in modalità commutazione. Se la telecamera 2 supporta la risoluzione della telecamera 1, attiva **Uguale Risoluzione Telecamera 1**; altrimenti la telecamera 2 usa la propria risoluzione e viene scalata per adattarsi.

Se una telecamera non compare nell'elenco, consulta [Telecamera non rilevata](https://docs.uavmatrix.com/it/troubleshooting/camera-not-detected/).

## 2a. Cambia telecamera dal trasmettitore

1. Sotto **Cambio Canale RC**, attiva **Attiva il cambio telecamera tramite canale RC**.
2. Scegli un canale libero in **Canale RC**. Il predefinito è il canale 7.
3. Assegna a quel canale un interruttore a due posizioni del trasmettitore.
4. Muovi l'interruttore e osserva **PWM attuale**: sotto 1500 µs seleziona la telecamera 1, sopra 1500 µs seleziona la telecamera 2.

![Pannello di Controllo Telecamera con Attivare la Telecamera impostato su Sì, CAM 1 compilato e uno slot vuoto Aggiungi Telecamera](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/camera--control-panel.webp)

*Pannello di Controllo Telecamera con una sola telecamera. Il pannello Cambio Canale RC compare sotto solo quando è aggiunta CAM 2 e il doppio flusso è disattivato.*

Mentre la commutazione RC è attiva, i badge delle telecamere nell'interfaccia web non cambiano telecamera. Disattiva la commutazione RC per selezionare di nuovo le telecamere a mano.

## 2b. Trasmetti entrambe le telecamere insieme

1. Attiva **Doppio flusso**. Il badge mostra **Entrambe attive**.
2. Ogni telecamera ha ora la propria risoluzione, i propri FPS e il proprio bitrate sotto **Impostazioni per telecamera**.
3. Apri **Stazioni di Controllo a Terra**. Ogni destinazione ora mostra **Porta Video (Telecamera 2)**. Lasciala vuota per usare **Porta Video** + 1 (5601), oppure inserisci una porta.
4. Sulla stazione di terra, ricevi il secondo flusso su quella porta, per esempio con una seconda sorgente video di QGroundControl o una finestra GStreamer: vedi [Ricezione video nelle stazioni di terra](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/#set-up-the-receiving-side) per QGroundControl, Mission Planner e GStreamer su ogni sistema operativo.

> **Tieni d'occhio la CPU**
>
> UAVcast-Pro codifica il video via software. Con due flussi, tieni d'occhio il **Carico del sistema**. Quando indica **CPU is near its limit**, abbassa la risoluzione o il bitrate di un flusso, oppure disattiva il secondo flusso. Per il doppio flusso è consigliato un Raspberry Pi 4 o 5.

La **Mappa di Volo** mostra una finestra video per ogni flusso attivo. Puoi nasconderle come schede in fondo alla mappa.

## Pianificazione delle porte

Con il doppio flusso attivo, ogni destinazione usa due porte video, e l'audio (se **Invia audio alle stazioni di terra** è attivo) usa la porta video + 2. Se aggiungi altre destinazioni sullo stesso computer, distanzia le loro porte video di almeno tre, per esempio 5600 e 5610.

## Registrazione di entrambe le telecamere

In **Telecamera → Registrazioni → Impostazioni**, **Registra telecamera 2** funziona solo quando il doppio flusso è attivo. Vedi [Registra i voli e rivedili](https://docs.uavmatrix.com/it/guides/recording-flight-review/).

Source: https://docs.uavmatrix.com/it/guides/dual-camera-rc-switching/
