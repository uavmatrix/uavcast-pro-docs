# Web arayüzü açılmıyor

> Kurulumdan sonra http://device-ip adresinde UAVcast-Pro açılmıyor mu? Doğru adresi bulun, uavcast-web servisini, sunucu portunu ve 80 numaralı portu kontrol edin.

Kurulum programı tamamlandı, ancak `http://<device-ip>/` zaman aşımına uğruyor, bağlantıyı reddediyor veya başka bir programın sayfasını gösteriyor.

| Ne görürsünüz | Olası neden | Başlangıç |
| --- | --- | --- |
| Zaman aşımı veya sayfa hiç yüklenmiyor | Yanlış adres veya bilgisayarınız başka bir ağda | [Kontrol 1](https://docs.uavmatrix.com/tr/troubleshooting/web-interface-wont-open/#check-1) |
| Bağlantı reddedildi | Web servisi çalışmıyor | [Kontrol 2](https://docs.uavmatrix.com/tr/troubleshooting/web-interface-wont-open/#check-2) |
| Başka bir web sayfası, örneğin nginx veya Apache | Başka bir şey 80 numaralı portu kullanıyor | [Kontrol 3](https://docs.uavmatrix.com/tr/troubleshooting/web-interface-wont-open/#check-3) |
| Daha önce çalışıyordu, bir ayar değişikliğinden sonra durdu | Sunucu portu değiştirildi | [Kontrol 4](https://docs.uavmatrix.com/tr/troubleshooting/web-interface-wont-open/#check-4) |
| Yükleniyor, ama her sayfa Uygulama bölümüne yönleniyor | Cihazda henüz etkin bir lisans yok | [Kontrol 5](https://docs.uavmatrix.com/tr/troubleshooting/web-interface-wont-open/#check-5) |

## Kontrol 1: Doğru adresi kullanın

Web arayüzü varsayılan olarak **80 numaralı portta** çalışır; adres bu yüzden yalnızca `http://<device-ip>/` olur.

1. Cihazın IP adresini bulun. Kurulum programı sonunda yazdırır. Cihazda `hostname -I` komutunu da çalıştırabilirsiniz.
2. Varsayılan ana bilgisayar adına sahip bir Raspberry Pi'de `http://raspberrypi.local/` adresini deneyin.
3. `http://` kullanın, `https://` değil. Web arayüzü HTTPS sunmaz.
4. Bilgisayarınızın cihazla aynı ağda veya aynı VPN'de olduğundan emin olun. 4G üzerinden bağlanıyorsanız drone'un VPN adresini kullanmalısınız.

## Kontrol 2: Web servisi çalışıyor mu?

Cihazda şu komutu çalıştırın:

```bash
sudo systemctl status uavcast-web
```

**active (running)** yazmalıdır. Değilse, servisi başlatın ve neden durduğunu okuyun:

```bash
sudo systemctl restart uavcast-web
journalctl -u uavcast-web --since "1 hour ago"
```

Web arayüzü arka plan servislerine de ihtiyaç duyar. Bunları aynı şekilde kontrol edin: `uavcast-factory`, `mavlink-manager`, `uavcast-camera` ve `redis-server`. Tam liste [Servisler ve dosyalar](https://docs.uavmatrix.com/tr/reference/services-and-files/) sayfasındadır.

## Kontrol 3: 80 numaralı port zaten kullanımda

Cihaza başka bir web sunucusu kuruluysa, 80 numaralı portu tutuyor olabilir. Kimin dinlediğini öğrenin:

```bash
sudo ss -ltnp | grep ':80 '
```

Diğer sunucuyu durdurun ve devre dışı bırakın (örneğin `sudo systemctl disable --now nginx`), ardından `uavcast-web` servisini yeniden başlatın.

## Kontrol 4: Sunucu portu değiştirildi

**Uygulama → Ayarlar → Sunucu Portu** web arayüzünü başka bir porta taşır ve adres `http://<device-ip>:<port>/` olur. Portu hatırlamıyorsanız, cihazda şu komutla okuyun:

```bash
grep SERVER_PORT /etc/systemd/system/uavcast-web.service
```

## Kontrol 5: Her sayfa Uygulama bölümüne gidiyor

Cihazda lisans etkinleşene kadar bu beklenen bir davranıştır. **Uygulama → Lisans Yöneticisi** altında lisansı etkinleştirin. Bu başarısız olursa, [lisans etkinleştirilemiyor](https://docs.uavmatrix.com/tr/troubleshooting/license-activation-failed/) sayfasına bakın.

## Kontrol 6: Kurulum tamamlanmadı

`uavcast-web` yoksa (`Unit uavcast-web.service could not be found`), kurulum erken durmuştur. Bkz. [Kurulum başarısız](https://docs.uavmatrix.com/tr/troubleshooting/installation-fails/).

## Hâlâ bir sonuç yok mu?

`systemctl status uavcast-web` ve `journalctl -u uavcast-web --since yesterday` çıktılarını ve `/opt/uavcast-pro/installer.log` dosyasını **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresine gönderin.

İlgili: [UAVcast-Pro'yu kurun](https://docs.uavmatrix.com/tr/get-started/installation/) · [Uygulama ayarları](https://docs.uavmatrix.com/tr/uavcast-pro/application-settings/)

Source: https://docs.uavmatrix.com/tr/troubleshooting/web-interface-wont-open/
