# VLC и RTSP

> Воспроизведение видео UAVcast-Pro H.264 RTP в VLC с помощью SDP-файла или получение видео с камеры дрона по RTSP на порту 8554 для компьютера записи, видеостены или стороннего ПО.

VLC может воспроизводить поток UAVcast-Pro с помощью небольшого SDP-файла, который его описывает. Если вы предпочитаете забирать видео с дрона, а не получать его push-методом, медиасервер дрона также предоставляет каждую камеру по RTSP. Оба способа добавляют больше задержки, чем QGroundControl, Mission Planner или GStreamer, поэтому используйте их для просмотра и записи, а не для управления полётом.

## Воспроизведение UDP-потока в VLC

1. На дроне добавьте пункт назначения в разделе [Наземные станции](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/) с IP-адресом этого компьютера и включённой опцией **Включить видео**.

2. Сохраните этот текст как `uavcast.sdp`:

   ```text
   v=0
   o=- 0 0 IN IP4 127.0.0.1
   s=UAVcast-Pro
   c=IN IP4 0.0.0.0
   t=0 0
   m=video 5600 RTP/AVP 96
   a=rtpmap:96 H264/90000
   ```

3. Откройте его в VLC через **Media → Open File**.

Для камеры 2 в режиме двух потоков сделайте копию с `m=video 5601`. Чтобы добавить аудиодорожку, допишите:

```text
m=audio 5602 RTP/AVP 97
a=rtpmap:97 opus/48000/2
```

Чтобы сократить задержку, уменьшите **Network caching** в VLC (**Tools → Preferences → Show settings: All → Input / Codecs**). В любом случае задержка будет больше, чем у GStreamer.

## Получение видео с дрона по RTSP

Пока камера работает с включённой опцией **Enable Live Preview?** или когда включена запись с камеры, медиасервер дрона публикует каждую камеру по RTSP (только TCP) на порту 8554:

```text
rtsp://<drone-ip>:8554/camera     # camera 1
rtsp://<drone-ip>:8554/camera2    # camera 2 (dual stream)
```

Откройте этот адрес в VLC (**Media → Open Network Stream**), в системе управления видео или с помощью GStreamer:

```bash
gst-launch-1.0 rtspsrc location=rtsp://192.168.1.50:8554/camera latency=100 ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Используйте это в локальной сети или через VPN. Не пробрасывайте порт 8554 в интернет: у потока нет пароля.

## Какой способ выбрать?

| Вам нужно | Используйте |
| --- | --- |
| Лететь с видео | [QGroundControl](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/qgroundcontrol/) или [Mission Planner](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/mission-planner/) |
| Быстрая проверка, окно второй камеры или звук | GStreamer на [Windows](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/gstreamer-linux/) или [macOS](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/gstreamer-macos/) |
| VLC, потому что он уже установлен | SDP-файл, описанный выше |
| Чтобы ПК или система сами получали видео | RTSP |

Source: https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/vlc-and-rtsp/
