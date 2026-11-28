# RTK-GPS over 4G met een NTRIP-caster

> Stream RTCM3-correcties van een NTRIP-caster via LTE naar uw vluchtcontroller met UAVcast-Pro voor RTK Fixed, zonder basisstation ter plekke.

UAVcast-Pro kan RTCM3-correcties ophalen van een NTRIP-caster via de eigen internetverbinding van de drone en die doorgeven aan de vluchtcontroller. U krijgt RTK Float- of RTK Fixed-positionering zonder een basisstation of aparte radio mee te nemen. Elke standaard NTRIP v1- of v2-caster werkt.

```text
NTRIP caster ──RTCM3 over TCP/TLS──► UAVcast-Pro ──MAVLink GPS_RTCM_DATA──► flight controller ──► RTK GPS
      ▲                                    │
      └──────── GGA position (VRS) ────────┘
```

**U hebt nodig:**

- Een RTK-geschikte GPS op de vluchtcontroller, zoals een u-blox F9P-module, Here3+ of Septentrio Mosaic. Standaard M8N/M10-navigatiemodules kunnen geen RTK.
- UAVcast-Pro met de vluchtcontroller **Verbonden** en internet op de drone.
- Een casteraccount: een nationaal CORS-netwerk, een commerciële dienst (Trimble, Hexagon, Topcon …) of de gratis community-caster rtk2go.com.

## 1. De caster invoeren

1. Open **Vluchtcontroller → NTRIP / RTK**.
2. Vul **Caster-host** en **Poort** in (meestal `2101`).
3. Zet **TLS gebruiken (HTTPS)** alleen aan als uw provider dat vereist. Commerciële casters doen dat vaak, publieke zelden.
4. Vul **Gebruikersnaam** en **Wachtwoord** in. Voor rtk2go.com gebruikt u uw e-mailadres als gebruikersnaam en laat u het wachtwoord leeg.
5. Druk op **Verbinding testen** en wacht op **De caster heeft de inloggegevens geaccepteerd.**

## 2. Een mountpoint kiezen

1. Druk op **Mountpoints bladeren**. UAVcast-Pro laadt de lijst van de caster.
2. Kies het mountpoint dat het dichtst bij uw vliegplek ligt. De lijst toont **Formaat**, **GNSS**, **Land**, **Locatie** en of er een positie nodig is (**NMEA**: **Vereist**).
3. Druk op **Selecteren**. De naam komt in **Mountpoint** te staan.

![Caster-kaart met NTRIP-client inschakelen, caster-host, poort 2101, het veld Mountpoint, de knop Mountpoints bladeren en TLS gebruiken](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/flight-controller--ntrip-caster.webp)

*De kaart Caster. Mountpoints bladeren, naast het veld Mountpoint, opent de lijst met mountpoints.*

## 3. Uw positie doorsturen (VRS- en dichtstbijzijnd-mountpoint-casters)

VRS- en dichtstbijzijnd-mountpoint-casters bouwen correcties voor uw locatie, dus ze hebben uw positie nodig als NMEA GGA-zin.

1. Laat **GGA upstream verzenden** aan (de standaard) met **Verzendinterval (seconden)** op 10.
2. Laat **Positiebron** staan op **Live positie van vluchtcontroller**.
3. Vul **Breedtegraad**, **Lengtegraad** en **Hoogte (m)** ook in bij de handmatige positie. UAVcast-Pro gebruikt die tot de vluchtcontroller een GPS-fix heeft.

Voor een enkel vast basisstation doet GGA geen kwaad, maar u kunt het uitschakelen.

## 4. De stream starten

Zet **NTRIP-client inschakelen** aan. Binnen enkele seconden zou het statuspaneel moeten tonen:

1. **Status**: **Correcties worden gestreamd**, met **Caster-antwoord** zoals `ICY 200 OK`.
2. **RTCM-berichten doorgestuurd** die oplopen en **Laatste RTCM-frame** op *zojuist*.
3. **Recente berichttypen** met uw constellaties, bijvoorbeeld 1005, 1077, 1087, 1097.
4. De RTK-fixbadge schuift van **3D Fix** naar **RTK Float** en daarna **RTK Fixed** onder vrije hemel.

![Tabblad NTRIP / RTK met het statuspaneel op Uitgeschakeld en nulwaarden, en de kaart GPS-kwaliteit op Geen Fix](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/flight-controller--ntrip.webp)

*Het statuspaneel en de kaart GPS-kwaliteit, hier getoond voordat een caster is ingesteld (Uitgeschakeld, geen GPS-fix). Zodra correcties binnenkomen, zijn dit de velden om in de gaten te houden.*

De kaart **GPS-kwaliteit** voegt de door de ontvanger gemelde nauwkeurigheid toe en een gemeten **Positiestabiliteit (1σ)** die niet op de eigen schatting van de ontvanger leunt. Het dashboard toont de status onder **RTK-correcties** en het fixtype onder **GPS**.

## Voorinstellingen

```text
Caster host   rtk2go.com
Port          2101
TLS           off
Username      you@example.com
Password      (empty)
Mountpoint    nearest one from Browse mountpoints
```

```text
Caster host   provider host name
Port          2101 (sometimes 2102 or 443)
TLS           as the provider says
Username      provider account
Password      provider password
Mountpoint    the provider's VRS mountpoint
GGA upstream  on, 10 s, live position from flight controller
```

## Goed om te weten

- Correcties reizen via dezelfde MAVLink-verbinding als telemetrie, dus de verbinding met de vluchtcontroller moet actief zijn.
- Na een korte internetonderbreking worden correcties binnen enkele seconden hervat. Zwijgt de caster, dan maakt UAVcast-Pro zelf opnieuw verbinding.
- De nauwkeurigheid neemt af naarmate u verder van het basisstation bent. Kies het dichtstbijzijnde mountpoint, of gebruik een VRS-dienst.

## Probleemoplossing

Blijft hangen op **Verbinden...**, een `401`-antwoord, geen RTCM-data of geen RTK-fix: [RTK-correcties komen niet binnen](https://docs.uavmatrix.com/nl/troubleshooting/rtk-corrections-not-arriving/). Alle instellingen op deze pagina worden beschreven in [NTRIP / RTK](https://docs.uavmatrix.com/nl/uavcast-pro/flight-controller/ntrip-rtk/).

Source: https://docs.uavmatrix.com/nl/guides/rtk-ntrip-caster/
