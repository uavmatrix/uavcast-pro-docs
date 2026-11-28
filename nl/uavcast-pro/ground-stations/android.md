# Android en tablets

> Ontvang UAVcast-Pro-telemetrie en live video op een Android-telefoon of -tablet met QGroundControl, via Wi-Fi of 4G over een VPN, plus de browseroptie voor iPad.

QGroundControl voor Android ontvangt UAVcast-Pro-telemetrie op UDP 14550 en video op UDP 5600, precies zoals de desktopversie. Installeer via 4G de Tailscale- of ZeroTier-app op de tablet, zodat de drone deze kan bereiken.

## QGroundControl op Android instellen

1. Installeer **QGroundControl** via [Google Play](https://play.google.com/store/apps/details?id=org.mavlink.qgroundcontrol).

2. Verbind de tablet met het netwerk waar de drone naartoe stuurt:

   - **Zelfde Wi-Fi**: zoek het IP-adres van de tablet onder **Instellingen → Wi-Fi → (uw netwerk) → Geavanceerd** of iets dergelijks.
   - **Via 4G**: installeer de [ZeroTier One](https://play.google.com/store/apps/details?id=com.zerotier.one)- of [Tailscale](https://play.google.com/store/apps/details?id=com.tailscale.ipn)-app, word lid van hetzelfde netwerk als de drone (zie [VPN](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/vpn/)) en noteer het VPN-adres van de tablet.

3. Voeg op de drone een bestemming toe bij [Grondcontrolestations](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/) met het IP-adres van de tablet, en zet **Telemetrie Inschakelen** en **Video Inschakelen** aan.

4. Open QGroundControl. Het voertuig verschijnt zodra de telemetrie binnenkomt.

5. Voor video: het **Q**-pictogram → **Application Settings** → **Video** (in oudere versies de sectie **Video** onder **General**), stel **Source** in op **UDP h.264 Video Stream** en controleer of het UDP-adres poort `5600` gebruikt.

Wanneer het werkt, toont de **Fly**-weergave de drone op de kaart met de vliegmodus en de batterij in de werkbalk, en het camerabeeld in het kleine videovenster in de hoek. Tik op het venster om video en kaart te wisselen.

> **Houd de VPN-app verbonden**
>
> Android kan VPN-apps op de achtergrond stoppen om batterij te besparen. Sluit ZeroTier of Tailscale uit van batterijoptimalisatie en houd de VPN ingeschakeld tijdens het vliegen.

Details over de videoinstellingen, de modus voor lage latentie en veelvoorkomende problemen vindt u op de [QGroundControl-pagina](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/qgroundcontrol/).

## iPad, iPhone en andere apparaten: gebruik de browser

De UAVcast-Pro-webinterface werkt in elke moderne browser. Open op een iPad of telefoon `http://<drone-ip>` (het VPN-adres via 4G) en gebruik de [Vliegkaart](https://docs.uavmatrix.com/nl/uavcast-pro/flight-map/): live kaart, cockpit-HUD, cameravideo, armen/ontwapenen en RTL. De video is daar de live preview (WebRTC), dus de browser moet poort 8889 op de drone kunnen bereiken.

## Veelvoorkomende problemen

| Symptoom | Oplossing |
| --- | --- |
| Voertuig verschijnt nooit via 4G | De VPN-app op de tablet staat uit, of de bestemming gebruikt het Wi-Fi-IP-adres. Gebruik het VPN-adres van de tablet. |
| Werkt totdat het scherm uitgaat | Android heeft de VPN-app gepauzeerd. Schakel batterijoptimalisatie voor de app uit. |
| Telemetrie werkt, geen video | Controleer **Video Inschakelen**, de camera en de instellingen van de videobron in QGroundControl. |

Source: https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/android/
