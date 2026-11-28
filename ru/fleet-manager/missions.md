# Миссии

> Рисуйте миссии из маршрутных точек на карте, выбирайте команды MAVLink и системы отсчёта высоты, сохраняйте миссии для всей организации и загружайте их на любой дрон в сети.

**Missions** (боковая панель **Fleet Management → Missions**) — планировщик маршрутных точек в браузере. Миссии сохраняются для организации, поэтому любой участник команды может загрузить миссию, а Owner или Admin может отправить её на любой дрон в сети.

![Mission Planner с нарисованным маршрутом съёмки из маршрутных точек на спутниковой карте](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/missions.webp)

*Mission Planner в спутниковом стиле с сеткой съёмки из 18 маршрутных точек, Takeoff и Return to Launch; в заголовке показаны количество точек (18) и общее расстояние.*

Viewer может открывать сохранённые миссии и просматривать их. Сохранение, загрузка и удаление требуют роли Owner или Admin.

## Планирование миссии

1. Выберите **Create New** (или **Missions → New Mission**).
2. Нажмите на карту, чтобы добавить маршрутные точки. Перетащите точку, чтобы переместить её. Во время размещения **Next WP** показывает расстояние от предыдущей точки (**Prev:**) и от дома (**Home:**).
3. Откройте панель маршрутных точек (**n Waypoints**), чтобы редактировать каждую строку: **Command**, **Params**, **Alt**, **Frame** и **Radius**. Перетаскивайте строки, чтобы изменить порядок. Строка **H** — это домашняя позиция (home).
4. Задайте **Defaults:** для новых точек в верхней части панели: **Alt** (по умолчанию 50 м) и **WP Radius** (по умолчанию 30 м).

![Панель маршрутных точек с колонками команды, параметров, координат, высоты, системы отсчёта, радиуса и расстояния](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/missions--waypoint-drawer.webp)

*Панель маршрутных точек с Takeoff, несколькими строками Waypoint, Change Speed и Return to Launch; Frame установлен на Relative.*

### Системы отсчёта высоты

| Система | Высота отсчитывается от |
| --- | --- |
| **Relative** (по умолчанию) | Домашней позиции |
| **Absolute** | Среднего уровня моря |
| **Terrain** | Земли под маршрутной точкой (нужны данные рельефа на полётном контроллере) |

### Команды

Выбор **Command** поддерживает поиск и показывает команды миссии MAVLink, которые понимает ArduPilot, сгруппированные так:

- **Navigation:** Waypoint, Takeoff, Land, Return to Launch, Loiter Unlim, Loiter Turns, Loiter Time, Loiter to Alt, Spline Waypoint, Vtol Takeoff, Vtol Land, Payload Place, Delay и другие.
- **Conditions:** Delay, Change Alt, Distance, Yaw.
- **Do commands:** Change Speed, Set ROI Location, Set Servo, Set Relay, Jump, Digicam Control, Set Cam Trigg Dist, Mount Control, Gripper, Parachute, VTOL Transition и другие.

Команды с параметрами (например, время задержки, число витков loiter, скорость или PWM серво) получают редактируемые поля в **Params**.

Ограничения: высота от 0 до 10 000 м, радиус от 1 до 1 000 м, не менее одной маршрутной точки.

## Сохранение

Выберите **Save**, введите **Name** (до 100 символов) и необязательное **Description**, затем подтвердите **Save Mission**. В заголовке отображается **Unsaved**, пока есть изменения; **Update Mission** сохраняет их. Открыть сохранённые миссии можно через **Missions → Saved Missions**.

## Загрузка на дрон

1. Сохраните миссию. Несохранённую миссию нельзя загрузить (**Mission not saved**).
2. Выберите **Upload to Drone**, укажите UAV в **Select UAV** и подтвердите.
3. Дождитесь подтверждения. Загрузка прерывается через 30 секунд, если дрон не отвечает.

![Диалог Upload Mission to Drone со списком дронов в сети](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/missions--upload.webp)

*Диалог Upload Mission to Drone со списком дронов в сети, из которых можно выбрать.*

Чтобы выполнить полёт, выберите миссию в [панели управления](https://docs.uavmatrix.com/ru/fleet-manager/fleet/remote-control/#mission) дрона и нажмите **Start**. Если миссия на дроне отличается от выбранной, панель предложит **Upload & Start**.

## Чтение миссии с дрона

В разделе **Missions → Read from Drone** выберите дрон в сети. Его текущая миссия загрузится в планировщик как **Mission from *name***. Сохраните её, чтобы оставить копию, например перед тем как перезаписать миссию на дроне.

> **Проверьте миссию в наземной станции перед полётом**
>
> Fleet Manager загружает именно то, что вы спланировали. Перед автоматическим полётом проверьте миссию и failsafe аппарата в QGroundControl или Mission Planner, как и в любом другом инструменте планирования.

Source: https://docs.uavmatrix.com/ru/fleet-manager/missions/
