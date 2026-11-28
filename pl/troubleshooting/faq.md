# Często zadawane pytania

> Krótkie odpowiedzi o sprzęcie UAVcast-Pro, modemach LTE, stacjach naziemnych, portach, pracy offline, licencjach, aktualizacjach, nagrywaniu i parowaniu z Fleet Manager.

## Sprzęt i konfiguracja

### Czy potrzebuję modemu LTE?

Nie. UAVcast-Pro działa przez każde połączenie IP: 4G/LTE, Wi-Fi lub Ethernet. Modem pozwala latać poza zasięgiem Wi-Fi. Wielu operatorów testuje na Wi-Fi, a przed lotem przełącza się na modem w **Sieci → Priorytet Sieci → Modem Priority (Outdoor Mode)**.

### Które komputery mogą uruchomić UAVcast-Pro?

Dowolna 64-bitowa płytka lub komputer PC z Linuksem na arm64 lub amd64, z Raspberry Pi OS, Debian lub Ubuntu: Raspberry Pi Zero 2 W, 3, 4 i 5, NVIDIA Jetson, Orange Pi oraz miniaturowe komputery x86. Raspberry Pi 4 lub 5 to wygodny wybór do wideo. Zobacz [Obsługiwany sprzęt](https://docs.uavmatrix.com/pl/reference/supported-hardware/).

### Które kontrolery lotu są obsługiwane?

Każdy kontroler lotu, który mówi MAVLink przez USB lub port TELEM: ArduPilot (Copter, Plane, Rover, VTOL i pozostałe typy pojazdów) oraz PX4, na płytach z rodziny Pixhawk i Cube, Matek i podobnych. Telemetria, wideo i przekazywanie do stacji naziemnych działają z każdym z nich. Przyciski trybów lotu na **Mapie Lotu** i w Fleet Manager używają nazw trybów ArduPilot. Przy PX4 zmieniaj tryby z poziomu stacji naziemnej.

### Czy mogę połączyć się przez port USB kontrolera lotu?

Tak, i to najprostsza opcja: podłącz kabel i zostaw **Port** na **Automatic**. Użyj krótkiego kabla przesyłającego dane. Jeśli kontroler nie zostanie znaleziony, zobacz [Brak heartbeat MAVLink](https://docs.uavmatrix.com/pl/troubleshooting/no-mavlink-heartbeat/).

## Stacje naziemne i sieć

### Które stacje naziemne działają?

Każde oprogramowanie przyjmujące MAVLink przez UDP, w tym QGroundControl, Mission Planner i MAVProxy. Wideo to H.264 przez RTP/UDP, które QGroundControl i Mission Planner odtwarzają bezpośrednio. GStreamer i VLC również działają: zobacz [Stacje naziemne i wideo](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/).

### Czy kilka stacji naziemnych może oglądać jednocześnie?

Tak. Dodaj jedno miejsce docelowe na komputer w **Stacje Naziemne**, każde z własnymi przełącznikami wideo i telemetrii. Użyj **Read Only** dla stacji, które mają tylko podglądać. Zobacz [Strumieniowanie do wielu stacji naziemnych](https://docs.uavmatrix.com/pl/guides/multiple-ground-stations/).

### Których portów używa UAVcast-Pro?

Domyślnie telemetria idzie na UDP **14550**, a wideo na UDP **5600** na każdej stacji naziemnej. Druga kamera używa portu wideo + 1, a dźwięk portu wideo + 2. Interfejs webowy działa na porcie **80**. Pełna lista znajduje się w [Porty i protokoły](https://docs.uavmatrix.com/pl/reference/ports-and-protocols/).

### Czy potrzebuję przekierowania portów na routerze?

Nie. Przy 4G umieść dron i stację naziemną w tej samej sieci VPN: w VPN Fleet Manager (wliczonym w licencję) albo we własnej sieci Tailscale lub ZeroTier. Dron wysyła telemetrię i wideo na adres VPN stacji naziemnej. Zobacz [Lot poza zasięgiem wzroku przez 4G](https://docs.uavmatrix.com/pl/guides/bvlos-4g/).

### Czy nadal mogę połączyć się przez TCP 5760?

Nie. Od wersji v6.5.0 port TCP 5760 jest zamknięty, więc dane dostają tylko stacje naziemne, które dodasz. Dodaj swój komputer jako miejsce docelowe i używaj UDP.

### Czy działa bez internetu?

Tak. Połączenie z kontrolerem lotu, telemetria i wideo startują po włączeniu zasilania, bez czekania na internet, więc działa lokalna sieć Wi-Fi lub łącze radiowe. Aktywacja licencji wymaga internetu jednorazowo. Potem nieudane sprawdzenie licencji z powodu utraty połączenia nie wyłącza urządzenia.

## Licencja i konto

> Do aktywacji drona potrzebujesz licencji UAVcast-Pro. Kup ją w sklepie UAVmatrix.
>
> [Kup UAVcast-Pro](https://uavmatrix.com/pl/checkout) · [Zobacz plany i ceny](https://uavmatrix.com/pl/products)

### Licencja nie aktywuje się. Co teraz?

Zobacz [Licencja nie aktywuje się](https://docs.uavmatrix.com/pl/troubleshooting/license-activation-failed/). Zwykle przyczyną jest źle przepisany klucz, brak wolnego miejsca na urządzenie lub brak internetu na urządzeniu.

### Co się dzieje, gdy licencja wygasa?

UAVcast-Pro zostaje zablokowany: interfejs webowy otwiera tylko **Aplikacja**, a telemetria, wideo i pozostałe usługi zatrzymują się, dopóki nie odnowisz licencji. Odnów ją w sklepie przed datą wygaśnięcia, a potem zweryfikuj klucz na dronie. Zobacz [Gdy licencja wygasa](https://docs.uavmatrix.com/pl/get-started/license-activation/#when-a-license-expires).

### Czy Fleet Manager jest wliczony w licencję?

Tak. Fleet Manager, wraz z jego VPN, jest wliczony w licencję UAVcast-Pro bez dodatkowych opłat.

### Wymieniłem kartę SD. Czy potrzebuję nowej licencji?

Nie, ale urządzenie liczy się jako nowe i zajmuje miejsce. Wyrejestruj stary wpis w **Aplikacja → Menedżer Licencji → Activated Devices**.

### Czy Fleet Manager to osobny produkt?

Fleet Manager to panel webowy UAVmatrix do zarządzania wieloma dronami pod adresem [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/). Jest wliczony w licencję UAVcast-Pro. Logujesz się kontem uavmatrix.com, a każdy sparowany dron potrzebuje aktywnej licencji UAVcast-Pro należącej do członka Twojej organizacji. Zobacz [Fleet Manager](https://docs.uavmatrix.com/pl/fleet-manager/).

### Jak sparować dron z Fleet Manager?

W UAVcast-Pro otwórz **Fleet Management** i naciśnij **Connect to Fleet Manager**. Wpisz 8-cyfrowy kod w Fleet Manager w **Fleet → Pair Device** w ciągu 5 minut. Zobacz [Sparuj pierwsze UAV](https://docs.uavmatrix.com/pl/fleet-manager/pair-uav/), a jeśli się nie uda, [Kod parowania nieprawidłowy lub wygasły](https://docs.uavmatrix.com/pl/troubleshooting/pairing-code-invalid/).

## Aktualizacje i dane

### Jak zaktualizować UAVcast-Pro?

Przejdź do **Aplikacja → Aktualizacja Aplikacji**, wybierz wersję w **Wybierz wersję do aktualizacji** i naciśnij **Aktualizuj Teraz**. Jeśli karta pokazuje **Pending Restart**, naciśnij **Zrestartuj Teraz**. Możesz też uruchomić instalator ponownie.

### Czy mogę zaimportować ustawienia z v4 lub v5?

Nie. v6 używa nowej bazy danych, więc po świeżej instalacji skonfiguruj wszystko od nowa. W obrębie v6 użyj **Aplikacja → Baza Danych → Kopia Zapasowa Bazy Danych** i **Przywróć Bazę Danych**, aby przenieść ustawienia między instalacjami.

### Czy UAVcast-Pro może nagrywać wideo?

Tak, od wersji v6.5.1. Nagrywa kamerę 1 i 2 z mapy lotu albo automatycznie po uzbrojeniu drona, razem z logiem telemetrii. Zobacz [Nagrywanie lotów i ich przegląd](https://docs.uavmatrix.com/pl/guides/recording-flight-review/).

### Gdzie UAVcast-Pro przechowuje swoje pliki?

W `/opt/uavcast-pro`: baza danych `uavcast.db`, `logs/`, `recordings/` i `missions/`. Zobacz [Usługi i pliki](https://docs.uavmatrix.com/pl/reference/services-and-files/).

### Zapomniałem hasła administratora.

W interfejsie webowym nie ma resetu hasła. Inny administrator może usunąć Twojego użytkownika w **Users** i utworzyć go ponownie. Jeśli byłeś jedynym administratorem, odzyskanie dostępu nie jest samoobsługowe: skontaktuj się z **[support@uavmatrix.com](mailto:support@uavmatrix.com)** i podaj szczegóły wymienione w [Zapomniane hasło administratora](https://docs.uavmatrix.com/pl/uavcast-pro/users/#forgot-the-admin-password).

### Gdzie uzyskać pomoc?

Zbierz logi zgodnie z [Zbierz logi dla pomocy technicznej](https://docs.uavmatrix.com/pl/troubleshooting/collect-logs/) i napisz na **[support@uavmatrix.com](mailto:support@uavmatrix.com)** albo zapytaj na [UAVmatrix Discord](https://discord.gg/xwqMTXh).

Source: https://docs.uavmatrix.com/pl/troubleshooting/faq/
