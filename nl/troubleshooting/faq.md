# Veelgestelde vragen

> Korte antwoorden over UAVcast-Pro-hardware, LTE-modems, grondstations, poorten, gebruik zonder internet, licenties, updates, opnemen en koppelen met Fleet Manager.

## Hardware en installatie

### Heb ik een LTE-modem nodig?

Nee. UAVcast-Pro werkt via elke IP-verbinding: 4G/LTE, Wi-Fi of Ethernet. Een modem maakt het mogelijk om buiten het bereik van Wi-Fi te vliegen. Veel operators testen op Wi-Fi en schakelen vóór de vlucht over naar het modem via **Netwerken → Netwerkprioriteit → Modem Prioriteit (Buitenmodus)**.

### Welke computers kunnen UAVcast-Pro draaien?

Elk 64-bits Linux-board of pc op arm64 of amd64 met Raspberry Pi OS, Debian of Ubuntu: Raspberry Pi Zero 2 W, 3, 4 en 5, NVIDIA Jetson, Orange Pi en x86-minipc's. Een Raspberry Pi 4 of 5 is de comfortabele keuze voor video. Zie [Ondersteunde hardware](https://docs.uavmatrix.com/nl/reference/supported-hardware/).

### Welke vluchtcontrollers worden ondersteund?

Elke vluchtcontroller die MAVLink spreekt via USB of een TELEM-poort: ArduPilot (Copter, Plane, Rover, VTOL en de andere voertuigtypen) en PX4, op Pixhawk- en Cube-familieboards, Matek en vergelijkbare. Telemetrie, video en routering naar grondstations werken met elk van deze. De vluchtmodusknoppen op de Vliegkaart en in Fleet Manager gebruiken de modusnamen van ArduPilot; bij PX4 wijzigt u de modi via uw grondstation.

### Kan ik verbinding maken via de USB-poort van de vluchtcontroller?

