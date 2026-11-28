# Mobiel modem (4G/LTE)

> Sluit een HiLink- of traditioneel 4G/LTE USB-modem aan op UAVcast-Pro, met automatische APN-detectie, SIM-PIN, automatisch opnieuw verbinden en modemsignaalinformatie voor vliegen via het mobiele netwerk.

Een 4G/LTE-modem geeft de drone internettoegang waar er mobiel bereik is, zodat telemetrie en video uw grondstation ook ver buiten wifi-bereik bereiken. UAVcast-Pro ondersteunt **HiLink**-modems, die zichzelf verbinden, en **Traditioneel (PPP)**-modems, die UAVcast-Pro via ModemManager verbindt. Voor traditionele modems vindt het de APN automatisch, verbindt het bij het opstarten en verbindt het opnieuw na onderbrekingen. Open **Modem** in de zijbalk.

![Modempagina met Traditioneel (PPP) geselecteerd, APN op Automatisch, en het paneel Geen Modem Aangesloten](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/modem.webp)

*Modempagina met Traditioneel (PPP) geselecteerd en de APN op Automatisch, voordat er een modem is aangesloten.*

## Welk type is mijn modem?

|  | HiLink | Traditioneel (PPP) |
| --- | --- | --- |
| Hoe het zich toont | Een netwerkkaart (`usb0` of `eth1`). Het modem draait zijn eigen router en webpagina, vaak op `192.168.8.1`. | Een modemapparaat dat door ModemManager wordt beheerd. De verbinding verschijnt meestal als `ppp0` of `wwan0`. |
| Wie verbindt | Het modem zelf. | UAVcast-Pro, via ModemManager en NetworkManager. |
| Instellingen in UAVcast-Pro | Geen. Stel indien nodig de APN in op de eigen webpagina van het modem. | APN (optioneel), gebruikersnaam, wachtwoord, PIN. |
| Voorbeelden | Huawei E3372h, E8372 | Huawei E3372s, Quectel EC25 / EG25, Sierra Wireless |

Weet u het niet zeker? Sluit het modem aan en voer `mmcli -L` uit op de drone. Als ModemManager het vermeldt, gebruik dan **Traditioneel (PPP)**. Zo niet, en er verschijnt een nieuwe netwerkinterface onder **Netwerken**, dan is het een HiLink-modem.

## Een traditioneel modem instellen

1. Plaats een data-SIM en sluit het modem aan op de companion computer.
2. Ga naar **Modem**. Zet **Modem inschakelen** op **Ja** en **Modemtype** op **Traditioneel (PPP)**.
3. Laat **Access Point Naam (Optioneel)** leeg. UAVcast-Pro detecteert deze.
4. Voer de **PIN-code (Optioneel)** in als uw SIM daarom vraagt.
5. Wacht 30 tot 90 seconden. **Modeminformatie** toont de provider, de technologie en **IPv4 Informatie** zodra er verbinding is.

Een aangesloten modem verbindt automatisch. Als u **Verbinding Verbreken** selecteert, blijft het verbroken tot u het opnieuw verbindt, ook na een herstart.

### Hoe de automatische APN werkt

Met het APN-veld leeg probeert UAVcast-Pro, in deze volgorde:

1. de APN die de vorige keer met de provider van deze SIM werkte,
2. de standaard van het netwerk (lege APN),
3. de APN waarmee het modem zich bij LTE aanmeldde,
4. de internet-APN's van de provider uit de database van de aanbieder van mobiel breedband.

De eerste die een internetadres krijgt, wordt opgeslagen voor die provider. Plaatst u een nieuwe SIM van een andere provider, dan detecteert het opnieuw. Heeft uw provider een speciale APN nodig (privé-APN, M2M- of zakelijke SIM's), typ die dan in. Een door de gebruiker ingestelde APN is de enige die wordt geprobeerd.

## Een HiLink-modem instellen

1. Sluit het modem aan. Wacht tot de LED een vaste verbinding toont.
2. Zet op **Modem** **Modem inschakelen** op **Ja** en **Modemtype** op **HiLink**.
3. Controleer **Hilink Modeminformatie**: u ziet de **Interface** en een **IP-adres**.

HiLink-modems verbinden, kiezen het netwerk en verbinden zichzelf opnieuw, dus er zijn geen verbindingsknoppen. Wijzig de APN, PIN of netwerkmodus op de eigen webpagina van het modem (ga ernaartoe vanaf het netwerk van de drone, vaak `http://192.168.8.1`).

## Instellingenoverzicht

| Instelling | Standaard | Waarden | Opmerkingen |
| --- | --- | --- | --- |
| **Modem inschakelen** | **Ja** | **Ja**, **Nee** |  |
| **Modemtype** | **Traditioneel (PPP)** | **HiLink**, **Traditioneel (PPP)** |  |
| **Access Point Naam (Optioneel)** | leeg (**Automatisch**) | APN van uw provider | Alleen traditioneel. |
| **Gebruikersnaam (Optioneel)** / **Wachtwoord (Optioneel)** | leeg |  | Alleen traditioneel. De meeste providers hebben geen van beide nodig. |
| **PIN-code (Optioneel)** | leeg | SIM-PIN | Alleen traditioneel. Laat leeg als de SIM geen PIN heeft. |

## Modeminformatie

Bij traditionele modems toont **Modeminformatie** de **Signaalkwaliteit**, de **Technologie** (LTE, UMTS …), **Ontgrendeling Vereist**, de **Status**, de **Fabrikant**, de **IMEI**, het netwerk (**Provider**, **Code**, **Registratie**), de **IPv4 Informatie** (**IP-adres**, **Gateway**, **DNS**, **MTU**) en de **Verbindingseigenschappen** (**APN**, **IP Type**, **Roaming**).

De **Mobiel**-rij op het dashboard toont dezelfde signaalsamenvatting.

## Voordat u via het mobiele netwerk vliegt

- Selecteer op [Netwerken](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/networks/) **Modem Prioriteit (Buitenmodus)** zodat het verkeer op het modem blijft wanneer wifi bij het opstijgen nog binnen bereik is.
- Gebruik een [VPN](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/vpn/): mobiele providers geven de drone geen adres dat uw grondstation kan bereiken.
- Zet de GCS-failsafe op de vluchtcontroller aan.
- Controleer het signaal op hoogte: de dekking is gepland voor de grond, en het signaal verandert wanneer u stijgt.

## Probleemoplossing

| Symptoom | Controleer |
| --- | --- |
| *Geen Modem Aangesloten* | Het modem wordt niet gedetecteerd. Controleer de USB-verbinding en de voedings-LED van het modem. Gebruik een hub met eigen voeding als de Pi reset wanneer het modem verbindt. |
| **Ontgrendeling Vereist** toont *vergrendeld* | Voer de SIM-PIN in, of schakel de PIN uit in een telefoon. |
| Geregistreerd, maar geen IP-adres | Verkeerde APN. Typ de APN van de provider in in plaats van automatisch te gebruiken. |
| Verbindt, en valt daarna weg onder belasting | Meestal de voeding. Controleer de rij **Voeding** op het dashboard. |

Het **Actielogboek** toont elke APN-poging en de reden waarom deze is mislukt. Voor meer hulp, zie [Modem verbonden maar geen internet](https://docs.uavmatrix.com/nl/troubleshooting/modem-no-internet/).

Source: https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/cellular-modem/
