# MAVLink Denetçisi

> UAVcast-Pro MAVLink Denetçisi ile uçuş kontrolcüsünden gelen her mesajı hızı, sistem ID'si ve bileşen ID'si ile görün; telemetri ve enjektörleri hata ayıklayın.

Denetçi, UAVcast-Pro'nun aldığı her MAVLink mesajını araca göre gruplanmış, hızı ve son alan değerleriyle birlikte listeler. Uçuş kontrolcüsünün beklediğiniz verileri gönderdiğini kontrol etmek, bir mesajın tam alan adlarını bulmak veya bir [enjektörün](https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/injectors/) `NAMED_VALUE_FLOAT` mesajları ürettiğini doğrulamak için kullanın. **Uçuş Haritası → İnceleyici** sayfasını açın.

![Bağlantı durumu ve sistem 1 için mesaj adlarını, Hz cinsinden hızları ve sayıları gösteren mesaj listesiyle MAVLink Denetçisi](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/flight-map--inspector.webp)

*Uçuş kontrolcüsünün (sistem 1) mesajlarıyla Uçuş Haritası → İnceleyici; ATTITUDE genişletilmiş durumda.*

## Ne görürsünüz

En üstte **MAVLink Bağlantı Durumu** yer alır: **Connection**, **Vehicle**, **GPS Uyduları**, **Toplam Mesajlar** ve **Sistem ID**.

Altta **Mesaj Denetçisi** bulunur. Her araç için bir grup (*Araç (Sistem ID: 1)*) ve her mesaj için bir satır vardır. Satırlarda şunlar görünür:

- mesajın adı,
- **COMP**: mesajı gönderen bileşen ID'si (1 = otopilot, 194 = enjektörler için varsayılan),
- **Hz** cinsinden hız ve alınan mesaj sayısı.

Alanlarını ve güncel değerlerini görmek için bir mesajı açın.

## Tipik kontroller

| Soru | Bakılacak yer |
| --- | --- |
| GPS veri gönderiyor mu? | `GPS_RAW_INT` 2 ila 10 Hz hızında; [RTK](https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/ntrip-rtk/) kullanıyorsanız `GPS_RTK`. |
| Yer kontrol istasyonunda telemetri neden yavaş? | `ATTITUDE`, `VFR_HUD` veya `GLOBAL_POSITION_INT` üzerindeki düşük hızlar. Uçuş kontrolcüsünün MAVLink portundaki `SRx_` akış hızlarını yükseltin. |
| Enjektörüm çalışıyor mu? | COMP 194 (veya ayarladığınız compid) altındaki `NAMED_VALUE_FLOAT`. |

Liste *Mesaj bekleniyor...* gösteriyorsa uçuş kontrolcüsü bağlantısı kurulu değildir. Bkz. [Uçuş kontrolcüsü](https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/).

Source: https://docs.uavmatrix.com/tr/uavcast-pro/flight-map/inspector/
