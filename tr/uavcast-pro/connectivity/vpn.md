# VPN

> Drone'unuzu ve yer kontrol istasyonunuzu Fleet Manager VPN'i veya kendi Tailscale ya da ZeroTier ağınızla tek bir özel ağa alın; böylece telemetri ve video 4G/LTE üzerinden çalışır.

4G/LTE üzerinde drone'unuz, yer kontrol istasyonunuzun ulaşamayacağı bir adresi mobil operatörden alır. VPN bu sorunu çözer: drone ve yer kontrol istasyonu aynı özel ağa katılır ve nerede olurlarsa olsunlar, hangi ağı kullanırlarsa kullansınlar bu ağda sabit adresler alır. Kenar çubuğunda **Sanal Özel Ağ** bölümünü açın.

En hızlı yol, UAVcast-Pro lisansınıza dahil olan **Fleet Manager VPN**'dir. Zaten kendi Tailscale tailnet'inizi veya ZeroTier ağınızı çalıştırıyorsanız UAVcast-Pro bu ağa katılabilir.

![VPN etkin, Tailscale seçili, Fleet Manager sekmesinin açık olduğu ve VPN Bilgileri alanında Bağlı Değil yazan Sanal Özel Ağ sayfası](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/private-network.webp)

*Henüz eşleştirilmemiş veya giriş yapılmamış bir drone'da Tailscale seçiliyken Sanal Özel Ağ.*

## Hangisini kullanmalıyım?

|  | Fleet Manager VPN | Tailscale | ZeroTier |
| --- | --- | --- | --- |
| Hesap | Fleet Manager organizasyonunuz (lisansınıza dahil) | Kendi Tailscale hesabınız | Kendi ZeroTier ağınız (kendi yönettiğiniz) |
| Drone'da kurulum | Eşleştirme sırasında veya sonrasında tek tıklama | Tarayıcı bağlantısıyla giriş yapın veya bir kimlik doğrulama anahtarı kullanın | Bir ağ kimliği yapıştırın |
| Yer kontrol istasyonları | Fleet Manager'ın **Network** sayfasından katılır; akışlar akış bağlamalarıyla ayarlanır | Tailnet'inize katılın | Ağınıza katılın |
| En uygun | Çoğu operatör ve her filo | Zaten Tailscale kullanan ekipler | Zaten ZeroTier kullanan ekipler |

Bu sayfa üzerinden bir drone aynı anda yalnızca bir VPN'e bağlı olabilir.

> **UAVnet kullanımdan kaldırılıyor**
>
> UAVmatrix'in barındırdığı ZeroTier denetleyicisi olan UAVnet (uavnet.uavmatrix.com), Fleet Manager lehine kullanımdan kaldırılıyor. Drone'larınız bir UAVnet ağı kullanıyorsa onları Fleet Manager VPN'e taşıyın. Bu sayfadaki **UAVNet Denetleyicisini Aç** düğmesi UAVnet'i açar.

## Fleet Manager VPN

Fleet Manager VPN, Fleet Manager tarafından Tailscale istemcisi üzerinde çalıştırılan organizasyonunuzun özel ağıdır. Tailscale hesabınız olması gerekmez.

