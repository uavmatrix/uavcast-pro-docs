# Zainstaluj UAVcast-Pro

> Zainstaluj UAVcast-Pro jednym poleceniem w 64-bitowym Raspberry Pi OS, Debianie lub Ubuntu (arm64 lub amd64), następnie otwórz interfejs web i utwórz użytkownika administratora.

Instalacja jednym poleceniem

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
```

Uruchom je na komputerze pokładowym (64-bitowy Raspberry Pi OS, Debian lub Ubuntu, z dostępem do internetu). Poniższe kroki wyjaśniają, co robi i jak przygotować urządzenie.

> Do aktywacji drona potrzebujesz licencji UAVcast-Pro. Kup ją w sklepie UAVmatrix.
>
> [Kup UAVcast-Pro](https://uavmatrix.com/pl/checkout) · [Zobacz plany i ceny](https://uavmatrix.com/pl/products)

UAVcast-Pro instaluje się jednym poleceniem na dowolnym 64-bitowym systemie Linux opartym na Debianie: Raspberry Pi OS, Debian lub Ubuntu, na arm64 lub amd64. Instalator pobiera najnowsze wydanie, instaluje jego zależności i usługi, a po zakończeniu wyświetla adres interfejsu web. Zajmuje to około 10 minut, a na Raspberry Pi Zero 2 W, 2 lub 3 około 30 minut.

## Zanim zaczniesz

- 64-bitowy system na komputerze pokładowym. Sprawdź poleceniem `uname -m`: musi wypisać `aarch64` lub `x86_64`.
- Co najmniej 500 MB wolnego miejsca na dysku systemowym (`df -h /`).
- Dostęp do internetu na urządzeniu podczas instalacji.
- Dostęp przez SSH lub klawiatura i ekran przy urządzeniu oraz użytkownik z prawami `sudo`.

## Krok 1: Wgraj system operacyjny

**Raspberry Pi**

1. Otwórz [Raspberry Pi Imager](https://www.raspberrypi.com/software/) i wybierz model swojego Pi.
2. Wybierz **Raspberry Pi OS (64-bit)**. Wersja **Lite** wystarcza i zostawia więcej mocy procesora na wideo.
3. Otwórz ustawienia personalizacji systemu. Ustaw nazwę hosta, nazwę użytkownika i hasło, swoją sieć Wi-Fi i kraj oraz włącz SSH.
4. Zapisz kartę, włóż ją do Pi i włącz zasilanie.

Ubuntu Server 64-bit dla Raspberry Pi również działa.

**Inne płytki arm64**

Wgraj 64-bitowy obraz Ubuntu lub Debiana od producenta (na przykład JetPack Ubuntu dla NVIDIA Jetson), dokończ konfigurację przy pierwszym uruchomieniu i włącz SSH.

Płytki arm64 inne niż Raspberry Pi wymagają UAVcast-Pro 6.5.3 lub nowszego; starsze instalatory zatrzymują się z komunikatem *Device is not a Raspberry Pi*.

**PC x86-64**

Zainstaluj 64-bitowego Debiana lub Ubuntu (Server lub Desktop). Instalator nie sprawdza numeru wydania, więc użyj aktualnego, wspieranego wydania, na przykład Ubuntu 22.04 LTS lub nowszego.

Następnie zaloguj się przez SSH i zaktualizuj system:

```bash
sudo apt update && sudo apt full-upgrade -y
```

## Krok 2: Uruchom instalator

Na dronie:

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
```

Instalator:

1. Wykrywa architekturę i pobiera pasujące wydanie do `/opt/uavcast-pro`.
2. Instaluje wymagane pakiety systemowe: NetworkManager, ModemManager, GStreamer, v4l-utils, Redis, Python i inne.
3. Na Raspberry Pi zwalnia UART GPIO dla kontrolera lotu (usuwa konsolę szeregową z `cmdline.txt` i przenosi Bluetooth z UART) oraz zwiększa pulę pamięci kamery dla konfiguracji z dwiema kamerami. Oryginalne pliki `config.txt` i `cmdline.txt` są najpierw zapisywane jako kopie zapasowe.
4. Instaluje ZeroTier, Tailscale, mavlink-router i MediaMTX.
5. Instaluje i uruchamia usługi UAVcast-Pro.
6. Sprawdza, czy kluczowe narzędzia są obecne, i wyświetla adres web.

