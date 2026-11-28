# Uçuş kontrolcüsünden MAVLink heartbeat alınamıyor

> UAVcast-Pro No heartbeat veya Waiting for device mesajı mı gösteriyor? USB kablosunu, TELEM bağlantısını, SERIAL protokolünü ve baud hızını kontrol edin, ardından Otomatik algıla seçeneğini kullanın.

**Uçuş Kontrolcüsü → Bağlantı** sayfası **No heartbeat**, **Waiting for device**, **Detecting baud rate** veya **Searching** durumunu gösteriyor ve kontrol panelindeki **Uçuş kontrolcüsü** satırı hiçbir zaman yeşile dönmüyor. UAVcast-Pro henüz uçuş kontrolcüsünü duyamıyor.

Sayfada canlı bir **Bağlantı kontrolü** bulunur. Her adımı saniyede bir test eder ve bulduğu ilk sorunu açıklar. Önce buna bakın; genellikle bu sayfadan daha hızlı sonuç verir.

![Dört satırlı Bağlantı kontrolü kartı: uçuş kontrolcüsü takılı, okunabilir uçuş kontrolcüsü verisi, uçuş kontrolcüsü yanıt veriyor ve yer kontrol istasyonuna gönderiyor](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/flight-controller--connection-check.webp)

*Çalışan bir bağlantıda Bağlantı kontrolü: dört adımın tamamı geçer. Bağlantı başarısız olduğunda ilk başarısız adım işaretlenir ve açıklanır.*

