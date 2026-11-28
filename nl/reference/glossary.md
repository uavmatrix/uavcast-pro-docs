# Woordenlijst

> Heldere uitleg van termen in de UAVcast-Pro- en Fleet Manager-documentatie: MAVLink, GCS, heartbeat, APN, HiLink, NTRIP, RTCM, VRS, ZeroTier, Tailscale.

### AGL / AMSL

Hoogte boven de grond (hier: boven het startpunt) en boven de gemiddelde zeespiegel. UAVcast-Pro gebruikt deze termen sinds v6.5.0, ter vervanging van REL en MSL.

### APN (Access Point Name)

De naam van de gateway van de provider waarmee een mobiel modem verbinding maakt. UAVcast-Pro detecteert deze automatisch wanneer **Access Point Naam (Optioneel)** leeg is.

### ArduPilot

Open-source autopilotfirmware voor multicopters, vliegtuigen, VTOL, rovers en boten. UAVcast-Pro werkt met ArduPilot en met elke andere MAVLink-vluchtcontroller, zoals PX4. De vluchtmodusknoppen gebruiken de modusnamen van ArduPilot.

### Authenticatiesleutel

Een Tailscale-sleutel die een apparaat zonder browser aanmeldt bij een tailnet. Fleet Manager gebruikt authenticatiesleutels om grondstations op het VPN van de organisatie te plaatsen.

### Bitrate

Het aantal bits per seconde dat de videoencoder produceert. Dit moet binnen de uplink van uw verbinding passen, met ruimte over.

### CSI-camera

Een camera op de lintkabelconnector van de Raspberry Pi, zoals Camera Module 3.

### Bestemming

In UAVcast-Pro een grondstationvermelding onder **Grondcontrolestations**: een IP-adres met een telemetriepoort en een videopoort.

### Dubbele stream

Twee camera's tegelijkertijd naar het grondstation streamen, via twee videopoorten.

### Fleet Manager

Het webdashboard van UAVmatrix voor het monitoren en besturen van veel UAVcast-Pro-drones binnen één organisatie.

### GCS (grondcontrolestation)

De software, en de computer waarop die draait, waarmee u de drone monitort en aanstuurt: QGroundControl, Mission Planner, MAVProxy.

### GCS failsafe

Een instelling van de vluchtcontroller waardoor de drone zelfstandig handelt (terugkeren, landen, loiteren) wanneer hij het grondstation niet meer hoort.

### GGA

Een NMEA-zin met uw positie. VRS- en casters met het dichtstbijzijnde mountpoint hebben deze nodig om correcties voor uw locatie te berekenen.

### H.264

Het videocompressieformaat dat UAVcast-Pro verstuurt. Elk gangbaar grondstation kan het decoderen.

### Heartbeat

Het MAVLink-bericht dat een vluchtcontroller ongeveer eens per seconde verstuurt om te melden "ik ben er". *Geen heartbeat* betekent dat de verbinding geen leesbaar MAVLink bevat.

### HiLink-modem

Een USB-modem met een ingebouwde router die zichzelf verbindt en voor Linux verschijnt als netwerkadapter.

### Injector

Een UAVcast-Pro-listener (HTTP, UDP of serieel) die uw eigen sensorwaarden omzet in MAVLink-berichten `NAMED_VALUE_FLOAT`.

### Keyframe

Een volledig videoframe waarmee de decoder kan beginnen. Vaker voorkomende keyframes herstellen sneller van pakketverlies. Instellen met **Stream Herstelsnelheid**.

### MAVLink

Het berichtenprotocol tussen vluchtcontrollers en grondstations.

### Mountpoint

Een benoemde correctiestroom op een NTRIP-caster, meestal gekoppeld aan één basisstation of een VRS-dienst.

### MQTT

Het berichtenprotocol waarmee drones met Fleet Manager communiceren, versleuteld met TLS op poort 8883.

### NTRIP / NTRIP-caster

Een protocol, en de server, voor het via internet streamen van GNSS-correcties.

### Koppelcode

De 8-cijferige code die UAVcast-Pro toont wanneer u een drone koppelt aan Fleet Manager. Geldig voor 5 minuten, eenmalig.

### Read Only (bestemming)

Een grondstationbestemming die telemetrie ontvangt maar niets op het voertuig kan wijzigen: commando's, modewijzigingen en parameter- en missieschrijfacties vanuit dit station worden geblokkeerd. Dit geldt vanaf UAVcast-Pro 6.5.3; in eerdere versies blokkeert Read Only geen parameterschrijfacties.

### Read Only (gebruiker)

Een gebruikersrol in UAVcast-Pro die pagina's kan bekijken, maar geen instellingen kan wijzigen of de drone kan besturen.

### RTCM3

Het standaard berichtformaat voor GNSS-correcties.

### RTK, RTK Float, RTK Fixed

Realtime kinematische positionering met correcties. Float is een benaderende oplossing; Fixed is de oplossing op centimeterniveau.

### RTP / UDP

Het transportprotocol dat UAVcast-Pro gebruikt voor video en telemetrie: snel, zonder hertransmissies, wat de latentie laag houdt.

### SERIALx_PROTOCOL / SERIALx_BAUD

ArduPilot-parameters die bepalen welk protocol een seriële poort spreekt (2 = MAVLink2) en met welke snelheid.

### Streamkoppeling

In Fleet Manager een koppeling die de video en telemetrie van één drone naar één grondstation stuurt, op eigen poorten.

### sysid / compid

MAVLink-systeem-ID (welk voertuig) en component-ID (welk onderdeel daarvan). De vluchtcontroller heeft meestal sysid 1 en compid 1.

### Tailnet

Een privé Tailscale-netwerk.

### Tailscale

Een op WireGuard gebaseerde VPN. UAVcast-Pro kan lid worden van uw tailnet of van het organisatienetwerk van Fleet Manager.

### UAVnet

De gehoste ZeroTier-netwerkcontroller van UAVmatrix op uavnet.uavmatrix.com. Deze wordt uitgefaseerd ten gunste van het VPN van Fleet Manager; bestaande gebruikers moeten overstappen naar Fleet Manager.

### VRS (virtueel referentiestation)

Een correctiedienst die correcties voor uw positie berekent op basis van een netwerk van basisstations. Vereist GGA upstream.

### ZeroTier

Een peer-to-peer VPN. UAVcast-Pro kan lid worden van uw eigen ZeroTier-netwerk.

Source: https://docs.uavmatrix.com/nl/reference/glossary/
