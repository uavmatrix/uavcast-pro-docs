# Instellingenreferentie

> Elke instelling van UAVcast-Pro op één pagina, met het exacte label, de standaardwaarde en het bereik: vluchtcontroller, NTRIP, grondstations, camera, opname, modem, VPN.

Elke instelling in de webinterface van UAVcast-Pro, gegroepeerd per pagina, met het label precies zoals de app het toont en de standaardwaarde bij een nieuwe installatie. Pagina's die instellingen direct toepassen, doen dat meteen, tenzij anders vermeld. De functiepagina's leggen elk gebied uitgebreid uit; deze pagina is bedoeld om op te zoeken.

## Vluchtcontroller → Verbinding

| Instelling | Standaard | Waarden en opmerkingen |
| --- | --- | --- |
| **Verbinding ingeschakeld** | Aan | Schakelt de verbinding met de vluchtcontroller in of uit. |
| **Verbindingstype** | **USB** | **USB** (de eigen USB-poort van de vluchtcontroller) of **UART / Serieel** (TELEM-poort op GPIO-pinnen of een USB-serieel-kabel). |
| **Poort** | **Automatisch** | Automatisch zoekt de vluchtcontroller en volgt hem als het apparaatnummer verandert. **Aangepast pad…** neemt een apparaat zoals `/dev/ttyAMA0`. |
| **Baudrate** | **Automatisch** | Moet overeenkomen met `SERIALx_BAUD` op de vluchtcontroller. Automatisch probeert 57600, 115200, 921600, 1500000, 460800, 230400 en 500000. Wordt niet gebruikt voor USB. |

Knoppen: **Auto-detect** (scan alle poorten en snelheden en sla het resultaat op), **Verbinden**, **Verbinding herstarten** en **Stoppen**. Wijzigingen worden meteen toegepast, zonder herstart.

## Vluchtcontroller → NTRIP / RTK

| Instelling | Standaard | Waarden en opmerkingen |
| --- | --- | --- |
| **NTRIP-client inschakelen** | Uit |  |
| **Caster-host** | leeg | Hostnaam van de NTRIP-caster. |
| **Poort** | `2101` | Sommige TLS-casters gebruiken 2102 of 443. |
| **Mountpoint** | leeg | Kies via **Mountpoints doorbladeren**. |
| **TLS gebruiken (HTTPS)** | Uit | Voor casters die TLS vereisen. |
| **Gebruikersnaam** / **Wachtwoord** | leeg | rtk2go.com: e-mailadres als gebruikersnaam, geen wachtwoord. |
| **GGA upstream verzenden** | Aan | Nodig voor VRS- en casters met het dichtstbijzijnde mountpoint. |
| **Verzendinterval (seconden)** | `10` |  |
| **Positiebron** | **Live positie van vluchtcontroller** | Of **Vaste handmatige positie** (**Breedtegraad**, **Lengtegraad**, **Hoogte (m)**), die ook als terugval wordt gebruikt vóór de eerste GPS-fix. |

## Vluchtcontroller → Injectors

| Instelling | Standaard | Waarden en opmerkingen |
| --- | --- | --- |
| **Invoertype** |  | **HTTP**, **UDP** of **Serial**. Kan na het aanmaken niet meer worden gewijzigd. |
| **MAVLink sysid** | `1` | Gelijk aan de vluchtcontroller. |
| **MAVLink compid** | `194` | Gebruikerspayload. |
| **Naam-voorvoegsel** | leeg | Maximaal 8 ASCII-tekens, die vóór elke signaalnaam worden geplaatst. |
| **Snelheidslimiet (Hz per signaal)** |  | Maximaal aantal samples per seconde per signaalnaam. |
| **Protocol** (UDP, Serial) |  | **Key=Value (line-delimited)** of **JSON** (`{name, value}`). |
| **Poort** / **Bind-adres** (UDP) |  | Kies een ongebruikte poort, bijvoorbeeld 14600. `0.0.0.0` = alle interfaces, `127.0.0.1` = alleen lokaal. |
| **Apparaatpad** / **Baudrate** (Serial) |  | Bijvoorbeeld `/dev/ttyUSB0`; de baudrate moet overeenkomen met de zender. |

