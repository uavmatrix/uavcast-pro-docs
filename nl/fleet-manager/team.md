# Uw team uitnodigen

> Nodig piloten, operators en klanten uit voor uw Fleet Manager-organisatie via e-mail, wijzig rollen, trek uitnodigingen in en draag het eigendom over.

Elke persoon meldt zich aan met een eigen UAVmatrix-account en krijgt een rol in uw organisatie: **Admin** of **Viewer** (er is precies één **Owner**). Fleet Manager beperkt het aantal leden niet, en leden gebruiken geen licenties. Zie [Rollen en rechten](https://docs.uavmatrix.com/nl/fleet-manager/team/roles-and-permissions/) voor precies wat elke rol kan doen.

Alles hiervan gebeurt op **Team** (paginatitel **Team Management**). Owners en Admins kunnen leden beheren. Viewers zien alleen de ledenlijst.

![Pagina Team Management met de leden van een organisatie, met rollen en openstaande uitnodigingen](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/team.webp)

*Team Management voor een operator met 13 leden: één Owner, vier Admins en acht Viewers.*

## Een lid uitnodigen

1. Selecteer op **Team** de optie **Invite Member**.
2. Voer in **Invite Team Member** het **Email Address** van de persoon in, kies de **Organization** (als u er meer dan één beheert) en de **Role**: **Admin** of **Viewer**.
3. Selecteer **Send Invitation**.

![Dialoogvenster Invite Team Member met velden voor e-mail, organisatie en rol](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/team--invite.webp)

*Dialoogvenster Invite Team Member met Role ingesteld op Viewer voor een klantcontact.*

Fleet Manager stuurt een uitnodigingslink per e-mail. De uitnodiging staat onder **Pending Invitations** totdat ze is geaccepteerd, en verloopt na **7 dagen**. U kunt geen tweede uitnodiging sturen naar een e-mailadres dat al een openstaande uitnodiging heeft: trek de oude eerst in.

> **Nodig uit met het e-mailadres waarmee ze de licenties hebben gekocht**
>
> Bezit deze persoon UAVcast-Pro-licenties voor drones die u wilt koppelen, nodig die persoon dan uit met hetzelfde e-mailadres dat hij in de UAVmatrix-store heeft gebruikt. Fleet Manager koppelt licentiehouders aan leden via e-mail. Zie [Licenties](https://docs.uavmatrix.com/nl/fleet-manager/licenses/).

## Een uitnodiging accepteren

De uitgenodigde persoon opent de link uit de e-mail. De uitnodigingspagina toont de organisatie, **Invitation sent to** en **Your role** met een korte beschrijving ervan.

- Al aangemeld: selecteer **Accept Invitation**.
- Niet aangemeld: selecteer **Sign In** onder **Sign in to accept this invitation**. Nieuwe gebruikers selecteren **Create Account**, dat de UAVmatrix-registratie opent met het e-mailadres al ingevuld, en keren daarna terug naar de uitnodiging.

![Uitnodigingspagina met de naam van de organisatie, het uitgenodigde e-mailadres, de rolbeschrijving en de knop Accept Invitation](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/invite.webp)

*Uitnodigingspagina zoals de uitgenodigde persoon die ziet: Your role Viewer, alleen-lezen toegang tot drones en vlootgegevens, en Accept Invitation.*

Staat op de pagina **Invitation Expired**, **Invitation Already Used** of **Already a Member**, vraag dan een Owner of Admin om een nieuwe uitnodiging, of meld u gewoon aan.

## Een rol van een lid wijzigen

Open het menu naast een lid en selecteer **Change Role → Admin** of **Viewer**. De wijziging gaat direct in; mogelijk moet de persoon de pagina herladen om hem te zien. Admins kunnen de rol van andere Admins wijzigen. Niemand kan de rol van de Owner wijzigen: [draag het eigendom over](https://docs.uavmatrix.com/nl/fleet-manager/team/#transfer-ownership) in plaats daarvan.

![Menu met ledenacties met Change Role, Transfer Ownership en Remove Member](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/team--member-menu.webp)

*Ledenmenu, geopend door de Owner, met Change Role, Transfer Ownership en Remove Member.*

## Een lid verwijderen of een uitnodiging intrekken

- **Een lid verwijderen:** open het menu van het lid en selecteer **Remove Member**. Die persoon verliest direct de toegang. De Owner kan niet worden verwijderd.
- **Een uitnodiging intrekken:** selecteer onder **Pending Invitations** de optie **Revoke**. De link werkt dan niet meer.

> **Geen bevestigingsstap**
>
> **Remove Member** en **Transfer Ownership** worden direct uitgevoerd zodra u ze selecteert. Controleer de naam voordat u klikt.

Het verwijderen van een lid raakt de drones niet aan. Maar als die persoon de licenties bezit van drones die u later wilt koppelen, mislukt het koppelen van die drones totdat die persoon weer lid is.

## Eigendom overdragen

Alleen de Owner kan dit doen. Open het menu van het lid dat het overneemt en selecteer **Transfer Ownership**. Dat lid wordt de **Owner**, en u wordt **Admin**.

Gebruik dit wanneer de persoon die de organisatie heeft opgezet, vertrekt, of voordat u uw UAVmatrix-account verwijdert: Fleet Manager verwijdert geen account dat nog een organisatie bezit.

## Werken met klanten en partners

Een gebruiker kan lid zijn van een willekeurig aantal organisaties, met in elk een andere rol. Gebruikelijke opzetten:

- **Serviceprovider:** uw medewerkers zijn Admins in uw organisatie. Elke klant krijgt een Viewer-rol, zodat hij zijn vluchten live op de kaart kan volgen.
- **Onderaannemer:** een partner nodigt uw piloot uit als Admin in hun organisatie. Uw piloot schakelt tussen beide organisaties met de organisatieschakelaar.

Source: https://docs.uavmatrix.com/nl/fleet-manager/team/
