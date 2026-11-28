# Powiązania strumieni

> Kieruj wideo i MAVLink z dowolnego drona do dowolnej stacji naziemnej przez VPN, dowiedz się, jak Fleet Manager przydziela porty UDP, oraz jak skonfigurować QGC i Mission Planner.

Powiązanie strumienia nakazuje dronowi wysyłać wideo i telemetrię do jednej stacji naziemnej przez VPN twojej organizacji. Jeden dron może strumieniować do kilku stacji naziemnych, a jedna stacja naziemna może odbierać kilka dronów. Fleet Manager dobiera porty tak, aby strumienie nigdy się nie zderzały.

## Zanim zaczniesz

- [Włączony VPN](https://docs.uavmatrix.com/pl/fleet-manager/network/#enable-vpn) i dron w VPN (typ **UAV** w **Connected Devices**).
- Stacja naziemna [podłączona i skonfigurowana jako **GCS**](https://docs.uavmatrix.com/pl/fleet-manager/connect-gcs/).
- Rola **Owner** lub **Admin**.
- Dron **online**. Fleet Manager natychmiast wysyła nowe miejsca docelowe do UAVcast-Pro i czeka na jego potwierdzenie.

## Dodawanie powiązania

1. Przejdź do **Network → Stream Bindings** i wybierz **Add Binding**.
2. W oknie **Add Stream Binding** wybierz **Drone** i **Ground Station**.
3. Wybierz **Create Binding**.

![Okno Add Stream Binding z polami wyboru drona i stacji naziemnej oraz notatką o automatycznych portach](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/network--add-binding.webp)

*Okno Add Stream Binding z wybranym dronem i stacją naziemną oraz informacją, że porty są przydzielane automatycznie.*

Powiązanie pojawia się w tabeli z włączonymi **Video** i **Telemetry** oraz swoimi **Ports** (wideo / telemetria). UAVcast-Pro zaczyna wysyłać w ciągu kilku sekund.

Jeśli dron nie potwierdzi w ciągu 15 sekund, Fleet Manager anuluje powiązanie z komunikatem **Failed to send configuration to drone - it may be offline**. Sprawdź, czy dron jest online, i spróbuj ponownie.

## Jak przydzielane są porty

Porty są liczone **dla każdej stacji naziemnej**. Każde powiązanie dostaje własny blok portów UDP na tej stacji, dzięki czemu drony się nie nakładają:

- port **wideo** dla kamery 1, a po nim miejsce na **kamerę 2** (podwójny strumień) i **audio**, które UAVcast-Pro wysyła na kolejne porty po porcie wideo;
- port **telemetrii** dla MAVLink.

Pierwsze powiązanie na stacji naziemnej używa wartości domyślnych: wideo **5600** i telemetria **14550**. Kolejne powiązania otrzymują następny wolny blok.

Warto znać kilka konsekwencji:

- **Każda stacja naziemna zaczyna od wartości domyślnych.** Ten sam dron może mieć różne porty na dwóch laptopach, zależnie od tego, co każdy z nich odbiera.
- **Zwolnione porty są ponownie używane.** Usunięcie powiązania zwalnia jego blok dla następnego nowego powiązania z tym laptopem.
- **Porty nie podążają za dronem.** Usunięcie i ponowne dodanie powiązania może dać inne porty. Zawsze odczytaj kolumnę **Ports** przed konfiguracją oprogramowania stacji naziemnej.
- Porty przydziela Fleet Manager i nie można ich edytować w aplikacji.
- Ręcznie ustawiony na dronie **Port Wideo (Kamera 2)** zostaje zachowany, gdy Fleet Manager aktualizuje swoje miejsca docelowe, dopiero od UAVcast-Pro 6.5.3. We wcześniejszych wersjach kolejna aktualizacja go usuwa.

## Konfiguracja oprogramowania stacji naziemnej

Użyj portów z kolumny **Ports** powiązania. Strumień przychodzi z adresu VPN drona.

**QGroundControl**

- **Telemetria:** QGroundControl domyślnie nasłuchuje na UDP 14550, więc pierwszy dron łączy się samodzielnie. Dla kolejnych dronów otwórz **Application Settings → Comm Links**, dodaj łącze typu **UDP** z portem telemetrii powiązania i połącz je.
- **Wideo:** w **Application Settings → Video** (w starszych wersjach pod **General**) ustaw **Source** na **UDP h.264 Video Stream**, a port UDP na port wideo powiązania (**UDP URL** `0.0.0.0:<port>` w aktualnych wersjach). QGroundControl pokazuje jedno wideo naraz; aby oglądać kilka dronów, uruchom drugą instancję lub użyj odtwarzacza wideo dla pozostałych.

**Mission Planner**

- **Telemetria:** w rozwijanej liście połączenia w prawym górnym rogu wybierz **UDP**, wybierz **Connect** i wpisz port telemetrii powiązania. Dla kilku dronów połącz się raz na każdy port; Mission Planner wyświetla każdy pojazd według system ID.
- **Wideo:** kliknij prawym przyciskiem HUD, wybierz **Video → Set GStreamer Source** i wpisz pipeline nasłuchujący na porcie wideo powiązania. Dokładny pipeline znajdziesz w [Mission Planner](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/mission-planner/).

> **Nadaj każdemu dronowi własny identyfikator systemowy MAVLink**
>
> Gdy jedna stacja naziemna odbiera kilka dronów, każdy kontroler lotu potrzebuje unikalnego `SYSID_THISMAV` (ArduPilot) lub `MAV_SYS_ID` (PX4). W przeciwnym razie stacja naziemna pomiesza je.

Więcej o obsłudze wielu pojazdów z jednej stacji: [Strumieniowanie do wielu stacji naziemnych](https://docs.uavmatrix.com/pl/guides/multiple-ground-stations/).

## Wstrzymywanie lub usuwanie powiązania

- Wyłącz **Video** lub **Telemetry** w tabeli, aby zatrzymać dany strumień bez utraty powiązania i jego portów. Rób to, gdy dron jest online, aby otrzymał zmianę.
- Wybierz ikonę kosza, aby usunąć powiązanie. Porty zostają zwolnione dla następnego powiązania z tą stacją naziemną.

Użyj pola wyszukiwania i filtra **Video Status** (**All Video**, **Video On**, **Video Off**), aby znaleźć powiązania w dużej flocie.

![Tabela Stream Bindings z listą dronów, stacji naziemnych, przełączników wideo i telemetrii oraz portów](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/network--stream-bindings.webp)

*Zakładka Stream Bindings: każde powiązanie pokazuje drona, stację naziemną, przełączniki Video i Telemetry oraz porty.*

## Powiązania na stronie UAV

Na [stronie UAV](https://docs.uavmatrix.com/pl/fleet-manager/fleet/uav-details/#connected-ground-stations) każdego drona w sekcji **Connected Ground Stations** wymienione są jego stacje naziemne, z tymi samymi przełącznikami oraz **Pause** / **Resume**. **Add GCS** tworzy tam powiązanie w taki sam sposób jak **Add Binding** tutaj, z kolejnymi wolnymi portami na tej stacji naziemnej.

## Brak strumienia?

Zobacz [Brak telemetrii w stacji naziemnej](https://docs.uavmatrix.com/pl/troubleshooting/no-telemetry-in-gcs/) oraz [Brak wideo w stacji naziemnej](https://docs.uavmatrix.com/pl/troubleshooting/no-video-in-gcs/). Typowe przyczyny to zapora na laptopie blokująca przychodzący UDP, oprogramowanie stacji naziemnej nasłuchujące na złym porcie lub strumień wyłączony w powiązaniu.

Source: https://docs.uavmatrix.com/pl/fleet-manager/network/stream-bindings/