## Grondcontrolestations

Eén kaart per bestemming.

| Instelling | Standaard bij een nieuwe bestemming | Waarden en opmerkingen |
| --- | --- | --- |
| **Naam** | leeg | Maximaal 50 tekens. |
| **Bestemmings-IP of Host** | leeg | Een IPv4-adres. Vereist voordat video of telemetrie kan worden ingeschakeld. |
| **Telemetriepoort** | `14550` | 1–65535. |
| **Videopoort** | `5600` | 1–65535. |
| **Videopoort (Camera 2)** | leeg (= Videopoort + 1) | Alleen zichtbaar wanneer **Dubbele stream** aan staat. |
| **Eindpunt Inschakelen** | Aan | Uit stopt alles naar deze bestemming: telemetrie, video en audio. |
| **Video Inschakelen** | **Uit** |  |
| **Telemetrie Inschakelen** | **Uit** |  |
| **Read Only** | Uit | Het grondstation ontvangt telemetrie maar kan niets op het voertuig wijzigen. Dit geldt vanaf UAVcast-Pro 6.5.3; in eerdere versies blokkeert Read Only geen parameterschrijfacties. |

## Camera → Camera-instellingen

| Instelling | Standaard | Waarden en opmerkingen |
| --- | --- | --- |
| **Camera inschakelen?** | Ja |  |
| **Selecteer Camera** | Raspberry Pi-camera | Gedetecteerde CSI- en USB-camera's. |
| **Resolutie** | 640×480 | Alleen formaten die de camera ondersteunt, worden aangeboden. |
| **Selecteer FPS** | **Automatisch** | De camera onderhandelt. |
| **Bitsnelheid:** | `0` (automatisch) | 0–10000 kbps. |
| **Stream Herstelsnelheid** | **Automatisch** | Keyframe-interval. Automatisch = één keyframe per seconde. Snellere niveaus herstellen sneller van pakketverlies en gebruiken meer bandbreedte. |
| **Rotatie:** / **Spiegelinstellingen** | 0°, niet spiegelen | **Horizontaal spiegelen**, **Verticaal spiegelen**. |
| **Live Voorvertoning inschakelen?** | Ja | Voorvertoning op deze pagina en op de Vliegkaart. |
| **Aangepaste Pipeline** | testpipeline | Overschrijft de bestemmingen van de Grondcontrolestations. Laat het voorvoegsel `gst-launch-1.0` weg. |
| **RC-kanaal camerawisseling inschakelen** | Uit |  |
| **RC-kanaal** | 7 | PWM < 1500 = Camera 1, PWM > 1500 = Camera 2. |
| **Resolutie van camera 1 overnemen** | Uit | Camera 2 legt vast met de resolutie van camera 1. |
| **Dubbele stream** | Uit | Streamt beide camera's tegelijk. |
| **Audio** | Uit | Opus-audio in de voorvertoning. |
| **Audioapparaat** | **Automatisch (microfoon van de camera indien aanwezig)** | Of een opnameapparaat, of **Testtoon (geen microfoon nodig)**. |
| **Bitrate** (audio) | 64 kbps |  |
| **Audio naar grondstations sturen** | Uit | RTP/Opus naar elke videobestemming op Videopoort + 2. |

## Camera → Opnames → Instellingen

