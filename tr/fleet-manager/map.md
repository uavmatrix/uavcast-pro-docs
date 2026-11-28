# Canlı harita

> Filonuzdaki her drone'u durum halkaları, yön çizgileri, 5 dakikalık izler, takip modu ve OpenAIP hava sahası katmanlarıyla tek bir canlı haritada izleyin.

**Fleet Map** (kenar çubuğunda **Overview → Fleet Map**), seçili organizasyondaki her drone'u tek bir haritada gösterir ve telemetri geldikçe canlı güncellenir. Bir kontrol odası için tasarlanmıştır: açık bırakırsanız hangi araçların havada olduğunu, nereye yöneldiklerini ve hangilerinin dikkat gerektirdiğini bir bakışta görürsünüz.

![Birçok renkli drone işaretçisi, yön çizgileri ve bir bölge üzerinde uçuş izleri gösteren Fleet haritası](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/map.webp)

*Dark stilinde Fleet Map, Rotterdam Limanı üzerinde: her drone kendi renginde, yön çizgisi ve izle; gri çevrimdışı işaretçiler ise en son ne zaman görüldüklerini gösterir.*

## İşaretçiyi okuma

Her drone kendi renginde çizilir ve araç tipini gösteren bir simgesi vardır: dört rotorlu, altı rotorlu, uçak, VTOL, rover, tekne veya denizaltı. İşaretçinin etrafındaki halkalar ve rozetler sorunları işaretler:

| İşaretçide | Anlamı |
| --- | --- |
| Drone'un kendi rengi, halka yok | Çevrimiçi ve sağlıklı. |
| Gri işaretçi, gri kesikli halka ve saat rozeti | **Offline**: 20 saniyedir hiçbir veri alınmadı. |
| **!** rozetli turuncu halka | **NO MAVLINK**: UAVcast-Pro çevrimiçi, ancak 10 saniyedir uçuş kontrolcüsünden telemetri gelmiyor. Uçuş kontrolcüsü bağlantısını kontrol edin. |
| Kırmızı kesikli halka | **GPS lost**: uydu yok veya konum sabitlenmemiş. |
| Sarı kesikli halka | **GPS weak**: 6'dan az uydu veya yalnızca 2D sabitleme. |
| **H** işaretçisi | Drone'un ev konumu; silahlandığında ayarlanır. Üzerine gelerek irtifasını (AMSL) görün. |

İşaretçinin kendisi silahlı olup olmadığını göstermez. **Armed** bilgisini görmek için açılır pencereyi açın veya [kontrol panelini](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remote-control/) kullanın.

İşaretçinin yanındaki etiket `Name • FLIGHTMODE` biçimindedir. Geçerli olduğunda **NO MAVLINK**, **NO GPS** veya **WEAK GPS** eklenir. Çevrimdışı bir drone için `Name • OFFLINE • 5 mins ago` gösterilir.

### Yön çizgisi ve iz

- **Yön çizgisi**, drone'un burnunun yöneldiği yeri gösteren, drone rengiyle kesikli bir çizgidir. Drone çevrimdışıyken gizlenir.
- **Uçuş izi**, yolun son **5 dakikasını** drone rengiyle kesikli bir çizgi olarak gösterir (çevrimdışıyken gri). Yaklaşık her 11 m harekette yeni bir nokta eklenir.

## Drone açılır penceresi

Bir işaretçiyi seçerek açılır penceresini açın. Pencerede ad, organizasyon ve durum, ardından **Battery**, **Altitude**, **Mode**, **Armed**, **GPS** (uydu sayısı ve sabitleme tipi: No Fix, 2D, 3D, DGPS veya RTK), **Signal** ve çevrimdışıysa **Last seen** bulunur. Uçuş kontrolcüsünden gelen en son durum mesajı da görünür; uçuş öncesi hatasını okumanın çoğu zaman en hızlı yoludur.

