# Gebruikers en toegang

> Beveilig de UAVcast-Pro-webinterface met een beheerdersaanmelding, voeg alleen-lezen gebruikers toe die telemetrie en video kunnen bekijken maar de drone niet kunnen besturen, en wijzig of herstel wachtwoorden.

Een nieuwe installatie van UAVcast-Pro heeft geen gebruikers en geen aanmelding: iedereen die de webinterface kan openen, heeft volledige beheerdersrechten. Voeg een beheerder toe om de aanmelding in te schakelen. Daarna kunt u **Read Only**-gebruikers toevoegen voor waarnemers, klanten of payload-operators die alles mogen zien maar niets mogen wijzigen. Open **Beheer → Users**.

![Users-pagina met het dialoogvenster Add New User geopend, met velden voor username, password, confirm password en role](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/users.webp)

*Beheer → Users met het dialoogvenster Add New User geopend.*

## De aanmelding inschakelen

1. Ga naar **Users** en selecteer **Add User**.
2. Voer een **Username** in (minimaal 3 tekens), een **Password** (minimaal 6 tekens) en **Confirm Password**.
3. Selecteer **Create User**. De eerste gebruiker is altijd een **Admin** (*First user must be an admin*).

Vanaf nu krijgt elke bezoeker een aanmeldpagina. Een aanmelding blijft 7 dagen geldig in die browser, of tot u **Uitloggen** selecteert in het gebruikersmenu onderaan de zijbalk.

> **De webinterface gebruikt onbeveiligd HTTP**
>
> Aanmeldingen en instellingen worden onversleuteld verzonden. Dat is prima op uw eigen LAN of binnen een [VPN](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/vpn/), maar stuur de poort van de webinterface nooit door naar het internet.

## Rollen

| Kan… | **Admin** | **Read Only** |
| --- | --- | --- |
| De pagina's Dashboard, Datastromen, Vluchtcontroller, Vliegkaart, Grondcontrolestations en Camera bekijken | Ja | Ja |
| Live video en telemetrie bekijken, dashboards en opnames weergeven | Ja | Ja |
| Elke instelling wijzigen | Ja | Nee |
| Armen, ontwapenen, de modus wijzigen, missies starten of wissen | Ja | Nee |
| Opnames starten of stoppen | Ja | Nee |
| Modem, Virtueel Privénetwerk, Dynamische DNS, Netwerken, Fleet Management, Users en Applicatie openen | Ja | Nee (verborgen) |

U kunt geen **Read Only**-gebruiker aanmaken voordat er een beheerder bestaat (*Create an admin user first before adding read-only users*).

Alleen-lezen webgebruikers zijn iets anders dan de schakelaar **Read Only** op een bestemming van een grondstation, die opdrachten van een grondstationprogramma blokkeert. Zie [grondcontrolestations](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/).

## Een wachtwoord wijzigen

Selecteer **Change Password**, voer het **Current Password** en het **New Password** twee keer in, en selecteer **Update Password**. Wachtwoorden worden opgeslagen als bcrypt-hashes.

## Een gebruiker verwijderen

Selecteer **Verwijderen** op de rij van de gebruiker en bevestig.

- U kunt uw eigen account niet verwijderen zolang er andere gebruikers zijn.
- Het verwijderen van de **laatste** gebruiker schakelt de aanmelding weer uit: *After deletion, the application will be open without authentication until a new user is created.*

## Het beheerderswachtwoord vergeten

Er is geen herstelkoppeling, omdat de drone geen e-mail heeft en wachtwoordherstel niet via zelfbediening kan.

- Als een andere beheerder nog kan inloggen, kan die uw gebruiker verwijderen onder **Users** en opnieuw aanmaken.
- Als niemand met de rol Admin kan inloggen, neem dan contact op met support via **[support@uavmatrix.com](mailto:support@uavmatrix.com)**. Voeg uw licentiesleutel toe (of het e-mailadres waarmee u hebt gekocht), de hostnaam of naam van het apparaat zoals weergegeven onder **Applicatie → Licentie Beheer → Geactiveerde apparaten**, de UAVcast-Pro-versie, en of u het apparaat via SSH kunt bereiken.

Source: https://docs.uavmatrix.com/nl/uavcast-pro/users/
