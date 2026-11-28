# Szybki start

> Podłącz kontroler lotu MAVLink do UAVcast-Pro i uzyskaj telemetrię oraz wideo na żywo w Mission Planner lub QGroundControl, najpierw w sieci lokalnej, a potem przez 4G/LTE.

Ten przewodnik prowadzi od drona z zainstalowanym UAVcast-Pro do telemetrii i wideo na żywo w Mission Planner lub QGroundControl. Zaczniesz w sieci lokalnej, gdzie jest mniej rzeczy, które mogą pójść źle, a potem przełączysz się na 4G/LTE. Część lokalna zajmuje około 10 minut.

## Zanim zaczniesz

- Zainstalowany UAVcast-Pro i zrestartowane urządzenie. Zobacz [Instalacja](https://docs.uavmatrix.com/pl/get-started/installation/).
- Twój klucz licencyjny. Zobacz [Licencjonowanie i aktywacja](https://docs.uavmatrix.com/pl/get-started/license-activation/).
- Kontroler lotu podłączony do komputera pokładowego przez USB lub port TELEM i zasilany.
- Podłączona kamera (opcjonalnie).
- Laptop z Mission Planner lub QGroundControl w **tej samej sieci** co dron. Zanotuj adres IP laptopa (`ipconfig` w Windows, `ip a` w Linuksie, **System Settings → Network** w macOS).

## 1. Aktywuj licencję

> Do aktywacji drona potrzebujesz licencji UAVcast-Pro. Kup ją w sklepie UAVmatrix.
>
> [Kup UAVcast-Pro](https://uavmatrix.com/pl/checkout) · [Zobacz plany i ceny](https://uavmatrix.com/pl/products)

1. Otwórz w przeglądarce `http://<drone-ip>`. Trafisz na stronę **Aplikacja**.
2. Wklej klucz w pole **Enter License Key** i wybierz **Validate**.

Pasek boczny się odblokuje. Teraz przejdź do **Users**, wybierz **Add User** i utwórz konto administratora, aby interfejs web nie był otwarty dla każdego w sieci.

## 2. Podłącz kontroler lotu

1. Przejdź do **Kontroler Lotu → Połączenie**.
2. W **Link type** wybierz **USB** lub **UART / Serial**, zgodnie z okablowaniem.
3. Pozostaw **Port** i **Baud rate** na **Automatic**.
4. Jeśli panel stanu pokazuje **Link stopped**, wybierz **Connect**.
5. Poczekaj, aż stan zmieni się na **Connected**. **Informacje Mavlink** wypełni się typem pojazdu, trybem lotu, GPS i baterią, a górny pasek pokaże **FC Connected**.

![Strona Kontroler Lotu → Połączenie pokazująca połączenie przez USB (Connected), Connection check z czterema zaliczonymi krokami oraz Inspektor MAVLink](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/flight-controller.webp)

*Kontroler Lotu → Połączenie z działającym połączeniem USB.*

Utknąłeś na **Waiting for device**, **Detecting baud rate** lub **No heartbeat**? Wybierz **Auto-detect** i przeczytaj panel **Connection check**: wskaże on pierwszą rzecz, która jest nie tak. Więcej w [Kontroler lotu](https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/).

## 3. Wyślij telemetrię i wideo na laptop

1. Przejdź do **Stacje Naziemne**. Jest tam już jedna pusta karta miejsca docelowego.
2. Wpisz **Name**, na przykład `Laptop`.
3. W polu **IP lub Host Docelowy** wpisz adres IPv4 laptopa, na przykład `192.168.1.20`, i naciśnij Enter. Zielony znacznik oznacza, że zapisano.
4. Pozostaw **Port Telemetrii** na `14550`, a **Port Wideo** na `5600`.
5. Ustaw przełącznik **Włącz Telemetrię** na włączony.
6. Jeśli masz kamerę, ustaw przełącznik **Włącz Wideo** na włączony.

Pola zapisują się, gdy je opuścisz. Nie ma przycisku **Zapisz**.

## 4. Uruchom kamerę

Pomiń ten krok, jeśli nie masz kamery.

1. Przejdź do **Kamera → Ustawienia kamery**.
2. Ustaw **Włączyć Kamerę?** na **Tak**.
3. Kliknij slot **CAM 1** i wybierz kamerę, na przykład *Raspberry Pi Camera - imx708 (CSI)* lub swoją kamerę USB.
4. W sekcji **Ustawienia Kamery** wybierz **Rozdzielczość**. Zacznij od `1280x720` lub najbliższego rozmiaru, jaki oferuje kamera.
5. Pozostaw **Wybierz FPS** na **Auto**, a **Bitrate** na `0` (auto).
6. W sekcji **Ustawienia Strumienia** zaznacz **Włączyć Podgląd na Żywo?** i wybierz **Uruchom**. **Podgląd na Żywo** pokaże obraz.

## 5. Otwórz stację naziemną

**QGroundControl**

QGroundControl domyślnie nasłuchuje na UDP 14550, więc dron pojawi się sam w ciągu kilku sekund.

Wideo: kliknij ikonę **Q** → **Application Settings** → **Video** (w starszych wersjach sekcja **Video** w **General**). Ustaw **Source** na **UDP h.264 Video Stream** i zostaw domyślny port UDP `5600`. Obraz pojawi się w widoku Fly.

**Mission Planner**

W prawym górnym rogu wybierz **UDP**, kliknij **Connect** i zaakceptuj port `14550`.

![Widok Flight Data w Mission Planner połączony przez UDP: w prawym górnym polu połączenia widać UDP, łącze UDP14550-1-QUADRO i przycisk DISCONNECT; HUD pokazuje DISARMED, Unhealthy AHRS oraz GPS: No Fix](https://docs.uavmatrix.com/pl/img/screenshots/gcs/mission-planner--connected.webp)

*Mission Planner połączony przez UDP 14550: pole połączenia (u góry po prawej) pokazuje łącze i przycisk DISCONNECT. Stanowisko testowe bez GPS, stąd Unhealthy AHRS i GPS: No Fix na HUD.*

Wideo: kliknij prawym przyciskiem HUD → **Video** → **Set GStreamer Source** i wklej:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

Pełne przewodniki ze zrzutami ekranu i rozwiązaniami problemów: [Mission Planner](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/mission-planner/), [QGroundControl](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/qgroundcontrol/), [Android](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/android/), a także GStreamer dla [Windows](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-linux/) lub [macOS](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-macos/).

> **Zapora Windows**
>
> Windows blokuje przychodzący ruch UDP, chyba że aplikacja poprosiła o wyjątek. Jeśli telemetria lub wideo nie docierają, zezwól Mission Planner lub QGroundControl w zaporze dla sieci **prywatnych i publicznych** albo otwórz UDP 14550 i 5600.

Masz teraz telemetrię i wideo w sieci lokalnej. Wiersz **Ground station** na panelu pokazuje *Sending · … packets/s*.

## 6. Lataj przez 4G/LTE

Przez sieć komórkową dron nie ma adresu, pod który może dotrzeć laptop, więc oba urządzenia łączą się z tym samym VPN. VPN Fleet Manager jest dołączony do twojej licencji.

1. Podłącz modem. W **Modem** ustaw **Typ modemu** na **HiLink** lub **Traditional (PPP)**. Zostaw pole **Nazwa Punktu Dostępu** puste: UAVcast-Pro znajdzie APN. Zobacz [Modem komórkowy](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/cellular-modem/).
2. Zaloguj się do [Fleet Manager](https://fleet-manager.uavmatrix.com/), otwórz **Network** i wybierz **Enable VPN Network**, jeśli nie jest jeszcze włączony.
3. Sparuj dron: w UAVcast-Pro przejdź do **Zarządzanie → Fleet Management → Connect to Fleet Manager**, a następnie wpisz kod w Fleet Manager w sekcji **Fleet → Pair Device**. Zostaw zaznaczone **Enable VPN for this UAV**.
4. Podłącz laptop do VPN: zainstaluj Tailscale i uruchom **GCS Connection Command** ze strony **Network** w Fleet Manager, a następnie oznacz laptop jako **Ground Control Station (GCS)**.
5. W **Network → Stream Bindings** dodaj powiązanie strumienia od drona do laptopa. Fleet Manager wyśle miejsce docelowe do drona, a kolumna **Ports** pokaże, na których portach nasłuchiwać.
6. W sekcji **Sieci** wybierz **Modem Priority (Outdoor Mode)**, aby ruch szedł przez modem, gdy Wi-Fi zaniknie.

Pełny przewodnik: [Lot poza zasięgiem wzroku przez 4G](https://docs.uavmatrix.com/pl/guides/bvlos-4g/). Masz już własną sieć Tailscale lub ZeroTier? Dołącz do niej dron i laptop, a jako miejsce docelowe użyj adresu VPN laptopa: zobacz [VPN](https://docs.uavmatrix.com/pl/uavcast-pro/connectivity/vpn/).

> **Ustaw failsafe GCS przed lotem przez LTE**
>
> Łącza komórkowe się zrywają. Upewnij się, że kontroler lotu ma skonfigurowany failsafe GCS (`FS_GCS_ENABLE` w ArduPilot, `NAV_DLL_ACT` w PX4). Górny pasek pokazuje **GCS Failsafe Enabled** lub **GCS Failsafe Disabled**.

## Następne kroki

- [Dwie kamery, przełączanie RC i podwójny strumień](https://docs.uavmatrix.com/pl/uavcast-pro/camera/multi-camera/)
- [Nagrywaj każdy lot na dronie](https://docs.uavmatrix.com/pl/uavcast-pro/camera/recordings/)
- [Korekcje RTK przez 4G z NTRIP](https://docs.uavmatrix.com/pl/uavcast-pro/flight-controller/ntrip-rtk/)
- [Sparuj dron z Fleet Manager](https://docs.uavmatrix.com/pl/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/pl/get-started/quick-start/
