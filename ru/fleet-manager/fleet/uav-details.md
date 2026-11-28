# Сведения о UAV

> Страница дрона в Fleet Manager показывает телеметрию и состояние бортового компаньона в реальном времени, SSH-терминал и журнал MAVLink, а также перезагрузку и удаление.

У каждого дрона есть собственная страница. Откройте её кнопкой **Details** на карточке [Fleet](https://docs.uavmatrix.com/ru/fleet-manager/fleet/), с панели управления или кнопкой **View UAV** в конце сопряжения.

В заголовке отображаются имя, значок статуса в реальном времени, **Re-pair required** при необходимости, организация, **ID** устройства и **Last seen**. Owner и Admin также видят кнопки **Rename** и **Remove**.

На странице четыре вкладки: **Overview**, **Terminal**, **Logs** и **Actions**.

## Overview

Данные в реальном времени, передаются в браузер по мере поступления.

![Вкладка Overview на странице сведений о UAV с карточками UAVcast Application и MAVLink / Flight Controller](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/drone-detail.webp)

*Вкладка Overview взлетевшего VTOL в режиме AUTO: карточка UAVcast Application с CPU Temp, CPU, Memory и Disk и карточка MAVLink / Flight Controller с батареей, GPS, высотой и курсом.*

**UAVcast Application** описывает бортовой компаньон: состояние подключения (**Connected**, **Waiting for data...** или **Connecting...**), **Hostname**, **Uptime**, **CPU Temp**, загрузку **CPU**, использование **Memory** и **Disk**, службы UAVcast-Pro и их состояние, а также сетевые адреса дрона (локальная сеть и VPN). Здесь же находятся кнопки [открытия UAVcast-Pro удалённо](https://docs.uavmatrix.com/ru/fleet-manager/fleet/remote-uavcast/): **Open via Proxy** и, когда дрон подключён к VPN, **Open via VPN**.

**MAVLink / Flight Controller** показывает данные полётного контроллера: **ARMED** или **DISARMED**, флаги **FAILSAFE** и **GCS FAILSAFE**, **Battery**, **GPS** (спутники и фиксация), **Altitude** и **Heading**.

> **Следите за CPU Temp в жаркие дни**
>
> Raspberry Pi, который перегревается, снижает частоту, и первым от этого страдает видео. Если **CPU Temp** растёт во время полёта, см. [Недостаточное напряжение и троттлинг](https://docs.uavmatrix.com/ru/troubleshooting/undervoltage-and-throttling/).

### Connected Ground Stations

Под карточками раздел **Connected Ground Stations** показывает наземные станции, которые принимают потоки этого дрона, с переключателями **Video** и **Telemetry** и кнопками **Pause** / **Resume**. Кнопка **Add GCS** (для Owner и Admin) привязывает к этому дрону ещё одну наземную станцию. Она создаёт ту же привязку потока, что и **Network → Stream Bindings**, с занятыми портами следующими по порядку на этой наземной станции, и передаёт новое назначение дрону. См. [Привязки потоков](https://docs.uavmatrix.com/ru/fleet-manager/network/stream-bindings/).

## Terminal

SSH-сеанс в браузере к бортовому компаньону через зашифрованное соединение Fleet Manager. Не требует проброса портов и VPN. Только для Owner и Admin. Дрон должен быть в сети.

Нажмите **Connect**, чтобы открыть оболочку. Кнопки быстрых команд выполняют типичные проверки: `df -h`, `free -h`, `top -bn1`, `ip a`, `ip r`, `uptime`, `dmesg` и `ps aux`. Кнопка **Disconnect** закрывает сеанс.

![Вкладка Terminal с SSH-сеансом, показывающим вывод df -h, и кнопками быстрых команд](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/drone-detail--terminal.webp)

*Вкладка Terminal, подключённая к полевому дрону, после выполнения быстрой команды df -h.*

> **Это живая оболочка на летательном аппарате**
>
> Терминал — настоящая оболочка на бортовом компаньоне. Перезапуск служб или сети, пока дрон в воздухе, может прервать телеметрию и видео. Используйте его на земле, если только вы не знаете, что делает команда.

## Logs

Просмотр в реальном времени сообщений телеметрии и heartbeat, которые дрон отправляет в Fleet Manager, с фильтрами **Telemetry** и **Heartbeat**, переключателем **Auto-scroll**, кнопками **Pause** и очистки. Кнопка **Download logs** сохраняет содержимое экрана в текстовый файл (`mavlink-log-<id>-<time>.txt`), который удобно отправить в поддержку по электронной почте с номером обращения (к обращению можно приложить только изображение).

Это журнал в реальном времени, а не архив журналов полётов. Fleet Manager хранит телеметрию для [истории полётов](https://docs.uavmatrix.com/ru/fleet-manager/map/flight-history/), но не сохраняет и не экспортирует файлы DataFlash или `.tlog`. Они остаются на полётном контроллере и в вашем наземном ПО.

![Вкладка Logs с прокруткой записей телеметрии и heartbeat и переключателями Telemetry, Heartbeat и Auto-scroll](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/drone-detail--logs.webp)

*Вкладка Logs с потоком записей TELEMETRY и HEARTBEAT; переключатели Telemetry, Heartbeat и Auto-scroll включены.*

## Actions

**System Actions** содержит **Reboot** (перезагрузка бортового компаньона) и **Shutdown** (выключение бортового компаньона). Обе операции доступны только при наличии связи с дроном. Для подтверждения нужно ввести название действия.

Эти действия затрагивают только бортовой компаньон, а не полётный контроллер. Выключение нельзя отменить удалённо: кому-то придётся физически перезапустить питание дрона.

![Вкладка Actions с карточкой System Actions и кнопками Reboot и Shutdown](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/drone-detail--actions.webp)

*Вкладка Actions с открытым диалогом Confirm Reboot, в котором нужно ввести reboot для подтверждения.*

## Rename

Нажмите **Rename**, введите новое имя в поле **Edit UAV** и сохраните. Имя синхронизируется с UAVcast-Pro, когда дрон будет в сети.

## Remove

**Remove** удаляет дрон из организации и отменяет его сопряжение. См. [Повторное сопряжение, удаление или передача дрона](https://docs.uavmatrix.com/ru/fleet-manager/fleet/remove-or-transfer/).

Source: https://docs.uavmatrix.com/ru/fleet-manager/fleet/uav-details/
