# Wsparcie i FleetBot

> Uzyskaj pomoc w Fleet Manager: zapytaj asystenta FleetBot, otwórz zgłoszenie do wsparcia ze zrzutem ekranu, śledź jego status i sprawdź stan systemu.

Pomoc jest na wyciągnięcie ręki na każdej stronie Fleet Manager: okrągły przycisk wsparcia w prawym dolnym rogu otwiera panel z dwiema kartami, **FleetBot** i **Ticket**.

## Zapytaj FleetBota

**FleetBot** to asystent AI, który zna strony i funkcje Fleet Manager. Zapytaj go na przykład: „Jak podłączyć drugą stację naziemną?”, a odpowie linkami do odpowiednich stron.

![Panel wsparcia na karcie FleetBot z pytaniem i odpowiedzią zawierającą link do strony Network](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/support-bubble--fleetbot.webp)

*Panel wsparcia, karta FleetBot, odpowiadająca na pytanie, jak dodać powiązanie strumienia, z linkiem do Network → Stream Bindings.*

- Wpisz pytanie w polu **Ask FleetBot...** i wyślij je.
- Rozmowa może zawierać do 20 wiadomości, każda do 2000 znaków. Jeśli osiągniesz limit, rozpocznij nową rozmowę.
- FleetBot może się mylić, zwłaszcza w liczbach. Jeśli jego odpowiedź różni się od tej dokumentacji, obowiązuje dokumentacja.

> **Co widzi FleetBot**
>
> FleetBot otrzymuje tylko to, co wpiszesz w czacie, a nie dane twoich dronów. Wiadomości są wysyłane do modelu AI Claude firmy Anthropic w celu wygenerowania odpowiedzi. Nie wklejaj kluczy uwierzytelniających, haseł ani kluczy licencyjnych.

## Otwórz zgłoszenie do wsparcia

1. Otwórz panel wsparcia i wybierz kartę **Ticket**.
2. Wybierz **Category**: **Bug Report**, **Feature Request**, **General Inquiry** lub **Question**.
3. Wpisz **Subject** (od 5 do 200 znaków) i **Message** (od 20 do 5000 znaków). Opisz, którego drona dotyczy problem, co zrobiłeś i czego się spodziewałeś.
4. Opcjonalnie: dodaj zrzut ekranu. **Capture** przechwytuje ekran przez przeglądarkę (wybierasz okno), a **Upload** dołącza plik graficzny o rozmiarze do 5 MB.
5. Wybierz **Submit Ticket**.

![Panel wsparcia na karcie Ticket z polami kategorii, tematu, wiadomości i zrzutu ekranu](https://docs.uavmatrix.com/pl/img/screenshots/fleet-manager/support-bubble--ticket.webp)

*Karta Ticket wypełniona jako Bug Report o dronie utkniętym na PAIRING, z przyciskami Capture i Upload do opcjonalnego zrzutu ekranu.*

Otrzymasz numer zgłoszenia, na przykład `SUP-7KQ2XA`. Fleet Manager zapisuje także stronę, na której się znajdowałeś, oraz twoją przeglądarkę, aby wsparcie mogło odtworzyć problem.

> **Dołącz logi przy problemach z dronem**
>
> Przy problemach po stronie drona najbardziej pomagają logi. Zgłoszenie przyjmuje tylko obraz, więc wyślij pakiet logów UAVcast-Pro (plik ZIP, zobacz [Zbieranie logów](https://docs.uavmatrix.com/pl/troubleshooting/collect-logs/)) lub plik **Download logs** z karty **Logs** drona e-mailem na adres **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, wpisując w temacie numer zgłoszenia (na przykład `SUP-7KQ2XA`).

## Śledzenie zgłoszeń

**Settings → Support** wyświetla twoje zgłoszenia wraz ze statusem: **Open**, **In Progress**, **Resolved** lub **Closed**. Otwórz wybrane zgłoszenie, aby zobaczyć szczegóły i załączony zrzut ekranu. Gdy problem zostanie rozwiązany, wybierz **Close Ticket**. Nowe zgłoszenie możesz utworzyć tam również przyciskiem **Create Support Ticket**.

## Ukrywanie przycisku wsparcia

Wybierz ikonę ukrycia (**Hide support bubble**) w nagłówku panelu albo wyłącz **Support Chat Bubble** w **Settings → Support**. Aby go ponownie włączyć, zrób to w tym samym miejscu. Zgłoszenia zawsze możesz otworzyć w **Settings → Support**.

## Inne sposoby uzyskania pomocy

- **Stan systemu:** **System → Status** pokazuje aktywne i przeszłe incydenty. Jeśli wiele dronów przestaje być online naraz, sprawdź to najpierw. Zobacz [Wskaźniki stanu i powiadomienia](https://docs.uavmatrix.com/pl/fleet-manager/alerts-and-status/#status-page).
- **E-mail:** [support@uavmatrix.com](mailto:support@uavmatrix.com).
- **Społeczność:** [Discord UAVmatrix](https://discord.gg/xwqMTXh).

Source: https://docs.uavmatrix.com/pl/fleet-manager/support/
