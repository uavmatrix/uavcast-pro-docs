# Stacje naziemne

> Dodawaj miejsca docelowe stacji naziemnej w UAVcast-Pro, aby strumieniować telemetrię MAVLink (UDP 14550) i wideo H.264 (UDP 5600) do Mission Planner, QGroundControl lub kilku komputerów.

Miejsce docelowe określa, dokąd UAVcast-Pro wysyła telemetrię i wideo. Każde z nich to adres IP wraz z portem telemetrii i portem wideo. UAVcast-Pro wysyła do wszystkich włączonych miejsc docelowych jednocześnie przez UDP, więc Mission Planner na jednym laptopie i QGroundControl na tablecie mogą odbierać dane z drona. Otwórz **Stacje Naziemne** w pasku bocznym.

![Strona Stacji Naziemnych z dwiema kartami miejsc docelowych i przyciskiem Dodaj Miejsce Docelowe](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/ground-control.webp)

*Dwie karty miejsc docelowych: wyłączona, pusta oraz włączona z telemetrią i wideo.*

## Dodawanie miejsca docelowego

1. Wybierz **Dodaj Miejsce Docelowe**. Pojawia się nowa karta. (Świeża instalacja ma już jedną pustą kartę.)
2. Wpisz **Nazwa**, na przykład `Pilot laptop`.
3. Wpisz adres IPv4 komputera stacji naziemnej w polu **IP lub Host Docelowy** i naciśnij Enter. Zielony znacznik oznacza, że zapisano.
4. Sprawdź **Port Telemetrii** (domyślnie `14550`) i **Port Wideo** (domyślnie `5600`). Użyj portów, na których nasłuchuje stacja naziemna.
5. Włącz **Włącz Telemetrię** i, jeśli chcesz wideo, **Włącz Wideo**.

Każde pole zapisuje się po naciśnięciu Enter lub po wyjściu z pola. Nie ma przycisku **Zapisz**. Routowanie telemetrii uwzględnia zmianę w ciągu kilku sekund.

> **Użyj adresu IPv4, a nie nazwy hosta**
>
> Mimo etykiety **IP lub Host Docelowy** UAVcast-Pro akceptuje wyłącznie adres IPv4, na przykład `192.168.1.20`, lub adres VPN, na przykład `10.147.17.5`. Nazwy hostów są odrzucane z komunikatem *Wpisz prawidłowy adres IPv4, na przykład 192.168.1.10.*

## Jaki adres IP użyć

| Gdzie jest stacja naziemna | Użyj |
| --- | --- |
| Ta sama sieć Wi-Fi lub Ethernet co dron | Adres LAN stacji naziemnej, na przykład `192.168.1.20`. |
| Gdziekolwiek, przez 4G/LTE | Adres **VPN** stacji naziemnej (ZeroTier, Tailscale lub Fleet Manager). Zobacz [VPN](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/vpn/). |
| Kilka komputerów | Jedno miejsce docelowe na komputer. |

## Ustawienia miejsca docelowego

