# Android i tablety

> Odbieraj telemetrię UAVcast-Pro i wideo na żywo na telefonie lub tablecie z Androidem w QGroundControl, przez Wi-Fi lub 4G przez VPN, a także opcję przeglądarki dla iPada.

QGroundControl dla Androida odbiera telemetrię UAVcast-Pro na porcie UDP 14550 i wideo na porcie UDP 5600, dokładnie tak jak wersja na komputer. Przez 4G zainstaluj na tablecie aplikację ZeroTier lub Tailscale, aby dron mógł się z nim połączyć.

## Konfiguracja QGroundControl na Androidzie

1. Zainstaluj **QGroundControl** z [Google Play](https://play.google.com/store/apps/details?id=org.mavlink.qgroundcontrol).

2. Połącz tablet z siecią, do której wysyła dron:

   - **Ta sama sieć Wi-Fi**: znajdź adres IP tabletu w **Settings → Wi-Fi → (twoja sieć) → Advanced** lub podobnym miejscu.
   - **Przez 4G**: zainstaluj aplikację [ZeroTier One](https://play.google.com/store/apps/details?id=com.zerotier.one) lub [Tailscale](https://play.google.com/store/apps/details?id=com.tailscale.ipn), dołącz do tej samej sieci co dron (zobacz [VPN](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/vpn/)) i zapisz adres VPN tabletu.

3. Na dronie dodaj miejsce docelowe w [Stacjach Naziemnych](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/) z adresem IP tabletu, z włączoną opcją **Włącz Telemetrię** i **Włącz Wideo**.

4. Otwórz QGroundControl. Pojazd pojawi się, gdy dotrze telemetria.

5. Wideo: ikona **Q** → **Application Settings** → **Video** (w starszych wersjach sekcja **Video** w **General**), ustaw **Source** na **UDP h.264 Video Stream** i sprawdź, czy adres UDP używa portu `5600`.

Gdy wszystko działa, widok **Fly** pokazuje dron na mapie z trybem lotu i baterią na pasku narzędzi, a obraz z kamery w małym oknie wideo w rogu. Dotknij okna, aby zamienić wideo z mapą.

> **Utrzymuj połączenie z aplikacją VPN**
>
> Android może zatrzymywać aplikacje VPN w tle, aby oszczędzać baterię. Wyłącz optymalizację baterii dla ZeroTier lub Tailscale i trzymaj VPN włączony podczas lotu.

Szczegóły ustawień wideo, trybu niskiego opóźnienia i częstych problemów znajdziesz na [stronie QGroundControl](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/qgroundcontrol/).

## iPad, iPhone i inne urządzenia: użyj przeglądarki

Interfejs webowy UAVcast-Pro działa w każdej nowoczesnej przeglądarce. Na iPadzie lub telefonie otwórz `http://<drone-ip>` (adres VPN przy 4G) i skorzystaj z [Mapy Lotu](https://docs.uavmatrix.com/pl/uavcast-pro/flight-map/): mapa na żywo, kokpitowy HUD, wideo z kamery, uzbrajanie i rozbrajanie oraz RTL. Wideo jest tam podglądem na żywo (WebRTC), więc przeglądarka musi mieć dostęp do portu 8889 na dronie.

## Typowe problemy

| Objaw | Rozwiązanie |
| --- | --- |
| Pojazd nigdy się nie pojawia przez 4G | Aplikacja VPN na tablecie jest wyłączona albo miejsce docelowe używa adresu IP Wi-Fi. Użyj adresu VPN tabletu. |
| Działa, dopóki ekran się nie wyłączy | Android wstrzymał aplikację VPN. Wyłącz dla niej optymalizację baterii. |
| Telemetria działa, brak wideo | Sprawdź **Włącz Wideo**, kamerę i ustawienia źródła wideo w QGroundControl. |

Source: https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/android/
