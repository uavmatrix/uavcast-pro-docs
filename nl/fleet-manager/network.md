# Netwerk en VPN

> Schakel het privé WireGuard-VPN van uw organisatie in Fleet Manager in, verbind drones en grondstation-laptops, en beheer de tabel met apparaten.

Elke organisatie kan een eigen privé-VPN hebben: een WireGuard-mesh-netwerk tussen uw drones en grondstations, beheerd door Fleet Manager. Op dit netwerk krijgt elk apparaat een vast adres `100.x.y.z` en kan het de andere apparaten rechtstreeks bereiken, of het nu op 4G, Wi-Fi of satelliet zit, zonder port forwarding of publieke IP-adressen.

Fleet Manager gebruikt dit netwerk om [streamkoppelingen](https://docs.uavmatrix.com/nl/fleet-manager/network/stream-bindings/) te routeren: video en MAVLink van een drone naar de laptops waarop piloten QGroundControl of Mission Planner draaien.

Dit alles vindt u onder **Network** (zijbalk **Fleet Management → Network**).

## Wanneer heb ik VPN nodig?

VPN is **optioneel**: Fleet Manager toont, brengt in kaart en bedient drones ook zonder VPN, via de eigen versleutelde verbinding van de drone. Schakel VPN in wanneer u wilt dat streams grondstations bereiken.

| VPN aanbevolen | VPN niet nodig |
| --- | --- |
| Drone en grondstation op verschillende netwerken (4G, externe locaties) | Drone en grondstation op hetzelfde lokale Wi-Fi |
| U wilt directe video- en telemetriestreaming | U gebruikt een directe USB- of seriële telemetrieverbinding |
| U wilt versleutelde verbindingen tussen locaties | U test in een gecontroleerde omgeving |
| U opereert op meerdere locaties |  |

## VPN inschakelen

Alleen Owners en Admins.

1. Open **Network**. Als VPN uit staat, toont de pagina **Enable VPN Network** met wat het biedt: beveiligde WireGuard-gebaseerde verbindingen, streaming van video en telemetrie met lage latentie, en werking op elk netwerk.
2. Selecteer **Enable VPN Network**.

![Netwerkpagina met de kaart Enable VPN Network voor een organisatie zonder VPN](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/network--enable.webp)

*Netwerkpagina voordat VPN is ingeschakeld, met de drie voordelen en de knop Enable VPN Network.*

Zodra VPN aan staat, toont de pagina vier tellers (**Total Devices**, **Online**, **UAVs**, **Ground Stations**) en drie tabbladen: **Devices**, **Stream Bindings** en **Settings**.

![Netwerkpagina, tabblad Devices, met statustellers en een tabel met verbonden apparaten](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/network.webp)

*Network → Devices voor een grote operator: Total Devices 51, Online 39, UAVs 44, Ground Stations 7, en de tabel Connected Devices.*

## Drones op het VPN zetten

Drones hebben nooit een handmatig commando nodig. Er zijn twee manieren:

- **Bij koppelen.** Als VPN is ingeschakeld voordat u koppelt, voegt de stap **VPN Connection** van de wizard de drone toe. Zie [Uw eerste drone toevoegen](https://docs.uavmatrix.com/nl/fleet-manager/pair-uav/).
- **Push to Drone.** Voor drones die zijn gekoppeld voordat VPN werd ingeschakeld, toont de kaart **Push to Drone** op het tabblad **Devices** elke drone die niet op uw netwerk zit. Selecteer **Connect** naast een drone om de VPN-instellingen naar hem te sturen. De drone moet online zijn.

Als een drone al op een ander Tailscale-netwerk zit, krijgt hij een badge **Existing VPN**. **Connect** vraagt dan om bevestiging (**Existing VPN Connection Detected**), en **Replace & Connect** verplaatst hem naar het netwerk van uw organisatie.

De drone verschijnt in **Connected Devices** met het type **UAV** en zijn VPN-adres, en de UAV-pagina krijgt een knop **Open via VPN**.

## Grondstations op het VPN zetten

Grondstations sluiten zich aan met één Tailscale-commando vanuit **Connect a Device**. Volg [Een grondstation verbinden](https://docs.uavmatrix.com/nl/fleet-manager/connect-gcs/).

## Connected Devices

De tabel toont elk apparaat op het netwerk:

| Kolom | Toont |
| --- | --- |
| **Status** | Online of offline op het VPN |
| **Device** | Naam en hostnaam |
| **Type** | **UAV**, **GCS** of **Unknown**. Onbekende apparaten hebben een knop **Configure**. |
| **IP Address** | Het VPN-adres van het apparaat (`100.x.y.z`) |
| **Last Check-in** | Wanneer het apparaat voor het laatst op het netwerk is gezien |

Selecteer **Sync** om de lijst te verversen vanaf de VPN-server. Het actiemenu van elke rij bevat:

- **Rename**: een leesbare naam, bijvoorbeeld "Veldlaptop – Team Noord".
- **Change Type**: wissel tussen **UAV**, **GCS** en **Unknown**. Voor een UAV kiest u welke gekoppelde drone het is.
- **Remove Device**: haalt het apparaat van het netwerk. Voor een drone vraagt Fleet Manager hem het VPN te verlaten, en worden zijn streamkoppelingen verwijderd.

### Een onbekend apparaat configureren

Nieuwe grondstations verschijnen als **Unknown**, en een banner telt de apparaten die configuratie nodig hebben. Selecteer **Configure** en beantwoord **What type of device is this?**

- **Ground Control Station (GCS):** een computer met QGroundControl, Mission Planner of vergelijkbare software. Hij **ontvangt** video en telemetrie en wordt beschikbaar voor streamkoppelingen.
- **Drone / UAV:** een drone met UAVcast-Pro. Kies welke gekoppelde drone het is, zodat u de streaming ervan kunt beheren.

Selecteer **Continue** en daarna **Complete Setup**.

## Tabblad Settings

**Danger Zone → Delete Network** verwijdert het VPN-netwerk permanent, met alle verbonden apparaten, alle authenticatiesleutels en alle streamkoppelingen. Apparaten vallen van het netwerk af, en u moet elk grondstation en elke drone opnieuw verbinden.

Het verwijderen van het netwerk schakelt ook VPN uit voor de organisatie, en online UAV's krijgen te horen dat ze het VPN moeten verlaten. De pagina Network toont daarna weer **Enable VPN Network**, wat een nieuw, leeg netwerk maakt. Er is geen aparte schakelaar om VPN uit te zetten: **Delete Network** is de manier om dat te doen.

## Netwerkvereisten

| Apparaat | Heeft uitgaand nodig |
| --- | --- |
| Drone (Fleet Manager-verbinding) | HTTPS (TCP 443) naar `fleet-manager.uavmatrix.com`, TCP 8883 voor MQTT over TLS |
| Drone en grondstation (VPN) | HTTPS (TCP 443) naar `vpn-connect.uavmatrix.com`, plus UDP voor WireGuard. Tailscale gebruikt standaard UDP 41641. |

De meeste mobiele en kantoornetwerken staan dit toe. Als apparaten wel aan het VPN deelnemen maar elkaar niet kunnen bereiken, zie [VPN verbonden maar drone niet bereikbaar](https://docs.uavmatrix.com/nl/troubleshooting/vpn-cant-reach-drone/).

Wanneer twee apparaten elkaar niet rechtstreeks via UDP kunnen bereiken, wordt hun verkeer doorgegeven via de openbare DERP-relayservers van Tailscale over HTTPS (TCP 443). Het verkeer blijft end-to-end versleuteld, maar de relay voegt vertraging toe. Sta daarom uitgaand UDP toe waar mogelijk.

Source: https://docs.uavmatrix.com/nl/fleet-manager/network/
