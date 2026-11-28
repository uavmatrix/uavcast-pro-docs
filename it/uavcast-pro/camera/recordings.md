# Registrazioni e revisione del volo

> Registra il video della telecamera e la telemetria MAVLink sul drone con UAVcast-Pro, automaticamente all'armamento, su scheda SD o SSD USB, e rivedi i voli con video, mappa e dati.

UAVcast-Pro registra ogni volo direttamente sul drone: il video della telecamera e un log di telemetria MAVLink (`.tlog`). La registrazione usa lo stream già codificato, quindi non richiede CPU aggiuntiva e non interrompe mai il video in diretta verso la stazione di controllo a terra. Poiché i file vengono scritti sul drone, ottieni video a piena qualità anche quando il collegamento cellulare cade. Le registrazioni partono automaticamente all'armamento, oppure manualmente dalla Mappa di Volo. Richiede la versione 6.5.1 o successiva.

Apri **Telecamera → Registrazioni**. Ha due schede: **Libreria** e **Impostazioni**.

![Libreria registrazioni con una barra di archiviazione e due voli registrati con durate, badge CAM 1 e Telemetria](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/camera--recordings.webp)

*Telecamera → Registrazioni → Libreria con due voli registrati.*

## Registrare automaticamente all'armamento

È attivo per impostazione predefinita. La registrazione parte quando i motori si armano e si ferma quando si disarmano. Se il collegamento cade in volo, la registrazione prosegue.

Prima di farci affidamento:

- Controlla lo spazio libero in **Archiviazione registrazioni** sulla Mappa di Volo o in **Impostazioni**.
- La registrazione non richiede **Abilitare Anteprima dal Vivo?**. Con la registrazione attiva, la telecamera mantiene una copia dello stream nel media server integrato anche quando l'anteprima è disattivata.

## Registrare manualmente

La barra superiore della Mappa di Volo ha un gruppo **Registrazione**: **CAM 1** (e **CAM 2** con doppio flusso) per avviare e fermare il video, e **Telemetria** per avviare e fermare un log di telemetria. Un punto rosso indica cosa sta registrando. Gli utenti con ruolo Read Only non possono avviare registrazioni.

## Impostazioni di archiviazione

Apri **Telecamera → Registrazioni → Impostazioni**.

| Impostazione | Predefinito | Valori | Note |
| --- | --- | --- | --- |
| **Posizione archiviazione** | **Archiviazione interna** | Archiviazione interna, un'unità USB o SSD rilevata, **Oppure un'altra cartella** | Collega un disco e seleziona **Cerca di nuovo i dischi** per vederlo. L'archiviazione interna è `/opt/uavcast-pro/recordings/video`. |
| **Mantieni libero** | `2` GB | 0.5–1000 GB | La registrazione non riempie mai il disco oltre questo limite. Anche il sistema ha bisogno di spazio. |
| **Elimina le registrazioni più vecchie quando lo spazio è poco** | Attivo | Attivo, disattivato | Come una dashcam: la registrazione non si ferma mai per mancanza di spazio. Disattivato: la registrazione si ferma. |
| **Elimina registrazioni più vecchie di** | `0` giorni | 0–3650 giorni | `0` conserva le registrazioni finché non serve spazio. |
| **Registra automaticamente quando Armato** | Attivo | Attivo, disattivato |  |
| **Registra telecamera 1** | Attivo | Attivo, disattivato | Si applica alla registrazione automatica. |
| **Registra telecamera 2** | Attivo | Attivo, disattivato | Solo con doppio flusso attivo. |
| **Durata file** | `1` min | 1–30 min | Il video viene salvato in pezzi di questa durata. Pezzi più corti perdono meno dati in caso di interruzione di corrente. |
| **Registra telemetria** | **Mentre Armato** | **Mentre Armato**, **Sempre se connesso**, **Disattivato** | Il `.tlog` mostrato accanto al video. **Sempre** registra anche a terra e avvia un nuovo file a ogni armamento, disarmo e ogni ora. |

![Impostazioni registrazioni con Archiviazione interna selezionata, 2 GB da mantenere liberi, eliminazione delle registrazioni più vecchie attiva e registrazione automatica all'armamento attiva](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/camera--recordings-settings.webp)

*Archiviazione interna selezionata, con registrazione automatica all'armamento.*

> **Registrare su un SSD USB**
>
> Un SSD USB 3 è più veloce e molto più durevole di una microSD per il video continuo. Collegalo, seleziona **Cerca di nuovo i dischi**, poi scegli il disco in **Posizione archiviazione**.

## File e formati

- Il video viene scritto come segmenti MP4 frammentati, che restano riproducibili se l'alimentazione viene interrotta durante il volo. I download sono in MP4.
- La telemetria è un `.tlog` MAVLink standard, leggibile in Mission Planner, MAVExplorer, UAV Log Viewer e in [Analitica di Volo](https://docs.uavmatrix.com/it/uavcast-pro/flight-map/flight-analytics/).
- Una registrazione nella libreria è una clip unica finché i suoi file si susseguono senza un intervallo superiore a 15 secondi.

## Rivedere un volo

Seleziona **Riproduci** su una registrazione per aprire la **Revisione volo**: video, traccia sulla mappa, vista di cabina e dati di volo su un'unica timeline.

- La timeline indica **Armato**, **Disarmato** e i cambi di modalità di volo.
- **Indietro 10 secondi**, **Riproduci**/**Pausa**, **Avanti 10 secondi** e **Velocità di riproduzione** (da 0.5× a 4×).
- Con due telecamere, **Cambia layout video** passa tra **Immagine nell'immagine** e **Affiancati**; **Mostra questa telecamera ingrandita** le scambia.
- Il pannello dati mostra **Altitudine**, **Velocità**, **Batteria**, **Satelliti** e **Modalità** nel momento corrente.
- **Scarica** salva la clip in formato MP4.

![Lettore Revisione volo con l'area video, la traccia sulla mappa, la vista di cabina e una timeline con i controlli di riproduzione](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/camera--flight-review.webp)

*Revisione volo: video, mappa, cabina e telemetria su un'unica timeline.*

Se il lettore mostra *No telemetry log for this recording*, la telemetria non era in registrazione in quel momento (per impostazione predefinita registra solo durante l'armamento).

## Eliminare registrazioni

Seleziona **Elimina** su una registrazione. Se ha un log di telemetria, scegli **Elimina solo il video** oppure **Elimina video e telemetria**. L'eliminazione è permanente. Una registrazione ancora in corso va prima fermata.

Source: https://docs.uavmatrix.com/it/uavcast-pro/camera/recordings/
