# Haperend, vertraagd of grijs beeld via 4G

> Los stotterend beeld, grijze vlekken en vertraging op in UAVcast-Pro-video via LTE of VPN door bitsnelheid, resolutie, FPS en Stream Herstelsnelheid af te stemmen op de verbinding.

Het beeld komt aan, maar het stottert, bevriest, toont grijze blokken over het scherm of loopt seconden achter. Bijna altijd vraagt de stream meer dan de verbinding aankan, of stuurt de encoder te zelden keyframes om verloren pakketten te herstellen.

| Wat u ziet | Waarschijnlijke oorzaak | Begin bij |
| --- | --- | --- |
| Grijze of groene vlekken die na een seconde of twee verdwijnen | Pakketten verloren en te weinig keyframes om te herstellen | [Controle 2](https://docs.uavmatrix.com/nl/troubleshooting/choppy-or-delayed-video/#check-2) |
| Vloeiend op Wi-Fi, stottert of bevriest via LTE | Bitsnelheid hoger dan wat de mobiele uplink aankan | [Controle 1](https://docs.uavmatrix.com/nl/troubleshooting/choppy-or-delayed-video/#check-1) |
| Stottert zelfs op het lokale netwerk | CPU-limiet op de drone, of het GCS kan niet snel genoeg decoderen | [Controle 3](https://docs.uavmatrix.com/nl/troubleshooting/choppy-or-delayed-video/#check-3) |
| Video loopt seconden achter de drone | U kijkt naar de browserpreview, of het GCS buffert | [Controle 4](https://docs.uavmatrix.com/nl/troubleshooting/choppy-or-delayed-video/#check-4) |

## Controle 1: Verlaag de bitsnelheid en resolutie

Een mobiele uplink is veel trager dan de downloadsnelheid en verandert wanneer de drone tussen cellen beweegt. Begin laag en verhoog stapsgewijs.

1. Ga naar **Camera → Camera-instellingen**.
2. Stel **Resolutie** in op 1280×720 of lager.
3. Stel **Selecteer FPS** in op 15 of 20.
4. Zet de schuif **Bitsnelheid:** op ongeveer 1000–1500 kbps. `0` betekent automatisch.
5. Instellingen worden opgeslagen terwijl u ze wijzigt, en de camera past ze toe.
6. Vlieg, of rijd, de route waar het u om gaat. Als die goed werkt, verhoog dan één waarde per keer.

![Kaart Camera-instellingen met Resolutie, Selecteer FPS, Bitsnelheid en Stream Herstelsnelheid](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/camera--settings.webp)

*Camera → Camera-instellingen: Resolutie, Selecteer FPS, Bitsnelheid en Stream Herstelsnelheid zijn de waarden om af te stemmen op de uplink.*

> **Hoeveel capaciteit heeft de verbinding?**
>
> **Dashboard → Netwerkverkeer** toont de live TX-snelheid per interface. Als de modeminterface bij elke ingestelde bitsnelheid op hetzelfde plafond blijft steken, dan is dat plafond uw uplink.

## Controle 2: Stel een snellere Stream Herstelsnelheid in

Grijze overlays komen van verloren pakketten. De decoder kan het beeld alleen herstellen bij het volgende keyframe. **Stream Herstelsnelheid** bepaalt hoe vaak keyframes worden verzonden.

1. Zoek in **Camera → Camera-instellingen** naar **Stream Herstelsnelheid**.
2. Verschuif de schuif van **Automatisch** richting **Ultra Snel**: minder frames tussen keyframes herstellen het beeld sneller, maar gebruiken meer bandbreedte. Richting **Bandbreedte Bespaarder** bespaart bandbreedte, maar herstelt langzamer. De hint onder de schuif (bijvoorbeeld *VPN/WiFi-vriendelijk*) geeft aan waar elke stand geschikt voor is.
3. Sla op en vergelijk. Als de verbinding erg traag is, combineer dan een snellere herstelsnelheid met een lagere bitsnelheid (controle 1).

Bij **Automatisch** stuurt UAVcast-Pro één keyframe per seconde (één per *FPS*-frames, of elke 30 frames wanneer FPS op automatisch staat).

## Controle 3: Bekijk de CPU-belasting

UAVcast-Pro encodeert H.264 in software. Op een Raspberry Pi Zero 2 W, of met twee camera's die tegelijk streamen, kan de CPU tekortschieten.

1. Open **Camera → Camera-instellingen** en bekijk de kaart **Systeembelasting**.
2. Als er **CPU zit bijna aan de limiet. Verlaag de resolutie of bitsnelheid.** staat, doe dan precies dat.
3. Met **Dubbele stream** aan: verlaag de resolutie of bitsnelheid van één stream, of schakel de tweede stream uit.
4. Controleer op het **Dashboard** of er **Vertraagd (hitte of voeding)** staat onder **Voeding**. Een gethrottelde CPU encodeert trager. Zie [Onderspanning en throttling](https://docs.uavmatrix.com/nl/troubleshooting/undervoltage-and-throttling/).

## Controle 4: Weet welke stream u bekijkt

De **Live Voorvertoning** in de browser en het videovenster op de **Vliegkaart** lopen via de ingebouwde mediaserver, die vertraging toevoegt. Ze zijn bedoeld voor het instellen, niet voor het vliegen. De stream naar uw grondstation gaat rechtstreeks via UDP en heeft veel lagere latentie.

Als het grondstation zelf achterloopt:

- Controleer in QGroundControl of de lage-latentiemodus aan staat in de video-instellingen.
- Gebruik in GStreamer-pipelines `sync=false` op de videosink, zoals in het [testcommando](https://docs.uavmatrix.com/nl/troubleshooting/no-video-in-gcs/#check-5).
- Controleer bij VPN of ZeroTier of Tailscale de drone rechtstreeks bereikt en niet via een relay. Tailscale toont de gebruikte relay onder **Relay** op de pagina **Virtueel Privénetwerk**.

## Controle 5: Controleer het mobiele signaal

Ga naar **Modem** en bekijk **Signaalkwaliteit** en **Technologie** onder **Modeminformatie**. Een zwak signaal, of een terugval van LTE naar 3G, verbreekt de uplink. Plaats het modem uit de buurt van de vluchtcontroller, ESC's en voedingskabels, of gebruik een modem met externe antennes.

## Nog steeds haperend?

[Download de logboeken](https://docs.uavmatrix.com/nl/troubleshooting/collect-logs/) (**Camera Server**, laatste 30 minuten) en stuur ze naar **[support@uavmatrix.com](mailto:support@uavmatrix.com)** met uw cameramodel, resolutie, FPS, bitsnelheid en het type verbinding waarmee u vliegt.

Gerelateerd: [Camera-instellingen](https://docs.uavmatrix.com/nl/uavcast-pro/camera/) · [Mobiel modem](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/cellular-modem/)

Source: https://docs.uavmatrix.com/nl/troubleshooting/choppy-or-delayed-video/
