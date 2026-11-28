# Android ve tabletler

> Android telefon veya tablette QGroundControl ile UAVcast-Pro telemetrisini ve canlı videosunu alın; Wi-Fi veya VPN üzerinden 4G ile, iPad için tarayıcı seçeneğiyle birlikte.

Android için QGroundControl, masaüstü sürümüyle aynı şekilde UAVcast-Pro telemetrisini UDP 14550 üzerinden, videoyu ise UDP 5600 üzerinden alır. 4G üzerinden çalışırken dronun tablete ulaşabilmesi için tablete Tailscale veya ZeroTier uygulamasını kurun.

## QGroundControl'ü Android'e kurma

1. **QGroundControl** uygulamasını [Google Play](https://play.google.com/store/apps/details?id=org.mavlink.qgroundcontrol) üzerinden kurun.

2. Tableti, drone'un veri gönderdiği ağa bağlayın:

   - **Aynı Wi-Fi**: tabletin IP adresini **Settings → Wi-Fi → (ağınız) → Advanced** veya benzer bir yerde bulun.
   - **4G üzerinden**: [ZeroTier One](https://play.google.com/store/apps/details?id=com.zerotier.one) veya [Tailscale](https://play.google.com/store/apps/details?id=com.tailscale.ipn) uygulamasını kurun, dronla aynı ağa katılın (bkz. [VPN](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/vpn/)) ve tabletin VPN adresini not edin.

3. Dronda, [Yer Kontrol İstasyonları](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/) bölümünde tabletin IP adresiyle bir hedef ekleyin; **Telemetriyi Etkinleştir** ve **Videoyu Etkinleştir** seçeneklerini açın.

4. QGroundControl'ü açın. Telemetri geldiğinde araç görünür.

5. Video için: **Q** simgesi → **Application Settings** → **Video** (eski sürümlerde **General** bölümündeki **Video**), **Source** değerini **UDP h.264 Video Stream** olarak ayarlayın ve UDP adresinin `5600` portunu kullandığını kontrol edin.

Her şey çalıştığında **Fly** görünümünde drone, araç çubuğunda uçuş modu ve bataryasıyla birlikte haritada görünür; köşedeki küçük video penceresinde kamera görüntüsünü görürsünüz. Video ile haritayı değiştirmek için pencereye dokunun.

> **VPN uygulamasını bağlı tutun**
>
> Android, pil tasarrufu için VPN uygulamalarını arka planda durdurabilir. ZeroTier veya Tailscale'i pil optimizasyonunun dışında tutun ve uçuş sırasında VPN'i açık bırakın.

Video ayarları, düşük gecikme modu ve yaygın sorunlarla ilgili ayrıntılar [QGroundControl sayfasında](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/qgroundcontrol/) yer alır.

## iPad, iPhone ve diğer cihazlar: tarayıcıyı kullanın

UAVcast-Pro web arayüzü herhangi bir modern tarayıcıda çalışır. iPad veya telefonda `http://<drone-ip>` adresini açın (4G üzerinden VPN adresi) ve [Uçuş Haritası](https://docs.uavmatrix.com/tr/uavcast-pro/flight-map/) üzerinden canlı haritayı, kokpit HUD'unu, kamera videosunu, arm/disarm ve RTL işlemlerini kullanın. Oradaki video canlı önizlemedir (WebRTC); bu nedenle tarayıcının dronun 8889 portuna erişebilmesi gerekir.

## Sık karşılaşılan sorunlar

| Belirti | Çözüm |
| --- | --- |
| Araç 4G üzerinden hiç görünmüyor | Tabletteki VPN uygulaması kapalı veya hedef Wi-Fi IP'sini kullanıyor. Tabletin VPN adresini kullanın. |
| Ekran kapanınca çalışmayı bırakıyor | Android VPN uygulamasını duraklattı. Bunun için pil optimizasyonunu kapatın. |
| Telemetri çalışıyor, video yok | **Videoyu Etkinleştir** seçeneğini, kamerayı ve QGroundControl'deki video kaynağı ayarlarını kontrol edin. |

Source: https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/android/
