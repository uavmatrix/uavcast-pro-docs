# Aggiorna UAVcast-Pro

> Aggiorna UAVcast-Pro dall'interfaccia web o dalla riga di comando, installa una versione precedente e scopri cosa succede alle impostazioni, alla porta del server e alle registrazioni.

Aggiorna UAVcast-Pro da **Applicazione → Aggiorna Applicazione** nell'interfaccia web, oppure eseguendo di nuovo l'installer via SSH. Entrambi i metodi mantengono impostazioni, utenti, licenza e registrazioni. Il drone deve avere accesso a internet e devi riavviarlo al termine dell'aggiornamento.

> **Non aggiornare mai prima di un volo**
>
> Un aggiornamento arresta tutti i servizi di UAVcast-Pro, compresi telemetria e video, e richiede un riavvio. Aggiorna a terra, con l'aeromobile disarmato.

## Aggiorna dall'interfaccia web

1. Vai su **Applicazione**. La scheda **Aggiorna Applicazione** mostra **Versione Attuale** e **Ultima Versione**. Quando è disponibile una release più recente compare un banner verde *New version … available*.
2. Lascia **Seleziona versione da aggiornare** sull'ultima versione, oppure scegline un'altra.
3. Seleziona **Aggiorna alla versione …** (oppure **Aggiorna Ora**). **Avanzamento** mostra i passaggi di download e installazione. L'operazione richiede alcuni minuti, di più su un Pi Zero 2 W o un Pi 3.
4. Quando compare il banner **Riavvio in Sospeso**, seleziona **Riavvia Ora**. Il dispositivo si riavvia.
5. Apri di nuovo l'interfaccia web e controlla **Versione Attuale**.

![Scheda Aggiorna Applicazione con versione attuale e ultima versione, un banner New version available e il pulsante di aggiornamento](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/application--update-available.webp)

*Applicazione → Aggiorna Applicazione con una versione più recente disponibile.*

## Aggiorna dalla riga di comando

Esegui di nuovo l'installer. Sostituisce i file del programma e mantiene il database:

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
sudo reboot
```

Per installare una versione specifica, elenca prima le versioni disponibili (non serve root), poi installane una con `-b`:

```bash
# List the versions available for this device
curl -fsSL https://install.uavmatrix.com | bash -s -- -l

# Install a specific version
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.1
```

## Tornare a una versione precedente

Scegli la versione precedente in **Seleziona versione da aggiornare** e aggiorna come al solito, oppure usa `-b` dalla riga di comando. Le impostazioni create in una versione più recente potrebbero non esistere in quella precedente.

## Cosa mantiene e cosa sostituisce un aggiornamento

| Mantenuto | Sostituito |
| --- | --- |
| Database delle impostazioni (`/opt/uavcast-pro/uavcast.db`): stazioni di terra, telecamera, modem, VPN, utenti, licenza | File del programma in `/opt/uavcast-pro` (`build`, `dist`, `factory`, `install`) |
| Registrazioni e log di telemetria | File dei servizi systemd |
| Appartenenza a ZeroTier e Tailscale | Pacchetti di sistema da cui dipende UAVcast-Pro (aggiornati da apt) |

A partire da UAVcast-Pro 6.5.3, una **Porta Server** personalizzata impostata nella pagina Applicazione viene mantenuta quando aggiorni. Le versioni precedenti la reimpostano a 80: dopo l'aggiornamento da una di esse, apri l'interfaccia web sulla porta 80 e salva di nuovo la tua porta.

## Vedi cosa è cambiato

Ogni release è elencata con le sue modifiche nel [changelog](https://docs.uavmatrix.com/it/reference/changelog/). Leggilo prima di aggiornare un drone impiegato in operazioni di volo.

Source: https://docs.uavmatrix.com/it/get-started/updating/
