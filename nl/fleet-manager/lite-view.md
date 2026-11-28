# Lite-weergave

> Lite-weergave is het bedieningsscherm van Fleet Manager op telefoonformaat: vlootlijst, live accu, GPS en hoogte, vluchtmodi en missie starten, pauzeren en RTL.

**Lite Control** is een telefoonvriendelijke versie van Fleet Manager voor gebruik in het veld: grote knoppen, alleen het essentiële en live updates via het mobiele data van uw telefoon.

## Lite-weergave openen

Meld u op uw telefoon aan bij Fleet Manager, open het menu en selecteer **Fleet → Lite View**. U kunt ook direct naar `https://fleet-manager.uavmatrix.com/lite` gaan. Voeg de pagina toe aan uw startscherm voor toegang met één tik.

## Vlootlijst

De lijst toont elke drone met zijn status en accu (oranje onder 40 %, rood onder 20 %), een indicator **Live updates active** en het aantal **n online / n total**. Tik op een drone om het bedieningsscherm te openen.

![Lite-weergave met de vlootlijst op een telefoon, met meerdere drones, status en accu](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/lite.webp)

*Lite-weergave op een telefoon van 390 × 844: Fleet-lijst met 33 online / 46 total, vluchtmodus en accu per drone.*

## Dronescherm

- Banners voor **Vehicle Armed** en **Failsafe Active**.
- Kaarten voor **Battery**, **GPS**, **Altitude** en **Speed**.
- **Device ID**, **Organization**, **Position** en **View Full Details** (opent de volledige UAV-pagina).

![Lite-weergave van het dronescherm met armed-banner, statuskaarten en bedieningsknoppen](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/lite--drone.webp)

*Lite-weergave voor een gearmde drone in AUTO: de Vehicle Armed-banner, kaarten voor Battery, GPS, Altitude en Speed, en de bediening voor modus en missie.*

### Veiligheidsstatus

Lite-weergave toont **ARMED** (*Motors active - exercise caution*) of **DISARMED** (*Safe to approach*), maar heeft geen knop om te armen of te ontwapenen: **For safety, arm/disarm should be performed via your Ground Control Station (QGC, Mission Planner).**

### Vluchtmodus (Owner en Admin)

**Quick Access** toont de modi die u het meest gebruikt voor het voertuigtype, **All Modes** toont de volledige lijst. Veilige modi schakelen na een eenvoudige bevestiging. Navigatie- en gevaarlijke modi vragen **Change to *MODE*?** met een sterkere controle, zoals in het [bedieningspaneel](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remote-control/#flight-mode).

### Missiebesturing (Owner en Admin)

Voor een missie die al op de drone staat:

- **Start** / **Resume**, **Pause**, **RTL** en **Stop**, elk met een bevestiging. Rovers gebruiken HOLD in plaats van LOITER om te pauzeren en te stoppen.
- **Jump to Waypoint**: kies het nummer met − en +, en selecteer daarna **Jump to WP n**. **Currently at waypoint n** toont de voortgang.
- **Refresh Mission Data** laadt de missie opnieuw van de drone.

Als de drone geen missie heeft, ziet u **No Mission Loaded**. Upload er eerst een via [Missies](https://docs.uavmatrix.com/nl/fleet-manager/missions/) op een computer.

Source: https://docs.uavmatrix.com/nl/fleet-manager/lite-view/
