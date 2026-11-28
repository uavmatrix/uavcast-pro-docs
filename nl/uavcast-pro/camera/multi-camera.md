# Twee camera's: RC-kanaalwisseling en dubbele stream

> Sluit twee camera's aan op UAVcast-Pro en wissel ertussen met uw RC-zender, of stream beide tegelijk naar QGroundControl of Mission Planner op aparte UDP-poorten.

UAVcast-Pro ondersteunt twee camera's, bijvoorbeeld een voorwaartse FPV-camera en een naar beneden gerichte of gimbalcamera. U kunt ze op twee manieren gebruiken:

- **Wisselen**: één stream, en u kiest welke camera die voedt, via de webinterface of via een RC-kanaal op uw zender. Gebruikt de bandbreedte en CPU van één stream.
- **Dubbele stream**: beide camera's streamen tegelijk, elk naar een eigen UDP-poort, elk met een eigen resolutie, FPS en bitrate. Gebruikt de dubbele bandbreedte en CPU.

Ondersteunde combinaties: CSI + USB, twee USB-camera's, of twee CSI-camera's op boards met twee cameraconnectors (Raspberry Pi 5, Compute Module-carrierboards).

## De tweede camera toevoegen

1. Ga naar **Camera → Camera-instellingen**. Zorg dat **CAM 1** een camera heeft.
2. Selecteer **Camera toevoegen** naast CAM 1 en kies de tweede camera. Deze verschijnt in het **CAM 2**-slot.
3. Klik op een slot om die camera de actieve camera te maken (*Klik om naar Camera 2 te schakelen*).

In de wisselmodus delen beide camera's de resolutie en framesnelheid van Camera 1 (*Resolutie en FPS van Camera 1 worden gebruikt*). Als Camera 2 dat formaat niet ondersteunt, gebruikt deze de eigen resolutie en wordt geschaald, tenzij u **Resolutie van Camera 1 overnemen** aanzet voor een camera die dat ondersteunt.

## Camera's wisselen met uw RC-zender

**RC-kanaalwisseling** verschijnt wanneer twee camera's zijn ingesteld en de dubbele stream uit staat.

1. Wijs op uw zender een schakelaar met twee posities toe aan een vrij kanaal, bijvoorbeeld kanaal 7. Controleer in Mission Planner of op **Vliegkaart → Radio** of het kanaal beweegt tussen ongeveer 1000 en 2000 µs.
2. Zet onder **RC-kanaalwisseling** **RC-kanaal-camerawisseling inschakelen** aan.
3. Kies het **RC-kanaal**.
4. Zet de schakelaar om en let op **Huidige PWM**. Onder 1500 kiest Camera 1, boven 1500 kiest Camera 2.

![Bedieningspaneel Camera met CAM 1 ingevuld en een leeg slot Camera toevoegen](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/camera--control-panel.webp)

*De cameraslots: CAM 1 in gebruik en Camera toevoegen voor de tweede camera. RC-kanaalwisseling verschijnt zodra beide slots zijn gevuld en dubbele stream uit staat.*

Zolang RC-wisseling aan staat, doet klikken op een cameraslot niets: de zender heeft de controle. Zet RC-wisseling uit om handmatig camera's te kiezen.

| Instelling | Standaard | Waarden | Opmerkingen |
| --- | --- | --- | --- |
| **RC-kanaal-camerawisseling inschakelen** | Uit | Aan, uit |  |
| **RC-kanaal** | Kanaal 7 | Kanaal 1–18 | Gelezen van de RC-ingang van de vluchtcontroller. |
| Schakelpunt | 1500 µs | vast | PWM < 1500 = Camera 1, PWM > 1500 = Camera 2. |

## Beide camera's tegelijk streamen (dubbele stream)

1. Zet op de Camerapagina, met twee ingestelde camera's, **Dubbele stream** aan. Het label toont **Beide live**.
2. Stel onder **Instellingen per camera** de resolutie, FPS en bitrate voor elke camera in.
3. Bij [Grondcontrolestations](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/) heeft elke bestemming nu **Videopoort (Camera 2)**. Laat dit leeg om **Videopoort** + 1 (`5601`) te gebruiken, of voer een andere poort in. Met meerdere bestemmingen op één computer plaatst u hun videopoorten 3 uit elkaar (`5600`, `5603` …), zodat camera 2 en audio niet op de poort van een andere bestemming terechtkomen.
4. Stel op het grondstation een tweede videoontvanger in voor die poort.

Camera 1 gaat naar de **Videopoort** van elk grondstation (standaard `5600`), Camera 2 naar **Videopoort (Camera 2)** (standaard `5601`).

QGroundControl toont één videostream tegelijk. Om Camera 2 te bekijken, draait u een tweede ontvanger, bijvoorbeeld een tweede QGroundControl-instantie op poort 5601, Mission Planner met een GStreamer-bron op 5601, of GStreamer rechtstreeks:

```bash
gst-launch-1.0 udpsrc port=5601 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264" ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

> **Let op de CPU en de verbinding**
>
> Twee streams verdubbelen de coderingsbelasting en de bandbreedte. Houd de **Systeembelasting** in de gaten (*De CPU zit bijna aan zijn limiet. Verlaag de resolutie/bitrate van een stream, of schakel de tweede stream uit.*) en houd de gecombineerde bitrate ruim binnen uw mobiele uplink. Een gangbare verdeling is 1280x720 met 1500 kbps voor de hoofdcamera en 854x480 met 600 kbps voor de tweede.

De Vliegkaart toont één videovenster per actieve stream. Opnames kunnen beide camera's bevatten: zie **Camera 2 opnemen** in [Opnames](https://docs.uavmatrix.com/nl/uavcast-pro/camera/recordings/).

## Probleemoplossing

- **Tweede camera ontbreekt in de lijst**: twee CSI-camera's vereisen een board met twee cameraposities. Start op een Raspberry Pi de Pi opnieuw op na het installeren van UAVcast-Pro: de installer vergroot het camerageheugen (CMA) zodat twee camera's samen kunnen draaien.
- **Beeld van Camera 2 uitgerekt**: Camera 2 wordt in de wisselmodus geschaald naar de resolutie van Camera 1. Gebruik camera's met dezelfde beeldverhouding, of zet **Resolutie van Camera 1 overnemen** aan.
- **Schakelaar doet niets**: controleer **Huidige PWM**. *Geen signaal* betekent dat de vluchtcontroller geen RC-ingang op dat kanaal rapporteert.

Source: https://docs.uavmatrix.com/nl/uavcast-pro/camera/multi-camera/
