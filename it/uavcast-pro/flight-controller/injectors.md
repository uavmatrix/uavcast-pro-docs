# Iniettori

> Usa gli iniettori di UAVcast-Pro per inviare letture dei sensori da script, Arduino o dal modem LTE nel flusso MAVLink via HTTP, UDP o seriale, così QGC e Mission Planner le vedono.

Un iniettore alimenta nel flusso MAVLink, come messaggi `NAMED_VALUE_FLOAT` (o `NAMED_VALUE_INT`), dati provenienti dall'esterno di UAVcast-Pro, come uno script Python, un Arduino o un sensore in rete. Ogni stazione di controllo a terra collegata riceve i valori come normale telemetria: Mission Planner li mostra nella scheda **Status**, QGroundControl nell'Ispettore MAVLink. Compaiono anche automaticamente nelle dashboard di [Flussi di Dati](https://docs.uavmatrix.com/it/uavcast-pro/data-streams/). Apri **Controllore di Volo → Iniettori**.

Usi tipici: sensori di radiazioni, gas o meteo sul computer di bordo, valori del segnale LTE (RSRP, SINR) per il monitoraggio del collegamento, oppure valori calcolati dai tuoi script.

## Scegli un trasporto

| Tipo | Come arrivano i dati | Ideale per |
| --- | --- | --- |
| **HTTP** | POST di JSON a un URL unico con un token segreto | Il più semplice. Qualsiasi cosa in grado di fare una richiesta HTTP. |
| **UDP** | Pacchetti verso una porta del drone, come righe `NAME=VALUE` o JSON | Overhead minimo, reti locali fidate. Nessuna autenticazione. |
| **Seriale** | Righe lette da un dispositivo `/dev/tty*` | Sensori cablati direttamente, come un Arduino via USB. |

Il tipo non può essere modificato dopo aver creato l'iniettore.

## Crea un iniettore

1. Vai su **Controllore di Volo → Iniettori** e seleziona **Aggiungi iniettore**.
2. Inserisci un **Nome** (visibile solo nell'interfaccia) e scegli il **Tipo di ingresso**.
3. Lascia **sysid MAVLink** a `1`, così i valori appartengono allo stesso veicolo del controllore di volo, e **compid MAVLink** a `194` (carico utile utente), a meno che tu non abbia bisogno di altro.
4. Facoltativo: imposta un **Prefisso nome**, per esempio `BAL_`, così `RAD1` viene inviato come `BAL_RAD1`.
5. Per UDP o Seriale, compila le impostazioni del listener. Poi seleziona **Crea**.
6. Seleziona **Invia segnale di prova** sulla scheda dell'iniettore per inviare un valore e verificarlo nella stazione di controllo a terra.

![Scheda Iniettori con Nessun iniettore ancora, usi tipici, i trasporti HTTP, UDP e Seriale e il pulsante Aggiungi iniettore](https://docs.uavmatrix.com/it/img/screenshots/uavcast-pro/flight-controller--injectors.webp)

*Controllore di Volo → Iniettori prima del primo iniettore: usi tipici e i tre trasporti.*

## Invia dati

**HTTP**

Dopo aver creato un iniettore HTTP, la sua scheda mostra l'**endpoint HTTP**. L'URL ha la forma `http://<drone-ip>/api/inject/<token>` e passa per la porta normale dell'interfaccia web. **Copia URL** lo copia negli appunti.

```bash
curl -X POST http://192.168.1.50/api/inject/<token> \
  -H "Content-Type: application/json" \
  -d '{"name":"RAD1","value":0.077}'
```

```bash
curl -X POST http://192.168.1.50/api/inject/<token> \
  -H "Content-Type: application/json" \
  -d '{"samples":[{"name":"TEMP","value":21.4},{"name":"HUM","value":48}]}'
```

La risposta riporta cosa è successo: `{"accepted":2,"rateLimited":0,"rejected":0}`. Il token è l'unica protezione. Se viene divulgato, seleziona **Ruota token** e aggiorna il tuo client.

**UDP**

Per impostazione predefinita l'iniettore ascolta sulla **Porta** `14600` e sull'**Indirizzo di ascolto** `0.0.0.0` (tutte le interfacce). Usa `127.0.0.1` se il mittente gira sul drone stesso.

```bash
echo "RAD1=0.077" | nc -u -w1 192.168.1.50 14600
```

```python
import json, socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.sendto(json.dumps({"name": "RAD1", "value": 0.077}).encode(), ("192.168.1.50", 14600))
```

**Seriale**

L'iniettore legge righe terminate da a capo dal **Percorso dispositivo** (predefinito `/dev/ttyUSB0`) alla **Baud rate** (predefinita `115200`). Ogni riga è un campione: `NAME=VALUE` per il protocollo Key=Value, oppure un oggetto JSON. Si riconnette da solo se il dispositivo viene scollegato.

```cpp
void setup() { Serial.begin(115200); }
void loop() {
  Serial.print("LIGHT=");
  Serial.println(analogRead(A0));
  delay(200);
}
```

> **I nomi MAVLink sono di 10 caratteri**
>
> I nomi `NAMED_VALUE_FLOAT` sono limitati a 10 caratteri, prefisso incluso. Mantieni il prefisso breve (fino a 8 caratteri) e i nomi compatti.

## Riferimento impostazioni

| Impostazione | Predefinito | Valori | Note |
| --- | --- | --- | --- |
| **Nome** | vuoto | testo | Etichetta solo nell'interfaccia. |
| **Tipo di ingresso** | **HTTP** | **HTTP**, **UDP**, **Seriale** | Fisso dopo la creazione. |
| **Attivo** | Attivo | Attivo, disattivato | Disattivato mantiene la configurazione ma ferma il listener. |
| **sysid MAVLink** | `1` | 1–255 | Come il controllore di volo, raggruppa i valori con quel veicolo. |
| **compid MAVLink** | `194` | 0–255 | 194 è comune per i sensori di carico utile utente. |
| **Prefisso nome** | vuoto | fino a 8 caratteri ASCII | Aggiunto davanti a ogni nome di segnale. |
| **Limite di frequenza (Hz per segnale)** | `10` | campioni al secondo | I campioni in eccesso vengono scartati e conteggiati come **Limitati**. Protegge il collegamento da un mittente fuori controllo. |
| **Protocollo** (UDP, Seriale) | **Key=Value (a righe)** | **Key=Value (a righe)**, **JSON** (`{name, value}`) |  |
| **Porta** (UDP) | `14600` | 1–65535 |  |
| **Indirizzo di ascolto** (UDP) | `0.0.0.0` | indirizzo IP | `127.0.0.1` accetta solo mittenti locali. |
| **Percorso dispositivo** (Seriale) | `/dev/ttyUSB0` | percorso del dispositivo | Esegui `ls /dev/tty*` per trovarlo. |
| **Baud rate** (Seriale) | `115200` |  | Deve corrispondere al mittente. |

Ogni scheda mostra i contatori **Accettati**, **Limitati** e **Rifiutati**, così puoi vedere se i dati arrivano e se sono validi.

Gli iniettori girano all'interno dei servizi di UAVcast-Pro e partono all'avvio, quindi i valori continuano a fluire anche senza l'interfaccia web aperta.

Source: https://docs.uavmatrix.com/it/uavcast-pro/flight-controller/injectors/
