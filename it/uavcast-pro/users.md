# Utenti e accesso

> Proteggi l'interfaccia web di UAVcast-Pro con un login admin, aggiungi utenti di sola lettura che possono guardare telemetria e video ma non controllare il drone, e cambia o reimposta le password.

Una nuova installazione di UAVcast-Pro non ha utenti né login: chiunque possa aprire l'interfaccia web ha pieni diritti di admin. Aggiungi un utente admin per attivare il login. Dopodiché puoi aggiungere utenti **Read Only** per osservatori, clienti od operatori del payload che devono vedere tutto ma non modificare nulla. Apri **Gestione → Users**.

![Pagina Users con la finestra di dialogo Add New User aperta, con i campi username, password, conferma password e ruolo](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/users.webp)

*Gestione → Users con la finestra di dialogo Add New User aperta.*

## Attiva l'accesso

1. Vai alla pagina **Users** e seleziona **Add User**.
2. Inserisci uno **Username** (almeno 3 caratteri), una **Password** (almeno 6 caratteri) e **Confirm Password**.
3. Seleziona **Create User**. Il primo utente è sempre un **Admin** (*First user must be an admin*).

Da ora in poi ogni visitatore vede una pagina di login. Un accesso dura 7 giorni su quel browser, oppure finché non selezioni **Disconnetti** nel menu utente in fondo alla barra laterale.

> **L'interfaccia web usa HTTP semplice**
>
> I login e le impostazioni viaggiano senza crittografia. Va bene sulla tua LAN o all'interno di una [VPN](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/vpn/), ma non inoltrare mai la porta dell'interfaccia web verso internet.

## Ruoli

| Può… | **Admin** | **Read Only** |
| --- | --- | --- |
| Vedere le pagine Dashboard, Flussi di Dati, Controllore di Volo, Mappa di Volo, Stazioni di Controllo a Terra e Telecamera | Sì | Sì |
| Guardare video e telemetria live, visualizzare dashboard e registrazioni | Sì | Sì |
| Modificare qualsiasi impostazione | Sì | No |
| Armare, disarmare, cambiare modalità, avviare o cancellare missioni | Sì | No |
| Avviare o fermare le registrazioni | Sì | No |
| Aprire Modem, Rete Privata Virtuale, DNS Dinamico, Reti, Fleet Management, Users e Applicazione | Sì | No (nascosto) |

Non puoi creare un utente **Read Only** prima che esista un admin (*Create an admin user first before adding read-only users*).

Gli utenti web di sola lettura sono diversi dall'interruttore **Read Only** di una destinazione di stazione di terra, che blocca i comandi da un programma di stazione di terra. Vedi [Stazioni di controllo a terra](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/).

## Cambia password

Seleziona **Change Password**, inserisci la **Current Password** e la **New Password** due volte, poi seleziona **Update Password**. Le password sono salvate come hash bcrypt.

## Elimina un utente

Seleziona **Elimina** nella riga dell'utente e conferma.

- Non puoi eliminare il tuo account mentre esistono altri utenti.
- Eliminare l'**ultimo** utente disattiva di nuovo il login: *After deletion, the application will be open without authentication until a new user is created.*

## Password admin dimenticata

Non c'è un link di reset, perché il drone non ha un'email e il recupero della password non è self-service.

- Se un altro admin può ancora accedere, può eliminare il tuo utente da **Users** e crearlo di nuovo.
- Se nessuno con il ruolo admin riesce ad accedere, contatta il supporto all'indirizzo **[support@uavmatrix.com](mailto:support@uavmatrix.com)**. Includi la tua chiave di licenza (o l'email con cui l'hai acquistata), l'hostname o il nome del dispositivo come appare in **Applicazione → Gestore Licenze → Dispositivi Attivati**, la versione di UAVcast-Pro e se puoi raggiungere il dispositivo via SSH.

Source: https://docs.uavmatrix.com/it/uavcast-pro/users/
