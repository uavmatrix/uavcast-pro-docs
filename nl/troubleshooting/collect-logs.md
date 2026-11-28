# Logboeken verzamelen voor support

> Download het UAVcast-Pro-logarchief met diagnostics.txt via Applicatie, Logboekregistratie of via SSH, en stuur het met de juiste gegevens naar UAVmatrix-support.

Eén logdownload beantwoordt de meeste vragen die support anders zou stellen. Elk archief bevat de servicelogboeken die u kiest, plus een `diagnostics.txt`-momentopname: versie, besturingssysteem en board, instellingen, de gegenereerde telemetrie-routerconfiguratie, seriële apparaten en wie ze gebruikt, en voeding- en USB-gebeurtenissen uit de kernel. Wachtwoorden, sleutels en tokens worden nooit opgenomen.

## Downloaden via de webinterface

1. Ga naar **Applicatie** en scrol naar **Logboekregistratie**.
2. Laat in de eerste lijst **Alle Logboeken** staan, of kies de service die bij het probleem past (zie de tabel).
3. Kies in de tweede lijst een tijdsperiode die het probleem omvat. De standaard is **Laatste 2 uur**.
4. Druk op **Download**. Uw browser slaat een `.zip`-bestand op.

![Pagina Applicatie, kaart Logboekregistratie met de logslijst op Alle Logboeken, de tijdsperiode op Laatste 2 uur en de knop Download](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/application--logging.webp)

*Applicatie → Logboekregistratie met Alle Logboeken en Laatste 2 uur geselecteerd.*

| Probleem | Kies in de logslijst |
| --- | --- |
| Vluchtcontrollerverbinding, geen heartbeat, geen telemetrie | **Mavlink Beheer** |
| Camera, video, voorvertoning | **Camera Server** |
| Modem, mobiel netwerk | **Modem Beheer** |
| ZeroTier, Tailscale | **VPN Beheer** |
| RTK, NTRIP | **NTRIP-client** |
| Licentie | **Licentie Beheer** |
| Dynamische DNS | **DNS Beheer** |
| Installatie | **Applicatie Installatie** |
| Niet zeker | **Alle Logboeken** |

Alleen beheerders kunnen logboeken downloaden. **Alle Logboeken Opschonen** verwijdert elk logbestand en kan niet ongedaan worden gemaakt, dus download eerst.

## Via de opdrachtregel

Als de webinterface niet opent, verzamel de logboeken dan via SSH:

```bash
sudo tar czf ~/uavcast-logs.tar.gz /opt/uavcast-pro/logs /opt/uavcast-pro/installer.log
journalctl -u uavcast-web -u uavcast-factory -u mavlink-manager -u uavcast-camera --since "2 hours ago" > ~/uavcast-journal.txt
```

Kopieer beide bestanden naar uw computer, bijvoorbeeld met `scp`.

## Stuur ze naar support

Stuur een e-mail naar **[support@uavmatrix.com](mailto:support@uavmatrix.com)** en voeg toe:

- het logarchief,
- uw UAVcast-Pro-versie (onderaan de zijbalk),
- het board, het besturingssysteem, de vluchtcontroller, camera en modem die u gebruikt,
- wat u verwachtte, wat er gebeurde, en wat u al heeft geprobeerd op basis van deze pagina's.

U kunt ook een vraag stellen op de [UAVmatrix Discord](https://discord.gg/xwqMTXh). Plaats logbestanden niet openbaar: ze bevatten IP-adressen en apparaatnamen.

Gerelateerd: [Applicatie-instellingen](https://docs.uavmatrix.com/nl/uavcast-pro/application-settings/)

Source: https://docs.uavmatrix.com/nl/troubleshooting/collect-logs/
