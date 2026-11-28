# Dynamiczny DNS

> Utrzymuj nazwę hosta wskazującą na zmieniający się publiczny adres IP drona dzięki Dynamicznemu DNS w UAVcast-Pro (No-IP, DynDNS, DuckDNS lub zwykły URL) i dowiedz się, kiedy lepszym wyborem jest VPN.

Dynamiczny DNS utrzymuje nazwę hosta, na przykład `mydrone.ddns.net`, wskazującą aktualny publiczny adres IP drona. UAVcast-Pro sprawdza publiczny IP co 5 minut i aktualizuje dostawcę DNS, gdy się zmieni. Otwórz **Dynamiczny DNS** w panelu bocznym.

> **Większość łączy komórkowych wymaga zamiast tego VPN**
>
> Dynamiczny DNS pomaga tylko wtedy, gdy publiczny IP drona może odbierać połączenia przychodzące. Większość operatorów komórkowych umieszcza karty SIM za translacją adresów operatora (CGNAT), więc publiczny IP należy do operatora, a nie do drona. Użyj [VPN](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/vpn/), chyba że twoja karta SIM ma publiczny adres IP (często nazywany „statycznym” lub „M2M”).

Dynamiczny DNS nie zmienia tego, dokąd UAVcast-Pro wysyła telemetrię i wideo: zawsze trafiają one na adresy IP z [Stacji Naziemnych](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/). Służy do dostępu z zewnątrz do interfejsu webowego drona lub do SSH.

## Konfiguracja

1. Utwórz nazwę hosta u swojego dostawcy DNS (No-IP, DynDNS lub DuckDNS).
2. W UAVcast-Pro przejdź do **Dynamiczny DNS**. Ustaw **Włącz Dynamiczny DNS?** na **Tak**.
3. Wybierz **System DNS**.
4. Wpisz nazwę użytkownika konta (pole jest opisane jako **Konfiguracja Dynamicznego DNS**), **Hasło** oraz nazwę hosta w polu **Alias**. W przypadku DuckDNS wpisz token w polu nazwy użytkownika, a w polu **Hasło** cokolwiek (formularz tego wymaga, a DuckDNS je ignoruje). Pola zapisują się po opuszczeniu.
5. Wybierz **Połącz**, aby uruchomić aktualizator. Od razu wysyła on bieżący adres IP, a potem sprawdza co 5 minut. **Rozłącz** go zatrzymuje.

![Menedżer Dynamicznego DNS z przełącznikiem Włącz Dynamiczny DNS? ustawionym na Nie, pustymi polami nazwy użytkownika, hasła i aliasu oraz System DNS ustawionym na noip](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/dynamic-dns.webp)

*Menedżer Dynamicznego DNS przed włączeniem.*

## Opis ustawień

| Ustawienie | Domyślnie | Wartości | Uwagi |
| --- | --- | --- | --- |
| **Włącz Dynamiczny DNS?** | **Nie** | **Tak**, **Nie** |  |
| **System DNS** | **No-IP** | **No-IP**, **DynDNS**, **DuckDNS**, **Ogólny** |  |
| **URL DNS** | puste | URL aktualizacji | Tylko dla **Ogólny**. Adres URL aktualizacji zgodny z DynDNS, podany przez dostawcę. |
| **Konfiguracja Dynamicznego DNS** (nazwa użytkownika) | puste |  | Nazwa użytkownika konta DNS lub token dla DuckDNS. Interfejs opisuje to pole nieintuicyjnie; w rzeczywistości to nazwa użytkownika. |
| **Hasło** | puste |  | Hasło konta DNS. Wymagane przez formularz; ignorowane dla DuckDNS. |
| **Alias** | puste | nazwa hosta | Nazwa hosta do aktualizacji, na przykład `mydrone.ddns.net`. |
| Interwał aktualizacji | 5 minut | stały |  |

Wiersz **Dynamiczny DNS** na [Panelu Głównym](https://docs.uavmatrix.com/pl/uavcast-pro/dashboard/) pokazuje, czy aktualizator działa. **Dziennik Działań** pokazuje każdą aktualizację i odpowiedź dostawcy.

Source: https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/dynamic-dns/
