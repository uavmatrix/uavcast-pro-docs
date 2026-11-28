# Nagrania i przegląd lotu

> Nagrywaj wideo z kamery i telemetrię MAVLink na dronie za pomocą UAVcast-Pro, automatycznie po uzbrojeniu, na kartę SD lub dysk SSD USB, i analizuj loty z wideo, mapą i danymi.

UAVcast-Pro nagrywa każdy lot na samym dronie: wideo z kamery i dziennik telemetrii MAVLink (`.tlog`). Nagrywanie korzysta z już zakodowanego strumienia, więc nie kosztuje dodatkowego procesora i nigdy nie przerywa wideo na żywo do stacji naziemnej. Ponieważ pliki są zapisywane na dronie, uzyskujesz wideo w pełnej jakości nawet wtedy, gdy łącze komórkowe zostanie przerwane. Nagrywanie rozpoczyna się automatycznie po uzbrojeniu albo ręcznie z Mapy Lotu. Wymaga wersji v6.5.1 lub nowszej.

Otwórz **Kamera → Nagrania**. Strona ma dwie zakładki: **Biblioteka** i **Ustawienia**.

![Biblioteka nagrań z paskiem pamięci i dwoma nagranymi lotami z czasem trwania oraz znacznikami CAM 1 i Telemetria](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/camera--recordings.webp)

*Kamera → Nagrania → Biblioteka z dwoma nagranymi lotami.*

## Nagrywanie automatyczne po uzbrojeniu

Ta opcja jest domyślnie włączona. Nagrywanie rozpoczyna się po uzbrojeniu silników i zatrzymuje po ich rozbrojeniu. Jeśli łącze zostanie przerwane w locie, nagrywanie trwa dalej.

Zanim na tym polegasz:

- Sprawdź wolne miejsce w **Miejsce na nagrania** na Mapie Lotu lub w **Ustawieniach**.
- Nagrywanie nie wymaga **Włączyć Podglądu na Żywo?**. Przy włączonym nagrywaniu kamera zachowuje kopię strumienia we wbudowanym serwerze mediów, nawet gdy podgląd jest wyłączony.

## Nagrywanie ręczne

Górny pasek Mapy Lotu ma grupę **Nagrywanie**: **CAM 1** (a przy podwójnym strumieniu także **CAM 2**) do uruchamiania i zatrzymywania wideo oraz **Telemetry** do uruchamiania i zatrzymywania logu telemetrii. Czerwona kropka pokazuje, co się nagrywa. Użytkownicy tylko do odczytu nie mogą rozpoczynać nagrań.

## Ustawienia pamięci

Otwórz **Kamera → Nagrania → Ustawienia**.

| Ustawienie | Domyślnie | Wartości | Uwagi |
| --- | --- | --- | --- |
| **Miejsce zapisu** | **Pamięć wewnętrzna** | Pamięć wewnętrzna, wykryty dysk USB lub SSD, **Lub inny folder** | Podłącz dysk i wybierz **Wyszukaj dyski ponownie**, aby go zobaczyć. Pamięć wewnętrzna to `/opt/uavcast-pro/recordings/video`. |
| **Zostaw wolne** | `2` GB | 0,5–1000 GB | Nagrywanie nigdy nie zapełni dysku powyżej tej wartości. System też potrzebuje miejsca. |
| **Usuwaj najstarsze nagrania, gdy brakuje miejsca** | Włączone | Włączone, wyłączone | Jak w kamerze samochodowej: nagrywanie nigdy nie zatrzymuje się z powodu braku miejsca. Po wyłączeniu nagrywanie zostaje zatrzymane. |
| **Usuwaj nagrania starsze niż** | `0` dni | 0–3650 dni | `0` zachowuje nagrania, dopóki miejsce nie będzie potrzebne. |
| **Nagrywaj automatycznie po uzbrojeniu** | Włączone | Włączone, wyłączone |  |
| **Nagrywaj kamerę 1** | Włączone | Włączone, wyłączone | Dotyczy nagrywania automatycznego. |
| **Nagrywaj kamerę 2** | Włączone | Włączone, wyłączone | Tylko gdy włączony jest podwójny strumień. |
| **Długość pliku** | `1` min | 1–30 min | Wideo jest zapisywane w kawałkach o tej długości. Krótsze kawałki tracą mniej danych po odcięciu zasilania. |
| **Zapisuj telemetrię** | **Gdy uzbrojony** | **Gdy uzbrojony**, **Zawsze, gdy połączony**, **Wyłączone** | Plik `.tlog` pokazywany obok wideo. **Zawsze** loguje również na ziemi i tworzy nowy plik przy każdym uzbrojeniu, rozbrojeniu i co godzinę. |

