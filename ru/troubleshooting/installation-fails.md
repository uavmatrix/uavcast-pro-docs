# Установка завершается с ошибкой

> Исправьте ошибки установщика UAVcast-Pro, например «No installation candidate found» или «failed dependencies»: проверьте 64-битную ОС, интернет, диск и журнал установщика.

Вы выполнили `curl -fsSL https://install.uavmatrix.com | sudo bash`, и команда остановилась с ошибкой, зависла или завершилась без работающего веб-интерфейса.

| Что вы видите | Вероятная причина | Начните с |
| --- | --- | --- |
| No installation candidate for … found! | 32-битная ОС или неподдерживаемая архитектура | [Проверка 1](https://docs.uavmatrix.com/ru/troubleshooting/installation-fails/#check-1) |
| Failed to update package lists или Failed to install dependencies | Нет интернета или неисправная настройка apt | [Проверка 2](https://docs.uavmatrix.com/ru/troubleshooting/installation-fails/#check-2) |
| Долго зависает на Pi Zero 2 W | Мало памяти и медленный накопитель | [Проверка 3](https://docs.uavmatrix.com/ru/troubleshooting/installation-fails/#check-3) |
| Service failed to start | Компонент не смог запуститься после установки | [Проверка 4](https://docs.uavmatrix.com/ru/troubleshooting/installation-fails/#check-4) |

## Проверка 1: 64-битная операционная система

UAVcast-Pro v6 требует 64-битную ОС: arm64 или amd64 (ПК на x86). На arm64 платы, отличные от Raspberry Pi (Jetson и другие ARM-платы), требуют UAVcast-Pro 6.5.3 или новее; старые установщики останавливаются с ошибкой *Device is not a Raspberry Pi* (Устройство не является Raspberry Pi).

```bash
dpkg --print-architecture   # must print arm64 or amd64
uname -m                    # aarch64 or x86_64
```

Если вы видите `armhf`, `armv7l` или `i686`, у вас 32-битная ОС. Запишите **Raspberry Pi OS (64-bit)** с помощью Raspberry Pi Imager и установите заново. Поддерживаемые системы: Raspberry Pi OS, Debian и Ubuntu; см. [Поддерживаемое оборудование](https://docs.uavmatrix.com/ru/reference/supported-hardware/).

## Проверка 2: Интернет и apt

Установщик загружает UAVcast-Pro и системные пакеты, а также устанавливает ZeroTier и Tailscale.

1. Проверьте доступ в интернет: `curl -I https://install.uavmatrix.com`.
2. Выполните `sudo apt update` вручную и исправьте показанные ошибки, например стороннего репозитория с просроченным ключом.
3. Запустите установщик снова. Его безопасно запускать повторно.

## Проверка 3: Маломощные платы

На Raspberry Pi Zero 2 W установка занимает гораздо больше времени, чем на Pi 4 или 5, и установщик показывает оценку времени. Дождитесь завершения. Используйте быструю SD-карту и стабильный источник питания: сброс из-за пониженного напряжения во время установки оставляет незавершённую установку.

## Проверка 4: Прочитайте журнал установщика

Установщик записывает всё в `/opt/uavcast-pro/installer.log`.

```bash
sudo tail -n 100 /opt/uavcast-pro/installer.log
```

Посмотрите последние строки с ошибками. Если установщик останавливается до того, как может создать `/opt/uavcast-pro`, журнал находится в `/tmp/uavcast-installer.log`.

## Установка конкретной версии

Чтобы посмотреть версии, доступные для вашей архитектуры, или установить одну из них:

```bash
curl -fsSL https://install.uavmatrix.com | bash -s -- -l          # list versions
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2  # install 6.5.2
```

## Всё ещё не работает?

Отправьте `/opt/uavcast-pro/installer.log`, вывод команд `cat /etc/os-release` и `dpkg --print-architecture`, а также модель вашей платы на **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

См. также: [Установка UAVcast-Pro](https://docs.uavmatrix.com/ru/get-started/installation/)

Source: https://docs.uavmatrix.com/ru/troubleshooting/installation-fails/
