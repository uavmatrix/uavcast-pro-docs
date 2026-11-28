# GStreamer na Windows

> Zainstaluj GStreamer na Windows (MSVC 64-bit, Complete), dodaj go do PATH i odtwarzaj wideo H.264 oraz dźwięk Opus UAVcast-Pro za pomocą gst-launch-1.0 w PowerShell lub cmd. Zapora i poprawki.

GStreamer odtwarza strumień wideo UAVcast-Pro we własnym oknie, bez programu stacji naziemnej. Użyj go, aby sprawdzić, czy wideo dociera do komputera, obejrzeć drugą kamerę obok Mission Planner lub QGroundControl albo usłyszeć ścieżkę dźwiękową. Konfiguracja zajmuje około pięciu minut.

## Zanim zaczniesz

Na dronie dodaj miejsce docelowe w [Stacjach Naziemnych](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/) z adresem IP tego komputera (`ipconfig` go pokazuje; przy 4G użyj adresu VPN) i włącz **Włącz Wideo**.

## Krok 1: Instalacja GStreamer

1. Wejdź na [stronę gstreamer.freedesktop.org/download](https://gstreamer.freedesktop.org/download/) i pobierz instalator **runtime** dla Windows w wersji **MSVC 64-bit** (nie instalator deweloperski ani MinGW).
2. Uruchom go i przy pytaniu o typ instalacji wybierz **Complete**.
3. Zapamiętaj folder instalacji. Nowsze instalatory używają `C:\Program Files\gstreamer\1.0\msvc_x86_64`, starsze `C:\gstreamer\1.0\msvc_x86_64`.

> **Wybierz Complete, nie Typical**
>
> Instalacja **Typical** pomija dekoder H.264 (`avdec_h264`). Poniższe polecenie wtedy zakończy się błędem *no element "avdec_h264"*. Uruchom instalator ponownie i wybierz **Complete**.

## Krok 2: Dodanie GStreamer do PATH

Aby uruchamiać `gst-launch-1.0` z dowolnego folderu, dodaj jego folder `bin` do swojej ścieżki PATH użytkownika. W PowerShell (nie potrzebujesz uprawnień administratora), podając swój folder instalacji:

```powershell
$bin = "C:\Program Files\gstreamer\1.0\msvc_x86_64\bin"
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
[Environment]::SetEnvironmentVariable("Path", "$userPath;$bin", "User")
```

Zamknij i ponownie otwórz terminal, a następnie sprawdź:

```powershell
gst-launch-1.0 --version
```

Możesz też użyć ustawień Windows: wyszukaj **Edit environment variables for your account**, wybierz **Path** → **Edit** → **New** i wklej folder `bin`.

## Krok 3: Odtwarzanie wideo

**PowerShell**

```powershell
gst-launch-1.0 -v udpsrc port=5600 'caps=application/x-rtp,media=video,clock-rate=90000,encoding-name=H264,payload=96' ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Zachowaj pojedyncze cudzysłowy wokół `caps=…`: bez nich PowerShell rozdzieli wartość po przecinkach.

**Wiersz poleceń (cmd)**

```bat
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Okno otworzy się, gdy tylko dotrze pierwsza klatka kluczowa. Zamknij je lub naciśnij **Ctrl+C** w terminalu, aby zatrzymać.

> **Czego się spodziewać**
>
> 1. Terminal wypisuje `Setting pipeline to PLAYING ...` i czeka na wideo.
> 2. Gdy dotrą pierwsze pakiety, `-v` wypisuje linie zawierające `caps = application/x-rtp`.
> 3. Otworzy się okno wideo z obrazem z kamery.
>
> Jeśli zatrzyma się po kroku 1, wideo nie dociera do tego komputera: zobacz tabelę rozwiązywania problemów poniżej.

Dla kamery 2 w [podwójnym strumieniu](https://docs.uavmatrix.com/pl/uavcast-pro/camera/multi-camera/) uruchom to samo polecenie w drugim terminalu z `port=5601`.

### Wariant o niższym opóźnieniu

Przy dobrym łączu zmniejsz opóźnienie bufora jitter:

```powershell
gst-launch-1.0 udpsrc port=5600 'caps=application/x-rtp,media=video,clock-rate=90000,encoding-name=H264,payload=96' ! rtpjitterbuffer latency=0 ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Przy 4G zostaw domyślny bufor jitter (pierwsze polecenie); ukrywa on spóźnione pakiety.

### Skrót do uruchamiania dwuklikiem

Zapisz to jako `uavcast-video.cmd` na pulpicie i uruchom dwuklikiem:

```bat
@echo off
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
pause
```

Jeśli GStreamer nie jest w PATH, dodaj `cd /d "C:\Program Files\gstreamer\1.0\msvc_x86_64\bin"` jako drugą linię.

## Odsłuchiwanie dźwięku

Włącz **Audio** i **Send audio to ground stations** na stronie **Kamera** drona. Dźwięk trafia na **Port Wideo** + 2:

```powershell
gst-launch-1.0 udpsrc port=5602 'caps=application/x-rtp,media=audio,encoding-name=OPUS,clock-rate=48000,payload=97' ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

## Zezwolenie w zaporze sieciowej

Za pierwszym razem, gdy `gst-launch-1.0` zacznie nasłuchiwać, Windows zapyta, czy na to zezwolić. Zaznacz **Private** i **Public** (karty VPN są często ustawione jako Public). Aby zamiast tego otworzyć porty dla dowolnego programu, uruchom w PowerShell jako administrator:

```powershell
New-NetFirewallRule -DisplayName "UAVcast-Pro video and audio" -Direction Inbound -Protocol UDP -LocalPort 5600-5602 -Action Allow
```

## Rozwiązywanie problemów

| Komunikat lub objaw | Rozwiązanie |
| --- | --- |
| *'gst-launch-1.0' is not recognized…* | GStreamer nie jest w PATH. Wykonaj krok 2 i otwórz nowy terminal albo uruchom polecenie z folderu `bin`. |
| *WARNING: erroneous pipeline: no element "avdec_h264"* | Instalacja Typical. Zainstaluj ponownie z opcją **Complete**. |
| *no element "rtph264depay"* lub *"udpsrc"* | Ta sama przyczyna: nie zainstalowano zestawów wtyczek. Zainstaluj ponownie z **Complete**. |
| Działa, ale nie otwiera się okno | Nic nie dociera. Sprawdź adres IP docelowy na dronie (adres VPN przy 4G), **Włącz Wideo**, kamerę i zaporę. Z `-v` linia z `caps = application/x-rtp` pojawia się, gdy dotrą pakiety. |
| *Could not get/set settings from/on resource* lub błąd bind | Inny program (Mission Planner, QGroundControl, drugi GStreamer) już nasłuchuje na tym porcie. Zamknij go. |
| Obraz rozmazuje się na szaro lub zamarza | Utrata pakietów. Obniż bitrate na dronie i ustaw **Szybkość Odzyskiwania Strumienia** na 15–30 klatek. |
| *erroneous pipeline: could not parse caps* w PowerShell | Brakuje cudzysłowów wokół `caps=…` albo są to podwójne cudzysłowy ze spacjami. Użyj polecenia PowerShell dokładnie tak, jak pokazano. |

Linux czy Mac? Zobacz [GStreamer na Linuksie](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-linux/) lub [GStreamer na macOS](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-macos/).

Source: https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-windows/
