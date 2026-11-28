# Brak wideo w QGroundControl lub Mission Planner

> Telemetria działa, ale wideo pozostaje czarne w QGroundControl lub Mission Planner? Sprawdź kamerę, Włącz Wideo, adres IP docelowy, UDP 5600 i stację naziemną.

Telemetria dociera i dron widać na mapie, ale obszar wideo pozostaje czarny albo okno wideo QGroundControl pokazuje **WAITING FOR VIDEO**. Przechodź sprawdzenia po kolei. Najczęściej problem rozwiązuje sprawdzenie 2 lub 3.

![Widok Fly w QGroundControl połączony z pojazdem ArduPilot: pasek narzędzi z Not Ready i Stabilize, pięciopunktowa misja na mapie z No GPS Lock for Vehicle, a okno wideo w lewym dolnym rogu z napisem WAITING FOR VIDEO](https://docs.uavmatrix.com/pl/img/screenshots/gcs/qgroundcontrol--fly-view.webp)

*Objaw w QGroundControl: telemetria dociera (Not Ready, Stabilize na pasku narzędzi; No GPS Lock, bo to stanowisko testowe nie ma GPS), ale okno wideo w lewym dolnym rogu pokazuje WAITING FOR VIDEO.*

| Co widzisz | Prawdopodobna przyczyna | Zacznij od |
| --- | --- | --- |
| Wideo jest czarne w GCS i w podglądzie na żywo UAVcast-Pro | Kamera nie działa na dronie | [Sprawdzenie 1](https://docs.uavmatrix.com/pl/troubleshooting/no-video-in-gcs/#check-1) |
| Podgląd na żywo działa, stacja naziemna pozostaje czarna | Włącz Wideo jest wyłączone dla tej stacji naziemnej albo IP jest błędny | [Sprawdzenie 2](https://docs.uavmatrix.com/pl/troubleshooting/no-video-in-gcs/#check-2) |
| Działało przez Wi-Fi w domu, a przez 4G jest czarne | Miejsce docelowe używa lokalnego IP zamiast adresu IP VPN | [Sprawdzenie 2](https://docs.uavmatrix.com/pl/troubleshooting/no-video-in-gcs/#check-2) |
| Wszystko wygląda dobrze, a na Windows nadal czarno | Zapora blokuje przychodzący UDP na porcie 5600 | [Sprawdzenie 3](https://docs.uavmatrix.com/pl/troubleshooting/no-video-in-gcs/#check-3) |
| QGroundControl pokazuje wideo, Mission Planner nie | Mission Planner nie ma ustawionego źródła GStreamer | [Sprawdzenie 4](https://docs.uavmatrix.com/pl/troubleshooting/no-video-in-gcs/#check-4) |

## Sprawdzenie 1: Potwierdź, że kamera strumieniuje na dronie

Jeśli dron nie produkuje wideo, żadne ustawienie stacji naziemnej nie pomoże.

1. Otwórz interfejs webowy UAVcast-Pro i przejdź do **Kamera → Ustawienia kamery**.
2. Sprawdź, czy **Włączyć Kamerę?** jest na **Tak** i czy w **Wybierz Kamerę** wybrano kamerę.
3. Sprawdź, czy kamera działa: wiersz **Video** na panelu powinien mieć **Running**. Jeśli kamera jest zatrzymana, naciśnij **Uruchom** na stronie Kamera (przycisk pokazuje **Uruchom Ponownie**, gdy kamera działa).
4. Włącz **Włączyć Podgląd na Żywo?** i spójrz na **Podgląd na Żywo**. Jeśli widzisz obraz, kamera działa i możesz przejść do sprawdzenia 2.
5. Jeśli **Select Camera** pokazuje **No cameras available**, przejdź do [Kamera nie wykryta](https://docs.uavmatrix.com/pl/troubleshooting/camera-not-detected/).

![Strona ustawień kamery w UAVcast-Pro z włączoną CAM 1 i panelem Podglądu na żywo pokazującym No Video Available](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/camera.webp)

*Kamera → Ustawienia kamery z włączoną CAM 1. Podgląd na żywo pokazuje No Video Available, dopóki nie zaznaczysz opcji Włączyć Podgląd na Żywo?.*

> **Podgląd to nie strumień dla stacji naziemnej**
>
> Podgląd w przeglądarce idzie przez wbudowany serwer multimediów (WebRTC na porcie 8889). Stacja naziemna dostaje osobny strumień H.264 przez UDP. Działający podgląd dowodzi, że kamera działa, ale nie dowodzi, że strumień UDP dociera do twojego laptopa.

Jeśli **Dziennik Działań** na stronie Kamera mówi, że kamera *does not support* jakiejś rozdzielczości, wybierz inną wartość w **Rozdzielczość**. UAVcast-Pro przejdzie na największy obsługiwany rozmiar i zapisze w logu, którego użył.

## Sprawdzenie 2: Sprawdź miejsce docelowe w stacji naziemnej

UAVcast-Pro wysyła wideo tylko do miejsc docelowych, w których wideo jest włączone. Telemetria i wideo mają osobne przełączniki, a **oba są wyłączone w nowym miejscu docelowym**.

1. Przejdź do **Stacje Naziemne** i znajdź kartę komputera, na którym działa twoja stacja naziemna.
2. Upewnij się, że **Włącz Punkt Końcowy** i **Włącz Wideo** są włączone.
3. Sprawdź **IP lub Host Docelowy**. Musi to być adres IPv4 komputera stacji naziemnej widziany z drona. Nazwy hostów nie są akceptowane.
4. Sprawdź, czy **Port Wideo** to `5600` lub port, na którym nasłuchuje twoja stacja naziemna.
5. Pola zapisują się po wyjściu z nich lub po naciśnięciu Enter. Zielony znacznik potwierdza zapis.

![Port Wideo 5600 i przełącznik Włącz Wideo włączony](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/ground-control--video-enabled.webp)

*Stacje Naziemne: miejsce docelowe z włączonym Włącz Wideo i Portem Wideo 5600.*

> **Lecisz przez 4G? Użyj adresu IP VPN**
>
> Przez łącze komórkowe dron nie może dotrzeć do lokalnego adresu twojego laptopa (jak `192.168.1.20`). Użyj adresu, jaki laptop ma w VPN (Fleet Manager VPN, Tailscale lub ZeroTier). W Windows uruchom `ipconfig` i poszukaj karty Tailscale lub ZeroTier.

Korzystasz z Fleet Manager? Miejsca docelowe są tworzone za ciebie, gdy dodasz powiązanie strumienia, a każdy kolejny dron na tej samej stacji naziemnej dostaje własne porty. Sprawdź port wideo pokazany przy powiązaniu, a nie 5600. Zobacz [Powiązania strumieni](https://docs.uavmatrix.com/pl/fleet-manager/network/stream-bindings/).

## Sprawdzenie 3: Zezwól na UDP 5600 w zaporze

Wideo dociera jako przychodzący ruch UDP. W Windows jest to domyślnie blokowane, nawet gdy telemetria przechodzi, ponieważ stacja naziemna poprosiła o wyjątek.

**Windows**

Otwórz **PowerShell jako administrator** i uruchom:

```powershell
New-NetFirewallRule -DisplayName "UAV Video" -Direction Inbound -Protocol UDP -LocalPort 5600 -Action Allow
New-NetFirewallRule -DisplayName "MAVLink Telemetry" -Direction Inbound -Protocol UDP -LocalPort 14550 -Action Allow
```

Karty ZeroTier i Tailscale są często klasyfikowane jako sieć *Public*. Reguła utworzona w ten sposób obowiązuje we wszystkich profilach.

**Linux**

```bash
sudo ufw allow 5600/udp comment 'UAV Video'
sudo ufw allow 14550/udp comment 'MAVLink Telemetry'
```

**macOS**

Zapora macOS zezwala na przychodzący UDP dla aplikacji, które zatwierdzisz. Jeśli kliknąłeś *Deny*, gdy QGroundControl uruchomił się po raz pierwszy, zezwól mu ponownie w **Ustawienia systemowe → Sieć → Zapora → Opcje**.

## Sprawdzenie 4: Skonfiguruj wideo w stacji naziemnej

**QGroundControl**

1. Kliknij ikonę **Q**, a następnie **Application Settings**.
2. Otwórz ustawienia wideo (**Video**, albo **General → Video** w starszych wersjach).
3. Ustaw **Source** na **UDP h.264 Video Stream** i sprawdź, czy adres UDP używa portu `5600` (**UDP URL** `0.0.0.0:5600` w aktualnych wersjach, **UDP Port** `5600` w starszych).
4. Wróć do widoku Fly. Kafelek wideo powinien pokazać obraz w ciągu kilku sekund.

**Mission Planner**

Mission Planner pokazuje wideo w HUD. Jeśli pozostaje czarne, ustaw źródło ręcznie:

1. Kliknij prawym przyciskiem HUD i wybierz **Video → Set GStreamer Source**.
2. Wklej ten pipeline i potwierdź:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

## Sprawdzenie 5: Przetestuj strumień bez stacji naziemnej

To wyłącza oprogramowanie stacji naziemnej z układu. Jeśli otworzy się okno z wideo, dron, sieć i zapora działają, a problem leży w ustawieniach stacji naziemnej.

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

> **Windows: wybierz instalację Complete**
>
> Podczas instalacji GStreamer (runtime MSVC 64-bit) wybierz **Complete**. Instalacja **Typical** pomija dekoder H.264, a polecenie kończy się błędem `no element "avdec_h264"`.

Zamknij test, zanim ponownie otworzysz stację naziemną: w danym momencie tylko jeden program może nasłuchiwać na porcie 5600. Szczegółowa konfiguracja odbiornika krok po kroku: [Mission Planner](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/mission-planner/), [QGroundControl](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/qgroundcontrol/) oraz GStreamer na [Windows](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-linux/) lub [macOS](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-macos/).

> **Wideo działa, ale jest przerywane przez 4G?**
>
> Zobacz [Przerywane lub opóźnione wideo](https://docs.uavmatrix.com/pl/troubleshooting/choppy-or-delayed-video/).

## Nadal brak wideo?

[Pobierz logi](https://docs.uavmatrix.com/pl/troubleshooting/collect-logs/) z zaznaczonym **Camera Server** na liście logów i wyślij je na **[support@uavmatrix.com](mailto:support@uavmatrix.com)** wraz z wersją UAVcast-Pro, modelem kamery i używaną stacją naziemną.

Powiązane: [Ustawienia kamery](https://docs.uavmatrix.com/pl/uavcast-pro/camera/) · [Stacje Naziemne](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/)

Source: https://docs.uavmatrix.com/pl/troubleshooting/no-video-in-gcs/
