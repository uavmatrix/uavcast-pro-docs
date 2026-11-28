# Licenze e posti

> Come le licenze UAVcast-Pro e gli slot dei dispositivi determinano quali droni puoi accoppiare in Fleet Manager, e come usare le licenze acquistate con un'altra email.

Fleet Manager è incluso nella tua licenza UAVcast-Pro. Non ha un abbonamento, posti o piani propri. Ciò che puoi accoppiare dipende dalle tue licenze UAVcast-Pro acquistate dallo [store UAVmatrix](https://uavmatrix.com/):

- **Droni:** ogni drone accoppiato esegue UAVcast-Pro con una licenza attivata. Ogni attivazione utilizza uno dei **Device Slots** della licenza nello store ("2 of 5 device slots used"). Ti servono più droni? Acquista altre licenze o altri slot. **Fleet → Need more devices? → View Plans** ti porta allo store.
- **Membri del team:** gratuiti. Fleet Manager non limita il numero di persone che puoi invitare, e i membri non hanno bisogno di una licenza propria.

> Fleet Manager è incluso con una licenza UAVcast-Pro. Ogni drone che abbini ne richiede una.
>
> [Acquista UAVcast-Pro](https://uavmatrix.com/it/checkout) · [Vedi piani e prezzi](https://uavmatrix.com/it/products)

## Cosa controlla Fleet Manager durante l'accoppiamento

Quando inserisci un Pairing Code, Fleet Manager cerca la licenza attivata su quel drone e verifica che:

1. la licenza esista ed sia attiva, non scaduta e non rimborsata, e
2. il suo **indirizzo email del titolare** (l'account dello store che l'ha acquistata) appartenga a un **membro dell'organizzazione** in cui stai accoppiando il drone, con qualsiasi ruolo.

Se entrambe le condizioni sono vere, il drone viene accoppiato. Fleet Manager ricontrolla ogni volta che il drone viene riaccoppiato.

| Messaggio nella procedura guidata di accoppiamento | Significato |
| --- | --- |
| **License is not owned by any member of this organization** | La licenza appartiene a un account dello store la cui email non è un membro di questa organizzazione. |
| **License has expired** | La data di scadenza della licenza è passata. |
| **License has been refunded** | La licenza è stata rimborsata. |
| **Invalid license key** | Lo store non conosce la licenza presente sul drone. Controlla l'attivazione in UAVcast-Pro. |

La licenza viene controllata anche un passaggio prima, quando UAVcast-Pro richiede un Pairing Code. Se UAVcast-Pro mostra **Invalid or inactive license** invece di un codice, la licenza è scaduta, rimborsata o non collegata a un account dello store.

Per i problemi di attivazione sul drone stesso, vedi [Attiva la tua licenza](https://docs.uavmatrix.com/it/get-started/license-activation/) e [La licenza non si attiva](https://docs.uavmatrix.com/it/troubleshooting/license-activation-failed/).

## Chi deve possedere le licenze

Fleet Manager abbina per email, quindi pianifica chi acquista:

- **Soluzione più semplice:** l'Owner dell'organizzazione acquista tutte le licenze con l'email con cui accede a Fleet Manager.
- **Più acquirenti:** contano le licenze di qualsiasi membro, inclusi i Viewer. Un collega che acquista può essere Viewer.
- **Droni di proprietà del cliente:** se un cliente ha acquistato le licenze, invita l'email dello store del cliente nella tua organizzazione (il ruolo Viewer è sufficiente).

## Licenze acquistate con un'altra email

Un caso comune: le licenze sono state acquistate con `purchasing@company.com`, ma il pilota accede a Fleet Manager come `anna@company.com`. L'accoppiamento fallisce con **License is not owned by any member of this organization**.

Hai due modi per risolvere il problema:

1. **Invita l'email di acquisto** nell'organizzazione. Quell'account deve accedere una volta per accettare l'invito.
2. **Chiedi al supporto UAVmatrix di aggiungere un'email di licenza** al tuo account. Il supporto può aggiungere una o più email extra a un utente di Fleet Manager. Le licenze di proprietà di una di queste email contano allora come quelle dell'utente durante l'accoppiamento, in ogni organizzazione a cui l'utente appartiene.

Per richiederlo, apri un ticket dalla bolla di supporto (categoria **General Inquiry**) oppure invia un'email a [support@uavmatrix.com](mailto:support@uavmatrix.com) dall'indirizzo con cui accedi, indicando l'altra o le altre email con cui sono state acquistate le licenze. Vedi [Supporto](https://docs.uavmatrix.com/it/fleet-manager/support/).

Cose utili da sapere:

- Le email vengono confrontate senza distinzione tra maiuscole e minuscole.
- Ogni email extra può appartenere a un solo utente di Fleet Manager.
- Solo il supporto UAVmatrix può aggiungere o rimuovere queste email. Non compaiono nelle tue impostazioni.
- Le licenze restano nell'account dello store originale. Questo cambia solo chi Fleet Manager considera titolare quando accoppi un drone.

## Spostare le licenze tra i droni

Una licenza viene attivata per dispositivo in UAVcast-Pro, non in Fleet Manager. Per spostarla, libera lo slot del dispositivo in UAVcast-Pro o nello store, attivala sul nuovo drone, poi [accoppia il nuovo drone](https://docs.uavmatrix.com/it/fleet-manager/pair-uav/). Vedi [Sostituire il computer di bordo](https://docs.uavmatrix.com/it/fleet-manager/fleet/remove-or-transfer/#replace-the-companion-computer).

Source: https://docs.uavmatrix.com/it/fleet-manager/licenses/
