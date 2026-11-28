# Hızlı başlangıç

> MAVLink uçuş kontrolcüsünü UAVcast-Pro'ya bağlayın; önce yerel ağınızda, ardından 4G/LTE üzerinden Mission Planner veya QGroundControl'de telemetri ve canlı video alın.

Bu kılavuz, UAVcast-Pro kurulu bir drone'u Mission Planner veya QGroundControl'de canlı telemetri ve videoya kadar götürür. Daha az sorunun ortaya çıkabileceği yerel ağınızda başlayacak, ardından 4G/LTE'ye geçeceksiniz. Yerel kısım yaklaşık 10 dakika sürer.

## Başlamadan önce

- UAVcast-Pro kurulu ve cihaz yeniden başlatılmış olmalı. Bkz. [Kurulum](https://docs.uavmatrix.com/tr/get-started/installation/).
- Lisans anahtarınız. Bkz. [Lisanslama ve etkinleştirme](https://docs.uavmatrix.com/tr/get-started/license-activation/).
- Uçuş kontrolcüsü, USB veya TELEM portu üzerinden eşlik eden bilgisayara bağlı ve güçlü.
- Bir kamera bağlı (isteğe bağlı).
- Mission Planner veya QGroundControl yüklü bir dizüstü bilgisayar, drone ile **aynı ağda**. Dizüstü bilgisayarın IP adresini not edin (Windows'ta `ipconfig`, Linux'ta `ip a`, macOS'te **Sistem Ayarları → Ağ**).

## 1. Lisansı etkinleştirin

> Drone'u etkinleştirmek için bir UAVcast-Pro lisansına ihtiyacınız var. UAVmatrix mağazasından satın alın.
>
> [UAVcast-Pro satın al](https://uavmatrix.com/tr/checkout) · [Planları ve fiyatları gör](https://uavmatrix.com/tr/products)

1. Tarayıcıda `http://<drone-ip>` adresini açın. **Uygulama** sayfasına düşersiniz.
2. Anahtarınızı **Lisans Anahtarını Girin** alanına yapıştırın ve **Doğrula**'yı seçin.

Kenar çubuğu açılır. Şimdi **Users**'a gidin, **Add User**'ı seçin ve bir yönetici hesabı oluşturun; böylece web arayüzü ağdaki herkese açık olmaz.

## 2. Uçuş kontrolcüsünü bağlayın

1. **Uçuş Kontrolcüsü → Bağlantı** bölümüne gidin.
2. **Bağlantı Türü** altında, kablolamanıza uygun olarak **USB** veya **UART / Serial** seçin.
3. **Port** ve **Baud hızı** alanlarını **Otomatik** olarak bırakın.
4. Durum panelinde **Link stopped** yazıyorsa **Bağlan**'ı seçin.
5. Durumun **Bağlı** olmasını bekleyin. **Mavlink Bilgisi** araç tipi, uçuş modu, GPS ve batarya bilgileriyle dolar; üst çubukta **FC Connected** görünür.

![Dört adımı geçen Bağlantı kontrolü paneli, USB üzerinden bağlı Uçuş Kontrolcüsü Bağlantı sayfası ve MAVLink Denetçisi](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/flight-controller.webp)

*USB bağlantısı çalışırken Uçuş Kontrolcüsü → Bağlantı.*

**Waiting for device**, **Detecting baud rate** veya **No heartbeat** ekranında mı takıldınız? **Otomatik algıla**'yı seçin ve **Connection check** panelini okuyun: ilk hatalı noktayı adıyla belirtir. Daha fazlası için [Uçuş kontrolcüsü](https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/) sayfasına bakın.

## 3. Telemetri ve videoyu dizüstü bilgisayarınıza gönderin

1. **Yer Kontrol İstasyonları**'na gidin. Zaten boş bir hedef kartı vardır.
2. Bir **Ad** girin, örneğin `Laptop`.
3. **Hedef IP veya Sunucu** alanına dizüstü bilgisayarınızın IPv4 adresini girin, örneğin `192.168.1.20`, ve Enter'a basın. Yeşil bir onay işareti kaydedildiğini gösterir.
4. **Telemetri Portu**'nu `14550`, **Video Portu**'nu `5600` olarak bırakın.
5. **Telemetriyi Etkinleştir**'i açın.
6. Bir kameranız varsa **Videoyu Etkinleştir**'i açın.

Alanlar, alandan çıktığınızda kaydedilir. Kaydet düğmesi yoktur.

## 4. Kamerayı başlatın

Kameranız yoksa bu adımı atlayın.

1. **Kamera → Kamera ayarları** bölümüne gidin.
2. **Kamera Etkinleştirilsin mi?** alanını **Evet** yapın.
3. **CAM 1** yuvasını seçin ve kameranızı seçin, örneğin *Raspberry Pi Camera - imx708 (CSI)* veya USB web kameranız.
4. **Kamera Ayarları** altında bir **Çözünürlük** seçin. `1280x720` veya kameranızın sunduğu en yakın boyutla başlayın.
5. **FPS Seç**'i **Otomatik** olarak bırakın ve **Bit Hızı**'nı `0` (otomatik) olarak bırakın.
6. **Akış Ayarları** altında **Canlı Önizleme Etkinleştirilsin mi?** kutusunu işaretleyin ve **Başlat**'ı seçin. **Canlı Önizleme** görüntüyü gösterir.

## 5. Yer kontrol istasyonunuzu açın

**QGroundControl**

QGroundControl varsayılan olarak UDP 14550'yi dinler; bu nedenle drone birkaç saniye içinde kendiliğinden görünür.

Video için: **Q** simgesine tıklayın → **Application Settings** → **Video** (eski sürümlerde **General** altındaki **Video** bölümü). **Source** alanını **UDP h.264 Video Stream** olarak ayarlayın ve varsayılan UDP portu `5600`'de bırakın. Video, Fly view'da gösterilir.

**Mission Planner**

Sağ üst köşeden **UDP**'yi seçin, **Connect**'e basın ve `14550` portunu onaylayın.

![Mission Planner Uçuş Verisi görünümü UDP üzerinden bağlı: sağ üstteki bağlantı kutusunda UDP, UDP14550-1-QUADRO bağlantısı ve DISCONNECT düğmesi; HUD'da DISARMED, Unhealthy AHRS ve GPS: No Fix](https://docs.uavmatrix.com/tr/img/screenshots/gcs/mission-planner--connected.webp)

*Mission Planner, UDP 14550 üzerinden bağlı: sağ üstteki bağlantı kutusu bağlantıyı ve DISCONNECT düğmesini gösterir. GPS'siz tezgah kurulumu olduğu için HUD'da Unhealthy AHRS ve GPS: No Fix görünür.*

Video için: HUD'a sağ tıklayın → **Video** → **Set GStreamer Source** ve aşağıdakini yapıştırın:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

Ekran görüntüleri ve çözümlerle birlikte tam kılavuzlar: [Mission Planner](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/mission-planner/), [QGroundControl](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/qgroundcontrol/), [Android](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/android/) ve GStreamer için [Windows](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/gstreamer-linux/) veya [macOS](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/gstreamer-macos/).

> **Windows güvenlik duvarı**
>
> Windows, uygulama bir istisna istemediği sürece gelen UDP trafiğini engeller. Telemetri veya video ulaşmıyorsa, Mission Planner veya QGroundControl'ü güvenlik duvarında **özel ve genel** ağlar için izin verin ya da UDP 14550 ve 5600 portlarını açın.

Artık yerel ağınızda telemetri ve videonuz var. Kontrol Paneli'ndeki **Ground station** satırı *Sending · … packets/s* gösterir.

## 6. 4G/LTE üzerinden uçun

Hücresel bir ağda drone'un dizüstü bilgisayarınızın erişebileceği bir adresi yoktur; bu nedenle ikisi de aynı VPN'e katılır. Fleet Manager VPN, lisansınıza dahildir.

1. Modemi takın. **Modem** sayfasında **Modem tipi**'ni **HiLink** veya **Geleneksel (PPP)** olarak ayarlayın. **Erişim Noktası Adı** alanını boş bırakın: UAVcast-Pro APN'yi kendisi bulur. Bkz. [Hücresel modem](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/cellular-modem/).
2. [Fleet Manager](https://fleet-manager.uavmatrix.com/) hesabınızda oturum açın, **Network** bölümünü açın ve henüz etkin değilse **Enable VPN Network**'ü seçin.
3. Drone'u eşleştirin: UAVcast-Pro'da **Yönetim → Fleet Management → Connect to Fleet Manager** yolunu izleyin, ardından Fleet Manager'da **Fleet → Pair Device** altındaki kodu girin. **Enable VPN for this UAV** kutusunu işaretli bırakın.
4. Dizüstü bilgisayarı VPN'e alın: Tailscale'i kurun ve Fleet Manager'ın **Network** sayfasındaki **GCS Connection Command**'ı çalıştırın, ardından dizüstü bilgisayarı **Ground Control Station (GCS)** olarak işaretleyin.
5. **Network → Stream Bindings** bölümünde drone'dan dizüstü bilgisayara bir bağlama ekleyin. Fleet Manager hedefi drone'a gönderir ve **Ports** sütunu hangi portları dinleyeceğinizi gösterir.
6. **Ağlar** bölümünde **Modem Önceliği (Dış Mekan Modu)**'nu seçin; böylece Wi-Fi koptuğunda trafik modem üzerinden gider.

Tam kılavuz: [4G üzerinden görsel menzil ötesi uçuş](https://docs.uavmatrix.com/tr/guides/bvlos-4g/). Zaten kendi Tailscale veya ZeroTier ağınız varsa, drone'u ve dizüstü bilgisayarı bunun yerine oraya katın ve hedef olarak dizüstü bilgisayarın VPN IP adresini kullanın. Bkz. [VPN](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/vpn/).

> **LTE üzerinden uçmadan önce bir GCS failsafe ayarlayın**
>
> Hücresel bağlantılar kopar. Uçuş kontrolcüsünde bir GCS failsafe'in yapılandırıldığından emin olun (ArduPilot'ta `FS_GCS_ENABLE`, PX4'te `NAV_DLL_ACT`). Üst çubukta **GCS Failsafe Enabled** veya **GCS Failsafe Disabled** görünür.

## Sonraki adımlar

- [İki kamera, RC ile değiştirme ve çift akış](https://docs.uavmatrix.com/tr/uavcast-pro/camera/multi-camera/)
- [Her uçuşu drone üzerinde kaydedin](https://docs.uavmatrix.com/tr/uavcast-pro/camera/recordings/)
- [NTRIP ile 4G üzerinden RTK düzeltmeleri](https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/ntrip-rtk/)
- [Drone'u Fleet Manager ile eşleştirin](https://docs.uavmatrix.com/tr/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/tr/get-started/quick-start/
