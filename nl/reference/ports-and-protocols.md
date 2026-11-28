# Poorten en protocollen

> Elke poort die UAVcast-Pro en Fleet Manager gebruiken: MAVLink UDP 14550, video UDP 5600, camera 2 en audio, web, preview, RTSP, NTRIP en MQTT 8883.

Gebruik deze pagina om firewalls in te stellen op het grondstation, op het netwerk van de drone en in bedrijfsnetwerken. De standaardwaarden worden getoond; waar een poort gewijzigd kan worden, wordt de instelling genoemd.

## Grondstation: inkomend verkeer

UAVcast-Pro **verstuurt** telemetrie en video naar elk grondstation. Het grondstation hoeft alleen inkomend UDP te accepteren; op de drone hoeft voor dit doel niets te luisteren.

| Poort (standaard) | Protocol | Wat | Instelling |
| --- | --- | --- | --- |
| **14550** | UDP | MAVLink-telemetrie, in beide richtingen zodra het GCS antwoordt | **Grondcontrolestations → Telemetriepoort** |
| **5600** | UDP | Video: H.264 in RTP, payloadtype 96 | **Videopoort** |
| **Videopoort + 1** (5601) | UDP | Video van camera 2 wanneer **Dubbele stream** aan staat | **Videopoort (Camera 2)** (leeg = Videopoort + 1) |
| **Videopoort + 2** (5602) | UDP | Audio: Opus in RTP, payloadtype 97, wanneer **Audio naar grondstations sturen** aan staat | Volgt **Videopoort** |

> **TCP 5760 is gesloten**
>
> Sinds v6.5.0 luistert de telemetrierouter niet meer op TCP 5760. Grondstations maken verbinding via UDP met de bestemmingen die u toevoegt.

**Met Fleet Manager-streamkoppelingen** gebruikt de eerste drone die aan een grondstation is gekoppeld 5600/14550, en elke extra drone krijgt een eigen blok poorten: een videopoort met ruimte voor camera 2 en audio erna, en een telemetriepoort. Lees de poorten op elke koppeling.

## Drone: diensten waarmee u verbinding maakt

| Poort | Protocol | Wat | Opmerkingen |
| --- | --- | --- | --- |
| **80** | TCP (HTTP) | Webinterface | Wijzigen via **Applicatie → Instellingen → Serverpoort** (80 of hoger). |
| **8889** | TCP (HTTP) | Live voorvertoning in de browser (WebRTC) | Gebruikt door **Camera → Live Voorvertoning** en de videovensters op de Vliegkaart. |
| 8189 | UDP | WebRTC-media voor de live voorvertoning | Standaard van de mediaserver. |
| **9996** | TCP (HTTP) | Afspelen van opnames | Gebruikt door de opnamebibliotheek en de speler voor vluchtterugblik. |
| **8554** | TCP (RTSP) | RTSP-kopie van de camerastream (`/camera`, `/camera2`) | Beschikbaar zolang de live voorvertoning of opname aan staat. |
| 8888 | TCP (HTTP) | HLS-kopie van de camerastream | Wordt niet gebruikt door de webinterface. |
| HTTP-injector | TCP (HTTP) | `http://<drone>/api/inject/<token>` | Wordt aangeboden op de poort van de webinterface. Zie [Injectors](https://docs.uavmatrix.com/nl/uavcast-pro/flight-controller/injectors/). |
| UDP-injector | UDP | Naar keuze (14600 is een veilige standaard) | Per injector in te stellen via **Vluchtcontroller → Injectors**. |

Via een VPN moeten deze poorten bereikbaar zijn op het VPN-adres van de drone. Aan de mobiele kant is geen portforwarding nodig.

## Drone: uitgaand verkeer

De drone opent deze verbindingen zelf. Netwerken die alleen webverkeer toestaan, blokkeren sommige ervan.

| Bestemming | Poort | Protocol | Wat |
| --- | --- | --- | --- |
| Grondstations | 14550, 5600 (+1, +2) | UDP | Telemetrie, video, audio |
| `uavmatrix.com` | 443 | HTTPS | Licentieactivering en periodieke controles |
| `install.uavmatrix.com` | 443 | HTTPS | Installatieprogramma en updates |
| `fleet-manager.uavmatrix.com` | 443 | HTTPS | Koppeling met Fleet Manager |
| Fleet Manager-broker | **8883** | MQTT over TLS (clientcertificaten) | Fleet Manager-status, telemetrie en commando's |
| `vpn-connect.uavmatrix.com` | 443 | HTTPS | Aanmeldserver van het Fleet Manager-VPN |
| Uw NTRIP-caster | 2101 (of zoals ingesteld) | TCP, optioneel TLS | RTCM-correcties |
| ZeroTier / Tailscale | ZeroTier 9993, Tailscale 41641 (en 443 als terugvaloptie) | UDP | VPN-tunnels |
| Uw DNS-provider | 443 | HTTPS | Updates van dynamische DNS |

## Binnen de drone (alleen lokaal)

Deze poorten worden gebruikt tussen de eigen services van UAVcast-Pro en hebben geen firewallregels nodig:

| Poort | Wat |
| --- | --- |
| 6379 | Redis, interne berichtenbus |
| 12550, 12551 | Telemetrierouter naar de UAVcast-Pro-app en naar de NTRIP-client |
| 8090 | HTTP-listener van de injector (bereikbaar via `/api/inject/…` op poort 80) |
| 9997 | API van de mediaserver |
| 5000 | API van de UAVcast-Pro-achtergrondservice, gebruikt door de webinterface |

## Firewallregels voor het grondstation

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

Voeg meer poorten toe als u andere telemetrie- of videopoorten gebruikt, of meerdere drones via Fleet Manager-streamkoppelingen.

Source: https://docs.uavmatrix.com/nl/reference/ports-and-protocols/
