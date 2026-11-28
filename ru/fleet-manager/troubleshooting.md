# Устранение неполадок Fleet Manager

> Устранение частых проблем Fleet Manager: ошибки сопряжения, дроны, застрявшие в PAIRING или офлайн, требуется повторное сопряжение, отсутствующие потоки и неудачные команды.

Начните с того, что вы видите. Каждая строка ведёт к решению: ниже на этой странице или на общих страницах [устранения неполадок](https://docs.uavmatrix.com/ru/troubleshooting/).

| Что вы видите | Вероятная причина | Куда перейти |
| --- | --- | --- |
| **Invalid pairing code**, **This pairing code has expired**, **This pairing code has already been used** | Опечатка, код старше 5 минут или код уже использован | [Код сопряжения недействителен или истёк](https://docs.uavmatrix.com/ru/troubleshooting/pairing-code-invalid/) |
| **License is not owned by any member of this organization** | Лицензия оформлена на email, который не является участником | [Лицензии, оформленные на другой email](https://docs.uavmatrix.com/ru/fleet-manager/licenses/#licenses-bought-with-another-email) |
| **This UAV is already paired to an organization** | Дрон всё ещё принадлежит другой организации | [Перенос дрона](https://docs.uavmatrix.com/ru/fleet-manager/fleet/remove-or-transfer/#move-a-drone-to-another-organization) |
| UAVcast-Pro показывает **No valid license found** или **Invalid or inactive license** | Лицензия не активирована на дроне, истекла или возвращена | [Лицензия не активируется](https://docs.uavmatrix.com/ru/troubleshooting/license-activation-failed/) |
| Нет кнопки **Pair Device** | Вы Viewer | [Роли и права доступа](https://docs.uavmatrix.com/ru/fleet-manager/team/roles-and-permissions/) |
| Дрон застрял в **PAIRING** | Дрон ещё не подключился к брокеру | [Застрял в PAIRING](https://docs.uavmatrix.com/ru/fleet-manager/troubleshooting/#stuck-on-pairing) |
| Дрон **OFFLINE** | Нет интернета, порт 8883 заблокирован или UAVcast-Pro не запущен | [Дрон не в сети в Fleet Manager](https://docs.uavmatrix.com/ru/troubleshooting/drone-offline-fleet-manager/) |
| **Re-pair required** | Устаревший сертификат подключения | [Повторное сопряжение дрона](https://docs.uavmatrix.com/ru/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone) |
| **NO MAVLINK** на карте | UAVcast-Pro не получает данных от полётного контроллера | [Нет heartbeat MAVLink](https://docs.uavmatrix.com/ru/troubleshooting/no-mavlink-heartbeat/) |
| Привязка не выполняется: **Failed to send configuration to drone - it may be offline** | Дрон офлайн или не подтвердил получение за 15 с | [Привязка не сохраняется](https://docs.uavmatrix.com/ru/fleet-manager/troubleshooting/#binding-wont-save) |
| Привязка есть, но в наземной станции нет телеметрии или видео | Брандмауэр, неверный порт или поток выключен | [Нет потока на наземной станции](https://docs.uavmatrix.com/ru/fleet-manager/troubleshooting/#no-stream-at-the-ground-station) |
| Наземная станция подключена к VPN, но не видит дрон | Тип устройства, дрон не в VPN или заблокирован UDP | [VPN подключён, но дрон недоступен](https://docs.uavmatrix.com/ru/troubleshooting/vpn-cant-reach-drone/) |
| Команды не работают, **UAVcast Upgrade Required** | Дрон офлайн, роль Viewer или устаревшая версия UAVcast-Pro | [Команды не выполняются](https://docs.uavmatrix.com/ru/fleet-manager/troubleshooting/#commands-fail) |
| **Request timed out. UAVcast may be unreachable.** при удалённом открытии UAVcast-Pro | Медленный канал через прокси | [Прокси работает медленно или неполностью](https://docs.uavmatrix.com/ru/fleet-manager/troubleshooting/#proxy-is-slow-or-incomplete) |
| Письмо с приглашением не пришло | Спам-фильтр или неверный адрес | [Приглашение не получено](https://docs.uavmatrix.com/ru/fleet-manager/troubleshooting/#invitation-not-received) |

## Застрял в PAIRING

**PAIRING** означает, что Fleet Manager принял код и ожидает первого heartbeat от дрона по MQTT.

1. Посмотрите страницу **Fleet Management** в UAVcast-Pro. Если там всё ещё написано **Waiting for Manager to confirm pairing...**, дрон не получил свой сертификат. Проверьте, есть ли у него доступ в интернет.

2. Проверьте исходящее соединение с дрона по TCP 8883:

   ```bash
   nc -vz fleet-manager.uavmatrix.com 8883
   ```

3. Если вы ввели **старый** код с того же дрона (например, после двойного нажатия **Connect to Fleet Manager**), UAVcast-Pro его не ожидает. Выберите **Disconnect from Fleet**, если она доступна, получите новый код и сопрягайте дрон снова в ту же организацию. Дрон сохранит свою запись.

У дрона есть 15 минут после истечения срока кода, чтобы получить свой сертификат. После этого сопрягайте дрон заново.

## Привязка не сохраняется

Fleet Manager сохраняет привязку только после подтверждения от дрона. Проверьте, что дрон показывает **ONLINE**, и попробуйте снова. Если дрон в сети, но привязки всё равно не сохраняются, возможно, дрон не подключён к VPN: проверьте его в **Network → Connected Devices** с типом **UAV** или используйте **Push to Drone**.

## Нет потока на наземной станции

1. В **Network → Stream Bindings** убедитесь, что **Video** и **Telemetry** включены, и запишите значения **Ports**.
2. Проверьте, что программа наземной станции слушает именно эти порты. Только первый дрон на ноутбуке использует 5600 / 14550; у каждого следующего дрона свои порты.
3. Разрешите входящий UDP на эти порты в брандмауэре ноутбука. В Windows разрешите QGroundControl или Mission Planner для сетей **Private** и **Public**.
4. Выполните `tailscale status` на ноутбуке и убедитесь, что дрон есть в списке.

Подробнее: [Нет телеметрии в наземной станции](https://docs.uavmatrix.com/ru/troubleshooting/no-telemetry-in-gcs/) и [Нет видео в наземной станции](https://docs.uavmatrix.com/ru/troubleshooting/no-video-in-gcs/).

## Команды не выполняются

- Дрон должен быть в состоянии **ONLINE**.
- Команды могут отправлять только Owner и Admin. Viewer не видит кнопок команд, а сервер отклоняет команды от него.
- Взведение, разоружение и предполётная калибровка требуют UAVcast-Pro 6.3.0_rc13 или новее. [Обновите UAVcast-Pro](https://docs.uavmatrix.com/ru/get-started/updating/).
- Полётный контроллер может отклонить команду, например взведение при не пройденных предвзлётных проверках. Прочитайте сообщение во всплывающем окне на карте или на вкладке **Logs**.

## Прокси работает медленно или неполностью

**Open via Proxy** передаёт каждый запрос страницы через канал дрона, с ограничением 30 секунд на запрос, и не поддерживает функции реального времени (WebSocket). На слабом сотовом канале дождитесь полной загрузки страницы или подключитесь к VPN и используйте **Open via VPN**. См. [Удалённое открытие UAVcast-Pro](https://docs.uavmatrix.com/ru/fleet-manager/fleet/remote-uavcast/).

## Приглашение не получено

Попросите человека проверить папку спама. На странице **Team** проверьте email в разделе **Pending Invitations**. Если адрес неверный, нажмите **Revoke** и отправьте приглашение заново. Приглашения истекают через 7 дней.

## Проблема не решена

Откройте обращение кнопкой поддержки со скриншотом или напишите на [support@uavmatrix.com](mailto:support@uavmatrix.com). Укажите название дрона и его ID устройства (на странице UAV). Архив логов UAVcast-Pro (ZIP) отправьте на [support@uavmatrix.com](mailto:support@uavmatrix.com) с номером обращения, так как в обращение можно прикрепить только изображение. См. [Поддержка](https://docs.uavmatrix.com/ru/fleet-manager/support/) и [Сбор логов](https://docs.uavmatrix.com/ru/troubleshooting/collect-logs/).

Source: https://docs.uavmatrix.com/ru/fleet-manager/troubleshooting/
