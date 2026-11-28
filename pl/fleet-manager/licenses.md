# Licencje i miejsca

> Jak licencje UAVcast-Pro i sloty urządzeń decydują, które drony możesz sparować w Fleet Manager, oraz jak używać licencji kupionych na innym adresie e-mail.

Fleet Manager jest dołączony do twojej licencji UAVcast-Pro. Nie ma własnej subskrypcji, miejsc ani planów. To, co możesz sparować, zależy od twoich licencji UAVcast-Pro z [sklepu UAVmatrix](https://uavmatrix.com/):

- **Drony:** każdy sparowany dron działa z UAVcast-Pro i aktywowaną licencją. Każda aktywacja zajmuje jeden ze slotów **Device Slots** licencji w sklepie („2 of 5 device slots used”). Potrzebujesz więcej dronów? Kup więcej licencji lub slotów. **Fleet → Need more devices? → View Plans** przenosi cię do sklepu.
- **Członkowie zespołu:** bezpłatnie. Fleet Manager nie ogranicza liczby zapraszanych osób, a członkowie nie potrzebują własnej licencji.

> Fleet Manager jest w cenie licencji UAVcast-Pro. Każdy sparowany dron potrzebuje własnej licencji.
>
> [Kup UAVcast-Pro](https://uavmatrix.com/pl/checkout) · [Zobacz plany i ceny](https://uavmatrix.com/pl/products)

## Co Fleet Manager sprawdza przy parowaniu

Po wpisaniu kodu parowania Fleet Manager wyszukuje licencję aktywowaną na tym dronie i sprawdza, czy:

1. licencja istnieje, jest aktywna, nie wygasła i nie została zwrócona, oraz
2. jej **adres e-mail właściciela** (konto w sklepie, które ją kupiło) należy do **członka organizacji**, do której parujesz drona, w dowolnej roli.

Jeśli oba warunki są spełnione, dron zostaje sparowany. Fleet Manager sprawdza to ponownie za każdym razem, gdy dron jest parowany ponownie.

| Komunikat w kreatorze parowania | Znaczenie |
| --- | --- |
| **License is not owned by any member of this organization** | Licencja należy do konta w sklepie, którego e-mail nie jest tutaj członkiem. |
| **License has expired** | Termin ważności licencji minął. |
| **License has been refunded** | Licencja została zwrócona. |
| **Invalid license key** | Sklep nie zna licencji na dronie. Sprawdź aktywację w UAVcast-Pro. |

Licencja jest też sprawdzana wcześniej, gdy UAVcast-Pro prosi o kod parowania. Jeśli UAVcast-Pro zamiast kodu pokazuje **Invalid or inactive license**, licencja wygasła, została zwrócona lub nie jest powiązana z kontem w sklepie.

Problemy z aktywacją na samym dronie opisują [Aktywacja licencji](https://docs.uavmatrix.com/pl/get-started/license-activation/) oraz [Licencja się nie aktywuje](https://docs.uavmatrix.com/pl/troubleshooting/license-activation-failed/).

## Kto powinien być właścicielem licencji

Fleet Manager dopasowuje licencje po adresie e-mail, więc zaplanuj, kto kupuje:

- **Najprościej:** Owner organizacji kupuje wszystkie licencje na adres e-mail, którym loguje się do Fleet Manager.
- **Kilku kupujących:** liczą się licencje każdego członka, także z rolą Viewer. Kupujący współpracownik może mieć rolę Viewer.
- **Drony należące do klienta:** jeśli klient kupił licencje, zaproś jego adres e-mail ze sklepu do swojej organizacji (wystarczy rola Viewer).

## Licencje kupione na inny adres e-mail

Częsty przypadek: licencje kupiono na `purchasing@company.com`, ale pilot loguje się do Fleet Manager jako `anna@company.com`. Parowanie kończy się błędem **License is not owned by any member of this organization**.

Masz dwa sposoby, aby to naprawić:

1. **Zaproś adres kupujący** do organizacji. To konto musi zalogować się raz, aby zaakceptować zaproszenie.
2. **Poproś wsparcie UAVmatrix o dodanie e-maila licencyjnego** do twojego konta. Wsparcie może dodać jeden lub więcej dodatkowych adresów do użytkownika Fleet Manager. Licencje należące do któregokolwiek z tych adresów są wtedy przy parowaniu liczone jako licencje tego użytkownika we wszystkich organizacjach, do których użytkownik należy.

Aby o to poprosić, otwórz zgłoszenie z dymka wsparcia (kategoria **General Inquiry**) lub wyślij e-mail na [support@uavmatrix.com](mailto:support@uavmatrix.com) z adresu, na który się logujesz, i podaj pozostałe adresy, na które kupiono licencje. Zobacz [Wsparcie](https://docs.uavmatrix.com/pl/fleet-manager/support/).

Warto wiedzieć:

- Adresy e-mail są dopasowywane bez względu na wielkość liter.
- Każdy dodatkowy adres może należeć tylko do jednego użytkownika Fleet Manager.
- Tylko wsparcie UAVmatrix może dodawać lub usuwać te adresy. Nie pojawiają się w twoich ustawieniach.
- Licencje pozostają w oryginalnym koncie w sklepie. Zmienia się tylko to, kogo Fleet Manager traktuje jako właściciela przy parowaniu.

## Przenoszenie licencji między dronami

Licencja jest aktywowana dla każdego urządzenia w UAVcast-Pro, a nie w Fleet Manager. Aby ją przenieść, zwolnij slot urządzenia w UAVcast-Pro lub w sklepie, aktywuj ją na nowym dronie, a następnie [sparuj nowego drona](https://docs.uavmatrix.com/pl/fleet-manager/pair-uav/). Zobacz [Wymiana komputera towarzyszącego](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remove-or-transfer/#replace-the-companion-computer).

Source: https://docs.uavmatrix.com/pl/fleet-manager/licenses/
