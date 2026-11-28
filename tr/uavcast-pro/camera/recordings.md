# Kayıtlar ve uçuş incelemesi

> UAVcast-Pro ile drone kamera videosunu ve MAVLink telemetrisini arm edildiğinde otomatik olarak SD karta veya USB SSD'ye kaydedin; uçuşları video, harita ve verilerle inceleyin.

UAVcast-Pro her uçuşu drone'un kendisinde kaydeder: kamera videosunu ve bir MAVLink telemetri günlüğünü (`.tlog`). Kayıt, zaten kodlanmış akışı kullandığı için ek CPU harcamaz ve yer kontrol istasyonunuza giden canlı videoyu asla kesmez. Dosyalar drone üzerinde yazıldığı için, hücresel bağlantı koptuğunda bile tam kaliteli video elde edersiniz. Kayıtlar arm edildiğinizde otomatik olarak başlar veya Uçuş Haritasından elle başlatılabilir. v6.5.1 veya üzeri gerekir.

**Kamera → Kayıtlar** sayfasını açın. İki sekmesi vardır: **Kitaplık** ve **Ayarlar**.

![Depolama çubuğu ve süreleriyle CAM 1 ile Telemetri rozetleri olan iki kayıtlı uçuşu gösteren kayıt kitaplığı](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/camera--recordings.webp)

*Kamera → Kayıtlar → Kitaplık, iki kayıtlı uçuşla.*

## Arm edildiğinde otomatik kaydetme

Bu seçenek varsayılan olarak açıktır. Kayıt, motorlar arm edildiğinde başlar ve disarm edildiğinde durur. Uçuş sırasında bağlantı koparsa kayıt devam eder.

Buna güvenmeden önce:

- Uçuş Haritasında veya **Ayarlar** bölümünde **Kayıt depolama alanı** içindeki boş alanı kontrol edin.
- Kayıt, **Canlı Önizleme Etkinleştirilsin mi?** seçeneğini gerektirmez. Kayıt açıkken kamera, önizleme kapalı olsa bile yerleşik medya sunucusunda akışın bir kopyasını tutar.

## Elle kaydetme

Uçuş Haritasının üst çubuğunda bir **Kayıt** grubu bulunur: video başlatmak ve durdurmak için **CAM 1** (çift akışta **CAM 2** de) ve telemetri günlüğünü başlatmak ve durdurmak için **Telemetri**. Kırmızı nokta neyin kaydedildiğini gösterir. Salt okunur kullanıcılar kayıt başlatamaz.

## Depolama ayarları

**Kamera → Kayıtlar → Ayarlar** sayfasını açın.

| Ayar | Varsayılan | Değerler | Notlar |
| --- | --- | --- | --- |
| **Depolama konumu** | **Dahili depolama** | Dahili depolama, algılanan bir USB sürücü veya SSD, **Ya da başka bir klasör** | Bir disk takın ve görmek için **Diskleri yeniden ara** seçeneğini seçin. Dahili depolama `/opt/uavcast-pro/recordings/video` dizinidir. |
| **Boş bırakılacak alan** | `2` GB | 0.5–1000 GB | Kayıt, diski bu sınırın ötesinde asla doldurmaz. Sistemin de alana ihtiyacı vardır. |
| **Alan azaldığında en eski kayıtları sil** | Açık | Açık, kapalı | Bir araç kamerası gibi çalışır: alan yetersizliği nedeniyle kayıt asla durmaz. Kapalıysa bunun yerine kayıt durur. |
| **Şundan eski kayıtları sil** | `0` gün | 0–3650 gün | `0`, alan gerekene kadar kayıtları tutar. |
| **Arm edildiğinde otomatik kaydet** | Açık | Açık, kapalı |  |
| **Kamera 1'i kaydet** | Açık | Açık, kapalı | Otomatik kayıt için geçerlidir. |
| **Kamera 2'yi kaydet** | Açık | Açık, kapalı | Yalnızca çift akış açıkken. |
| **Dosya uzunluğu** | `1` dk | 1–30 dk | Video bu uzunlukta parçalar halinde kaydedilir. Daha kısa parçalar elektrik kesintisinde daha az kayıp verir. |
| **Telemetriyi kaydet** | **Arm edildiğinde** | **Arm edildiğinde**, **Bağlıyken her zaman**, **Kapalı** | Videonun yanında gösterilen `.tlog`. **Bağlıyken her zaman** yer kontrol istasyonundayken de kaydeder ve her arm, disarm ve saatte yeni bir dosya başlatır. |

![Dahili depolama seçili, 2 GB boş bırakılacak alan, en eski kayıtları sil ve arm edildiğinde otomatik kaydet açık kayıt ayarları](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/camera--recordings-settings.webp)

*Dahili depolama seçili; arm edildiğinde otomatik kayıt açık.*

> **USB SSD'ye kaydedin**
>
> Sürekli video için USB 3 SSD, microSD karttan çok daha hızlı ve dayanıklıdır. Takın, **Diskleri yeniden ara** seçeneğini seçin, ardından **Depolama konumu** altında onu seçin.

## Dosyalar ve biçimler

- Video, parçalı MP4 segmentleri olarak yazılır; uçuş sırasında elektrik kesilse bile oynatılabilir kalır. İndirmeler MP4 biçimindedir.
- Telemetri, standart bir MAVLink `.tlog` dosyasıdır; Mission Planner, MAVExplorer, UAV Log Viewer ve [Uçuş Analizi](https://docs.uavmatrix.com/tr/uavcast-pro/flight-map/flight-analytics/) ile okunabilir.
- Kitaplıktaki bir kayıt, dosyaları 15 saniyeden uzun bir boşluk olmadan birbirini izliyorsa tek bir kliptir.

## Uçuşu inceleme

Bir kayıtta **Oynat** seçeneğini seçerek **Uçuş incelemesi**'ni açın: video, harita izi, kokpit görünümü ve uçuş verileri tek bir zaman çizelgesinde yer alır.

- Zaman çizelgesi **Arm edildi**, **Disarm edildi** ve uçuş modu değişikliklerini işaretler.
- **10 saniye geri**, **Oynat/Duraklat**, **10 saniye ileri** ve **Oynatma hızı** (0,5× ile 4× arası) kontrolleri bulunur.
- İki kamerayla **Video düzenini değiştir** seçeneği **Resim içinde resim** ve **Yan yana** arasında geçiş yapar; **Bu kamerayı büyük göster** ikisinin yerini değiştirir.
- Veri paneli, geçerli andaki **İrtifa**, **Hız**, **Batarya**, **Uydular** ve **Mod** değerlerini gösterir.
- **İndir** klibi MP4 olarak kaydeder.

![Video alanı, harita izi, kokpit görünümü ve oynatma kontrollerine sahip zaman çizelgesi olan uçuş incelemesi oynatıcısı](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/camera--flight-review.webp)

*Uçuş incelemesi: video, harita, kokpit ve telemetri tek bir zaman çizelgesinde.*

Oynatıcı *Bu kayıt için telemetri günlüğü yok* diyorsa, telemetri o sırada kaydedilmiyordu (varsayılan olarak yalnızca arm edildiğinde günlük tutar).

## Kayıtları silme

Bir kayıtta **Sil** seçeneğini seçin. Telemetri günlüğü varsa **Yalnızca videoyu sil** veya **Videoyu ve telemetriyi sil** seçeneğini seçersiniz. Silme işlemi kalıcıdır. Hâlâ çalışan bir kayıt önce durdurulmalıdır.

Source: https://docs.uavmatrix.com/tr/uavcast-pro/camera/recordings/
