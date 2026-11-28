# Licencjonowanie i aktywacja

> Jak kupić licencję UAVcast-Pro, aktywować ją na dronie, sprawdzić sloty urządzeń, odnowić ją i przenieść na nowe Raspberry Pi lub kartę SD przez wyrejestrowanie starego urządzenia.

UAVcast-Pro wymaga aktywowanego klucza licencyjnego na każdym dronie. Licencję kupujesz w sklepie UAVmatrix, wklejasz klucz w **Aplikacja → Menedżer Licencji** na dronie i wybierasz **Validate**. Każda licencja ma określoną liczbę slotów urządzeń. Aktywacja drona zajmuje jeden slot, a wyrejestrowanie go zwalnia slot dla innego drona.

> Do aktywacji drona potrzebujesz licencji UAVcast-Pro. Kup ją w sklepie UAVmatrix.
>
> [Kup UAVcast-Pro](https://uavmatrix.com/pl/checkout) · [Zobacz plany i ceny](https://uavmatrix.com/pl/products)

## Kup licencję

Licencje sprzedawane są na [uavmatrix.com/products](https://uavmatrix.com/products/). Każda licencja obejmuje aktualizacje przez cały okres oraz [Fleet Manager](https://docs.uavmatrix.com/pl/fleet-manager/), w tym jego VPN do łączenia się z dronem przez 4G.

| Plan | Sloty urządzeń | Ważna przez |
| --- | --- | --- |
| Basic | 1 | 1 rok |
| Silver | 2 | 1 rok |
| Gold | 4 | 2 lata |

Strona sklepu zawsze pokazuje aktualne plany i ceny. Nie ma darmowej licencji próbnej.

Po opłaceniu zamówienia otrzymasz e-mail z potwierdzeniem i **kluczem licencyjnym** złożonym z pięciu grup po cztery znaki.

Klucz znajdziesz też na swoim koncie w sklepie, w sekcji **Licenses**, wraz ze slotami urządzeń i datą wygaśnięcia.

> **Okres licencji zaczyna się od pierwszej aktywacji**
>
> Licencja kupiona dziś, a aktywowana za miesiąc, wygasa po jednym okresie od daty aktywacji, a nie od daty zakupu.

## Aktywuj licencję na dronie

Dron potrzebuje dostępu do internetu podczas aktywacji (przez Wi-Fi, Ethernet lub modem).

1. Otwórz interfejs web UAVcast-Pro. Nielicencjonowane urządzenie zawsze otwiera się na **Aplikacja**.
2. W **Menedżer Licencji** wklej klucz w pole **Enter License Key**.
3. Wybierz **Validate**. Zobaczysz *License activated successfully*, a reszta paska bocznego zostanie odblokowana.

![Menedżer Licencji UAVcast-Pro pokazujący aktywną licencję z zarejestrowaną nazwą, dozwoloną i pozostałą liczbą urządzeń, datą wygaśnięcia oraz tabelą aktywowanych urządzeń](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/application--license-activated.webp)

*Aplikacja → Menedżer Licencji po aktywacji. Bieżące urządzenie jest oznaczone jako Current w tabeli Activated Devices.*

**License Details** pokazuje:

| Pole | Znaczenie |
| --- | --- |
| **Registered Name** | Konto w sklepie, do którego należy licencja. |
| **License Status** | **Active**, **Inactive** lub **Expired**. |
| **Allowed Devices** | Łączna liczba slotów urządzeń. |
| **Remaining Devices** | Wolne sloty. |
| **Activation Date** / **Expiration Date** | Kiedy zaczął się okres licencji i kiedy się kończy. |

**Activated Devices** zawiera listę wszystkich dronów na tej licencji wraz z ich **Device Name**, **Hostname** i **Activation Date**. Dron, na którym jesteś, jest oznaczony jako **Current**. Wybierz **Edytuj**, aby nadać urządzeniu nazwę, którą łatwo rozpoznasz.

### Błędy aktywacji

| Komunikat | Co zrobić |
| --- | --- |
| *Maximum activations reached. Please deactivate another device first or upgrade your license.* | Wszystkie sloty są zajęte. [Wyrejestruj urządzenie](https://docs.uavmatrix.com/pl/get-started/license-activation/#unregister-a-device) lub dokup sloty. |
| *Invalid license key* | Sprawdź literówki i dodatkowe spacje. Skopiuj klucz z konta w sklepie. |
| *License already activated on this device* | Nic nie trzeba robić. To urządzenie ma już slot (na przykład po ponownej instalacji na tej samej karcie SD). |
| *Network error! Could not fetch license details…* | Urządzenie nie ma internetu. Sprawdź **Sieci** i spróbuj ponownie. |

## Jak sprawdzana jest licencja

- Dron sprawdza licencję na serwerze licencji UAVmatrix co **4 godziny**.
- Jeśli serwer jest nieosiągalny, dron zachowuje ostatni znany status. Możesz latać bez żadnego połączenia z internetem; nic się nie blokuje, gdy jesteś offline.
- Urządzenie jest identyfikowane po numerze seryjnym procesora i numerze seryjnym dysku rozruchowego (karty SD lub SSD). Ponowna instalacja na tym samym Pi i tej samej karcie zachowuje tożsamość i slot. Nowa karta SD lub SSD liczy się jako **nowe urządzenie**.
- Dane licencji na dronie są szyfrowane tą tożsamością, więc [kopia zapasowa bazy danych](https://docs.uavmatrix.com/pl/uavcast-pro/application-settings/#database) przywrócona na innym sprzęcie wymaga ponownej aktywacji licencji.

## Wyrejestruj urządzenie

Wyrejestrowanie natychmiast zwalnia slot. Możesz wyrejestrować **dowolne** urządzenie z tej licencji z **dowolnego** drona, na którym licencja jest aktywna, nie tylko z drona, przy którym się znajdujesz.

1. Przejdź do **Aplikacja → Menedżer Licencji → Activated Devices**.
2. Znajdź urządzenie i wybierz **Unregister**. Zobaczysz *Device unregistered successfully*.

Jeśli wyrejestrujesz dron, nad którym pracujesz, stanie się on nielicencjonowany, a interfejs web zablokuje się na stronie **Aplikacja**, dopóki nie aktywujesz klucza ponownie.

> **Nie możesz wyrejestrować urządzenia w sklepie**
>
> Sklep pokazuje zarejestrowane urządzenia, ale nie może ich usunąć. Wyrejestruj je w UAVcast-Pro na jednym z urządzeń tej licencji. Jeśli wszystkie urządzenia na licencji zostały utracone lub wyczyszczone, napisz na [support@uavmatrix.com](mailto:support@uavmatrix.com), podając klucz licencyjny.

## Przenieś na nowy sprzęt

Użyj tego, gdy wymieniasz Pi, zamieniasz kartę SD albo przenosisz urządzenie ze stanowiska testowego do samolotu.

1. Na **starym** urządzeniu przejdź do **Aplikacja → Menedżer Licencji** i wybierz **Unregister** obok niego. Zrób to przed wyczyszczeniem karty.
2. Zainstaluj UAVcast-Pro na nowym sprzęcie. Zobacz [Instalacja](https://docs.uavmatrix.com/pl/get-started/installation/).
3. Aktywuj ten sam klucz na nowym urządzeniu.

Jeśli stare urządzenie nie działa, wyrejestruj je z innego drona na tej samej licencji lub skontaktuj się z pomocą techniczną.

## Odnów lub ulepsz

W swoim koncie w sklepie otwórz licencję i wybierz **Upgrade Options**:

- **Extend subscription** dodaje kolejny okres. Jeśli licencja jest nadal ważna, nowy okres dolicza się do obecnej daty wygaśnięcia; jeśli wygasła, zaczyna się od daty odnowienia. Klucz pozostaje ten sam.
- **Add devices** dodaje sloty do licencji. Wygasłą licencję trzeba najpierw odnowić.
- **Upgrade tier** przenosi licencję na plan z większą liczbą slotów.

Dron pobierze nową datę wygaśnięcia i sloty przy następnym sprawdzeniu, w ciągu 4 godzin. Aby odświeżyć je od razu, wybierz **Change** w **Menedżer Licencji**, wpisz ten sam klucz i wybierz **Validate**.

## Gdy licencja wygasa

> **Wygasła licencja blokuje UAVcast-Pro**
>
> Gdy licencja wygasa, UAVcast-Pro nie może być już używany na żadnym z jej dronów. Nie działa dalej na zainstalowanej wersji.

Gdy serwer licencji zgłasza wygaśnięcie, dron oznacza się jako nielicencjonowany: interfejs web otwiera tylko **Aplikacja**, a telemetria, wideo, NTRIP i Dynamiczny DNS zatrzymują się przy następnym restarcie ich usług. Odnów licencję przed datą wygaśnięcia, aby uniknąć przestoju, a potem zweryfikuj klucz na dronie (lub poczekaj na jego następne sprawdzenie, w ciągu 4 godzin), aby odblokować system.

## Licencje a Fleet Manager

Fleet Manager jest dołączony do licencji UAVcast-Pro i korzysta z tej samej licencji. Dron można sparować z organizacją tylko wtedy, gdy jego licencja należy do członka tej organizacji. Jeśli kupiłeś licencję na inny adres e-mail niż ten, którego używasz do logowania się do Fleet Manager, dodaj ten e-mail w Fleet Manager (zobacz [Licencje w Fleet Manager](https://docs.uavmatrix.com/pl/fleet-manager/licenses/)). Zobacz [Sparuj dron z Fleet Manager](https://docs.uavmatrix.com/pl/uavcast-pro/fleet-pairing/).

Problemy z aktywacją: zobacz [Aktywacja licencji nie powiodła się](https://docs.uavmatrix.com/pl/troubleshooting/license-activation-failed/).

Source: https://docs.uavmatrix.com/pl/get-started/license-activation/
