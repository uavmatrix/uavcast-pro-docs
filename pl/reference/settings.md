# Referencja ustawień

> Każde ustawienie UAVcast-Pro na jednej stronie z dokładną etykietą, wartością domyślną i zakresem: kontroler lotu, NTRIP, stacje naziemne, kamera, nagrywanie, modem, VPN.

Każde ustawienie w interfejsie webowym UAVcast-Pro, pogrupowane według stron, z etykietą dokładnie taką, jaką widzi aplikacja, oraz wartością domyślną po świeżej instalacji. Strony, na których ustawienia działają na żywo, stosują je od razu, chyba że zaznaczono inaczej. Strony z opisem funkcji wyjaśniają każdy obszar szczegółowo; ta strona służy do wyszukiwania.

## Kontroler Lotu → Połączenie

| Ustawienie | Domyślnie | Wartości i uwagi |
| --- | --- | --- |
| **Łącze włączone** | Włączone | Włącza lub wyłącza łącze z kontrolerem lotu. |
| **Typ łącza** | **USB** | **USB** (własny port USB kontrolera lotu) lub **UART / Serial** (port TELEM na pinach GPIO lub kablu USB-szeregowy). |
| **Port** | **Automatyczny** | Tryb automatyczny znajduje kontroler lotu i podąża za nim, jeśli zmieni się numer urządzenia. **Własna ścieżka…** przyjmuje urządzenie, na przykład `/dev/ttyAMA0`. |
| **Prędkość bodów** | **Automatyczna** | Musi być zgodna z `SERIALx_BAUD` na kontrolerze lotu. Tryb automatyczny próbuje 57600, 115200, 921600, 1500000, 460800, 230400 i 500000. Nie jest używana dla USB. |

Przyciski: **Wykryj automatycznie** (skanuje wszystkie porty i prędkości oraz zapisuje wynik), **Połącz**, **Uruchom ponownie łącze**, **Zatrzymaj**. Zmiany są stosowane od razu, bez restartu.

## Kontroler Lotu → NTRIP / RTK

| Ustawienie | Domyślnie | Wartości i uwagi |
| --- | --- | --- |
| **Włącz klienta NTRIP** | Wyłączone |  |
| **Host castera** | puste | Nazwa hosta castera NTRIP. |
| **Port** | `2101` | Niektórzy casterzy TLS używają 2102 lub 443. |
| **Mountpoint** | puste | Wybierz za pomocą **Przeglądaj mountpointy**. |
| **Użyj TLS (HTTPS)** | Wyłączone | Dla casterów wymagających TLS. |
| **Nazwa użytkownika** / **Hasło** | puste | rtk2go.com: adres e-mail jako nazwa użytkownika, bez hasła. |
| **Wysyłaj GGA w górę** | Włączone | Wymagane przez casterów VRS i z najbliższym mountpointem. |
| **Interwał wysyłania (sekundy)** | `10` |  |
| **Źródło pozycji** | **Pozycja na żywo z kontrolera lotu** | Lub **Ręczna stała pozycja** (**Szerokość geograficzna**, **Długość geograficzna**, **Wysokość (m)**), która służy też jako zapas przed pierwszym fixem GPS. |

## Kontroler Lotu → Wstrzykiwacze

| Ustawienie | Domyślnie | Wartości i uwagi |
| --- | --- | --- |
| **Typ wejścia** |  | **HTTP**, **UDP** lub **Serial**. Nie można zmienić po utworzeniu. |
| **MAVLink sysid** | `1` | Taki sam jak kontroler lotu. |
| **MAVLink compid** | `194` | Ładunek użytkownika. |
| **Prefiks nazwy** | puste | Do 8 znaków ASCII, dodawanych przed każdą nazwą sygnału. |
| **Limit (Hz na sygnał)** |  | Maksymalna liczba próbek na sekundę dla nazwy sygnału. |
| **Protokół** (UDP, Serial) |  | **Key=Value (line-delimited)** lub **JSON** (`{name, value}`). |
| **Port** / **Adres nasłuchu** (UDP) |  | Wybierz wolny port, na przykład 14600. `0.0.0.0` = wszystkie interfejsy, `127.0.0.1` = tylko lokalnie. |
| **Ścieżka urządzenia** / **Prędkość bodów** (Serial) |  | Na przykład `/dev/ttyUSB0`; prędkość bodów musi być zgodna z nadajnikiem. |

