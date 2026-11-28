# Службы, файлы и параметры установщика

> Службы systemd, которые устанавливает UAVcast-Pro, где хранятся база данных, журналы и записи, параметры установщика для выбора версии и полезные команды SSH.

Для работы с устройством по SSH: из каких служб состоит UAVcast-Pro, где лежат его файлы и как установить определённую версию.

## Службы

UAVcast-Pro работает как набор служб systemd. Каждая из них перезапускается сама, если даёт сбой.

| Служба | Назначение |
| --- | --- |
| `uavcast-web` | Веб-интерфейс (Node.js). Слушает порт 80, если вы не меняли **Порт сервера**. |
| `uavcast-factory` | Фоновый API: лицензия, модем, VPN, сеть, журналы, хранилище записей и подключение к Fleet Manager. |
| `mavlink-manager` | Связь с полётным контроллером и маршрутизатор телеметрии к наземным станциям. Запускается, не дожидаясь интернета. |
| `uavcast-camera` | Захват с камеры, кодирование H.264 и видеопоток UDP. Запускается, не дожидаясь интернета. |
| `mediamtx` | Медиасервер для предварительного просмотра в браузере, RTSP и записей. |
| `uavcast-ntrip` | Клиент NTRIP для поправок RTK. |
| `uavcast-dns` | Обновление динамического DNS. |
| `redis-server` | Внутренняя шина сообщений, от которой зависят остальные службы. |
| `zerotier-one`, `tailscaled` | Клиенты VPN, которые устанавливает установщик UAVcast-Pro. |

Полезные команды:

```bash
sudo systemctl status uavcast-web            # is it running?
sudo systemctl restart uavcast-camera        # restart one service
journalctl -u mavlink-manager -f             # follow a service's log live
journalctl -u uavcast-web --since yesterday  # read recent history
```

## Файлы и папки

Всё находится в `/opt/uavcast-pro`.

| Путь | Содержимое |
| --- | --- |
| `/opt/uavcast-pro/uavcast.db` | База данных настроек (SQLite). Создайте резервную копию в **Приложение → База данных → Создать резервную копию**. |
| `/opt/uavcast-pro/logs/` | Журналы служб, ротируются автоматически. Скачайте их в **Приложение → Логирование**. |
| `/opt/uavcast-pro/recordings/` | Записи с камер и журналы телеметрии на внутреннем хранилище (если **Место хранения** не указывает на USB-накопитель или другую папку). |
| `/opt/uavcast-pro/missions/` | Сохранённые миссии. |
| `/opt/uavcast-pro/installer.log` | Журнал последней установки. |
| `/etc/systemd/system/uavcast-web.service` | Служба веб-интерфейса, включая `SERVER_PORT`. |

## Параметры установщика

Установщик запускается одной командой. Запускайте его снова в любое время, чтобы починить или обновить установку.

```bash
# Install or update to the latest version
curl -fsSL https://install.uavmatrix.com | sudo bash

# List the versions available for this device's architecture
curl -fsSL https://install.uavmatrix.com | bash -s -- -l

# Install a specific version
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2
```

| Параметр | Значение |
| --- | --- |
| `-l` | Показать доступные версии для архитектуры этого устройства (arm64 или amd64). |
| `-b <version>` | Установить указанную версию вместо последней. |

Установщик определяет архитектуру и ОС, устанавливает системные пакеты, ZeroTier, Tailscale и пакеты камер, настраивает UART на Raspberry Pi, создаёт службы и запускает веб-интерфейс. Его журнал — `/opt/uavcast-pro/installer.log`.

Также можно обновиться из веб-интерфейса: **Приложение → Обновление приложения**, выберите версию в поле **Выберите версию для обновления** и нажмите **Обновить сейчас**.

## Точки интеграции

У UAVcast-Pro нет публичного REST API. Для интеграции используйте:

- **MAVLink по UDP** на каждый пункт назначения наземной станции (по умолчанию порт 14550) для любого ПО с поддержкой MAVLink.
- **Видео** по RTP/UDP (порт 5600) или RTSP с дрона (порт 8554). См. [VLC и RTSP](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/vlc-and-rtsp/).
- **Инжекторы** для передачи собственных значений датчиков в поток MAVLink по HTTP, UDP или последовательному порту. См. [Инжекторы](https://docs.uavmatrix.com/ru/uavcast-pro/flight-controller/injectors/).

Source: https://docs.uavmatrix.com/ru/reference/services-and-files/
