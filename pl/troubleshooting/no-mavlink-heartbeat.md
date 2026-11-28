# Brak heartbeat MAVLink z kontrolera lotu

> UAVcast-Pro pokazuje No heartbeat lub Waiting for device? Sprawdź kabel USB, okablowanie TELEM, SERIAL protocol i prędkość bodów, a następnie użyj Auto-detect.

Strona **Kontroler Lotu → Połączenie** pokazuje **No heartbeat**, **Waiting for device**, **Detecting baud rate** lub **Searching**, a wiersz **Flight controller** na panelu nigdy nie zmienia koloru na zielony. UAVcast-Pro jeszcze nie słyszy kontrolera lotu.

Strona ma na żywo działającą **Connection check**, która testuje każdy krok raz na sekundę i wyjaśnia pierwszy znaleziony problem. Przeczytaj ją najpierw: zwykle jest to szybsze niż ta strona.

![Karta Connection check z czterema wierszami: kontroler lotu podłączony, czytelne dane kontrolera lotu, kontroler lotu odpowiada i wysyła do stacji naziemnej](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/flight-controller--connection-check.webp)

*Connection check przy działającym łączu: wszystkie cztery kroki zaliczone. Gdy łącze nie działa, pierwszy niezaliczony krok jest oznaczony i wyjaśniony.*

