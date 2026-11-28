# QGroundControl

> Odbieraj telemetrię UAVcast-Pro i wideo H.264 na żywo w QGroundControl w systemach Windows, macOS lub Linux: automatyczne połączenie UDP 14550, źródło wideo UDP h.264 na porcie 5600, tryb niskiego opóźnienia i rozwiązania problemów.

Domyślnie QGroundControl nasłuchuje MAVLink na porcie UDP 14550, więc dron UAVcast-Pro pojawia się, gdy tylko dotrze jego telemetria. W przypadku wideo ustaw źródło wideo na **UDP h.264 Video Stream** na porcie 5600 — wystarczy raz. QGroundControl ma wbudowany GStreamer, więc nie trzeba niczego instalować dodatkowo. Działa to tak samo w systemach Windows, macOS i Linux; informacje o tabletach znajdziesz w [Android](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/android/).

## Przed rozpoczęciem

- Na dronie: miejsce docelowe w sekcji [Stacje Naziemne](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/) z adresem IP tego komputera (adres VPN przez 4G), włączona opcja **Włącz Telemetrię** oraz, w przypadku wideo, włączona opcja **Włącz Wideo**.
- Kamera wysyła strumień, ustawiony w **Kamera → Ustawienia kamery**.
- QGroundControl ze strony [qgroundcontrol.com](https://qgroundcontrol.com/).

## Telemetria

Uruchom QGroundControl. Kilka sekund po odebraniu pierwszego pakietu pojazd pojawia się, a pasek narzędzi pokazuje jego tryb lotu i stan baterii.

![Widok Fly w QGroundControl połączony z pojazdem ArduPilot: pasek narzędzi z Not Ready i Stabilize, pięciopunktowa misja na mapie z No GPS Lock for Vehicle oraz okno wideo w lewym dolnym rogu z napisem WAITING FOR VIDEO](https://docs.uavmatrix.com/pl/img/screenshots/gcs/qgroundcontrol--fly-view.webp)

*Telemetria działa: pasek narzędzi pokazuje stan pojazdu i tryb lotu (Not Ready, Stabilize). To stanowisko testowe bez GPS, stąd komunikat No GPS Lock for Vehicle. Okno wideo (lewy dolny róg) pokazuje WAITING FOR VIDEO, dopóki wideo nie zostanie skonfigurowane poniżej.*

Nic się nie pojawia? Sprawdź, czy automatyczne połączenie UDP jest włączone: ikona **Q** → **Application Settings**, następnie **AutoConnect to the following devices** → zaznaczone **UDP** (domyślnie). W zależności od wersji QGroundControl lista AutoConnect znajduje się na stronie **Comm Links** lub **General**. Jeśli na dronie ustawiono **Port Telemetrii** inny niż 14550, dodaj połączenie zamiast tego: **Application Settings** → **Comm Links** → **Add**, wybierz **UDP**, wpisz wybrany port, a następnie kliknij **Connect**.

## Wideo

1. Kliknij ikonę **Q** (lewy górny róg) → **Application Settings**.
2. Otwórz stronę **Video**. W starszych wersjach wideo to sekcja **Video** na stronie **General**.
3. Ustaw **Source** na **UDP h.264 Video Stream**.
4. Sprawdź adres UDP. Domyślna wartość `0.0.0.0:5600` nasłuchuje na porcie 5600, co odpowiada domyślnemu **Port Wideo** na dronie. Jeśli na dronie zmieniono **Port Wideo**, wpisz tutaj ten port. Nowsze wersje nazywają pole **UDP URL**, a starsze pokazują numer **UDP Port**.
5. Wróć do widoku **Fly**. Wideo pojawi się w małym oknie w rogu. Kliknij je, aby zamienić wideo i mapę miejscami.

*Ilustracja ustawień aplikacji QGroundControl: strona Video z polem Source ustawionym na UDP h.264 Video Stream, adresem UDP 0.0.0.0:5600 i włączonym Low Latency Mode.*

*Ilustracja QGroundControl, uproszczony widok. (1) Ikona Q → Application Settings, (2) Video, (3) Source UDP h.264 Video Stream, (4) UDP URL z portem 5600.*

### Tryb niskiego opóźnienia

W tych samych ustawieniach wideo włącz **Low Latency Mode**. QGroundControl odrzuca wtedy spóźnione klatki zamiast je buforować, co wyraźnie zmniejsza opóźnienie przy dobrym łączu. Na słabym łączu 4G obraz może się zacinać; w takim przypadku wyłącz tę opcję.

## Zapora sieciowa

- **Windows**: gdy system Windows o to zapyta, zezwól QGroundControl w sieciach **Private** i **Public**. Karty VPN (ZeroTier, Tailscale) są często klasyfikowane jako **Public**. Aby ręcznie otworzyć porty, zobacz [Mission Planner: zapora systemu Windows](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/mission-planner/#allow-mission-planner-through-the-windows-firewall); obowiązują te same reguły.
- **macOS**: gdy system macOS o to zapyta, zezwól QGroundControl na połączenia przychodzące.
- **Linux**: jeśli `ufw` jest aktywne, uruchom `sudo ufw allow 14550/udp` oraz `sudo ufw allow 5600:5602/udp`.

## Druga kamera i dźwięk

QGroundControl odtwarza jeden strumień wideo. Przy włączonym [podwójnym strumieniu](https://docs.uavmatrix.com/pl/uavcast-pro/camera/multi-camera/) kamera 2 wysyła na port 5601: zmień port UDP na `5601`, aby ją oglądać, lub otwórz kamerę 2 w oknie GStreamer ([Windows](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-linux/), [macOS](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-macos/)) obok QGroundControl.

QGroundControl ignoruje dźwięk. Odtwórz go za pomocą GStreamer na porcie Port Wideo + 2 (`5602`).

## Typowe problemy

| Objaw | Przyczyna i rozwiązanie |
| --- | --- |
| *Waiting For Vehicle Connection* | Telemetria nie dociera do tego komputera. Sprawdź adres IP miejsca docelowego (adres IP VPN przez 4G), opcję **Włącz Telemetrię** oraz zaporę sieciową. |
| Telemetria działa, a w oknie wideo brak obrazu | Opcja **Włącz Wideo** jest wyłączona, kamera nie działa, źródło nie jest ustawione na **UDP h.264 Video Stream** albo port UDP 5600 jest zablokowany. |
| Wideo pojawia się, a potem zamiera przez 4G | Utrata pakietów. Obniż bitrate na dronie, ustaw **Szybkość Odzyskiwania Strumienia** na 15–30 klatek i wyłącz **Low Latency Mode**. |
| Pojazd pojawia się dwukrotnie | Dwa miejsca docelowe wskazują na ten komputer albo drugie połączenie duplikuje automatyczne łączenie. Usuń jedno z nich. |
| Wideo zatrzymuje się po uruchomieniu testu GStreamer | Na jednym porcie UDP może nasłuchiwać tylko jeden program. Zamknij jeden z nich. |

Więcej sprawdzeń: [Brak wideo w QGroundControl lub Mission Planner](https://docs.uavmatrix.com/pl/troubleshooting/no-video-in-gcs/).

Source: https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/qgroundcontrol/
