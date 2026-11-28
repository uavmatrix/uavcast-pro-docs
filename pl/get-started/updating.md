# Aktualizacja UAVcast-Pro

> Aktualizuj UAVcast-Pro z interfejsu web lub z wiersza poleceń, zainstaluj starszą wersję i sprawdź, co dzieje się z ustawieniami, portem serwera i nagraniami.

Zaktualizuj UAVcast-Pro w **Aplikacja → Aktualizacja Aplikacji** w interfejsie web albo uruchamiając ponownie instalator przez SSH. Oba sposoby zachowują ustawienia, użytkowników, licencję i nagrania. Dron potrzebuje dostępu do internetu, a po zakończeniu aktualizacji trzeba go zrestartować.

> **Nigdy nie aktualizuj przed lotem**
>
> Aktualizacja zatrzymuje wszystkie usługi UAVcast-Pro, w tym telemetrię i wideo, i wymaga restartu. Aktualizuj na ziemi, z rozbrojonym statkiem.

## Aktualizacja z interfejsu web

1. Przejdź do **Aplikacja**. Karta **Aktualizacja Aplikacji** pokazuje **Obecna Wersja** i **Najnowsza Wersja**. Gdy dostępne jest nowsze wydanie, pojawia się zielony baner *New version … available*.
2. Zostaw **Wybierz wersję do aktualizacji** na najnowszej wersji albo wybierz inną.
3. Wybierz **Aktualizuj do …** (lub **Aktualizuj Teraz**). **Progress** pokazuje kroki pobierania i instalacji. Trwa to kilka minut, dłużej na Pi Zero 2 W lub Pi 3.
4. Gdy pojawi się baner **Pending Restart**, wybierz **Zrestartuj Teraz**. Urządzenie się zrestartuje.
5. Otwórz ponownie interfejs web i sprawdź **Obecna Wersja**.

![Karta Aktualizacja Aplikacji z obecną i najnowszą wersją, banerem New version available i przyciskiem aktualizacji](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/application--update-available.webp)

*Aplikacja → Aktualizacja Aplikacji, gdy dostępna jest nowsza wersja.*

## Aktualizacja z wiersza poleceń

Uruchom instalator ponownie. Zastąpi pliki programu i zachowa bazę danych:

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
sudo reboot
```

Aby zainstalować konkretną wersję, najpierw wyświetl listę wersji (nie potrzeba roota), a następnie zainstaluj jedną z nich opcją `-b`:

```bash
# List the versions available for this device
curl -fsSL https://install.uavmatrix.com | bash -s -- -l

# Install a specific version
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.1
```

## Powrót do starszej wersji

Wybierz starszą wersję w **Wybierz wersję do aktualizacji** i zaktualizuj jak zwykle albo użyj `-b` w wierszu poleceń. Ustawienia zapisane w nowszej wersji mogą nie istnieć w starszej.

## Co aktualizacja zachowuje, a co zastępuje

| Zachowane | Zastępowane |
| --- | --- |
| Baza ustawień (`/opt/uavcast-pro/uavcast.db`): stacje naziemne, kamera, modem, VPN, użytkownicy, licencja | Pliki programu w `/opt/uavcast-pro` (`build`, `dist`, `factory`, `install`) |
| Nagrania i logi telemetrii | Pliki usług systemd |
| Członkostwo w ZeroTier i Tailscale | Pakiety systemowe, od których zależy UAVcast-Pro (aktualizowane przez apt) |

Od UAVcast-Pro 6.5.3 własny **Port Serwera** ustawiony na stronie Aplikacja jest zachowywany podczas aktualizacji. Wcześniejsze wersje przywracają port 80: po aktualizacji z jednej z nich otwórz interfejs WWW na porcie 80 i zapisz swój port ponownie.

## Zobacz, co się zmieniło

Każde wydanie jest opisane zmianami w [dzienniku zmian](https://docs.uavmatrix.com/pl/reference/changelog/). Przeczytaj go przed aktualizacją drona, który lata operacyjnie.

Source: https://docs.uavmatrix.com/pl/get-started/updating/
