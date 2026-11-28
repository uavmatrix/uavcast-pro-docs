# Brak telemetrii w QGroundControl lub Mission Planner

> Kontroler lotu jest połączony w UAVcast-Pro, ale QGroundControl lub Mission Planner wciąż czeka? Sprawdź Włącz Telemetrię, adres IP, UDP 14550 i VPN.

UAVcast-Pro pokazuje kontroler lotu jako **Połączono**, ale QGroundControl pisze *Waiting for vehicle connection*, a Mission Planner przekracza limit czasu z *No heartbeat packets received*. Dron słyszy kontroler lotu; telemetria po prostu nie dociera do stacji naziemnej.

Jeśli sam UAVcast-Pro pokazuje **No heartbeat**, najpierw napraw to: [Brak heartbeat MAVLink](https://docs.uavmatrix.com/pl/troubleshooting/no-mavlink-heartbeat/).

| Co widzisz | Prawdopodobna przyczyna | Zacznij od |
| --- | --- | --- |
| Panel Główny: Ground station None set up lub Not sending | Brak miejsca docelowego albo wyłączona opcja Włącz Telemetrię | [Sprawdzenie 1](https://docs.uavmatrix.com/pl/troubleshooting/no-telemetry-in-gcs/#check-1) |
| Panel Główny pokazuje Sending, a GCS nic nie widzi | Zły IP, zapora sieciowa albo GCS nasłuchuje na innym porcie | [Sprawdzenie 2](https://docs.uavmatrix.com/pl/troubleshooting/no-telemetry-in-gcs/#check-2) |
| Działało przez Wi-Fi, nic nie przychodzi przez 4G | Miejsce docelowe to lokalny IP zamiast adresu IP VPN | [Sprawdzenie 3](https://docs.uavmatrix.com/pl/troubleshooting/no-telemetry-in-gcs/#check-3) |
| Łączyłeś się przez TCP 5760, po aktualizacji przestało działać | Port TCP 5760 został zamknięty w wersji v6.5.0 | [Sprawdzenie 4](https://docs.uavmatrix.com/pl/troubleshooting/no-telemetry-in-gcs/#check-4) |
| Telemetria się pokazuje, ale polecenia i zmiany trybu nie działają | Dla tego miejsca docelowego włączony jest Read Only | [Sprawdzenie 5](https://docs.uavmatrix.com/pl/troubleshooting/no-telemetry-in-gcs/#check-5) |

## Sprawdzenie 1: Czy telemetria jest wysyłana?

1. Otwórz **Panel Główny** i odczytaj wiersz **Ground station** na karcie statusu.

   - **None set up**: brak miejsca docelowego. Dodaj je w kroku 2.
   - **Not sending**: miejsce docelowe istnieje, ale nic nie wychodzi.
   - **Sending to … · n packets/s**: telemetria opuszcza dron. Przejdź do sprawdzenia 2.

2. Przejdź do **Stacje Naziemne**. Jeśli lista jest pusta, naciśnij **Dodaj Miejsce Docelowe**.

3. Na karcie swojego komputera włącz **Włącz Punkt Końcowy** i **Włącz Telemetrię**. Zarówno wideo, jak i telemetria są wyłączone w nowym miejscu docelowym.

4. Wpisz adres IPv4 komputera w polu **IP lub Host Docelowy** i zostaw **Port Telemetrii** na `14550`.

![Sekcja telemetrii miejsca docelowego z włączoną opcją Włącz Telemetrię i wyłączonym Read Only](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/ground-control--telemetry-enabled.webp)

*Stacje Naziemne: miejsce docelowe z włączoną opcją Włącz Telemetrię.*

> **Nieprawidłowe adresy są pomijane**
>
> UAVcast-Pro akceptuje tylko adresy IPv4, na przykład `192.168.1.10`. Jeśli spróbujesz zapisać nazwę hosta, zobaczysz komunikat *Enter a valid IPv4 address, for example 192.168.1.10.* Brakujący lub nieprawidłowy adres zostaje pominięty w routerze telemetrii, a **Connection check** na stronie **Kontroler Lotu** wymienia go na liście.

## Sprawdzenie 2: Upewnij się, że stacja naziemna nasłuchuje

UAVcast-Pro wysyła MAVLink przez UDP na adres i port, które ustawiłeś. Stacja naziemna musi nasłuchiwać na tym porcie.

- **QGroundControl** domyślnie nasłuchuje na UDP 14550. Jeśli zmieniłeś **Telemetry Port**, dodaj link UDP na tym samym porcie w **Application Settings → Comm Links**.
- **Mission Planner**: wybierz **UDP** w rozwijanej liście połączenia w prawym górnym rogu, naciśnij **Connect** i zaakceptuj port `14550`.
- Tylko jeden program może nasłuchiwać na porcie. Zamknij MAVProxy, drugi QGroundControl lub inne narzędzie, które może zajmować 14550.
- Zezwól na przychodzący UDP 14550 w zaporze sieciowej. Polecenia są w [Brak wideo w stacji naziemnej, sprawdzenie 3](https://docs.uavmatrix.com/pl/troubleshooting/no-video-in-gcs/#check-3).

## Sprawdzenie 3: Użyj adresu VPN przez sieć komórkową

Przez 4G dron nie może dotrzeć do lokalnego adresu, takiego jak `192.168.1.20`. Wpisz adres VPN swojego komputera (Fleet Manager VPN, Tailscale lub ZeroTier) w polu **IP lub Host Docelowy**.

Z komputera wykonaj `ping` na adres VPN drona. Jeśli ping się nie powiedzie, problemem jest VPN: zobacz [VPN połączony, ale nie można dotrzeć do drona](https://docs.uavmatrix.com/pl/troubleshooting/vpn-cant-reach-drone/).

## Sprawdzenie 4: TCP 5760 już nie działa

Od wersji v6.5.0 router telemetrii nie przyjmuje połączeń TCP na porcie 5760, więc dane dostają tylko stacje naziemne, które dodasz i włączysz. Jeśli łączyłeś Mission Planner przez TCP 5760, dodaj swój komputer jako miejsce docelowe i połącz się przez UDP.

## Sprawdzenie 5: Polecenia są ignorowane

Jeśli telemetria się pokazuje, ale uzbrajanie, zmiany trybu lub wysyłanie misji nie działają, sprawdź **Read Only** w tym miejscu docelowym. Read Only blokuje wszystko, co mogłoby zmienić pojazd (polecenia, zmiany trybu, zapisy parametrów i misji), więc stacja naziemna może tylko obserwować. Dotyczy to UAVcast-Pro od wersji 6.5.3; we wcześniejszych wersjach Read Only nie blokuje zapisu parametrów. Niektóre stacje naziemne pokazują w tym trybie ostrzeżenia, ponieważ część ich żądań pozostaje bez odpowiedzi.

## Nadal nic?

[Pobierz logi](https://docs.uavmatrix.com/pl/troubleshooting/collect-logs/) z zaznaczonym **Mavlink Manager** i wyślij je na **[support@uavmatrix.com](mailto:support@uavmatrix.com)**. Podaj, jakiej stacji naziemnej używasz i jej adres IP.

Powiązane: [Stacje Naziemne](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/) · [Porty i protokoły](https://docs.uavmatrix.com/pl/reference/ports-and-protocols/)

Source: https://docs.uavmatrix.com/pl/troubleshooting/no-telemetry-in-gcs/
