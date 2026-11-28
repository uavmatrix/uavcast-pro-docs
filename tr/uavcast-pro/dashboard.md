# Kontrol Paneli

> UAVcast-Pro kontrol panelinden uçuş kontrolcüsünü, GPS'i, bataryayı, yer kontrol istasyonu bağlantısını, hücresel modemi, VPN'i, RTK'yı, videoyu ve Raspberry Pi'nin gücünü, sıcaklığını ve kısılmasını kontrol edin.

Kontrol paneli, eşlik eden bilgisayar için uçuş öncesi kontrol listesidir. Tek bir durum kartı, uçuş kontrolcüsünün, GPS'in, bataryanın, yer kontrol istasyonu bağlantısının, modemin, VPN'in, RTK'nın, videonun ve güç kaynağının sağlıklı olup olmadığını gösterir; *Tüm sistemler normal* veya *2 sorun* gibi bir özet de verir. Kartın altında sistem bilgisi, ağ trafiği, bellek ve depolama yer alır. Kenar çubuğunda **Kontrol Paneli** bölümünü açın.

![Durum kartında 2 sorun gösteren UAVcast-Pro kontrol paneli, sıcaklık bilgisi içeren sistem bilgisi ve ağ trafiği grafiği](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/dashboard.webp)

*Tezgâh üstü bir ünitede kontrol paneli: iki sorun (GPS kilidi yok, VPN bağlı değil), sistem bilgisi ve ağ trafiği.*

## Durum kartı

Kart üç gruptan oluşur. Her satırda renkli bir nokta bulunur: yeşil iyi, sarı uyarı, kırmızı sorun anlamına gelir.

| Satır | Örnek değerler | Yeşil değilse ne yapmalısınız |
| --- | --- | --- |
| **Uçuş Kontrolcüsü** | *Arm edildi*, *Disarm edildi*, *Bağlantı durdu*, *Bağlanıyor…* | Bkz. [Uçuş kontrolcüsü](https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/). |
| **GPS** | *3D konum · 14 uydu*, *RTK sabit*, *Konum yok*, *GPS yok* | Açık havada konum kilidini bekleyin veya GPS kablolamasını kontrol edin. |
| **Batarya** | gerilim ve yüzde | Şarj edin veya uçuş kontrolcüsünün batarya izleme ayarını kontrol edin. |
| **Yer kontrol istasyonu** | *2 adrese gönderiliyor · saniyede 16 paket*, *Gönderilmiyor*, *1 ayarlandı · uçuş kontrolcüsü bekleniyor*, *Ayarlanmadı* | Bkz. [Yer kontrol istasyonları](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/). |
| **Hücresel** | operatör ve sinyal, *Modem algılanmadı* | Bkz. [Hücresel modem](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/cellular-modem/). |
| **VPN** | *Bağlı*, *Bağlı değil*, *Kapalı* | Bkz. [VPN](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/vpn/). |
| **RTK düzeltmeleri** | *Bağlanıyor…*, *Hata - ayarları kontrol edin*, *Kapalı* | Bkz. [NTRIP / RTK](https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/ntrip-rtk/). |
| **Video** | *Çalışıyor*, *Durduruldu*, *Kapalı* | Bkz. [Kamera](https://docs.uavmatrix.com/tr/uavcast-pro/camera/). |
| **Dinamik DNS** | *Çalışıyor*, *Kapalı* | Bkz. [Dinamik DNS](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/dynamic-dns/). |
| **Güç kaynağı** | *Kararlı*, *Gerilim çok düşük - daha güçlü bir güç kaynağı kullanın*, *Yavaşladı (ısı veya güç)*, *Başlatmadan bu yana gerilim düştü* | Bkz. [Güç](https://docs.uavmatrix.com/tr/uavcast-pro/dashboard/#power-and-temperature). |

Herhangi bir satırda görünen *Servis başarısız - yeniden başlatılıyor* ifadesi, servisin çöktüğü ve otomatik olarak yeniden başlatıldığı anlamına gelir. Bu ifade kalmaya devam ederse **Uygulama → Günlük Kaydı** bölümünden günlükleri indirin.

## Güç ve sıcaklık

Raspberry Pi'de **Sistem Bilgisi**, **Güç**, **CPU kısıtlaması** ve **Sıcaklık** değerlerini gösterir:

- **Gerilim çok düşük - daha güçlü bir güç kaynağı kullanın**: Pi şu anda düşük gerilimde çalışıyor. Bu durum USB sıfırlamalarına neden olur; bu nedenle modem veya uçuş kontrolcüsü bağlantıyı kaybedebilir. Uçuştan önce güç kaynağını düzeltin.
- **Başlatmadan bu yana gerilim düştü**: Açılıştan bu yana bir noktada oluştu. Çoğu zaman modemin iletim tepe değerlerinden kaynaklanır.
- **Yavaşladı (ısı veya güç)**: CPU kısıtlanmış. Video kodlaması ilk etkilenen olur. Bir soğutucu veya hava akışı ekleyin ya da güç kaynağını düzeltin.

Sıcaklık çubuğu, Pi kısıtlama noktasına yaklaştıkça kırmızıya döner.

## Diğer kartlar

| Kart | Gösterdiği |
| --- | --- |
| **Sistem Bilgisi** | **İşletim Sistemi**, **Donanım** (CPU ve çekirdekler), **Çalışma Süresi**, güç ve **Sıcaklık**. |
| **Ağ Trafiği** | Arayüz başına alınan ve iletilen toplamlar ile hızlar. **Son 50** ile **Son 1000** örnek arasında seçim yapabilirsiniz. Videonun modemde ne kadar veri kullandığını görmek için kullanışlıdır. |
| **Bellek Kullanımı** | **Toplam**, **Kullanılan** ve **Boş**. Veriler 10 saniyede bir toplanır. |
| **Depolama** | Bölüm başına **Toplam**, **Kullanılan** ve **Boş**. |

Grafiklerin bir şey gösterebilmesi için açılıştan sonra birkaç dakikalık veriye ihtiyaç vardır.

## Kılavuzlu tur

Web arayüzünü ilk açtığınızda bir tur, ana sayfalarda sizi gezdirmeyi teklif eder. **Turu Atla** seçeneğini seçebilir veya **Bir Daha Gösterme** seçeneğini işaretleyebilirsiniz. Turu tekrar başlatmak için **Uygulama → Ayarlar → Tur At** yolunu izleyin.

Güç sorunlarının ayrıntıları için bkz. [Düşük gerilim ve kısıtlama](https://docs.uavmatrix.com/tr/troubleshooting/undervoltage-and-throttling/).

Source: https://docs.uavmatrix.com/tr/uavcast-pro/dashboard/
