# Configura la tua organizzazione

> Accedi a Fleet Manager con il tuo account UAVmatrix, crea l'organizzazione a cui appartengono droni e team, e passa da un'organizzazione all'altra, rinominala o eliminala.

Tutto in Fleet Manager appartiene a un'organizzazione: droni, missioni, la rete VPN, le associazioni dei flussi e i membri del team. Creane una prima di accoppiare il primo drone.

## Accesso

Fleet Manager non ha una password separata. Ti autentica con il tuo account UAVmatrix, lo stesso che usi su [uavmatrix.com](https://uavmatrix.com/) per acquistare e gestire le licenze di UAVcast-Pro.

1. Vai su [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) e seleziona **Sign In** (oppure **Get Started**).
2. Accedi alla pagina UAVmatrix a cui vieni indirizzato. Se non hai ancora un account, creane uno lì.
3. Torni alla **Dashboard** di Fleet Manager.

> **Accedi con l'email che possiede le tue licenze**
>
> Fleet Manager accetta un drone solo se la sua licenza UAVcast-Pro appartiene a un membro dell'organizzazione, verificato tramite email. Accedere con l'account con cui hai acquistato le licenze ti evita in seguito una richiesta di supporto. Vedi [Licenze](https://docs.uavmatrix.com/it/fleet-manager/licenses/).

I dati del profilo (nome, email, password) vengono gestiti nel tuo account UAVmatrix, non in Fleet Manager. **Settings → Profile** rimanda lì.

## Crea l'organizzazione

1. Apri il selettore delle organizzazioni in cima alla barra laterale e seleziona **Create organization**. Se non hai ancora un'organizzazione, pagine come **Fleet** e **Network** mostrano **No Organization Yet** con un pulsante **Create Organization**.
2. Inserisci un **Organization Name** (da 2 a 50 caratteri), ad esempio il nome della tua azienda o "Survey Operations North". Se vuoi, aggiungi una **Description (optional)**.
3. Seleziona **Create**.

![Finestra di dialogo Create Organization con i campi Organization Name e Description](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/onboarding--create-organization.webp)

*Finestra di dialogo Create Organization compilata con un nome aziendale, ad esempio Nordic Aerial Survey AS.*

Diventi **Owner** dell'organizzazione. Fleet Manager crea anche in background una rete VPN privata per l'organizzazione. Resta disattivata finché non [attivi la VPN](https://docs.uavmatrix.com/it/fleet-manager/network/).

> **Un'organizzazione per proprietario**
>
> Ogni utente può creare (possedere) una sola organizzazione. Se provi a crearne una seconda, Fleet Manager risponde **You already own an organization**. Puoi comunque essere Admin o Viewer in un numero qualsiasi di altre organizzazioni, ad esempio quelle di un cliente o di un partner.

## Passa da un'organizzazione all'altra

Se appartieni a più di un'organizzazione, il selettore in cima alla barra laterale le elenca sotto **Organizations**. L'organizzazione scelta determina ciò che mostrano **Fleet**, **Fleet Map**, **Missions**, **Network** e la dashboard. Fleet Manager ricorda la tua scelta in questo browser.

![Selettore delle organizzazioni nella barra laterale aperto, con due organizzazioni elencate](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/dashboard--organization-switcher.webp)

*Selettore delle organizzazioni aperto, con Nordwind Aerial Services e Nordwind R&D Sandbox.*

## Rinomina o elimina l'organizzazione

Vai su **Settings → Organizations**. La scheda elenca le organizzazioni in cui sei Owner o Admin.

- **Rinominare o cambiare la descrizione:** Owner o Admin. Modifica **Name** o **Description** e seleziona **Save Changes**.
- **Eliminare:** solo Owner. Seleziona **Delete Organization** e conferma. Questa operazione rimuove tutti i droni, la loro cronologia di telemetria, le missioni, le associazioni dei flussi e le appartenenze al team, e non può essere annullata.

![Scheda Organizations nelle impostazioni con nome, descrizione e pulsante Delete Organization](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/settings--organizations.webp)

*Settings → Organizations per l'Owner, con Save Changes e Delete Organization.*

> **Scollega i droni prima di eliminare un'organizzazione**
>
> Eliminare l'organizzazione non avvisa i droni. Continueranno a tentare di riconnettersi finché non selezioni **Disconnect from Fleet** in UAVcast-Pro su ciascuno. Rimuovi prima i droni dalla loro pagina UAV (vedi [Rimuovi o trasferisci un drone](https://docs.uavmatrix.com/it/fleet-manager/fleet/remove-or-transfer/)), così Fleet Manager li scollega per te.

Per affidare l'organizzazione a un'altra persona, [trasferisci la proprietà](https://docs.uavmatrix.com/it/fleet-manager/team/#transfer-ownership).

## Prossimi passi

- [Aggiungi il tuo primo drone](https://docs.uavmatrix.com/it/fleet-manager/pair-uav/)
- [Invita il tuo team](https://docs.uavmatrix.com/it/fleet-manager/team/)

Source: https://docs.uavmatrix.com/it/fleet-manager/set-up-organization/
