# GStreamer su Linux

> Installa GStreamer su Ubuntu, Debian o Fedora e riproduci il video H.264 del drone UAVcast-Pro e l'audio Opus con gst-launch-1.0, inclusi una seconda telecamera, la bassa latenza e ufw.

GStreamer riproduce il flusso video di UAVcast-Pro in una finestra con un solo comando. Usalo per testare il percorso video, guardare una seconda telecamera o sentire l'audio. Funziona su qualsiasi desktop Linux, incluso un Raspberry Pi usato come stazione di terra.

## Prima di iniziare

Sul drone, aggiungi una destinazione in [Stazioni di Controllo a Terra](https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/) con l'indirizzo IP di questo computer (`ip -4 addr`; usa l'indirizzo VPN via 4G) e **Attiva Video** attivo.

## Installa GStreamer

**Ubuntu / Debian / Raspberry Pi OS**

```bash
sudo apt update
sudo apt install gstreamer1.0-tools gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-libav
```

`gstreamer1.0-libav` fornisce il decoder H.264 (`avdec_h264`). Senza di esso il comando sotto non funziona.

**Fedora**

```bash
sudo dnf install gstreamer1 gstreamer1-plugins-good gstreamer1-plugins-bad-free gstreamer1-plugin-libav
```

I repository ufficiali di Fedora escludono gran parte del supporto H.264 per motivi di brevetti, quindi `avdec_h264` potrebbe mancare anche dopo questa operazione. Se il controllo sotto fallisce, abilita [RPM Fusion](https://rpmfusion.org/) e segui la sua guida multimediale per ottenere le librerie complete dei codec.

Verifica che il decoder H.264 sia presente:

```bash
gst-inspect-1.0 avdec_h264
```

Stampa i dettagli dell'elemento. *No such element or plugin* significa che il decoder manca.

## Riproduci il video

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Una finestra si apre quando arriva il primo keyframe. Premi **Ctrl+C** per fermarti.

> **Cosa dovresti vedere**
>
> 1. Il terminale stampa `Setting pipeline to PLAYING ...` e attende il video.
> 2. Quando arrivano i primi pacchetti, `-v` stampa righe contenenti `caps = application/x-rtp`.
> 3. Si apre una finestra video con l'immagine della telecamera.
>
> Se si ferma al passaggio 1, nessun video raggiunge questo computer: vedi la tabella di risoluzione dei problemi qui sotto.

- **Camera 2** in [doppio flusso](https://docs.uavmatrix.com/it/uavcast-pro/camera/multi-camera/): eseguilo di nuovo con `port=5601`.
- **Latenza più bassa** su un buon collegamento: sostituisci `rtpjitterbuffer` con `rtpjitterbuffer latency=0`. Mantieni il valore predefinito con 4G.

## Ascolta l'audio

Con **Invia audio alle stazioni di terra** attivo, l'audio arriva sulla Porta Video + 2:

```bash
gst-launch-1.0 udpsrc port=5602 caps="application/x-rtp, media=(string)audio, clock-rate=(int)48000, encoding-name=(string)OPUS, payload=(int)97" ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

## Firewall

La maggior parte delle distribuzioni desktop non blocca il traffico UDP in entrata. Se `ufw` è attivo:

```bash
sudo ufw allow 5600:5602/udp
sudo ufw allow 14550/udp
```

## Risoluzione dei problemi

| Messaggio o sintomo | Soluzione |
| --- | --- |
| *no element "avdec_h264"* | Installa `gstreamer1.0-libav`. |
| *no element "rtph264depay"* | Installa `gstreamer1.0-plugins-good`. |
| Si avvia, ma non compare nessuna finestra | Non arriva nulla. Controlla l'IP di destinazione sul drone, **Attiva Video** e il firewall. `sudo tcpdump -ni any udp port 5600` mostra se i pacchetti raggiungono il computer. |
| Errore di bind all'avvio | Un altro programma (QGroundControl, un altro GStreamer) è in ascolto sulla porta. Chiudilo. |
| La finestra si apre, ma l'immagine diventa grigia e sfocata | Perdita di pacchetti. Abbassa il bitrate sul drone e imposta **Tasso di Recupero del Stream** a 15–30 fotogrammi. |

Source: https://docs.uavmatrix.com/it/uavcast-pro/ground-stations/gstreamer-linux/
