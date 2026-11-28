# Webinterface opent niet

> UAVcast-Pro niet te openen op http://device-ip na de installatie? Zoek het juiste adres en controleer de uavcast-web-service, de serverpoort en poort 80.

Het installatieprogramma is klaar, maar `http://<device-ip>/` loopt in een time-out, weigert de verbinding of toont de pagina van een ander programma.

| Wat u ziet | Waarschijnlijke oorzaak | Begin bij |
| --- | --- | --- |
| Time-out, of de pagina laadt nooit | Verkeerd adres, of uw computer zit op een ander netwerk | [Controle 1](https://docs.uavmatrix.com/nl/troubleshooting/web-interface-wont-open/#check-1) |
| Connection refused | De webservice draait niet | [Controle 2](https://docs.uavmatrix.com/nl/troubleshooting/web-interface-wont-open/#check-2) |
| Een andere webpagina, bijvoorbeeld van nginx of Apache | Iets anders gebruikt poort 80 | [Controle 3](https://docs.uavmatrix.com/nl/troubleshooting/web-interface-wont-open/#check-3) |
| Werkte eerder, gestopt na een wijziging van de instellingen | De serverpoort is gewijzigd | [Controle 4](https://docs.uavmatrix.com/nl/troubleshooting/web-interface-wont-open/#check-4) |
| Laadt, maar elke pagina springt naar Applicatie | Er is nog geen actieve licentie | [Controle 5](https://docs.uavmatrix.com/nl/troubleshooting/web-interface-wont-open/#check-5) |

## Controle 1: Gebruik het juiste adres

De webinterface draait standaard op **poort 80**, dus het adres is gewoon `http://<device-ip>/`.

1. Zoek het IP-adres van het apparaat. Het installatieprogramma toont het aan het einde. Op het apparaat kunt u ook `hostname -I` uitvoeren.
2. Op een Raspberry Pi met de standaard hostnaam probeert u `http://raspberrypi.local/`.
3. Gebruik `http://`, niet `https://`. De webinterface gebruikt geen HTTPS.
4. Zorg dat uw computer op hetzelfde netwerk zit als het apparaat, of op dezelfde VPN. Via 4G moet u het VPN-adres van de drone gebruiken.

## Controle 2: Draait de webservice?

Voer op het apparaat dit uit:

```bash
sudo systemctl status uavcast-web
```

Er moet **active (running)** staan. Zo niet, start hem dan en lees waarom hij is gestopt:

```bash
sudo systemctl restart uavcast-web
journalctl -u uavcast-web --since "1 hour ago"
```

De webinterface heeft ook de achtergrondservices nodig. Controleer die op dezelfde manier: `uavcast-factory`, `mavlink-manager`, `uavcast-camera` en `redis-server`. De volledige lijst staat in [Services en bestanden](https://docs.uavmatrix.com/nl/reference/services-and-files/).

## Controle 3: Poort 80 is al in gebruik

Als er een andere webserver op het apparaat is geïnstalleerd, kan die poort 80 bezet houden. Zoek uit wie er luistert:

```bash
sudo ss -ltnp | grep ':80 '
```

Stop en schakel de andere server uit (bijvoorbeeld `sudo systemctl disable --now nginx`), en herstart daarna `uavcast-web`.

## Controle 4: De serverpoort is gewijzigd

**Applicatie → Instellingen → Serverpoort** verplaatst de webinterface naar een andere poort, en het adres wordt `http://<device-ip>:<port>/`. Weet u de poort niet meer, lees hem dan op het apparaat:

```bash
grep SERVER_PORT /etc/systemd/system/uavcast-web.service
```

## Controle 5: Elke pagina gaat naar Applicatie

Dat is normaal totdat er op het apparaat een licentie actief is. Activeer die onder **Applicatie → Licentie Beheer**. Lukt dat niet, zie [Licentie activeert niet](https://docs.uavmatrix.com/nl/troubleshooting/license-activation-failed/).

## Controle 6: Het installatieprogramma is niet voltooid

Als `uavcast-web` niet bestaat (`Unit uavcast-web.service could not be found`), is de installatie vroegtijdig gestopt. Zie [Installatie mislukt](https://docs.uavmatrix.com/nl/troubleshooting/installation-fails/).

## Nog steeds geen resultaat?

Stuur de uitvoer van `systemctl status uavcast-web` en `journalctl -u uavcast-web --since yesterday`, plus `/opt/uavcast-pro/installer.log`, naar **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Gerelateerd: [UAVcast-Pro installeren](https://docs.uavmatrix.com/nl/get-started/installation/) · [Applicatie-instellingen](https://docs.uavmatrix.com/nl/uavcast-pro/application-settings/)

Source: https://docs.uavmatrix.com/nl/troubleshooting/web-interface-wont-open/
