# Windows'ta GStreamer

> GStreamer'ı Windows'a kurun (MSVC 64-bit, Complete), PATH'e ekleyin ve UAVcast-Pro H.264 videosunu ve Opus sesini PowerShell veya cmd'de gst-launch-1.0 ile oynatın. Güvenlik duvarı ve çözümler.

GStreamer, UAVcast-Pro video akışını bir yer kontrol programına ihtiyaç duymadan kendi penceresinde oynatır. Videonun PC'ye ulaşıp ulaşmadığını test etmek, Mission Planner veya QGroundControl'ün yanında ikinci kamerayı izlemek ya da ses parçasını duymak için kullanın. Kurulumu yaklaşık beş dakika sürer.

## Başlamadan önce

Dronda, [Yer Kontrol İstasyonları](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/) bölümünde bu PC'nin IP adresiyle (`ipconfig` gösterir; 4G üzerinden VPN adresini kullanın) bir hedef ekleyin ve **Videoyu Etkinleştir** seçeneğini açın.

## 1. adım: GStreamer'ı kurun

1. [gstreamer.freedesktop.org/download](https://gstreamer.freedesktop.org/download/) adresine gidin ve **MSVC 64-bit** için Windows **runtime** kurucusunu indirin (development kurucusu veya MinGW değil).
2. Çalıştırın ve kurulum türü sorulduğunda **Complete** seçin.
3. Kurulum klasörünü not edin. Yeni kurucular `C:\Program Files\gstreamer\1.0\msvc_x86_64` klasörünü, eski olanlar `C:\gstreamer\1.0\msvc_x86_64` klasörünü kullanır.

> **Typical değil, Complete seçin**
>
> **Typical** kurulumu H.264 çözücüyü (`avdec_h264`) dışarıda bırakır. Bu durumda aşağıdaki komut *no element "avdec_h264"* hatasıyla başarısız olur. Kurucuyu yeniden çalıştırın ve **Complete** seçin.

## 2. adım: GStreamer'ı PATH'e ekleyin

`gst-launch-1.0` komutunu herhangi bir klasörden çalıştırabilmek için `bin` klasörünü kullanıcı PATH'inize ekleyin. PowerShell'de (yönetici hakları gerekmez), kurulum klasörünüzle birlikte:

```powershell
$bin = "C:\Program Files\gstreamer\1.0\msvc_x86_64\bin"
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
[Environment]::SetEnvironmentVariable("Path", "$userPath;$bin", "User")
```

Terminali kapatıp yeniden açın, ardından kontrol edin:

```powershell
gst-launch-1.0 --version
```

Ya da Windows ayarlarını kullanın: **Edit environment variables for your account** araması yapın, **Path** → **Edit** → **New** seçin ve `bin` klasörünü yapıştırın.

## 3. adım: Videoyu oynatın

**PowerShell**

```powershell
gst-launch-1.0 -v udpsrc port=5600 'caps=application/x-rtp,media=video,clock-rate=90000,encoding-name=H264,payload=96' ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

`caps=…` etrafındaki tek tırnakları koruyun: bunlar olmadan PowerShell değeri virgüllerden böler.

**Komut İstemi (cmd)**

```bat
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

İlk anahtar kare geldiğinde bir pencere açılır. Kapatın veya terminalde **Ctrl+C** tuşlarına basarak durdurun.

> **Ne görmelisiniz**
>
> 1. Terminal `Setting pipeline to PLAYING ...` yazdırır ve video bekler.
> 2. İlk paketler geldiğinde `-v`, `caps = application/x-rtp` içeren satırlar yazdırır.
> 3. Kamera görüntüsüyle bir video penceresi açılır.
>
> Adım 1'den sonra duruyorsa bu bilgisayara video ulaşmıyor demektir: aşağıdaki sorun giderme tablosuna bakın.

[Çift akış](https://docs.uavmatrix.com/tr/uavcast-pro/camera/multi-camera/) kapsamında kamera 2 için aynı komutu ikinci bir terminalde `port=5601` ile çalıştırın.

### Düşük gecikmeli varyant

İyi bir bağlantıda jitter buffer gecikmesini azaltın:

```powershell
gst-launch-1.0 udpsrc port=5600 'caps=application/x-rtp,media=video,clock-rate=90000,encoding-name=H264,payload=96' ! rtpjitterbuffer latency=0 ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

4G'de varsayılan jitter buffer'ı (ilk komut) koruyun; geç gelen paketleri gizler.

### Çift tıklama kısayolu

Bunu `uavcast-video.cmd` olarak masaüstüne kaydedin ve çift tıklayın:

```bat
@echo off
gst-launch-1.0 -v udpsrc port=5600 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, payload=(int)96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
pause
```

GStreamer PATH'te değilse ikinci satır olarak `cd /d "C:\Program Files\gstreamer\1.0\msvc_x86_64\bin"` ekleyin.

## Sesi dinleyin

Dronun **Kamera** sayfasında **Ses** ve **Sesi yer kontrol istasyonlarına gönder** seçeneklerini açın. Ses Video Portu + 2 üzerinden gelir:

```powershell
gst-launch-1.0 udpsrc port=5602 'caps=application/x-rtp,media=audio,encoding-name=OPUS,clock-rate=48000,payload=97' ! rtpjitterbuffer ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

## Güvenlik duvarından izin verin

`gst-launch-1.0` ilk kez dinlediğinde Windows, izin verip vermeyeceğinizi sorar. **Private** ve **Public** seçeneklerini işaretleyin (VPN adaptörleri genellikle Public olarak sınıflandırılır). Herhangi bir program için portları açmak amacıyla yönetici PowerShell'de:

```powershell
New-NetFirewallRule -DisplayName "UAVcast-Pro video and audio" -Direction Inbound -Protocol UDP -LocalPort 5600-5602 -Action Allow
```

## Sorun giderme

| Mesaj veya belirti | Çözüm |
| --- | --- |
| *'gst-launch-1.0' is not recognized…* | GStreamer PATH'te değil. 2. adımı uygulayın ve yeni bir terminal açın ya da komutu `bin` klasöründen çalıştırın. |
| *WARNING: erroneous pipeline: no element "avdec_h264"* | Typical kurulum. **Complete** ile yeniden kurun. |
| *no element "rtph264depay"* veya *"udpsrc"* | Aynı neden: eklenti setleri kurulmamış. **Complete** ile yeniden kurun. |
| Çalışıyor, ama pencere açılmıyor | Hiçbir şey gelmiyor. Dronda hedef IP'yi (4G üzerinden VPN IP'si), **Videoyu Etkinleştir** seçeneğini, kamerayı ve güvenlik duvarını kontrol edin. `-v` ile paketler geldiğinde `caps = application/x-rtp` içeren bir satır görünür. |
| *Could not get/set settings from/on resource* veya bağlama hatası | Başka bir program (Mission Planner, QGroundControl, ikinci bir GStreamer) bu portu zaten dinliyor. Kapatın. |
| Görüntü gri lekeler halinde bozuluyor veya donuyor | Paket kaybı. Drondaki bit hızını düşürün ve **Akış Kurtarma Hızı** değerini 15–30 kare olarak ayarlayın. |
| PowerShell'de *erroneous pipeline: could not parse caps* | `caps=…` etrafındaki tırnaklar eksik veya boşluklu çift tırnak. PowerShell komutunu gösterildiği gibi tam olarak kullanın. |

Linux veya Mac mi? [Linux'ta GStreamer](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/gstreamer-linux/) veya [macOS'ta GStreamer](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/gstreamer-macos/) sayfasına bakın.

Source: https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/gstreamer-windows/
