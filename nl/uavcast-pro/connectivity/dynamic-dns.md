# Dynamische DNS

> Houd een hostnaam gekoppeld aan het wisselende publieke IP-adres van uw drone met de Dynamische DNS van UAVcast-Pro (No-IP, DynDNS, DuckDNS of een generieke URL), en wanneer een VPN de betere keuze is.

Dynamische DNS houdt een hostnaam, zoals `mydrone.ddns.net`, gekoppeld aan het huidige publieke IP-adres van de drone. UAVcast-Pro controleert het publieke IP elke 5 minuten en werkt uw DNS-provider bij wanneer het verandert. Open **Dynamische DNS** in de zijbalk.

> **Meestal hebben mobiele verbindingen een VPN nodig**
>
> Dynamische DNS helpt alleen als het publieke IP van de drone inkomende verbindingen kan ontvangen. De meeste mobiele providers plaatsen SIM-kaarten achter carrier-grade NAT, zodat het publieke IP van de provider toebehoort en niet van uw drone. Gebruik een [VPN](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/vpn/), tenzij uw SIM een publiek IP-adres heeft (vaak een 'statisch' of 'M2M'-adres).

Dynamische DNS wijzigt niet waar UAVcast-Pro telemetrie en video naartoe stuurt: dat gaat altijd naar de IP-adressen bij [Grondcontrolestations](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/). Het is bedoeld om de webinterface of SSH van de drone van buitenaf te bereiken.

## Instellen

1. Maak een hostnaam aan bij uw DNS-provider (No-IP, DynDNS of DuckDNS).
2. Ga in UAVcast-Pro naar **Dynamische DNS**. Zet **Dynamische DNS Inschakelen?** op **Ja**.
3. Kies uw **DNS-systeem**.
4. Voer uw accountgebruikersnaam in (het veld heet **Dynamische DNS-configuratie**), uw **Wachtwoord** en de hostnaam bij **Alias**. Voor DuckDNS zet u uw token in het gebruikersnaamveld en iets willekeurigs in **Wachtwoord** (het formulier vereist het, DuckDNS negeert het). De velden worden opgeslagen zodra u ze verlaat.
5. Selecteer **Verbinden** om de updater te starten. Deze stuurt meteen het huidige IP-adres en controleert daarna elke 5 minuten. **Verbinding Verbreken** stopt hem.

![Dynamische DNS Beheer met Dynamische DNS inschakelen op Nee, lege velden voor gebruikersnaam, wachtwoord en alias, en DNS-systeem noip](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/dynamic-dns.webp)

*Dynamische DNS Beheer voordat het is ingeschakeld.*

## Instellingenoverzicht

| Instelling | Standaard | Waarden | Opmerkingen |
| --- | --- | --- | --- |
| **Dynamische DNS inschakelen?** | **Nee** | **Ja**, **Nee** |  |
| **DNS-systeem** | **No-IP** | **No-IP**, **DynDNS**, **DuckDNS**, **Algemeen** |  |
| **DNS-URL** | leeg | update-URL | Alleen voor **Algemeen**. De DynDNS-compatibele update-URL van de provider. |
| **Dynamische DNS-configuratie** (gebruikersnaam) | leeg |  | Uw DNS-accountgebruikersnaam, of uw token voor DuckDNS. Het UI-label van dit veld is wat vreemd; het is de gebruikersnaam. |
| **Wachtwoord** | leeg |  | Uw DNS-accountwachtwoord. Vereist door het formulier; genegeerd voor DuckDNS. |
| **Alias** | leeg | hostnaam | De hostnaam die moet worden bijgewerkt, bijvoorbeeld `mydrone.ddns.net`. |
| Update-interval | 5 minuten | vast |  |

De rij **Dynamische DNS** op het [Dashboard](https://docs.uavmatrix.com/nl/uavcast-pro/dashboard/) toont of de updater draait. Het **Actielogboek** toont elke update en het antwoord van de provider.

Source: https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/dynamic-dns/
