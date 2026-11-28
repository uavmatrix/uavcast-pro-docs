# Güvenlik ve gizlilik

> Fleet Manager, drone'ları drone başına TLS sertifikalarıyla korur, organizasyonları özel WireGuard VPN'lerinde birbirinden yalıtır, rolleri sunucuda uygular ve verileri saklar.

Bu sayfa, Fleet Manager'ı onaylamak zorunda olan kişiler içindir: güvenlik görevlileri, BT ve operasyon yöneticileri.

## Drone bağlantısı

- **Drone başına istemci sertifikaları.** Eşleştirme sırasında Fleet Manager her drone'a kendi TLS istemci sertifikasını verir. Drone, bu sertifikayla Fleet Manager'ın MQTT aracısına **8883** portundan bağlanır; bu, aracının tek genel dinleyicisidir. Paylaşılan bir parola yoktur.
- **Her drone yalnızca kendi konularını kullanabilir.** Sertifikanın kimliği drone'un cihaz kimliğidir ve aracı, bir drone'un yalnızca kendi konuları altında yayın yapmasına ve abone olmasına izin verir. Ele geçirilen bir drone, diğerini okuyamaz veya komut veremez.
- **Yalnızca giden bağlantı.** Drone'lar Fleet Manager'a dışarıya doğru bağlanır. Drone'da veya ağında gelen bağlantılar için port açmanız gerekmez.
- **Kısa eşleştirme süresi.** Eşleştirme kodları rastgele 8 rakamdan oluşur, 5 dakika geçerlidir ve yalnızca bir kez kullanılabilir. Kod kontrolleri hız sınırlıdır (kullanıcı başına dakikada 10 kod kontrolü ve 5 eşleştirme denemesi). Drone'un sertifikası ve VPN anahtarı yalnızca drone ilk kez bağlanana kadar verilir ve hiçbir zaman kodun süresi dolduktan 15 dakika sonrasına kalmaz.
- **Sertifika yükseltmeleri.** Fleet Manager sertifika şemasını sıkılaştırdığında, eski drone'lar sessizce güvenilmek yerine **Re-pair required** olarak işaretlenir.

## Organizasyon başına özel VPN

- Her organizasyon, Fleet Manager'ın VPN sunucusunda (`vpn-connect.uavmatrix.com`) kendi ağını alır. Bu, kendi barındırdığımız, Tailscale ile uyumlu bir denetim sunucusudur. Cihazlar arasındaki trafik WireGuard ile uçtan uca şifrelenir. Bir organizasyonun cihazları, başka bir organizasyonun cihazlarını göremez: VPN sunucusu her organizasyon için ayrı bir erişim kuralı uygular. Fleet Manager bu izolasyonu doğrulayamazsa, bir anahtar vermek yerine doğrulama anahtarını gizler (*VPN isolation could not be verified, so the auth key is hidden.*).
- Katılmak için yalnızca Owner ve Admin rollerinin oluşturabildiği bir doğrulama anahtarı (auth key) gerekir. Anahtarlar 90 gün sonra sona erer. Drone'lar anahtarı eşleştirme sırasında veya **Push to Drone** ile otomatik olarak alır; bu, yalnızca bir Owner'ın veya Admin'in onayıyla olur.
- **Network** sayfasında bir cihazı kaldırmak, onu VPN sunucusundan da kaldırır.

## Erişim denetimi

- Oturum açma, UAVmatrix hesabınız üzerinden yapılır. Fleet Manager parola saklamaz.
- Her organizasyonda üç rol vardır (Owner, Admin, Viewer) ve her işlemde sunucu tarafında uygulanır. Bkz. [Roller ve izinler](https://docs.uavmatrix.com/tr/fleet-manager/team/roles-and-permissions/).
- SSH terminali ve UAVcast-Pro'ya uzaktan erişim yalnızca Owner ve Admin rollerine açıktır.
- Davet bağlantıları şifrelidir, yalnızca bir kez kullanılabilir ve 7 gün sonra sona erer.
- UAVmatrix, kullanım koşullarını ihlal eden hesapları veya organizasyonları askıya alabilir. Askıya alınan kullanıcılar, nedeni ve destek iletişim bilgisiyle birlikte **Account Suspended** veya **Organization Suspended** mesajını görür.

## Fleet Manager'ın sakladığı veriler

| Veri | Saklama süresi |
| --- | --- |
| Telemetri (konum, yükseklik, hız, yön, batarya, mod, arm durumu, GPS, servis durumu), saniyede bir | Organizasyonun saklama ayarına göre: 7 gün ile 1 yıl arası (varsayılan 1 yıl). 7 gün sonra sıkıştırılır. Drone kaldırıldığında silinir. |
| Kaydedilmiş uçuş adları ve zaman aralıkları | Silinene kadar veya drone kaldırılana kadar |
| Drone'lara gönderilen komutlar, kimin gönderdiğiyle birlikte | Drone kaldırılana kadar |
| İşlem günlüğü (kimin eşleştirdiği, kaldırdığı, davet ettiği, rol değiştirdiği) | Drone'lar veya üyeler kaldırıldığında da tutulur |
| Görevler | Silinene kadar veya organizasyon silinene kadar |
| Destek talepleri ve ekran görüntüleri | Destek için saklanır |

Fleet Manager video saklamaz. Yer kontrol istasyonlarına giden video ve MAVLink, cihazlarınız arasında VPN üzerinden iletilir; Fleet Manager bunları kaydetmez.

Terminal ve uzaktan UAVcast-Pro proxy'si, Fleet Manager'ın şifreli bağlantısı üzerinden drone'a iletilir; içerikleri saklanmaz.

Ağlar izin verdiğinde VPN trafiği doğrudan cihazlarınız arasında gider. İzin vermediğinde (örneğin sıkı NAT veya mobil operatör arkasında), Tailscale'in genel röle (DERP) sunucularına geçer. Her durumda trafik WireGuard ile uçtan uca şifreli kalır; UAVmatrix bir röle işletmez.

## Üçüncü taraflar

- **Haritalar:** harita kareleri Esri'den gelir; hava sahası katmanı Fleet Manager üzerinden OpenAIP'den gelir.
- **FleetBot:** sohbet mesajları yanıt üretmek için Anthropic'e gönderilir. Organizasyonunuzdan başka hiçbir veri gönderilmez. Bkz. [Destek ve FleetBot](https://docs.uavmatrix.com/tr/fleet-manager/support/#ask-fleetbot).
- **Ürün analitiği ve hata raporları:** Fleet Manager, hangi sayfaların açıldığı ve hangi düğmelerin kullanıldığı gibi kullanım analitiği için ve uygulama hatalarını bildirmek için PostHog kullanır.

Source: https://docs.uavmatrix.com/tr/fleet-manager/security/
