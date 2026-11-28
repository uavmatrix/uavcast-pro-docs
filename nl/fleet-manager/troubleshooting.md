# Fleet Manager-probleemoplossing

> Los veelvoorkomende Fleet Manager-problemen op: koppelfouten, drones die vastzitten op PAIRING of offline zijn, Re-pair required, ontbrekende streams en mislukte commando's.

Begin bij wat u ziet. Elke rij linkt naar de oplossing, hieronder of op de gedeelde [probleemoplossingspagina's](https://docs.uavmatrix.com/nl/troubleshooting/).

| Wat u ziet | Waarschijnlijke oorzaak | Ga naar |
| --- | --- | --- |
| **Invalid pairing code**, **This pairing code has expired**, **This pairing code has already been used** | Typefout, code ouder dan 5 minuten, of al geclaimd | [Koppelcode ongeldig of verlopen](https://docs.uavmatrix.com/nl/troubleshooting/pairing-code-invalid/) |
| **License is not owned by any member of this organization** | Licentie gekocht met een e-mailadres dat geen lid is | [Licenties gekocht met een ander e-mailadres](https://docs.uavmatrix.com/nl/fleet-manager/licenses/#licenses-bought-with-another-email) |
| **This UAV is already paired to an organization** | De drone hoort nog bij een andere organisatie | [Een drone verplaatsen](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remove-or-transfer/#move-a-drone-to-another-organization) |
| UAVcast-Pro toont **No valid license found** of **Invalid or inactive license** | Licentie niet geactiveerd op de drone, verlopen of teruggegeven | [Licentie activeert niet](https://docs.uavmatrix.com/nl/troubleshooting/license-activation-failed/) |
| Geen knop **Pair Device** | U bent Viewer | [Rollen en rechten](https://docs.uavmatrix.com/nl/fleet-manager/team/roles-and-permissions/) |
| Drone blijft hangen op **PAIRING** | De drone heeft nog geen verbinding gemaakt met de broker | [Blijft hangen op PAIRING](https://docs.uavmatrix.com/nl/fleet-manager/troubleshooting/#stuck-on-pairing) |
| Drone **OFFLINE** | Geen internet, poort 8883 geblokkeerd, of UAVcast-Pro draait niet | [Drone offline in Fleet Manager](https://docs.uavmatrix.com/nl/troubleshooting/drone-offline-fleet-manager/) |
| **Re-pair required** | Oud verbindingscertificaat | [Een drone opnieuw koppelen](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone) |
| **NO MAVLINK** op de kaart | UAVcast-Pro heeft geen gegevens van de vluchtcontroller | [Geen MAVLink-heartbeat](https://docs.uavmatrix.com/nl/troubleshooting/no-mavlink-heartbeat/) |
| Streamkoppeling mislukt: **Failed to send configuration to drone - it may be offline** | Drone offline of heeft niet binnen 15 s bevestigd | [Streamkoppeling wordt niet opgeslagen](https://docs.uavmatrix.com/nl/fleet-manager/troubleshooting/#binding-wont-save) |
| Streamkoppeling bestaat, maar er is geen telemetrie of video in het grondstation | Firewall, verkeerde poort, of stream uitgeschakeld | [Geen stream bij het grondstation](https://docs.uavmatrix.com/nl/fleet-manager/troubleshooting/#no-stream-at-the-ground-station) |
| Grondstation is verbonden met het VPN maar bereikt de drone niet | Apparaattype, drone niet op het VPN, of UDP geblokkeerd | [VPN verbonden maar drone niet bereikbaar](https://docs.uavmatrix.com/nl/troubleshooting/vpn-cant-reach-drone/) |
| Commando's werken niet, **UAVcast Upgrade Required** | Drone offline, Viewer-rol, of oudere UAVcast-Pro | [Commando's mislukken](https://docs.uavmatrix.com/nl/fleet-manager/troubleshooting/#commands-fail) |
| **Request timed out. UAVcast may be unreachable.** bij het op afstand openen van UAVcast-Pro | Trage verbinding via de proxy | [Proxy is traag of onvolledig](https://docs.uavmatrix.com/nl/fleet-manager/troubleshooting/#proxy-is-slow-or-incomplete) |
| Uitnodigingsmail nooit ontvangen | Spamfilter, of verkeerd adres | [Uitnodiging niet ontvangen](https://docs.uavmatrix.com/nl/fleet-manager/troubleshooting/#invitation-not-received) |

## Blijft hangen op PAIRING

**PAIRING** betekent dat Fleet Manager de code heeft geaccepteerd en wacht op de eerste heartbeat van de drone via MQTT.

1. Kijk op de pagina **Fleet Management** van UAVcast-Pro. Staat daar nog **Waiting for Manager to confirm pairing...**, dan heeft de drone zijn certificaat nog niet opgehaald. Controleer of hij internet heeft.

2. Controleer uitgaande TCP 8883 vanaf de drone:

   ```bash
   nc -vz fleet-manager.uavmatrix.com 8883
   ```

3. Hebt u een **oudere** code van dezelfde drone ingevoerd (bijvoorbeeld nadat u tweemaal **Connect to Fleet Manager** hebt geselecteerd), dan wacht UAVcast-Pro niet op die code. Selecteer **Disconnect from Fleet** als die wordt getoond, vraag een nieuwe code aan en koppel opnieuw aan dezelfde organisatie. De drone behoudt zijn record.

De drone heeft 15 minuten na het verlopen van de code de tijd om zijn certificaat op te halen. Daarna koppelt u opnieuw.

## Streamkoppeling wordt niet opgeslagen

Fleet Manager slaat een streamkoppeling pas op nadat de drone deze heeft bevestigd. Controleer of de drone **ONLINE** toont en probeer het opnieuw. Is de drone online maar mislukken de koppelingen nog steeds, dan staat de drone mogelijk niet op het VPN: controleer onder **Network → Connected Devices** of hij er staat met type **UAV**, of gebruik **Push to Drone**.

## Geen stream bij het grondstation

1. Controleer op **Network → Stream Bindings** of **Video** en **Telemetry** zijn ingeschakeld, en noteer de **Ports**.
2. Controleer of de grondstationsoftware precies op die poorten luistert. Alleen de eerste drone op een laptop gebruikt 5600 / 14550; elke volgende drone heeft eigen poorten.
3. Sta inkomend UDP op die poorten toe in de firewall van de laptop. Op Windows staat u QGroundControl of Mission Planner toe op de netwerken **Private** en **Public**.
4. Voer `tailscale status` uit op de laptop en controleer of de drone in de lijst staat.

Meer details: [Geen telemetrie in het grondstation](https://docs.uavmatrix.com/nl/troubleshooting/no-telemetry-in-gcs/) en [Geen video in het grondstation](https://docs.uavmatrix.com/nl/troubleshooting/no-video-in-gcs/).

## Commando's mislukken

- De drone moet **ONLINE** zijn.
- Alleen Owners en Admins kunnen commando's sturen. Viewers zien de commandoknoppen niet, en de server weigert commando's van hen.
- Armen, ontwapenen en pre-flight-kalibratie vereisen UAVcast-Pro 6.3.0_rc13 of later. [Werk UAVcast-Pro bij](https://docs.uavmatrix.com/nl/get-started/updating/).
- De vluchtcontroller kan een commando weigeren, bijvoorbeeld armen bij mislukte pre-arm-controles. Lees het bericht in de kaartpop-up of op het tabblad **Logs**.

## Proxy is traag of onvolledig

**Open via Proxy** stuurt elk paginaverzoek via de verbinding van de drone, met 30 seconden per verzoek, en ondersteunt geen live functies (WebSocket). Wacht bij een zwakke mobiele verbinding tot de pagina volledig is geladen, of verbind met het VPN en gebruik **Open via VPN**. Zie [UAVcast-Pro op afstand openen](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remote-uavcast/).

## Uitnodiging niet ontvangen

Vraag de persoon om de spammap te controleren. Controleer onder **Team** het e-mailadres onder **Pending Invitations**. Is het onjuist, trek de uitnodiging dan in met **Revoke** en nodig opnieuw uit. Uitnodigingen verlopen na 7 dagen.

## Nog steeds vastgelopen?

Open een ticket via de supportknop met een schermafbeelding, of stuur een e-mail naar [support@uavmatrix.com](mailto:support@uavmatrix.com). Vermeld de naam en het apparaat-ID van de drone (op de UAV-pagina). Stuur het UAVcast-Pro-logboekpakket (een ZIP) naar [support@uavmatrix.com](mailto:support@uavmatrix.com) met uw ticketnummer, omdat tickets alleen een afbeelding accepteren. Zie [Support](https://docs.uavmatrix.com/nl/fleet-manager/support/) en [Logboeken verzamelen](https://docs.uavmatrix.com/nl/troubleshooting/collect-logs/).

Source: https://docs.uavmatrix.com/nl/fleet-manager/troubleshooting/
