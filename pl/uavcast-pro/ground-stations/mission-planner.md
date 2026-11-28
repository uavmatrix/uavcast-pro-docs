# Mission Planner

> Połącz Mission Planner z dronem UAVcast-Pro: MAVLink przez UDP 14550, wideo H.264 na żywo w HUD z dokładnym źródłem GStreamer, zapora Windows, druga kamera i typowe błędy.

Mission Planner odbiera telemetrię UAVcast-Pro przez UDP na porcie 14550 i pokazuje wideo na żywo w swoim HUD przez źródło GStreamer na porcie 5600. Telemetria wymaga jednego kliknięcia; wideo wymaga wklejenia pipeline'u raz, który Mission Planner zapamiętuje.

## Zanim zaczniesz

- Na dronie miejsce docelowe w [Stacjach Naziemnych](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/) z adresem IP tego komputera (adres VPN przy 4G), z włączoną opcją **Włącz Telemetrię** oraz **Włącz Wideo** dla wideo.
- Kamera strumieniuje w **Kamera → Ustawienia kamery**.
- Aktualna wersja Mission Planner na Windows. Adres IP tego komputera znajdziesz poleceniem `ipconfig` w wierszu poleceń.

## Połącz telemetrię

1. W prawym górnym rogu Mission Planner wybierz **UDP** z listy połączeń. Prędkość bodów jest ignorowana.
2. Wybierz **Połącz**.
3. Gdy zostaniesz zapytany o port nasłuchu, zostaw `14550` (lub **Port Telemetrii**, który ustawiłeś na dronie) i wybierz **OK**.
4. Mission Planner pobiera parametry, a dron pojawia się na mapie.

![Widok Flight Data w Mission Planner połączony przez UDP: w prawym górnym polu połączenia widać UDP, łącze UDP14550-1-QUADRO i przycisk DISCONNECT; HUD pokazuje DISARMED, Unhealthy AHRS i GPS: No Fix](https://docs.uavmatrix.com/pl/img/screenshots/gcs/mission-planner--connected.webp)

*Połączono. Pole w prawym górnym rogu pokazuje UDP i łącze UDP14550-1-QUADRO, a przycisk ma teraz napis DISCONNECT. To konfiguracja testowa bez GPS, więc HUD pokazuje DISARMED, Unhealthy AHRS i GPS: No Fix.*

## Pokaż wideo w HUD

1. Kliknij prawym przyciskiem HUD (sztuczny horyzont) i wybierz **Video → Set GStreamer Source**.

2. Wklej ten pipeline i wybierz **OK**:

   ```text
   udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
   ```

3. Wideo zastępuje tło HUD w ciągu kilku sekund. Dane lotu pozostają nad nim.

*Ilustracja Mission Planner: menu kontekstowe na HUD z wyróżnioną pozycją Video i elementem podmenu Set GStreamer Source.*

*Ilustracja Mission Planner, uproszczone. (1) Kliknij prawym przyciskiem HUD, (2) Video, (3) Set GStreamer Source, a następnie wklej pipeline.*

Mission Planner używa własnej kopii GStreamer dla HUD, więc nie potrzebujesz osobnej instalacji z [GStreamer na Windows](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-windows/). Jeśli Mission Planner zaproponuje pobranie GStreamer, zgódź się.

Zachowaj końcówkę pipeline'u dokładnie tak, jak pokazano: Mission Planner potrzebuje `video/x-raw,format=BGRA ! appsink name=outsink`, aby narysować obraz. Zmieniaj tylko port.

### Niższe opóźnienie

`rtpjitterbuffer` wygładza pakiety, które przychodzą spóźnione, kosztem około 200 ms opóźnienia. Przy dobrym łączu możesz je zmniejszyć:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer latency=0 ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink sync=false
```

Przy słabym łączu 4G zostaw domyślny bufor jitter; obraz rozpada się rzadziej.

## Zezwól Mission Planner w zaporze Windows

Windows zapyta za pierwszym razem, gdy Mission Planner zacznie nasłuchiwać w sieci. Zezwól na **Private** i **Public**. Karta ZeroTier lub Tailscale jest często klasyfikowana jako **Public**, więc zaznaczenie tylko Private blokuje VPN.

Jeśli odrzuciłeś to pytanie, otwórz porty w PowerShell jako administrator:

```powershell
New-NetFirewallRule -DisplayName "UAVcast-Pro telemetry" -Direction Inbound -Protocol UDP -LocalPort 14550 -Action Allow
New-NetFirewallRule -DisplayName "UAVcast-Pro video" -Direction Inbound -Protocol UDP -LocalPort 5600-5602 -Action Allow
```

## Druga kamera (podwójny strumień)

Przy włączonym [podwójnym strumieniu](https://docs.uavmatrix.com/pl/uavcast-pro/camera/multi-camera/) kamera 2 trafia na **Port Wideo (Kamera 2)**, domyślnie `5601`. HUD w Mission Planner pokazuje jedno źródło. Przełącz źródło HUD na port 5601, gdy potrzebujesz kamery 2, albo obserwuj kamerę 2 w osobnym oknie GStreamer: zobacz [GStreamer na Windows](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-windows/).

Audio (Port Wideo + 2) jest ignorowane przez Mission Planner. Odtwórz je przez GStreamer.

## Typowe problemy

| Objaw | Przyczyna i rozwiązanie |
| --- | --- |
| Łączy się przez Wi-Fi, nic przez 4G | Miejsce docelowe używa adresu LAN. Użyj adresu VPN tego komputera. |
| *No heartbeat packets received* | Dron nie wysyła do tego komputera: zły adres IP, **Włącz Telemetrię** wyłączone lub zapora blokuje UDP 14550. |
| Telemetria działa, HUD pozostaje czarny | **Włącz Wideo** jest wyłączone dla tego miejsca docelowego, kamera nie działa albo UDP 5600 jest zablokowany. Przetestuj z [GStreamer na Windows](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-windows/). |
| Wideo zamarza lub rozmazuje się na szaro | Utrata pakietów. Obniż bitrate na dronie i ustaw **Szybkość Odzyskiwania Strumienia** na 15–30 klatek. |
| Wideo zatrzymuje się, gdy otwiera się inny program | Tylko jeden program może nasłuchiwać na porcie UDP. Zamknij okno GStreamer lub QGroundControl, które też używa portu 5600. |

Więcej sprawdzeń: [Brak wideo w QGroundControl lub Mission Planner](https://docs.uavmatrix.com/pl/troubleshooting/no-video-in-gcs/) oraz [Brak telemetrii w stacji naziemnej](https://docs.uavmatrix.com/pl/troubleshooting/no-telemetry-in-gcs/).

Source: https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/mission-planner/
