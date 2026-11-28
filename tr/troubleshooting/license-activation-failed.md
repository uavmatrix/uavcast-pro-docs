# UAVcast-Pro lisansı etkinleşmiyor

> UAVcast-Pro'da Invalid license key, Maximum activations reached ve License activation failed hatalarını düzeltin: anahtar, internet, boş yuvalar ve değiştirilen donanım.

Anahtarı **Uygulama → Lisans Yöneticisi** bölümüne girip **Doğrula** düğmesine basıyorsunuz ve **Lisans başarıyla etkinleştirildi** yerine bir hata alıyorsunuz. Bu cihazda etkin bir lisans olana kadar her sayfa sizi **Uygulama** bölümüne geri gönderir.

> Drone'u etkinleştirmek için bir UAVcast-Pro lisansına ihtiyacınız var. UAVmatrix mağazasından satın alın.
>
> [UAVcast-Pro satın al](https://uavmatrix.com/tr/checkout) · [Planları ve fiyatları gör](https://uavmatrix.com/tr/products)

![Lisans anahtarı alanı, Lisans Ayrıntıları ve Aktif Cihazlar tablosu bulunan Uygulama sayfasındaki Lisans Yöneticisi](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/application--license-activated.webp)

*Uygulama → Lisans Yöneticisi, etkinleştirilmiş bir cihazda: Lisans Detayları ve Aktif Cihazlar tablosu; bu cihaz Current olarak işaretli.*

| Ne görürsünüz | Olası neden | Başlangıç |
| --- | --- | --- |
| Invalid license key veya Invalid license key format | Yazım hatası, fazla boşluk veya başka bir ürüne ait anahtar | [Kontrol 1](https://docs.uavmatrix.com/tr/troubleshooting/license-activation-failed/#check-1) |
| Maximum activations reached | Anahtardaki tüm cihaz yuvaları kullanımda | [Kontrol 2](https://docs.uavmatrix.com/tr/troubleshooting/license-activation-failed/#check-2) |
| Yeni SD karttan veya yeni karttan sonra yeniden istiyor | Cihaz yeni bir cihaz olarak sayılıyor | [Kontrol 3](https://docs.uavmatrix.com/tr/troubleshooting/license-activation-failed/#check-3) |
| License activation failed veya hiçbir şey olmuyor | İnternet yok veya cihazda saat yanlış | [Kontrol 4](https://docs.uavmatrix.com/tr/troubleshooting/license-activation-failed/#check-4) |
| Cannot connect to license service | UAVcast-Pro arka plan servisi çalışmıyor | [Kontrol 5](https://docs.uavmatrix.com/tr/troubleshooting/license-activation-failed/#check-5) |
| Lisans Durumu: Expired | Süreli bir lisansın süresi doldu | [Kontrol 6](https://docs.uavmatrix.com/tr/troubleshooting/license-activation-failed/#check-6) |

## Kontrol 1: Anahtarın kendisi

1. Anahtarı sipariş e-postanızdan veya [uavmatrix.com](https://uavmatrix.com/) üzerindeki hesabınızdan kopyalayıp **Lisans Anahtarı** alanına yapıştırın. Anahtarı elle yazmak hataların en yaygın kaynağıdır.
2. Anahtarın önünde veya sonunda boşluk olmadığından emin olun.
3. **Doğrula** düğmesine basın.

## Kontrol 2: Bir cihaz yuvası açın

Her lisans sabit sayıda cihaza izin verir (**İzin Verilen Cihazlar**). **Kalan Cihazlar** 0 olduğunda etkinleştirme **Maximum activations reached. Please deactivate another device first or upgrade your license.** hatasıyla başarısız olur.

1. Lisansın etkin olduğu herhangi bir cihazda **Uygulama → Lisans Yöneticisi → Aktif Cihazlar** bölümünü açın.
2. Artık kullanmadığınız cihazı bulun ve **Kaydı Sil** düğmesine basın. Yuva hemen serbest kalır.
3. Yeni cihazı etkinleştirin.

Etkinleştirilmiş hiçbir cihaza ulaşamazsanız, lisans anahtarıyla **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresine yazın; yuvayı açabilirler. Yuva eklemek için [uavmatrix.com](https://uavmatrix.com/) üzerinden lisansınıza daha fazla cihaz satın alın.

## Kontrol 3: SD kartı veya kartı değiştirdiniz

Lisans donanıma bağlıdır; depolama aygıtı dahil. Yeni bir SD kart, yeni bir SSD veya yeni bir kart yeni cihaz sayılır ve yeni bir yuva kullanır. Taşımadan önce veya sonra, kontrol 2'deki gibi **Aktif Cihazlar** içindeki eski kaydı **Kaydı Sil** ile kaldırın. **License already activated on this device** bir hata değildir: anahtar zaten bu cihazda etkindi.

## Kontrol 4: İnternet erişimi ve saat

Etkinleştirme, UAVmatrix lisans sunucusuyla HTTPS (443 portu) üzerinden iletişim kurar; bu nedenle cihazın o anda çalışan bir internet bağlantısına ihtiyacı vardır.

1. Cihazda `curl -I https://uavmatrix.com` komutunu çalıştırın. Zaman aşımı değil, bir HTTP yanıtı almalısınız.
2. Hücresel modem kullanıyorsanız internetinin gerçekten çalıştığını kontrol edin: [Modem bağlı, ancak internet yok](https://docs.uavmatrix.com/tr/troubleshooting/modem-no-internet/).
3. Tarihi `date` komutuyla kontrol edin. Yanlış saate sahip bir cihaz HTTPS bağlantısı açamaz. Gerçek zaman saati olmayan kartlar saati açılıştan sonra internetten alır; bu nedenle açıldıktan sonra bir dakika bekleyip yeniden deneyin.

## Kontrol 5: Lisans servisine bağlanılamıyor

Bu mesaj, web arayüzünün internete değil, UAVcast-Pro'nun kendi arka plan servisine ulaşamadığı anlamına gelir. Servisi yeniden başlatın ve tekrar deneyin:

```bash
sudo systemctl restart uavcast-factory
sudo systemctl status uavcast-factory
```

Servis **active (running)** durumunda kalmazsa, **Lisans Yöneticisi** seçiliyken [günlükleri toplayın](https://docs.uavmatrix.com/tr/troubleshooting/collect-logs/).

## Kontrol 6: Süresi dolmuş lisans

Lisans ayrıntılarında **Lisans Durumu:** ve **Bitiş Tarihi:** alanları görünür. Süresi dolmuş bir lisansın [uavmatrix.com](https://uavmatrix.com/) üzerinden yenilenmesi gerekir.

> **64 bit işletim sistemi**
>
> UAVcast-Pro v6 yalnızca 64 bit işletim sistemi üzerinde çalışır. Buraya kadar geldiyseniz işletim sistemi uygundur; 32 bit işletim sisteminde yükleyici zaten *No installation candidate* hatasıyla durur.

## Hâlâ başarısız mı?

**Lisans Yöneticisi** seçiliyken [günlükleri indirin](https://docs.uavmatrix.com/tr/troubleshooting/collect-logs/). Günlükler, lisans sunucusundan gelen yanıt kodunu içerir; örneğin boş yuva olmadığında `code 550`. Bunları anahtarınızın ilk ve son dört karakteriyle birlikte **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresine gönderin.

Fleet Manager kullanıyorsanız, sorunsuz etkinleşen bir lisans eşleştirme sırasında yine de reddedilebilir. Bkz. [Eşleştirme kodu geçersiz veya süresi dolmuş](https://docs.uavmatrix.com/tr/troubleshooting/pairing-code-invalid/).

İlgili: [Lisansınızı etkinleştirin](https://docs.uavmatrix.com/tr/get-started/license-activation/)

Source: https://docs.uavmatrix.com/tr/troubleshooting/license-activation-failed/
