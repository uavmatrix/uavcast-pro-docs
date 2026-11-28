# Настройка организации

> Войдите в Fleet Manager с аккаунтом UAVmatrix, создайте организацию, к которой относятся ваши дроны и команда, и переключайте, переименовывайте или удаляйте её.

Всё в Fleet Manager принадлежит организации: дроны, миссии, сеть VPN, привязки потоков и участники команды. Создайте организацию перед сопряжением первого дрона.

## Вход

У Fleet Manager нет отдельного пароля. Вход выполняется через ваш аккаунт UAVmatrix, тот же, который вы используете на [uavmatrix.com](https://uavmatrix.com/) для покупки и управления лицензиями UAVcast-Pro.

1. Перейдите на [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) и выберите **Sign In** (или **Get Started**).
2. Войдите на открывшейся странице UAVmatrix. Если у вас ещё нет аккаунта, создайте его там.
3. Вы вернётесь на **Dashboard** Fleet Manager.

> **Входите с email, на который оформлены лицензии**
>
> Fleet Manager принимает дрон, только если его лицензия UAVcast-Pro принадлежит участнику организации. Совпадение определяется по email. Если вы войдёте под аккаунтом, с которым покупали лицензии, вам не придётся позже обращаться в поддержку. См. [Лицензии](https://docs.uavmatrix.com/ru/fleet-manager/licenses/).

Данные профиля (имя, email, пароль) управляются в вашем аккаунте UAVmatrix, а не в Fleet Manager. **Settings → Profile** ведёт туда.

## Создание организации

1. Откройте переключатель организаций вверху боковой панели и выберите **Create organization**. Если у вас ещё нет организации, такие страницы, как **Fleet** и **Network**, показывают **No Organization Yet** с кнопкой **Create Organization**.
2. Введите **Organization Name** (от 2 до 50 символов), например название вашей компании или «Survey Operations North». При желании добавьте **Description (optional)**.
3. Нажмите **Create**.

![Диалог Create Organization с полями Organization Name и Description](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/onboarding--create-organization.webp)

*Диалог Create Organization, заполненный, например, названием компании Nordic Aerial Survey AS.*

Вы становитесь **Owner** организации. Fleet Manager также в фоновом режиме создаёт для организации частную сеть VPN. Она выключена, пока вы не [включите VPN](https://docs.uavmatrix.com/ru/fleet-manager/network/).

> **Одна организация на владельца**
>
> Каждый пользователь может создать (и владеть) одну организацию. Если вы попытаетесь создать вторую, Fleet Manager ответит **You already own an organization**. При этом вы можете быть Admin или Viewer в любом количестве других организаций, например у клиента или партнёра.

## Переключение между организациями

Если вы состоите в нескольких организациях, переключатель вверху боковой панели покажет их в разделе **Organizations**. Выбранная организация определяет, что показывают **Fleet**, **Fleet Map**, **Missions**, **Network** и панель управления. Fleet Manager запоминает ваш выбор в этом браузере.

![Открытый переключатель организаций на боковой панели со списком из двух организаций](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/dashboard--organization-switcher.webp)

*Открытый переключатель организаций: Nordwind Aerial Services и Nordwind R&D Sandbox.*

## Переименование или удаление организации

Перейдите в **Settings → Organizations**. На вкладке перечислены организации, где вы Owner или Admin.

- **Переименование или изменение описания:** Owner или Admin. Измените **Name** или **Description** и нажмите **Save Changes**.
- **Удаление:** только Owner. Нажмите **Delete Organization** и подтвердите действие. Это удалит все дроны, историю их телеметрии, миссии, привязки потоков и членство в команде; отменить это нельзя.

![Вкладка Settings Organizations с полями названия, описания и кнопкой Delete Organization](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/settings--organizations.webp)

*Settings → Organizations для Owner: кнопки Save Changes и Delete Organization.*

> **Сначала отключите дроны, потом удаляйте организацию**
>
> Удаление организации не сообщает дронам об этом. Они продолжат попытки переподключения, пока вы не выберете **Disconnect from Fleet** в UAVcast-Pro на каждом из них. Сначала удалите дроны на их странице UAV (см. [Удаление или передача дрона](https://docs.uavmatrix.com/ru/fleet-manager/fleet/remove-or-transfer/)), чтобы Fleet Manager отключил их за вас.

Чтобы передать организацию другому человеку, [передайте владение](https://docs.uavmatrix.com/ru/fleet-manager/team/#transfer-ownership).

## Дальнейшие шаги

- [Добавление первого дрона](https://docs.uavmatrix.com/ru/fleet-manager/pair-uav/)
- [Пригласите свою команду](https://docs.uavmatrix.com/ru/fleet-manager/team/)

Source: https://docs.uavmatrix.com/ru/fleet-manager/set-up-organization/
