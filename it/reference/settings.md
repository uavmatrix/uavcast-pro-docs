# Riferimento impostazioni

> Ogni impostazione di UAVcast-Pro in un'unica pagina, con etichetta esatta, valore predefinito e intervallo: controllore di volo, NTRIP, stazioni di terra, telecamera, registrazione, modem, VPN.

Ogni impostazione dell'interfaccia web di UAVcast-Pro, raggruppata per pagina, con l'etichetta esattamente come la mostra l'app e il valore predefinito su un'installazione nuova. Le pagine che modificano le impostazioni le applicano subito, salvo indicazione contraria. Le pagine delle funzionalità spiegano ogni area in dettaglio; questa pagina serve per consultare i valori.

## Controllore di Volo → Connessione

| Impostazione | Predefinito | Valori e note |
| --- | --- | --- |
| **Collegamento attivo** | Attivo | Attiva o disattiva il collegamento con il controllore di volo. |
| **Tipo di collegamento** | **USB** | **USB** (la porta USB del controllore di volo) oppure **UART / Seriale** (porta TELEM sui pin GPIO o su un cavo USB-seriale). |
| **Porta** | **Automatico** | Automatico trova il controllore di volo e lo segue se il numero del dispositivo cambia. **Percorso personalizzato...** accetta un dispositivo come `/dev/ttyAMA0`. |
| **Baud rate** | **Automatico** | Deve corrispondere a `SERIALx_BAUD` sul controllore di volo. Automatico prova 57600, 115200, 921600, 1500000, 460800, 230400 e 500000. Non usato per USB. |

Pulsanti: **Rileva automaticamente** (scansiona tutte le porte e le velocità e salva il risultato), **Connetti**, **Riavvia collegamento**, **Ferma**. Le modifiche si applicano subito, senza riavvio.

## Controllore di Volo → NTRIP / RTK

| Impostazione | Predefinito | Valori e note |
| --- | --- | --- |
| **Abilita client NTRIP** | Disattivato |  |
| **Host caster** | vuoto | Nome host del caster NTRIP. |
| **Porta** | `2101` | Alcuni caster TLS usano 2102 o 443. |
| **Mountpoint** | vuoto | Scegline uno con **Sfoglia mountpoint**. |
| **Usa TLS (HTTPS)** | Disattivato | Per i caster che richiedono TLS. |
| **Nome utente** / **Password** | vuoto | rtk2go.com: indirizzo e-mail come nome utente, senza password. |
| **Invia GGA upstream** | Attivo | Richiesto dai caster VRS e dai caster con mountpoint più vicino. |
| **Intervallo di invio (secondi)** | `10` |  |
| **Sorgente posizione** | **Posizione live dal controllore di volo** | Oppure **Posizione manuale fissa** (**Latitudine**, **Longitudine**, **Altitudine (m)**), usata anche come riserva prima del primo fix GPS. |

## Controllore di Volo → Iniettori

| Impostazione | Predefinito | Valori e note |
| --- | --- | --- |
| **Tipo di ingresso** |  | **HTTP**, **UDP** o **Seriale**. Non modificabile dopo la creazione. |
| **sysid MAVLink** | `1` | Uguale a quello del controllore di volo. |
| **compid MAVLink** | `194` | Payload utente. |
| **Prefisso nome** | vuoto | Fino a 8 caratteri ASCII, anteposti a ogni nome di segnale. |
| **Limite di frequenza (Hz per segnale)** |  | Numero massimo di campioni al secondo per nome di segnale. |
| **Protocollo** (UDP, Seriale) |  | **Key=Value (delimitato da righe)** oppure **JSON** (`{name, value}`). |
| **Porta** / **Indirizzo di ascolto** (UDP) |  | Scegli una porta libera, ad esempio 14600. `0.0.0.0` = tutte le interfacce, `127.0.0.1` = solo locale. |
| **Percorso dispositivo** / **Baud rate** (Seriale) |  | Ad esempio `/dev/ttyUSB0`; il baud rate deve corrispondere a quello del mittente. |

## Stazioni di Controllo a Terra

Una scheda per ogni destinazione.

| Impostazione | Predefinito su una nuova destinazione | Valori e note |
| --- | --- | --- |
| **Nome** | vuoto | Fino a 50 caratteri. |
| **IP o Host di Destinazione** | vuoto | Un indirizzo IPv4. Obbligatorio prima di poter attivare video o telemetria. |
| **Porta Telemetria** | `14550` | Da 1 a 65535. |
| **Porta Video** | `5600` | Da 1 a 65535. |
| **Porta Video (Telecamera 2)** | vuoto (= Porta Video + 1) | Visibile solo quando **Doppio flusso** è attivo. |
| **Attiva Endpoint** | Attivo | Disattivato interrompe tutto verso questa destinazione: telemetria, video e audio. |
| **Attiva Video** | **Disattivato** |  |
| **Attiva Telemetria** | **Disattivato** |  |
| **Read Only** | Disattivato | La stazione di terra riceve la telemetria ma non può modificare nulla sul veicolo. Vale a partire da UAVcast-Pro 6.5.3; nelle versioni precedenti, Read Only non blocca le scritture dei parametri. |

## Telecamera → Impostazioni telecamera

