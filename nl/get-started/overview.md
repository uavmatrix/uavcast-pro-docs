# Wat is UAVcast-Pro?

> UAVcast-Pro maakt van een Raspberry Pi of Linux-companion computer een 4G/LTE-verbinding voor MAVLink-telemetrie en H.264-video. Zie hoe het samenwerkt met Fleet Manager.

UAVcast-Pro is software voor een companion computer op uw drone, meestal een Raspberry Pi. Het leest MAVLink van elke MAVLink-vluchtcontroller (ArduPilot of PX4), streamt H.264-video van één of twee camera's en stuurt beide naar uw grondstation via wifi, Ethernet of een 4G/LTE-modem. U stelt het in en beheert het via een webinterface die op de drone draait.

UAVmatrix Fleet Manager is de cloud-dashboard die erbij hoort. Koppelt u een drone met UAVcast-Pro aan Fleet Manager, dan ziet u de hele vloot op één kaart, opent u een externe terminal, plant u missies en routeert u video en telemetrie naar grondstations zonder port forwarding. Fleet Manager is inbegrepen bij elke UAVcast-Pro-licentie.

## Hoe de onderdelen samenhangen

```text
 Flight controller ──USB/UART──►  Companion computer running UAVcast-Pro
 (ArduPilot, PX4)                  │  MAVLink router, camera server, modem,
 Camera(s) ──CSI/USB────────────►  │  VPN, NTRIP client, recorder, web UI
                                   │
                                   ├── UDP 14550 (telemetry) ─┐
                                   ├── UDP 5600  (video)    ──┼─► Mission Planner / QGroundControl
                                   │                          │   over LAN, VPN or 4G
                                   └── MQTT/TLS 8883 ─────────┴─► Fleet Manager (optional)
```

- **Op de drone**: UAVcast-Pro beheert de seriële poort van de vluchtcontroller en stuurt MAVLink door naar elk grondstation dat u toevoegt. De cameraserver codeert H.264 en stuurt RTP via UDP naar dezelfde grondstations. Er luistert niets naar inkomende telemetrieverbindingen, tenzij u dat toevoegt.
- **Tussen drone en grond**: op een lokaal netwerk is het eigen IP-adres van het grondstation voldoende. Via 4G heeft de drone geen publiek adres, dus plaatst u beide uiteinden op een VPN. De [Fleet Manager VPN](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/vpn/), inbegrepen bij elke licentie, regelt dit voor u. UAVcast-Pro kan ook lid worden van uw eigen Tailscale- of ZeroTier-netwerk.
- **In de cloud**: wanneer de drone is gekoppeld, houdt hij een uitgaande, met certificaat geauthenticeerde MQTT-verbinding open met Fleet Manager. Zie [Een drone koppelen aan Fleet Manager](https://docs.uavmatrix.com/nl/uavcast-pro/fleet-pairing/).

## Wat u ermee kunt doen

| Gebied | Wat het doet | Pagina |
| --- | --- | --- |
| Telemetrie | Detecteert automatisch de poort en baudrate van de vluchtcontroller, routeert MAVLink naar een willekeurig aantal grondstations, optionele alleen-lezen bestemmingen | [Vluchtcontroller](https://docs.uavmatrix.com/nl/uavcast-pro/flight-controller/), [Grondstations](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/) |
| Video | Raspberry Pi CSI- en USB-camera's, twee camera's met RC-omschakeling of dual stream, audio, aangepaste GStreamer-pipelines | [Camera & video](https://docs.uavmatrix.com/nl/uavcast-pro/camera/) |
| Opname | Neemt de video en telemetrie van elke vlucht op de drone op, met een speler voor de vluchtterugblik | [Opnames](https://docs.uavmatrix.com/nl/uavcast-pro/camera/recordings/) |
| Vliegkaart | Live kaart, cockpit-HUD, armen/ontwapenen, RTL en loiter, missieplanner, MAVLink-inspecteur, loganalyse | [Vliegkaart](https://docs.uavmatrix.com/nl/uavcast-pro/flight-map/) |
| Connectiviteit | 4G/LTE-modems met automatische APN, de Fleet Manager VPN of uw eigen Tailscale- of ZeroTier-netwerk, dynamische DNS, wifi- versus modemprioriteit | [Connectiviteit](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/) |
| RTK | NTRIP-client die RTCM3-correcties naar de vluchtcontroller stuurt | [NTRIP / RTK](https://docs.uavmatrix.com/nl/uavcast-pro/flight-controller/ntrip-rtk/) |
| Aangepaste data | Koppel sensoren en scripts aan MAVLink en toon ze in grafieken | [Injectors](https://docs.uavmatrix.com/nl/uavcast-pro/flight-controller/injectors/), [Datastromen](https://docs.uavmatrix.com/nl/uavcast-pro/data-streams/) |

## Wat u nodig heeft

- Een 64-bit Linux companion computer (arm64 of amd64). Raspberry Pi 3, 4, 5 en Zero 2 W zijn de gangbare keuze; x86-mini-pc's werken ook, en NVIDIA Jetson, Orange Pi en andere arm64-boards worden ondersteund vanaf UAVcast-Pro 6.5.3. Zie [Hardwarevereisten](https://docs.uavmatrix.com/nl/get-started/hardware-requirements/).
- Een MAVLink-vluchtcontroller: ArduPilot of PX4. De vliegmodusknoppen volgen de modusnamen van ArduPilot.
- Een UAVcast-Pro-licentie uit de [UAVmatrix-store](https://uavmatrix.com/products/). Zie [Licentie & activering](https://docs.uavmatrix.com/nl/get-started/license-activation/).
- Voor vluchten buiten wifi-bereik: een 4G/LTE-modem en een data-simkaart.

## Volgende stappen

[SnelstartVan een nieuwe Raspberry Pi naar telemetrie en video in Mission Planner of QGroundControl.](https://docs.uavmatrix.com/nl/get-started/quick-start/)[UAVcast-Pro installerenEén commando op Raspberry Pi OS, Debian of Ubuntu (arm64 en amd64).](https://docs.uavmatrix.com/nl/get-started/installation/)[Uw licentie activerenActiveer op een apparaat, controleer apparaatplekken en verplaats de licentie naar nieuwe hardware.](https://docs.uavmatrix.com/nl/get-started/license-activation/)

Source: https://docs.uavmatrix.com/nl/get-started/overview/
