# Düşük voltaj ve throttling

> UAVcast-Pro Voltage too low veya Slowed down uyarısı mı veriyor? Pi, modem ve kamera için güç kaynağını boyutlandırın, ince kabloları ve soğutmayı düzeltin, sıfırlamaları durdurun.

Kontrol panelindeki **Power supply** satırı bir uyarı gösterir, modem düşer, uçuş kontrolcüsü bağlantısı sıfırlanır veya Pi uçuş sırasında yeniden başlar. Bir drone'da yetersiz güç kaynağı, herhangi bir yazılım ayarından daha fazla garip soruna yol açar.

![Sistem altındaki Power supply satırını gösteren kontrol paneli durum kartı, Stable yazıyor](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/dashboard--status-card.webp)

*Kontrol Paneli → durum kartı. Power supply satırı Sistem altındadır; burada Stable yazıyor. Uyarılar, aşağıda listelendiği gibi bu metnin yerini alır.*

| Power supply satırı | Anlamı |
| --- | --- |
| **Stable** | Önyüklemeden beri düşük voltaj veya throttling yok |
| **Voltage too low - use a stronger power supply** | Güç kaynağı voltajı, Pi'nin o anda ihtiyaç duyduğu değerin altında |
| **Voltage dropped since start-up** | Daha önce oldu, örneğin modem bağlandığında veya motorlar çalıştığında |
| **Slowed down (heat or power)** | CPU, ısıdan veya düşük voltajdan korunmak için daha yavaş çalışıyor |

Bu okumalar Raspberry Pi firmware'inden gelir, bu yüzden yalnızca Raspberry Pi üzerinde kullanılabilirler.

## Kontrol 1: Gücü üzerindeki her şeye göre boyutlandırın

Pi, modemi ve USB kamerayı USB portları üzerinden besler. 4G modem, bağlandığında ve sinyal zayıf olduğunda tepe akımını çeker.

1. Pi, modem, kamera ve aynı hattaki diğer her şeyin toplam akımının belirgin şekilde üzerinde derecelendirilmiş bir 5 V BEC veya regülatör kullanın. Resmi Raspberry Pi güç kaynağı belirtimleri her modelin ne gerektirdiğini listeler.
2. Pi'yi hiçbir zaman uçuş kontrolcüsünün TELEM veya USB portundan beslemeyin.
3. Modem, Pi'nin üzerinden aktarabileceğinden fazla akım çekiyorsa, modemi doğrudan regülatörden, güçlü bir USB hub üzerinden veya ayrı güç beslemeli bir USB kablosuyla besleyin.

## Kontrol 2: Kablolar ve konektörler

İnce veya uzun kablolar yük altında voltaj kaybeder. Kısa ve kalın güç kabloları ile modem için iyi bir USB kablosu kullanın. Telefon şarj cihazı için uygun bir kablo bile tepe akımda düşük voltaja neden olabilir.

## Kontrol 3: Isı

**System Information** altındaki **Temperature**, CPU sıcaklığını gösterir. Güneşte kapalı bir gövde içinde video kodlaması yapan bir Pi ısınır. Bir ısı emici veya küçük bir fan ekleyin ve muhafazaya hava akışı sağlayın. Pi 5, sürekli kodlama için aktif soğutma gerektirir.

## Kontrol 4: Düzeltmeden sonra kontrol edin

**Voltage dropped since start-up** durumu bir sonraki önyüklemeye kadar kalır. Yeniden başlatın, tezgâhta tipik bir görev çalıştırın (modem bağlı, kamera yayında) ve **Power supply** satırının **Stable** olarak kaldığını doğrulayın.

## Hâlâ uyarı görüyor musunuz?

Günlük paketi, `diagnostics.txt` içinde çekirdekten gelen güç ve USB olaylarını içerir. [Günlükleri indirin](https://docs.uavmatrix.com/tr/troubleshooting/collect-logs/) ve güç kablolamanızın bir fotoğrafını ekleyerek **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresine gönderin.

İlgili: [Donanım gereksinimleri](https://docs.uavmatrix.com/tr/get-started/hardware-requirements/) · [Kontrol Paneli](https://docs.uavmatrix.com/tr/uavcast-pro/dashboard/)

Source: https://docs.uavmatrix.com/tr/troubleshooting/undervoltage-and-throttling/
