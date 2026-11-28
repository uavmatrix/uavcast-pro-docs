# Porty i protokoły

> Każdy port używany przez UAVcast-Pro i Fleet Manager: MAVLink UDP 14550, wideo UDP 5600, kamera 2 i audio, interfejs webowy, podgląd, RTSP, NTRIP i MQTT 8883.

Użyj tej strony, aby skonfigurować zapory na stacji naziemnej, w sieci drona i w sieciach firmowych. Podano wartości domyślne; tam, gdzie port można zmienić, wskazano odpowiednie ustawienie.

## Stacja naziemna: ruch przychodzący

UAVcast-Pro **wysyła** telemetrię i wideo do każdej stacji naziemnej. Stacja naziemna musi jedynie przyjmować przychodzący UDP; na dronie nic w tym celu nie musi nasłuchiwać.

| Port (domyślny) | Protokół | Co | Ustawienie |
| --- | --- | --- | --- |
| **14550** | UDP | Telemetria MAVLink, w obu kierunkach, gdy GCS odpowie | **Stacje Naziemne → Port Telemetrii** |
| **5600** | UDP | Wideo: H.264 w RTP, typ ładunku 96 | **Port Wideo** |
| **Port Wideo + 1** (5601) | UDP | Wideo z kamery 2, gdy włączony jest **Podwójny strumień** | **Port Wideo (Kamera 2)** (puste = Port Wideo + 1) |
| **Port Wideo + 2** (5602) | UDP | Audio: Opus w RTP, typ ładunku 97, gdy włączone jest **Wysyłaj audio do stacji naziemnych** | Zależy od **Port Wideo** |

> **Port TCP 5760 jest zamknięty**
>
> Od v6.5.0 router telemetrii nie nasłuchuje na porcie TCP 5760. Stacje naziemne łączą się przez UDP z miejscami docelowymi, które dodasz.

**Przy powiązaniach strumieni Fleet Manager** pierwszy dron powiązany ze stacją naziemną używa 5600/14550, a każdy kolejny dron dostaje własny blok portów: port wideo z miejscem na kamerę 2 i audio za nim oraz port telemetrii. Odczytaj porty przy każdym powiązaniu.

## Dron: usługi, z którymi się łączysz

| Port | Protokół | Co | Uwagi |
| --- | --- | --- | --- |
| **80** | TCP (HTTP) | Interfejs webowy | Zmień w **Aplikacja → Ustawienia → Port Serwera** (80 lub wyższy). |
| **8889** | TCP (HTTP) | Podgląd na żywo w przeglądarce (WebRTC) | Używany przez **Kamera → Podgląd na Żywo** i okna wideo na mapie lotu. |
| 8189 | UDP | Media WebRTC dla podglądu na żywo | Domyślny dla serwera mediów. |
| **9996** | TCP (HTTP) | Odtwarzanie nagrań | Używany przez bibliotekę nagrań i odtwarzacz przeglądu lotu. |
| **8554** | TCP (RTSP) | Kopia strumienia kamery w RTSP (`/camera`, `/camera2`) | Dostępna, gdy włączony jest podgląd na żywo lub nagrywanie. |
| 8888 | TCP (HTTP) | Kopia strumienia kamery w HLS | Nieużywana przez interfejs webowy. |
| Wstrzykiwacz HTTP | TCP (HTTP) | `http://<drone>/api/inject/<token>` | Obsługiwany na porcie interfejsu webowego. Zobacz [Wstrzykiwacze](https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/injectors/). |
| Wstrzykiwacz UDP | UDP | Dowolny (14600 to bezpieczny wybór domyślny) | Ustawiany dla każdego wstrzykiwacza w **Kontroler Lotu → Wstrzykiwacze**. |

Przez VPN te porty muszą być osiągalne pod adresem VPN drona. Po stronie sieci komórkowej przekierowanie portów nie jest potrzebne.

## Dron: ruch wychodzący

Dron sam otwiera te połączenia. Sieci, które przepuszczają tylko ruch webowy, zablokują część z nich.

| Miejsce docelowe | Port | Protokół | Co |
| --- | --- | --- | --- |
| Stacje naziemne | 14550, 5600 (+1, +2) | UDP | Telemetria, wideo, audio |
| `uavmatrix.com` | 443 | HTTPS | Aktywacja licencji i okresowe sprawdzenia |
| `install.uavmatrix.com` | 443 | HTTPS | Instalator i aktualizacje |
| `fleet-manager.uavmatrix.com` | 443 | HTTPS | Parowanie z Fleet Manager |
| Broker Fleet Manager | **8883** | MQTT przez TLS (certyfikaty klienta) | Status, telemetria i polecenia Fleet Manager |
| `vpn-connect.uavmatrix.com` | 443 | HTTPS | Serwer logowania VPN Fleet Manager |
| Twój caster NTRIP | 2101 (lub zgodnie z ustawieniem) | TCP, opcjonalnie TLS | Poprawki RTCM |
| ZeroTier / Tailscale | ZeroTier 9993, Tailscale 41641 (oraz 443 jako zapas) | UDP | Tunele VPN |
| Twój dostawca DNS | 443 | HTTPS | Aktualizacje Dynamicznego DNS |

## Wewnątrz drona (tylko lokalnie)

Te porty są używane między usługami UAVcast-Pro i nie wymagają reguł zapory.

| Port | Co |
| --- | --- |
| 6379 | Redis, wewnętrzna magistrala komunikatów |
| 12550, 12551 | Router telemetrii do aplikacji UAVcast-Pro i do klienta NTRIP |
| 8090 | Nasłuch HTTP wstrzykiwacza (dostępny przez `/api/inject/…` na porcie 80) |
| 9997 | API serwera mediów |
| 5000 | API usługi działającej w tle UAVcast-Pro, używane przez interfejs webowy |

## Reguły zapory dla stacji naziemnej

**Windows**

```powershell
New-NetFirewallRule -DisplayName "MAVLink Telemetry" -Direction Inbound -Protocol UDP -LocalPort 14550 -Action Allow
New-NetFirewallRule -DisplayName "UAV Video" -Direction Inbound -Protocol UDP -LocalPort 5600-5602 -Action Allow
```

**Linux (UFW)**

```bash
sudo ufw allow 14550/udp comment 'MAVLink Telemetry'
sudo ufw allow 5600:5602/udp comment 'UAV Video and audio'
```

Dodaj kolejne porty, jeśli używasz innych portów telemetrii lub wideo albo kilku dronów przez powiązania strumieni Fleet Manager.

Source: https://docs.uavmatrix.com/pl/reference/ports-and-protocols/
