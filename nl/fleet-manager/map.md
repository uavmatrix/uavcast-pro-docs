# Live kaart

> Volg elke drone in uw vloot op één live kaart, met statusringen, koerslijnen, sporen van 5 minuten, volgmodus en OpenAIP-luchtruimlagen.

**Fleet Map** (zijbalk **Overview → Fleet Map**) toont elke drone in de geselecteerde organisatie op één kaart, die live wordt bijgewerkt zodra telemetrie binnenkomt. Hij is gemaakt voor een controlekamer: laat hem open staan en u ziet in één oogopslag welke toestellen in de lucht zijn, waarheen ze gaan en welke aandacht nodig hebben.

![Vlootkaart met veel gekleurde dronemarkeringen, koerslijnen en vliegsporen boven een regio](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/map.webp)

*Fleet Map in de Dark-stijl boven de haven van Rotterdam: elke drone in een eigen kleur met koerslijn en spoor, en grijze offline-markeringen met het aantal minuten sinds de laatste ontvangst.*

## Een markering lezen

Elke drone wordt getekend in een eigen kleur, met een pictogram voor het voertuigtype: quadcopter, hexacopter, vliegtuig, VTOL, rover, boot of onderzeeër. Ringen en badges rond de markering signaleren problemen:

| Op de markering | Betekenis |
| --- | --- |
| Kleur van de drone, geen ring | Online en gezond. |
| Grijze markering, grijze stippelring en klokbadge | **Offline**: al 20 seconden niets ontvangen. |
| Oranje ring met een **!**-badge | **NO MAVLINK**: UAVcast-Pro is online, maar heeft 10 seconden geen telemetrie van de vluchtcontroller ontvangen. Controleer de verbinding met de vluchtcontroller. |
| Rode stippelring | **GPS lost**: geen satellieten of geen fix. |
| Gele stippelring | **GPS weak**: minder dan 6 satellieten of alleen een 2D-fix. |
| **H**-markering | De thuispositie van de drone, ingesteld bij het armen. Beweeg de muis erover om de hoogte (AMSL) te zien. |

De markering zelf toont niet of de drone gearmd of ontwapend is. Open de popup, of gebruik het [bedieningspaneel](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remote-control/), om **Armed** te zien.

Het label naast de markering luidt `Name • FLIGHTMODE`. Daarbij worden **NO MAVLINK**, **NO GPS** of **WEAK GPS** getoond wanneer die van toepassing zijn. Voor een offline drone luidt het label `Name • OFFLINE • 5 mins ago`.

### Koerslijn en spoor

- De **koerslijn** is een gestreepte lijn in de kleur van de drone, die wijst waar de neus naartoe wijst. Hij is verborgen wanneer de drone offline is.
- Het **vliegspoor** toont het pad van de laatste **5 minuten**, als gestreepte lijn in de kleur van de drone (grijs wanneer offline). Ongeveer elke 11 m beweging wordt een nieuw punt toegevoegd.

## Drone-popup

Selecteer een markering om de popup te openen: naam, organisatie en status, daarna **Battery**, **Altitude**, **Mode**, **Armed**, **GPS** (satellieten en fixtype: No Fix, 2D, 3D, DGPS of RTK), **Signal** en, wanneer de drone offline is, **Last seen**. Ook het laatste statusbericht van de vluchtcontroller verschijnt, wat vaak de snelste manier is om een pre-armfout te lezen.

**Signal** is de round-trip-tijd tussen Fleet Manager en de drone, die elke 10 seconden wordt gemeten: uitstekend onder 100 ms, goed onder 300 ms, redelijk onder 600 ms, en slecht daarboven of na drie gemiste pings.

![Dronepopup op de kaart met rijen voor accu, hoogte, modus, armed, GPS en signaal, en de knoppen Follow, History en Controls](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/map--popup.webp)

*Popup voor een gearmde surveydrone in AUTO: Battery 71%, Altitude 85.5 m, GPS 20 sats (3D), Signal 61 ms (Excellent), met Follow, History en Controls.*

Er zijn drie knoppen:

- **Follow** houdt de drone in beeld. Zie hieronder.
- **History** opent de [vluchtgeschiedenis](https://docs.uavmatrix.com/nl/fleet-manager/map/flight-history/) voor deze drone.
- **Controls** opent het [UAV-bedieningspaneel](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remote-control/).

## Een drone volgen

Selecteer **Follow** in de popup. De kaart zoomt in (tot minstens zoomniveau 14) en centreert op de drone. Daarna verschuift de kaart alleen wanneer de drone dicht bij de rand van het scherm komt, zodat de kaart niet trilt. Een banner **Following *name*** verschijnt; selecteer de **X** of **Unfollow** om te stoppen. Ook het openen van **History** stopt het volgen.

![Kaart die één drone volgt, met de Following-banner bovenaan](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/map--follow.webp)

*Volgmodus op een vaste vleugel die een corridor in kaart brengt, met de Following-banner en het spoor erachter.*

## Drones zonder GPS

Drones die online zijn maar nog geen positie hebben, staan in een vak **drones without GPS** op de kaart. Selecteer er een om het bedieningspaneel te openen. De teller **n drones on map** geeft aan hoeveel drones op de kaart staan.

## Kaartinstellingen

Selecteer de tandwielknop rechtsboven om **Map Settings** te openen. Uw keuzes worden in deze browser opgeslagen.

| Sectie | Optie | Standaard |
| --- | --- | --- |
| **Overlays** | **Airspace Layers**: beperkt luchtruim, luchthavens, helihavens | Uit |
| **Drone Filter** | **All Drones**, **Online Only** of **Offline Only** | All Drones |
| **Marker Options** | **Heading Line** | Aan |
|  | **Marker Tooltip**: naamlabel op markeringen | Aan |
|  | **Always Visible**: label altijd tonen in plaats van alleen bij aanwijzen | Aan |
|  | **Flight Trail**: recent vliegpad (laatste 5 min) | Aan |
| **Map Style** | **Satellite**, **Light** of **Dark** | Dark |

![Paneel Map Settings met overlays, dronefilter, markeringsopties en kaartstijl](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/map--settings.webp)

*Paneel Map Settings met Airspace Layers aan, Drone Filter ingesteld op Online Only en Map Style op Satellite.*

> **Voor een druk bezette kaart**
>
> Bij 20 of meer drones in één gebied schakelt u **Always Visible** uit, zodat labels alleen bij aanwijzen verschijnen. Gebruik **Online Only** om geparkeerde toestellen te verbergen.

## Luchtruimlagen

**Airspace Layers** tekent beperkt luchtruim, luchthavens en helihavens van OpenAIP op de kaart. De laag verschijnt vanaf zoomniveau 7 en dichterbij. Het is één gecombineerde laag; u kunt categorieën niet afzonderlijk aan- of uitzetten.

> **Dit vervangt geen officiële luchtruimcontrole**
>
> De luchtruimlaag is bedoeld voor situatiebewustzijn. Controleer NOTAM's en uw nationale dronekaart of UTM-dienst vóór elke vlucht.

Source: https://docs.uavmatrix.com/nl/fleet-manager/map/
