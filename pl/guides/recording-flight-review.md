# Nagrywaj loty i analizuj je

> Automatycznie nagrywaj wideo z kamery i telemetrię na dronie po uzbrojeniu, zapisuj na USB lub SSD i odtwarzaj wideo, mapę i dane lotu na jednej osi czasu.

Od wersji 6.5.1 UAVcast-Pro nagrywa bezpośrednio na dronie: wideo z kamery oraz dziennik telemetrii, jednym kliknięciem na mapie lotu lub automatycznie za każdym razem, gdy uzbroisz drona. Nagrywanie wykorzystuje strumień, który jest już zakodowany, więc nie zużywa dodatkowego CPU i nigdy nie przerywa wideo na żywo do stacji naziemnej. Potem odtwarzacz analizy lotu pokazuje wideo, ślad na mapie, widok z kokpitu i dane lotu na jednej osi czasu.

## 1. Wybierz, gdzie trafią nagrania

1. Podłącz pendrive USB lub SSD, jeśli chcesz nagrywać na nie. Nagrania szybko zapełniają pamięć, a dysk SSD USB jest bardziej niezawodny niż karta SD.
2. Otwórz **Kamera → Nagrania** i zakładkę **Ustawienia**.
3. W sekcji **Miejsce zapisu** wybierz dysk albo **Internal storage**. Naciśnij **Wyszukaj dyski ponownie**, jeśli dysk został podłączony po otwarciu strony. **Or another folder** pozwala wpisać ścieżkę i potwierdzić przyciskiem **Użyj tego folderu**.
4. Ustaw **Zostaw wolne** (domyślnie 2 GB). Nagrywanie nigdy nie zapełni dysku ponad tę wartość.

![Zakładka Ustawienia nagrań z miejscem zapisu, opcją Zostaw wolne, usuwaniem najstarszych nagrań, usuwaniem nagrań starszych niż i nagrywaniem automatycznie po uzbrojeniu](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/camera--recordings-settings.webp)

*Kamera → Nagrania → Ustawienia z wybranym Internal storage i włączonym Nagrywaj automatycznie po uzbrojeniu.*

## 2. Zdecyduj, kiedy nagrywać

| Ustawienie | Domyślnie | Co robi |
| --- | --- | --- |
| **Nagrywaj automatycznie po uzbrojeniu** | Włączone | Startuje, gdy silniki się uzbroją, i zatrzymuje się, gdy się rozbroją. Jeśli łącze zostanie przerwane w locie, nagrywanie trwa dalej. |
| **Nagrywaj kamerę 1** / **Nagrywaj kamerę 2** | Włączone | Kamera 2 nagrywa tylko przy włączonym podwójnym strumieniu. |
| **Usuwaj najstarsze nagrania, gdy brakuje miejsca** | Włączone | Działa jak kamera samochodowa: nagrywanie nigdy nie zatrzymuje się z powodu braku miejsca. Gdy opcja jest wyłączona, nagrywanie się zatrzymuje. |
| **Usuwaj nagrania starsze niż** | 0 dni | 0 zachowuje nagrania, dopóki miejsce nie będzie potrzebne. |
| **Długość pliku** | 1 min | Nagrania zapisywane są w kawałkach od 1 do 30 minut. Krótsze kawałki tracą mniej danych po zaniku zasilania. |
| **Zapisuj telemetrię** | **Podczas uzbrojenia** | **Zawsze podczas połączenia** rejestruje też na ziemi, rozpoczynając nowy plik przy każdym uzbrojeniu, rozbrojeniu i co godzinę. **Wyłączone** nagrywa samo wideo. |

## 3. Nagrywaj ręcznie

Na **Mapa Lotu** przyciski **Nagrywanie** uruchamiają i zatrzymują każdą kamerę (**Nagrywaj kamerę 1**, **Zatrzymaj nagrywanie kamery 1**) oraz dziennik telemetrii. Użytkownicy tylko do odczytu mogą obserwować, ale nie mogą rozpoczynać nagrań.

## 4. Znajdź lot

Otwórz **Kamera → Nagrania → Library**. Każdy lot jest wymieniony z wideo, miniaturą i telemetrią. Nagranie w toku pokazuje odznakę **Rec**.

![Biblioteka nagrań z paskiem pamięci i dwoma nagranymi lotami, każdy z odznakami CAM 1 i Telemetry oraz przyciskiem Play](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/camera--recordings.webp)

*Kamera → Nagrania → Library z dwoma nagranymi lotami, każdy z wideo z kamery i telemetrią.*

Z biblioteki możesz:

- **Play** lot w odtwarzaczu analizy lotu,
- **Pobierz** klipy wideo jako MP4,
- **Usuń** nagranie: **Delete video only** (Usuń tylko wideo) albo **Delete video and telemetry** (Usuń wideo i telemetrię).

## 5. Przeanalizuj lot

Odtwarzacz analizy lotu odtwarza wideo obok śladu na mapie, widoku z kokpitu i danych lotu (**Wysokość**, **Prędkość**, **Bateria**, **Satelity**, **Tryb**) na jednej osi czasu.

![Odtwarzacz analizy lotu z obszarem wideo, mapą, widokiem z kokpitu i osią czasu z przyciskami odtwarzania](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/camera--flight-review.webp)

*Odtwarzacz analizy lotu: wideo, mapa i widok z kokpitu nad jedną osią czasu.*

- Oś czasu zaznacza uzbrojenie, rozbrojenie i zmiany trybu lotu, dzięki czemu możesz przeskoczyć do ważnego momentu.
- Używaj przycisków **Back 10 seconds** i **Forward 10 seconds** oraz **Playback speed** od 0,5× do 4×.
- Przy dwóch kamerach **Change video layout** przełącza między **Picture in picture** a **Side by side**; **Show this camera large** zamienia je miejscami.
- Jeśli nagranie nie ma telemetrii, odtwarzacz pokazuje: *Brak dziennika telemetrii dla tego nagrania. Telemetria jest zapisywana, gdy dron jest uzbrojony.*

## Dobrze wiedzieć

- Nagrania są przechowywane na dronie. Pobierz to, co chcesz zachować, zanim opcja **Usuwaj najstarsze nagrania, gdy brakuje miejsca** je usunie.
- Karta **Pamięć Masowa** na Panelu Głównym i podsumowanie **Miejsce na nagrania** pokazują wolne miejsce.
- Nagrywanie trwa przy wyłączonej opcji **Włączyć Podgląd na Żywo?**.
- Jeśli usługa nagrywania przestaje odpowiadać, strona pokazuje: *The recording service is not responding.* Uruchom ponownie usługę kamery z **Kamera → Ustawienia kamery** i [zbierz logi](https://docs.uavmatrix.com/pl/troubleshooting/collect-logs/), jeśli problem się powtórzy.

Source: https://docs.uavmatrix.com/pl/guides/recording-flight-review/
