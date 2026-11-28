# GStreamer na macOS

> Zainstaluj GStreamer na Macu przez Homebrew lub oficjalny pakiet i odtwarzaj wideo H.264 z drona UAVcast-Pro oraz dźwięk Opus za pomocą gst-launch-1.0, a także obsłuż monit zapory macOS.

GStreamer odtwarza strumień wideo UAVcast-Pro w oknie z poziomu Terminala. Użyj go, aby przetestować ścieżkę wideo, obejrzeć drugą kamerę obok QGroundControl lub usłyszeć dźwięk. Działa na Macach z procesorami Apple silicon i Intel.

## Zanim zaczniesz

Na dronie dodaj miejsce docelowe w [Stacjach Naziemnych](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/) z adresem IP tego Maca (**Ustawienia systemowe → Sieć**; przy 4G użyj adresu VPN) i włącz **Włącz Wideo**.

## Instalacja GStreamer

**Homebrew**

```bash
brew install gstreamer
```

Formuła Homebrew zawiera zestawy wtyczek base, good, bad, ugly i libav, więc `avdec_h264` jest dostępny.

**Oficjalny pakiet**

1. Pobierz pakiet **runtime** dla macOS ze [strony gstreamer.freedesktop.org/download](https://gstreamer.freedesktop.org/download/) i zainstaluj go.

2. Dodaj go do PATH w Terminalu:

   ```bash
   echo 'export PATH="/Library/Frameworks/GStreamer.framework/Versions/1.0/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

Sprawdź instalację poleceniem `gst-launch-1.0 --version`, a dekoder H.264 poleceniem `gst-inspect-1.0 avdec_h264` (wypisuje szczegóły elementu; *No such element or plugin* oznacza, że go brakuje).

## Odtwarzanie wideo

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Za pierwszym razem macOS zapyta, czy `gst-launch-1.0` może przyjmować połączenia sieciowe. Wybierz **Zezwól**. Okno otworzy się, gdy dotrze pierwsza klatka kluczowa; naciśnij **Ctrl+C** w Terminalu, aby zatrzymać.

> **Czego się spodziewać**
>
> 1. Terminal wypisuje `Setting pipeline to PLAYING ...` i czeka na wideo.
> 2. Gdy dotrą pierwsze pakiety, `-v` wypisuje linie zawierające `caps = application/x-rtp`.
> 3. Otworzy się okno wideo z obrazem z kamery.
>
> Jeśli zatrzyma się po kroku 1, wideo nie dociera do tego komputera: zobacz tabelę rozwiązywania problemów poniżej.

- **Kamera 2** w [podwójnym strumieniu](https://docs.uavmatrix.com/pl/uavcast-pro/camera/multi-camera/): uruchom ponownie z `port=5601`.
- **Niższe opóźnienie** przy dobrym łączu: zamień `rtpjitterbuffer` na `rtpjitterbuffer latency=0`.
- Jeśli okno nie pojawia się, mimo że pakiety docierają, zamień `autovideosink` na `osxvideosink`.

## Odsłuchiwanie dźwięku

```bash
gst-launch-1.0 udpsrc port=5602 caps="application/x-rtp, media=(string)audio, clock-rate=(int)48000, encoding-name=(string)OPUS, payload=(int)97" ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

Dźwięk wymaga włączenia opcji **Audio** i **Send audio to ground stations** na stronie **Kamera** drona.

## Rozwiązywanie problemów

| Komunikat lub objaw | Rozwiązanie |
| --- | --- |
| *command not found: gst-launch-1.0* | Homebrew: uruchom `brew doctor`. Oficjalny pakiet: dodaj folder `bin` frameworka do PATH, jak pokazano powyżej. |
| *no element "avdec_h264"* | Brakuje wtyczki libav. Zainstaluj ponownie przez Homebrew lub zainstaluj pełny oficjalny pakiet runtime. |
| Działa, ale nie otwiera się okno | Nic nie dociera. Sprawdź adres IP docelowy, **Włącz Wideo** oraz to, czy zezwoliłeś na połączenia przychodzące (**Ustawienia systemowe → Sieć → Zapora → Opcje**). |
| Błąd bind przy starcie | QGroundControl lub inny GStreamer już używa portu. Zamknij go. |

Source: https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-macos/
