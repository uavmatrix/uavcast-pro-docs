# Устранение неполадок

> Устраните отсутствие видео, отсутствие heartbeat MAVLink, проблемы с модемом и VPN, ошибки лицензии и сопряжение с Fleet Manager. Начните с того, что вы видите, и следуйте проверкам.

Начните с симптома. Каждая страница ниже перечисляет вероятные причины в порядке их возникновения на практике и содержит пронумерованные проверки, которые используют точные названия элементов интерфейса UAVcast-Pro и Fleet Manager.

> **Сначала проверьте панель управления**
>
> Откройте **Панель управления** в UAVcast-Pro. Карточка состояния кратко описывает дрон одной строкой (**All systems normal** или число проблем и предупреждений) и содержит строку для каждого из пунктов: **Полётный контроллер**, **Наземная станция**, **Cellular**, **VPN**, **Поправки RTK**, **Видео** и **Power supply**. Первая красная строка обычно подсказывает, с чего начать.

![Панель управления UAVcast-Pro с карточкой состояния: 2 проблемы, GPS (нет фикса) и VPN (не подключён)](https://docs.uavmatrix.com/ru/img/screenshots/uavcast-pro/dashboard.webp)

*Панель управления → карточка состояния. Строки с проблемами становятся красными и учитываются в значке проблем; здесь это GPS (Нет фикса) и VPN (не подключён).*

## Подберите свой симптом

| Что вы видите | Вероятная причина | Перейдите к |
| --- | --- | --- |
| Телеметрия работает, но видеообласть в QGroundControl или Mission Planner чёрная | **Включить видео** (Enable Video) выключено для этой наземной станции, неверный IP или файрвол | [Нет видео на наземной станции](https://docs.uavmatrix.com/ru/troubleshooting/no-video-in-gcs/) |
| Видео зависает, покрывается серыми полосами или отстаёт на секунды | Битрейт слишком высок для канала или ключевые кадры расположены слишком редко | [Видео с рывками или задержкой](https://docs.uavmatrix.com/ru/troubleshooting/choppy-or-delayed-video/) |
| На странице полётного контроллера **No heartbeat**, **Waiting for device** или **Detecting baud rate** | Кабель, проводка, порт или скорость передачи (baud rate) | [Нет heartbeat MAVLink](https://docs.uavmatrix.com/ru/troubleshooting/no-mavlink-heartbeat/) |
| UAVcast-Pro показывает полётный контроллер как **Подключено**, а наземная станция ждёт соединения | Телеметрия не отправляется на наземную станцию или она не слушает порт | [Нет телеметрии на наземной станции](https://docs.uavmatrix.com/ru/troubleshooting/no-telemetry-in-gcs/) |
| **No cameras available** в поле **Выберите камеру** | Нет стека камеры CSI, ленточного кабеля или USB-камера не видна | [Камера не обнаружена](https://docs.uavmatrix.com/ru/troubleshooting/camera-not-detected/) |
| **Invalid license key**, **Maximum activations reached** или **License activation failed** | Неверный ключ, нет свободного слота устройства или нет интернета | [Лицензия не активируется](https://docs.uavmatrix.com/ru/troubleshooting/license-activation-failed/) |
| Модем показывает сигнал и оператора, но ничего не загружается | APN, приоритет сети или данные SIM | [Модем подключён, но нет интернета](https://docs.uavmatrix.com/ru/troubleshooting/modem-no-internet/) |
| Браузер не открывает `http://<device-ip>/` после установки | Неверный адрес, служба не запущена или порт изменён | [Веб-интерфейс не открывается](https://docs.uavmatrix.com/ru/troubleshooting/web-interface-wont-open/) |
| Установщик останавливается с ошибкой | 32-битная ОС, нет интернета или мало места на диске | [Установка завершается с ошибкой](https://docs.uavmatrix.com/ru/troubleshooting/installation-fails/) |
| ZeroTier или Tailscale показывает подключение, но дрон не пингуется и не открывается | Участник не авторизован, неверная сеть или наземная станция не в VPN | [VPN подключён, но до дрона нет доступа](https://docs.uavmatrix.com/ru/troubleshooting/vpn-cant-reach-drone/) |
| Статус NTRIP не **Streaming corrections** или фикс RTK никогда не достигает **RTK Fixed** | Настройки кастера, GGA или приёмник, который не умеет RTK | [Поправки RTK не поступают](https://docs.uavmatrix.com/ru/troubleshooting/rtk-corrections-not-arriving/) |
| **Voltage too low - use a stronger power supply** или **Slowed down (heat or power)** | Слабый источник питания или кабель, перегрев | [Пониженное напряжение и троттлинг](https://docs.uavmatrix.com/ru/troubleshooting/undervoltage-and-throttling/) |
| Дрон **Offline** в Fleet Manager | На дроне нет интернета, заблокирован порт MQTT или требуется повторное сопряжение | [Дрон offline в Fleet Manager](https://docs.uavmatrix.com/ru/troubleshooting/drone-offline-fleet-manager/) |
| **Invalid pairing code**, **This pairing code has expired** или **License is not owned by any member of this organization** | Код введён неверно или устарел, либо лицензия принадлежит кому-то вне организации | [Код сопряжения недействителен или истёк](https://docs.uavmatrix.com/ru/troubleshooting/pairing-code-invalid/) |

## Всё ещё не получается?

1. [Соберите файлы журналов](https://docs.uavmatrix.com/ru/troubleshooting/collect-logs/). Архив включает снимок `diagnostics.txt` с настройками и оборудованием, поэтому поддержке не нужно запрашивать их отдельно.
2. Отправьте журналы на **[support@uavmatrix.com](mailto:support@uavmatrix.com)** с версией UAVcast-Pro, описанием используемого оборудования и того, что вы уже пробовали. Также можно задать вопрос в [UAVmatrix Discord](https://discord.gg/xwqMTXh).

Короткие ответы на частые вопросы — в [FAQ](https://docs.uavmatrix.com/ru/troubleshooting/faq/).

Source: https://docs.uavmatrix.com/ru/troubleshooting/
