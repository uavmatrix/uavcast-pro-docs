# Codice di accoppiamento non valido o scaduto

> Risolvi Invalid pairing code, This pairing code has expired e License is not owned by any member of this organization durante l'accoppiamento di un drone con Fleet Manager.

Hai inserito il codice di UAVcast-Pro nella procedura **Pair Device** di Fleet Manager, e il codice è stato rifiutato.

L'accoppiamento funziona in questa direzione: **UAVcast-Pro mostra il codice, tu lo digiti in Fleet Manager**. Il codice ha 8 cifre ed è valido per 5 minuti.

![Procedura Pair UAV di Fleet Manager con il messaggio di errore This pairing code has expired](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/pair-device--code-expired.webp)

*Fleet Manager rifiuta un codice: l'errore compare come notifica nel passaggio Pairing Code, qui This pairing code has expired.*

| Errore in Fleet Manager | Causa | Soluzione |
| --- | --- | --- |
| **Pairing code must be 8 digits** / **Please enter a valid 8-digit code** | Cifre insufficienti, oppure lettere | [Controllo 1](https://docs.uavmatrix.com/it/troubleshooting/pairing-code-invalid/#check-1) |
| **Invalid pairing code** | Un errore di battitura, oppure un codice mai esistito | [Controllo 1](https://docs.uavmatrix.com/it/troubleshooting/pairing-code-invalid/#check-1) |
| **This pairing code has expired** | Sono trascorsi più di 5 minuti | [Controllo 2](https://docs.uavmatrix.com/it/troubleshooting/pairing-code-invalid/#check-2) |
| **This pairing code has already been used** | Il codice è stato già usato una volta | [Controllo 2](https://docs.uavmatrix.com/it/troubleshooting/pairing-code-invalid/#check-2) |
| **License is not owned by any member of this organization** | La licenza del drone appartiene a un account esterno all'organizzazione | [Controllo 3](https://docs.uavmatrix.com/it/troubleshooting/pairing-code-invalid/#check-3) |
| **Invalid license key** / **License has expired** / **License has been refunded** | La licenza del drone non è valida nello store | [Controllo 4](https://docs.uavmatrix.com/it/troubleshooting/pairing-code-invalid/#check-4) |
| **This UAV is already paired to an organization** | Il drone è accoppiato a un'altra organizzazione | [Controllo 5](https://docs.uavmatrix.com/it/troubleshooting/pairing-code-invalid/#check-5) |
| **Too many attempts. Please wait a minute and try again.** | Limite di richieste dopo troppi tentativi | Attendi un minuto |

## Controllo 1: digita il codice attuale

1. In UAVcast-Pro, vai su **Fleet Management** e premi **Connect to Fleet Manager**.
2. Copia le 8 cifre mostrate sotto **Pairing Code**.
3. In Fleet Manager, vai su **Fleet → Pair Device**, scegli l'organizzazione e inserisci il codice sotto **Enter Pairing Code**.

## Controllo 2: ottieni un nuovo codice

Un codice è valido per 5 minuti e funziona una sola volta. Quando **Expires in** arriva a zero, premi di nuovo **Connect to Fleet Manager** in UAVcast-Pro per un nuovo codice. Se UAVcast-Pro non riesce a ottenere alcun codice, mostra *Impossibile connettersi a Fleet Manager. Controlla la connessione internet.*: sistema prima la connessione internet del drone.

## Controllo 3: licenza di proprietà di un utente esterno all'organizzazione

Fleet Manager accetta solo un drone la cui licenza di UAVcast-Pro è stata acquistata da un membro dell'organizzazione in cui stai accoppiando. La corrispondenza si basa sull'indirizzo e-mail dell'account dello store che possiede la licenza.

Puoi risolvere in uno di questi modi:

- Invita nell'organizzazione (**Team**) l'account che ha acquistato la licenza, poi accoppia di nuovo.
- Accoppia in un'organizzazione in cui il proprietario della licenza è un membro.
- Se la licenza è stata acquistata con un altro indirizzo e-mail tuo, chiedi a **[support@uavmatrix.com](mailto:support@uavmatrix.com)** di aggiungere quell'indirizzo come e-mail della licenza al tuo utente di Fleet Manager.

Vedi [Licenze in Fleet Manager](https://docs.uavmatrix.com/it/fleet-manager/licenses/).

## Controllo 4: licenza non valida

Apri **Applicazione → Gestore Licenze** sul drone e controlla **Stato Licenza**. Una licenza scaduta o rimborsata va rinnovata su [uavmatrix.com](https://uavmatrix.com/). Se UAVcast-Pro stesso non ha una licenza attiva, non può richiedere un codice (*Nessuna licenza valida trovata. Attiva prima la tua licenza.*): vedi [La licenza non si attiva](https://docs.uavmatrix.com/it/troubleshooting/license-activation-failed/).

## Controllo 5: già accoppiato altrove

Un drone appartiene a una sola organizzazione. Per spostarlo, rimuovilo prima dalla vecchia organizzazione. Riaccoppiarlo nella stessa organizzazione è consentito e mantiene la cronologia del drone. Vedi [Rimuovere o trasferire un UAV](https://docs.uavmatrix.com/it/fleet-manager/fleet/remove-or-transfer/).

## Ancora rifiutato?

Invia il testo esatto dell'errore, l'hostname del UAV e il nome dell'organizzazione a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Correlati: [Accoppiamento con Fleet Manager in UAVcast-Pro](https://docs.uavmatrix.com/it/uavcast-pro/fleet-pairing/) · [Accoppia il tuo primo UAV](https://docs.uavmatrix.com/it/fleet-manager/pair-uav/)

Source: https://docs.uavmatrix.com/it/troubleshooting/pairing-code-invalid/
