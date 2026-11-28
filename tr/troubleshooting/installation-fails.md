# Kurulum başarısız oluyor

> No installation candidate found veya failed dependencies gibi UAVcast-Pro yükleyici hatalarını düzeltin: 64 bit işletim sistemini, internet bağlantısını, diski ve yükleyici günlüğünü kontrol edin.

`curl -fsSL https://install.uavmatrix.com | sudo bash` komutunu çalıştırdınız ve bir hatayla durdu, takıldı veya çalışan bir web arayüzü olmadan bitti.

| Ne görürsünüz | Olası neden | Başlangıç |
| --- | --- | --- |
| No installation candidate for … found! | 32 bit işletim sistemi veya desteklenmeyen mimari | [Kontrol 1](https://docs.uavmatrix.com/tr/troubleshooting/installation-fails/#check-1) |
| Failed to update package lists, or Failed to install dependencies | İnternet yok veya bozuk bir apt kurulumu | [Kontrol 2](https://docs.uavmatrix.com/tr/troubleshooting/installation-fails/#check-2) |
| Bir Pi Zero 2 W üzerinde uzun süre takılıyor | Düşük bellek ve yavaş depolama | [Kontrol 3](https://docs.uavmatrix.com/tr/troubleshooting/installation-fails/#check-3) |
| Service failed to start | Kurulumdan sonra bir bileşen başlatılamadı | [Kontrol 4](https://docs.uavmatrix.com/tr/troubleshooting/installation-fails/#check-4) |

## Kontrol 1: 64 bit işletim sistemi

UAVcast-Pro v6, 64 bit işletim sistemi gerektirir: arm64 veya amd64 (x86 PC'ler). arm64 üzerinde Raspberry Pi dışındaki kartlar (Jetson ve diğer ARM kartları) için UAVcast-Pro 6.5.3 veya daha yenisi gerekir; eski yükleyiciler *Device is not a Raspberry Pi* mesajıyla durur.

```bash
dpkg --print-architecture   # must print arm64 or amd64
uname -m                    # aarch64 or x86_64
```

`armhf`, `armv7l` veya `i686` görürseniz 32 bit bir işletim sistemindesiniz. **Raspberry Pi OS (64-bit)** sürümünü Raspberry Pi Imager ile yazın ve kurulumu yeniden yapın. Desteklenen sistemler Raspberry Pi OS, Debian ve Ubuntu'dur; bkz. [Desteklenen donanım](https://docs.uavmatrix.com/tr/reference/supported-hardware/).

## Kontrol 2: İnternet ve apt

Yükleyici UAVcast-Pro ve sistem paketlerini indirir, ayrıca ZeroTier ve Tailscale'i kurar.

1. İnternet erişimini kontrol edin: `curl -I https://install.uavmatrix.com`.
2. `sudo apt update` komutunu elle çalıştırın ve gösterdiği hataları düzeltin; örneğin süresi dolmuş bir anahtara sahip üçüncü taraf bir depo gibi.
3. Yükleyiciyi yeniden çalıştırın. Birden fazla kez çalıştırmak güvenlidir.

## Kontrol 3: Düşük güçlü kartlar

Raspberry Pi Zero 2 W üzerinde kurulum, Pi 4 veya 5'e göre çok daha uzun sürer ve yükleyici bir süre tahmini gösterir. Bitmesini bekleyin. Hızlı bir SD kart ve kararlı bir güç kaynağı kullanın: kurulum sırasında düşük gerilim kaynaklı bir sıfırlama, yarım kalmış bir kurulum bırakır.

## Kontrol 4: Yükleyici günlüğünü okuyun

Yükleyici her şeyi `/opt/uavcast-pro/installer.log` dosyasına yazar.

```bash
sudo tail -n 100 /opt/uavcast-pro/installer.log
```

Son hata satırlarına bakın. Yükleyici `/opt/uavcast-pro` dizinini oluşturamadan başarısız olursa günlük `/tmp/uavcast-installer.log` dosyasındadır.

## Belirli bir sürümü kurun

Mimariniz için kullanılabilir sürümleri listelemek veya bunlardan birini kurmak için:

```bash
curl -fsSL https://install.uavmatrix.com | bash -s -- -l          # list versions
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2  # install 6.5.2
```

## Hâlâ başarısız mı?

`/opt/uavcast-pro/installer.log` dosyasını, `cat /etc/os-release` ve `dpkg --print-architecture` çıktılarını ve kart modelinizi **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresine gönderin.

İlgili: [UAVcast-Pro kurulumu](https://docs.uavmatrix.com/tr/get-started/installation/)

Source: https://docs.uavmatrix.com/tr/troubleshooting/installation-fails/
