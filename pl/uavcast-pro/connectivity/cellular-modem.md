# Modem komórkowy (4G/LTE)

> Podłącz modem USB 4G/LTE typu HiLink lub tradycyjny do UAVcast-Pro z automatycznym wykrywaniem APN, kodem PIN, automatycznym ponownym połączeniem i informacjami o sygnale modemu do lotów w zasięgu sieci komórkowej.

Modem 4G/LTE zapewnia dronowi dostęp do internetu wszędzie tam, gdzie jest zasięg sieci komórkowej, dzięki czemu telemetria i wideo docierają do stacji naziemnej daleko poza zasięgiem Wi-Fi. UAVcast-Pro obsługuje modemy **HiLink**, które łączą się same, oraz modemy **Tradycyjny (PPP)**, z którymi UAVcast-Pro łączy się przez ModemManager. Dla modemów tradycyjnych automatycznie wykrywa APN, łączy się przy starcie i ponownie łączy po zerwaniach. Otwórz **Modem** w panelu bocznym.

![Strona Modem z wybranym Tradycyjny (PPP), APN na Automatyczny i panelem Brak połączonego modemu](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/modem.webp)

*Strona Modem z wybranym Tradycyjny (PPP) i APN na Automatyczny, przed podłączeniem modemu.*

## Który typ ma mój modem?

|  | HiLink | Tradycyjny (PPP) |
| --- | --- | --- |
| Jak się pojawia | Karta sieciowa (`usb0` lub `eth1`). Modem działa jako własny router ze stroną webową, często pod adresem `192.168.8.1`. | Urządzenie modemu zarządzane przez ModemManager. Połączenie zwykle pojawia się jako `ppp0` lub `wwan0`. |
| Kto się łączy | Sam modem. | UAVcast-Pro, przez ModemManager i NetworkManager. |
| Ustawienia w UAVcast-Pro | Brak. Ewentualnie ustaw APN na stronie webowej modemu. | APN (opcjonalnie), nazwa użytkownika, hasło, PIN. |
| Przykłady | Huawei E3372h, E8372 | Huawei E3372s, Quectel EC25 / EG25, Sierra Wireless |

Nie masz pewności? Podłącz modem i uruchom `mmcli -L` na dronie. Jeśli ModemManager go wyświetli, wybierz **Tradycyjny (PPP)**. Jeśli nie, a w **Sieciach** pojawi się nowy interfejs sieciowy, to modem HiLink.

## Konfiguracja modemu tradycyjnego

1. Włóż kartę SIM z transmisją danych i podłącz modem do komputera towarzyszącego.
2. Przejdź do **Modem**. Ustaw **Włącz modem** na **Tak**, a **Typ modemu** na **Tradycyjny (PPP)**.
3. Pozostaw **Nazwa Punktu Dostępu (Opcjonalne)** puste. UAVcast-Pro wykryje APN automatycznie.
4. Wpisz **Kod PIN (Opcjonalne)**, jeśli karta SIM go wymaga.
5. Poczekaj 30–90 sekund. Po połączeniu **Informacje o Modemie** pokaże operatora, technologię i **Informacje IPv4**.

Podłączony modem łączy się automatycznie. Jeśli wybierzesz **Rozłącz**, pozostanie rozłączony, dopóki ponownie nie połączysz go ręcznie, także po restarcie.

### Jak działa automatyczny APN

Gdy pole APN jest puste, UAVcast-Pro próbuje w tej kolejności:

1. APN, który zadziałał ostatnio z operatorem tej karty SIM,
2. domyślny APN sieci (pusty),
3. APN, z którym modem połączył się z LTE,
4. internetowe APN operatora z bazy dostawców szerokopasmowego internetu mobilnego.

Pierwszy, który uzyska adres internetowy, zostaje zapisany dla tego operatora. Po włożeniu karty SIM od innego operatora wykrywanie uruchamia się ponownie. Jeśli twój operator wymaga specjalnego APN (prywatnego, dla kart M2M lub firmowych), wpisz go ręcznie. Tylko ręcznie ustawiony APN jest wtedy wypróbowywany.

