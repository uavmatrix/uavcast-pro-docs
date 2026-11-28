# Kamera algılanmıyor

> UAVcast-Pro 'No cameras available' mesajını mı gösteriyor? CSI şerit kablosunu, rpicam-hello komutunu, Ubuntu'da kamera desteğini ve USB kameralar için v4l2-ctl komutunu kontrol edin.

**Kamera → Kamera ayarları** sayfasında **Kamera Seç** alanında **No cameras available** yazıyorsa, istediğiniz kamera listede yoksa veya **İşlem Kayıtları** içinde *No camera detected* yazıyorsa bu sayfayı izleyin.

| Ne görürsünüz | Olası neden | Başlangıç |
| --- | --- | --- |
| Bir Raspberry Pi CSI kamerası (şerit kablo) eksik | Kablo, konektör veya kamera yığını | [Kontrol 1](https://docs.uavmatrix.com/tr/troubleshooting/camera-not-detected/#check-1) |
| Ubuntu üzerinde CSI kamera | Ubuntu varsayılan olarak Raspberry Pi kamera yığınını içermez | [Kontrol 2](https://docs.uavmatrix.com/tr/troubleshooting/camera-not-detected/#check-2) |
| USB kamera eksik | Linux tarafından görülmüyor veya bir video yakalama aygıtı değil | [Kontrol 3](https://docs.uavmatrix.com/tr/troubleshooting/camera-not-detected/#check-3) |
| Kamera listeleniyor ama video hiç başlamıyor | Desteklenmeyen çözünürlük veya kamerayı başka bir program kullanıyor | [Kontrol 4](https://docs.uavmatrix.com/tr/troubleshooting/camera-not-detected/#check-4) |

## Kontrol 1: Raspberry Pi CSI kamerası

1. Pi'yi kapatın. Şerit kabloyu iki ucundan da, kontaklar doğru yöne bakacak şekilde yeniden takın ve konektör kilitlerini kapatın. Pi 5 ve Pi Zero 2 W, daha dar olan 22 pinli kabloyu gerektirir.

2. Pi'yi açın ve Pi üzerinde şunu çalıştırın:

   ```bash
   rpicam-hello --list-cameras
   ```

   Eski Raspberry Pi OS sürümlerinde komut `libcamera-hello --list-cameras` şeklindedir.

3. Kamera burada listelenmiyorsa Linux onu göremiyor demektir. UAVcast-Pro'da bir şeyi değiştirmeden önce başka bir kablo veya kamera deneyin.

4. Listeleniyorsa, Kamera sayfasındaki **Yeniden Başlat** düğmesiyle kamerayı yeniden başlatın (ya da **Durdur**, ardından **Başlat**) ve **Kamera Seç** alanını yeniden açın. Her CSI kamera ayrı bir girdi olarak görünür, örneğin *CSI Camera 0 - imx708 (libcamera)*.

> **İki CSI kamera**
>
> İki kamera için kamera sürücüsünün daha fazla belleğe ihtiyacı vardır. v6.2.2 sürümünden itibaren kurulum programı, çoklu kamera kurulumları için `config.txt` dosyasındaki CMA belleğini otomatik olarak artırır. İkinci kamerayı sonradan eklediyseniz kurulumdan sonra yeniden başlatın.

## Kontrol 2: Ubuntu veya Debian üzerinde CSI kamera

UAVcast-Pro, CSI kameralar için `rpicam-vid` kullanır. Kurulum programı, Raspberry Pi OS ve Debian üzerinde `rpicam-apps` (veya `rpicam-apps-core`) paketini kurar. Ubuntu'da Raspberry Pi kamera yığını paketlenmez ve günlükte *CSI camera not available: Ubuntu requires building libcamera from source. USB cameras are supported.* mesajı görünür.

CSI kameraya ihtiyacınız varsa 64 bit Raspberry Pi OS kullanın; Ubuntu kullanıyorsanız USB kamera kullanın.

## Kontrol 3: USB kamera

1. Kamerayı, güç almayan bir hub üzerinden değil, doğrudan eş bilgisayara takın.

2. Şunu çalıştırın:

   ```bash
   v4l2-ctl --list-devices
   ```

3. Kamera eksikse Linux onu görmüyor demektir. `lsusb` ile kontrol edin ve başka bir port ile kablo deneyin.

4. Listeleniyorsa, Kamera sayfasındaki **Yeniden Başlat** düğmesiyle kamerayı yeniden başlatın ve **Kamera Seç** alanını yeniden açın.

Çoğu UVC web kamerası çalışır; örneğin Logitech C920 ve C615. Kodlayıcının kabul etmediği bir formatta çıkış veren kameralar veya video yakalama aygıtı olmayan cihazlar (bazı yakalama kartları gibi) listelenmez.

## Kontrol 4: Listeleniyor, ancak video başlamıyor

- Günlükte *Camera … does not support …x… - streaming at …x… instead* yazıyorsa, **Çözünürlük** alanından kameranın desteklediği bir çözünürlük seçin.
- Kamerayı kullanan diğer programları kapatın. Aynı anda yalnızca bir program kamerayı açabilir.
- **Kamera Etkinleştirilsin mi?** alanında *Insufficient permissions* görüyorsanız v6.5.2 veya daha yeni bir sürüme güncelleyin; bu sorun o sürümde giderildi.

## Hâlâ algılanmıyor mu?

**Tüm Günlükler** seçili olarak [günlükleri indirin](https://docs.uavmatrix.com/tr/troubleshooting/collect-logs/), `rpicam-hello --list-cameras` veya `v4l2-ctl --list-devices` çıktısını ekleyin ve hepsini **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresine gönderin.

İlgili: [Kamera ayarları](https://docs.uavmatrix.com/tr/uavcast-pro/camera/) · [Desteklenen donanım](https://docs.uavmatrix.com/tr/reference/supported-hardware/)

Source: https://docs.uavmatrix.com/tr/troubleshooting/camera-not-detected/
