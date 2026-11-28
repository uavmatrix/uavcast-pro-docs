# Birden çok yer kontrol istasyonuna akış

> Tek bir drone'dan telemetri ve canlı videoyu, salt okunur gözlemcilerle birlikte birkaç QGroundControl veya Mission Planner istasyonuna UAVcast-Pro ile gönderin.

Bir drone, birkaç ekran: Mission Planner'da bir pilot, QGroundControl'de bir yük operatörü, ofisten izleyen bir yönetici. UAVcast-Pro, eklediğiniz her hedefe kendi anahtarlarıyla birlikte telemetri ve video gönderir.

## Nasıl çalışır

**Yer Kontrol İstasyonları** altındaki her kayıt bir hedeftir: bir IPv4 adresi, bir telemetri portu ve bir video portu. UAVcast-Pro şunları gönderir:

- **Telemetriyi Etkinleştir** açıkken, UDP üzerinden **Telemetri Portu**'na (varsayılan 14550) MAVLink telemetrisi,
- **Videoyu Etkinleştir** açıkken, RTP/UDP üzerinden **Video Portu**'na (varsayılan 5600) H.264 video,
- **Uç Noktayı Etkinleştir** kapalıyken hiçbir şey göndermez.

Her hedeften gelen komutlar uçuş kontrolcüsüne ulaşır; hedef **Read Only** olmadığı sürece.

## 1. Her istasyon için bir hedef ekleyin

1. **Yer Kontrol İstasyonları** bölümünü açın ve her istasyon için **Hedef Ekle** düğmesine bir kez basın.
2. Her birine, alanda tanıyacağınız bir **Ad** verin; örneğin *Pilot – Mission Planner* ve *Yük – QGC*.
3. Her bilgisayarın IPv4 adresini **Hedef IP veya Sunucu** alanına girin. 4G üzerinden çalışırken VPN adreslerini kullanın.
4. Gerektiği yerlerde **Telemetriyi Etkinleştir** ve **Videoyu Etkinleştir** seçeneklerini açın. Yalnızca telemetriye ihtiyacı olan bir istasyon, videoyu kapalı tutarak bant genişliği tasarrufu sağlar.

![İki hedef kartı ve Hedef Ekle düğmesi içeren Yer Kontrol İstasyonu sayfası](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/ground-control.webp)

*İki hedef kartlı Yer Kontrol İstasyonu. Hedef Ekle her istasyon için bir kart ekler.*

## 2. Gözlemcileri salt okunur yapın

Yalnızca izlemesi, asla uçurmaması gereken kişiler için hedeflerinde **Read Only** seçeneğini açın. İstasyon yine canlı telemetri alır, ancak araç üzerinde hiçbir şeyi değiştiremez: komutlar, mod değişiklikleri, arm işlemleri, parametre yazmaları, görev yazmaları ve RC geçersiz kılmaları engellenir. Bu, UAVcast-Pro 6.5.3'ten itibaren geçerlidir; önceki sürümlerde Read Only parametre yazmalarını engellemez. Bu modda yer kontrol istasyonu yazılımı uyarılar gösterebilir; çünkü bazı istekleri (parametreleri veya görevi indirme gibi) yanıtsız kalır.

> **Bir drone'da iki pilot**
>
> **Read Only** kullanılmazsa her istasyon drone'a komut verebilir. Kimin uçuracağını kararlaştırın ve diğer tüm istasyonları salt okunur yapın.

## 3. Bir bilgisayarda iki istasyon

Bir bilgisayardaki iki program aynı portu dinleyemez. Aynı IP'ye sahip ancak farklı portlara sahip iki hedef ekleyin; örneğin:

| Hedef | Telemetri Portu | Video Portu |
| --- | --- | --- |
| Mission Planner | 14550 | 5600 |
| QGroundControl | 14551 | 5603 |

Ardından ikinci programı bu portları dinleyecek şekilde ayarlayın (QGroundControl'de 14551 üzerinde bir UDP iletişim bağlantısı ekleyin ve video UDP portunu 5603 olarak ayarlayın).

Video portlarını **3 aralıklı** seçin (5600, 5603, 5606 …). Her hedef kendi video portunu kullanır; [çift akış](https://docs.uavmatrix.com/tr/guides/dual-camera-rc-switching/) için ikinci kamera video portu + 1'i, [ses](https://docs.uavmatrix.com/tr/uavcast-pro/camera/audio/) için ise video portu + 2'yi kullanır. Portlar birbirine daha yakın olursa, çift akış veya sesi açtığınız anda çakışırlar.

## 4. Uplink'e dikkat edin

Her video hedefi, akışın ayrı bir kopyasıdır. 1500 kbps hızında üç video hedefi, drone'dan yaklaşık 4,5 Mbit/s uplink gerektirir. 4G üzerinde videoyu yalnızca ihtiyaç duyan istasyonlara gönderin ya da **Kamera → Kamera ayarları** bölümünde bit hızını düşürün. **Kontrol Paneli → Ağ Trafiği** modemin gerçekte ne gönderdiğini gösterir.

## 5. Her istasyonun veri aldığını kontrol edin

**Kontrol Paneli**'nde **Ground station** satırı *Sending to n · x packets/s* bilgisini gösterir. **Uçuş Kontrolcüsü → Bağlantı** bölümündeki **Connection check**, her yer kontrol istasyonu çıkışını ve adresi geçersiz olduğu için dışarıda bırakılan hedefleri listeler.

## Fleet Manager ile

Fleet Manager'da yer kontrol istasyonları organizasyonun VPN'ine katılır ve bunları **Network** sayfasındaki **Stream Bindings** ile drone'lara bağlarsınız. Aynı yer kontrol istasyonuna bağlanan her ek drone kendi port bloğunu alır. Bkz. [Stream bindings](https://docs.uavmatrix.com/tr/fleet-manager/network/stream-bindings/).

Source: https://docs.uavmatrix.com/tr/guides/multiple-ground-stations/
