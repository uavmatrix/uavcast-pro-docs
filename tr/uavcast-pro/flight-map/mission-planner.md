# Görev Planlayıcı sekmesi

> UAVcast-Pro Görev Planlayıcı sekmesinde yol noktası görevi planlayın; irtifa çerçevesini ve yarıçapı ayarlayın, .waypoints dosyası olarak kaydedin ve ArduPilot uçuş kontrolcüsüne yükleyin.

Görev Planlayıcı sekmesi, tarayıcıda basit bir yol noktası görevi planlamanızı ve web arayüzüne erişebildiğiniz her yerden UAVcast-Pro üzerinden uçuş kontrolcüsüne yüklemenizi sağlar. Görevler, Mission Planner ve QGroundControl'ün kullandığı aynı `.waypoints` biçiminde (QGC WPL 110) kaydedilir; bu sayede görevleri araçlar arasında taşıyabilirsiniz. **Uçuş Haritası → Görev Planlayıcı** sayfasını açın.

![Uydu haritası, boş bir yol noktası tablosu ve Save, Load, Upload, Read ve Clear düğmelerinin bulunduğu Görev Planlayıcı sekmesi](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/flight-map--mission-planner.webp)

*Herhangi bir yol noktası eklenmeden önce Uçuş Haritası → Görev Planlayıcı. Bir tane eklemek için haritaya tıklayın.*

## Görev planlama

1. İlk yol noktasının olmasını istediğiniz yere haritada tıklayın. İlk seferde **Set Default Values**, **Default Altitude (meters)**, **Waypoint Radius (meters)** ve **Altitude Frame** değerlerini sorar. **Continue** seçin.
2. Yol noktaları eklemek için tıklamaya devam edin. Bir işaretçiyi taşımak için sürükleyin.
3. Tablodaki her yol noktasını ayarlayın: **Alt (m)**, **Frame** ve **Radius (m)**. Bir yol noktasını **Action** sütunundan kaldırın.
4. Toplam rota için **Waypoints** ve **Distance** değerlerini kontrol edin.

| Varsayılan | Değer | Seçenekler |
| --- | --- | --- |
| **Default Altitude (meters)** | `100` | herhangi bir değer |
| **Waypoint Radius (meters)** | `30` | herhangi bir değer |
| **Altitude Frame** | **Relative** | **Relative** (ev noktasının üstünde), **Absolute** (deniz seviyesinin üstünde), **Terrain** (yerin üstünde; uçuş kontrolcüsünde arazi verisi gerekir) |

Tabloda çerçeveler kısaltılmış olarak **Rel**, **Abs** ve **Ter** şeklinde görünür. Yol noktaları `MAV_CMD_NAV_WAYPOINT` olarak gönderilir.

## Uçuş kontrolcüsüne yükleme

1. **Uçuş Kontrolcüsü** bölümünde **Upload** seçin.
2. **Upload Mission** işlemini onaylayın. İletişim kutusu, uçuş kontrolcüsündeki görevin değiştirileceği konusunda uyarır.
3. *Mission uploaded to flight controller* mesajını görürsünüz.

- **Read**, uçuş kontrolcüsündeki görevi planlayıcıya indirir.
- **Clear**, yol noktalarını planlayıcıdan kaldırır.

Görevi uçurmak için Uçuş Haritası'nın **Actions** sekmesindeki **Start** düğmesini kullanın veya vericinizden ya da yer kontrol istasyonunuzdan AUTO moduna geçin.

## Dosyaları kaydetme ve yükleme

**Files** bölümü altında:

- **Save**, görevi `mission.waypoints` olarak indirir.
- **Load**, QGC WPL biçimindeki bir `.waypoints` veya `.txt` dosyasını açar; örneğin Mission Planner'da kaydedilmiş bir dosya.

## Sınırlamalar

Bu planlayıcı yalnızca düz yol noktalarını destekler. **Load**, her satırın konumunu, irtifasını, çerçevesini ve yarıçapını korur; ancak her satırı düz bir yol noktasına dönüştürür. Kalkış, iniş, loiter ve DO komutları (kamera tetikleme, servo) korunmaz ve konumu olmayan bir komut 0, 0 konumunda bir yol noktası olur. Kalkış ve iniş komutları, DO komutları, tarama grid'leri, çitler ve toplanma noktaları için görevi doğrudan Mission Planner veya QGroundControl'de planlayıp yükleyin.

Source: https://docs.uavmatrix.com/tr/uavcast-pro/flight-map/mission-planner/
