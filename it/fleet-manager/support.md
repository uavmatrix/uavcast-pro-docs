# Supporto e FleetBot

> Ottieni aiuto in Fleet Manager: chiedi all'assistente FleetBot, apri un ticket di supporto con uno screenshot, segui il suo stato e controlla lo stato del sistema.

L'aiuto è a un clic da ogni pagina di Fleet Manager: il pulsante di supporto rotondo in basso a destra apre un pannello con due schede, **FleetBot** e **Ticket**.

## Chiedi a FleetBot

**FleetBot** è un assistente IA che conosce le pagine e le funzioni di Fleet Manager. Chiedi cose come "Come collego una seconda stazione di terra?" e risponde con link alla pagina giusta.

![Pannello di supporto nella scheda FleetBot con una domanda e una risposta che rimanda alla pagina Network](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/support-bubble--fleetbot.webp)

*Pannello di supporto, scheda FleetBot, che risponde su come aggiungere un'associazione del flusso, con un link a Network → Stream Bindings.*

- Scrivi la tua domanda in **Ask FleetBot...** e inviala.
- Una conversazione contiene fino a 20 messaggi, ciascuno di massimo 2.000 caratteri. Se raggiungi il limite, avvia una nuova conversazione.
- FleetBot può sbagliare, soprattutto sui numeri. Se non concorda con questa documentazione, fa fede la documentazione.

> **Cosa vede FleetBot**
>
> FleetBot riceve solo ciò che scrivi nella chat, non i dati dei tuoi droni. I messaggi vengono inviati al modello di IA Claude di Anthropic per generare la risposta. Non incollare chiavi di autenticazione, password o chiavi di licenza.

## Apri un ticket di supporto

1. Apri il pannello di supporto e scegli la scheda **Ticket**.
2. Scegli una **Category**: **Bug Report**, **Feature Request**, **General Inquiry** o **Question**.
3. Inserisci un **Subject** (da 5 a 200 caratteri) e un **Message** (da 20 a 5.000 caratteri). Indica quale drone, cosa hai fatto e cosa ti aspettavi.
4. Facoltativo: aggiungi uno screenshot. **Capture** acquisisce lo schermo tramite il browser (scegli tu la finestra), **Upload** allega un file immagine fino a 5 MB.
5. Seleziona **Submit Ticket**.

![Pannello di supporto nella scheda Ticket con campi per categoria, oggetto, messaggio e screenshot](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/support-bubble--ticket.webp)

*Scheda Ticket compilata come Bug Report su un drone bloccato in PAIRING, con Capture e Upload per uno screenshot facoltativo.*

Ricevi un numero di ticket, ad esempio `SUP-7KQ2XA`. Fleet Manager registra anche la pagina su cui ti trovavi e il tuo browser, così il supporto può riprodurre il problema.

> **Includi i log per i problemi del drone**
>
> Per i problemi lato drone, i log sono la cosa più utile. Un ticket accetta solo un'immagine, quindi invia via email il pacchetto di log di UAVcast-Pro (un file ZIP, vedi [Raccogli i log](https://docs.uavmatrix.com/it/troubleshooting/collect-logs/)) oppure il file **Download logs** dalla scheda **Logs** del drone a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, con il numero del ticket (ad esempio `SUP-7KQ2XA`) nell'oggetto.

## Segui i tuoi ticket

**Settings → Support** elenca i tuoi ticket con il loro stato: **Open**, **In Progress**, **Resolved** o **Closed**. Apri un ticket per vederne i dettagli e lo screenshot allegato. Seleziona **Close Ticket** quando il problema è risolto. Puoi anche creare un ticket da lì con **Create Support Ticket**.

## Nascondi il pulsante di supporto

Seleziona l'icona di nascondimento (**Hide support bubble**) nell'intestazione del pannello, oppure disattiva **Support Chat Bubble** in **Settings → Support**. Riattivalo nello stesso punto. Puoi sempre aprire i ticket da **Settings → Support**.

## Altri modi per ottenere aiuto

- **Stato del sistema:** **System → Status** mostra gli incidenti attivi e passati. Se molti droni vanno offline contemporaneamente, controllalo per primo. Vedi [Indicatori di stato e notifiche](https://docs.uavmatrix.com/it/fleet-manager/alerts-and-status/#status-page).
- **Email:** [support@uavmatrix.com](mailto:support@uavmatrix.com).
- **Community:** il [Discord di UAVmatrix](https://discord.gg/xwqMTXh).

Source: https://docs.uavmatrix.com/it/fleet-manager/support/