Ja, en dat is de eenvoudigste optie: sluit hem aan en laat **Poort** op **Automatisch** staan. Gebruik een korte kabel die data overdraagt. Zie [Geen MAVLink-heartbeat](https://docs.uavmatrix.com/nl/troubleshooting/no-mavlink-heartbeat/) als hij niet wordt gevonden.

## Grondstations en netwerk

### Welke grondstations werken?

Elke software die MAVLink over UDP ondersteunt, waaronder QGroundControl, Mission Planner en MAVProxy. Video is H.264 over RTP/UDP, dat QGroundControl en Mission Planner rechtstreeks afspelen. GStreamer en VLC werken ook: zie [Grondstations & video](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/).

### Kunnen meerdere grondstations tegelijk meekijken?

Ja. Voeg per computer een bestemming toe onder **Grondcontrolestations**, elk met eigen schakelaars voor video en telemetrie. Gebruik **Read Only** voor stations die alleen mogen meekijken. Zie [Stream naar meerdere grondstations](https://docs.uavmatrix.com/nl/guides/multiple-ground-stations/).

### Welke poorten gebruikt UAVcast-Pro?

Standaard gaat telemetrie naar UDP **14550** en video naar UDP **5600** op elk grondstation; een tweede camera gebruikt de videopoort + 1, en audio de videopoort + 2. De webinterface staat op poort **80**. De volledige lijst staat in [Poorten en protocollen](https://docs.uavmatrix.com/nl/reference/ports-and-protocols/).

### Heb ik port forwarding op mijn router nodig?

Nee. Via 4G zet u de drone en het grondstation op hetzelfde VPN: het Fleet Manager-VPN (inbegrepen bij uw licentie), of uw eigen Tailscale- of ZeroTier-netwerk. De drone stuurt telemetrie en video naar het VPN-adres van het grondstation. Zie [Vliegen buiten zicht via 4G](https://docs.uavmatrix.com/nl/guides/bvlos-4g/).

### Kan ik nog steeds verbinding maken via TCP 5760?

Nee. Sinds v6.5.0 is TCP 5760 gesloten, zodat alleen de grondstations die u toevoegt data ontvangen. Voeg uw computer toe als bestemming en gebruik UDP.

### Werkt het zonder internet?

Ja. De vluchtcontrollerverbinding, telemetrie en video starten bij het inschakelen zonder op internet te wachten, dus een lokaal Wi-Fi-netwerk of radioverbinding werkt. Het activeren van de licentie heeft eenmalig internet nodig. Daarna schakelt een mislukte licentiecontrole door een verloren verbinding het apparaat niet uit.

## Licentie en account

> Je hebt een UAVcast-Pro-licentie nodig om de drone te activeren. Koop er een in de UAVmatrix-winkel.
>
> [UAVcast-Pro kopen](https://uavmatrix.com/nl/checkout) · [Abonnementen en prijzen](https://uavmatrix.com/nl/products)

### Mijn licentie wordt niet geactiveerd. Wat nu?

Zie [Licentie wordt niet geactiveerd](https://docs.uavmatrix.com/nl/troubleshooting/license-activation-failed/). De gebruikelijke oorzaken zijn een verkeerd getypte sleutel, geen vrije apparaatplek, of geen internet op het apparaat.

### Wat gebeurt er als mijn licentie verloopt?

UAVcast-Pro wordt vergrendeld: de webinterface opent alleen **Applicatie**, en telemetrie, video en de andere services stoppen totdat u verlengt. Verleng in de store vóór de vervaldatum en valideer daarna de sleutel op de drone. Zie [Wanneer een licentie verloopt](https://docs.uavmatrix.com/nl/get-started/license-activation/#when-a-license-expires).

### Is Fleet Manager inbegrepen bij mijn licentie?

Ja. Fleet Manager, inclusief het VPN, is inbegrepen bij uw UAVcast-Pro-licentie zonder extra kosten.

### Ik heb de SD-kaart vervangen. Heb ik een nieuwe licentie nodig?

Nee, maar het apparaat telt als nieuw en neemt een plek in. Schrijf de oude vermelding uit onder **Applicatie → Licentie Beheer → Geactiveerde apparaten**.

### Is Fleet Manager een apart product?

Fleet Manager is het web-dashboard van UAVmatrix voor het beheren van veel drones op [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/). Het is inbegrepen bij uw UAVcast-Pro-licentie. U logt in met uw uavmatrix.com-account, en elke drone die u koppelt heeft een actieve UAVcast-Pro-licentie nodig die eigendom is van een lid van uw organisatie. Zie [Fleet Manager](https://docs.uavmatrix.com/nl/fleet-manager/).

### Hoe koppel ik een drone aan Fleet Manager?

Open in UAVcast-Pro **Fleet Management** en druk op **Connect to Fleet Manager**. Voer de 8-cijferige code binnen 5 minuten in Fleet Manager in onder **Fleet → Pair Device**. Zie [Uw eerste UAV koppelen](https://docs.uavmatrix.com/nl/fleet-manager/pair-uav/) en, als het mislukt, [Koppelcode ongeldig of verlopen](https://docs.uavmatrix.com/nl/troubleshooting/pairing-code-invalid/).

## Updates en gegevens

### Hoe werk ik UAVcast-Pro bij?

Ga naar **Applicatie → Applicatie Bijwerken**, kies een versie bij **Selecteer versie om bij te werken** en druk op **Nu Bijwerken**. Als de kaart **Herstart Vereist** toont, druk dan op **Nu Herstarten**. U kunt ook het installatieprogramma opnieuw uitvoeren.

### Kan ik instellingen uit v4 of v5 importeren?

Nee. v6 gebruikt een nieuwe database, dus stel het opnieuw in na een schone installatie. Binnen v6 gebruikt u **Applicatie → Database → Database Back-up** en **Database Herstellen** om instellingen tussen installaties te verplaatsen.

### Kan UAVcast-Pro video opnemen?

Ja, sinds v6.5.1. Het neemt camera 1 en 2 op vanaf de Vliegkaart, of automatisch zodra de drone gearmd is, samen met een telemetrielog. Zie [Vluchten opnemen en terugkijken](https://docs.uavmatrix.com/nl/guides/recording-flight-review/).

### Waar bewaart UAVcast-Pro zijn bestanden?

Onder `/opt/uavcast-pro`: de database `uavcast.db`, `logs/`, `recordings/` en `missions/`. Zie [Services en bestanden](https://docs.uavmatrix.com/nl/reference/services-and-files/).

### Ik ben het admin-wachtwoord vergeten.

Er is geen wachtwoordherstel in de webinterface. Een andere beheerder kan uw gebruiker verwijderen onder **Users** en deze opnieuw aanmaken. Als u de enige beheerder was, is herstel niet zelfbediening: neem contact op met **[support@uavmatrix.com](mailto:support@uavmatrix.com)** met de gegevens die vermeld staan in [Admin-wachtwoord vergeten](https://docs.uavmatrix.com/nl/uavcast-pro/users/#forgot-the-admin-password).

### Waar krijg ik hulp?

Verzamel de logboeken zoals beschreven in [Logboeken verzamelen voor support](https://docs.uavmatrix.com/nl/troubleshooting/collect-logs/) en stuur een e-mail naar **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, of stel uw vraag op de [UAVmatrix Discord](https://discord.gg/xwqMTXh).

Source: https://docs.uavmatrix.com/nl/troubleshooting/faq/
