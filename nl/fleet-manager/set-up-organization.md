# Uw organisatie instellen

> Meld u aan bij Fleet Manager met uw UAVmatrix-account, maak de organisatie aan waartoe uw drones en team behoren, en wissel, hernoem of verwijder die organisatie.

Alles in Fleet Manager hoort bij een organisatie: drones, missies, het VPN-netwerk, streamkoppelingen en teamleden. Maak er één aan voordat u uw eerste drone koppelt.

## Aanmelden

Fleet Manager heeft geen apart wachtwoord. U meldt zich aan met uw UAVmatrix-account, hetzelfde account dat u gebruikt op [uavmatrix.com](https://uavmatrix.com/) om UAVcast-Pro-licenties te kopen en te beheren.

1. Ga naar [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) en selecteer **Sign In** (of **Get Started**).
2. Meld u aan op de UAVmatrix-pagina waarnaar u wordt doorgestuurd. Hebt u nog geen account, maak er dan een aan.
3. U keert terug naar het **Dashboard** van Fleet Manager.

> **Meld u aan met het e-mailadres dat uw licenties bezit**
>
> Fleet Manager accepteert een drone alleen wanneer de UAVcast-Pro-licentie eigendom is van een lid van de organisatie, gekoppeld via e-mailadres. Meld u aan met het account waarmee u de licenties hebt gekocht, dan bespaart u later een supportverzoek. Zie [Licenties](https://docs.uavmatrix.com/nl/fleet-manager/licenses/).

Profielgegevens (naam, e-mailadres, wachtwoord) worden beheerd in uw UAVmatrix-account, niet in Fleet Manager. **Settings → Profile** verwijst daarheen.

## De organisatie aanmaken

1. Open de organisatieschakelaar bovenaan de zijbalk en selecteer **Create organization**. Hebt u nog geen organisatie, dan tonen pagina's zoals **Fleet** en **Network** ook **No Organization Yet** met een knop **Create Organization**.
2. Voer een **Organization Name** in (2 tot 50 tekens), bijvoorbeeld de naam van uw bedrijf of "Survey Operations North". Voeg desgewenst een **Description (optional)** toe.
3. Selecteer **Create**.

![Dialoogvenster Create Organization met de velden Organization Name en Description](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/onboarding--create-organization.webp)

*Dialoogvenster Create Organization, ingevuld met een bedrijfsnaam zoals Nordic Aerial Survey AS.*

U wordt de **Owner** van de organisatie. Fleet Manager maakt op de achtergrond ook een privé-VPN-netwerk voor de organisatie aan. Dat staat uit totdat u [VPN inschakelt](https://docs.uavmatrix.com/nl/fleet-manager/network/).

> **Eén organisatie per eigenaar**
>
> Elke gebruiker kan één organisatie aanmaken en bezitten. Probeert u een tweede aan te maken, dan antwoordt Fleet Manager **You already own an organization**. U kunt wel Admin of Viewer zijn in een willekeurig aantal andere organisaties, bijvoorbeeld die van een klant of partner.

## Wisselen tussen organisaties

Bent u lid van meerdere organisaties, dan toont de schakelaar bovenaan de zijbalk ze onder **Organizations**. De organisatie die u kiest bepaalt wat **Fleet**, **Fleet Map**, **Missions**, **Network** en het dashboard tonen. Fleet Manager onthoudt uw keuze in deze browser.

![Geopende organisatieschakelaar in de zijbalk met twee organisaties](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/dashboard--organization-switcher.webp)

*Geopende organisatieschakelaar met Nordwind Aerial Services en Nordwind R&D Sandbox.*

## De organisatie hernoemen of verwijderen

Ga naar **Settings → Organizations**. Het tabblad toont de organisaties waarin u Owner of Admin bent.

- **Hernoemen of de beschrijving wijzigen:** Owner of Admin. Bewerk **Name** of **Description** en selecteer **Save Changes**.
- **Verwijderen:** alleen Owner. Selecteer **Delete Organization** en bevestig. Dit verwijdert alle drones, hun telemetriegeschiedenis, missies, streamkoppelingen en teamlidmaatschappen, en dit kan niet ongedaan worden gemaakt.

![Tabblad Organizations van Settings met naam, beschrijving en de knop Delete Organization](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/settings--organizations.webp)

*Settings → Organizations voor de Owner, met Save Changes en Delete Organization.*

> **Koppel drones los voordat u een organisatie verwijdert**
>
> Het verwijderen van de organisatie laat de drones niet weten. Ze blijven proberen opnieuw verbinding te maken totdat u op elke drone **Disconnect from Fleet** selecteert in UAVcast-Pro. Verwijder de drones daarom eerst via hun UAV-pagina (zie [Een drone verwijderen of overdragen](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remove-or-transfer/)), zodat Fleet Manager ze voor u ontkoppelt.

Wilt u de organisatie liever aan iemand anders overdragen, [draag het eigendom over](https://docs.uavmatrix.com/nl/fleet-manager/team/#transfer-ownership).

## Volgende stappen

- [Uw eerste drone toevoegen](https://docs.uavmatrix.com/nl/fleet-manager/pair-uav/)
- [Uw team uitnodigen](https://docs.uavmatrix.com/nl/fleet-manager/team/)

Source: https://docs.uavmatrix.com/nl/fleet-manager/set-up-organization/
