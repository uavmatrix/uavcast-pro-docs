# Registra i voli e rivedili

> Registra automaticamente sul drone video della telecamera e telemetria quando armato, salvali su USB o SSD e riproduci video, mappa e dati di volo su un'unica timeline.

Dalla versione 6.5.1, UAVcast-Pro registra direttamente sul drone: video della telecamera più un log di telemetria, con un clic sulla mappa di volo oppure automaticamente ogni volta che armi. La registrazione riutilizza il flusso già codificato, quindi non costa CPU extra e non interrompe mai il video dal vivo verso la stazione di terra. Successivamente, il player di revisione del volo mostra su un'unica timeline il video, il tracciato sulla mappa, la vista cockpit e i dati di volo.

## 1. Scegli dove andare le registrazioni

1. Collega una chiavetta USB o un SSD se vuoi registrare su di essi. Le registrazioni riempiono lo spazio in fretta, e un SSD USB è più robusto di una scheda SD.
2. Apri **Telecamera → Registrazioni** e la scheda **Impostazioni**.
3. In **Posizione archiviazione**, scegli il disco oppure **Archiviazione interna**. Premi **Cerca di nuovo i dischi** se il disco è stato collegato dopo l'apertura della pagina. **Oppure un'altra cartella** ti permette di inserire un percorso e confermare con **Usa questa cartella**.
4. Imposta **Mantieni libero** (predefinito 2 GB). La registrazione non riempie mai il disco oltre questo limite.

![Scheda Impostazioni delle registrazioni con posizione di archiviazione, Mantieni libero, elimina le registrazioni più vecchie, elimina le registrazioni più vecchie di e registra automaticamente quando armato](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/camera--recordings-settings.webp)

*Telecamera → Registrazioni → Impostazioni con Archiviazione interna selezionata e Registra automaticamente quando armato attivo.*

## 2. Decidi quando registrare

| Impostazione | Predefinito | Cosa fa |
| --- | --- | --- |
| **Registra automaticamente quando armato** | Attivo | Inizia quando i motori si armano e si ferma quando si disarmano. Se il collegamento cade in volo, la registrazione continua. |
| **Registra telecamera 1** / **Registra telecamera 2** | Attivo | La telecamera 2 registra solo quando il doppio flusso è attivo. |
| **Elimina le registrazioni più vecchie quando lo spazio scarseggia** | Attivo | Funziona come una dashcam: la registrazione non si ferma mai per mancanza di spazio. Se disattivato, la registrazione si interrompe. |
| **Elimina registrazioni più vecchie di** | 0 giorni | 0 mantiene le registrazioni finché non serve lo spazio. |
| **Lunghezza file** | 1 min | Le registrazioni vengono salvate in pezzi da 1–30 minuti. Pezzi più brevi perdono meno dati in caso di interruzione di corrente. |
| **Registra telemetria** | **Mentre armato** | **Sempre mentre connesso** registra anche a terra, aprendo un nuovo file a ogni armamento, disarmo e ogni ora. **Disattivato** registra solo il video. |

## 3. Registra a mano

Sulla **Mappa di Volo**, i pulsanti **Registrazione** avviano e fermano ciascuna telecamera (**Registra telecamera 1**, **Ferma registrazione telecamera 1**) e il log di telemetria. Gli utenti in sola lettura possono guardare ma non avviare registrazioni.

## 4. Trova un volo

Apri **Telecamera → Registrazioni → Libreria**. Ogni volo è elencato con il suo video, una miniatura e la sua telemetria. Una registrazione in corso mostra un badge **Rec**.

![Libreria registrazioni con una barra dello spazio e due voli registrati, ciascuno con badge CAM 1 e Telemetria e un pulsante Riproduci](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/camera--recordings.webp)

*Telecamera → Registrazioni → Libreria con due voli registrati, ciascuno con video della telecamera e telemetria.*

Dalla libreria puoi:

- **Riproduci** un volo nel player di revisione,
- **Scarica** le clip video in MP4,
- **Elimina** una registrazione: **Elimina solo il video**, oppure **Elimina video e telemetria**.

## 5. Rivedi il volo

Il player di revisione del volo riproduce il video accanto al tracciato sulla mappa, alla vista cockpit e ai dati di volo (**Altitudine**, **Velocità**, **Stato Batteria**, **Satelliti**, **Modalità**) su un'unica timeline.

![Player di revisione del volo con area video, mappa, vista cockpit e una timeline con controlli di riproduzione](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/camera--flight-review.webp)

*Player di revisione del volo: video, mappa e vista cockpit sopra un'unica timeline.*

- La timeline segna armamento, disarmo e cambi di modalità di volo, così puoi saltare al momento che conta.
- Usa **Indietro 10 secondi** e **Avanti 10 secondi**, e **Velocità di riproduzione** da 0,5× a 4×.
- Con due telecamere, **Cambia layout video** passa tra **Immagine nell'immagine** e **Affiancate**; **Ingrandisci questa telecamera** le scambia.
- Se una registrazione non ha telemetria, il player dice *Nessun log di telemetria per questa registrazione. La telemetria viene registrata mentre il drone è armato.*

## Note utili

- Le registrazioni sono memorizzate sul drone. Scarica ciò che ti serve prima che **Elimina le registrazioni più vecchie quando lo spazio scarseggia** le rimuova.
- La scheda **Archiviazione** della dashboard e il riepilogo **Spazio registrazioni** mostrano lo spazio libero.
- La registrazione continua con **Abilitare Anteprima dal Vivo?** disattivato.
- Se il servizio di registrazione smette di rispondere, la pagina dice *Il servizio di registrazione non risponde.* Riavvia il servizio della telecamera da **Telecamera → Impostazioni telecamera** e [raccogli i log](https://docs.uavmatrix.com/it/troubleshooting/collect-logs/) se succede di nuovo.

Source: https://docs.uavmatrix.com/it/guides/recording-flight-review/
