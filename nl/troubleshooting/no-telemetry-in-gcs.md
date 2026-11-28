# Geen telemetrie in QGroundControl of Mission Planner

> Vluchtcontroller verbonden in UAVcast-Pro, maar QGroundControl of Mission Planner blijft wachten? Controleer Telemetrie Inschakelen, het IP-adres, UDP 14550 en de VPN.

UAVcast-Pro toont de vluchtcontroller als **Verbonden**, maar QGroundControl zegt *Waiting for vehicle connection* of Mission Planner loopt in een time-out met *No heartbeat packets received*. De drone hoort de vluchtcontroller wel; de telemetrie bereikt alleen uw grondstation niet.

Als UAVcast-Pro zelf **No heartbeat** toont, los dat dan eerst op: [Geen MAVLink-heartbeat](https://docs.uavmatrix.com/nl/troubleshooting/no-mavlink-heartbeat/).

| Wat u ziet | Waarschijnlijke oorzaak | Begin bij |
| --- | --- | --- |
| Dashboard: Ground station Niets ingesteld, of Verzendt niet | Geen bestemming, of Telemetrie Inschakelen staat uit | [Controle 1](https://docs.uavmatrix.com/nl/troubleshooting/no-telemetry-in-gcs/#check-1) |
| Dashboard zegt Sending, het grondstation ziet niets | Verkeerd IP-adres, een firewall, of het grondstation luistert op een andere poort | [Controle 2](https://docs.uavmatrix.com/nl/troubleshooting/no-telemetry-in-gcs/#check-2) |
| Werkte op Wi-Fi, niets via 4G | De bestemming is een lokaal IP-adres in plaats van het VPN-IP | [Controle 3](https://docs.uavmatrix.com/nl/troubleshooting/no-telemetry-in-gcs/#check-3) |
| Verbond vroeger via TCP 5760, gestopt na een update | TCP 5760 is gesloten in v6.5.0 | [Controle 4](https://docs.uavmatrix.com/nl/troubleshooting/no-telemetry-in-gcs/#check-4) |
| Telemetrie is zichtbaar, maar commando's en modewijzigingen doen niets | Read Only staat aan voor deze bestemming | [Controle 5](https://docs.uavmatrix.com/nl/troubleshooting/no-telemetry-in-gcs/#check-5) |

## Controle 1: Wordt telemetrie verzonden?

1. Open **Dashboard** en lees de rij **Ground station** in de statuskaart.

   - **Niets ingesteld**: er is geen bestemming. Voeg er een toe in stap 2.
   - **Verzendt niet**: er is een bestemming, maar er gaat niets uit.
   - **Sending to … · n packets/s**: telemetrie verlaat de drone. Ga naar controle 2.

2. Ga naar **Grondcontrolestations**. Druk op **Bestemming Toevoegen** als de lijst leeg is.

3. Zet op de kaart van uw computer **Eindpunt Inschakelen** en **Telemetrie Inschakelen** aan. Zowel video als telemetrie staan uit bij een nieuwe bestemming.

4. Vul het IPv4-adres van de computer in bij **Bestemmings-IP of Host** en laat **Telemetriepoort** op `14550` staan.

![Telemetriegedeelte van een bestemming met Telemetrie Inschakelen aan en Read Only uit](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/ground-control--telemetry-enabled.webp)

*Grondcontrolestations: een bestemming met Telemetrie Inschakelen aan.*

> **Ongeldige adressen worden overgeslagen**
>
> UAVcast-Pro accepteert alleen IPv4-adressen zoals `192.168.1.10`. Als u een hostnaam probeert op te slaan, krijgt u *Enter a valid IPv4 address, for example 192.168.1.10.* Een ontbrekend of ongeldig adres wordt weggelaten uit de telemetrierouter, en de **Connection check** op de pagina Vluchtcontroller toont dat.

## Controle 2: Zorg dat het grondstation luistert

UAVcast-Pro stuurt MAVLink via UDP naar het adres en de poort die u hebt ingesteld. Het grondstation moet op die poort luisteren.

- **QGroundControl** luistert standaard op UDP 14550. Als u **Telemetriepoort** hebt gewijzigd, voeg dan een UDP-commlink op dezelfde poort toe onder **Application Settings → Comm Links**.
- **Mission Planner**: kies **UDP** in de keuzelijst rechtsboven, druk op **Connect** en accepteer poort `14550`.
- Slechts één programma kan op een poort luisteren. Sluit MAVProxy, een tweede QGroundControl of een andere tool die 14550 mogelijk bezet houdt.
- Sta inkomend UDP 14550 toe in de firewall. De commando's staan in [Geen video, controle 3](https://docs.uavmatrix.com/nl/troubleshooting/no-video-in-gcs/#check-3).

## Controle 3: Gebruik het VPN-adres via 4G

Via 4G kan de drone geen lokaal adres bereiken zoals `192.168.1.20`. Zet het VPN-adres van uw computer (Fleet Manager VPN, Tailscale of ZeroTier) in **Bestemmings-IP of Host**.

Ping vanaf de computer het VPN-adres van de drone. Als de ping mislukt, is de VPN het probleem: zie [VPN verbonden, maar de drone is niet bereikbaar](https://docs.uavmatrix.com/nl/troubleshooting/vpn-cant-reach-drone/).

## Controle 4: TCP 5760 werkt niet meer

Vanaf v6.5.0 accepteert de telemetrierouter geen TCP-verbindingen op poort 5760. Alleen grondstations die u toevoegt en inschakelt, ontvangen gegevens. Als u vroeger Mission Planner via TCP 5760 verbond, voeg dan uw computer toe als bestemming en verbind via UDP.

## Controle 5: Commando's worden genegeerd

Als telemetrie zichtbaar is maar armen, modewijzigingen of missie-uploads niets doen, controleer dan **Read Only** op die bestemming. Read Only blokkeert alles wat het voertuig zou wijzigen (commando's, modewijzigingen, schrijfacties voor parameters en missies), zodat het grondstation alleen kan meekijken. Dit geldt vanaf UAVcast-Pro 6.5.3; in eerdere versies blokkeert Read Only geen parameterschrijfacties. Sommige grondstations tonen in deze modus waarschuwingen, omdat sommige van hun verzoeken onbeantwoord blijven.

## Nog steeds niets?

[Download de logboeken](https://docs.uavmatrix.com/nl/troubleshooting/collect-logs/) met **Mavlink Beheer** geselecteerd en stuur ze naar **[support@uavmatrix.com](mailto:support@uavmatrix.com)**. Vermeld welk grondstation u gebruikt en het IP-adres ervan.

Gerelateerd: [Grondcontrolestations](https://docs.uavmatrix.com/nl/uavcast-pro/ground-stations/) · [Poorten en protocollen](https://docs.uavmatrix.com/nl/reference/ports-and-protocols/)

Source: https://docs.uavmatrix.com/nl/troubleshooting/no-telemetry-in-gcs/
