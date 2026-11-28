# Fleet Manager

> UAVmatrix Fleet Manager śledzi każdego drona z UAVcast-Pro na jednej mapie na żywo, zapewnia zdalne sterowanie, misje, strumieniowanie przez VPN do stacji naziemnych oraz role w zespole.

UAVmatrix Fleet Manager to aplikacja webowa dostępna pod adresem [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/), służąca do zarządzania wieloma dronami z jednego miejsca. Każdy dron z UAVcast-Pro można sparować z twoją organizacją. Następnie widzisz go na mapie na żywo, otwierasz jego terminal, wysyłasz polecenia, przesyłasz misje i kierujesz jego wideo oraz telemetrię do stacji naziemnych, z których korzystają twoi piloci.

![Panel Fleet Manager z kartami statystyk, listą statusu UAV i ostatnią aktywnością](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/dashboard.webp)

*Dashboard: karty statystyk, lista UAV Status oraz Recent Activity od kilku członków zespołu.*

## Co możesz z nim zrobić

[Dodaj pierwszego dronaSparuj drona z UAVcast-Pro, używając 8-cyfrowego kodu, w około dwie minuty.](https://docs.uavmatrix.com/pl/fleet-manager/pair-uav/)[Śledź flotę na żywoKażdy dron na jednej mapie, ze wskaźnikami statusu, 5-minutowym śladem i trybem śledzenia.](https://docs.uavmatrix.com/pl/fleet-manager/map/)[Steruj dronami zdalnieTryby lotu, uzbrajanie i rozbrajanie, misje oraz kalibracja przed lotem z przeglądarki.](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remote-control/)[Strumieniuj do stacji naziemnychWysyłaj wideo i MAVLink z wielu dronów do QGroundControl lub Mission Planner przez VPN.](https://docs.uavmatrix.com/pl/fleet-manager/network/stream-bindings/)[Zaproś zespółRole Owner, Admin i Viewer w każdej organizacji.](https://docs.uavmatrix.com/pl/fleet-manager/team/)[Planuj misjeRysuj punkty trasy, zapisuj misje dla organizacji i przesyłaj je na dowolnego drona.](https://docs.uavmatrix.com/pl/fleet-manager/missions/)

## Jak to działa razem

Fleet Manager nigdy nie komunikuje się bezpośrednio z kontrolerem lotu. Robi to UAVcast-Pro na komputerze towarzyszącym drona i utrzymuje jedno szyfrowane połączenie z Fleet Manager:

1. **Parowanie.** UAVcast-Pro prosi Fleet Manager o kod parowania. Wpisujesz kod w Fleet Manager. Fleet Manager przekazuje wtedy dronowi jego własny certyfikat klienta.
2. **Kanał sterowania.** Dron łączy się z brokerem MQTT Fleet Manager przez TLS na porcie **8883**, uwierzytelniając się tym certyfikatem. Telemetria, heartbeaty, polecenia, sesje terminala i zdalny dostęp do interfejsu webowego UAVcast-Pro przechodzą wszystkie przez to połączenie. Działa przez NAT i sieci komórkowe, ponieważ dron zawsze łączy się na zewnątrz.
3. **Kanał danych (opcjonalny).** Wideo i MAVLink do stacji naziemnej są przesyłane peer-to-peer przez prywatną sieć VPN twojej organizacji, czyli sieć WireGuard obsługiwaną przez Fleet Manager. Bez VPN Fleet Manager nadal pokazuje i steruje dronem, ale nie kieruje strumieni.

## Pojęcia

| Pojęcie | Co oznacza w Fleet Manager |
| --- | --- |
| **Organization** | Twoja firma lub zespół. Drony, misje, sieć VPN i członkowie należą do jednej organizacji. Każdy użytkownik może być właścicielem jednej organizacji i członkiem dowolnej liczby innych. |
| **UAV** | Dron (lub łazik, łódź czy inny pojazd) z UAVcast-Pro, sparowany w danym momencie z jedną organizacją. Fleet Manager rozpoznaje go po identyfikatorze urządzenia, który UAVcast-Pro wylicza z numeru seryjnego procesora i dysku rozruchowego komputera towarzyszącego, dzięki czemu zachowuje tożsamość po restartach i zmianach sieci. |
| **Pairing** | Powiązanie UAV z organizacją za pomocą 8-cyfrowego kodu wyświetlanego przez UAVcast-Pro. Kod jest ważny przez 5 minut. |
| **Ground station (GCS)** | Laptop lub komputer PC z QGroundControl, Mission Planner lub podobnym programem, dołączony do VPN twojej organizacji, aby mógł odbierać strumienie. |
| **Stream binding** | Reguła mówiąca „wyślij wideo i telemetrię tego UAV do tej stacji naziemnej”. Każde powiązanie dostaje własne porty UDP, dzięki czemu jedna stacja naziemna może jednocześnie odbierać wiele dronów. |
| **Roles** | **Owner**, **Admin** lub **Viewer**, ustawiane dla każdej organizacji. Użytkownicy z rolą Viewer mogą tylko obserwować; role Admin i Owner mogą parować, sterować i konfigurować. Zobacz [Role i uprawnienia](https://docs.uavmatrix.com/pl/fleet-manager/team/roles-and-permissions/). |
| **Licenses and seats** | Każdy sparowany UAV wymaga aktywnej licencji UAVcast-Pro należącej do członka organizacji. Członkowie zespołu nie zużywają miejsc. Zobacz [Licencje](https://docs.uavmatrix.com/pl/fleet-manager/licenses/). |
| **Status and alerts** | Ostrzeżenia Online, Offline, brak MAVLink i GPS na mapie oraz na liście floty, a także ogłoszenia systemowe. Zobacz [Wskaźniki statusu i powiadomienia](https://docs.uavmatrix.com/pl/fleet-manager/alerts-and-status/). |

## Czego potrzebujesz

Fleet Manager jest dołączony do twojej licencji UAVcast-Pro: bez osobnej subskrypcji i bez dodatkowych miejsc.

> Fleet Manager jest w cenie licencji UAVcast-Pro. Każdy sparowany dron potrzebuje własnej licencji.
>
> [Kup UAVcast-Pro](https://uavmatrix.com/pl/checkout) · [Zobacz plany i ceny](https://uavmatrix.com/pl/products)

- Konto UAVmatrix (to samo, którego używasz na [uavmatrix.com](https://uavmatrix.com/) do kupowania licencji).
- Co najmniej jeden komputer towarzyszący z zainstalowanym UAVcast-Pro i aktywowaną licencją. Zobacz [Instalacja](https://docs.uavmatrix.com/pl/get-started/installation/) oraz [Aktywacja licencji](https://docs.uavmatrix.com/pl/get-started/license-activation/).
- Internet na dronie z otwartym wychodzącym HTTPS (443) i TCP **8883**.

## Zacznij tutaj

1. [Skonfiguruj swoją organizację](https://docs.uavmatrix.com/pl/fleet-manager/set-up-organization/)
2. [Dodaj pierwszego drona](https://docs.uavmatrix.com/pl/fleet-manager/pair-uav/)
3. [Połącz stację naziemną](https://docs.uavmatrix.com/pl/fleet-manager/connect-gcs/)
4. [Zaproś zespół](https://docs.uavmatrix.com/pl/fleet-manager/team/)

Source: https://docs.uavmatrix.com/pl/fleet-manager/
