# Konfiguracja organizacji

> Zaloguj się do Fleet Manager swoim kontem UAVmatrix, utwórz organizację, do której należą twoje drony i zespół, oraz przełączaj, zmieniaj nazwę lub usuwaj ją.

Wszystko w Fleet Manager należy do organizacji: drony, misje, sieć VPN, powiązania strumieni i członkowie zespołu. Utwórz organizację, zanim sparujesz pierwszego drona.

## Logowanie

Fleet Manager nie ma osobnego hasła. Logujesz się swoim kontem UAVmatrix, tym samym, którego używasz na [uavmatrix.com](https://uavmatrix.com/) do kupowania i zarządzania licencjami UAVcast-Pro.

1. Przejdź na [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) i wybierz **Sign In** (lub **Get Started**).
2. Zaloguj się na stronie UAVmatrix, na którą zostaniesz przekierowany. Jeśli nie masz jeszcze konta, utwórz je tam.
3. Wrócisz do **Dashboard** w Fleet Manager.

> **Loguj się adresem e-mail, na który są licencje**
>
> Fleet Manager akceptuje dron tylko wtedy, gdy jego licencja UAVcast-Pro należy do członka organizacji, dopasowanego po e-mailu. Logowanie kontem, którym kupiłeś licencje, oszczędzi ci później zgłoszenia do wsparcia. Zobacz [Licencje](https://docs.uavmatrix.com/pl/fleet-manager/licenses/).

Dane profilu (imię, e-mail, hasło) zarządzane są w twoim koncie UAVmatrix, a nie w Fleet Manager. **Settings → Profile** zawiera link do tego konta.

## Tworzenie organizacji

1. Otwórz przełącznik organizacji u góry paska bocznego i wybierz **Create organization**. Jeśli nie masz jeszcze organizacji, strony takie jak **Fleet** i **Network** pokażą **No Organization Yet** z przyciskiem **Create Organization**.
2. Wpisz **Organization Name** (od 2 do 50 znaków), na przykład nazwę firmy lub „Survey Operations North”. Jeśli chcesz, dodaj **Description (optional)**.
3. Wybierz **Create**.

![Okno Create Organization z polami Organization Name i Description](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/onboarding--create-organization.webp)

*Okno Create Organization wypełnione nazwą firmy, na przykład Nordic Aerial Survey AS.*

Zostajesz **Owner** organizacji. Fleet Manager tworzy też w tle prywatną sieć VPN dla organizacji. Jest ona wyłączona, dopóki nie [włączysz VPN](https://docs.uavmatrix.com/pl/fleet-manager/network/).

> **Jedna organizacja na właściciela**
>
> Każdy użytkownik może utworzyć (i posiadać) jedną organizację. Jeśli spróbujesz utworzyć drugą, Fleet Manager odpowie **You already own an organization**. Nadal możesz być Admin lub Viewer w dowolnej liczbie innych organizacji, na przykład u klienta lub partnera.

## Przełączanie między organizacjami

Jeśli należysz do więcej niż jednej organizacji, przełącznik u góry paska bocznego wyświetla je w sekcji **Organizations**. Wybrana organizacja decyduje o tym, co pokazują **Fleet**, **Fleet Map**, **Missions**, **Network** oraz panel. Fleet Manager zapamiętuje twój wybór w tej przeglądarce.

![Otwarty przełącznik organizacji w pasku bocznym, z listą dwóch organizacji](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/dashboard--organization-switcher.webp)

*Otwarty przełącznik organizacji z listą Nordwind Aerial Services i Nordwind R&D Sandbox.*

## Zmiana nazwy lub usuwanie organizacji

Przejdź do **Settings → Organizations**. Karta zawiera organizacje, w których jesteś Owner lub Admin.

- **Zmiana nazwy lub opisu:** Owner lub Admin. Edytuj **Name** lub **Description** i wybierz **Save Changes**.
- **Usunięcie:** tylko Owner. Wybierz **Delete Organization** i potwierdź. Usuwa to wszystkie drony, ich historię telemetrii, misje, powiązania strumieni i członkostwa w zespole. Nie można tego cofnąć.

![Karta Organizations w Settings z nazwą, opisem i przyciskiem Delete Organization](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/settings--organizations.webp)

*Settings → Organizations dla Owner, z przyciskami Save Changes i Delete Organization.*

> **Odepnij drony przed usunięciem organizacji**
>
> Usunięcie organizacji nie informuje dronów. Będą one dalej próbować połączyć się ponownie, dopóki na każdym z nich nie wybierzesz **Disconnect from Fleet** w UAVcast-Pro. Najpierw usuń drony z ich strony UAV (zobacz [Usuwanie lub przenoszenie drona](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remove-or-transfer/)), aby Fleet Manager odłączył je za ciebie.

Jeśli zamiast tego chcesz przekazać organizację komuś innemu, [przekaż własność](https://docs.uavmatrix.com/pl/fleet-manager/team/#transfer-ownership).

## Następne kroki

- [Dodaj pierwszego drona](https://docs.uavmatrix.com/pl/fleet-manager/pair-uav/)
- [Zaproś zespół](https://docs.uavmatrix.com/pl/fleet-manager/team/)

Source: https://docs.uavmatrix.com/pl/fleet-manager/set-up-organization/
