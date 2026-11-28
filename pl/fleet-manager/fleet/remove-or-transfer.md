# Ponowne parowanie, usuwanie lub przenoszenie drona

> Sparuj drona ponownie, gdy Fleet Manager o to poprosi, usuń go z organizacji, przenieś do innej albo wymień jego komputer towarzyszący.

Dron należy do jednej organizacji naraz. Ta strona dotyczy trzech czynności wykonywanych na istniejącym dronie: ponownego sparowania, usunięcia i przeniesienia gdzie indziej.

## Ponowne parowanie drona

Ponowne parowanie odnawia certyfikat połączenia drona. Dron zachowuje swój wpis w Fleet Manager: nazwa, historia telemetrii, zapisane loty i powiązania strumieni pozostają bez zmian.

Potrzebujesz tego, gdy:

- Fleet Manager pokazuje przy dronie **Re-pair required** albo na jego stronie baner **This UAV must be re-paired**. Fleet Manager przeszedł na nowszy, bardziej rygorystyczny certyfikat, a ten dron ma jeszcze stary.
- Ktoś wybrał **Disconnect from Fleet** w UAVcast-Pro.

![Strona UAV z banerem This UAV must be re-paired](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/drone-detail--repair-required.webp)

*Strona UAV z banerem This UAV must be re-paired wyjaśniającym kroki Disconnect i Connect to Fleet Manager.*

1. W interfejsie UAVcast-Pro drona otwórz **Fleet Management** i wybierz **Disconnect from Fleet**. Potwierdź **Disconnect from Fleet?** Jeśli strona już pokazuje **Connect to Fleet Manager**, pomiń ten krok.
2. Wybierz **Connect to Fleet Manager**, aby otrzymać nowy 8-cyfrowy kod.
3. W Fleet Manager przejdź do **Fleet → Pair Device**, wybierz **tę samą organizację** i wpisz kod. Postępuj zgodnie z kreatorem jak w [Dodaj pierwszego drona](https://docs.uavmatrix.com/pl/fleet-manager/pair-uav/).

Nie usuwaj drona najpierw w Fleet Manager. Usunięcie kasuje jego historię, a ponowne parowanie ją zachowuje.

## Usuń drona

Użyj tego, gdy dron jest wycofywany, sprzedany lub przenoszony do innej organizacji. Tylko dla Owner i Admin.

1. Otwórz [stronę UAV](https://docs.uavmatrix.com/pl/fleet-manager/fleet/uav-details/) drona i wybierz **Remove**.
2. Potwierdź **Delete UAV**.

Jeśli dron jest online, Fleet Manager najpierw każe UAVcast-Pro odłączyć się (unpair) i czeka do 5 sekund na odpowiedź. UAVcast-Pro pokazuje wtedy ponownie **Connect to Fleet Manager** i opuszcza VPN organizacji.

Jeśli dron jest offline lub nie odpowiada, **UAVcast Not Responding** pyta, czy kontynuować. **Delete Anyway** usuwa go tylko z Fleet Manager. Następnie, gdy ponownie będziesz mógł dotrzeć do drona, sam wybierz **Disconnect from Fleet** w UAVcast-Pro. Do tego czasu dron nadal uważa się za sparowany.

![Okno potwierdzenia Delete UAV z ostrzeżeniem, że dane telemetrii i historia poleceń zostaną usunięte](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/drone-detail--delete.webp)

*Okno Delete UAV dla wycofanego płatowca, ostrzegające, że wszystkie dane telemetryczne i historia poleceń zostaną trwale usunięte.*

### Co usunięcie kasuje

| Usunięte | Zachowane |
| --- | --- |
| Wpis drona i jego nazwa | Wpisy w **Recent Activity** |
| Cała zapisana telemetria i historia lotów, w tym zapisane loty | Zapisane misje (należą do organizacji) |
| Historia poleceń i powiązania strumieni | Licencja UAVcast-Pro, która pozostaje aktywowana na dronie |
| Urządzenie VPN drona |  |

> **Tego nie można cofnąć**
>
> Przed usunięciem drona nie ma eksportu historii lotów. Jeśli potrzebujesz danych, najpierw odtwórz lub zapisz to, czego potrzebujesz, z [Historii lotów](https://docs.uavmatrix.com/pl/fleet-manager/map/flight-history/).

## Przenieś drona do innej organizacji

Fleet Manager nie ma przycisku „przenieś” dla pojedynczego drona, ponieważ historia zostaje w organizacji, która ją zapisała. Aby przenieść drona:

1. W obecnej organizacji [usuń drona](https://docs.uavmatrix.com/pl/fleet-manager/fleet/remove-or-transfer/#remove-a-drone). Jego historia tam zostanie skasowana.
2. Upewnij się, że licencja UAVcast-Pro drona należy do członka nowej organizacji. Zobacz [Licencje](https://docs.uavmatrix.com/pl/fleet-manager/licenses/).
3. W nowej organizacji [sparuj drona](https://docs.uavmatrix.com/pl/fleet-manager/pair-uav/).

Jeśli spróbujesz sparować drona, który nadal należy do innej organizacji, Fleet Manager zatrzyma się z komunikatem **This UAV is already paired to an organization**. Tylko Owner lub Admin tamtej organizacji może go zwolnić.

Aby przekazać **całą flotę** wraz z historią (na przykład przy sprzedaży firmy), zachowaj organizację i [przekaż własność](https://docs.uavmatrix.com/pl/fleet-manager/team/#transfer-ownership) nowemu właścicielowi.

## Wymień komputer towarzyszący

Fleet Manager identyfikuje drona po ID urządzenia, które UAVcast-Pro oblicza z numeru seryjnego procesora komputera towarzyszącego i jego dysku systemowego (karty SD lub SSD). Nowy komputer towarzyszący albo nowa karta SD lub SSD w tym samym komputerze pojawi się jako **nowy** dron. Ponowna instalacja UAVcast-Pro na tej samej płytce i dysku zachowuje to samo ID urządzenia.

1. Usuń stary dron w Fleet Manager (albo zachowaj go, dopóki nie potrzebujesz jego historii).
2. Zainstaluj UAVcast-Pro na nowym komputerze i aktywuj licencję. Zobacz [Aktywacja licencji](https://docs.uavmatrix.com/pl/get-started/license-activation/).
3. Sparuj go jako nowego drona i odtwórz jego powiązania strumieni.

Source: https://docs.uavmatrix.com/pl/fleet-manager/fleet/remove-or-transfer/
