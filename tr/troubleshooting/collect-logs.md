# Destek için günlükleri toplayın

> UAVcast-Pro günlük arşivini, Uygulama bölümündeki Günlük Kaydı'ndan veya SSH üzerinden diagnostics.txt dosyasıyla birlikte indirin ve doğru bilgilerle UAVmatrix desteğine gönderin.

Tek bir günlük indirmesi, destek ekibinin soracağı soruların çoğunu yanıtlar. Her arşiv, seçtiğiniz servis günlüklerine ek olarak bir `diagnostics.txt` anlık görüntüsü içerir: sürüm, işletim sistemi ve kart, ayarlar, oluşturulan telemetri yönlendirici yapılandırması, seri aygıtlar ve bunları kimin kullandığı, ayrıca çekirdekten gelen güç ve USB olayları. Parolalar, anahtarlar ve token'lar hiçbir zaman dahil edilmez.

## Web arayüzünden indirin

1. **Uygulama** sayfasına gidin ve **Günlük Kaydı** bölümüne kaydırın.
2. İlk listede **Tüm Günlükler** seçili kalsın veya sorunla eşleşen servisi seçin (aşağıdaki tabloya bakın).
3. İkinci listede sorunu kapsayan bir zaman aralığı seçin. Varsayılan değer **Son 2 saat**'tir.
4. **İndir** düğmesine basın. Tarayıcınız bir `.zip` dosyası kaydeder.

![Günlük listesi Tüm Günlükler, zaman aralığı Son 2 saat olarak ayarlanmış ve İndir düğmesinin bulunduğu Uygulama sayfasındaki Günlük Kaydı kartı](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/application--logging.webp)

*Uygulama → Günlük Kaydı; Tüm Günlükler ve Son 2 saat seçili.*

| Sorun | Günlük listesinden seçin |
| --- | --- |
| Uçuş kontrolcüsü bağlantısı, heartbeat yok, telemetri yok | **Mavlink Yöneticisi** |
| Kamera, video, önizleme | **Kamera Sunucusu** |
| Modem, hücresel | **Modem Yöneticisi** |
| ZeroTier, Tailscale | **VPN Yöneticisi** |
| RTK, NTRIP | **NTRIP İstemcisi** |
| Lisans | **Lisans Yöneticisi** |
| Dinamik DNS | **DNS Yöneticisi** |
| Kurulum | **Uygulama Yükleyici** |
| Emin değilseniz | **Tüm Günlükler** |

Yalnızca yöneticiler günlük indirebilir. **Tüm Günlükleri Temizle** tüm günlük dosyalarını siler ve geri alınamaz; bu yüzden önce indirin.

## Komut satırından

Web arayüzü açılmıyorsa günlükleri SSH üzerinden toplayın:

```bash
sudo tar czf ~/uavcast-logs.tar.gz /opt/uavcast-pro/logs /opt/uavcast-pro/installer.log
journalctl -u uavcast-web -u uavcast-factory -u mavlink-manager -u uavcast-camera --since "2 hours ago" > ~/uavcast-journal.txt
```

Her iki dosyayı da bilgisayarınıza kopyalayın, örneğin `scp` ile.

## Desteğe gönderin

**[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresine e-posta gönderin ve şunları ekleyin:

- günlük arşivini,
- UAVcast-Pro sürümünüzü (kenar çubuğunun altında gösterilir),
- kullandığınız kartı, işletim sistemini, uçuş kontrolcüsünü, kamerayı ve modemi,
- ne beklediğinizi, ne olduğunu ve bu sayfalardan neleri denediğinizi.

[UAVmatrix Discord](https://discord.gg/xwqMTXh) üzerinden de soru sorabilirsiniz. Günlük dosyalarını herkese açık olarak paylaşmayın: IP adresleri ve aygıt adları içerirler.

İlgili: [Uygulama ayarları](https://docs.uavmatrix.com/tr/uavcast-pro/application-settings/)

Source: https://docs.uavmatrix.com/tr/troubleshooting/collect-logs/
