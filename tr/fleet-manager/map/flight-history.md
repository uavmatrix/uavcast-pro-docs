# Uçuş geçmişi

> Bir drone'un kaydedilmiş uçuşunu Fleet Manager haritasında yeniden oynatın; süreyi, maksimum irtifayı ve hızı okuyun, adlandırılmış uçuşları kaydedin ve telemetri saklama süresini ayarlayın.

Fleet Manager, bağlı olduğu sürece her drone'un telemetrisini saniyede bir kaydeder: konum, irtifa, hız, yön, batarya, uçuş modu, silahlı durumu ve GPS. **Flight history**, bu kaydı haritada yeniden oynatır.

## Drone'un geçmişini açma

**Fleet Map** üzerinde drone'un işaretçisini seçin, ardından açılan pencerede **History** seçin. Haritanın alt kısmında ***name* - Flight History** çekmecesi açılır.

![Harita altında oturum seçici, oynatma kontrolleri, istatistikler ve yeniden oynatılan uçuş yolu bulunan uçuş geçmişi çekmecesi](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/map--history.webp)

*Bir inceleme drone'u için uçuş geçmişi: kayıtlı Turbine blade inspection uçuşu seçili, oynatma 4x hızında; Duration, Max Alt, Max Speed ve Avg Battery değerleri.*

## Oturum seçme

**Select flight session** seçeneği şunları listeler:

1. Önce **Saved flights** (yer imi simgeli), yani ekibinizin adlandırdığı uçuşlar.
2. Ardından son 30 gün için, kaydedilmiş telemetrisi olan her **gün** için bir kayıt.

Bir gün, o tarihteki tüm telemetriyi gruplar; dolayısıyla aynı gün birden fazla uçuş tek bir oturum olarak görünür. İlgilendiğiniz zaman aralığını adlandırılmış bir uçuş olarak kaydedin; böylece onu hızlıca tekrar bulabilirsiniz.

## Oynatma

- Oynatın ve duraklatın, oturumun %5'i kadar geri veya ileri gidin ya da başa veya sona atlayın. Zaman çizelgesini sürükleyerek konumlandırın.
- Hızlar: **0.5x**, **1x** (gerçek zaman), **2x**, **4x**, **8x**, **10x** ve **20x**.
- Klavye: **Space** oynat/duraklat, **←** / **→** adım, **Esc** kapat.

Haritada yeşil bir **Start** ve kırmızı bir **End** işaretçisi uçuşu çerçeveler. Oynatılmış kısım camgöbeği renkte, kalan kısım gri kesikli çizgiyle gösterilir. Irtifasıyla etiketlenmiş bir drone simgesi yol boyunca hareket eder.

İstatistik panelinde **Duration**, **Max Alt**, **Max Speed** ve **Avg Battery** gösterilir. **Current Position** ise oynatma noktasındaki **Alt**, **Speed**, **Heading** ve **Mode** değerlerini gösterir.

## Uçuşları kaydetme, yeniden adlandırma ve silme

Owner ve Admin'ler adlandırılmış uçuşları kaydedebilir, yeniden adlandırabilir ve silebilir. Viewer'lar bunları oynatabilir.

- **Save and name this flight** geçerli zaman aralığını bir adla (en fazla 100 karakter) kaydeder; örneğin "Saha A üzerinde tarama". İki kayıtlı uçuş çakışamaz: **A saved session already exists for this time range**.
- **Rename flight** adı değiştirir.
- **Delete saved flight** yalnızca adı kaldırır. **Delete Saved Flight?** telemetrinin silinmediğini açıklar.

## Geçmişin ne kadar tutulduğu

Owner ve Admin'ler saklama süresini organizasyon bazında **Settings → History** (**Telemetry History**) altından ayarlar:

- **Retention:** 7, 14, 30, 60 veya 90 gün, **6 months** veya **1 year**. Varsayılan ve maksimum değer 1 yıldır.
- **Prune Now**, 7, 14, 30, 60 veya 90 günden eski verileri hemen siler (varsayılan 30). Bu işlem **Prune Old History** onayından sonra yapılır.
- **Delete Drone History** (drone başına çöp kutusu simgesi) veya **Select All** → **Delete Selected (n)**, seçili drone'ların geçmişini temizler.
- Kartlarda **Storage Used**, **Total Records** ve **Retention** gösterilir.

Fleet Manager, saklama süresini aşan verileri günde bir kez kaldırır. 7 günden eski veriler sıkıştırılır; böylece büyük bir filo için bir yıllık geçmiş pratik kalır.

![Retention seçicisi, temizleme seçenekleri ve drone başına geçmiş listesi bulunan Settings History sekmesi](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/settings--history.webp)

*46 drone'lu bir organizasyon için Settings → History: Storage Used, Total Records, Retention 90 days ve her drone için silme düğmeli liste.*

> **Günlük dışa aktarma yok**
>
> Fleet Manager uçuş geçmişini dosya olarak dışa aktarmaz ve video ya da uçuş kontrolcüsü günlüklerini (`.tlog`, DataFlash) saklamaz. Bunları yer kontrol istasyonu yazılımınızdan veya uçuş kontrolcüsünün SD kartından saklayın. Drone üzerindeki video kayıtları için bkz. [Kayıtlar ve uçuş incelemesi](https://docs.uavmatrix.com/tr/guides/recording-flight-review/).

Bir drone'u kaldırmak, kayıtlı uçuşlar dahil tüm geçmişini siler. Bkz. [Drone'u kaldırma veya devretme](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remove-or-transfer/).

Source: https://docs.uavmatrix.com/tr/fleet-manager/map/flight-history/
