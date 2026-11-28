# Geen MAVLink-heartbeat van de vluchtcontroller

> UAVcast-Pro toont No heartbeat of Waiting for device? Controleer de USB-kabel, de TELEM-bekabeling, het SERIAL-protocol en de baudrate, en gebruik daarna Auto-detect.

De pagina **Vluchtcontroller → Verbinding** toont **No heartbeat**, **Waiting for device**, **Detecting baud rate** of **Searching**, en de rij **Vluchtcontroller** op het dashboard wordt nooit groen. UAVcast-Pro kan de vluchtcontroller nog niet horen.

De pagina heeft een live **Connection check** die elke stap eenmaal per seconde test en het eerste probleem dat het vindt, uitlegt. Lees die eerst: dat is meestal sneller dan deze pagina.

![Connection check-kaart met vier rijen: vluchtcontroller aangesloten, leesbare gegevens van de vluchtcontroller, vluchtcontroller reageert en stuurt naar het grondstation](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/flight-controller--connection-check.webp)

*De Connection check bij een werkende verbinding: alle vier de stappen slagen. Wanneer de verbinding faalt, wordt de eerste mislukte stap gemarkeerd en uitgelegd.*

| Wat u ziet | Waarschijnlijke oorzaak | Begin bij |
| --- | --- | --- |
| Waiting for device, of Flight controller plugged in: Not detected | Geen datakabel, of het bord heeft geen voeding | [Controle 1](https://docs.uavmatrix.com/nl/troubleshooting/no-mavlink-heartbeat/#check-1) |
| Signaal op de draad, maar geen leesbare gegevens | Verkeerde baudrate, TX/RX omgewisseld, of de poort staat niet op MAVLink | [Controle 2](https://docs.uavmatrix.com/nl/troubleshooting/no-mavlink-heartbeat/#check-2) |
| Leesbare gegevens tonen een hoog % damaged | Losse of lange draad, ontbrekende GND-draad, of elektrische ruis | [Controle 3](https://docs.uavmatrix.com/nl/troubleshooting/no-mavlink-heartbeat/#check-3) |
| Poort wordt getoond als in use by another program | Een ander programma houdt de seriële poort bezet | [Controle 4](https://docs.uavmatrix.com/nl/troubleshooting/no-mavlink-heartbeat/#check-4) |
| Status Off of Stopped | De verbinding is uitgeschakeld | [Controle 5](https://docs.uavmatrix.com/nl/troubleshooting/no-mavlink-heartbeat/#check-5) |

## Controle 1: Wordt de vluchtcontroller wel gezien?

**Via USB:**

1. Zorg dat de vluchtcontroller van stroom voorzien is en dat de USB-kabel naar de companion computer gaat.
2. Probeer een andere kabel. Veel USB-kabels zijn alleen voor opladen en dragen geen data. Als het bord oplicht maar **Flight controller plugged in** **Not detected** toont, is de kabel meestal de oorzaak.
3. Kies onder **Link type** **USB** en laat **Port** op **Automatic** staan. Automatic zoekt de vluchtcontroller en volgt hem als het apparaatnummer verandert.

**Via een TELEM-poort (UART / Serial):**

1. Kies onder **Link type** **UART / Serial**.
2. Controleer de bekabeling: vluchtcontroller **TX → RX** op de companion computer, **RX → TX**, en **GND → GND**. Een ontbrekende GND-draad is een veelvoorkomende oorzaak.
3. Voed de Raspberry Pi nooit via de TELEM-poort. Voed hem apart.

> **Seriële poort van de Raspberry Pi**
>
> Het installatieprogramma schakelt de UART van de Pi in en verwijdert de seriële console uit `cmdline.txt`. Op een Pi 3, 4 of Zero 2 W schakelt het ook Bluetooth uit, zodat de volledige UART vrij is. Als u het besturingssysteem opnieuw hebt geïnstalleerd nadat UAVcast-Pro was geïnstalleerd, voer dan het installatieprogramma opnieuw uit.

## Controle 2: Stem de poortinstellingen op de vluchtcontroller af

Op een TELEM-poort moet de vluchtcontroller MAVLink spreken met de snelheid waarop UAVcast-Pro luistert. USB-verbindingen gebruiken geen baudrate.

1. Verbind de vluchtcontroller via USB met Mission Planner of QGroundControl.
2. Open de volledige parameterlijst en zoek de seriële poort die u hebt aangesloten: `SERIAL1` voor TELEM1, `SERIAL2` voor TELEM2.
3. Stel `SERIALx_PROTOCOL` in op `2` (MAVLink2). Schrijf de parameters weg en herstart de vluchtcontroller.
4. Noteer `SERIALx_BAUD`. Laat in UAVcast-Pro **Baudrate** op **Automatic** staan, of kies dezelfde waarde.

Bij **Automatic** probeert UAVcast-Pro 57600, 115200, 921600, 1500000, 460800, 230400 en 500000 baud, en onthoudt de snelheid die werkte. De status toont *Trying … baud (n of 7)* tijdens het zoeken.

> **Laat UAVcast-Pro voor u zoeken**
>
> Druk op **Auto-detect**. Het pauzeert de verbinding, luistert op elke poort en baudrate, en slaat op wat het vindt. Dit kan tot een minuut duren. Als er **No flight controller found** wordt gemeld, open dan **Show what was tried** om elke poort en snelheid te zien die is getest.

## Controle 3: Beschadigde gegevens

Als **Readable flight controller data** een percentage *damaged* toont, komen er bytes binnen maar zijn ze beschadigd. Dit betekent meestal een losse of lange draad, een ontbrekende GND-draad, of ruis van motoren en voedingskabels.

- Steek de connectoren opnieuw in en maak de kabel korter.
- Leid de signaaldraden weg van ESC- en accukabels.
- Probeer een lagere `SERIALx_BAUD`, bijvoorbeeld 57600 of 115200.

## Controle 4: Poort in gebruik

In de lijst **Port** zijn poorten gemarkeerd die een ander programma bezet houdt (*in use by …*). Stop dat programma, bijvoorbeeld een MAVProxy of een tweede router die u zelf hebt gestart, of kies een andere poort.

## Controle 5: Staat de verbinding aan?

Bovenaan de pagina moet **Link enabled** aan staan. Als de status **Link stopped** zegt, druk dan op **Verbinden**. Instellingen worden direct toegepast, zonder herstart.

## Nog steeds geen heartbeat?

[Download de logboeken](https://docs.uavmatrix.com/nl/troubleshooting/collect-logs/) met **Mavlink Beheer** geselecteerd. Het meegeleverde `diagnostics.txt` toont de seriële apparaten, welk programma ze bezet houdt, en de USB- en voedingsgebeurtenissen van de kernel. Dat is wat de support nodig heeft bij verbindingsproblemen.

Zodra de vluchtcontroller **Verbonden** toont maar uw grondstation nog wacht, ga naar [Geen telemetrie in het grondstation](https://docs.uavmatrix.com/nl/troubleshooting/no-telemetry-in-gcs/).

Gerelateerd: [Verbinding met de vluchtcontroller](https://docs.uavmatrix.com/nl/uavcast-pro/flight-controller/) · [Hardwarevereisten](https://docs.uavmatrix.com/nl/get-started/hardware-requirements/)

Source: https://docs.uavmatrix.com/nl/troubleshooting/no-mavlink-heartbeat/
