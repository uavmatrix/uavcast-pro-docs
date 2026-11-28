# Analitica di Volo

> Grafica la telemetria MAVLink live o un file .tlog registrato in Analitica di Volo di UAVcast-Pro. Scegli fino a 10 parametri, confrontali nel tempo e rivedi un volo sul drone.

Analitica di Volo traccia i valori MAVLink nel tempo, sia in diretta dal controllore di volo sia da un file `.tlog` registrato. Usala per controllare vibrazioni, calo di batteria, mantenimento della quota o valori del segnale senza copiare i log su un PC. Apri **Mappa di Volo → Analitica di Volo**.

![Scheda Analisi di Volo con Nessun file di log caricato, il pulsante Apri File di Log, l'interruttore Live e il pannello Parametri](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/flight-map--flight-analytics.webp)

*Analisi di Volo prima di caricare un log. Apri File di Log carica un .tlog.*

## Traccia la telemetria live

1. Seleziona **Live**. La lista dei parametri si riempie man mano che arrivano i messaggi. Se resta su *In attesa di dati MAVLink*, collega prima il controllore di volo.
2. Cerca in **Parametri** e spunta i valori da tracciare. Puoi tracciarne fino a **10** alla volta.
3. Attiva **Accumula dati** per conservare ogni punto (*Memorizzazione di tutti i punti dati*). Disattivato, il grafico mantiene una finestra mobile (*Ultimi … punti*).

## Analizza un log registrato

1. Seleziona **Apri File di Log**.
2. In **Seleziona File di Log**, scegli un `.tlog` registrato. I log di telemetria provengono da [Registrazioni](https://docs.uavmatrix.com/it/uavcast-pro/camera/recordings/) (di default uno per ogni volo armato).
3. Spunta i parametri da tracciare. **Durata** e il numero di **Parametri** nel file sono mostrati in alto.

**Cancella Tutto** rimuove tutti i parametri tracciati.

## Da dove arrivano i log

La telemetria viene registrata sul drone in base a **Registra telemetria** in **Telecamera → Registrazioni → Impostazioni**: **Mentre armato** (predefinito), **Sempre mentre connesso** oppure **Disattivato**. Gli stessi file `.tlog` si aprono in Mission Planner, MAVExplorer e UAV Log Viewer.

La scheda laterale **Registrazioni** della Mappa di Volo elenca gli stessi log di telemetria con **Messaggi**, **Alt Max** e **Distanza**, e ti permette di **Scarica .tlog**, **Elimina** o **Riproduci** un log. La riproduzione invia la telemetria registrata alla mappa come se il drone stesse volando.

Source: https://docs.uavmatrix.com/it/uavcast-pro/flight-map/flight-analytics/
