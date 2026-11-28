# Misje

> Rysuj misje punktów trasy na mapie, wybieraj polecenia MAVLink i układy odniesienia wysokości, zapisuj misje dla całej organizacji i przesyłaj je na dowolnego drona online.

**Missions** (w pasku bocznym **Fleet Management → Missions**) to planer punktów trasy działający w przeglądarce. Misje są zapisywane dla organizacji, więc każdy członek zespołu może je wczytać, a Owner lub Admin może przesłać je na dowolnego drona online.

![Mission Planner z wzorem skanowania punktami trasy narysowanym na mapie satelitarnej](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/missions.webp)

*Mission Planner w stylu Satellite z siatką 18 punktów trasy, Takeoff i Return to Launch oraz nagłówkiem pokazującym 18 waypoints i całkowity dystans.*

Viewer może otwierać i przeglądać zapisane misje. Zapisywanie, przesyłanie i usuwanie wymaga roli Owner lub Admin.

## Planowanie misji

1. Wybierz **Create New** (lub **Missions → New Mission**).
2. Kliknij mapę, aby dodać punkty trasy. Przeciągnij punkt trasy, aby go przesunąć. Podczas ustawiania **Next WP** pokazuje odległość od poprzedniego punktu (**Prev:**) i od startu (**Home:**).
3. Otwórz szufladę punktów trasy (**n Waypoints**), aby edytować każdy wiersz: **Command**, **Params**, **Alt**, **Frame** i **Radius**. Przeciągnij wiersze, aby zmienić ich kolejność. Wiersz **H** to start.
4. Ustaw **Defaults:** dla nowych punktów trasy na górze szuflady: **Alt** (domyślnie 50 m) i **WP Radius** (domyślnie 30 m).

![Szuflada punktów trasy z kolumnami: polecenie, parametry, współrzędne, wysokość, frame, promień i dystans](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/missions--waypoint-drawer.webp)

*Szuflada punktów trasy z Takeoff, kilkoma wierszami Waypoint, Change Speed i Return to Launch, z Frame ustawionym na Relative.*

### Układy odniesienia wysokości

| Frame | Wysokość mierzona od |
| --- | --- |
| **Relative** (domyślnie) | Pozycji startowej |
| **Absolute** | Poziomu morza |
| **Terrain** | Gruntu pod punktem trasy (wymaga danych terenowych w kontrolerze lotu) |

### Polecenia

Selektor **Command** można przeszukiwać i wyświetla polecenia misji MAVLink zrozumiałe dla ArduPilot, pogrupowane w:

- **Nawigacja:** Waypoint, Takeoff, Land, Return to Launch, Loiter Unlim, Loiter Turns, Loiter Time, Loiter to Alt, Spline Waypoint, Vtol Takeoff, Vtol Land, Payload Place, Delay i inne.
- **Warunki:** Delay, Change Alt, Distance, Yaw.
- **Polecenia Do:** Change Speed, Set ROI Location, Set Servo, Set Relay, Jump, Digicam Control, Set Cam Trigg Dist, Mount Control, Gripper, Parachute, VTOL Transition i inne.

Polecenia z parametrami (na przykład czas opóźnienia, liczba obrotów loiter, prędkość lub PWM serwa) mają edytowalne pola w **Params**.

Limity: wysokość od 0 do 10 000 m, promień od 1 do 1000 m, co najmniej jeden punkt trasy.

## Zapisywanie

Wybierz **Save**, wpisz **Name** (do 100 znaków) i opcjonalnie **Description**, a następnie potwierdź **Save Mission**. Nagłówek pokazuje **Unsaved**, gdy są zmiany; **Update Mission** je zapisuje. Otwieraj zapisane misje z **Missions → Saved Missions**.

## Przesyłanie na drona

1. Zapisz misję. Niezapisanej misji nie można przesłać (**Mission not saved**).
2. Wybierz **Upload to Drone**, wybierz UAV w sekcji **Select UAV** i potwierdź.
3. Poczekaj na potwierdzenie. Przesyłanie przerywa się po 30 sekundach, jeśli dron nie odpowie.

![Okno Upload Mission to Drone z listą dostępnych UAV online](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/missions--upload.webp)

*Okno Upload Mission to Drone z listą UAV online do wyboru.*

Aby ją wykonać, wybierz misję w [panelu sterowania](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remote-control/#mission) drona i wybierz **Start**. Jeśli misja na dronie różni się od wybranej, panel proponuje **Upload & Start**.

## Odczytywanie misji z drona

W sekcji **Missions → Read from Drone** wybierz drona online. Jego bieżąca misja zostanie wczytana do planera jako **Mission from *name***. Zapisz ją, aby zachować kopię, na przykład przed nadpisaniem.

> **Sprawdź misję w stacji naziemnej przed lotem**
>
> Fleet Manager przesyła dokładnie to, co zaplanowałeś. Przed lotem automatycznym sprawdź misję i failsafe pojazdu w QGroundControl lub Mission Planner, tak jak w przypadku każdego innego narzędzia do planowania.

Source: https://docs.uavmatrix.com/pl/fleet-manager/missions/
