# Ağ ve VPN

> Fleet Manager'da organizasyonunuzun özel WireGuard VPN'ini etkinleştirin, drone'ları ve yer kontrol istasyonu dizüstü bilgisayarlarını bağlayın ve cihaz tablosunu yönetin.

Her organizasyon kendi özel VPN'ine sahip olabilir: drone'larınız ile yer kontrol istasyonlarınız arasında, Fleet Manager tarafından yönetilen bir WireGuard mesh ağı. Bu ağda her cihaz sabit bir `100.x.y.z` adresi alır ve 4G, Wi-Fi ya da uydu üzerinde olsa bile port yönlendirme veya genel IP adresi olmadan diğerlerine doğrudan ulaşabilir.

Fleet Manager, [akış bağlamalarını](https://docs.uavmatrix.com/tr/fleet-manager/network/stream-bindings/) yönlendirmek için bu ağı kullanır: drone'dan, pilotların QGroundControl veya Mission Planner çalıştırdığı dizüstü bilgisayarlara video ve MAVLink verisi.

Tüm bunlar **Network** sayfasındadır (kenar çubuğunda **Fleet Management → Network**).

## VPN'e ne zaman ihtiyacım var?

VPN **isteğe bağlıdır**: Fleet Manager, drone'ları VPN olmadan da kendi şifreli bağlantısı üzerinden gösterir, haritalar ve kontrol eder. Yayınların yer kontrol istasyonlarına ulaşmasını istediğinizde VPN'i açın.

| VPN önerilir | VPN gerekmez |
| --- | --- |
| Drone ve yer kontrol istasyonu farklı ağlarda (4G, uzak sahalar) | Drone ve yer kontrol istasyonu aynı yerel Wi-Fi'da |
| Doğrudan video ve telemetri yayını istiyorsunuz | USB veya seri telemetri bağlantısı kullanıyorsunuz |
| Siteler arasında şifreli bağlantılar gerekiyor | Kontrollü bir ortamda test yapıyorsunuz |
| Birden fazla lokasyonda çalışıyorsunuz |  |

## VPN'i etkinleştirme

Yalnızca Owner ve Admin.

1. **Network** sayfasını açın. VPN kapalıysa sayfa **Enable VPN Network** ve sağladıklarını gösterir: WireGuard tabanlı güvenli bağlantılar, düşük gecikmeli video ve telemetri akışı ve herhangi bir ağda çalışma.
2. **Enable VPN Network** seçeneğini seçin.

![VPN etkin olmayan bir organizasyon için Enable VPN Network kartı bulunan Network sayfası](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/network--enable.webp)

*VPN etkinleştirilmeden önceki Network sayfası; üç avantaj ve Enable VPN Network düğmesi.*

VPN açıldığında sayfa dört sayaç (**Total Devices**, **Online**, **UAVs**, **Ground Stations**) ve üç sekme gösterir: **Devices**, **Stream Bindings** ve **Settings**.

![Durum sayaçları ve bağlı cihazlar tablosu bulunan Network sayfasının Devices sekmesi](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/network.webp)

*Network → Devices, büyük bir operatör için: Total Devices 51, Online 39, UAVs 44, Ground Stations 7 ve Connected Devices tablosu.*

## Drone'ları VPN'e ekleme

Drone'lar için hiçbir zaman manuel komut gerekmez. İki yol vardır:

- **Eşleştirirken.** Eşleştirmeden önce VPN etkinse, sihirbazın **VPN Connection** adımı drone'u ağa katar. Bkz. [İlk drone'unuzu ekleyin](https://docs.uavmatrix.com/tr/fleet-manager/pair-uav/).
- **Push to Drone.** VPN etkinleştirilmeden önce eşleştirilmiş drone'lar için **Devices** sekmesindeki **Push to Drone** kartı, ağınızda olmayan her drone'u listeler. Bir drone'un yanındaki **Connect** seçeneğini seçerek ona VPN ayarlarını gönderin. Drone çevrimiçi olmalıdır.

Bir drone zaten başka bir Tailscale ağındaysa **Existing VPN** rozeti taşır. **Connect**, onay ister (**Existing VPN Connection Detected**). **Replace & Connect** ise drone'u organizasyonunuzun ağına taşır.

Drone, **Connected Devices** listesinde **UAV** tipi ve VPN adresiyle görünür. UAV sayfasında **Open via VPN** düğmesi çıkar.

## Yer kontrol istasyonlarını VPN'e ekleme

Yer kontrol istasyonları, **Connect a Device** bölümündeki tek bir Tailscale komutuyla katılır. [Yer kontrol istasyonu bağlama](https://docs.uavmatrix.com/tr/fleet-manager/connect-gcs/) adımlarını izleyin.

## Bağlı cihazlar

Tablo, ağdaki her cihazı listeler:

| Sütun | Gösterdiği |
| --- | --- |
| **Status** | VPN'de çevrimiçi veya çevrimdışı |
| **Device** | Ad ve ana bilgisayar adı |
| **Type** | **UAV**, **GCS** veya **Unknown**. Bilinmeyen cihazların **Configure** düğmesi vardır. |
| **IP Address** | Cihazın VPN adresi (`100.x.y.z`) |
| **Last Check-in** | Cihazın ağda en son görüldüğü zaman |

Listeyi VPN sunucusundan yenilemek için **Sync** seçin. Her satırın işlem menüsünde şunlar bulunur:

- **Rename**: okunabilir bir ad, örneğin "Saha dizüstü bilgisayarı – Ekip Kuzey".
- **Change Type**: **UAV**, **GCS** ve **Unknown** arasında geçiş yapın. UAV için hangi eşleştirilmiş drone olduğunu seçin.
- **Remove Device**: cihazı ağdan çıkarır. Drone için Fleet Manager, drone'a VPN'den ayrılmasını söyler ve yayın bağlamaları kaldırılır.

### Bilinmeyen bir cihazı yapılandırma

Yeni yer kontrol istasyonları **Unknown** olarak görünür ve bir şerit yapılandırma gerektiren cihazları sayar. **Configure** seçeneğini seçin ve **What type of device is this?** sorusunu yanıtlayın:

- **Ground Control Station (GCS):** QGroundControl, Mission Planner veya benzerini çalıştıran bir bilgisayar. Video ve telemetriyi **alır** ve yayın bağlamaları için kullanılabilir olur.
- **Drone / UAV:** UAVcast-Pro çalıştıran bir drone. Yayınını yönetebilmeniz için eşleştirilmiş hangi drone olduğunu seçin.

**Continue**, ardından **Complete Setup** seçeneğini seçin.

## Settings sekmesi

**Danger Zone → Delete Network**, VPN ağını, bağlı tüm cihazları, tüm kimlik doğrulama anahtarlarını ve tüm yayın bağlamalarını kalıcı olarak siler. Cihazlar ağdan düşer ve her yer kontrol istasyonunu ve drone'u yeniden bağlamanız gerekir.

Ağı silmek, organizasyon için VPN'i de kapatır ve çevrimiçi UAV'lere VPN'den ayrılmaları bildirilir. Network sayfası bunun ardından **Enable VPN Network** düğmesini yeniden gösterir; bu da yeni, boş bir ağ oluşturur. VPN'i kapatmak için ayrı bir anahtar yoktur: **Delete Network** bunun yoludur.

## Ağ gereksinimleri

| Cihaz | Dışa doğru gereken |
| --- | --- |
| Drone (Fleet Manager bağlantısı) | `fleet-manager.uavmatrix.com` adresine HTTPS (TCP 443), TLS üzerinden MQTT için TCP 8883 |
| Drone ve yer kontrol istasyonu (VPN) | `vpn-connect.uavmatrix.com` adresine HTTPS (TCP 443), ayrıca WireGuard için UDP. Tailscale varsayılan olarak UDP 41641 kullanır. |

Çoğu hücresel ve ofis ağı buna izin verir. Cihazlar VPN'e katılıp birbirine ulaşamıyorsa bkz. [VPN bağlı ama drone'a ulaşılamıyor](https://docs.uavmatrix.com/tr/troubleshooting/vpn-cant-reach-drone/).

İki cihaz UDP üzerinden doğrudan iletişim kuramazsa trafikleri, Tailscale'in genel DERP röle sunucuları üzerinden HTTPS (TCP 443) ile aktarılır. Uçtan uca şifreli kalır, ancak röle gecikme ekler; bu nedenle mümkün olduğunda dışa doğru UDP'ye izin verin.

Source: https://docs.uavmatrix.com/tr/fleet-manager/network/
