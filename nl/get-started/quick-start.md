# Snelstart

> Verbind een MAVLink-vluchtcontroller met UAVcast-Pro en krijg telemetrie en live video in Mission Planner of QGroundControl, eerst op uw lokale netwerk en daarna via 4G/LTE.

Deze handleiding brengt een drone met geïnstalleerde UAVcast-Pro naar live telemetrie en video in Mission Planner of QGroundControl. U doet dit eerst op uw lokale netwerk, waar minder dingen misgaan, en schakelt daarna over op 4G/LTE. Het lokale deel duurt ongeveer 10 minuten.

## Voordat u begint

- UAVcast-Pro geïnstalleerd en het apparaat opnieuw opgestart. Zie [Installatie](https://docs.uavmatrix.com/nl/get-started/installation/).
- Uw licentiesleutel. Zie [Licentie & activering](https://docs.uavmatrix.com/nl/get-started/license-activation/).
- De vluchtcontroller verbonden met de companion computer via USB of een TELEM-poort, en ingeschakeld.
- Een camera aangesloten (optioneel).
- Een laptop met Mission Planner of QGroundControl op **hetzelfde netwerk** als de drone. Noteer het IP-adres van de laptop (`ipconfig` op Windows, `ip a` op Linux, **Systeeminstellingen → Netwerk** op macOS).

## 1. Activeer de licentie

> Je hebt een UAVcast-Pro-licentie nodig om de drone te activeren. Koop er een in de UAVmatrix-winkel.
>
> [UAVcast-Pro kopen](https://uavmatrix.com/nl/checkout) · [Abonnementen en prijzen](https://uavmatrix.com/nl/products)

1. Open `http://<drone-ip>` in een browser. U komt op **Applicatie** terecht.
2. Plak uw sleutel in **Voer Licentiesleutel in** en selecteer **Valideren**.

De zijbalk wordt ontgrendeld. Ga nu naar **Users**, selecteer **Add User** en maak een beheerdersaccount aan, zodat de webinterface niet openstaat voor iedereen op het netwerk.

## 2. Verbind de vluchtcontroller

1. Ga naar **Vluchtcontroller → Verbinding**.
2. Kies onder **Verbindingstype** **USB** of **UART / Serial**, afhankelijk van uw bedrading.
3. Laat **Poort** en **Baudrate** op **Automatisch** staan.
4. Als het statuspaneel **Link stopped** toont, selecteer dan **Verbinden**.
5. Wacht tot de status verandert naar **Verbonden**. **Mavlink Informatie** vult zich met het voertuigtype, de vliegmodus, GPS en de batterij, en de bovenste balk toont **FC Connected**.

![Verbindingspagina van de vluchtcontroller met Verbonden via USB, de Verbindingscontrole met vier geslaagde stappen en de MAVLink Inspecteur](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/flight-controller.webp)

*Vluchtcontroller → Verbinding met een werkende USB-verbinding.*

Blijft het hangen op **Waiting for device**, **Detecting baud rate** of **No heartbeat**? Selecteer **Auto-detect** en lees het paneel **Connection check**: het noemt het eerste punt dat niet klopt. Meer informatie vindt u bij [Vluchtcontroller](https://docs.uavmatrix.com/nl/uavcast-pro/flight-controller/).

## 3. Stuur telemetrie en video naar uw laptop

1. Ga naar **Grondcontrolestations**. Er staat al één lege bestemmingskaart.
2. Voer een **Naam** in, bijvoorbeeld `Laptop`.
3. Voer bij **Bestemmings-IP of Host** het IPv4-adres van uw laptop in, bijvoorbeeld `192.168.1.20`, en druk op Enter. Een groen vinkje betekent dat het is opgeslagen.
4. Laat **Telemetriepoort** op `14550` en **Videopoort** op `5600` staan.
5. Zet **Telemetrie Inschakelen** aan.
6. Zet **Video Inschakelen** aan als u een camera heeft.

Velden worden opgeslagen zodra u ze verlaat. Er is geen knop Opslaan.

## 4. Start de camera

Sla dit over als u geen camera heeft.

1. Ga naar **Camera → Camera-instellingen**.
2. Zet **Camera Inschakelen?** op **Ja**.
3. Klik op de **CAM 1**-sleuf en kies uw camera, bijvoorbeeld *Raspberry Pi Camera - imx708 (CSI)* of uw USB-webcam.
4. Kies onder **Camera-instellingen** een **Resolutie**. Begin met `1280x720` of het dichtstbijzijnde formaat dat uw camera biedt.
5. Laat **Selecteer FPS** op **Automatisch** staan en **Bitsnelheid** op `0` (automatisch).
6. Zet onder **Streaminstellingen** het vinkje bij **Live Voorvertoning Inschakelen?** aan en selecteer **Starten**. **Live Voorvertoning** toont het beeld.

## 5. Open uw grondstation

**QGroundControl**

QGroundControl luistert standaard op UDP 14550, dus de drone verschijnt vanzelf binnen enkele seconden.

Voor video: klik op het **Q**-icoon → **Application Settings** → **Video** (in oudere versies de sectie **Video** onder **General**). Stel **Source** in op **UDP h.264 Video Stream** en laat de standaard UDP-poort `5600` staan. De video verschijnt in de Fly-weergave.

**Mission Planner**

Kies in de rechterbovenhoek **UDP**, selecteer **Connect** en accepteer poort `14550`.

![Mission Planner Flight Data-weergave verbonden via UDP: het verbindingsvak rechtsboven toont UDP, de link UDP14550-1-QUADRO en de knop DISCONNECT; de HUD toont DISARMED, Unhealthy AHRS en GPS: No Fix](https://docs.uavmatrix.com/nl/img/screenshots/gcs/mission-planner--connected.webp)

*Mission Planner verbonden via UDP 14550: het verbindingsvak (rechtsboven) toont de link en DISCONNECT. Testopstelling zonder GPS, vandaar Unhealthy AHRS en GPS: No Fix op de HUD.*

Voor video: klik met de rechtermuisknop op de HUD → **Video** → **Set GStreamer Source** en plak:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

Volledige handleidingen met schermafbeeldingen en oplossingen: [Mission Planner](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/mission-planner/), [QGroundControl](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/qgroundcontrol/), [Android](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/android/), en GStreamer op [Windows](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/gstreamer-linux/) of [macOS](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/gstreamer-macos/).

> **Windows-firewall**
>
> Windows blokkeert inkomend UDP tenzij de app om een uitzondering heeft gevraagd. Als telemetrie of video niet aankomt, sta dan Mission Planner of QGroundControl toe in de firewall voor **privé- en openbare netwerken**, of open UDP 14550 en 5600.

U heeft nu telemetrie en video op uw lokale netwerk. De rij **Grondstation** op het dashboard toont *Sending · … packets/s*.

## 6. Vlieg via 4G/LTE

Over een mobiel netwerk heeft de drone geen adres dat uw laptop kan bereiken, dus komen beide op hetzelfde VPN. De Fleet Manager VPN is inbegrepen bij uw licentie.

1. Sluit het modem aan. Stel op **Modem** het **Modemtype** in op **HiLink** of **Traditional (PPP)**. Laat **Access Point Naam** leeg: UAVcast-Pro vindt de APN. Zie [Mobiel modem](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/cellular-modem/).
2. Meld u aan bij [Fleet Manager](https://fleet-manager.uavmatrix.com/), open **Network** en selecteer **Enable VPN Network** als die nog niet aanstaat.
3. Koppel de drone: ga in UAVcast-Pro naar **Beheer → Fleet Management → Connect to Fleet Manager** en voer daarna de code in Fleet Manager in onder **Fleet → Pair Device**. Laat **Enable VPN for this UAV** aangevinkt.
4. Zet de laptop op het VPN: installeer Tailscale, voer het **GCS Connection Command** uit vanaf de pagina **Network** van Fleet Manager en markeer daarna de laptop als **Ground Control Station (GCS)**.
5. Voeg in **Network → Stream Bindings** een binding toe van de drone naar de laptop. Fleet Manager stuurt de bestemming naar de drone, en in de kolom **Ports** ziet u op welke poorten u moet luisteren.
6. Selecteer op **Netwerken** de optie **Modem Prioriteit (Buitenmodus)** zodat het verkeer via het modem loopt wanneer wifi wegvalt.

Volledige handleiding: [Vliegen buiten het zicht via 4G](https://docs.uavmatrix.com/nl/guides/bvlos-4g/). Gebruikt u al een eigen Tailscale- of ZeroTier-netwerk? Voeg de drone en de laptop dan daaraan toe en gebruik het VPN-IP-adres van de laptop als bestemming: zie [VPN](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/vpn/).

> **Stel een GCS-failsafe in voordat u via LTE vliegt**
>
> Mobiele verbindingen vallen weleens weg. Zorg dat de vluchtcontroller een GCS-failsafe heeft ingesteld (`FS_GCS_ENABLE` op ArduPilot, `NAV_DLL_ACT` op PX4). De bovenste balk toont **GCS Failsafe Enabled** of **GCS Failsafe Disabled**.

## Volgende stappen

- [Twee camera's, RC-omschakeling en dual stream](https://docs.uavmatrix.com/nl/uavcast-pro/camera/multi-camera/)
- [Elke vlucht opnemen op de drone](https://docs.uavmatrix.com/nl/uavcast-pro/camera/recordings/)
- [RTK-correcties via 4G met NTRIP](https://docs.uavmatrix.com/nl/uavcast-pro/flight-controller/ntrip-rtk/)
- [De drone koppelen aan Fleet Manager](https://docs.uavmatrix.com/nl/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/nl/get-started/quick-start/
