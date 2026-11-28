# La licenza di UAVcast-Pro non si attiva

> Risolvi Invalid license key, Maximum activations reached e License activation failed in UAVcast-Pro: chiave, internet, slot liberi e hardware sostituito.

Inserisci la chiave in **Applicazione → Gestore Licenze**, premi **Convalida** e ottieni un errore invece di **License activated successfully**. Finché una licenza non è attiva su questo dispositivo, ogni pagina ti riporta ad **Applicazione**.

> Per attivare il drone ti serve una licenza UAVcast-Pro. Acquistala nello store UAVmatrix.
>
> [Acquista UAVcast-Pro](https://uavmatrix.com/it/checkout) · [Vedi piani e prezzi](https://uavmatrix.com/it/products)

![Scheda Gestore Licenze della pagina Applicazione, con il campo della chiave di licenza, Dettagli Licenza e la tabella Dispositivi Attivati](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/application--license-activated.webp)

*Applicazione → Gestore Licenze su un dispositivo attivato: Dettagli Licenza e tabella Dispositivi Attivati, con questo dispositivo indicato come Attuale.*

| Cosa vedi | Causa probabile | Inizia da |
| --- | --- | --- |
| Invalid license key, o Invalid license key format | Errore di battitura, spazi in più, oppure una chiave di un altro prodotto | [Controllo 1](https://docs.uavmatrix.com/it/troubleshooting/license-activation-failed/#check-1) |
| Maximum activations reached | Tutti gli slot dispositivo della chiave sono in uso | [Controllo 2](https://docs.uavmatrix.com/it/troubleshooting/license-activation-failed/#check-2) |
| Funzionava prima, ma chiede di nuovo dopo una nuova scheda SD o una nuova board | Il dispositivo viene contato come nuovo | [Controllo 3](https://docs.uavmatrix.com/it/troubleshooting/license-activation-failed/#check-3) |
| License activation failed, oppure non succede nulla | Nessuna connessione internet, oppure orario sbagliato sul dispositivo | [Controllo 4](https://docs.uavmatrix.com/it/troubleshooting/license-activation-failed/#check-4) |
| Cannot connect to license service | Il servizio in background di UAVcast-Pro non è in esecuzione | [Controllo 5](https://docs.uavmatrix.com/it/troubleshooting/license-activation-failed/#check-5) |
| License Status: Expired | Una licenza a tempo è scaduta | [Controllo 6](https://docs.uavmatrix.com/it/troubleshooting/license-activation-failed/#check-6) |

## Verifica 1: la chiave

1. Copia la chiave dalla e-mail d'ordine o dal tuo account su [uavmatrix.com](https://uavmatrix.com/), e incollala nel campo **Chiave di Licenza**. Digitarla a mano è la fonte di errore più comune.
2. Assicurati che non ci siano spazi prima o dopo la chiave.
3. Premi **Convalida**.

## Verifica 2: libera uno slot dispositivo

Ogni licenza consente un numero fisso di dispositivi (**Dispositivi Consentiti**). Quando **Dispositivi Rimanenti** è 0, l'attivazione fallisce con **Maximum activations reached. Please deactivate another device first or upgrade your license.**

1. Su un dispositivo qualsiasi in cui la licenza è attiva, apri **Applicazione → Gestore Licenze → Dispositivi Attivati**.
2. Trova il dispositivo che non usi più e premi **Disattiva**. Lo slot si libera subito.
3. Attiva il nuovo dispositivo.

Se non riesci a raggiungere nessun dispositivo attivato, scrivi a **[support@uavmatrix.com](mailto:support@uavmatrix.com)** con la chiave di licenza: possono liberare uno slot. Per aggiungere slot, acquista più dispositivi per la licenza su [uavmatrix.com](https://uavmatrix.com/).

## Verifica 3: hai sostituito la scheda SD o la board

La licenza è legata all'hardware, incluso il dispositivo di archiviazione. Una nuova scheda SD, un nuovo SSD o una nuova board vengono contati come nuovo dispositivo e occupano un nuovo slot. Annulla la registrazione della voce vecchia in **Dispositivi Attivati** prima o dopo lo spostamento, come nella verifica 2. **License already activated on this device** non è un errore: la chiave era già attiva qui.

## Verifica 4: connessione internet e ora

L'attivazione contatta il server licenze di UAVmatrix via HTTPS (porta 443), quindi il dispositivo deve avere una connessione internet funzionante in quel momento.

1. Sul dispositivo, esegui `curl -I https://uavmatrix.com`. Dovresti ricevere una risposta HTTP, non un timeout.
2. Se usi un modem cellulare, verifica che abbia davvero internet: [Modem connesso, ma senza internet](https://docs.uavmatrix.com/it/troubleshooting/modem-no-internet/).
3. Controlla la data con `date`. Un dispositivo con l'orologio sbagliato non riesce ad aprire connessioni HTTPS. Le board senza orologio in tempo reale impostano l'ora da internet dopo l'avvio, quindi attendi un minuto dopo l'avvio e riprova.

## Verifica 5: Cannot connect to license service

Questo messaggio significa che l'interfaccia web non riesce a raggiungere il servizio in background di UAVcast-Pro, non internet. Riavvialo e riprova:

```bash
sudo systemctl restart uavcast-factory
sudo systemctl status uavcast-factory
```

Se non resta in **active (running)**, [raccogli i log](https://docs.uavmatrix.com/it/troubleshooting/collect-logs/) con **Gestore Licenze** selezionato.

## Verifica 6: licenza scaduta

I dettagli della licenza mostrano **Stato Licenza:** e **Data di Scadenza:**. Una licenza scaduta va rinnovata su [uavmatrix.com](https://uavmatrix.com/).

> **Sistema operativo a 64 bit**
>
> UAVcast-Pro v6 funziona solo su un SO a 64 bit. Se sei arrivato fin qui, il SO va bene; su un SO a 32 bit l'installer si ferma già con *No installation candidate*.

## Ancora non funziona?

[Scarica i log](https://docs.uavmatrix.com/it/troubleshooting/collect-logs/) con **Gestore Licenze** selezionato. Contengono il codice di risposta del server licenze, ad esempio `code 550` per nessuno slot libero. Inviali insieme ai primi e agli ultimi quattro caratteri della tua chiave a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Usi Fleet Manager? Una licenza che si attiva correttamente può comunque essere rifiutata in fase di accoppiamento. Vedi [Codice di accoppiamento non valido o scaduto](https://docs.uavmatrix.com/it/troubleshooting/pairing-code-invalid/).

Correlati: [Attiva la tua licenza](https://docs.uavmatrix.com/it/get-started/license-activation/)

Source: https://docs.uavmatrix.com/it/troubleshooting/license-activation-failed/
