# Kod parowania jest nieprawidłowy lub wygasł

> Napraw błędy Invalid pairing code, This pairing code has expired oraz License is not owned by any member of this organization podczas parowania drona z Fleet Manager.

Wpisujesz kod z UAVcast-Pro w kreatorze **Pair Device** w Fleet Manager, a kod został odrzucony.

Parowanie działa w tym kierunku: **UAVcast-Pro pokazuje kod, a ty wpisujesz go w Fleet Manager**. Kod ma 8 cyfr i jest ważny przez 5 minut.

![Kreator Pair UAV w Fleet Manager z komunikatem błędu This pairing code has expired](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/pair-device--code-expired.webp)

*Fleet Manager odrzuca kod: błąd pojawia się jako powiadomienie na kroku Pairing Code, tutaj This pairing code has expired.*

| Błąd w Fleet Manager | Przyczyna | Rozwiązanie |
| --- | --- | --- |
| **Pairing code must be 8 digits** / **Please enter a valid 8-digit code** | Za mało cyfr lub litery | [Sprawdzenie 1](https://docs.uavmatrix.com/pl/troubleshooting/pairing-code-invalid/#check-1) |
| **Invalid pairing code** | Literówka lub kod, który nigdy nie istniał | [Sprawdzenie 1](https://docs.uavmatrix.com/pl/troubleshooting/pairing-code-invalid/#check-1) |
| **This pairing code has expired** | Minęło więcej niż 5 minut | [Sprawdzenie 2](https://docs.uavmatrix.com/pl/troubleshooting/pairing-code-invalid/#check-2) |
| **This pairing code has already been used** | Kod został już użyty raz | [Sprawdzenie 2](https://docs.uavmatrix.com/pl/troubleshooting/pairing-code-invalid/#check-2) |
| **License is not owned by any member of this organization** | Licencja drona należy do konta spoza organizacji | [Sprawdzenie 3](https://docs.uavmatrix.com/pl/troubleshooting/pairing-code-invalid/#check-3) |
| **Invalid license key** / **License has expired** / **License has been refunded** | Licencja drona jest nieważna w sklepie | [Sprawdzenie 4](https://docs.uavmatrix.com/pl/troubleshooting/pairing-code-invalid/#check-4) |
| **This UAV is already paired to an organization** | Dron jest sparowany z inną organizacją | [Sprawdzenie 5](https://docs.uavmatrix.com/pl/troubleshooting/pairing-code-invalid/#check-5) |
| **Too many attempts. Please wait a minute and try again.** | Limit żądań po wielu próbach | Poczekaj minutę |

## Sprawdzenie 1: Wpisz aktualny kod

1. W UAVcast-Pro przejdź do **Fleet Management** i naciśnij **Connect to Fleet Manager**.
2. Skopiuj 8 cyfr widocznych pod **Pairing Code**.
3. W Fleet Manager przejdź do **Fleet → Pair Device**, wybierz organizację i wpisz kod w polu **Enter Pairing Code**.

## Sprawdzenie 2: Pobierz nowy kod

Kod jest ważny przez 5 minut i działa tylko raz. Gdy **Expires in** dojdzie do zera, naciśnij ponownie **Connect to Fleet Manager** w UAVcast-Pro, aby otrzymać nowy kod. Jeśli UAVcast-Pro w ogóle nie może pobrać kodu, pokazuje komunikat *Unable to connect to Fleet Manager. Please check your internet connection.*: najpierw napraw połączenie drona z internetem.

## Sprawdzenie 3: Licencja należy do osoby spoza organizacji

Fleet Manager akceptuje tylko drona, którego licencja UAVcast-Pro została kupiona przez członka organizacji, do której parujesz. Dopasowanie następuje po adresie e-mail konta w sklepie, które jest właścicielem licencji.

Napraw to na jeden z tych sposobów:

- Zaproś konto, które kupiło licencję, do organizacji (**Team**), a następnie sparuj ponownie.
- Sparuj z organizacją, w której właściciel licencji jest członkiem.
- Jeśli licencja została kupiona z innym twoim adresem e-mail, poproś **[support@uavmatrix.com](mailto:support@uavmatrix.com)** o dodanie tego adresu jako e-maila licencji do twojego użytkownika w Fleet Manager.

Zobacz [Licencje w Fleet Manager](https://docs.uavmatrix.com/pl/fleet-manager/licenses/).

## Sprawdzenie 4: Licencja nie jest ważna

Na dronie otwórz **Aplikacja → Menedżer Licencji** i sprawdź **License Status**. Wygasłą lub zwróconą licencję należy odnowić na [uavmatrix.com](https://uavmatrix.com/). Jeśli UAVcast-Pro nie ma aktywnej licencji, nie może zażądać kodu (*No valid license found. Please activate your license first.*): zobacz [Licencja nie aktywuje się](https://docs.uavmatrix.com/pl/troubleshooting/license-activation-failed/).

## Sprawdzenie 5: Już sparowany gdzie indziej

Dron należy do jednej organizacji. Aby go przenieść, najpierw usuń go ze starej organizacji. Ponowne parowanie do tej samej organizacji jest dozwolone i zachowuje historię drona. Zobacz [Usuwanie lub przenoszenie drona](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remove-or-transfer/).

## Nadal odrzucany?

Wyślij dokładny tekst błędu, nazwę hosta drona i nazwę organizacji na **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Powiązane: [Parowanie Fleet Manager w UAVcast-Pro](https://docs.uavmatrix.com/pl/uavcast-pro/fleet-pairing/) · [Sparuj pierwszego drona](https://docs.uavmatrix.com/pl/fleet-manager/pair-uav/)

Source: https://docs.uavmatrix.com/pl/troubleshooting/pairing-code-invalid/
