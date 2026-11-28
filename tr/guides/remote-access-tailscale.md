# Tailscale ile uzaktan erişim

> UAVcast-Pro ve Tailscale ile LTE üzerinden drone'unuza port yönlendirme olmadan erişin: URL veya doğrulama anahtarıyla giriş yapın, dizüstü bilgisayarı GCS olarak ekleyin, anahtar süresinin dolmasını durdurun.

Tailscale, WireGuard tabanlı bir VPN'dir. Ekibiniz zaten kullanıyorsa, 4G üzerinden bir drone'a ulaşmanın en hızlı yoludur: drone ve dizüstü bilgisayarınız aynı tailnet'e katılır ve birbirleriyle `100.x.y.z` adresleri üzerinden iletişim kurar.

Bir tailnet'iniz yok mu? Lisansınıza dahil olan Fleet Manager VPN, Tailscale hesabı olmadan aynısını yapar: bkz. [4G üzerinden görüş mesafesi ötesinde uçuş](https://docs.uavmatrix.com/tr/guides/bvlos-4g/) ve [Bir filoyu sisteme alma](https://docs.uavmatrix.com/tr/guides/fleet-onboarding/).

**Gerekenler:** drone'da internet bağlantısı olan (Wi-Fi veya modem) UAVcast-Pro, bir Tailscale hesabı ve dizüstü bilgisayarınızda Tailscale istemcisi.

## 1. Drone'u Tailscale'e giriş yaptırın

1. UAVcast-Pro'da **Sanal Özel Ağ** bölümünü açın.

2. **VPN'i Etkinleştir** ayarını **Evet** ve **Hizmetler** ayarını **Tailscale** yapın.

3. Girişin nasıl yapılacağını seçin:

   - **Web Girişi**: **Giriş URL'si Oluştur** düğmesine basın, ardından **Bu cihazı doğrula** seçeneğini kullanın ve açılan sayfada Tailscale hesabınızla giriş yapın.
   - **Doğrulama Anahtarı**: Tailscale yönetim konsolunda bir doğrulama anahtarı oluşturun, bunu **Auth Key** alanına yapıştırın, isterseniz **Sunucu Adı (İsteğe Bağlı)** alanını doldurun ve **Doğrulama Anahtarı ile Bağlan** düğmesine basın. Drone'ları başka biri için ya da çok sayıda drone'u aynı anda hazırlarken bunu kullanın.

4. **Bağlı** durumunu bekleyin. **IPv4 Adresi** (100.x.y.z) değerini not edin.

![Hizmetler Tailscale olarak ayarlanmış, Fleet Manager, Web Girişi ve Doğrulama Anahtarı sekmeleri bulunan ve VPN Bilgileri alanında Bağlı Değil görünen Sanal Özel Ağ sayfası](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/private-network.webp)

*Hizmetler Tailscale olarak ayarlıyken, drone giriş yapmadan önce (Bağlı Değil). Girişten sonra VPN Bilgileri bağlantı ayrıntılarını gösterir.*

> **Drone'lar için anahtar süresini kapatın**
>
> Tailscale cihaz anahtarlarının süresi dolar; süresi dolmuş anahtarı olan bir drone, biri tekrar giriş yapana kadar tailnet'ten düşer. **Expires** alanı süresinin ne zaman dolacağını gösterir. Tailscale yönetim konsolunda, kullandığınız drone'lar için anahtar süresini devre dışı bırakın.

## 2. Dizüstü bilgisayarı aynı tailnet'e ekleyin

Dizüstü bilgisayara Tailscale'i kurun ve aynı hesap veya tailnet ile giriş yapın. `tailscale status` komutunu çalıştırın: drone listede olmalıdır. Ardından:

```bash
ping <drone tailscale ip>
```

Drone'un web arayüzünü `http://<drone tailscale ip>/` adresinde açın.

## 3. Telemetri ve videoyu dizüstü bilgisayara gönderin

1. UAVcast-Pro'da **Yer Kontrol İstasyonları** bölümüne gidin ve **Hedef Ekle** düğmesine basın.
2. **Hedef IP veya Sunucu** alanına **dizüstü bilgisayarın** Tailscale IPv4 adresini girin (dizüstü bilgisayarda `tailscale ip -4` komutunu çalıştırın).
3. **Telemetriyi Etkinleştir** ve **Videoyu Etkinleştir** seçeneklerini açın.
4. Dizüstü bilgisayarın güvenlik duvarında gelen UDP 14550 ve 5600 trafiğine izin verin. Windows, Tailscale bağdaştırıcısını çoğu zaman genel ağ olarak değerlendirir.

QGroundControl veya Mission Planner'ı açın. Telemetri UDP 14550'de, video UDP 5600'de gelir.

## 4. Bağlantı kalitesini kontrol edin

**Sanal Özel Ağ** sayfasındaki **Röle** alanı, trafiğin bir Tailscale röle sunucusundan geçip geçmediğini gösterir. Röle üzerinden giden yol çalışır ama gecikme ekler. Bazı hücresel operatörler doğrudan bağlantılara izin vermez; bu yüzden uçuş yaptığınız operatör üzerinde test edin.

## Sorun giderme

- Drone'a ping atamıyorsanız: [VPN bağlı ama drone'a ulaşılamıyor](https://docs.uavmatrix.com/tr/troubleshooting/vpn-cant-reach-drone/)
- Ping çalışıyor ama telemetri yok: [Yer kontrol istasyonunda telemetri yok](https://docs.uavmatrix.com/tr/troubleshooting/no-telemetry-in-gcs/)
- Drone daha sonra Fleet Manager ile eşleştirilir ve **Replace existing VPN with Fleet Manager network** seçeneğini seçerseniz, drone tailnet'inizden ayrılır ve organizasyonun ağına katılır.

Source: https://docs.uavmatrix.com/tr/guides/remote-access-tailscale/
