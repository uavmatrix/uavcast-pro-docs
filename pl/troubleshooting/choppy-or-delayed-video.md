# Poszarpane, opóźnione lub szare wideo przez 4G

> Napraw zacinanie się obrazu, szare zakłócenia i opóźnienia w wideo UAVcast-Pro przez LTE lub VPN, dopasowując bitrate, rozdzielczość, FPS i Szybkość Odzyskiwania Strumienia do łącza.

Obraz dociera, ale się zacina, zamraża, pokrywa szarymi blokami albo ma kilka sekund opóźnienia. Prawie zawsze strumień wymaga więcej, niż łącze może przenieść, albo enkoder wysyła klatki kluczowe zbyt rzadko, by odzyskać obraz po utraconych pakietach.

| Co widzisz | Prawdopodobna przyczyna | Zacznij od |
| --- | --- | --- |
| Szare lub zielone zakłócenia, które znikają po sekundzie lub dwóch | Utracone pakiety i zbyt mało klatek kluczowych do odzyskania obrazu | [Sprawdzenie 2](https://docs.uavmatrix.com/pl/troubleshooting/choppy-or-delayed-video/#check-2) |
| Płynnie przez Wi-Fi, ale zacina się lub zamraża przez LTE | Bitrate wyższy niż to, co przenosi łącze komórkowe | [Sprawdzenie 1](https://docs.uavmatrix.com/pl/troubleshooting/choppy-or-delayed-video/#check-1) |
| Zacina się nawet w sieci lokalnej | Limit CPU w dronie lub stacja naziemna nie nadąża z dekodowaniem | [Sprawdzenie 3](https://docs.uavmatrix.com/pl/troubleshooting/choppy-or-delayed-video/#check-3) |
| Wideo jest o kilka sekund za dronem | Oglądasz podgląd w przeglądarce lub stacja naziemna buforuje | [Sprawdzenie 4](https://docs.uavmatrix.com/pl/troubleshooting/choppy-or-delayed-video/#check-4) |

## Sprawdzenie 1: Obniż bitrate i rozdzielczość

Łącze wysyłania w sieci komórkowej jest wielokrotnie wolniejsze niż pobieranie i zmienia się, gdy dron przelatuje między komórkami. Zacznij od niskich wartości i stopniowo je zwiększaj.

1. Przejdź do **Kamera → Ustawienia kamery**.
2. Ustaw **Rozdzielczość** na 1280×720 lub mniej.
3. Ustaw **Wybierz FPS** na 15 lub 20.
4. Przesuń suwak **Bitrate:** na około 1000–1500 kbps. `0` oznacza tryb automatyczny.
5. Ustawienia zapisują się w trakcie zmian, a kamera je od razu przejmuje.
6. Poleć lub przejedź trasę, na której Ci zależy. Jeśli wszystko działa, zwiększaj po jednej wartości naraz.

![Karta Ustawienia Kamery z polami Rozdzielczość, Wybierz FPS, Bitrate i Szybkość Odzyskiwania Strumienia](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/camera--settings.webp)

*Kamera → Ustawienia Kamery: Rozdzielczość, Wybierz FPS, Bitrate i Szybkość Odzyskiwania Strumienia to wartości do dostrojenia pod łącze.*

> **Ile przenosi łącze?**
>
> **Panel Główny → Ruch Sieciowy** pokazuje bieżącą szybkość TX dla każdego interfejsu. Jeśli interfejs modemu trzyma się tego samego pułapu, niezależnie od ustawionego bitrate, ten pułap to Twoje łącze wysyłania.

## Sprawdzenie 2: Ustaw wyższą Szybkość Odzyskiwania Strumienia

Szare nakładki pojawiają się przez utracone pakiety. Dekoder może naprawić obraz dopiero przy następnej klatce kluczowej. **Szybkość Odzyskiwania Strumienia** określa, jak często wysyłane są klatki kluczowe.

1. W **Kamera → Ustawienia kamery** znajdź **Szybkość Odzyskiwania Strumienia**.
2. Przesuń suwak z **Auto** w stronę **Ultra Fast**: mniej klatek między klatkami kluczowymi szybciej naprawia obraz, ale zużywa więcej pasma. W stronę **Bandwidth Saver** oszczędza pasmo, ale odzyskuje obraz wolno. Podpowiedź pod suwakiem (na przykład *VPN/WiFi Friendly*) mówi, do jakiej sytuacji pasuje dana pozycja.
3. Zapisz i porównaj. Jeśli łącze jest bardzo wolne, połącz szybsze odzyskiwanie z niższym bitrate (sprawdzenie 1).

Na **Auto** UAVcast-Pro wysyła jedną klatkę kluczową na sekundę (co *FPS* klatek, albo co 30 klatek, gdy FPS jest na auto).

## Sprawdzenie 3: Sprawdź obciążenie CPU

UAVcast-Pro koduje H.264 programowo. Na Raspberry Pi Zero 2 W albo przy dwóch kamerach strumieniujących naraz procesor może się przeciążyć.

1. Otwórz **Kamera → Ustawienia kamery** i spójrz na kartę **Obciążenie systemu**.
2. Jeśli karta pokazuje **CPU is near its limit. Lower the resolution or bitrate.**, obniż rozdzielczość lub bitrate.
3. Przy włączonym **Podwójny strumień** obniż rozdzielczość lub bitrate jednego strumienia albo wyłącz drugi.
4. Sprawdź **Panel Główny** pod kątem **Slowed down (heat or power)** w **Power supply**. Zdławiony procesor koduje wolniej. Zobacz [Podnapięcie i throttling](https://docs.uavmatrix.com/pl/troubleshooting/undervoltage-and-throttling/).

## Sprawdzenie 4: Wiedz, który strumień oglądasz

**Podgląd na Żywo** w przeglądarce i okno wideo na **Mapie Lotu** korzystają z wbudowanego serwera mediów, który dodaje opóźnienie. Służą do konfiguracji, a nie do lotu. Strumień do stacji naziemnej idzie bezpośrednio przez UDP i ma znacznie mniejsze opóźnienie.

Jeśli sama stacja naziemna opóźnia obraz:

- W QGroundControl sprawdź, czy tryb niskiego opóźnienia jest włączony w ustawieniach wideo.
- W potokach GStreamer użyj `sync=false` na video sink, jak w [poleceniu testowym](https://docs.uavmatrix.com/pl/troubleshooting/no-video-in-gcs/#check-5).
- Przez VPN upewnij się, że ZeroTier lub Tailscale łączy się z dronem bezpośrednio, a nie przez relay. Tailscale pokazuje używany relay w sekcji **Relay** na stronie **Sieć Prywatna VPN**.

## Sprawdzenie 5: Sprawdź sygnał komórkowy

Wejdź do **Modem** i spójrz na **Signal Quality** oraz **Technology** w sekcji **Informacje o Modemie**. Słaby sygnał albo spadek z LTE na 3G ogranicza łącze wysyłania. Przesuń modem z dala od kontrolera lotu, regulatorów ESC i przewodów zasilających albo użyj modemu z zewnętrznymi antenami.

## Nadal zacina się?

[Pobierz logi](https://docs.uavmatrix.com/pl/troubleshooting/collect-logs/) (**Camera Server**, ostatnie 30 minut) i wyślij je na **[support@uavmatrix.com](mailto:support@uavmatrix.com)** wraz z modelem kamery, rozdzielczością, FPS, bitrate i rodzajem łącza, na którym latasz.

Powiązane: [Ustawienia kamery](https://docs.uavmatrix.com/pl/uavcast-pro/camera/) · [Modem komórkowy](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/cellular-modem/)

Source: https://docs.uavmatrix.com/pl/troubleshooting/choppy-or-delayed-video/
