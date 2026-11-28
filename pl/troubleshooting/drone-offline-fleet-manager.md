# Dron pokazuje Offline w Fleet Manager

> Sparowany UAV pokazuje Offline lub Re-pair required w Fleet Manager? Sprawdź internet drona, wychodzący port 8883, Fleet Management w UAVcast-Pro i licencję.

UAV jest sparowany, ale Fleet Manager pokazuje go jako **Offline** (szary na mapie floty), jego telemetria jest zamrożona albo ma odznakę **Re-pair required**.

Fleet Manager oznacza UAV jako offline, gdy przez 20 sekund nic od niego nie odebrał. Dron łączy się z Fleet Manager przez szyfrowane połączenie MQTT, korzystając z własnego połączenia internetowego.

| Co widzisz | Prawdopodobna przyczyna | Zacznij od |
| --- | --- | --- |
| Offline, a UAVcast-Pro Fleet Management pokazuje Disconnected | Dron nie ma internetu albo port 8883 jest zablokowany | [Sprawdzenie 1](https://docs.uavmatrix.com/pl/troubleshooting/drone-offline-fleet-manager/#check-1) |
| Odznaka Re-pair required lub This UAV must be re-paired | Dron ma stary certyfikat | [Sprawdzenie 2](https://docs.uavmatrix.com/pl/troubleshooting/drone-offline-fleet-manager/#check-2) |
| Offline zaraz po ponownej instalacji lub resecie UAVcast-Pro | Parowanie zostało usunięte na dronie | [Sprawdzenie 3](https://docs.uavmatrix.com/pl/troubleshooting/drone-offline-fleet-manager/#check-3) |
| Online, ale bez pozycji i baterii | Kontroler lotu nie jest połączony z UAVcast-Pro | [Sprawdzenie 4](https://docs.uavmatrix.com/pl/troubleshooting/drone-offline-fleet-manager/#check-4) |

## Sprawdzenie 1: Połączenie drona z Fleet Manager

1. Otwórz UAVcast-Pro na dronie i przejdź do **Fleet Management**. **Fleet Connection** pokazuje **Connected** lub **Disconnected** oraz **Last Connected**.
2. Jeśli jest **Disconnected**, sprawdź, czy dron ma internet: wiersz **Cellular** na panelu albo `curl -I https://fleet-manager.uavmatrix.com` na urządzeniu. Najpierw napraw łącze według [Modem połączony, brak internetu](https://docs.uavmatrix.com/pl/troubleshooting/modem-no-internet/).
3. Dron musi móc otworzyć **wychodzące połączenie TCP na porcie 8883** (MQTT przez TLS). Niektóre firmowe sieci, publiczne Wi-Fi i część planów SIM dla IoT przepuszczają tylko porty webowe. Spróbuj innej sieci albo poproś operatora o otwarcie portu 8883.
4. Sprawdź datę i godzinę na urządzeniu poleceniem `date`. Połączenie używa certyfikatów, które nie działają na urządzeniu z błędnym zegarem.
5. Upewnij się, że licencja na dronie jest nadal aktywna (**Aplikacja → Menedżer Licencji**).

## Sprawdzenie 2: Wymagane ponowne parowanie

Fleet Manager zmienił sposób łączenia dronów, więc UAV sparowane przed tą zmianą trzeba sparować jeszcze raz. Nic nie przepada: UAV zachowuje nazwę i historię, a w Fleet Manager nie trzeba go usuwać.

1. W UAVcast-Pro na dronie otwórz **Fleet Management** i naciśnij **Disconnect from Fleet**, a następnie potwierdź.
2. Naciśnij **Connect to Fleet Manager**. Pojawi się 8-cyfrowy **Pairing Code** z odliczaniem.
3. W Fleet Manager przejdź do **Fleet → Pair Device**, wybierz organizację i wpisz kod.

## Sprawdzenie 3: Dron stracił parowanie

Ponowna instalacja z resetem bazy danych, **Resetuj Bazę Danych** albo **Disconnect from Fleet** usuwa parowanie na dronie, więc przestaje on raportować. Sparuj go ponownie zgodnie ze sprawdzeniem 2. Parowanie z tą samą organizacją wykorzystuje ponownie istniejący wpis UAV.

## Sprawdzenie 4: Online, ale brak telemetrii

Pozycja, bateria i tryb lotu pochodzą z kontrolera lotu. Jeśli UAV jest online, a te pola są puste, UAVcast-Pro nie słyszy kontrolera lotu: zobacz [Brak heartbeat MAVLink](https://docs.uavmatrix.com/pl/troubleshooting/no-mavlink-heartbeat/).

## Nadal offline?

[Pobierz logi](https://docs.uavmatrix.com/pl/troubleshooting/collect-logs/) z drona z zaznaczonym **All Logs** i wyślij je na **[support@uavmatrix.com](mailto:support@uavmatrix.com)** wraz z nazwą UAV i organizacją. Więcej problemów z Fleet Manager opisano w [Rozwiązywanie problemów w Fleet Manager](https://docs.uavmatrix.com/pl/fleet-manager/troubleshooting/).

Powiązane: [Parowanie Fleet Manager w UAVcast-Pro](https://docs.uavmatrix.com/pl/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/pl/troubleshooting/drone-offline-fleet-manager/
