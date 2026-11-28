# Panel Główny

> Przegląd panelu Fleet Manager - łączna i online liczba dronów, wielkość zespołu, lista statusów dronów, lista Getting Started i dziennik ostatnich aktywności.

**Dashboard** to pierwsza strona po zalogowaniu. Odpowiada na trzy pytania: ile dronów jest teraz online, które to są i co zespół ostatnio zmienił.

![Panel Fleet Manager z czterema kartami statystyk, listą UAV Status i sekcją Recent Activity](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/dashboard.webp)

*Dashboard: cztery karty statystyk, UAV Status z baterią i GPS dla każdego drona oraz Recent Activity z działaniami zespołu.*

## Karty statystyk

| Karta | Pokazuje |
| --- | --- |
| **Total UAVs** | Drony sparowane z otwartą organizacją (*In this organization*). |
| **Online** | Drony w tej organizacji połączone w tej chwili, od których odebrano dane w ciągu ostatnich 20 sekund (*Currently connected*). |
| **Organizations** | Organizacje, których jesteś członkiem. |
| **Team Members** | Członkowie otwartej organizacji. |

Aby zobaczyć liczby innej organizacji, przełącz ją w panelu bocznym.

## UAV Status

Lista ostatnio widzianych dronów ze statusem, baterią i czasem ostatniego kontaktu. Wybierz drona, aby otworzyć jego [stronę UAV](https://docs.uavmatrix.com/pl/fleet-manager/fleet/uav-details/), albo **View All**, aby przejść do [Fleet](https://docs.uavmatrix.com/pl/fleet-manager/fleet/).

## Getting Started

Nowe organizacje widzą dwuetapową listę kontrolną, dopóki oba kroki nie zostaną wykonane:

1. **Create or Join an Organization** (**Go to Team**)
2. **Pair a UAV (UAVcast)** (**Pair Device**), ukończony, gdy organizacja ma co najmniej jednego drona

Przy drugim kroku postępuj zgodnie z [Dodaj pierwszego drona](https://docs.uavmatrix.com/pl/fleet-manager/pair-uav/).

## Recent Activity

Ostatnie 10 zdarzeń w twojej organizacji wraz z informacją, kto je wykonał. Fleet Manager zapisuje m.in.:

- sparowanie, ponowne sparowanie i usunięcie dronów
- utworzenie i usunięcie powiązań strumieni, przypisanie stacji naziemnych
- zaproszenia i usunięcia członków, zmiany ról, przekazania własności
- włączenie lub wyłączenie VPN

Dziennik aktywności jest zachowywany po usunięciu drona lub członka, więc nadal widzisz, kto co zrobił.

Source: https://docs.uavmatrix.com/pl/fleet-manager/dashboard/
