# UAV-details

> De pagina van een drone in Fleet Manager toont live telemetrie en de gezondheid van de companion computer, een SSH-terminal en een MAVLink-log, en biedt opties om opnieuw op te starten of te verwijderen.

Elke drone heeft zijn eigen pagina. U opent deze met **Details** op de [Fleet](https://docs.uavmatrix.com/nl/fleet-manager/fleet/)-kaart, vanaf het dashboard of met **View UAV** aan het einde van het koppelen.

De kop toont de naam, een live statusbadge, **Re-pair required** indien nodig, de organisatie, de apparaat-**ID** en **Last seen**. Owners en Admins krijgen ook **Rename** en **Remove**.

De pagina heeft vier tabbladen: **Overview**, **Terminal**, **Logs** en **Actions**.

## Overzicht

Live gegevens, naar de browser gepusht zodra ze binnenkomen.

![Overview-tabblad van UAV-details met de kaart UAVcast Application en de kaart MAVLink / Flight Controller](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/drone-detail.webp)

*Overview-tabblad van een gearmde VTOL in AUTO: de kaart UAVcast Application met CPU Temp, CPU, Memory en Disk, en de kaart MAVLink / Flight Controller met batterij, GPS, hoogte en koers.*

**UAVcast Application** beschrijft de companion computer: de verbindingsstatus (**Connected**, **Waiting for data...** of **Connecting...**), **Hostname**, **Uptime**, **CPU Temp**, **CPU**, **Memory**- en **Disk**-gebruik, de UAVcast-Pro-services en hun status, en de netwerkadressen van de drone (LAN en VPN). De kaart heeft ook de knoppen om [UAVcast-Pro op afstand te openen](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remote-uavcast/): **Open via Proxy** en, wanneer de drone op de VPN zit, **Open via VPN**.

**MAVLink / Flight Controller** toont wat de vluchtcontroller meldt: **ARMED** of **DISARMED**, de vlaggen **FAILSAFE** en **GCS FAILSAFE**, **Battery**, **GPS** (satellieten en fix), **Altitude** en **Heading**.

> **Let op CPU Temp op warme dagen**
>
> Een Raspberry Pi die heet draait, vertraagt, en video heeft daar het eerst last van. Als **CPU Temp** tijdens een vlucht stijgt, zie [Onderspanning en throttling](https://docs.uavmatrix.com/nl/troubleshooting/undervoltage-and-throttling/).

### Verbonden grondstations

Onder de kaarten toont **Connected Ground Stations** de grondstations die de streams van deze drone ontvangen, met de schakelaars **Video** en **Telemetry** en de knoppen **Pause** / **Resume**. **Add GCS** (voor Owners en Admins) koppelt een ander grondstation aan deze drone. Dit maakt dezelfde streamkoppeling als **Network → Stream Bindings**, met de volgende vrije poorten op dat grondstation, en stuurt de nieuwe bestemming naar de drone. Zie [Streamkoppelingen](https://docs.uavmatrix.com/nl/fleet-manager/network/stream-bindings/).

## Terminal

Een SSH-sessie in de browser naar de companion computer, via de versleutelde verbinding van Fleet Manager. Geen portdoorsturing en geen VPN nodig. Alleen voor Owners en Admins. De drone moet online zijn.

Selecteer **Connect** om een shell te openen. Snelcommandoknoppen voeren veelgebruikte controles voor u uit: `df -h`, `free -h`, `top -bn1`, `ip a`, `ip r`, `uptime`, `dmesg` en `ps aux`. **Disconnect** sluit de sessie.

![Terminal-tabblad met een SSH-sessie met de uitvoer van df -h en snelcommandoknoppen](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/drone-detail--terminal.webp)

*Terminal-tabblad verbonden met een drone in het veld, na het uitvoeren van het snelcommando df -h.*

> **Dit is een live shell op het toestel**
>
> De terminal is een echte shell op de companion computer. Het herstarten van services of het netwerk terwijl de drone in de lucht is, kan telemetrie en video onderbreken. Gebruik de terminal op de grond, tenzij u weet wat een commando doet.

## Logs

Een live weergave van de telemetrie- en heartbeatberichten die de drone naar Fleet Manager stuurt, met filters voor **Telemetry** en **Heartbeat**, **Auto-scroll**, **Pause** en wissen. **Download logs** slaat wat op het scherm staat op in een tekstbestand (`mavlink-log-<id>-<time>.txt`). Dat is handig om met uw ticketnummer naar support te e-mailen (tickets accepteren alleen een afbeelding).

Dit is een live logboek, geen archief van vluchtlogs. Fleet Manager slaat telemetrie op voor de [vlucthistorie](https://docs.uavmatrix.com/nl/fleet-manager/map/flight-history/), maar slaat geen DataFlash- of `.tlog`-bestanden op en exporteert die ook niet. Die blijven op de vluchtcontroller en in uw grondcontrolesoftware.

![Logs-tabblad met een scrollende lijst van telemetrie- en heartbeatvermeldingen en de schakelaars Telemetry, Heartbeat en Auto-scroll](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/drone-detail--logs.webp)

*Logs-tabblad met een stroom van TELEMETRY- en HEARTBEAT-vermeldingen, met Telemetry, Heartbeat en Auto-scroll ingeschakeld.*

## Acties

**System Actions** heeft **Reboot** (de companion computer opnieuw opstarten) en **Shutdown** (de companion computer uitschakelen). Beide vereisen een online drone. Ter bevestiging typt u de naam van de actie.

Deze acties werken alleen op de companion computer, niet op de vluchtcontroller. Een shutdown kan op afstand niet ongedaan worden gemaakt: iemand moet de drone handmatig uit- en weer inschakelen.

![Actions-tabblad met de kaart System Actions en de knoppen Reboot en Shutdown](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/drone-detail--actions.webp)

*Actions-tabblad met het dialoogvenster Confirm Reboot open, dat vraagt om reboot te typen ter bevestiging.*

## Hernoemen

Selecteer **Rename**, voer de nieuwe naam in bij **Edit UAV** en sla op. De naam wordt naar UAVcast-Pro gesynchroniseerd wanneer de drone online is.

## Verwijderen

**Remove** verwijdert de drone uit de organisatie en ontkoppelt hem. Zie [Een drone opnieuw koppelen, verwijderen of overdragen](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remove-or-transfer/).

Source: https://docs.uavmatrix.com/nl/fleet-manager/fleet/uav-details/
