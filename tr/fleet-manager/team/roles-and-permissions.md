# Roller ve izinler

> Fleet Manager'ın Owner, Admin ve Viewer rolleri için tam izin matrisi: eşleştirme, uçuş komutları, terminal, görevler, VPN ve ekip.

Fleet Manager'da organizasyon bazında ayarlanan üç rol vardır. Bir kişi bir organizasyonda Admin, başka bir organizasyonda Viewer olabilir.

| Rol | Kısaca |
| --- | --- |
| **Owner** | Admin'in yapabildiği her şey, ayrıca organizasyonu silme ve sahipliği devretme. Her organizasyonda tam olarak bir tane bulunur: organizasyonu oluşturan kişi veya sahipliği devredilen kişi. |
| **Admin** | Filoyu yönetir: drone'ları eşleştirir ve kaldırır, komut gönderir, terminali açar, görevleri planlar ve yükler, VPN'i ve akış bağlamalarını yönetir ve ekibi yönetir. |
| **Viewer** | Salt okunur. Dashboard, filo, canlı harita, uçuş geçmişi, görevler, ağ ve ekibi görür, ancak hiçbir şeyi değiştiremez veya komut veremez. |

Yeni üyeler Admin veya Viewer olarak davet edilir. Owner rolü yalnızca [Transfer Ownership](https://docs.uavmatrix.com/tr/fleet-manager/team/#transfer-ownership) yoluyla el değiştirir.

## İzin matrisi

Bu matris, Fleet Manager'ın sunucuda uyguladığı izin kurallarından oluşur; bu nedenle gizlenmiş bir düğme hiçbir zaman tek koruma değildir.

| İşlem | Owner | Admin | Viewer |
| --- | --- | --- | --- |
| **Filo ve drone'lar** |  |  |  |
| Dashboard, filo listesi, UAV sayfaları ve canlı haritayı görme | ✓ | ✓ | ✓ |
| Uçuş geçmişi oynatmayı izleme | ✓ | ✓ | ✓ |
| Adlandırılmış uçuşları kaydetme, yeniden adlandırma ve silme | ✓ | ✓ | – |
| Drone eşleştirme (**Pair Device**) | ✓ | ✓ | – |
| Drone'u yeniden adlandırma, harita rengini değiştirme | ✓ | ✓ | – |
| Drone kaldırma | ✓ | ✓ | – |
| **Komutlar** |  |  |  |
| Uçuş modunu, RTL, Loiter ve Circle'ı değiştirme | ✓ | ✓ | – |
| Arm et, disarm et, zorla arm et | ✓ | ✓ | – |
| Uçuş öncesi kalibrasyon | ✓ | ✓ | – |
| Drone'da görevleri başlatma, durdurma ve okuma | ✓ | ✓ | – |
| Eşlik eden bilgisayarı yeniden başlatma veya kapatma | ✓ | ✓ | – |
| UAV sayfasında SSH **Terminal** | ✓ | ✓ | – |
| **Open via Proxy** (Fleet Manager üzerinden UAVcast-Pro web arayüzü) | ✓ | ✓ | – |
| **Görevler** |  |  |  |
| Kaydedilmiş görevleri görüntüleme | ✓ | ✓ | ✓ |
| Görev oluşturma, düzenleme ve silme | ✓ | ✓ | – |
| **Upload to Drone** | ✓ | ✓ | – |
| **Ağ ve VPN** |  |  |  |
| Network sayfasını, cihazları ve akış bağlamalarını görme | ✓ | ✓ | ✓ |
| VPN auth key ve **GCS Connection Command** görme | ✓ | ✓ | – |
| VPN'i etkinleştirme, auth key üretme, **Push to Drone** | ✓ | ✓ | – |
| VPN cihazlarını yeniden adlandırma, türünü değiştirme veya kaldırma | ✓ | ✓ | – |
| Akış bağlamaları ekleme, duraklatma veya kaldırma | ✓ | ✓ | – |
| VPN ağını silme | ✓ | ✓ | – |
| **Ekip** |  |  |  |
| Üyeleri ve rolleri görme | ✓ | ✓ | ✓ |
| Üye davet etme (Admin veya Viewer olarak) | ✓ | ✓ | – |
| Üyenin rolünü değiştirme (Owner'ınki hariç) | ✓ | ✓ | – |
| Üyeleri kaldırma (Owner hariç), davetleri iptal etme | ✓ | ✓ | – |
| Sahipliği devretme | ✓ | – | – |
| **Organizasyon ve ayarlar** |  |  |  |
| Organizasyonu yeniden adlandırma, açıklamasını düzenleme | ✓ | ✓ | – |
| Telemetri saklamasını değiştirme, geçmişi temizleme veya silme | ✓ | ✓ | – |
| Organizasyonu silme | ✓ | – | – |
| **Herkes** |  |  |  |
| FleetBot'u kullanma, kendi destek taleplerini oluşturma ve kapatma | ✓ | ✓ | ✓ |
| Kendi profilini düzenleme (UAVmatrix hesabında) | ✓ | ✓ | ✓ |

> **Admin'ler diğer Admin'leri yönetebilir**
>
> Bir Admin, yeni Admin'leri davet edebilir, başka bir Admin'i Viewer'a düşürebilir ve diğer Admin'leri kaldırabilir. Admin rolünü yalnızca tüm filoya güvenebileceğiniz kişilere verin. Bir Admin'in değiştiremediği tek üye Owner'dır.

> **Viewer'lar neleri görür**
>
> Viewer'lar aynı sayfaları, kontrolleri olmadan görür. UAV kontrol paneli bir Viewer'a canlı durumu ve günlükleri gösterir; ancak uçuş modu, görev veya arm düğmeleri ve Terminal sekmesi gösterilmez. **Network** sayfasında Viewer'lar VPN auth key'i görmez: *Only Owners and Admins can see the VPN auth key.* Fleet Manager ayrıca her komutu sunucuda denetler; bu nedenle bir Viewer başka bir yolla da komut gönderemez.

## Ticari bir filo için rol seçimi

| Kişi | Önerilen rol |
| --- | --- |
| Filo veya operasyon yöneticisi | Owner (tek kişi) |
| Pilotlar, teknisyenler, yeni hava araçlarını eşleştiren kişi | Admin |
| Görevlerini canlı takip eden müşteriler, yönetim, denetçiler | Viewer |
| Drone'larınızı uçurması gereken taşeronlar | Admin, iş bittiğinde kaldırılır |

## Rol değil: süper yönetici

UAVmatrix personelinin tüm organizasyonlarda geçerli ayrı bir destek rolü vardır. Bu rol, bir hesaba [ek lisans e-postaları eklemek](https://docs.uavmatrix.com/tr/fleet-manager/licenses/#licenses-bought-with-another-email) gibi destek görevleri için kullanılır. Organizasyonunuzun bir parçası değildir ve atanamaz.

Source: https://docs.uavmatrix.com/tr/fleet-manager/team/roles-and-permissions/
