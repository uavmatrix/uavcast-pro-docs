# Rozwiązywanie problemów w Fleet Manager

> Napraw typowe problemy z Fleet Manager: błędy parowania, drony utknięte na PAIRING lub offline, Re-pair required, brakujące strumienie i nieudane polecenia.

Zacznij od tego, co widzisz. Każdy wiersz prowadzi do rozwiązania, poniżej lub na wspólnych stronach [rozwiązywania problemów](https://docs.uavmatrix.com/pl/troubleshooting/).

| Co widzisz | Prawdopodobna przyczyna | Przejdź do |
| --- | --- | --- |
| **Invalid pairing code**, **This pairing code has expired**, **This pairing code has already been used** | Literówka, kod starszy niż 5 minut lub kod już wykorzystany | [Kod parowania nieprawidłowy lub wygasły](https://docs.uavmatrix.com/pl/troubleshooting/pairing-code-invalid/) |
| **License is not owned by any member of this organization** | Licencja kupiona na adres e-mail, który nie jest członkiem | [Licencje kupione na inny adres e-mail](https://docs.uavmatrix.com/pl/fleet-manager/licenses/#licenses-bought-with-another-email) |
| **This UAV is already paired to an organization** | Dron nadal należy do innej organizacji | [Przenoszenie drona](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remove-or-transfer/#move-a-drone-to-another-organization) |
| UAVcast-Pro pokazuje **No valid license found** lub **Invalid or inactive license** | Licencja nieaktywowana na dronie, wygasła lub zwrócona | [Licencja się nie aktywuje](https://docs.uavmatrix.com/pl/troubleshooting/license-activation-failed/) |
| Brak przycisku **Pair Device** | Jesteś Viewer | [Role i uprawnienia](https://docs.uavmatrix.com/pl/fleet-manager/team/roles-and-permissions/) |
| Dron utknął na **PAIRING** | Dron jeszcze nie połączył się z brokerem | [Utknięcie na PAIRING](https://docs.uavmatrix.com/pl/fleet-manager/troubleshooting/#stuck-on-pairing) |
| Dron **OFFLINE** | Brak internetu, zablokowany port 8883 lub UAVcast-Pro nie działa | [Dron offline w Fleet Manager](https://docs.uavmatrix.com/pl/troubleshooting/drone-offline-fleet-manager/) |
| **Re-pair required** | Stary certyfikat połączenia | [Ponowne parowanie drona](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone) |
| **NO MAVLINK** na mapie | UAVcast-Pro nie otrzymuje danych z kontrolera lotu | [Brak heartbeat MAVLink](https://docs.uavmatrix.com/pl/troubleshooting/no-mavlink-heartbeat/) |
| Powiązanie się nie udaje: **Failed to send configuration to drone - it may be offline** | Dron offline lub nie potwierdził w ciągu 15 s | [Powiązanie nie zapisuje się](https://docs.uavmatrix.com/pl/fleet-manager/troubleshooting/#binding-wont-save) |
| Powiązanie istnieje, brak telemetrii lub wideo w stacji naziemnej | Zapora, zły port lub wyłączony strumień | [Brak strumienia w stacji naziemnej](https://docs.uavmatrix.com/pl/fleet-manager/troubleshooting/#no-stream-at-the-ground-station) |
| Stacja naziemna dołączyła do VPN, ale nie może połączyć się z dronem | Typ urządzenia, dron poza VPN lub zablokowany UDP | [VPN połączony, ale brak dostępu do drona](https://docs.uavmatrix.com/pl/troubleshooting/vpn-cant-reach-drone/) |
| Polecenia nie działają, **UAVcast Upgrade Required** | Dron offline, rola Viewer lub stara wersja UAVcast-Pro | [Polecenia nie działają](https://docs.uavmatrix.com/pl/fleet-manager/troubleshooting/#commands-fail) |
| **Request timed out. UAVcast may be unreachable.** przy zdalnym otwieraniu UAVcast-Pro | Wolne łącze przez proxy | [Proxy jest wolne lub niepełne](https://docs.uavmatrix.com/pl/fleet-manager/troubleshooting/#proxy-is-slow-or-incomplete) |
| E-mail z zaproszeniem nigdy nie dotarł | Filtr spamu lub błędny adres | [Zaproszenie nie dotarło](https://docs.uavmatrix.com/pl/fleet-manager/troubleshooting/#invitation-not-received) |

## Utknięcie na PAIRING

**PAIRING** oznacza, że Fleet Manager zaakceptował kod i czeka na pierwszy heartbeat drona przez MQTT.

1. Sprawdź stronę **Fleet Management** w UAVcast-Pro. Jeśli nadal pokazuje **Waiting for Manager to confirm pairing...**, dron nie pobrał certyfikatu. Sprawdź, czy ma dostęp do internetu.

2. Sprawdź wychodzące TCP 8883 z drona:

   ```bash
   nc -vz fleet-manager.uavmatrix.com 8883
   ```

3. Jeśli wpisałeś **starszy** kod z tego samego drona (na przykład po dwukrotnym wybraniu **Connect to Fleet Manager**), UAVcast-Pro na niego nie czeka. Wybierz **Disconnect from Fleet**, jeśli jest widoczny, pobierz nowy kod i sparuj ponownie z tą samą organizacją. Dron zachowuje swój wpis.

Dron ma 15 minut od wygaśnięcia kodu na pobranie certyfikatu. Po tym czasie sparuj go ponownie.

## Powiązanie nie zapisuje się

Fleet Manager zapisuje powiązanie dopiero po potwierdzeniu go przez drona. Sprawdź, czy dron pokazuje **ONLINE**, i spróbuj ponownie. Jeśli dron jest online, ale powiązania nadal się nie udają, dron może nie być w VPN: sprawdź **Network → Connected Devices**, czy jest tam z typem **UAV**, lub użyj **Push to Drone**.

## Brak strumienia w stacji naziemnej

1. W **Network → Stream Bindings** sprawdź, czy **Video** i **Telemetry** są włączone, i zanotuj **Ports**.
2. Sprawdź, czy oprogramowanie stacji naziemnej nasłuchuje na dokładnie tych portach. Tylko pierwszy dron na laptopie używa 5600 / 14550; każdy kolejny ma własne porty.
3. Zezwól na przychodzący UDP na tych portach w zaporze laptopa. W Windows zezwól QGroundControl lub Mission Planner w sieciach **Private** i **Public**.
4. Uruchom `tailscale status` na laptopie i sprawdź, czy dron jest na liście.

Więcej szczegółów: [Brak telemetrii w stacji naziemnej](https://docs.uavmatrix.com/pl/troubleshooting/no-telemetry-in-gcs/) oraz [Brak wideo w stacji naziemnej](https://docs.uavmatrix.com/pl/troubleshooting/no-video-in-gcs/).

## Polecenia nie działają

- Dron musi być **ONLINE**.
- Polecenia mogą wysyłać tylko Owner i Admin. Viewer nie widzi przycisków poleceń, a serwer odrzuca polecenia od nich.
- Uzbrajanie, rozbrajanie i kalibracja przed lotem wymagają UAVcast-Pro 6.3.0_rc13 lub nowszego. [Zaktualizuj UAVcast-Pro](https://docs.uavmatrix.com/pl/get-started/updating/).
- Kontroler lotu może odrzucić polecenie, na przykład uzbrojenie przy niezaliczonych kontrolach przed uzbrojeniem. Przeczytaj jego komunikat w dymku na mapie lub na karcie **Logs**.

## Proxy jest wolne lub niepełne

**Open via Proxy** przekazuje każde żądanie strony przez łącze drona, z limitem 30 sekund na żądanie, i nie obsługuje funkcji na żywo (WebSocket). Przy słabym łączu komórkowym poczekaj, aż strona w pełni się załaduje, albo dołącz do VPN i użyj **Open via VPN**. Zobacz [Zdalne otwieranie UAVcast-Pro](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remote-uavcast/).

## Zaproszenie nie dotarło

Poproś osobę o sprawdzenie folderu spamu. Na stronie **Team** sprawdź adres e-mail w sekcji **Pending Invitations**. Jeśli jest błędny, wybierz **Revoke** i zaproś ponownie. Zaproszenia wygasają po 7 dniach.

## Nadal nie działa

Otwórz zgłoszenie przyciskiem wsparcia wraz ze zrzutem ekranu lub napisz na [support@uavmatrix.com](mailto:support@uavmatrix.com). Podaj nazwę drona i jego identyfikator urządzenia (na jego stronie UAV). Wyślij pakiet logów UAVcast-Pro (ZIP) na [support@uavmatrix.com](mailto:support@uavmatrix.com) wraz z numerem zgłoszenia, ponieważ zgłoszenia przyjmują tylko obrazy. Zobacz [Wsparcie](https://docs.uavmatrix.com/pl/fleet-manager/support/) oraz [Zbieranie logów](https://docs.uavmatrix.com/pl/troubleshooting/collect-logs/).

Source: https://docs.uavmatrix.com/pl/fleet-manager/troubleshooting/
