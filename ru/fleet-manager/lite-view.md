# Lite view

> Lite view — экран управления Fleet Manager для телефона: список дронов, батарея, GPS и высота в реальном времени, режимы полёта и запуск миссии, пауза и RTL.

**Lite Control** — версия Fleet Manager для телефона, предназначенная для работы в полевых условиях: крупные кнопки, только самое необходимое и обновления в реальном времени через мобильный интернет телефона.

## Открыть Lite view

На телефоне войдите в Fleet Manager, откройте меню и выберите **Fleet → Lite View**. Также можно сразу перейти по адресу `https://fleet-manager.uavmatrix.com/lite`. Добавьте страницу на главный экран, чтобы открывать её одним касанием.

## Список дронов

В списке показаны все дроны с их статусом и батареей (оранжевым — ниже 40 %, красным — ниже 20 %), индикатор **Live updates active** и счётчик **n online / n total**. Нажмите на дрон, чтобы открыть его экран управления.

![Список дронов Lite view на телефоне с несколькими дронами, статусом и батареей](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/lite.webp)

*Lite view на телефоне 390 × 844: список Fleet с 33 online / 46 total, режимом полёта и батареей для каждого дрона.*

## Экран дрона

- Баннеры **Vehicle Armed** и **Failsafe Active**.
- Карточки **Battery**, **GPS**, **Altitude** и **Speed**.
- **Device ID**, **Organization**, **Position** и **View Full Details** (открывает полную страницу UAV).

![Экран дрона в Lite view с баннером взведения, карточками статуса и кнопками управления](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/lite--drone.webp)

*Lite view для взведённого дрона в режиме AUTO: баннер Vehicle Armed, карточки Battery, GPS, Altitude и Speed, а также элементы управления режимом и миссией.*

### Статус безопасности

Lite view показывает **ARMED** (*Motors active - exercise caution*) или **DISARMED** (*Safe to approach*), но кнопок взведения и разоружения здесь нет. Из соображений безопасности взводите и разоружайте дрон через наземную станцию управления (QGC, Mission Planner).

### Режим полёта (Owner и Admin)

**Quick Access** показывает режимы, которые вы используете чаще всего для данного типа аппарата, **All Modes** — полный список. Безопасные режимы переключаются после простого подтверждения. Навигационные и опасные режимы запрашивают **Change to *MODE*?** с более строгой проверкой, как в [панели управления](https://docs.uavmatrix.com/ru/fleet-manager/fleet/remote-control/#flight-mode).

### Управление миссией (Owner и Admin)

Для миссии, которая уже находится на дроне:

- **Start** / **Resume**, **Pause**, **RTL** и **Stop**, каждая с подтверждением. Для роверов для паузы и остановки используется HOLD вместо LOITER.
- **Jump to Waypoint**: выберите номер кнопками − и +, затем нажмите **Jump to WP n**. **Currently at waypoint n** показывает прогресс.
- **Refresh Mission Data** перезагружает миссию с дрона.

Если на дроне нет миссии, вы увидите **No Mission Loaded**. Сначала загрузите миссию на компьютере в разделе [Миссии](https://docs.uavmatrix.com/ru/fleet-manager/missions/).

Source: https://docs.uavmatrix.com/ru/fleet-manager/lite-view/
