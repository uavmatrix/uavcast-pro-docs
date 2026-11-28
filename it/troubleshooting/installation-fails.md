# Installazione non riuscita

> Risolvi gli errori dell'installer di UAVcast-Pro come No installation candidate found o failed dependencies: verifica il sistema a 64 bit, la connessione internet, lo spazio su disco e il log dell'installer.

Hai eseguito `curl -fsSL https://install.uavmatrix.com | sudo bash` e si è fermato con un errore, si è bloccato, oppure è terminato senza un'interfaccia web funzionante.

| Cosa vedi | Causa probabile | Inizia da |
| --- | --- | --- |
| No installation candidate for … found! | SO a 32 bit o architettura non supportata | [Controllo 1](https://docs.uavmatrix.com/it/troubleshooting/installation-fails/#check-1) |
| Failed to update package lists, or Failed to install dependencies | Nessuna connessione internet, oppure una configurazione apt danneggiata | [Controllo 2](https://docs.uavmatrix.com/it/troubleshooting/installation-fails/#check-2) |
| Blocca per molto tempo su un Pi Zero 2 W | Memoria insufficiente e archiviazione lenta | [Controllo 3](https://docs.uavmatrix.com/it/troubleshooting/installation-fails/#check-3) |
| Service failed to start | Un componente non è riuscito ad avviarsi dopo l'installazione | [Controllo 4](https://docs.uavmatrix.com/it/troubleshooting/installation-fails/#check-4) |

## Verifica 1: sistema operativo a 64 bit

UAVcast-Pro v6 richiede un SO a 64 bit: arm64 o amd64 (PC x86). Su arm64, le schede diverse da un Raspberry Pi (Jetson e altre schede ARM) richiedono UAVcast-Pro 6.5.3 o successivo; gli installer più vecchi si fermano con *Device is not a Raspberry Pi*.

```bash
dpkg --print-architecture   # must print arm64 or amd64
uname -m                    # aarch64 or x86_64
```

Se vedi `armhf`, `armv7l` o `i686`, sei su un SO a 32 bit. Installa **Raspberry Pi OS (64-bit)** con Raspberry Pi Imager e riesegui l'installazione. I sistemi supportati sono Raspberry Pi OS, Debian e Ubuntu; vedi [Hardware supportato](https://docs.uavmatrix.com/it/reference/supported-hardware/).

## Verifica 2: internet e apt

L'installer scarica UAVcast-Pro e i pacchetti di sistema, e installa ZeroTier e Tailscale.

1. Verifica l'accesso a internet: `curl -I https://install.uavmatrix.com`.
2. Esegui a mano `sudo apt update` e risolvi gli errori che mostra, ad esempio un repository di terze parti con una chiave scaduta.
3. Riesegui l'installer. È sicuro eseguirlo più di una volta.

## Verifica 3: schede a bassa potenza

Su un Raspberry Pi Zero 2 W l'installazione richiede molto più tempo che su un Pi 4 o 5, e l'installer mostra una stima del tempo. Lascialo terminare. Usa una scheda SD veloce e un alimentatore stabile: un reset per sottotensione durante l'installazione lascia un'installazione a metà.

## Verifica 4: leggi il log dell'installer

L'installer scrive tutto in `/opt/uavcast-pro/installer.log`.

```bash
sudo tail -n 100 /opt/uavcast-pro/installer.log
```

Guarda le ultime righe di errore. Se l'installer fallisce prima di poter creare `/opt/uavcast-pro`, il log si trova in `/tmp/uavcast-installer.log`.

## Installa una versione specifica

Per elencare le versioni disponibili per la tua architettura, oppure per installarne una:

```bash
curl -fsSL https://install.uavmatrix.com | bash -s -- -l          # list versions
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2  # install 6.5.2
```

## Ancora non funziona?

Invia `/opt/uavcast-pro/installer.log`, l'output di `cat /etc/os-release` e `dpkg --print-architecture`, e il modello della tua scheda a **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Correlati: [Installa UAVcast-Pro](https://docs.uavmatrix.com/it/get-started/installation/)

Source: https://docs.uavmatrix.com/it/troubleshooting/installation-fails/
