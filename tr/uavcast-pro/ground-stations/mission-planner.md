# Mission Planner

> UAVcast-Pro dronunu Mission Planner'a bağlayın: UDP 14550 üzerinden MAVLink, tam GStreamer kaynağıyla HUD'da canlı H.264 videosu, Windows güvenlik duvarı, ikinci kamera ve yaygın hatalar.

Mission Planner, UAVcast-Pro telemetrisini UDP 14550 portundan alır ve canlı videoyu 5600 portundaki bir GStreamer kaynağı üzerinden HUD'da gösterir. Telemetri tek tıklamayla bağlanır; video ise bir kez yapıştırılması gereken bir pipeline gerektirir ve Mission Planner bunu hatırlar.

## Başlamadan önce

- Dronda, [Yer Kontrol İstasyonları](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/) bölümünde bu PC'nin IP adresiyle (4G üzerinden VPN adresi) bir hedef olmalı; **Telemetriyi Etkinleştir** açık olmalı ve video için **Videoyu Etkinleştir** açık olmalıdır.
- Kamera, **Kamera → Kamera ayarları** bölümünde akış yapıyor olmalıdır.
- Windows'ta güncel bir Mission Planner. Bu PC'nin IP adresini Komut İstemi'nde `ipconfig` ile bulun.

## Telemetriyi bağlayın

1. Mission Planner'ın sağ üst köşesindeki bağlantı açılır listesinden **UDP** seçin. Baud hızı yok sayılır.
2. **Connect** seçin.
3. Dinleme portu istendiğinde `14550` değerini (veya dronda ayarladığınız **Telemetri Portu**nu) koruyun ve **OK** seçin.
4. Mission Planner parametreleri indirir ve dron haritada görünür.

![Mission Planner Uçuş Verisi görünümü UDP üzerinden bağlı: sağ üstteki bağlantı kutusunda UDP, UDP14550-1-QUADRO bağlantısı ve DISCONNECT düğmesi; HUD'da DISARMED, Unhealthy AHRS ve GPS: No Fix](https://docs.uavmatrix.com/tr/img/screenshots/gcs/mission-planner--connected.webp)

*Bağlandı. Sağ üstteki kutu UDP ve UDP14550-1-QUADRO bağlantısını gösteriyor; düğme artık DISCONNECT yazıyor. GPS olmayan bir tezgah kurulumu olduğu için HUD DISARMED, Unhealthy AHRS ve GPS: No Fix gösteriyor.*

## Videoyu HUD'da gösterin

1. HUD'a (yapay ufuk) sağ tıklayın ve **Video → Set GStreamer Source** seçin.

2. Bu pipeline'ı yapıştırın ve **OK** seçin:

   ```text
   udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
   ```

3. Video birkaç saniye içinde HUD arka planının yerini alır. Uçuş verileri üzerinde kalır.

*Mission Planner çizimi: HUD üzerindeki sağ tık menüsünde Video vurgulanmış ve alt menü öğesi Set GStreamer Source.*

*Çizim Mission Planner, sadeleştirilmiş. (1) HUD'a sağ tıklayın, (2) Video, (3) Set GStreamer Source, ardından pipeline'ı yapıştırın.*

Mission Planner, HUD için kendi GStreamer kopyasını kullanır; bu nedenle bunun için [Windows'ta GStreamer](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/gstreamer-windows/) bölümündeki ayrı kurulum gerekmez. Mission Planner GStreamer indirmeyi önerirse kabul edin.

Pipeline'ın sonunu tam gösterildiği gibi bırakın: Mission Planner resmi çizebilmek için `video/x-raw,format=BGRA ! appsink name=outsink` kısmına ihtiyaç duyar. Yalnızca portu değiştirin.

### Düşük gecikme

`rtpjitterbuffer`, geç gelen paketleri yumuşatır; bunun karşılığında yaklaşık 200 ms gecikme ekler. İyi bir bağlantıda bunu azaltabilirsiniz:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer latency=0 ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink sync=false
```

Zayıf bir 4G bağlantısında varsayılan jitter buffer'ı koruyun; görüntü daha az bozulur.

## Mission Planner'a Windows güvenlik duvarından izin verin

Mission Planner ağı ilk dinlediğinde Windows izin ister. **Private** ve **Public** ağlarda izin verin. ZeroTier veya Tailscale adaptörü genellikle **Public** olarak sınıflandırılır; yalnızca Private'ı işaretlemek VPN'i engeller.

İsteği kapattıysanız portları yönetici PowerShell'de açın:

```powershell
New-NetFirewallRule -DisplayName "UAVcast-Pro telemetry" -Direction Inbound -Protocol UDP -LocalPort 14550 -Action Allow
New-NetFirewallRule -DisplayName "UAVcast-Pro video" -Direction Inbound -Protocol UDP -LocalPort 5600-5602 -Action Allow
```

## İkinci kamera (çift akış)

[Çift akış](https://docs.uavmatrix.com/tr/uavcast-pro/camera/multi-camera/) açıkken kamera 2, **Video Portu (Kamera 2)** üzerine gider; varsayılan olarak `5601`. Mission Planner'ın HUD'u tek bir kaynak gösterir. Kamera 2'yi istediğinizde HUD kaynağını 5601 portuna çevirin veya kamera 2'yi ayrı bir GStreamer penceresinde izleyin: bkz. [Windows'ta GStreamer](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/gstreamer-windows/).

Ses (Video Portu + 2) Mission Planner tarafından yok sayılır. Sesi GStreamer ile oynatın.

## Sık karşılaşılan sorunlar

| Belirti | Neden ve çözüm |
| --- | --- |
| Wi-Fi üzerinden bağlanıyor, 4G'de hiçbir şey yok | Hedef LAN IP'sini kullanıyor. Bu PC'nin VPN IP'sini kullanın. |
| *No heartbeat packets received* | Dron bu PC'ye göndermiyor: yanlış IP, **Telemetriyi Etkinleştir** kapalı veya güvenlik duvarı UDP 14550'yi engelliyor. |
| Telemetri çalışıyor, HUD siyah kalıyor | Bu hedef için **Videoyu Etkinleştir** kapalı, kamera çalışmıyor veya UDP 5600 engelleniyor. [Windows'ta GStreamer](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/gstreamer-windows/) ile test edin. |
| Video donuyor veya gri lekelerle bozuluyor | Paket kaybı. Drondaki bit hızını düşürün ve **Akış Kurtarma Hızı** değerini 15–30 kare olarak ayarlayın. |
| Başka bir program açılınca video duruyor | Bir UDP portunu aynı anda yalnızca bir program dinleyebilir. 5600'ü de kullanan GStreamer penceresini veya QGroundControl'ü kapatın. |

Daha fazla kontrol için: [QGroundControl veya Mission Planner'da video yok](https://docs.uavmatrix.com/tr/troubleshooting/no-video-in-gcs/) ve [Yer kontrol istasyonunda telemetri yok](https://docs.uavmatrix.com/tr/troubleshooting/no-telemetry-in-gcs/).

Source: https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/mission-planner/
