# Modem 4G connesso ma senza internet

> Modem LTE con segnale e operatore, ma il drone non ha internet? Verifica tipo di modem, APN, PIN e dati della SIM, priorità di rete e route predefinita.

La pagina **Modem** mostra segnale, un operatore e magari un indirizzo IP, ma il drone non raggiunge internet: la VPN non si connette, la licenza non può essere verificata, e video e telemetria non arrivano alla stazione di terra via LTE.

| Cosa vedi | Causa probabile | Inizia da |
| --- | --- | --- |
| No Modem Connected | Linux non vede il modem, oppure gli manca alimentazione | [Controllo 1](https://docs.uavmatrix.com/it/troubleshooting/modem-no-internet/#check-1) |
| Errore che cita un modem HiLink, oppure nessun pulsante Connetti per una chiavetta USB | Tipo di modem sbagliato | [Controllo 2](https://docs.uavmatrix.com/it/troubleshooting/modem-no-internet/#check-2) |
| Registrato sulla rete, ma nessun indirizzo IPv4 | APN o PIN sbagliati, oppure nessun dato sulla SIM | [Controllo 3](https://docs.uavmatrix.com/it/troubleshooting/modem-no-internet/#check-3) |
| Il modem ha un indirizzo IP, ma internet passa comunque dal Wi-Fi | La priorità di rete favorisce il Wi-Fi | [Controllo 4](https://docs.uavmatrix.com/it/troubleshooting/modem-no-internet/#check-4) |
| Funziona a casa, non sul campo (o viceversa) | Roaming, copertura, oppure una rete domestica sulla stessa sottorete del modem | [Controllo 5](https://docs.uavmatrix.com/it/troubleshooting/modem-no-internet/#check-5) |

![Pagina Modem di UAVcast-Pro con Tradizionale (PPP) selezionato e il pannello No Modem Connected](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/modem.webp)

*Pagina Modem con Tradizionale (PPP) selezionato e nessun modem collegato. Con un modem collegato, la scheda a destra mostra la qualità del segnale, lo stato, l'operatore e le informazioni IPv4.*

## Verifica 1: il modem viene rilevato?

Se la pagina mostra **No Modem Connected**:

1. Verifica che la spia di alimentazione del modem sia accesa e che sia inserito saldamente in una porta USB.
2. Un modem può assorbire più corrente di quella che una porta USB del Raspberry Pi fornisce. Tieni d'occhio la riga **Alimentazione** della dashboard. Se dice **Voltage too low - use a stronger power supply**, sistema prima l'alimentazione: [Sottotensione e throttling](https://docs.uavmatrix.com/it/troubleshooting/undervoltage-and-throttling/).
3. Sul Pi, esegui `lsusb` per vedere il modem, e `mmcli -L` per verificare se ModemManager lo ha trovato. Un modem HiLink non compare in `mmcli`: appare invece come interfaccia di rete in `ip addr`.

Il modem compare nella pagina da solo, non appena viene rilevato.

## Verifica 2: scegli il tipo di modem giusto

Esistono due tipi di modem USB, e **Tipo di modem** deve corrispondere al tuo.

|  | **HiLink** | **Tradizionale (PPP)** |
| --- | --- | --- |
| Come lo vede Linux | Una scheda di rete (il modem è un piccolo router) | Un modem gestito da ModemManager |
| Chi si connette | Il modem stesso, automaticamente | UAVcast-Pro, con i pulsanti **Connetti** e **Disconnetti** |
| Esempio Huawei | E3372**h** | E3372**s** |

Se scegli **Tradizionale (PPP)** per un modem HiLink, il log riporta *HiLink modem detected … Please change your modem type to 'HiLink' in settings.* Cambia **Tipo di modem** e l'errore scompare.

## Verifica 3: APN, PIN e SIM

Per un modem **Tradizionale (PPP)**:

1. Lascia vuoto per prima cosa **Nome Punto di Accesso (Opzionale)**. UAVcast-Pro prova allora l'APN predefinito della tua rete e gli APN noti per la SIM, e ricorda quello che funziona (*Found a working … it will be used from now on* nel log).
2. Se non funziona, inserisci l'APN che il tuo operatore fornisce per i dati mobili. Alcuni operatori richiedono anche **Nome utente (Opzionale)** e **Password (Opzionale)**.
3. Se la SIM ha un PIN, inseriscilo in **Codice PIN (Opzionale)**, oppure disattiva il PIN inserendo la SIM in un telefono. **Sblocco Richiesto** in **Informazioni Modem** mostra se la SIM è bloccata.
4. Inserisci la SIM in un telefono e verifica che i dati mobili funzionino e che il piano abbia ancora traffico disponibile.

Per un modem **HiLink**, l'APN si imposta nella pagina web del modem stessa, di solito a `http://192.168.8.1`. Aprila dal Pi, oppure collega il modem a un laptop.

> **UAVcast-Pro continua a riprovare**
>
> Un modem Tradizionale si connette all'avvio e si riconnette da solo dopo una perdita di segnale. Se un modem si connette senza ottenere un indirizzo, UAVcast-Pro lo passa alla modalità raw-IP e riprova. Attendi un minuto dopo l'avvio prima di cambiare le impostazioni.

## Verifica 4: rendi il modem la route predefinita

Se il Pi è connesso anche via Wi-Fi o Ethernet, il traffico esce dall'interfaccia con priorità, non necessariamente dal modem.

1. Vai su **Reti**.
2. In **Priorità Rete**, scegli **Priorità Modem (Modalità Esterna)** prima del volo. **Priorità WiFi (Modalità Interna)** risparmia dati cellulari a casa, ma invia tutto via Wi-Fi.
3. In **Interfacce di Rete**, verifica che l'interfaccia del modem sia contrassegnata come **Predefinito** e che **Gateway Predefinito** indichi *via* l'interfaccia del modem.

![Pagina Reti con Priorità Rete impostata su Automatico e la tabella delle interfacce che mostra wlan0 come predefinita](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/networks.webp)

*Pagina Reti con Automatico (Predefinito di Sistema) attivo e il Wi-Fi (wlan0) come route predefinita. Seleziona qui Priorità Modem (Modalità Esterna) per instradare il traffico tramite il modem.*

Verifica dal Pi usando solo il modem:

```bash
ping -c 3 -I wwan0 1.1.1.1   # Traditional modem (interface name may differ)
ip route                     # the first "default via" line is the route in use
```

## Verifica 5: problemi solo sul campo

- **Roaming**: una SIM usata all'estero può richiedere che l'operatore abiliti il roaming. Verificalo con un telefono che usa la stessa SIM.
- **Copertura**: guarda **Qualità del Segnale** e **Tecnologia**. Alcune SIM IoT funzionano solo su determinate bande o tecnologie.
- **Conflitto di sottorete**: i modem HiLink assegnano indirizzi `192.168.8.x`. Se anche la tua rete di casa o ufficio usa `192.168.8.0/24`, il routing si rompe. Cambia la LAN o la sottorete del modem.

## Ancora senza internet?

[Scarica i log](https://docs.uavmatrix.com/it/troubleshooting/collect-logs/) con **Modem Manager** selezionato, aggiungi l'output di `mmcli -m 0` e `ip route`, e inviali a **[support@uavmatrix.com](mailto:support@uavmatrix.com)** indicando il modello del modem e l'operatore.

Correlati: [Modem cellulare](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/cellular-modem/) · [Reti](https://docs.uavmatrix.com/it/uavcast-pro/connectivity/networks/)

Source: https://docs.uavmatrix.com/it/troubleshooting/modem-no-internet/