## Konfiguracja modemu HiLink

1. Podłącz modem. Poczekaj, aż dioda pokaże stabilne połączenie.
2. Na stronie **Modem** ustaw **Włącz modem** na **Tak**, a **Typ modemu** na **HiLink**.
3. Sprawdź **Informacje o modemie HiLink**: powinieneś zobaczyć **Interfejs** i **Adres IP**.

Modemy HiLink łączą się, wybierają sieć i ponownie łączą się samodzielnie, więc nie mają przycisków połączenia. Zmień APN, PIN lub tryb sieci na stronie webowej modemu (otwórz ją z sieci drona, często pod adresem `http://192.168.8.1`).

## Opis ustawień

| Ustawienie | Domyślnie | Wartości | Uwagi |
| --- | --- | --- | --- |
| **Włącz modem** | **Tak** | **Tak**, **Nie** |  |
| **Typ modemu** | **Tradycyjny (PPP)** | **HiLink**, **Tradycyjny (PPP)** |  |
| **Nazwa Punktu Dostępu (Opcjonalne)** | puste (**Automatyczny**) | APN od operatora | Tylko dla trybu tradycyjnego. |
| **Nazwa użytkownika (Opcjonalne)** / **Hasło (Opcjonalne)** | puste |  | Tylko dla trybu tradycyjnego. Większość operatorów nie wymaga żadnego z nich. |
| **Kod PIN (Opcjonalne)** | puste | PIN karty SIM | Tylko dla trybu tradycyjnego. Pozostaw puste, jeśli karta SIM nie ma kodu PIN. |

## Informacje o modemie

Dla modemów tradycyjnych **Informacje o Modemie** pokazuje **Jakość sygnału**, **Technologię** (LTE, UMTS …), **Wymagane odblokowanie**, **Stan**, **Producenta**, **IMEI**, sieć (**Operator**, **Kod**, **Rejestracja**), **Informacje IPv4** (**Adres IP**, **Brama**, **DNS**, **MTU**) oraz **Właściwości połączenia** (**APN**, **Typ IP**, **Roaming**).

Wiersz **Cellular** na **Panelu Głównym** pokazuje to samo podsumowanie sygnału.

## Przed lotem w sieci komórkowej

- Na stronie [Sieci](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/networks/) wybierz **Priorytet Modemu (tryb na zewnątrz)**, aby ruch pozostawał na modemie, gdy Wi-Fi jest jeszcze w zasięgu podczas startu.
- Użyj [VPN](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/vpn/): operatorzy komórkowi nie przydzielają dronowi adresu, pod którym stacja naziemna mogłaby go osiągnąć.
- Włącz **Failsafe GCS** na kontrolerze lotu.
- Sprawdź sygnał na wysokości: zasięg jest planowany pod kątem ziemi, a sygnał zmienia się podczas wznoszenia.

## Rozwiązywanie problemów

| Objaw | Co sprawdzić |
| --- | --- |
| *Brak połączonego modemu* | Modem nie jest wykrywany. Sprawdź połączenie USB i diodę zasilania modemu. Użyj zasilanego huba, jeśli Pi resetuje się po podłączeniu modemu. |
| **Wymagane odblokowanie** pokazuje *zablokowany* | Wpisz kod PIN karty SIM albo wyłącz PIN w telefonie. |
| Zarejestrowany, ale bez adresu IP | Zły APN. Wpisz APN operatora zamiast trybu automatycznego. |
| Łączy się, a potem rozłącza pod obciążeniem | Zwykle chodzi o zasilanie. Sprawdź wiersz **Power supply** na Panelu Głównym. |

**Dziennik Działań** pokazuje każdą próbę APN i powód niepowodzenia. Więcej pomocy znajdziesz w [Modem połączony, ale brak internetu](https://docs.uavmatrix.com/pl/troubleshooting/modem-no-internet/).

Source: https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/cellular-modem/
