# Özel GStreamer pipeline'ı

> RTSP IP kamera, termal kamera, H.265 veya test deseni yayınlamak için UAVcast-Pro'da özel bir GStreamer pipeline'ı kullanın; örnekler ve önizlemenin ile hedeflerin nasıl davrandığı.

UAVcast-Pro'nun yerleşik kamera desteği kameranızı kapsamadığında, UAVcast-Pro'ya kendi GStreamer pipeline'ınızı verin. Tipik durumlar: RTSP IP veya gimbal kamera, termal kamera, H.265 veya sabit bir adrese gönderim. UAVcast-Pro pipeline'ı kamera hizmeti olarak çalıştırır, başarısız olursa yeniden başlatır ve yine de canlı önizlemeyi ve kaydediciyi besleyebilir.

## Özel pipeline ayarlama

1. **Kamera → Kamera ayarları** sayfasına gidin.
2. **CAM 1** yuvasına tıklayın ve **Özel Pipeline Gir** seçeneğini seçin.
3. Pipeline'ı `gst-launch-1.0` önekini yazmadan **Özel Pipeline** alanına girin. (Öneki de yapıştırırsanız UAVcast-Pro bunu kaldırır.)
4. **Başlat** (veya **Yeniden Başlat**) seçeneğini seçin ve hatalar için **İşlem Kayıtları**'nı kontrol edin.

> **Özel pipeline, yer kontrol istasyonu listenizi yok sayar**
>
> Videonun nereye gideceğine pipeline karar verir. [Yer Kontrol İstasyonları](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/) sayfasındaki **Video Portu** ve **Videoyu Etkinleştir** ayarlarının hiçbir etkisi yoktur: yer kontrol istasyonunun adresini ve portunu pipeline içindeki `udpsink` öğesine yazın.

Pipeline'ı yapıştırmadan önce SSH üzerinden `gst-launch-1.0 -v <pipeline>` komutuyla test edin. Hata mesajları orada daha anlaşılırdır.

## Örnekler

```text
videotestsrc ! x264enc ! video/x-h264, stream-format=byte-stream ! rtph264pay ! udpsink host=192.168.0.100 port=5600
```

```text
rtspsrc location=rtsp://192.168.144.25:8554/main.264 latency=0 ! rtph264depay ! h264parse ! rtph264pay config-interval=1 pt=96 ! udpsink host=10.147.17.20 port=5600 sync=false
```

```text
v4l2src device=/dev/video0 ! video/x-raw,width=1280,height=720,framerate=30/1 ! videoconvert ! x264enc tune=zerolatency speed-preset=superfast bitrate=1500 key-int-max=30 ! h264parse config-interval=1 ! rtph264pay pt=96 ! udpsink host=10.147.17.20 port=5600 sync=false
```

```text
videotestsrc ! x264enc tune=zerolatency ! rtph264pay pt=96 ! multiudpsink clients=10.147.17.20:5600,10.147.17.21:5600
```

IP adreslerini yer kontrol istasyonlarınızın adresleriyle değiştirin (4G üzerinden VPN adresleri).

## Canlı önizleme ve kayıt

**Canlı Önizleme Etkinleştirilsin mi?** seçeneği işaretliyken UAVcast-Pro, pipeline'ınıza kodlanmış videoyu yerleşik medya sunucusuna gönderen bir dal ekler. Böylece önizleme, Uçuş Haritasındaki video penceresi ve kayıt çalışmaya devam eder. Doğru yeri otomatik bulur:

- Pipeline'ınızda `tee name=t` varsa, o tee'den bir dal ekler.
- Aksi halde akışı `rtph264pay` veya `rtph265pay` öncesinde ayırır.
- Tanınan bir ayrıştırıcısı olmayan RTSP kaynağı için pipeline'ı olduğu gibi bırakır ve önizleme olmaz.

En öngörülebilir sonuç için kodlanmış akışınızı `h264parse` ve bir `tee name=t` ile bitirin, kendi `udpsink` öğenizi de bu tee'nin bir dalına koyun.

## Sınırlar

- Çift akış, RC geçişi ve kameraya özel ayarlar özel pipeline için geçerli değildir. Pipeline, video kurulumunun tamamıdır.
- Çözünürlük, FPS, bit hızı ve çevirme ayarları pipeline tarafından belirlendiği için gizlenir.

Source: https://docs.uavmatrix.com/tr/uavcast-pro/camera/custom-pipeline/
