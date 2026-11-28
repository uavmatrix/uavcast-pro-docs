# VPN połączony, ale nie można dotrzeć do drona

> Fleet Manager VPN, Tailscale lub ZeroTier pokazuje połączenie, ale nie możesz pingować drona? Sprawdź autoryzację, sieć lub tailnet, internet i adres IP stacji naziemnej.

Zarówno dron, jak i twój laptop mówią, że są w VPN, ale `ping` na adres VPN drona przekracza limit czasu, interfejs webowy nie otwiera się przez VPN albo telemetria i wideo nie docierają.

| Co widzisz | Prawdopodobna przyczyna | Zacznij od |
| --- | --- | --- |
| Sieć ZeroTier pokazuje ACCESS_DENIED lub nie ma adresu IP | Dron nie jest autoryzowany w sieci | [Sprawdzenie 1](https://docs.uavmatrix.com/pl/troubleshooting/vpn-cant-reach-drone/#check-1) |
| Dron jest w porządku, laptop nie dostaje adresu lub dostaje zły | Laptop dołączył do innej sieci lub tailnetu | [Sprawdzenie 2](https://docs.uavmatrix.com/pl/troubleshooting/vpn-cant-reach-drone/#check-2) |
| Tailscale działał przez tygodnie, a potem przestał | Wygasł klucz urządzenia | [Sprawdzenie 3](https://docs.uavmatrix.com/pl/troubleshooting/vpn-cant-reach-drone/#check-3) |
| VPN na dronie nigdy nie łączy się w terenie | Dron nie ma internetu przez modem | [Sprawdzenie 4](https://docs.uavmatrix.com/pl/troubleshooting/vpn-cant-reach-drone/#check-4) |
| Ping działa, ale brak telemetrii lub wideo | Miejsce docelowe stacji naziemnej używa błędnego IP | [Sprawdzenie 5](https://docs.uavmatrix.com/pl/troubleshooting/vpn-cant-reach-drone/#check-5) |

## Sprawdzenie 1: Autoryzuj drona w sieci

**ZeroTier:**

1. W UAVcast-Pro otwórz **Sieć Prywatna VPN**. Sprawdź, czy **Włącz VPN** jest na **Tak**, **Usługi** to **ZeroTier**, a **ID Sieci** to ten z twojego kontrolera ZeroTier.
2. Spójrz na swoją sieć pod **Connected Networks**. Jeśli jej odznaka statusu pokazuje **ACCESS_DENIED**, dron dołączył, ale nie jest autoryzowany.
3. W kontrolerze ZeroTier otwórz sieć i autoryzuj członka z node ID drona.
4. Wróć do UAVcast-Pro i poczekaj, aż sieć pokaże status `OK` i adres IP. To jest adres, którego używasz z laptopa.

W prywatnej sieci ZeroTier każde urządzenie, które dołącza (dron, laptop, tablet), musi zostać raz autoryzowane w kontrolerze, zanim dostanie adres. (Sieci UAVnet też są prywatne; UAVnet jest wycofywany, więc przejdź na Fleet Manager VPN.)

**Tailscale:** dron pokazuje **Połączono** z **IPv4 Address** (100.x.y.z), gdy jest w sieci. Jeśli pokazuje **Nie połączono**, użyj **Web Login → Generate Login URL** albo zakładki **Klucz Auth** z kluczem z konsoli administracyjnej Tailscale.

## Sprawdzenie 2: Ustaw laptop w tej samej sieci

Oba końce muszą być w tej samej sieci ZeroTier albo w tym samym tailnecie.

- **ZeroTier**: na laptopie dołącz do tego samego Network ID i autoryzuj laptop także w kontrolerze. W Windows sprawdź ikonę ZeroTier w zasobniku; w Linuksie uruchom `sudo zerotier-cli listnetworks`. Status musi być `OK`.
- **Tailscale**: klient Tailscale jest w danym momencie tylko w jednym tailnecie. Na laptopie uruchom `tailscale status`. Dron musi znajdować się na liście. Jeśli nie, laptop jest zalogowany na innym koncie lub w innym tailnecie.
- **Fleet Manager VPN**: jeśli dron został sparowany z Fleet Manager i VPN, jest w sieci twojej organizacji, a nie w twoim osobistym Tailscale. Połącz laptop poleceniem, jakie Fleet Manager podaje w sekcji **Network** (`tailscale up --login-server=… --authkey=…`), i uruchom je **na laptopie, nigdy na dronie**. Zobacz [Połączenie stacji naziemnej](https://docs.uavmatrix.com/pl/fleet-manager/connect-gcs/).

> **Parowanie może zastąpić VPN drona**
>
> Gdy sparujesz drona w Fleet Manager z opcją **Replace existing VPN with Fleet Manager network**, dron opuszcza obecną sieć Tailscale i dołącza do sieci organizacji. Laptopy w starym tailnecie nie mogą już się z nim połączyć.

## Sprawdzenie 3: Wygasły klucz Tailscale

Klucze urządzeń Tailscale wygasają. Gdy klucz drona wygaśnie, dron znika z tailnetu, dopóki się ponownie nie zaloguje. Pole **Expires** na stronie **Sieć Prywatna VPN** pokazuje datę. W konsoli administracyjnej Tailscale możesz wyłączyć wygasanie klucza dla drona, aby nie zniknął w środku projektu.

## Sprawdzenie 4: Dron najpierw potrzebuje internetu

VPN działa przez własne połączenie internetowe drona. Jeśli modem nie ma internetu, VPN pokazuje się jako rozłączony albo nigdy nie dostaje adresu. Najpierw napraw połączenie: [Modem połączony, brak internetu](https://docs.uavmatrix.com/pl/troubleshooting/modem-no-internet/).

## Sprawdzenie 5: Osiągalny, ale bez danych

Jeśli `ping <drone-vpn-ip>` działa:

- **Interfejs webowy**: otwórz `http://<drone-vpn-ip>/`. Podgląd na żywo wymaga też, aby port 8889 był dostępny przez VPN.
- **Telemetria i wideo**: są wysyłane *z* drona *do* adresu w **Stacje Naziemne → IP lub Host Docelowy**. Musi to być adres VPN laptopa, a nie drona, i nie adres Wi-Fi laptopa. Następnie zobacz [Brak telemetrii w stacji naziemnej](https://docs.uavmatrix.com/pl/troubleshooting/no-telemetry-in-gcs/) lub [Brak wideo w stacji naziemnej](https://docs.uavmatrix.com/pl/troubleshooting/no-video-in-gcs/).
- **Wolno, ale działa**: Tailscale pokazuje, że używany jest **Relay**. Połączenie przez relay działa, ale dodaje opóźnienie. Niektóre sieci komórkowe nie dopuszczają bezpośrednich połączeń, więc relay może być najlepszym, co da się uzyskać u danego operatora.

## Nadal nieosiągalny?

[Pobierz logi](https://docs.uavmatrix.com/pl/troubleshooting/collect-logs/) z zaznaczonym **VPN Manager** i wyślij je na **[support@uavmatrix.com](mailto:support@uavmatrix.com)** wraz z wynikiem `zerotier-cli listnetworks` lub `tailscale status` z drona i z laptopa.

Powiązane: [Ustawienia VPN](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/vpn/) · [Sieć Fleet Manager](https://docs.uavmatrix.com/pl/fleet-manager/network/)

Source: https://docs.uavmatrix.com/pl/troubleshooting/vpn-cant-reach-drone/
