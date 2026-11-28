# Dwie kamery: przełączanie RC lub podwójny strumień

> Podłącz dwie kamery do UAVcast-Pro i przełączaj je z nadajnika RC albo strumieniuj obie naraz w trybie podwójnego strumienia. Konfiguracja, porty i CPU.

UAVcast-Pro obsługuje dwie kamery, na przykład kamerę przednią oraz kamerę skierowaną w dół lub kamerę z zoomem. Wybierasz jeden z dwóch trybów:

|  | **Przełączanie** (domyślnie) | **Podwójny strumień** |
| --- | --- | --- |
| Co dostaje stacja naziemna | Jeden strumień wideo, pokazujący kamerę 1 lub kamerę 2 | Dwa strumienie wideo jednocześnie |
| Jak wybierasz | Odznaki kamer w interfejsie webowym albo kanał RC | Obie zawsze na żywo |
| Porty | **Port Wideo** | Kamera 1 na **Port Wideo**, kamera 2 na **Port Wideo (Kamera 2)** (domyślnie: Port Wideo + 1) |
| CPU i pasmo | Jedno kodowanie | Dwa kodowania, około dwukrotnie większy uplink |

## 1. Dodaj drugą kamerę

1. Podłącz obie kamery. Dwie kamery CSI na Pi 5, kamera CSI i USB albo dwie kamery USB, wszystkie te kombinacje działają.
2. Otwórz **Kamera → Ustawienia kamery**. Gniazda kamer pokazują **CAM 1** i **CAM 2**.
3. Naciśnij **Dodaj Kamerę** w drugim gnieździe i wybierz kamerę.
4. **Rozdzielczość i FPS z Kamery 1 będą używane** w trybie przełączania. Jeśli kamera 2 obsługuje rozdzielczość kamery 1, włącz **Match Camera 1 Resolution**; w przeciwnym razie kamera 2 używa własnej rozdzielczości i jest skalowana do dopasowania.

Jeśli kamery nie ma na liście, zobacz [Kamera nie została wykryta](https://docs.uavmatrix.com/pl/troubleshooting/camera-not-detected/).

## 2a. Przełączaj kamery z nadajnika

1. W sekcji **Przełączanie Kanału RC** włącz **Włącz przełączanie kamery kanałem RC**.
2. Wybierz wolny kanał w **Kanał RC**. Domyślnie jest to kanał 7.
3. Przypisz dwupozycyjny przełącznik nadajnika do tego kanału.
4. Przełącz przełącznik i obserwuj **Aktualna wartość PWM**: poniżej 1500 µs wybierana jest kamera 1, powyżej 1500 µs kamera 2.

![Panel Sterowania Kamerą z włączoną kamerą na Tak, wypełnionym CAM 1 i pustym gniazdem Dodaj Kamerę](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/camera--control-panel.webp)

*Panel Sterowania Kamerą z jedną kamerą. Panel Przełączanie Kanału RC pojawia się poniżej dopiero po dodaniu CAM 2 i przy wyłączonym podwójnym strumieniu.*

Gdy przełączanie RC jest włączone, odznaki kamer w interfejsie webowym nie przełączają kamer. Wyłącz przełączanie RC, aby ponownie wybierać kamery ręcznie.

## 2b. Strumieniuj obie kamery jednocześnie

1. Włącz **Dual stream**. Odznaka pokaże **Both live**.
2. Każda kamera ma teraz własną rozdzielczość, FPS i bitrate w sekcji **Per-camera settings**.
3. Otwórz **Stacje Naziemne**. Każde miejsce docelowe pokazuje teraz **Port Wideo (Kamera 2)**. Zostaw pole puste, aby użyć **Port Wideo** + 1 (5601), albo wpisz własny port.
4. Na stacji naziemnej odbierz drugi strumień na tym porcie, na przykład drugim źródłem wideo w QGroundControl albo oknem GStreamer: zobacz [Stacje naziemne i wideo](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/#set-up-the-receiving-side), gdzie opisano QGroundControl, Mission Planner i GStreamer na każdym systemie.

> **Pilnuj CPU**
>
> UAVcast-Pro koduje wideo programowo. Przy dwóch strumieniach obserwuj **Obciążenie systemu**. Gdy pojawi się komunikat **CPU is near its limit**, zmniejsz rozdzielczość lub bitrate jednego strumienia albo wyłącz drugi strumień. Do podwójnego strumienia zalecane jest Raspberry Pi 4 lub 5.

**Mapa Lotu** pokazuje jedno okno wideo dla każdego aktywnego strumienia. Możesz je ukryć jako zakładki na dole mapy.

## Planowanie portów

Przy włączonym podwójnym strumieniu każde miejsce docelowe używa dwóch portów wideo, a audio (jeśli włączono **Send audio to ground stations**) używa portu wideo + 2. Jeśli dodasz więcej miejsc docelowych na tym samym komputerze, rozstaw ich porty wideo co najmniej o trzy, na przykład 5600 i 5610.

## Nagrywanie obu kamer

W **Kamera → Nagrania → Ustawienia** opcja **Nagrywaj kamerę 2** działa tylko przy włączonym podwójnym strumieniu. Zobacz [Nagrywaj loty i analizuj je](https://docs.uavmatrix.com/pl/guides/recording-flight-review/).

Source: https://docs.uavmatrix.com/pl/guides/dual-camera-rc-switching/
