# Drone'u yeniden eşleştirin, kaldırın veya devredin

> Fleet Manager istediğinde drone'u yeniden eşleştirin, kuruluşunuzdan kaldırın, başka bir kuruluşa taşıyın veya eşlik eden bilgisayarını değiştirin.

Bir drone aynı anda yalnızca bir kuruluşa aittir. Bu sayfa, mevcut bir drone ile yapabileceğiniz üç işlemi kapsar: yeniden eşleştirme, kaldırma ve başka bir yere taşıma.

## Drone'u yeniden eşleştirin

Yeniden eşleştirme, drone'un bağlantı sertifikasını yeniler. Drone, Fleet Manager'daki kaydını korur: ad, telemetri geçmişi, kaydedilmiş uçuşlar ve akış bağlamaları olduğu gibi kalır.

Şu durumlarda gerekir:

- Fleet Manager drone üzerinde **Re-pair required** gösteriyorsa veya drone sayfasında **This UAV must be re-paired** şeridi varsa. Fleet Manager daha yeni ve daha katı bir sertifikaya geçmiştir ve bu drone hâlâ eski sertifikayı kullanıyordur.
- Birisi UAVcast-Pro'da **Disconnect from Fleet** seçmiştir.

![This UAV must be re-paired şeridi içeren UAV sayfası](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/drone-detail--repair-required.webp)

*This UAV must be re-paired şeridi içeren UAV sayfası; Disconnect ve Connect to Fleet Manager adımlarını açıklar.*

1. Drone'un UAVcast-Pro arayüzünde **Fleet Management** bölümünü açın ve **Disconnect from Fleet** seçin. **Disconnect from Fleet?** onayını verin. Sayfada zaten **Connect to Fleet Manager** görünüyorsa bu adımı atlayın.
2. Yeni bir 8 haneli kod almak için **Connect to Fleet Manager** seçin.
3. Fleet Manager'da **Fleet → Pair Device** bölümüne gidin, **aynı kuruluşu** seçin ve kodu girin. [İlk drone'unuzu ekleyin](https://docs.uavmatrix.com/tr/fleet-manager/pair-uav/) bölümündeki sihirbazı izleyin.

Drone'u önce Fleet Manager'da kaldırmayın. Kaldırmak geçmişini siler; yeniden eşleştirme ise geçmişi korur.

## Drone'u kaldırın

Bir drone emekliye ayrıldığında, satıldığında veya başka bir kuruluşa taşındığında bunu kullanın. Yalnızca Owner ve Admin kullanıcıları yapabilir.

1. Drone'un [UAV sayfasını](https://docs.uavmatrix.com/tr/fleet-manager/fleet/uav-details/) açın ve **Remove** seçin.
2. **Delete UAV** onayını verin.

Drone çevrimiçiyse Fleet Manager önce UAVcast-Pro'ya eşleştirmeyi kaldırmasını söyler ve en fazla 5 saniye yanıt bekler. Ardından UAVcast-Pro yeniden **Connect to Fleet Manager** gösterir ve kuruluşun VPN'inden ayrılır.

Drone çevrimdışıysa veya yanıt vermiyorsa **UAVcast Not Responding** devam edip etmeyeceğinizi sorar. **Delete Anyway** drone'u yalnızca Fleet Manager'dan kaldırır. Daha sonra drone'a ulaşabildiğinizde UAVcast-Pro'da **Disconnect from Fleet** seçeneğini kendiniz seçin. O zamana kadar drone hâlâ eşleştirili olduğunu düşünür.

![Telemetri ve komut geçmişinin kalıcı olarak silineceği konusunda uyaran Delete UAV onay iletişim kutusu](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/drone-detail--delete.webp)

*Emekli bir gövde için Delete UAV iletişim kutusu; tüm telemetri verilerinin ve komut geçmişinin kalıcı olarak silineceği uyarısı.*

### Kaldırmanın neyi sildiği

| Silinen | Korunan |
| --- | --- |
| Drone kaydı ve adı | **Recent Activity** içindeki kayıtlar |
| Kaydedilmiş uçuşlar dahil tüm saklanan telemetri ve uçuş geçmişi | Kaydedilmiş görevler (kuruluşa aittir) |
| Komut geçmişi ve akış bağlamaları | UAVcast-Pro lisansı; drone üzerinde etkin kalır |
| Drone'un VPN cihazı |  |

> **Bu işlem geri alınamaz**
>
> Drone'u kaldırmadan önce uçuş geçmişini dışa aktaran bir seçenek yoktur. Veriye ihtiyacınız varsa önce [Uçuş geçmişi](https://docs.uavmatrix.com/tr/fleet-manager/map/flight-history/) bölümünden ihtiyacınız olanı yeniden oynatın veya kaydedin.

## Bir drone'u başka bir kuruluşa taşıyın

Fleet Manager, tek bir drone için "devretme" düğmesi sunmaz, çünkü geçmiş onu kaydeden kuruluşta kalır. Bir drone'u taşımak için:

1. Mevcut kuruluşta [drone'u kaldırın](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remove-or-transfer/#remove-a-drone). Oradaki geçmişi silinir.
2. Drone'un UAVcast-Pro lisansının yeni kuruluşun bir üyesine ait olduğundan emin olun. Bkz. [Lisanslar](https://docs.uavmatrix.com/tr/fleet-manager/licenses/).
3. Yeni kuruluşta [drone'u eşleştirin](https://docs.uavmatrix.com/tr/fleet-manager/pair-uav/).

Hâlâ başka bir kuruluşa ait olan bir drone'u eşleştirmeye çalışırsanız Fleet Manager **This UAV is already paired to an organization** mesajıyla durur. Bu drone'u yalnızca o kuruluşun bir Owner veya Admin kullanıcısı serbest bırakabilir.

Bir **tüm filoyu** geçmişiyle birlikte devretmek için (örneğin bir şirket satıldığında) kuruluşu koruyun ve [sahipliği yeni sahibe devredin](https://docs.uavmatrix.com/tr/fleet-manager/team/#transfer-ownership).

## Eşlik eden bilgisayarı değiştirin

Fleet Manager, bir drone'u; UAVcast-Pro'nun eşlik eden bilgisayarın CPU seri numarasından ve açılış diskinden (SD kart veya SSD) hesapladığı bir cihaz kimliğiyle tanır. Yeni bir eşlik eden bilgisayar veya aynı bilgisayarda yeni bir SD kart ya da SSD, **yeni** bir drone olarak görünür. Aynı kart ve diskte UAVcast-Pro'yu yeniden kurmak aynı cihaz kimliğini korur.

1. Fleet Manager'da eski drone'u kaldırın (ya da geçmişine artık ihtiyacınız kalmayana kadar tutun).
2. UAVcast-Pro'yu yeni bilgisayara kurun ve lisansı etkinleştirin. Bkz. [Lisansınızı etkinleştirin](https://docs.uavmatrix.com/tr/get-started/license-activation/).
3. Yeni bir drone olarak eşleştirin ve akış bağlamalarını yeniden oluşturun.

Source: https://docs.uavmatrix.com/tr/fleet-manager/fleet/remove-or-transfer/
