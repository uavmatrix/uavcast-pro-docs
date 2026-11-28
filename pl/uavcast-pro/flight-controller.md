# Połączenie z kontrolerem lotu

> Połącz Pixhawk lub dowolny inny kontroler ArduPilot albo PX4 z UAVcast-Pro przez USB lub UART, z automatycznym wykrywaniem portu i prędkości bodów oraz podglądem połączenia na żywo.

UAVcast-Pro odczytuje MAVLink z Twojego kontrolera lotu (ArduPilot, PX4 lub dowolnego innego autopilota MAVLink) przez USB albo UART (port TELEM) i przekazuje go do każdej stacji naziemnej, którą dodasz. Gdy **Port** i **Baud rate** są ustawione na **Automatic** (domyślnie), aplikacja sama znajduje kontroler lotu, zapamiętuje to, co zadziałało, i łączy się ponownie po restarcie, zaniku USB lub późnym włączeniu zasilania. Znajdziesz to w **Kontroler Lotu → Połączenie**.

![Strona Kontroler Lotu → Połączenie ze statusem Connected, sprawdzeniem połączenia z czterema zaliczonymi krokami i Inspektorem MAVLink](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/flight-controller.webp)

*Kontroler Lotu → Połączenie z łączem USB do Pixhawka.*

## Połączenie przez USB

1. Podłącz port USB kontrolera lotu do komputera towarzyszącego kablem przesyłającym dane.
2. Przejdź do **Kontroler Lotu → Połączenie** i wybierz **USB** w polu **Link type**.
3. Pozostaw **Port** na **Automatic**. Połączenia USB nie używają prędkości bodów.
4. Jeśli panel statusu pokazuje **Link stopped**, wybierz **Połącz**.

W ciągu kilku sekund status pokaże **CONNECTED** z typem pojazdu i ID systemu, na przykład *Connected to Quadrotor (system 1) on ArduPilot fmuv2 (ttyACM0)*.

## Połączenie przez port TELEM (UART)

1. Podłącz port TELEM: TX kontrolera lotu do RX na komputerze towarzyszącym, RX do TX oraz GND do GND. Nie podłączaj 5 V, jeśli obie płytki mają własne zasilanie.
2. Na kontrolerze lotu ustaw port na MAVLink 2. Dla TELEM2 jest to `SERIAL2_PROTOCOL = 2`. Zapisz wartość `SERIAL2_BAUD`.
3. W UAVcast-Pro wybierz **UART / Serial** w polu **Link type**.
4. Pozostaw **Port** i **Baud rate** na **Automatic** albo wybierz port (na Raspberry Pi port UART GPIO jest oznaczony jako **recommended**) i prędkość bodów zgodną z `SERIALx_BAUD`.
5. Jeśli łącze jest zatrzymane, wybierz **Połącz**.

Zmiany obowiązują od razu. Nie musisz nic restartować.

> **Automatyczna prędkość bodów**
>
> W trybie **Automatic** UAVcast-Pro sprawdza po kolei 57600, 115200, 921600, 1500000, 460800, 230400 i 500000 bodów, zaczynając od ostatniej prędkości, która zadziałała. Jeśli heartbeaty ustają przez 20 sekund, a dane nadal napływają (na przykład po zmianie `SERIALx_BAUD`), aplikacja szuka ponownie.

## Opis ustawień

| Ustawienie | Domyślnie | Wartości | Uwagi |
| --- | --- | --- | --- |
| **Link enabled** | Włączone | Włączone, wyłączone | Wyłączenie zwalnia port szeregowy i zatrzymuje telemetrię do wszystkich stacji naziemnych. |
| **Link type** | **USB** | **USB**, **UART / Serial** | Określa, które porty szuka tryb **Automatic**. |
| **Port** | **Automatic** | **Automatic**, wykryty port, **Custom path…** | Tryb **Automatic** preferuje stabilną ścieżkę `/dev/serial/by-id/…` i podąża za urządzeniem, jeśli zmieni ono numer. **Custom path** przyjmuje dowolne urządzenie, na przykład `/dev/ttyAMA0`. Porty używane przez inny program pokazują *in use by …*. |
| **Baud rate** | **Automatic** | **Automatic** albo stała prędkość | Ignorowane dla USB. Gdy jest ustawiona na stałe, musi być zgodna z `SERIALx_BAUD`. |

