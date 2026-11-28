# Uw eerste drone toevoegen

> Koppel een UAVcast-Pro-drone aan uw Fleet Manager-organisatie met de koppelcode van 8 cijfers, kies VPN-toegang en bekijk de drone live op de Fleet Map.

Koppelen verbindt één drone met UAVcast-Pro aan uw organisatie. Na het koppelen houdt de drone een via certificaat geauthenticeerde verbinding met Fleet Manager aan en verbindt zich na een herstart of een wijziging van het netwerk automatisch opnieuw. U koppelt elke drone één keer; dit duurt ongeveer twee minuten.

U werkt met twee browsertabbladen: de webinterface van UAVcast-Pro op de drone en Fleet Manager. Houd beide open.

## Voordat u begint

- **UAVcast-Pro geïnstalleerd met een geactiveerde licentie.** UAVcast-Pro weigert koppelen te starten zonder licentie en toont **No valid license found. Please activate your license first.** Zie [Uw licentie activeren](https://docs.uavmatrix.com/nl/get-started/license-activation/).
- **De licentie is eigendom van een lid van uw organisatie.** Fleet Manager vergelijkt het e-mailadres van de licentiehouder in de UAVmatrix-store met de e-mailadressen van uw leden. Zie [Licenties](https://docs.uavmatrix.com/nl/fleet-manager/licenses/).
- **Rol Owner of Admin** in de organisatie. Viewers zien **Pair Device** niet. Zie [Rollen en rechten](https://docs.uavmatrix.com/nl/fleet-manager/team/roles-and-permissions/).
- **Internet op de drone** via Ethernet, Wi-Fi of een mobiel modem, met uitgaand HTTPS (TCP 443) en TCP **8883** open. Poort 8883 verzorgt de versleutelde MQTT-verbinding met Fleet Manager.
- **Een actuele UAVcast-Pro 6-release.** Koppelen start via **Beheer → Fleet Management** in UAVcast-Pro. Armen en ontwapenen en pre-flight-kalibratie vanuit Fleet Manager vereisen UAVcast-Pro 6.3.0_rc13 of nieuwer; Fleet Manager markeert die met een versiebadge op oudere drones.

## De drone koppelen

1. **Haal een koppelcode op in UAVcast-Pro.** Open de webinterface van de drone. Selecteer in de zijbalk onder **Beheer** de optie **Fleet Management** en daarna **Connect to Fleet Manager**. UAVcast-Pro toont een **Pairing Code** van 8 cijfers, een aftelling **Expires in** en **Waiting for Manager to confirm pairing...**

   ![UAVcast-Pro-kaart Connect to Fleet Manager met de knop Connect to Fleet Manager](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/fleet--connect.webp)

   *UAVcast-Pro → Fleet Management vóór het koppelen. Na het selecteren van Connect to Fleet Manager verschijnen de code van 8 cijfers, de aftelling Expires in en Waiting for Manager to confirm pairing...*

   > **De code is 5 minuten geldig**
   >
   > Loopt de aftelling af voordat u de code invoert, selecteer dan opnieuw **Connect to Fleet Manager**. Typ altijd de code die nu op het scherm staat: UAVcast-Pro wacht alleen op de nieuwste code.

2. **Open Pair Device in Fleet Manager.** Ga naar **Fleet** en selecteer **Pair Device**. De wizard **Pair UAV** opent.

3. **Kies de organisatie.** Kies op de stap **Organization** de organisatie waartoe deze drone moet behoren en selecteer **Continue**. De lijst toont alleen organisaties waarin u Owner of Admin bent. Hebt u er maar één, dan selecteert Fleet Manager die automatisch en slaat deze stap over.

4. **Voer de code in.** Typ op de stap **Pairing Code** de 8 cijfers en selecteer **Continue**. Fleet Manager zoekt de code op en gaat naar **Confirm Device**.

   ![Wizard Pair UAV op de stap Pairing Code met een ingevoerde code van 8 cijfers](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/pair-device--code.webp)

   *Fleet → Pair Device, stap Pairing Code, met de voortgangsbalk die Organization als voltooid toont.*

5. **Bevestig het apparaat.** Controleer de gegevens die UAVcast-Pro heeft verzonden: **Name**, **Hostname**, **OS**, **Architecture** en **UAVcast Version**. Controleer of ze overeenkomen met de drone voor u en selecteer daarna **Complete Pairing**. Heeft uw organisatie VPN ingeschakeld, dan staat er op de knop **Continue** en is de volgende stap VPN.

   ![Stap Confirm Device met naam, hostname, besturingssysteem, architectuur en UAVcast-versie](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/pair-device--confirm.webp)

   *Stap Confirm Device: controleer of de naam, hostname, OS, architectuur en UAVcast Version overeenkomen met de drone voor u.*

6. **Kies VPN-toegang (alleen als VPN is ingeschakeld).** De stap **VPN Connection** verschijnt wanneer de organisatie [VPN heeft ingeschakeld](https://docs.uavmatrix.com/nl/fleet-manager/network/). Met VPN ontvangen grondstations in het netwerk van uw organisatie video en telemetrie van deze drone rechtstreeks, via 4G, Wi-Fi of satelliet, zonder port forwarding.

   - **Enable VPN for this UAV** is standaard aangevinkt. UAVcast-Pro neemt direct na het koppelen deel aan het VPN van uw organisatie.
   - Staat de drone al op een Tailscale-netwerk, dan toont Fleet Manager **Existing VPN Connection Detected** met de server en het IP-adres van dat netwerk. Het vak verandert in **Replace existing VPN with Fleet Manager network** en is niet aangevinkt. Vink dit alleen aan als de drone het huidige netwerk moet verlaten.

   Selecteer **Complete Pairing**.

   ![Stap VPN Connection met het selectievakje Enable VPN for this UAV aangevinkt](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/pair-device--vpn.webp)

   *Stap VPN Connection, met de drie vermelde voordelen en Enable VPN for this UAV aangevinkt.*

   > **Een VPN vervangen kan uw SSH-sessie verbreken**
   >
   > Vervangt u een bestaande Tailscale-verbinding en loopt uw huidige SSH- of browsersessie naar de drone daarover, dan wordt die sessie verbroken. Verbind eerst via het lokale netwerk met de drone voordat u verdergaat, of gebruik daarna het nieuwe VPN-adres.

7. **Geef de drone een naam.** **Pairing Complete!** verschijnt met een veld **UAV Name**. Typ een naam die uw team op de kaart herkent, zoals het staartnummer van het airframe of "Survey-14", en selecteer **Save**. De naam wordt gesynchroniseerd naar UAVcast-Pro zodra de drone online is. Selecteer **View UAV** om de pagina ervan te openen.

   ![Scherm Pairing Complete met het veld UAV Name en de knop View UAV](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/pair-device--complete.webp)

   *Pairing Complete! met het veld UAV Name, bewerkt naar een staartnummer.*

Ondertussen ontvangt UAVcast-Pro, dat elke 5 seconden terugkijkt, het certificaat en de verbindingsinstellingen van de drone (en de VPN-sleutel, als u VPN hebt gekozen). De pagina Fleet Management van UAVcast-Pro wisselt naar **Connected**.

## De verbinding controleren

De drone verschijnt binnen enkele seconden op **Fleet** en op **Fleet Map**. De badge toont:

| Badge | Betekenis |
| --- | --- |
| **PAIRING** | Fleet Manager heeft het certificaat uitgegeven en wacht op de eerste heartbeat van de drone. |
| **ONLINE** | De drone is verbonden. UAVcast-Pro stuurt elke 5 seconden een heartbeat. |
| **OFFLINE** | Er is 20 seconden niets ontvangen. De kaart toont wanneer de drone voor het laatst is gezien. |

Blijft de badge op **PAIRING** staan of wordt hij **OFFLINE**, controleer dan vanaf de drone of deze Fleet Manager op poort 8883 kan bereiken:

```bash
nc -vz fleet-manager.uavmatrix.com 8883
```

Een regel die eindigt op `succeeded!` betekent dat de poort open is. Alles anders wijst op een firewall of een provider die de poort blokkeert. Zie [Drone offline in Fleet Manager](https://docs.uavmatrix.com/nl/troubleshooting/drone-offline-fleet-manager/).

## Video en telemetrie naar een grondstation sturen

Koppelen start geen streams. Om te vliegen vanuit QGroundControl of Mission Planner, [koppelt u een grondstation](https://docs.uavmatrix.com/nl/fleet-manager/connect-gcs/) aan het VPN en voegt u een [streamkoppeling](https://docs.uavmatrix.com/nl/fleet-manager/network/stream-bindings/) toe. Fleet Manager geeft elke streamkoppeling een eigen blok poorten (video, ruimte voor camera 2 en audio, en telemetrie), zodat meerdere drones tegelijk naar één grondstation kunnen streamen. De eerste drone gebruikt de standaardwaarden, 5600 en 14550; lees de andere af in de kolom **Ports** van de streamkoppeling.

## Als koppelen mislukt

| Melding | Oorzaak en oplossing |
| --- | --- |
| **Invalid pairing code** | Deze code bestaat niet. Controleer de cijfers of vraag een nieuwe code aan in UAVcast-Pro. |
| **This pairing code has expired** | Er zijn meer dan 5 minuten verstreken. Selecteer in UAVcast-Pro opnieuw **Connect to Fleet Manager**. |
| **This pairing code has already been used** | De code is al geclaimd, door uzelf of een collega. Controleer **Fleet** op de drone voordat u opnieuw koppelt. |
| **License is not owned by any member of this organization** | De licentie op de drone hoort bij een e-mailadres dat geen lid is. Nodig die persoon uit, of vraag support om het e-mailadres aan uw account toe te voegen. Zie [Licenties](https://docs.uavmatrix.com/nl/fleet-manager/licenses/#licenses-bought-with-another-email). |
| **License has expired** / **License has been refunded** | De licentie op de drone is niet meer actief. Verleng deze of activeer een andere licentie in UAVcast-Pro. |
| **This UAV is already paired to an organization** | De drone hoort bij een andere organisatie. Hij moet daar eerst worden verwijderd. Zie [Een drone verwijderen of overdragen](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remove-or-transfer/). |
| **Too many attempts. Please wait a minute and try again.** | Meer dan 10 codecontroles of 5 koppelpogingen per minuut. Wacht een minuut. |

Meer oorzaken en controles: [Koppelcode ongeldig of verlopen](https://docs.uavmatrix.com/nl/troubleshooting/pairing-code-invalid/).

## Dezelfde drone opnieuw koppelen

Opnieuw koppelen van een drone aan **dezelfde** organisatie behoudt de naam, telemetriegeschiedenis en streamkoppelingen en vernieuwt alleen het certificaat. U hebt dit nodig nadat u **Disconnect from Fleet** hebt geselecteerd in UAVcast-Pro, of wanneer Fleet Manager **Re-pair required** toont. Zie [Een drone opnieuw koppelen](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone).

Source: https://docs.uavmatrix.com/nl/fleet-manager/pair-uav/
