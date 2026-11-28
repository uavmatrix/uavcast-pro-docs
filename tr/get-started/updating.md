# UAVcast-Pro'yu güncelleyin

> UAVcast-Pro'yu web arayüzünden veya komut satırından güncelleyin, eski bir sürümü kurun; ayarlarınıza, sunucu portunuza ve kayıtlarınıza ne olduğunu öğrenin.

UAVcast-Pro'yu web arayüzünde **Uygulama → Uygulamayı Güncelle** bölümünden veya SSH üzerinden yükleyiciyi yeniden çalıştırarak güncelleyebilirsiniz. İkisi de ayarlarınızı, kullanıcılarınızı, lisansınızı ve kayıtlarınızı korur. Drone'un internet erişimi olmalı ve güncelleme bittiğinde yeniden başlatmanız gerekir.

> **Uçuştan önce asla güncellemeyin**
>
> Bir güncelleme, telemetri ve video dahil tüm UAVcast-Pro servislerini durdurur ve yeniden başlatma gerektirir. Güncellemeyi yerde, drone disarm edilmişken yapın.

## Web arayüzünden güncelleyin

1. **Uygulama** sayfasına gidin. **Uygulamayı Güncelle** kartı **Mevcut Sürüm** ve **En Son Sürüm** değerlerini gösterir. Daha yeni bir sürüm olduğunda yeşil bir *New version … available* şeridi belirir.
2. **Güncellenecek sürümü seçin** alanını en son sürümde bırakın veya başka bir sürüm seçin.
3. **Update to …** (veya **Şimdi Güncelle**) seçin. **Progress**, indirme ve kurulum adımlarını gösterir. Bu işlem birkaç dakika sürer; Pi Zero 2 W veya Pi 3'te daha uzun sürebilir.
4. **Yeniden Başlatma Bekliyor** şeridi göründüğünde **Şimdi Yeniden Başlat**'ı seçin. Cihaz yeniden başlar.
5. Web arayüzünü yeniden açın ve **Mevcut Sürüm** değerini kontrol edin.

![Mevcut ve en son sürümü, yeni sürüm mevcut şeridini ve Güncelle düğmesini gösteren Uygulamayı Güncelle kartı](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/application--update-available.webp)

*Uygulama → Uygulamayı Güncelle, daha yeni bir sürüm mevcutken.*

## Komut satırından güncelleyin

Yükleyiciyi yeniden çalıştırın. Program dosyalarını değiştirir ve veritabanını korur:

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
sudo reboot
```

Belirli bir sürümü kurmak için önce sürümleri listeleyin (root yetkisi gerekmez), ardından `-b` ile birini kurun:

```bash
# List the versions available for this device
curl -fsSL https://install.uavmatrix.com | bash -s -- -l

# Install a specific version
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.1
```

## Eski bir sürüme dönün

**Güncellenecek sürümü seçin** alanından eski sürümü seçip normal şekilde güncelleyin ya da komut satırında `-b` kullanın. Daha yeni bir sürümde yapılmış ayarlar eski sürümde bulunmayabilir.

## Güncelleme neyi korur, neyi değiştirir

| Korunanlar | Değiştirilenler |
| --- | --- |
| Ayar veritabanı (`/opt/uavcast-pro/uavcast.db`): yer kontrol istasyonları, kamera, modem, VPN, kullanıcılar, lisans | `/opt/uavcast-pro` içindeki program dosyaları (`build`, `dist`, `factory`, `install`) |
| Kayıtlar ve telemetri günlükleri | systemd servis dosyaları |
| ZeroTier ve Tailscale üyelikleri | UAVcast-Pro'nun bağlı olduğu sistem paketleri (apt tarafından güncellenir) |

UAVcast-Pro 6.5.3'ten itibaren, Uygulama sayfasında ayarlanan özel bir **Sunucu Portu** güncelleme yaptığınızda korunur. Önceki sürümler bunu 80'e sıfırlar: bu sürümlerden birinden güncelledikten sonra web arayüzünü 80 numaralı porttan açın ve portunuzu yeniden kaydedin.

## Neyin değiştiğini görün

Her sürüm, değişiklikleriyle birlikte [değişiklik günlüğünde](https://docs.uavmatrix.com/tr/reference/changelog/) listelenir. Operasyonel olarak uçan bir drone'u güncellemeden önce bunu okuyun.

Source: https://docs.uavmatrix.com/tr/get-started/updating/
