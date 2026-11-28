# Zaproś zespół

> Zapraszaj pilotów, operatorów i klientów do swojej organizacji w Fleet Manager e-mailem, zmieniaj role, cofaj zaproszenia i przekazuj własność.

Każda osoba loguje się własnym kontem UAVmatrix i otrzymuje rolę w twojej organizacji: **Admin** lub **Viewer** (jest dokładnie jeden **Owner**). Fleet Manager nie ogranicza liczby członków, a członkowie nie zużywają licencji. Zobacz [Role i uprawnienia](https://docs.uavmatrix.com/pl/fleet-manager/team/roles-and-permissions/), aby poznać dokładnie, co może robić każda rola.

Wszystko to odbywa się na stronie **Team** (tytuł strony: **Team Management**). Owner i Admin mogą zarządzać członkami. Viewer widzi tylko listę członków.

![Strona Team Management z listą członków organizacji, ich rolami i oczekującymi zaproszeniami](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/team.webp)

*Team Management dla operatora z 13 członkami: jednym Owner, czterema Admin i ośmioma Viewer.*

## Zapraszanie członka

1. Na stronie **Team** wybierz **Invite Member**.
2. W oknie **Invite Team Member** wpisz **Email Address** osoby, wybierz **Organization** (jeśli zarządzasz więcej niż jedną) i **Role**: **Admin** lub **Viewer**.
3. Wybierz **Send Invitation**.

![Okno Invite Team Member z polami e-mail, organizacji i roli](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/team--invite.webp)

*Okno Invite Team Member z rolą ustawioną na Viewer dla kontaktu klienta.*

Fleet Manager wysyła e-mailem link z zaproszeniem. Zaproszenie widnieje w **Pending Invitations**, dopóki nie zostanie zaakceptowane, i wygasa po **7 dniach**. Nie możesz wysłać drugiego zaproszenia na adres, który ma już oczekujące zaproszenie: najpierw cofnij poprzednie.

> **Zapraszaj adresem e-mail, którym kupiono licencje**
>
> Jeśli ta osoba jest właścicielem licencji UAVcast-Pro dronów, które chcesz sparować, zaproś ją tym samym adresem e-mail, którego użyła w sklepie UAVmatrix. Fleet Manager dopasowuje właścicieli licencji do członków po e-mailu. Zobacz [Licencje](https://docs.uavmatrix.com/pl/fleet-manager/licenses/).

## Akceptowanie zaproszenia

Zaproszona osoba otwiera link z e-maila. Strona zaproszenia pokazuje organizację, **Invitation sent to** oraz **Your role** wraz z krótkim opisem tej roli.

- Jeśli jesteś już zalogowany: wybierz **Accept Invitation**.
- Jeśli nie jesteś zalogowany: wybierz **Sign In** w sekcji **Sign in to accept this invitation**. Nowi użytkownicy wybierają **Create Account**, co otwiera rejestrację UAVmatrix z wpisanym adresem e-mail, a następnie wracają do zaproszenia.

![Strona zaproszenia z nazwą organizacji, zaproszonym adresem, opisem roli i przyciskiem Accept Invitation](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/invite.webp)

*Strona zaproszenia widziana przez zaproszonego: Your role Viewer, dostęp tylko do odczytu dronów i danych floty oraz Accept Invitation.*

Jeśli strona pokazuje **Invitation Expired**, **Invitation Already Used** lub **Already a Member**, poproś Owner lub Admin o nowe zaproszenie albo po prostu się zaloguj.

## Zmiana roli członka

Otwórz menu obok członka i wybierz **Change Role → Admin** lub **Viewer**. Zmiana obowiązuje od razu; osoba może potrzebować przeładowania strony, aby ją zobaczyć. Admin może zmieniać role innych Admin. Nikt nie może zmienić roli Owner: w tym celu [przekaż własność](https://docs.uavmatrix.com/pl/fleet-manager/team/#transfer-ownership).

![Menu akcji członka z opcjami Change Role, Transfer Ownership i Remove Member](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/team--member-menu.webp)

*Menu członka otwarte przez Owner, z opcjami Change Role, Transfer Ownership i Remove Member.*

## Usuwanie członka lub cofanie zaproszenia

- **Usunięcie członka:** otwórz menu członka i wybierz **Remove Member**. Traci on dostęp od razu. Owner nie może zostać usunięty.
- **Cofnięcie zaproszenia:** w sekcji **Pending Invitations** wybierz **Revoke**. Link przestaje działać.

> **Brak kroku potwierdzenia**
>
> **Remove Member** i **Transfer Ownership** działają od razu po wybraniu. Sprawdź nazwę, zanim klikniesz.

Usunięcie członka nie wpływa na drony. Jeśli jednak ta osoba jest właścicielem licencji dronów, które chcesz sparować później, parowanie tych dronów się nie powiedzie, dopóki osoba nie zostanie ponownie członkiem.

## Przekazywanie własności

Tylko Owner może to zrobić. Otwórz menu członka, który ma przejąć organizację, i wybierz **Transfer Ownership**. Ten członek staje się **Owner**, a ty stajesz się **Admin**.

Skorzystaj z tego, gdy osoba zakładająca organizację odchodzi lub przed usunięciem konta UAVmatrix: Fleet Manager nie usunie konta, które nadal jest właścicielem organizacji.

## Współpraca z klientami i partnerami

Użytkownik może być członkiem dowolnej liczby organizacji, z inną rolą w każdej z nich. Typowe konfiguracje:

- **Dostawca usług:** twoi pracownicy są Admin w twojej organizacji. Każdy klient otrzymuje rolę Viewer, dzięki czemu może śledzić swoje loty na żywo na mapie.
- **Podwykonawca:** partner zaprasza twojego pilota jako Admin do swojej organizacji. Twój pilot przełącza się między obiema organizacjami przełącznikiem organizacji.

Source: https://docs.uavmatrix.com/pl/fleet-manager/team/