Po zakończeniu zobaczysz:

```text
✅ Installation completed successfully!

Please reboot your device to complete the installation.

To access the UAVcast-Pro web interface, open your browser and navigate to:
http://192.168.1.50
```

Uruchom ponownie urządzenie, aby zmiany dotyczące UART i kamery zaczęły działać:

```bash
sudo reboot
```

> **Daj wolnym płytkom dokończyć**
>
> Na Pi Zero 2 W pasek postępu może stać w miejscu przez kilka minut, gdy apt pracuje. Nie uruchamiaj drugiej instalacji: instalator nie uruchomi się dwa razy, a druga kopia tylko spowolni pierwszą. Pełny dziennik znajduje się w `/opt/uavcast-pro/installer.log`.

### Zainstaluj konkretną wersję

Wyświetl listę wersji dostępnych dla swojej architektury:

```bash
curl -fsSL https://install.uavmatrix.com | bash -s -- -l
```

Zainstaluj jedną z nich opcją `-b`:

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2
```

Wersję możesz też zmienić później w interfejsie web. Zobacz [Aktualizacja UAVcast-Pro](https://docs.uavmatrix.com/pl/get-started/updating/).

## Krok 3: Otwórz interfejs web

Na komputerze w tej samej sieci otwórz przeglądarkę i przejdź pod adres podany przez instalator, na przykład `http://192.168.1.50`. Interfejs web działa na porcie **80**.

Jeśli nie znasz adresu:

- Spróbuj nazwy hosta ustawionej w Raspberry Pi Imager, na przykład `http://raspberrypi.local`. Wymaga to mDNS, który działa w większości domowych sieci oraz na macOS, Linuksie i Windows 10 lub nowszym.
- Poszukaj urządzenia na liście klientów połączonych z routerem.
- Na urządzeniu uruchom `hostname -I`.

Pierwszą stroną, którą zobaczysz, jest **Aplikacja**, ponieważ UAVcast-Pro nie ma jeszcze licencji. Pasek boczny pozostaje wyszarzony (*Funkcja wymaga licencji*), dopóki urządzenie nie zostanie licencjonowane.

## Krok 4: Aktywuj licencję

