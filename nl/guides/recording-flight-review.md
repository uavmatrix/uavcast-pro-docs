# Vluchten opnemen en terugkijken

> Neem camera-video en telemetrie automatisch op de drone op bij armen, sla op op USB of SSD, en speel video, kaart en vluchtdata af op één tijdlijn.

Sinds v6.5.1 neemt UAVcast-Pro op de drone zelf op: camera-video plus een telemetrielog, met één klik op de vliegkaart of automatisch elke keer dat de motoren worden gearmd. Opnemen hergebruikt de stream die al is gecodeerd, dus het kost geen extra CPU en onderbreekt nooit de live video naar het grondstation. Daarna toont de vluchtterugblik-speler de video, het kaartspoor, het cockpitbeeld en de vluchtdata op één tijdlijn.

## 1. Kies waar opnames worden opgeslagen

1. Steek een USB-stick of SSD in als u erop wilt opnemen. Opnames vullen de opslag snel, en een USB-SSD is robuuster dan een SD-kaart.
2. Open **Camera → Opnames** en het tabblad **Instellingen**.
3. Kies onder **Opslaglocatie** de schijf of **Interne opslag**. Druk op **Schijven opnieuw zoeken** als de schijf is ingestoken nadat de pagina is geopend. Met **Of een andere map** voert u een pad in en bevestigt u met **Deze map gebruiken**.
4. Stel **Vrij houden** in (standaard 2 GB). Opnemen vult de schijf nooit verder dan dit.

![Tabblad Instellingen van Opnames met opslaglocatie, vrij houden, oudste opnames verwijderen, opnames ouder dan verwijderen en automatisch opnemen bij armen](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/camera--recordings-settings.webp)

*Camera → Opnames → Instellingen met Interne opslag geselecteerd en Automatisch opnemen bij armen aan.*

## 2. Bepalen wanneer u opneemt

| Instelling | Standaard | Wat het doet |
| --- | --- | --- |
| **Automatisch opnemen bij armen** | Aan | Start wanneer de motoren worden gearmd en stopt wanneer ze worden ontwapend. Valt de verbinding in de vlucht weg, dan gaat het opnemen door. |
| **Camera 1 opnemen** / **Camera 2 opnemen** | Aan | Camera 2 neemt alleen op als dubbele stream aan staat. |
| **Oudste opnames verwijderen bij weinig ruimte** | Aan | Werkt als een dashcam: opnemen stopt nooit door gebrek aan ruimte. Staat dit uit, dan stopt het opnemen. |
| **Opnames ouder dan verwijderen** | 0 dagen | 0 bewaart opnames tot de ruimte nodig is. |
| **Bestandslengte** | 1 min | Opnames worden opgeslagen in stukken van 1–30 minuten. Kortere stukken verliezen minder bij een stroomstoring. |
| **Telemetrie opnemen** | **Tijdens armen** | **Altijd tijdens verbinding** logt ook op de grond en start bij elk arm, ontwapenen en elk uur een nieuw bestand. **Uit** neemt alleen video op. |

## 3. Handmatig opnemen

Met de knoppen **Opname** op de **Vliegkaart** start en stopt u elke camera (**Camera 1 opnemen**, **Opname van camera 1 stoppen**) en de telemetrielog. Alleen-lezen gebruikers kunnen meekijken maar geen opnames starten.

## 4. Een vlucht vinden

Open **Camera → Opnames → Bibliotheek**. Elke vlucht staat in de lijst met zijn video, een miniatuur en zijn telemetrie. Een lopende opname toont een **OPNAME**-badge.

![Bibliotheek van opnames met een opslagbalk en twee opgenomen vluchten, elk met CAM 1- en Telemetrie-badges en een knop Afspelen](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/camera--recordings.webp)

*Camera → Opnames → Bibliotheek met twee opgenomen vluchten, elk met cameravideo en telemetrie.*

Vanuit de bibliotheek kunt u:

- een vlucht **afspelen** in de vluchtterugblik-speler,
- videoclips als MP4 **downloaden**,
- een opname **verwijderen**: **Alleen video verwijderen**, of **Video en telemetrie verwijderen**.

## 5. De vlucht terugkijken

De vluchtterugblik-speler speelt de video af naast het kaartspoor, het cockpitbeeld en de vluchtdata (**Hoogte**, **Snelheid**, **Batterij**, **Satellieten**, **Modus**) op één tijdlijn.

![Vluchtterugblik-speler met het videogebied, de kaart, het cockpitbeeld en een tijdlijn met afspeelbediening](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/camera--flight-review.webp)

*Vluchtterugblik-speler: video, kaart en cockpitbeeld boven één tijdlijn.*

- De tijdlijn markeert arm-, ontwapen- en vliegmodus-wisselingen, zodat u direct naar het relevante moment springt.
- Gebruik **10 seconden terug** en **10 seconden vooruit**, en **Afspeelsnelheid** van 0,5× tot 4×.
- Met twee camera's schakelt **Videoweergave wijzigen** tussen **Beeld-in-beeld** en **Naast elkaar**; **Deze camera groot tonen** wisselt ze om.
- Heeft een opname geen telemetrie, dan meldt de speler: *Geen telemetrielog voor deze opname. Telemetrie wordt gelogd terwijl de drone gearmd is.*

## Goed om te weten

- Opnames worden op de drone opgeslagen. Download wat u wilt bewaren voordat **Oudste opnames verwijderen bij weinig ruimte** ze wist.
- De kaart **Opslag** op het dashboard en de samenvatting **Opslag voor opnames** tonen de vrije ruimte.
- Het opnemen gaat door met **Live Voorvertoning Inschakelen?** uitgeschakeld.
- Reageert de opnamedienst niet meer, dan meldt de pagina: *De opnamedienst reageert niet.* Herstart de cameraservice via **Camera → Camera-instellingen** en [verzamel de logboeken](https://docs.uavmatrix.com/nl/troubleshooting/collect-logs/) als het opnieuw gebeurt.

Source: https://docs.uavmatrix.com/nl/guides/recording-flight-review/
