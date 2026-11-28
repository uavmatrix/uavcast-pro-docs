# Strumienie Danych

> Twórz tablice Strumieni Danych w UAVcast-Pro z wykresami, wskaźnikami i kafelkami dla dowolnego pola MAVLink albo czujnika NAMED_VALUE_FLOAT, z progami, historią i importem oraz eksportem JSON.

Strumienie Danych pozwalają budować własne tablice telemetrii na żywo. Dodawaj kafelki liczbowe, wykresy liniowe, wskaźniki, słupki i lampki statusu, a każdy z nich przypisz do dowolnej wartości MAVLink wysyłanej przez kontroler lotu albo do sygnału `NAMED_VALUE_FLOAT` z czujnika lub [wstrzykiwacza](https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/injectors/). Tablice są zapisywane na dronie, więc każdy, kto otworzy interfejs WWW, widzi te same tablice. Otwórz **Strumienie Danych** w pasku bocznym.

Typowe zastosowania: ekran operatora ładunku z odczytami czujników, panel łącza LTE z RSRP i SINR albo tablica baterii i zasilania na długie loty.

![Strona Strumienie Danych przed utworzeniem pierwszej tablicy, z przyciskiem Utwórz tablicę](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/mission-data.webp)

*Strumienie Danych przed pierwszą tablicą: przycisk **Utwórz tablicę** tworzy ją.*

## Tworzenie tablicy

1. Wybierz **Utwórz tablicę** (albo **Nowa tablica**, jeśli masz już jakąś), podaj jej **Nazwę** i wybierz **Utwórz**.
2. Wybierz **Edytuj**, aby przejść do trybu edycji, następnie **Dodaj widżet** i wybierz typ.
3. Na karcie **Źródło** wyszukaj sygnał i go wybierz. Zielona kropka oznacza, że próbki docierają.
4. Ustaw tytuł, jednostki i miejsca dziesiętne na karcie **Wyświetlanie**, limity i progi kolorów na karcie **Zakres**, a opcje wykresu na karcie **Wykres**. Wybierz **Zapisz**.
5. Przeciągaj i zmieniaj rozmiar widżetów, a następnie wybierz **Gotowe**.

Tablice może tworzyć i edytować tylko administrator. Użytkownicy tylko do odczytu mogą je przeglądać.

## Typy widżetów

| Typ | Pokazuje |
| --- | --- |
| **Kafelek liczbowy** | Bieżącą wartość, dużą, z opcjonalnym prefiksem i sufiksem. |
| **Sparkline** | Mały wykres trendu pod wartością. |
| **Wykres liniowy** | Jeden lub więcej sygnałów w wybranym oknie czasu. |
| **Wskaźnik** | Wartość na okrągłej skali z kolorowymi progami. |
| **Wskaźnik słupkowy** | Wartość jako słupek między minimum a maksimum. |
| **Status** | Kolorowy stan wynikający z progów, na przykład OK / ostrzeżenie / alarm. |
| **Tabela wartości nazwanych** | Każdy sygnał `NAMED_VALUE_FLOAT` z kolumnami **Value**, **Age** i **Src**. **Filter** przyjmuje fragment nazwy albo wzorzec `*.glob`. |

Widżet pokazuje **Stale**, gdy przez 5 sekund nie dotarła żadna próbka, oraz *No samples yet*, gdy sygnał nigdy nie został odebrany.

## Sygnały

- **Pola MAVLink**: każde pole numeryczne wysyłane przez kontroler lotu (orientacja, VFR HUD, bateria, GPS, pozycja startowa, RTK, failsafe, heartbeat i wartości statusu) pojawia się automatycznie, z przyjaznymi nazwami i jednostkami tam, gdzie są znane.
- **Wartości nazwane**: sygnały `NAMED_VALUE_FLOAT` pokazywane jako `NAZWA@sysid:compid`, na przykład `LTE_RSRP@1:194`.

Możesz wpisać sygnał, który jeszcze nie jest wysyłany, i nacisnąć Enter, aby go dodać. Dzięki temu tablicę można zbudować, zanim podłączysz czujnik. Użyj ikony ołówka przy wybranym źródle, aby nadać mu wyświetlaną nazwę.

## Opcje wykresu

| Opcja | Wartości |
| --- | --- |
| **Okno** | **1 min**, **5 min**, **15 min**, **1 godz.** albo **Własne (sekundy)** |
| **Krzywa** | **Liniowa**, **Wygładzona (monotoniczna)**, **Schodkowa**, **Schodkowa przed**, **Schodkowa po**, **Spline bazowy** |
| Inne | **Pokaż legendę**, **Pokaż siatkę**, **Grubość linii**, **Wypełnienie obszaru**, **Pokaż punkty danych**, **Linie referencyjne progów**, **Etykieta osi Y** |

## Historia

UAVcast-Pro przechowuje na dronie krótką historię każdego sygnału (do 3600 próbek na sygnał, czyli około godziny przy 1 Hz). Dzięki temu wykresy wypełniają się od razu po otwarciu tablicy, nawet po odświeżeniu strony.

## Udostępnianie tablic

- **Eksportuj JSON** kopiuje tablicę do schowka.
- **Importuj JSON** tworzy tablicę z wklejonego JSON. Użyj tego, aby skopiować tablicę na inny dron.
- **Duplikuj** i **Zmień nazwę** są na pasku narzędzi; **Usuń** usuwa tablicę wraz z jej widżetami.
- **Pełny ekran** ukrywa resztę interfejsu, z myślą o dedykowanym monitorze.

Source: https://docs.uavmatrix.com/pl/uavcast-pro/data-streams/
