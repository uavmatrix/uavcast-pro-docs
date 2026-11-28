# Mapa Lotu

> Śledź dron na żywo w Mapie Lotu UAVcast-Pro dzięki kokpitowemu HUD, oknom wideo, uzbrajaniu i rozbrajaniu, trybom lotu, RTL, loiter, failsafe GCS i komunikatom kontrolera lotu.

Mapa Lotu to stacja naziemna działająca w przeglądarce, wbudowana w UAVcast-Pro. Pokazuje dron na mapie wraz z jego śladem, aktywną misją i pozycją domową, kokpitowym HUD, wideo na żywo oraz komunikatami kontrolera lotu. Możesz uzbroić i rozbroić dron, zmienić tryb lotu, uruchomić misję oraz wywołać RTL lub loiter, a wszystkie polecenia są potwierdzane w oknach dialogowych. Otwórz **Mapa Lotu → Widok mapy**.

Mapa służy do monitorowania i wydawania prostych poleceń z dowolnego telefonu, tabletu lub laptopa. Do pełnego planowania misji i pracy z parametrami nadal używaj Mission Planner lub QGroundControl.

![Mapa Lotu z mapą, kokpitowym HUD po prawej stronie i zakładką Status z kartami: link, bateria, kontroler lotu, telemetria, GPS i postawa](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/flight-map.webp)

*Mapa Lotu → Widok mapy na zestawie testowym bez sygnału GPS, więc mapa nie pokazuje pozycji drona.*

## Układ

- **Map** (po lewej): dron z kursem, śladem, znacznikiem pozycji domowej i misją. **Sats** pokazuje liczbę satelitów, a **Auto-Pan** utrzymuje dron na środku. Warstwy przełączysz przyciskiem warstw (**Street Map**, **Satellite** i inne). Jeśli dron nie ma pozycji, zobaczysz **No GPS Lock**: *Wymagane co najmniej 4 satelity*.
- **Pasek górny**: przyciski nagrywania (**Telemetria**, **CAM 1**, **CAM 2**), wolne miejsce na nagrania, częstotliwość aktualizacji telemetrii (od **1 Hz** do **10 Hz**), bieżąca szybkość danych oraz przycisk, który otwiera mapę w osobnym oknie.
- **Kokpit** (po prawej): wskaźnik postawy HUD z taśmami prędkości i wysokości, bieżący tryb lotu, stan uzbrojenia, napięcie baterii oraz ostatni komunikat przedlotowy.
- **Karty boczne**: **Status**, **Gauge**, **Actions**, **Komunikaty** i **Nagrania**. Przeciągnij krawędź panelu, aby zmienić jego rozmiar; dwukrotne kliknięcie uchwytu przywraca domyślny rozmiar.
- **Okna wideo**: jedno na każdy aktywny strumień kamery. Możesz je przeciągać, maksymalizować, minimalizować lub ukrywać; ukryte okna są dokowane jako karty na dole mapy.

