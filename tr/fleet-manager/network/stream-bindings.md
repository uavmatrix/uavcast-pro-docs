# Akış bağlamaları

> Video ve MAVLink verisini herhangi bir drone'dan herhangi bir yer kontrol istasyonuna VPN üzerinden yönlendirin; Fleet Manager UDP portlarını nasıl atar ve QGC ile Mission Planner nasıl kurulur.

Bir **akış bağlama** (stream binding), bir drone'a videosunu ve telemetrisini organizasyonunuzun VPN'i üzerinden tek bir yer kontrol istasyonuna göndermesini söyler. Bir drone birkaç yer kontrol istasyonuna yayın yapabilir ve bir yer kontrol istasyonu birkaç drone alabilir. Fleet Manager, akışların asla çakışmaması için portları seçer.

## Başlamadan önce

- [VPN etkin](https://docs.uavmatrix.com/tr/fleet-manager/network/#enable-vpn) ve drone VPN'de (**Connected Devices** içinde **UAV** tipi).
- [Yer kontrol istasyonu bağlı ve **GCS** olarak yapılandırılmış](https://docs.uavmatrix.com/tr/fleet-manager/connect-gcs/).
- **Owner veya Admin** rolü.
- Drone **çevrimiçi**. Fleet Manager yeni hedefleri hemen UAVcast-Pro'ya gönderir ve onayını bekler.

## Bağlama ekleme

1. **Network → Stream Bindings** bölümüne gidin ve **Add Binding** seçeneğini seçin.
2. **Add Stream Binding** içinde **Drone** ve **Ground Station** seçin.
3. **Create Binding** seçeneğini seçin.

![Drone ve yer kontrol istasyonu seçicileri ile otomatik port notu bulunan Add Stream Binding iletişim kutusu](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/network--add-binding.webp)

*Bir drone ve yer kontrol istasyonu seçili Add Stream Binding iletişim kutusu; portların otomatik atandığına dair not.*

Bağlama, tabloda **Video** ve **Telemetry** açık ve **Ports** (video / telemetri) ile görünür. UAVcast-Pro birkaç saniye içinde göndermeye başlar.

Drone 15 saniye içinde onaylamazsa Fleet Manager, bağlamayı **Failed to send configuration to drone - it may be offline** mesajıyla iptal eder. Drone'un çevrimiçi olduğunu kontrol edip yeniden deneyin.

## Portların nasıl atandığı

Portlar **yer kontrol istasyonu başına** sayılır. Her bağlama, o yer kontrol istasyonunda kendi UDP port bloğunu alır; böylece drone'lar asla çakışmaz:

- kamera 1 için bir **video** portu, ardından **kamera 2** (çift akış) ve **ses** için yer. UAVcast-Pro bunları video portundan sonraki portlara gönderir;
- MAVLink için bir **telemetri** portu.

Bir yer kontrol istasyonundaki ilk bağlama varsayılanları kullanır: video **5600**, telemetri **14550**. Sonraki bağlamalar bir sonraki boş bloğu alır.

Bilmeye değer birkaç sonuç vardır:

- **Her yer kontrol istasyonu varsayılanlarla başlar.** Aynı drone, her dizüstü bilgisayarın başka neler aldığına bağlı olarak iki dizüstü bilgisayarda farklı portlara sahip olabilir.
- **Boşalan portlar yeniden kullanılır.** Bir bağlamayı kaldırmak, o dizüstü bilgisayara gelecek bir sonraki yeni bağlama için bloğunu serbest bırakır.
- **Portlar drone'u izlemez.** Bir bağlamayı kaldırıp yeniden eklemek farklı portlar verebilir. Yer kontrol istasyonu yazılımını kurmadan önce her zaman **Ports** sütununu okuyun.
- Portlar Fleet Manager tarafından atanır ve uygulamada düzenlenemez.
- Drone'da elle ayarlanan bir **Video Portu (Kamera 2)**, Fleet Manager hedeflerini güncellediğinde yalnızca UAVcast-Pro 6.5.3'ten itibaren korunur. Önceki sürümlerde bir sonraki güncelleme bunu siler.

## Yer kontrol istasyonu yazılımını kurma

Bağlamanın **Ports** sütunundaki portları kullanın. Akış, drone'un VPN adresinden gelir.

**QGroundControl**

- **Telemetri:** QGroundControl varsayılan olarak UDP 14550 üzerinde dinler, bu nedenle ilk drone kendiliğinden bağlanır. Daha fazla drone için **Application Settings → Comm Links** bölümünü açın, bağlama telemetri portuyla **UDP** türünde bir bağlantı ekleyin ve bağlayın.
- **Video:** **Application Settings → Video** bölümünde (eski sürümlerde **General** altında) **Source** değerini **UDP h.264 Video Stream** olarak ve UDP portunu bağlamanın video portu olarak ayarlayın (güncel sürümlerde **UDP URL** `0.0.0.0:<port>`). QGroundControl aynı anda bir video gösterir; birden fazla drone'u izlemek için ikinci bir örnek çalıştırın veya diğerleri için bir video oynatıcı kullanın.

**Mission Planner**

- **Telemetri:** sağ üstteki bağlantı açılır menüsünde **UDP** seçin, **Connect** seçeneğini seçin ve bağlamanın telemetri portunu girin. Birden fazla drone için her port için bir kez bağlanın; Mission Planner her aracı sistem ID'siyle listeler.
- **Video:** HUD'a sağ tıklayın, **Video → Set GStreamer Source** seçin ve bağlamanın video portunu dinleyen bir pipeline girin. Tam pipeline için bkz. [Mission Planner](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/mission-planner/).

> **Her drone'a kendi MAVLink sistem ID'sini verin**
>
> Bir yer kontrol istasyonu birden fazla drone aldığında, her uçuş kontrolcüsünün benzersiz bir `SYSID_THISMAV` (ArduPilot) veya `MAV_SYS_ID` (PX4) değerine ihtiyacı vardır. Aksi halde yer kontrol istasyonu bunları karıştırır.

Bir yer kontrol istasyonundan birçok aracı yönetme hakkında daha fazlası için: [Birden fazla yer kontrol istasyonuna yayın](https://docs.uavmatrix.com/tr/guides/multiple-ground-stations/).

## Bağlamayı duraklatma veya kaldırma

- Bağlamayı ve portlarını kaybetmeden bir yayını durdurmak için tabloda **Video** veya **Telemetry** anahtarını kapatın. Bunu drone çevrimiçiyken yapın ki değişikliği alsın.
- Bağlamayı kaldırmak için çöp kutusu simgesini seçin. Portlar, o yer kontrol istasyonuna gelecek bir sonraki bağlama için serbest kalır.

Büyük bir filoda bağlamaları bulmak için arama kutusunu ve **Video Status** filtresini (**All Video**, **Video On**, **Video Off**) kullanın.

![Drone, yer kontrol istasyonu, Video ve Telemetry anahtarları ile portları listeleyen Stream Bindings tablosu](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/network--stream-bindings.webp)

*Stream Bindings sekmesi: her bağlama drone, yer kontrol istasyonu, Video ve Telemetry anahtarları ve portlarını listeler.*

## UAV sayfasındaki bağlamalar

Her drone'un [UAV sayfası](https://docs.uavmatrix.com/tr/fleet-manager/fleet/uav-details/#connected-ground-stations), yer kontrol istasyonlarını **Connected Ground Stations** altında, aynı anahtarlar ve **Pause** / **Resume** ile listeler. Orada **Add GCS**, buradaki **Add Binding** ile aynı şekilde, o yer kontrol istasyonunda bir sonraki boş portla bir bağlama oluşturur.

## Yayın gelmiyor mu?

Bkz. [Yer kontrol istasyonunda telemetri yok](https://docs.uavmatrix.com/tr/troubleshooting/no-telemetry-in-gcs/) ve [Yer kontrol istasyonunda video yok](https://docs.uavmatrix.com/tr/troubleshooting/no-video-in-gcs/). Olağan nedenler: dizüstü bilgisayardaki güvenlik duvarının gelen UDP trafiğini engellemesi, yer kontrol istasyonu yazılımının yanlış portu dinlemesi veya bağlamada yayının kapatılmış olması.

Source: https://docs.uavmatrix.com/tr/fleet-manager/network/stream-bindings/
