# Подключение наземной станции

> Подключите ноутбук с QGroundControl или Mission Planner к VPN вашей организации одной командой Tailscale и начните получать видео и телеметрию дрона.

Наземная станция (GCS) — это ноутбук или ПК, на котором пилот запускает QGroundControl, Mission Planner или аналогичное ПО. Чтобы получать видео и телеметрию дрона через Fleet Manager, наземная станция подключается к частной VPN вашей организации. После этого вы выбираете, какие дроны будут передавать на неё поток, с помощью [привязок потоков](https://docs.uavmatrix.com/ru/fleet-manager/network/stream-bindings/).

Подключение одной наземной станции занимает около пяти минут.

## Перед началом

- **Роль Owner или Admin.** Роль Viewer может видеть страницу **Network**, но не видит ключ авторизации и команду подключения, а также не может включать VPN или настраивать устройства. Такой пользователь видит сообщение *Ask an Owner or Admin of this organization to connect a new device to the VPN.*
- **Включённый VPN** для организации. Если на странице **Network** есть кнопка **Enable VPN Network**, сначала нажмите её. См. [Сеть и VPN](https://docs.uavmatrix.com/ru/fleet-manager/network/).
- **Права администратора на наземной станции**, чтобы установить Tailscale и выполнить одну команду.
- Как минимум один дрон, [сопряжённый](https://docs.uavmatrix.com/ru/fleet-manager/pair-uav/) и подключённый к VPN.

> **Fleet Manager использует собственный VPN-сервер**
>
> Сеть организации работает с клиентом Tailscale, но управляется собственным контрольным сервером Fleet Manager, а не учётной записью tailscale.com. Регистрироваться в Tailscale не нужно. Если компьютер уже подключён к другой сети Tailscale, команда ниже переведёт его в сеть вашей организации.

## Подключение наземной станции к VPN

1. **Установите Tailscale** на наземную станцию с сайта [tailscale.com/download](https://tailscale.com/download) (Windows, macOS или Linux).

2. **Скопируйте команду подключения.** В Fleet Manager откройте **Network**, оставайтесь на вкладке **Devices** и найдите карточку **Connect a Device**. В разделе **GCS Connection Command** скопируйте команду. Она выглядит так:

   ```bash
   tailscale up --authkey=<your-org-key> --login-server=https://vpn-connect.uavmatrix.com
   ```

   ![Карточка Connect a Device с предупреждением GCS Computer Only и командой tailscale up](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/network--connect-device.webp)

   *Network → Devices → Connect a Device: предупреждение GCS Computer Only и кнопка копирования рядом с командой (ключ авторизации размыт).*

   > **Только для наземной станции**
   >
   > Не вставляйте эту команду в UAVcast-Pro и не запускайте её на дроне. Дроны подключаются к VPN при сопряжении или с помощью **Push to Drone** на той же странице.

3. **Выполните команду от имени администратора.**

   - Windows: откройте **Terminal** или **PowerShell** с пунктом **Run as administrator** и вставьте команду.
   - macOS и Linux: вставьте команду в терминал, добавив перед ней `sudo`.

   Когда команда завершится без ошибок, компьютер будет в сети. Команда `tailscale status` покажет дроны и другие устройства, которые он видит.

4. **Найдите компьютер в разделе Connected Devices.** Вернувшись в Fleet Manager, найдите компьютер в **Connected Devices** с его именем хоста и адресом `100.x.y.z`. Если он не появился через несколько секунд, нажмите **Sync**. Новое устройство получает тип **Unknown**, а баннер показывает, сколько устройств требуют настройки.

5. **Отметьте его как наземную станцию.** В столбце **Type** нажмите **Configure**. Выберите **Ground Control Station (GCS)**, нажмите **Continue**, затем **Complete Setup**.

   ![Мастер настройки устройства с вопросом What type of device is this и выбранной Ground Control Station](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/network--setup-wizard.webp)

   *Диалог Configure: вопрос What type of device is this? с выбранным Ground Control Station (GCS) для ноутбука ops-laptop-03.*

Теперь у компьютера есть значок **GCS**, и он появляется в списке **Ground Station** при создании привязки потока.

> **Называйте наземные станции по человеку или должности**
>
> Используйте **Rename** в меню действий устройства (кнопка **⋯**), чтобы дать имя вроде «Field laptop – Team North». В большом флоте списки привязок гораздо удобнее читать.

## Начало приёма потока от дрона

1. Откройте **Network → Stream Bindings** и нажмите **Add Binding**.

2. Выберите **Drone** и **Ground Station**, затем нажмите **Create Binding**. Дрон должен быть в сети.

3. Посмотрите порты в столбце **Ports**, например `5600 / 14550`.

4. В наземном ПО прослушивайте эти порты:

   - **QGroundControl:** телеметрия по UDP 14550 подключается автоматически. Для видео откройте **Application Settings → Video** (в старых версиях — **General**), установите **Source** в **UDP h.264 Video Stream** и укажите UDP-порт, равный видеопорту привязки (**UDP URL** `0.0.0.0:<port>` в актуальных версиях). Для дополнительных дронов добавьте UDP-линк на телеметрийный порт каждой привязки в **Application Settings → Comm Links**.
   - **Mission Planner:** выберите **UDP** в выпадающем списке подключения, нажмите **Connect** и введите телеметрийный порт.

Подробнее, в том числе о нескольких дронах на одной наземной станции: [Привязки потоков](https://docs.uavmatrix.com/ru/fleet-manager/network/stream-bindings/) и [Передача потока на несколько наземных станций](https://docs.uavmatrix.com/ru/guides/multiple-ground-stations/).

## Ключ авторизации

Команда содержит многоразовый ключ для сети вашей организации. Он действует 90 дней и может использоваться на любом количестве наземных станций. Owner и Admin могут нажать кнопку обновления в **Connect a Device**, чтобы создать новый ключ. Наземные станции, которые уже подключились, остаются на связи. Если карточка показывает **No valid auth key available. Generate a new key to connect devices.**, ключ истёк — создайте новый.

## Удаление наземной станции

В разделе **Network → Devices** откройте меню действий устройства и выберите **Remove Device**. Это удалит устройство из VPN и его привязки потоков. Чтобы подключить его снова, выполните команду подключения ещё раз.

## Устранение неполадок

- **Команда не выполняется или прерывается по времени:** проверьте, что компьютер может обратиться к `https://vpn-connect.uavmatrix.com`, и что ключ не истёк.
- **Наземная станция подключена, но телеметрии или видео нет:** проверьте, что привязка существует, переключатели **Video** и **Telemetry** включены и что наземное ПО слушает порты привязки. Брандмауэр Windows часто блокирует входящий UDP для нового приложения. См. [Нет телеметрии в наземной станции](https://docs.uavmatrix.com/ru/troubleshooting/no-telemetry-in-gcs/) и [Нет видео в наземной станции](https://docs.uavmatrix.com/ru/troubleshooting/no-video-in-gcs/).
- **Не удаётся связаться с дроном по VPN:** см. [VPN подключён, но до дрона нет доступа](https://docs.uavmatrix.com/ru/troubleshooting/vpn-cant-reach-drone/).

Source: https://docs.uavmatrix.com/ru/fleet-manager/connect-gcs/
