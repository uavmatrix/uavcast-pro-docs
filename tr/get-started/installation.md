# UAVcast-Pro'yu kurun

> 64 bit Raspberry Pi OS, Debian veya Ubuntu sisteminde (arm64 veya amd64) UAVcast-Pro'yu tek komutla kurun, ardından web arayüzünü açıp bir yönetici kullanıcısı oluşturun.

Tek komutla kurulum

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
```

Bunu yardımcı bilgisayarda çalıştırın (internet bağlantılı 64 bit Raspberry Pi OS, Debian veya Ubuntu). Aşağıdaki adımlar ne yaptığını ve cihazı nasıl hazırlayacağınızı açıklar.

> Drone'u etkinleştirmek için bir UAVcast-Pro lisansına ihtiyacınız var. UAVmatrix mağazasından satın alın.
>
> [UAVcast-Pro satın al](https://uavmatrix.com/tr/checkout) · [Planları ve fiyatları gör](https://uavmatrix.com/tr/products)

UAVcast-Pro, 64 bit Debian tabanlı herhangi bir Linux sistemine (Raspberry Pi OS, Debian veya Ubuntu; arm64 veya amd64) tek komutla kurulur. Yükleyici en son sürümü indirir, bağımlılıklarını ve servislerini kurar, işlem bittiğinde web arayüzünün adresini yazdırır. Yaklaşık 10 dakika sürer; Raspberry Pi Zero 2 W, 2 veya 3 üzerinde yaklaşık 30 dakika.

## Başlamadan önce

- Eşlik eden bilgisayarda 64 bit bir işletim sistemi. `uname -m` ile kontrol edin: `aarch64` veya `x86_64` yazmalıdır.
- Kök diskte en az 500 MB boş alan (`df -h /`).
- Kurulum sırasında cihazda internet erişimi.
- Cihaza SSH ya da klavye ve ekran ile erişim ve `sudo` yetkisine sahip bir kullanıcı.

## Adım 1: İşletim sistemini yazın

**Raspberry Pi**

1. [Raspberry Pi Imager](https://www.raspberrypi.com/software/) uygulamasını açın ve Pi modelinizi seçin.
2. **Raspberry Pi OS (64-bit)** seçin. **Lite** sürümü yeterlidir ve video için daha fazla CPU bırakır.
3. İşletim sistemi özelleştirme ayarlarını açın. Bir ana bilgisayar adı, bir kullanıcı adı ve parola, Wi-Fi ağınızı ve ülkenizi ayarlayın, SSH'yi etkinleştirin.
4. Kartı yazın, Pi'ye takın ve açın.

Raspberry Pi için Ubuntu Server 64-bit de çalışır.

**Diğer arm64 kartlar**

Satıcının 64 bit Ubuntu veya Debian imajını yazın (örneğin NVIDIA Jetson için JetPack'in Ubuntu'su), ilk açılış kurulumunu tamamlayın ve SSH'yi etkinleştirin.

Raspberry Pi dışındaki arm64 kartlar UAVcast-Pro 6.5.3 veya daha yenisini gerektirir. Eski yükleyiciler *Device is not a Raspberry Pi* mesajıyla durur.

**x86-64 PC**

64 bit Debian veya Ubuntu (Server veya Desktop) kurun. Yükleyici sürüm numarasını denetlemez; bu nedenle güncel ve desteklenen bir sürüm kullanın, örneğin Ubuntu 22.04 LTS veya daha yenisi.

Ardından SSH ile oturum açın ve sistemi güncelleyin:

```bash
sudo apt update && sudo apt full-upgrade -y
```

## Adım 2: Yükleyiciyi çalıştırın

Drone üzerinde:

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
```

Yükleyici şunları yapar:

1. Mimariyi algılar ve eşleşen sürümü `/opt/uavcast-pro` dizinine indirir.
2. İhtiyaç duyduğu sistem paketlerini kurar: NetworkManager, ModemManager, GStreamer, v4l-utils, Redis, Python ve daha fazlası.
3. Raspberry Pi üzerinde GPIO UART'ı uçuş kontrolcüsü için serbest bırakır (seri konsolu `cmdline.txt` dosyasından kaldırır, Bluetooth'u UART'tan çıkarır) ve iki kameralı kurulumlar için kamera bellek havuzunu artırır. Özgün `config.txt` ve `cmdline.txt` dosyalarınız önce yedeklenir.
4. ZeroTier, Tailscale, mavlink-router ve MediaMTX'i kurar.
5. UAVcast-Pro servislerini kurar ve başlatır.
6. Temel araçların mevcut olduğunu denetler ve web adresini yazdırır.

