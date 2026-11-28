# Sık sorulan sorular

> UAVcast-Pro donanımı, LTE modemler, yer kontrol istasyonları, portlar, çevrimdışı kullanım, lisanslama, güncellemeler, kayıt ve Fleet Manager eşleştirmesi hakkında kısa yanıtlar.

## Donanım ve kurulum

### LTE modeme ihtiyacım var mı?

Hayır. UAVcast-Pro, 4G/LTE, Wi-Fi veya Ethernet gibi herhangi bir IP bağlantısı üzerinden çalışır. Modem, Wi-Fi menzilinin dışına uçmanızı sağlayan şeydir. Birçok operatör Wi-Fi üzerinde test eder ve uçuştan önce modeme geçer: **Ağlar → Ağ Önceliği → Modem Önceliği (Dış Mekan Modu)**.

### UAVcast-Pro hangi bilgisayarlarda çalışabilir?

arm64 veya amd64 mimarisinde, Raspberry Pi OS, Debian veya Ubuntu çalıştıran herhangi bir 64 bit Linux kart veya PC: Raspberry Pi Zero 2 W, 3, 4 ve 5, NVIDIA Jetson, Orange Pi ve x86 mini PC'ler. Video için Raspberry Pi 4 veya 5 rahat bir tercihtir. Bkz. [Desteklenen donanım](https://docs.uavmatrix.com/tr/reference/supported-hardware/).

### Hangi uçuş kontrolcüleri destekleniyor?

USB veya bir TELEM portu üzerinden MAVLink konuşan herhangi bir uçuş kontrolcüsü: Pixhawk ve Cube ailesi kartlarda, Matek ve benzerlerinde ArduPilot (Copter, Plane, Rover, VTOL ve diğer araç tipleri) ve PX4. Telemetri, video ve yer kontrol istasyonlarına yönlendirme bunların hepsiyle çalışır. **Uçuş Haritası** ve Fleet Manager'daki uçuş modu düğmeleri ArduPilot'un mod adlarını kullanır; PX4 ile modları yer kontrol istasyonunuzdan değiştirin.

### Uçuş kontrolcüsünün USB portuna bağlanabilir miyim?