W **Aplikacja → Menedżer Licencji** wklej klucz w pole **Enter License Key** i wybierz **Validate**. Urządzenie potrzebuje do tego dostępu do internetu. Pełny przebieg, sloty urządzeń i przenoszenie licencji opisano w [Licencjonowanie i aktywacja](https://docs.uavmatrix.com/pl/get-started/license-activation/).

## Krok 5: Utwórz użytkownika administratora

Świeża instalacja **nie ma użytkowników ani logowania**: każdy, kto może dotrzeć do interfejsu web, ma pełny dostęp administratora. Utwórz konto administratora, zanim dron trafi do wspólnej sieci lub do internetu.

1. Przejdź do **Users** w pasku bocznym (w sekcji **Zarządzanie**).
2. Wybierz **Add User**.
3. Wpisz **Username** (co najmniej 3 znaki) i **Password** (co najmniej 6 znaków). Pierwszy użytkownik zawsze jest **Admin**.
4. Wybierz **Create User**.

Od teraz interfejs web wymaga logowania. Sesje trwają 7 dni. Konta tylko do odczytu opisano w [Użytkownicy i dostęp](https://docs.uavmatrix.com/pl/uavcast-pro/users/).

## Co zostaje zainstalowane

| Element | Lokalizacja |
| --- | --- |
| Aplikacja, pliki binarne, baza danych (`uavcast.db`), logi | `/opt/uavcast-pro` |
| Dziennik instalatora | `/opt/uavcast-pro/installer.log` |
| Usługi systemd | `uavcast-web`, `uavcast-factory`, `mavlink-manager`, `uavcast-camera`, `uavcast-ntrip`, `uavcast-dns`, `mediamtx`, `internet-check` |
| Konfiguracja routera MAVLink | `/etc/mavlink-router/main.conf` (generowana przez UAVcast-Pro, nie edytuj) |

Sprawdź, czy usługa web działa:

```bash
sudo systemctl status uavcast-web
```

## Odinstalowanie

Plik instalatora ma tryb odinstalowania. Zatrzymuje i usuwa wszystkie usługi UAVcast-Pro, bazę ustawień i pliki programu w `/opt/uavcast-pro` oraz usuwa ZeroTier, Tailscale i Redis, jeśli zainstalował je UAVcast-Pro. Ogólne pakiety, takie jak NetworkManager, ModemManager i GStreamer, pozostają.

```bash
sudo /opt/uavcast-pro/factory/ApplicationInstaller --uninstall
```

Od UAVcast-Pro 6.5.3 nagrania z lotów w `/opt/uavcast-pro/recordings` są zachowywane. Dodaj `--delete-recordings`, aby je również usunąć, lub `--purge-deps`, aby usunąć też ZeroTier, Tailscale i Redis zainstalowane przed UAVcast-Pro. We wcześniejszych wersjach odinstalowanie kasuje cały folder `/opt/uavcast-pro` razem z nagraniami, więc najpierw skopiuj nagrania, które chcesz zachować.

> **Najpierw wyrejestruj licencję**
>
> Odinstalowanie nie zwalnia slotu licencji. Przed wyczyszczeniem urządzenia wyrejestruj je w **Aplikacja → Menedżer Licencji**, inaczej nie zwolnisz slotu bez innego urządzenia. Zobacz [Licencjonowanie i aktywacja](https://docs.uavmatrix.com/pl/get-started/license-activation/#unregister-a-device).

## Aktualizacja z UAVcast-Pro 4.x lub 5.x

Wersja 6 to całkowite przepisanie i nie może zaimportować ustawień z wersji 4.x lub 5.x. Zapisz ustawienia stacji naziemnych, kamery i modemu, wgraj świeży 64-bitowy system i zainstaluj wersję 6.

Jeśli instalator zgłosi *An older version of UAVcast-Pro has been detected at /opt/UAVcast-Pro*, najpierw usuń starą wersję. Spowoduje to usunięcie starych ustawień:

```bash
sudo rm -rf /opt/UAVcast-Pro
```

## Jeśli instalacja się nie powiedzie

| Komunikat lub objaw | Rozwiązanie |
| --- | --- |
| *No installation candidate for … found!* | System jest 32-bitowy lub architektura nie jest obsługiwana. Sprawdź `uname -m` i wgraj ponownie 64-bitowy obraz. |
| *Not enough free space. … need 500MB* | Zwolnij miejsce lub użyj większej karty. |
| *Another process is currently using the system package manager* | Trwa automatyczna aktualizacja. Poczekaj kilka minut i uruchom instalator ponownie. |
| *Another installer is already running* | Poczekaj, aż pierwszy instalator zakończy działanie. |
| *Installation completed with errors* z czerwonym ✗ | Uruchom instalator ponownie. Jeśli błąd się powtarza, wyślij `/opt/uavcast-pro/installer.log` do [support@uavmatrix.com](mailto:support@uavmatrix.com). |
| Strona web się nie ładuje | Sprawdź `sudo systemctl status uavcast-web`, spróbuj adresu IP zamiast nazwy hosta i upewnij się, że inna usługa nie używa portu 80. |

Więcej rozwiązań: [Instalacja się nie powiodła](https://docs.uavmatrix.com/pl/troubleshooting/installation-fails/) oraz [Interfejs web się nie otwiera](https://docs.uavmatrix.com/pl/troubleshooting/web-interface-wont-open/).

Source: https://docs.uavmatrix.com/pl/get-started/installation/
