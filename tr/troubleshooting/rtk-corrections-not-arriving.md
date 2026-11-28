# RTK düzeltmeleri ulaşmıyor

> NTRIP Connecting durumunda takılı, RTCM iletilmiyor veya RTK Fixed yok mu? Caster ana bilgisayarını, portu, mountpoint'i, kimlik bilgilerini, GGA upstream'i ve GPS alıcısını kontrol edin.

**Uçuş Kontrolcüsü → NTRIP / RTK** altında durum **Streaming corrections** durumuna ulaşmıyor, **RTCM messages forwarded** sayacı sıfırda kalıyor veya düzeltmeler geliyor ama uçuş kontrolcüsü **3D fix** veya **RTK Float** aşamasını geçemiyor.

Zincirin dört halkası vardır: internet → caster → UAVcast-Pro → uçuş kontrolcüsü → GPS alıcısı. İlk kopan halkayı bulun.

![Durum paneli, sayaçlar ve caster yanıt satırı içeren NTRIP / RTK sekmesi ile GPS kalitesi kartı](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/flight-controller--ntrip.webp)

*Uçuş Kontrolcüsü → NTRIP / RTK, caster yapılandırılmamış bir ünitede: durum Disabled, sayaçlar sıfırda ve Caster response boş. Sağlıklı durum: Streaming corrections, 200 caster yanıtı ve artan sayaçlar.*

