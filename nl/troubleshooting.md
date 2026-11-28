# Probleemoplossing

> Los geen video, geen MAVLink-heartbeat, problemen met modem en VPN, licentiefouten en Fleet Manager-koppeling op. Begin bij wat u ziet en volg de controles.

Begin bij het symptoom. Elke onderstaande pagina somt de waarschijnlijke oorzaken op in de volgorde waarin ze in de praktijk voorkomen, met genummerde controles die de exacte labels uit de interfaces van UAVcast-Pro en Fleet Manager gebruiken.

> **Controleer eerst het dashboard**
>
> Open **Dashboard** in UAVcast-Pro. De statuskaart vat de drone in één regel samen (**Alle systemen normaal**, of het aantal problemen en waarschuwingen) en heeft per onderdeel een rij: **Vluchtcontroller**, **Grondstation**, **Mobiel**, **VPN**, **RTK-correcties**, **Video** en **Voeding**. De eerste rode rij is meestal het beste startpunt.

![UAVcast-Pro-dashboard met de statuskaart die 2 problemen toont: GPS geen fix en VPN niet verbonden](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/dashboard.webp)

*Dashboard → statuskaart. Rijen met een probleem worden rood en meegeteld in de badge met problemen, hier GPS (geen fix) en VPN (niet verbonden).*

## Zoek op uw symptoom

| Wat u ziet | Waarschijnlijke oorzaak | Ga naar |
| --- | --- | --- |
| Telemetrie werkt, maar het videogebied in QGroundControl of Mission Planner is zwart | **Video Inschakelen** staat uit voor dat grondstation, verkeerd IP-adres, of een firewall | [Geen video in het grondstation](https://docs.uavmatrix.com/nl/troubleshooting/no-video-in-gcs/) |
| Video bevriest, loopt grijs uit of loopt seconden achter | Bitsnelheid te hoog voor de verbinding, of keyframes staan te ver uit elkaar | [Haperend of vertraagd beeld](https://docs.uavmatrix.com/nl/troubleshooting/choppy-or-delayed-video/) |
| Pagina Vluchtcontroller toont **Geen heartbeat**, **Wachten op apparaat** of **Baudrate detecteren** | Kabel, bedrading, poort of baudrate | [Geen MAVLink-heartbeat](https://docs.uavmatrix.com/nl/troubleshooting/no-mavlink-heartbeat/) |
| UAVcast-Pro toont de vluchtcontroller als **Verbonden**, het GCS wacht op een verbinding | Telemetrie wordt niet naar het GCS gestuurd, of het GCS luistert niet | [Geen telemetrie in het grondstation](https://docs.uavmatrix.com/nl/troubleshooting/no-telemetry-in-gcs/) |
| **Geen camera's beschikbaar** bij **Selecteer Camera** | CSI-camerastack ontbreekt, flatkabel, of USB-camera niet gezien | [Camera niet gedetecteerd](https://docs.uavmatrix.com/nl/troubleshooting/camera-not-detected/) |
| **Ongeldige licentiesleutel**, **Maximaal aantal activeringen bereikt** of **Licentieactivering mislukt** | Verkeerde sleutel, geen vrije apparaatplek, of geen internet | [Licentie wordt niet geactiveerd](https://docs.uavmatrix.com/nl/troubleshooting/license-activation-failed/) |
| Modem toont een signaal en een provider, maar er laadt niets | APN, netwerkprioriteit of simdata | [4G-modem verbonden maar geen internet](https://docs.uavmatrix.com/nl/troubleshooting/modem-no-internet/) |
| De browser kan `http://<device-ip>/` niet bereiken na de installatie | Verkeerd adres, service draait niet, of poort is gewijzigd | [Webinterface opent niet](https://docs.uavmatrix.com/nl/troubleshooting/web-interface-wont-open/) |
| Het installatieprogramma stopt met een fout | 32-bits besturingssysteem, geen internet, of weinig schijfruimte | [Installatie mislukt](https://docs.uavmatrix.com/nl/troubleshooting/installation-fails/) |
| ZeroTier of Tailscale meldt verbonden, maar u kunt de drone niet pingen of openen | Lid niet geautoriseerd, verkeerd netwerk, of GCS niet op het VPN | [VPN verbonden maar drone niet bereikbaar](https://docs.uavmatrix.com/nl/troubleshooting/vpn-cant-reach-drone/) |
| NTRIP-status is niet **Correcties worden gestreamd**, of de fix bereikt nooit **RTK Vast** | Caster-instellingen, GGA, of een ontvanger die geen RTK ondersteunt | [RTK-correcties komen niet aan](https://docs.uavmatrix.com/nl/troubleshooting/rtk-corrections-not-arriving/) |
| **Spanning te laag - gebruik een sterkere voeding** of **Vertraagd (hitte of voeding)** | Zwakke voeding of kabel, oververhitting | [Onderspanning en throttling](https://docs.uavmatrix.com/nl/troubleshooting/undervoltage-and-throttling/) |
| De drone is **Offline** in Fleet Manager | Drone heeft geen internet, MQTT-poort geblokkeerd, of opnieuw koppelen vereist | [Drone offline in Fleet Manager](https://docs.uavmatrix.com/nl/troubleshooting/drone-offline-fleet-manager/) |
| **Invalid pairing code**, **This pairing code has expired** of **License is not owned by any member of this organization** | Code verkeerd getypt of te oud, of licentie in bezit van iemand buiten de organisatie | [Koppelcode ongeldig of verlopen](https://docs.uavmatrix.com/nl/troubleshooting/pairing-code-invalid/) |

## Nog vast?

1. [Verzamel de logbestanden](https://docs.uavmatrix.com/nl/troubleshooting/collect-logs/). De download bevat een `diagnostics.txt`-momentopname van uw instellingen en hardware, zodat support die niet hoeft op te vragen.
2. Stuur ze naar **[support@uavmatrix.com](mailto:support@uavmatrix.com)** met uw UAVcast-Pro-versie, de hardware die u gebruikt en wat u al heeft geprobeerd. U kunt ook een vraag stellen op de [UAVmatrix Discord](https://discord.gg/xwqMTXh).

Korte antwoorden op veelgestelde vragen staan in de [FAQ](https://docs.uavmatrix.com/nl/troubleshooting/faq/).

Source: https://docs.uavmatrix.com/nl/troubleshooting/
