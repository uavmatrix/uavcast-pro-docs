# Sieci

> Zobacz wszystkie interfejsy sieciowe drona i wybierz, czy ruch ma płynąć przez Wi-Fi, czy przez modem 4G/LTE, tak aby łącze pozostawało na sieci komórkowej, gdy wylatujesz poza zasięg Wi-Fi.

Strona Sieci pokazuje wszystkie interfejsy sieciowe drona (Ethernet, Wi-Fi, modem, VPN) i to, który z nich jest domyślną trasą. Tutaj wybierasz też, czy pierwszeństwo ma Wi-Fi, czy modem komórkowy, gdy oba są połączone. Otwórz **Sieci** w panelu bocznym.

![Strona Sieci z kartami podsumowania, Priorytetem Sieci ustawionym na Auto i tabelą interfejsów z eth0 i wlan0](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/networks.webp)

*Sieci z aktywnym Auto (domyślne ustawienia systemu) i Wi-Fi jako domyślną trasą.*

## Wybór priorytetu sieci

Gdy Wi-Fi i modem są połączone, Linux kieruje ruch przez ten, który ma niższą metrykę trasy. **Priorytet Sieci** ustawia te metryki za ciebie:

| Opcja | Użyj, gdy | Efekt |
| --- | --- | --- |
| **Priorytet Wi-Fi (tryb w pomieszczeniu)** | Na stanowisku testowym lub w domu, aby oszczędzać transfer danych mobilnych. | Metryka Wi-Fi 100, metryka modemu 600. |
| **Priorytet Modemu (tryb na zewnątrz)** | Przed każdym lotem przez sieć komórkową. | Metryka modemu 100, metryka Wi-Fi 600. |
| **Auto (domyślne ustawienia systemu)** | Nie chcesz, aby UAVcast-Pro cokolwiek zmieniał. | Własne metryki NetworkManagera. |

> **Przełącz na Priorytet Modemu przed startem**
>
> Jeśli dron wystartuje przy priorytecie Wi-Fi, łącze pozostanie na Wi-Fi, dopóki Wi-Fi nie zostanie utracone, a wtedy w powietrzu musi przełączyć się na modem. Powoduje to przerwę w telemetrii i wideo. Wybierz **Priorytet Modemu (tryb na zewnątrz)** na ziemi.

Zmiana dotyczy aktywnych połączeń bez ich restartowania (*Stosowanie zmian...*).

> **Które połączenia są zmieniane**
>
> Metryka Wi-Fi jest ustawiana na połączeniu NetworkManagera o nazwie `preconfigured`, czyli nazwie, jaką Raspberry Pi Imager nadaje sieci Wi-Fi wpisanej podczas zapisu obrazu. Wi-Fi skonfigurowane w inny sposób zachowuje własną metrykę, a Ethernet nigdy nie jest zmieniany.

## Informacje o interfejsach

Karty podsumowania pokazują **Aktywne Interfejsy**, **Brama Domyślna** (wraz z interfejsem, przez który przechodzi) oraz **Wszystkie Interfejsy**. **Interfejsy Sieciowe** wymieniają każdy interfejs wraz z **Nazwa**, **Adres IP**, **Brama**, **Status** (**Aktywny**, **Nieaktywny**, **VPN**), **Prędkość**, **Typ** oraz tym, czy jest **Domyślny**.

Najczęstsze nazwy interfejsów:

| Nazwa | Co to jest |
| --- | --- |
| `eth0`, `end0` | Ethernet przewodowy |
| `wlan0` | Wi-Fi |
| `ppp0`, `wwan0` | Modem tradycyjny |
| `usb0`, `eth1` | Modem HiLink |
| `zt…` | ZeroTier |
| `tailscale0` | Tailscale |

Source: https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/networks/
