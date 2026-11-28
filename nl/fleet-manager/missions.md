# Missies

> Teken waypointmissies op de kaart, kies MAVLink-commando's en hoogtereferenties, sla missies op voor de hele organisatie en upload ze naar elke online drone.

**Missions** (zijbalk **Fleet Management → Missions**) is een waypointplanner in de browser. Missies worden voor de organisatie opgeslagen, zodat iedereen in het team er een kan laden. Een Owner of Admin kan een missie uploaden naar elke online drone.

![Mission Planner met een waypoint-surveypatroon op een satellietkaart](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/missions.webp)

*Mission Planner in de Satellite-stijl met een surveyraster van 18 waypoints, Takeoff en Return to Launch, en de koptekst met 18 waypoints en de totale afstand.*

Viewers kunnen opgeslagen missies openen en bekijken. Opslaan, uploaden en verwijderen vereist de rol Owner of Admin.

## Een missie plannen

1. Selecteer **Create New** (of **Missions → New Mission**).
2. Klik op de kaart om waypoints toe te voegen. Sleep een waypoint om het te verplaatsen. Tijdens het plaatsen toont **Next WP** de afstand tot het vorige waypoint (**Prev:**) en tot de thuispositie (**Home:**).
3. Open de waypointlade (**n Waypoints**) om elke rij te bewerken: **Command**, **Params**, **Alt**, **Frame** en **Radius**. Sleep rijen om ze te herordenen. Rij **H** is de thuispositie.
4. Stel **Defaults:** in voor nieuwe waypoints bovenaan de lade: **Alt** (standaard 50 m) en **WP Radius** (standaard 30 m).

![Waypointlade met kolommen voor commando, parameters, coördinaten, hoogte, frame, straal en afstand](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/missions--waypoint-drawer.webp)

*Waypointlade met een Takeoff, meerdere Waypoint-rijen, een Change Speed en een Return to Launch, met Frame ingesteld op Relative.*

### Hoogtereferenties

| Frame | Hoogte wordt gemeten vanaf |
| --- | --- |
| **Relative** (standaard) | De thuispositie |
| **Absolute** | Gemiddeld zeeniveau |
| **Terrain** | De grond onder het waypoint (vereist terreindata op de vluchtcontroller) |

### Commando's

De **Command**-kiezer is doorzoekbaar en toont de MAVLink-missiecommando's die ArduPilot begrijpt, gegroepeerd als:

- **Navigatie:** Waypoint, Takeoff, Land, Return to Launch, Loiter Unlim, Loiter Turns, Loiter Time, Loiter to Alt, Spline Waypoint, Vtol Takeoff, Vtol Land, Payload Place, Delay en meer.
- **Voorwaarden:** Delay, Change Alt, Distance, Yaw.
- **Do-commando's:** Change Speed, Set ROI Location, Set Servo, Set Relay, Jump, Digicam Control, Set Cam Trigg Dist, Mount Control, Gripper, Parachute, VTOL Transition en andere.

Commando's die parameters nodig hebben (bijvoorbeeld wachttijd, loiter-rondes, snelheid of servo-PWM) krijgen bewerkbare velden onder **Params**.

Limieten: hoogte 0 tot 10.000 m, straal 1 tot 1.000 m, minstens één waypoint.

## Opslaan

Selecteer **Save**, voer een **Name** in (tot 100 tekens) en eventueel een **Description**, en bevestig met **Save Mission**. De koptekst toont **Unsaved** zolang er wijzigingen zijn; met **Update Mission** slaat u ze op. Open opgeslagen missies via **Missions → Saved Missions**.

## Uploaden naar een drone

1. Sla de missie op. Een niet-opgeslagen missie kan niet worden geüpload (**Mission not saved**).
2. Selecteer **Upload to Drone**, kies de UAV onder **Select UAV** en bevestig.
3. Wacht op de bevestiging. De upload vervalt na 30 seconden als de drone niet antwoordt.

![Dialoog Upload Mission to Drone met een lijst van online UAV's](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/missions--upload.webp)

*Dialoog Upload Mission to Drone met de online UAV's waaruit u kunt kiezen.*

Om te vliegen, selecteert u de missie in het [bedieningspaneel](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remote-control/#mission) van de drone en selecteert u **Start**. Als de missie op de drone afwijkt van de missie die u heeft geselecteerd, biedt het paneel **Upload & Start** aan.

## Een missie van een drone lezen

Kies onder **Missions → Read from Drone** een online drone. De huidige missie van die drone wordt in de planner geladen als **Mission from *name***. Sla deze op om een kopie te bewaren, bijvoorbeeld voordat u de missie op de drone overschrijft.

> **Controleer de missie in uw grondstationssoftware voor de vlucht**
>
> Fleet Manager uploadt precies wat u heeft gepland. Controleer voor een automatische vlucht de missie en de failsafes van het voertuig in QGroundControl of Mission Planner, zoals bij elk ander planningsprogramma.

Source: https://docs.uavmatrix.com/nl/fleet-manager/missions/
