# Czym jest UAVcast-Pro?

> UAVcast-Pro zamienia komputer pokładowy Raspberry Pi lub Linux w łącze 4G/LTE dla telemetrii MAVLink i wideo H.264. Zobacz, jak działa razem z Fleet Manager.

UAVcast-Pro to oprogramowanie dla komputera pokładowego na dronie, zwykle Raspberry Pi. Odczytuje MAVLink z dowolnego kontrolera lotu obsługującego MAVLink (ArduPilot lub PX4), przesyła strumień wideo H.264 z jednej lub dwóch kamer i wysyła oba do stacji naziemnej przez Wi-Fi, Ethernet lub modem 4G/LTE. Konfigurujesz go i monitorujesz z interfejsu web działającego na dronie.

UAVmatrix Fleet Manager to chmurowy panel, który jest jego uzupełnieniem. Po sparowaniu drona z UAVcast-Pro z Fleet Manager zobaczysz całą flotę na jednej mapie, otworzysz zdalny terminal, zaplanujesz misje i będziesz kierować wideo oraz telemetrię do stacji naziemnych bez przekierowywania portów. Fleet Manager jest dołączony do każdej licencji UAVcast-Pro.

## Jak łączą się elementy

```text
 Kontroler lotu ──USB/UART──►  Komputer pokładowy z UAVcast-Pro
 (ArduPilot, PX4)                  │  router MAVLink, serwer kamery, modem,
 Kamera(y) ──CSI/USB────────────►  │  VPN, klient NTRIP, rejestrator, interfejs web
                                   │
                                   ├── UDP 14550 (telemetria) ─┐
                                   ├── UDP 5600  (wideo)    ──┼─► Mission Planner / QGroundControl
                                   │                          │   przez LAN, VPN lub 4G
                                   └── MQTT/TLS 8883 ─────────┴─► Fleet Manager (opcjonalnie)
```

- **Na dronie**: UAVcast-Pro przejmuje port szeregowy kontrolera lotu i przekazuje MAVLink do każdej dodanej stacji naziemnej. Serwer kamery koduje H.264 i wysyła RTP przez UDP do tych samych stacji. Nic nie nasłuchuje przychodzących połączeń telemetrii, dopóki ich nie dodasz.
- **Między dronem a ziemią**: w sieci lokalnej wystarczy adres IP stacji naziemnej. Przez 4G dron nie ma publicznego adresu, więc oba końce łączysz w VPN. [VPN Fleet Manager](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/vpn/), dołączony do każdej licencji, robi to za ciebie; UAVcast-Pro może też dołączyć do twojej własnej sieci Tailscale lub ZeroTier.
- **W chmurze**: po sparowaniu dron utrzymuje wychodzące połączenie MQTT uwierzytelniane certyfikatem z Fleet Manager. Zobacz [Sparuj dron z Fleet Manager](https://docs.uavmatrix.com/pl/uavcast-pro/fleet-pairing/).

## Co możesz z tym zrobić

| Obszar | Co robi | Strona |
| --- | --- | --- |
| Telemetria | Automatycznie wykrywa port i prędkość bodów kontrolera lotu, kieruje MAVLink do dowolnej liczby stacji naziemnych, opcjonalne miejsca docelowe tylko do odczytu | [Kontroler lotu](https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/), [Stacje naziemne](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/) |
| Wideo | Kamery CSI i USB Raspberry Pi, dwie kamery z przełączaniem RC lub podwójnym strumieniem, dźwięk, niestandardowe pipeline'y GStreamer | [Kamera i wideo](https://docs.uavmatrix.com/pl/uavcast-pro/camera/) |
| Nagrywanie | Nagrywa wideo i telemetrię każdego lotu na dronie, z odtwarzaczem do przeglądu lotu | [Nagrania](https://docs.uavmatrix.com/pl/uavcast-pro/camera/recordings/) |
| Mapa lotu | Mapa na żywo, kokpit HUD, uzbrój/rozbrój, RTL i loiter, planer misji, inspektor MAVLink, analiza logów | [Mapa lotu](https://docs.uavmatrix.com/pl/uavcast-pro/flight-map/) |
| Łączność | Modemy 4G/LTE z automatycznym APN, VPN Fleet Manager lub własna sieć Tailscale albo ZeroTier, dynamiczny DNS, priorytet Wi-Fi a modem | [Łączność](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/) |
| RTK | Klient NTRIP wysyłający poprawki RTCM3 do kontrolera lotu | [NTRIP / RTK](https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/ntrip-rtk/) |
| Dane niestandardowe | Przenosi czujniki i skrypty do MAVLink i wyświetla je na wykresach | [Wstrzykiwacze](https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/injectors/), [Strumienie danych](https://docs.uavmatrix.com/pl/uavcast-pro/data-streams/) |

## Czego potrzebujesz

- 64-bitowego komputera pokładowego z Linuksem (arm64 lub amd64). Najczęstszym wyborem są Raspberry Pi 3, 4, 5 i Zero 2 W; działają też mini PC z x86, a NVIDIA Jetson, Orange Pi i inne płytki arm64 działają od UAVcast-Pro 6.5.3. Zobacz [Wymagania sprzętowe](https://docs.uavmatrix.com/pl/get-started/hardware-requirements/).
- Kontrolera lotu obsługującego MAVLink: ArduPilot lub PX4. Przyciski trybów lotu używają nazw trybów ArduPilot.
- Licencji UAVcast-Pro ze [sklepu UAVmatrix](https://uavmatrix.com/products/). Zobacz [Licencjonowanie i aktywacja](https://docs.uavmatrix.com/pl/get-started/license-activation/).
- Do lotów poza zasięgiem Wi-Fi: modemu 4G/LTE i karty SIM z transmisją danych.

## Następne kroki

[Szybki startOd świeżego Raspberry Pi do telemetrii i wideo w Mission Planner lub QGroundControl.](https://docs.uavmatrix.com/pl/get-started/quick-start/)[Zainstaluj UAVcast-ProJedno polecenie na Raspberry Pi OS, Debianie lub Ubuntu (arm64 i amd64).](https://docs.uavmatrix.com/pl/get-started/installation/)[Aktywuj licencjęAktywacja na urządzeniu, sprawdzanie slotów urządzeń i przenoszenie licencji na nowy sprzęt.](https://docs.uavmatrix.com/pl/get-started/license-activation/)

Source: https://docs.uavmatrix.com/pl/get-started/overview/
