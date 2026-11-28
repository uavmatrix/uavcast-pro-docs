# Instalacja się nie udaje

> Napraw błędy instalatora UAVcast-Pro, takie jak No installation candidate found lub failed dependencies: sprawdź 64-bitowy system, internet, miejsce na dysku i log instalatora.

Uruchomiono `curl -fsSL https://install.uavmatrix.com | sudo bash`, a instalator zatrzymał się z błędem, zawiesił albo zakończył pracę bez działającego interfejsu webowego.

| Co widzisz | Prawdopodobna przyczyna | Zacznij od |
| --- | --- | --- |
| No installation candidate for … found! | System 32-bitowy lub nieobsługiwana architektura | [Sprawdzenie 1](https://docs.uavmatrix.com/pl/troubleshooting/installation-fails/#check-1) |
| Failed to update package lists lub Failed to install dependencies | Brak internetu albo uszkodzona konfiguracja apt | [Sprawdzenie 2](https://docs.uavmatrix.com/pl/troubleshooting/installation-fails/#check-2) |
| Długo się zawiesza na Pi Zero 2 W | Mało pamięci i wolna pamięć masowa | [Sprawdzenie 3](https://docs.uavmatrix.com/pl/troubleshooting/installation-fails/#check-3) |
| Service failed to start | Jeden z komponentów nie uruchomił się po instalacji | [Sprawdzenie 4](https://docs.uavmatrix.com/pl/troubleshooting/installation-fails/#check-4) |

## Sprawdzenie 1: 64-bitowy system operacyjny

UAVcast-Pro v6 wymaga 64-bitowego systemu: arm64 lub amd64 (komputery x86). Na arm64 płytki inne niż Raspberry Pi (Jetson i inne płytki ARM) wymagają UAVcast-Pro 6.5.3 lub nowszego. Starsze instalatory zatrzymują się z komunikatem *Device is not a Raspberry Pi*.

```bash
dpkg --print-architecture   # must print arm64 or amd64
uname -m                    # aarch64 or x86_64
```

Jeśli widzisz `armhf`, `armv7l` lub `i686`, działa 32-bitowy system. Wgraj **Raspberry Pi OS (64-bit)** za pomocą Raspberry Pi Imager i zainstaluj ponownie. Obsługiwane systemy to Raspberry Pi OS, Debian i Ubuntu; zobacz [Obsługiwany sprzęt](https://docs.uavmatrix.com/pl/reference/supported-hardware/).

## Sprawdzenie 2: Internet i apt

Instalator pobiera UAVcast-Pro i pakiety systemowe oraz instaluje ZeroTier i Tailscale.

1. Sprawdź dostęp do internetu: `curl -I https://install.uavmatrix.com`.
2. Uruchom ręcznie `sudo apt update` i napraw błędy, które pokaże, na przykład repozytorium zewnętrzne z wygasłym kluczem.
3. Uruchom instalator ponownie. Można go uruchamiać więcej niż raz bez szkody.

## Sprawdzenie 3: Płytki o małej mocy

Na Raspberry Pi Zero 2 W instalacja trwa znacznie dłużej niż na Pi 4 lub 5, a instalator pokazuje szacowany czas. Pozwól mu skończyć. Użyj szybkiej karty SD i stabilnego zasilania: reset z powodu niedonapięcia w trakcie instalacji zostawia niedokończoną instalację.

## Sprawdzenie 4: Przeczytaj log instalatora

Instalator zapisuje wszystko do `/opt/uavcast-pro/installer.log`.

```bash
sudo tail -n 100 /opt/uavcast-pro/installer.log
```

Spójrz na ostatnie linie błędów. Jeśli instalator zawiedzie zanim utworzy `/opt/uavcast-pro`, log znajdziesz w `/tmp/uavcast-installer.log`.

## Zainstaluj konkretną wersję

Aby wylistować wersje dostępne dla Twojej architektury lub zainstalować jedną z nich:

```bash
curl -fsSL https://install.uavmatrix.com | bash -s -- -l          # list versions
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2  # install 6.5.2
```

## Nadal nie działa?

Wyślij `/opt/uavcast-pro/installer.log`, wynik `cat /etc/os-release` i `dpkg --print-architecture` oraz model swojej płytki na **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Powiązane: [Zainstaluj UAVcast-Pro](https://docs.uavmatrix.com/pl/get-started/installation/)

Source: https://docs.uavmatrix.com/pl/troubleshooting/installation-fails/
