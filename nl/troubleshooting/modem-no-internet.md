# 4G-modem verbonden maar geen internet

> LTE-modem toont signaal en een provider, maar de drone heeft geen internet? Controleer modemtype, APN, SIM-PIN en data, netwerkprioriteit en de standaardroute.

De pagina **Modem** toont signaal, een provider en misschien een IP-adres, maar de drone kan het internet niet bereiken: de VPN verbindt niet, de licentie kan niet worden gecontroleerd, en video en telemetrie bereiken het grondstation nooit via LTE.

| Wat u ziet | Waarschijnlijke oorzaak | Begin bij |
| --- | --- | --- |
| Geen Modem Aangesloten | Linux ziet het modem niet, of het krijgt geen stroom | [Controle 1](https://docs.uavmatrix.com/nl/troubleshooting/modem-no-internet/#check-1) |
| Fout die naar een HiLink-modem verwijst, of geen Verbinden-knop voor een USB-stick | Verkeerd modemtype | [Controle 2](https://docs.uavmatrix.com/nl/troubleshooting/modem-no-internet/#check-2) |
| Geregistreerd op het netwerk, maar geen IPv4-adres | Verkeerde APN of PIN, of geen data op de SIM | [Controle 3](https://docs.uavmatrix.com/nl/troubleshooting/modem-no-internet/#check-3) |
| Modem heeft een IP-adres, internet gaat nog steeds via Wi-Fi | Netwerkprioriteit geeft voorrang aan Wi-Fi | [Controle 4](https://docs.uavmatrix.com/nl/troubleshooting/modem-no-internet/#check-4) |
| Werkt thuis, niet in het veld (of andersom) | Roaming, dekking, of een thuisnetwerk op het modemsubnet | [Controle 5](https://docs.uavmatrix.com/nl/troubleshooting/modem-no-internet/#check-5) |

![UAVcast-Pro-pagina Modem met Traditioneel (PPP) geselecteerd en het paneel Geen Modem Aangesloten](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/modem.webp)

*Pagina Modem met Traditioneel (PPP) geselecteerd en geen modem aangesloten. Met een aangesloten modem toont de kaart rechts de signaalkwaliteit, status, provider en IPv4-informatie.*

## Controle 1: Wordt het modem gedetecteerd?

Als de pagina **Geen Modem Aangesloten** toont:

1. Controleer of het voedingslampje van het modem brandt en of het stevig in een USB-poort zit.
2. Een modem kan meer stroom trekken dan een USB-poort van de Raspberry Pi levert. Let op de rij **Voeding** op het dashboard. Staat daar **Spanning te laag - gebruik een sterkere voeding**, los dan eerst de voeding op: [Onderspanning en throttling](https://docs.uavmatrix.com/nl/troubleshooting/undervoltage-and-throttling/).
3. Voer op de Pi `lsusb` uit om het modem te zien, en `mmcli -L` om te zien of ModemManager het heeft gevonden. Een HiLink-modem verschijnt niet in `mmcli`; het verschijnt in plaats daarvan als netwerkinterface in `ip addr`.

Het modem verschijnt vanzelf op de pagina zodra het is gedetecteerd.

## Controle 2: Kies het juiste modemtype

Er zijn twee soorten USB-modems, en **Modemtype** moet overeenkomen met het uwe.

|  | **HiLink** | **Traditioneel (PPP)** |
| --- | --- | --- |
| Hoe Linux het ziet | Een netwerkadapter (het modem is een kleine router) | Een modem beheerd door ModemManager |
| Wie maakt verbinding | Het modem zelf, automatisch | UAVcast-Pro, met de knoppen **Verbinden** en **Verbinding Verbreken** |
| Huawei-voorbeeld | E3372**h** | E3372**s** |

Als u **Traditioneel (PPP)** kiest voor een HiLink-modem, meldt het logboek *HiLink modem detected … Please change your modem type to 'HiLink' in settings.* Wijzig **Modemtype** en de fout verdwijnt.

## Controle 3: APN, PIN en de SIM

Voor een **Traditioneel (PPP)**-modem:

1. Laat **Access Point Name (Optioneel)** eerst leeg. UAVcast-Pro probeert dan de standaard-APN van uw netwerk en bekende APN's voor de SIM, en onthoudt degene die werkt (*Found a working … it will be used from now on* in het logboek).
2. Als dat mislukt, voer dan de APN in die uw provider voor mobiele data opgeeft. Sommige providers vereisen ook **Gebruikersnaam (Optioneel)** en **Wachtwoord (Optioneel)**.
3. Als de SIM een PIN heeft, voer die dan in bij **PIN-code (Optioneel)**, of schakel de PIN uit door de SIM in een telefoon te plaatsen. **Ontgrendeling Vereist** onder **Modeminformatie** toont of de SIM is vergrendeld.
4. Plaats de SIM in een telefoon en controleer of mobiele data werkt en of het abonnement nog data heeft.

Voor een **HiLink**-modem wordt de APN ingesteld op de eigen webpagina van het modem, meestal op `http://192.168.8.1`. Open die vanaf de Pi, of sluit het modem aan op een laptop.

> **UAVcast-Pro blijft proberen**
>
> Een Traditioneel modem verbindt bij het opstarten en herverbindt zichzelf na signaalverlies. Als een modem verbinding maakt zonder een adres te krijgen, schakelt UAVcast-Pro het over naar raw-IP-modus en probeert het opnieuw. Wacht een minuut na het opstarten voordat u instellingen wijzigt.

## Controle 4: Maak het modem de standaardroute

Als de Pi ook op Wi-Fi of Ethernet zit, gaat het verkeer via de interface met voorrang, niet noodzakelijk via het modem.

1. Ga naar **Netwerken**.
2. Kies onder **Netwerkprioriteit** vóór de vlucht **Modem Prioriteit (Buitenmodus)**. **WiFi Prioriteit (Binnenmodus)** bespaart mobiele data thuis, maar stuurt alles via Wi-Fi.
3. Controleer onder **Netwerkinterfaces** of de modeminterface als **Standaard** is gemarkeerd en of **Standaard Gateway** *via* de modeminterface toont.

![Pagina Netwerken met Netwerkprioriteit op Automatisch en de interfacetabel met wlan0 als standaard](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/networks.webp)

*Pagina Netwerken met Automatisch (Systeemstandaard) actief en Wi-Fi (wlan0) als standaardroute. Selecteer hier Modem Prioriteit (Buitenmodus) om via het modem te routeren.*

Test vanaf de Pi alleen via het modem:

```bash
ping -c 3 -I wwan0 1.1.1.1   # Traditional modem (interface name may differ)
ip route                     # the first "default via" line is the route in use
```

## Controle 5: Problemen die alleen in het veld optreden

- **Roaming**: een SIM die in het buitenland wordt gebruikt, heeft mogelijk roaming nodig die de provider moet inschakelen. Controleer dit op een telefoon met dezelfde SIM.
- **Dekking**: bekijk **Signaalkwaliteit** en **Technologie**. Sommige IoT-SIM's werken alleen op bepaalde frequentiebanden of technologieën.
- **Subnetconflict**: HiLink-modems delen `192.168.8.x` uit. Als uw thuis- of kantoornetwerk ook `192.168.8.0/24` gebruikt, breekt de routering. Wijzig het LAN of het subnet van het modem.

## Nog steeds geen internet?

[Download de logboeken](https://docs.uavmatrix.com/nl/troubleshooting/collect-logs/) met **Modem Beheer** geselecteerd, voeg de uitvoer van `mmcli -m 0` en `ip route` toe, en stuur ze naar **[support@uavmatrix.com](mailto:support@uavmatrix.com)** met het modemmodel en de provider.

Gerelateerd: [Mobiel modem](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/cellular-modem/) · [Netwerken](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/networks/)

Source: https://docs.uavmatrix.com/nl/troubleshooting/modem-no-internet/
