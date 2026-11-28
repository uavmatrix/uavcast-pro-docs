# MAVLink Inspecteur

> Gebruik de UAVcast-Pro MAVLink Inspector om elk bericht van de vluchtcontroller te zien, met de snelheid, het systeem-ID en het component-ID, en om telemetrie en injectors te debuggen.

De Inspector toont elk MAVLink-bericht dat UAVcast-Pro ontvangt, gegroepeerd per voertuig, met de snelheid en de laatste veldwaarden. Gebruik hem om te controleren of de vluchtcontroller stuurt wat u verwacht, om de exacte veldnamen van een bericht te vinden, of om te bevestigen dat een [injector](https://docs.uavmatrix.com/nl/uavcast-pro/flight-controller/injectors/) `NAMED_VALUE_FLOAT`-berichten produceert. Open **Vliegkaart → Inspector**.

![MAVLink Inspecteur met de verbindingsstatus en de berichtenlijst voor systeem 1, met berichtnamen, snelheden in Hz en aantallen](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/flight-map--inspector.webp)

*Vliegkaart → Inspector met de berichten van de vluchtcontroller (systeem 1) en ATTITUDE uitgeklapt.*

## Wat u ziet

**MAVLink-verbindingsstatus** bovenaan: **Verbinding**, **Voertuig**, **GPS Satellieten**, **Totaal Berichten** en **Systeem ID**.

**Berichteninspecteur** eronder: één groep per voertuig (*Voertuig (Systeem ID: 1)*), en daarin één rij per bericht met:

- de naam van het bericht,
- **COMP**: het component-ID dat het heeft verzonden (1 = autopilot, 194 = de standaard voor injectors),
- de snelheid in **Hz** en het aantal ontvangen berichten.

Open een bericht om de velden en huidige waarden te zien.

## Veelvoorkomende controles

| Vraag | Let op |
| --- | --- |
| Stuurt de GPS gegevens? | `GPS_RAW_INT` op 2 tot 10 Hz, en `GPS_RTK` als u [RTK](https://docs.uavmatrix.com/nl/uavcast-pro/flight-controller/ntrip-rtk/) gebruikt. |
| Waarom is de telemetrie traag in het grondstation? | Lage snelheden op `ATTITUDE`, `VFR_HUD` of `GLOBAL_POSITION_INT`. Verhoog de `SRx_`-streamsnelheden op de MAVLink-poort van de vluchtcontroller. |
| Werkt mijn injector? | `NAMED_VALUE_FLOAT` onder COMP 194 (of het compid dat u heeft ingesteld). |

Als de lijst *Wachten op berichten...* toont, is de verbinding met de vluchtcontroller niet actief. Zie [Vluchtcontroller](https://docs.uavmatrix.com/nl/uavcast-pro/flight-controller/).

Source: https://docs.uavmatrix.com/nl/uavcast-pro/flight-map/inspector/
