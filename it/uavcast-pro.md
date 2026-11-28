# UAVcast-Pro

> Riferimento per l'interfaccia web di UAVcast-Pro: dashboard, controllore di volo, mappa di volo, stazioni di controllo a terra, telecamera, modem, VPN, abbinamento con Fleet Manager, utenti e impostazioni.

Questa sezione spiega ogni pagina dell'interfaccia web di UAVcast-Pro, nell'ordine della barra laterale dell'app. Ogni pagina descrive a cosa serve la schermata, come configurarla ed elenca ogni impostazione con il suo valore predefinito. Nuovo in UAVcast-Pro? Inizia dalla [Guida rapida](https://docs.uavmatrix.com/it/get-started/quick-start/).

## Operazioni

[DashboardStato del controllore di volo, GPS, collegamenti, video e alimentazione a colpo d'occhio.](https://docs.uavmatrix.com/it/uavcast-pro/dashboard/)[Flussi di DatiDashboard live personalizzate per qualsiasi valore MAVLink o sensore.](https://docs.uavmatrix.com/it/uavcast-pro/data-streams/)[Controllore di VoloCollegamento USB o UART con rilevamento automatico di porta e baud rate, NTRIP/RTK e iniettori.](https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/)[Mappa di VoloMappa live, HUD di cabina, armare/disarmare, modalità, missioni, radio, ispettore e analisi dei log.](https://docs.uavmatrix.com/it/uavcast-pro/flight-map/)[Stazioni di controllo a terra e videoDestinazioni, più la configurazione passo passo di Mission Planner, QGroundControl, GStreamer, Android e VLC.](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/)

## Connettività

[ModemModem 4G/LTE HiLink e tradizionali con APN automatico.](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/cellular-modem/)[Rete Privata VirtualeLa VPN di Fleet Manager oppure la tua rete Tailscale o ZeroTier.](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/vpn/)[DNS DinamicoMantieni un hostname puntato sull'IP pubblico del drone.](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/dynamic-dns/)[RetiInterfacce e priorità tra Wi-Fi e modem.](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/networks/)

## Media

[Impostazioni telecameraTelecamere CSI e USB, risoluzione, bitrate, H.264 a bassa latenza su UDP.](https://docs.uavmatrix.com/it/uavcast-pro/camera/)[Due telecamereCambio canale RC o doppio flusso.](https://docs.uavmatrix.com/it/uavcast-pro/camera/multi-camera/)[AudioAudio del microfono nell'anteprima e verso le stazioni di terra.](https://docs.uavmatrix.com/it/uavcast-pro/camera/audio/)[RegistrazioniRegistrazione di video e telemetria a bordo del drone, con revisione del volo.](https://docs.uavmatrix.com/it/uavcast-pro/camera/recordings/)

## Gestione

[Fleet ManagementAbbina il drone a UAVmatrix Fleet Manager.](https://docs.uavmatrix.com/it/uavcast-pro/fleet-pairing/)[UsersLogin admin e utenti di sola lettura.](https://docs.uavmatrix.com/it/uavcast-pro/users/)[ApplicazionePorta, lingua, log per il supporto, backup e ripristino del database.](https://docs.uavmatrix.com/it/uavcast-pro/application-settings/)

## Porte in sintesi

| Porta | Direzione | Utilizzo |
| --- | --- | --- |
| TCP 80 | Browser → drone | Interfaccia web (configurabile) e iniettori HTTP |
| UDP 14550 | Drone → stazione di terra | Telemetria MAVLink (per destinazione, configurabile) |
| UDP 5600 | Drone → stazione di terra | Video, telecamera 1 (per destinazione, configurabile) |
| UDP 5601 | Drone → stazione di terra | Video, telecamera 2 con doppio flusso (Porta Video + 1 per impostazione predefinita) |
| UDP 5602 | Drone → stazione di terra | Audio (Porta Video + 2) |
| TCP 8889, UDP 8189 | Browser → drone | Anteprima dal vivo (segnalazione e media WebRTC) |
| TCP 8883 | Drone → Fleet Manager | Connessione a Fleet Manager (MQTT su TLS) |
| TCP 2101 | Drone → caster NTRIP | Correzioni RTK (porta del caster) |
| UDP 14600 | Sensore → drone | Iniettore UDP (predefinito, configurabile) |

Source: https://docs.uavmatrix.com/it/uavcast-pro/
