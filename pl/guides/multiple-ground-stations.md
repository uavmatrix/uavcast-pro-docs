# Strumieniuj do wielu stacji naziemnych

> Wysyłaj telemetrię i wideo na żywo z jednego drona do kilku stacji QGroundControl lub Mission Planner z UAVcast-Pro, z obserwatorami tylko do odczytu.

Jeden dron, kilka ekranów: pilot na Mission Planner, operator ładunku na QGroundControl, supervisor obserwujący z biura. UAVcast-Pro wysyła telemetrię i wideo do każdego dodanego miejsca docelowego, a każde z nich ma własne przełączniki.

## Jak to działa

Każdy wpis w **Stacje Naziemne** to jedno miejsce docelowe: adres IPv4, port telemetrii i port wideo. UAVcast-Pro wysyła:

- telemetrię MAVLink przez UDP na **Port Telemetrii** (domyślnie 14550), gdy włączone jest **Włącz Telemetrię**,
- wideo H.264 przez RTP/UDP na **Port Wideo** (domyślnie 5600), gdy włączone jest **Włącz Wideo**,
- nic, gdy **Włącz Punkt Końcowy** jest wyłączone.

Polecenia z każdego miejsca docelowego trafiają do kontrolera lotu, chyba że to miejsce jest oznaczone jako **Read Only**.

## 1. Dodaj miejsce docelowe dla każdej stacji

1. Otwórz **Stacje Naziemne** i naciśnij **Dodaj Miejsce Docelowe** raz dla każdej stacji.
2. Nadaj każdej **Nazwę**, którą rozpoznasz w polu, na przykład *Pilot – Mission Planner* i *Ładunek – QGC*.
3. Wpisz adres IPv4 każdego komputera w **IP lub Host Docelowy**. Przez 4G używaj adresów VPN.
4. Włącz **Włącz Telemetrię** i **Włącz Wideo** tam, gdzie są potrzebne. Stacja, która potrzebuje tylko telemetrii, oszczędza pasmo, gdy wideo jest wyłączone.

![Strona Naziemna Stacja Kontroli z dwiema kartami miejsc docelowych i przyciskiem Dodaj Miejsce Docelowe](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/ground-control.webp)

*Naziemna Stacja Kontroli z dwiema kartami miejsc docelowych. Dodaj Miejsce Docelowe dodaje jedną kartę na stację.*

## 2. Ustaw obserwatorów jako tylko do odczytu

Dla każdego, kto ma tylko obserwować, a nigdy nie sterować, włącz **Read Only** w jego miejscu docelowym. Stacja nadal odbiera telemetrię na żywo, ale nie może niczego zmienić w pojeździe: polecenia, zmiany trybu, uzbrajanie, zapisy parametrów, zapisy misji i nadpisania RC są z niej blokowane. Dotyczy to UAVcast-Pro od wersji 6.5.3; we wcześniejszych wersjach Read Only nie blokuje zapisu parametrów. Oprogramowanie stacji naziemnej może pokazywać ostrzeżenia w tym trybie, ponieważ część jego żądań (na przykład pobieranie parametrów lub misji) pozostaje bez odpowiedzi.

> **Dwóch pilotów, jeden dron**
>
> Bez Read Only każda stacja może sterować dronem. Ustalcie, kto lata, i ustaw każdą inną stację jako tylko do odczytu.

## 3. Dwie stacje na jednym komputerze

Dwa programy na jednym komputerze nie mogą nasłuchiwać na tym samym porcie. Dodaj dwa miejsca docelowe z tym samym IP i różnymi portami, na przykład:

| Miejsce docelowe | Port Telemetrii | Port Wideo |
| --- | --- | --- |
| Mission Planner | 14550 | 5600 |
| QGroundControl | 14551 | 5603 |

Następnie ustaw drugi program na nasłuchiwanie na tych portach (w QGroundControl dodaj link komunikacyjny UDP na porcie 14551 i ustaw port UDP wideo na 5603).

Rozstaw porty wideo **co 3** (5600, 5603, 5606 …). Każde miejsce docelowe używa swojego portu wideo, plus port wideo + 1 dla drugiej kamery w [podwójnym strumieniu](https://docs.uavmatrix.com/pl/guides/dual-camera-rc-switching/) oraz port wideo + 2 dla [audio](https://docs.uavmatrix.com/pl/uavcast-pro/camera/audio/). Porty położone bliżej siebie kolidują, gdy tylko włączysz podwójny strumień lub audio.

## 4. Pilnuj łącza uplink

Każde miejsce docelowe wideo to osobna kopia strumienia. Trzy miejsca docelowe wideo przy 1500 kbps potrzebują około 4,5 Mbit/s uplinku z drona. Przez 4G wysyłaj wideo tylko do stacji, które go potrzebują, albo obniż bitrate w **Kamera → Ustawienia kamery**. **Panel Główny → Ruch Sieciowy** pokazuje, co faktycznie wysyła modem.

## 5. Sprawdź, czy każda stacja dostaje dane

Na **Panel Główny** wiersz **Stacja naziemna** pokazuje *Sending to n · x packets/s*. **Sprawdzenie połączenia** w **Kontroler Lotu → Połączenie** wymienia każde wyjście stacji naziemnej oraz każde miejsce docelowe pominięte, ponieważ jego adres jest nieprawidłowy.

## Z Fleet Manager

W Fleet Manager stacje naziemne dołączają do VPN organizacji, a Ty łączysz je z dronami za pomocą **Stream Bindings** na stronie **Network**. Każdy kolejny dron powiązany z tą samą stacją naziemną dostaje własny blok portów. Zobacz [Powiązania strumieni](https://docs.uavmatrix.com/pl/fleet-manager/network/stream-bindings/).

Source: https://docs.uavmatrix.com/pl/guides/multiple-ground-stations/
