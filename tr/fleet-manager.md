# Fleet Manager

> UAVmatrix Fleet Manager, UAVcast-Pro çalıştıran her drone'u tek bir canlı haritada izler; uzaktan kontrol, görevler, yer kontrol istasyonlarına VPN üzerinden yayın ve ekip rolleri sunar.

UAVmatrix Fleet Manager, birden fazla drone'u tek bir yerden yönetmek için [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) adresinde çalışan bir web uygulamasıdır. UAVcast-Pro çalıştıran her drone, organizasyonunuza eşleştirilebilir. Bundan sonra drone'u canlı bir haritada görür, terminalini açabilir, komut gönderebilir, görev yükleyebilir ve videosu ile telemetrisini pilotlarınızın kullandığı yer kontrol istasyonlarına yönlendirebilirsiniz.

![Fleet Manager dashboard with stats cards, UAV status list and recent activity](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/dashboard.webp)

*Dashboard: istatistik kartları, UAV Status listesi ve birkaç ekip üyesinden gelen Recent Activity.*

## Bununla neler yapabilirsiniz

[İlk drone'unuzu ekleyinUAVcast-Pro drone'unu yaklaşık iki dakika içinde 8 haneli bir kodla eşleştirin.](https://docs.uavmatrix.com/tr/fleet-manager/pair-uav/)[Filoyu canlı izleyinHer drone tek bir haritada; durum halkaları, 5 dakikalık iz ve takip modu ile.](https://docs.uavmatrix.com/tr/fleet-manager/map/)[Drone'ları uzaktan kontrol edinUçuş modları, arm et ve disarm et, görevler ve uçuş öncesi kalibrasyon, tarayıcıdan.](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remote-control/)[Yer kontrol istasyonlarına yayın yapınBirçok drone'dan video ve MAVLink verisini VPN üzerinden QGroundControl veya Mission Planner'a gönderin.](https://docs.uavmatrix.com/tr/fleet-manager/network/stream-bindings/)[Ekibinizi davet edinOrganizasyon başına Owner, Admin ve Viewer rolleri.](https://docs.uavmatrix.com/tr/fleet-manager/team/)[Görev planlayınYol noktaları çizin, görevleri organizasyon için kaydedin ve istediğiniz drone'a yükleyin.](https://docs.uavmatrix.com/tr/fleet-manager/missions/)

## Parçaların birlikte çalışma biçimi

Fleet Manager, uçuş kontrolcüsüyle doğrudan iletişim kurmaz. Bunu, drone'un eşlik eden bilgisayarı (companion computer) üzerindeki UAVcast-Pro yapar ve Fleet Manager ile tek bir şifreli bağlantıyı sürdürür:

1. **Eşleştirme.** UAVcast-Pro, Fleet Manager'dan bir eşleştirme kodu ister. Kodu Fleet Manager'a girersiniz. Fleet Manager, ardından drone'a kendi istemci sertifikasını verir.
2. **Kontrol kanalı.** Drone, Fleet Manager'ın MQTT aracısına TLS üzerinden **8883** portundan bağlanır ve bu sertifika ile kimlik doğrular. Telemetri, kalp atışları, komutlar, terminal oturumları ve UAVcast-Pro web arayüzüne uzaktan erişim bu bağlantı üzerinden akar. Drone her zaman dışarıya doğru bağlandığı için NAT ve hücresel ağlarda da çalışır.
3. **Veri kanalı (isteğe bağlı).** Yer kontrol istasyonuna giden video ve MAVLink verisi, Fleet Manager tarafından yönetilen WireGuard ağı olan organizasyonunuzun özel VPN'i üzerinden eşler arası iletilir. VPN olmadan Fleet Manager drone'u yine gösterir ve kontrol eder, ancak yayınları yönlendirmez.

## Kavramlar

| Terim | Fleet Manager'daki anlamı |
| --- | --- |
| **Organizasyon** | Şirketiniz veya ekibiniz. Drone'lar, görevler, VPN ağı ve üyeler tek bir organizasyona aittir. Her kullanıcı bir organizasyonun sahibi olabilir ve diğer birçok organizasyonun üyesi olabilir. |
| **UAV** | UAVcast-Pro çalıştıran bir drone (veya rover, tekne ya da başka bir araç); aynı anda yalnızca bir organizasyona eşleştirilir. Fleet Manager onu, UAVcast-Pro'nun eşlik eden bilgisayarın CPU seri numarası ve önyükleme diskinden türettiği bir cihaz kimliğiyle tanır; böylece yeniden başlatmalar ve ağ değişikliklerinde kimliğini korur. |
| **Eşleştirme** | Bir UAV'yi, UAVcast-Pro'nun gösterdiği 8 haneli kodla bir organizasyona bağlamak. Kod 5 dakika geçerlidir. |
| **Yer kontrol istasyonu (GCS)** | QGroundControl, Mission Planner veya benzeri bir yazılımın çalıştığı dizüstü bilgisayar ya da PC; yayınları alabilmesi için organizasyonunuzun VPN'ine katılır. |
| **Akış bağlama (stream binding)** | "Bu UAV'nin videosunu ve telemetrisini şu yer kontrol istasyonuna gönder" diyen bir kural. Her bağlama kendi UDP portlarını alır; böylece bir yer kontrol istasyonu aynı anda birçok drone'u alabilir. |
| **Roller** | **Owner**, **Admin** veya **Viewer**, organizasyon bazında ayarlanır. Viewer'lar izleyebilir; Admin'ler ve Owner eşleştirebilir, kontrol edebilir ve yapılandırabilir. Bkz. [Roller ve izinler](https://docs.uavmatrix.com/tr/fleet-manager/team/roles-and-permissions/). |
| **Lisanslar ve koltuklar** | Eşleştirilen her UAV, organizasyonun bir üyesine ait etkin bir UAVcast-Pro lisansı gerektirir. Ekip üyeleri koltuk tüketmez. Bkz. [Lisanslar](https://docs.uavmatrix.com/tr/fleet-manager/licenses/). |
| **Durum ve uyarılar** | Harita ve filo listesinde çevrimiçi, çevrimdışı, MAVLink yok ve GPS uyarıları ile sistem duyuruları. Bkz. [Durum göstergeleri ve bildirimler](https://docs.uavmatrix.com/tr/fleet-manager/alerts-and-status/). |

## Gereksinimler

Fleet Manager, UAVcast-Pro lisansınıza dahildir: ayrı bir abonelik ve ek koltuk gerekmez.

> Fleet Manager, UAVcast-Pro lisansına dahildir. Eşleştirdiğiniz her drone için bir lisans gerekir.
>
> [UAVcast-Pro satın al](https://uavmatrix.com/tr/checkout) · [Planları ve fiyatları gör](https://uavmatrix.com/tr/products)

- Bir UAVmatrix hesabı ([uavmatrix.com](https://uavmatrix.com/) adresinde lisans satın alırken kullandığınız hesap).
- UAVcast-Pro kurulu ve lisansı etkinleştirilmiş en az bir eşlik eden bilgisayar. Bkz. [Kurulum](https://docs.uavmatrix.com/tr/get-started/installation/) ve [Lisansınızı etkinleştirin](https://docs.uavmatrix.com/tr/get-started/license-activation/).
- Drone'da dışa doğru HTTPS (443) ve TCP **8883** açık internet bağlantısı.

## Buradan başlayın

1. [Organizasyonunuzu kurun](https://docs.uavmatrix.com/tr/fleet-manager/set-up-organization/)
2. [İlk drone'unuzu ekleyin](https://docs.uavmatrix.com/tr/fleet-manager/pair-uav/)
3. [Bir yer kontrol istasyonu bağlayın](https://docs.uavmatrix.com/tr/fleet-manager/connect-gcs/)
4. [Ekibinizi davet edin](https://docs.uavmatrix.com/tr/fleet-manager/team/)

Source: https://docs.uavmatrix.com/tr/fleet-manager/
