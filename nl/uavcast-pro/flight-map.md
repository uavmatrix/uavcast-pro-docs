# Vliegkaart

> Volg uw drone live op de UAVcast-Pro Vliegkaart met een cockpit-HUD, videovensters, armen/ontwapenen, vliegmodi, RTL, loiteren, GCS failsafe en berichten van de vluchtcontroller.

De Vliegkaart is een in UAVcast-Pro ingebouwd grondstation dat in de browser draait. Hij toont de drone op een kaart met het spoor, de actieve missie en de thuispositie, een cockpit-HUD, live video en de berichten van de vluchtcontroller. U kunt motoren armen en ontwapenen, de vliegmodus wijzigen, een missie starten en RTL of loiteren activeren, telkens achter bevestigingsdialogen. Open **Vliegkaart → Kaartweergave**.

Hij is bedoeld voor monitoring en eenvoudige commando's vanaf elke telefoon, tablet of laptop. Voor volledige missieplanning en parameterwerk gebruikt u naast deze pagina nog steeds Mission Planner of QGroundControl.

![Vliegkaart met de kaart, de cockpit-HUD rechts en het tabblad Status met kaarten voor verbinding, batterij, vluchtcontroller, telemetrie, GPS en houding](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/flight-map.webp)

*Vliegkaart → Kaartweergave op een testopstelling zonder GPS-fix, dus de kaart toont geen dronepositie.*

## Indeling

- **Kaart** (links): de drone met koers, spoor, home marker en missie. **Sats** toont het aantal satellieten; **Auto-Pan** houdt de drone gecentreerd. Wissel van laag met de lagenknop (**Straatkaart**, **Satelliet** en andere). Heeft de drone geen fix, dan ziet u **No GPS Lock**: *Minimaal 4 satellieten vereist*.
- **Bovenbalk**: de **Opname**-knoppen (**Telemetrie**, **CAM 1**, **CAM 2**), vrije opslagruimte voor opnames, de telemetrie-updatesnelheid (**1 Hz** tot **10 Hz**), de huidige datasnelheid en een knop die de kaart in een eigen venster opent.
- **Cockpit** (rechts): een houdings-HUD met snelheids- en hoogtebanden, de huidige vliegmodus, de armstatus, de batterijspanning en het laatste pre-arm-bericht.
- **Zijtabbladen**: **Status**, **Meters**, **Acties**, **Berichten** en **Opnames**. Sleep de rand van het paneel om het formaat te wijzigen; dubbelklik op de greep om te herstellen.
- **Videovensters**: één per actieve camerastream. Sleep, maximaliseer, minimaliseer of verberg ze; verborgen vensters worden als tabbladen onderaan de kaart vastgezet.

