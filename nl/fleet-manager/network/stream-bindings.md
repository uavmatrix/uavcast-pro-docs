# Streamkoppelingen

> Video en MAVLink van elke drone naar elk grondstation via VPN routeren, hoe Fleet Manager UDP-poorten toewijst, en de instelling van QGC en Mission Planner.

Een streamkoppeling vertelt een drone om zijn video en telemetrie naar één grondstation te sturen via het VPN van uw organisatie. Eén drone kan naar meerdere grondstations streamen, en één grondstation kan meerdere drones ontvangen. Fleet Manager kiest de poorten zodat streams nooit met elkaar botsen.

## Voordat u begint

- [VPN ingeschakeld](https://docs.uavmatrix.com/nl/fleet-manager/network/#enable-vpn) en de drone op het VPN (type **UAV** in **Connected Devices**).
- Het grondstation [verbonden en geconfigureerd als **GCS**](https://docs.uavmatrix.com/nl/fleet-manager/connect-gcs/).
- De rol **Owner** of **Admin**.
- De drone is **online**. Fleet Manager stuurt de nieuwe bestemmingen direct naar UAVcast-Pro en wacht op bevestiging.

## Een koppeling toevoegen

1. Ga naar **Network → Stream Bindings** en selecteer **Add Binding**.
2. Kies in **Add Stream Binding** de **Drone** en het **Ground Station**.
3. Selecteer **Create Binding**.

![Dialoog Add Stream Binding met selectors voor drone en grondstation en een opmerking over automatische poorten](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/network--add-binding.webp)

*Dialoog Add Stream Binding met een drone en een grondstation geselecteerd, en de opmerking dat poorten automatisch worden toegewezen.*

De koppeling verschijnt in de tabel met **Video** en **Telemetry** ingeschakeld en de **Ports** (video / telemetrie). UAVcast-Pro begint binnen enkele seconden te verzenden.

Als de drone niet binnen 15 seconden bevestigt, annuleert Fleet Manager de koppeling met **Failed to send configuration to drone - it may be offline**. Controleer of de drone online is en probeer het opnieuw.

## Hoe poorten worden toegewezen

Poorten worden **per grondstation** geteld. Elke koppeling krijgt een eigen blok UDP-poorten op dat grondstation, zodat drones elkaar nooit overlappen:

- een **video**-poort voor camera 1, gevolgd door ruimte voor **camera 2** (dubbele stream) en **audio**, die UAVcast-Pro naar de volgende poorten na de videopoort stuurt;
- een **telemetrie**-poort voor MAVLink.

De eerste koppeling op een grondstation gebruikt de standaardwaarden: video **5600** en telemetrie **14550**. Latere koppelingen krijgen het eerstvolgende vrije blok.

Enkele gevolgen die het waard zijn om te weten:

- **Elk grondstation begint met de standaardwaarden.** Dezelfde drone kan verschillende poorten hebben op twee laptops, afhankelijk van wat elke laptop verder ontvangt.
- **Vrijgekomen poorten worden hergebruikt.** Het verwijderen van een koppeling maakt het blok vrij voor de volgende nieuwe koppeling naar die laptop.
- **Poorten volgen de drone niet.** Een koppeling verwijderen en opnieuw toevoegen kan andere poorten opleveren. Lees altijd de kolom **Ports** voordat u de software op het grondstation instelt.
- Poorten worden door Fleet Manager toegewezen en kunnen in de app niet worden bewerkt.
- Een handmatig ingestelde **Videopoort (Camera 2)** op de drone blijft pas vanaf UAVcast-Pro 6.5.3 behouden wanneer Fleet Manager de bestemmingen bijwerkt. In eerdere versies wist de volgende update hem.

## De software op het grondstation instellen

Gebruik de poorten uit de kolom **Ports** van de koppeling. De stream komt aan vanaf het VPN-adres van de drone.

**QGroundControl**

- **Telemetrie:** QGroundControl luistert standaard op UDP 14550, dus de eerste drone verbindt vanzelf. Voor meer drones opent u **Application Settings → Comm Links**, voegt u een link van het type **UDP** toe met de telemetriepoort van de koppeling, en verbindt u die.
- **Video:** stel in **Application Settings → Video** (onder **General** in oudere versies) de **Source** in op **UDP h.264 Video Stream** en de UDP-poort op de videopoort van de koppeling (**UDP URL** `0.0.0.0:<port>` in huidige versies). QGroundControl toont één video tegelijk. Om meerdere drones te bekijken, start u een tweede instantie of gebruikt u een videospeler voor de andere.

**Mission Planner**

- **Telemetrie:** kies in de verbindingskeuzelijst rechtsboven **UDP**, selecteer **Connect** en voer de telemetriepoort van de koppeling in. Voor meerdere drones verbindt u per poort. Mission Planner toont elk voertuig met zijn system-ID.
- **Video:** klik met de rechtermuisknop op de HUD, kies **Video → Set GStreamer Source** en voer een pipeline in die luistert op de videopoort van de koppeling. Zie [Mission Planner](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/mission-planner/) voor de exacte pipeline.

> **Geef elke drone een eigen MAVLink-system-ID**
>
> Wanneer één grondstation meerdere drones ontvangt, heeft elke vluchtcontroller een unieke `SYSID_THISMAV` (ArduPilot) of `MAV_SYS_ID` (PX4) nodig. Anders haalt het grondstation ze door elkaar.

Meer over het aansturen van veel voertuigen vanaf één station: [Streamen naar meerdere grondstations](https://docs.uavmatrix.com/nl/guides/multiple-ground-stations/).

## Een koppeling pauzeren of verwijderen

- Schakel **Video** of **Telemetry** uit in de tabel om die stream te stoppen zonder de koppeling of de poorten te verliezen. Doe dit terwijl de drone online is, zodat hij de wijziging ontvangt.
- Selecteer het prullenbakpictogram om de koppeling te verwijderen. De poorten komen vrij voor de volgende koppeling naar dat grondstation.

Gebruik het zoekveld en het filter **Video Status** (**All Video**, **Video On**, **Video Off**) om koppelingen in een grote vloot te vinden.

![Tabel Stream Bindings met drones, grondstations, video- en telemetrieschakelaars en poorten](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/network--stream-bindings.webp)

*Tabblad Stream Bindings: elke koppeling toont de drone, het grondstation, de schakelaars Video en Telemetry en de poorten.*

## Koppelingen op de UAV-pagina

Op de [UAV-pagina](https://docs.uavmatrix.com/nl/fleet-manager/fleet/uav-details/#connected-ground-stations) van elke drone staan de grondstations onder **Connected Ground Stations**, met dezelfde schakelaars en **Pause** / **Resume**. Met **Add GCS** maakt u daar een koppeling op dezelfde manier als met **Add Binding** hier, met de eerstvolgende vrije poorten op dat grondstation.

## Geen stream binnen?

Zie [Geen telemetrie in het grondstation](https://docs.uavmatrix.com/nl/troubleshooting/no-telemetry-in-gcs/) en [Geen video in het grondstation](https://docs.uavmatrix.com/nl/troubleshooting/no-video-in-gcs/). De gebruikelijke oorzaken zijn een firewall op de laptop die inkomend UDP blokkeert, grondstationssoftware die op de verkeerde poort luistert, of de stream die in de koppeling is uitgeschakeld.

Source: https://docs.uavmatrix.com/nl/fleet-manager/network/stream-bindings/
