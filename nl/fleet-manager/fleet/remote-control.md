# Externe besturing

> Wijzig vluchtmodi, arm of ontwapen de drone, voer missies uit en start een preflight-kalibratie vanuit het UAV-bedieningspaneel van Fleet Manager, met veiligheidscontroles.

Het **UAV Control Panel** stuurt commando's naar de vluchtcontroller via UAVcast-Pro, over de versleutelde verbinding van Fleet Manager. Het werkt via elke internetverbinding die de drone heeft, ook via 4G, en heeft geen VPN nodig.

Open het met **Operations** op een [Fleet](https://docs.uavmatrix.com/nl/fleet-manager/fleet/)-kaart, of met **Controls** in de popup van een drone op de [Fleet Map](https://docs.uavmatrix.com/nl/fleet-manager/map/). Op de kaart heeft het paneel ook de tabbladen **Terminal** en **Logs**.

![UAV Control Panel met de kolommen Flight Mode, Mission en Actions voor een gearmde quadcopter](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/control-panel.webp)

*UAV Control Panel voor een gearmde quadcopter in LOITER: Flight Mode met de knoppen RTL, Circle en Loiter, Mission met een geselecteerde survey van 18 waypoints, en Actions met Arm en Disarm.*

Alleen **Owners** en **Admins** kunnen commando's sturen. Zie [Rollen en rechten](https://docs.uavmatrix.com/nl/fleet-manager/team/roles-and-permissions/).

> **Commando's vanuit Fleet Manager bewegen echte toestellen**
>
> Een commando vanuit Fleet Manager werkt op het toestel alsof een grondstation het heeft verstuurd. Houd bij elke vlucht een piloot met een grondstation of RC-zender in controle, volg uw lokale regels voor op afstand bestuurde en BVLOS-operaties, en behandel Fleet Manager als een hulpmiddel voor toezicht en dispatch, niet als uw enige verbinding.

## Koptekst

De koptekst toont de status van de drone, de vlaggen **ARMED** en **FAILSAFE**, een **GCS Failsafe**-badge, de kleurkiezer voor de kaart (**Change map color**, met **Reset to auto**) en een **Details**-link naar de [UAV-pagina](https://docs.uavmatrix.com/nl/fleet-manager/fleet/uav-details/).

Als de GCS-failsafe van de vluchtcontroller uit staat, waarschuwt het paneel: **GCS Failsafe not enabled. Without GCS failsafe, the vehicle will not return to launch if it loses connection to the ground station.** Stel de failsafe in uw grondcontrolesoftware in (ArduPilot-parameter `FS_GCS_ENABLE`) voordat u buiten de visuele zichtlijn vliegt.

## Vluchtmodus

Kies een modus uit de keuzelijst, of gebruik de snelknoppen **RTL**, **Circle** en **Loiter** (**Hold** op rovers). Elke modewijziging vraagt om bevestiging. Hoe gevaarlijker de modus, hoe strenger de controle:

| Bevestiging | Modi |
| --- | --- |
| Eenvoudige **Change to *MODE*?** | STABILIZE, ALT_HOLD, LOITER, POSHOLD, BRAKE, FLOWHOLD, HOLD, FBWA, FBWB, CRUISE, QHOVER, QLOITER, QSTABILIZE |
| Bevestiging met een beschrijving van wat de modus doet | AUTO, GUIDED, RTL, SMART_RTL, CIRCLE, FOLLOW, ZIGZAG, QRTL, TAKEOFF, AVOID_ADSB, ACRO, MANUAL |
| Typ de modusnaam om te bevestigen | LAND, SPORT, AUTOTUNE, FLIP, DRIFT, THROW, QLAND, QACRO, AUTOROTATE |

![Bevestigingsdialoog voor modewijziging met de vraag LAND te typen om te bevestigen](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/control-panel--mode-confirm.webp)

*Bevestiging voor LAND, een modus die u moet typen om te bevestigen.*

De modilijsten zijn van ArduPilot (Copter, Plane, Rover en Sub). Op een PX4-vluchtcontroller wijzigt u modi via uw grondstation.

## Missie

Voert [missies](https://docs.uavmatrix.com/nl/fleet-manager/missions/) uit die in uw organisatie zijn opgeslagen:

- **Select mission** kiest een opgeslagen missie. De teller toont het huidige en het totale waypoint, bijvoorbeeld `3/18`, of **None**.
- **Start** leest eerst de missie op de drone en vergelijkt die met de geselecteerde missie. Als ze verschillen, biedt **Mission Not Loaded on Drone** de optie **Upload & Start**.
- **Stop**, **Read** (haal de missie van de drone op) en **Clear**.

Elke actie vraagt om bevestiging.

## Acties

- **Arm** en **Disarm**. Het armdialoogvenster zegt **This will arm the UAV. Ensure all personnel are clear of the propellers before arming.** Vink **Force arm (bypass pre-arm checks)** alleen op de werkbank aan. Hiermee worden de controles overgeslagen die een onveilige start tegenhouden.
- **Select action... → Preflight Calibration** kalibreert de gyroscoop en stelt de accelerometer waterpas. Houd het toestel volledig stil op een vlakke ondergrond en selecteer daarna **Start Calibration**.

![Bevestigingsdialoog voor armen met waarschuwing over de propellers en het selectievakje Force arm](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/control-panel--arm-confirm.webp)

*Armdialoog met de waarschuwing over de propellers en het vakje Force arm (bypass pre-arm checks) niet aangevinkt.*

Arm, disarm en preflight-kalibratie vereisen UAVcast-Pro **6.3.0_rc13** of later op de drone. Op oudere versies toont het paneel **UAVcast Upgrade Required**. Zie [Bijwerken](https://docs.uavmatrix.com/nl/get-started/updating/).

## Wanneer een commando niet doorkomt

- De drone moet online zijn. Commando's naar een offline drone mislukken.
- Fleet Manager wacht tot de drone elk commando bevestigt. Als de vluchtcontroller weigert, bijvoorbeeld bij armen met mislukte pre-arm-controles, verschijnt de fout in het paneel en in de statusberichten van de drone.
- Berichten van de vluchtcontroller (mislukte pre-arm-controles, modewijzigingen) worden getoond in de popup van de drone op de kaart en op het tabblad [Logs](https://docs.uavmatrix.com/nl/fleet-manager/fleet/uav-details/#logs).

Voor schermen op telefoonformaat, zie [Lite view](https://docs.uavmatrix.com/nl/fleet-manager/lite-view/).

Source: https://docs.uavmatrix.com/nl/fleet-manager/fleet/remote-control/