| Co widzisz | Prawdopodobna przyczyna | Zacznij od |
| --- | --- | --- |
| Waiting for device lub Flight controller plugged in: Not detected | Brak kabla danych albo płytka nie jest zasilana | [Sprawdzenie 1](https://docs.uavmatrix.com/pl/troubleshooting/no-mavlink-heartbeat/#check-1) |
| Sygnał na przewodzie, ale brak czytelnych danych | Zła prędkość bodów, zamienione TX/RX lub port nie jest ustawiony na MAVLink | [Sprawdzenie 2](https://docs.uavmatrix.com/pl/troubleshooting/no-mavlink-heartbeat/#check-2) |
| Czytelne dane pokazują wysoki % damaged | Luźny lub długi przewód, brak masy lub zakłócenia elektryczne | [Sprawdzenie 3](https://docs.uavmatrix.com/pl/troubleshooting/no-mavlink-heartbeat/#check-3) |
| Port pokazuje in use by … (zajęty) | Port szeregowy jest zajęty przez inny program | [Sprawdzenie 4](https://docs.uavmatrix.com/pl/troubleshooting/no-mavlink-heartbeat/#check-4) |
| Status Off lub Stopped | Łącze jest wyłączone | [Sprawdzenie 5](https://docs.uavmatrix.com/pl/troubleshooting/no-mavlink-heartbeat/#check-5) |

## Sprawdzenie 1: Czy kontroler lotu jest w ogóle widoczny?

**Przez USB:**

1. Upewnij się, że kontroler lotu jest zasilany, a jego kabel USB prowadzi do komputera towarzyszącego.
2. Spróbuj innego kabla. Wiele kabli USB służy tylko do ładowania i nie przesyła danych. Jeśli płytka się świeci, ale **Flight controller plugged in** pokazuje **Not detected**, kabel jest zwykle przyczyną.
3. W sekcji **Link type** wybierz **USB** i zostaw **Port** na **Automatic**. Automatic znajduje kontroler lotu i podąża za nim, jeśli zmieni się numer urządzenia.

**Przez port TELEM (UART / Serial):**

1. W sekcji **Link type** wybierz **UART / Serial**.
2. Sprawdź okablowanie: kontroler lotu **TX → RX** na komputerze towarzyszącym, **RX → TX** i **GND → GND**. Brakujący przewód masy to częsta przyczyna.
3. Nigdy nie zasilaj Raspberry Pi z portu TELEM. Zasilaj go osobno.

> **Port szeregowy Raspberry Pi**
>
> Instalator włącza UART Pi i usuwa konsolę szeregową z `cmdline.txt`. Na Pi 3, 4 lub Zero 2 W wyłącza też Bluetooth, aby pełny UART był wolny. Jeśli ponownie zainstalowałeś system po UAVcast-Pro, uruchom instalator jeszcze raz.

## Sprawdzenie 2: Dopasuj ustawienia portu na kontrolerze lotu

Na porcie TELEM kontroler lotu musi mówić protokołem MAVLink z prędkością, na której nasłuchuje UAVcast-Pro. Połączenia USB nie używają prędkości bodów.

1. Podłącz kontroler lotu do Mission Planner lub QGroundControl przez USB.
2. Otwórz pełną listę parametrów i znajdź port szeregowy, do którego podłączyłeś kabel: `SERIAL1` dla TELEM1, `SERIAL2` dla TELEM2.
3. Ustaw `SERIALx_PROTOCOL` na `2` (MAVLink2). Zapisz parametry i zrestartuj kontroler lotu.
4. Zapamiętaj `SERIALx_BAUD`. W UAVcast-Pro zostaw **Baud rate** na **Automatic** albo wybierz tę samą wartość.

Przy ustawieniu **Automatic** UAVcast-Pro próbuje prędkości 57600, 115200, 921600, 1500000, 460800, 230400 i 500000 bodów i zapamiętuje tę, która zadziałała. Podczas wyszukiwania status pokazuje *Trying … baud (n of 7)*.

> **Pozwól UAVcast-Pro wyszukać za ciebie**
>
> Naciśnij **Auto-detect**. Połączenie zostaje wstrzymane, program nasłuchuje na każdym porcie i przy każdej prędkości, a następnie zapisuje to, co znalazł. Może to potrwać do minuty. Jeśli pojawi się komunikat **No flight controller found**, otwórz **Show what was tried**, aby zobaczyć każdy port i prędkość, które zostały sprawdzone.

## Sprawdzenie 3: Uszkodzone dane

Jeśli **Readable flight controller data** pokazuje procent *damaged*, bajty docierają, ale są uszkodzone. Zwykle oznacza to luźny lub długi przewód, brak przewodu masy albo zakłócenia od silników i kabli zasilających.

- Dociśnij złącza i skróć kabel.
- Prowadź przewody sygnałowe z dala od przewodów ESC i baterii.
- Spróbuj niższej wartości `SERIALx_BAUD`, na przykład 57600 lub 115200.

## Sprawdzenie 4: Port zajęty

Lista **Port** oznacza porty, które trzyma inny program (*in use by …*). Zatrzymaj ten program, na przykład MAVProxy albo drugi router, który uruchomiłeś sam, lub wybierz inny port.

## Sprawdzenie 5: Czy łącze jest włączone?

Na górze strony **Link enabled** musi być włączone. Jeśli status mówi **Link stopped**, naciśnij **Połącz**. Ustawienia działają od razu, bez restartu.

## Nadal brak heartbeat?

[Pobierz logi](https://docs.uavmatrix.com/pl/troubleshooting/collect-logs/) z zaznaczonym **Mavlink Manager**. Dołączony plik `diagnostics.txt` zawiera listę urządzeń szeregowych, programy, które je trzymają, oraz zdarzenia USB i zasilania z jądra systemu. Tego właśnie potrzebuje pomoc techniczna przy problemach z łączem.

Gdy kontroler lotu pokaże **Połączono**, a stacja naziemna nadal czeka, przejdź do [Brak telemetrii w stacji naziemnej](https://docs.uavmatrix.com/pl/troubleshooting/no-telemetry-in-gcs/).

Powiązane: [Połączenie z kontrolerem lotu](https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/) · [Wymagania sprzętowe](https://docs.uavmatrix.com/pl/get-started/hardware-requirements/)

Source: https://docs.uavmatrix.com/pl/troubleshooting/no-mavlink-heartbeat/
