# VPN

> Umieść drona i stację naziemną w jednej prywatnej sieci dzięki VPN Fleet Manager albo własnej sieci Tailscale lub ZeroTier, aby telemetria i wideo działały przez 4G/LTE.

Przez 4G/LTE dron dostaje od operatora komórkowego adres, którego stacja naziemna nie może osiągnąć. VPN to rozwiązuje: dron i stacja naziemna dołączają do tej samej prywatnej sieci i dostają na niej stałe adresy, niezależnie od tego, gdzie się znajdują i jakiej sieci używają. Otwórz **Sieć Prywatna VPN** w pasku bocznym.

Najszybszym sposobem jest **VPN Fleet Manager**, który jest zawarty w Twojej licencji UAVcast-Pro. Jeśli masz już własny tailnet Tailscale albo sieć ZeroTier, UAVcast-Pro może dołączyć właśnie do niej.

![Strona Sieć Prywatna VPN z włączonym VPN, wybranym Tailscale, kartą Fleet Manager i sekcją Informacje o VPN ze statusem Not Connected](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/private-network.webp)

*Sieć Prywatna VPN z wybranym Tailscale na dronie, który nie jest jeszcze sparowany ani zalogowany.*

## Którego rozwiązania użyć?

|  | VPN Fleet Manager | Tailscale | ZeroTier |
| --- | --- | --- | --- |
| Konto | Twoja organizacja w Fleet Manager (w cenie licencji) | Twoje własne konto Tailscale | Twoja własna sieć ZeroTier (zarządzana samodzielnie) |
| Konfiguracja na dronie | Jedno kliknięcie podczas parowania lub po nim | Logowanie linkiem w przeglądarce albo kluczem uwierzytelniającym | Wklejenie identyfikatora sieci |
| Stacje naziemne | Dołączane na stronie **Network** w Fleet Manager, strumienie ustawiane przez powiązania strumieni | Dołączenie do Twojego tailnetu | Dołączenie do Twojej sieci |
| Najlepsze dla | Większości operatorów i każdej floty | Zespołów, które już korzystają z Tailscale | Zespołów, które już korzystają z ZeroTier |

Dron może w danym momencie należeć do jednej sieci VPN ustawianej na tej stronie.

> **Usługa UAVnet jest wycofywana**
>
> UAVnet, hostowany przez UAVmatrix kontroler ZeroTier pod adresem uavnet.uavmatrix.com, jest wycofywany na rzecz Fleet Manager. Jeśli Twoje drony korzystają z sieci UAVnet, przenieś je do VPN Fleet Manager. Przycisk **Otwórz kontroler UAVNet** na tej stronie otwiera UAVnet.

## VPN Fleet Manager

VPN Fleet Manager to prywatna sieć Twojej organizacji, obsługiwana przez Fleet Manager na kliencie Tailscale. Konto Tailscale nie jest potrzebne.

