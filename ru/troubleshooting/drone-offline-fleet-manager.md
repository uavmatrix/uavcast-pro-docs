# Дрон показывает Offline в Fleet Manager

> Сопряжённый UAV показывает Offline или Re-pair required в Fleet Manager? Проверьте интернет дрона, исходящий порт 8883, Fleet Management в UAVcast-Pro и лицензию.

UAV сопряжён, но Fleet Manager показывает его как **Offline** (серый на карте парка), его телеметрия не обновляется или на нём есть значок **Re-pair required**.

Fleet Manager помечает UAV как offline, если от него ничего не поступало в течение 20 секунд. Дрон обменивается данными с Fleet Manager по зашифрованному соединению MQTT через собственное подключение к интернету.

| Что вы видите | Вероятная причина | Начните с |
| --- | --- | --- |
| Offline, а в UAVcast-Pro Fleet Management показывает Disconnected | У дрона нет интернета или заблокирован порт 8883 | [Проверка 1](https://docs.uavmatrix.com/ru/troubleshooting/drone-offline-fleet-manager/#check-1) |
| Значок Re-pair required или сообщение This UAV must be re-paired | У дрона старый сертификат | [Проверка 2](https://docs.uavmatrix.com/ru/troubleshooting/drone-offline-fleet-manager/#check-2) |
| Offline сразу после переустановки или сброса UAVcast-Pro | Сопряжение на дроне было удалено | [Проверка 3](https://docs.uavmatrix.com/ru/troubleshooting/drone-offline-fleet-manager/#check-3) |
| Online, но нет данных о положении или батарее | Полётный контроллер не подключён к UAVcast-Pro | [Проверка 4](https://docs.uavmatrix.com/ru/troubleshooting/drone-offline-fleet-manager/#check-4) |

## Проверка 1: Подключение дрона к Fleet Manager

1. Откройте UAVcast-Pro на дроне и перейдите в **Fleet Management**. **Fleet Connection** показывает **Connected** или **Disconnected**, а также **Last Connected**.
2. Если статус **Disconnected**, проверьте, есть ли у дрона интернет: строка **Cellular** на панели управления или `curl -I https://fleet-manager.uavmatrix.com` на устройстве. Сначала исправьте соединение, см. [Модем подключён, но нет интернета](https://docs.uavmatrix.com/ru/troubleshooting/modem-no-internet/).
3. Дрон должен устанавливать **исходящее TCP-соединение по порту 8883** (MQTT через TLS). Некоторые корпоративные сети, публичный Wi-Fi и отдельные тарифы IoT-SIM пропускают только веб-порты. Попробуйте другую сеть или попросите провайдера открыть порт 8883.
4. Проверьте дату и время на устройстве командой `date`. Соединение использует сертификаты, которые не проходят проверку на устройстве с неверными часами.
5. Убедитесь, что лицензия на дроне всё ещё активна (**Приложение → Менеджер лицензий**).

## Проверка 2: Требуется повторное сопряжение

Fleet Manager изменил способ подключения дронов, поэтому UAV, сопряжённые до этого изменения, нужно сопрячь ещё раз. Ничего не теряется: UAV сохраняет имя и историю, и удалять его в Fleet Manager не нужно.

1. В UAVcast-Pro на дроне откройте **Fleet Management**, нажмите **Disconnect from Fleet** и подтвердите действие.
2. Нажмите **Connect to Fleet Manager**. Появится 8-значный **Pairing Code** (код сопряжения) с обратным отсчётом.
3. В Fleet Manager перейдите в **Fleet → Pair Device**, выберите организацию и введите код.

## Проверка 3: Дрон потерял сопряжение

Переустановка с удалением базы данных, **Сбросить базу данных** (Reset Database) или **Disconnect from Fleet** удаляет сопряжение на дроне, и он перестаёт передавать данные. Сопрягите его снова, как в проверке 2. Сопряжение с той же организацией использует уже существующую запись UAV.

## Проверка 4: В сети, но нет телеметрии

Положение, батарея и полётный режим поступают от полётного контроллера. Если UAV в сети, но эти поля пусты, UAVcast-Pro не слышит полётный контроллер: см. [Нет heartbeat MAVLink](https://docs.uavmatrix.com/ru/troubleshooting/no-mavlink-heartbeat/).

## Всё ещё offline?

[Скачайте логи](https://docs.uavmatrix.com/ru/troubleshooting/collect-logs/) с дрона с выбранными **Все журналы** и отправьте их на **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, указав имя UAV и организацию. Другие проблемы Fleet Manager описаны в [Устранение неполадок Fleet Manager](https://docs.uavmatrix.com/ru/fleet-manager/troubleshooting/).

См. также: [Сопряжение Fleet Manager в UAVcast-Pro](https://docs.uavmatrix.com/ru/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/ru/troubleshooting/drone-offline-fleet-manager/
