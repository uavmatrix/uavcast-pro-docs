# Ustawienia aplikacji, dzienniki i kopie zapasowe

> Zmień port webowy i język UAVcast-Pro, pobierz logi do wsparcia z trybem debug oraz wykonaj kopię zapasową, przywróć lub zresetuj bazę ustawień na stronie Aplikacja.

Strona **Aplikacja** zawiera wszystko, co dotyczy samego UAVcast-Pro: licencję, aktualizacje, ustawienia interfejsu, pobieranie logów i bazę ustawień. Jest widoczna tylko dla administratorów i jako jedyna strona działa jeszcze przed licencjonowaniem urządzenia. Otwórz **Zarządzanie → Aplikacja**.

![Strona Aplikacja z Menedżerem Licencji i Aktualizacją Aplikacji po lewej stronie oraz kartami Ustawienia, Logowanie i Baza Danych po prawej](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/application.webp)

*Zarządzanie → Aplikacja.*

| Karta | Opisana w |
| --- | --- |
| **Menedżer Licencji** | [Licencjonowanie i aktywacja](https://docs.uavmatrix.com/pl/get-started/license-activation/) |
| **Aktualizacja Aplikacji** | [Aktualizacja UAVcast-Pro](https://docs.uavmatrix.com/pl/get-started/updating/) |
| **Ustawienia**, **Logowanie**, **Baza Danych** | Ta strona |

## Ustawienia

| Ustawienie | Domyślnie | Wartości | Uwagi |
| --- | --- | --- | --- |
| **Rozpocznij Tour** |  |  | Ponownie uruchamia przewodnik po interfejsie. |
| **Ciemny Motyw** | Włączony | Włączony, wyłączony | Zapisywany osobno dla każdej przeglądarki. Dostępny także przez przełącznik motywu na górnym pasku. |
| **Port Serwera** | `80` | 1–65535 | Port interfejsu webowego. Zobacz poniżej. |
| **Język** | Język przeglądarki, a jeśli brak – angielski | English, Español, 简体中文, 繁體中文, Italiano, Nederlands, Polski, Português, Русский, Türkçe | Dostępny także w menu użytkownika na dole panelu bocznego. |

### Zmiana portu interfejsu webowego

1. Wpisz nowy port w polu **Port Serwera**.
2. Wybierz **Zatwierdź i zrestartuj serwer**. Pojawi się okno z **Nowy URL**, na przykład `http://192.168.1.50:8080`.
3. Odczekaj kilka sekund i otwórz nowy adres.

Zakładki i linki do starego adresu przestaną działać. Po zmianie portu pojawia się ostrzeżenie *Port serwera został zmieniony z domyślnego portu 80.* Od UAVcast-Pro 6.5.3 port jest zachowywany podczas aktualizacji; wcześniejsze wersje przywracają port 80.

## Logowanie

UAVcast-Pro zapisuje logi każdej usługi osobno. Pobierz je, gdy coś pójdzie nie tak, i wyślij do wsparcia technicznego.

1. Włącz **Tryb Debug**, aby uzyskać więcej szczegółów. Odtwórz problem.
2. W polu **Wybierz logi do pobrania** zostaw **All Logs** lub wybierz jedną usługę.
3. W polu **Wybierz zakres czasu** wybierz okres obejmujący problem (od **Last 10 minutes** do **All Time**).
4. Wybierz **Pobierz**. Otrzymasz plik zip.
5. Wyślij go e-mailem na adres [support@uavmatrix.com](mailto:support@uavmatrix.com) wraz z krótkim opisem zdarzenia. Następnie wyłącz **Tryb Debug**.

Pobierany plik zawiera migawkę `diagnostics.txt` (ustawienia, porty szeregowe, zdarzenia zasilania i USB), która przyspiesza obsługę zgłoszenia.

| Log | Obejmuje |
| --- | --- |
| **Mavlink Manager**, **Mavlink Publisher** | Połączenie z kontrolerem lotu, przekazywanie do stacji naziemnych |
| **Camera Server**, **Camera Detector** | Pipeline wideo, wykrywanie kamer |
| **Modem Manager**, **Modem Detector** | Połączenie modemu, próby APN |
| **VPN Manager** | ZeroTier i Tailscale |
| **NTRIP Client** | Korekcje RTK |
| **DNS Manager** | Aktualizacje Dynamicznego DNS |
| **License Manager** | Aktywacja i sprawdzanie licencji co 4 godziny |
| **Application Updater**, **Application Installer** | Aktualizacje i instalacje |
| **Backend API Server** | Wewnętrzne API |

**Wyczyść Wszystkie Logi** usuwa wszystkie pliki logów. Nie można tego cofnąć; jeśli chcesz mieć czysty log, zrób to przed odtworzeniem problemu. Na dronie logi znajdują się w `/opt/uavcast-pro/logs`.

Każda strona ma też konsolę **Dziennik Działań**, która pokazuje na żywo log usługi danej strony.

## Baza danych

Wszystkie ustawienia (stacje naziemne, kontroler lotu, kamera, modem, VPN, NTRIP, użytkownicy, tablice, wstrzykiwacze, dane licencji) znajdują się w jednej bazie SQLite, `/opt/uavcast-pro/uavcast.db`.

| Działanie | Co robi |
| --- | --- |
| **Kopia Zapasowa Bazy Danych** | Pobiera bazę jako `uavcast_backup.db`. |
| **Przywróć Bazę Danych** | Wysyła kopię `.db` i zastępuje bieżące ustawienia, także użytkowników. |
| **Resetuj Bazę Danych** | Przywraca domyślne ustawienia stacji naziemnych, kontrolera lotu, kamery, VPN i Dynamicznego DNS. Użytkownicy, licencja, modem, NTRIP, ustawienia nagrywania, tablice, wstrzykiwacze i parowanie z Fleet Manager są zachowane. Nie można tego cofnąć. |

Wykonuj kopie zapasowe, aby zachować sprawdzoną konfigurację przed zmianami lub aby ustawić drugiego drona w ten sam sposób. Po przywróceniu uruchom ponownie urządzenie, aby każda usługa wystartowała z przywróconymi ustawieniami.

> **Przywracanie na innym sprzęcie**
>
> Dane licencji w bazie są powiązane z urządzeniem, z którego pochodzą. Po przywróceniu kopii na innym Raspberry Pi lub karcie SD aktywuj licencję na nowym urządzeniu. Przywrócenie przywraca także użytkowników i hasła z kopii zapasowej.

Source: https://docs.uavmatrix.com/pl/uavcast-pro/application-settings/
