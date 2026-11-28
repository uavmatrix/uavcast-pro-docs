# 4G üzerinden görüş mesafesi ötesinde uçuş

> UAVcast-Pro, hücresel modem ve Fleet Manager VPN ile drone'unuzu 4G/LTE üzerinden uçurun; telemetri ve canlı video QGroundControl veya Mission Planner'da görünür.

Bu kılavuz bir drone'u tezgâh başındaki hazırlıktan hücresel ağ üzerinden yapılan bir uçuşa kadar götürür: iki uçta da kapsama alanı olduğu sürece telemetri ve canlı video QGroundControl veya Mission Planner'da görüntülenir. [Fleet Manager](https://docs.uavmatrix.com/tr/fleet-manager/) ile gelen VPN kullanılır; bu VPN UAVcast-Pro lisansınıza dahildir. Böylece iki tarafın da genel IP adresine veya port yönlendirmeye ihtiyacı olmaz.

**Süre:** yaklaşık bir saat. **Gerekenler:**

- UAVcast-Pro [kurulu](https://docs.uavmatrix.com/tr/get-started/installation/) ve [lisansı etkinleştirilmiş](https://docs.uavmatrix.com/tr/get-started/license-activation/) bir eşlik eden bilgisayar (Raspberry Pi 4 veya 5 ya da başka bir [desteklenen kart](https://docs.uavmatrix.com/tr/reference/supported-hardware/)).
- Bir MAVLink uçuş kontrolcüsü (ArduPilot veya PX4), bir USB veri kablosu ya da TELEM bağlantısı.
- Bir USB 4G/LTE modem ve bir veri SIM kartı. Sorun yaşamamak için önce SIM PIN kodunu bir telefonda devre dışı bırakın.
- Video istiyorsanız bir kamera.
- QGroundControl veya Mission Planner yüklü bir dizüstü bilgisayar ve [Tailscale istemcisi](https://tailscale.com/download).
- Owner veya Admin olduğunuz bir [Fleet Manager organizasyonu](https://docs.uavmatrix.com/tr/fleet-manager/set-up-organization/).

> **Görüş mesafesi dışı uçuş kuralları**
>
> Görüş hattının dışında uçuş (BVLOS) çoğu ülkede yetki gerektirir. UAVcast-Pro size bağlantıyı sağlar; operasyonel onay, risk değerlendirmesi ve güvenlik önlemleri ise sizin sorumluluğunuzdadır.

## Bileşenler nasıl bir araya gelir

```text
Flight controller ──USB/UART── UAVcast-Pro ──4G──► internet ──► laptop
                                    │                               │
                                    └──── Fleet Manager VPN ────────┘
                  telemetry and video on the ports of the stream binding
```

Drone, MAVLink ve H.264 videoyu dizüstü bilgisayarınızın VPN adresine gönderir. VPN, dizüstü bilgisayara 4G üzerinden, ikisi de aynı yerel ağdaymış gibi erişilebilir olmasını sağlar.

> **Kendi VPN'inizi mi kullanmak istiyorsunuz?**
>
> Fleet Manager yerine kendi ZeroTier ağınızı veya Tailscale tailnet'inizi kullanabilirsiniz: [VPN](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/vpn/) ve [Tailscale ile uzaktan erişim](https://docs.uavmatrix.com/tr/guides/remote-access-tailscale/) sayfalarına bakın. Aşağıdaki 1, 2 ve 7 ila 9. adımlar aynı kalır.

## 1. Uçuş kontrolcüsünü bağlayın

1. Uçuş kontrolcüsünü USB ile eşlik eden bilgisayara takın ya da bir TELEM portunu bağlayın (TX→RX, RX→TX, GND→GND) ve bu portta MAVLink'i etkinleştirin (ArduPilot'ta `SERIALx_PROTOCOL = 2`, PX4'te `MAV_x_CONFIG`).
2. UAVcast-Pro'da **Uçuş Kontrolcüsü → Bağlantı** bölümünü açın. **Link type** altında **USB** veya **UART / Serial** seçin; **Port** ve **Baud rate** alanlarını **Automatic** olarak bırakın.
3. **Bağlı** durumunu ve **Vehicle** alanında bir aracın göründüğünü bekleyin. Durum **No heartbeat** olarak kalırsa [MAVLink heartbeat yok](https://docs.uavmatrix.com/tr/troubleshooting/no-mavlink-heartbeat/) sayfasına bakın.

## 2. Modemi ayarlayın

1. Modemi takın ve **Modem** bölümünü açın.
2. **Hücresel Modem etkinleştirilsin mi?** ayarını **Evet** yapın ve **Modem tipi** seçin: USB ağ adaptörü gibi çalışan modemler için **HiLink** (örneğin Huawei E3372h), diğerleri için **Geleneksel (PPP)**.
3. Geleneksel bir modem için **Erişim Noktası Adı (İsteğe bağlı)** alanını boş bırakın. UAVcast-Pro SIM kartınız için APN'yi bulur ve hatırlar.
4. **Modem Bilgileri** altında bir **Operatör** ve bir IPv4 adresi görünene kadar bekleyin.
5. **Ağlar** bölümüne gidin ve **Modem Önceliği (Dış Mekan Modu)** seçeneğini seçin; böylece Wi-Fi olsa bile trafik modem üzerinden çıkar.

Ayrıntılar: [Hücresel modem](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/cellular-modem/). Modem bağlanıyor ama hiçbir şey yüklenmiyorsa: [Modem bağlı, internet yok](https://docs.uavmatrix.com/tr/troubleshooting/modem-no-internet/).

## 3. Fleet Manager'da VPN'i açın

Fleet Manager'da **Network** bölümünü açın. **Enable VPN Network** görünüyorsa onu seçin. Bu işlem organizasyonunuzun özel ağını oluşturur. Bkz. [Ağ ve VPN](https://docs.uavmatrix.com/tr/fleet-manager/network/).

## 4. Drone'u eşleştirin ve VPN'e ekleyin

1. UAVcast-Pro'da **Yönetim → Fleet Management** bölümüne gidin ve **Connect to Fleet Manager** seçeneğini seçin. 8 haneli kodu not edin.
2. Fleet Manager'da **Fleet → Pair Device** bölümüne gidin, kodu girin ve cihazı onaylayın.
3. **VPN Connection** adımında **Enable VPN for this UAV** seçeneğini işaretli bırakın ve **Complete Pairing** seçin.
4. Drone, **UAV** türü ve bir `100.x.y.z` adresiyle **Network → Connected Devices** altında görünür.

Tam anlatım: [Fleet Manager'a ilk drone'unuzu ekleyin](https://docs.uavmatrix.com/tr/fleet-manager/pair-uav/).

## 5. Dizüstü bilgisayarı VPN'e ekleyin

1. Dizüstü bilgisayara Tailscale'i kurun. Tailscale hesabına ihtiyacınız yoktur: Fleet Manager kendi VPN sunucusunu çalıştırır.
2. Fleet Manager'da **Network → Devices** bölümünde, **Connect a Device** altındaki **GCS Connection Command** komutunu kopyalayın ve dizüstü bilgisayarda yönetici olarak çalıştırın (macOS ve Linux'ta `sudo`).
3. Dizüstü bilgisayar **Connected Devices** listesinde görünür. **Type** sütununda **Configure** seçin, **Ground Control Station (GCS)** seçeneğini belirleyin ve **Complete Setup** seçin.
4. Test edin: dizüstü bilgisayardan `ping <drone VPN IP>` komutunu çalıştırın. Artık drone'un web arayüzünü `http://<drone VPN IP>/` adresinde açabilirsiniz.

Ayrıntılar ve ekran görüntüleri: [Bir yer kontrol istasyonu bağlama](https://docs.uavmatrix.com/tr/fleet-manager/connect-gcs/).

## 6. Telemetri ve videoyu dizüstü bilgisayara gönderin

1. Fleet Manager'da **Network → Stream Bindings** bölümüne gidin ve **Add Binding** seçin.
2. Drone'u ve dizüstü bilgisayarı seçin, ardından **Create Binding** seçin. Fleet Manager hedefi drone'a gönderir; hedef, drone'un **Ground Control Stations** sayfasında bulut simgesiyle görünür.
3. Bağlamanın video ve telemetri portlarını **Ports** sütununda okuyun. Bir dizüstü bilgisayardaki ilk drone için bunlar varsayılan `5600` ve `14550` portlarıdır.
4. Dizüstü bilgisayarda güvenlik duvarında bu portlar için gelen UDP trafiğine izin verin ([Video yok, kontrol 3](https://docs.uavmatrix.com/tr/troubleshooting/no-video-in-gcs/#check-3) bölümündeki komutlar).

## 7. Kamerayı başlatın

1. **Kamera → Kamera ayarları** bölümünü açın, **Kamera Etkinleştirilsin mi?** ayarını **Evet** yapın ve **Kamera Seç** alanında kamerayı seçin.
2. LTE için **Çözünürlük** 1280×720, **FPS Seç** 15–20 ve **Bit Hızı:** yaklaşık 1000–1500 kbps olacak şekilde başlayın.
3. Ayarlar değiştirdikçe kaydedilir. Kamera henüz çalışmıyorsa **Başlat** düğmesine basın.

## 8. Yer kontrol istasyonunu açın

- **QGroundControl** UDP 14550'ye kendiliğinden bağlanır. Video için, video ayarlarında **Source** değerini bağlamanın video portunda **UDP h.264 Video Stream** olarak ayarlayın.
- **Mission Planner**: **UDP** seçin, **Connect** düğmesine basın ve bağlamanın telemetri portunu girin. Video için, [Mission Planner](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/mission-planner/) sayfasında anlatıldığı gibi GStreamer kaynağını ayarlayın.

## 9. Uçmadan önce 4G üzerinde test edin

1. Eşlik eden bilgisayarın Wi-Fi'sini kapatın veya drone'u Wi-Fi kapsama alanının dışına çıkarın; böylece tek yol modem olur.
2. Kontrol Paneli'ni kontrol edin: **Cellular** bağlı, **VPN** bağlı, **Ground station** *Sending*, **Video** çalışıyor.
3. Bağlantıyı yerde 10 dakika izleyin; mümkünse kalkış noktasında. Video donmalarına ve telemetri kesintilerine dikkat edin.
4. **Uçuş Kontrolcüsü → Bağlantı** bölümünde **YKİ Güvenli Mod Bilgisi** değerini kontrol edin. **Warning - Failsafe Disabled** görünüyorsa uçuş kontrolcüsünde GCS failsafe'i etkinleştirin (ArduPilot: Plane'de `FS_GCS_ENABL`, Copter'da `FS_GCS_ENABLE`; PX4: `NAV_DLL_ACT`) ve eylemini seçin; böylece bağlantı koptuğunda drone kendi kendine karar verir.

> **Her uçuşu kaydedin**
>
> **Kamera → Kayıtlar → Ayarlar** altında **Arm edildiğinde otomatik kaydet** seçeneğini açın. Böylece her uçuşun videosunu ve telemetri günlüğünü daha sonra incelemek üzere elde edersiniz: [Uçuşları kaydedin ve inceleyin](https://docs.uavmatrix.com/tr/guides/recording-flight-review/).

> **UAVnet kullanımdan kaldırılıyor**
>
> UAVmatrix'in barındırdığı ZeroTier denetleyicisi UAVnet, Fleet Manager lehine kullanımdan kaldırılıyor. Drone'larınız bugün bir UAVnet ağı kullanıyorsa, bunları yukarıda anlatıldığı gibi Fleet Manager VPN'e taşıyın.

## Sonraki adımlar

- [Birden çok yer kontrol istasyonuna akış](https://docs.uavmatrix.com/tr/guides/multiple-ground-stations/)
- [NTRIP caster'dan RTK düzeltmeleri ekleyin](https://docs.uavmatrix.com/tr/guides/rtk-ntrip-caster/)
- Birden fazla drone mu yönetiyorsunuz? [Fleet Manager ile bir filoyu sisteme alın](https://docs.uavmatrix.com/tr/guides/fleet-onboarding/)

Source: https://docs.uavmatrix.com/tr/guides/bvlos-4g/
