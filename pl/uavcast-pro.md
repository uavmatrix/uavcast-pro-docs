# UAVcast-Pro

> Opis interfejsu webowego UAVcast-Pro: panel główny, kontroler lotu, mapa lotu, stacje naziemne, kamera, modem, VPN, parowanie z Fleet Manager, użytkownicy i ustawienia.

Ta sekcja opisuje każdą stronę interfejsu webowego UAVcast-Pro, w kolejności paska bocznego aplikacji. Każda strona wyjaśnia, do czego służy dany ekran, jak go skonfigurować i wymienia wszystkie ustawienia wraz z wartościami domyślnymi. Nowy w UAVcast-Pro? Zacznij od [Szybkiego startu](https://docs.uavmatrix.com/pl/get-started/quick-start/).

## Operacje

[Panel GłównyStan kontrolera lotu, GPS, łączy, wideo i zasilania na pierwszy rzut oka.](https://docs.uavmatrix.com/pl/uavcast-pro/dashboard/)[Strumienie DanychWłasne tablice na żywo dla dowolnej wartości MAVLink lub czujnika.](https://docs.uavmatrix.com/pl/uavcast-pro/data-streams/)[Kontroler LotuPołączenie USB lub UART z automatycznym wykrywaniem portu i prędkości bodów, NTRIP/RTK oraz wstrzykiwacze.](https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/)[Mapa LotuMapa na żywo, kokpitowy HUD, uzbrajanie i rozbrajanie, tryby, misje, radio, inspektor oraz analiza logów.](https://docs.uavmatrix.com/pl/uavcast-pro/flight-map/)[Stacje naziemne i wideoMiejsca docelowe oraz instrukcje krok po kroku dla Mission Planner, QGroundControl, GStreamer, Androida i VLC.](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/)

## Łączność

[ModemModemy 4G/LTE HiLink i tradycyjne z automatycznym APN.](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/cellular-modem/)[Sieć Prywatna VPNSieć VPN Fleet Manager lub własna sieć Tailscale albo ZeroTier.](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/vpn/)[Dynamiczny DNSUtrzymuj nazwę hosta wskazującą na publiczny adres IP drona.](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/dynamic-dns/)[SieciInterfejsy oraz priorytet Wi-Fi względem modemu.](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/networks/)

## Media

[Ustawienia kameryKamery CSI i USB, rozdzielczość, bitrate, H.264 o niskim opóźnieniu przez UDP.](https://docs.uavmatrix.com/pl/uavcast-pro/camera/)[Dwie kameryPrzełączanie kanałem RC lub podwójny strumień.](https://docs.uavmatrix.com/pl/uavcast-pro/camera/multi-camera/)[DźwiękDźwięk z mikrofonu w podglądzie i do stacji naziemnych.](https://docs.uavmatrix.com/pl/uavcast-pro/camera/audio/)[NagraniaNagrywanie wideo i telemetrii na dronie wraz z przeglądem lotu.](https://docs.uavmatrix.com/pl/uavcast-pro/camera/recordings/)

## Zarządzanie

[Fleet ManagementSparuj drona z UAVmatrix Fleet Manager.](https://docs.uavmatrix.com/pl/uavcast-pro/fleet-pairing/)[UsersLogowanie administratora i użytkownicy tylko do odczytu.](https://docs.uavmatrix.com/pl/uavcast-pro/users/)[AplikacjaPort, język, logi do wsparcia technicznego, kopia zapasowa i przywracanie bazy danych.](https://docs.uavmatrix.com/pl/uavcast-pro/application-settings/)

## Porty w skrócie

| Port | Kierunek | Zastosowanie |
| --- | --- | --- |
| TCP 80 | Przeglądarka → dron | Interfejs webowy (konfigurowalny) i wstrzykiwacze HTTP |
| UDP 14550 | Dron → stacja naziemna | Telemetria MAVLink (dla każdego miejsca docelowego, konfigurowalne) |
| UDP 5600 | Dron → stacja naziemna | Wideo, kamera 1 (dla każdego miejsca docelowego, konfigurowalne) |
| UDP 5601 | Dron → stacja naziemna | Wideo, kamera 2 przy podwójnym strumieniu (domyślnie Port Wideo + 1) |
| UDP 5602 | Dron → stacja naziemna | Dźwięk (Port Wideo + 2) |
| TCP 8889, UDP 8189 | Przeglądarka → dron | Podgląd na żywo (sygnalizacja i media WebRTC) |
| TCP 8883 | Dron → Fleet Manager | Połączenie z Fleet Manager (MQTT przez TLS) |
| TCP 2101 | Dron → caster NTRIP | Korekcje RTK (port castera) |
| UDP 14600 | Czujnik → dron | Wstrzykiwacz UDP (domyślnie, konfigurowalne) |

Source: https://docs.uavmatrix.com/pl/uavcast-pro/
