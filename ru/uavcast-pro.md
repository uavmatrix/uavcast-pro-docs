# UAVcast-Pro

> Справочник по веб-интерфейсу UAVcast-Pro: панель управления, полётный контроллер, карта полёта, наземные станции, камера, модем, VPN, сопряжение с Fleet Manager, пользователи и настройки.

Этот раздел описывает каждую страницу веб-интерфейса UAVcast-Pro в порядке боковой панели приложения. Каждая страница объясняет, для чего нужен экран, как его настроить, и перечисляет все настройки с их значениями по умолчанию. Впервые в UAVcast-Pro? Начните с [Быстрого старта](https://docs.uavmatrix.com/ru/get-started/quick-start/).

## Операции

[Панель управленияСостояние полётного контроллера, GPS, каналов связи, видео и питания одним взглядом.](https://docs.uavmatrix.com/ru/uavcast-pro/dashboard/)[Потоки данныхПользовательские живые панели для любого значения MAVLink или датчика.](https://docs.uavmatrix.com/ru/uavcast-pro/data-streams/)[Полётный контроллерСвязь по USB или UART с автоматическим определением порта и скорости, NTRIP/RTK и инжекторы.](https://docs.uavmatrix.com/ru/uavcast-pro/flight-controller/)[Карта ПолётаЖивая карта, кабинный HUD, взведение и разоружение, режимы, миссии, радио, инспектор и анализ журналов.](https://docs.uavmatrix.com/ru/uavcast-pro/flight-map/)[Наземные станции и видеоПункты назначения и пошаговая настройка Mission Planner, QGroundControl, GStreamer, Android и VLC.](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/)

## Связь

[МодемМодемы HiLink и традиционные модемы 4G/LTE с автоматическим APN.](https://docs.uavmatrix.com/ru/uavcast-pro/connectivity/cellular-modem/)[Виртуальная частная сетьVPN Fleet Manager или ваша собственная сеть Tailscale или ZeroTier.](https://docs.uavmatrix.com/ru/uavcast-pro/connectivity/vpn/)[Динамический DNSДержите имя хоста указывающим на публичный IP-адрес дрона.](https://docs.uavmatrix.com/ru/uavcast-pro/connectivity/dynamic-dns/)[СетиСетевые интерфейсы и приоритет Wi-Fi или модема.](https://docs.uavmatrix.com/ru/uavcast-pro/connectivity/networks/)

## Медиа

[Настройки камерыКамеры CSI и USB, разрешение, битрейт, H.264 с низкой задержкой по UDP.](https://docs.uavmatrix.com/ru/uavcast-pro/camera/)[Две камерыПереключение по RC-каналу или два потока.](https://docs.uavmatrix.com/ru/uavcast-pro/camera/multi-camera/)[ЗвукЗвук с микрофона в предпросмотре и на наземных станциях.](https://docs.uavmatrix.com/ru/uavcast-pro/camera/audio/)[ЗаписиЗапись видео и телеметрии на дроне с разбором полёта.](https://docs.uavmatrix.com/ru/uavcast-pro/camera/recordings/)

## Управление

[Fleet ManagementСопряжение дрона с UAVmatrix Fleet Manager.](https://docs.uavmatrix.com/ru/uavcast-pro/fleet-pairing/)[ПользователиВход администратора и пользователи только для чтения.](https://docs.uavmatrix.com/ru/uavcast-pro/users/)[ПриложениеПорт, язык, журналы для поддержки, резервное копирование и восстановление базы данных.](https://docs.uavmatrix.com/ru/uavcast-pro/application-settings/)

## Порты в одном месте

| Порт | Направление | Назначение |
| --- | --- | --- |
| TCP 80 | Браузер → дрон | Веб-интерфейс (настраивается) и HTTP-инжекторы |
| UDP 14550 | Дрон → наземная станция | Телеметрия MAVLink (для каждого пункта назначения, настраивается) |
| UDP 5600 | Дрон → наземная станция | Видео, камера 1 (для каждого пункта назначения, настраивается) |
| UDP 5601 | Дрон → наземная станция | Видео, камера 2 в режиме двух потоков (по умолчанию Порт видео + 1) |
| UDP 5602 | Дрон → наземная станция | Звук (Порт видео + 2) |
| TCP 8889, UDP 8189 | Браузер → дрон | Предварительный просмотр (сигнализация и медиа WebRTC) |
| TCP 8883 | Дрон → Fleet Manager | Подключение к Fleet Manager (MQTT через TLS) |
| TCP 2101 | Дрон → кастер NTRIP | Поправки RTK (порт кастера) |
| UDP 14600 | Датчик → дрон | UDP-инжектор (по умолчанию, настраивается) |

Source: https://docs.uavmatrix.com/ru/uavcast-pro/
