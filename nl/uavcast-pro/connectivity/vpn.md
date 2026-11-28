# VPN

> Plaats uw drone en grondstation op één privénetwerk met de Fleet Manager VPN, of met uw eigen Tailscale- of ZeroTier-netwerk, zodat telemetrie en video werken via 4G/LTE.

Via 4G/LTE krijgt uw drone een adres van de mobiele provider dat uw grondstation niet kan bereiken. Een VPN lost dat op: de drone en het grondstation sluiten aan op hetzelfde privénetwerk en krijgen daarop vaste adressen, waar ze ook zijn en welk netwerk ze ook gebruiken. Open **Virtueel Privénetwerk** in de zijbalk.

De snelste manier is de **Fleet Manager VPN**, die is inbegrepen bij uw UAVcast-Pro-licentie. Als u al uw eigen Tailscale-tailnet of ZeroTier-netwerk gebruikt, kan UAVcast-Pro daarbij aansluiten.

![Pagina Virtueel Privénetwerk met VPN ingeschakeld, Tailscale geselecteerd, het tabblad Fleet Manager en VPN-informatie met Niet Verbonden](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/private-network.webp)

*Virtueel Privénetwerk met Tailscale geselecteerd op een drone die nog niet is gekoppeld of ingelogd.*

## Welke moet ik gebruiken?

|  | Fleet Manager VPN | Tailscale | ZeroTier |
| --- | --- | --- | --- |
| Account | Uw Fleet Manager-organisatie (inbegrepen bij uw licentie) | Uw eigen Tailscale-account | Uw eigen ZeroTier-netwerk (zelf beheerd) |
| Instellen op de drone | Eén klik tijdens of na het koppelen | Inloggen met een browserlink of een authenticatiesleutel | Een netwerk-ID plakken |
| Grondstations | Aangesloten via de pagina **Network** van Fleet Manager, streams ingesteld met streamkoppelingen | Aansluiten op uw tailnet | Aansluiten op uw netwerk |
| Het beste voor | De meeste operators, en elke vloot | Teams die al Tailscale gebruiken | Teams die al ZeroTier gebruiken |

De drone kan via deze pagina op één VPN tegelijk zitten.

> **UAVnet wordt uitgefaseerd**
>
> UAVnet, de gehoste ZeroTier-controller van UAVmatrix op uavnet.uavmatrix.com, wordt uitgefaseerd ten gunste van Fleet Manager. Als uw drones een UAVnet-netwerk gebruiken, verplaats ze dan naar de Fleet Manager VPN. De knop **Open UAVNet Controller** op deze pagina opent UAVnet.

## Fleet Manager VPN

De Fleet Manager VPN is het privénetwerk van uw organisatie, beheerd door Fleet Manager op de Tailscale-client. U hebt geen Tailscale-account nodig.

