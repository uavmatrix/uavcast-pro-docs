# Vluchtanalyse

> Zet live MAVLink-telemetrie of een opgenomen .tlog-bestand uit in een grafiek met UAVcast-Pro Vluchtanalyse. Kies maximaal 10 parameters, vergelijk ze in de tijd en bekijk een vlucht op de drone.

Met Vluchtanalyse zet u MAVLink-waarden in de tijd uit, live vanaf de vluchtcontroller of uit een opgenomen `.tlog`-bestand. Gebruik het om trillingen, batterijspanningsdaling, hoogtehouding of signaalwaarden te controleren zonder logs naar een pc te kopiëren. Open **Vliegkaart → Vluchtanalyse**.

![Tabblad Vluchtanalyse met Geen logbestand geladen, de knop Logbestand openen, de Live-schakelaar en het paneel Parameters](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/flight-map--flight-analytics.webp)

*Vluchtanalyse voordat er een log is geladen. Met Logbestand openen laadt u een .tlog.*

## Live telemetrie plotten

1. Selecteer **Live**. De parameterlijst vult zich zodra berichten binnenkomen. Blijft er *Wachten op MAVLink-data* staan, verbind dan eerst de vluchtcontroller.
2. Zoek in **Parameters** en vink de waarden aan die u wilt plotten. U kunt er maximaal **10** tegelijk plotten.
3. Zet **Data verzamelen** aan om elk punt te bewaren (*Alle datapunten worden opgeslagen*). Uit, dan houdt de grafiek een doorlopend venster bij (*Laatste … punten*).

## Een opgenomen log analyseren

1. Selecteer **Logbestand openen**.
2. Kies in **Logbestand selecteren** een opgenomen `.tlog`. Telemetrielogs komen van [Opnames](https://docs.uavmatrix.com/nl/uavcast-pro/camera/recordings/) (standaard één per gearmde vlucht).
3. Vink parameters aan om te plotten. **Duur** en het aantal **Parameters** in het bestand worden bovenaan getoond.

**Alles wissen** verwijdert elke geplotte parameter.

## Waar de logs vandaan komen

Telemetrie wordt op de drone gelogd volgens **Telemetrie opnemen** op **Camera → Opnames → Instellingen**: **Tijdens armen** (standaard), **Altijd tijdens verbinding** of **Uit**. Dezelfde `.tlog`-bestanden openen in Mission Planner, MAVExplorer en UAV Log Viewer.

Het zijtabblad **Opnames** van de Vliegkaart toont dezelfde telemetrielogs met **Berichten**, **Max. hoogte** en **Afstand**, en laat u een log **.tlog downloaden**, **Verwijderen** of **Afspelen**. Bij afspelen wordt de opgenomen telemetrie naar de kaart gestreamd alsof de drone vliegt.

Source: https://docs.uavmatrix.com/nl/uavcast-pro/flight-map/flight-analytics/
