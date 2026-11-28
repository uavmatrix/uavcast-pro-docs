# Flota

> Strona Fleet wyświetla każdy UAV w twojej organizacji z aktualnym statusem, baterią i czasem ostatniego kontaktu. Tutaj parujesz drony i otwierasz sterowanie.

**Fleet** (w panelu bocznym **Fleet Management → Fleet**) wyświetla każdy UAV w wybranej organizacji. Aktualizuje się na żywo, więc możesz zostawić ją otwartą na ekranie w centrum sterowania, obok [mapy](https://docs.uavmatrix.com/pl/fleet-manager/map/).

![Strona Fleet z siatką kart UAV pokazujących status online i offline, baterię oraz czas ostatniego kontaktu](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/fleet.webp)

*Strona Fleet z dronami (46): karty ONLINE z poziomami baterii oraz przyciemnione karty OFFLINE z czasami Last seen.*

## Karty UAV

Nagłówek pokazuje **UAVs (n)**. Każda karta zawiera:

- **Nazwę** i odznakę statusu: **ONLINE**, **OFFLINE** lub **PAIRING**.
- **Baterię** w procentach. Staje się żółta poniżej 50 %, a czerwona poniżej 20 %.
- **Last seen**, czyli czas względny. Karty offline są przyciemnione.
- **Re-pair required**, gdy dron musi zostać ponownie sparowany (zobacz [Ponowne parowanie drona](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone)).

Dron jest uznawany za offline po **20 sekundach** bez wiadomości od UAVcast-Pro, który wysyła heartbeat co 5 sekund.

Dwa przyciski na każdej karcie:

- **Operations** otwiera [panel sterowania](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remote-control/): tryby lotu, uzbrajanie i rozbrajanie, misje.
- **Details** otwiera [stronę UAV](https://docs.uavmatrix.com/pl/fleet-manager/fleet/uav-details/): telemetria na żywo, terminal, logi, akcje systemowe, zmiana nazwy i usuwanie.

## Przyciski na stronie

- **Pair Device** uruchamia [kreator parowania](https://docs.uavmatrix.com/pl/fleet-manager/pair-uav/). Tylko dla Owner i Admin.
- **Refresh** przeładowuje listę.
- **Need more devices?** → **View Plans** otwiera sklep UAVmatrix, w którym kupisz więcej licencji UAVcast-Pro. Zobacz [Licencje](https://docs.uavmatrix.com/pl/fleet-manager/licenses/).

## Baner ponownego parowania

Gdy jeden lub więcej dronów używa starszego certyfikatu połączenia, baner na górze pokazuje **n UAV(s) must be re-paired**. Ponownie sparuj każdego wymienionego drona raz. Zachowa on swoją nazwę i historię. Zobacz [Ponowne parowanie drona](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone).

![Strona Fleet z banerem ponownego parowania i odznakami Re-pair required na dwóch kartach](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/fleet--repair-required.webp)

*Strona Fleet z banerem 2 UAVs must be re-paired oraz odznaką Re-pair required na dwóch dotkniętych kartach.*

## Wskazówki dla dużych flot

- **Nazywaj drony z myślą o mapie.** Nazwy pojawiają się na etykietach mapy i na listach powiązań. Numer rejestracyjny lub rola („Inspection-07”) są lepsze niż domyślna nazwa hosta. Zmień nazwę na stronie UAV.
- **Nadaj każdemu dronowi własny kolor.** Fleet Manager automatycznie przydziela kolory z palety 24 kolorów. Dla dronów, które twój zespół ma rozpoznawać na pierwszy rzut oka, ustaw stały kolor w panelu sterowania (**Change map color**).
- **Używaj organizacji do rozdzielania klientów.** Drony należą dokładnie do jednej organizacji. Jeśli obsługujesz kilku klientów, z których każdy ma widzieć tylko swoje drony, daj każdemu z nich osobną organizację.

Source: https://docs.uavmatrix.com/pl/fleet-manager/fleet/