1. Fleet Manager'da **Network** sayfasını açın ve henüz etkin değilse **Enable VPN Network** seçeneğini seçin. Bkz. [Ağ ve VPN](https://docs.uavmatrix.com/tr/fleet-manager/network/).
2. [Drone'u eşleştirin](https://docs.uavmatrix.com/tr/uavcast-pro/fleet-pairing/) ve eşleştirme sihirbazında **Enable VPN for this UAV** seçeneğini işaretli bırakın. Zaten eşleştirilmiş bir drone, bu sayfadaki **Fleet Manager** sekmesinden (aşağıya bakın) veya Fleet Manager'ın **Network** sayfasındaki **Push to Drone** seçeneğiyle ağa katılır.
3. Her yer kontrol istasyonunu Fleet Manager'ın **Network** sayfasından ağa ekleyin: [Yer kontrol istasyonunu bağlayın](https://docs.uavmatrix.com/tr/fleet-manager/connect-gcs/).
4. Akışları bir [akış bağlaması](https://docs.uavmatrix.com/tr/fleet-manager/network/stream-bindings/) ile bu ağa gönderin. Fleet Manager, hedefi sizin yerinize drone'un [Yer Kontrol İstasyonları](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/) sayfasına ekler.

4G üzerinden adım adım uçuş kurulumu için bkz. [4G üzerinden görüş ötesi uçuş](https://docs.uavmatrix.com/tr/guides/bvlos-4g/).

## Tailscale

Bunu kendi tailnet'iniz için veya zaten eşleştirilmiş bir drone'da Fleet Manager VPN için kullanın. UAVcast-Pro Tailscale'i kurar. Drone'un nasıl giriş yapacağını üç sekmeden birinde seçin.

**Web Girişi**

1. **VPN'i Etkinleştir** seçeneğini **Evet** olarak ayarlayın ve **Hizmetler** bölümünde **Tailscale** seçin.
2. **Web Login** sekmesinde **Giriş URL'si Oluştur**, ardından **Bu cihazı doğrula** seçeneğini seçin.
3. Açılan yeni sekmede Tailscale'e giriş yapın ve cihazı onaylayın.
4. UAVcast-Pro'ya dönün. Durum **Bağlı** olarak değişir ve **IPv4 Adresi**, **Sunucu Adı** ve **Tailnet** değerlerini gösterir.

**Doğrulama Anahtarı**

1. [Tailscale yönetici konsolunda](https://login.tailscale.com/admin/settings/keys) bir kimlik doğrulama anahtarı oluşturun. Anahtarı önceden onaylı yapın; birden fazla drone kuracaksanız yeniden kullanılabilir yapın.
2. UAVcast-Pro'da **Tailscale** seçin, **Doğrulama Anahtarı** bölümünü açın, anahtarı (`tskey-auth-…`) yapıştırın ve isterseniz **Sunucu Adı (İsteğe Bağlı)** alanını ayarlayın.
3. **Doğrulama Anahtarı ile Bağlan** seçeneğini seçin.

Tarayıcınızın yanınızda olmadığı drone'lar için veya birçok drone'u aynı şekilde kurmak için bunu kullanın.

**Fleet Manager**

Drone [Fleet Manager ile eşleştirilmişse](https://docs.uavmatrix.com/tr/uavcast-pro/fleet-pairing/) ve organizasyonunuzda VPN etkinse **Connect to Fleet Manager VPN** seçeneğini seçin. Bağlantı 30 saniyeye kadar sürebilir. Ardından durum **Fleet Manager'a Bağlı** olarak görünür.

Henüz eşleştirilmediyse sekmede **Not Paired with Fleet Manager** yazar ve **Go to Fleet Manager Pairing** bağlantısı gösterilir.

Yer kontrol istasyonuna Tailscale'i kurun, aynı tailnet'e giriş yapın ve Yer Kontrol İstasyonları sayfasında hedef olarak onun Tailscale IP adresini (`100.x.y.z`) kullanın.

Bağlıyken **Arayüz Kapalı** Tailscale arayüzünü oturumu kapatmadan kapatır, **Arayüz Açık** onu yeniden açar, **Çıkış Yap** ise cihazı tailnet'ten çıkarır.

> **Fleet Manager VPN, kendi Tailscale girişinizin yerini alır**
>
> Fleet Manager VPN, Fleet Manager'ın kendi giriş sunucusuyla Tailscale üzerinde çalışır. Bu ağa bağlanmak drone'u kendi tailnet'inizden çıkarır. SSH oturumunuz bu tailnet üzerinden çalışıyorsa bağlantı kopar. Bu işlemi yerel ağdan yapın.

## ZeroTier

Kendi ZeroTier ağınızı çalıştırıyorsanız, örneğin ZeroTier Central üzerinde veya kendi denetleyicinizde, bunu kullanın.

### Drone'un ağa katılması

1. UAVcast-Pro'da **Sanal Özel Ağ** bölümüne gidin.
2. **VPN'i Etkinleştir** seçeneğini **Evet** olarak ayarlayın.
3. **Hizmetler** bölümünde **ZeroTier** seçin.
4. 16 karakterlik ağ kimliğinizi **Ağ Kimliği** alanına yapıştırın ve **Ağa Katıl** seçeneğini seçin.
5. Ağ özelse drone'u ZeroTier denetleyicinizde yetkilendirin. Bundan sonra **ZeroTier Ağı** paneli **Bağlı** durumunu ve **Cihaz IP** değerini gösterir.

**ACCESS_DENIED**, üyenin henüz yetkilendirilmediği anlamına gelir.

### Yer kontrol istasyonunun ağa katılması

1. Yer kontrol istasyonu bilgisayarına [ZeroTier One](https://www.zerotier.com/download/) kurun.
2. Aynı ağ kimliğine katılın: Windows ve macOS'te ZeroTier tepsi veya menü çubuğu simgesinden (**Join New Network**); Linux'ta `sudo zerotier-cli join <network-id>` komutuyla.
3. Denetleyicinizde yetkilendirin ve aldığı IP adresini not edin.

[Yer Kontrol İstasyonları](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/) sayfasında **Hedef IP veya Sunucu** alanını yer kontrol istasyonunun **ZeroTier** IP adresine ayarlayın. Telemetri ve video artık VPN üzerinden gider.

> **Wi-Fi ve 4G arasında geçiş**
>
> ZeroTier ve Tailscale, mevcut en iyi ağı izler. Sahada Wi-Fi ile başlayabilirsiniz; Wi-Fi menzil dışına çıktığında bağlantı, hiçbir adres değişmeden modeme geçer.

## Ayar başvurusu

| Ayar | Varsayılan | Değerler | Notlar |
| --- | --- | --- | --- |
| **VPN'i Etkinleştir** | **Hayır** | **Evet**, **Hayır** |  |
| **Hizmetler** | **ZeroTier** | **ZeroTier**, **Tailscale** | VPN etkinleştirilene kadar devre dışıdır. |
| **Ağ Kimliği** (ZeroTier) | boş | 16 karakterlik ZeroTier ağ kimliği | Kendi ZeroTier denetleyicinizden alınır. |
| **Doğrulama Anahtarı** (Tailscale) | boş | `tskey-auth-…` |  |
| **Sunucu Adı (İsteğe Bağlı)** (Tailscale) | sistem ana bilgisayar adı | metin | Tailscale yönetici konsolunda gösterilen ad. |

## Sorun giderme

| Belirti | Kontrol edin |
| --- | --- |
| ZeroTier **ACCESS_DENIED** gösteriyor | Üyeyi ZeroTier denetleyicinizde yetkilendirin. |
| Bağlı, ancak yer kontrol istasyonunda telemetri yok | Hedef hâlâ LAN IP adresini kullanıyor. Yer kontrol istasyonunun VPN IP adresini kullanın ve güvenlik duvarında UDP 14550 ve 5600 portlarına izin verin. |
| *No VPN Information Available* | VPN devre dışı veya servis çalışmıyor. **VPN'i Etkinleştir** ayarını ve **İşlem Kayıtları** bölümünü kontrol edin. |
| Tailscale web girişi *No Authentication URL* gösteriyor | Bunun yerine **Doğrulama Anahtarı** sekmesini kullanın. |

Arayüzler, [Ağlar](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/networks/) sayfasında `zt…` (ZeroTier) veya `tailscale0` olarak görünür ve **VPN** olarak işaretlenir.

Hâlâ sorun mu yaşıyorsunuz? Bkz. [VPN bağlı ancak drone'a ulaşılamıyor](https://docs.uavmatrix.com/tr/troubleshooting/vpn-cant-reach-drone/).

Source: https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/vpn/
