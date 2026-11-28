# Сопряжение с Fleet Manager

> Подключите дрон с UAVcast-Pro к UAVmatrix Fleet Manager: получите код сопряжения на дроне, введите его в Fleet Manager, проверьте подключение, переименуйте или отключите дрон.

Сопряжение подключает дрон с UAVcast-Pro к вашей организации в [UAVmatrix Fleet Manager](https://docs.uavmatrix.com/ru/fleet-manager/) — облачной панели управления парком дронов. После сопряжения дрон поддерживает зашифрованное соединение с Fleet Manager с аутентификацией по сертификату и переподключается автоматически после перезагрузки или смены сети. Сопряжение начинается на дроне и завершается в Fleet Manager. Занимает около двух минут.

## Предварительные требования

- UAVcast-Pro с **активированной лицензией** на дроне. Без неё сопряжение не выполняется (*No valid license found. Please activate your license first.*).
- Пользователь с ролью **Admin** в UAVcast-Pro. Раздел **Fleet Management** скрыт для пользователей с ролью Read Only.
- Учётная запись Fleet Manager с ролью **Owner** или **Admin** в организации. Лицензия дрона должна принадлежать участнику этой организации.
- Интернет на дроне с разрешёнными исходящими TCP **8883** (MQTT через TLS) и HTTPS (443).

## Сопряжение дрона

1. В веб-интерфейсе дрона перейдите в **Управление → Fleet Management**.
2. Нажмите **Connect to Fleet Manager**. Дрон запросит у Fleet Manager код и покажет код сопряжения (**Pairing Code**) с обратным отсчётом **Expires in**, затем *Waiting for Manager to confirm pairing...*.
3. В другой вкладке войдите на [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) и перейдите в **Fleet → Pair Device**.
4. Введите код с дрона и убедитесь, что данные устройства (имя хоста, архитектура, версия UAVcast-Pro) совпадают с дроном перед вами.
5. Завершите шаги в Fleet Manager (выбор VPN и название).
6. На дроне страница переключится на **Fleet Connection** со статусом **Connected**.

![Карточка Connect to Fleet Manager с кнопкой Connect to Fleet Manager](https://docs.uavmatrix.com/ru/img/screenshots/uavcast-pro/fleet--connect.webp)

*Управление → Fleet Management на дроне, который ещё не сопряжён. Нажатие Connect to Fleet Manager заменяет эту карточку 8-значным кодом сопряжения (Pairing Code) с обратным отсчётом Expires in.*

> **Код действителен 5 минут**
>
> Если код истечёт до ввода, нажмите **Connect to Fleet Manager** ещё раз, чтобы получить новый.

Всё, что касается Fleet Manager — организаций, VPN и действий с дроном, добавленным в парк, — описано в разделе [Добавление первого дрона в Fleet Manager](https://docs.uavmatrix.com/ru/fleet-manager/pair-uav/).

## После сопряжения

Карточка **Fleet Connection** показывает:

| Поле | Значение |
| --- | --- |
| **Connected** / **Disconnected** | Установлена ли сейчас связь дрона с Fleet Manager. |
| **Device Name** | Имя, которое отображается в Fleet Manager. Изменить его можно здесь или в Fleet Manager. *Managed by Fleet Manager* означает, что имя задано в Fleet Manager. |
| **Hostname**, **Device ID** | Как Fleet Manager идентифицирует этот дрон. |
| **Manager URL** | Экземпляр Fleet Manager, с которым сопряжён дрон. |
| **Last Connected** | Когда дрон в последний раз связывался с Fleet Manager. |

Fleet Manager получает с дрона живую телеметрию (положение, батарею, GPS, состояние полёта), состояние системы UAVcast-Pro и возможность удалённого управления службами. Пункты назначения наземных станций, которые Fleet Manager создаёт через привязки потоков, появляются на странице [Наземные станции управления](https://docs.uavmatrix.com/ru/uavcast-pro/ground-stations/) со значком облака.

Чтобы позже подключить дрон к VPN вашей организации, используйте вкладку **Fleet Manager** на странице [Виртуальная частная сеть](https://docs.uavmatrix.com/ru/uavcast-pro/connectivity/vpn/).

## Разрыв сопряжения

1. Перейдите в **Управление → Fleet Management**.
2. Нажмите **Disconnect from Fleet** и подтвердите действие.

Это удаляет сопряжение и сертификаты дрона. Чтобы снова использовать дрон в Fleet Manager, сопрягите его заново с новым кодом. Также удалите дрон из парка в Fleet Manager, чтобы он не оставался в списке как офлайн.

## Устранение неполадок

| Симптом | Что проверить |
| --- | --- |
| *No valid license found. Please activate your license first.* | Активируйте лицензию в разделе **Приложение**. См. [Лицензирование и активация](https://docs.uavmatrix.com/ru/get-started/license-activation/). |
| Fleet Manager сообщает, что лицензия не принадлежит участнику организации | Лицензия оформлена на адрес электронной почты, который не является участником организации. Добавьте этот адрес в Fleet Manager (см. [Лицензии](https://docs.uavmatrix.com/ru/fleet-manager/licenses/)) или пригласите эту учётную запись в организацию. |
| Код истёк | Нажмите **Connect to Fleet Manager** ещё раз. |
| Сопряжено, но статус остаётся **Disconnected** | Дрон не может подключиться к Fleet Manager по TCP 8883. Некоторые сети блокируют этот порт. Проверьте интернет-соединение дрона и брандмауэр. |

Подробнее: [Код сопряжения недействителен](https://docs.uavmatrix.com/ru/troubleshooting/pairing-code-invalid/) и [Дрон не в сети в Fleet Manager](https://docs.uavmatrix.com/ru/troubleshooting/drone-offline-fleet-manager/).

Source: https://docs.uavmatrix.com/ru/uavcast-pro/fleet-pairing/
