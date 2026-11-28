# Yer kontrol istasyonunu bağlayın

> Bir QGroundControl veya Mission Planner dizüstü bilgisayarını tek bir Tailscale komutuyla kuruluşunuzun VPN'ine katın ve drone videosu ile telemetrisini almaya başlayın.

Yer kontrol istasyonu (GCS), pilotun QGroundControl, Mission Planner veya benzeri bir yazılımı çalıştırdığı dizüstü bilgisayar veya PC'dir. Bir drone'un videosunu ve telemetrisini Fleet Manager üzerinden almak için yer kontrol istasyonu, kuruluşunuzun özel VPN'ine katılır. Bundan sonra hangi drone'ların ona yayın yapacağını [akış bağlamaları](https://docs.uavmatrix.com/tr/fleet-manager/network/stream-bindings/) ile siz belirlersiniz.

Her yer kontrol istasyonu için bu işlem yaklaşık beş dakika sürer.

## Başlamadan önce

- **Owner veya Admin rolü.** Viewer'lar **Network** sayfasını görebilir, ancak kimlik doğrulama anahtarını veya bağlantı komutunu göremez, VPN'i etkinleştiremez ve cihazları yapılandıramaz. Şu mesajı görürler: *Ask an Owner or Admin of this organization to connect a new device to the VPN.*
- Kuruluş için **VPN etkin olmalı.** **Network** sayfası **Enable VPN Network** gösteriyorsa önce onu seçin. Bkz. [Ağ ve VPN](https://docs.uavmatrix.com/tr/fleet-manager/network/).
- Tailscale'i kurmak ve bir komut çalıştırmak için yer kontrol istasyonu bilgisayarında **Admin hakları**.
- En az bir drone, [eşleştirilmiş](https://docs.uavmatrix.com/tr/fleet-manager/pair-uav/) ve VPN'e katılmış olmalı.

> **Fleet Manager kendi VPN sunucusunu çalıştırır**
>
> Kuruluşunuzun ağı Tailscale istemcisini kullanır, ancak tailscale.com hesabı yerine Fleet Manager'ın kendi kontrol sunucusunu kullanır. Tailscale'e kayıt olmanız gerekmez. Bilgisayar zaten başka bir Tailscale ağındaysa aşağıdaki komut onu kuruluşunuzun ağına taşır.

## Yer kontrol istasyonunu VPN'e katın

1. Yer kontrol istasyonuna [tailscale.com/download](https://tailscale.com/download) adresinden **Tailscale'i kurun** (Windows, macOS veya Linux).

2. **Bağlantı komutunu kopyalayın.** Fleet Manager'da **Network** sayfasını açın, **Devices** sekmesinde kalın ve **Connect a Device** bölümünü bulun. **GCS Connection Command** altında komutu kopyalayın. Komut şuna benzer:

   ```bash
   tailscale up --authkey=<your-org-key> --login-server=https://vpn-connect.uavmatrix.com
   ```

   ![GCS Computer Only uyarısı ve tailscale up komutu içeren Connect a Device kartı](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/network--connect-device.webp)

   *Network → Devices → Connect a Device; GCS Computer Only uyarısı ve komutun yanındaki kopyalama düğmesi (kimlik doğrulama anahtarı bulanıklaştırılmış).*

   > **Yalnızca yer kontrol istasyonu için**
   >
   > Bu komutu UAVcast-Pro'ya yapıştırmayın ve drone üzerinde çalıştırmayın. Drone'lar VPN'e eşleştirme sırasında veya aynı sayfadaki **Push to Drone** ile katılır.

3. **Komutu yönetici olarak çalıştırın.**

   - Windows: **Terminal** veya **PowerShell** uygulamasını **Run as administrator** ile açın ve komutu yapıştırın.
   - macOS ve Linux: komutu, başına `sudo` ekleyerek bir terminale yapıştırın.

   Komut hata vermeden tamamlandığında bilgisayar ağdadır. `tailscale status` görebildiği drone'ları ve diğer cihazları listeler.

4. **Bilgisayarı Connected Devices bölümünde bulun.** Fleet Manager'a dönün; bilgisayar **Connected Devices** içinde ana bilgisayar adı ve bir `100.x.y.z` adresiyle görünür. Birkaç saniye içinde görünmezse **Sync** seçin. Yeni bir cihazın türü **Unknown** olur ve bir şerit kaç cihazın yapılandırılması gerektiğini gösterir.

5. **Cihazı yer kontrol istasyonu olarak işaretleyin.** **Type** sütununda **Configure** seçin. **Ground Control Station (GCS)** seçin, **Continue** ve ardından **Complete Setup** seçin.

   ![Bu cihaz ne tür bir cihaz sorusunu soran ve Ground Control Station seçili olan kurulum sihirbazı](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/network--setup-wizard.webp)

   *Configure iletişim kutusu: ops-laptop-03 adlı dizüstü bilgisayar için Ground Control Station (GCS) seçili.*

Bilgisayar artık **GCS** rozetini taşır ve bir akış bağlaması eklediğinizde **Ground Station** listesinde görünür.

> **Yer kontrol istasyonlarını kişiye veya göreve göre adlandırın**
>
> Cihazın işlem menüsündeki (**⋯** düğmesi) **Rename** seçeneğini kullanarak "Saha dizüstü – Kuzey Ekibi" gibi bir ad verin. Büyük filolarda bağlama listeleri çok daha okunaklı olur.

## Bir drone'dan akış almaya başlayın

1. **Network → Stream Bindings** sayfasına gidin ve **Add Binding** seçin.

2. **Drone** ve **Ground Station** seçin, ardından **Create Binding** seçin. Drone çevrimiçi olmalıdır.

3. **Ports** sütunundaki portları okuyun, örneğin `5600 / 14550`.

4. Yer kontrol yazılımınızda bu portları dinleyin:

   - **QGroundControl:** UDP 14550 üzerindeki telemetri otomatik bağlanır. Video için **Application Settings → Video** bölümünü açın (eski sürümlerde **General** altında), **Source** değerini **UDP h.264 Video Stream** olarak ayarlayın ve UDP portuna bağlamanın video portunu girin (güncel sürümlerde **UDP URL** `0.0.0.0:<port>`). Ek drone'lar için her bağlamanın telemetri portunda **Application Settings → Comm Links** altında bir UDP bağlantısı ekleyin.
   - **Mission Planner:** bağlantı açılır listesinden **UDP** seçin, **Connect** seçin ve telemetri portunu girin.

Tek bir yer kontrol istasyonunda birden çok drone dahil daha fazla ayrıntı için bkz. [Akış bağlamaları](https://docs.uavmatrix.com/tr/fleet-manager/network/stream-bindings/) ve [Birden çok yer kontrol istasyonuna yayın](https://docs.uavmatrix.com/tr/guides/multiple-ground-stations/).

## Kimlik doğrulama anahtarı

Komut, kuruluşunuzun ağı için yeniden kullanılabilir bir anahtar içerir. Anahtar 90 gün geçerlidir ve sınırsız sayıda yer kontrol istasyonunda kullanılabilir. Owner ve Admin rolündeki kullanıcılar, yeni bir anahtar oluşturmak için **Connect a Device** kartındaki yenile düğmesini seçebilir. Daha önce katılmış yer kontrol istasyonları bağlı kalır. Kart **No valid auth key available. Generate a new key to connect devices.** diyorsa anahtarın süresi dolmuştur; yeni bir tane oluşturun.

## Yer kontrol istasyonunu kaldırın

**Network → Devices** sayfasında cihazın işlem menüsünü açın ve **Remove Device** seçin. Bu işlem cihazı VPN'den kaldırır ve akış bağlamalarını siler. Daha sonra yeniden bağlamak için bağlantı komutunu tekrar çalıştırın.

## Sorun giderme

- **Komut başarısız oluyor veya zaman aşımına uğruyor:** Bilgisayarın `https://vpn-connect.uavmatrix.com` adresine erişebildiğini ve anahtarın süresinin dolmadığını kontrol edin.
- **Yer kontrol istasyonu bağlı, ancak telemetri veya video yok:** Bir bağlamanın olduğunu, **Video** ve **Telemetry** seçeneklerinin açık olduğunu ve yer kontrol yazılımının bağlamanın portlarını dinlediğini kontrol edin. Windows Güvenlik Duvarı, yeni bir uygulama için gelen UDP trafiğini sık sık engeller. Bkz. [Yer kontrol istasyonunda telemetri yok](https://docs.uavmatrix.com/tr/troubleshooting/no-telemetry-in-gcs/) ve [Yer kontrol istasyonunda video yok](https://docs.uavmatrix.com/tr/troubleshooting/no-video-in-gcs/).
- **VPN üzerinden drone'a ulaşılamıyor:** Bkz. [VPN bağlı ama drone'a ulaşılamıyor](https://docs.uavmatrix.com/tr/troubleshooting/vpn-cant-reach-drone/).

Source: https://docs.uavmatrix.com/tr/fleet-manager/connect-gcs/
