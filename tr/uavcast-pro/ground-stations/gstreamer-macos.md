# macOS'ta GStreamer

> GStreamer'ı Homebrew veya resmi paketle bir Mac'e kurun; UAVcast-Pro H.264 drone videosunu ve Opus sesini gst-launch-1.0 ile oynatın, ayrıca macOS güvenlik duvarı istemini ele alın.

GStreamer, UAVcast-Pro video akışını Terminal'den bir pencerede oynatır. Video yolunu test etmek, QGroundControl'ün yanında ikinci kamerayı izlemek veya sesi duymak için kullanın. Apple silikon ve Intel Mac'lerde çalışır.

## Başlamadan önce

Dronda, [Yer Kontrol İstasyonları](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/) bölümünde bu Mac'in IP adresiyle (**Sistem Ayarları → Ağ**; 4G üzerinden VPN adresini kullanın) bir hedef ekleyin ve **Videoyu Etkinleştir** seçeneğini açın.

## GStreamer'ı kurun

**Homebrew**

```bash
brew install gstreamer
```

Homebrew formülü base, good, bad, ugly ve libav eklenti setlerini içerir; bu nedenle `avdec_h264` mevcuttur.

**Resmi paket**

1. macOS **runtime** paketini [gstreamer.freedesktop.org/download](https://gstreamer.freedesktop.org/download/) adresinden indirin ve kurun.

2. Terminal'de PATH'inize ekleyin:

   ```bash
   echo 'export PATH="/Library/Frameworks/GStreamer.framework/Versions/1.0/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

Kurulumu `gst-launch-1.0 --version` ile, H.264 çözücüyü `gst-inspect-1.0 avdec_h264` ile kontrol edin (elemanın ayrıntılarını yazdırır; *No such element or plugin* çıktısı eksik olduğu anlamına gelir).

## Videoyu oynatın

```bash
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

İlk kez macOS, `gst-launch-1.0`'ın gelen ağ bağlantılarını kabul edip edemeyeceğini sorar. **İzin Ver** seçin. İlk anahtar kare geldiğinde bir pencere açılır; durdurmak için Terminal'de **Ctrl+C**'ye basın.

> **Ne görmelisiniz**
>
> 1. Terminal `Setting pipeline to PLAYING ...` yazdırır ve video bekler.
> 2. İlk paketler geldiğinde `-v`, `caps = application/x-rtp` içeren satırlar yazdırır.
> 3. Kamera görüntüsüyle bir video penceresi açılır.
>
> Adım 1'den sonra duruyorsa bu bilgisayara video ulaşmıyor demektir: aşağıdaki sorun giderme tablosuna bakın.

- **Kamera 2** için [çift akış](https://docs.uavmatrix.com/tr/uavcast-pro/camera/multi-camera/) kapsamında komutu `port=5601` ile yeniden çalıştırın.
- İyi bir bağlantıda **daha düşük gecikme** için `rtpjitterbuffer` yerine `rtpjitterbuffer latency=0` kullanın.
- Paketler geliyor ama pencere görünmüyorsa `autovideosink` yerine `osxvideosink` kullanın.

## Sesi dinleyin

```bash
gst-launch-1.0 udpsrc port=5602 caps="application/x-rtp, media=(string)audio, clock-rate=(int)48000, encoding-name=(string)OPUS, payload=(int)97" ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

Ses için dronun **Kamera** sayfasında **Ses** ve **Sesi yer kontrol istasyonlarına gönder** seçeneklerinin açık olması gerekir.

## Sorun giderme

| Mesaj veya belirti | Çözüm |
| --- | --- |
| *command not found: gst-launch-1.0* | Homebrew: `brew doctor` çalıştırın. Resmi paket: framework `bin` klasörünü yukarıda gösterildiği gibi PATH'e ekleyin. |
| *no element "avdec_h264"* | libav eklentisi eksik. Homebrew ile yeniden kurun veya tam resmi runtime paketini kurun. |
| Çalışıyor, ama pencere yok | Hiçbir şey gelmiyor. Hedef IP'yi, **Videoyu Etkinleştir** seçeneğini ve gelen bağlantılara izin verdiğinizi kontrol edin (**Sistem Ayarları → Ağ → Güvenlik Duvarı → Seçenekler**). |
| Başlangıçta bağlama hatası | QGroundControl veya başka bir GStreamer bu portu zaten kullanıyor. Kapatın. |

Source: https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/gstreamer-macos/
