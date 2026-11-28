# Durum göstergeleri ve bildirimler

> Fleet Manager'ın çevrimdışı, MAVLink yok, GPS, failsafe ve batarya göstergelerinin anlamı; ayrıca sistem duyuruları, durum sayfası ve uyarılar.

Fleet Manager, sorunları baktığınız yerde gösterir: haritada, filo listesinde ve her drone'un sayfasında. Bu sayfada her göstergeyi ve bunun için ne yapmanız gerektiğini listeliyoruz.

## Drone göstergeleri

| Gösterge | Nerede | Anlamı | İlk kontrol edilecek şey |
| --- | --- | --- | --- |
| **OFFLINE**, saat rozetli gri işaret | Filo, harita, UAV sayfası | UAVcast-Pro'dan 20 saniyedir hiçbir veri alınmadı | Drone'un internet bağlantısını ve 8883 portunu kontrol edin. Bkz. [Fleet Manager'da drone çevrimdışı](https://docs.uavmatrix.com/tr/troubleshooting/drone-offline-fleet-manager/). |
| **NO MAVLINK**, turuncu halka ve **!** | Harita | UAVcast-Pro çevrimiçi, ancak 10 saniyedir uçuş kontrolcüsünden veri alınmadı | Uçuş kontrolcüsünün gücünü ve kablosunu kontrol edin. Bkz. [MAVLink kalp atışı yok](https://docs.uavmatrix.com/tr/troubleshooting/no-mavlink-heartbeat/). |
| Kırmızı kesikli halka, **NO GPS** | Harita | Uydu yok veya konum sabitlenemedi | Anteninin gökyüzünü görmesini ve GPS kablosunu kontrol edin. |
| Sarı kesikli halka, **WEAK GPS** | Harita | 6'dan az uydu veya yalnızca 2D konum | Uçuştan önce daha fazla uydu görünene kadar bekleyin. |
| Batarya sarı / kırmızı | Filo kartları | %50'nin altında / %20'nin altında | İniş planlayın. |
| **ARMED** | UAV sayfası, kontrol paneli, harita açılır penceresi | Motorlar arm edildi | Hava aracını canlı kabul edin. |
| **FAILSAFE** | UAV sayfası, kontrol paneli | Uçuş kontrolcüsü failsafe modunda | Uçuş kontrolcüsünün mesajları; harita açılır penceresinde ve **Logs** bölümünde gösterilir. |
| **GCS FAILSAFE** / **GCS Failsafe not enabled** | UAV sayfası, kontrol paneli | Yer kontrol istasyonu failsafe'i tetiklendi veya yapılandırılmadı | BVLOS uçuşlarından önce `FS_GCS_ENABLE` parametresini ayarlayın. |
| **Re-pair required** | Filo, UAV sayfası | Drone eski bir bağlantı sertifikası kullanıyor | [Drone'u yeniden eşleştirin](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone). |
| **Signal** zayıf | Harita açılır penceresi | Drone'a gidiş-dönüş süresi 600 ms'nin üzerinde veya üç ping kaçtı | Hücresel kapsamayı veya yoğun bağlantıyı kontrol edin. |

Göstergeler, sayfa açık olduğu sürece canlı güncellenir. Fleet Manager, çevrimdışı drone'ları her 5 saniyede bir kontrol eder.

![Çevrimdışı, MAVLink yok ve zayıf GPS halkalarını gösteren işaretlerle harita yakın görünümü](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/map--indicators.webp)

*Dört işaretin yakın görünümü: sağlıklı bir drone, saat rozetli bir OFFLINE, turuncu halkalı bir NO MAVLINK ve sarı kesikli halkalı bir WEAK GPS.*

## Etkinlik günlüğü

Ekibinizin yaptığı değişiklikler (eşleştirme, drone kaldırma, akış bağlamaları, davetler, rol değişiklikleri, VPN) kimin yaptığıyla birlikte [Dashboard](https://docs.uavmatrix.com/tr/fleet-manager/dashboard/) sayfasında **Recent Activity** altında kaydedilir.

## Sistem duyuruları

UAVmatrix planlı bakım veya bir olay bildirdiğinde, her sayfanın üstünde bir şerit görünür: bilgi için mavi, uyarı için kehribar, kritik durumlar için kırmızı. Şeridi kapatmak, Fleet Manager'ı yeni bir tarayıcı oturumunda açana kadar onu gizler.

## Durum sayfası

**System → Status** (**System Status** sayfası), Fleet Manager'ın normal çalışıp çalışmadığını gösterir: her şey yolundaysa **All systems operational**, sorun varsa **We're experiencing some issues** ve **Active Incidents** listesi görünür. **Past Incidents**, son çözülen olayları ve **Resolution** bilgilerini listeler. Birçok drone aynı anda çevrimdışı olursa önce bu sayfayı kontrol edin.

![Tüm sistemlerin çalıştığını ve geçmiş olayların listesini gösteren System Status sayfası](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/status.webp)

*Tüm sistemlerin çalıştığını ve çözüldü olarak işaretlenmiş iki geçmiş olayı gösteren System Status.*

## E-posta ve webhook uyarıları

Fleet Manager, şimdilik drone olayları (örneğin düşük batarya veya çevrimdışı olan bir drone) için e-posta, SMS veya webhook uyarısı göndermez. Kontrol odasında haritayı veya filo listesini açık tutun ve batarya ile bağlantı kaybı için uçuş kontrolcüsünün kendi failsafe'lerine güvenin.

Source: https://docs.uavmatrix.com/tr/fleet-manager/alerts-and-status/
