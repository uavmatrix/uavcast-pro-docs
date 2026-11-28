# Camera niet gedetecteerd

> Ziet UAVcast-Pro geen camera's? Controleer de CSI-flatkabel, rpicam-hello, cameraondersteuning op Ubuntu en v4l2-ctl voor USB-camera's.

**Camera → Camera-instellingen** toont **Geen camera's beschikbaar** bij **Selecteer Camera**, de gewenste camera ontbreekt in de lijst, of het **Actielogboek** meldt *No camera detected*.

| Wat u ziet | Waarschijnlijke oorzaak | Begin bij |
| --- | --- | --- |
| Een Raspberry Pi CSI-camera (flatkabel) ontbreekt | Kabel, connector of de camerastack | [Controle 1](https://docs.uavmatrix.com/nl/troubleshooting/camera-not-detected/#check-1) |
| CSI-camera op Ubuntu | Ubuntu heeft standaard geen Raspberry Pi-camerastack | [Controle 2](https://docs.uavmatrix.com/nl/troubleshooting/camera-not-detected/#check-2) |
| Een USB-camera ontbreekt | Niet gezien door Linux, of geen videoapparaat voor opname | [Controle 3](https://docs.uavmatrix.com/nl/troubleshooting/camera-not-detected/#check-3) |
| Camera wordt vermeld, maar video start nooit | Niet-ondersteunde resolutie of een ander programma gebruikt de camera | [Controle 4](https://docs.uavmatrix.com/nl/troubleshooting/camera-not-detected/#check-4) |

## Controle 1: Raspberry Pi CSI-camera

1. Schakel de Pi uit. Plaats de flatkabel aan beide uiteinden opnieuw, met de contacten in de juiste richting, en sluit de vergrendelingen van de connector. Een Pi 5 en een Pi Zero 2 W hebben de smallere kabel met 22 pins nodig.

2. Start de Pi op en voer dit uit op de Pi:

   ```bash
   rpicam-hello --list-cameras
   ```

   Op oudere Raspberry Pi OS-images is het commando `libcamera-hello --list-cameras`.

3. Als de camera hier niet wordt vermeld, ziet Linux haar niet. Probeer een andere kabel of camera voordat u iets in UAVcast-Pro wijzigt.

4. Als de camera wel wordt vermeld, herstart de camera vanaf de Camera-pagina (**Herstarten**, of **Stoppen** en daarna **Starten**) en open **Selecteer Camera** opnieuw. Elke CSI-camera verschijnt als eigen item, bijvoorbeeld *CSI Camera 0 - imx708 (libcamera)*.

> **Twee CSI-camera's**
>
> Voor twee camera's heeft het cameradriver meer geheugen nodig. Sinds v6.2.2 verhoogt het installatieprogramma het CMA-geheugen in `config.txt` automatisch voor setups met meerdere camera's. Start het apparaat opnieuw op na de installatie als u de tweede camera later heeft toegevoegd.

## Controle 2: CSI-camera op Ubuntu of Debian

UAVcast-Pro gebruikt `rpicam-vid` voor CSI-camera's. Het installatieprogramma installeert `rpicam-apps` (of `rpicam-apps-core`) op Raspberry Pi OS en Debian. Op Ubuntu is de Raspberry Pi-camerastack niet als pakket beschikbaar, en het logboek meldt *CSI camera not available: Ubuntu requires building libcamera from source. USB cameras are supported.*

Gebruik Raspberry Pi OS 64-bit als u een CSI-camera nodig heeft, of gebruik op Ubuntu een USB-camera.

## Controle 3: USB-camera

1. Sluit de camera rechtstreeks aan op de companion computer, niet via een hub zonder eigen voeding.

2. Voer uit:

   ```bash
   v4l2-ctl --list-devices
   ```

3. Als de camera ontbreekt, ziet Linux haar niet. Controleer `lsusb` en probeer een andere poort en kabel.

4. Als de camera wel wordt vermeld, herstart de camera met **Herstarten** op de Camera-pagina en open **Selecteer Camera** opnieuw.

De meeste UVC-webcams werken, bijvoorbeeld de Logitech C920 en C615. Camera's die alleen een indeling leveren die de encoder niet kan verwerken, of apparaten die geen videoapparaat zijn (sommige capture cards), worden niet vermeld.

## Controle 4: Vermeld, maar video start niet

- Als het logboek *Camera … does not support …x… - streaming at …x… instead* meldt, kies dan een resolutie die de camera ondersteunt bij **Resolutie**.
- Sluit andere programma's die de camera gebruiken. Slechts één programma kan de camera tegelijk openen.
- Als **Camera Inschakelen?** *Onvoldoende rechten* toont, werk dan bij naar v6.5.2 of later. Dat heeft dit probleem opgelost.

## Nog steeds niet gedetecteerd?

[Download de logboeken](https://docs.uavmatrix.com/nl/troubleshooting/collect-logs/) met **All Logs** geselecteerd, voeg de uitvoer van `rpicam-hello --list-cameras` of `v4l2-ctl --list-devices` toe, en stuur alles naar **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Gerelateerd: [Camera-instellingen](https://docs.uavmatrix.com/nl/uavcast-pro/camera/) · [Ondersteunde hardware](https://docs.uavmatrix.com/nl/reference/supported-hardware/)

Source: https://docs.uavmatrix.com/nl/troubleshooting/camera-not-detected/