| Ustawienie | Domyślnie | Wartości | Uwagi |
| --- | --- | --- | --- |
| **Włącz Punkt Końcowy** | Włączony | Włączony, wyłączony | Główny przełącznik. Wyłączenie zatrzymuje telemetrię, wideo i audio do tego miejsca, ale zachowuje jego ustawienia. |
| **Nazwa** | puste | do 49 znaków | Wyświetlana na karcie i w tablicy. |
| **IP lub Host Docelowy** | puste | adres IPv4 | Wymagane przed włączeniem telemetrii lub wideo. |
| **Port Telemetrii** | `14550` | 1–65535 | Port UDP, na którym stacja naziemna nasłuchuje MAVLink. |
| **Port Wideo** | `5600` | 1–65535 | Port UDP dla wideo RTP H.264 (kamera 1). |
| **Port Wideo (Kamera 2)** | puste = Port Wideo + 1 | 1–65535 | Widoczne tylko wtedy, gdy [podwójny strumień](https://docs.uavmatrix.com/pl/uavcast-pro/camera/multi-camera/) jest włączony. |
| **Włącz Wideo** | Wyłączony | Włączony, wyłączony | Wysyła strumień z kamery do tego miejsca. |
| **Włącz Telemetrię** | Wyłączony | Włączony, wyłączony | Wysyła MAVLink do tego miejsca i przyjmuje z niego polecenia. |
| **Read Only** | Wyłączony | Włączony, wyłączony | Wymaga **Włącz Telemetrię**. Stacja naziemna odbiera telemetrię, ale nie może niczego zmienić w pojeździe: polecenia, uzbrajanie, zmiany trybu, zapisy parametrów i misji, RC override oraz sterowanie ręczne są zablokowane. Dotyczy to UAVcast-Pro od wersji 6.5.3; we wcześniejszych wersjach Read Only nie blokuje zapisu parametrów. |

Dźwięk, po włączeniu opcji **Send audio to ground stations** na stronie Kamera, trafia do każdego miejsca docelowego, które odbiera wideo, na **Port Wideo + 2** (na przykład `5602`). Zobacz [Audio](https://docs.uavmatrix.com/pl/uavcast-pro/camera/audio/).

Każde miejsce docelowe zajmuje trzy porty strony wideo: **Port Wideo**, + 1 (kamera 2) i + 2 (audio). Jeśli dwa miejsca docelowe wskazują na ten sam komputer, rozmieść ich porty wideo co 3, na przykład `5600` i `5603`. Zobacz [Dwie stacje na jednym komputerze](https://docs.uavmatrix.com/pl/guides/multiple-ground-stations/#3-two-stations-on-one-computer).

## Konfiguracja strony odbiorczej

Wybierz program, którego używasz na ziemi. Każda strona zawiera dokładne ustawienia, krok z zaporą oraz rozwiązania typowych błędów.

| Stacja naziemna | Telemetria | Wideo | Strona |
| --- | --- | --- | --- |
| Mission Planner (Windows) | UDP 14550 | źródło GStreamer na porcie 5600 | [Mission Planner](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/mission-planner/) |
| QGroundControl (Windows, macOS, Linux) | UDP 14550, łączy się samodzielnie | UDP h.264 na porcie 5600 | [QGroundControl](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/qgroundcontrol/) |
| Tablet lub telefon z Androidem | QGroundControl, UDP 14550 | UDP h.264 na porcie 5600 | [Android](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/android/) |
| GStreamer na Windows | – | `gst-launch-1.0` na porcie 5600 | [GStreamer na Windows](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-windows/) |
| GStreamer na Linuksie | – | `gst-launch-1.0` na porcie 5600 | [GStreamer na Linuksie](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-linux/) |
| GStreamer na macOS | – | `gst-launch-1.0` na porcie 5600 | [GStreamer na macOS](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-macos/) |
| VLC lub pobieranie RTSP z drona | – | plik SDP lub RTSP na porcie 8554 | [VLC i RTSP](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/vlc-and-rtsp/) |

### Co wysyła dron

| Strumień | Format | Port w stacji naziemnej |
| --- | --- | --- |
| Telemetria | MAVLink przez UDP | **Port Telemetrii** (domyślnie `14550`) |
| Wideo z kamery 1 | H.264 w RTP, typ payloadu 96, przez UDP | **Port Wideo** (domyślnie `5600`) |
| Wideo z kamery 2 (podwójny strumień) | H.264 w RTP, typ payloadu 96, przez UDP | **Port Wideo (Kamera 2)** (domyślnie Port Wideo + 1, `5601`) |
| Audio (opcjonalne) | Opus w RTP, typ payloadu 97, 48 kHz, przez UDP | Port Wideo + 2 (`5602`) |

Dron wysyła każdy strumień do miejsca docelowego. Nic nie musi łączyć się z dronem, ale zapora stacji naziemnej musi przepuszczać przychodzące pakiety UDP.

## Kilka stacji naziemnych

Dodaj jedno miejsce docelowe na komputer. Jeśli dwie stacje naziemne działają na **tym samym** komputerze (na przykład QGroundControl i narzędzie do logowania), nadaj im różne porty telemetrii, na przykład `14550` i `14551`, i ustaw każdej aplikacji jej port.

Użyj **Read Only** dla obserwatorów, operatorów ładunku lub drugiego ekranu: widzą wszystko, ale nie mogą sterować pojazdem.

## Miejsca docelowe z Fleet Manager

Gdy dron jest sparowany z Fleet Manager i utworzysz tam powiązanie strumienia, Fleet Manager doda miejsce docelowe za ciebie. Te karty pokazują ikonę chmury (*Managed by Fleet Manager*). Zmieniaj je w Fleet Manager, a nie tutaj. Zobacz [Parowanie z Fleet Manager](https://docs.uavmatrix.com/pl/uavcast-pro/fleet-pairing/).

## Sprawdzanie przepływu danych

- Wiersz **Ground station** na [Panelu Głównym](https://docs.uavmatrix.com/pl/uavcast-pro/dashboard/) pokazuje *Sending · 16 packets/s* lub *Sending to 2 · … packets/s*.
- **Kontroler Lotu → Połączenie → Connection check** wypisuje każde miejsce docelowe wraz z jego szybkością pakietów.
- *1 set up · waiting for flight controller* oznacza, że miejsce docelowe jest w porządku, ale kontroler lotu nie wysyła jeszcze telemetrii.

Użytkownicy z uprawnieniem tylko do odczytu widzą tę stronę, ale nie mogą jej zmieniać.

## Rozwiązywanie problemów

- [Brak telemetrii w stacji naziemnej](https://docs.uavmatrix.com/pl/troubleshooting/no-telemetry-in-gcs/)
- [Brak wideo w QGroundControl lub Mission Planner](https://docs.uavmatrix.com/pl/troubleshooting/no-video-in-gcs/)

Source: https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/
