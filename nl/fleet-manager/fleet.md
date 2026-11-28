# Fleet

> De Fleet-pagina toont elke UAV in uw organisatie met live status, batterij en laatste check-in. Hier koppelt u drones en opent u de bedieningselementen.

**Fleet** (zijbalk **Fleet Management → Fleet**) toont elke UAV in de geselecteerde organisatie. De lijst wordt live bijgewerkt, dus u kunt hem op een wandscherm naast de [kaart](https://docs.uavmatrix.com/nl/fleet-manager/map/) laten staan.

![Fleet-pagina met een raster van UAV-kaarten met online en offline status, batterij en laatst gezien](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/fleet.webp)

*Fleet-pagina met UAVs (46): ONLINE-kaarten met batterijniveaus, en gedimde OFFLINE-kaarten met Last seen-tijden.*

## UAV-kaarten

De kop toont **UAVs (n)**. Elke kaart toont:

- **Name** en een statusbadge: **ONLINE**, **OFFLINE** of **PAIRING**.
- **Battery** in procenten. Die wordt geel onder 50 % en rood onder 20 %.
- **Last seen**, als relatieve tijd. Offline-kaarten zijn gedimd.
- **Re-pair required**, wanneer de drone opnieuw moet worden gekoppeld (zie [Een drone opnieuw koppelen](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone)).

Een drone telt als offline na **20 seconden** zonder bericht van UAVcast-Pro, dat elke 5 seconden een heartbeat stuurt.

Twee knoppen op elke kaart:

- **Operations** opent het [bedieningspaneel](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remote-control/): vluchtmodi, armen en ontwapenen, missies.
- **Details** opent de [UAV-pagina](https://docs.uavmatrix.com/nl/fleet-manager/fleet/uav-details/): live telemetrie, terminal, logs, systeemacties, hernoemen en verwijderen.

## Knoppen op de pagina

- **Pair Device** start de [koppelwizard](https://docs.uavmatrix.com/nl/fleet-manager/pair-uav/). Alleen voor Owners en Admins.
- **Refresh** laadt de lijst opnieuw.
- **Need more devices?** → **View Plans** opent de UAVmatrix-store, waar u meer UAVcast-Pro-licenties koopt. Zie [Licenties](https://docs.uavmatrix.com/nl/fleet-manager/licenses/).

## Hercoppelingsbanner

Wanneer een of meer drones een ouder verbindingscertificaat gebruiken, toont een banner bovenaan **n UAV(s) must be re-paired**. Koppel elke vermelde drone één keer opnieuw. Hij behoudt zijn naam en geschiedenis. Zie [Een drone opnieuw koppelen](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone).

![Fleet-pagina met een hercoppelingsbanner en Re-pair required-badges op twee kaarten](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/fleet--repair-required.webp)

*Fleet-pagina met de banner 2 UAVs must be re-paired en het Re-pair required-badge op de twee getroffen kaarten.*

## Tips voor grote vloten

- **Geef drones namen voor de kaart.** Namen verschijnen op kaartlabels en in koppellijsten. Een staartnummer of rol ("Inspection-07") is beter dan de standaard-hostnaam. Hernoem een drone vanaf de UAV-pagina.
- **Geef elke drone een eigen kleur.** Fleet Manager kent automatisch kleuren toe uit een palet van 24 kleuren. Stel in het bedieningspaneel een vaste kleur in (**Change map color**) voor drones die uw team in één oogopslag moet herkennen.
- **Gebruik organisaties om klanten te scheiden.** Drones horen bij precies één organisatie. Als u werkt voor meerdere klanten die elk alleen hun eigen drones moeten zien, geef elke klant een eigen organisatie.

Source: https://docs.uavmatrix.com/nl/fleet-manager/fleet/
