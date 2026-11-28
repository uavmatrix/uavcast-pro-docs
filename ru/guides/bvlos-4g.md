# Полёт за пределами прямой видимости по 4G

> Полёт дрона по сети 4G/LTE с UAVcast-Pro, сотовым модемом и VPN Fleet Manager: телеметрия и живое видео в QGroundControl или Mission Planner.

Это руководство проведёт вас от стенда до полёта по сотовой сети: телеметрия и живое видео в QGroundControl или Mission Planner, везде, где есть покрытие с обеих сторон. Используется VPN, который входит в [Fleet Manager](https://docs.uavmatrix.com/ru/fleet-manager/) и включён в вашу лицензию UAVcast-Pro, поэтому ни одной стороне не нужен публичный IP-адрес или проброс портов.

**Время:** около часа. **Вам понадобится:**

- Бортовой компьютер (Raspberry Pi 4 или 5 либо другая [поддерживаемая плата](https://docs.uavmatrix.com/ru/reference/supported-hardware/)) с установленным [UAVcast-Pro](https://docs.uavmatrix.com/ru/get-started/installation/) и [активированной лицензией](https://docs.uavmatrix.com/ru/get-started/license-activation/).
- Полётный контроллер с поддержкой MAVLink (ArduPilot или PX4), USB-кабель для передачи данных или проводка к порту TELEM.
- USB-модем 4G/LTE и SIM-карта с передачей данных. Отключите PIN-код SIM-карты в телефоне заранее, так проще.
- Камера, если нужно видео.
- Ноутбук с QGroundControl или Mission Planner и [клиент Tailscale](https://tailscale.com/download).
- [Организация Fleet Manager](https://docs.uavmatrix.com/ru/fleet-manager/set-up-organization/), где вы являетесь Owner или Admin.

> **Правила полётов за пределами прямой видимости**
>
> Полёты за пределами прямой видимости (BVLOS) в большинстве стран требуют разрешения. UAVcast-Pro обеспечивает канал связи; операционное одобрение, оценка рисков и аварийные меры — ваша ответственность.

## Как всё устроено

```text
Flight controller ──USB/UART── UAVcast-Pro ──4G──► internet ──► laptop
                                    │                               │
                                    └──── Fleet Manager VPN ────────┘
                  telemetry and video on the ports of the stream binding
```

Дрон отправляет MAVLink и видео H.264 на VPN-адрес вашего ноутбука. VPN делает ноутбук доступным по 4G так, будто оба устройства находятся в одной локальной сети.

> **Предпочитаете собственный VPN?**
>
> Вместо Fleet Manager можно использовать собственную сеть ZeroTier или tailnet Tailscale: см. [VPN](https://docs.uavmatrix.com/ru/uavcast-pro/connectivity/vpn/) и [Удалённый доступ через Tailscale](https://docs.uavmatrix.com/ru/guides/remote-access-tailscale/). Шаги 1, 2 и с 7 по 9 ниже остаются без изменений.

## 1. Подключите полётный контроллер

1. Подключите полётный контроллер к бортовому компьютеру по USB или подключите порт TELEM (TX→RX, RX→TX, GND→GND) и включите MAVLink на этом порту (`SERIALx_PROTOCOL = 2` для ArduPilot, `MAV_x_CONFIG` для PX4).
2. В UAVcast-Pro откройте **Полётный контроллер → Подключение**. Выберите **USB** или **UART / Serial** в поле **Тип связи**, а **Порт** и **Скорость (бод)** оставьте в значении **Автоматически**.
3. Дождитесь статуса **Подключено** и аппарата в поле **Аппарат**. Если статус остаётся **No heartbeat**, см. [Нет MAVLink heartbeat](https://docs.uavmatrix.com/ru/troubleshooting/no-mavlink-heartbeat/).

## 2. Настройте модем

1. Подключите модем и откройте **Модем**.
2. Установите **Включить сотовый модем?** в **Да** и выберите **Тип модема**: **HiLink** для модемов, работающих как USB-сетевой адаптер (например, Huawei E3372h), **Традиционный (PPP)** для остальных.
3. Для традиционного модема оставьте **Имя точки доступа (APN) (Необязательно)** пустым: UAVcast-Pro сам найдёт APN для вашей SIM-карты и запомнит его.
4. В разделе **Информация о модеме** дождитесь оператора и IPv4-адреса.
5. Откройте **Сети** и выберите **Приоритет модема (Режим на улице)**, чтобы трафик шёл через модем, даже когда рядом есть Wi-Fi.

Подробнее: [Сотовый модем](https://docs.uavmatrix.com/ru/uavcast-pro/connectivity/cellular-modem/). Если модем подключён, но ничего не загружается: [Модем подключён, но нет интернета](https://docs.uavmatrix.com/ru/troubleshooting/modem-no-internet/).

## 3. Включите VPN в Fleet Manager

В Fleet Manager откройте **Network**. Если там есть **Enable VPN Network**, выберите его. Так создаётся частная сеть вашей организации. См. [Сеть и VPN](https://docs.uavmatrix.com/ru/fleet-manager/network/).

## 4. Сопрягите дрон и подключите его к VPN

1. В UAVcast-Pro перейдите в **Управление → Fleet Management** и выберите **Connect to Fleet Manager**. Запишите 8-значный код.
2. В Fleet Manager перейдите в **Fleet → Pair Device**, введите код и подтвердите устройство.
3. На шаге **VPN Connection** оставьте включённым **Enable VPN for this UAV** и выберите **Complete Pairing**.
4. Дрон появится в **Network → Connected Devices** с типом **UAV** и адресом `100.x.y.z`.

Полное описание: [Добавьте первый дрон в Fleet Manager](https://docs.uavmatrix.com/ru/fleet-manager/pair-uav/).

## 5. Подключите ноутбук к VPN

1. Установите Tailscale на ноутбук. Учётная запись Tailscale не нужна: Fleet Manager работает собственный VPN-сервер.
2. В Fleet Manager, в разделе **Network → Devices**, скопируйте **GCS Connection Command** в блоке **Connect a Device** и выполните его на ноутбуке от имени администратора (`sudo` в macOS и Linux).
3. Ноутбук появится в **Connected Devices**. В столбце **Type** выберите **Configure**, укажите **Ground Control Station (GCS)** и нажмите **Complete Setup**.
4. Проверка: выполните `ping <drone VPN IP>` на ноутбуке. Теперь веб-интерфейс дрона доступен по адресу `http://<drone VPN IP>/`.

Подробнее и скриншоты: [Подключение наземной станции](https://docs.uavmatrix.com/ru/fleet-manager/connect-gcs/).

## 6. Отправьте телеметрию и видео на ноутбук

1. В Fleet Manager перейдите в **Network → Stream Bindings** и выберите **Add Binding**.
2. Выберите дрон и ноутбук, затем нажмите **Create Binding**. Fleet Manager передаст адрес назначения дрону; он появится на странице **Ground Control Stations** дрона со значком облака.
3. Порты видео и телеметрии для привязки указаны в столбце **Ports**. Для первого дрона на ноутбуке это значения по умолчанию: `5600` и `14550`.
4. На ноутбуке разрешите входящий UDP на этих портах в брандмауэре (команды см. в [Нет видео, проверка 3](https://docs.uavmatrix.com/ru/troubleshooting/no-video-in-gcs/#check-3)).

## 7. Запустите камеру

1. Откройте **Камера → Настройки камеры**, установите **Включить камеру?** в **Да** и выберите камеру в поле **Выберите камеру**.
2. Для LTE начните с **Разрешение** 1280×720, **Выберите FPS** 15–20 и **Битрейт:** около 1000–1500 kbps.
3. Настройки сохраняются сразу при изменении. Нажмите **Запуск**, если камера ещё не работает.

## 8. Откройте наземную станцию

- **QGroundControl** подключается к UDP 14550 самостоятельно. Для видео в настройках видео установите **Source** в **UDP h.264 Video Stream** и укажите видеопорт привязки.
- **Mission Planner**: выберите **UDP**, нажмите **Connect** и введите порт телеметрии привязки. Для видео задайте источник GStreamer, как описано на странице [Mission Planner](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/mission-planner/).

## 9. Проверьте работу по 4G перед полётом

1. Выключите Wi-Fi бортового компьютера или унесите дрон от него, чтобы единственным путём был модем.
2. Проверьте панель управления: **Сотовая связь** подключена, **VPN** подключён, **Наземная станция** — *Отправка*, **Видео** работает.
3. Понаблюдайте за связью 10 минут на земле, желательно на месте взлёта. Ищите зависания видео и пропуски телеметрии.
4. В **Полётный контроллер → Подключение** проверьте **Информация о GCS Failsafe**. Если там **Внимание - Failsafe отключен**, включите GCS failsafe на полётном контроллере (ArduPilot: `FS_GCS_ENABL` для Plane, `FS_GCS_ENABLE` для Copter; PX4: `NAV_DLL_ACT`) и выберите его действие, чтобы дрон действовал самостоятельно при потере связи.

> **Записывайте каждый полёт**
>
> Включите **Записывать автоматически при взведении** в разделе **Камера → Записи → Настройки**. Вы получите видео и журнал телеметрии каждого полёта для последующего разбора: [Записывайте полёты и разбирайте их](https://docs.uavmatrix.com/ru/guides/recording-flight-review/).

> **UAVnet выводится из эксплуатации**
>
> UAVnet, размещённый контроллер ZeroTier от UAVmatrix, выводится из эксплуатации в пользу Fleet Manager. Если ваши дроны сейчас используют сеть UAVnet, перенесите их на VPN Fleet Manager, как описано выше.

## Дальнейшие шаги

- [Передача на несколько наземных станций](https://docs.uavmatrix.com/ru/guides/multiple-ground-stations/)
- [Добавьте RTK-поправки от NTRIP-кастера](https://docs.uavmatrix.com/ru/guides/rtk-ntrip-caster/)
- Управляете несколькими дронами? [Подключите парк дронов к Fleet Manager](https://docs.uavmatrix.com/ru/guides/fleet-onboarding/)

Source: https://docs.uavmatrix.com/ru/guides/bvlos-4g/
