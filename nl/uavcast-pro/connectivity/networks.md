# Netwerken

> Bekijk elke netwerkinterface op de drone en kies of Wi-Fi of het 4G/LTE-modem het verkeer draagt, zodat de verbinding op mobiel blijft wanneer u buiten wifi-bereik vliegt.

De pagina Netwerken toont elke netwerkinterface op de drone (Ethernet, Wi-Fi, modem, VPN) en welke de standaardroute is. Hier kiest u ook of Wi-Fi of het mobiele modem voorkeur krijgt wanneer beide zijn verbonden. Open **Netwerken** in de zijbalk.

![Netwerkenpagina met overzichtskaarten, Netwerkprioriteit ingesteld op Auto en de interfacetabel met eth0 en wlan0](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/networks.webp)

*Netwerken met Automatisch (Systeemstandaard) actief en Wi-Fi als standaardroute.*

## De netwerkprioriteit kiezen

Wanneer Wi-Fi en het modem beide zijn verbonden, stuurt Linux het verkeer via de verbinding met de laagste routemetriek. **Netwerkprioriteit** stelt die metrieken voor u in:

| Optie | Gebruik deze bij | Effect |
| --- | --- | --- |
| **WiFi Prioriteit (Binnenmodus)** | Op de werkbank of thuis, om mobiele data te besparen. | Wi-Fi-metriek 100, modemmetriek 600. |
| **Modem Prioriteit (Buitenmodus)** | Vóór elke vlucht via mobiel netwerk. | Modemmetriek 100, Wi-Fi-metriek 600. |
| **Automatisch (Systeemstandaard)** | U wilt niet dat UAVcast-Pro iets wijzigt. | De eigen metrieken van NetworkManager. |

> **Schakel vóór het opstijgen over naar Modem Prioriteit**
>
> Als de drone opstijgt met Wi-Fi-prioriteit, blijft de verbinding op Wi-Fi tot het Wi-Fi-signaal wegvalt, en moet dan in de lucht overschakelen naar het modem. Dat veroorzaakt een gat in telemetrie en video. Selecteer **Modem Prioriteit (Buitenmodus)** op de grond.

De wijziging wordt toegepast op de actieve verbindingen zonder ze te herstarten (*Wijzigingen toepassen...*).

> **Welke verbindingen worden gewijzigd**
>
> De Wi-Fi-metriek wordt ingesteld op de NetworkManager-verbinding met de naam `preconfigured`, de naam die Raspberry Pi Imager geeft aan het Wi-Fi dat u tijdens het flashen invoert. Wi-Fi die op een andere manier is ingesteld, behoudt de eigen metriek, en Ethernet wordt nooit gewijzigd.

## Interfaceinformatie

De overzichtskaarten tonen **Actieve Interfaces**, de **Standaard Gateway** (en de interface waarlangs die loopt) en het **Totaal Aantal Interfaces**. **Netwerkinterfaces** toont elke interface met de **Naam**, het **IP-adres**, de **Gateway**, de **Status** (**Actief**, **Inactief**, **VPN**), de **Snelheid**, het **Type** en welke interface de **Standaard** is.

Veelvoorkomende interfacenamen:

| Naam | Wat het is |
| --- | --- |
| `eth0`, `end0` | Bekabelde Ethernet |
| `wlan0` | Wi-Fi |
| `ppp0`, `wwan0` | Traditioneel modem |
| `usb0`, `eth1` | HiLink-modem |
| `zt…` | ZeroTier |
| `tailscale0` | Tailscale |

Source: https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/networks/
