# Rollen en rechten

> De exacte rechtenmatrix voor de rollen Owner, Admin en Viewer van Fleet Manager: koppelen, vluchtcommando's, terminal, missies, VPN en team.

Fleet Manager kent drie rollen, die per organisatie worden ingesteld. Een persoon kan Admin zijn in de ene organisatie en Viewer in een andere.

| Rol | Kort samengevat |
| --- | --- |
| **Owner** | Alles wat een Admin kan, plus de organisatie verwijderen en het eigendom overdragen. Precies één per organisatie: de persoon die haar heeft aangemaakt, of degene naar wie het eigendom is overgedragen. |
| **Admin** | Beheert de vloot: koppelt en verwijdert drones, stuurt commando's, opent de terminal, plant en uploadt missies, beheert het VPN en de streamkoppelingen, en beheert het team. |
| **Viewer** | Alleen-lezen. Ziet het dashboard, de vloot, de live kaart, vluchtgeschiedenis, missies, netwerk en team, maar kan niets wijzigen of aansturen. |

Nieuwe leden worden uitgenodigd als Admin of Viewer. De rol Owner wisselt alleen van eigenaar via [Transfer Ownership](https://docs.uavmatrix.com/nl/fleet-manager/team/#transfer-ownership).

## Rechtenmatrix

De matrix komt voort uit de rechtenregels die Fleet Manager op de server afdwingt, zodat een verborgen knop nooit de enige barrière is.

| Actie | Owner | Admin | Viewer |
| --- | --- | --- | --- |
| **Fleet en drones** |  |  |  |
| Dashboard, vlootlijst, UAV-pagina's en live kaart bekijken | ✓ | ✓ | ✓ |
| Afspelen van vluchtgeschiedenis bekijken | ✓ | ✓ | ✓ |
| Benoemde vluchten opslaan, hernoemen en verwijderen | ✓ | ✓ | – |
| Een drone koppelen (**Pair Device**) | ✓ | ✓ | – |
| Een drone hernoemen, de kaartkleur wijzigen | ✓ | ✓ | – |
| Een drone verwijderen | ✓ | ✓ | – |
| **Commando's** |  |  |  |
| Vliegmodus wijzigen, RTL, Loiter, Circle | ✓ | ✓ | – |
| Armen, ontwapenen, geforceerd armen | ✓ | ✓ | – |
| Pre-flight-kalibratie | ✓ | ✓ | – |
| Missies op een drone starten, stoppen en lezen | ✓ | ✓ | – |
| De companion computer herstarten of uitschakelen | ✓ | ✓ | – |
| SSH-**Terminal** op de UAV-pagina | ✓ | ✓ | – |
| **Open via Proxy** (webinterface van UAVcast-Pro via Fleet Manager) | ✓ | ✓ | – |
| **Missies** |  |  |  |
| Opgeslagen missies bekijken | ✓ | ✓ | ✓ |
| Missies aanmaken, bewerken en verwijderen | ✓ | ✓ | – |
| **Upload to Drone** | ✓ | ✓ | – |
| **Netwerk en VPN** |  |  |  |
| De pagina Network, apparaten en streamkoppelingen bekijken | ✓ | ✓ | ✓ |
| De VPN-authenticatiesleutel en het **GCS Connection Command** bekijken | ✓ | ✓ | – |
| VPN inschakelen, authenticatiesleutels genereren, **Push to Drone** | ✓ | ✓ | – |
| VPN-apparaten hernoemen, het type wijzigen of verwijderen | ✓ | ✓ | – |
| Streamkoppelingen toevoegen, pauzeren of verwijderen | ✓ | ✓ | – |
| Het VPN-netwerk verwijderen | ✓ | ✓ | – |
| **Team** |  |  |  |
| Leden en rollen bekijken | ✓ | ✓ | ✓ |
| Leden uitnodigen (als Admin of Viewer) | ✓ | ✓ | – |
| De rol van een lid wijzigen (behalve die van de Owner) | ✓ | ✓ | – |
| Leden verwijderen (behalve de Owner), uitnodigingen intrekken | ✓ | ✓ | – |
| Eigendom overdragen | ✓ | – | – |
| **Organisatie en instellingen** |  |  |  |
| De organisatie hernoemen, de beschrijving bewerken | ✓ | ✓ | – |
| Telemetriebewaring wijzigen, geschiedenis opschonen of verwijderen | ✓ | ✓ | – |
| De organisatie verwijderen | ✓ | – | – |
| **Iedereen** |  |  |  |
| FleetBot gebruiken, eigen supporttickets aanmaken en sluiten | ✓ | ✓ | ✓ |
| Eigen profiel bewerken (in het UAVmatrix-account) | ✓ | ✓ | ✓ |

> **Admins kunnen andere Admins beheren**
>
> Een Admin kan nieuwe Admins uitnodigen, een andere Admin degraderen tot Viewer en andere Admins verwijderen. Geef de rol Admin alleen aan personen die u de hele vloot toevertrouwt. De Owner is het enige lid dat een Admin niet kan wijzigen.

> **Wat Viewers zien**
>
> Viewers krijgen dezelfde pagina's, zonder de bedieningselementen. Het UAV-bedieningspaneel toont een Viewer de live status en logboeken, maar geen knoppen voor vluchtmodus, missies of armen, en geen tabblad Terminal. Op **Network** zien Viewers de VPN-authenticatiesleutel niet: *Only Owners and Admins can see the VPN auth key.* Fleet Manager controleert ook elk commando op de server, dus een Viewer kan er op geen andere manier een sturen.

## Rollen kiezen voor een zakelijke vloot

| Persoon | Voorgestelde rol |
| --- | --- |
| Vlootmanager of operationeel manager | Owner (één persoon) |
| Piloten, technici, de persoon die nieuwe airframes koppelt | Admin |
| Klanten die hun opdracht live volgen, management, auditors | Viewer |
| Contractors die uw drones moeten vliegen | Admin, verwijderd wanneer de opdracht eindigt |

## Geen rol: super admin

UAVmatrix-medewerkers hebben een aparte supportrol over alle organisaties. Die wordt gebruikt voor supporttaken, zoals [extra licentie-e-mails toevoegen](https://docs.uavmatrix.com/nl/fleet-manager/licenses/#licenses-bought-with-another-email) aan een account. Het maakt geen deel uit van uw organisatie en kan niet worden toegewezen.

Source: https://docs.uavmatrix.com/nl/fleet-manager/team/roles-and-permissions/
