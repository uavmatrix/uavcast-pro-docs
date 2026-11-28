# Otwórz UAVcast-Pro zdalnie

> Dotrzyj do ustawień UAVcast-Pro drona skądkolwiek przez Fleet Manager, za pomocą wbudowanego proxy bez VPN lub bezpośrednio przez VPN organizacji.

Możesz zmieniać ustawienia UAVcast-Pro drona (kamera, modem, stacje naziemne itd.) bez bycia w tej samej sieci co dron. Na [stronie UAV](https://docs.uavmatrix.com/pl/fleet-manager/fleet/uav-details/) karta **UAVcast Application** ma dwa przyciski:

| Przycisk | Sposób połączenia | Do czego służy |
| --- | --- | --- |
| **Open via Proxy** | Przez szyfrowane połączenie Fleet Manager z dronem. Działa dla każdego drona online, bez VPN. | Zmiany konfiguracji i podstawowe zarządzanie. |
| **Open via VPN** | Otwiera bezpośrednio `http://<adres VPN drona>`. Widoczny tylko wtedy, gdy dron jest w VPN twojej organizacji, a twój komputer też musi być w tym VPN. | Wszystko, w tym mapa lotu na żywo i telemetria. |

Proxy jest dla Owner i Admin. Fleet Manager odmawia go Viewerom komunikatem **Access denied. Only administrators can access UAVcast remotely.**

## Otwórz przez Proxy

1. Na stronie UAV wybierz **Open via Proxy**.
2. Przeczytaj okno **Remote UAVcast Access via Proxy** i wybierz **Continue**.
3. UAVcast-Pro otworzy się w nowej karcie na stronie **Application**. Zaloguj się użytkownikiem UAVcast-Pro drona, bo proxy nie przekazuje twojego loginu do Fleet Manager. (Dron, który nie ma jeszcze użytkowników UAVcast-Pro, otworzy się bez logowania.)

![Okno Remote UAVcast Access via Proxy z listą niedostępnych funkcji](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/drone-detail--proxy-warning.webp)

*Okno Remote UAVcast Access via Proxy z listą funkcji WebSocket, które są niedostępne: telemetria na żywo, status połączenia MAVLink i mapa lotu.*

Proxy przenosi zwykłe żądania stron, a nie połączenia na żywo. **WebSocket features unavailable** oznacza, że przez nie nie działają:

- telemetria na żywo i aktualizacje w czasie rzeczywistym
- status połączenia MAVLink
- mapa lotu

Każde żądanie ma 30 sekund na zakończenie. Przy wolnym łączu duże strony mogą przekroczyć limit czasu: **Request timed out. UAVcast may be unreachable.** Jeśli dron jest offline, zobaczysz **Drone is offline. UAVcast interface is not available.**

> **Ostrożnie z ustawieniami sieci przez proxy**
>
> Proxy działa przez własne łącze internetowe drona. Jeśli zmienisz ustawienia modemu, priorytetu sieci lub VPN i dron straci internet, proxy też przestanie działać, a naprawa będzie wymagała dostępu lokalnego.

## Otwórz przez VPN

Dołącz swój komputer do VPN organizacji tak samo jak stację naziemną (zobacz [Podłącz stację naziemną](https://docs.uavmatrix.com/pl/fleet-manager/connect-gcs/)). Wtedy **Open via VPN** otwiera interfejs drona bezpośrednio, ze wszystkimi funkcjami na żywo. To lepszy wybór do wszystkiego poza zmianą pojedynczego ustawienia.

Source: https://docs.uavmatrix.com/pl/fleet-manager/fleet/remote-uavcast/
