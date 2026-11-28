# Een drone opnieuw koppelen, verwijderen of overdragen

> Koppel een drone opnieuw wanneer Fleet Manager daarom vraagt, verwijder hem uit uw organisatie, verplaats hem naar een andere organisatie of vervang zijn companion computer.

Een drone hoort tegelijk bij één organisatie. Deze pagina behandelt de drie dingen die u met een bestaande drone kunt doen: opnieuw koppelen, verwijderen en naar een andere organisatie verplaatsen.

## Een drone opnieuw koppelen

Opnieuw koppelen vernieuwt het verbindingscertificaat van de drone. De drone behoudt zijn record in Fleet Manager: naam, telemetriegeschiedenis, opgeslagen vluchten en streamkoppelingen blijven zoals ze zijn.

U hebt dit nodig wanneer:

- Fleet Manager **Re-pair required** op de drone toont, of de banner **This UAV must be re-paired** op de pagina ervan. Fleet Manager is overgestapt op een nieuwer, strenger certificaat en deze drone heeft nog een oud certificaat.
- Iemand **Disconnect from Fleet** in UAVcast-Pro heeft geselecteerd.

![UAV-pagina met de banner This UAV must be re-paired](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/drone-detail--repair-required.webp)

*UAV-pagina met de banner This UAV must be re-paired, met uitleg over de stappen Disconnect en Connect to Fleet Manager.*

1. Open in de UAVcast-Pro-webinterface van de drone **Fleet Management** en selecteer **Disconnect from Fleet**. Bevestig **Disconnect from Fleet?** Als de pagina al **Connect to Fleet Manager** toont, slaat u deze stap over.
2. Selecteer **Connect to Fleet Manager** om een nieuwe 8-cijferige code te krijgen.
3. Ga in Fleet Manager naar **Fleet → Pair Device**, kies de **zelfde organisatie** en voer de code in. Volg de wizard zoals beschreven in [Uw eerste drone toevoegen](https://docs.uavmatrix.com/nl/fleet-manager/pair-uav/).

Verwijder de drone niet eerst in Fleet Manager. Verwijderen wist de geschiedenis, terwijl opnieuw koppelen die behoudt.

## Een drone verwijderen

Gebruik dit wanneer een drone buiten gebruik wordt gesteld, wordt verkocht of naar een andere organisatie gaat. Alleen voor Owners en Admins.

1. Open de [UAV-pagina](https://docs.uavmatrix.com/nl/fleet-manager/fleet/uav-details/) van de drone en selecteer **Remove**.
2. Bevestig **Delete UAV**.

Als de drone online is, vertelt Fleet Manager eerst UAVcast-Pro om hem te ontkoppelen en wacht het maximaal 5 seconden op een antwoord. UAVcast-Pro toont dan opnieuw **Connect to Fleet Manager** en verlaat de VPN van de organisatie.

Als de drone offline is of niet antwoordt, vraagt **UAVcast Not Responding** of u wilt doorgaan. **Delete Anyway** verwijdert hem alleen uit Fleet Manager. Selecteer daarna de eerstvolgende keer dat u de drone kunt bereiken zelf **Disconnect from Fleet** in UAVcast-Pro. Tot die tijd denkt hij nog dat hij gekoppeld is.

![Bevestigingsdialoog Delete UAV met de waarschuwing dat telemetrie en opdrachtgeschiedenis worden verwijderd](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/drone-detail--delete.webp)

*Dialoogvenster Delete UAV voor een buiten gebruik gesteld toestel, met de waarschuwing dat alle telemetriegegevens en de opdrachtgeschiedenis permanent worden verwijderd.*

### Wat er bij verwijderen gebeurt

| Verwijderd | Behouden |
| --- | --- |
| Het drone-record en de naam | Vermeldingen in **Recent Activity** |
| Alle opgeslagen telemetrie en vluchtgeschiedenis, inclusief opgeslagen vluchten | Opgeslagen missies (die horen bij de organisatie) |
| Opdrachtgeschiedenis en streamkoppelingen | De UAVcast-Pro-licentie, die op de drone geactiveerd blijft |
| Het VPN-apparaat van de drone |  |

> **Dit kan niet ongedaan worden gemaakt**
>
> Er is geen export van de vluchtgeschiedenis mogelijk voordat u een drone verwijdert. Als u de gegevens nodig hebt, speel dan of leg eerst vast wat u nodig hebt via de [Vlucthistorie](https://docs.uavmatrix.com/nl/fleet-manager/map/flight-history/).

## Een drone naar een andere organisatie verplaatsen

Fleet Manager heeft geen knop om één drone over te dragen, omdat de geschiedenis bij de organisatie blijft die die heeft vastgelegd. Om een drone te verplaatsen:

1. Verwijder in de huidige organisatie de [drone](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remove-or-transfer/#remove-a-drone). De geschiedenis daar wordt verwijderd.
2. Zorg dat de UAVcast-Pro-licentie van de drone eigendom is van een gebruiker van de nieuwe organisatie. Zie [Licenties](https://docs.uavmatrix.com/nl/fleet-manager/licenses/).
3. [Koppel de drone](https://docs.uavmatrix.com/nl/fleet-manager/pair-uav/) in de nieuwe organisatie.

Als u probeert een drone te koppelen die nog bij een andere organisatie hoort, stopt Fleet Manager met de melding **This UAV is already paired to an organization**. Alleen een Owner of Admin van die organisatie kan de drone vrijgeven.

Om een **hele vloot** met de geschiedenis over te dragen (bijvoorbeeld wanneer een bedrijf wordt verkocht), behoudt u de organisatie en [draagt u het eigendom over](https://docs.uavmatrix.com/nl/fleet-manager/team/#transfer-ownership) aan de nieuwe eigenaar.

## De companion computer vervangen

Fleet Manager identificeert een drone met een apparaat-ID. UAVcast-Pro berekent die ID op basis van het CPU-serienummer van de companion computer en zijn opstartschijf (SD-kaart of SSD). Een nieuwe companion computer, of een nieuwe SD-kaart of SSD in dezelfde computer, verschijnt als een **nieuwe** drone. Het opnieuw installeren van UAVcast-Pro op hetzelfde bord en dezelfde schijf behoudt dezelfde apparaat-ID.

1. Verwijder de oude drone in Fleet Manager (of bewaar hem zolang u de geschiedenis nog nodig hebt).
2. Installeer UAVcast-Pro op de nieuwe computer en activeer de licentie. Zie [Uw licentie activeren](https://docs.uavmatrix.com/nl/get-started/license-activation/).
3. Koppel hem als nieuwe drone en maak de streamkoppelingen opnieuw aan.

Source: https://docs.uavmatrix.com/nl/fleet-manager/fleet/remove-or-transfer/
