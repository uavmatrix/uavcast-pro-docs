# Uçuşları kaydedin ve inceleyin

> Arm edildiğinde kamera videosunu ve telemetriyi drone üzerinde otomatik kaydedin, USB veya SSD'ye yazın; videoyu, haritayı ve uçuş verisini tek bir zaman çizelgesinde oynatın.

v6.5.1 sürümünden itibaren UAVcast-Pro, kaydı drone'un üzerinde yapar: kamera videosu ve telemetri günlüğü; **Uçuş Haritası** üzerinde tek tıklamayla ya da her arm işleminde otomatik olarak. Kayıt, zaten kodlanmış olan akışı yeniden kullanır; bu nedenle ek CPU harcamaz ve yer kontrol istasyonuna giden canlı videoyu hiçbir zaman kesmez. Ardından uçuş incelemesi oynatıcısı, videoyu, harita izini, kokpit görünümünü ve uçuş verisini tek bir zaman çizelgesinde gösterir.

## 1. Kayıtların nereye gideceğini seçin

1. Oraya kaydetmek istiyorsanız bir USB sürücü veya SSD takın. Kayıtlar depolama alanını hızla doldurur; USB SSD, SD karttan daha dayanıklıdır.
2. **Kamera → Kayıtlar** bölümünü ve **Ayarlar** sekmesini açın.
3. **Depolama konumu** altında diski veya **Dahili depolama** seçeneğini seçin. Sürücü sayfa açıldıktan sonra takıldıysa **Diskleri yeniden ara** düğmesine basın. **Ya da başka bir klasör** seçeneği bir yol girmenizi sağlar; **Bu klasörü kullan** ile onaylayın.
4. **Boş bırakılacak alan** değerini ayarlayın (varsayılan 2 GB). Kayıt, diski bu değerin ötesinde hiçbir zaman doldurmaz.

![Depolama konumu, boş bırakılacak alan, alan azaldığında en eski kayıtları silme, kayıtları eski tarihlerine göre silme ve arm edildiğinde otomatik kaydetme seçeneklerini içeren Kayıtlar Ayarları sekmesi](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/camera--recordings-settings.webp)

*Kamera → Kayıtlar → Ayarlar; Dahili depolama seçili ve Arm edildiğinde otomatik kaydet açık.*

## 2. Ne zaman kaydedileceğine karar verin

| Ayar | Varsayılan | Ne yapar |
| --- | --- | --- |
| **Arm edildiğinde otomatik kaydet** | Açık | Motorlar arm edildiğinde başlar, disarm edildiğinde durur. Uçuş sırasında bağlantı koparsa kayıt devam eder. |
| **Kamera 1'i kaydet** / **Kamera 2'yi kaydet** | Açık | Kamera 2 yalnızca çift akış açıkken kaydeder. |
| **Alan azaldığında en eski kayıtları sil** | Açık | Bir araç kamerası gibi çalışır: alan yetersizliği nedeniyle kayıt hiçbir zaman durmaz. Kapalıyken bunun yerine kayıt durur. |
| **Şundan eski kayıtları sil** | 0 gün | 0, kayıtları alan gerekene kadar tutar. |
| **Dosya uzunluğu** | 1 dk | Kayıtlar 1–30 dakikalık parçalar halinde kaydedilir. Kısa parçalar, elektrik kesintisinden sonra daha az veri kaybettirir. |
| **Telemetriyi kaydet** | **Arm edildiğinde** | **Bağlıyken her zaman** yerde de kayıt yapar; her arm, disarm ve saatte yeni bir dosya başlatır. **Kapalı** yalnızca videoyu kaydeder. |

## 3. Elle kaydedin

**Uçuş Haritası** üzerindeki **Kayıt** düğmeleri her kamerayı ve telemetri günlüğünü başlatır ve durdurur (**Kamera 1'i kaydet**, **Stop recording camera 1**). Salt okunur kullanıcılar izleyebilir ancak kayıt başlatamaz.

## 4. Bir uçuşu bulun

**Kamera → Kayıtlar → Kitaplık** bölümünü açın. Her uçuş, videosu, küçük resmi ve telemetrisiyle listelenir. Devam eden bir kayıt **Rec** rozeti gösterir.

![Depolama çubuğu ve her biri CAM 1 ile Telemetri rozetleri ve bir Oynat düğmesi bulunan iki kayıtlı uçuş içeren Kayıt kitaplığı](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/camera--recordings.webp)

*Kamera → Kayıtlar → Kitaplık; her biri kamera videosu ve telemetri içeren iki kayıtlı uçuş.*

Kitaplıkta şunları yapabilirsiniz:

- **Oynat** ile uçuşu uçuş incelemesi oynatıcısında oynatın,
- **İndir** ile video kliplerini MP4 olarak indirin,
- **Sil** ile bir kaydı silin: **Yalnızca videoyu sil** ya da **Videoyu ve telemetriyi sil**.

## 5. Uçuşu inceleyin

Uçuş incelemesi oynatıcısı; videoyu harita izi, kokpit görünümü ve uçuş verisiyle (**İrtifa**, **Hız**, **Batarya**, **Uydular**, **Mod**) birlikte tek bir zaman çizelgesinde oynatır.

![Video alanı, harita, kokpit görünümü ve oynatma denetimleri içeren bir zaman çizelgesi bulunan uçuş incelemesi oynatıcısı](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/camera--flight-review.webp)

*Uçuş incelemesi oynatıcısı: video, harita ve kokpit görünümü tek bir zaman çizelgesinin üzerinde.*

- Zaman çizelgesi arm, disarm ve uçuş modu değişikliklerini işaretler; böylece önemli ana doğrudan atlayabilirsiniz.
- **Back 10 seconds** ve **Forward 10 seconds** düğmelerini ve 0,5×–4× arasında **Oynatma hızı**'nı kullanın.
- İki kamerada **Video düzenini değiştir** seçeneği **Resim içinde resim** ve **Yan yana** arasında geçiş yapar; **Show this camera large** ise ikisini yer değiştirir.
- Bir kayıtta telemetri yoksa oynatıcı şu mesajı gösterir: *No telemetry log for this recording. Telemetry is logged while the drone is armed.*

## Bilmeniz faydalı

- Kayıtlar drone üzerinde saklanır. **Alan azaldığında en eski kayıtları sil** seçeneği bunları silmeden önce, saklamak istediklerinizi indirin.
- Kontrol panelindeki **Depolama** kartı ve **Kayıt depolama alanı** özeti boş alanı gösterir.
- **Canlı Önizleme Etkinleştirilsin mi?** kapalıyken de kayıt devam eder.
- Kayıt servisi yanıt vermeyi keserse sayfa şunu söyler: *The recording service is not responding.* **Kamera → Kamera ayarları** bölümünden kamera servisini yeniden başlatın ve sorun tekrarlarsa [günlükleri toplayın](https://docs.uavmatrix.com/tr/troubleshooting/collect-logs/).

Source: https://docs.uavmatrix.com/tr/guides/recording-flight-review/
