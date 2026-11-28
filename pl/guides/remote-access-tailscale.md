# Zdalny dostęp przez Tailscale

> Połącz się z dronem przez LTE za pomocą Tailscale i UAVcast-Pro bez przekierowania portów: zaloguj się przez URL lub klucz uwierzytelniania, dodaj laptop jako GCS i wyłącz wygasanie kluczy.

Tailscale to VPN oparty na WireGuard. Jeśli Twój zespół już z niego korzysta, to najszybszy sposób, aby dotrzeć do drona przez 4G: dron i laptop dołączają do tego samego tailnetu i komunikują się przez adresy `100.x.y.z`.

Nie masz tailnetu? VPN Fleet Manager, dołączony do Twojej licencji, robi to samo bez konta Tailscale: zobacz [Lot poza zasięgiem wzroku przez 4G](https://docs.uavmatrix.com/pl/guides/bvlos-4g/) i [Wdrożenie floty](https://docs.uavmatrix.com/pl/guides/fleet-onboarding/).

**Potrzebujesz:** UAVcast-Pro z dostępem do internetu na dronie (Wi-Fi lub modem), konta Tailscale i klienta Tailscale na laptopie.

## 1. Zaloguj drona do Tailscale

1. W UAVcast-Pro otwórz **Sieć Prywatna VPN**.

2. Ustaw **Włącz VPN** na **Tak**, a **Usługi** na **Tailscale**.

3. Wybierz sposób logowania:

   - **Web Login**: naciśnij **Wygeneruj URL logowania**, potem **Uwierzytelnij to urządzenie** i zaloguj się kontem Tailscale na stronie, która się otworzy.
   - **Auth Key**: utwórz klucz uwierzytelniania w konsoli administracyjnej Tailscale, wklej go w pole **Auth Key**, opcjonalnie ustaw **Nazwa hosta (Opcjonalne)** i naciśnij **Połącz używając klucza**. Użyj tego, gdy konfigurujesz drony dla kogoś innego lub wiele naraz.

4. Poczekaj na **Połączono**. Zanotuj **IPv4 Address** (100.x.y.z).

![Strona Sieć Prywatna VPN z Włącz VPN ustawionym na Tak, usługą Tailscale, zakładkami Fleet Manager, Web Login i Auth Key oraz informacją VPN pokazującą Not Connected](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/private-network.webp)

*Sieć Prywatna VPN z usługą Tailscale przed zalogowaniem drona (Not Connected). Po zalogowaniu VPN Information pokazuje szczegóły połączenia.*

> **Wyłącz wygasanie kluczy dla dronów**
>
> Klucze urządzeń Tailscale wygasają, a dron z wygasłym kluczem wypada z tailnetu, dopóki ktoś ponownie go nie zaloguje. Pole **Expires** pokazuje, kiedy to nastąpi. W konsoli administracyjnej Tailscale wyłącz wygasanie kluczy dla dronów, które wdrażasz.

## 2. Połącz laptop z tym samym tailnetem

Zainstaluj Tailscale na laptopie i zaloguj się tym samym kontem lub tailnetem. Uruchom `tailscale status`: dron musi znajdować się na liście. Następnie:

```bash
ping <drone tailscale ip>
```

Otwórz interfejs webowy drona pod adresem `http://<drone tailscale ip>/`.

## 3. Wysyłaj telemetrię i wideo do laptopa

1. W UAVcast-Pro przejdź do **Stacje Naziemne** i naciśnij **Dodaj Miejsce Docelowe**.
2. W polu **IP lub Host Docelowy** wpisz adres Tailscale IPv4 **laptopa** (uruchom `tailscale ip -4` na laptopie).
3. Włącz **Włącz Telemetrię** i **Włącz Wideo**.
4. Zezwól na przychodzący UDP 14550 i 5600 w zaporze laptopa. Windows często traktuje adapter Tailscale jako sieć publiczną.

Otwórz QGroundControl lub Mission Planner. Telemetria dociera na UDP 14550, a wideo na UDP 5600.

## 4. Sprawdź jakość połączenia

Pole **Relay** na stronie **Sieć Prywatna VPN** pokazuje, czy ruch przechodzi przez przekaźnik Tailscale. Ścieżka przez przekaźnik działa, ale dodaje opóźnienie. Niektórzy operatorzy komórkowi nie pozwalają na bezpośrednie połączenia, więc przetestuj połączenie u operatora, z którym lecisz.

## Rozwiązywanie problemów

- Nie możesz pingować drona: [VPN połączony, ale nie można dotrzeć do drona](https://docs.uavmatrix.com/pl/troubleshooting/vpn-cant-reach-drone/)
- Ping działa, brak telemetrii: [Brak telemetrii w stacji naziemnej](https://docs.uavmatrix.com/pl/troubleshooting/no-telemetry-in-gcs/)
- Jeśli dron zostanie później sparowany z Fleet Manager i wybierzesz **Replace existing VPN with Fleet Manager network**, opuści on Twój tailnet i dołączy do sieci organizacji.

Source: https://docs.uavmatrix.com/pl/guides/remote-access-tailscale/
