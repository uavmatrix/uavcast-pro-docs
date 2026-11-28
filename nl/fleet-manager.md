# Fleet Manager

> UAVmatrix Fleet Manager toont elke UAVcast-Pro-drone op één live kaart, met bediening op afstand, missies, VPN-streaming naar grondstations en teamrollen.

UAVmatrix Fleet Manager is een webapp op [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) om veel drones vanaf één plek te beheren. Elke drone waarop UAVcast-Pro draait, kan worden gekoppeld aan uw organisatie. Daarna ziet u de drone op een live kaart, opent u de terminal, stuurt u opdrachten, uploadt u missies en routeert u video en telemetrie naar de grondstations die uw piloten gebruiken.

![Fleet Manager-dashboard met statistiekkaarten, UAV-statuslijst en recente activiteit](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/dashboard.webp)

*Dashboard: statistiekkaarten, de UAV Status-lijst en Recent Activity van meerdere teamleden.*

## Wat u ermee kunt doen

[Uw eerste drone toevoegenKoppel een UAVcast-Pro-drone met een koppelcode van 8 cijfers in ongeveer twee minuten.](https://docs.uavmatrix.com/nl/fleet-manager/pair-uav/)[De vloot live volgenElke drone op één kaart, met statusringen, een spoor van 5 minuten en volgmodus.](https://docs.uavmatrix.com/nl/fleet-manager/map/)[Drones op afstand bedienenVluchtmodi, armen en ontwapenen, missies en pre-flight kalibratie vanuit de browser.](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remote-control/)[Streamen naar grondstationsVideo en MAVLink van veel drones naar QGroundControl of Mission Planner sturen via VPN.](https://docs.uavmatrix.com/nl/fleet-manager/network/stream-bindings/)[Uw team uitnodigenOwner-, Admin- en Viewer-rollen per organisatie.](https://docs.uavmatrix.com/nl/fleet-manager/team/)[Missies plannenTeken waypoints, sla missies op voor de organisatie en upload ze naar elke drone.](https://docs.uavmatrix.com/nl/fleet-manager/missions/)

## Hoe het in elkaar zit

Fleet Manager praat nooit rechtstreeks met de vluchtcontroller. UAVcast-Pro op de companion computer van de drone doet dat en houdt één versleutelde verbinding met Fleet Manager open:

1. **Koppelen.** UAVcast-Pro vraagt Fleet Manager om een koppelcode. U typt de code in Fleet Manager. Fleet Manager geeft de drone daarna een eigen clientcertificaat.
2. **Besturingskanaal.** De drone maakt verbinding met de MQTT-broker van Fleet Manager via TLS op poort **8883**, geauthenticeerd met dat certificaat. Telemetrie, heartbeats, opdrachten, terminalsessies en toegang op afstand tot de webinterface van UAVcast-Pro lopen allemaal via deze verbinding. Dit werkt via NAT en mobiele netwerken, omdat de drone altijd naar buiten verbindt.
3. **Datakanaal (optioneel).** Video en MAVLink naar een grondstation gaan peer-to-peer via het privé-VPN van uw organisatie, een WireGuard-netwerk dat door Fleet Manager wordt beheerd. Zonder VPN toont en bedient Fleet Manager de drone nog steeds, maar routeert het geen streams.

## Begrippen

| Term | Wat het betekent in Fleet Manager |
| --- | --- |
| **Organisatie** | Uw bedrijf of team. Drones, missies, het VPN-netwerk en leden horen bij één organisatie. Elke gebruiker kan één organisatie bezitten en lid zijn van willekeurig veel andere. |
| **UAV** | Een drone (of rover, boot of ander voertuig) waarop UAVcast-Pro draait, op elk moment gekoppeld aan één organisatie. Fleet Manager herkent hem aan een apparaat-ID dat UAVcast-Pro afleidt uit het CPU-serienummer van de companion computer en de opstartschijf, zodat hij zijn identiteit behoudt na herstarts en netwerkwijzigingen. |
| **Koppelen** | Een UAV koppelen aan een organisatie met een koppelcode van 8 cijfers die UAVcast-Pro toont. De code is 5 minuten geldig. |
| **Grondstation (GCS)** | Een laptop of pc met QGroundControl, Mission Planner of vergelijkbare software, verbonden met het VPN van uw organisatie zodat hij streams kan ontvangen. |
| **Streamkoppeling** | Een regel die zegt: "stuur de video en telemetrie van deze UAV naar dat grondstation". Elke koppeling krijgt eigen UDP-poorten, zodat één grondstation tegelijk veel drones kan ontvangen. |
| **Rollen** | **Owner**, **Admin** of **Viewer**, per organisatie ingesteld. Viewers kunnen meekijken; Admins en de Owner kunnen koppelen, bedienen en configureren. Zie [Rollen en rechten](https://docs.uavmatrix.com/nl/fleet-manager/team/roles-and-permissions/). |
| **Licenties en plaatsen** | Elke gekoppelde UAV heeft een actieve UAVcast-Pro-licentie nodig die eigendom is van een lid van de organisatie. Teamleden gebruiken geen plaatsen. Zie [Licenties](https://docs.uavmatrix.com/nl/fleet-manager/licenses/). |
| **Status en waarschuwingen** | Waarschuwingen voor online, offline, geen MAVLink en GPS op de kaart en in de vlootlijst, plus systeemmeldingen. Zie [Statusindicatoren en meldingen](https://docs.uavmatrix.com/nl/fleet-manager/alerts-and-status/). |

## Wat u nodig hebt

Fleet Manager is inbegrepen bij uw UAVcast-Pro-licentie: geen apart abonnement, geen extra plaatsen.

> Fleet Manager is inbegrepen bij een UAVcast-Pro-licentie. Elke drone die je koppelt heeft er een nodig.
>
> [UAVcast-Pro kopen](https://uavmatrix.com/nl/checkout) · [Abonnementen en prijzen](https://uavmatrix.com/nl/products)

- Een UAVmatrix-account (dezelfde die u gebruikt op [uavmatrix.com](https://uavmatrix.com/) om licenties te kopen).
- Minstens één companion computer met UAVcast-Pro en een geactiveerde licentie. Zie [Installatie](https://docs.uavmatrix.com/nl/get-started/installation/) en [Uw licentie activeren](https://docs.uavmatrix.com/nl/get-started/license-activation/).
- Internet op de drone met uitgaand HTTPS (443) en TCP **8883** open.

## Begin hier

1. [Uw organisatie instellen](https://docs.uavmatrix.com/nl/fleet-manager/set-up-organization/)
2. [Uw eerste drone toevoegen](https://docs.uavmatrix.com/nl/fleet-manager/pair-uav/)
3. [Een grondstation verbinden](https://docs.uavmatrix.com/nl/fleet-manager/connect-gcs/)
4. [Uw team uitnodigen](https://docs.uavmatrix.com/nl/fleet-manager/team/)

Source: https://docs.uavmatrix.com/nl/fleet-manager/
