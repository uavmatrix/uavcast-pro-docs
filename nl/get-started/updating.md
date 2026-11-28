# UAVcast-Pro bijwerken

> Werk UAVcast-Pro bij via de webinterface of de opdrachtregel, installeer een oudere versie en lees wat er met uw instellingen, serverpoort en opnames gebeurt.

Werk UAVcast-Pro bij via **Applicatie → Applicatie Bijwerken** in de webinterface, of door de installer opnieuw uit te voeren via SSH. Beide behouden uw instellingen, gebruikers, licentie en opnames. De drone heeft internettoegang nodig en u moet opnieuw opstarten zodra de update klaar is.

> **Werk nooit bij vlak voor een vlucht**
>
> Een update stopt alle UAVcast-Pro-services, inclusief telemetrie en video, en vereist een herstart. Werk bij op de grond, met de motoren ontwapend.

## Bijwerken via de webinterface

1. Ga naar **Applicatie**. De kaart **Applicatie Bijwerken** toont de **Huidige Versie** en de **Nieuwste Versie**. Een groene banner *New version … available* verschijnt wanneer er een nieuwere release is.
2. Laat **Selecteer versie om bij te werken** op de nieuwste versie staan, of kies een andere versie.
3. Selecteer **Nu Bijwerken** (of **Update to …**). **Voortgang** toont de stappen voor download en installatie. Dit duurt enkele minuten, langer op een Pi Zero 2 W of Pi 3.
4. Wanneer de banner **Herstart Vereist** verschijnt, selecteer dan **Nu herstarten**. Het apparaat start opnieuw op.
5. Open de webinterface opnieuw en controleer de **Huidige Versie**.

![Kaart Applicatie Bijwerken met de huidige en nieuwste versie, een banner Nieuwe versie beschikbaar en de knop Bijwerken](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/application--update-available.webp)

*Applicatie → Applicatie Bijwerken met een nieuwere versie beschikbaar.*

## Bijwerken via de opdrachtregel

Voer de installer opnieuw uit. Die vervangt de programmabestanden en behoudt de database:

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
sudo reboot
```

Om een bepaalde versie te installeren, lijst u eerst de versies (geen root nodig) en installeert u daarna er een met `-b`:

```bash
# List the versions available for this device
curl -fsSL https://install.uavmatrix.com | bash -s -- -l

# Install a specific version
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.1
```

## Teruggaan naar een oudere versie

Kies de oudere versie in **Selecteer versie om bij te werken** en werk bij zoals gewoonlijk, of gebruik `-b` op de opdrachtregel. Instellingen die in een nieuwere versie zijn gemaakt, bestaan mogelijk niet in de oudere versie.

## Wat een update behoudt en vervangt

| Behouden | Vervangen |
| --- | --- |
| Instellingendatabase (`/opt/uavcast-pro/uavcast.db`): grondstations, camera, modem, VPN, gebruikers, licentie | Programmabestanden in `/opt/uavcast-pro` (`build`, `dist`, `factory`, `install`) |
| Opnames en telemetrielogboeken | systemd-servicebestanden |
| ZeroTier- en Tailscale-lidmaatschap | Systeempakketten waarvan UAVcast-Pro afhankelijk is (bijgewerkt door apt) |

Vanaf UAVcast-Pro 6.5.3 blijft een aangepaste **Serverpoort** die op de pagina Applicatie is ingesteld behouden wanneer u bijwerkt. Eerdere versies zetten hem terug op 80: open na een update vanaf zo'n versie de webinterface op poort 80 en sla uw poort opnieuw op.

## Wijzigingen bekijken

Elke release staat met de wijzigingen vermeld in de [changelog](https://docs.uavmatrix.com/nl/reference/changelog/). Lees deze voordat u een drone bijwerkt die operationeel vliegt.

Source: https://docs.uavmatrix.com/nl/get-started/updating/
