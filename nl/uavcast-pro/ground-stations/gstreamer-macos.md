# GStreamer op macOS

> Installeer GStreamer op een Mac met Homebrew of het officiële pakket en speel de H.264-dronevideo en Opus-audio van UAVcast-Pro af met gst-launch-1.0, plus de firewallmelding van macOS.

GStreamer speelt de UAVcast-Pro-videostream af in een venster vanuit de Terminal. Gebruik het om het videopad te testen, een tweede camera naast QGroundControl te bekijken of het geluid te horen. Werkt op Apple silicon- en Intel-Macs.

## Voordat u begint

Voeg op de drone een bestemming toe bij [Grondcontrolestations](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/) met het IP-adres van deze Mac (**Systeeminstellingen → Netwerk**; gebruik via 4G het VPN-adres) en zet **Video Inschakelen** aan.

## GStreamer installeren

**Homebrew**

```bash
brew install gstreamer
```

De Homebrew-formule bevat de plugin-sets base, good, bad, ugly en libav, dus `avdec_h264` is aanwezig.

**Officieel pakket**

1. Download het macOS-**runtime**-pakket via [gstreamer.freedesktop.org/download](https://gstreamer.freedesktop.org/download/) en installeer het.

2. Voeg het toe aan uw PATH in Terminal:

   ```bash
   echo 'export PATH="/Library/Frameworks/GStreamer.framework/Versions/1.0/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

Controleer de installatie met `gst-launch-1.0 --version` en controleer de H.264-decoder met `gst-inspect-1.0 avdec_h264` (het toont de details van het element; *No such element or plugin* betekent dat het ontbreekt).

## De video afspelen

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

De eerste keer vraagt macOS of `gst-launch-1.0` inkomende netwerkverbindingen mag accepteren. Selecteer **Sta toe**. Er opent een venster zodra het eerste keyframe binnenkomt; druk in Terminal op **Ctrl+C** om te stoppen.

> **Wat u ziet**
>
> 1. De terminal toont `Setting pipeline to PLAYING ...` en wacht op video.
> 2. Zodra de eerste pakketten binnenkomen, toont `-v` regels met `caps = application/x-rtp`.
> 3. Er opent een videovenster met het camerabeeld.
>
> Stopt het na stap 1, dan bereikt geen video deze computer: zie de tabel met probleemoplossing hieronder.

- **Camera 2** bij [dubbele stream](https://docs.uavmatrix.com/nl/uavcast-pro/camera/multi-camera/): voer het opnieuw uit met `port=5601`.
- **Lagere latentie** bij een goede verbinding: vervang `rtpjitterbuffer` door `rtpjitterbuffer latency=0`.
- Verschijnt er geen venster terwijl pakketten binnenkomen, vervang dan `autovideosink` door `osxvideosink`.

## Het geluid horen

```bash
gst-launch-1.0 udpsrc port=5602 caps="application/x-rtp, media=(string)audio, clock-rate=(int)48000, encoding-name=(string)OPUS, payload=(int)97" ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

Audio vereist dat **Audio** en **Audio naar grondstations sturen** aan staan op de pagina **Camera** van de drone.

## Probleemoplossing

| Melding of symptoom | Oplossing |
| --- | --- |
| *command not found: gst-launch-1.0* | Homebrew: voer `brew doctor` uit. Officieel pakket: voeg de `bin`-map van het framework toe aan PATH zoals hierboven getoond. |
| *no element "avdec_h264"* | De libav-plugin ontbreekt. Installeer opnieuw met Homebrew, of installeer het volledige officiële runtimepakket. |
| Het draait, maar er verschijnt geen venster | Er komt niets binnen. Controleer het bestemmings-IP, **Video Inschakelen**, en of u inkomende verbindingen hebt toegestaan (**Systeeminstellingen → Netwerk → Firewall → Opties**). |
| Bind-fout bij het starten | QGroundControl of een andere GStreamer gebruikt de poort al. Sluit deze af. |

Source: https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/gstreamer-macos/
