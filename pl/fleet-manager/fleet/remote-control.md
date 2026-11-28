# Zdalne sterowanie

> Zmieniaj tryby lotu, uzbrajaj lub rozbrajaj, uruchamiaj misje i kalibrację przed lotem z panelu sterowania UAV w Fleet Manager, z kontrolami bezpieczeństwa.

**UAV Control Panel** wysyła polecenia do kontrolera lotu przez UAVcast-Pro, szyfrowanym połączeniem Fleet Manager. Działa przez dowolne łącze internetowe, jakie ma dron, w tym 4G, i nie wymaga VPN.

Otwórz go przyciskiem **Operations** na karcie [Fleet](https://docs.uavmatrix.com/pl/fleet-manager/fleet/) albo przyciskiem **Controls** w dymku drona na [mapie Fleet](https://docs.uavmatrix.com/pl/fleet-manager/map/). Na mapie panel ma też karty **Terminal** i **Logs**.

![UAV Control Panel z kolumnami Flight Mode, Mission i Actions dla uzbrojonego quadkoptera](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/control-panel.webp)

*UAV Control Panel dla uzbrojonego quadkoptera w trybie LOITER: Flight Mode z przyciskami RTL, Circle i Loiter, Mission z wybraną 18-punktową misją przeglądu oraz Actions z Arm i Disarm.*

Tylko **Owner** i **Admin** mogą wysyłać polecenia. Zobacz [Role i uprawnienia](https://docs.uavmatrix.com/pl/fleet-manager/team/roles-and-permissions/).

> **Zdalne polecenia sterują prawdziwymi dronami**
>
> Polecenie z Fleet Manager działa na dronie tak, jakby wysłała je stacja naziemna. Przy każdym locie miej pilota ze stacją naziemną lub nadajnikiem RC w kontroli, przestrzegaj lokalnych zasad dotyczących zdalnych operacji i BVLOS, a Fleet Manager traktuj jako narzędzie nadzoru i dyspozycji, a nie jedyne łącze.

## Nagłówek

Nagłówek pokazuje status drona, flagi **ARMED** i **FAILSAFE**, odznakę **GCS Failsafe**, wybór koloru na mapie (**Change map color**, z **Reset to auto**) oraz link **Details** do [strony UAV](https://docs.uavmatrix.com/pl/fleet-manager/fleet/uav-details/).

Jeśli GCS failsafe kontrolera lotu jest wyłączony, panel ostrzega: **GCS Failsafe not enabled. Without GCS failsafe, the vehicle will not return to launch if it loses connection to the ground station.** Przed lotem poza zasięgiem wzroku skonfiguruj failsafe w oprogramowaniu stacji naziemnej (parametr ArduPilot `FS_GCS_ENABLE`).

## Tryb lotu

Wybierz tryb z listy rozwijanej albo użyj szybkich przycisków **RTL**, **Circle** i **Loiter** (**Hold** na łazikach). Każda zmiana trybu wymaga potwierdzenia, a im bardziej niebezpieczny tryb, tym silniejsza kontrola:

| Potwierdzenie | Tryby |
| --- | --- |
| Proste **Change to *MODE*?** | STABILIZE, ALT_HOLD, LOITER, POSHOLD, BRAKE, FLOWHOLD, HOLD, FBWA, FBWB, CRUISE, QHOVER, QLOITER, QSTABILIZE |
| Potwierdzenie z opisem działania trybu | AUTO, GUIDED, RTL, SMART_RTL, CIRCLE, FOLLOW, ZIGZAG, QRTL, TAKEOFF, AVOID_ADSB, ACRO, MANUAL |
| Wpisz nazwę trybu, aby potwierdzić | LAND, SPORT, AUTOTUNE, FLIP, DRIFT, THROW, QLAND, QACRO, AUTOROTATE |

![Okno potwierdzenia zmiany trybu z prośbą o wpisanie LAND w celu potwierdzenia](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/control-panel--mode-confirm.webp)

*Potwierdzenie dla LAND, trybu, który trzeba wpisać, aby go potwierdzić.*

Listy trybów pochodzą z ArduPilot (Copter, Plane, Rover i Sub). Na kontrolerze lotu PX4 zmieniaj tryby w stacji naziemnej.

## Misja

Uruchamia [misje](https://docs.uavmatrix.com/pl/fleet-manager/missions/) zapisane w twojej organizacji:

- **Select mission** wybiera zapisaną misję. Licznik pokazuje bieżący i łączny punkt trasy, na przykład `3/18`, albo **None**.
- **Start** najpierw odczytuje misję z drona i porównuje ją z wybraną. Jeśli się różnią, **Mission Not Loaded on Drone** oferuje **Upload & Start**.
- **Stop**, **Read** (pobiera misję z drona) i **Clear**.

Każda akcja wymaga potwierdzenia.

## Akcje

- **Arm** i **Disarm**. Okno uzbrajania mówi: **This will arm the UAV. Ensure all personnel are clear of the propellers before arming.** Zaznacz **Force arm (bypass pre-arm checks)** tylko na stanowisku warsztatowym: pomija kontrole, które zatrzymują niebezpieczny start.
- **Select action... → Preflight Calibration** kalibruje żyroskop i wypoziomowuje akcelerometr. Trzymaj pojazd całkowicie nieruchomo na płaskiej powierzchni, a następnie wybierz **Start Calibration**.

![Okno potwierdzenia uzbrojenia z ostrzeżeniem o śmigłach i polem Force arm](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/control-panel--arm-confirm.webp)

*Okno uzbrojenia z ostrzeżeniem o śmigłach i niezaznaczonym polem Force arm (bypass pre-arm checks).*

Uzbrajanie, rozbrajanie i kalibracja przed lotem wymagają UAVcast-Pro **6.3.0_rc13** lub nowszego na dronie. W starszych wersjach panel pokazuje **UAVcast Upgrade Required**. Zobacz [Aktualizacja](https://docs.uavmatrix.com/pl/get-started/updating/).

## Gdy polecenie nie przechodzi

- Dron musi być online. Polecenia wysłane do offline drona kończą się niepowodzeniem.
- Fleet Manager czeka, aż dron potwierdzi każde polecenie. Jeśli kontroler lotu je odrzuci, na przykład przy uzbrajaniu z niezaliczonymi kontrolami przed uzbrojeniem, błąd pojawi się w panelu i w komunikatach statusu drona.
- Komunikaty z kontrolera lotu (błędy kontroli przed uzbrojeniem, zmiany trybów) są widoczne w dymku drona na mapie i na karcie [Logs](https://docs.uavmatrix.com/pl/fleet-manager/fleet/uav-details/#logs).

Dla ekranów telefonów zobacz [Widok Lite](https://docs.uavmatrix.com/pl/fleet-manager/lite-view/).

Source: https://docs.uavmatrix.com/pl/fleet-manager/fleet/remote-control/
