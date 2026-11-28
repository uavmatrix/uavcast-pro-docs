# Нет видео в QGroundControl или Mission Planner

> Телеметрия работает, но видео в QGroundControl или Mission Planner остаётся чёрным? Проверьте камеру, «Включить видео», IP-адрес пункта назначения, UDP 5600 и наземную станцию.

Телеметрия приходит, и дрон отображается на карте, но область видео остаётся чёрной, или в окне видео QGroundControl выводится **WAITING FOR VIDEO**. Проверяйте по порядку. Чаще всего помогают проверки 2 или 3.

![Вид Fly в QGroundControl, подключённый к аппарату ArduPilot: панель инструментов с Not Ready и Stabilize, миссия из пяти маршрутных точек на карте с No GPS Lock for Vehicle и окно видео в левом нижнем углу с надписью WAITING FOR VIDEO](https://docs.uavmatrix.com/ru/img/screenshots/gcs/qgroundcontrol--fly-view.webp)

*Симптом в QGroundControl: телеметрия приходит (Not Ready и Stabilize на панели инструментов; No GPS Lock, потому что в этом стенде нет GPS), но окно видео в левом нижнем углу показывает WAITING FOR VIDEO.*

| Что вы видите | Вероятная причина | Начните с |
| --- | --- | --- |
| Видео чёрное в наземной станции и в предпросмотре UAVcast-Pro | Камера не запущена на дроне | [Проверка 1](https://docs.uavmatrix.com/ru/troubleshooting/no-video-in-gcs/#check-1) |
| Предпросмотр работает, а наземная станция остаётся чёрной | Для этой наземной станции выключено Включить видео или неверный IP | [Проверка 2](https://docs.uavmatrix.com/ru/troubleshooting/no-video-in-gcs/#check-2) |
| Дома по Wi-Fi работало, по 4G — чёрный экран | В пункте назначения указан локальный IP вместо IP VPN | [Проверка 2](https://docs.uavmatrix.com/ru/troubleshooting/no-video-in-gcs/#check-2) |
| Всё выглядит правильно, но на Windows экран всё равно чёрный | Брандмауэр блокирует входящий UDP на порту 5600 | [Проверка 3](https://docs.uavmatrix.com/ru/troubleshooting/no-video-in-gcs/#check-3) |
| QGroundControl показывает видео, а Mission Planner — нет | В Mission Planner не задан источник GStreamer | [Проверка 4](https://docs.uavmatrix.com/ru/troubleshooting/no-video-in-gcs/#check-4) |

## Проверка 1: убедитесь, что камера ведёт трансляцию на дроне

Если дрон не выдаёт видео, никакие настройки наземной станции не помогут.

1. Откройте веб-интерфейс UAVcast-Pro и перейдите в **Камера → Настройки камеры**.
2. Проверьте, что **Включить камеру?** установлено в **Да** и что камера выбрана в **Select Camera**.
3. Проверьте, что камера работает: строка **Video** на панели управления должна показывать **Running**. Если камера остановлена, нажмите **Запустить** на странице «Камера» (пока камера работает, кнопка показывает **Перезапустить**).
4. Включите **Включить Предпросмотр в Реальном Времени?** и посмотрите на **Предварительный просмотр**. Если вы видите картинку, камера работает, и можно переходить к проверке 2.
5. Если **Select Camera** показывает **No cameras available**, перейдите к разделу [Камера не обнаружена](https://docs.uavmatrix.com/ru/troubleshooting/camera-not-detected/).

![Страница «Настройки камеры» в UAVcast-Pro с включённой КАМ 1 и панелью предпросмотра, где написано No Video Available](https://docs.uavmatrix.com/ru/img/screenshots/uavcast-pro/camera.webp)

*Камера → Настройки камеры с включённой КАМ 1. Предварительный просмотр показывает No Video Available, пока не отмечена опция Включить Предпросмотр в Реальном Времени?.*

> **Предпросмотр — это не поток для наземной станции**
>
> Предпросмотр в браузере идёт через встроенный медиасервер (WebRTC на порту 8889). Наземная станция получает отдельный поток H.264 по UDP. Работающий предпросмотр доказывает, что камера работает, но не то, что поток UDP доходит до вашего ноутбука.

Если **Журнал действий** на странице «Камера» сообщает, что камера *does not support* разрешение, выберите другое значение в **Resolution**. UAVcast-Pro переходит на наибольший поддерживаемый размер и записывает в журнал, какой размер был использован.

## Проверка 2: проверьте пункт назначения наземной станции

UAVcast-Pro отправляет видео только в те пункты назначения, где видео включено. Телеметрия и видео имеют отдельные переключатели, и **оба выключены у нового пункта назначения**.

1. Перейдите в **Наземные станции** и найдите карточку компьютера, на котором работает ваша наземная станция.
2. Убедитесь, что **Включить конечную точку** и **Включить видео** включены.
3. Проверьте **IP-адрес или хост назначения**. Это должен быть IPv4-адрес компьютера с наземной станцией, каким его видит дрон. Имена хостов не принимаются.
4. Проверьте, что **Порт видео** равен `5600` или порту, который слушает ваша наземная станция.
5. Поля сохраняются при выходе из них или нажатии Enter. Зелёная галочка подтверждает сохранение.

![Порт видео 5600 и переключатель «Включить видео» включён](https://docs.uavmatrix.com/ru/img/screenshots/uavcast-pro/ground-control--video-enabled.webp)

*Наземные станции: пункт назначения с включённой опцией «Включить видео» и портом видео 5600.*

> **Летите через 4G? Используйте IP VPN**
>
> Через сотовое соединение дрон не может достучаться до локального адреса вашего ноутбука (например, `192.168.1.20`). Используйте адрес, который ноутбук получает в VPN (Fleet Manager VPN, Tailscale или ZeroTier). В Windows выполните `ipconfig` и найдите адаптер Tailscale или ZeroTier.

Используете Fleet Manager? Пункты назначения создаются автоматически, когда вы добавляете привязку потока, и каждый дополнительный дрон на той же наземной станции получает собственные порты. Проверьте порт видео, указанный в привязке, а не 5600. См. [Привязки потоков](https://docs.uavmatrix.com/ru/fleet-manager/network/stream-bindings/).

## Проверка 3: разрешите UDP 5600 через брандмауэр

Видео приходит как входящий трафик UDP. В Windows он заблокирован по умолчанию, даже когда телеметрия проходит, потому что наземная станция запросила исключение.

**Windows**

Откройте **PowerShell от имени администратора** и выполните:

```powershell
New-NetFirewallRule -DisplayName "UAV Video" -Direction Inbound -Protocol UDP -LocalPort 5600 -Action Allow
New-NetFirewallRule -DisplayName "MAVLink Telemetry" -Direction Inbound -Protocol UDP -LocalPort 14550 -Action Allow
```

Адаптеры ZeroTier и Tailscale часто относятся к сети *Public*. Правило, созданное таким образом, применяется ко всем профилям.

**Linux**

```bash
sudo ufw allow 5600/udp comment 'UAV Video'
sudo ufw allow 14550/udp comment 'MAVLink Telemetry'
```

**macOS**

Брандмауэр macOS разрешает входящий UDP для приложений, которые вы подтвердили. Если при первом запуске QGroundControl вы нажали *Deny*, разрешите его снова в **Системные настройки → Сеть → Брандмауэр → Параметры**.

## Проверка 4: настройте видео в наземной станции

**QGroundControl**

1. Нажмите значок **Q**, затем **Application Settings**.
2. Откройте настройки видео (**Video** или **General → Video** в старых версиях).
3. Установите **Source** в **UDP h.264 Video Stream** и проверьте, что UDP-адрес использует порт `5600` (**UDP URL** `0.0.0.0:5600` в текущих версиях, **UDP Port** `5600` в старых).
4. Вернитесь к виду Fly. Окно видео должно показать изображение в течение нескольких секунд.

**Mission Planner**

Mission Planner выводит видео в HUD. Если оно остаётся чёрным, задайте источник вручную:

1. Щёлкните правой кнопкой мыши по HUD и выберите **Video → Set GStreamer Source**.
2. Вставьте этот конвейер и подтвердите:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

## Проверка 5: проверьте поток без наземной станции

Это исключает из проверки программное обеспечение наземной станции. Если открывается окно с видео, значит дрон, сеть и брандмауэр исправны, а проблема в настройках наземной станции.

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

> **Windows: выберите полную установку**
>
> При установке GStreamer (среда выполнения MSVC 64-bit) выберите **Complete**. Вариант Typical пропускает декодер H.264, и команда завершается с ошибкой `no element "avdec_h264"`.

Закройте тест перед тем, как снова открыть наземную станцию: на порту 5600 одновременно может слушать только одна программа. Пошаговая настройка приёмника: [Mission Planner](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/mission-planner/), [QGroundControl](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/qgroundcontrol/), а также GStreamer для [Windows](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/gstreamer-linux/) или [macOS](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/gstreamer-macos/).

> **Видео есть, но по 4G оно прерывается?**
>
> См. [Прерывистое или задержанное видео](https://docs.uavmatrix.com/ru/troubleshooting/choppy-or-delayed-video/).

## Всё ещё нет видео?

[Скачайте журналы](https://docs.uavmatrix.com/ru/troubleshooting/collect-logs/) с выбранным **Сервер камеры** в списке журналов и отправьте их на **[support@uavmatrix.com](mailto:support@uavmatrix.com)** вместе с версией UAVcast-Pro, моделью камеры и используемой наземной станцией.

Связанное: [Настройки камеры](https://docs.uavmatrix.com/ru/uavcast-pro/camera/) · [Наземные станции](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/)

Source: https://docs.uavmatrix.com/ru/troubleshooting/no-video-in-gcs/
