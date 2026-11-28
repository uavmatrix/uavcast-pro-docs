# Widok Lite

> Widok Lite to ekran sterowania Fleet Manager w rozmiarze telefonu: lista floty, bieżący stan baterii, GPS i wysokość, tryby lotu oraz start, wstrzymanie i RTL misji.

**Lite Control** to wersja Fleet Manager przyjazna dla telefonu, przeznaczona do użytku w terenie: duże przyciski, tylko najważniejsze funkcje i aktualizacje na żywo przez transmisję danych w telefonie.

## Otwieranie widoku Lite

Na telefonie zaloguj się do Fleet Manager, otwórz menu i wybierz **Fleet → Lite View**. Możesz też przejść bezpośrednio pod adres `https://fleet-manager.uavmatrix.com/lite`. Dodaj go do ekranu głównego, aby mieć szybki dostęp jednym dotknięciem.

## Lista floty

Lista pokazuje każdego drona wraz ze statusem i baterią (pomarańczowa poniżej 40 %, czerwona poniżej 20 %), wskaźnik **Live updates active** oraz licznik **n online / n total**. Dotknij drona, aby otworzyć jego ekran sterowania.

![Lista floty w widoku Lite na telefonie z kilkoma dronami, statusem i baterią](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/lite.webp)

*Widok Lite na telefonie 390 × 844: lista floty z 33 online / 46 total, tryb lotu i bateria każdego drona.*

## Ekran drona

- Banery **Vehicle Armed** i **Failsafe Active**.
- Karty **Battery**, **GPS**, **Altitude** i **Speed**.
- **Device ID**, **Organization**, **Position** oraz **View Full Details** (otwiera pełną stronę UAV).

![Ekran drona w widoku Lite z banerem uzbrojenia, kartami statusu i przyciskami sterowania](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/lite--drone.webp)

*Widok Lite dla uzbrojonego drona w trybie AUTO: baner Vehicle Armed, karty Battery, GPS, Altitude i Speed oraz sterowanie trybem i misją.*

### Status bezpieczeństwa

Widok Lite pokazuje **ARMED** (*Motors active - exercise caution*) lub **DISARMED** (*Safe to approach*), ale nie ma przycisku uzbrajania ani rozbrajania: **Ze względów bezpieczeństwa uzbrajanie i rozbrajanie należy wykonywać przez stację naziemną (QGC, Mission Planner).**

### Tryb lotu (Owner and Admin)

**Quick Access** pokazuje tryby, których najczęściej używasz dla danego typu pojazdu, a **All Modes** pełną listę. Bezpieczne tryby przełączają się po prostym potwierdzeniu; tryby nawigacyjne i niebezpieczne pytają o **Change to *MODE*?** z silniejszym potwierdzeniem, tak jak w [panelu sterowania](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remote-control/#flight-mode).

### Sterowanie misją (Owner and Admin)

Dla misji już załadowanej na drona:

- **Start** / **Resume**, **Pause**, **RTL** i **Stop**, każdy z potwierdzeniem. Łaziki używają HOLD zamiast LOITER do wstrzymywania i zatrzymywania.
- **Jump to Waypoint**: wybierz numer przyciskami − i +, a następnie **Jump to WP n**. **Currently at waypoint n** pokazuje postęp.
- **Refresh Mission Data** ponownie wczytuje misję z drona.

Jeśli dron nie ma misji, zobaczysz **No Mission Loaded**. Najpierw prześlij misję z [Misji](https://docs.uavmatrix.com/pl/fleet-manager/missions/) na komputerze.

Source: https://docs.uavmatrix.com/pl/fleet-manager/lite-view/