## Stacje Naziemne

Jedna karta na miejsce docelowe.

| Ustawienie | Domyślnie dla nowego miejsca docelowego | Wartości i uwagi |
| --- | --- | --- |
| **Nazwa** | puste | Do 50 znaków. |
| **IP lub Host Docelowy** | puste | Adres IPv4. Wymagany, zanim można włączyć wideo lub telemetrię. |
| **Port Telemetrii** | `14550` | 1–65535. |
| **Port Wideo** | `5600` | 1–65535. |
| **Port Wideo (Kamera 2)** | puste (= Port Wideo + 1) | Widoczny tylko przy włączonym **Podwójnym strumieniu**. |
| **Włącz Punkt Końcowy** | Włączone | Wyłączenie zatrzymuje wszystko do tego miejsca: telemetrię, wideo i audio. |
| **Włącz Wideo** | **Wyłączone** |  |
| **Włącz Telemetrię** | **Wyłączone** |  |
| **Read Only** | Wyłączone | Stacja naziemna odbiera telemetrię, ale nie może niczego zmienić w pojeździe. Dotyczy to UAVcast-Pro od wersji 6.5.3; we wcześniejszych wersjach Read Only nie blokuje zapisu parametrów. |

## Kamera → Ustawienia kamery

| Ustawienie | Domyślnie | Wartości i uwagi |
| --- | --- | --- |
| **Włączyć Kamerę?** | Tak |  |
| **Wybierz Kamerę** | Kamera Raspberry Pi | Wykryte kamery CSI i USB. |
| **Rozdzielczość** | 640×480 | Oferowane są tylko rozmiary obsługiwane przez kamerę. |
| **Wybierz FPS** | **Auto** | Kamera sama ustala wartość. |
| **Bitrate:** | `0` (auto) | 0–10000 kbps. |
| **Szybkość Odzyskiwania Strumienia** | **Auto** | Interwał klatek kluczowych. Auto = jedna klatka kluczowa na sekundę. Wyższe poziomy szybciej odzyskują obraz po utracie pakietów, ale zużywają więcej przepustowości. |
| **Obrót:** / **Ustawienia Odbicia** | 0°, bez odbicia | **Odbicie Poziome**, **Odbicie Pionowe**. |
| **Włączyć Podgląd na Żywo?** | Tak | Podgląd na tej stronie i na mapie lotu. |
| **Niestandardowy Pipeline** | pipeline testowy | Zastępuje miejsca docelowe stacji naziemnych. Pomiń prefiks `gst-launch-1.0`. |
| **Włącz przełączanie kamery kanałem RC** | Wyłączone |  |
| **Kanał RC** | 7 | PWM < 1500 = Kamera 1, PWM > 1500 = Kamera 2. |
| **Dopasuj rozdzielczość Kamery 1** | Wyłączone | Kamera 2 nagrywa w rozdzielczości kamery 1. |
| **Podwójny strumień** | Wyłączone | Strumieniuje obie kamery jednocześnie. |
| **Audio** | Wyłączone | Audio Opus w podglądzie. |
| **Urządzenie audio** | **Auto (mikrofon kamery, jeśli jest)** | Albo urządzenie przechwytujące, albo **Ton testowy (nie wymaga mikrofonu)**. |
| **Bitrate** (audio) | 64 kbps |  |
| **Wysyłaj audio do stacji naziemnych** | Wyłączone | RTP/Opus do każdego miejsca docelowego wideo na Port Wideo + 2. |

## Kamera → Nagrania → Ustawienia