1. W Fleet Manager otwórz **Network** i wybierz **Enable VPN Network**, jeśli nie jest jeszcze włączone. Zobacz [Sieć i VPN](https://docs.uavmatrix.com/pl/fleet-manager/network/).
2. [Sparuj drona](https://docs.uavmatrix.com/pl/uavcast-pro/fleet-pairing/) i pozostaw zaznaczone **Enable VPN for this UAV** w kreatorze parowania. Dron, który jest już sparowany, dołącza z karty **Fleet Manager** na tej stronie (patrz niżej) albo przyciskiem **Push to Drone** na stronie **Network** w Fleet Manager.
3. Podłącz każdą stację naziemną do sieci na stronie **Network** w Fleet Manager: [Połącz stację naziemną](https://docs.uavmatrix.com/pl/fleet-manager/connect-gcs/).
4. Wysyłaj do niej strumienie za pomocą [powiązania strumienia](https://docs.uavmatrix.com/pl/fleet-manager/network/stream-bindings/). Fleet Manager sam dodaje miejsce docelowe na stronie [Stacje Naziemne](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/) drona.

Krok po kroku konfigurację lotu przez 4G opisano w [Lot poza zasięgiem wzroku przez 4G](https://docs.uavmatrix.com/pl/guides/bvlos-4g/).

## Tailscale

Użyj tej opcji dla własnego tailnetu albo dla VPN Fleet Manager na dronie, który jest już sparowany. UAVcast-Pro instaluje Tailscale. Wybierz sposób logowania drona na jednej z trzech kart.

**Logowanie w przeglądarce**

1. Ustaw **Włącz VPN** na **Tak** i wybierz **Tailscale** w **Usługi**.
2. Na karcie **Logowanie w przeglądarce** wybierz **Wygeneruj URL logowania**, a następnie **Uwierzytelnij to urządzenie**.
3. Zaloguj się do Tailscale w nowej karcie i zatwierdź urządzenie.
4. Wróć do UAVcast-Pro. Status zmieni się na **Połączono** i pokaże **IPv4 Address**, **Nazwa hosta** i **Tailnet**.

**Klucz Auth**

1. W [konsoli administracyjnej Tailscale](https://login.tailscale.com/admin/settings/keys) wygeneruj klucz uwierzytelniający. Ustaw go jako wstępnie zatwierdzony (pre-approved), a jako wielokrotnego użytku, jeśli konfigurujesz kilka dronów.
2. W UAVcast-Pro wybierz **Tailscale**, otwórz **Klucz Auth**, wklej klucz (`tskey-auth-…`) i opcjonalnie ustaw **Nazwa hosta (Opcjonalne)**.
3. Wybierz **Połącz używając klucza**.

Użyj tego przy dronach, do których nie masz pod ręką przeglądarki, albo przy konfigurowaniu wielu dronów w ten sam sposób.

**Fleet Manager**

Jeśli dron jest [sparowany z Fleet Manager](https://docs.uavmatrix.com/pl/uavcast-pro/fleet-pairing/), a Twoja organizacja ma włączony VPN, wybierz **Connect to Fleet Manager VPN**. Połączenie może zająć do 30 sekund. Status pokaże wtedy **Connected to Fleet Manager**.

Nie masz jeszcze parowania? Karta pokazuje **Not Paired with Fleet Manager** i odsyła do **Go to Fleet Manager Pairing**.

Zainstaluj Tailscale na stacji naziemnej, zaloguj się do tego samego tailnetu i użyj jej adresu Tailscale (`100.x.y.z`) jako miejsca docelowego na stronie Stacje Naziemne.

Gdy połączenie jest aktywne, **Interfejs Wyłączony** wyłącza interfejs Tailscale bez wylogowania, **Interfejs Włączony** włącza go z powrotem, a **Wyloguj się** usuwa urządzenie z tailnetu.

> **VPN Fleet Manager zastępuje Twoje własne logowanie do Tailscale**
>
> VPN Fleet Manager działa na Tailscale z własnym serwerem logowania Fleet Manager. Połączenie z nim wylogowuje dron z Twojego własnego tailnetu. Jeśli sesja SSH działa przez ten tailnet, zostanie przerwana. Wykonuj to z sieci lokalnej.

## ZeroTier

Użyj tej opcji, jeśli prowadzisz własną sieć ZeroTier, na przykład w ZeroTier Central albo na własnym kontrolerze.

### Dołączenie drona

1. W UAVcast-Pro przejdź do **Sieć Prywatna VPN**.
2. Ustaw **Włącz VPN** na **Tak**.
3. W **Usługi** wybierz **ZeroTier**.
4. Wklej 16-znakowy identyfikator sieci do pola **ID Sieci** i wybierz **Dołącz do Sieci**.
5. Jeśli sieć jest prywatna, autoryzuj dron w kontrolerze ZeroTier. Panel **Sieć ZeroTier** pokaże wtedy **Połączono** i **IP urządzenia**.

**ACCESS_DENIED** oznacza, że członek nie jest jeszcze autoryzowany.

### Dołączenie stacji naziemnej

1. Zainstaluj [ZeroTier One](https://www.zerotier.com/download/) na komputerze stacji naziemnej.
2. Dołącz do tego samego identyfikatora sieci: w systemach Windows i macOS z ikony ZeroTier w zasobniku lub na pasku menu (**Join New Network**); w Linuksie poleceniem `sudo zerotier-cli join <network-id>`.
3. Autoryzuj ją w kontrolerze i zapisz adres IP, który otrzyma.

Na stronie [Stacje Naziemne](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/) ustaw **IP lub Host Docelowy** na adres IP **ZeroTier** stacji naziemnej. Telemetria i wideo płyną teraz przez VPN.

> **Przełączanie między Wi-Fi a 4G**
>
> ZeroTier i Tailscale wybierają najlepszą dostępną sieć. Możesz zacząć na Wi-Fi na polu, a łącze przejdzie na modem, gdy Wi-Fi zniknie z zasięgu, bez zmiany żadnego adresu.

## Opis ustawień

| Ustawienie | Domyślnie | Wartości | Uwagi |
| --- | --- | --- | --- |
| **Włącz VPN** | **Nie** | **Tak**, **Nie** |  |
| **Usługi** | **ZeroTier** | **ZeroTier**, **Tailscale** | Niedostępne, dopóki VPN nie jest włączony. |
| **ID Sieci** (ZeroTier) | puste | 16-znakowy identyfikator sieci ZeroTier | Z Twojego własnego kontrolera ZeroTier. |
| **Klucz Auth** (Tailscale) | puste | `tskey-auth-…` |  |
| **Nazwa hosta (Opcjonalne)** (Tailscale) | nazwa hosta systemu | tekst | Nazwa widoczna w konsoli administracyjnej Tailscale. |

## Rozwiązywanie problemów

| Objaw | Co sprawdzić |
| --- | --- |
| ZeroTier pokazuje **ACCESS_DENIED** | Autoryzuj członka w swoim kontrolerze ZeroTier. |
| Połączono, ale brak telemetrii na stacji naziemnej | Miejsce docelowe nadal używa adresu LAN. Użyj adresu VPN stacji naziemnej i zezwól na UDP 14550 oraz 5600 w jej zaporze. |
| *Brak informacji o VPN* | VPN jest wyłączony albo usługa nie działa. Sprawdź **Włącz VPN** i **Dziennik Działań**. |
| Logowanie Tailscale w przeglądarce pokazuje *No Authentication URL* | Zamiast tego użyj karty **Klucz Auth**. |

Interfejsy pojawiają się na stronie [Sieci](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/networks/) jako `zt…` (ZeroTier) albo `tailscale0`, oznaczone jako **VPN**.

Nadal masz problem? Zobacz [VPN połączony, ale do drona nie można dotrzeć](https://docs.uavmatrix.com/pl/troubleshooting/vpn-cant-reach-drone/).

Source: https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/vpn/
