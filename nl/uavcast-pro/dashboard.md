# Dashboard

> Lees het UAVcast-Pro-dashboard om de vluchtcontroller, GPS, batterij, grondstationverbinding, mobiel modem, VPN, RTK, video en de temperatuur, voeding en CPU-beperking van de Raspberry Pi te controleren.

Het dashboard is de checklist vóór de vlucht voor de companion computer. Eén statuskaart laat zien of de vluchtcontroller, GPS, batterij, grondstationverbinding, modem, VPN, RTK, video en voeding in orde zijn, met een samenvatting zoals *Alle systemen normaal* of *2 problemen*. Daaronder vindt u systeeminformatie, netwerkverkeer, geheugen en opslag. Open **Dashboard** in de zijbalk.

![UAVcast-Pro-dashboard met de statuskaart met 2 problemen, systeeminformatie met temperatuur en de grafiek van het netwerkverkeer](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/dashboard.webp)

*Dashboard op een testunit: twee problemen (geen GPS-fix, VPN niet verbonden), systeeminformatie en netwerkverkeer.*

## Statuskaart

De kaart bestaat uit drie groepen. Elke rij heeft een gekleurd bolletje: groen is goed, oranje is een waarschuwing, rood is een probleem.

| Rij | Voorbeeldwaarden | Wat te doen als het niet groen is |
| --- | --- | --- |
| **Vluchtcontroller** | *Actief*, *Inactief*, *Verbinding gestopt*, *Verbinden...* | Zie [Vluchtcontroller](https://docs.uavmatrix.com/nl/uavcast-pro/flight-controller/). |
| **GPS** | *3D fix · 14 satellieten*, *RTK Vast*, *Geen Fix*, *Geen GPS* | Wacht buiten op een fix, of controleer de GPS-bedrading. |
| **Batterij** | spanning en percentage | Laad op of controleer de batterijmonitor-instelling van de vluchtcontroller. |
| **Grondstation** | *Verzenden naar 2 · 16 pakketten/s*, *Niet verzenden*, *1 ingesteld · wacht op vluchtcontroller*, *Geen ingesteld* | Zie [Grondcontrolestations](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/). |
| **Mobiel modem** | provider en signaal, *Geen modem gedetecteerd* | Zie [Mobiel modem](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/cellular-modem/). |
| **VPN** | *Verbonden*, *Niet verbonden*, *Uitgeschakeld* | Zie [VPN](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/vpn/). |
| **RTK-correcties** | *Verbinden...*, *Fout - controleer instellingen*, *Uitgeschakeld* | Zie [NTRIP / RTK](https://docs.uavmatrix.com/nl/uavcast-pro/flight-controller/ntrip-rtk/). |
| **Video** | *Actief*, *Gestopt*, *Uitgeschakeld* | Zie [Camera](https://docs.uavmatrix.com/nl/uavcast-pro/camera/). |
| **Dynamische DNS** | *Actief*, *Uitgeschakeld* | Zie [Dynamische DNS](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/dynamic-dns/). |
| **Voeding** | *Stabiel*, *Spanning te laag - gebruik een sterkere voeding*, *Vertraagd (warmte of voeding)*, *Spanning gedaald sinds opstarten* | Zie [Voeding](https://docs.uavmatrix.com/nl/uavcast-pro/dashboard/#power-and-temperature). |

*Dienst mislukt - wordt herstart* bij een rij betekent dat de dienst is gecrasht en automatisch opnieuw wordt gestart. Blijft dit staan, download dan de logboeken via **Applicatie → Logboekregistratie**.

## Voeding en temperatuur

Op een Raspberry Pi toont **Systeeminformatie** **Voeding**, **CPU-beperking** en **Temperatuur**:

- **Spanning te laag - gebruik een sterkere voeding**: de Pi heeft nu een onderspanning. Dit veroorzaakt USB-resets, waardoor het modem of de vluchtcontroller kan wegvallen. Los de voeding op vóór het vliegen.
- **Spanning gedaald sinds opstarten**: dit is ergens sinds het opstarten gebeurd. Vaak veroorzaakt door piekbelastingen van de zender van het modem.
- **Vertraagd (warmte of voeding)**: de CPU wordt beperkt. Videocodering heeft er het eerst last van. Voeg een koellichaam of luchtstroom toe, of los de voeding op.

De temperatuurbalk wordt rood naarmate de Pi zijn beperkingsgrens nadert.

## Overige kaarten

| Kaart | Toont |
| --- | --- |
| **Systeeminformatie** | **Besturingssysteem**, **Hardware** (CPU en kernen), **Uptime**, voeding en **Temperatuur**. |
| **Netwerkverkeer** | Totalen en snelheden voor ontvangen en verzonden data per interface. Kies **Laatste 50** tot **Laatste 1000** samples. Handig om te controleren hoeveel de video van het modem gebruikt. |
| **Geheugengebruik** | **Totaal**, **Gebruikt** en **Vrij**. Gegevens worden elke 10 seconden verzameld. |
| **Opslag** | **Totaal**, **Gebruikt** en **Vrij** per partitie. |

De grafieken hebben na het opstarten enkele minuten aan gegevens nodig voordat ze iets tonen.

## Rondleiding

Wanneer u de webinterface voor het eerst opent, biedt een rondleiding aan u de belangrijkste pagina's te tonen. U kunt **Rondleiding overslaan** kiezen of **Niet meer tonen**. Start de rondleiding opnieuw via **Applicatie → Instellingen → Neem een Rondleiding**.

Stroomproblemen in detail: [Onderspanning en beperking](https://docs.uavmatrix.com/nl/troubleshooting/undervoltage-and-throttling/).

Source: https://docs.uavmatrix.com/nl/uavcast-pro/dashboard/