| Ne görürsünüz | Olası neden | Başlangıç |
| --- | --- | --- |
| Waiting for device veya Flight controller plugged in: Not detected | Veri kablosu yok veya kart güçlendirilmemiş | [Kontrol 1](https://docs.uavmatrix.com/tr/troubleshooting/no-mavlink-heartbeat/#check-1) |
| Hatta sinyal var, ama okunabilir veri yok | Yanlış baud hızı, TX/RX ters bağlanmış veya port MAVLink olarak ayarlanmamış | [Kontrol 2](https://docs.uavmatrix.com/tr/troubleshooting/no-mavlink-heartbeat/#check-2) |
| Okunabilir veri yüksek bir yüzde bozuk gösteriyor | Gevşek veya uzun kablo, eksik toprak bağlantısı veya elektriksel gürültü | [Kontrol 3](https://docs.uavmatrix.com/tr/troubleshooting/no-mavlink-heartbeat/#check-3) |
| Port başka bir programda kullanımda görünüyor | Seri portu başka bir program tutuyor | [Kontrol 4](https://docs.uavmatrix.com/tr/troubleshooting/no-mavlink-heartbeat/#check-4) |
| Durum Off veya Stopped | Bağlantı kapalı | [Kontrol 5](https://docs.uavmatrix.com/tr/troubleshooting/no-mavlink-heartbeat/#check-5) |

## Kontrol 1: Uçuş kontrolcüsü hiç görülüyor mu?

**USB üzerinden:**

1. Uçuş kontrolcüsünün güçlendirildiğinden ve USB kablosunun eşlik eden bilgisayara bağlandığından emin olun.
2. Başka bir kablo deneyin. Birçok USB kablosu yalnızca şarj eder, veri taşımaz. Kart yanıyor ama **Flight controller plugged in** satırı **Not detected** diyorsa, asıl neden genellikle kablodur.
3. **Bağlantı türü** altında **USB** seçin ve **Port** alanını **Otomatik** bırakın. Otomatik, uçuş kontrolcüsünü bulur ve cihaz numarası değişirse onu izler.

**TELEM portu üzerinden (UART / Serial):**

1. **Bağlantı türü** altında **UART / Serial** seçin.
2. Kabloları kontrol edin: uçuş kontrolcüsünün **TX → RX** (eşlik eden bilgisayarda), **RX → TX** ve **GND → GND** bağlantıları. Eksik toprak kablosu sık görülen bir nedendir.
3. Raspberry Pi'yi hiçbir zaman TELEM portundan beslemeyin. Ayrı olarak güç verin.

> **Raspberry Pi seri portu**
>
> Kurulum programı Pi'nin UART'ını etkinleştirir ve `cmdline.txt` dosyasından seri konsolu kaldırır. Pi 3, 4 veya Zero 2 W üzerinde ayrıca Bluetooth'u devre dışı bırakır, böylece tam UART serbest kalır. UAVcast-Pro'dan sonra işletim sistemini yeniden kurduysanız, kurulum programını tekrar çalıştırın.

## Kontrol 2: Uçuş kontrolcüsündeki port ayarlarını eşleştirin

TELEM portunda uçuş kontrolcüsü, UAVcast-Pro'nun dinlediği hızda MAVLink kullanmalıdır. USB bağlantıları baud hızı kullanmaz.

1. Uçuş kontrolcüsünü USB üzerinden Mission Planner veya QGroundControl'e bağlayın.
2. Tüm parametre listesini açın ve kablosunu bağladığınız seri portu bulun: TELEM1 için `SERIAL1`, TELEM2 için `SERIAL2`.
3. `SERIALx_PROTOCOL` değerini `2` (MAVLink2) olarak ayarlayın. Parametreleri yazın ve uçuş kontrolcüsünü yeniden başlatın.
4. `SERIALx_BAUD` değerini not edin. UAVcast-Pro'da **Baud hızı** alanını **Otomatik** bırakın veya aynı değeri seçin.

**Otomatik** seçiliyken UAVcast-Pro sırasıyla 57600, 115200, 921600, 1500000, 460800, 230400 ve 500000 baud değerlerini dener ve çalışan hızı hatırlar. Arama sırasında durum *Trying … baud (n of 7)* gösterir.

> **UAVcast-Pro'nun sizin yerinize aramasına izin verin**
>
> **Otomatik algıla** düğmesine basın. Bağlantı duraklatılır, her port ve baud hızı dinlenir, ardından bulunanlar kaydedilir. Bu işlem bir dakikaya kadar sürebilir. *No flight controller found* mesajı çıkarsa, denenen her port ve hızı görmek için **Denenenleri göster** seçeneğini açın.

## Kontrol 3: Bozuk veri

**Readable flight controller data** satırı bir yüzdeyi *damaged* olarak gösteriyorsa, bayt gelmekte ama bozulmuş durumdadır. Bu genellikle gevşek veya uzun bir kablo, eksik toprak kablosu ya da motor ve güç kablolarından gelen gürültü anlamına gelir.

- Konektörleri yeniden takın ve kabloyu kısaltın.
- Sinyal kablolarını ESC ve batarya kablolarından uzak tutun.
- Daha düşük bir `SERIALx_BAUD` değeri deneyin, örneğin 57600 veya 115200.

## Kontrol 4: Port kullanımda

**Port** listesi, başka bir programın tuttuğu portları işaretler (*in use by …*). Bu programı durdurun (örneğin kendi başlattığınız bir MAVProxy veya ikinci bir yönlendirici) ya da başka bir port seçin.

## Kontrol 5: Bağlantı açık mı?

Sayfanın üstünde **Link enabled** açık olmalıdır. Durum **Link stopped** diyorsa **Bağlan** düğmesine basın. Ayarlar yeniden başlatma gerektirmeden hemen uygulanır.

## Hâlâ heartbeat yok mu?

**Mavlink Yöneticisi** seçiliyken [günlükleri indirin](https://docs.uavmatrix.com/tr/troubleshooting/collect-logs/). İçerdiği `diagnostics.txt` dosyası seri aygıtları, bunları hangi programın tuttuğunu ve çekirdekten gelen USB ve güç olaylarını listeler. Bağlantı sorunları için destek ekibinin ihtiyaç duyduğu bilgi budur.

Uçuş kontrolcüsü **Connected** gösterdikten sonra yer kontrol istasyonunuz hâlâ bekliyorsa, [yer kontrol istasyonunda telemetri yok](https://docs.uavmatrix.com/tr/troubleshooting/no-telemetry-in-gcs/) sayfasına gidin.

İlgili: [Uçuş kontrolcüsü bağlantısı](https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/) · [Donanım gereksinimleri](https://docs.uavmatrix.com/tr/get-started/hardware-requirements/)

Source: https://docs.uavmatrix.com/tr/troubleshooting/no-mavlink-heartbeat/
