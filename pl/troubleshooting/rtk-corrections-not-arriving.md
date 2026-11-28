# Poprawki RTK nie docierają

> NTRIP utknął na Łączenie, nie przekazano RTCM albo brak RTK Fixed? Sprawdź host castera, port, mountpoint, dane logowania, GGA upstream i odbiornik GPS.

W **Kontroler Lotu → NTRIP / RTK** status nie dochodzi do **Strumieniowanie korekcji**, licznik **Przekazane wiadomości RTCM** zostaje na zero albo poprawki docierają, ale kontroler lotu nigdy nie przechodzi ze stanu **Fix 3D** ani **RTK Float**.

Łańcuch ma cztery ogniwa: internet → caster → UAVcast-Pro → kontroler lotu → odbiornik GPS. Znajdź pierwsze, które się zrywa.

![Zakładka NTRIP / RTK z panelem statusu, licznikami i linią Caster response oraz kartą Jakość GPS](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/flight-controller--ntrip.webp)

*Kontroler Lotu → NTRIP / RTK na urządzeniu bez skonfigurowanego castera: status Wyłączone, liczniki na zero i puste pole Odpowiedź castera. Stan prawidłowy to Strumieniowanie korekcji, odpowiedź castera 200 i rosnące liczniki.*

| Co widzisz | Prawdopodobna przyczyna | Zacznij od |
| --- | --- | --- |
| Status Łączenie lub Błąd, brak odpowiedzi castera | Zły host lub port, niezgodność TLS albo brak internetu | [Sprawdzenie 1](https://docs.uavmatrix.com/pl/troubleshooting/rtk-corrections-not-arriving/#check-1) |
| Odpowiedź castera 401 Unauthorized | Zła nazwa użytkownika, hasło lub mountpoint | [Sprawdzenie 2](https://docs.uavmatrix.com/pl/troubleshooting/rtk-corrections-not-arriving/#check-2) |
| Log mówi, że caster zwrócił sourcetable | Nazwa mountpointu jest błędna | [Sprawdzenie 2](https://docs.uavmatrix.com/pl/troubleshooting/rtk-corrections-not-arriving/#check-2) |
| Połączono, ale brak danych RTCM, połączenie zrywa się co kilka sekund | Caster najpierw potrzebuje pozycji GGA | [Sprawdzenie 3](https://docs.uavmatrix.com/pl/troubleshooting/rtk-corrections-not-arriving/#check-3) |
| RTCM przekazane, a fix pozostaje na Fix 3D | Łącze z kontrolerem lotu nie działa albo odbiornik nie obsługuje RTK | [Sprawdzenie 4](https://docs.uavmatrix.com/pl/troubleshooting/rtk-corrections-not-arriving/#check-4) |
| RTK Float, nigdy RTK Fixed | Widoczność nieba, odległość od bazy lub czas | [Sprawdzenie 5](https://docs.uavmatrix.com/pl/troubleshooting/rtk-corrections-not-arriving/#check-5) |

## Sprawdzenie 1: Połącz się z casterem

1. Sprawdź **Host castera** i **Port**. Większość publicznych casterów używa zwykłego TCP na porcie `2101`.
2. **Użyj TLS (HTTPS)** musi zgadzać się z casterem. Komercyjne castery (Trimble, Hexagon, Topcon i inne) często wymagają TLS, zwykle nadal na porcie 2101, czasem na 2102 lub 443. Publiczne castery zwykle nie używają TLS.
3. Upewnij się, że dron ma internet. **Panel Główny → Cellular** powinien być połączony. Jeśli nie, zobacz [Modem połączony, brak internetu](https://docs.uavmatrix.com/pl/troubleshooting/modem-no-internet/).
4. Niektóre plany komórkowe blokują nietypowe porty wychodzące. Jeśli caster oferuje port 443, spróbuj go.

## Sprawdzenie 2: Dane logowania i mountpoint

1. Naciśnij **Testuj połączenie**. Komunikat **Caster accepted the credentials.** oznacza, że nazwa użytkownika i hasło są poprawne.
2. Dla rtk2go.com użyj jako **Nazwa użytkownika** prawdziwego adresu e-mail, a **Hasło** zostaw puste.
3. Naciśnij **Przeglądaj mountpointy** i wybierz mountpoint z listy zamiast wpisywać nazwę. Wybieraj ten najbliższy miejscu, w którym latasz.

Jeśli caster zamiast danych zwraca swoją tablicę *sourcetable*, dziennik NTRIP podaje *caster returned sourcetable — check mountpoint*. Nazwa mountpointu jest błędna albo już nie istnieje.

## Sprawdzenie 3: Wyślij GGA w górę

Castery VRS i z najbliższym mountpointem wysyłają poprawki dopiero wtedy, gdy znają twoją pozycję. Kolumna **NMEA** w przeglądarce mountpointów pokazuje **Required** dla takich mountpointów.

1. Włącz **Send GGA upstream** (domyślnie włączone). **Interwał wysyłania (sekundy)** domyślnie wynosi 10.
2. **Źródło pozycji**: **Live position from flight controller** jest właściwe w locie. Dopóki kontroler lotu nie zgłasza fixa GPS, UAVcast-Pro używa **Fixed manual position**, więc przy testach na stanowisku wpisz szerokość i długość geograficzną blisko siebie.
3. Obserwuj, jak aktualizuje się **Last GGA sent**.

Gdy caster przestaje odpowiadać, UAVcast-Pro sam się ponownie łączy, a dziennik pokazuje *no data from caster for …s — reconnecting*. Po krótkim zerwaniu internetu poprawki wznawiają się w ciągu kilku sekund.

## Sprawdzenie 4: Od UAVcast-Pro do odbiornika

Poprawki docierają do GPS przez łącze z kontrolerem lotu, jako MAVLink `GPS_RTCM_DATA`.

1. Kontroler lotu musi być **Połączono** na **Kontroler Lotu → Połączenie**. Jeśli nie, zobacz [Brak heartbeat MAVLink](https://docs.uavmatrix.com/pl/troubleshooting/no-mavlink-heartbeat/).
2. Spójrz na kartę **Jakość GPS**. **No RTK status from receiver** oznacza, że kontroler lotu nigdy nie zgłaszał statusu RTK. Podłączony GPS zwykle nie obsługuje RTK: RTK wymaga odbiornika z pomiarem fazy nośnej, na przykład u-blox F9P, Here3+ lub Septentrio Mosaic. Zwykły moduł nawigacyjny M8N lub M10 nie wystarczy do RTK.
3. **Recent message types** powinno zawierać konstelacje, których używa twój odbiornik (na przykład 1077 GPS, 1087 GLONASS, 1097 Galileo, 1127 BeiDou), oraz komunikat pozycji bazy (1005 lub 1006).

## Sprawdzenie 5: Float, ale nigdy Fixed

- Zapewnij antenie otwarte niebo. Drzewa, budynki i elektronika samego drona powodują wielodrogowość i szumy.
- Czekaj. Zimny start może zająć minutę lub dwie nawet w dobrych warunkach.
- Wybierz bliższą bazę. Dokładność i szansa na fix maleją wraz z odległością od stacji bazowej.
- **Ostatnia poprawka** w **Jakość GPS** powinna utrzymywać się na poziomie kilku sekund. Jeśli rośnie, poprawki są tracone w łączu.

## Nadal nie działa?

[Pobierz logi](https://docs.uavmatrix.com/pl/troubleshooting/collect-logs/) z zaznaczonym **NTRIP Client** i wyślij je wraz z dostawcą castera i modelem GPS na **[support@uavmatrix.com](mailto:support@uavmatrix.com)**. Pełna konfiguracja znajduje się w [Konfiguracja RTK z casterem NTRIP](https://docs.uavmatrix.com/pl/guides/rtk-ntrip-caster/).

Powiązane: [Ustawienia NTRIP / RTK](https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/ntrip-rtk/)

Source: https://docs.uavmatrix.com/pl/troubleshooting/rtk-corrections-not-arriving/
