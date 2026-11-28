# UAVcast-Pro-licentie wordt niet geactiveerd

> Los Invalid license key, Maximum activations reached en License activation failed in UAVcast-Pro op: de sleutel, internet, vrije plekken en vervangen hardware.

U voert de sleutel in onder **Applicatie → Licentie Beheer**, drukt op **Valideren**, en krijgt een fout in plaats van **Licentie succesvol geactiveerd**. Totdat er op dit apparaat een licentie actief is, stuurt elke pagina u terug naar **Applicatie**.

> Je hebt een UAVcast-Pro-licentie nodig om de drone te activeren. Koop er een in de UAVmatrix-winkel.
>
> [UAVcast-Pro kopen](https://uavmatrix.com/nl/checkout) · [Abonnementen en prijzen](https://uavmatrix.com/nl/products)

![Pagina Applicatie met Licentie Beheer, het veld voor de licentiesleutel, Licentiegegevens en de tabel Geactiveerde apparaten](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/application--license-activated.webp)

*Applicatie → Licentie Beheer op een geactiveerd apparaat: Licentiegegevens en de tabel Geactiveerde apparaten, met dit apparaat gemarkeerd als Huidig.*

| Wat u ziet | Waarschijnlijke oorzaak | Begin bij |
| --- | --- | --- |
| Invalid license key, of Invalid license key format | Typefout, extra spaties, of een sleutel voor een ander product | [Controle 1](https://docs.uavmatrix.com/nl/troubleshooting/license-activation-failed/#check-1) |
| Maximum activations reached | Alle apparaatplekken op de sleutel zijn in gebruik | [Controle 2](https://docs.uavmatrix.com/nl/troubleshooting/license-activation-failed/#check-2) |
| Werkte eerder, vraagt opnieuw na een nieuwe SD-kaart of een nieuw board | Het apparaat telt als nieuw apparaat | [Controle 3](https://docs.uavmatrix.com/nl/troubleshooting/license-activation-failed/#check-3) |
| License activation failed, of er gebeurt niets | Geen internet, of de verkeerde tijd op het apparaat | [Controle 4](https://docs.uavmatrix.com/nl/troubleshooting/license-activation-failed/#check-4) |
| Cannot connect to license service | De achtergrondservice van UAVcast-Pro draait niet | [Controle 5](https://docs.uavmatrix.com/nl/troubleshooting/license-activation-failed/#check-5) |
| Licentiestatus: Verlopen | Een licentie met een tijdslimiet is afgelopen | [Controle 6](https://docs.uavmatrix.com/nl/troubleshooting/license-activation-failed/#check-6) |

## Controle 1: De sleutel zelf

1. Kopieer de sleutel uit uw bestelmail of uw account op [uavmatrix.com](https://uavmatrix.com/), en plak hem in het veld **Licentiesleutel**. Handmatig overtypen is de meest voorkomende bron van fouten.
2. Controleer dat er geen spaties voor of achter de sleutel staan.
3. Druk op **Valideren**.

## Controle 2: Maak een apparaatplek vrij

Elke licentie staat een vast aantal apparaten toe (**Toegestane apparaten**). Als **Resterende apparaten** 0 is, mislukt de activering met **Maximaal aantal activeringen bereikt. Deactiveer eerst een ander apparaat of upgrade uw licentie.**

1. Open op een apparaat waar de licentie actief is **Applicatie → Licentie Beheer → Geactiveerde apparaten**.
2. Zoek het apparaat dat u niet meer gebruikt en druk op **Uitschrijven**. De plek komt meteen vrij.
3. Activeer het nieuwe apparaat.

Als u geen enkel geactiveerd apparaat kunt bereiken, neem dan contact op met **[support@uavmatrix.com](mailto:support@uavmatrix.com)** met de licentiesleutel; zij kunnen een plek vrijmaken. Om plekken toe te voegen, koopt u meer apparaten voor de licentie op [uavmatrix.com](https://uavmatrix.com/).

## Controle 3: U heeft de SD-kaart of het board vervangen

De licentie is gekoppeld aan de hardware, inclusief het opslagapparaat. Een nieuwe SD-kaart, een nieuwe SSD of een nieuw board telt als nieuw apparaat en neemt een nieuwe plek in. Schrijf de oude vermelding uit onder **Geactiveerde apparaten**, vóór of na het verplaatsen, zoals in controle 2. **Licentie al geactiveerd op dit apparaat** is geen fout: de sleutel was hier al actief.

## Controle 4: Internettoegang en tijd

Activering neemt contact op met de licentieserver van UAVmatrix via HTTPS (poort 443), dus het apparaat heeft op dat moment werkende internettoegang nodig.

1. Voer op het apparaat `curl -I https://uavmatrix.com` uit. U moet een HTTP-antwoord krijgen, geen time-out.
2. Als u een mobiel modem gebruikt, controleer dan of het echt internet heeft: [4G-modem verbonden maar geen internet](https://docs.uavmatrix.com/nl/troubleshooting/modem-no-internet/).
3. Controleer de datum met `date`. Een apparaat met een verkeerde klok kan geen HTTPS-verbindingen openen. Boards zonder realtimeklok stellen de tijd na het opstarten in via internet, dus wacht een minuut na het opstarten en probeer het opnieuw.

## Controle 5: Kan geen verbinding maken met de licentieservice

Dit bericht betekent dat de webinterface de eigen achtergrondservice van UAVcast-Pro niet kan bereiken, niet het internet. Herstart die en probeer het opnieuw:

```bash
sudo systemctl restart uavcast-factory
sudo systemctl status uavcast-factory
```

Blijft de service niet op **active (running)** staan, [verzamel dan de logboeken](https://docs.uavmatrix.com/nl/troubleshooting/collect-logs/) met **Licentie Beheer** geselecteerd.

## Controle 6: Verlopen licentie

De licentiegegevens tonen **Licentiestatus:** en **Vervaldatum:**. Een verlopen licentie moet worden verlengd op [uavmatrix.com](https://uavmatrix.com/).

> **64-bits besturingssysteem**
>
> UAVcast-Pro v6 draait alleen op een 64-bits besturingssysteem. Als u hier bent gekomen, is het besturingssysteem in orde; op een 32-bits besturingssysteem stopt het installatieprogramma al met *No installation candidate*.

## Nog steeds mislukt?

[Download de logboeken](https://docs.uavmatrix.com/nl/troubleshooting/collect-logs/) met **Licentie Beheer** geselecteerd. Ze bevatten de responscode van de licentieserver, bijvoorbeeld `code 550` voor geen vrije plekken. Stuur ze samen met de eerste en laatste vier tekens van uw sleutel naar **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Gebruikt u Fleet Manager? Een licentie die wel activeert, kan bij het koppelen nog steeds worden geweigerd. Zie [Koppelcode ongeldig of verlopen](https://docs.uavmatrix.com/nl/troubleshooting/pairing-code-invalid/).

Gerelateerd: [Activeer uw licentie](https://docs.uavmatrix.com/nl/get-started/license-activation/)

Source: https://docs.uavmatrix.com/nl/troubleshooting/license-activation-failed/
