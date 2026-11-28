# Dwie kamery: przełączanie RC i podwójny strumień

> Podłącz dwie kamery do UAVcast-Pro i przełączaj je z nadajnika RC albo nadawaj obie jednocześnie do QGroundControl lub Mission Planner na osobnych portach UDP.

UAVcast-Pro obsługuje dwie kamery, na przykład przednią kamerę FPV i kamerę skierowaną w dół lub gimbal. Można ich używać na dwa sposoby:

- **Przełączanie**: jeden strumień, a ty wybierasz, która kamera go zasila, z interfejsu webowego lub z kanału RC na nadajniku. Zużywa przepustowość i procesor jednego strumienia.
- **Podwójny strumień**: obie kamery transmitują jednocześnie, każda na własny port UDP, z własną rozdzielczością, FPS i bitrate. Zużywa dwukrotnie więcej przepustowości i procesora.

Obsługiwane kombinacje: CSI + USB, dwie kamery USB lub dwie kamery CSI na płytkach z dwoma złączami kamer (Raspberry Pi 5, płytki nośne Compute Module).

## Dodawanie drugiej kamery

1. Przejdź do **Kamera → Ustawienia kamery**. Upewnij się, że **CAM 1** ma kamerę.
2. Wybierz **Dodaj Kamerę** obok CAM 1 i wybierz drugą kamerę. Pojawi się w slocie **CAM 2**.
3. Kliknij slot, aby uczynić daną kamerę aktywną (*Kliknij, aby przełączyć na Kamerę 2*).

W trybie przełączania obie kamery używają rozdzielczości i liczby klatek kamery 1 (*Używane będą rozdzielczość i FPS z Kamery 1*). Jeśli kamera 2 nie obsługuje tego rozmiaru, używa swojej natywnej rozdzielczości i jest skalowana, chyba że dla kamery, która to obsługuje, włączysz **Dopasuj rozdzielczość do Kamery 1**.

## Przełączanie kamer z nadajnika RC

**Przełączanie Kanału RC** pojawia się, gdy ustawione są dwie kamery i podwójny strumień jest wyłączony.

1. Na nadajniku przypisz przełącznik dwupozycyjny do wolnego kanału, na przykład kanału 7. Sprawdź w Mission Planner lub w **Mapa Lotu → Radio**, czy kanał przełącza się między około 1000 a 2000 µs.
2. W sekcji **Przełączanie Kanału RC** włącz **Włącz przełączanie kamery kanałem RC**.
3. Wybierz **Kanał RC**.
4. Przełącz przełącznik i obserwuj **Aktualna wartość PWM**. Poniżej 1500 wybiera Kamerę 1, powyżej 1500 — Kamerę 2.

![Panel Sterowania Kamerą z wypełnionym CAM 1 i pustym slotem Dodaj Kamerę](https://docs.uavmatrix.com/pl/img/screenshots/uavcast-pro/camera--control-panel.webp)

*Sloty kamer: CAM 1 w użyciu i **Dodaj Kamerę** dla drugiej kamery. Przełączanie Kanału RC pojawia się, gdy oba sloty są zajęte, a podwójny strumień jest wyłączony.*

Gdy przełączanie RC jest włączone, kliknięcie slotu kamery nic nie robi, bo kontrolę ma nadajnik. Wyłącz przełączanie RC, aby wybierać kamery ręcznie.

| Ustawienie | Domyślnie | Wartości | Uwagi |
| --- | --- | --- | --- |
| **Włącz przełączanie kamery kanałem RC** | Wyłączone | Włączone, wyłączone |  |
| **Kanał RC** | Kanał 7 | Kanał 1–18 | Odczytywany z wejścia RC kontrolera lotu. |
| Próg przełączania | 1500 µs | stały | PWM < 1500 = Kamera 1, PWM > 1500 = Kamera 2. |

## Transmisja obu kamer jednocześnie (podwójny strumień)

1. Gdy ustawione są dwie kamery, włącz **Podwójny strumień** na stronie Kamera. Znacznik pokaże **Both live**.
2. W sekcji **Per-camera settings** ustaw rozdzielczość, FPS i bitrate dla każdej kamery.
3. Na [Stacjach Naziemnych](https://docs.uavmatrix.com/pl/uavcast-pro/ground-stations/) każde miejsce docelowe ma teraz pole **Port Wideo (Kamera 2)**. Zostaw je puste, aby używać **Port Wideo** + 1 (`5601`), lub wpisz inny port. Przy kilku miejscach docelowych na jednym komputerze rozmieść porty wideo co 3 (`5600`, `5603` …), aby kamera 2 i dźwięk nie trafiły na port innego miejsca docelowego.
4. Skonfiguruj drugi odbiornik wideo na stacji naziemnej dla tego portu.

Kamera 1 trafia na **Port Wideo** każdej stacji naziemnej (domyślnie `5600`), a kamera 2 na **Port Wideo (Kamera 2)** (domyślnie `5601`).

QGroundControl pokazuje jednocześnie jeden strumień wideo. Aby oglądać kamerę 2, uruchom drugi odbiornik, na przykład drugą instancję QGroundControl na porcie 5601, Mission Planner ze źródłem GStreamer na porcie 5601 albo sam GStreamer:

```bash
gst-launch-1.0 udpsrc port=5601 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264" ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

> **Obserwuj procesor i łącze**
>
> Dwa strumienie podwajają obciążenie kodowania i przepustowość. Obserwuj **Obciążenie systemu** (*Procesor jest blisko limitu. Zmniejsz rozdzielczość/bitrate strumienia lub wyłącz drugi strumień.*) i zachowaj łączny bitrate z zapasem w stosunku do łącza komórkowego. Typowy podział to 1280x720 przy 1500 kbps dla kamery głównej i 854x480 przy 600 kbps dla drugiej.

Mapa Lotu pokazuje jedno okno wideo dla każdego aktywnego strumienia. Nagrania mogą obejmować obie kamery: zobacz **Nagrywaj kamerę 2** w [Nagraniach](https://docs.uavmatrix.com/pl/uavcast-pro/camera/recordings/).

## Rozwiązywanie problemów

- **Druga kamera nie pojawia się na liście**: dwie kamery CSI wymagają płytki z dwoma portami kamer. Na Raspberry Pi uruchom ponownie urządzenie po instalacji UAVcast-Pro: instalator powiększa pulę pamięci kamery (CMA), aby obie kamery mogły działać razem.
- **Obraz z kamery 2 jest rozciągnięty**: w trybie przełączania kamera 2 jest skalowana do rozdzielczości kamery 1. Użyj kamer o tych samych proporcjach lub włącz **Dopasuj rozdzielczość do Kamery 1**.
- **Przełącznik nic nie robi**: sprawdź **Aktualna wartość PWM**. *No signal* oznacza, że kontroler lotu nie raportuje wejścia RC na tym kanale.

Source: https://docs.uavmatrix.com/pl/uavcast-pro/camera/multi-camera/
