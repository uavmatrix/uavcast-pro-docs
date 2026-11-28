# VPN bağlı ama drone'a ulaşılamıyor

> Fleet Manager VPN, Tailscale veya ZeroTier bağlı diyor ama drone'a ping atamıyor musunuz? Yetkilendirmeyi, ağı veya tailnet'i, interneti ve GCS IP adresini kontrol edin.

Hem drone hem dizüstü bilgisayarınız VPN'de olduğunu söylüyor, ancak drone'un VPN adresine `ping` zaman aşımına uğruyor, web arayüzü VPN üzerinden açılmıyor veya telemetri ve video gelmiyor.

| Ne görürsünüz | Olası neden | Başlangıç |
| --- | --- | --- |
| ZeroTier ağı ACCESS_DENIED gösteriyor veya IP adresi yok | Drone bu ağda yetkilendirilmemiş | [Kontrol 1](https://docs.uavmatrix.com/tr/troubleshooting/vpn-cant-reach-drone/#check-1) |
| Drone sorunsuz, dizüstü bilgisayar adres almıyor veya yanlış adres alıyor | Dizüstü bilgisayar başka bir ağa veya tailnet'e katılmış | [Kontrol 2](https://docs.uavmatrix.com/tr/troubleshooting/vpn-cant-reach-drone/#check-2) |
| Tailscale birkaç hafta çalıştı, sonra durdu | Cihaz anahtarının süresi doldu | [Kontrol 3](https://docs.uavmatrix.com/tr/troubleshooting/vpn-cant-reach-drone/#check-3) |
| VPN drone üzerinde sahada hiç bağlanmıyor | Drone'un modem üzerinden interneti yok | [Kontrol 4](https://docs.uavmatrix.com/tr/troubleshooting/vpn-cant-reach-drone/#check-4) |
| Ping çalışıyor, ama telemetri veya video yok | Yer kontrol istasyonu hedefi yanlış IP adresini kullanıyor | [Kontrol 5](https://docs.uavmatrix.com/tr/troubleshooting/vpn-cant-reach-drone/#check-5) |

## Kontrol 1: Drone'u ağda yetkilendirin

**ZeroTier:**

1. UAVcast-Pro'da **Virtual Private Network** bölümünü açın. **Enable VPN** seçeneğinin **Yes**, **Services** seçeneğinin **ZeroTier** ve **Network ID** değerinin ZeroTier denetleyicinizdeki kimlik olduğunu kontrol edin.
2. **Connected Networks** altındaki ağınıza bakın. Durum rozeti **ACCESS_DENIED** diyorsa drone ağa katılmış ama yetkilendirilmemiştir.
3. ZeroTier denetleyicinizde ağı açın ve drone'un düğüm kimliğine sahip üyeyi yetkilendirin.
4. UAVcast-Pro'ya dönün ve ağ `OK` durumunu ve bir IP adresini gösterene kadar bekleyin. Dizüstü bilgisayardan kullanacağınız adres budur.

Özel bir ZeroTier ağında, katılan her cihaz (drone, dizüstü bilgisayar, tablet) adres almadan önce denetleyicide bir kez yetkilendirilmelidir. (UAVnet ağları da özeldir; UAVnet kullanımdan kaldırılıyor, bu yüzden Fleet Manager VPN'e geçin.)

**Tailscale:** Drone içeride olduğunda **Connected** durumunu ve bir **IPv4 Address** (100.x.y.z) gösterir. **Not Connected** yazıyorsa **Web Login → Generate Login URL** seçeneğini kullanın veya Tailscale yönetici konsolunuzdan bir anahtarla **Auth Key** sekmesini kullanın.

## Kontrol 2: Dizüstü bilgisayarı aynı ağa bağlayın

Her iki uç da aynı ZeroTier ağında veya aynı tailnet'te olmalıdır.

- **ZeroTier**: dizüstü bilgisayarda aynı Network ID ile katılın ve dizüstü bilgisayarı da denetleyicinizde yetkilendirin. Windows'ta ZeroTier tepsi simgesini kontrol edin; Linux'ta `sudo zerotier-cli listnetworks` komutunu çalıştırın. Durum `OK` olmalıdır.
- **Tailscale**: bir Tailscale istemcisi aynı anda yalnızca bir tailnet'tedir. Dizüstü bilgisayarda `tailscale status` komutunu çalıştırın. Drone listede olmalıdır. Değilse, dizüstü bilgisayar başka bir hesaba veya tailnet'e giriş yapmıştır.
- **Fleet Manager VPN**: drone Fleet Manager ve VPN ile eşleştirildiyse, kişisel Tailscale'inizde değil, organizasyonunuzun ağındadır. Dizüstü bilgisayarı, Fleet Manager'ın **Network** altında verdiği komutla bağlayın (`tailscale up --login-server=… --authkey=…`) ve komutu **dizüstü bilgisayarda, asla drone üzerinde çalıştırmayın**. Bkz. [Yer istasyonunu bağlama](https://docs.uavmatrix.com/tr/fleet-manager/connect-gcs/).

> **Eşleştirme, drone'un VPN'ini değiştirebilir**
>
> Fleet Manager'da bir drone'u **Replace existing VPN with Fleet Manager network** seçeneğiyle eşleştirdiğinizde, drone mevcut Tailscale ağından ayrılır ve organizasyonun ağına katılır. Eski tailnet üzerindeki dizüstü bilgisayarlar artık ona ulaşamaz.

## Kontrol 3: Süresi dolmuş Tailscale anahtarı

Tailscale cihaz anahtarlarının süresi dolar. Drone'un anahtarının süresi dolduğunda, tekrar giriş yapana kadar tailnet'ten düşer. **Virtual Private Network** sayfasındaki **Expires** alanı tarihi gösterir. Tailscale yönetici konsolunda drone için anahtar süresi dolmasını kapatabilirsiniz; böylece proje ortasında tailnet'ten düşmez.

## Kontrol 4: Drone önce internete ihtiyaç duyar

VPN, drone'un kendi internet bağlantısı üzerinden çalışır. Modemin interneti yoksa VPN bağlantısı kesik görünür veya hiç adres almaz. Önce bağlantıyı düzeltin: [modem bağlı, internet yok](https://docs.uavmatrix.com/tr/troubleshooting/modem-no-internet/).

## Kontrol 5: Ulaşılabilir ama veri yok

`ping <drone-vpn-ip>` çalışıyorsa:

- **Web arayüzü**: `http://<drone-vpn-ip>/` adresini açın. Canlı önizleme de VPN üzerinden 8889 portuna erişilebilir olmasını gerektirir.
- **Telemetri ve video**: bunlar drone'dan, **Yer Kontrol İstasyonları → Hedef IP veya Sunucu** alanındaki adrese *gönderilir*. Bu adres dizüstü bilgisayarın VPN adresi olmalıdır; drone'un adresi değil, dizüstü bilgisayarın Wi-Fi adresi de değil. Ardından [telemetri yok](https://docs.uavmatrix.com/tr/troubleshooting/no-telemetry-in-gcs/) veya [video yok](https://docs.uavmatrix.com/tr/troubleshooting/no-video-in-gcs/) sayfalarına bakın.
- **Yavaş ama çalışıyor**: Tailscale, kullanılan bağlantının **Relay** üzerinden olduğunu gösterir. Röle üzerinden bağlantı çalışır ama gecikme ekler. Bazı hücresel ağlar doğrudan bağlantılara izin vermez; bu operatörde en iyi sonuç röle olabilir.

## Hâlâ ulaşılamıyor mu?

**VPN Manager** seçiliyken [günlükleri indirin](https://docs.uavmatrix.com/tr/troubleshooting/collect-logs/) ve hem drone'dan hem dizüstü bilgisayardan alınan `zerotier-cli listnetworks` veya `tailscale status` çıktısını ekleyerek **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresine gönderin.

İlgili: [VPN ayarları](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/vpn/) · [Fleet Manager ağı](https://docs.uavmatrix.com/tr/fleet-manager/network/)

Source: https://docs.uavmatrix.com/tr/troubleshooting/vpn-cant-reach-drone/
