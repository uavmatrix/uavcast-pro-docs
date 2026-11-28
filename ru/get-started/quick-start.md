# Быстрый старт

> Подключите полётный контроллер MAVLink к UAVcast-Pro и получите телеметрию и видео в реальном времени в Mission Planner или QGroundControl: сначала в локальной сети, затем через 4G/LTE.

Это руководство проведёт вас от дрона с установленным UAVcast-Pro до телеметрии и видео в реальном времени в Mission Planner или QGroundControl. Сначала вы настроите всё в локальной сети, где меньше возможных проблем, а затем перейдёте на 4G/LTE. Локальная часть занимает около 10 минут.

## Перед началом работы

- UAVcast-Pro установлен, устройство перезагружено. См. [Установка](https://docs.uavmatrix.com/ru/get-started/installation/).
- Ваш лицензионный ключ. См. [Лицензирование и активация](https://docs.uavmatrix.com/ru/get-started/license-activation/).
- Полётный контроллер подключён к бортовому компаньону по USB или через порт TELEM и включён.
- Подключённая камера (необязательно).
- Ноутбук с Mission Planner или QGroundControl в **той же сети**, что и дрон. Запишите IP-адрес ноутбука (`ipconfig` в Windows, `ip a` в Linux, **System Settings → Network** в macOS).

## 1. Активация лицензии

> Для активации дрона нужна лицензия UAVcast-Pro. Купите её в магазине UAVmatrix.
>
> [Купить UAVcast-Pro](https://uavmatrix.com/ru/checkout) · [Тарифы и цены](https://uavmatrix.com/ru/products)

1. Откройте `http://<drone-ip>` в браузере. Вы попадёте на страницу **Приложение**.
2. Вставьте ключ в поле **Введите лицензионный ключ** и выберите **Проверить**.

Боковая панель разблокируется. Теперь перейдите в **Users**, выберите **Add User** и создайте учётную запись администратора, чтобы веб-интерфейс не был открыт для всех в сети.

## 2. Подключение полётного контроллера

1. Перейдите в **Полётный контроллер → Подключение**.
2. В разделе **Link type** выберите **USB** или **UART / Serial** в соответствии с вашей проводкой.
3. Оставьте **Port** и **Baud rate** в режиме **Automatic**.
4. Если на панели состояния написано **Link stopped**, выберите **Подключить**.
5. Дождитесь, пока состояние сменится на **Подключено**. Раздел **Информация Mavlink** заполнится данными о типе аппарата, полётном режиме, GPS и батарее, а в верхней панели появится **FC Connected**.

![Страница Полётный контроллер → Подключение: состояние Connected через USB, проверка подключения с четырьмя пройденными шагами и инспектор MAVLink](https://docs.uavmatrix.com/ru/img/screenshots/uavcast-pro/flight-controller.webp)

*Полётный контроллер → Подключение при рабочем USB-соединении.*

Застряли на **Waiting for device**, **Detecting baud rate** или **No heartbeat**? Выберите **Auto-detect** и изучите панель **Connection check**: она покажет первую неполадку. Подробнее в разделе [Полётный контроллер](https://docs.uavmatrix.com/ru/uavcast-pro/flight-controller/).

## 3. Отправка телеметрии и видео на ноутбук

1. Перейдите в **Наземные станции**. Там уже есть одна пустая карточка пункта назначения.
2. Введите **Название**, например `Laptop`.
3. В поле **IP-адрес или хост назначения** введите IPv4-адрес ноутбука, например `192.168.1.20`, и нажмите Enter. Зелёная галочка означает, что настройка сохранена.
4. Оставьте **Порт телеметрии** равным `14550`, а **Порт видео** — `5600`.
5. Включите переключатель **Включить телеметрию**.
6. Включите **Включить видео**, если у вас есть камера.

Поля сохраняются при выходе из них. Кнопки «Сохранить» нет.

## 4. Запуск камеры

Пропустите этот шаг, если камеры нет.

1. Перейдите в **Камера → Настройки камеры**.
2. Установите **Включить камеру?** в значение **Да**.
3. Нажмите слот **КАМ 1** и выберите камеру, например *Raspberry Pi Camera - imx708 (CSI)* или вашу USB-веб-камеру.
4. В разделе **Настройки Камеры** выберите **Разрешение**. Начните с `1280x720` или ближайшего размера, который поддерживает ваша камера.
5. Оставьте **Выберите FPS** в значении **Авто**, а **Битрейт** — `0` (авто).
6. В разделе **Настройки Потока** установите флажок **Включить Предпросмотр в Реальном Времени?** и выберите **Запуск**. **Предварительный просмотр** покажет изображение.

## 5. Открытие наземной станции

**QGroundControl**

QGroundControl по умолчанию принимает данные на UDP 14550, поэтому дрон появится сам через несколько секунд.

Для видео: нажмите значок **Q** → **Application Settings** → **Video** (в старых версиях — раздел **Video** в **General**). Установите **Source** в значение **UDP h.264 Video Stream** и оставьте порт UDP по умолчанию `5600`. Видео отображается в представлении Fly.

**Mission Planner**

В правом верхнем углу выберите **UDP**, нажмите **Connect** и подтвердите порт `14550`.

![Представление Flight Data в Mission Planner, подключённое по UDP: в правом верхнем окне подключения видны UDP, канал UDP14550-1-QUADRO и кнопка DISCONNECT; на HUD отображаются DISARMED, Unhealthy AHRS и GPS: No Fix](https://docs.uavmatrix.com/ru/img/screenshots/gcs/mission-planner--connected.webp)

*Mission Planner, подключённый по UDP 14550: окно подключения (справа вверху) показывает канал и кнопку DISCONNECT. Стендовая настройка без GPS, поэтому на HUD Unhealthy AHRS и GPS: No Fix.*

Для видео: щёлкните правой кнопкой мыши по HUD → **Video** → **Set GStreamer Source** и вставьте:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

Полные инструкции со скриншотами и решениями: [Mission Planner](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/mission-planner/), [QGroundControl](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/qgroundcontrol/), [Android](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/android/), а также GStreamer для [Windows](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/gstreamer-linux/) или [macOS](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/gstreamer-macos/).

> **Брандмауэр Windows**
>
> Windows блокирует входящий UDP, если приложение не запросило исключение. Если телеметрия или видео не поступают, разрешите Mission Planner или QGroundControl через брандмауэр для **частных и общественных** сетей или откройте UDP 14550 и 5600.

Теперь у вас есть телеметрия и видео в локальной сети. В строке **Ground station** на панели управления отображается *Sending · … packets/s*.

## 6. Полёт через 4G/LTE

В сотовой сети у дрона нет адреса, до которого может достучаться ваш ноутбук, поэтому оба устройства подключаются к одному VPN. VPN Fleet Manager входит в вашу лицензию.

1. Подключите модем. В разделе **Модем** установите **Тип модема** в значение **HiLink** или **Традиционный (PPP)**. Оставьте **Имя точки доступа (APN)** пустым: UAVcast-Pro найдёт APN. См. [Сотовый модем](https://docs.uavmatrix.com/ru/uavcast-pro/connectivity/cellular-modem/).
2. Войдите в [Fleet Manager](https://fleet-manager.uavmatrix.com/), откройте **Network** и выберите **Enable VPN Network**, если он ещё не включён.
3. Сопрягите дрон: в UAVcast-Pro перейдите в **Управление → Fleet Management → Connect to Fleet Manager**, затем введите код сопряжения в Fleet Manager в разделе **Fleet → Pair Device**. Оставьте отмеченным **Enable VPN for this UAV**.
4. Подключите ноутбук к VPN: установите Tailscale и выполните **GCS Connection Command** на странице **Network** Fleet Manager, затем отметьте ноутбук как **Ground Control Station (GCS)**.
5. В разделе **Network → Stream Bindings** добавьте привязку потока от дрона к ноутбуку. Fleet Manager передаст пункт назначения на дрон, а в столбце **Ports** показано, какие порты нужно слушать.
6. В разделе **Сети** выберите **Приоритет модема (Режим на улице)**, чтобы трафик шёл через модем при пропадании Wi-Fi.

Полное руководство: [Полёт за пределами визуальной видимости через 4G](https://docs.uavmatrix.com/ru/guides/bvlos-4g/). Уже есть собственная сеть Tailscale или ZeroTier? Подключите к ней дрон и ноутбук и используйте VPN-адрес ноутбука как пункт назначения: см. [VPN](https://docs.uavmatrix.com/ru/uavcast-pro/connectivity/vpn/).

> **Настройте GCS failsafe перед полётом по LTE**
>
> Сотовые каналы могут обрываться. Убедитесь, что на полётном контроллере настроен GCS failsafe (`FS_GCS_ENABLE` для ArduPilot, `NAV_DLL_ACT` для PX4). В верхней панели отображается **GCS Failsafe Enabled** или **GCS Failsafe Disabled**.

## Дальнейшие шаги

- [Две камеры, переключение по RC и двойной поток](https://docs.uavmatrix.com/ru/uavcast-pro/camera/multi-camera/)
- [Записывайте каждый полёт на дроне](https://docs.uavmatrix.com/ru/uavcast-pro/camera/recordings/)
- [Поправки RTK по 4G с NTRIP](https://docs.uavmatrix.com/ru/uavcast-pro/flight-controller/ntrip-rtk/)
- [Сопряжение дрона с Fleet Manager](https://docs.uavmatrix.com/ru/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/ru/get-started/quick-start/
