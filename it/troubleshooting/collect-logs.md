# Raccogli i log per il supporto

> Scarica l'archivio dei log di UAVcast-Pro con diagnostics.txt da Applicazione, Registrazione Log o via SSH, e invialo al supporto UAVmatrix con i dettagli giusti.

Un solo download di log risponde alla maggior parte delle domande che il supporto altrimenti dovrebbe porre. Ogni archivio include i log dei servizi che scegli, più uno snapshot `diagnostics.txt`: versione, sistema operativo e scheda, impostazioni, la configurazione generata del router di telemetria, i dispositivi seriali e chi li sta usando, e gli eventi di alimentazione e USB dal kernel. Password, chiavi e token non vengono mai inclusi.

## Scarica dall'interfaccia web

1. Vai su **Applicazione** e scorri fino a **Registrazione Log**.
2. Nella prima lista, lascia **Tutti i Log**, oppure scegli il servizio che corrisponde al problema (vedi la tabella).
3. Nella seconda lista, scegli un intervallo di tempo che copra il problema. Il valore predefinito è **Ultime 2 ore**.
4. Premi **Scarica**. Il browser salva un file `.zip`.

![Scheda Registrazione Log della pagina Applicazione, con la lista dei log su Tutti i Log, l'intervallo su Ultime 2 ore e il pulsante Scarica](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/application--logging.webp)

*Applicazione → Registrazione Log con Tutti i Log e Ultime 2 ore selezionati.*

| Problema | Scegli nell'elenco dei log |
| --- | --- |
| Collegamento al controllore di volo, nessun heartbeat, nessuna telemetria | **Mavlink Manager** |
| Telecamera, video, anteprima | **Camera Server** |
| Modem, cellulare | **Modem Manager** |
| ZeroTier, Tailscale | **VPN Manager** |
| RTK, NTRIP | **NTRIP Client** |
| Licenza | **Gestore Licenze** |
| DNS Dinamico | **DNS Manager** |
| Installazione | **Application Installer** |
| Non sei sicuro | **Tutti i Log** |

Solo gli admin possono scaricare i log. **Elimina Tutti i Log** cancella ogni file di log e non può essere annullato, quindi scarica prima i log.

## Dalla riga di comando

Se l'interfaccia web non si apre, raccogli i log via SSH:

```bash
sudo tar czf ~/uavcast-logs.tar.gz /opt/uavcast-pro/logs /opt/uavcast-pro/installer.log
journalctl -u uavcast-web -u uavcast-factory -u mavlink-manager -u uavcast-camera --since "2 hours ago" > ~/uavcast-journal.txt
```

Copia entrambi i file sul tuo computer, ad esempio con `scp`.

## Invia al supporto

Scrivi un'e-mail a **[support@uavmatrix.com](mailto:support@uavmatrix.com)** e includi:

- l'archivio dei log,
- la tua versione di UAVcast-Pro (visibile in fondo alla barra laterale),
- la scheda, il sistema operativo, il controllore di volo, la telecamera e il modem che usi,
- cosa ti aspettavi, cosa è successo e cosa hai già provato seguendo queste pagine.

Puoi anche chiedere sul [Discord di UAVmatrix](https://discord.gg/xwqMTXh). Non pubblicare i file di log in pubblico: contengono indirizzi IP e nomi dei dispositivi.

Correlati: [Impostazioni applicazione](https://docs.uavmatrix.com/it/uavcast-pro/application-settings/)

Source: https://docs.uavmatrix.com/it/troubleshooting/collect-logs/
