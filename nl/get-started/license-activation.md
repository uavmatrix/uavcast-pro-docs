# Licentie & activering

> Hoe u een UAVcast-Pro-licentie koopt, activeert op een drone, apparaatplekken controleert, verlengt en verplaatst naar een nieuwe Raspberry Pi of SD-kaart door het oude apparaat uit te schrijven.

UAVcast-Pro heeft op elke drone een geactiveerde licentiesleutel nodig. U koopt een licentie in de UAVmatrix-store, plakt de sleutel op de drone onder **Applicatie → Licentie Beheer** en selecteert **Valideren**. Elke licentie heeft een aantal apparaatplekken. Het activeren van een drone gebruikt één plek; door een drone uit te schrijven komt de plek vrij voor een andere drone.

> Je hebt een UAVcast-Pro-licentie nodig om de drone te activeren. Koop er een in de UAVmatrix-winkel.
>
> [UAVcast-Pro kopen](https://uavmatrix.com/nl/checkout) · [Abonnementen en prijzen](https://uavmatrix.com/nl/products)

## Een licentie kopen

Licenties worden verkocht op [uavmatrix.com/products](https://uavmatrix.com/products/). Elke licentie bevat updates voor de hele looptijd en [Fleet Manager](https://docs.uavmatrix.com/nl/fleet-manager/), inclusief de VPN om de drone via 4G te bereiken.

| Pakket | Apparaatplekken | Geldig voor |
| --- | --- | --- |
| Basic | 1 | 1 jaar |
| Silver | 2 | 1 jaar |
| Gold | 4 | 2 jaar |

De winkelpagina toont altijd de actuele pakketten en prijzen. Er is geen gratis proeflicentie.

Na de betaling ontvangt u een orderbevestigingsmail met de **licentiesleutel**: vijf groepen van vier tekens.

De sleutel staat ook in uw account in de store, onder **Licenties**, met de apparaatplekken en de vervaldatum.

> **De licentieperiode begint bij de eerste activering**
>
> Een licentie die vandaag wordt gekocht en volgende maand wordt geactiveerd, verloopt één periode na de activeringsdatum, niet na de aankoopdatum.

## De licentie op een drone activeren

De drone heeft internettoegang nodig tijdens de activering (wifi, Ethernet of het modem).

1. Open de webinterface van UAVcast-Pro. Een niet-gelicentieerd apparaat opent altijd **Applicatie**.
2. Plak in **Licentie Beheer** de sleutel in **Voer Licentiesleutel in**.
3. Selecteer **Valideren**. U ziet *License activated successfully* en de rest van de zijbalk wordt ontgrendeld.

![Licentie Beheer van UAVcast-Pro met een actieve licentie: geregistreerde naam, toegestane en resterende apparaten, vervaldatum en de tabel met geactiveerde apparaten](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/application--license-activated.webp)

*Applicatie → Licentie Beheer na activering. Het huidige apparaat is gemarkeerd als Current in Geactiveerde apparaten.*

**Licentiegegevens** toont:

| Veld | Betekenis |
| --- | --- |
| **Geregistreerde naam** | Het account in de store waartoe de licentie behoort. |
| **Licentiestatus** | **Actief**, **Inactief** of **Verlopen**. |
| **Toegestane apparaten** | Totaal aantal apparaatplekken. |
| **Resterende apparaten** | Vrije plekken. |
| **Activeringsdatum** / **Vervaldatum** | Wanneer de licentieperiode is begonnen en wanneer hij eindigt. |

**Geactiveerde apparaten** toont elke drone op deze licentie met de **Apparaatnaam**, **Hostnaam** en **Activeringsdatum**. De drone waarop u bent, is gemarkeerd als **Huidig**. Selecteer **Bewerken** om een apparaat een naam te geven die u herkent.

### Activeringsfouten

| Melding | Wat u moet doen |
| --- | --- |
| *Maximum activations reached. Please deactivate another device first or upgrade your license.* | Alle plekken zijn in gebruik. [Schrijf een apparaat uit](https://docs.uavmatrix.com/nl/get-started/license-activation/#unregister-a-device) of voeg plekken toe. |
| *Invalid license key* | Controleer op typefouten of extra spaties. Kopieer de sleutel uit uw account in de store. |
| *License already activated on this device* | Niets te doen. Dit apparaat heeft al een plek (bijvoorbeeld na opnieuw installeren op dezelfde SD-kaart). |
| *Network error! Could not fetch license details…* | Het apparaat heeft geen internet. Controleer **Netwerken** en probeer het opnieuw. |

## Hoe de licentie wordt gecontroleerd

- De drone controleert de licentie elke **4 uur** bij de licentieserver van UAVmatrix.
- Als de server niet bereikbaar is, behoudt de drone zijn laatst bekende status. U kunt zonder internetverbinding vliegen; er wordt niets vergrendeld terwijl u offline bent.
- Een apparaat wordt geïdentificeerd aan de hand van het serienummer van de cpu en het serienummer van de bootschijf (SD-kaart of SSD). Opnieuw installeren op dezelfde Pi met dezelfde kaart behoudt dezelfde identiteit en plek. Een nieuwe SD-kaart of SSD telt als een **nieuw apparaat**.
- De licentiegegevens op de drone zijn versleuteld met die identiteit. Een [back-up van de database](https://docs.uavmatrix.com/nl/uavcast-pro/application-settings/#database) die op andere hardware wordt teruggezet, moet daarom opnieuw worden geactiveerd.

## Een apparaat uitschrijven

Uitschrijven maakt direct een plek vrij. U kunt **elk** apparaat op de licentie uitschrijven vanaf **elke** drone waarop de licentie actief is, niet alleen vanaf de drone waarop u bent.

1. Ga naar **Applicatie → Licentie Beheer → Geactiveerde apparaten**.
2. Zoek het apparaat en selecteer **Uitschrijven**. U ziet *Device unregistered successfully*.

Als u de drone waaraan u werkt uitschrijft, wordt die ongelicentieerd en vergrendelt de webinterface op de pagina **Applicatie** totdat u weer een sleutel activeert.

> **U kunt niet vanuit de store uitschrijven**
>
> De store toont geregistreerde apparaten, maar kan ze niet verwijderen. Schrijf uit via UAVcast-Pro op een van de apparaten van de licentie. Als elk apparaat van de licentie verloren is of gewist, stuur dan een e-mail naar [support@uavmatrix.com](mailto:support@uavmatrix.com) met uw licentiesleutel.

## Naar nieuwe hardware verplaatsen

Gebruik dit wanneer u de Pi vervangt, de SD-kaart verwisselt of van een testopstelling naar het vliegtuig verhuist.

1. Ga op het **oude** apparaat naar **Applicatie → Licentie Beheer** en selecteer **Uitschrijven** naast het apparaat. Doe dit voordat u de kaart wist.
2. Installeer UAVcast-Pro op de nieuwe hardware. Zie [Installatie](https://docs.uavmatrix.com/nl/get-started/installation/).
3. Activeer dezelfde sleutel op het nieuwe apparaat.

Als het oude apparaat defect is, schrijf het dan uit vanaf een andere drone op dezelfde licentie, of neem contact op met support.

## Verlengen of upgraden

Open in uw account in de store de licentie en selecteer **Upgrade Options**:

- **Extend subscription** voegt een nieuwe periode toe. Als de licentie nog geldig is, wordt de nieuwe periode toegevoegd aan de huidige vervaldatum; is de licentie verlopen, dan begint de periode op de verlengingsdatum. De sleutel blijft hetzelfde.
- **Add devices** voegt plekken aan de licentie toe. Een verlopen licentie moet eerst worden verlengd.
- **Upgrade tier** verplaatst de licentie naar een pakket met meer plekken.

De drone pikt de nieuwe vervaldatum en plekken op bij de volgende controle, binnen 4 uur. Om dit meteen te vernieuwen, selecteert u **Wijzigen** in **Licentie Beheer**, voert u dezelfde sleutel in en selecteert u **Valideren**.

## Wanneer een licentie verloopt

> **Een verlopen licentie vergrendelt UAVcast-Pro**
>
> Wanneer een licentie verloopt, kan UAVcast-Pro op geen enkele drone van die licentie meer worden gebruikt. Het blijft niet draaien op de geïnstalleerde versie.

Wanneer de licentieserver de licentie als verlopen meldt, markeert de drone zichzelf als ongelicentieerd: de webinterface opent alleen nog **Applicatie**, en telemetrie, video, NTRIP en Dynamische DNS stoppen bij de eerstvolgende herstart van hun services. Verleng de licentie vóór de vervaldatum om stilstand te voorkomen, en valideer de sleutel daarna opnieuw op de drone (of wacht op de volgende controle, binnen 4 uur) om hem te ontgrendelen.

## Licenties en Fleet Manager

Fleet Manager is inbegrepen bij uw UAVcast-Pro-licentie en gebruikt dezelfde licentie. Een drone kan alleen aan een organisatie worden gekoppeld als de licentie van die drone toebehoort aan een lid van die organisatie. Als u de licentie met een ander e-mailadres heeft gekocht dan waarmee u zich bij Fleet Manager aanmeldt, voeg dat e-mailadres dan toe in Fleet Manager (zie [Licenties in Fleet Manager](https://docs.uavmatrix.com/nl/fleet-manager/licenses/)). Zie [Een drone koppelen aan Fleet Manager](https://docs.uavmatrix.com/nl/uavcast-pro/fleet-pairing/).

Problemen met activeren: zie [Licentieactivering mislukt](https://docs.uavmatrix.com/nl/troubleshooting/license-activation-failed/).

Source: https://docs.uavmatrix.com/nl/get-started/license-activation/
