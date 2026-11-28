# Historia lotów

> Odtwórz zarejestrowany lot drona na mapie Fleet Manager, sprawdź czas trwania, maksymalną wysokość i prędkość, zapisz nazwane loty i ustaw czas przechowywania telemetrii.

Fleet Manager zapisuje telemetrię każdego drona raz na sekundę, gdy jest połączony: pozycję, wysokość, prędkość, kurs, baterię, tryb lotu, stan uzbrojenia i GPS. **Flight history** odtwarza ten zapis na mapie.

## Otwieranie historii drona

Na **Fleet Map** wybierz znacznik drona, a następnie **History** w wyskakującym okienku. Szuflada ***name* - Flight History** otworzy się na dole mapy.

![Szuflada historii lotów pod mapą z wyborem sesji, sterowaniem odtwarzaniem, statystykami i odtwarzaną trasą lotu](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/map--history.webp)

*Historia lotów drona inspekcyjnego: wybrany zapisany lot Turbine blade inspection, odtwarzanie 4x oraz Duration, Max Alt, Max Speed i Avg Battery.*

## Wybór sesji

**Select flight session** pokazuje:

1. najpierw **Saved flights** (z ikoną zakładki), czyli loty nazwane przez twój zespół.
2. Następnie jeden wpis na **dzień** z zapisaną telemetrią, z ostatnich 30 dni.

Dzień grupuje całą telemetrię z tej daty, więc kilka lotów z jednego dnia pojawia się jako jedna sesja. Zapisz interesujący cię fragment jako nazwany lot, aby szybko go odnaleźć.

## Odtwarzanie

- Odtwarzaj i wstrzymuj, cofaj lub przewijaj do przodu o 5 % sesji albo przeskakuj na początek lub koniec. Przeciągnij oś czasu, aby przewijać.
- Prędkości: **0.5x**, **1x** (czas rzeczywisty), **2x**, **4x**, **8x**, **10x** i **20x**.
- Klawiatura: **Space** odtwarzanie/pauza, **←** / **→** krok, **Esc** zamknij.

Na mapie zielony znacznik **Start** i czerwony **End** wyznaczają lot. Już odtworzona część jest rysowana na cyjanowo, pozostała przerywaną linią w kolorze szarym, a ikona drona z podpisem wysokości porusza się po trasie.

Panel statystyk pokazuje **Duration**, **Max Alt**, **Max Speed** i **Avg Battery**, a **Current Position** pokazuje **Alt**, **Speed**, **Heading** i **Mode** w punkcie odtwarzania.

## Zapisywanie, zmiana nazwy i usuwanie lotów

Owner i Admin mogą zapisywać, zmieniać nazwę i usuwać nazwane loty. Viewer może je tylko odtwarzać.

- **Save and name this flight** zapisuje bieżący zakres czasu pod nazwą (do 100 znaków), na przykład „Survey over Field A”. Dwa zapisane loty nie mogą się nakładać: **A saved session already exists for this time range**.
- **Rename flight** zmienia nazwę.
- **Delete saved flight** usuwa tylko nazwę. **Delete Saved Flight?** wyjaśnia, że sama telemetria nie zostaje usunięta.

## Jak długo przechowywana jest historia

Owner i Admin ustawiają czas przechowywania dla organizacji w **Settings → History** (**Telemetry History**):

- **Retention:** 7, 14, 30, 60 lub 90 dni, **6 months** lub **1 year**. Domyślnie i maksymalnie jest 1 rok.
- **Prune Now** natychmiast usuwa dane starsze niż 7, 14, 30, 60 lub 90 dni (domyślnie 30), po potwierdzeniu **Prune Old History**.
- **Delete Drone History** (ikona kosza przy każdym dronie) lub **Select All** → **Delete Selected (n)** czyści historię wybranych dronów.
- Karty pokazują **Storage Used**, **Total Records** i **Retention**.

Fleet Manager raz dziennie usuwa dane po upływie okresu przechowywania. Starsze dane są kompresowane po 7 dniach, dzięki czemu roczna historia dla dużej floty pozostaje praktyczna.

![Karta Settings History z wyborem przechowywania, opcjami czyszczenia i listą historii dla każdego drona](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/settings--history.webp)

*Settings → History dla organizacji z 46 dronami: Storage Used, Total Records, Retention 90 days oraz lista dronów z przyciskami Delete.*

> **Brak eksportu logów**
>
> Fleet Manager nie eksportuje historii lotów do pliku i nie przechowuje wideo ani logów kontrolera lotu (`.tlog`, DataFlash). Zachowaj je w oprogramowaniu stacji naziemnej lub na karcie SD kontrolera lotu. Informacje o nagraniach wideo na dronie znajdziesz w [Nagrania i przegląd lotu](https://docs.uavmatrix.com/pl/guides/recording-flight-review/).

Usunięcie drona kasuje całą jego historię, łącznie z zapisanymi lotami. Zobacz [Usuwanie lub przenoszenie drona](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remove-or-transfer/).

Source: https://docs.uavmatrix.com/pl/fleet-manager/map/flight-history/
