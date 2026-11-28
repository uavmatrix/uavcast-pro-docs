# Fleet Manager FAQ

> Antwoorden op veelgestelde vragen over Fleet Manager: drone-limieten, licenties, VPN, grondstations, ArduPilot en PX4, bewaring van gegevens en het verplaatsen van drones.

### Wat heb ik nodig om Fleet Manager te gebruiken?

Een UAVmatrix-account, en drones met UAVcast-Pro en een geactiveerde licentie. De licentie van elke drone moet eigendom zijn van een gebruiker van uw organisatie. Zie [Licenties en plaatsen](https://docs.uavmatrix.com/nl/fleet-manager/licenses/).

### Kost Fleet Manager extra?

Nee. Fleet Manager is inbegrepen bij uw UAVcast-Pro-licentie. Er is geen apart abonnement en teamleden zijn gratis.

### Hoeveel drones kan ik beheren?

Fleet Manager zelf stelt geen limiet. Elke drone heeft een eigen UAVcast-Pro-licentieactivering nodig, dus het aantal drones volgt de licenties en apparaatplaatsen die u bezit.

### Hebben teamleden een licentie nodig?

Nee. Nodig zoveel Admins en Viewers uit als u nodig hebt. Zie [Uw team uitnodigen](https://docs.uavmatrix.com/nl/fleet-manager/team/).

### Welke rollen zijn er?

**Owner**, **Admin** en **Viewer**. Er is geen rol "Member". Zie [Rollen en rechten](https://docs.uavmatrix.com/nl/fleet-manager/team/roles-and-permissions/).

### Waar komt de koppelcode vandaan?

De koppelcode komt van de drone. In UAVcast-Pro opent u **Fleet Management → Connect to Fleet Manager**. Daar verschijnt een 8-cijferige code die 5 minuten geldig is. U voert die in Fleet Manager in onder **Fleet → Pair Device**. Zie [Uw eerste drone toevoegen](https://docs.uavmatrix.com/nl/fleet-manager/pair-uav/).

### Werkt Fleet Manager via 4G/LTE?

Ja. De drone maakt een verbinding naar buiten met Fleet Manager op TCP 8883, dus het werkt achter carrier-NAT zonder publiek IP-adres. De provider mag poort 8883 niet blokkeren.

### Heb ik de VPN nodig?

Alleen om video en telemetrie van drones via Fleet Manager naar grondstations te sturen. De kaart, telemetrie, commando's, missies, terminal en externe toegang tot UAVcast-Pro werken allemaal zonder VPN. Zie [Netwerk en VPN](https://docs.uavmatrix.com/nl/fleet-manager/network/).

### Kan één grondstation meerdere drones ontvangen?

Ja. Elke [streamkoppeling](https://docs.uavmatrix.com/nl/fleet-manager/network/stream-bindings/) krijgt een eigen blok poorten op dat grondstation, met ruimte voor een tweede camera en audio. De eerste drone gebruikt 5600 / 14550.

### Kan ik mijn eigen ZeroTier- of Tailscale-netwerk blijven gebruiken?

Ja, als u geen streamkoppelingen van Fleet Manager nodig hebt. U kunt de VPN weigeren bij het koppelen. Als u accepteert, wordt een drone die al op een Tailscale-netwerk zit, verplaatst naar het netwerk van uw organisatie. Een drone op ZeroTier behoudt zijn ZeroTier-netwerk en sluit zich naast dat netwerk ook aan op het netwerk van de organisatie. ZeroTier wordt alleen verlaten wanneer u de drone ontkoppelt.

### Werkt het met ArduPilot en PX4?

Fleet Manager werkt met elke MAVLink-vluchtcontroller waarmee UAVcast-Pro communiceert, ArduPilot of PX4. Live kaart, telemetrie, status, de terminal en streamkoppelingen zijn hetzelfde. De vluchtmodusbediening gebruikt de ArduPilot-modi voor Copter, Plane, Rover en Sub, en de lijst met missiecommando's volgt de ArduPilot-naamgeving. Op PX4 wijzigt u daarom modi en plant u missies vanaf uw grondstation.

### Kan ik een drone alleen vanuit Fleet Manager vliegen?

Fleet Manager kan modi wijzigen, motoren armen, en missies starten, pauzeren en stoppen. Het is niet gebouwd voor handmatige besturing met de stick. Houd altijd een piloot met een grondstation of RC-zender in controle en volg de plaatselijke regelgeving.

### Hoe lang wordt de vlucthistorie bewaard?

Standaard tot 1 jaar. Owners en Admins kunnen dit verkorten tot 7, 14, 30, 60 of 90 dagen, of tot 6 maanden. Zie [Vlucthistorie](https://docs.uavmatrix.com/nl/fleet-manager/map/flight-history/#how-long-history-is-kept).

### Kan ik vluchtlogs exporteren?

Nog niet. Fleet Manager speelt vluchten af op de kaart, maar exporteert geen bestanden en slaat geen `.tlog`, DataFlash of video op.

### Stuurt Fleet Manager meldingen per e-mail?

Nog niet. De status wordt live getoond op de kaart, in de vlootlijst en op de UAV-pagina's. Zie [Statusindicatoren en meldingen](https://docs.uavmatrix.com/nl/fleet-manager/alerts-and-status/).

### Wat gebeurt er als een drone de verbinding verliest?

Na 20 seconden zonder gegevens wordt de drone als **OFFLINE** getoond. De drone maakt automatisch weer verbinding zodra de link terugkomt. De eigen failsafes van de vluchtcontroller bepalen wat het toestel doet. Fleet Manager geeft bij verbindingsverlies geen commando's.

### Hoe verplaats ik een drone naar een andere organisatie?

Verwijder de drone uit de huidige organisatie (dit verwijdert de geschiedenis daar) en koppel hem daarna aan de nieuwe organisatie. Zie [Een drone opnieuw koppelen, verwijderen of overdragen](https://docs.uavmatrix.com/nl/fleet-manager/fleet/remove-or-transfer/).

### Ik heb licenties gekocht met een ander e-mailadres. Wat nu?

Nodig dat e-mailadres uit voor de organisatie, of vraag support om het als extra licentie-e-mailadres aan uw account toe te voegen. Zie [Licenties gekocht met een ander e-mailadres](https://docs.uavmatrix.com/nl/fleet-manager/licenses/#licenses-bought-with-another-email).

### Is er een mobiele app?

Er is een telefoonvriendelijke [Lite view](https://docs.uavmatrix.com/nl/fleet-manager/lite-view/) in de browser.

### Zijn mijn gegevens veilig?

Elke drone heeft een eigen TLS-clientcertificaat, elke organisatie heeft een eigen versleutelde VPN en rollen worden op de server afgedwongen. Zie [Beveiliging en privacy](https://docs.uavmatrix.com/nl/fleet-manager/security/).

Source: https://docs.uavmatrix.com/nl/fleet-manager/faq/