Evet, ve en basit seçenek budur: takın ve **Port** değerini **Otomatik** olarak bırakın. Veri taşıyan kısa bir kablo kullanın. Bulunamazsa bkz. [MAVLink heartbeat yok](https://docs.uavmatrix.com/tr/troubleshooting/no-mavlink-heartbeat/).

## Yer kontrol istasyonları ve ağ

### Hangi yer kontrol istasyonları çalışır?

MAVLink'i UDP üzerinden alan herhangi bir yazılım; QGroundControl, Mission Planner ve MAVProxy dahil. Video, RTP/UDP üzerinden H.264'tür; QGroundControl ve Mission Planner bunu doğrudan oynatır. GStreamer ve VLC de çalışır: bkz. [Yer kontrol istasyonları ve video](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/).

### Birden fazla yer kontrol istasyonu aynı anda izleyebilir mi?

Evet. **Yer Kontrol İstasyonları** altında her bilgisayar için bir hedef ekleyin; her birinin video ve telemetri için kendi anahtarları olur. Yalnızca izleyecek istasyonlar için **Read Only** kullanın. Bkz. [Birden fazla yer kontrol istasyonuna akış](https://docs.uavmatrix.com/tr/guides/multiple-ground-stations/).

### UAVcast-Pro hangi portları kullanır?

Varsayılan olarak telemetri, her yer kontrol istasyonunda UDP **14550** portuna; video ise UDP **5600** portuna gider. İkinci kamera video portu + 1'i, ses ise video portu + 2'yi kullanır. Web arayüzü **80** portundadır. Tam liste [Portlar ve protokoller](https://docs.uavmatrix.com/tr/reference/ports-and-protocols/) sayfasında yer alır.

### Yönlendiricimde port yönlendirmesine ihtiyacım var mı?

Hayır. 4G üzerinden, drone ile yer kontrol istasyonunu aynı VPN'e bağlayın: lisansınıza dahil olan Fleet Manager VPN'i veya kendi Tailscale ya da ZeroTier ağınızı. Drone, telemetriyi ve videoyu yer kontrol istasyonunun VPN adresine gönderir. Bkz. [4G üzerinden görsel menzil ötesi uçuş](https://docs.uavmatrix.com/tr/guides/bvlos-4g/).

### Hâlâ TCP 5760 üzerinden bağlanabilir miyim?

Hayır. v6.5.0 sürümünden itibaren TCP 5760 kapalıdır; böylece yalnızca eklediğiniz yer kontrol istasyonları veri alır. Bilgisayarınızı bir hedef olarak ekleyin ve UDP kullanın.

### İnternet olmadan çalışır mı?

Evet. Uçuş kontrolcüsü bağlantısı, telemetri ve video, internet beklemeden açılışta başlar; bu yüzden yerel bir Wi-Fi ağı veya radyo bağlantısı çalışır. Lisansı etkinleştirmek bir kez internet gerektirir. Bundan sonra, bağlantı kaybı nedeniyle başarısız olan bir lisans kontrolü cihazı devre dışı bırakmaz.

## Lisans ve hesap

> Drone'u etkinleştirmek için bir UAVcast-Pro lisansına ihtiyacınız var. UAVmatrix mağazasından satın alın.
>
> [UAVcast-Pro satın al](https://uavmatrix.com/tr/checkout) · [Planları ve fiyatları gör](https://uavmatrix.com/tr/products)

### Lisansım etkinleşmiyor. Ne yapmalıyım?

Bkz. [Lisans etkinleşmiyor](https://docs.uavmatrix.com/tr/troubleshooting/license-activation-failed/). Yaygın nedenler; yanlış yazılmış bir anahtar, boş cihaz yuvası olmaması veya cihazda internet olmamasıdır.

### Lisansım sona erdiğinde ne olur?

UAVcast-Pro kilitlenir: web arayüzü yalnızca **Uygulama** sayfasını açar ve siz yenileyene kadar telemetri, video ve diğer servisler durur. Bitiş tarihinden önce mağazada yenileyin, ardından anahtarı drone üzerinde doğrulayın. Bkz. [Lisans sona erdiğinde](https://docs.uavmatrix.com/tr/get-started/license-activation/#when-a-license-expires).

### Fleet Manager lisansıma dahil mi?

Evet. VPN dahil olmak üzere Fleet Manager, UAVcast-Pro lisansınıza ek ücret olmadan dahildir.

### SD kartı değiştirdim. Yeni lisansa ihtiyacım var mı?

Hayır, ancak cihaz yeni sayılır ve bir yuva kullanır. Eski kaydı **Uygulama → Lisans Yöneticisi → Aktif Cihazlar** altından **Kaydı Sil** ile kaldırın.

### Fleet Manager ayrı bir ürün mü?

Fleet Manager, UAVmatrix'in birçok drone'u yönetmek için web kontrol panelidir: [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/). UAVcast-Pro lisansınıza dahildir. uavmatrix.com hesabınızla giriş yaparsınız ve eşleştirdiğiniz her drone, organizasyonunuzun bir üyesine ait aktif bir UAVcast-Pro lisansı gerektirir. Bkz. [Fleet Manager](https://docs.uavmatrix.com/tr/fleet-manager/).

### Bir drone'u Fleet Manager ile nasıl eşleştiririm?

UAVcast-Pro'da **Fleet Management** sayfasını açın ve **Connect to Fleet Manager** düğmesine basın. Fleet Manager'da **Fleet → Pair Device** altına 8 haneli kodu 5 dakika içinde girin. Bkz. [İlk UAV'nizi eşleştirin](https://docs.uavmatrix.com/tr/fleet-manager/pair-uav/); eşleştirme başarısız olursa [Eşleştirme kodu geçersiz veya süresi dolmuş](https://docs.uavmatrix.com/tr/troubleshooting/pairing-code-invalid/) sayfasına bakın.

## Güncellemeler ve veriler

### UAVcast-Pro'yu nasıl güncellerim?

**Uygulama → Uygulamayı Güncelle** bölümüne gidin, **Güncellenecek sürümü seçin** alanından bir sürüm seçin ve **Şimdi Güncelle** düğmesine basın. Kart **Yeniden Başlatma Bekliyor** gösteriyorsa **Şimdi Yeniden Başlat** düğmesine basın. Yükleyiciyi yeniden de çalıştırabilirsiniz.

### v4 veya v5 ayarlarımı içe aktarabilir miyim?

Hayır. v6 yeni bir veritabanı kullanır, bu yüzden temiz kurulumdan sonra yeniden ayarlayın. v6 içinde kurulumlar arasında ayarları taşımak için **Uygulama → Veritabanı → Veritabanını Yedekle** ve **Veritabanını Geri Yükle** seçeneklerini kullanın.

### UAVcast-Pro video kaydedebilir mi?

Evet, v6.5.1 sürümünden itibaren. Kamera 1 ve 2'yi uçuş haritasından veya drone arm edildiğinde otomatik olarak, telemetri günlüğüyle birlikte kaydeder. Bkz. [Uçuşları kaydedin ve inceleyin](https://docs.uavmatrix.com/tr/guides/recording-flight-review/).

### UAVcast-Pro dosyalarını nerede tutar?

`/opt/uavcast-pro` altında: veritabanı `uavcast.db`, `logs/`, `recordings/` ve `missions/`. Bkz. [Servisler ve dosyalar](https://docs.uavmatrix.com/tr/reference/services-and-files/).

### Yönetici parolamı unuttum.

Web arayüzünde parola sıfırlama yoktur. Başka bir yönetici **Users** bölümünden kullanıcınızı silip yeniden oluşturabilir. Tek yönetici sizseniz kurtarma self servis değildir: [Yönetici parolasını unuttum](https://docs.uavmatrix.com/tr/uavcast-pro/users/#forgot-the-admin-password) bölümünde listelenen bilgilerle **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresiyle iletişime geçin.

### Yardım nereden alırım?

[Destek için günlükleri toplayın](https://docs.uavmatrix.com/tr/troubleshooting/collect-logs/) bölümünde anlatıldığı gibi günlükleri toplayın ve **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresine e-posta gönderin veya [UAVmatrix Discord](https://discord.gg/xwqMTXh) üzerinden sorun.

Source: https://docs.uavmatrix.com/tr/troubleshooting/faq/
