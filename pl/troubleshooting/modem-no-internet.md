# Modem 4G połączony, ale bez internetu na Raspberry Pi

> Modem LTE pokazuje sygnał i operatora, ale dron nie ma internetu? Sprawdź typ modemu, APN, PIN i dane SIM, priorytet sieci oraz trasę domyślną.

Strona **Modem** pokazuje sygnał, operatora i być może adres IP, ale dron nie może połączyć się z internetem: VPN się nie łączy, licencji nie da się sprawdzić, a wideo i telemetria nigdy nie docierają do stacji naziemnej przez LTE.

| Co widzisz | Prawdopodobna przyczyna | Zacznij od |
| --- | --- | --- |
| No Modem Connected | Linux nie widzi modemu albo brakuje mu zasilania | [Sprawdzenie 1](https://docs.uavmatrix.com/pl/troubleshooting/modem-no-internet/#check-1) |
| Błąd wspominający o modemie HiLink albo brak przycisku Connect dla modemu USB | Zły **Typ modemu** | [Sprawdzenie 2](https://docs.uavmatrix.com/pl/troubleshooting/modem-no-internet/#check-2) |
| Zarejestrowany w sieci, ale bez adresu IPv4 | Zły APN, zły PIN albo brak danych na karcie SIM | [Sprawdzenie 3](https://docs.uavmatrix.com/pl/troubleshooting/modem-no-internet/#check-3) |
| Modem ma adres IP, ale internet idzie przez Wi-Fi | Priorytet sieci faworyzuje Wi-Fi | [Sprawdzenie 4](https://docs.uavmatrix.com/pl/troubleshooting/modem-no-internet/#check-4) |
| Działa w domu, a nie w terenie (lub odwrotnie) | Roaming, zasięg albo domowa sieć w tej samej podsieci co modem | [Sprawdzenie 5](https://docs.uavmatrix.com/pl/troubleshooting/modem-no-internet/#check-5) |

![Strona Modem UAVcast-Pro z wybranym Traditional (PPP) i panelem No Modem Connected](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/modem.webp)

*Strona Modem z wybranym Traditional (PPP) i bez podłączonego modemu. Gdy modem jest podłączony, karta po prawej pokazuje jakość sygnału, stan, operatora i informacje IPv4.*

## Sprawdzenie 1: Czy modem jest wykryty?

Jeśli strona pokazuje **No Modem Connected**:

1. Sprawdź, czy dioda zasilania modemu świeci i czy modem stabilnie siedzi w porcie USB.
2. Modem może pobierać więcej prądu, niż dostarcza port USB Raspberry Pi. Obserwuj wiersz **Power supply** na panelu. Jeśli pokazuje **Voltage too low - use a stronger power supply**, najpierw napraw zasilanie: [Podnapięcie i throttling](https://docs.uavmatrix.com/pl/troubleshooting/undervoltage-and-throttling/).
3. Na Pi uruchom `lsusb`, aby zobaczyć modem, i `mmcli -L`, aby sprawdzić, czy ModemManager go znalazł. Modem HiLink nie pojawia się w `mmcli`. Zamiast tego widać go jako interfejs sieciowy w `ip addr`.

Modem pojawia się na stronie samoczynnie, gdy zostanie wykryty.

## Sprawdzenie 2: Wybierz właściwy typ modemu

USB modemy są dwóch rodzajów, a **Typ modemu** musi odpowiadać Twojemu.

|  | **HiLink** | **Traditional (PPP)** |
| --- | --- | --- |
| Jak Linux go widzi | Karta sieciowa (modem to mały router) | Modem zarządzany przez ModemManager |
| Kto się łączy | Sam modem, automatycznie | UAVcast-Pro, przyciskami **Connect** i **Disconnect** |
| Przykład Huawei | E3372**h** | E3372**s** |

Jeśli wybierzesz **Traditional (PPP)** dla modemu HiLink, log zawiera *HiLink modem detected … Please change your modem type to 'HiLink' in settings.* Zmień **Typ modemu**, a błąd zniknie.

## Sprawdzenie 3: APN, PIN i karta SIM

Dla modemu **Traditional (PPP)**:

1. Najpierw zostaw pole **Nazwa Punktu Dostępu (Opcjonalne)** puste. UAVcast-Pro wtedy próbuje domyślnego APN sieci i znanych APN dla karty SIM i zapamiętuje ten, który działa (*Found a working … it will be used from now on* w logu).
2. Jeśli to nie działa, wpisz APN podany przez operatora dla transferu danych mobilnych. Niektórzy operatorzy wymagają też **Nazwa użytkownika (Opcjonalne)** i **Hasło (Opcjonalne)**.
3. Jeśli karta SIM ma PIN, wpisz go w **Kod PIN (Opcjonalne)** albo wyłącz PIN, wkładając kartę do telefonu. **Unlock Required** w sekcji **Informacje o Modemie** pokazuje, czy karta SIM jest zablokowana.
4. Włóż kartę do telefonu i sprawdź, czy dane mobilne działają i czy w pakiecie jest jeszcze transfer.

Dla modemu **HiLink** APN ustawia się na stronie samego modemu, zwykle pod `http://192.168.8.1`. Otwórz ją z Pi albo podłącz modem do laptopa.

> **UAVcast-Pro ponawia próby**
>
> Modem Traditional łączy się przy starcie i sam ponownie łączy po utracie sygnału. Jeśli modem łączy się, ale nie dostaje adresu, UAVcast-Pro przełącza go w tryb raw-IP i próbuje ponownie. Odczekaj minutę po starcie, zanim zmienisz ustawienia.

## Sprawdzenie 4: Ustaw modem jako domyślną trasę

Jeśli Pi jest też połączone przez Wi-Fi lub Ethernet, ruch wychodzi przez interfejs z priorytetem, niekoniecznie przez modem.

1. Przejdź do **Sieci**.
2. W sekcji **Priorytet Sieci** wybierz przed lotem **Modem Priority (Outdoor Mode)**. **WiFi Priority (Indoor Mode)** oszczędza transfer komórkowy w domu, ale wysyła wszystko przez Wi-Fi.
3. W sekcji **Interfejsy Sieciowe** sprawdź, czy interfejs modemu jest oznaczony jako **Default**, a **Brama Domyślna** pokazuje *via* interfejs modemu.

![Strona Sieci z Network Priority ustawionym na Auto i tabelą interfejsów pokazującą wlan0 jako domyślny](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/networks.webp)

*Strona Sieci z aktywnym Auto (System Default) i Wi-Fi (wlan0) jako domyślną trasą. Wybierz tutaj Modem Priority (Outdoor Mode), aby kierować ruch przez modem.*

Przetestuj z Pi, używając samego modemu:

```bash
ping -c 3 -I wwan0 1.1.1.1   # Traditional modem (interface name may differ)
ip route                     # the first "default via" line is the route in use
```

## Sprawdzenie 5: Problemy występujące tylko w terenie

- **Roaming**: karta SIM używana za granicą może wymagać włączenia roamingu przez operatora. Sprawdź w telefonie z tą samą kartą.
- **Zasięg**: spójrz na **Signal Quality** i **Technology**. Niektóre karty IoT działają tylko na określonych pasmach lub technologiach.
- **Konflikt podsieci**: modemy HiLink wydają adresy `192.168.8.x`. Jeśli Twoja sieć domowa lub biurowa też używa `192.168.8.0/24`, routing się psuje. Zmień podsieć LAN albo podsieć modemu.

## Nadal brak internetu?

[Pobierz logi](https://docs.uavmatrix.com/pl/troubleshooting/collect-logs/) z zaznaczonym **Modem Manager**, dołącz wynik `mmcli -m 0` i `ip route` i wyślij je na **[support@uavmatrix.com](mailto:support@uavmatrix.com)** wraz z modelem modemu i nazwą operatora.

Powiązane: [Modem komórkowy](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/cellular-modem/) · [Sieci](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/networks/)

Source: https://docs.uavmatrix.com/pl/troubleshooting/modem-no-internet/
