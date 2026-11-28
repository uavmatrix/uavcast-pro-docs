# Een vloot drones onboarden met Fleet Manager

> Plan licenties en geef 20+ UAVcast-Pro-drones een naam, koppel ze en verbind ze met UAVmatrix Fleet Manager, met teamrollen, de organisatie-VPN en streambindingen.

Deze handleiding beschrijft hoe u in één keer een vloot van bijvoorbeeld 20 drones in [UAVmatrix Fleet Manager](https://docs.uavmatrix.com/nl/fleet-manager/) brengt: licenties, naamgeving, koppelen, de organisatie-VPN en het koppelen van grondstations aan drones. Ervan uitgaande dat elke drone al UAVcast-Pro draait met de vluchtcontroller verbonden en internettoegang heeft.

## 1. Licenties plannen

Twee regels bepalen of een drone gekoppeld kan worden:

- **Elke drone heeft een actieve UAVcast-Pro-licentie** nodig op het apparaat. Eén licentie kan meerdere drones dekken: het aantal **Toegestane apparaten** is het aantal plekken. Voor 20 drones hebt u in totaal 20 plekken nodig, verdeeld over één of meer licenties.
- **De licentie moet eigendom zijn van een lid van de organisatie** waarin u koppelt. Fleet Manager koppelt het e-mailadres van het storeaccount dat de licentie heeft gekocht aan de e-mailadressen van de leden. Heeft de aankoop de licenties op een ander account gezet, nodig dat account uit voor de organisatie, of vraag support om het e-mailadres van de aankoop aan uw gebruiker toe te voegen.

Controleer dit vóór de koppeldag: een drone waarvan de licentie van een buitenstaander is, wordt geweigerd met **License is not owned by any member of this organization**.

## 2. De organisatie en het team instellen

1. Meld u aan op [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) met uw uavmatrix.com-account en maak de organisatie aan. Zie [Een organisatie instellen](https://docs.uavmatrix.com/nl/fleet-manager/set-up-organization/).
2. Nodig onder **Team** uw mensen uit. Owners en Admins kunnen drones koppelen, besturen en verwijderen; Viewers kunnen alleen meekijken. Zie [Rollen en rechten](https://docs.uavmatrix.com/nl/fleet-manager/team/roles-and-permissions/).
3. Verdeel het koppelwerk over twee of drie Admins als u veel drones hebt. Elke gebruiker kan 5 koppelingen per minuut doen; de limiet voorkomt brute-force-raden en vertraagt ook één persoon die 20 drones achter elkaar koppelt.

## 3. Geef elke drone een naam voordat u koppelt

De naam die een drone in UAVcast-Pro heeft, wordt zijn naam in Fleet Manager. Spreek een patroon af, bijvoorbeeld `SURVEY-01` … `SURVEY-20`, en label de frames dienovereenkomstig.

Open op elke drone UAVcast-Pro → **Fleet Management** en vul **Device Name** in. Zonder naam verschijnt de drone met zijn hostnaam. U kunt hem later in Fleet Manager hernoemen.

## 4. Elke drone koppelen

Herhaal dit voor elke drone. Met twee browservensters naast elkaar (de UAVcast-Pro van de drone en Fleet Manager) duurt elke koppeling ongeveer een minuut.

1. Open in UAVcast-Pro **Fleet Management** en druk op **Connect to Fleet Manager**. Er verschijnt een 8-cijferige **Pairing Code** (koppelcode). Die verloopt na 5 minuten.
2. Ga in Fleet Manager naar **Fleet → Pair Device**.
3. **Select Organization**, daarna **Enter Pairing Code**.
4. **Confirm Device**: controleer de naam, hostnaam, architectuur en UAVcast-versie, zodat u de drone koppelt die u denkt te koppelen.
5. **VPN Connection**: vink **Enable VPN for this UAV** aan als grondstations de drone via de VPN van de organisatie moeten bereiken. Gebruikt de drone al Tailscale, dan verplaatst **Replace existing VPN with Fleet Manager network** hem naar het netwerk van de organisatie.
6. **Complete Pairing**. In UAVcast-Pro verandert **Fleet Connection** in **Verbonden**.

![Koppelwizard van Fleet Manager op de stap Confirm Device met de UAV-naam, hostnaam, architectuur en UAVcast-versie](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/pair-device--confirm.webp)

*Fleet → Pair Device, stap Confirm Device.*

Fouten en wat ze betekenen: [Koppelcode ongeldig of verlopen](https://docs.uavmatrix.com/nl/troubleshooting/pairing-code-invalid/). De volledige wizard wordt beschreven in [Uw eerste UAV koppelen](https://docs.uavmatrix.com/nl/fleet-manager/pair-uav/).

## 5. De vloot controleren

Open **Fleet**. Elke drone moet als online worden weergegeven. Op de **Fleet Map** verschijnt elke drone op zijn GPS-positie zodra de vluchtcontroller een fix heeft. Een drone die **Offline** toont, heeft 20 seconden niets gemeld: zie [Drone offline in Fleet Manager](https://docs.uavmatrix.com/nl/troubleshooting/drone-offline-fleet-manager/).

## 6. De grondstations verbinden

1. Ga naar **Network** en druk op **Enable VPN Network** als de VPN van de organisatie nog niet aan staat.
2. Druk op **Connect a Device**, kies **Ground Control Station (GCS)** en kopieer het **GCS Connection Command**. Voer het uit in een terminal **op de laptop van het grondstation**, met Tailscale geïnstalleerd. Plak het niet in UAVcast-Pro.
3. Het grondstation verschijnt onder **Ground Stations** zodra het verbonden is.
4. Druk onder **Stream Bindings** op **Add Stream Binding** en koppel elke drone aan het grondstation dat hem moet ontvangen. De drone moet online zijn, omdat Fleet Manager de bestemming naar hem stuurt.
5. Elke binding krijgt een eigen blok poorten op dat grondstation: de eerste drone gebruikt de standaardwaarden, 5600 (video) en 14550 (telemetrie), en elke volgende drone krijgt het volgende vrije blok. Stel de grondstationsoftware in met de poorten die bij elke binding worden getoond.

![Netwerkpagina van Fleet Manager met streambindingen die meerdere drones aan één grondstation koppelen, met automatisch toegewezen poorten](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/network--stream-bindings.webp)

*Network → Stream Bindings: elke binding toont het grondstation en de video- en telemetriepoorten.*

Details: [Een grondstation verbinden met de Fleet Manager-VPN](https://docs.uavmatrix.com/nl/fleet-manager/connect-gcs/) en [Streambindingen](https://docs.uavmatrix.com/nl/fleet-manager/network/stream-bindings/).

> **Dubbele stream en audio**
>
> Elke binding krijgt een eigen blok poorten op het grondstation, met ruimte voor de tweede camera van de drone en audio na de videopoort, zodat meerdere drones één grondstation kunnen delen.

## 7. Dagelijks gebruik

- **Re-pair required**: wanneer Fleet Manager deze badge toont, koppelt u de drone één keer opnieuw vanuit UAVcast-Pro. Hij behoudt zijn naam en geschiedenis. Zie [Een drone opnieuw koppelen, verwijderen of overdragen in Fleet Manager](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remove-or-transfer/).
- **Een SD-kaart of bord van een drone vervangen** maakt op zichzelf geen plek vrij: schrijf het oude apparaat uit onder **Applicatie → Licentie Beheer → Geactiveerde apparaten** op elke drone die dezelfde licentie gebruikt, en koppel daarna de nieuwe.
- **Op afstand werken aan een drone**: de UAV-detailpagina in Fleet Manager heeft een terminal, logs en acties zoals herstarten. Zie [UAV-details](https://docs.uavmatrix.com/nl/fleet-manager/fleet/uav-details/).

Source: https://docs.uavmatrix.com/nl/guides/fleet-onboarding/
