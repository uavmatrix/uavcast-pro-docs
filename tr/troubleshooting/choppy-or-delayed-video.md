# 4G üzerinden takılan, gecikmeli veya gri video

> UAVcast-Pro videosundaki takılmaları, gri lekeleri ve gecikmeleri; bit hızını, çözünürlüğü, FPS değerini ve Akış Kurtarma Hızını bağlantıya göre ayarlayarak düzeltin.

Görüntü gelir, ancak takılır, donar, ekranda gri bloklar bırakır veya saniyeler geriden gelir. Neredeyse her zaman akış, bağlantının taşıyabileceğinden fazlasını ister ya da kodlayıcı anahtar kareleri (keyframe) çok seyrek gönderir; bu da kayıp paketlerden kurtulmayı zorlaştırır.

| Ne görürsünüz | Olası neden | Başlangıç |
| --- | --- | --- |
| Yaklaşık bir veya iki saniye sonra kaybolan gri veya yeşil lekeler | Paketler kayboldu ve kurtarma için yeterli anahtar kare yok | [Kontrol 2](https://docs.uavmatrix.com/tr/troubleshooting/choppy-or-delayed-video/#check-2) |
| Wi-Fi üzerinde akıcı, LTE üzerinde takılıyor veya donuyor | Bit hızı, hücresel yukarı bağlantının taşıyabileceğinden yüksek | [Kontrol 1](https://docs.uavmatrix.com/tr/troubleshooting/choppy-or-delayed-video/#check-1) |
| Yerel ağda bile takılıyor | Drone üzerindeki CPU sınırı veya GCS görüntüyü yeterince hızlı çözemiyor | [Kontrol 3](https://docs.uavmatrix.com/tr/troubleshooting/choppy-or-delayed-video/#check-3) |
| Video drone’un saniyeler gerisinde | Tarayıcı önizlemesine bakıyorsunuz veya GCS arabelleğe alıyor | [Kontrol 4](https://docs.uavmatrix.com/tr/troubleshooting/choppy-or-delayed-video/#check-4) |

## Kontrol 1: Bit hızını ve çözünürlüğü düşürün

Hücresel yukarı bağlantı, indirme hızından çok daha yavaştır ve drone hücreler arasında hareket ettikçe değişir. Düşük değerlerle başlayın ve kademeli olarak artırın.

1. **Kamera → Kamera ayarları** sayfasına gidin.
2. **Çözünürlük** değerini 1280×720 veya daha düşük ayarlayın.
3. **FPS Seç** değerini 15 veya 20 olarak ayarlayın.
4. **Bit Hızı:** kaydırıcısını yaklaşık 1000–1500 kbps'ye getirin. `0` otomatik anlamına gelir.
5. Ayarlar değiştirdikçe kaydedilir ve kamera bunları uygular.
6. İlgilendiğiniz rotada uçun veya sürün. Sonuç kabul edilebilirse, her seferinde bir değeri artırın.

![Çözünürlük, FPS Seç, Bit Hızı ve Akış Kurtarma Hızı içeren Kamera Ayarları kartı](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/camera--settings.webp)

*Kamera → Kamera Ayarları: Çözünürlük, FPS Seç, Bit Hızı ve Akış Kurtarma Hızı, bağlantıya göre ayarlanması gereken değerlerdir.*

> **Bağlantı ne kadar veri taşıyor?**
>
> **Kontrol Paneli → Ağ Trafiği** bölümünde arayüz başına anlık TX hızı görünür. Ayarladığınız bit hızından bağımsız olarak modem arayüzü hep aynı tavanda duruyorsa, o tavan sizin yukarı bağlantınızdır.

## Kontrol 2: Daha hızlı bir Akış Kurtarma Hızı ayarlayın

Gri kaplamalar kayıp paketlerden kaynaklanır. Kod çözücü, resmi yalnızca bir sonraki anahtar karede onarabilir. **Akış Kurtarma Hızı**, anahtar karelerin ne sıklıkla gönderileceğini belirler.

1. **Kamera → Kamera ayarları** bölümünde **Akış Kurtarma Hızı** değerini bulun.
2. Kaydırıcıyı **Otomatik** konumundan **Ultra Hızlı** yönüne getirin: anahtar kareler arasındaki kare sayısı azaldıkça resim daha hızlı onarılır, ancak daha fazla bant genişliği kullanılır. **Bant Genişliği Tasarrufu** yönüne getirirseniz bant genişliği tasarruf edilir ancak kurtarma yavaşlar. Kaydırıcının altındaki ipucu (örneğin *VPN/WiFi Dostu*) her konumun hangi kullanım için uygun olduğunu gösterir.
3. Kaydedin ve karşılaştırın. Bağlantı çok yavaşsa, hızlı kurtarma hızını daha düşük bir bit hızıyla birleştirin (kontrol 1).

**Otomatik** modunda UAVcast-Pro saniyede bir anahtar kare gönderir (FPS değeri her *FPS* kare için bir, FPS otomatik ise her 30 karede bir).

## Kontrol 3: CPU yüküne bakın

UAVcast-Pro H.264'ü yazılımla kodlar. Raspberry Pi Zero 2 W üzerinde veya iki kamera aynı anda yayın yaptığında CPU kapasitesi tükenebilir.

1. **Kamera → Kamera ayarları** sayfasını açın ve **Sistem yükü** kartına bakın.
2. Kartta **CPU is near its limit. Lower the resolution or bitrate.** yazıyorsa tam olarak bunu yapın.
3. **Çift akış** açıksa, bir akışın çözünürlüğünü veya bit hızını düşürün ya da ikinci akışı kapatın.
4. **Kontrol Paneli** bölümünde **Power supply** altında **Slowed down (heat or power)** yazıp yazmadığına bakın. Kısılmış bir CPU daha yavaş kodlar. Bkz. [Düşük gerilim ve kısıtlama](https://docs.uavmatrix.com/tr/troubleshooting/undervoltage-and-throttling/).

## Kontrol 4: Hangi akışı izlediğinizi bilin

Tarayıcıdaki **Canlı Önizleme** ve **Uçuş Haritası** üzerindeki video penceresi, yerleşik medya sunucusu üzerinden geçer; bu da gecikme ekler. Bu görünümler kurulum içindir, uçuş için değildir. Yer kontrol istasyonunuza giden akış doğrudan UDP üzerinden gider ve çok daha düşük gecikmeye sahiptir.

Yer kontrol istasyonunun kendisi geriden geliyorsa:

- QGroundControl'de video ayarlarında düşük gecikme modunun açık olduğunu kontrol edin.
- GStreamer pipeline'larında video sink üzerinde `sync=false` kullanın; bkz. [test komutu](https://docs.uavmatrix.com/tr/troubleshooting/no-video-in-gcs/#check-5).
- VPN üzerinden, ZeroTier veya Tailscale'in drone'a doğrudan ulaştığından, bir röleden geçmediğinden emin olun. Tailscale, **Sanal Özel Ağ** sayfasında **Röle** altında kullanılan röleyi gösterir.

## Kontrol 5: Hücresel sinyali kontrol edin

**Modem** sayfasına gidin ve **Modem Bilgileri** altındaki **Sinyal Kalitesi** ve **Teknoloji** değerlerine bakın. Zayıf bir sinyal veya LTE'den 3G'ye düşme yukarı bağlantıyı keser. Modemi uçuş kontrolcüsünden, ESC'lerden ve güç kablolarından uzak tutun veya harici antenli bir modem kullanın.

## Hâlâ takılıyor mu?

**Kamera Sunucusu** seçili ve son 30 dakikayla [günlükleri indirin](https://docs.uavmatrix.com/tr/troubleshooting/collect-logs/); ardından kamera modelinizi, çözünürlüğü, FPS değerini, bit hızını ve uçtuğunuz bağlantı türünü ekleyerek **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresine gönderin.

İlgili: [Kamera ayarları](https://docs.uavmatrix.com/tr/uavcast-pro/camera/) · [Hücresel modem](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/cellular-modem/)

Source: https://docs.uavmatrix.com/tr/troubleshooting/choppy-or-delayed-video/
