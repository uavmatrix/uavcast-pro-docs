# GStreamer в Linux

> Установите GStreamer в Ubuntu, Debian или Fedora и воспроизводите H.264-видео дрона UAVcast-Pro и аудио Opus командой gst-launch-1.0, включая вторую камеру, низкую задержку и ufw.

GStreamer воспроизводит видеопоток UAVcast-Pro в окне одной командой. Используйте его, чтобы проверить видеоканал, посмотреть вторую камеру или услышать звук. Работает на любом настольном Linux, включая Raspberry Pi, используемый как наземная станция.

## Перед началом

На дроне добавьте пункт назначения в разделе [Наземные станции](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/) с IP-адресом этого компьютера (`ip -4 addr`; при 4G используйте VPN-адрес) и включите **Включить видео**.

## Установка GStreamer

**Ubuntu / Debian / Raspberry Pi OS**

```bash
sudo apt update
sudo apt install gstreamer1.0-tools gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-libav
```

`gstreamer1.0-libav` предоставляет декодер H.264 (`avdec_h264`). Без него команда ниже завершится с ошибкой.

**Fedora**

```bash
sudo dnf install gstreamer1 gstreamer1-plugins-good gstreamer1-plugins-bad-free gstreamer1-plugin-libav
```

Из-за патентных ограничений собственные репозитории Fedora включают не всю поддержку H.264, поэтому `avdec_h264` может отсутствовать и после этой установки. Если проверка ниже не проходит, подключите [RPM Fusion](https://rpmfusion.org/) и следуйте его руководству по мультимедиа, чтобы получить полный набор кодеков.

Проверьте, что декодер H.264 установлен:

```bash
gst-inspect-1.0 avdec_h264
```

Команда выведет сведения об элементе. Сообщение *No such element or plugin* означает, что декодер отсутствует.

## Воспроизведение видео

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Окно откроется, когда придёт первый ключевой кадр. Нажмите **Ctrl+C**, чтобы остановить воспроизведение.

> **Что должно появиться**
>
> 1. Терминал выведет `Setting pipeline to PLAYING ...` и будет ждать видео.
> 2. Когда придут первые пакеты, `-v` выведет строки с `caps = application/x-rtp`.
> 3. Откроется окно видео с изображением камеры.
>
> Если выполнение остановилось на шаге 1, видео не доходит до этого компьютера: см. таблицу устранения неполадок ниже.

- **Камера 2** в режиме [Два потока](https://docs.uavmatrix.com/ru/uavcast-pro/camera/multi-camera/): запустите команду снова с `port=5601`.
- **Меньшая задержка** на хорошем канале: замените `rtpjitterbuffer` на `rtpjitterbuffer latency=0`. При 4G оставьте значение по умолчанию.

## Прослушивание звука

Если включено **Передавать звук на наземные станции**, звук приходит на Video Port + 2:

```bash
gst-launch-1.0 udpsrc port=5602 caps="application/x-rtp, media=(string)audio, clock-rate=(int)48000, encoding-name=(string)OPUS, payload=(int)97" ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

## Брандмауэр

Большинство настольных дистрибутивов не блокируют входящий UDP. Если `ufw` активен:

```bash
sudo ufw allow 5600:5602/udp
sudo ufw allow 14550/udp
```

## Устранение неполадок

| Сообщение или симптом | Решение |
| --- | --- |
| *no element "avdec_h264"* | Установите `gstreamer1.0-libav`. |
| *no element "rtph264depay"* | Установите `gstreamer1.0-plugins-good`. |
| Команда работает, но окна нет | Ничего не приходит. Проверьте IP пункта назначения на дроне, **Включить видео** и брандмауэр. `sudo tcpdump -ni any udp port 5600` покажет, доходят ли пакеты до компьютера. |
| Ошибка привязки при запуске | Порт занят другой программой (QGroundControl, другим GStreamer). Закройте её. |
| Окно открылось, изображение серое и смазанное | Потери пакетов. Уменьшите битрейт на дроне и задайте **Скорость Восстановления Потока** 15–30 кадров. |

Source: https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/gstreamer-linux/
