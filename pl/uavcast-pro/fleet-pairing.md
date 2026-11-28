# Parowanie z Fleet Manager

> Połącz drona z UAVcast-Pro z UAVmatrix Fleet Manager: pobierz kod parowania na dronie, wpisz go w Fleet Manager, sprawdź połączenie, zmień nazwę albo rozparuj drona.

Parowanie łączy drona z UAVcast-Pro z Twoją organizacją w [UAVmatrix Fleet Manager](https://docs.uavmatrix.com/pl/fleet-manager/), panelu chmurowym do zarządzania flotą. Po sparowaniu dron utrzymuje zaszyfrowane połączenie z Fleet Manager, uwierzytelniane certyfikatem, i sam łączy się ponownie po restarcie lub zmianie sieci. Parowanie zaczynasz na dronie, a kończysz w Fleet Manager. Zajmuje to około dwóch minut.

## Zanim zaczniesz

- UAVcast-Pro z **aktywowaną licencją** na dronie. Bez niej parowanie zostanie odrzucone (*No valid license found. Please activate your license first.*).
- Użytkownik z rolą **admin** w UAVcast-Pro. **Fleet Management** jest ukryte dla użytkowników tylko do odczytu.
- Konto Fleet Manager z rolą **Owner** lub **Admin** w organizacji. Licencja drona musi należeć do członka tej organizacji.
- Internet na dronie, z dozwolonym ruchem wychodzącym TCP **8883** (MQTT przez TLS) i HTTPS (443).

## Sparuj drona

1. W interfejsie WWW drona przejdź do **Zarządzanie → Fleet Management**.
2. Wybierz **Connect to Fleet Manager**. Dron pobiera kod z Fleet Manager i pokazuje **Pairing Code** z odliczaniem **Expires in**, a następnie *Waiting for Manager to confirm pairing...*.
3. W drugiej karcie zaloguj się na [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) i przejdź do **Fleet → Pair Device**.
4. Wpisz kod z drona i sprawdź, czy dane urządzenia (nazwa hosta, architektura, wersja UAVcast-Pro) zgadzają się z dronem przed Tobą.
5. Dokończ kroki w Fleet Manager (wybór VPN i nazwa).
6. Na dronie strona przełączy się na **Fleet Connection** ze statusem **Connected**.

![Karta Connect to Fleet Manager z przyciskiem Connect to Fleet Manager](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/fleet--connect.webp)

*Zarządzanie → Fleet Management na dronie, który nie jest jeszcze sparowany. Wybranie **Connect to Fleet Manager** zastępuje tę kartę 8-cyfrowym **Pairing Code** i odliczaniem **Expires in**.*

> **Kod jest ważny przez 5 minut**
>
> Jeśli wygaśnie, zanim go wpiszesz, wybierz ponownie **Connect to Fleet Manager**, aby uzyskać nowy kod.

Część po stronie Fleet Manager, w tym organizacje, VPN i to, co zrobić z dronem po dodaniu do floty, opisano w [Dodaj pierwszego drona do Fleet Manager](https://docs.uavmatrix.com/pl/fleet-manager/pair-uav/).

## Po sparowaniu

Karta **Fleet Connection** pokazuje:

| Pole | Znaczenie |
| --- | --- |
| **Connected** / **Disconnected** | Czy dron właśnie komunikuje się z Fleet Manager. |
| **Device Name** | Nazwa widoczna w Fleet Manager. Edytujesz ją tutaj lub w Fleet Manager. *Managed by Fleet Manager* oznacza, że nazwa jest ustawiona w Fleet Manager. |
| **Hostname**, **Device ID** | Po czym Fleet Manager rozpoznaje ten dron. |
| **Manager URL** | Instancja Fleet Manager, z którą dron jest sparowany. |
| **Last Connected** | Kiedy dron ostatnio połączył się z Fleet Manager. |

Fleet Manager otrzymuje z drona telemetrię na żywo (pozycję, baterię, GPS, stan lotu), stan systemu UAVcast-Pro oraz możliwość zdalnego sterowania usługami. Miejsca docelowe stacji naziemnych, które Fleet Manager tworzy przez powiązania strumieni, pojawiają się na stronie [Stacje Naziemne](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/) z ikoną chmury.

Aby później dołączyć drona do VPN organizacji, użyj karty **Fleet Manager** na stronie [Sieć Prywatna VPN](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/vpn/).

## Rozparowanie

1. Przejdź do **Zarządzanie → Fleet Management**.
2. Wybierz **Disconnect from Fleet** i potwierdź.

To usuwa parowanie i certyfikaty drona. Aby ponownie użyć drona w Fleet Manager, sparuj go od nowa, nowym kodem. Usuń też drona z floty w Fleet Manager, żeby nie pozostał na liście jako offline.

## Rozwiązywanie problemów

| Objaw | Co sprawdzić |
| --- | --- |
| *No valid license found. Please activate your license first.* | Aktywuj licencję w **Aplikacja**. Zobacz [Licencja i aktywacja](https://docs.uavmatrix.com/pl/get-started/license-activation/). |
| Fleet Manager informuje, że licencja nie należy do członka organizacji | Licencja została kupiona na adres e-mail, który nie jest członkiem organizacji. Dodaj ten adres w Fleet Manager (zobacz [Licencje](https://docs.uavmatrix.com/pl/fleet-manager/licenses/)) albo zaproś to konto do organizacji. |
| Kod wygasł | Wybierz ponownie **Connect to Fleet Manager**. |
| Sparowany, ale status nadal **Disconnected** | Dron nie może dotrzeć do Fleet Manager na TCP 8883. Niektóre sieci to blokują. Sprawdź połączenie internetowe drona i zaporę. |

Więcej pomocy: [Kod parowania jest nieprawidłowy](https://docs.uavmatrix.com/pl/troubleshooting/pairing-code-invalid/) oraz [Dron offline w Fleet Manager](https://docs.uavmatrix.com/pl/troubleshooting/drone-offline-fleet-manager/).

Source: https://docs.uavmatrix.com/pl/uavcast-pro/fleet-pairing/
