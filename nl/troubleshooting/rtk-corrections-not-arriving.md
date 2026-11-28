# RTK-correcties komen niet aan

> NTRIP blijft hangen op Verbinden, geen RTCM doorgestuurd of geen RTK Vast? Controleer caster-host, poort, mountpoint, inloggegevens, GGA upstream en de GPS-ontvanger.

Onder **Vluchtcontroller → NTRIP / RTK** bereikt de status niet **Correcties worden gestreamd**, blijft **RTCM-berichten doorgestuurd** op nul staan, of komen de correcties wel binnen maar haalt de vluchtcontroller nooit verder dan **3D Fix** of **RTK Float**.

De keten heeft vier schakels: internet → caster → UAVcast-Pro → vluchtcontroller → GPS-ontvanger. Zoek de eerste schakel die defect is.

![Tabblad NTRIP / RTK met het statuspaneel, de tellers en de regel met het caster-antwoord, en de kaart GPS-kwaliteit](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/flight-controller--ntrip.webp)

*Vluchtcontroller → NTRIP / RTK op een toestel zonder ingestelde caster: status Uitgeschakeld, tellers op nul en een leeg Caster-antwoord. Gezond is Correcties worden gestreamd, een caster-antwoord 200 en oplopende tellers.*

| Wat u ziet | Waarschijnlijke oorzaak | Begin bij |
| --- | --- | --- |
| Status Verbinden of Fout, geen caster-antwoord | Verkeerde host of poort, een TLS-verschil, of geen internet | [Controle 1](https://docs.uavmatrix.com/nl/troubleshooting/rtk-corrections-not-arriving/#check-1) |
| Caster-antwoord 401 Unauthorized | Verkeerde gebruikersnaam, wachtwoord of mountpoint | [Controle 2](https://docs.uavmatrix.com/nl/troubleshooting/rtk-corrections-not-arriving/#check-2) |
| Logboek zegt dat de caster een sourcetable heeft teruggegeven | De naam van de mountpoint is onjuist | [Controle 2](https://docs.uavmatrix.com/nl/troubleshooting/rtk-corrections-not-arriving/#check-2) |
| Verbonden, maar geen RTCM-gegevens, herverbindt elke paar seconden | De caster heeft eerst een GGA-positie nodig | [Controle 3](https://docs.uavmatrix.com/nl/troubleshooting/rtk-corrections-not-arriving/#check-3) |
| RTCM doorgestuurd, fix blijft op 3D Fix | Verbinding met de vluchtcontroller is weg, of de ontvanger is niet RTK-geschikt | [Controle 4](https://docs.uavmatrix.com/nl/troubleshooting/rtk-corrections-not-arriving/#check-4) |
| RTK Float, nooit RTK Vast | Zicht op de hemel, afstand tot de basis, of tijd | [Controle 5](https://docs.uavmatrix.com/nl/troubleshooting/rtk-corrections-not-arriving/#check-5) |

## Controle 1: Bereik de caster

1. Controleer **Caster host** en **Port**. De meeste publieke casters gebruiken gewone TCP op poort `2101`.
2. **Use TLS (HTTPS)** moet overeenkomen met de caster. Commerciële casters (Trimble, Hexagon, Topcon en andere) hebben vaak TLS nodig, meestal nog steeds op poort 2101, soms op 2102 of 443. Publieke casters gebruiken doorgaans geen TLS.
3. Zorg dat de drone internet heeft. **Dashboard → Cellular** moet verbonden zijn. Zo niet, zie [Modem verbonden, geen internet](https://docs.uavmatrix.com/nl/troubleshooting/modem-no-internet/).
4. Sommige mobiele abonnementen blokkeren ongebruikelijke uitgaande poorten. Als de caster poort 443 aanbiedt, probeer die dan.

## Controle 2: Inloggegevens en mountpoint

1. Druk op **Test connection**. **Caster accepted the credentials.** betekent dat gebruikersnaam en wachtwoord kloppen.
2. Gebruik voor rtk2go.com een echt e-mailadres als **Username** en laat **Password** leeg.
3. Druk op **Browse mountpoints** en kies een mountpoint uit de lijst in plaats van de naam te typen. Kies bij voorkeur een mountpoint dicht bij de plek waar u vliegt.

Als de caster in plaats van gegevens zijn sourcetable teruggeeft, meldt het NTRIP-logboek *caster returned sourcetable — check mountpoint*. De mountpointnaam is onjuist of bestaat niet meer.

## Controle 3: GGA upstream versturen

VRS- en dichtstbijzijnde-mountpoint-casters sturen pas correcties nadat ze weten waar u bent. De kolom **NMEA** in de mountpoint-browser toont **Required** voor die mountpoints.

1. Zet **Send GGA upstream** aan (standaard aan). **Send interval (seconds)** staat standaard op 10.
2. **Position source**: **Live position from flight controller** is de juiste keuze tijdens het vliegen. Totdat de vluchtcontroller een GPS-fix meldt, gebruikt UAVcast-Pro de **Fixed manual position**. Voer voor bankproeven daarom een breedte- en lengtegraad in die bij u in de buurt liggen.
3. Let erop dat **Last GGA sent** wordt bijgewerkt.

UAVcast-Pro herverbindt zelf wanneer de caster stil valt, en het logboek toont *no data from caster for …s — reconnecting*. Na een korte internetonderbreking hervatten de correcties binnen enkele seconden.

## Controle 4: Van UAVcast-Pro naar de ontvanger

Correcties bereiken de GPS via de verbinding met de vluchtcontroller, als MAVLink `GPS_RTCM_DATA`.

1. De vluchtcontroller moet **Verbonden** zijn onder **Vluchtcontroller → Verbinding**. Zo niet, zie [Geen MAVLink-heartbeat](https://docs.uavmatrix.com/nl/troubleshooting/no-mavlink-heartbeat/).
2. Kijk naar de kaart **GPS-kwaliteit**. **No RTK status from receiver** betekent dat de vluchtcontroller nooit een RTK-status heeft gemeld. De aangesloten GPS is meestal niet RTK-geschikt: RTK vereist een carrier-phase RTK-ontvanger, zoals een u-blox F9P, Here3+ of Septentrio Mosaic. Een standaard M8N- of M10-navigatiemodule werkt niet voor RTK.
3. **Recente berichttypen** moet de constellaties bevatten die uw ontvanger gebruikt (bijvoorbeeld 1077 GPS, 1087 GLONASS, 1097 Galileo, 1127 BeiDou) en een basispositiebericht (1005 of 1006).

## Controle 5: Float, maar nooit Fixed

- Geef de antenne vrij zicht op de hemel. Bomen, gebouwen en de eigen elektronica van de drone veroorzaken multipath en ruis.
- Wacht. Een koude start kan zelfs bij goede omstandigheden een minuut of twee duren.
- Kies een basis die dichterbij ligt. Nauwkeurigheid en de kans op een fix nemen af naarmate de afstand tot het basisstation groter wordt.
- **Last correction** in **GPS-kwaliteit** moet op enkele seconden blijven. Als het oploopt, gaan er correcties verloren op de verbinding.

## Nog steeds niet werkend?

[Download de logboeken](https://docs.uavmatrix.com/nl/troubleshooting/collect-logs/) met **NTRIP Client** geselecteerd en stuur ze, samen met uw caster-provider en GPS-model, naar **[support@uavmatrix.com](mailto:support@uavmatrix.com)**. De volledige instelling staat in [RTK instellen met een NTRIP-caster](https://docs.uavmatrix.com/nl/guides/rtk-ntrip-caster/).

Gerelateerd: [NTRIP / RTK-instellingen](https://docs.uavmatrix.com/nl/uavcast-pro/flight-controller/ntrip-rtk/)

Source: https://docs.uavmatrix.com/nl/troubleshooting/rtk-corrections-not-arriving/
