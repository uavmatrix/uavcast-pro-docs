# Fleet

> Fleet sayfası, kuruluşunuzdaki her UAV'yi canlı durum, batarya ve son bağlantı zamanıyla listeler; drone'ları eşleştirdiğiniz ve kontrolleri açtığınız yerdir.

**Fleet** (kenar çubuğunda **Fleet Management → Fleet**), seçili kuruluştaki her UAV'yi listeler. Canlı güncellenir; bu nedenle bir duvar ekranında [harita](https://docs.uavmatrix.com/tr/fleet-manager/map/) yanında açık bırakabilirsiniz.

![Çevrimiçi ve çevrimdışı durumları, bataryayı ve son görülme zamanını gösteren UAV kartlarından oluşan ızgaraya sahip Fleet sayfası](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/fleet.webp)

*UAV'leri (46) içeren Fleet sayfası: batarya seviyeli ONLINE kartlar ve Last seen zamanlı soluk OFFLINE kartlar.*

## UAV kartları

Başlıkta **UAVs (n)** görünür. Her kart şunları gösterir:

- **Name** ve bir durum rozeti: **ONLINE**, **OFFLINE** veya **PAIRING**.
- Yüzde olarak **Battery**. %50'nin altında sarı, %20'nin altında kırmızı olur.
- **Last seen**, göreli zaman olarak. Çevrimdışı kartlar soluklaşır.
- **Re-pair required**: drone bir kez daha eşleştirilmesi gerektiğinde (bkz. [Drone'u yeniden eşleştirin](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone)).

Bir drone, UAVcast-Pro'dan **20 saniye** boyunca mesaj alınmazsa çevrimdışı sayılır; UAVcast-Pro her 5 saniyede bir kalp atışı gönderir.

Her kartta iki düğme bulunur:

- **Operations** [kontrol paneli](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remote-control/)ni açar: uçuş modları, arm ve disarm, görevler.
- **Details** [UAV sayfasını](https://docs.uavmatrix.com/tr/fleet-manager/fleet/uav-details/) açar: canlı telemetri, terminal, günlükler, sistem işlemleri, yeniden adlandırma ve kaldırma.

## Sayfadaki düğmeler

- **Pair Device**, [eşleştirme sihirbazını](https://docs.uavmatrix.com/tr/fleet-manager/pair-uav/) başlatır. Yalnızca Owner ve Admin'ler kullanabilir.
- **Refresh** listeyi yeniden yükler.
- **Need more devices?** → **View Plans**, UAVmatrix mağazasını açar; burada daha fazla UAVcast-Pro lisansı satın alabilirsiniz. Bkz. [Lisanslar](https://docs.uavmatrix.com/tr/fleet-manager/licenses/).

## Yeniden eşleştirme şeridi

Bir veya daha fazla drone eski bir bağlantı sertifikası kullanıyorsa, en üstte **n UAV(s) must be re-paired** yazan bir şerit görünür. Listelenen her drone'u bir kez yeniden eşleştirin; adını ve geçmişini korur. Bkz. [Drone'u yeniden eşleştirin](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone).

![Yeniden eşleştirme şeridi ve iki kartta Re-pair required rozetleri içeren Fleet sayfası](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/fleet--repair-required.webp)

*Fleet sayfası: 2 UAV must be re-paired şeridi ve etkilenen iki kartta Re-pair required rozeti.*

## Büyük filolar için ipuçları

- **Drone'lara harita için ad verin.** Adlar harita etiketlerinde ve bağlama listelerinde görünür. Kuyruk numarası veya rol ("Inspection-07") varsayılan ana bilgisayar adından daha iyidir. UAV sayfasından yeniden adlandırın.
- **Her drone'a kendi rengini verin.** Fleet Manager, 24 renkli bir paletten otomatik renk atar. Ekibinizin bir bakışta tanıması gereken drone'lar için kontrol panelinde **Change map color** ile sabit bir renk ayarlayın.
- **Müşterileri ayırmak için kuruluşları kullanın.** Bir drone yalnızca bir kuruluşa aittir. Birkaç müşteri için hizmet veriyorsanız ve her birinin yalnızca kendi drone'larını görmesini istiyorsanız, her müşteri için ayrı bir kuruluş oluşturun.

Source: https://docs.uavmatrix.com/tr/fleet-manager/fleet/
