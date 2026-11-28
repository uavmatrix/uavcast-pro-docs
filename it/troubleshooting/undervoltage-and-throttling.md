# Sottotensione e throttling

> UAVcast-Pro mostra Voltage too low o Slowed down? Dimensiona l'alimentazione per Pi, modem e telecamera, correggi cavi sottili e raffreddamento, ed evita i riavvii.

La riga **Alimentazione** della dashboard mostra un avviso, il modem si disconnette, il collegamento con il controllore di volo si ripristina oppure il Pi si riavvia in volo. Su un drone, un'alimentazione sottodimensionata causa più anomalie strane di qualsiasi impostazione software.

![Scheda di stato della dashboard con la riga Alimentazione nella sezione Sistema, che indica Stabile](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/dashboard--status-card.webp)

*Dashboard → scheda di stato. La riga Alimentazione si trova nella sezione Sistema; qui indica Stabile. Gli avvisi sostituiscono questo testo, come elencato sotto.*

| Riga Alimentazione | Significato |
| --- | --- |
| **Stabile** | Nessuna sottotensione o throttling dall'avvio |
| **Tensione troppo bassa - usa un alimentatore più potente** | La tensione di alimentazione è inferiore a quella richiesta in questo momento dal Pi |
| **Tensione calata dall'avvio** | È successo in precedenza, per esempio quando si è connesso il modem o quando i motori sono partiti |
| **Rallentato (calore o alimentazione)** | La CPU funziona più lentamente per proteggersi dal calore o da una tensione bassa |

Le letture provengono dal firmware della Raspberry Pi, quindi sono disponibili solo su una Raspberry Pi.

## Controllo 1: dimensiona l'alimentazione per tutto ciò che è collegato

Il Pi alimenta il modem e la telecamera USB tramite le sue porte USB. Un modem 4G assorbe la corrente di picco quando si connette e quando il segnale è debole.

1. Usa un BEC o un regolatore da 5 V con potenza nominale ben superiore alla corrente totale del Pi, del modem, della telecamera e di qualsiasi altro dispositivo sulla stessa linea. Le specifiche ufficiali dell'alimentatore Raspberry Pi indicano il fabbisogno di ciascun modello.
2. Non alimentare mai il Pi dalla porta TELEM o USB del controllore di volo.
3. Se il modem assorbe più di quanto il Pi possa far passare, alimenta il modem direttamente dal regolatore, tramite un hub USB alimentato o un cavo USB con alimentazione separata.

## Controllo 2: cavi e connettori

I cavi sottili o lunghi perdono tensione sotto carico. Usa cavi di alimentazione corti e spessi e un buon cavo USB per il modem. Un cavo adatto a un caricabatterie del telefono può comunque causare sottotensione alla corrente di picco.

## Controllo 3: calore

**Temperatura** in **Informazioni di Sistema** mostra la temperatura della CPU. Un Pi che esegue la codifica video dentro una fusoliera chiusa, al sole, si surriscalda. Aggiungi un dissipatore o una piccola ventola e garantisci un flusso d'aria nella custodia. Un Pi 5 richiede un raffreddamento attivo per la codifica continua.

## Controllo 4: verifica dopo la correzione

**Tensione calata dall'avvio** resta visibile fino al riavvio successivo. Riavvia, esegui una missione tipica sul banco (modem connesso, telecamera in streaming) e verifica che la riga resti su **Stabile**.

## Ancora avvisi?

Il download dei log include gli eventi di alimentazione e USB del kernel in `diagnostics.txt`. [Scarica i log](https://docs.uavmatrix.com/it/troubleshooting/collect-logs/) e inviali a **[support@uavmatrix.com](mailto:support@uavmatrix.com)** insieme a una foto del tuo cablaggio di alimentazione.

Correlati: [Requisiti hardware](https://docs.uavmatrix.com/it/get-started/hardware-requirements/) · [Dashboard](https://docs.uavmatrix.com/it/uavcast-pro/dashboard/)

Source: https://docs.uavmatrix.com/it/troubleshooting/undervoltage-and-throttling/
