# VPN verbonden, maar de drone is niet bereikbaar

> Fleet Manager VPN, Tailscale of ZeroTier zegt verbonden, maar u kunt de drone niet pingen? Controleer de autorisatie, het netwerk of tailnet, het internet en het IP van het grondstation.

Zowel de drone als uw laptop melden dat ze op de VPN zitten, maar `ping` naar het VPN-adres van de drone loopt in een time-out, de webinterface opent niet via de VPN, of telemetrie en video komen niet aan.

| Wat u ziet | Waarschijnlijke oorzaak | Begin bij |
| --- | --- | --- |
| ZeroTier-netwerk toont TOEGANG_GEWEIGERD, of geen IP-adres | De drone is niet geautoriseerd op het netwerk | [Controle 1](https://docs.uavmatrix.com/nl/troubleshooting/vpn-cant-reach-drone/#check-1) |
| Drone is in orde, de laptop krijgt geen of een verkeerd adres | De laptop is aangesloten op een ander netwerk of tailnet | [Controle 2](https://docs.uavmatrix.com/nl/troubleshooting/vpn-cant-reach-drone/#check-2) |
| Tailscale werkte weken, daarna niet meer | De apparaatsleutel is verlopen | [Controle 3](https://docs.uavmatrix.com/nl/troubleshooting/vpn-cant-reach-drone/#check-3) |
| VPN op de drone verbindt nooit op locatie | De drone heeft geen internet via het modem | [Controle 4](https://docs.uavmatrix.com/nl/troubleshooting/vpn-cant-reach-drone/#check-4) |
| Ping werkt, maar geen telemetrie of video | De bestemming van het grondstation gebruikt het verkeerde IP | [Controle 5](https://docs.uavmatrix.com/nl/troubleshooting/vpn-cant-reach-drone/#check-5) |

## Controle 1: Autoriseer de drone op het netwerk

**ZeroTier:**

1. Open in UAVcast-Pro **Virtueel Privénetwerk**. Controleer dat **VPN Inschakelen** op **Ja** staat, dat **Diensten** op **ZeroTier** staat, en dat het **Netwerk ID** dat van uw ZeroTier-controller is.
2. Bekijk uw netwerk onder **Verbonden Netwerken**. Als het statuslabel **TOEGANG_GEWEIGERD** toont, is de drone wel toegetreden maar niet geautoriseerd.
3. Open in uw ZeroTier-controller het netwerk en autoriseer het lid met het node-ID van de drone.
4. Ga terug naar UAVcast-Pro en wacht tot het netwerk status `OK` en een IP-adres toont. Dat is het adres dat u vanaf de laptop gebruikt.

Op een privé-ZeroTier-netwerk moet elk apparaat dat toetreedt (drone, laptop, tablet) één keer in de controller worden geautoriseerd voordat het een adres krijgt. (UAVnet-netwerken zijn ook privé; UAVnet wordt uitgefaseerd, dus schakel over naar de Fleet Manager VPN.)

**Tailscale:** de drone toont **Verbonden** met een **IPv4 Adres** (100.x.y.z) wanneer hij erin zit. Toont hij **Niet Verbonden**, gebruik dan **Web Login → Login-URL genereren**, of het tabblad **Authenticatiesleutel** met een sleutel uit uw Tailscale-beheerconsole.

## Controle 2: Zet de laptop op hetzelfde netwerk

Beide kanten moeten op hetzelfde ZeroTier-netwerk of hetzelfde tailnet zitten.

- **ZeroTier**: sluit de laptop aan op hetzelfde Network ID en autoriseer ook de laptop in uw controller. Op Windows controleert u het ZeroTier-pictogram in de systeemvak; op Linux voert u `sudo zerotier-cli listnetworks` uit. De status moet `OK` zijn.
- **Tailscale**: een Tailscale-client zit op één tailnet tegelijk. Voer op de laptop `tailscale status` uit. De drone moet in de lijst staan. Zo niet, dan is de laptop aangemeld bij een ander account of tailnet.
- **Fleet Manager VPN**: als de drone met Fleet Manager en VPN is gekoppeld, zit hij op het netwerk van uw organisatie, niet op uw persoonlijke Tailscale. Verbind de laptop met het commando dat Fleet Manager onder **Network** geeft (`tailscale up --login-server=… --authkey=…`) en voer dat **uit op de laptop, nooit op de drone**. Zie [Grondstation verbinden](https://docs.uavmatrix.com/nl/fleet-manager/connect-gcs/).

> **Koppelen kan de VPN van de drone vervangen**
>
> Wanneer u een drone in Fleet Manager koppelt met **Replace existing VPN with Fleet Manager network**, verlaat de drone zijn huidige Tailscale-netwerk en sluit hij zich aan op het netwerk van de organisatie. Laptops op het oude tailnet kunnen hem dan niet meer bereiken.

## Controle 3: Verlopen Tailscale-sleutel

Tailscale-apparaatsleutels verlopen. Wanneer de sleutel van de drone verloopt, valt hij uit het tailnet tot hij opnieuw inlogt. Het veld **Verloopt** op de pagina **Virtueel Privénetwerk** toont de datum. In de Tailscale-beheerconsole kunt u de sleutelvervaldatum voor de drone uitschakelen, zodat hij niet midden in een project wegvalt.

## Controle 4: De drone heeft eerst internet nodig

De VPN loopt via de eigen internetverbinding van de drone. Heeft het modem geen internet, dan toont de VPN als niet verbonden of krijgt hij nooit een adres. Los eerst de verbinding op: [Modem verbonden, geen internet](https://docs.uavmatrix.com/nl/troubleshooting/modem-no-internet/).

## Controle 5: Bereikbaar, maar geen data

Als `ping <drone-vpn-ip>` werkt:

- **Webinterface**: open `http://<drone-vpn-ip>/`. De live voorvertoning heeft ook poort 8889 nodig, die via de VPN bereikbaar moet zijn.
- **Telemetrie en video**: deze worden *vanaf* de drone *naar* het adres in **Grondcontrolestations → Bestemmings-IP of Host** gestuurd. Dat moet het VPN-adres van de laptop zijn, niet dat van de drone en niet het Wi-Fi-adres van de laptop. Zie dan [Geen telemetrie](https://docs.uavmatrix.com/nl/troubleshooting/no-telemetry-in-gcs/) of [Geen video](https://docs.uavmatrix.com/nl/troubleshooting/no-video-in-gcs/).
- **Traag, maar werkend**: Tailscale toont de **Relay** die in gebruik is. Een relayverbinding werkt, maar voegt vertraging toe. Sommige mobiele netwerken staan geen directe verbindingen toe, dus een relay is misschien het beste wat die provider biedt.

## Nog onbereikbaar?

[Download de logboeken](https://docs.uavmatrix.com/nl/troubleshooting/collect-logs/) met **VPN Beheer** geselecteerd en stuur ze naar **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, samen met de uitvoer van `zerotier-cli listnetworks` of `tailscale status` van zowel de drone als de laptop.

Gerelateerd: [VPN-instellingen](https://docs.uavmatrix.com/nl/uavcast-pro/connectivity/vpn/) · [Fleet Manager-netwerk](https://docs.uavmatrix.com/nl/fleet-manager/network/)

Source: https://docs.uavmatrix.com/nl/troubleshooting/vpn-cant-reach-drone/
