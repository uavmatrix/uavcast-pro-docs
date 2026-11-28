# GStreamer op Linux

> Installeer GStreamer op Ubuntu, Debian of Fedora en speel de H.264-dronevideo en Opus-audio van UAVcast-Pro af met gst-launch-1.0, inclusief een tweede camera, lage latentie en ufw.

Met GStreamer speelt u de UAVcast-Pro-videostream met één commando af in een venster. Gebruik het om het videopad te testen, een tweede camera te bekijken of het geluid te horen. Werkt op elke Linux-desktop, ook op een Raspberry Pi die als grondstation wordt gebruikt.

## Voordat u begint

Voeg op de drone een bestemming toe bij [Grondcontrolestations](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/) met het IP-adres van deze computer (`ip -4 addr`; gebruik via 4G het VPN-adres) en zet **Video Inschakelen** aan.

## GStreamer installeren

**Ubuntu / Debian / Raspberry Pi OS**

```bash
sudo apt update
sudo apt install gstreamer1.0-tools gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-libav
```

`gstreamer1.0-libav` levert de H.264-decoder (`avdec_h264`). Zonder deze faalt het onderstaande commando.

**Fedora**

```bash
sudo dnf install gstreamer1 gstreamer1-plugins-good gstreamer1-plugins-bad-free gstreamer1-plugin-libav
```

De eigen repositories van Fedora laten om octrooiredenen het meeste H.264-ondersteuning weg, dus `avdec_h264` kan daarna nog ontbreken. Als de onderstaande controle mislukt, schakel dan [RPM Fusion](https://rpmfusion.org/) in en volg de multimediagids om de volledige codecbibliotheken te krijgen.

Controleer of de H.264-decoder aanwezig is:

```bash
gst-inspect-1.0 avdec_h264
```

Het toont de details van het element. *No such element or plugin* betekent dat de decoder ontbreekt.

## De video afspelen

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Er opent een venster zodra het eerste keyframe binnenkomt. Druk op **Ctrl+C** om te stoppen.

> **Wat u ziet**
>
> 1. De terminal toont `Setting pipeline to PLAYING ...` en wacht op video.
> 2. Zodra de eerste pakketten binnenkomen, toont `-v` regels met `caps = application/x-rtp`.
> 3. Er opent een videovenster met het camerabeeld.
>
> Stopt het na stap 1, dan bereikt geen video deze computer: zie de tabel met probleemoplossing hieronder.

- **Camera 2** bij [dubbele stream](https://docs.uavmatrix.com/nl/uavcast-pro/camera/multi-camera/): voer het opnieuw uit met `port=5601`.
- **Lagere latentie** bij een goede verbinding: vervang `rtpjitterbuffer` door `rtpjitterbuffer latency=0`. Houd de standaard aan via 4G.

## Het geluid horen

Met **Audio naar grondstations sturen** aan, komt audio binnen op Videopoort + 2:

```bash
gst-launch-1.0 udpsrc port=5602 caps="application/x-rtp, media=(string)audio, clock-rate=(int)48000, encoding-name=(string)OPUS, payload=(int)97" ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

## Firewall

De meeste desktopdistributies blokkeren geen inkomend UDP. Als `ufw` actief is:

```bash
sudo ufw allow 5600:5602/udp
sudo ufw allow 14550/udp
```

## Probleemoplossing

| Melding of symptoom | Oplossing |
| --- | --- |
| *no element "avdec_h264"* | Installeer `gstreamer1.0-libav`. |
| *no element "rtph264depay"* | Installeer `gstreamer1.0-plugins-good`. |
| Het draait, maar er verschijnt geen venster | Er komt niets binnen. Controleer het bestemmings-IP op de drone, **Video Inschakelen** en de firewall. `sudo tcpdump -ni any udp port 5600` laat zien of pakketten de computer bereiken. |
| Bind-fout bij het starten | Een ander programma (QGroundControl, een andere GStreamer) luistert op de poort. Sluit het af. |
| Venster opent, beeld wordt grijs uitgesmeerd | Pakketverlies. Verlaag de bitsnelheid op de drone en stel **Stream Herstelsnelheid** in op 15–30 frames. |

Source: https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/gstreamer-linux/
