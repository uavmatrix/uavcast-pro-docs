# Tabblad Radio

> Bekijk live PWM-waarden van de RC-kanalen en de RSSI van uw vluchtcontroller in het tabblad Radio van UAVcast-Pro, om zenderschakelaars en RC-cameraschakeling te controleren.

Het tabblad Radio toont de RC-invoer die de vluchtcontroller van uw zender ontvangt: de PWM-waarde van elk kanaal en de RSSI (signaalsterkte). Gebruik het om schakeltoewijzingen te controleren, bijvoorbeeld het kanaal dat u gebruikt voor [RC-cameraschakeling](https://docs.uavmatrix.com/nl/uavcast-pro/camera/multi-camera/), zonder een grondstation aan te sluiten. Open **Vliegkaart → Radio**.

![Tabblad Radio met de RSSI-badge, de vier primaire kanalen en de hulpkanalen, allemaal op 0](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/flight-map--radio.webp)

*Vliegkaart → Radio op een testopstelling zonder RC-ontvanger, dus elk kanaal toont 0.*

## Wat u ziet

- **RSSI**: de signaalsterkte van de ontvanger, zoals de vluchtcontroller die doorgeeft, beoordeeld als **Geen signaal**, **Zwak**, **Matig**, **Goed** of **Uitstekend**. RSSI moet op de vluchtcontroller zijn ingesteld (`RSSI_TYPE` op ArduPilot).
- **Primaire besturingen**: **Kanaal 1 - Roll**, **Kanaal 2 - Pitch**, **Kanaal 3 - Throttle** en **Kanaal 4 - Yaw**, in de indeling van Mission Planner.
- **Hulpkanalen**: de overige kanalen.

PWM-waarden liggen doorgaans tussen 1000 (min) en 2000 (max). Een kanaal dat nooit beweegt, betekent dat het niet is toegewezen op de zender, of dat de ontvanger het niet verstuurt.

De waarden komen uit het `RC_CHANNELS`-bericht van de vluchtcontroller, dus ze worden alleen bijgewerkt terwijl de vluchtcontrollerverbinding **Verbonden** is.

Source: https://docs.uavmatrix.com/nl/uavcast-pro/flight-map/radio/
