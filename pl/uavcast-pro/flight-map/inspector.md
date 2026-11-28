# Inspektor MAVLink

> Użyj Inspektora MAVLink UAVcast-Pro, aby zobaczyć każdy komunikat z kontrolera lotu wraz z jego częstotliwością, ID systemu i ID komponentu oraz debugować telemetrię i wstrzykiwacze.

Inspektor wyświetla listę wszystkich komunikatów MAVLink, które odbiera UAVcast-Pro, pogrupowanych według pojazdu, wraz z ich częstotliwością i ostatnimi wartościami pól. Użyj go, aby sprawdzić, czy kontroler lotu wysyła to, czego oczekujesz, aby znaleźć dokładne nazwy pól komunikatu lub potwierdzić, że [wstrzykiwacz](https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/injectors/) generuje komunikaty `NAMED_VALUE_FLOAT`. Otwórz **Mapa Lotu → Inspektor**.

![Inspektor MAVLink ze stanem połączenia i listą komunikatów dla systemu 1, z nazwami komunikatów, częstotliwościami w Hz i licznikami](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/flight-map--inspector.webp)

*Mapa Lotu → Inspektor z komunikatami z kontrolera lotu (system 1) i rozwiniętym ATTITUDE.*

## Co widzisz

**Status Połączenia MAVLink** na górze: **Connection**, **Vehicle**, **GPS Satellites**, **Total Messages** i **System ID**.

Pod spodem **Message Inspector**: jedna grupa na pojazd (*Vehicle (System ID: 1)*), a w niej jeden wiersz na komunikat, zawierający:

- nazwę komunikatu,
- **COMP**: ID komponentu, który go wysłał (1 = autopilot, 194 = domyślny dla wstrzykiwaczy),
- częstotliwość w **Hz** oraz liczbę odebranych komunikatów.

Otwórz komunikat, aby zobaczyć jego pola i bieżące wartości.

## Typowe sprawdzenia

| Pytanie | Na co patrzeć |
| --- | --- |
| Czy GPS wysyła dane? | `GPS_RAW_INT` na 2–10 Hz oraz `GPS_RTK`, jeśli używasz [RTK](https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/ntrip-rtk/). |
| Dlaczego telemetria w stacji naziemnej jest wolna? | Niskie częstotliwości `ATTITUDE`, `VFR_HUD` lub `GLOBAL_POSITION_INT`. Zwiększ częstotliwości strumieni `SRx_` na porcie MAVLink kontrolera lotu. |
| Czy mój wstrzykiwacz działa? | `NAMED_VALUE_FLOAT` pod COMP 194 (lub compid, który ustawiłeś). |

Jeśli lista pokazuje *Waiting for messages...*, połączenie z kontrolerem lotu nie jest aktywne. Zobacz [Kontroler lotu](https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/).

Source: https://docs.uavmatrix.com/pl/uavcast-pro/flight-map/inspector/
