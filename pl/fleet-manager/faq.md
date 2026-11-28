# FAQ Fleet Manager

> Odpowiedzi na częste pytania o Fleet Manager: limity dronów, licencje, VPN, stacje naziemne, ArduPilot i PX4, przechowywanie danych oraz przenoszenie dronów.

### Czego potrzebuję, aby korzystać z Fleet Manager?

Konta UAVmatrix oraz dronów z UAVcast-Pro i aktywowaną licencją. Licencja każdego drona musi należeć do członka twojej organizacji. Zobacz [Licencje i miejsca](https://docs.uavmatrix.com/pl/fleet-manager/licenses/).

### Czy Fleet Manager kosztuje dodatkowo?

Nie. Fleet Manager jest wliczony w twoją licencję UAVcast-Pro. Nie ma osobnej subskrypcji, a członkowie zespołu są bezpłatni.

### Ilu dronów mogę zarządzać?

Sam Fleet Manager nie ustala limitu. Każdy dron potrzebuje własnej aktywacji licencji UAVcast-Pro, więc liczba dronów zależy od licencji i miejsc na urządzenia, które posiadasz.

### Czy członkowie zespołu potrzebują licencji?

Nie. Zaproś tylu Adminów i Viewerów, ilu potrzebujesz. Zobacz [Zaproś zespół](https://docs.uavmatrix.com/pl/fleet-manager/team/).

### Jakie są role?

**Owner**, **Admin** i **Viewer**. Nie ma roli „Member”. Zobacz [Role i uprawnienia](https://docs.uavmatrix.com/pl/fleet-manager/team/roles-and-permissions/).

### Skąd bierze się kod parowania?

Z drona. W UAVcast-Pro otwórz **Fleet Management → Connect to Fleet Manager**. Pojawi się 8-cyfrowy kod ważny przez 5 minut. Wpisujesz go w Fleet Manager w **Fleet → Pair Device**. Zobacz [Dodaj pierwszego drona](https://docs.uavmatrix.com/pl/fleet-manager/pair-uav/).

### Czy Fleet Manager działa przez 4G/LTE?

Tak. Dron łączy się z Fleet Manager na zewnątrz, na TCP 8883, więc działa za NAT operatora bez publicznego IP. Operator nie może blokować portu 8883.

### Czy potrzebuję VPN?

Tylko po to, by wysyłać wideo i telemetrię z dronów do stacji naziemnych przez Fleet Manager. Mapa, telemetria, polecenia, misje, terminal i zdalny dostęp do UAVcast-Pro działają bez niego. Zobacz [Sieć i VPN](https://docs.uavmatrix.com/pl/fleet-manager/network/).

### Czy jedna stacja naziemna może odbierać kilka dronów?

Tak. Każde [powiązanie strumienia](https://docs.uavmatrix.com/pl/fleet-manager/network/stream-bindings/) dostaje własny blok portów na tej stacji naziemnej, z miejscem na drugą kamerę i dźwięk. Pierwszy dron używa 5600 / 14550.

### Czy mogę nadal używać mojej sieci ZeroTier lub Tailscale?

Tak, jeśli nie potrzebujesz powiązań strumieni Fleet Manager. Możesz odmówić VPN podczas parowania. Jeśli się zgodzisz, dron już będący w sieci Tailscale zostanie przeniesiony do sieci twojej organizacji. Dron w sieci ZeroTier zachowa swoją sieć ZeroTier i dołączy do sieci organizacji obok niej. ZeroTier jest opuszczany dopiero po odłączeniu drona.

### Czy to działa z ArduPilot i PX4?

Fleet Manager współpracuje z każdym kontrolerem lotu MAVLink, z którym rozmawia UAVcast-Pro, czyli z ArduPilot lub PX4: mapa na żywo, telemetria, status, terminal i powiązania strumieni działają tak samo. Elementy sterowania trybami lotu używają trybów ArduPilot dla Copter, Plane, Rover i Sub, a lista poleceń misji odpowiada nazwom ArduPilot. Na PX4 zmieniaj więc tryby i planuj misje w swojej stacji naziemnej.

### Czy mogę sterować dronem wyłącznie z Fleet Manager?

Fleet Manager może zmieniać tryby, uzbrajać oraz uruchamiać, wstrzymywać i zatrzymywać misje. Nie jest przeznaczony do ręcznego sterowania drążkami. Zawsze utrzymuj pilota ze stacją naziemną lub nadajnikiem RC w kontroli i przestrzegaj lokalnych przepisów.

### Jak długo przechowywana jest historia lotów?

Domyślnie do 1 roku. Owner i Admin mogą skrócić ten okres do 7, 14, 30, 60 lub 90 dni albo do 6 miesięcy. Zobacz [Historia lotów](https://docs.uavmatrix.com/pl/fleet-manager/map/flight-history/#how-long-history-is-kept).

### Czy mogę eksportować logi lotów?

Nie, na razie. Fleet Manager odtwarza loty na mapie, ale nie eksportuje plików ani nie przechowuje plików `.tlog`, DataFlash ani wideo.

### Czy Fleet Manager wysyła alerty e-mailem?

Jeszcze nie. Status jest pokazywany na żywo na mapie, na liście floty i na stronach UAV. Zobacz [Wskaźniki statusu i powiadomienia](https://docs.uavmatrix.com/pl/fleet-manager/alerts-and-status/).

### Co się dzieje, gdy dron traci połączenie?

Po 20 sekundach bez danych dron jest pokazywany jako **OFFLINE** i łączy się ponownie sam, gdy jego łącze wróci. O tym, co zrobi statek, decydują failsafe kontrolera lotu; Fleet Manager nie wysyła żadnych poleceń przy utracie połączenia.

### Jak przenieść drona do innej organizacji?

Usuń go z obecnej organizacji (to kasuje jego historię tam), a następnie sparuj go z nową. Zobacz [Ponowne parowanie, usuwanie lub przenoszenie drona](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remove-or-transfer/).

### Kupiłem licencje na inny e-mail. Co teraz?

Zaproś ten adres e-mail do organizacji albo poproś pomoc techniczną o dodanie go jako dodatkowego e-maila licencyjnego na twoim koncie. Zobacz [Licencje kupione na innym e-mailu](https://docs.uavmatrix.com/pl/fleet-manager/licenses/#licenses-bought-with-another-email).

### Czy jest aplikacja mobilna?

Jest przyjazny dla telefonu [widok Lite](https://docs.uavmatrix.com/pl/fleet-manager/lite-view/) w przeglądarce.

### Czy moje dane są bezpieczne?

Każdy dron ma własny certyfikat klienta TLS, każda organizacja ma własne szyfrowane VPN, a role są egzekwowane po stronie serwera. Zobacz [Bezpieczeństwo i prywatność](https://docs.uavmatrix.com/pl/fleet-manager/security/).

Source: https://docs.uavmatrix.com/pl/fleet-manager/faq/