| Ne görürsünüz | Olası neden | Başlangıç |
| --- | --- | --- |
| Durum Connecting veya Error, caster yanıtı yok | Yanlış ana bilgisayar veya port, TLS uyuşmazlığı veya internet yok | [Kontrol 1](https://docs.uavmatrix.com/tr/troubleshooting/rtk-corrections-not-arriving/#check-1) |
| Caster yanıtı 401 Unauthorized | Yanlış kullanıcı adı, şifre veya mountpoint | [Kontrol 2](https://docs.uavmatrix.com/tr/troubleshooting/rtk-corrections-not-arriving/#check-2) |
| Günlükte caster sourcetable döndürdü yazıyor | Mountpoint adı yanlış | [Kontrol 2](https://docs.uavmatrix.com/tr/troubleshooting/rtk-corrections-not-arriving/#check-2) |
| Bağlı, ama RTCM verisi yok, her birkaç saniyede bir yeniden bağlanıyor | Caster önce bir GGA konumu istiyor | [Kontrol 3](https://docs.uavmatrix.com/tr/troubleshooting/rtk-corrections-not-arriving/#check-3) |
| RTCM iletiliyor, konum hâlâ 3D fix | Uçuş kontrolcüsü bağlantısı kopuk veya alıcı RTK destekli değil | [Kontrol 4](https://docs.uavmatrix.com/tr/troubleshooting/rtk-corrections-not-arriving/#check-4) |
| RTK Float, hiç RTK Fixed olmuyor | Gökyüzü görüşü, baz istasyonuna uzaklık veya zaman | [Kontrol 5](https://docs.uavmatrix.com/tr/troubleshooting/rtk-corrections-not-arriving/#check-5) |

## Kontrol 1: Caster'a ulaşın

1. **Caster host** ve **Port** alanlarını kontrol edin. Çoğu genel caster, `2101` portunda düz TCP kullanır.
2. **Use TLS (HTTPS)** ayarı caster ile eşleşmelidir. Ticari casterlar (Trimble, Hexagon, Topcon ve diğerleri) genellikle TLS ister; çoğunlukla yine 2101 portunda, bazen 2102 veya 443 portunda. Genel casterlar normalde TLS kullanmaz.
3. Drone'un internete bağlı olduğundan emin olun. **Dashboard → Cellular** bağlı olmalıdır. Değilse, [modem bağlı, internet yok](https://docs.uavmatrix.com/tr/troubleshooting/modem-no-internet/) sayfasına bakın.
4. Bazı hücresel paketler alışılmadık giden portları engeller. Caster 443 portunu sunuyorsa onu deneyin.

## Kontrol 2: Kimlik bilgileri ve mountpoint

1. **Test connection** düğmesine basın. **Caster accepted the credentials.** mesajı, kullanıcı adı ve şifrenin doğru olduğu anlamına gelir.
2. rtk2go.com için **Username** alanına gerçek bir e-posta adresi yazın ve **Password** alanını boş bırakın.
3. Adını yazmak yerine **Browse mountpoints** düğmesine basın ve listeden bir mountpoint seçin. Uçtuğunuz yere yakın olanı tercih edin.

Caster, veri yerine sourcetable yanıtı verirse, NTRIP günlüğü *caster returned sourcetable — check mountpoint* yazar. Bu durumda mountpoint adı yanlıştır ya da artık mevcut değildir.

## Kontrol 3: GGA upstream gönderin

VRS ve en yakın mountpoint casterları, yalnızca nerede olduğunuzu öğrendikten sonra düzeltme gönderir. Mountpoint tarayıcısındaki **NMEA** sütunu bu mountpoint'ler için **Required** yazar.

1. **Send GGA upstream** seçeneğini açın (varsayılan olarak açıktır). **Send interval (seconds)** varsayılanı 10'dur.
2. **Position source**: uçuşta **Live position from flight controller** doğru seçimdir. Uçuş kontrolcüsü bir GPS kilidi bildirene kadar UAVcast-Pro **Fixed manual position** kullanır; bu yüzden tezgâh testleri için size yakın bir enlem ve boylam girin.
3. **Last GGA sent** değerinin güncellendiğini izleyin.

UAVcast-Pro, caster sessiz kaldığında kendi kendine yeniden bağlanır ve günlükte *no data from caster for …s — reconnecting* satırı görünür. Kısa bir internet kesintisinden sonra düzeltmeler birkaç saniye içinde devam eder.

## Kontrol 4: UAVcast-Pro'dan alıcıya

Düzeltmeler, GPS'e uçuş kontrolcüsü bağlantısı üzerinden MAVLink `GPS_RTCM_DATA` olarak ulaşır.

1. Uçuş kontrolcüsü, **Uçuş Kontrolcüsü → Bağlantı** sayfasında **Connected** olmalıdır. Değilse, [MAVLink heartbeat yok](https://docs.uavmatrix.com/tr/troubleshooting/no-mavlink-heartbeat/) sayfasına bakın.
2. **GPS quality** kartına bakın. **No RTK status from receiver** yazıyorsa, uçuş kontrolcüsü hiç RTK durumu bildirmemiştir. Bağlı GPS genellikle RTK destekli değildir: RTK, u-blox F9P, Here3+ veya Septentrio Mosaic gibi bir taşıyıcı faz RTK alıcısı gerektirir. Standart bir M8N veya M10 navigasyon modülü RTK yapamaz.
3. **Recent message types** listesinde, alıcınızın kullandığı uydu sistemlerinin (örneğin 1077 GPS, 1087 GLONASS, 1097 Galileo, 1127 BeiDou) ve bir baz konumu mesajının (1005 veya 1006) bulunması gerekir.

## Kontrol 5: Float var ama hiç Fixed olmuyor

- Antene açık gökyüzü verin. Ağaçlar, binalar ve drone'un kendi elektroniği çok yollu yayılım ve gürültüye neden olur.
- Bekleyin. Soğuk başlatma, iyi koşullarda bile bir iki dakika sürebilir.
- Daha yakın bir baz seçin. Doğruluk ve sabitleme olasılığı, baz istasyonuna uzaklıkla düşer.
- **GPS quality** içindeki **Last correction** birkaç saniyede kalmalıdır. Artıyorsa, düzeltmeler bağlantıda kaybediliyor demektir.

## Hâlâ çalışmıyor mu?

**NTRIP İstemcisi** seçiliyken [günlükleri indirin](https://docs.uavmatrix.com/tr/troubleshooting/collect-logs/) ve caster sağlayıcınızı ile GPS modelinizi belirterek **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresine gönderin. Tam kurulum için [NTRIP casterı ile RTK kurulumu](https://docs.uavmatrix.com/tr/guides/rtk-ntrip-caster/) sayfasına bakın.

İlgili: [NTRIP / RTK ayarları](https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/ntrip-rtk/)

Source: https://docs.uavmatrix.com/tr/troubleshooting/rtk-corrections-not-arriving/
