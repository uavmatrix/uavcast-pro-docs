# Servisler, dosyalar ve yükleyici seçenekleri

> UAVcast-Pro'nun kurduğu systemd servisleri, veritabanı, günlük ve kayıtlarının tutulduğu yerler, sürüm seçenekleri için yükleyici seçenekleri ve kullanışlı SSH komutları.

Cihazda SSH üzerinden çalışırken kullanılacak bilgiler: UAVcast-Pro'yu oluşturan servisler, dosyalarının konumları ve belirli bir sürümün nasıl kurulacağı.

## Servisler

UAVcast-Pro, bir dizi systemd servisi olarak çalışır. Her servis başarısız olursa kendini yeniden başlatır.

| Servis | Görevi |
| --- | --- |
| `uavcast-web` | Web arayüzü (Node.js). **Sunucu Portu** değiştirilmediyse 80 numaralı portu dinler. |
| `uavcast-factory` | Arka plan API'si: lisans, modem, VPN, ağ, günlükler, kayıt depolama ve Fleet Manager bağlantısı. |
| `mavlink-manager` | Uçuş kontrolcüsü bağlantısı ve yer kontrol istasyonlarına telemetri yönlendiricisi. İnternet beklemeden başlar. |
| `uavcast-camera` | Kamera yakalama, H.264 kodlama ve UDP video akışı. İnternet beklemeden başlar. |
| `mediamtx` | Tarayıcı önizlemesi, RTSP ve kayıtlar için medya sunucusu. |
| `uavcast-ntrip` | RTK düzeltmeleri için NTRIP istemcisi. |
| `uavcast-dns` | Dinamik DNS güncelleyici. |
| `redis-server` | Diğer servislerin bağlı olduğu dahili mesaj veri yolu. |
| `zerotier-one`, `tailscaled` | UAVcast-Pro yükleyicisi tarafından kurulan VPN istemcileri. |

Kullanışlı komutlar:

```bash
sudo systemctl status uavcast-web            # çalışıyor mu?
sudo systemctl restart uavcast-camera        # tek bir servisi yeniden başlat
journalctl -u mavlink-manager -f             # bir servisin günlüğünü canlı izle
journalctl -u uavcast-web --since yesterday  # yakın geçmişi oku
```

## Dosyalar ve klasörler

Her şey `/opt/uavcast-pro` altında bulunur.

| Yol | İçerik |
| --- | --- |
| `/opt/uavcast-pro/uavcast.db` | Ayar veritabanı (SQLite). **Uygulama → Veritabanı → Veritabanını Yedekle** ile yedekleyin. |
| `/opt/uavcast-pro/logs/` | Servis günlükleri; otomatik olarak döndürülür. **Uygulama → Günlük Kaydı** üzerinden indirin. |
| `/opt/uavcast-pro/recordings/` | Dahili depolamadaki kamera kayıtları ve telemetri günlükleri (**Depolama konumu** bir USB sürücüsüne veya başka bir klasöre işaret etmiyorsa). |
| `/opt/uavcast-pro/missions/` | Kaydedilmiş görevler. |
| `/opt/uavcast-pro/installer.log` | Son kurulumun günlüğü. |
| `/etc/systemd/system/uavcast-web.service` | `SERVER_PORT` dahil web arayüzü servisi. |

## Yükleyici seçenekleri

Yükleyici tek bir komuttur. Bir kurulumu onarmak veya güncellemek için istediğiniz zaman yeniden çalıştırabilirsiniz.

```bash
# En son sürümü kur veya güncelle
curl -fsSL https://install.uavmatrix.com | sudo bash

# Bu cihazın mimarisi için kullanılabilir sürümleri listele
curl -fsSL https://install.uavmatrix.com | bash -s -- -l

# Belirli bir sürümü kur
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2
```

| Seçenek | Anlamı |
| --- | --- |
| `-l` | Bu mimari (arm64 veya amd64) için kullanılabilir sürümleri listeler. |
| `-b <version>` | En son yerine bu sürümü kurar. |

Yükleyici mimariyi ve işletim sistemini algılar; sistem paketlerini, ZeroTier'ı, Tailscale'i ve kamera paketlerini kurar; Raspberry Pi UART'ını yapılandırır, servisleri ayarlar ve web arayüzünü başlatır. Günlüğü `/opt/uavcast-pro/installer.log` dosyasındadır.

Güncellemeyi web arayüzünden de yapabilirsiniz: **Uygulama → Uygulamayı Güncelle** bölümüne gidin, **Güncellenecek sürümü seçin** alanından bir sürüm seçin, ardından **Şimdi Güncelle** düğmesine tıklayın.

## Entegrasyon noktaları

UAVcast-Pro'nun herkese açık bir REST API'si yoktur. Onunla entegre olmak için şunları kullanabilirsiniz:

- Her yer kontrol istasyonu hedefine **UDP üzerinden MAVLink** (varsayılan olarak 14550 numaralı port); MAVLink destekleyen herhangi bir yazılım için.
- Drone'dan RTP/UDP (5600 numaralı port) veya RTSP (8554 numaralı port) üzerinden **video**. Bkz. [VLC ve RTSP](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/vlc-and-rtsp/).
- Kendi sensör değerlerinizi HTTP, UDP veya seri üzerinden MAVLink akışına göndermek için **enjektörler**. Bkz. [Enjektörler](https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/injectors/).

Source: https://docs.uavmatrix.com/tr/reference/services-and-files/
