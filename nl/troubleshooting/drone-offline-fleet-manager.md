# Drone wordt Offline getoond in Fleet Manager

> Gekoppelde UAV toont Offline of Re-pair required in Fleet Manager? Controleer het internet van de drone, uitgaande poort 8883, UAVcast-Pro Fleet Management en de licentie.

De UAV is gekoppeld, maar Fleet Manager toont hem als **Offline** (grijs op de fleet map), de telemetrie is bevroren, of er staat een **Re-pair required**-badge.

Fleet Manager markeert een UAV als offline wanneer er 20 seconden niets van is ontvangen. De drone communiceert met Fleet Manager via een versleutelde MQTT-verbinding, via zijn eigen internetverbinding.

| Wat u ziet | Waarschijnlijke oorzaak | Begin bij |
| --- | --- | --- |
| Offline, en UAVcast-Pro Fleet Management zegt Disconnected | De drone heeft geen internet, of poort 8883 is geblokkeerd | [Controle 1](https://docs.uavmatrix.com/nl/troubleshooting/drone-offline-fleet-manager/#check-1) |
| Re-pair required-badge, of This UAV must be re-paired | De drone heeft een oud certificaat | [Controle 2](https://docs.uavmatrix.com/nl/troubleshooting/drone-offline-fleet-manager/#check-2) |
| Offline direct nadat u UAVcast-Pro opnieuw heeft geïnstalleerd of gereset | De koppeling is op de drone verwijderd | [Controle 3](https://docs.uavmatrix.com/nl/troubleshooting/drone-offline-fleet-manager/#check-3) |
| Online, maar geen positie of batterij | Vluchtcontroller niet verbonden met UAVcast-Pro | [Controle 4](https://docs.uavmatrix.com/nl/troubleshooting/drone-offline-fleet-manager/#check-4) |

## Controle 1: De verbinding van de drone met Fleet Manager

1. Open UAVcast-Pro op de drone en ga naar **Fleet Management**. **Fleet Connection** toont **Connected** of **Disconnected**, en **Last Connected**.
2. Staat er **Disconnected**, controleer dan of de drone internet heeft: de rij **Mobiel** op het dashboard, of `curl -I https://fleet-manager.uavmatrix.com` op het apparaat. Los eerst de verbinding op met [4G-modem verbonden maar geen internet](https://docs.uavmatrix.com/nl/troubleshooting/modem-no-internet/).
3. De drone moet een **uitgaande TCP-verbinding op poort 8883** kunnen openen (MQTT over TLS). Sommige bedrijfsnetwerken, openbare wifi en enkele IoT-simabonnementen staan alleen webpoorten toe. Probeer een ander netwerk, of vraag de provider om poort 8883 te openen.
4. Controleer de datum en tijd op het apparaat met `date`. De verbinding gebruikt certificaten, die mislukken op een apparaat met een verkeerde klok.
5. Controleer of de licentie op de drone nog actief is (**Applicatie → Licentie Beheer**).

## Controle 2: Re-pair required

Fleet Manager heeft de manier veranderd waarop drones verbinding maken, en UAV's die vóór die wijziging zijn gekoppeld moeten eenmalig opnieuw worden gekoppeld. Er gaat niets verloren: de UAV behoudt zijn naam en geschiedenis, en u hoeft hem niet in Fleet Manager te verwijderen.

1. Open in UAVcast-Pro op de drone **Fleet Management**, druk op **Disconnect from Fleet** en bevestig.
2. Druk op **Connect to Fleet Manager**. Er verschijnt een 8-cijferige **Pairing Code** met een aftelling.
3. Ga in Fleet Manager naar **Fleet → Pair Device**, kies de organisatie en voer de code in.

## Controle 3: De drone is zijn koppeling kwijt

Een herinstallatie met een databasereset, **Database Resetten** of **Disconnect from Fleet** verwijdert de koppeling op de drone, waardoor hij stopt met rapporteren. Koppel hem opnieuw zoals in controle 2. Koppelen aan dezelfde organisatie hergebruikt de bestaande UAV-vermelding.

## Controle 4: Online, maar geen telemetrie

Positie, batterij en vluchtmodus komen van de vluchtcontroller. Als de UAV online is maar die velden leeg zijn, kan UAVcast-Pro de vluchtcontroller niet horen: zie [Geen MAVLink-heartbeat](https://docs.uavmatrix.com/nl/troubleshooting/no-mavlink-heartbeat/).

## Nog steeds offline?

[Download de logboeken](https://docs.uavmatrix.com/nl/troubleshooting/collect-logs/) van de drone met **Alle Logboeken** geselecteerd en stuur ze naar **[support@uavmatrix.com](mailto:support@uavmatrix.com)** met de UAV-naam en de organisatie. Meer Fleet Manager-problemen worden behandeld in [Probleemoplossing Fleet Manager](https://docs.uavmatrix.com/nl/fleet-manager/troubleshooting/).

Gerelateerd: [Fleet Manager-koppeling in UAVcast-Pro](https://docs.uavmatrix.com/nl/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/nl/troubleshooting/drone-offline-fleet-manager/
