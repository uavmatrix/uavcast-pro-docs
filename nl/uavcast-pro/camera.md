# Camera-instellingen

> Stel een Raspberry Pi-camera of USB-webcam in UAVcast-Pro in en stream H.264-video met lage latentie over UDP naar QGroundControl of Mission Planner. Resolutie, FPS en bitrate.

UAVcast-Pro legt video vast van een Raspberry Pi CSI-camera of een USB-webcam, codeert deze als H.264 en verstuurt deze als RTP over UDP naar elk grondstation waarop **Video Inschakelen** aan staat. Mission Planner en QGroundControl spelen deze direct af op poort 5600. Een kopie van de stream voedt de live voorvertoning in de webinterface en de recorder op de drone. Open **Camera → Camera-instellingen**.

![Camera Bedieningspaneel met CAM 1 ingesteld op een Raspberry Pi-camera, cameraninstellingen voor resolutie, FPS, bitrate en streamherstel, en het paneel Live Voorvertoning](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/camera.webp)

*Camera → Camera-instellingen met een Raspberry Pi-camera als CAM 1 op 1536×864 en 30 FPS, bitrate Auto. Live Voorvertoning staat hier uit.*

## De camera instellen

1. Sluit de camera aan en ga naar **Camera → Camera-instellingen**.
2. Zet **Camera Inschakelen?** op **Ja**.
3. Klik op het **CAM 1**-slot en kies de camera. CSI-camera's verschijnen als *Raspberry Pi Camera - imx708 (CSI)* of iets vergelijkbaars; USB-camera's op hun naam.
4. Kies onder **Camera Settings** een **Resolutie** die uw camera ondersteunt. Niet-ondersteunde formaten zijn gemarkeerd.
5. Laat **Selecteer FPS** op **Auto** staan en **Bitsnelheid** op `0` (auto) om te beginnen.
6. Zet onder **Stream Settings** **Live Voorvertoning inschakelen?** aan en selecteer **Start**.
7. Zet bij de [Grondcontrolestations](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/) **Video Inschakelen** aan voor elk grondstation dat video moet ontvangen.

Als er geen camera in de lijst verschijnt, bekijk dan het **Actielogboek** onderaan de pagina: daar staat elk apparaat dat de cameradetector heeft gecontroleerd en waarom het is overgeslagen.

## Instellingenoverzicht

| Instelling | Standaard | Waarden | Opmerkingen |
| --- | --- | --- | --- |
| **Camera Inschakelen?** | **Ja** | **Ja**, **Nee** | **Nee** stopt de video volledig. |
| **CAM 1** | Raspberry Pi-camera | Gedetecteerde camera's, **Aangepaste pipeline invoeren** | Kies **Aangepaste pipeline invoeren** om uw eigen GStreamer-pipeline te schrijven. Zie [Aangepaste pipeline](https://docs.uavmatrix.com/nl/uavcast-pro/camera/custom-pipeline/). |
| **Resolutie** | `640x480` | Formaten die de camera rapporteert | Als de camera het formaat niet kan leveren, valt UAVcast-Pro terug op het grootste ondersteunde formaat en logt welk formaat is gebruikt. |
| **Selecteer FPS** | **Auto** | **Auto** of de snelheden die de camera bij deze resolutie ondersteunt | **Auto** laat de camera kiezen. |
| **Bitsnelheid** | `0` (**Auto**) | 0–10000 kbps, in stappen van 100 | Stel een vaste waarde in voor mobiele verbindingen. |
| **Stream Herstelsnelheid** | **Auto** | **Auto** (0), 1, 5, 10, 15, 30, 60, 90, 120 frames | Keyframe-interval. Lagere waarden herstellen sneller na pakketverlies en verhelpen grijze vervorming over VPN, ten koste van bandbreedte. |
| **Flip Settings** | Uit | **Verticaal spiegelen**, **Horizontaal spiegelen** | CSI-camera's. |
| **Rotatie** | `0°` | 0°, 90°, 180°, 270° | USB- en andere niet-CSI-camera's. |
| **Live Voorvertoning inschakelen?** | Aan | Aan, uit | Voorvertoning op deze pagina en op de Vliegkaart. Opname gebruikt ook deze kopie van de stream. |