1. Open in Fleet Manager **Network** (Netwerk) en selecteer **Enable VPN Network** als die nog niet aan staat. Zie [Netwerk en VPN](https://docs.uavmatrix.com/nl/fleet-manager/network/).
2. [Koppel de drone](https://docs.uavmatrix.com/nl/uavcast-pro/fleet-pairing/) en laat **Enable VPN for this UAV** aangevinkt in de koppelwizard. Een drone die al is gekoppeld, sluit aan via het tabblad **Fleet Manager** op deze pagina (zie hieronder), of met **Push to Drone** op de pagina **Network** van Fleet Manager.
3. Plaats elk grondstation op het netwerk via de pagina **Network** van Fleet Manager: [Een grondstation aansluiten](https://docs.uavmatrix.com/nl/fleet-manager/connect-gcs/).
4. Stuur streams ernaartoe met een [streamkoppeling](https://docs.uavmatrix.com/nl/fleet-manager/network/stream-bindings/). Fleet Manager voegt de bestemming voor u toe op de pagina [Grondcontrolestations](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/) van de drone.

Een stapsgewijze vluchtinstelling via 4G staat in [Vliegen buiten zicht over 4G](https://docs.uavmatrix.com/nl/guides/bvlos-4g/).

## Tailscale

Gebruik dit voor uw eigen tailnet, of voor de Fleet Manager VPN op een drone die al is gekoppeld. UAVcast-Pro installeert Tailscale. Kies op een van de drie tabbladen hoe de drone inlogt.

**Web Login**

1. Zet **VPN Inschakelen** op **Ja** en kies **Tailscale** bij **Diensten**.
2. Selecteer op **Web Login** **Login-URL genereren** en daarna **Authenticeer dit apparaat**.
3. Log in op Tailscale in het nieuwe tabblad en keur het apparaat goed.
4. Terug in UAVcast-Pro verandert de status naar **Verbonden** en worden **IPv4 Adres**, **Hostnaam** en **Tailnet** getoond.

**Authenticatiesleutel**

1. Genereer in de [Tailscale-beheerconsole](https://login.tailscale.com/admin/settings/keys) een authenticatiesleutel. Maak die vooraf goedgekeurd; maak hem herbruikbaar als u meerdere drones instelt.
2. Kies in UAVcast-Pro **Tailscale**, open **Authenticatiesleutel**, plak de sleutel (`tskey-auth-…`) en stel optioneel **Hostnaam (Optioneel)** in.
3. Selecteer **Verbind met Authenticatiesleutel**.

Gebruik dit voor drones waar geen browser bij is, of om veel drones op dezelfde manier in te stellen.

**Fleet Manager**

Als de drone [gekoppeld is aan Fleet Manager](https://docs.uavmatrix.com/nl/uavcast-pro/fleet-pairing/) en uw organisatie de VPN heeft ingeschakeld, selecteert u **Verbinden met Fleet Manager VPN**. Verbinden kan tot 30 seconden duren. De status toont dan **Verbonden met Fleet Manager**.

Nog niet gekoppeld? Het tabblad toont **Niet gekoppeld aan Fleet Manager** en verwijst naar **Ga naar koppeling Fleet Manager**.

Installeer Tailscale op het grondstation, log in op hetzelfde tailnet en gebruik het Tailscale-IP-adres (`100.x.y.z`) als bestemming op Grondcontrolestations.

Wanneer verbonden, zet **Interface Uit** de Tailscale-interface uit zonder uit te loggen, zet **Interface Aan** hem weer aan, en verwijdert **Uitloggen** het apparaat uit het tailnet.

> **De Fleet Manager VPN vervangt uw eigen Tailscale-login**
>
> De Fleet Manager VPN draait op Tailscale met de eigen loginserver van Fleet Manager. Verbinden ermee logt de drone uit van uw eigen tailnet. Als uw SSH-sessie via dat tailnet loopt, wordt die verbroken. Doe dit vanaf het lokale netwerk.

## ZeroTier

Gebruik dit als u een eigen ZeroTier-netwerk beheert, bijvoorbeeld in ZeroTier Central of op uw eigen controller.

### De drone verbinden

1. Ga in UAVcast-Pro naar **Virtueel Privénetwerk**.
2. Zet **VPN Inschakelen** op **Ja**.
3. Kies bij **Diensten** **ZeroTier**.
4. Plak uw netwerk-ID van 16 tekens in **Netwerk ID** en selecteer **Verbinden met Netwerk**.
5. Autoriseer de drone in uw ZeroTier-controller als het netwerk privé is. Het paneel **ZeroTier Netwerk** toont dan **Verbonden** en het **Apparaat IP**.

**TOEGANG_GEWEIGERD** betekent dat het apparaat nog niet is geautoriseerd.

### Het grondstation verbinden

1. Installeer [ZeroTier One](https://www.zerotier.com/download/) op de computer van het grondstation.
2. Verbind met hetzelfde netwerk-ID: op Windows en macOS via het ZeroTier-pictogram in de systeemvak of menubalk (**Join New Network**); op Linux met `sudo zerotier-cli join <network-id>`.
3. Autoriseer het in uw controller en noteer het IP-adres dat het krijgt.

Stel op [Grondcontrolestations](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/) de **Bestemmings-IP of Host** in op het **ZeroTier**-IP van het grondstation. Telemetrie en video gaan nu via de VPN.

> **Wisselen tussen Wi-Fi en 4G**
>
> ZeroTier en Tailscale volgen het best beschikbare netwerk. U kunt op het veld beginnen op Wi-Fi, en de verbinding schakelt over naar het modem zodra het Wi-Fi-bereik wegvalt, zonder dat een adres verandert.

## Overzicht van instellingen

| Instelling | Standaard | Waarden | Opmerkingen |
| --- | --- | --- | --- |
| **VPN Inschakelen** | **Nee** | **Ja**, **Nee** |  |
| **Diensten** | **ZeroTier** | **ZeroTier**, **Tailscale** | Uitgeschakeld totdat VPN is ingeschakeld. |
| **Netwerk ID** (ZeroTier) | leeg | 16-tekens ZeroTier-netwerk-ID | Van uw eigen ZeroTier-controller. |
| **Authenticatiesleutel** (Tailscale) | leeg | `tskey-auth-…` |  |
| **Hostnaam (Optioneel)** (Tailscale) | systeemhostnaam | tekst | Naam die in de Tailscale-beheerconsole wordt getoond. |

## Probleemoplossing

| Symptoom | Controleer |
| --- | --- |
| ZeroTier toont **TOEGANG_GEWEIGERD** | Autoriseer het apparaat in uw ZeroTier-controller. |
| Verbonden, maar geen telemetrie op het grondstation | De bestemming gebruikt nog het LAN-IP. Gebruik het VPN-IP van het grondstation en sta UDP 14550 en 5600 toe in de firewall. |
| *Geen VPN-informatie beschikbaar* | VPN is uitgeschakeld of de dienst draait niet. Controleer **VPN Inschakelen** en het **Actielogboek**. |
| Tailscale-webinlog toont *Geen authenticatie-URL* | Gebruik in plaats daarvan het tabblad **Authenticatiesleutel**. |

De interfaces verschijnen op de pagina [Netwerken](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/networks/) als `zt…` (ZeroTier) of `tailscale0`, gemarkeerd met **VPN**.

Nog steeds vast? Zie [VPN verbonden maar de drone is niet bereikbaar](https://docs.uavmatrix.com/nl/troubleshooting/vpn-cant-reach-drone/).

Source: https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/vpn/