De bovenbalk op elke pagina toont ook **FC Verbonden**, **Actief**/**Inactief**, het voertuigtype, de vliegmodus en **GCS failsafe ingeschakeld** of **GCS failsafe uitgeschakeld**.

## Armen en ontwapenen

1. Open het tabblad **Acties**, of gebruik de armknop onder het cockpit.
2. Selecteer **Armen**. Het dialoogvenster waarschuwt: *De propellers kunnen gaan draaien. Zorg dat niemand in de buurt van de drone is en dat het gebied eromheen vrij is.*
3. Bevestig met **Armen**.

De eigen pre-arm-controles van de vluchtcontroller bepalen nog steeds of er gearmd kan worden. Weigert de vluchtcontroller, dan ziet u: *De drone heeft het armen geweigerd. Controleer het PreArm-bericht op het scherm.* De reden verschijnt onder het cockpit en in **Berichten**.

**Ontwapenen** stopt de motoren onmiddellijk. De vluchtcontroller weigert dit zolang de drone vliegt.

## Vliegmodus wijzigen

Kies een modus met de vliegmodusbediening. De lijst komt overeen met het voertuigtype (Copter, Plane, Rover, Sub) en is gegroepeerd in **Veilige modi** (positiehouden en stabilisatie), **Navigatie** (autonome modi) en **Geavanceerd** (handmatige en noodmodi). Modi met een hoger risico zijn gemarkeerd met een waarschuwingspictogram en vragen om bevestiging voordat het commando wordt verzonden.

## Tabblad Acties

| Groep | Knoppen | Wat er gebeurt |
| --- | --- | --- |
| **Missie** | **Lezen**, **Verbergen**, **Starten**, **Wissen** | **Lezen** laadt de missie van de vluchtcontroller op de kaart. **Starten** start deze (na bevestiging). **Wissen** verwijdert de missie van de vluchtcontroller en wacht op de bevestiging ervan. |
| **Modi** | **Loiter Onbep**, **RTL** | Snelle moduswijzigingen. |
| **Pre-Flight** | **Pre-Flight Kalibratie**, **Missie Laden**, **Clear Mission** | Kalibratie voert de grondkalibratie van de vluchtcontroller uit (gyro, baro). Alleen op de grond. |
| **Noodcommando's** | **Terugkeer Naar Start**, **Onbeperkt Loiteren** | Na bevestiging. RTL keert terug en landt of loiteert volgens de instellingen van de vluchtcontroller. Onbeperkt loiteren cirkelt op de huidige positie. |
| **Failsafe** | Schakelaar **GCS failsafe** | Schrijft `FS_GCS_ENABLE` (Copter) en `FS_GCS_ENABL` (Plane) naar de vluchtcontroller. |

> **Schakel GCS failsafe in voor vluchten via mobiel netwerk**
>
> De GCS failsafe wordt geactiveerd wanneer de vluchtcontroller geen MAVLink-heartbeats meer ontvangt van een grondstation. Via 4G/LTE kan de verbinding op elk moment wegvallen. Configureer in uw grondstation wat de failsafe doet (actie `FS_GCS_ENABLE`, `FS_GCS_TIMEOUT`) voordat u erop vertrouwt.

Alleen-lezen gebruikers zien het tabblad Acties, maar kunnen het niet gebruiken (*Alleen-lezen gebruikers kunnen de drone niet besturen*).

## Berichten

**Berichten** toont elk tekstbericht van de vluchtcontroller. **Actieve meldingen** toont de huidige problemen (bijvoorbeeld pre-arm-fouten) apart van het **Berichtenlogboek**. Schakel **Alleen problemen** in om routineberichten te verbergen, en **Logboek wissen** om opnieuw te beginnen. Het tabblad toont een badge met het aantal actieve meldingen.

## Status- en Meters-tabbladen

- **Status**: kaarten voor **VERBINDING** (pakketverlies, verbonden), **VLUCHTCONTROLLER** (actief, modus, voertuig), telemetrie-datasnelheid, positie, **GPS** (vergrendeling, satellieten, **HOOGTE (AGL)**, **HOOGTE (AMSL)**) en **BATTERIJ**.
- **Meters**: ronde instrumenten voor dezelfde gegevens.

AGL is de hoogte boven het startpunt; AMSL is de hoogte boven het gemiddelde zeeniveau.

## Kaartinstellingen

| Instelling | Wat het doet |
| --- | --- |
| **Auto-Pan** | Houdt de drone in het midden van de kaart. |
| **Show Aircraft Heading** | Tekent een koerslijn vanaf de drone. |
| **Trail Length** | Aantal punten dat in het vluchtspoor wordt bewaard. |
| **Trail Color** | Kleur van het spoor. **Spoorpad wissen** verwijdert het. |
| **Show Distance from Home** | Toont de afstand tot de Home Marker. |
| **Reset to Defaults** | Herstelt alle kaartinstellingen. |

## Vensters in een apart scherm

- **Vliegkaartvenster**: de knop rechts in de bovenbalk opent de kaart alleen in een nieuw venster (`/flightmapwindow`), op maat voor een tweede monitor.
- **HUD-venster**: open de HUD vanuit het cockpit in een eigen venster (`/hud`).

![Cockpit-HUD met houdingsindicator, snelheids- en hoogtebanden, koers en vliegmodus](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/hud.webp)

*De cockpit-HUD op /hud. De horizon staat hier ondersteboven omdat de vluchtcontroller van deze testopstelling omgekeerd is gemonteerd.*

## Telemetrie-updatesnelheid

De snelheidskiezer in de bovenbalk (**1 Hz**, **2 Hz**, **5 Hz**, **10 Hz**) bepaalt hoe vaak UAVcast-Pro telemetrie naar de browser stuurt. Dit verandert niet wat uw grondstations ontvangen. Gebruik een lage snelheid bij een trage verbinding met de webinterface.

## Gerelateerd

- [Tabblad Missieplanner](https://docs.uavmatrix.com/nl/uavcast-pro/flight-map/mission-planner/)
- [Radio (RC-kanalen)](https://docs.uavmatrix.com/nl/uavcast-pro/flight-map/radio/)
- [MAVLink Inspector](https://docs.uavmatrix.com/nl/uavcast-pro/flight-map/inspector/)
- [Vluchtanalyse](https://docs.uavmatrix.com/nl/uavcast-pro/flight-map/flight-analytics/)
- [Opnames en vluchtterugblik](https://docs.uavmatrix.com/nl/uavcast-pro/camera/recordings/)

Source: https://docs.uavmatrix.com/nl/uavcast-pro/flight-map/
