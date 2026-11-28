# Streamen naar meerdere grondstations

> Stuur telemetrie en live video van één drone naar meerdere QGroundControl- of Mission Planner-stations met UAVcast-Pro, met alleen-lezen waarnemers.

Eén drone, meerdere schermen: een piloot op Mission Planner, een payload-operator op QGroundControl, een supervisor die vanaf kantoor meekijkt. UAVcast-Pro stuurt telemetrie en video naar elke bestemming die u toevoegt, elk met eigen schakelaars.

## Hoe het werkt

Elk item onder **Grondcontrolestations** is één bestemming: een IPv4-adres plus een telemetriepoort en een videopoort. UAVcast-Pro stuurt:

- MAVLink-telemetrie via UDP naar **Telemetriepoort** (standaard 14550) als **Telemetrie Inschakelen** aan staat,
- H.264-video via RTP/UDP naar **Videopoort** (standaard 5600) als **Video Inschakelen** aan staat,
- helemaal niets als **Eindpunt Inschakelen** uit staat.

Commando's van elke bestemming bereiken de vluchtcontroller, tenzij die bestemming **Read Only** is.

## 1. Per station een bestemming toevoegen

1. Open **Grondcontrolestations** en druk voor elk station één keer op **Bestemming Toevoegen**.
2. Geef elk een **Naam** die u herkent in het veld, bijvoorbeeld *Piloot – Mission Planner* en *Payload – QGC*.
3. Vul het IPv4-adres van elke computer in bij **Bestemmings-IP of Host**. Via 4G gebruikt u VPN-adressen.
4. Zet **Telemetrie Inschakelen** en **Video Inschakelen** aan waar nodig. Een station dat alleen telemetrie nodig heeft, bespaart bandbreedte als video uit staat.

![Pagina Grondcontrolestation met twee bestemmingskaarten en de knop Bestemming Toevoegen](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/ground-control.webp)

*Grondcontrolestation met twee bestemmingskaarten. Bestemming Toevoegen voegt per station één kaart toe.*

## 2. Waarnemers alleen-lezen maken

Voor wie wel mag meekijken maar nooit mag vliegen, zet u **Read Only** aan bij hun bestemming. Het station ontvangt nog steeds live telemetrie, maar kan niets op het voertuig wijzigen: commando's, modewijzigingen, armen, parameterschrijfacties, missieschrijfacties en RC-overrides vanaf dat station worden geblokkeerd. Dit geldt vanaf UAVcast-Pro 6.5.3; in eerdere versies blokkeert Read Only geen parameterschrijfacties. De grondstationsoftware kan in deze modus waarschuwingen tonen, omdat sommige verzoeken (zoals het downloaden van parameters of de missie) onbeantwoord blijven.

> **Twee piloten, één drone**
>
> Zonder Read Only kan elk station de drone besturen. Spreek af wie vliegt, en maak elk ander station alleen-lezen.

## 3. Twee stations op één computer

Twee programma's op één computer kunnen niet op dezelfde poort luisteren. Voeg twee bestemmingen toe met hetzelfde IP-adres en verschillende poorten, bijvoorbeeld:

| Bestemming | Telemetriepoort | Videopoort |
| --- | --- | --- |
| Mission Planner | 14550 | 5600 |
| QGroundControl | 14551 | 5603 |

Stel daarna het tweede programma in om op die poorten te luisteren (in QGroundControl voegt u een UDP-commverbinding toe op 14551 en stelt u de UDP-videopoort in op 5603).

Zet videopoorten **3 uit elkaar** (5600, 5603, 5606 …). Elke bestemming gebruikt zijn videopoort, plus videopoort + 1 voor de tweede camera bij [dubbele stream](https://docs.uavmatrix.com/nl/guides/dual-camera-rc-switching/) en videopoort + 2 voor [audio](https://docs.uavmatrix.com/nl/uavcast-pro/camera/audio/). Poorten die dichter bij elkaar liggen, botsen zodra u dubbele stream of audio aanzet.

## 4. Let op de uplink

Elke videobestemming is een aparte kopie van de stream. Drie videobestemmingen op 1500 kbps vragen ongeveer 4,5 Mbit/s aan uplink van de drone. Via 4G stuurt u video alleen naar de stations die het nodig hebben, of verlaagt u de bitsnelheid onder **Camera → Camera-instellingen**. **Dashboard → Netwerkverkeer** toont wat het modem werkelijk verstuurt.

## 5. Controleren of elk station data krijgt

Op **Dashboard** toont de rij **Grondstation** *Verzenden naar n · x pakketten/s*. De **Verbindingscontrole** onder **Vluchtcontroller → Verbinding** toont elke grondstationuitvoer, en elke bestemming die is weggelaten omdat het adres ongeldig is.

## Met Fleet Manager

In Fleet Manager worden grondstations verbonden met de VPN van de organisatie, en koppelt u ze aan drones met **Stream Bindings** op de pagina **Network**. Elke extra drone die aan hetzelfde grondstation gebonden is, krijgt een eigen blok poorten. Zie [Streambindingen](https://docs.uavmatrix.com/nl/fleet-manager/network/stream-bindings/).

Source: https://docs.uavmatrix.com/nl/guides/multiple-ground-stations/
