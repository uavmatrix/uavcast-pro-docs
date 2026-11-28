# Datastromen

> Maak UAVcast-Pro-datastromen-dashboards met grafieken, meters en tegels voor elk MAVLink-veld of elke NAMED_VALUE_FLOAT-sensorwaarde, met drempels, geschiedenis en JSON-import/export.

Met Datastromen bouwt u uw eigen live telemetriedashboards. Voeg numerieke tegels, lijngrafieken, meters, staafgrafieken en statuslampjes toe, en koppel elk ervan aan een MAVLink-waarde die de vluchtcontroller verstuurt of aan een `NAMED_VALUE_FLOAT`-signaal van een sensor of [injector](https://docs.uavmatrix.com/nl/uavcast-pro/flight-controller/injectors/). Dashboards worden op de drone opgeslagen, zodat iedereen die de webinterface opent dezelfde borden ziet. Open **Datastromen** in de zijbalk.

Typische toepassingen: een scherm voor de payload-operator met sensormetingen, een LTE-linkpaneel met RSRP en SINR, of een batterij- en voedingsbord voor lange vluchten.

![Datastromen-pagina met Nog geen dashboards en de knop Dashboard maken](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/mission-data.webp)

*Datastromen vóór het eerste dashboard: met Dashboard maken maakt u er een aan.*

## Een dashboard maken

1. Selecteer **Dashboard maken** (of **Nieuw dashboard** als u al een dashboard hebt), geef het een **Naam** en selecteer **Maken**.
2. Selecteer **Bewerken** om de bewerkingsmodus te openen, en daarna **Widget toevoegen** en kies een type.
3. Zoek op het tabblad **Bron** naar een signaal en selecteer het. Een groene stip betekent dat er samples binnenkomen.
4. Stel de titel, eenheden en decimalen in op **Weergave**, limieten en kleurdrempels op **Bereik**, en grafiekopties op **Grafiek**. Selecteer **Opslaan**.
5. Versleep en wijzig het formaat van widgets, en selecteer daarna **Klaar**.

Alleen admins kunnen dashboards maken en bewerken. Alleen-lezen gebruikers kunnen ze alleen bekijken.

## Widgettypen

| Type | Toont |
| --- | --- |
| **Numerieke tegel** | De huidige waarde, groot, met optioneel voor- en achtervoegsel. |
| **Sparkline** | Een kleine trendlijn onder de waarde. |
| **Lijngrafiek** | Een of meer signalen over een tijdvenster. |
| **Meter** | De waarde op een ronde schaal met gekleurde drempels. |
| **Staafindicator** | De waarde als balk tussen minimum en maximum. |
| **Status** | Een gekleurde status op basis van drempels, bijvoorbeeld OK / waarschuwing / alarm. |
| **Named-value-tabel** | Elk `NAMED_VALUE_FLOAT`-signaal met **Waarde**, **Leeftijd** en **Bron**. **Filter** accepteert een deel van een tekst of een `*.glob`. |

Een widget toont **Verouderd** wanneer er 5 seconden geen sample is binnengekomen, en *Nog geen samples* wanneer het signaal nog nooit is gezien.

## Signalen

- **MAVLink-velden**: elk numeriek veld dat de vluchtcontroller verstuurt (attitude, VFR HUD, batterij, GPS, thuispositie, RTK, failsafe, heartbeat- en statuswaarden) verschijnt automatisch, met waar bekend begrijpelijke namen en eenheden.
- **Named values**: `NAMED_VALUE_FLOAT`-signalen, weergegeven als `NAME@sysid:compid`, bijvoorbeeld `LTE_RSRP@1:194`.

U kunt een signaal typen dat nog niet wordt verstuurd en op Enter drukken om het toe te voegen. Zo bouwt u het bord al voordat u de sensor aansluit. Gebruik het potloodicoon bij een geselecteerde bron om er een weergavenaam aan te geven.

## Grafiekopties

| Optie | Waarden |
| --- | --- |
| **Venster** | **1 min**, **5 min**, **15 min**, **1 uur**, of **Aangepast (seconden)** |
| **Curve** | **Lineair**, **Vloeiend (monotoon)**, **Stap**, **Stap voor**, **Stap na**, **Basis-spline** |
| Overig | **Legenda tonen**, **Raster tonen**, **Lijndikte**, **Vlakvulling**, **Datapunten tonen**, **Drempelreferentielijnen**, **Y-aslabel** |

## Geschiedenis

UAVcast-Pro bewaart een korte geschiedenis van elk signaal op de drone (maximaal 3600 samples per signaal, ongeveer een uur bij 1 Hz). Grafieken zijn daardoor direct gevuld zodra u een dashboard opent, ook na het vernieuwen van de pagina.

## Dashboards delen

- **JSON exporteren** kopieert het dashboard naar het klembord.
- **JSON importeren** maakt een dashboard aan op basis van geplakte JSON. Gebruik dit om een bord naar een andere drone te kopiëren.
- **Dupliceren** en **Naam wijzigen** staan in de werkbalk; **Verwijderen** verwijdert een dashboard en de bijbehorende widgets.
- **Volledig scherm** verbergt de rest van de interface, voor een apart scherm.

Source: https://docs.uavmatrix.com/nl/uavcast-pro/data-streams/