| Instelling | Standaard | Waarden en opmerkingen |
| --- | --- | --- |
| **Opslaglocatie** | **Intern geheugen** | Een USB-schijf of SSD, of **Of een andere map**. |
| **Vrij houden** | 2 GB | 0,5–1000 GB. |
| **Oudste opnames verwijderen wanneer de ruimte bijna op is** | Aan | Uit = opnemen stopt wanneer de schijf vol is. |
| **Opnames ouder dan verwijderen** | 0 dagen | 0 bewaart ze totdat de ruimte nodig is. |
| **Automatisch opnemen bij armen** | Aan |  |
| **Camera 1 opnemen** / **Camera 2 opnemen** | Aan / Aan | Camera 2 alleen met dubbele stream. |
| **Bestandslengte** | 1 min | 1–30 minuten per bestand. |
| **Telemetrie opnemen** | **Tijdens armen** | **Altijd tijdens verbinding** of **Uit**. |

## Modem

| Instelling | Standaard | Waarden en opmerkingen |
| --- | --- | --- |
| **Mobiel modem inschakelen?** | Ja |  |
| **Modemtype** | **Traditioneel (PPP)** | Of **HiLink**. |
| **Access Point Naam (Optioneel)** | leeg (**Automatisch**) | Laat leeg om automatisch te detecteren. |
| **Gebruikersnaam (Optioneel)** / **Wachtwoord (Optioneel)** | leeg | De meeste providers hebben geen van beide nodig. |
| **PIN-code (Optioneel)** | leeg | SIM-PIN, tenzij PIN is uitgeschakeld. |

## Virtueel Privénetwerk

| Instelling | Standaard | Waarden en opmerkingen |
| --- | --- | --- |
| **VPN inschakelen** | Nee |  |
| **Diensten** | **ZeroTier** | **ZeroTier** of **Tailscale**. |
| **Netwerk ID** (ZeroTier) | leeg | Afkomstig van uw eigen ZeroTier-controller. |
| **Authenticatiesleutel** / **Hostnaam (Optioneel)** (Tailscale) | leeg | Of meld u aan met **Web Login**, of via het tabblad **Fleet Manager** na het koppelen. |

## Dynamische DNS

| Instelling | Standaard | Waarden en opmerkingen |
| --- | --- | --- |
| **Dynamische DNS inschakelen?** | Nee |  |
| **DNS-systeem** | `noip` | `generic` (met **DNS-URL**), `noip`, `dyndns`, `duck`. |
| Gebruikersnaam, **Wachtwoord**, **Alias** | leeg | Afkomstig van uw DNS-provider. |

## Netwerken

| Instelling | Standaard | Waarden en opmerkingen |
| --- | --- | --- |
| **Netwerkprioriteit** | systeemroutering | **WiFi Prioriteit (Binnenmodus)**, **Modem Prioriteit (Buitenmodus)** of **Automatisch (Systeemstandaard)**. |

## Fleet Management

| Instelling | Standaard | Waarden en opmerkingen |
| --- | --- | --- |
| **Device Name** | leeg | Wordt getoond in Fleet Manager. Zonder naam wordt de hostnaam gebruikt. |

## Users

| Instelling | Waarden en opmerkingen |
| --- | --- |
| **Role** | **Admin - Full access** of **Read Only - View only**. De eerste gebruiker moet Admin zijn. |

## Applicatie

| Instelling | Standaard | Waarden en opmerkingen |
| --- | --- | --- |
| **Serverpoort** | `80` | 80 of hoger. **Indienen en server herstarten** past deze toe; het adres wordt `http://<device>:<port>/`. |
| **Taal** | Browsertaal | Engels, Spaans, Portugees, Italiaans, Nederlands, Pools, Turks, Russisch, Chinees (vereenvoudigd en traditioneel). |
| **Donker Thema** |  |  |
| **Logboekregistratie**: logboeklijst / tijdsbereik | **Alle Logboeken** / **Laatste 2 uur** | Zie [Logboeken verzamelen](https://docs.uavmatrix.com/nl/troubleshooting/collect-logs/). |

**Database** biedt **Database Back-up**, **Database Herstellen** (een `.db`-bestand) en **Database Resetten**, waarmee alle instellingen worden verwijderd.

Source: https://docs.uavmatrix.com/nl/reference/settings/
