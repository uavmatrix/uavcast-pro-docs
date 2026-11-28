# Rozwiązywanie problemów

> Napraw brak wideo, brak heartbeat MAVLink, problemy z modemem i VPN, błędy licencji oraz parowanie w Fleet Manager. Zacznij od tego, co widzisz, i wykonaj sprawdzenia.

Zacznij od objawu. Każda poniższa strona wymienia prawdopodobne przyczyny w kolejności, w jakiej występują w terenie, wraz z numerowanymi sprawdzeniami, które używają dokładnych etykiet z interfejsów UAVcast-Pro i Fleet Manager.

> **Najpierw sprawdź panel**
>
> Otwórz **Panel Główny** w UAVcast-Pro. Karta statusu podsumowuje drona w jednej linii (**All systems normal** albo liczba problemów i ostrzeżeń) i ma wiersz dla każdego z: **Flight controller**, **Ground station**, **Cellular**, **VPN**, **RTK corrections**, **Video** i **Power supply**. Pierwszy czerwony wiersz to zwykle miejsce, od którego warto zacząć.

![Panel Główny UAVcast-Pro z kartą statusu pokazującą 2 problemy: GPS no fix i VPN not connected](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/dashboard.webp)

*Panel Główny → karta statusu. Wiersze z problemem stają się czerwone i są liczone w odznace problemów, tutaj GPS (no fix) i VPN (not connected).*

## Dopasuj swój objaw

| Co widzisz | Prawdopodobna przyczyna | Przejdź do |
| --- | --- | --- |
| Telemetria działa, ale obszar wideo w QGroundControl lub Mission Planner jest czarny | **Włącz Wideo** jest wyłączone dla tej stacji naziemnej, zły IP albo zapora | [Brak wideo w stacji naziemnej](https://docs.uavmatrix.com/pl/troubleshooting/no-video-in-gcs/) |
| Wideo się zacina, ma szare zakłócenia lub opóźnienie kilku sekund | Bitrate za wysoki dla łącza albo klatki kluczowe zbyt daleko od siebie | [Poszarpane lub opóźnione wideo](https://docs.uavmatrix.com/pl/troubleshooting/choppy-or-delayed-video/) |
| Strona Kontroler Lotu pokazuje **No heartbeat**, **Waiting for device** lub **Detecting baud rate** | Kabel, okablowanie, port lub prędkość bodów | [Brak heartbeat MAVLink](https://docs.uavmatrix.com/pl/troubleshooting/no-mavlink-heartbeat/) |
| UAVcast-Pro pokazuje kontroler lotu jako **Połączono**, a stacja naziemna czeka na połączenie | Telemetria nie jest wysyłana do stacji naziemnej albo stacja nie nasłuchuje | [Brak telemetrii w stacji naziemnej](https://docs.uavmatrix.com/pl/troubleshooting/no-telemetry-in-gcs/) |
| **No cameras available** w **Wybierz Kamerę** | Brak stosu kamery CSI, uszkodzona taśma albo kamera USB nie jest widziana | [Nie wykryto kamery](https://docs.uavmatrix.com/pl/troubleshooting/camera-not-detected/) |
| **Invalid license key**, **Maximum activations reached** lub **License activation failed** | Zły klucz, brak wolnego miejsca na urządzenie albo brak internetu | [Licencja nie aktywuje się](https://docs.uavmatrix.com/pl/troubleshooting/license-activation-failed/) |
| Modem pokazuje sygnał i operatora, ale nic się nie ładuje | APN, priorytet sieci lub dane na karcie SIM | [Modem połączony, brak internetu](https://docs.uavmatrix.com/pl/troubleshooting/modem-no-internet/) |
| Przeglądarka nie może otworzyć `http://<device-ip>/` po instalacji | Zły adres, usługa nie działa albo port się zmienił | [Interfejs webowy się nie otwiera](https://docs.uavmatrix.com/pl/troubleshooting/web-interface-wont-open/) |
| Instalator kończy się błędem | System 32-bitowy, brak internetu albo mało miejsca na dysku | [Instalacja się nie udaje](https://docs.uavmatrix.com/pl/troubleshooting/installation-fails/) |
| ZeroTier lub Tailscale pokazuje połączenie, ale nie możesz pingować ani otworzyć drona | Członek nieautoryzowany, zła sieć albo stacja naziemna nie jest w VPN | [VPN połączony, ale brak dostępu do drona](https://docs.uavmatrix.com/pl/troubleshooting/vpn-cant-reach-drone/) |
| Status NTRIP nie pokazuje **Strumieniowanie korekcji** albo poprawka nigdy nie dociera do **RTK Fixed** | Ustawienia castera, GGA albo odbiornik bez obsługi RTK | [Korekcje RTK nie docierają](https://docs.uavmatrix.com/pl/troubleshooting/rtk-corrections-not-arriving/) |
| **Voltage too low - use a stronger power supply** lub **Slowed down (heat or power)** | Słabe zasilanie lub kabel, przegrzewanie | [Podnapięcie i throttling](https://docs.uavmatrix.com/pl/troubleshooting/undervoltage-and-throttling/) |
| Dron jest **Offline** w Fleet Manager | Dron nie ma internetu, zablokowany port MQTT albo wymagane ponowne parowanie | [Dron offline w Fleet Manager](https://docs.uavmatrix.com/pl/troubleshooting/drone-offline-fleet-manager/) |
| **Invalid pairing code**, **This pairing code has expired** lub **License is not owned by any member of this organization** | Kod wpisany źle lub za stary, albo licencja należy do osoby spoza organizacji | [Kod parowania nieprawidłowy lub wygasły](https://docs.uavmatrix.com/pl/troubleshooting/pairing-code-invalid/) |

## Nadal masz problem?

1. [Zbierz pliki logów](https://docs.uavmatrix.com/pl/troubleshooting/collect-logs/). Pobranie zawiera migawkę `diagnostics.txt` z ustawieniami i sprzętem, więc support nie musi o nie pytać.
2. Wyślij je na **[support@uavmatrix.com](mailto:support@uavmatrix.com)** wraz z wersją UAVcast-Pro, używanym sprzętem i tym, co już sprawdziłeś. Możesz też zapytać na [UAVmatrix Discord](https://discord.gg/xwqMTXh).

Krótkie odpowiedzi na częste pytania znajdziesz w [FAQ](https://docs.uavmatrix.com/pl/troubleshooting/faq/).

Source: https://docs.uavmatrix.com/pl/troubleshooting/
