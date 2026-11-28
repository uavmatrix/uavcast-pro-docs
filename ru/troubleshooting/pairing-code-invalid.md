# Код сопряжения недействителен или истёк

> Исправьте ошибки Invalid pairing code, This pairing code has expired и License is not owned by any member of this organization при сопряжении дрона с Fleet Manager.

Вы ввели код из UAVcast-Pro в мастере **Pair Device** в Fleet Manager, и он был отклонён.

Сопряжение работает в одном направлении: **UAVcast-Pro показывает код, а вы вводите его в Fleet Manager**. Код состоит из 8 цифр и действителен 5 минут.

![Мастер Pair UAV в Fleet Manager с всплывающим сообщением об ошибке This pairing code has expired](https://docs.uavmatrix.com/ru/img/screenshots/fleet-manager/pair-device--code-expired.webp)

*Fleet Manager отклоняет код: ошибка появляется всплывающим уведомлением на шаге Pairing Code; здесь это This pairing code has expired.*

| Ошибка в Fleet Manager | Причина | Решение |
| --- | --- | --- |
| **Pairing code must be 8 digits** / **Please enter a valid 8-digit code** | Слишком мало цифр или есть буквы | [Проверка 1](https://docs.uavmatrix.com/ru/troubleshooting/pairing-code-invalid/#check-1) |
| **Invalid pairing code** | Опечатка или код, которого никогда не существовало | [Проверка 1](https://docs.uavmatrix.com/ru/troubleshooting/pairing-code-invalid/#check-1) |
| **This pairing code has expired** | Прошло больше 5 минут | [Проверка 2](https://docs.uavmatrix.com/ru/troubleshooting/pairing-code-invalid/#check-2) |
| **This pairing code has already been used** | Код уже был использован один раз | [Проверка 2](https://docs.uavmatrix.com/ru/troubleshooting/pairing-code-invalid/#check-2) |
| **License is not owned by any member of this organization** | Лицензия дрона принадлежит аккаунту вне организации | [Проверка 3](https://docs.uavmatrix.com/ru/troubleshooting/pairing-code-invalid/#check-3) |
| **Invalid license key** / **License has expired** / **License has been refunded** | Лицензия дрона недействительна в магазине | [Проверка 4](https://docs.uavmatrix.com/ru/troubleshooting/pairing-code-invalid/#check-4) |
| **This UAV is already paired to an organization** | Дрон уже сопряжён с другой организацией | [Проверка 5](https://docs.uavmatrix.com/ru/troubleshooting/pairing-code-invalid/#check-5) |
| **Too many attempts. Please wait a minute and try again.** | Ограничение частоты после повторных попыток | Подождите одну минуту |

## Проверка 1: введите текущий код

1. В UAVcast-Pro перейдите в **Fleet Management** и нажмите **Connect to Fleet Manager**.
2. Скопируйте 8 цифр, которые отображаются под **Pairing Code**.
3. В Fleet Manager перейдите в **Fleet → Pair Device**, выберите организацию и введите код в поле **Enter Pairing Code**.

## Проверка 2: получите новый код

Код действителен 5 минут и работает один раз. Когда **Expires in** достигнет нуля, снова нажмите **Connect to Fleet Manager** в UAVcast-Pro, чтобы получить новый код. Если UAVcast-Pro вообще не может получить код, он показывает *Unable to connect to Fleet Manager. Please check your internet connection.*: сначала исправьте интернет-подключение дрона.

## Проверка 3: лицензия принадлежит кому-то вне организации

Fleet Manager принимает только дрон, лицензию UAVcast-Pro для которого купил участник организации, в которую вы выполняете сопряжение. Совпадение проверяется по адресу электронной почты аккаунта в магазине, которому принадлежит лицензия.

Исправить это можно одним из способов:

- Пригласите в организацию (**Team**) аккаунт, который купил лицензию, и затем выполните сопряжение заново.
- Выполните сопряжение с организацией, в которой владелец лицензии является участником.
- Если лицензия куплена на другой ваш адрес электронной почты, попросите **[support@uavmatrix.com](mailto:support@uavmatrix.com)** добавить этот адрес как e-mail лицензии к вашему пользователю Fleet Manager.

См. [Лицензии в Fleet Manager](https://docs.uavmatrix.com/ru/fleet-manager/licenses/).

## Проверка 4: лицензия недействительна

Откройте **Приложение → Менеджер лицензий** на дроне и проверьте **Статус лицензии**. Истёкшую или возвращённую лицензию нужно продлить на [uavmatrix.com](https://uavmatrix.com/). Если у UAVcast-Pro вообще нет активной лицензии, он не может запросить код (*No valid license found. Please activate your license first.*): см. [Лицензия не активируется](https://docs.uavmatrix.com/ru/troubleshooting/license-activation-failed/).

## Проверка 5: уже сопряжён в другом месте

Дрон принадлежит одной организации. Чтобы перенести его, сначала удалите его из старой организации. Повторное сопряжение с той же организацией разрешено и сохраняет историю дрона. См. [Удаление или передача дрона](https://docs.uavmatrix.com/ru/fleet-manager/fleet/remove-or-transfer/).

## Всё ещё отклоняется?

Отправьте точный текст ошибки, имя хоста дрона и название организации на **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Связанное: [Сопряжение с Fleet Manager в UAVcast-Pro](https://docs.uavmatrix.com/ru/uavcast-pro/fleet-pairing/) · [Сопряжение первого дрона](https://docs.uavmatrix.com/ru/fleet-manager/pair-uav/)

Source: https://docs.uavmatrix.com/ru/troubleshooting/pairing-code-invalid/