İşlem bittiğinde şunu görürsünüz:

```text
✅ Installation completed successfully!

Please reboot your device to complete the installation.

To access the UAVcast-Pro web interface, open your browser and navigate to:
http://192.168.1.50
```

UART ve kamera değişikliklerinin etkili olması için yeniden başlatın:

```bash
sudo reboot
```

> **Yavaş kartların bitmesine izin verin**
>
> Bir Pi Zero 2 W üzerinde apt çalışırken ilerleme çubuğu dakikalarca hareketsiz kalabilir. İkinci bir kurulum başlatmayın: yükleyici iki kez çalışmayı reddeder ve ikinci bir kopya yalnızca ilkini yavaşlatır. Tam günlük `/opt/uavcast-pro/installer.log` dosyasındadır.

### Belirli bir sürümü kurun

Cihazınızın mimarisi için kullanılabilir sürümleri listeleyin:

```bash
curl -fsSL https://install.uavmatrix.com | bash -s -- -l
```

Bunlardan birini `-b` ile kurun:

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2
```

Sürümü daha sonra web arayüzünden de değiştirebilirsiniz. Bkz. [UAVcast-Pro'yu güncelleyin](https://docs.uavmatrix.com/tr/get-started/updating/).

## Adım 3: Web arayüzünü açın

Aynı ağdaki bir bilgisayarda tarayıcıyı açın ve yükleyicinin yazdırdığı adrese gidin, örneğin `http://192.168.1.50`. Web arayüzü **80** portunda çalışır.

Adresi bilmiyorsanız:

- Raspberry Pi Imager'da ayarladığınız ana bilgisayar adını deneyin, örneğin `http://raspberrypi.local`. Bu, mDNS gerektirir; çoğu ev ağında ve macOS, Linux ile Windows 10 veya daha yeni sürümlerde çalışır.
- Yönlendiricinizin bağlı istemciler listesinde cihazı arayın.
- Cihazda `hostname -I` komutunu çalıştırın.

İlk gördüğünüz sayfa **Uygulama** olur, çünkü UAVcast-Pro'nun henüz lisansı yoktur. Cihaz lisanslanana kadar kenar çubuğu soluk görünür (*Feature requires license*).

## Adım 4: Lisansınızı etkinleştirin

**Uygulama → Lisans Yöneticisi** sayfasında anahtarınızı **Lisans Anahtarını Girin** alanına yapıştırın ve **Doğrula**'yı seçin. Bu işlem için cihazın internet erişimi olmalıdır. Tam akış, cihaz yuvaları ve lisansı taşıma adımları [Lisanslama ve etkinleştirme](https://docs.uavmatrix.com/tr/get-started/license-activation/) sayfasında anlatılmıştır.

## Adım 5: Yönetici kullanıcı oluşturun

Yeni bir kurulumda **hiç kullanıcı ve oturum açma yoktur**: web arayüzüne erişebilen herkes tam yönetici erişimine sahiptir. Drone paylaşılan bir ağa veya internete bağlanmadan önce bir yönetici hesabı oluşturun.

1. Kenar çubuğunda (**Yönetim** altında) **Users**'a gidin.
2. **Add User**'ı seçin.
3. Bir **Username** (en az 3 karakter) ve bir **Password** (en az 6 karakter) girin. İlk kullanıcı her zaman **Admin** olur.
4. **Create User**'ı seçin.