| Impostazione | Predefinito | Valori e note |
| --- | --- | --- |
| **Attivare la Telecamera?** | Sì |  |
| **Seleziona Telecamera** | Telecamera Raspberry Pi | Telecamere CSI e USB rilevate. |
| **Risoluzione** | 640×480 | Vengono proposte solo le dimensioni supportate dalla telecamera. |
| **Seleziona FPS** | **Automatico** | La telecamera negozia il valore. |
| **Bitrate:** | `0` (automatico) | Da 0 a 10000 kbps. |
| **Tasso di Recupero del Stream** | **Automatico** | Intervallo dei keyframe. Automatico = un keyframe al secondo. I livelli più alti recuperano prima dalla perdita di pacchetti, ma usano più banda. |
| **Rotazione:** / **Impostazioni capovolgimento** | 0°, nessun capovolgimento | **Capovolgi Orizzontalmente**, **Capovolgi Verticalmente**. |
| **Abilitare Anteprima dal Vivo?** | Sì | Anteprima in questa pagina e nella mappa di volo. |
| **Pipeline Personalizzata** | pipeline di test | Sostituisce le destinazioni delle Stazioni di Controllo a Terra. Ometti il prefisso `gst-launch-1.0`. |
| **Attiva cambio telecamera da canale RC** | Disattivato |  |
| **Canale RC** | 7 | PWM < 1500 = Telecamera 1, PWM > 1500 = Telecamera 2. |
| **Uguale Risoluzione Telecamera 1** | Disattivato | La telecamera 2 cattura alla risoluzione della telecamera 1. |
| **Doppio flusso** | Disattivato | Trasmette entrambe le telecamere contemporaneamente. |
| **Audio** | Disattivato | Audio Opus nell'anteprima. |
| **Dispositivo audio** | **Automatico (microfono della telecamera se presente)** | Oppure un dispositivo di cattura, o **Tono di prova (nessun microfono richiesto)**. |
| **Bitrate** (audio) | 64 kbps |  |
| **Invia audio alle stazioni di terra** | Disattivato | RTP/Opus verso ogni destinazione video sulla Porta Video + 2. |

## Telecamera → Registrazioni → Impostazioni

| Impostazione | Predefinito | Valori e note |
| --- | --- | --- |
| **Posizione di archiviazione** | **Archiviazione interna** | Un'unità USB o un SSD, oppure **Oppure un'altra cartella**. |
| **Mantieni libero** | 2 GB | Da 0,5 a 1000 GB. |
| **Elimina le registrazioni più vecchie quando lo spazio è esaurito** | Attivo | Disattivato = la registrazione si interrompe quando il disco è pieno. |
| **Elimina registrazioni più vecchie di** | 0 giorni | 0 le conserva finché lo spazio non serve. |
| **Registra automaticamente quando armato** | Attivo |  |
| **Registra telecamera 1** / **Registra telecamera 2** | Attivo / Attivo | La telecamera 2 solo con doppio flusso. |
| **Durata file** | 1 min | Da 1 a 30 minuti per file. |
| **Registra telemetria** | **Quando armato** | **Sempre quando connesso** oppure **Disattivato**. |

## Modem

| Impostazione | Predefinito | Valori e note |
| --- | --- | --- |
| **Attivare il Modem Cellulare?** | Sì |  |
| **Tipo di modem** | **Tradizionale (PPP)** | Oppure **HiLink**. |
| **Nome Punto di Accesso (Opzionale)** | vuoto (**Automatico**) | Lascialo vuoto per rilevarlo automaticamente. |
| **Nome utente (Opzionale)** / **Password (Opzionale)** | vuoto | La maggior parte degli operatori non richiede nessuno dei due. |
| **Codice PIN (Opzionale)** | vuoto | PIN della SIM, a meno che il PIN non sia disattivato. |

## Rete Privata Virtuale

| Impostazione | Predefinito | Valori e note |
| --- | --- | --- |
| **Attiva VPN** | No |  |
| **Servizi** | **ZeroTier** | **ZeroTier** oppure **Tailscale**. |
| **ID Rete** (ZeroTier) | vuoto | Dal tuo controller ZeroTier. |
| **Chiave di Autenticazione** / **Nome Host (Opzionale)** (Tailscale) | vuoto | Oppure accedi con **Login Web**, o dalla scheda **Fleet Manager** dopo l'accoppiamento. |

## DNS Dinamico

| Impostazione | Predefinito | Valori e note |
| --- | --- | --- |
| **Attivare DNS Dinamico?** | No |  |
| **Sistema DNS** | `noip` | `generic` (con **URL DNS**), `noip`, `dyndns`, `duck`. |
| Nome utente, **Password**, **Alias** | vuoto | Dal tuo provider DNS. |

## Reti

| Impostazione | Predefinito | Valori e note |
| --- | --- | --- |
| **Priorità Rete** | instradamento di sistema | **Priorità WiFi (Modalità Interna)**, **Priorità Modem (Modalità Esterna)** oppure **Automatico (Predefinito di Sistema)**. |

## Fleet Management

| Impostazione | Predefinito | Valori e note |
| --- | --- | --- |
| **Device Name** | vuoto | Mostrato in Fleet Manager. Se vuoto, viene usato l'hostname. |

## Users

| Impostazione | Valori e note |
| --- | --- |
| **Role** | **Admin - Full access** oppure **Read Only - View only**. Il primo utente deve essere un admin. |

## Applicazione

| Impostazione | Predefinito | Valori e note |
| --- | --- | --- |
| **Porta Server** | `80` | 80 o superiore. **Invia e riavvia server** la applica; l'indirizzo diventa `http://<dispositivo>:<porta>/`. |
| **Lingua** | Lingua del browser | Inglese, spagnolo, portoghese, italiano, olandese, polacco, turco, russo, cinese (semplificato e tradizionale). |
| **Tema Scuro** |  |  |
| **Registrazione Log**: elenco dei log / intervallo di tempo | **Tutti i Log** / **Ultime 2 ore** | Vedi [Raccogli i log](https://docs.uavmatrix.com/it/troubleshooting/collect-logs/). |

**Database** offre **Backup Database**, **Ripristina Database** (un file `.db`) e **Reset Database**, che elimina tutte le impostazioni.

Source: https://docs.uavmatrix.com/it/reference/settings/
