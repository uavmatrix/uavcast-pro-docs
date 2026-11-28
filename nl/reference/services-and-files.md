# Services, bestanden en installatieopties

> De systemd-services die UAVcast-Pro installeert, waar de database, logboeken en opnames staan, installatieopties voor versies en handige SSH-commando's.

Voor wanneer u op het apparaat via SSH werkt: welke services UAVcast-Pro vormen, waar de bestanden staan en hoe u een bepaalde versie installeert.

## Services

UAVcast-Pro draait als een set systemd-services. Elke service herstart zichzelf wanneer hij faalt.

| Service | Wat hij doet |
| --- | --- |
| `uavcast-web` | De webinterface (Node.js). Luistert op poort 80, tenzij u **Serverpoort** hebt gewijzigd. |
| `uavcast-factory` | Achtergrond-API: licentie, modem, VPN, netwerk, logboeken, opslag van opnames en de verbinding met Fleet Manager. |
| `mavlink-manager` | Verbinding met de vluchtcontroller en telemetrierouter naar de grondstations. Start zonder op internet te wachten. |
| `uavcast-camera` | Cameraopname, H.264-codering en de UDP-videostream. Start zonder op internet te wachten. |
| `mediamtx` | Mediaserver voor de browserpreview, RTSP en opnames. |
| `uavcast-ntrip` | NTRIP-client voor RTK-correcties. |
| `uavcast-dns` | Updater voor dynamische DNS. |
| `redis-server` | Interne berichtenbus waarop de andere services afhankelijk zijn. |
| `zerotier-one`, `tailscaled` | VPN-clients, geïnstalleerd door het installatieprogramma van UAVcast-Pro. |

Nuttige commando's:

```bash
sudo systemctl status uavcast-web            # is it running?
sudo systemctl restart uavcast-camera        # restart one service
journalctl -u mavlink-manager -f             # follow a service's log live
journalctl -u uavcast-web --since yesterday  # read recent history
```

## Bestanden en mappen

Alles staat onder `/opt/uavcast-pro`.

| Pad | Inhoud |
| --- | --- |
| `/opt/uavcast-pro/uavcast.db` | Instellingendatabase (SQLite). Maak er een back-up van via **Applicatie → Database → Database Back-up**. |
| `/opt/uavcast-pro/logs/` | Servicelogboeken, automatisch geroteerd. Download ze via **Applicatie → Logboekregistratie**. |
| `/opt/uavcast-pro/recordings/` | Cameraopnames en telemetrielogboeken op het interne geheugen (tenzij **Opslaglocatie** naar een USB-schijf of een andere map wijst). |
| `/opt/uavcast-pro/missions/` | Opgeslagen missies. |
| `/opt/uavcast-pro/installer.log` | Logboek van de laatste installatie. |
| `/etc/systemd/system/uavcast-web.service` | Service van de webinterface, inclusief `SERVER_PORT`. |

## Installatieopties

Het installatieprogramma is één commando. Voer het opnieuw uit om een installatie te herstellen of bij te werken.

```bash
# Install or update to the latest version
curl -fsSL https://install.uavmatrix.com | sudo bash

# List the versions available for this device's architecture
curl -fsSL https://install.uavmatrix.com | bash -s -- -l

# Install a specific version
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2
```

| Optie | Betekenis |
| --- | --- |
| `-l` | Beschikbare versies tonen voor de architectuur van dit apparaat (arm64 of amd64). |
| `-b <version>` | Die versie installeren in plaats van de nieuwste. |

Het installatieprogramma detecteert de architectuur en het besturingssysteem, installeert systeempakketten, ZeroTier, Tailscale en de cameropakketten, configureert de UART van de Raspberry Pi, zet de services op en start de webinterface. Het logboek staat in `/opt/uavcast-pro/installer.log`.

U kunt ook bijwerken via de webinterface: ga naar **Applicatie → Applicatie Bijwerken**, kies een versie bij **Selecteer versie om bij te werken** en klik op **Nu Bijwerken**.

## Integratiepunten

UAVcast-Pro heeft geen openbare REST-API. Gebruik voor integratie:

- **MAVLink over UDP** naar elke bestemming van een grondstation (standaard poort 14550), voor elke MAVLink-compatibele software.
- **Video** via RTP/UDP (poort 5600) of via RTSP vanaf de drone (poort 8554). Zie [VLC en RTSP](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/vlc-and-rtsp/).
- **Injectors** om uw eigen sensorwaarden via HTTP, UDP of serieel in de MAVLink-stream te pushen. Zie [Injectors](https://docs.uavmatrix.com/nl/uavcast-pro/flight-controller/injectors/).

Source: https://docs.uavmatrix.com/nl/reference/services-and-files/
