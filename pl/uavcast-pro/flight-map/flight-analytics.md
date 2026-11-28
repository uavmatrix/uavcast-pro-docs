# Analityka Lotu

> Wykreślaj telemetrię MAVLink na żywo lub zapisany plik .tlog w Analityce Lotu UAVcast-Pro. Wybierz do 10 parametrów, porównuj je w czasie i przeglądaj lot na dronie.

Analityka Lotu rysuje wartości MAVLink w czasie, na żywo z kontrolera lotu albo z zapisanego pliku `.tlog`. Użyj jej do sprawdzania wibracji, spadku napięcia baterii, utrzymywania wysokości lub wartości sygnału, bez kopiowania logów na komputer. Otwórz **Mapa Lotu → Analityka Lotu**.

![Zakładka Analityka Lotu przed wczytaniem logu, z przyciskiem Otwórz plik logu, przełącznikiem Na Żywo i panelem parametrów](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/flight-map--flight-analytics.webp)

*Analityka Lotu przed wczytaniem logu. **Otwórz plik logu** wczytuje plik .tlog.*

## Rysowanie telemetrii na żywo

1. Wybierz **Na Żywo**. Lista parametrów wypełnia się w miarę napływania wiadomości. Jeśli zostaje na *Waiting for MAVLink Data*, najpierw połącz kontroler lotu.
2. Wyszukaj **Parametry** i zaznacz wartości do wykreślenia. Naraz możesz wykreślić do **10**.
3. Włącz **Gromadź dane**, aby zachować każdy punkt (*Storing all data points*). Po wyłączeniu wykres pokazuje przesuwane okno (*Last … points*).

## Analiza zapisanego logu

1. Wybierz **Otwórz plik logu**.
2. W **Wybierz plik logu** wskaż zapisany `.tlog`. Logi telemetrii pochodzą z [Nagrań](https://docs.uavmatrix.com/pl/uavcast-pro/camera/recordings/) (domyślnie jeden na uzbrojony lot).
3. Zaznacz parametry do wykreślenia. **Czas trwania** i liczba **Parametrów** w pliku są pokazane na górze.

**Wyczyść wszystko** usuwa wszystkie wykreślone parametry.

## Skąd pochodzą logi

Telemetria jest zapisywana na dronie zgodnie z ustawieniem **Zapisuj telemetrię** w **Kamera → Nagrania → Ustawienia**: **Po uzbrojeniu** (domyślnie), **Zawsze, gdy połączony** albo **Wyłączone**. Te same pliki `.tlog` otwierają się w Mission Planner, MAVExplorer i UAV Log Viewer.

Boczna zakładka **Nagrania** w Mapie Lotu wyświetla te same logi telemetrii z kolumnami **Wiadomości**, **Maks. wysokość** i **Odległość** i pozwala na **Pobierz .tlog**, **Usuń** lub **Odtwórz** log. Odtwarzanie przesyła zapisaną telemetrię na mapę tak, jakby dron leciał.

Source: https://docs.uavmatrix.com/pl/uavcast-pro/flight-map/flight-analytics/
