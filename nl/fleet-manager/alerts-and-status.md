# Statusindicatoren en meldingen

> Wat de offline-, geen-MAVLink-, GPS-, failsafe- en batterijindicatoren van Fleet Manager betekenen, plus systeemmededelingen, de statuspagina en waarschuwingen.

Fleet Manager toont problemen op de plek waar u al kijkt: op de kaart, in de vlootlijst en op de pagina van elke drone. Deze pagina somt elke indicator op en beschrijft wat u eraan kunt doen.

## Drone-indicatoren

| Indicator | Waar | Betekenis | Eerste controle |
| --- | --- | --- | --- |
| **OFFLINE**, grijze markering met klokbadge | Fleet, kaart, UAV-pagina | Er is 20 seconden lang niets ontvangen van UAVcast-Pro | De internetverbinding van de drone en poort 8883. Zie [Drone offline in Fleet Manager](https://docs.uavmatrix.com/nl/troubleshooting/drone-offline-fleet-manager/). |
| **NO MAVLINK**, oranje ring met **!** | Kaart | UAVcast-Pro is online, maar heeft 10 seconden lang geen gegevens van de vluchtcontroller ontvangen | Voeding en kabel van de vluchtcontroller. Zie [Geen MAVLink-heartbeat](https://docs.uavmatrix.com/nl/troubleshooting/no-mavlink-heartbeat/). |
| Rode gestreepte ring, **NO GPS** | Kaart | Geen satellieten of geen fix | Zicht op de lucht vanaf de antenne, GPS-kabel. |
| Gele gestreepte ring, **WEAK GPS** | Kaart | Minder dan 6 satellieten of alleen een 2D-fix | Wacht op meer satellieten voordat u vliegt. |
| Batterij in geel / rood | Fleet-kaarten | Onder 50 % / onder 20 % | Plan de landing. |
| **ARMED** | UAV-pagina, bedieningspaneel, popup op de kaart | Motoren zijn gearmd | Behandel het toestel als actief. |
| **FAILSAFE** | UAV-pagina, bedieningspaneel | De vluchtcontroller is in failsafe | De berichten van de vluchtcontroller, zichtbaar in de popup op de kaart en onder **Logs**. |
| **GCS FAILSAFE** / **GCS Failsafe not enabled** | UAV-pagina, bedieningspaneel | Grondstation-failsafe is geactiveerd of niet geconfigureerd | Stel `FS_GCS_ENABLE` in voordat u BVLOS-vluchten uitvoert. |
| **Re-pair required** | Fleet, UAV-pagina | De drone gebruikt een oud verbindingscertificaat | [Koppel de drone opnieuw](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone). |
| **Signal** poor | Popup op de kaart | De retourtijd naar de drone is hoger dan 600 ms, of er zijn drie pings gemist | Mobiele dekking of een overbelaste verbinding. |

Indicatoren worden live bijgewerkt terwijl de pagina open is. Fleet Manager controleert elke 5 seconden op offline drones.

![Detail van de kaart met markeringen voor offline, geen MAVLink en zwakke GPS-ringen](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/map--indicators.webp)

*Detail van vier markeringen: een gezonde drone, één OFFLINE met klokbadge, één NO MAVLINK met oranje ring en één WEAK GPS met gele gestreepte ring.*

## Activiteitenlogboek

Wijzigingen die uw team aanbrengt (koppelen, drones verwijderen, streamkoppelingen, uitnodigingen, rolwijzigingen, VPN) worden gelogd onder **Recent Activity** op het [Dashboard](https://docs.uavmatrix.com/nl/fleet-manager/dashboard/), met vermelding van wie ze heeft gemaakt.

## Systeemmededelingen

Wanneer UAVmatrix gepland onderhoud of een incident heeft, verschijnt bovenaan elke pagina een banner: blauw voor informatie, amber voor een waarschuwing en rood voor kritiek. Door de banner te sluiten, wordt deze verborgen totdat u Fleet Manager opent in een nieuwe browsersessie.

## Statuspagina

**System → Status** (pagina **System Status**) toont of Fleet Manager normaal werkt: **All systems operational**, of **We're experiencing some issues** met de **Active Incidents**. **Past Incidents** toont de laatst opgeloste incidenten met hun **Resolution**. Controleer deze pagina eerst wanneer veel drones tegelijk offline gaan.

![Pagina System Status met All systems operational en een lijst met eerdere incidenten](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/status.webp)

*System Status met All systems operational en twee Past Incidents gemarkeerd als Resolved.*

## E-mail- en webhookmeldingen

Fleet Manager stuurt nog geen e-mail-, sms- of webhookmeldingen voor drone-gebeurtenissen (bijvoorbeeld een lage batterij of een drone die offline gaat). Houd de kaart of vlootlijst open in de controlekamer en vertrouw bij een lage batterij of verbindingsverlies op de eigen failsafes van de vluchtcontroller.

Source: https://docs.uavmatrix.com/nl/fleet-manager/alerts-and-status/
