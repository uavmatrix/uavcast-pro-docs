# Słownik

> Proste wyjaśnienia terminów w dokumentacji UAVcast-Pro i Fleet Manager: MAVLink, GCS, heartbeat, APN, HiLink, NTRIP, RTCM, VRS, ZeroTier, Tailscale.

### AGL / AMSL

Wysokość nad poziomem terenu (tutaj: nad punktem startu) oraz nad średnim poziomem morza. UAVcast-Pro używa tych terminów od v6.5.0, zastępując REL i MSL.

### APN (Nazwa Punktu Dostępu)

Nazwa bramy operatora, przez którą łączy się modem komórkowy. UAVcast-Pro wykrywa ją automatycznie, gdy pole **Nazwa Punktu Dostępu (Opcjonalne)** jest puste.

### ArduPilot

Oprogramowanie autopilota o otwartym kodzie dla multikopterów, samolotów, VTOL, łazików i łodzi. UAVcast-Pro współpracuje z ArduPilot oraz z każdym innym kontrolerem lotu MAVLink, na przykład PX4. Jego przyciski trybów lotu używają nazw trybów ArduPilot.

### Klucz auth

Klucz Tailscale, który loguje urządzenie do tailnetu bez przeglądarki. Fleet Manager używa kluczy auth, aby umieszczać stacje naziemne w VPN organizacji.

### Bitrate

Liczba bitów na sekundę, którą wytwarza koder wideo. Musi się mieścić w łączu wysyłania twojego połączenia, z zapasem.

### Kamera CSI

Kamera podłączona do złącza taśmowego Raspberry Pi, na przykład Camera Module 3.

### Miejsce docelowe

W UAVcast-Pro wpis stacji naziemnej w sekcji **Stacje Naziemne**: adres IP z portem telemetrii i portem wideo.

### Podwójny strumień

Strumieniowanie dwóch kamer do stacji naziemnej jednocześnie, na dwóch portach wideo.

### Fleet Manager

Panel webowy UAVmatrix do monitorowania i sterowania wieloma dronami UAVcast-Pro w jednej organizacji.

### GCS (stacja naziemna)

Oprogramowanie oraz komputer, na którym działa, używane do monitorowania i sterowania dronem: QGroundControl, Mission Planner, MAVProxy.

### Failsafe GCS

Ustawienie kontrolera lotu, dzięki któremu dron działa samodzielnie (powrót, lądowanie, loiter), gdy przestaje słyszeć stację naziemną.

### GGA

Zdanie NMEA z twoją pozycją. Casterzy VRS i NTRIP z najbliższym mountpointem potrzebują go, aby obliczyć poprawki dla twojej lokalizacji.

### H.264

Format kompresji wideo, który wysyła UAVcast-Pro. Każda popularna stacja naziemna potrafi go zdekodować.

### Heartbeat

Wiadomość MAVLink, którą kontroler lotu wysyła mniej więcej raz na sekundę, aby powiedzieć „jestem tutaj”. *Brak heartbeat* oznacza, że łącze nie przenosi czytelnego MAVLink.

### Modem HiLink

Modem USB z wbudowanym routerem, który łączy się samodzielnie i jest widziany w Linuksie jako karta sieciowa.

### Wstrzykiwacz

Odbiornik UAVcast-Pro (HTTP, UDP lub port szeregowy), który zamienia twoje własne wartości czujników w wiadomości MAVLink `NAMED_VALUE_FLOAT`.

### Klatka kluczowa

Kompletna klatka wideo, od której dekoder może zacząć. Częstsze klatki kluczowe szybciej odzyskują obraz po utracie pakietów. Ustawiane w **Szybkość Odzyskiwania Strumienia**.

### MAVLink

Protokół wiadomości między kontrolerami lotu a stacjami naziemnymi.

### Mountpoint

Nazwany strumień poprawek na casterze NTRIP, zwykle powiązany z jedną stacją bazową lub usługą VRS.

### MQTT

Protokół wiadomości, którego drony używają do komunikacji z Fleet Manager, szyfrowany przez TLS na porcie 8883.

### NTRIP / caster NTRIP

Protokół oraz serwer do przesyłania poprawek GNSS przez internet.

### Kod parowania

8-cyfrowy kod, który UAVcast-Pro pokazuje, gdy podłączasz drona do Fleet Manager. Ważny przez 5 minut, jednorazowo.

### Read Only (miejsce docelowe)

Miejsce docelowe stacji naziemnej, które odbiera telemetrię, ale nie może niczego zmienić w pojeździe: polecenia, zmiany trybu oraz zapisy parametrów i misji z tego miejsca są blokowane. Dotyczy to UAVcast-Pro od wersji 6.5.3; we wcześniejszych wersjach Read Only nie blokuje zapisu parametrów.

### Read Only (użytkownik)

Rola użytkownika UAVcast-Pro, który może przeglądać strony, ale nie może zmieniać ustawień ani sterować dronem.

### RTCM3

Standardowy format wiadomości dla poprawek GNSS.

### RTK, RTK Float, RTK Fixed

Pozycjonowanie w czasie rzeczywistym z poprawkami. Float to przybliżone rozwiązanie; Fixed to rozwiązanie z dokładnością do centymetrów.

### RTP / UDP

Transport, którego UAVcast-Pro używa do wideo i telemetrii: szybki, bez retransmisji, co utrzymuje niskie opóźnienie.

### SERIALx_PROTOCOL / SERIALx_BAUD

Parametry ArduPilot określające, jakim protokołem mówi port szeregowy (2 = MAVLink2) i z jaką prędkością.

### Powiązanie strumienia

W Fleet Manager łącze, które wysyła wideo i telemetrię jednego drona do jednej stacji naziemnej na jej własnych portach.

### sysid / compid

Identyfikator systemu MAVLink (który pojazd) i identyfikator komponentu (która jego część). Kontroler lotu to zwykle sysid 1, compid 1.

### Tailnet

Prywatna sieć Tailscale.

### Tailscale

VPN oparty na WireGuard. UAVcast-Pro może dołączyć do twojego tailnetu lub do sieci organizacji Fleet Manager.

### UAVnet

Hostowany przez UAVmatrix kontroler sieci ZeroTier pod adresem uavnet.uavmatrix.com. Jest wycofywany na rzecz VPN Fleet Manager; obecni użytkownicy powinni przenieść się do Fleet Manager.

### VRS (wirtualna stacja referencyjna)

Usługa poprawek, która oblicza poprawki dla twojej pozycji na podstawie sieci stacji bazowych. Wymaga przesyłania GGA w górę.

### ZeroTier

VPN typu peer-to-peer. UAVcast-Pro może dołączyć do twojej własnej sieci ZeroTier.

Source: https://docs.uavmatrix.com/pl/reference/glossary/
