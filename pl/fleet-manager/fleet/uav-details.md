# Szczegóły UAV

> Strona drona w Fleet Manager pokazuje telemetrię na żywo i stan komputera towarzyszącego, terminal SSH i dziennik MAVLink oraz pozwala na restart lub usunięcie drona.

Każdy dron ma własną stronę. Otwórz ją przyciskiem **Details** na karcie [Fleet](https://docs.uavmatrix.com/pl/fleet-manager/fleet/), z pulpitu albo przyciskiem **View UAV** na końcu parowania.

Nagłówek pokazuje nazwę, odznakę statusu na żywo, **Re-pair required** w razie potrzeby, organizację, **ID** urządzenia i **Last seen**. Owner i Admin mają też **Rename** i **Remove**.

Strona ma cztery karty: **Overview**, **Terminal**, **Logs** i **Actions**.

## Przegląd

Dane na żywo, przesyłane do przeglądarki w miarę ich nadejścia.

![Karta Overview szczegółów UAV z kartą UAVcast Application i kartą MAVLink / Flight Controller](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/drone-detail.webp)

*Karta Overview uzbrojonego VTOL w trybie AUTO: karta UAVcast Application z CPU Temp, CPU, Memory i Disk oraz karta MAVLink / Flight Controller z baterią, GPS, wysokością i kursem.*

**UAVcast Application** opisuje komputer towarzyszący: stan połączenia (**Connected**, **Waiting for data...** lub **Connecting...**), **Hostname**, **Uptime**, **CPU Temp**, zużycie **CPU**, **Memory** i **Disk**, usługi UAVcast-Pro wraz z ich stanem oraz adresy sieciowe drona (LAN i VPN). Zawiera też przyciski do [zdalnego otwarcia UAVcast-Pro](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remote-uavcast/): **Open via Proxy** oraz, gdy dron jest w VPN, **Open via VPN**.

**MAVLink / Flight Controller** pokazuje, co raportuje kontroler lotu: **ARMED** lub **DISARMED**, flagi **FAILSAFE** i **GCS FAILSAFE**, **Battery**, **GPS** (satelity i fix), **Altitude** oraz **Heading**.

> **Obserwuj CPU Temp w upalne dni**
>
> Raspberry Pi, który się przegrzewa, zwalnia, a wideo cierpi jako pierwsze. Jeśli **CPU Temp** rośnie podczas lotu, zobacz [Niedonapięcie i throttling](https://docs.uavmatrix.com/pl/troubleshooting/undervoltage-and-throttling/).

### Połączone stacje naziemne

Poniżej kart **Connected Ground Stations** wyświetla stacje naziemne odbierające strumienie tego drona, z przełącznikami **Video** i **Telemetry** oraz przyciskami **Pause** / **Resume**. **Add GCS** (Owner i Admin) przypisuje kolejną stację naziemną do tego drona. Tworzy to takie samo powiązanie strumienia jak **Network → Stream Bindings**, z następnymi wolnymi portami na tej stacji naziemnej, i wysyła nowy cel do drona. Zobacz [Powiązania strumieni](https://docs.uavmatrix.com/pl/fleet-manager/network/stream-bindings/).

## Terminal

Sesja SSH w przeglądarce do komputera towarzyszącego, przez szyfrowane połączenie Fleet Manager. Bez przekierowywania portów i bez VPN. Tylko Owner i Admin. Dron musi być online.

Wybierz **Connect**, aby otworzyć powłokę. Przyciski szybkich poleceń uruchamiają za ciebie typowe sprawdzenia: `df -h`, `free -h`, `top -bn1`, `ip a`, `ip r`, `uptime`, `dmesg` i `ps aux`. **Disconnect** zamyka sesję.

![Karta Terminal z sesją SSH pokazującą wynik df -h i przyciski szybkich poleceń](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/drone-detail--terminal.webp)

*Karta Terminal połączona z dronem w terenie, po uruchomieniu szybkiego polecenia df -h.*

> **To jest powłoka na żywo w dronie**
>
> Terminal to prawdziwa powłoka na komputerze towarzyszącym. Restart usług lub sieci, gdy dron jest w powietrzu, może przerwać telemetrię i wideo. Używaj go na ziemi, chyba że wiesz, co robi dane polecenie.

## Logi

Podgląd na żywo wiadomości telemetrii i heartbeat, które dron wysyła do Fleet Manager, z filtrami **Telemetry** i **Heartbeat**, **Auto-scroll**, **Pause** oraz czyszczeniem. **Download logs** zapisuje to, co widać na ekranie, do pliku tekstowego (`mavlink-log-<id>-<time>.txt`), który warto wysłać e-mailem do pomocy technicznej z numerem zgłoszenia (zgłoszenia przyjmują tylko obraz).

To jest log na żywo, a nie archiwum logów lotów. Fleet Manager przechowuje telemetrię dla [historii lotów](https://docs.uavmatrix.com/pl/fleet-manager/map/flight-history/), ale nie przechowuje ani nie eksportuje plików DataFlash ani `.tlog`. Pozostają one w kontrolerze lotu i w oprogramowaniu stacji naziemnej.

![Karta Logs z przewijaną listą wpisów telemetrii i heartbeat oraz przełącznikami Telemetry, Heartbeat i Auto-scroll](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/drone-detail--logs.webp)

*Karta Logs strumieniująca wpisy TELEMETRY i HEARTBEAT, z włączonymi przełącznikami Telemetry, Heartbeat i Auto-scroll.*

## Akcje

**System Actions** zawiera **Reboot** (Restart komputera towarzyszącego) i **Shutdown** (Wyłącz komputer towarzyszący). Oba wymagają, aby dron był online. Aby potwierdzić, wpisujesz nazwę akcji.

Działają one tylko na komputerze towarzyszącym, a nie na kontrolerze lotu. Wyłączenia nie można cofnąć zdalnie: ktoś musi ponownie włączyć zasilanie drona.

![Karta Actions z kartą System Actions oraz przyciskami Reboot i Shutdown](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/drone-detail--actions.webp)

*Karta Actions z otwartym oknem Confirm Reboot, które prosi o wpisanie reboot w celu potwierdzenia.*

## Zmiana nazwy

Wybierz **Rename**, wpisz nową nazwę w **Edit UAV** i zapisz. Nazwa synchronizuje się z UAVcast-Pro, gdy dron jest online.

## Usuń

**Remove** usuwa drona z organizacji i odłącza go. Zobacz [Ponowne parowanie, usuwanie lub przenoszenie drona](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remove-or-transfer/).

Source: https://docs.uavmatrix.com/pl/fleet-manager/fleet/uav-details/
