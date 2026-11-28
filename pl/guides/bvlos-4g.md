# Lot poza zasięgiem wzroku przez 4G

> Lataj dronem przez 4G/LTE z UAVcast-Pro, modemem komórkowym i VPN Fleet Manager, z telemetrią i wideo na żywo w QGroundControl lub Mission Planner.

Ten przewodnik prowadzi od stanowiska warsztatowego do lotu przez sieć komórkową: telemetria i wideo na żywo w QGroundControl lub Mission Planner, gdziekolwiek obie strony mają zasięg. Używa VPN, który jest dołączony do [Fleet Manager](https://docs.uavmatrix.com/pl/fleet-manager/) i wchodzi w skład Twojej licencji UAVcast-Pro, więc żadna ze stron nie potrzebuje publicznego IP ani przekierowania portów.

**Czas:** około godziny. **Potrzebujesz:**

- Komputera towarzyszącego (Raspberry Pi 4 lub 5 albo innej [obsługiwanej płytki](https://docs.uavmatrix.com/pl/reference/supported-hardware/)) z zainstalowanym [UAVcast-Pro](https://docs.uavmatrix.com/pl/get-started/installation/) i [aktywowaną licencją](https://docs.uavmatrix.com/pl/get-started/license-activation/).
- Kontrolera lotu MAVLink (ArduPilot lub PX4), kabla danych USB albo okablowania TELEM.
- Modemu USB 4G/LTE i karty SIM z transmisją danych. Wyłącz kod PIN karty SIM w telefonie, to oszczędzi kłopotów.
- Kamery, jeśli chcesz wideo.
- Laptopa z QGroundControl lub Mission Planner oraz [klienta Tailscale](https://tailscale.com/download).
- [Organizacji Fleet Manager](https://docs.uavmatrix.com/pl/fleet-manager/set-up-organization/), w której jesteś Owner lub Admin.

> **Zasady lotu poza zasięgiem wzroku**
>
> Lot poza zasięgiem wzroku (BVLOS) w większości krajów wymaga zezwolenia. UAVcast-Pro zapewnia łącze; zatwierdzenie operacyjne, ocena ryzyka i zabezpieczenia (fail-safe) są Twoją odpowiedzialnością.

## Jak to działa razem

```text
Flight controller ──USB/UART── UAVcast-Pro ──4G──► internet ──► laptop
                                    │                               │
                                    └──── Fleet Manager VPN ────────┘
                  telemetry and video on the ports of the stream binding
```

Dron wysyła MAVLink i wideo H.264 na adres VPN Twojego laptopa. VPN sprawia, że laptop jest osiągalny przez 4G tak, jakby oba urządzenia były w tej samej lokalnej sieci.

> **Wolisz własny VPN?**
>
> Zamiast Fleet Manager możesz użyć własnej sieci ZeroTier lub tailnetu Tailscale: zobacz [VPN](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/vpn/) i [Zdalny dostęp przez Tailscale](https://docs.uavmatrix.com/pl/guides/remote-access-tailscale/). Kroki 1, 2 oraz 7 do 9 poniżej pozostają bez zmian.

## 1. Podłącz kontroler lotu

1. Podłącz kontroler lotu do komputera towarzyszącego przez USB albo poprowadź port TELEM (TX→RX, RX→TX, GND→GND) i włącz MAVLink na tym porcie (`SERIALx_PROTOCOL = 2` w ArduPilot, `MAV_x_CONFIG` w PX4).
2. W UAVcast-Pro otwórz **Kontroler Lotu → Połączenie**. Wybierz **USB** lub **UART / Serial** w polu **Link type**, a pola **Port** i **Baud rate** pozostaw na **Automatic**.
3. Poczekaj na status **Połączono** i pojazd w **Pojazd**. Jeśli nadal widzisz **No heartbeat**, zobacz [Brak heartbeat MAVLink](https://docs.uavmatrix.com/pl/troubleshooting/no-mavlink-heartbeat/).

## 2. Skonfiguruj modem

1. Podłącz modem i otwórz **Modem**.
2. Ustaw **Włącz modem** na **Tak** i wybierz **Typ modemu**: **HiLink** dla modemów działających jako karta sieciowa USB (na przykład Huawei E3372h), **Traditional (PPP)** dla pozostałych.
3. W przypadku modemu Traditional pozostaw pole **Nazwa Punktu Dostępu (Opcjonalne)** puste. UAVcast-Pro znajdzie APN dla Twojej karty SIM i go zapamięta.
4. W sekcji **Informacje o Modemie** poczekaj na operatora i adres IPv4.
5. Przejdź do **Sieci** i wybierz **Modem Priority (Outdoor Mode)**, aby ruch wychodził przez modem, nawet gdy w pobliżu jest Wi-Fi.

Szczegóły: [Modem komórkowy](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/cellular-modem/). Jeśli modem się łączy, ale nic się nie ładuje: [Modem połączony, brak internetu](https://docs.uavmatrix.com/pl/troubleshooting/modem-no-internet/).

## 3. Włącz VPN w Fleet Manager

W Fleet Manager otwórz **Network**. Jeśli widzisz **Enable VPN Network**, wybierz tę opcję. Tworzy ona prywatną sieć Twojej organizacji. Zobacz [Sieć i VPN](https://docs.uavmatrix.com/pl/fleet-manager/network/).

## 4. Sparuj drona i połącz go z VPN

1. W UAVcast-Pro przejdź do **Zarządzanie → Fleet Management** i wybierz **Connect to Fleet Manager**. Zapisz 8-cyfrowy kod.
2. W Fleet Manager przejdź do **Fleet → Pair Device**, wpisz kod i potwierdź urządzenie.
3. Na kroku **VPN Connection** pozostaw zaznaczoną opcję **Enable VPN for this UAV** i wybierz **Complete Pairing**.
4. Dron pojawi się w **Network → Connected Devices** z typem **UAV** i adresem `100.x.y.z`.

Pełne omówienie: [Dodaj pierwszego drona do Fleet Manager](https://docs.uavmatrix.com/pl/fleet-manager/pair-uav/).

## 5. Połącz laptop z VPN

1. Zainstaluj Tailscale na laptopie. Nie potrzebujesz konta Tailscale: Fleet Manager uruchamia własny serwer VPN.
2. W Fleet Manager, w **Network → Devices**, skopiuj **GCS Connection Command** pod **Connect a Device** i uruchom go na laptopie jako administrator (`sudo` na macOS i Linuksie).
3. Laptop pojawi się w **Connected Devices**. W kolumnie **Type** wybierz **Configure**, następnie **Ground Control Station (GCS)** i naciśnij **Complete Setup**.
4. Test: `ping <drone VPN IP>` z laptopa. Możesz teraz otworzyć interfejs webowy drona pod adresem `http://<drone VPN IP>/`.

Szczegóły i zrzuty ekranu: [Podłącz stację naziemną](https://docs.uavmatrix.com/pl/fleet-manager/connect-gcs/).

## 6. Wyślij telemetrię i wideo do laptopa

1. W Fleet Manager przejdź do **Network → Stream Bindings** i wybierz **Add Binding**.
2. Wybierz drona i laptop, a następnie naciśnij **Create Binding**. Fleet Manager wysyła miejsce docelowe do drona; pojawi się ono na stronie **Ground Control Stations** drona z ikoną chmury.
3. Odczytaj porty wideo i telemetrii w kolumnie **Ports**. Dla pierwszego drona na laptopie są to domyślne `5600` i `14550`.
4. Na laptopie zezwól na przychodzący UDP na tych portach w zaporze (polecenia w [Brak wideo, sprawdzenie 3](https://docs.uavmatrix.com/pl/troubleshooting/no-video-in-gcs/#check-3)).

## 7. Uruchom kamerę

1. Otwórz **Kamera → Ustawienia kamery**, ustaw **Włączyć Kamerę?** na **Tak** i wybierz kamerę w **Wybierz Kamerę**.
2. Dla LTE zacznij od **Rozdzielczość** 1280×720, **Wybierz FPS** 15–20 i **Bitrate:** około 1000–1500 kbps.
3. Ustawienia zapisują się w miarę zmian. Jeśli kamera jeszcze nie działa, naciśnij **Uruchom**.

## 8. Otwórz stację naziemną

- **QGroundControl** łączy się samodzielnie z UDP 14550. W przypadku wideo ustaw **Source** na **UDP h.264 Video Stream** na porcie wideo bindingu w ustawieniach wideo.
- **Mission Planner**: wybierz **UDP**, naciśnij **Połącz** i wpisz port telemetrii bindingu. W przypadku wideo ustaw źródło GStreamer zgodnie z opisem na stronie [Mission Planner](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/mission-planner/).

## 9. Przetestuj na 4G przed lotem

1. Wyłącz Wi-Fi na komputerze towarzyszącym albo oddal drona od niego, tak aby jedyną drogą był modem.
2. Sprawdź panel główny: **Cellular** połączony, **VPN** połączony, **Stacja naziemna** *Sending*, **Wideo** działa.
3. Obserwuj łącze przez 10 minut na ziemi, najlepiej na miejscu startu. Szukaj zacięć wideo i przerw w telemetrii.
4. W **Kontroler Lotu → Połączenie** sprawdź **GCS Failsafe Information**. Jeśli pokazuje **Warning - Failsafe Disabled**, włącz GCS failsafe w kontrolerze lotu (ArduPilot: `FS_GCS_ENABL` w Plane, `FS_GCS_ENABLE` w Copter; PX4: `NAV_DLL_ACT`) i wybierz jego akcję, aby dron działał samodzielnie, gdy łącze zostanie przerwane.

> **Nagrywaj każdy lot**
>
> Włącz **Nagrywaj automatycznie po uzbrojeniu** w **Kamera → Nagrania → Ustawienia**. Otrzymasz wideo i dziennik telemetrii każdego lotu do późniejszej analizy: [Nagrywaj loty i analizuj je](https://docs.uavmatrix.com/pl/guides/recording-flight-review/).

> **UAVnet jest wycofywany**
>
> UAVnet, hostowany przez UAVmatrix kontroler ZeroTier, jest wycofywany na rzecz Fleet Manager. Jeśli Twoje drony korzystają dziś z sieci UAVnet, przenieś je do VPN Fleet Manager zgodnie z opisem powyżej.

## Następne kroki

- [Strumieniowanie do wielu stacji naziemnych](https://docs.uavmatrix.com/pl/guides/multiple-ground-stations/)
- [Dodaj poprawki RTK z castera NTRIP](https://docs.uavmatrix.com/pl/guides/rtk-ntrip-caster/)
- Zarządzasz kilkoma dronami? [Wdróż flotę z Fleet Manager](https://docs.uavmatrix.com/pl/guides/fleet-onboarding/)

Source: https://docs.uavmatrix.com/pl/guides/bvlos-4g/
