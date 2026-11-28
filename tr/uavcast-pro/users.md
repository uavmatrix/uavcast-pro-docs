# Kullanıcılar ve erişim

> UAVcast-Pro web arayüzünü bir admin girişiyle güvence altına alın; telemetri ve videoyu izleyebilen ama drone'u kontrol edemeyen Read Only kullanıcılar ekleyin ve parolaları değiştirin veya sıfırlayın.

Yeni bir UAVcast-Pro kurulumunda kullanıcı ve giriş yoktur: web arayüzünü açabilen herkes tam admin yetkisine sahiptir. Girişi açmak için bir admin kullanıcı ekleyin. Bundan sonra, her şeyi görmesi ama hiçbir şeyi değiştirmemesi gereken gözlemciler, müşteriler veya yük operatörleri için **Read Only** kullanıcılar ekleyebilirsiniz. **Yönetim → Users** bölümünü açın.

![Add New User iletişim kutusunun açık olduğu Users sayfası; kullanıcı adı, parola, parola onayı ve rol alanları ile](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/users.webp)

*Yönetim → Users sayfası, Add New User iletişim kutusu açık.*

## Girişi etkinleştirin

1. **Users** bölümüne gidin ve **Add User** seçin.
2. Bir **Username** (en az 3 karakter), bir **Password** (en az 6 karakter) ve **Confirm Password** girin.
3. **Create User** seçin. İlk kullanıcı her zaman bir **Admin** olur (*First user must be an admin*).

Bundan sonra her ziyaretçi bir giriş sayfasıyla karşılaşır. Giriş, o tarayıcıda 7 gün geçerlidir ya da kenar çubuğunun altındaki kullanıcı menüsünden **Logout** seçilene kadar sürer.

> **Web arayüzü düz HTTP kullanır**
>
> Girişler ve ayarlar şifrelenmeden iletilir. Kendi LAN'ınızda ya da bir [VPN](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/vpn/) içinde bu sorun değildir, ancak web arayüzünün portunu asla internete yönlendirmeyin.

## Roller

| Yapabilir… | **Admin** | **Read Only** |
| --- | --- | --- |
| Kontrol Paneli, Veri Akışları, Uçuş Kontrolcüsü, Uçuş Haritası, Yer Kontrol İstasyonları ve Kamera sayfalarını görme | Evet | Evet |
| Canlı videoyu ve telemetriyi izleme, panoları ve kayıtları görüntüleme | Evet | Evet |
| Herhangi bir ayarı değiştirme | Evet | Hayır |
| Arm, disarm, mod değiştirme, görevleri başlatma veya temizleme | Evet | Hayır |
| Kayıtları başlatma veya durdurma | Evet | Hayır |
| Modem, Sanal Özel Ağ, Dinamik DNS, Ağlar, Fleet Management, Users ve Uygulama sayfalarını açma | Evet | Hayır (gizli) |

Bir admin oluşturulmadan **Read Only** kullanıcı oluşturamazsınız (*Create an admin user first before adding read-only users*).

Web arayüzündeki salt okunur kullanıcılar, bir yer kontrol istasyonu hedefindeki **Read Only** anahtarından farklıdır; bu anahtar yer kontrol istasyonu programından gelen komutları engeller. Bkz. [Yer kontrol istasyonları](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/).

## Parolayı değiştirin

**Change Password** seçin, **Current Password** alanına mevcut parolayı, **New Password** alanına yeni parolayı iki kez girin ve **Update Password** seçin. Parolalar bcrypt hash olarak saklanır.

## Kullanıcıyı silin

Kullanıcının satırındaki **Delete** seçeneğini seçin ve onaylayın.

- Diğer kullanıcılar varken kendi hesabınızı silemezsiniz.
- Son kullanıcıyı silerseniz giriş yeniden kapanır: *After deletion, the application will be open without authentication until a new user is created.*

## Admin parolasını unuttunuz

Sıfırlama bağlantısı yoktur, çünkü drone'un e-posta adresi yoktur ve parola kurtarma kullanıcı tarafından yapılamaz.

- Başka bir admin hâlâ giriş yapabiliyorsa, **Users** altında kullanıcınızı silip yeniden oluşturabilir.
- Admin rolüne sahip hiç kimse giriş yapamıyorsa **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresinden destekle iletişime geçin. Lisans anahtarınızı (ya da satın alırken kullandığınız e-posta adresini), **Uygulama → Lisans Yöneticisi → Aktif Cihazlar** altında görünen cihaz ana bilgisayar adını veya adını, UAVcast-Pro sürümünü ve cihaza SSH ile erişip erişemediğinizi ekleyin.

Source: https://docs.uavmatrix.com/tr/uavcast-pro/users/