Instellingen worden opgeslagen zodra u ze wijzigt. Als een lopende stream een wijziging niet overneemt, selecteer dan **Herstarten** onder **Stream Settings**.

## Instellingen kiezen voor uw verbinding

Er is geen enkele juiste instelling: de bitrate moet binnen het zwakste deel van de verbinding passen, met ruimte over voor telemetrie. Startpunten voor één camera:

| Verbinding | Resolutie | FPS | Bitrate | Stream Herstelsnelheid |
| --- | --- | --- | --- | --- |
| Lokale Wi-Fi of Ethernet | 1920x1080 | 30 | 4000–6000 kbps | Auto |
| Goede 4G/LTE | 1280x720 | 30 | 1500–2500 kbps | 30 frames |
| Zwakke 4G of groot bereik | 1280x720 of 854x480 | 15–20 | 800–1200 kbps | 15 frames |

Als het beeld bevriest of grijs vervormt na pakketverlies, verlaag dan eerst de bitrate en daarna de **Stream Herstelsnelheid**, zodat keyframes vaker komen.

### CPU-belasting

De indicator **Systeembelasting** toont hoe hard de encoder werkt. Op een Raspberry Pi 5 wordt elke stream in software gecodeerd (de Pi 5 heeft geen H.264-encoder), dus hoge resoluties of twee streams kunnen de CPU volledig belasten. Wanneer de melding *De CPU zit bijna aan zijn limiet. Verlaag de resolutie of bitrate.* verschijnt, verlaag dan de resolutie of bitrate voordat u vliegt.

## Live voorvertoning

**Live Voorvertoning** speelt de stream af in de browser via de ingebouwde mediaserver (WebRTC op poort **8889**). Afhankelijk van het netwerk loopt deze enkele honderden milliseconden achter op de UDP-stream die uw grondstation ontvangt. Gebruik de knop om in een nieuw tabblad te openen om op volledig scherm te kijken. Browsers starten de voorvertoning gedempt; hef de demping in de speler op als u [audio](https://docs.uavmatrix.com/nl/uavcast-pro/camera/audio/) gebruikt.

De voorvertoning vereist dat de browser poort 8889 op de drone rechtstreeks kan bereiken. Dat werkt op het lokale netwerk en via een VPN, maar niet via **Open via Proxy** van Fleet Manager, dat alleen de webinterface doorstuurt. Gebruik **Open via VPN** voor de voorvertoning.

## Hoe de stream wordt verstuurd

| Stream | Transport | Poort op het grondstation |
| --- | --- | --- |
| Video camera 1 | H.264, RTP over UDP | **Videopoort** (standaard `5600`) |
| Video camera 2 (dubbele stream) | H.264, RTP over UDP | **Videopoort (Camera 2)**, standaard Videopoort + 1 (`5601`) |
| Audio (optioneel) | Opus, RTP over UDP | Videopoort + 2 (`5602`) |
| Voorvertoning | WebRTC | Browser naar drone, poort 8889 |

De drone stuurt de stream naar het grondstation. Het grondstation hoeft er niet om te vragen, en niets op de drone luistert naar inkomende videoverbindingen.

## Gerelateerd

- [Twee camera's: RC-kanaalwisseling en dubbele stream](https://docs.uavmatrix.com/nl/uavcast-pro/camera/multi-camera/)
- [Audio](https://docs.uavmatrix.com/nl/uavcast-pro/camera/audio/)
- [Opnames en vluchtterugblik](https://docs.uavmatrix.com/nl/uavcast-pro/camera/recordings/)
- [Aangepaste GStreamer-pipeline](https://docs.uavmatrix.com/nl/uavcast-pro/camera/custom-pipeline/)
- [Probleemoplossing: camera niet gedetecteerd](https://docs.uavmatrix.com/nl/troubleshooting/camera-not-detected/)
- [Probleemoplossing: haperende of vertraagde video](https://docs.uavmatrix.com/nl/troubleshooting/choppy-or-delayed-video/)

Source: https://docs.uavmatrix.com/nl/uavcast-pro/camera/
