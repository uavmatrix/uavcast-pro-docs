# Cos'è UAVcast-Pro?

> UAVcast-Pro trasforma un Raspberry Pi o un computer di bordo Linux in un collegamento 4G/LTE per la telemetria MAVLink e il video H.264. Scopri come funziona con Fleet Manager.

UAVcast-Pro è un software per il computer di bordo del drone, di solito un Raspberry Pi. Legge il MAVLink da qualsiasi controllore di volo MAVLink (ArduPilot o PX4), trasmette in streaming il video H.264 da una o due telecamere e invia entrambi alla stazione di controllo a terra tramite Wi-Fi, Ethernet o un modem 4G/LTE. Lo configuri e lo monitori da un'interfaccia web che gira sul drone.

UAVmatrix Fleet Manager è la dashboard cloud che lo accompagna. Accoppiando un drone con UAVcast-Pro a Fleet Manager puoi vedere l'intera flotta su un'unica mappa, aprire un terminale remoto, pianificare missioni e instradare video e telemetria verso le stazioni di terra senza port forwarding. Fleet Manager è incluso in ogni licenza UAVcast-Pro.

## Come sono collegati i componenti

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

- **Sul drone**: UAVcast-Pro gestisce la porta seriale del controllore di volo e inoltra il MAVLink a ogni stazione di terra che aggiungi. Il server video codifica in H.264 e invia RTP via UDP alle stesse stazioni di terra. Nulla resta in ascolto per connessioni di telemetria in ingresso, a meno che tu non lo aggiunga.
- **Tra drone e stazione di terra**: su una rete locale basta l'IP della stazione di terra. Via 4G il drone non ha un indirizzo pubblico, quindi collega entrambe le estremità con una VPN. La [VPN di Fleet Manager](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/vpn/), inclusa in ogni licenza, lo fa per te; UAVcast-Pro può anche entrare nella tua rete Tailscale o ZeroTier.
- **Nel cloud**: una volta accoppiato, il drone mantiene una connessione MQTT in uscita, autenticata con certificato, verso Fleet Manager. Vedi [Accoppiare un drone con Fleet Manager](https://docs.uavmatrix.com/it/uavcast-pro/fleet-pairing/).

## Cosa puoi fare con UAVcast-Pro

| Area | Funzione | Pagina |
| --- | --- | --- |
| Telemetria | Rileva automaticamente la porta e il baud rate del controllore di volo, instrada il MAVLink verso un numero qualsiasi di stazioni di terra, destinazioni opzionali in sola lettura | [Controllore di volo](https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/), [Stazioni di controllo a terra](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/) |
| Video | Telecamere CSI e USB per Raspberry Pi, due telecamere con commutazione RC o doppio flusso, audio, pipeline GStreamer personalizzate | [Telecamera e video](https://docs.uavmatrix.com/it/uavcast-pro/camera/) |
| Registrazione | Registra il video e la telemetria di ogni volo sul drone, con un player per la revisione del volo | [Registrazioni](https://docs.uavmatrix.com/it/uavcast-pro/camera/recordings/) |
| Mappa di volo | Mappa in tempo reale, HUD di bordo, armamento e disarmo, RTL e loiter, pianificatore di missione, ispettore MAVLink, analisi dei log | [Mappa di volo](https://docs.uavmatrix.com/it/uavcast-pro/flight-map/) |
| Connettività | Modem 4G/LTE con APN automatico, la VPN di Fleet Manager o la tua rete Tailscale o ZeroTier, DNS dinamico, priorità Wi-Fi o modem | [Connettività](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/) |
| RTK | Client NTRIP che invia al controllore di volo le correzioni RTCM3 | [NTRIP / RTK](https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/ntrip-rtk/) |
| Dati personalizzati | Collega sensori e script a MAVLink e rappresentali in grafici | [Iniettori](https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/injectors/), [Flussi di dati](https://docs.uavmatrix.com/it/uavcast-pro/data-streams/) |

## Cosa ti serve

- Un computer di bordo Linux a 64 bit (arm64 o amd64). Raspberry Pi 3, 4, 5 e Zero 2 W sono la scelta più comune; anche i mini PC x86 funzionano, mentre le schede NVIDIA Jetson, Orange Pi e altre schede arm64 sono supportate da UAVcast-Pro 6.5.3. Vedi [Requisiti hardware](https://docs.uavmatrix.com/it/get-started/hardware-requirements/).
- Un controllore di volo MAVLink: ArduPilot o PX4. I pulsanti delle modalità di volo seguono i nomi delle modalità di ArduPilot.
- Una licenza UAVcast-Pro dallo [store UAVmatrix](https://uavmatrix.com/products/). Vedi [Licenze e attivazione](https://docs.uavmatrix.com/it/get-started/license-activation/).
- Per voli oltre la portata del Wi-Fi: un modem 4G/LTE e una SIM dati.

## Prossimi passi

[Avvio rapidoDa un Raspberry Pi nuovo a telemetria e video in Mission Planner o QGroundControl.](https://docs.uavmatrix.com/it/get-started/quick-start/)[Installa UAVcast-ProUn solo comando su Raspberry Pi OS, Debian o Ubuntu (arm64 e amd64).](https://docs.uavmatrix.com/it/get-started/installation/)[Attiva la tua licenzaAttiva su un dispositivo, controlla gli slot dei dispositivi e sposta la licenza su nuovo hardware.](https://docs.uavmatrix.com/it/get-started/license-activation/)

Source: https://docs.uavmatrix.com/it/get-started/overview/
