# Interfejs webowy nie otwiera się

> Nie możesz otworzyć UAVcast-Pro pod adresem http://device-ip po instalacji? Znajdź właściwy adres, sprawdź usługę uavcast-web, port serwera i port 80.

Instalator zakończył pracę, ale `http://<device-ip>/` przekracza limit czasu, odrzuca połączenie albo pokazuje stronę innego programu.

| Co widzisz | Prawdopodobna przyczyna | Zacznij od |
| --- | --- | --- |
| Limit czasu albo strona nigdy się nie ładuje | Zły adres albo twój komputer jest w innej sieci | [Sprawdzenie 1](https://docs.uavmatrix.com/pl/troubleshooting/web-interface-wont-open/#check-1) |
| Połączenie odrzucone (connection refused) | Usługa webowa nie działa | [Sprawdzenie 2](https://docs.uavmatrix.com/pl/troubleshooting/web-interface-wont-open/#check-2) |
| Inna strona, na przykład nginx lub Apache | Port 80 jest używany przez inny program | [Sprawdzenie 3](https://docs.uavmatrix.com/pl/troubleshooting/web-interface-wont-open/#check-3) |
| Działało wcześniej, a przestało po zmianie ustawień | Zmieniono port serwera | [Sprawdzenie 4](https://docs.uavmatrix.com/pl/troubleshooting/web-interface-wont-open/#check-4) |
| Ładuje się, ale każda strona przenosi do Aplikacji | Na urządzeniu nie ma jeszcze aktywnej licencji | [Sprawdzenie 5](https://docs.uavmatrix.com/pl/troubleshooting/web-interface-wont-open/#check-5) |

## Sprawdzenie 1: Użyj właściwego adresu

Interfejs webowy działa domyślnie na **porcie 80**, więc adres to po prostu `http://<device-ip>/`.

1. Znajdź IP urządzenia. Instalator wypisuje je na końcu. Na urządzeniu możesz też uruchomić `hostname -I`.
2. Na Raspberry Pi z domyślną nazwą hosta spróbuj `http://raspberrypi.local/`.
3. Używaj `http://`, a nie `https://`. Interfejs webowy nie obsługuje HTTPS.
4. Upewnij się, że twój komputer jest w tej samej sieci co urządzenie albo w tym samym VPN. Przez 4G musisz użyć adresu VPN drona.

## Sprawdzenie 2: Czy usługa webowa działa?

Na urządzeniu uruchom:

```bash
sudo systemctl status uavcast-web
```

Powinno pokazać **active (running)**. Jeśli nie, uruchom ją i sprawdź, dlaczego się zatrzymała:

```bash
sudo systemctl restart uavcast-web
journalctl -u uavcast-web --since "1 hour ago"
```

Interfejs webowy potrzebuje też usług działających w tle. Sprawdź je w ten sam sposób: `uavcast-factory`, `mavlink-manager`, `uavcast-camera` i `redis-server`. Pełna lista znajduje się w [Usługi i pliki](https://docs.uavmatrix.com/pl/reference/services-and-files/).

## Sprawdzenie 3: Port 80 jest już zajęty

Jeśli na urządzeniu zainstalowano inny serwer WWW, może on zajmować port 80. Sprawdź, kto nasłuchuje:

```bash
sudo ss -ltnp | grep ':80 '
```

Zatrzymaj i wyłącz tamten serwer (na przykład `sudo systemctl disable --now nginx`), a następnie uruchom ponownie `uavcast-web`.

## Sprawdzenie 4: Zmieniono port serwera

**Aplikacja → Ustawienia → Port Serwera** przenosi interfejs webowy na inny port, a adres staje się `http://<device-ip>:<port>/`. Jeśli nie pamiętasz portu, odczytaj go na urządzeniu:

```bash
grep SERVER_PORT /etc/systemd/system/uavcast-web.service
```

## Sprawdzenie 5: Każda strona przechodzi do Aplikacji

To normalne, dopóki na urządzeniu nie jest aktywna licencja. Aktywuj ją w **Aplikacja → Menedżer Licencji**. Jeśli się nie uda, zobacz [Licencja nie aktywuje się](https://docs.uavmatrix.com/pl/troubleshooting/license-activation-failed/).

## Sprawdzenie 6: Instalator nie zakończył pracy

Jeśli `uavcast-web` nie istnieje (`Unit uavcast-web.service could not be found`), instalacja przerwała się wcześniej. Zobacz [Instalacja się nie udaje](https://docs.uavmatrix.com/pl/troubleshooting/installation-fails/).

## Nadal bez skutku?

Wyślij wynik `systemctl status uavcast-web` i `journalctl -u uavcast-web --since yesterday` oraz plik `/opt/uavcast-pro/installer.log` na **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Powiązane: [Zainstaluj UAVcast-Pro](https://docs.uavmatrix.com/pl/get-started/installation/) · [Ustawienia aplikacji](https://docs.uavmatrix.com/pl/uavcast-pro/application-settings/)

Source: https://docs.uavmatrix.com/pl/troubleshooting/web-interface-wont-open/
