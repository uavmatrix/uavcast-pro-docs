# Lite view

> Lite view, Fleet Manager'ın telefon boyutundaki kontrol ekranıdır: filo listesi, canlı batarya, GPS ve irtifa, uçuş modları ve görev başlatma, duraklatma ve RTL.

**Lite Control**, sahada kullanım için Fleet Manager'ın telefon dostu bir sürümüdür: büyük düğmeler, yalnızca temel öğeler ve telefonunuzun mobil verisi üzerinden canlı güncellemeler.

## Lite view'ı açma

Telefonunuzda Fleet Manager'da oturum açın, menüyü açın ve **Fleet → Lite View** seçeneğini seçin. Doğrudan `https://fleet-manager.uavmatrix.com/lite` adresine de gidebilirsiniz. Tek dokunuşla erişmek için ana ekrana ekleyin.

## Filo listesi

Liste, her drone'u durumu ve bataryasıyla gösterir (%40'ın altında turuncu, %20'nin altında kırmızı). Ayrıca bir **Live updates active** göstergesi ve **n online / n total** sayacı içerir. Kontrol ekranını açmak için bir drone'a dokunun.

![Telefonda Lite view filo listesi; birkaç drone, durum ve batarya bilgileriyle](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/lite.webp)

*390 × 844 telefonda Lite view: 33 online / 46 total olan Fleet list, her drone için uçuş modu ve batarya.*

## Drone ekranı

- **Vehicle Armed** ve **Failsafe Active** için uyarı şeritleri.
- **Battery**, **GPS**, **Altitude** ve **Speed** kartları.
- **Device ID**, **Organization**, **Position** ve **View Full Details** (tam UAV sayfasını açar).

![Armed uyarısı, durum kartları ve kontrol düğmelerini gösteren Lite view drone ekranı](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/lite--drone.webp)

*AUTO modunda silahlı bir drone için Lite view: Vehicle Armed uyarısı, Battery, GPS, Altitude ve Speed kartları ile mod ve görev kontrolleri.*

### Güvenlik durumu

Lite view **ARMED** (*Motors active - exercise caution*) veya **DISARMED** (*Safe to approach*) durumunu gösterir, ancak arm veya disarm düğmesi yoktur: **For safety, arm/disarm should be performed via your Ground Control Station (QGC, Mission Planner).**

### Uçuş Modu (Owner ve Admin)

**Quick Access**, araç tipiniz için en çok kullandığınız modları, **All Modes** ise tam listeyi gösterir. Güvenli modlar basit bir onaydan sonra değişir. Navigasyon ve tehlikeli modlar ise daha güçlü bir kontrolle **Change to *MODE*?** sorusunu sorar. Bkz. [kontrol paneli](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remote-control/#flight-mode).

### Görev Kontrolü (Owner ve Admin)

Drone'da zaten bulunan bir görev için:

- **Start** / **Resume**, **Pause**, **RTL** ve **Stop**; her biri onay ister. Rover'lar duraklatmak ve durdurmak için LOITER yerine HOLD kullanır.
- **Jump to Waypoint**: − ve + ile numarayı seçin, ardından **Jump to WP n** seçin. **Currently at waypoint n** ilerlemeyi gösterir.
- **Refresh Mission Data** görevi drone'dan yeniden yükler.

Drone'da görev yoksa **No Mission Loaded** görürsünüz. Önce bir bilgisayardan [Görevler](https://docs.uavmatrix.com/tr/fleet-manager/missions/) sayfasında bir görev yükleyin.

Source: https://docs.uavmatrix.com/tr/fleet-manager/lite-view/
