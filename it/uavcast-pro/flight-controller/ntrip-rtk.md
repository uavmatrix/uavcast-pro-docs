# Correzioni NTRIP / RTK

> Trasmetti correzioni RTCM3 da un caster NTRIP via 4G/LTE al tuo controllore di volo per il posizionamento RTK Fixed. Impostazioni di caster, mountpoint, VRS e GGA.

UAVcast-Pro ha un client NTRIP integrato. Si connette a un caster NTRIP v1 o v2 tramite il collegamento internet del drone, riceve le correzioni RTCM3 e le passa al controllore di volo come messaggi MAVLink `GPS_RTCM_DATA`, nello stesso modo in cui fa "Inject GPS" di Mission Planner, ma direttamente dal drone. Non serve una stazione base sul posto. Lo trovi in **Controllore di Volo → NTRIP / RTK**.

## Prima di iniziare

- Un GPS con supporto RTK sul controllore di volo: un ricevitore multifrequenza a fase di portante, come u-blox F9P, Holybro H-RTK, CUAV C-RTK, Here3+ o Septentrio Mosaic. Un GPS standard M8/M10 ignora le correzioni.
- Un account presso un caster NTRIP: una rete CORS nazionale, un servizio commerciale (Trimble, Hexagon, Topcon e altri) oppure [RTK2go](http://rtk2go.com/). Ti servono host, porta, mountpoint e, di solito, nome utente e password.
- Connessione internet sul drone e un controllore di volo collegato.

## Configura il client NTRIP

1. Vai su **Controllore di Volo → NTRIP / RTK**.
2. In **Caster**, inserisci **Host caster** (per esempio `ntrip.example.com`) e **Porta** (`2101` per la maggior parte dei caster).
3. Inserisci **Nome utente** e **Password** in **Autenticazione**. Seleziona **Testa connessione** per verificarli: *Il caster ha accettato le credenziali.*
4. Seleziona **Sfoglia mountpoint**, scegli quello più vicino nell'elenco e seleziona **Seleziona**. Oppure digitalo in **Mountpoint**.
5. Se il mountpoint è un flusso VRS o "base più vicina" (la colonna **NMEA** indica **Richiesto**), mantieni attivo **Invia GGA upstream**.
6. Attiva **Abilita client NTRIP**.

La scheda **Trasmissione correzioni** mostra **Totale ricevuto**, **Throughput**, **Ultimo frame RTCM** e **Tipi di messaggio recenti**. Con cielo sgombro, **Fix RTK del controllore di volo** passa da **Fix 3D** a **RTK Float** e poi a **RTK Fixed**, di solito entro uno o due minuti.

![Scheda NTRIP / RTK con il pannello di stato su Disabilitato e contatori a zero, e la scheda Qualità GPS](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/flight-controller--ntrip.webp)

*Controllore di Volo → NTRIP / RTK prima di configurare un caster: stato Disabilitato, contatori a zero e nessun fix GPS.*

## Riferimento impostazioni

| Impostazione | Predefinito | Valori | Note |
| --- | --- | --- | --- |
| **Abilita client NTRIP** | Disattivato | Attivo, disattivato |  |
| **Host caster** | vuoto | hostname o IP | Obbligatorio. |
| **Porta** | `2101` | 1–65535 | Alcuni caster TLS usano 2102 o 443. |
| **Mountpoint** | vuoto | nome del mountpoint del caster | Obbligatorio. Usa **Sfoglia mountpoint** per leggere la sourcetable del caster. |
| **Usa TLS (HTTPS)** | Disattivato | Attivo, disattivato | Per i caster che richiedono TLS. La maggior parte dei caster pubblici usa TCP semplice. |
| **Nome utente** / **Password** | vuoto |  | Lascia vuoto per i caster anonimi. RTK2go vuole come nome utente un indirizzo email reale e nessuna password. |
| **Invia GGA upstream** | Attivo | Attivo, disattivato | Invia la tua posizione come NMEA `$GPGGA`, così i caster VRS e a mountpoint più vicino possono calcolare le correzioni per la tua posizione. |
| **Intervallo di invio (secondi)** | `10` | secondi | Ogni quanto viene inviato il GGA. |
| **Sorgente posizione** | **Posizione live dal controllore di volo** | **Posizione live dal controllore di volo**, **Posizione manuale fissa** |  |
| **Latitudine** / **Longitudine** / **Altitudine (m)** | `0` |  | Posizione manuale. Usata anche come riserva finché il controllore di volo non ha un fix GPS. |

## Leggi la scheda Qualità GPS

**Qualità GPS** mostra il fix live del controllore di volo, più una misura che non dipende dalla stima del ricevitore:

- **Tipo di fix** e **Satelliti**.
- **Precisione orizzontale** e **Precisione verticale**: la stima del ricevitore stesso.
- **Stabilità della posizione (1σ)**: quanto la posizione si sposta realmente mentre il drone è fermo, misurata su una finestra breve. In volo mostra **In movimento**.
- **Ultima correzione**: tempo trascorso dall'ultimo frame RTCM inoltrato. Se continua ad aumentare, le correzioni si sono fermate.

Se vedi **Nessuno stato RTK dal ricevitore**, il controllore di volo non ha mai segnalato lo stato RTK. Di solito il GPS non supporta RTK. Le correzioni vengono comunque inoltrate.

## Su collegamento cellulare

Le correzioni sono piccole (in genere da 1 a 5 kbit/s), quindi entrano facilmente accanto alla telemetria e al video. Dopo una breve caduta di internet il client si riconnette in pochi secondi. Una connessione al caster silenziosa viene rilevata entro 15 secondi e riaperta.

La [Dashboard](https://docs.uavmatrix.com/it/uavcast-pro/dashboard/) mostra lo stato del client nella riga **Correzioni RTK**.

## Risoluzione dei problemi

| Sintomo | Verifica |
| --- | --- |
| Stato **Errore**, **Risposta del caster** mostra `401` | Nome utente o password errati, oppure l'account non è autorizzato su questo mountpoint. |
| **Connesso**, ma nessun frame RTCM | Il mountpoint richiede GGA. Attiva **Invia GGA upstream** e assicurati che il controllore di volo abbia un fix 3D, oppure imposta una posizione manuale. |
| RTCM arriva, ma il fix resta su **Fix 3D** | Il GPS non supporta RTK, oppure i sistemi GNSS del mountpoint non corrispondono al tuo ricevitore. Controlla la colonna **GNSS** nella sourcetable. |
| **RTK Float**, mai **Fixed** | Base troppo lontana (punta a meno di 20-30 km), visuale del cielo scarsa o multipath. Prova un mountpoint più vicino. |

Il **Log del servizio NTRIP** in fondo alla pagina mostra ogni connessione, riconnessione e risposta del caster.

Altri controlli: [Correzioni RTK non arrivano](https://docs.uavmatrix.com/it/troubleshooting/rtk-corrections-not-arriving/).

Source: https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/ntrip-rtk/
