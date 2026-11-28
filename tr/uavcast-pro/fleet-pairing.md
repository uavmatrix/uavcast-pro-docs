# Fleet Manager ile eşleştirme

> UAVcast-Pro çalıştıran bir drone'u UAVmatrix Fleet Manager'a bağlayın: drone'da eşleştirme kodunu alın, Fleet Manager'a girin, bağlantıyı kontrol edin, yeniden adlandırın veya eşleştirmeyi kaldırın.

Eşleştirme, UAVcast-Pro çalıştıran bir drone'u, filonuz için bulut tabanlı kontrol paneli olan [UAVmatrix Fleet Manager](https://docs.uavmatrix.com/tr/fleet-manager/) ile organizasyonunuza bağlar. Eşleştirildikten sonra drone, sertifika ile kimliği doğrulanmış şifreli bir bağlantıyı Fleet Manager ile sürdürür ve yeniden başlatma veya ağ değişikliğinden sonra kendiliğinden yeniden bağlanır. Eşleştirmeyi drone'da başlatır, Fleet Manager'da tamamlarsınız. Yaklaşık iki dakika sürer.

## Başlamadan önce

- Drone'da **etkin bir lisans** bulunan UAVcast-Pro. Lisans olmadan eşleştirme reddedilir (*Geçerli lisans bulunamadı. Lütfen önce lisansınızı etkinleştirin.*).
- UAVcast-Pro'da bir **yönetici** kullanıcı. **Fleet Management** salt okunur kullanıcılardan gizlidir.
- Organizasyonda **Owner** veya **Admin** rolüne sahip bir Fleet Manager hesabı. Drone'un lisansı, bu organizasyonun bir üyesine ait olmalıdır.
- Drone'da internet bağlantısı; giden TCP **8883** (TLS üzerinden MQTT) ve HTTPS (443) izinli olmalıdır.

## Drone'u eşleştirin

1. Drone'un web arayüzünde **Yönetim → Fleet Management** bölümüne gidin.
2. **Connect to Fleet Manager** seçeneğini seçin. Drone, Fleet Manager'dan bir kod ister ve **Expires in** geri sayımıyla birlikte bir **Pairing Code** gösterir; ardından *Waiting for Manager to confirm pairing...* yazar.
3. Başka bir sekmede [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) adresinden oturum açın ve **Fleet → Pair Device** bölümüne gidin.
4. Drone'dan aldığınız kodu girin ve cihaz bilgilerini (ana bilgisayar adı, mimari, UAVcast-Pro sürümü) önünüzdeki drone ile eşleştiğini doğrulayın.
5. Fleet Manager'daki adımları tamamlayın (VPN seçimi ve ad).
6. Drone'a dönün; sayfa **Fleet Connection** görünümüne geçer ve durum **Connected** olur.

![Fleet Manager'a Bağlan düğmesi bulunan Fleet Manager'a bağlan kartı](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/fleet--connect.webp)

*Henüz eşleştirilmemiş bir drone'da Yönetim → Fleet Management. Fleet Manager'a Bağlan seçildiğinde bu kart, 8 haneli Pairing Code ve Expires in geri sayımı ile değiştirilir.*

> **Kod 5 dakika geçerlidir**
>
> Kodu girmeden süre dolarsa yeni bir kod için **Fleet Manager'a Bağlan** seçeneğini tekrar seçin.

Organizasyonlar, VPN ve drone filoya eklendikten sonra yapılacaklar dahil Fleet Manager tarafı, [İlk drone'unuzu Fleet Manager'a ekleyin](https://docs.uavmatrix.com/tr/fleet-manager/pair-uav/) sayfasında anlatılmıştır.

## Eşleştirmeden sonra

**Fleet Connection** kartı şunları gösterir:

| Alan | Anlamı |
| --- | --- |
| **Connected** / **Disconnected** | Drone'un şu anda Fleet Manager ile iletişim kurup kurmadığı. |
| **Device Name** | Fleet Manager'da gösterilen ad. Adı buradan veya Fleet Manager'dan düzenleyebilirsiniz. *Managed by Fleet Manager*, adın orada ayarlandığı anlamına gelir. |
| **Hostname**, **Device ID** | Fleet Manager'ın bu drone'u nasıl tanımladığı. |
| **Manager URL** | Drone'un eşleştirildiği Fleet Manager örneği. |
| **Last Connected** | Drone'un Fleet Manager'a en son ulaştığı zaman. |

Fleet Manager, drone'dan şunları alır: canlı telemetri (konum, batarya, GPS, uçuş durumu), UAVcast-Pro sistem durumu ve uzaktan servis kontrolü. Fleet Manager'ın stream binding'ler aracılığıyla oluşturduğu yer kontrol istasyonu hedefleri, [Yer Kontrol İstasyonları](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/) sayfasında bulut simgesiyle görünür.

Drone'u daha sonra organizasyonunuzun VPN'ine eklemek için [Sanal Özel Ağ](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/vpn/) sayfasındaki **Fleet Manager** sekmesini kullanın.

## Eşleştirmeyi kaldırma

1. **Yönetim → Fleet Management** bölümüne gidin.
2. **Disconnect from Fleet** seçeneğini seçin ve onaylayın.

Bu işlem eşleştirmeyi ve drone'un sertifikalarını kaldırır. Drone'u Fleet Manager'da yeniden kullanmak için yeni bir kodla yeniden eşleştirin. Drone'u Fleet Manager'daki filonuzdan da kaldırın; aksi halde çevrimdışı olarak listede kalır.

## Sorun giderme

| Belirti | Kontrol edin |
| --- | --- |
| *Geçerli lisans bulunamadı. Lütfen önce lisansınızı etkinleştirin.* | **Uygulama** bölümünden lisansı etkinleştirin. Bkz. [Lisanslama ve etkinleştirme](https://docs.uavmatrix.com/tr/get-started/license-activation/). |
| Fleet Manager, lisansın organizasyonun bir üyesine ait olmadığını söylüyor | Lisans, bir üye olmayan bir e-posta ile satın alınmış. Bu e-postayı Fleet Manager'a ekleyin (bkz. [Lisanslar](https://docs.uavmatrix.com/tr/fleet-manager/licenses/)) veya bu hesabı organizasyona davet edin. |
| Kodun süresi doldu | **Fleet Manager'a Bağlan** seçeneğini yeniden seçin. |
| Eşleştirildi, ancak durum **Disconnected** olarak kalıyor | Drone, TCP 8883 üzerinden Fleet Manager'a ulaşamıyor. Bazı ağlar bunu engeller. Drone'un internet bağlantısını ve güvenlik duvarını kontrol edin. |

Daha fazla yardım: [Eşleştirme kodu geçersiz](https://docs.uavmatrix.com/tr/troubleshooting/pairing-code-invalid/) ve [Drone Fleet Manager'da çevrimdışı](https://docs.uavmatrix.com/tr/troubleshooting/drone-offline-fleet-manager/).

Source: https://docs.uavmatrix.com/tr/uavcast-pro/fleet-pairing/
