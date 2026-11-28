# Panel Główny

> Sprawdź w Panelu Głównym UAVcast-Pro kontroler lotu, GPS, baterię, łącze ze stacją naziemną, LTE, VPN, RTK, wideo oraz zasilanie, temperaturę i ograniczanie wydajności (throttling) Raspberry Pi.

Panel Główny to lista kontrolna przed lotem dla komputera towarzyszącego. Jedna karta statusu pokazuje, czy kontroler lotu, GPS, bateria, łącze ze stacją naziemną, modem, VPN, RTK, wideo i zasilanie działają prawidłowo, z podsumowaniem w rodzaju *All systems normal* albo *2 problems*. Poniżej znajdują się informacje o systemie, ruch sieciowy, pamięć i pamięć masowa. Otwórz **Panel Główny** w pasku bocznym.

![Panel Główny UAVcast-Pro z kartą statusu pokazującą 2 problemy, informacjami o systemie z temperaturą i wykresem ruchu sieciowego](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/dashboard.webp)

*Panel Główny na stanowisku testowym: dwa problemy (brak pozycji GPS, VPN nie połączony), informacje o systemie i ruch sieciowy.*

## Karta statusu

Karta ma trzy grupy. Każdy wiersz ma kolorową kropkę: zielona oznacza, że wszystko jest w porządku, bursztynowa ostrzeżenie, a czerwona problem.

| Wiersz | Przykładowe wartości | Co zrobić, gdy nie jest zielone |
| --- | --- | --- |
| **Flight controller** | *Armed*, *Disarmed*, *Link stopped*, *Connecting…* | Zobacz [Kontroler lotu](https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/). |
| **GPS** | *3D fix · 14 satellites*, *RTK fixed*, *No fix*, *No GPS* | Poczekaj na fix na zewnątrz albo sprawdź okablowanie GPS. |
| **Battery** | napięcie i procent | Naładuj baterię albo sprawdź konfigurację monitora baterii w kontrolerze lotu. |
| **Ground station** | *Sending to 2 · 16 packets/s*, *Not sending*, *1 set up · waiting for flight controller*, *None set up* | Zobacz [Stacje naziemne](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/). |
| **Cellular** | operator i sygnał, *No modem detected* | Zobacz [Modem komórkowy](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/cellular-modem/). |
| **VPN** | *Connected*, *Not connected*, *Turned off* | Zobacz [VPN](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/vpn/). |
| **RTK corrections** | *Connecting…*, *Error - check settings*, *Turned off* | Zobacz [NTRIP / RTK](https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/ntrip-rtk/). |
| **Video** | *Running*, *Stopped*, *Turned off* | Zobacz [Kamera](https://docs.uavmatrix.com/pl/uavcast-pro/camera/). |
| **Dynamic DNS** | *Running*, *Turned off* | Zobacz [Dynamiczny DNS](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/dynamic-dns/). |
| **Power supply** | *Stable*, *Voltage too low - use a stronger power supply*, *Slowed down (heat or power)*, *Voltage dropped since start-up* | Zobacz [Zasilanie](https://docs.uavmatrix.com/pl/uavcast-pro/dashboard/#power-and-temperature). |

*Service failed - restarting* w dowolnym wierszu oznacza, że usługa uległa awarii i jest automatycznie uruchamiana ponownie. Jeśli komunikat wraca, pobierz logi z **Aplikacja → Logowanie**.

## Zasilanie i temperatura

Na Raspberry Pi **Informacje o Systemie** pokazuje **Power**, **CPU throttling** i **Temperature**:

- **Voltage too low - use a stronger power supply**: Pi w tej chwili ma za niskie napięcie. Powoduje to resety USB, więc modem albo kontroler lotu mogą się rozłączyć. Napraw zasilanie przed lotem.
- **Voltage dropped since start-up**: do spadku doszło w pewnym momencie od uruchomienia. Często powodują go szczyty poboru przez modem przy nadawaniu.
- **Slowed down (heat or power)**: procesor jest ograniczany. Kodowanie wideo cierpi najpierw. Dodaj radiator lub przepływ powietrza albo napraw zasilanie.

Pasek temperatury robi się czerwony, gdy Pi zbliża się do progu ograniczania wydajności.

## Pozostałe karty

| Karta | Pokazuje |
| --- | --- |
| **Informacje o Systemie** | **Operating System**, **Hardware** (procesor i rdzenie), **Uptime**, zasilanie i **Temperature**. |
| **Ruch Sieciowy** | Sumy odebranych i wysłanych danych oraz prędkości dla każdego interfejsu. Wybierz od **Ostatnie 50** do **Ostatnie 1000** próbek. Przydatne do sprawdzenia, ile transmisji wideo zużywa na modemie. |
| **Użycie Pamięci** | **Total**, **Used** i **Free**. Dane są zbierane co 10 sekund. |
| **Pamięć Masowa** | **Total**, **Used** i **Free** dla każdej partycji. |

Wykresy potrzebują kilku minut danych po starcie, zanim coś pokażą.

## Przewodnik

Przy pierwszym otwarciu interfejsu WWW przewodnik proponuje przejście przez najważniejsze strony. Możesz kliknąć **Pomiń** albo wybrać **Nigdy więcej nie pokazuj**. Uruchom go ponownie w **Aplikacja → Ustawienia → Rozpocznij Tour**.

Szczegóły dotyczące problemów z zasilaniem: [Niedonapięcie i throttling](https://docs.uavmatrix.com/pl/troubleshooting/undervoltage-and-throttling/).

Source: https://docs.uavmatrix.com/pl/uavcast-pro/dashboard/
