# Wskaźniki statusu i powiadomienia

> Co oznaczają wskaźniki Fleet Manager: offline, brak MAVLink, GPS, failsafe i bateria, a także ogłoszenia systemowe, strona statusu i alerty.

Fleet Manager pokazuje problemy tam, gdzie już patrzysz: na mapie, na liście floty i na stronie każdego drona. Ta strona wymienia każdy wskaźnik i to, co z nim zrobić.

## Wskaźniki drona

| Wskaźnik | Gdzie | Znaczenie | Co sprawdzić najpierw |
| --- | --- | --- | --- |
| **OFFLINE**, szary znacznik z odznaką zegara | Flota, mapa, strona UAV | Od UAVcast-Pro nie odebrano niczego przez 20 sekund | Łącze internetowe drona i port 8883. Zobacz [Dron offline w Fleet Manager](https://docs.uavmatrix.com/pl/troubleshooting/drone-offline-fleet-manager/). |
| **NO MAVLINK**, pomarańczowy pierścień z **!** | Mapa | UAVcast-Pro jest online, ale od 10 sekund nie otrzymuje danych z kontrolera lotu | Zasilanie kontrolera lotu i kabel. Zobacz [Brak heartbeat MAVLink](https://docs.uavmatrix.com/pl/troubleshooting/no-mavlink-heartbeat/). |
| Czerwony przerywany pierścień, **NO GPS** | Mapa | Brak satelitów lub brak fixa | Widok nieba z anteny, kabel GPS. |
| Żółty przerywany pierścień, **WEAK GPS** | Mapa | Mniej niż 6 satelitów lub tylko fix 2D | Przed lotem poczekaj na więcej satelitów. |
| Bateria na żółto / na czerwono | Karty floty | Poniżej 50 % / poniżej 20 % | Zaplanuj lądowanie. |
| **ARMED** | Strona UAV, panel sterowania, dymek na mapie | Silniki uzbrojone | Traktuj dron jak gotowy do startu. |
| **FAILSAFE** | Strona UAV, panel sterowania | Kontroler lotu jest w trybie failsafe | Komunikaty kontrolera lotu, widoczne w dymku na mapie i w **Logs**. |
| **GCS FAILSAFE** / **GCS Failsafe not enabled** | Strona UAV, panel sterowania | Failsafe stacji naziemnej został wyzwolony lub nie jest skonfigurowany | Ustaw `FS_GCS_ENABLE` przed lotami BVLOS. |
| **Re-pair required** | Flota, strona UAV | Dron używa starego certyfikatu połączenia | [Ponowne parowanie drona](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone). |
| **Signal** poor | Dymek na mapie | Czas odpowiedzi do drona powyżej 600 ms lub trzy pominięte pingi | Zasięg sieci komórkowej lub przeciążone łącze. |

Wskaźniki aktualizują się na bieżąco, gdy strona jest otwarta. Fleet Manager sprawdza, czy drony są offline, co 5 sekund.

![Zbliżenie mapy ze znacznikami pokazującymi pierścienie offline, brak MAVLink i słaby GPS](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/map--indicators.webp)

*Zbliżenie czterech znaczników: zdrowy dron, jeden OFFLINE z odznaką zegara, jeden NO MAVLINK z pomarańczowym pierścieniem i jeden WEAK GPS z żółtym przerywanym pierścieniem.*

## Dziennik aktywności

Zmiany wprowadzane przez zespół (parowanie, usuwanie dronów, powiązania strumieni, zaproszenia, zmiany ról, VPN) są zapisywane w sekcji **Recent Activity** na [Dashboard](https://docs.uavmatrix.com/pl/fleet-manager/dashboard/) wraz z informacją, kto je wykonał.

## Ogłoszenia systemowe

Gdy UAVmatrix planuje konserwację lub wystąpi incydent, na górze każdej strony pojawia się baner: niebieski dla informacji, bursztynowy dla ostrzeżeń, czerwony dla spraw krytycznych. Zamknięcie banera ukrywa go do chwili otwarcia Fleet Manager w nowej sesji przeglądarki.

## Strona statusu

**System → Status** (strona **System Status**) pokazuje, czy Fleet Manager działa normalnie: **All systems operational** albo **We're experiencing some issues** z sekcją **Active Incidents**. **Past Incidents** wyświetla ostatnie rozwiązane incydenty wraz z ich **Resolution**. Gdy wiele dronów przechodzi jednocześnie w offline, sprawdź to najpierw.

![Strona System Status z komunikatem All systems operational i listą przeszłych incydentów](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/status.webp)

*System Status pokazujący All systems operational oraz dwa Past Incidents oznaczone jako Resolved.*

## Alerty e-mail i webhook

Fleet Manager nie wysyła jeszcze alertów e-mail, SMS ani webhook o zdarzeniach dronów (na przykład o niskim poziomie baterii lub o przejściu drona w offline). Trzymaj mapę lub listę floty otwartą w centrum sterowania i polegaj na własnych failsafe kontrolera lotu w sprawie baterii i utraty łącza.

Source: https://docs.uavmatrix.com/pl/fleet-manager/alerts-and-status/
