# Mission Planner

> Подключите Mission Planner к дрону UAVcast-Pro: MAVLink по UDP 14550, видео H.264 в реальном времени в HUD с точным источником GStreamer, брандмауэр Windows, вторая камера и типичные ошибки.

Mission Planner получает телеметрию UAVcast-Pro по UDP-порту 14550 и показывает видео в реальном времени в HUD через источник GStreamer на порту 5600. Для телеметрии достаточно одного щелчка; для видео нужно один раз вставить конвейер, который Mission Planner запомнит.

## Перед началом

- На дроне — пункт назначения в разделе [Наземные станции](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/) с IP-адресом этого ПК (при 4G — VPN-адрес), с включённой **Включить телеметрию**, а для видео — с включённой **Включить видео**.
- Камера передаёт поток; см. **Камера → Настройки камеры**.
- Актуальная версия Mission Planner для Windows. IP этого ПК можно узнать командой `ipconfig` в командной строке.

## Подключение телеметрии

1. В правом верхнем углу Mission Planner выберите **UDP** в выпадающем списке подключения. Скорость передачи (baud rate) игнорируется.
2. Нажмите **Connect**.
3. Когда программа запросит порт прослушивания, оставьте `14550` (или **Порт телеметрии**, который вы задали на дроне) и нажмите **OK**.
4. Mission Planner загрузит параметры, и дрон появится на карте.

![Вид Flight Data в Mission Planner, подключённый по UDP: в правом верхнем окне подключения показаны UDP, связь UDP14550-1-QUADRO и кнопка DISCONNECT; HUD показывает DISARMED, Unhealthy AHRS и GPS: No Fix](https://docs.uavmatrix.com/ru/img/screenshots/gcs/mission-planner--connected.webp)

*Подключено. В правом верхнем окне показаны UDP и связь UDP14550-1-QUADRO, а кнопка теперь называется DISCONNECT. Это стендовая установка без GPS, поэтому HUD показывает DISARMED, Unhealthy AHRS и GPS: No Fix.*

## Показ видео в HUD

1. Щёлкните правой кнопкой по HUD (искусственному горизонту) и выберите **Video → Set GStreamer Source**.

2. Вставьте этот конвейер и нажмите **OK**:

   ```text
   udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
   ```

3. Видео заменит фон HUD в течение нескольких секунд. Данные полёта остаются поверх него.

*Иллюстрация Mission Planner: контекстное меню на HUD с выделенным пунктом Video и подпунктом Set GStreamer Source.*

*Иллюстрация Mission Planner, упрощённо. (1) Щёлкните правой кнопкой по HUD, (2) Video, (3) Set GStreamer Source, затем вставьте конвейер.*

Mission Planner для HUD использует собственную копию GStreamer, поэтому отдельная установка из [GStreamer на Windows](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/gstreamer-windows/) для этого не нужна. Если Mission Planner предложит загрузить GStreamer, разрешите ему это.

Оставьте окончание конвейера точно как показано: Mission Planner для вывода изображения нужна часть `video/x-raw,format=BGRA ! appsink name=outsink`. Меняйте только порт.

### Меньшая задержка

`rtpjitterbuffer` сглаживает запоздавшие пакеты ценой задержки около 200 мс. На хорошем канале её можно уменьшить:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer latency=0 ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink sync=false
```

При слабом канале 4G оставьте джиттер-буфер по умолчанию: картинка будет рассыпаться меньше.

## Разрешение Mission Planner в брандмауэре Windows

Windows спросит при первом прослушивании сети Mission Planner. Разрешите доступ для сетей **Private** и **Public**. Адаптер ZeroTier или Tailscale часто относится к **Public**, поэтому если отметить только Private, VPN будет заблокирован.

Если вы закрыли запрос, откройте порты в PowerShell от администратора:

```powershell
New-NetFirewallRule -DisplayName "UAVcast-Pro telemetry" -Direction Inbound -Protocol UDP -LocalPort 14550 -Action Allow
New-NetFirewallRule -DisplayName "UAVcast-Pro video" -Direction Inbound -Protocol UDP -LocalPort 5600-5602 -Action Allow
```

## Вторая камера (два потока)

Если включён режим [Два потока](https://docs.uavmatrix.com/ru/uavcast-pro/camera/multi-camera/), камера 2 отправляется на **Порт видео (Камера 2)**, по умолчанию `5601`. HUD Mission Planner показывает один источник. Либо переключите источник HUD на порт 5601, когда нужна камера 2, либо смотрите камеру 2 в отдельном окне GStreamer: см. [GStreamer на Windows](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/gstreamer-windows/).

Mission Planner игнорирует звук (Порт видео + 2). Воспроизводите его через GStreamer.

## Распространённые проблемы

| Симптом | Причина и решение |
| --- | --- |
| Подключается по Wi-Fi, по 4G ничего нет | Пункт назначения использует LAN-IP. Используйте VPN-IP этого ПК. |
| *No heartbeat packets received* | Дрон не отправляет данные на этот ПК: неверный IP, **Включить телеметрию** выключено или брандмауэр блокирует UDP 14550. |
| Телеметрия работает, HUD чёрный | **Включить видео** выключено для этого пункта назначения, камера не запущена или UDP 5600 заблокирован. Проверьте с помощью [GStreamer на Windows](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/gstreamer-windows/). |
| Видео зависает или серое | Потери пакетов. Уменьшите битрейт на дроне и задайте **Скорость Восстановления Потока** 15–30 кадров. |
| Видео останавливается при открытии другой программы | Только одна программа может слушать UDP-порт. Закройте окно GStreamer или QGroundControl, которые тоже используют порт 5600. |

Дополнительные проверки: [Нет видео в QGroundControl или Mission Planner](https://docs.uavmatrix.com/ru/troubleshooting/no-video-in-gcs/) и [Нет телеметрии в наземной станции](https://docs.uavmatrix.com/ru/troubleshooting/no-telemetry-in-gcs/).

Source: https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/mission-planner/
