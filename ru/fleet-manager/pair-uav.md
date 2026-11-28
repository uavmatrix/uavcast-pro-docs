# Добавление первого дрона

> Сопрягите дрон UAVcast-Pro с организацией Fleet Manager с помощью 8-значного кода сопряжения, выберите доступ к VPN и увидите дрон на Fleet Map.

Сопряжение привязывает один дрон с UAVcast-Pro к вашей организации. После сопряжения дрон поддерживает подключение к Fleet Manager с аутентификацией по сертификату и сам переподключается после перезагрузки или смены сети. Каждый дрон сопрягается один раз, это занимает около двух минут.

Вы работаете с двумя вкладками браузера: веб-интерфейсом UAVcast-Pro на дроне и Fleet Manager. Держите обе вкладки открытыми.

## Перед началом работы

- **Установленный UAVcast-Pro с активированной лицензией.** UAVcast-Pro не начнёт сопряжение без лицензии и показывает **No valid license found. Please activate your license first.** См. [Активация лицензии](https://docs.uavmatrix.com/ru/get-started/license-activation/).
- **Лицензия принадлежит участнику вашей организации.** Fleet Manager сравнивает email владельца лицензии в магазине UAVmatrix с email ваших участников. См. [Лицензии](https://docs.uavmatrix.com/ru/fleet-manager/licenses/).
- **Роль Owner или Admin** в организации. Пользователи с ролью Viewer не видят **Pair Device**. См. [Роли и права доступа](https://docs.uavmatrix.com/ru/fleet-manager/team/roles-and-permissions/).
- **Доступ в интернет на дроне** через Ethernet, Wi-Fi или сотовый модем, с открытыми исходящими HTTPS (TCP 443) и TCP **8883**. Порт 8883 обеспечивает зашифрованное соединение MQTT с Fleet Manager.
- **Актуальный релиз UAVcast-Pro 6.** Сопряжение запускается из раздела **Управление → Fleet Management** в UAVcast-Pro. Взведение, разоружение и предполётная калибровка из Fleet Manager требуют UAVcast-Pro 6.3.0_rc13 или новее; на более старых дронах Fleet Manager отмечает эти функции значком версии.

## Сопряжение дрона

1. **Получите код сопряжения в UAVcast-Pro.** Откройте веб-интерфейс дрона. В боковой панели в разделе **Управление** выберите **Fleet Management**, затем **Connect to Fleet Manager**. UAVcast-Pro покажет 8-значный **Pairing Code**, обратный отсчёт **Expires in** и сообщение **Waiting for Manager to confirm pairing...**

   ![Карточка UAVcast-Pro Connect to Fleet Manager с кнопкой Connect to Fleet Manager](https://docs.uavmatrix.com/ru/img/screenshots/uavcast-pro/fleet--connect.webp)

   *UAVcast-Pro, Управление → Fleet Management, до сопряжения. После выбора Connect to Fleet Manager появляются 8-значный код, обратный отсчёт Expires in и сообщение Waiting for Manager to confirm pairing...*

   > **Код действителен 5 минут**
   >
   > Если обратный отсчёт закончился до того, как вы ввели код, выберите **Connect to Fleet Manager** ещё раз. Всегда вводите код, который показан на экране: UAVcast-Pro ждёт только самый новый код.

2. **Откройте Pair Device в Fleet Manager.** Перейдите в **Fleet** и выберите **Pair Device**. Откроется мастер **Pair UAV**.

3. **Выберите организацию.** На шаге **Organization** выберите организацию, к которой должен относиться этот дрон, и нажмите **Continue**. В списке отображаются только организации, где вы Owner или Admin. Если такая организация одна, Fleet Manager выберет её автоматически и пропустит этот шаг.

4. **Введите код.** На шаге **Pairing Code** введите 8 цифр и нажмите **Continue**. Fleet Manager проверит код и перейдёт к шагу **Confirm Device**.

   ![Мастер Pair UAV на шаге Pairing Code с введённым 8-значным кодом](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/pair-device--code.webp)

   *Fleet Manager, Pair Device, шаг Pairing Code. На индикаторе выполнения отмечен шаг Organization.*

5. **Подтвердите устройство.** Проверьте данные, которые отправил UAVcast-Pro: **Name**, **Hostname**, **OS**, **Architecture** и **UAVcast Version**. Убедитесь, что они совпадают с дроном перед вами, и нажмите **Complete Pairing**. Если в вашей организации включён VPN, кнопка называется **Continue**, а следующий шаг — VPN.

   ![Шаг Confirm Device со списком имени, имени хоста, ОС, архитектуры и версии UAVcast](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/pair-device--confirm.webp)

   *Шаг Confirm Device: проверьте, что имя, имя хоста, ОС, архитектура и UAVcast Version совпадают с дроном перед вами.*

6. **Выберите доступ к VPN (только если VPN включён).** Шаг **VPN Connection** появляется, если в организации [включён VPN](https://docs.uavmatrix.com/ru/fleet-manager/network/). При включённом VPN наземные станции в сети вашей организации получают видео и телеметрию этого дрона напрямую, через 4G, Wi-Fi или спутник, без проброса портов.

   - Флажок **Enable VPN for this UAV** по умолчанию установлен. UAVcast-Pro подключается к VPN вашей организации сразу после сопряжения.
   - Если дрон уже находится в сети Tailscale, Fleet Manager покажет **Existing VPN Connection Detected** с сервером и IP-адресом этой сети. Блок изменится на **Replace existing VPN with Fleet Manager network** и будет снят. Установите флажок, только если хотите, чтобы дрон покинул текущую сеть.

   Нажмите **Complete Pairing**.

   ![Шаг VPN Connection с установленным флажком Enable VPN for this UAV](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/pair-device--vpn.webp)

   *Шаг VPN Connection: перечислены три преимущества, флажок Enable VPN for this UAV установлен.*

   > **Замена VPN может прервать ваш сеанс SSH**
   >
   > Если вы заменяете существующее подключение Tailscale, а текущий сеанс SSH или браузера к дрону идёт через него, сеанс разорвётся. Подключитесь к дрону через локальную сеть, прежде чем продолжить, или используйте его новый адрес VPN позже.

7. **Назовите дрон.** Появится экран **Pairing Complete!** с полем **UAV Name**. Введите название, которое ваша команда узнает на карте, например бортовой номер летательного аппарата или «Survey-14», и нажмите **Save**. Название синхронизируется с UAVcast-Pro, когда дрон будет в сети. Нажмите **View UAV**, чтобы открыть его страницу.

   ![Экран Pairing Complete с полем UAV Name и кнопкой View UAV](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/pair-device--complete.webp)

   *Pairing Complete!: в поле UAV Name введён бортовой номер.*

Между тем UAVcast-Pro, который проверяет статус каждые 5 секунд, получает сертификат дрона и параметры подключения (а также ключ VPN, если вы выбрали VPN). Его страница Fleet Management переключается в состояние **Connected**.

## Проверка подключения

Дрон появится в **Fleet** и на **Fleet Map** в течение нескольких секунд. Его значок показывает:

| Значок | Что это означает |
| --- | --- |
| **PAIRING** | Fleet Manager выдал сертификат и ожидает первого heartbeat от дрона. |
| **ONLINE** | Дрон подключён. UAVcast-Pro отправляет heartbeat каждые 5 секунд. |
| **OFFLINE** | Ничего не получено в течение 20 секунд. В карточке указано, когда дрон был в сети в последний раз. |

Если значок остаётся **PAIRING** или переходит в **OFFLINE**, проверьте с дрона, может ли он подключиться к Fleet Manager по порту 8883:

```bash
nc -vz fleet-manager.uavmatrix.com 8883
```

Строка, заканчивающаяся на `succeeded!`, означает, что порт открыт. Любой другой результат указывает на брандмауэр или оператора связи, который блокирует порт. См. [Дрон не в сети в Fleet Manager](https://docs.uavmatrix.com/ru/troubleshooting/drone-offline-fleet-manager/).

## Отправка видео и телеметрии на наземную станцию

Сопряжение не запускает видеопотоки. Чтобы управлять полётом из QGroundControl или Mission Planner, [подключите наземную станцию](https://docs.uavmatrix.com/ru/fleet-manager/connect-gcs/) к VPN и добавьте [привязку потока](https://docs.uavmatrix.com/ru/fleet-manager/network/stream-bindings/). Fleet Manager выделяет каждой привязке собственный блок портов (видео, место для камеры 2 и звука, телеметрия), поэтому несколько дронов могут одновременно передавать данные на одну наземную станцию. Первый дрон использует значения по умолчанию, 5600 и 14550; остальные значения смотрите в столбце **Ports** привязки.

## Если сопряжение не удалось

| Сообщение | Причина и решение |
| --- | --- |
| **Invalid pairing code** | Такого кода нет. Проверьте цифры или получите новый код в UAVcast-Pro. |
| **This pairing code has expired** | Прошло более 5 минут. Выберите **Connect to Fleet Manager** в UAVcast-Pro ещё раз. |
| **This pairing code has already been used** | Код уже использован вами или коллегой. Проверьте **Fleet**, есть ли там этот дрон, прежде чем сопрягать его снова. |
| **License is not owned by any member of this organization** | Лицензия на дроне принадлежит адресу, который не является участником. Пригласите этого пользователя или попросите поддержку добавить email в ваш аккаунт. См. [Лицензии](https://docs.uavmatrix.com/ru/fleet-manager/licenses/#licenses-bought-with-another-email). |
| **License has expired** / **License has been refunded** | Лицензия на дроне больше не действует. Продлите её или активируйте другую лицензию в UAVcast-Pro. |
| **This UAV is already paired to an organization** | Дрон принадлежит другой организации. Сначала его нужно удалить там. См. [Удаление или передача дрона](https://docs.uavmatrix.com/ru/fleet-manager/fleet/remove-or-transfer/). |
| **Too many attempts. Please wait a minute and try again.** | Более 10 проверок кода или 5 попыток сопряжения за минуту. Подождите минуту. |

Другие причины и проверки: [Код сопряжения недействителен или истёк](https://docs.uavmatrix.com/ru/troubleshooting/pairing-code-invalid/).

## Повторное сопряжение того же дрона

Повторное сопряжение дрона с **той же** организацией сохраняет его название, историю телеметрии и привязки потоков, а сертификат обновляется. Это нужно после выбора **Disconnect from Fleet** в UAVcast-Pro или когда Fleet Manager показывает **Re-pair required**. См. [Повторное сопряжение дрона](https://docs.uavmatrix.com/ru/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone).

Source: https://docs.uavmatrix.com/ru/fleet-manager/pair-uav/
