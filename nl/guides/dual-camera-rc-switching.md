# Twee camera's: RC-wisseling of dubbele stream

> Sluit twee camera's aan op UAVcast-Pro en wissel ertussen met uw RC-zender, of stream ze tegelijk met dubbele stream. Instellingen, poorten en CPU.

UAVcast-Pro werkt met twee camera's, bijvoorbeeld een voorcamera en een naar beneden gerichte of zoomcamera. U kiest tussen twee modi:

|  | **Wisselen** (standaard) | **Dubbele stream** |
| --- | --- | --- |
| Wat het grondstation ontvangt | Eén videostream, met camera 1 of camera 2 | Twee videostreams tegelijk |
| Hoe u kiest | De camerabadges in de webinterface, of een RC-kanaal | Beide altijd live |
| Poorten | **Videopoort** | Camera 1 op **Videopoort**, camera 2 op **Videopoort (Camera 2)** (standaard: Videopoort + 1) |
| CPU en bandbreedte | Eén encodering | Twee encoderingen, ongeveer het dubbele aan uplink |

## 1. De tweede camera toevoegen

1. Sluit beide camera's aan. Twee CSI-camera's op een Pi 5, een CSI- en een USB-camera, of twee USB-camera's werken allemaal.
2. Open **Camera → Camera-instellingen**. De cameraslots tonen **CAM 1** en **CAM 2**.
3. Klik op **Camera toevoegen** bij het tweede slot en kies de camera.
4. **Resolutie en FPS van Camera 1 worden gebruikt** in de wisselmodus. Ondersteunt camera 2 de resolutie van camera 1, zet dan **Resolutie van Camera 1 overnemen** aan; anders gebruikt camera 2 zijn eigen resolutie en wordt die geschaald.

Staat een camera niet in de lijst, zie [Camera niet gedetecteerd](https://docs.uavmatrix.com/nl/troubleshooting/camera-not-detected/).

## 2a. Camera's wisselen met uw zender

1. Schakel onder **RC Kanaal Wisselen** de optie **Camerawisseling via RC-kanaal inschakelen** in.
2. Kies een vrij kanaal bij **RC-kanaal**. De standaard is kanaal 7.
3. Wijs een schakelaar met twee posities op uw zender toe aan dat kanaal.
4. Zet de schakelaar om en kijk naar **Huidige PWM**: onder 1500 µs selecteert camera 1, boven 1500 µs camera 2.

![Bedieningspaneel Camera met Camera Inschakelen? op Ja, CAM 1 ingevuld en een lege slot Camera toevoegen](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/camera--control-panel.webp)

*Bedieningspaneel Camera met één camera. Het paneel RC Kanaal Wisselen verschijnt er pas onder zodra CAM 2 is toegevoegd en dubbele stream uit staat.*

Zolang RC-wisseling aan staat, wisselen de camerabadges in de webinterface niet van camera. Schakel RC-wisseling uit om weer met de hand camera's te selecteren.

## 2b. Beide camera's tegelijk streamen

1. Zet **Dubbele stream** aan. De badge toont **Beide live**.
2. Elke camera heeft nu eigen resolutie, FPS en bitsnelheid onder **Instellingen per camera**.
3. Open **Grondcontrolestations**. Elke bestemming toont nu **Videopoort (Camera 2)**. Laat dit veld leeg om **Videopoort** + 1 (5601) te gebruiken, of voer een poort in.
4. Ontvang op het grondstation de tweede stream op die poort, bijvoorbeeld met een tweede QGroundControl-videobron of een GStreamer-venster: zie [Grondstations en video](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/#set-up-the-receiving-side) voor QGroundControl, Mission Planner en GStreamer op elk besturingssysteem.

> **Let op de CPU**
>
> UAVcast-Pro codeert video via software. Houd bij twee streams de **Systeembelasting** in de gaten. Zegt die **CPU zit bijna aan de limiet**, verlaag dan de resolutie of bitsnelheid van één stream, of schakel de tweede stream uit. Een Raspberry Pi 4 of 5 wordt aanbevolen voor dubbele stream.

De **Vliegkaart** toont één videovenster per actieve stream. U kunt ze als tabbladen onderaan de kaart verbergen.

## Poortplanning

Met dubbele stream aan gebruikt elke bestemming twee videopoorten, en audio (als **Audio naar grondstations sturen** aan staat) gebruikt videopoort + 2. Voegt u meer bestemmingen toe op dezelfde computer, zet de videopoorten dan minimaal drie uit elkaar, bijvoorbeeld 5600 en 5610.

## Beide camera's opnemen

Onder **Camera → Opnames → Instellingen** werkt **Camera 2 opnemen** alleen als dubbele stream aan staat. Zie [Vluchten opnemen en terugkijken](https://docs.uavmatrix.com/nl/guides/recording-flight-review/).

Source: https://docs.uavmatrix.com/nl/guides/dual-camera-rc-switching/