Pasek górny na każdej stronie pokazuje też **FC Connected**, **Armed**/**Disarmed**, typ pojazdu, tryb lotu oraz **GCS Failsafe Enabled** lub **GCS Failsafe Disabled**.

## Uzbrajanie i rozbrajanie

1. Otwórz kartę **Actions** lub użyj przełącznika uzbrojenia pod kokpitem.
2. Wybierz **Uzbrój**. Okno ostrzega: *Śmigła mogą zacząć się obracać. Upewnij się, że nikt nie znajduje się w pobliżu drona, a obszar wokół niego jest wolny.*
3. Potwierdź przyciskiem **Uzbrój**.

Decyzję nadal podejmuje wbudowana kontrola wstępna kontrolera lotu. Jeśli odmówi uzbrojenia, zobaczysz: *Dron odmówił uzbrojenia. Sprawdź komunikat PreArm na ekranie.* Powód pojawi się pod kokpitem i w **Komunikatach**.

**Rozbrój** natychmiast zatrzymuje silniki. Kontroler lotu odmawia tego polecenia, gdy dron leci.

## Zmiana trybu lotu

Wybierz tryb z kontrolki trybu lotu. Lista odpowiada typowi pojazdu (Copter, Plane, Rover, Sub) i jest pogrupowana na **Safe Modes** (podtrzymanie pozycji i stabilizacja), **Navigation** (tryby autonomiczne) oraz **Advanced** (tryby ręczne i awaryjne). Tryby o wyższym ryzyku są oznaczone ikoną ostrzeżenia i przed wysłaniem polecenia wymagają potwierdzenia.

## Karta Actions

| Grupa | Przyciski | Co się dzieje |
| --- | --- | --- |
| **Mission** | **Odczytaj**, **Ukryj**, **Start**, **Wyczyść** | **Odczytaj** wczytuje misję z kontrolera lotu na mapę. **Start** uruchamia ją (po potwierdzeniu). **Wyczyść** usuwa misję z kontrolera lotu i czeka na jego potwierdzenie. |
| **Tryby** | **Loiter Unl**, **RTL** | Szybka zmiana trybów. |
| **Przed Lotem** | **Kalibracja Przed Lotem**, **Wczytaj Misję**, **Wyczyść Misję** | Kalibracja uruchamia kalibrację naziemną kontrolera lotu (żyroskop, barometr). Tylko na ziemi. |
| **Polecenia Awaryjne** | **Powrót Do Startu**, **Nieograniczony Loiter** | Wymagają potwierdzenia. RTL wraca i ląduje lub krąży zgodnie z ustawieniami kontrolera lotu. Nieograniczony Loiter krąży nad bieżącą pozycją. |
| **Failsafe** | przełącznik **Failsafe GCS** | Zapisuje `FS_GCS_ENABLE` (Copter) i `FS_GCS_ENABL` (Plane) w kontrolerze lotu. |

> **Włącz failsafe GCS przy lotach przez modem komórkowy**
>
> Failsafe GCS uruchamia się, gdy kontroler lotu przestaje otrzymywać heartbeaty MAVLink ze stacji naziemnej. Przez 4G/LTE łącze może zostać przerwane w dowolnym momencie. Zanim na nim polegasz, skonfiguruj w stacji naziemnej, co robi failsafe (działanie `FS_GCS_ENABLE`, `FS_GCS_TIMEOUT`).

Użytkownicy z uprawnieniem tylko do odczytu widzą kartę Actions, ale nie mogą z niej korzystać (*Użytkownicy tylko do odczytu nie mogą sterować dronem*).

## Komunikaty

**Komunikaty** to lista wszystkich wiadomości tekstowych z kontrolera lotu. **Aktywne alarmy** (Active alerts) pokazują bieżące problemy, na przykład błędy kontroli wstępnej, osobno od **Dziennika komunikatów** (Message log). Włącz **Problems only**, aby ukryć rutynowe komunikaty, oraz **Clear the log**, aby zacząć od nowa. Karta pokazuje odznakę z liczbą aktywnych alarmów.

## Zakładki Status i Gauge

- **Status**: karty **LINK** (utrata pakietów, połączenie), **FLIGHT CONTROLLER** (uzbrojenie, tryb, pojazd), szybkość danych telemetrii, pozycja, **GPS** (fix, satelity, **ALTITUDE (AGL)**, **ALTITUDE (AMSL)**) oraz **BATTERY**.
- **Gauge**: okrągłe przyrządy pomiarowe z tymi samymi danymi.

AGL to wysokość nad punktem startu, a AMSL to wysokość nad poziomem morza.

## Ustawienia mapy

| Ustawienie | Co robi |
| --- | --- |
| **Auto-Pan** | Utrzymuje dron na środku mapy. |
| **Show Aircraft Heading** | Rysuje linię kursu od drona. |
| **Trail Length** | Liczba punktów zachowanych w śladzie lotu. |
| **Trail Color** | Kolor śladu. **Clear Trail Path** usuwa ślad. |
| **Show Distance from Home** | Pokazuje odległość do znacznika startu. |
| **Reset to Defaults** | Przywraca wszystkie ustawienia mapy. |

## Okna w osobnych oknach

- **Flight map window**: przycisk po prawej stronie paska górnego otwiera samą mapę w nowym oknie (`/flightmapwindow`), dopasowanym do drugiego monitora.
- **HUD window**: z kokpitu otwórz HUD w osobnym oknie (`/hud`).

![Kokpitowy HUD ze wskaźnikiem postawy, taśmami prędkości i wysokości, kursem i trybem lotu](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/hud.webp)

*Kokpitowy HUD pod adresem /hud. Horyzont jest tu odwrócony, ponieważ kontroler lotu na tym zestawie testowym jest zamontowany do góry nogami.*

## Częstotliwość aktualizacji telemetrii

Selektor w pasku górnym (**1 Hz**, **2 Hz**, **5 Hz**, **10 Hz**) określa, jak często UAVcast-Pro wysyła telemetrię do przeglądarki. Nie zmienia to tego, co odbierają twoje stacje naziemne. Na wolnym połączeniu z interfejsem webowym użyj niskiej częstotliwości.

## Powiązane

- [Karta Planer Misji](https://docs.uavmatrix.com/pl/uavcast-pro/flight-map/mission-planner/)
- [Radio (kanały RC)](https://docs.uavmatrix.com/pl/uavcast-pro/flight-map/radio/)
- [Inspektor MAVLink](https://docs.uavmatrix.com/pl/uavcast-pro/flight-map/inspector/)
- [Analityka Lotu](https://docs.uavmatrix.com/pl/uavcast-pro/flight-map/flight-analytics/)
- [Nagrania i przegląd lotu](https://docs.uavmatrix.com/pl/uavcast-pro/camera/recordings/)

Source: https://docs.uavmatrix.com/pl/uavcast-pro/flight-map/
