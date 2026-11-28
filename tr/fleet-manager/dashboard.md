# Dashboard

> Fleet Manager kontrol panelini bir bakışta okuyun: toplam ve çevrimiçi UAV sayısı, ekip büyüklüğü, UAV durum listesi, Getting Started kontrol listesi ve son etkinlik günlüğü.

**Dashboard**, oturum açtıktan sonra açılan ilk sayfadır. Üç soruyu yanıtlar: Şu anda kaç drone çalışıyor, bunlar hangileri ve ekibiniz son zamanlarda neyi değiştirdi?

![Dört istatistik kartı, UAV Status listesi ve Recent Activity bölümü içeren Fleet Manager kontrol paneli](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/dashboard.webp)

*Dashboard: dört istatistik kartı, drone başına batarya ve GPS bilgisi içeren UAV Status ve ekipten gelen Recent Activity.*

## İstatistik kartları

| Kart | Gösterdiği |
| --- | --- |
| **Total UAVs** | Açık olan kuruluşa eşleştirilmiş drone'lar (*In this organization*). |
| **Online** | Bu kuruluşta şu anda bağlı olan ve son 20 saniye içinde veri alınan drone'lar (*Currently connected*). |
| **Organizations** | Üyesi olduğunuz kuruluşlar. |
| **Team Members** | Açık olan kuruluşun üyeleri. |

Başka bir kuruluşun sayılarını görmek için kenar çubuğunda kuruluş değiştirin.

## UAV Status

En son görülen drone'ların durumu, bataryası ve son bağlantı zamanı listelenir. Bir drone seçerek [UAV sayfasını](https://docs.uavmatrix.com/tr/fleet-manager/fleet/uav-details/) açın veya tümünü görmek için **View All** seçerek [Fleet](https://docs.uavmatrix.com/tr/fleet-manager/fleet/) sayfasına gidin.

## Getting Started

Yeni kuruluşlar, iki adım tamamlanana kadar iki adımlı bir kontrol listesi görür:

1. **Create or Join an Organization** (**Go to Team**)
2. **Pair a UAV (UAVcast)** (**Pair Device**), kuruluşta en az bir drone olduğunda tamamlanır

İkinci adım için [ilk drone'unuzu ekleyin](https://docs.uavmatrix.com/tr/fleet-manager/pair-uav/) rehberini izleyin.

## Recent Activity

Kuruluşunuzdaki son 10 olay ve bunları kimin yaptığı. Fleet Manager, diğerlerinin yanı sıra şunları kaydeder:

- drone'ların eşleştirilmesi, yeniden eşleştirilmesi ve kaldırılması
- akış bağlamalarının oluşturulması ve kaldırılması, yer kontrol istasyonlarının atanması
- üyelerin davet edilmesi, kaldırılması ve rol değişiklikleri, sahiplik devirleri
- VPN'in etkinleştirilmesi veya devre dışı bırakılması

Etkinlik günlüğü, bir drone veya üye kaldırıldığında da korunur; böylece kimin neyi yaptığını yine görebilirsiniz.

Source: https://docs.uavmatrix.com/tr/fleet-manager/dashboard/
