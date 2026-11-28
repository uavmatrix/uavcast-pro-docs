# Licenze e attivazione

> Come acquistare una licenza UAVcast-Pro, attivarla su un drone, controllare gli slot dei dispositivi, rinnovarla e spostarla su un nuovo Raspberry Pi o una nuova scheda SD disattivando il dispositivo precedente.

UAVcast-Pro richiede una chiave di licenza attivata su ogni drone. Acquisti una licenza nello store UAVmatrix, incolli la chiave in **Applicazione → Gestore Licenze** sul drone e selezioni **Convalida**. Ogni licenza ha un numero di slot per i dispositivi. Attivare un drone usa uno slot; disattivarlo libera lo slot per un altro drone.

> Per attivare il drone ti serve una licenza UAVcast-Pro. Acquistala nello store UAVmatrix.
>
> [Acquista UAVcast-Pro](https://uavmatrix.com/it/checkout) · [Vedi piani e prezzi](https://uavmatrix.com/it/products)

## Acquista una licenza

Le licenze si acquistano su [uavmatrix.com/products](https://uavmatrix.com/products/). Ogni licenza include gli aggiornamenti per tutto il suo periodo e [Fleet Manager](https://docs.uavmatrix.com/it/fleet-manager/), compresa la sua VPN per raggiungere il drone via 4G.

| Piano | Slot dispositivi | Validità |
| --- | --- | --- |
| Basic | 1 | 1 anno |
| Silver | 2 | 1 anno |
| Gold | 4 | 2 anni |

La pagina dello store mostra sempre i piani e i prezzi aggiornati. Non esiste una licenza di prova gratuita.

Dopo il pagamento riceverai un'email di conferma dell'ordine con la **chiave di licenza**, composta da cinque gruppi di quattro caratteri.

La chiave è disponibile anche nel tuo account dello store, sotto **Licenses**, insieme agli slot dei dispositivi e alla data di scadenza.

> **Il periodo di licenza inizia con la prima attivazione**
>
> Una licenza acquistata oggi e attivata il mese prossimo scade un periodo dopo la data di attivazione, non dalla data di acquisto.

## Attiva la licenza su un drone

Il drone deve avere accesso a internet durante l'attivazione (Wi-Fi, Ethernet o modem).

1. Apri l'interfaccia web di UAVcast-Pro. Un dispositivo senza licenza si apre sempre su **Applicazione**.
2. In **Gestore Licenze**, incolla la chiave in **Inserisci Chiave di Licenza**.
3. Seleziona **Convalida**. Vedrai *License activated successfully* e il resto della barra laterale si sblocca.

![Gestore Licenze di UAVcast-Pro con una licenza attiva, nome registrato, dispositivi consentiti e rimanenti, data di scadenza e la tabella dei dispositivi attivati](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/application--license-activated.webp)

*Applicazione → Gestore Licenze dopo l'attivazione. Il dispositivo corrente è contrassegnato come **Attuale** in Dispositivi Attivati.*

**Dettagli Licenza** mostra:

| Campo | Significato |
| --- | --- |
| **Nome Registrato** | L'account dello store a cui appartiene la licenza. |
| **Stato Licenza** | **Attiva**, **Inattiva** o **Scaduta**. |
| **Dispositivi Consentiti** | Slot dispositivi totali. |
| **Dispositivi Rimanenti** | Slot liberi. |
| **Data di Attivazione** / **Data di Scadenza** | Quando iniziano e finiscono il periodo di licenza. |

**Dispositivi Attivati** elenca ogni drone con questa licenza, con il suo **Nome Dispositivo**, **Nome Host** e **Data di Attivazione**. Il drone su cui ti trovi è contrassegnato come **Attuale**. Seleziona **Modifica** per dare a un dispositivo un nome riconoscibile.

### Errori di attivazione

| Messaggio | Cosa fare |
| --- | --- |
| *Maximum activations reached. Please deactivate another device first or upgrade your license.* | Tutti gli slot sono occupati. [Disattivare un dispositivo](https://docs.uavmatrix.com/it/get-started/license-activation/#unregister-a-device) o aggiungi slot. |
| *Invalid license key* | Controlla eventuali errori di battitura o spazi in più. Copia la chiave dal tuo account dello store. |
| *License already activated on this device* | Nulla da fare. Questo dispositivo ha già uno slot (ad esempio dopo una reinstallazione sulla stessa scheda SD). |
| *Network error! Could not fetch license details…* | Il dispositivo non ha accesso a internet. Controlla **Reti** e riprova. |

## Come viene verificata la licenza

- Il drone verifica la licenza con il server licenze UAVmatrix ogni **4 ore**.
- Se il server non è raggiungibile, il drone mantiene l'ultimo stato noto. Puoi volare anche senza alcuna connessione a internet: nulla si blocca quando sei offline.
- Un dispositivo è identificato dal numero di serie della CPU e dal numero di serie del suo disco di avvio (scheda SD o SSD). Reinstallare sullo stesso Pi e con la stessa scheda mantiene la stessa identità e lo stesso slot. Una nuova scheda SD o un nuovo SSD conta come **nuovo dispositivo**.
- I dati di licenza sul drone sono cifrati con quella identità, quindi un [backup del database](https://docs.uavmatrix.com/it/uavcast-pro/application-settings/#database) ripristinato su altro hardware richiede di nuovo l'attivazione della licenza.

## Disattivare un dispositivo

Disattivare un dispositivo libera subito uno slot. Puoi disattivare **qualsiasi** dispositivo della licenza da **qualsiasi** drone su cui la licenza è attiva, non solo dal drone su cui ti trovi.

1. Vai su **Applicazione → Gestore Licenze → Dispositivi Attivati**.
2. Trova il dispositivo e seleziona **Disattiva**. Vedrai *Device unregistered successfully*.

Se disattivi il drone su cui stai lavorando, diventa senza licenza e l'interfaccia web si blocca sulla pagina **Applicazione** finché non attivi di nuovo una chiave.

> **Non puoi disattivare dallo store**
>
> Lo store mostra i dispositivi registrati ma non può rimuoverli. Disattiva da UAVcast-Pro su uno dei dispositivi della licenza. Se tutti i dispositivi della licenza sono persi o cancellati, scrivi a [support@uavmatrix.com](mailto:support@uavmatrix.com) con la tua chiave di licenza.

## Spostare su nuovo hardware

Usalo quando sostituisci il Pi, cambi la scheda SD o passi da un banco di prova all'aeromobile.

1. Sul dispositivo **vecchio**, vai su **Applicazione → Gestore Licenze** e seleziona **Disattiva** accanto ad esso. Fallo prima di cancellare la scheda.
2. Installa UAVcast-Pro sul nuovo hardware. Vedi [Installazione](https://docs.uavmatrix.com/it/get-started/installation/).
3. Attiva la stessa chiave sul nuovo dispositivo.

Se il vecchio dispositivo è guasto, disattivalo da un altro drone con la stessa licenza, oppure contatta l'assistenza.

## Rinnovare o aggiornare

Dal tuo account dello store, apri la licenza e seleziona **Upgrade Options**:

- **Extend subscription** aggiunge un altro periodo. Se la licenza è ancora valida, il nuovo periodo si aggiunge alla data di scadenza attuale; se è scaduta, parte dalla data di rinnovo. La chiave resta la stessa.
- **Add devices** aggiunge slot alla licenza. Una licenza scaduta deve prima essere rinnovata.
- **Upgrade tier** sposta la licenza su un piano con più slot.

Il drone recepisce la nuova data di scadenza e i nuovi slot al controllo successivo, entro 4 ore. Per aggiornarlo subito, seleziona **Change** in **Gestore Licenze**, inserisci la stessa chiave e seleziona **Convalida**.

## Quando una licenza scade

> **Una licenza scaduta blocca UAVcast-Pro**
>
> Quando una licenza scade, UAVcast-Pro non può più essere usato su nessuno dei suoi droni. Non continua a funzionare con la versione installata.

Quando il server delle licenze segnala la licenza come scaduta, il drone si contrassegna come senza licenza: l'interfaccia web si apre solo su **Applicazione**, e telemetria, video, NTRIP e DNS dinamico si fermano al prossimo riavvio dei rispettivi servizi. Rinnova la licenza prima della data di scadenza per evitare interruzioni, e valida di nuovo la chiave sul drone (oppure attendi il controllo successivo, entro 4 ore) per sbloccarlo.

## Licenze e Fleet Manager

Fleet Manager è incluso nella tua licenza UAVcast-Pro e usa la stessa licenza. Un drone può essere accoppiato a un'organizzazione solo se la sua licenza appartiene a un membro di quell'organizzazione. Se hai acquistato la licenza con un'email diversa da quella con cui accedi a Fleet Manager, aggiungi quell'email in Fleet Manager (vedi [Licenze in Fleet Manager](https://docs.uavmatrix.com/it/fleet-manager/licenses/)). Vedi [Accoppia un drone con Fleet Manager](https://docs.uavmatrix.com/it/uavcast-pro/fleet-pairing/).

Problemi di attivazione: vedi [Attivazione della licenza non riuscita](https://docs.uavmatrix.com/it/troubleshooting/license-activation-failed/).

Source: https://docs.uavmatrix.com/it/get-started/license-activation/
