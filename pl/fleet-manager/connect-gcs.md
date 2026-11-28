# Podłącz stację naziemną

> Dołącz laptop z QGroundControl lub Mission Planner do VPN swojej organizacji jednym poleceniem Tailscale i zacznij odbierać wideo oraz telemetrię z drona.

Stacja naziemna (GCS) to laptop lub komputer, na którym pilot uruchamia QGroundControl, Mission Planner lub podobne oprogramowanie. Aby odbierać wideo i telemetrię drona przez Fleet Manager, stacja naziemna dołącza do prywatnej sieci VPN twojej organizacji. Potem decydujesz, które drony mają strumieniować do niej, za pomocą [powiązań strumieni](https://docs.uavmatrix.com/pl/fleet-manager/network/stream-bindings/).

Zajmuje to około pięciu minut na jedną stację naziemną.

## Zanim zaczniesz

- **Rola Owner lub Admin.** Viewer widzi stronę **Network**, ale nie widzi klucza autoryzacyjnego ani polecenia połączenia i nie może włączać VPN ani konfigurować urządzeń. Zobaczy komunikat *Ask an Owner or Admin of this organization to connect a new device to the VPN.*
- **VPN włączony** dla organizacji. Jeśli **Network** pokazuje **Enable VPN Network**, najpierw wybierz tę opcję. Zobacz [Sieć i VPN](https://docs.uavmatrix.com/pl/fleet-manager/network/).
- **Uprawnienia administratora na komputerze stacji naziemnej**, aby zainstalować Tailscale i uruchomić jedno polecenie.
- Co najmniej jeden dron [sparowany](https://docs.uavmatrix.com/pl/fleet-manager/pair-uav/) i dołączony do VPN.

> **Fleet Manager prowadzi własny serwer VPN**
>
> Sieć organizacji korzysta z klienta Tailscale, ale z serwera sterującego Fleet Manager, a nie z konta tailscale.com. Nie musisz zakładać konta w Tailscale. Jeśli komputer jest już w innej sieci Tailscale, poniższe polecenie przeniesie go do sieci twojej organizacji.

## Dołącz stację naziemną do VPN

1. **Zainstaluj Tailscale** na stacji naziemnej ze strony [tailscale.com/download](https://tailscale.com/download) (Windows, macOS lub Linux).

2. **Skopiuj polecenie połączenia.** W Fleet Manager otwórz **Network**, pozostań na karcie **Devices** i znajdź **Connect a Device**. W sekcji **GCS Connection Command** skopiuj polecenie. Wygląda ono tak:

   ```bash
   tailscale up --authkey=<your-org-key> --login-server=https://vpn-connect.uavmatrix.com
   ```

   ![Karta Connect a Device z ostrzeżeniem GCS Computer Only i poleceniem tailscale up](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/network--connect-device.webp)

   *Network → Devices → Connect a Device, z ostrzeżeniem GCS Computer Only i przyciskiem kopiowania obok polecenia (klucz autoryzacyjny jest rozmyty).*

   > **Tylko dla stacji naziemnej**
   >
   > Nie wklejaj tego polecenia do UAVcast-Pro ani nie uruchamiaj go na dronie. Drony dołączają do VPN podczas parowania albo przez **Push to Drone** na tej samej stronie.

3. **Uruchom polecenie jako administrator.**

   - Windows: otwórz **Terminal** lub **PowerShell** z opcją **Run as administrator** i wklej polecenie.
   - macOS i Linux: wklej je w terminalu, poprzedzając `sudo`.

   Gdy polecenie zakończy się bez błędu, komputer jest w sieci. `tailscale status` wyświetla drony i inne urządzenia, które widzi.

4. **Znajdź komputer w Connected Devices.** Wróć do Fleet Manager. Komputer pojawi się w **Connected Devices** z nazwą hosta i adresem `100.x.y.z`. Jeśli nie pojawi się w ciągu kilku sekund, wybierz **Sync**. Nowe urządzenie ma typ **Unknown**, a baner informuje, ile urządzeń wymaga konfiguracji.

5. **Oznacz je jako stację naziemną.** W kolumnie **Type** wybierz **Configure**. Wybierz **Ground Control Station (GCS)**, kliknij **Continue**, a następnie **Complete Setup**.

   ![Kreator konfiguracji urządzenia z pytaniem What type of device is this i zaznaczoną opcją Ground Control Station](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/network--setup-wizard.webp)

   *Okno Configure z pytaniem What type of device is this? i wybranym Ground Control Station (GCS) dla laptopa o nazwie ops-laptop-03.*

Komputer ma teraz odznakę **GCS** i pojawia się na liście **Ground Station**, gdy dodajesz powiązanie strumienia.

> **Nazywaj stacje naziemne od osoby lub stanowiska**
>
> Użyj **Rename** w menu akcji urządzenia (przycisk **⋯**), aby nadać nazwę w rodzaju „Field laptop – Team North”. Listy powiązań są znacznie czytelniejsze przy dużej flocie.

## Zacznij odbierać dane z drona

1. Przejdź do **Network → Stream Bindings** i wybierz **Add Binding**.

2. Wybierz **Drone** i **Ground Station**, a następnie kliknij **Create Binding**. Dron musi być online.

3. Odczytaj porty w kolumnie **Ports**, na przykład `5600 / 14550`.

4. W oprogramowaniu do sterowania naziemnego nasłuchuj na tych portach:

   - **QGroundControl:** telemetria na UDP 14550 łączy się automatycznie. W sprawie wideo otwórz **Application Settings → Video** (w starszych wersjach pod **General**), ustaw **Source** na **UDP h.264 Video Stream** i port UDP na port wideo powiązania (**UDP URL** `0.0.0.0:<port>` w aktualnych wersjach). Dla kolejnych dronów dodaj łącze UDP na porcie telemetrii każdego powiązania w **Application Settings → Comm Links**.
   - **Mission Planner:** w liście połączeń wybierz **UDP**, kliknij **Connect** i wpisz port telemetrii.

Więcej szczegółów, w tym o wielu dronach na jednej stacji naziemnej: [Powiązania strumieni](https://docs.uavmatrix.com/pl/fleet-manager/network/stream-bindings/) i [Strumieniowanie do wielu stacji naziemnych](https://docs.uavmatrix.com/pl/guides/multiple-ground-stations/).

## Klucz autoryzacyjny

Polecenie zawiera wielokrotnego użytku klucz do sieci organizacji. Jest ważny przez 90 dni i można go użyć na dowolnej liczbie stacji naziemnych. Owner i Admin mogą kliknąć przycisk odświeżania w **Connect a Device**, aby utworzyć nowy klucz. Stacje naziemne, które już dołączyły, pozostają połączone. Jeśli karta pokazuje **No valid auth key available. Generate a new key to connect devices.**, klucz wygasł. Utwórz nowy.

## Usuń stację naziemną

W sekcji **Network → Devices** otwórz menu akcji urządzenia i wybierz **Remove Device**. To usuwa urządzenie z VPN i kasuje jego powiązania strumieni. Aby połączyć je ponownie, uruchom polecenie połączenia jeszcze raz.

## Rozwiązywanie problemów

- **Polecenie kończy się błędem lub przekracza limit czasu:** sprawdź, czy komputer może połączyć się z `https://vpn-connect.uavmatrix.com` i czy klucz nie wygasł.
- **Stacja naziemna jest połączona, ale nie ma telemetrii ani wideo:** sprawdź, czy istnieje powiązanie, czy przełączniki **Video** i **Telemetry** są włączone i czy oprogramowanie stacji nasłuchuje na portach powiązania. Zapora systemu Windows często blokuje przychodzące UDP dla nowej aplikacji. Zobacz [Brak telemetrii w stacji naziemnej](https://docs.uavmatrix.com/pl/troubleshooting/no-telemetry-in-gcs/) i [Brak wideo w stacji naziemnej](https://docs.uavmatrix.com/pl/troubleshooting/no-video-in-gcs/).
- **Nie można dotrzeć do drona przez VPN:** zobacz [VPN połączony, ale nie można dotrzeć do drona](https://docs.uavmatrix.com/pl/troubleshooting/vpn-cant-reach-drone/).

Source: https://docs.uavmatrix.com/pl/fleet-manager/connect-gcs/
