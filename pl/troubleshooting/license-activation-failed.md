# Licencja UAVcast-Pro nie aktywuje się

> Napraw błędy Invalid license key, Maximum activations reached i License activation failed w UAVcast-Pro: klucz, internet, wolne miejsca i wymieniony sprzęt.

Wpisujesz klucz w **Aplikacja → Menedżer Licencji**, naciskasz **Validate** i dostajesz błąd zamiast **License activated successfully**. Dopóki na tym urządzeniu nie jest aktywna licencja, każda strona odsyła Cię do **Aplikacja**.

> Do aktywacji drona potrzebujesz licencji UAVcast-Pro. Kup ją w sklepie UAVmatrix.
>
> [Kup UAVcast-Pro](https://uavmatrix.com/pl/checkout) · [Zobacz plany i ceny](https://uavmatrix.com/pl/products)

![Strona Aplikacja, Menedżer Licencji z polem klucza licencyjnego, License Details i tabelą Activated Devices](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/application--license-activated.webp)

*Aplikacja → Menedżer Licencji na aktywowanym urządzeniu: License Details i tabela Activated Devices, z tym urządzeniem oznaczonym jako Current.*

| Co widzisz | Prawdopodobna przyczyna | Zacznij od |
| --- | --- | --- |
| Invalid license key lub Invalid license key format | Literówka, dodatkowe spacje lub klucz do innego produktu | [Sprawdzenie 1](https://docs.uavmatrix.com/pl/troubleshooting/license-activation-failed/#check-1) |
| Maximum activations reached | Wszystkie miejsca na urządzenia w kluczu są zajęte | [Sprawdzenie 2](https://docs.uavmatrix.com/pl/troubleshooting/license-activation-failed/#check-2) |
| Działało wcześniej, a pyta ponownie po nowej karcie SD lub nowej płytce | Urządzenie liczy się jako nowe | [Sprawdzenie 3](https://docs.uavmatrix.com/pl/troubleshooting/license-activation-failed/#check-3) |
| License activation failed albo nic się nie dzieje | Brak internetu lub zły czas na urządzeniu | [Sprawdzenie 4](https://docs.uavmatrix.com/pl/troubleshooting/license-activation-failed/#check-4) |
| Cannot connect to license service | Usługa działająca w tle UAVcast-Pro nie jest uruchomiona | [Sprawdzenie 5](https://docs.uavmatrix.com/pl/troubleshooting/license-activation-failed/#check-5) |
| License Status: Expired | Licencja czasowa wygasła | [Sprawdzenie 6](https://docs.uavmatrix.com/pl/troubleshooting/license-activation-failed/#check-6) |

## Sprawdzenie 1: Sam klucz

1. Skopiuj klucz z e-maila z zamówieniem albo z konta na [uavmatrix.com](https://uavmatrix.com/) i wklej go w pole **License Key**. Ręczne przepisywanie to najczęstsze źródło błędów.
2. Upewnij się, że przed i za kluczem nie ma spacji.
3. Naciśnij **Validate**.

## Sprawdzenie 2: Zwolnij miejsce na urządzenie

Każda licencja pozwala na stałą liczbę urządzeń (**Allowed Devices**). Gdy **Remaining Devices** wynosi 0, aktywacja kończy się błędem **Maximum activations reached. Please deactivate another device first or upgrade your license.**

1. Na dowolnym urządzeniu, na którym licencja jest aktywna, otwórz **Aplikacja → Menedżer Licencji → Activated Devices**.
2. Znajdź urządzenie, którego już nie używasz, i naciśnij **Unregister**. Miejsce zwalnia się od razu.
3. Aktywuj nowe urządzenie.

Jeśli nie masz dostępu do żadnego aktywowanego urządzenia, napisz na **[support@uavmatrix.com](mailto:support@uavmatrix.com)** z kluczem licencyjnym, a pomogą zwolnić miejsce. Aby dodać miejsca, kup więcej urządzeń dla licencji na [uavmatrix.com](https://uavmatrix.com/).

## Sprawdzenie 3: Wymieniono kartę SD lub płytkę

Licencja jest powiązana ze sprzętem, w tym z nośnikiem pamięci. Nowa karta SD, nowy dysk SSD lub nowa płytka liczy się jako nowe urządzenie i zajmuje nowe miejsce. Wyrejestruj stary wpis w **Activated Devices** przed przeniesieniem lub po nim, jak w sprawdzeniu 2. **License already activated on this device** nie jest błędem: klucz był już tu aktywny.

## Sprawdzenie 4: Dostęp do internetu i czas

Aktywacja łączy się z serwerem licencji UAVmatrix przez HTTPS (port 443), więc urządzenie musi w tym momencie mieć działający internet.

1. Na urządzeniu uruchom `curl -I https://uavmatrix.com`. Powinieneś dostać odpowiedź HTTP, a nie przekroczenie czasu.
2. Jeśli korzystasz z modemu komórkowego, sprawdź, czy faktycznie ma internet: [Modem połączony, brak internetu](https://docs.uavmatrix.com/pl/troubleshooting/modem-no-internet/).
3. Sprawdź datę poleceniem `date`. Urządzenie z błędnym zegarem nie otworzy połączeń HTTPS. Płytki bez zegara czasu rzeczywistego ustawiają czas z internetu po starcie, więc odczekaj minutę po uruchomieniu i spróbuj ponownie.

## Sprawdzenie 5: Nie można połączyć się z usługą licencji

Ten komunikat oznacza, że interfejs webowy nie może połączyć się z własną usługą działającą w tle UAVcast-Pro, a nie z internetem. Uruchom ją ponownie i spróbuj jeszcze raz:

```bash
sudo systemctl restart uavcast-factory
sudo systemctl status uavcast-factory
```

Jeśli usługa nie utrzymuje statusu **active (running)**, [zbierz logi](https://docs.uavmatrix.com/pl/troubleshooting/collect-logs/) z zaznaczonym **License Manager**.

## Sprawdzenie 6: Wygasła licencja

Szczegóły licencji pokazują **License Status:** i **Expiration Date:**. Wygasłą licencję trzeba odnowić na [uavmatrix.com](https://uavmatrix.com/).

> **64-bitowy system operacyjny**
>
> UAVcast-Pro v6 działa tylko na 64-bitowym systemie. Jeśli dotarłeś tak daleko, system jest w porządku. Na systemie 32-bitowym instalator już wcześniej zatrzymuje się z komunikatem *No installation candidate*.

## Nadal nie działa?

[Pobierz logi](https://docs.uavmatrix.com/pl/troubleshooting/collect-logs/) z zaznaczonym **License Manager**. Zawierają kod odpowiedzi z serwera licencji, na przykład `code 550` przy braku wolnych miejsc. Wyślij je wraz z pierwszymi i ostatnimi czterema znakami klucza na **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Korzystasz z Fleet Manager? Licencja, która aktywuje się poprawnie, może zostać odrzucona przy parowaniu. Zobacz [Kod parowania nieprawidłowy lub wygasły](https://docs.uavmatrix.com/pl/troubleshooting/pairing-code-invalid/).

Powiązane: [Aktywuj licencję](https://docs.uavmatrix.com/pl/get-started/license-activation/)

Source: https://docs.uavmatrix.com/pl/troubleshooting/license-activation-failed/
