# Onderspanning en CPU-throttling

> UAVcast-Pro waarschuwt voor Voltage too low of Slowed down? Dimensioneer de voeding voor Pi, modem en camera, verhelp dunne kabels en koeling, en voorkom resets.

De rij **Voeding** op het dashboard toont een waarschuwing, het modem valt weg, de verbinding met de vluchtcontroller reset, of de Pi herstart tijdens de vlucht. Op een drone veroorzaakt een te kleine voeding meer rare fouten dan welke softwareinstelling ook.

![Statuskaart van het dashboard met de rij Voeding onder System, die Stable toont](https://docs.uavmatrix.com/nl/img/screenshots/uavcast-pro/dashboard--status-card.webp)

*Dashboard → statuskaart. De rij Voeding staat onder System; hier staat Stable. Waarschuwingen vervangen die tekst, zoals hieronder vermeld.*

| Rij Voeding | Betekenis |
| --- | --- |
| **Stable** | Geen onderspanning of throttling sinds het opstarten |
| **Voltage too low - use a stronger power supply** | De voedingsspanning is lager dan wat de Pi op dit moment nodig heeft |
| **Voltage dropped since start-up** | Dit gebeurde eerder, bijvoorbeeld toen het modem verbond of de motoren aanliepen |
| **Slowed down (heat or power)** | De CPU loopt langzamer om zichzelf te beschermen tegen hitte of lage spanning |

De metingen komen van de Raspberry Pi-firmware, dus ze zijn alleen beschikbaar op een Raspberry Pi.

## Controle 1: Dimensioneer de voeding voor alles wat erop zit

De Pi voedt het modem en de USB-camera via zijn USB-poorten. Een 4G-modem trekt zijn piekstroom bij het verbinden en bij een zwak signaal.

1. Gebruik een 5 V-BEC of regelaar die ruim boven de totale stroom van de Pi, het modem, de camera en alles wat op dezelfde rail zit, ligt. De officiële voedingsspecificaties van Raspberry Pi vermelden wat elk model nodig heeft.
2. Voed de Pi nooit via de TELEM- of USB-poort van de vluchtcontroller.
3. Als het modem meer trekt dan de Pi kan doorgeven, voed het modem dan rechtstreeks vanaf de regelaar, via een USB-hub met eigen voeding of een USB-kabel met aparte voeding.

## Controle 2: Kabels en connectoren

Dunne of lange kabels verliezen spanning onder belasting. Gebruik korte, dikke voedingskabels en een goede USB-kabel voor het modem. Een kabel die prima is voor een telefoonlader kan toch onderspanning veroorzaken bij piekstroom.

## Controle 3: Warmte

**Temperatuur** onder **Systeeminformatie** toont de CPU-temperatuur. Een Pi die videocodering draait in een gesloten frame in de zon wordt heet. Voeg een koellichaam of een klein ventilatortje toe en zorg voor luchtstroom in de behuizing. Een Pi 5 heeft actieve koeling nodig voor continue codering.

## Controle 4: Controleer na de oplossing

**Voltage dropped since start-up** blijft staan tot de volgende herstart. Herstart de Pi, voer een typische missie uit op de werkbank (modem verbonden, camera streamt) en bevestig dat de rij **Stable** blijft.

## Nog steeds waarschuwingen?

De logdownload bevat voeding- en USB-gebeurtenissen van de kernel in `diagnostics.txt`. [Download de logboeken](https://docs.uavmatrix.com/nl/troubleshooting/collect-logs/) en stuur ze naar **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, samen met een foto van uw voedingsbedrading.

Gerelateerd: [Hardwarevereisten](https://docs.uavmatrix.com/nl/get-started/hardware-requirements/) · [Dashboard](https://docs.uavmatrix.com/nl/uavcast-pro/dashboard/)

Source: https://docs.uavmatrix.com/nl/troubleshooting/undervoltage-and-throttling/
