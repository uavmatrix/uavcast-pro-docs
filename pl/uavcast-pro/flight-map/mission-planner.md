# Karta Planer Misji

> Zaplanuj misję punktów trasy w karcie Planer Misji UAVcast-Pro, ustaw ramkę wysokości i promień, zapisz ją jako plik .waypoints i wyślij do kontrolera lotu ArduPilot.

Karta Planer Misji pozwala zaplanować prostą misję punktów trasy w przeglądarce i wysłać ją do kontrolera lotu przez UAVcast-Pro, skądkolwiek jest dostępny interfejs webowy. Misje są zapisywane w tym samym formacie `.waypoints` (QGC WPL 110), którego używają Mission Planner i QGroundControl, więc możesz przenosić je między narzędziami. Otwórz **Mapa Lotu → Planer Misji**.

![Karta Planer Misji z mapą satelitarną, pustą tabelą punktów trasy i przyciskami Save, Load, Upload, Read i Clear](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/flight-map--mission-planner.webp)

*Mapa Lotu → Planer Misji przed dodaniem punktów trasy. Kliknij mapę, aby dodać punkt.*

## Planowanie misji

1. Kliknij mapę w miejscu, w którym ma być pierwszy punkt trasy. Za pierwszym razem **Set Default Values** poprosi o **Default Altitude (meters)**, **Waypoint Radius (meters)** i **Altitude Frame**. Wybierz **Continue**.
2. Klikaj dalej, aby dodawać punkty trasy. Przeciągnij znacznik, aby go przesunąć.
3. Dostosuj każdy punkt w tabeli: **Alt (m)**, **Frame** i **Radius (m)**. Usuń punkt w kolumnie **Action**.
4. Sprawdź **Punkty Trasy** i **Odległość**, aby zobaczyć łączną trasę.

| Ustawienie domyślne | Wartość | Opcje |
| --- | --- | --- |
| **Domyślna Wysokość (metry)** | `100` | dowolna |
| **Waypoint Radius (meters)** | `30` | dowolna |
| **Altitude Frame** | **Względny** | **Względny** (nad pozycją domową), **Bezwzględny** (nad poziomem morza), **Teren** (nad ziemią, wymaga danych terenowych w kontrolerze lotu) |

W tabeli ramki są skrócone do **Rel**, **Abs** i **Ter**. Punkty trasy są wysyłane jako `MAV_CMD_NAV_WAYPOINT`.

## Wysyłanie do kontrolera lotu

1. W sekcji **Kontroler Lotu** wybierz **Prześlij**.
2. Potwierdź **Prześlij Misję**. Okno ostrzega, że zastępuje ono misję w kontrolerze lotu.
3. Zobaczysz komunikat *Misja przesłana do kontrolera lotu*.

- **Odczytaj** pobiera misję zapisaną w kontrolerze lotu do planera.
- **Wyczyść** usuwa punkty trasy z planera.

Aby wykonać misję, użyj **Start** w karcie **Actions** na Mapie Lotu lub przełącz na AUTO z nadajnika albo stacji naziemnej.

## Zapisywanie i wczytywanie plików

W sekcji **Files**:

- **Zapisz** zapisuje misję jako `mission.waypoints`.
- **Wczytaj** otwiera plik `.waypoints` lub `.txt` w formacie QGC WPL, na przykład zapisany w Mission Planner.

## Ograniczenia

Ten planer obsługuje wyłącznie zwykłe punkty trasy. **Wczytaj** zachowuje pozycję, wysokość, ramkę i promień każdego wiersza, ale zamienia każdy wiersz w zwykły punkt trasy: polecenia startu, lądowania, loiter oraz polecenia DO (wyzwalanie kamery, serwo) nie są zachowywane, a polecenie bez pozycji staje się punktem trasy o współrzędnych 0, 0. Dla poleceń startu i lądowania, poleceń DO, siatek przeglądowych, ogrodzeń (fence) i punktów zbiórki (rally) planuj i wysyłaj misję bezpośrednio z Mission Planner lub QGroundControl.

Source: https://docs.uavmatrix.com/pl/uavcast-pro/flight-map/mission-planner/