Bundan sonra web arayüzü oturum açma ister. Oturumlar 7 gün sürer. Salt okunur hesaplar için bkz. [Kullanıcılar ve erişim](https://docs.uavmatrix.com/tr/uavcast-pro/users/).

## Neler kurulur

| Öğe | Konum |
| --- | --- |
| Uygulama, ikili dosyalar, veritabanı (`uavcast.db`), günlükler | `/opt/uavcast-pro` |
| Yükleyici günlüğü | `/opt/uavcast-pro/installer.log` |
| systemd servisleri | `uavcast-web`, `uavcast-factory`, `mavlink-manager`, `uavcast-camera`, `uavcast-ntrip`, `uavcast-dns`, `mediamtx`, `internet-check` |
| MAVLink yönlendirici yapılandırması | `/etc/mavlink-router/main.conf` (UAVcast-Pro tarafından üretilir, düzenlemeyin) |

Web servisinin çalıştığını kontrol edin:

```bash
sudo systemctl status uavcast-web
```

## Kaldırma

Yükleyici ikili dosyasının bir kaldırma modu vardır. Tüm UAVcast-Pro servislerini durdurur ve kaldırır, ayar veritabanını ve `/opt/uavcast-pro` içindeki program dosyalarını siler; ZeroTier, Tailscale ve Redis'i UAVcast-Pro kurduysa bunları da temizler. NetworkManager, ModemManager ve GStreamer gibi genel paketler kalır.

```bash
sudo /opt/uavcast-pro/factory/ApplicationInstaller --uninstall
```

UAVcast-Pro 6.5.3'ten itibaren `/opt/uavcast-pro/recordings` içindeki uçuş kayıtları korunur. Bunları da kaldırmak için `--delete-recordings` ekleyin; UAVcast-Pro'dan önce kurulmuş ZeroTier, Tailscale ve Redis'i de kaldırmak için `--purge-deps` ekleyin. Önceki sürümlerde kaldırma işlemi kayıtlar dahil tüm `/opt/uavcast-pro` klasörünü siler; saklamak istediğiniz kayıtları önce kopyalayın.

> **Önce lisansın kaydını silin**
>
> Kaldırmak lisans yuvasını serbest bırakmaz. Silmeden önce **Uygulama → Lisans Yöneticisi** üzerinden cihazın kaydını silin; aksi halde yuvayı başka bir cihaz olmadan serbest bırakamazsınız. Bkz. [Lisanslama ve etkinleştirme](https://docs.uavmatrix.com/tr/get-started/license-activation/#unregister-a-device).

## UAVcast-Pro 4.x veya 5.x sürümünden yükseltme

Sürüm 6 tamamen yeniden yazılmıştır ve 4.x veya 5.x sürümlerinin ayarlarını içe aktaramaz. Yer kontrol istasyonu, kamera ve modem ayarlarınızı not edin, temiz bir 64 bit işletim sistemi yükleyin ve sürüm 6'yı kurun.

Yükleyici *An older version of UAVcast-Pro has been detected at /opt/UAVcast-Pro* mesajını verirse, önce eski sürümü kaldırın. Bu işlem eski ayarları siler:

```bash
sudo rm -rf /opt/UAVcast-Pro
```

## Kurulum başarısız olursa

| Mesaj veya belirti | Çözüm |
| --- | --- |
| *No installation candidate for … found!* | İşletim sistemi 32 bit veya mimari desteklenmiyor. `uname -m` komutunu kontrol edin ve 64 bit bir imajla yeniden yazın. |
| *Not enough free space. … need 500MB* | Boş alan açın veya daha büyük bir kart kullanın. |
| *Another process is currently using the system package manager* | Otomatik bir güncelleme çalışıyor. Birkaç dakika bekleyin ve yükleyiciyi yeniden çalıştırın. |
| *Another installer is already running* | İlk yükleyicinin bitmesini bekleyin. |
| *Installation completed with errors* ve kırmızı ✗ | Yükleyiciyi yeniden çalıştırın. Sorun tekrarlanırsa `/opt/uavcast-pro/installer.log` dosyasını [support@uavmatrix.com](mailto:support@uavmatrix.com) adresine gönderin. |
| Web sayfası açılmıyor | `sudo systemctl status uavcast-web` komutunu kontrol edin, ana bilgisayar adı yerine IP adresini deneyin ve 80 portunu kullanan başka bir uygulama olmadığından emin olun. |

Daha fazla çözüm için: [Kurulum başarısız oluyor](https://docs.uavmatrix.com/tr/troubleshooting/installation-fails/) ve [Web arayüzü açılmıyor](https://docs.uavmatrix.com/tr/troubleshooting/web-interface-wont-open/).

Source: https://docs.uavmatrix.com/tr/get-started/installation/
