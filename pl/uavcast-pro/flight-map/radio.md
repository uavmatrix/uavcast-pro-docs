# Karta Radio

> Zobacz na żywo wartości PWM kanałów RC i RSSI z kontrolera lotu w karcie Radio UAVcast-Pro, aby sprawdzić przełączniki nadajnika i przełączanie kamer RC.

Karta Radio pokazuje sygnał RC, który kontroler lotu odbiera z nadajnika: wartość PWM każdego kanału oraz RSSI (siłę sygnału). Użyj jej, aby sprawdzić przypisanie przełączników, na przykład kanału, którego używasz do [przełączania kamer RC](https://docs.uavmatrix.com/pl/uavcast-pro/camera/multi-camera/), bez podłączania stacji naziemnej. Otwórz **Mapa Lotu → Radio**.

![Karta Radio z odznaką RSSI, czterema podstawowymi kanałami i kanałami pomocniczymi, wszystkie na 0](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/flight-map--radio.webp)

*Mapa Lotu → Radio na zestawie testowym bez odbiornika RC, więc każdy kanał pokazuje 0.*

## Co widzisz

- **RSSI**: siła sygnału odbiornika z kontrolera lotu, oceniana jako **Brak Sygnału**, **Słaby**, **Przeciętny**, **Dobry** lub **Doskonały**. Wymaga skonfigurowania RSSI w kontrolerze lotu (`RSSI_TYPE` w ArduPilot).
- **Sterowanie Główne**: **Channel 1 - Roll**, **Channel 2 - Pitch**, **Channel 3 - Throttle** i **Channel 4 - Yaw**, w układzie Mission Planner.
- **Kanały Pomocnicze**: pozostałe kanały.

Wartości PWM zwykle mieszczą się w zakresie od 1000 (min) do 2000 (max). Kanał, który się nie porusza, nie jest przypisany na nadajniku albo odbiornik go nie wysyła.

Wartości pochodzą z komunikatu `RC_CHANNELS` kontrolera lotu, więc aktualizują się tylko wtedy, gdy połączenie z kontrolerem lotu ma status **Połączono**.

Source: https://docs.uavmatrix.com/pl/uavcast-pro/flight-map/radio/
