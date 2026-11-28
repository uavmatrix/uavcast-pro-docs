# GStreamer op Windows

> Installeer GStreamer op Windows (MSVC 64-bit, Complete), voeg het toe aan PATH en speel UAVcast-Pro H.264-video en Opus-audio af met gst-launch-1.0 in PowerShell of cmd. Firewall en oplossingen.

GStreamer speelt de UAVcast-Pro-videostream af in een eigen venster, zonder grondstationprogramma. Gebruik het om te testen of video de pc bereikt, om een tweede camera naast Mission Planner of QGroundControl te bekijken, of om het audiospoor te horen. Het instellen duurt ongeveer vijf minuten.

## Voordat u begint

Voeg op de drone een bestemming toe bij [Grondcontrolestations](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/) met het IP-adres van deze pc (`ipconfig` toont het; gebruik via 4G het VPN-adres) en zet **Video Inschakelen** aan.

## Stap 1: GStreamer installeren

1. Ga naar [gstreamer.freedesktop.org/download](https://gstreamer.freedesktop.org/download/) en download het Windows-**runtime**-installatiebestand voor **MSVC 64-bit** (niet het ontwikkelaarsinstallatiebestand, en niet MinGW).
2. Start het en kies **Complete** wanneer naar het installatietype wordt gevraagd.
3. Noteer de installatiemap. Nieuwere installatieprogramma's gebruiken `C:\Program Files\gstreamer\1.0\msvc_x86_64`, oudere `C:\gstreamer\1.0\msvc_x86_64`.

> **Kies Complete, niet Typical**
>
> De installatie **Typical** laat de H.264-decoder (`avdec_h264`) weg. Het onderstaande commando faalt dan met *no element "avdec_h264"*. Voer het installatieprogramma opnieuw uit en kies **Complete**.

## Stap 2: GStreamer aan PATH toevoegen

Zo kunt u `gst-launch-1.0` vanuit elke map uitvoeren; voeg de `bin`-map toe aan uw gebruikers-PATH. Gebruik in PowerShell (geen beheerdersrechten nodig) uw installatiemap:

```powershell
$bin = "C:\Program Files\gstreamer\1.0\msvc_x86_64\bin"
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
[Environment]::SetEnvironmentVariable("Path", "$userPath;$bin", "User")
```

Sluit de terminal en open deze opnieuw, en controleer daarna:

```powershell
gst-launch-1.0 --version
```

Of gebruik de Windows-instellingen: zoek naar **Omgevingsvariabelen voor uw account bewerken**, selecteer **Path** → **Bewerken** → **Nieuw** en plak de `bin`-map.

## Stap 3: De video afspelen

**PowerShell**

```powershell
gst-launch-1.0 -v udpsrc port=5600 'caps=application/x-rtp,media=video,clock-rate=90000,encoding-name=H264,payload=96' ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Houd de enkele aanhalingstekens rond `caps=…` aan: zonder die splitst PowerShell de waarde bij de komma's.

**Opdrachtprompt (cmd)**

```bat
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Er opent een venster zodra het eerste keyframe binnenkomt. Sluit het, of druk in de terminal op **Ctrl+C**, om te stoppen.

> **Wat u ziet**
>
> 1. De terminal toont `Setting pipeline to PLAYING ...` en wacht op video.
> 2. Zodra de eerste pakketten binnenkomen, toont `-v` regels met `caps = application/x-rtp`.
> 3. Er opent een videovenster met het camerabeeld.
>
> Stopt het na stap 1, dan bereikt geen video deze computer: zie de tabel met probleemoplossing hieronder.

Voor camera 2 bij [dubbele stream](https://docs.uavmatrix.com/nl/uavcast-pro/camera/multi-camera/) voert u hetzelfde commando uit in een tweede terminal met `port=5601`.

### Variant met lagere latentie

Bij een goede verbinding verlaagt u de vertraging van de jitterbuffer:

```powershell
gst-launch-1.0 udpsrc port=5600 'caps=application/x-rtp,media=video,clock-rate=90000,encoding-name=H264,payload=96' ! rtpjitterbuffer latency=0 ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Houd via 4G de standaard jitterbuffer aan (het eerste commando); deze verbergt late pakketten.

### Snelkoppeling met dubbelklik

Sla dit op als `uavcast-video.cmd` op het bureaublad en dubbelklik erop:

```bat
@echo off
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
pause
```

Staat GStreamer niet in PATH, voeg dan `cd /d "C:\Program Files\gstreamer\1.0\msvc_x86_64\bin"` toe als tweede regel.

## Het geluid horen

Zet **Audio** en **Audio naar grondstations sturen** aan op de pagina **Camera** van de drone. Audio komt binnen op Videopoort + 2:

```powershell
gst-launch-1.0 udpsrc port=5602 'caps=application/x-rtp,media=audio,encoding-name=OPUS,clock-rate=48000,payload=97' ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

## Toestaan via de firewall

De eerste keer dat `gst-launch-1.0` luistert, vraagt Windows of het mag worden toegestaan. Vink **Privé** en **Openbaar** aan (VPN-adapters zijn vaak Openbaar). Om de poorten voor elk programma te openen, in een PowerShell als beheerder:

```powershell
New-NetFirewallRule -DisplayName "UAVcast-Pro video and audio" -Direction Inbound -Protocol UDP -LocalPort 5600-5602 -Action Allow
```

## Probleemoplossing

| Melding of symptoom | Oplossing |
| --- | --- |
| *'gst-launch-1.0' is not recognized…* | GStreamer staat niet in PATH. Voer stap 2 uit en open een nieuwe terminal, of voer het uit vanuit de `bin`-map. |
| *WARNING: erroneous pipeline: no element "avdec_h264"* | Installatie met Typical. Installeer opnieuw met **Complete**. |
| *no element "rtph264depay"* of *"udpsrc"* | Zelfde oorzaak: de plugin-sets zijn niet geïnstalleerd. Installeer opnieuw met **Complete**. |
| Het draait, maar er opent geen venster | Er komt niets binnen. Controleer het bestemmings-IP op de drone (VPN-IP via 4G), **Video Inschakelen**, de camera en de firewall. Met `-v` verschijnt een regel met `caps = application/x-rtp` zodra pakketten binnenkomen. |
| *Could not get/set settings from/on resource* of een bind-fout | Een ander programma (Mission Planner, QGroundControl, een tweede GStreamer) luistert al op die poort. Sluit het af. |
| Beeld wordt grijs uitgesmeerd of bevriest | Pakketverlies. Verlaag de bitsnelheid op de drone en stel **Stream Herstelsnelheid** in op 15–30 frames. |
| *erroneous pipeline: could not parse caps* in PowerShell | De aanhalingstekens rond `caps=…` ontbreken, of het zijn dubbele aanhalingstekens met spaties. Gebruik het PowerShell-commando precies zoals getoond. |

Linux of Mac? Zie [GStreamer op Linux](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/gstreamer-linux/) of [GStreamer op macOS](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/gstreamer-macos/).

Source: https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/gstreamer-windows/
