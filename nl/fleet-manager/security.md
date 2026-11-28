# Beveiliging en privacy

> Hoe Fleet Manager drones beveiligt met TLS-certificaten per drone, organisaties isoleert op privé WireGuard-VPN's, rollen afdwingt en gegevens opslaat.

Deze pagina is bedoeld voor de mensen die Fleet Manager moeten goedkeuren: beveiligingsfunctionarissen, IT- en operationeel managers.

## Verbinding met de drone

- **Clientcertificaten per drone.** Bij het koppelen geeft Fleet Manager elke drone een eigen TLS-clientcertificaat. De drone gebruikt dit om verbinding te maken met de MQTT-broker van Fleet Manager op poort **8883**, de enige openbare listener van de broker. Er is geen gedeeld wachtwoord.
- **Elke drone kan alleen zijn eigen topics gebruiken.** De identiteit van het certificaat is het apparaat-ID van de drone, en de broker staat een drone alleen toe te publiceren en te abonneren onder zijn eigen topics. Eén gecompromitteerde drone kan een andere niet lezen of aansturen.
- **Alleen uitgaand.** Drones maken verbinding naar buiten, naar Fleet Manager. U opent geen inkomende poorten op de drone of op het netwerk.
- **Korte koppelperiode.** Koppelcodes bestaan uit 8 willekeurige cijfers, zijn 5 minuten geldig en kunnen één keer worden gebruikt. Codecontroles zijn beperkt (10 controles en 5 koppelpogingen per gebruiker per minuut). Het certificaat en de VPN-sleutel van de drone worden alleen uitgegeven totdat de drone voor het eerst verbinding maakt, en uiterlijk 15 minuten nadat de code is verlopen.
- **Upgrades van het certificaat.** Wanneer Fleet Manager het certificaatschema aanscherpt, worden oudere drones gemarkeerd als **Re-pair required** in plaats van stilzwijgend vertrouwd.

## Privé-VPN per organisatie

- Elke organisatie krijgt een eigen netwerk op de VPN-server van Fleet Manager (`vpn-connect.uavmatrix.com`), een zelf gehoste controleserver die compatibel is met Tailscale. Verkeer tussen apparaten is end-to-end versleuteld met WireGuard. Apparaten van één organisatie kunnen de apparaten van een andere organisatie niet zien: de VPN-server past voor elke organisatie een aparte toegangsregel toe. Kan Fleet Manager die isolatie niet bevestigen, dan verbergt het de authenticatiesleutel (*VPN isolation could not be verified, so the auth key is hidden.*) in plaats van een sleutel uit te geven.
- Deelnemen vereist een authenticatiesleutel die alleen Owners en Admins kunnen aanmaken. Sleutels verlopen na 90 dagen. Drones ontvangen de sleutel automatisch tijdens het koppelen of bij **Push to Drone**, en alleen met toestemming van een Owner of Admin.
- Het verwijderen van een apparaat onder **Network** verwijdert het ook van de VPN-server.

## Toegangsbeheer

- Aanmelden gaat via uw UAVmatrix-account. Fleet Manager slaat geen wachtwoorden op.
- Drie rollen per organisatie (Owner, Admin, Viewer), die op de server voor elke actie worden afgedwongen. Zie [Rollen en rechten](https://docs.uavmatrix.com/nl/fleet-manager/team/roles-and-permissions/).
- De SSH-terminal en externe toegang tot UAVcast-Pro zijn beperkt tot Owners en Admins.
- Uitnodigingslinks zijn versleuteld, kunnen één keer worden gebruikt en verlopen na 7 dagen.
- UAVmatrix kan accounts of organisaties opschorten die de voorwaarden overtreden. Opgeschorte gebruikers zien **Account Suspended** of **Organization Suspended**, met de reden en een supportcontact.

## Gegevens die Fleet Manager opslaat

| Gegevens | Bewaard |
| --- | --- |
| Telemetrie (positie, hoogte, snelheid, koers, batterij, modus, armed-status, GPS, servicestatus), eenmaal per seconde | Volgens de bewaarinstelling van de organisatie: 7 dagen tot 1 jaar (standaard 1 jaar). Na 7 dagen gecomprimeerd. Verwijderd wanneer de drone wordt verwijderd. |
| Opgeslagen vluchtnamen en tijdsbereiken | Tot ze worden verwijderd, of de drone wordt verwijderd |
| Naar drones verzonden commando's, met wie ze hebben verstuurd | Tot de drone wordt verwijderd |
| Activiteitenlogboek (wie heeft gekoppeld, verwijderd, uitgenodigd of rollen gewijzigd) | Blijft bewaard wanneer drones of leden worden verwijderd |
| Missies | Tot ze worden verwijderd, of de organisatie wordt verwijderd |
| Supporttickets en hun schermafbeeldingen | Bewaard voor support |

Fleet Manager slaat geen video op. Video en MAVLink naar grondstations reizen via het VPN tussen uw apparaten, en Fleet Manager neemt ze niet op.

De terminal en de externe UAVcast-Pro-proxy lopen via de versleutelde verbinding van Fleet Manager naar de drone; hun inhoud wordt niet opgeslagen.

Verkeer via het VPN gaat rechtstreeks tussen uw apparaten wanneer de netwerken dat toestaan. Wanneer dat niet kan (bijvoorbeeld achter een strikte NAT of bij een mobiele provider), valt het terug op de openbare relayservers (DERP) van Tailscale. Het verkeer blijft in beide gevallen end-to-end versleuteld met WireGuard; UAVmatrix draait geen relay.

## Derden

- **Kaarten:** kaarttegels komen van Esri; de luchtruimlaag komt van OpenAIP via Fleet Manager.
- **FleetBot:** chatberichten worden naar Anthropic gestuurd om antwoorden te genereren. Niets anders van uw organisatie wordt verzonden. Zie [Support en FleetBot](https://docs.uavmatrix.com/nl/fleet-manager/support/#ask-fleetbot).
- **Productanalyse en foutrapporten:** Fleet Manager gebruikt PostHog voor gebruiksanalyse, zoals welke pagina's worden geopend en welke knoppen worden gebruikt, en om app-fouten te rapporteren.

Source: https://docs.uavmatrix.com/nl/fleet-manager/security/
