# Een grondstation verbinden

> Sluit een QGroundControl- of Mission Planner-laptop aan op de VPN van uw organisatie met één Tailscale-opdracht en begin met het ontvangen van drone-video en telemetrie.

Een grondstation (GCS) is de laptop of pc waarop een piloot QGroundControl, Mission Planner of een vergelijkbare app gebruikt. Om video en telemetrie van een drone via Fleet Manager te ontvangen, sluit het grondstation aan op de privé-VPN van uw organisatie. Daarna bepaalt u met [streamkoppelingen](https://docs.uavmatrix.com/nl/fleet-manager/network/stream-bindings/) welke drones naar het grondstation streamen.

Dit duurt ongeveer vijf minuten per grondstation.

## Voordat u begint

- **Rol Owner of Admin.** Viewers kunnen de pagina **Network** zien, maar niet de authenticatiesleutel of het verbindingscommando, en ze kunnen de VPN niet inschakelen of apparaten configureren. Zij zien de melding *Ask an Owner or Admin of this organization to connect a new device to the VPN.*
- **VPN ingeschakeld** voor de organisatie. Als **Network** **Enable VPN Network** toont, selecteert u dat eerst. Zie [Netwerk en VPN](https://docs.uavmatrix.com/nl/fleet-manager/network/).
- **Beheerdersrechten op de computer van het grondstation**, om Tailscale te installeren en één opdracht uit te voeren.
- Ten minste één drone die [is gekoppeld](https://docs.uavmatrix.com/nl/fleet-manager/pair-uav/) en aan de VPN is toegevoegd.

> **Fleet Manager draait zijn eigen VPN-server**
>
> Het netwerk van de organisatie gebruikt de Tailscale-client, maar de eigen controleserver van Fleet Manager, niet een tailscale.com-account. U hoeft zich niet aan te melden bij Tailscale. Als de computer al op een ander Tailscale-netwerk zit, verplaatst de onderstaande opdracht hem naar het netwerk van uw organisatie.

## Het grondstation aan de VPN toevoegen

1. **Installeer Tailscale** op het grondstation via [tailscale.com/download](https://tailscale.com/download) (Windows, macOS of Linux).

2. **Kopieer het verbindingscommando.** Open in Fleet Manager **Network**, blijf op het tabblad **Devices** en zoek **Connect a Device**. Kopieer onder **GCS Connection Command** het commando. Het ziet er zo uit:

   ```bash
   tailscale up --authkey=<your-org-key> --login-server=https://vpn-connect.uavmatrix.com
   ```

   ![Kaart Connect a Device met de waarschuwing GCS Computer Only en het tailscale up-commando](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/network--connect-device.webp)

   *Network → Devices → Connect a Device, met de waarschuwing GCS Computer Only en de kopieerknop naast het commando (authenticatiesleutel onscherp).*

   > **Alleen voor het grondstation**
   >
   > Plak dit commando niet in UAVcast-Pro en voer het niet uit op de drone. Drones sluiten zich bij het koppelen of met **Push to Drone** op dezelfde pagina bij de VPN aan.

3. **Voer het commando uit als beheerder.**

   - Windows: open **Terminal** of **PowerShell** met **Run as administrator** en plak het commando.
   - macOS en Linux: plak het in een terminal, vooraf gegaan door `sudo`.

   Wanneer het commando zonder fout eindigt, is de computer op het netwerk aangesloten. `tailscale status` toont de drones en andere apparaten die het kan zien.

4. **Zoek de computer in Connected Devices.** Terug in Fleet Manager verschijnt de computer onder **Connected Devices** met zijn hostnaam en een `100.x.y.z`-adres. Selecteer **Sync** als hij na enkele seconden niet verschijnt. Een nieuw apparaat heeft het type **Unknown**, en een banner geeft aan hoeveel apparaten configuratie nodig hebben.

5. **Markeer het als grondstation.** Selecteer in de kolom **Type** de optie **Configure**. Kies **Ground Control Station (GCS)**, selecteer **Continue** en vervolgens **Complete Setup**.

   ![Wizard voor apparaatconfiguratie met de vraag What type of device is this, met Ground Control Station geselecteerd](https://docs.uavmatrix.com/nl/img/screenshots/fleet-manager/network--setup-wizard.webp)

   *Dialoogvenster Configure: What type of device is this? met Ground Control Station (GCS) geselecteerd voor een laptop met de naam ops-laptop-03.*

De computer heeft nu de badge **GCS** en verschijnt in de lijst **Ground Station** wanneer u een streamkoppeling toevoegt.

> **Geef grondstations een naam naar de persoon of functie**
>
> Gebruik **Rename** in het actiemenu van het apparaat (de knop **⋯**) om het een naam te geven, zoals "Field laptop – Team North". Koppellijsten zijn in een grote vloot veel makkelijker te lezen.

## Een drone gaan ontvangen

1. Ga naar **Network → Stream Bindings** en selecteer **Add Binding**.

2. Kies de **Drone** en het **Ground Station** en selecteer vervolgens **Create Binding**. De drone moet online zijn.

3. Lees de poorten af in de kolom **Ports**, bijvoorbeeld `5600 / 14550`.

4. Laat uw grondcontrolesoftware luisteren op die poorten:

   - **QGroundControl:** telemetrie op UDP 14550 wordt automatisch verbonden. Voor video opent u **Application Settings → Video** (onder **General** in oudere versies), stelt u **Source** in op **UDP h.264 Video Stream** en stelt u de UDP-poort in op de videopoort van de koppeling (**UDP URL** `0.0.0.0:<port>` in huidige versies). Voor extra drones voegt u onder **Application Settings → Comm Links** een UDP-link toe op de telemetriepoort van elke koppeling.
   - **Mission Planner:** kies **UDP** in de keuzelijst voor de verbinding, selecteer **Connect** en voer de telemetriepoort in.

Meer details, inclusief meerdere drones op één grondstation: [Streamkoppelingen](https://docs.uavmatrix.com/nl/fleet-manager/network/stream-bindings/) en [Streamen naar meerdere grondstations](https://docs.uavmatrix.com/nl/guides/multiple-ground-stations/).

## De authenticatiesleutel

Het commando bevat een herbruikbare sleutel voor het netwerk van uw organisatie. Die is 90 dagen geldig en kan op een willekeurig aantal grondstations worden gebruikt. Owners en Admins kunnen de vernieuwknop selecteren in **Connect a Device** om een nieuwe sleutel te maken. Grondstations die al zijn verbonden, blijven verbonden. Als de kaart **No valid auth key available. Generate a new key to connect devices.** toont, is de sleutel verlopen. Maak dan een nieuwe aan.

## Een grondstation verwijderen

Open op **Network → Devices** het actiemenu van het apparaat en selecteer **Remove Device**. Dit verwijdert het uit de VPN en verwijdert de streamkoppelingen. Om het later opnieuw te verbinden, voert u het verbindingscommando opnieuw uit.

## Probleemoplossing

- **Commando mislukt of time-out:** controleer of de computer `https://vpn-connect.uavmatrix.com` kan bereiken en of de sleutel niet is verlopen.
- **Grondstation verbonden, maar geen telemetrie of video:** controleer of er een koppeling is, of **Video** en **Telemetry** zijn ingeschakeld en of de software van het grondstation luistert op de poorten van de koppeling. De Windows-firewall blokkeert vaak inkomend UDP voor een nieuwe app. Zie [Geen telemetrie in het grondstation](https://docs.uavmatrix.com/nl/troubleshooting/no-telemetry-in-gcs/) en [Geen video in het grondstation](https://docs.uavmatrix.com/nl/troubleshooting/no-video-in-gcs/).
- **Kan de drone niet bereiken via VPN:** zie [VPN verbonden, maar de drone is niet bereikbaar](https://docs.uavmatrix.com/nl/troubleshooting/vpn-cant-reach-drone/).

Source: https://docs.uavmatrix.com/nl/fleet-manager/connect-gcs/