## Odczyt panelu stanu

| Stan | Znaczenie |
| --- | --- |
| **Connected** | Heartbeaty docierają. **Connected for**, **Last heartbeat** i **Auto-reconnects** pokazują kondycję łącza. |
| **Waiting for device** | Port nie istnieje. Kontroler lotu jest odłączony, nie ma zasilania albo się jeszcze uruchamia. |
| **Detecting baud rate** | Sprawdzanie prędkości bodów (*Trying 115200 baud (2 of 7)*). |
| **No heartbeat** | Port jest otwarty, ale nie dociera poprawny MAVLink: zła prędkość bodów, zamienione TX/RX albo port nie jest ustawiony na MAVLink. |
| **Reconnecting** | Łącze zostało przerwane i wraca samo. |
| **Searching** | **Auto-detect** skanuje każdy port i każdą prędkość. Może to potrwać do minuty. |
| **Off** / **Stopped** | Łącze jest wyłączone albo zatrzymane. Wybierz **Połącz**. |

### Sprawdzenie połączenia

Karta **Connection check**, odświeżana co sekundę, śledzi dane od przewodu aż do stacji naziemnej. Pierwszy wiersz, który nie jest zielony, wskazuje problem:

1. **Flight controller plugged in** (USB) albo **Serial port available** (UART). *Not detected* zwykle oznacza kabel tylko do ładowania albo brak zasilania.
2. **Signal on the wire**: bajty docierają do portu.
3. **Readable flight controller data**: bajty dekodują się jako MAVLink. *% damaged* wskazuje luźny lub długi przewód, brak masy albo zakłócenia od kabli zasilających.
4. **Flight controller responding**: heartbeaty z pojazdu.
5. **Sending to ground station**: pakiety na sekundę do każdego włączonego miejsca docelowego albo *No ground station set up*.

### Autodetekcja

**Auto-detect** wstrzymuje łącze, nasłuchuje na każdym porcie szeregowym przy każdej prędkości bodów, zapisuje znaleziony port i prędkość i uruchamia łącze z nimi. Użyj tego, gdy nie wiesz, jakiego portu i prędkości bodów używa kontroler lotu. **Show what was tried** pokazuje listę wszystkich prób.

## Panel Inspektora MAVLink

Prawa kolumna pokazuje bieżący stan pojazdu: połączenie, **Informacje o Zabezpieczeniu GCS**, **Informacje o Pojeździe** (typ, kontroler, tryb lotu, uzbrojenie), **Stan Baterii**, **Informacje GPS** i dane lotu. Jeśli panel pokazuje **Ostrzeżenie - Failsafe Disabled**, kontroler lotu nie ma failsafe GCS. Włącz go (`FS_GCS_ENABLE` w ArduPilot) przed lotem przez łącze komórkowe.

## Bezpieczeństwo: brak otwartego portu telemetrii

UAVcast-Pro nie przyjmuje przychodzących połączeń telemetrycznych. Serwer TCP na porcie 5760, który zwykle otwiera mavlink-router, jest wyłączony. Telemetrię dostają więc tylko stacje naziemne, które dodasz na stronie [Stacje Naziemne](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/), i tylko wtedy, gdy włączona jest opcja **Włącz Telemetrię**.

> **Z wcześniejszej wersji**
>
> Wcześniejsze wersje domyślnie używały `/dev/ttyACM0` przy 57600 bodach i przyjmowały połączenia TCP na porcie 5760. Od wersji v6.4.3 każde urządzenie przechodzi raz na **Automatic**, a wcześniejszy port i prędkość są próbowane jako pierwsze. Od wersji v6.5.0 TCP 5760 jest zamknięty: dodaj swój komputer jako stację naziemną i połącz się przez UDP.

## Powiązane

- [Korekcje NTRIP / RTK](https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/ntrip-rtk/)
- [Wstrzykiwacze: wysyłaj własne dane z czujników do MAVLink](https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/injectors/)
- [Stacje naziemne](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/)
- [Rozwiązywanie problemów: brak heartbeatu MAVLink](https://docs.uavmatrix.com/pl/troubleshooting/no-mavlink-heartbeat/)

Source: https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/