| Ustawienie | Domyślnie | Wartości i uwagi |
| --- | --- | --- |
| **Miejsce zapisu** | **Pamięć wewnętrzna** | Dysk USB lub SSD albo **Lub inny folder**. |
| **Zostaw wolne** | 2 GB | 0,5–1000 GB. |
| **Usuwaj najstarsze nagrania, gdy brakuje miejsca** | Włączone | Wyłączone = nagrywanie zatrzymuje się, gdy dysk jest pełny. |
| **Usuwaj nagrania starsze niż** | 0 dni | 0 zachowuje nagrania, dopóki nie będzie potrzebne miejsce. |
| **Nagrywaj automatycznie po uzbrojeniu** | Włączone |  |
| **Nagrywaj kamerę 1** / **Nagrywaj kamerę 2** | Włączone / Włączone | Kamera 2 tylko przy podwójnym strumieniu. |
| **Długość pliku** | 1 min | 1–30 minut na plik. |
| **Zapisuj telemetrię** | **Podczas uzbrojenia** | **Zawsze podczas połączenia** lub **Wyłączone**. |

## Modem

| Ustawienie | Domyślnie | Wartości i uwagi |
| --- | --- | --- |
| **Włączyć modem komórkowy?** | Tak |  |
| **Typ modemu** | **Tradycyjny (PPP)** | Lub **HiLink**. |
| **Nazwa Punktu Dostępu (Opcjonalne)** | puste (**Automatyczny**) | Zostaw puste, aby wykryć automatycznie. |
| **Nazwa użytkownika (Opcjonalne)** / **Hasło (Opcjonalne)** | puste | Większość operatorów nie wymaga żadnego z nich. |
| **Kod PIN (Opcjonalne)** | puste | Kod PIN karty SIM, chyba że PIN jest wyłączony. |

## Sieć Prywatna VPN

| Ustawienie | Domyślnie | Wartości i uwagi |
| --- | --- | --- |
| **Włącz VPN** | Nie |  |
| **Usługi** | **ZeroTier** | **ZeroTier** lub **Tailscale**. |
| **ID Sieci** (ZeroTier) | puste | Z twojego własnego kontrolera ZeroTier. |
| **Klucz Auth** / **Nazwa hosta (Opcjonalne)** (Tailscale) | puste | Albo zaloguj się przez **Web Login**, albo przez kartę **Fleet Manager** po sparowaniu. |

## Dynamiczny DNS

| Ustawienie | Domyślnie | Wartości i uwagi |
| --- | --- | --- |
| **Włączyć Dynamiczny DNS?** | Nie |  |
| **System DNS** | `noip` | `generic` (z **URL DNS**), `noip`, `dyndns`, `duck`. |
| Nazwa użytkownika, **Hasło**, **Alias** | puste | Od twojego dostawcy DNS. |

## Sieci

| Ustawienie | Domyślnie | Wartości i uwagi |
| --- | --- | --- |
| **Priorytet Sieci** | routing systemowy | **WiFi Priority (Indoor Mode)**, **Modem Priority (Outdoor Mode)** lub **Auto (System Default)**. |

## Fleet Management

| Ustawienie | Domyślnie | Wartości i uwagi |
| --- | --- | --- |
| **Device Name** | puste | Wyświetlana w Fleet Manager. Bez niej używana jest nazwa hosta. |

## Users

| Ustawienie | Wartości i uwagi |
| --- | --- |
| **Role** | **Admin - Full access** lub **Read Only - View only**. Pierwszy użytkownik musi być administratorem. |

## Aplikacja

| Ustawienie | Domyślnie | Wartości i uwagi |
| --- | --- | --- |
| **Port Serwera** | `80` | 80 lub wyższy. **Zatwierdź i zrestartuj serwer** stosuje zmianę; adres staje się `http://<urządzenie>:<port>/`. |
| **Język** | Język przeglądarki | Angielski, hiszpański, portugalski, włoski, niderlandzki, polski, turecki, rosyjski, chiński (uproszczony i tradycyjny). |
| **Ciemny Motyw** |  |  |
| **Logowanie**: lista logów / zakres czasu | **Wszystkie logi** / **Ostatnie 2 godziny** | Zobacz [Zbieranie logów](https://docs.uavmatrix.com/pl/troubleshooting/collect-logs/). |

**Baza Danych** oferuje **Kopia Zapasowa Bazy Danych**, **Przywróć Bazę Danych** (plik `.db`) oraz **Resetuj Bazę Danych**, który usuwa wszystkie ustawienia.

Source: https://docs.uavmatrix.com/pl/reference/settings/
