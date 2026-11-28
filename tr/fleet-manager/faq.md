# Fleet Manager SSS

> Fleet Manager ile ilgili sık sorulan sorular: drone limitleri, lisanslar, VPN, yer kontrol istasyonları, ArduPilot ve PX4, veri saklama ve drone taşıma.

### Fleet Manager'ı kullanmak için neye ihtiyacım var?

Bir UAVmatrix hesabına ve etkin bir lisansa sahip, UAVcast-Pro çalıştıran drone'lara ihtiyacınız var. Her drone'un lisansı, kuruluşunuzun bir üyesine ait olmalıdır. Bkz. [Lisanslar ve koltuklar](https://docs.uavmatrix.com/tr/fleet-manager/licenses/).

### Fleet Manager ek ücrete tabi mi?

Hayır. Fleet Manager, UAVcast-Pro lisansınıza dahildir. Ayrı bir abonelik yoktur ve ekip üyeleri ücretsizdir.

### En fazla kaç drone yönetebilirim?

Fleet Manager'ın kendisi bir limit koymaz. Her drone kendi UAVcast-Pro lisans etkinleştirmesine ihtiyaç duyar; bu nedenle drone sayısı, sahip olduğunuz lisanslara ve cihaz yuvalarına bağlıdır.

### Ekip üyelerinin lisansa ihtiyacı var mı?

Hayır. İhtiyacınız kadar Admin ve Viewer davet edebilirsiniz. Bkz. [Ekibinizi davet edin](https://docs.uavmatrix.com/tr/fleet-manager/team/).

### Hangi roller var?

**Owner**, **Admin** ve **Viewer**. "Member" rolü yoktur. Bkz. [Roller ve izinler](https://docs.uavmatrix.com/tr/fleet-manager/team/roles-and-permissions/).

### Eşleştirme kodu nereden geliyor?

Drone'dan gelir. UAVcast-Pro'da **Fleet Management → Connect to Fleet Manager** seçeneğini açın. 5 dakika geçerli, 8 haneli bir kod gösterir. Bu kodu Fleet Manager'da **Fleet → Pair Device** altına yazarsınız. Bkz. [İlk drone'unuzu ekleyin](https://docs.uavmatrix.com/tr/fleet-manager/pair-uav/).

### Fleet Manager 4G/LTE üzerinde çalışıyor mu?

Evet. Drone, TCP 8883 üzerinden Fleet Manager'a dışa doğru bağlanır; bu nedenle genel IP adresi olmadan operatör NAT'ının arkasında da çalışır. Operatörün 8883 portunu engellememesi gerekir.

### VPN'e ihtiyacım var mı?

Yalnızca Fleet Manager üzerinden drone'lardan yer kontrol istasyonlarına video ve telemetri göndermek için. Harita, telemetri, komutlar, görevler, terminal ve UAVcast-Pro'ya uzaktan erişim VPN olmadan da çalışır. Bkz. [Ağ ve VPN](https://docs.uavmatrix.com/tr/fleet-manager/network/).

### Bir yer kontrol istasyonu birden çok drone alabilir mi?

Evet. Her [akış bağlaması](https://docs.uavmatrix.com/tr/fleet-manager/network/stream-bindings/) o yer kontrol istasyonunda kendi port bloğunu alır; ikinci bir kamera ve ses için de yer vardır. İlk drone 5600 / 14550 portlarını kullanır.

### Kendi ZeroTier veya Tailscale ağımı kullanmaya devam edebilir miyim?

Evet, Fleet Manager'ın akış bağlamalarına ihtiyacınız yoksa. Eşleştirme sırasında VPN'i reddedebilirsiniz. Kabul ederseniz, zaten bir Tailscale ağında olan bir drone kuruluşunuzun ağına taşınır. ZeroTier üzerindeki bir drone ZeroTier ağını korur ve kuruluşun ağına onunla birlikte katılır; ZeroTier yalnızca drone'un eşleştirmesini kaldırdığınızda bırakılır.

### ArduPilot ve PX4 ile çalışıyor mu?

Fleet Manager, UAVcast-Pro'nun konuştuğu her MAVLink uçuş kontrolcüsüyle çalışır; ArduPilot veya PX4 fark etmez. Canlı harita, telemetri, durum, terminal ve akış bağlamaları aynıdır. Uçuş modu kontrolleri Copter, Plane, Rover ve Sub için ArduPilot modlarını kullanır ve görev komut listesi ArduPilot adlandırmasını izler. Bu nedenle PX4'te modları değiştirmek ve görev planlamak için yer kontrol istasyonunuzu kullanın.

### Fleet Manager'dan yalnızca bir drone uçurabilir miyim?

Fleet Manager modları değiştirebilir, arm edebilir ve görevleri başlatabilir, duraklatabilir ve durdurabilir. Manuel kumanda kontrolü için tasarlanmamıştır. Her zaman bir yer kontrol istasyonu veya RC verici ile bir pilotun kontrolde olmasını sağlayın ve yerel düzenlemelere uyun.

### Uçuş geçmişi ne kadar süre saklanır?

Varsayılan olarak 1 yıla kadar. Owner ve Admin'ler bunu 7, 14, 30, 60 veya 90 güne ya da 6 aya kısaltabilir. Bkz. [Uçuş geçmişi](https://docs.uavmatrix.com/tr/fleet-manager/map/flight-history/#how-long-history-is-kept).

### Uçuş günlüklerini dışa aktarabilir miyim?

Bugün hayır. Fleet Manager uçuşları haritada yeniden oynatır, ancak dosya dışa aktarmaz ve `.tlog`, DataFlash veya video dosyalarını saklamaz.

### Fleet Manager e-posta ile uyarı gönderiyor mu?

Henüz değil. Durum; harita, filo listesi ve UAV sayfalarında canlı olarak gösterilir. Bkz. [Durum göstergeleri ve bildirimler](https://docs.uavmatrix.com/tr/fleet-manager/alerts-and-status/).

### Bir drone bağlantısını kaybederse ne olur?

20 saniye veri gelmezse **OFFLINE** olarak gösterilir ve bağlantısı geri geldiğinde kendi kendine yeniden bağlanır. Uçağın ne yapacağına uçuş kontrolcüsünün kendi failsafe'leri karar verir; Fleet Manager bağlantı kaybında hiçbir komut göndermez.

### Bir drone'u başka bir kuruluşa nasıl taşırım?

Drone'u mevcut kuruluştan kaldırın (bu, oradaki geçmişini siler), ardından yeni kuruluşa eşleştirin. Bkz. [Drone'u yeniden eşleştirme, kaldırma veya devretme](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remove-or-transfer/).

### Lisanslarımı farklı bir e-posta ile satın aldım. Şimdi ne yapmalıyım?

Bu e-postayı kuruluşa davet edin veya destekten bu e-postayı hesabınıza ek bir lisans e-postası olarak eklemelerini isteyin. Bkz. [Başka bir e-postayla satın alınan lisanslar](https://docs.uavmatrix.com/tr/fleet-manager/licenses/#licenses-bought-with-another-email).

### Mobil uygulama var mı?

Tarayıcıda telefona uygun bir [Lite görünüm](https://docs.uavmatrix.com/tr/fleet-manager/lite-view/) var.

### Verilerim güvende mi?

Her drone kendi TLS istemci sertifikasına sahiptir, her kuruluşun kendi şifreli VPN'i vardır ve roller sunucu tarafında uygulanır. Bkz. [Güvenlik ve gizlilik](https://docs.uavmatrix.com/tr/fleet-manager/security/).

Source: https://docs.uavmatrix.com/tr/fleet-manager/faq/