**Signal**, Fleet Manager ile drone arasındaki gidiş-dönüş süresidir ve her 10 saniyede bir ölçülür: 100 ms'nin altında mükemmel, 300 ms'nin altında iyi, 600 ms'nin altında orta; bunun üzerinde veya üç ping kaçırıldıktan sonra zayıf kabul edilir.

![Batarya, irtifa, mod, silahlı, GPS ve sinyal satırları ile Follow, History ve Controls düğmeleri bulunan drone açılır penceresi](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/map--popup.webp)

*AUTO modunda silahlı bir haritalama drone'unun açılır penceresi: Battery 71%, Altitude 85.5 m, GPS 20 sats (3D), Signal 61 ms (Excellent); Follow, History ve Controls ile.*

Üç düğme vardır:

- **Follow** drone'u görüş alanında tutar. Aşağıya bakın.
- **History** bu drone için [uçuş geçmişini](https://docs.uavmatrix.com/tr/fleet-manager/map/flight-history/) açar.
- **Controls** [UAV Control Panel](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remote-control/)'i açar.

## Bir drone'u takip etme

Açılır penceredeki **Follow** seçeneğini seçin. Harita, drone'a yakınlaşır (en az yakınlaştırma düzeyi 14) ve drone'u merkeze alır. Haritanın titremesini önlemek için yalnızca drone ekran kenarına yaklaştığında kaydırır. Bir **Following *name*** şeridi görünür; durdurmak için **X**'i veya **Unfollow**'u seçin. **History**'yi açmak da takibi durdurur.

![Üst kısmında Following şeridi bulunan, tek bir drone'u takip eden harita](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/map--follow.webp)

*Bir koridoru haritalayan sabit kanatlı uçağın takip modu; Following şeridi ve arkasındaki iz görünür.*

## GPS'siz drone'lar

Çevrimiçi ama henüz konumu olmayan drone'lar, haritadaki **drones without GPS** kutusunda listelenir. Kontrol panelini açmak için birini seçin. **n drones on map** sayacı, haritada kaç drone'un işaretlendiğini gösterir.

## Harita ayarları

Sağ üstteki dişli düğmesini seçerek **Map Settings** panelini açın. Seçimleriniz bu tarayıcıda kaydedilir.

| Bölüm | Seçenek | Varsayılan |
| --- | --- | --- |
| **Overlays** | **Airspace Layers**: kısıtlı hava sahası, havalimanları, helikopter alanları | Off |
| **Drone Filter** | **All Drones**, **Online Only** veya **Offline Only** | All Drones |
| **Marker Options** | **Heading Line** | On |
|  | **Marker Tooltip**: işaretçilerdeki ad etiketi | On |
|  | **Always Visible**: etiketi üzerine gelindiğinde değil, sürekli göster | On |
|  | **Flight Trail**: son uçuş yolu (son 5 dk) | On |
| **Map Style** | **Satellite**, **Light** veya **Dark** | Dark |

![Hava sahası katmanları, drone filtresi, işaretçi seçenekleri ve harita stilini içeren Map Settings paneli](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/map--settings.webp)

*Map Settings paneli: Airspace Layers açık, Drone Filter Online Only olarak ayarlı ve Map Style Satellite.*

> **Yoğun bir harita için**
>
> Aynı alanda 20'den fazla drone varsa etiketler yalnızca üzerine gelindiğinde görünsün diye **Always Visible** seçeneğini kapatın. Park halindeki uçakları gizlemek için **Online Only** kullanın.

## Hava sahası katmanları

**Airspace Layers**, OpenAIP'den alınan kısıtlı hava sahasını, havalimanlarını ve helikopter alanlarını haritanın üzerine çizer. Katman 7. yakınlaştırma düzeyinden itibaren görünür. Tek bir birleşik katmandır; kategorileri ayrı ayrı açıp kapatamazsınız.

> **Resmi hava sahası kontrollerinin yerini tutmaz**
>
> Hava sahası katmanı durumsal farkındalık içindir. Her uçuştan önce NOTAM'ları ve ulusal drone haritanızı veya UTM hizmetinizi kontrol edin.

Source: https://docs.uavmatrix.com/tr/fleet-manager/map/
