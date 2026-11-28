# VLC i RTSP

> Odtwarzaj wideo H.264 RTP UAVcast-Pro w VLC za pomocą pliku SDP lub pobieraj obraz z kamery drona przez RTSP na porcie 8554 dla komputera do nagrywania, ściany wideo lub oprogramowania zewnętrznego.

VLC może odtwarzać strumień UAVcast-Pro za pomocą niewielkiego pliku SDP, który go opisuje. Jeśli wolisz pobierać wideo z drona zamiast odbierać je wysyłane do Ciebie, serwer multimediów drona udostępnia też każdą kamerę przez RTSP. Obie metody dodają większe opóźnienie niż QGroundControl, Mission Planner czy GStreamer, dlatego używaj ich do oglądania i nagrywania, a nie do latania.

## Odtwarzanie strumienia UDP w VLC

1. Na dronie dodaj miejsce docelowe w sekcji [Stacje Naziemne](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/) z adresem IP tego komputera i włączoną opcją **Włącz Wideo**.

2. Zapisz poniższą zawartość jako `uavcast.sdp`:

   ```text
   v=0
   o=- 0 0 IN IP4 127.0.0.1
   s=UAVcast-Pro
   c=IN IP4 0.0.0.0
   t=0 0
   m=video 5600 RTP/AVP 96
   a=rtpmap:96 H264/90000
   ```

3. Otwórz go w VLC przez **Media → Open File**.

Dla kamery 2 w podwójnym strumieniu zrób kopię pliku z `m=video 5601`. Aby dodać ścieżkę audio, dopisz:

```text
m=audio 5602 RTP/AVP 97
a=rtpmap:97 opus/48000/2
```

Aby zmniejszyć opóźnienie, obniż **Network caching** w VLC (**Tools → Preferences → Show settings: All → Input / Codecs**). I tak spodziewaj się większego opóźnienia niż w GStreamer.

## Pobieranie wideo z drona przez RTSP

Gdy kamera działa z zaznaczoną opcją **Włączyć Podgląd na Żywo?** lub z włączonym nagrywaniem z kamery, serwer multimediów drona udostępnia każdą kamerę przez RTSP (tylko TCP) na porcie 8554:

```text
rtsp://<drone-ip>:8554/camera     # camera 1
rtsp://<drone-ip>:8554/camera2    # camera 2 (dual stream)
```

Otwórz go w VLC (**Media → Open Network Stream**), w systemie zarządzania wideo lub za pomocą GStreamer:

```bash
gst-launch-1.0 rtspsrc location=rtsp://192.168.1.50:8554/camera latency=100 ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Używaj tego w sieci lokalnej lub przez VPN. Nie przekierowuj portu 8554 do internetu: strumień nie ma hasła.

## Której metody użyć?

| Potrzebujesz | Użyj |
| --- | --- |
| Latania z wideo | [QGroundControl](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/qgroundcontrol/) lub [Mission Planner](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/mission-planner/) |
| Szybkiego testu, drugiego okna kamery lub dźwięku | GStreamer na [Windows](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-linux/) lub [macOS](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/gstreamer-macos/) |
| VLC, bo jest już zainstalowany | Plik SDP opisany wyżej |
| Komputera lub systemu, który sam ma pobierać wideo | RTSP |

Source: https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/vlc-and-rtsp/
