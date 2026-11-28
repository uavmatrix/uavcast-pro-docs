# Installatie mislukt

> Los fouten van het UAVcast-Pro-installatieprogramma op, zoals No installation candidate found of failed dependencies: controleer het 64-bits besturingssysteem, internet, schijfruimte en het installatielogboek.

U heeft `curl -fsSL https://install.uavmatrix.com | sudo bash` uitgevoerd, en het stopte met een fout, bleef hangen, of eindigde zonder werkende webinterface.

| Wat u ziet | Waarschijnlijke oorzaak | Begin bij |
| --- | --- | --- |
| No installation candidate for … found! | 32-bits besturingssysteem of een niet-ondersteunde architectuur | [Controle 1](https://docs.uavmatrix.com/nl/troubleshooting/installation-fails/#check-1) |
| Failed to update package lists, of Failed to install dependencies | Geen internet, of een defecte apt-configuratie | [Controle 2](https://docs.uavmatrix.com/nl/troubleshooting/installation-fails/#check-2) |
| Hangt lang op een Pi Zero 2 W | Weinig geheugen en trage opslag | [Controle 3](https://docs.uavmatrix.com/nl/troubleshooting/installation-fails/#check-3) |
| Service failed to start | Een onderdeel kon na de installatie niet starten | [Controle 4](https://docs.uavmatrix.com/nl/troubleshooting/installation-fails/#check-4) |

## Controle 1: 64-bits besturingssysteem

UAVcast-Pro v6 heeft een 64-bits besturingssysteem nodig: arm64 of amd64 (x86-pc's). Op arm64 hebben boards die geen Raspberry Pi zijn (Jetson en andere ARM-boards) UAVcast-Pro 6.5.3 of later nodig; oudere installatieprogramma's stoppen met *Device is not a Raspberry Pi*.

```bash
dpkg --print-architecture   # must print arm64 or amd64
uname -m                    # aarch64 or x86_64
```

Als u `armhf`, `armv7l` of `i686` ziet, draait u op een 32-bits besturingssysteem. Flash **Raspberry Pi OS (64-bit)** met Raspberry Pi Imager en installeer opnieuw. Ondersteunde systemen zijn Raspberry Pi OS, Debian en Ubuntu; zie [Ondersteunde hardware](https://docs.uavmatrix.com/nl/reference/supported-hardware/).

## Controle 2: Internet en apt

Het installatieprogramma downloadt UAVcast-Pro en systeempakketten, en installeert ZeroTier en Tailscale.

1. Controleer de internettoegang: `curl -I https://install.uavmatrix.com`.
2. Voer `sudo apt update` handmatig uit en los de fouten op die het toont, bijvoorbeeld een externe repository met een verlopen sleutel.
3. Voer het installatieprogramma opnieuw uit. Dat is veilig om meer dan één keer te doen.

## Controle 3: Boards met weinig vermogen

Op een Raspberry Pi Zero 2 W duurt de installatie veel langer dan op een Pi 4 of 5, en het installatieprogramma toont een tijdschatting. Laat het afronden. Gebruik een snelle SD-kaart en een stabiele voeding: een onderspanningsreset tijdens de installatie laat een halfvoltooide installatie achter.

## Controle 4: Lees het installatielogboek

Het installatieprogramma schrijft alles naar `/opt/uavcast-pro/installer.log`.

```bash
sudo tail -n 100 /opt/uavcast-pro/installer.log
```

Kijk naar de laatste foutregels. Als het installatieprogramma faalt voordat het `/opt/uavcast-pro` kan aanmaken, staat het logboek in `/tmp/uavcast-installer.log`.

## Installeer een specifieke versie

Om de beschikbare versies voor uw architectuur weer te geven, of om er een te installeren:

```bash
curl -fsSL https://install.uavmatrix.com | bash -s -- -l          # list versions
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2  # install 6.5.2
```

## Nog steeds mislukt?

Stuur `/opt/uavcast-pro/installer.log`, de uitvoer van `cat /etc/os-release` en `dpkg --print-architecture`, en uw boardmodel naar **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Gerelateerd: [UAVcast-Pro installeren](https://docs.uavmatrix.com/nl/get-started/installation/)

Source: https://docs.uavmatrix.com/nl/troubleshooting/installation-fails/