![Ustawienia nagrywania z wybraną pamięcią wewnętrzną, zostaw wolne 2 GB, włączonym usuwaniem najstarszych nagrań i nagrywaniem automatycznym po uzbrojeniu](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/camera--recordings-settings.webp)

*Wybrana pamięć wewnętrzna, z włączonym nagrywaniem automatycznym po uzbrojeniu.*

> **Nagrywaj na dysk SSD USB**
>
> Dysk SSD USB 3 jest szybszy i znacznie trwalszy niż karta microSD przy ciągłym zapisie wideo. Podłącz go, wybierz **Wyszukaj dyski ponownie**, a następnie wybierz go w **Miejsce zapisu**.

## Pliki i formaty

- Wideo jest zapisywane jako fragmentaryczne segmenty MP4, które pozostają odtwarzalne po odcięciu zasilania w trakcie lotu. Pobierane pliki są w formacie MP4.
- Telemetria to standardowy plik MAVLink `.tlog`, czytelny w Mission Planner, MAVExplorer, UAV Log Viewer i w [Analityce Lotu](https://docs.uavmatrix.com/pl/uavcast-pro/flight-map/flight-analytics/).
- Nagranie w bibliotece to jeden klip, o ile jego pliki następują po sobie bez przerwy dłuższej niż 15 sekund.

## Przegląd lotu

Wybierz **Odtwórz** przy nagraniu, aby otworzyć **Przegląd lotu**: wideo, ścieżkę na mapie, widok z kokpitu i dane lotu na jednej osi czasu.

- Oś czasu zaznacza **Uzbrojony**, **Rozbrojony** i zmiany trybu lotu.
- **Cofnij 10 sekund**, **Odtwórz** / **Wstrzymaj**, **Przewiń 10 sekund** oraz **Prędkość odtwarzania** (od 0,5× do 4×).
- Przy dwóch kamerach **Zmień układ wideo** przełącza między **Obraz w obrazie** a **Obok siebie**; **Pokaż tę kamerę na dużym ekranie** zamienia je miejscami.
- Panel danych pokazuje **Wysokość**, **Prędkość**, **Bateria**, **Satelity** i **Tryb** w bieżącym momencie.
- **Pobierz** zapisuje klip jako MP4.

![Odtwarzacz Przeglądu lotu z obszarem wideo, ścieżką na mapie, widokiem z kokpitu i osią czasu z przyciskami odtwarzania](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/camera--flight-review.webp)

*Przegląd lotu: wideo, mapa, kokpit i telemetria na jednej osi czasu.*

Jeśli odtwarzacz pokazuje komunikat *Brak logu telemetrii dla tego nagrania*, telemetria nie była nagrywana w tym czasie (domyślnie zapisuje się tylko podczas uzbrojenia).

## Usuwanie nagrań

Wybierz **Usuń** przy nagraniu. Jeśli ma ono log telemetrii, wybierz **Usuń tylko wideo** lub **Usuń wideo i telemetrię**. Usuwanie jest trwałe. Nagranie, które wciąż trwa, trzeba najpierw zatrzymać.

Source: https://docs.uavmatrix.com/pl/uavcast-pro/camera/recordings/
