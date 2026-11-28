# GStreamer на Windows

> Установите GStreamer на Windows (MSVC 64-bit, Complete), добавьте его в PATH и воспроизводите H.264-видео и аудио Opus UAVcast-Pro командой gst-launch-1.0 в PowerShell или cmd. Брандмауэр и исправления.

GStreamer воспроизводит видеопоток UAVcast-Pro в собственном окне, без программы наземной станции. Используйте его, чтобы проверить, доходит ли видео до ПК, посмотреть вторую камеру рядом с Mission Planner или QGroundControl либо услышать звуковую дорожку. Настройка занимает около пяти минут.

## Перед началом

На дроне добавьте пункт назначения в разделе [Наземные станции](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/) с IP-адресом этого ПК (`ipconfig` его покажет; при 4G используйте VPN-адрес) и включите **Включить видео**.

## Шаг 1: Установка GStreamer

1. Перейдите на [gstreamer.freedesktop.org/download](https://gstreamer.freedesktop.org/download/) и скачайте установщик **runtime** для Windows под **MSVC 64-bit** (не установщик development и не MinGW).
2. Запустите его и выберите **Complete**, когда появится запрос на тип установки.
3. Запомните папку установки. Новые установщики используют `C:\Program Files\gstreamer\1.0\msvc_x86_64`, старые — `C:\gstreamer\1.0\msvc_x86_64`.

> **Выберите Complete, а не Typical**
>
> Установка **Typical** не включает декодер H.264 (`avdec_h264`). Тогда команда ниже завершится с ошибкой *no element "avdec_h264"*. Запустите установщик снова и выберите **Complete**.

## Шаг 2: Добавление GStreamer в PATH

Чтобы запускать `gst-launch-1.0` из любой папки, добавьте его папку `bin` в PATH пользователя. В PowerShell (права администратора не нужны), указав папку установки:

```powershell
$bin = "C:\Program Files\gstreamer\1.0\msvc_x86_64\bin"
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
[Environment]::SetEnvironmentVariable("Path", "$userPath;$bin", "User")
```

Закройте и снова откройте терминал, затем проверьте:

```powershell
gst-launch-1.0 --version
```

Или используйте настройки Windows: найдите **Изменить переменные среды для вашей учётной записи**, выберите **Path** → **Изменить** → **Создать** и вставьте папку `bin`.

## Шаг 3: Воспроизведение видео

**PowerShell**

```powershell
gst-launch-1.0 -v udpsrc port=5600 'caps=application/x-rtp,media=video,clock-rate=90000,encoding-name=H264,payload=96' ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Сохраните одинарные кавычки вокруг `caps=…`: без них PowerShell разобьёт значение по запятым.

**Командная строка (cmd)**

```bat
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

Окно откроется, как только придёт первый ключевой кадр. Чтобы остановить воспроизведение, закройте его или нажмите **Ctrl+C** в терминале.

> **Что должно появиться**
>
> 1. Терминал выведет `Setting pipeline to PLAYING ...` и будет ждать видео.
> 2. Когда придут первые пакеты, `-v` выведет строки с `caps = application/x-rtp`.
> 3. Откроется окно видео с изображением камеры.
>
> Если выполнение остановилось на шаге 1, видео не доходит до этого компьютера: см. таблицу устранения неполадок ниже.

Для камеры 2 в режиме [Два потока](https://docs.uavmatrix.com/ru/uavcast-pro/camera/multi-camera/) запустите ту же команду во втором терминале с `port=5601`.

### Вариант с меньшей задержкой

На хорошем канале уберите задержку джиттер-буфера:

```powershell
gst-launch-1.0 udpsrc port=5600 'caps=application/x-rtp,media=video,clock-rate=90000,encoding-name=H264,payload=96' ! rtpjitterbuffer latency=0 ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

При 4G оставьте джиттер-буфер по умолчанию (первая команда); он скрывает запоздавшие пакеты.

### Ярлык для запуска двойным щелчком

Сохраните это как `uavcast-video.cmd` на рабочем столе и запустите двойным щелчком:

```bat
@echo off
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
pause
```

Если GStreamer не добавлен в PATH, добавьте второй строкой `cd /d "C:\Program Files\gstreamer\1.0\msvc_x86_64\bin"`.

## Прослушивание звука

Включите **Audio** и **Передавать звук на наземные станции** на странице **Камера** дрона. Звук приходит на Video Port + 2:

```powershell
gst-launch-1.0 udpsrc port=5602 'caps=application/x-rtp,media=audio,encoding-name=OPUS,clock-rate=48000,payload=97' ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

## Разрешение в брандмауэре

При первом прослушивании `gst-launch-1.0` Windows спросит, разрешить ли его. Отметьте сети **Private** и **Public** (адаптеры VPN часто относятся к Public). Чтобы открыть порты для любой программы, выполните в PowerShell от администратора:

```powershell
New-NetFirewallRule -DisplayName "UAVcast-Pro video and audio" -Direction Inbound -Protocol UDP -LocalPort 5600-5602 -Action Allow
```

## Устранение неполадок

| Сообщение или симптом | Решение |
| --- | --- |
| *'gst-launch-1.0' is not recognized…* | GStreamer не добавлен в PATH. Выполните шаг 2 и откройте новый терминал или запускайте команду из папки `bin`. |
| *WARNING: erroneous pipeline: no element "avdec_h264"* | Установка Typical. Переустановите с **Complete**. |
| *no element "rtph264depay"* или *"udpsrc"* | Та же причина: не установлены наборы плагинов. Переустановите с **Complete**. |
| Команда работает, но окно не открывается | Ничего не приходит. Проверьте IP пункта назначения на дроне (VPN-IP при 4G), **Включить видео**, камеру и брандмауэр. С `-v` строка с `caps = application/x-rtp` появится, когда придут пакеты. |
| *Could not get/set settings from/on resource* или ошибка привязки | Порт уже занят другой программой (Mission Planner, QGroundControl, вторым GStreamer). Закройте её. |
| Изображение серое или зависает | Потери пакетов. Уменьшите битрейт на дроне и задайте **Скорость Восстановления Потока** 15–30 кадров. |
| *erroneous pipeline: could not parse caps* в PowerShell | Кавычки вокруг `caps=…` отсутствуют или это двойные кавычки с пробелами. Используйте команду PowerShell точно как показано. |

Linux или Mac? См. [GStreamer в Linux](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/gstreamer-linux/) или [GStreamer на macOS](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/gstreamer-macos/).

Source: https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/gstreamer-windows/
