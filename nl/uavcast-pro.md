# UAVcast-Pro

> Naslag voor de UAVcast-Pro-webinterface: dashboard, vluchtcontroller, vliegkaart, grondstations, camera, modem, VPN, Fleet Manager-koppeling, gebruikers en instellingen.

Dit gedeelte beschrijft elke pagina van de UAVcast-Pro-webinterface, in de volgorde van de zijbalk van de app. Elke pagina vertelt u waarvoor het scherm dient, hoe u het instelt, en somt elke instelling met de standaardwaarde op. Nieuw bij UAVcast-Pro? Begin met de [Snelstart](https://docs.uavmatrix.com/nl/get-started/quick-start/).

## Operaties

[DashboardGezondheid van de vluchtcontroller, GPS, verbindingen, video en voeding in één oogopslag.](https://docs.uavmatrix.com/nl/uavcast-pro/dashboard/)[DatastromenAangepaste live dashboards voor elke MAVLink- of sensorwaarde.](https://docs.uavmatrix.com/nl/uavcast-pro/data-streams/)[VluchtcontrollerUSB- of UART-verbinding met automatische detectie van poort en baudrate, NTRIP/RTK en injectors.](https://docs.uavmatrix.com/nl/uavcast-pro/flight-controller/)[VliegkaartLive kaart, cockpit-HUD, armen en ontwapenen, modi, missies, radio, inspector en logboekanalyse.](https://docs.uavmatrix.com/nl/uavcast-pro/flight-map/)[Grondstations en videoBestemmingen, plus stap-voor-stap instellingen voor Mission Planner, QGroundControl, GStreamer, Android en VLC.](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/)

## Connectiviteit

[ModemHiLink- en traditionele 4G/LTE-modems met automatische APN.](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/cellular-modem/)[Virtueel PrivénetwerkHet Fleet Manager-VPN, of uw eigen Tailscale- of ZeroTier-netwerk.](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/vpn/)[Dynamische DNSHoud een hostnaam gekoppeld aan het publieke IP-adres van de drone.](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/dynamic-dns/)[NetwerkenInterfaces en de prioriteit van Wi-Fi versus modem.](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/networks/)

## Media

[Camera-instellingenCSI- en USB-camera's, resolutie, bitsnelheid, H.264 met lage latentie over UDP.](https://docs.uavmatrix.com/nl/uavcast-pro/camera/)[Twee camera'sWisselen via RC-kanaal of dubbele stream.](https://docs.uavmatrix.com/nl/uavcast-pro/camera/multi-camera/)[AudioMicrofoonaudio in het voorbeeld en naar grondstations.](https://docs.uavmatrix.com/nl/uavcast-pro/camera/audio/)[OpnamesVideo- en telemetrieopnames op de drone, met vluchtterugblik.](https://docs.uavmatrix.com/nl/uavcast-pro/camera/recordings/)

## Beheer

[Fleet ManagementDe drone koppelen aan UAVmatrix Fleet Manager.](https://docs.uavmatrix.com/nl/uavcast-pro/fleet-pairing/)[UsersBeheerdersaanmelding en alleen-lezen gebruikers.](https://docs.uavmatrix.com/nl/uavcast-pro/users/)[ApplicatiePoort, taal, logboeken voor support, databaseback-up en -herstel.](https://docs.uavmatrix.com/nl/uavcast-pro/application-settings/)

## Poorten in één oogopslag

| Poort | Richting | Gebruikt voor |
| --- | --- | --- |
| TCP 80 | Browser → drone | Webinterface (instelbaar) en HTTP-injectors |
| UDP 14550 | Drone → grondstation | MAVLink-telemetrie (per bestemming, instelbaar) |
| UDP 5600 | Drone → grondstation | Video, camera 1 (per bestemming, instelbaar) |
| UDP 5601 | Drone → grondstation | Video, camera 2 met dubbele stream (standaard Videopoort + 1) |
| UDP 5602 | Drone → grondstation | Audio (Videopoort + 2) |
| TCP 8889, UDP 8189 | Browser → drone | Live voorvertoning (WebRTC-signalering en media) |
| TCP 8883 | Drone → Fleet Manager | Verbinding met Fleet Manager (MQTT over TLS) |
| TCP 2101 | Drone → NTRIP-caster | RTK-correcties (poort van de caster) |
| UDP 14600 | Sensor → drone | UDP-injector (standaard, instelbaar) |

Source: https://docs.uavmatrix.com/nl/uavcast-pro/
