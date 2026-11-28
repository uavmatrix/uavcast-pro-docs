# Веб-интерфейс не открывается

> Не открывается UAVcast-Pro по адресу http://device-ip после установки? Найдите правильный адрес, проверьте службу uavcast-web, порт сервера и порт 80.

Установщик завершился, но `http://<device-ip>/` не отвечает по таймауту, отклоняет подключение или показывает страницу другой программы.

| Что вы видите | Вероятная причина | Начните с |
| --- | --- | --- |
| Таймаут или страница никогда не загружается | Неверный адрес или ваш компьютер находится в другой сети | [Проверка 1](https://docs.uavmatrix.com/ru/troubleshooting/web-interface-wont-open/#check-1) |
| Connection refused | Веб-служба не запущена | [Проверка 2](https://docs.uavmatrix.com/ru/troubleshooting/web-interface-wont-open/#check-2) |
| Другая веб-страница, например nginx или Apache | Порт 80 занят другой программой | [Проверка 3](https://docs.uavmatrix.com/ru/troubleshooting/web-interface-wont-open/#check-3) |
| Работало раньше, перестало после изменения настроек | Изменён порт сервера | [Проверка 4](https://docs.uavmatrix.com/ru/troubleshooting/web-interface-wont-open/#check-4) |
| Открывается, но каждая страница перенаправляет на «Приложение» | Лицензия ещё не активна | [Проверка 5](https://docs.uavmatrix.com/ru/troubleshooting/web-interface-wont-open/#check-5) |

## Проверка 1: используйте правильный адрес

Веб-интерфейс по умолчанию работает на **порту 80**, поэтому адрес — просто `http://<device-ip>/`.

1. Найдите IP-адрес устройства. Установщик выводит его в конце. На самом устройстве также можно выполнить `hostname -I`.
2. На Raspberry Pi с именем хоста по умолчанию попробуйте `http://raspberrypi.local/`.
3. Используйте `http://`, а не `https://`. Веб-интерфейс не работает по HTTPS.
4. Убедитесь, что ваш компьютер находится в той же сети, что и устройство, или в том же VPN. При подключении через 4G используйте VPN-адрес дрона.

## Проверка 2: запущена ли веб-служба?

На устройстве выполните:

```bash
sudo systemctl status uavcast-web
```

Должно быть **active (running)**. Если нет, запустите службу и узнайте, почему она остановилась:

```bash
sudo systemctl restart uavcast-web
journalctl -u uavcast-web --since "1 hour ago"
```

Веб-интерфейсу также нужны фоновые службы. Проверьте их так же: `uavcast-factory`, `mavlink-manager`, `uavcast-camera` и `redis-server`. Полный список — в [Службы и файлы](https://docs.uavmatrix.com/ru/reference/services-and-files/).

## Проверка 3: порт 80 уже занят

Если на устройстве установлен другой веб-сервер, он может занимать порт 80. Выясните, кто слушает порт:

```bash
sudo ss -ltnp | grep ':80 '
```

Остановите и отключите другой сервер (например, `sudo systemctl disable --now nginx`), затем перезапустите `uavcast-web`.

## Проверка 4: порт сервера был изменён

**Приложение → Настройки → Порт сервера** переводит веб-интерфейс на другой порт, и адрес становится `http://<device-ip>:<port>/`. Если вы не помните порт, прочитайте его на устройстве:

```bash
grep SERVER_PORT /etc/systemd/system/uavcast-web.service
```

## Проверка 5: все страницы перенаправляют на «Приложение»

Это ожидаемо, пока на устройстве не активна лицензия. Активируйте её в разделе **Приложение → Менеджер лицензий**. Если это не удаётся, см. [Лицензия не активируется](https://docs.uavmatrix.com/ru/troubleshooting/license-activation-failed/).

## Проверка 6: установщик не завершился

Если `uavcast-web` не существует (`Unit uavcast-web.service could not be found`), установка остановилась раньше времени. См. [Установка завершается с ошибкой](https://docs.uavmatrix.com/ru/troubleshooting/installation-fails/).

## Всё ещё не получается?

Отправьте вывод `systemctl status uavcast-web` и `journalctl -u uavcast-web --since yesterday`, а также файл `/opt/uavcast-pro/installer.log` на **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Связанное: [Установка UAVcast-Pro](https://docs.uavmatrix.com/ru/get-started/installation/) · [Настройки приложения](https://docs.uavmatrix.com/ru/uavcast-pro/application-settings/)

Source: https://docs.uavmatrix.com/ru/troubleshooting/web-interface-wont-open/
