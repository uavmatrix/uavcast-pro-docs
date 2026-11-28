# Uçuş kontrolcüsünü bağlayın

> Pixhawk veya herhangi bir ArduPilot ya da PX4 uçuş kontrolcüsünü USB veya UART üzerinden UAVcast-Pro'ya bağlayın; otomatik port ve baud algılama ile canlı bağlantı kontrolü kullanın.

UAVcast-Pro, uçuş kontrolcünüzden (ArduPilot, PX4 veya herhangi bir MAVLink otopilotu) MAVLink verisini USB veya bir UART (TELEM portu) üzerinden okur ve eklediğiniz her yer kontrol istasyonuna iletir. **Port** ve **Baud hızı** seçenekleri varsayılan olan **Otomatik** durumdayken uçuş kontrolcüsünü kendi başına bulur, işe yarayan ayarı hatırlar ve bir yeniden başlatma, USB kesintisi veya geç açılma sonrasında yeniden bağlanır. Bu ayarı **Uçuş Kontrolcüsü → Bağlantı** altında bulabilirsiniz.

![Bağlandı durumunu, dört adımı geçmiş Bağlantı kontrolünü ve MAVLink İnceleyici'yi gösteren Uçuş Kontrolcüsü Bağlantı sayfası](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/flight-controller.webp)

*Bir Pixhawk'a USB bağlantısı ile Uçuş Kontrolcüsü → Bağlantı.*

## USB ile bağlanma

1. Uçuş kontrolcüsünün USB portunu, veri aktarımı destekleyen bir kabloyla eşlik eden bilgisayara takın.
2. **Uçuş Kontrolcüsü → Bağlantı** bölümüne gidin ve **Bağlantı türü** altında **USB** seçin.
3. **Port** seçeneğini **Otomatik** olarak bırakın. USB bağlantıları baud hızı kullanmaz.
4. Durum panelinde **Bağlantı durdu** yazıyorsa **Bağlan** seçeneğini seçin.

Birkaç saniye içinde durum, araç türü ve sistem kimliğiyle birlikte **BAĞLANDI** olarak görünür; örneğin *Quadrotor'a bağlandı (sistem 1), ArduPilot fmuv2 üzerinde (ttyACM0)*.

## TELEM portu (UART) ile bağlanma

1. TELEM portunu bağlayın: uçuş kontrolcüsünün **TX → RX** ucunu eşlik eden bilgisayara, **RX → TX** ucunu ve **GND → GND** ucunu bağlayın. Her iki kartın da kendi besleme kaynağı varsa 5 V'u bağlamayın.
2. Uçuş kontrolcüsünde portu MAVLink 2 olarak ayarlayın: TELEM2 için bu `SERIAL2_PROTOCOL = 2` değeridir. `SERIAL2_BAUD` değerini not edin.
3. UAVcast-Pro'da **Bağlantı türü** altında **UART / Serial** seçin.
4. **Port** ve **Baud hızı** seçeneklerini **Otomatik** olarak bırakın veya portu (Raspberry Pi'de GPIO UART'ı **önerilen** olarak işaretlenir) ve `SERIALx_BAUD` değeriyle eşleşen baud hızını seçin.
5. Bağlantı durdurulmuşsa **Bağlan** seçeneğini seçin.

Değişiklikler hemen uygulanır. Bir şeyi yeniden başlatmanız gerekmez.

> **Otomatik baud hızı**
>
> Otomatik modda UAVcast-Pro, 57600, 115200, 921600, 1500000, 460800, 230400 ve 500000 baud değerlerini dener ve son işe yarayan hızla başlar. Veri gelmeye devam ederken heartbeat'ler 20 saniye boyunca durursa (örneğin `SERIALx_BAUD` değerini değiştirdikten sonra), yeniden arama yapar.

## Ayar başvurusu

| Ayar | Varsayılan | Değerler | Notlar |
| --- | --- | --- | --- |
| **Bağlantı etkin** | Açık | Açık, kapalı | Kapalıyken seri port serbest bırakılır ve tüm yer kontrol istasyonlarına telemetri gönderimi durur. |
| **Bağlantı türü** | **USB** | **USB**, **UART / Serial** | **Otomatik** modun hangi portları arayacağını belirler. |
| **Port** | **Otomatik** | **Otomatik**, algılanan bir port, **Özel yol…** | Otomatik mod, kararlı `/dev/serial/by-id/…` yolunu tercih eder ve aygıtın numarası değişirse onu izler. Özel yol `/dev/ttyAMA0` gibi herhangi bir aygıtı kabul eder. Başka bir program tarafından kullanılan portlar *… tarafından kullanılıyor* olarak görünür. |
| **Baud hızı** | **Otomatik** | **Otomatik** veya sabit bir hız | USB için yok sayılır. Sabit olduğunda `SERIALx_BAUD` ile eşleşmelidir. |

## Durum panelini okuma

| Durum | Anlamı |
| --- | --- |
| **Bağlı** | Heartbeat'ler geliyor. **Bağlı süre**, **Son heartbeat** ve **Otomatik yeniden bağlanmalar** bağlantının sağlığını gösterir. |
| **Aygıt bekleniyor** | Port mevcut değil. Uçuş kontrolcüsü takılı değil, beslemesi yok veya hâlâ açılıyor. |
| **Baud hızı algılanıyor** | Baud hızları deneniyor (*115200 baud deneniyor (7 içinden 2.)*). |
| **Heartbeat yok** | Port açık, ancak geçerli MAVLink gelmiyor: yanlış baud hızı, TX/RX ters bağlı veya port MAVLink olarak ayarlı değil. |
| **Yeniden bağlanıyor** | Bağlantı koptu ve kendiliğinden geri geliyor. |
| **Aranıyor** | **Otomatik algılama** her portu ve her hızı tarıyor. Bu bir dakikaya kadar sürebilir. |
| **Kapalı** / **Durduruldu** | Bağlantı kapatılmış veya durdurulmuş. **Bağlan** seçeneğini seçin. |

### Bağlantı kontrolü

Her saniye güncellenen **Bağlantı kontrolü** kartı, veriyi kablodan yer kontrol istasyonuna kadar izler. Yeşil olmayan ilk satır sorundur:

1. **Uçuş kontrolcüsü takılı** (USB) veya **Seri port kullanılabilir** (UART). *Algılanmadı* genellikle yalnızca şarj amaçlı bir USB kablosu veya güç olmadığı anlamına gelir.
2. **Kablo üzerinde sinyal**: Port üzerinden bayt gelir.
3. **Okunabilir uçuş kontrolcüsü verisi**: Baytlar MAVLink olarak çözülür. *% hasarlı* ifadesi, gevşek veya uzun bir kabloyu, eksik bir toprak bağlantısını ya da güç kablolarından gelen gürültüyü işaret eder.
4. **Uçuş kontrolcüsü yanıt veriyor**: Araçtan heartbeat'ler.
5. **Yer kontrol istasyonuna gönderiliyor**: Etkin her hedefe saniyede paket sayısı veya *Yer kontrol istasyonu ayarlanmadı*.

### Otomatik algılama

**Otomatik algılama** bağlantıyı duraklatır, her seri portu her baud hızında dinler, bulduğu port ve hızı kaydeder ve bağlantıyı bunlarla başlatır. Uçuş kontrolcünüzün hangi port veya baud hızını kullandığını bilmiyorsanız bunu kullanın. **Denenenleri göster**, her denemeyi listeler.

## MAVLink İnceleyici paneli

Sağ sütun, canlı araç durumunu gösterir: bağlantı, **YKİ Güvenli Mod Bilgisi**, **Araç Bilgisi** (tür, kontrolcü, uçuş modu, arm durumu), **Batarya Durumu**, **GPS Bilgisi** ve uçuş verileri. Panelde **Warning - Failsafe Disabled** yazıyorsa uçuş kontrolcüsünde YKİ failsafe'i yoktur. Hücresel bir bağlantı üzerinden uçmadan önce bunu etkinleştirin (ArduPilot'ta `FS_GCS_ENABLE`).

## Güvenlik: açık telemetri portu yok

UAVcast-Pro gelen telemetri bağlantılarını kabul etmez. mavlink-router'ın normalde açtığı 5760 portundaki TCP sunucusu kapalıdır; bu nedenle yalnızca [Yer Kontrol İstasyonları](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/) sayfasında eklediğiniz yer kontrol istasyonları telemetri alır ve bu yalnızca **Telemetriyi Etkinleştir** açıkken geçerlidir.

> **Eski bir sürümden geliyorsanız**
>
> Önceki sürümler varsayılan olarak `/dev/ttyACM0` ve 57600 baud kullanıyor, 5760 portunda TCP bağlantılarını kabul ediyordu. v6.4.3 sürümünden itibaren her aygıt bir kez **Otomatik** moda geçer ve eski port ile baud hızı önce denenir. v6.5.0 sürümünden itibaren TCP 5760 kapatılmıştır: PC'nizi bir yer kontrol istasyonu olarak ekleyin ve UDP üzerinden bağlanın.

## İlgili konular

- [NTRIP / RTK düzeltmeleri](https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/ntrip-rtk/)
- [Enjektörler: kendi sensör verilerinizi MAVLink'e gönderin](https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/injectors/)
- [Yer kontrol istasyonları](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/)
- [Sorun giderme: MAVLink heartbeat yok](https://docs.uavmatrix.com/tr/troubleshooting/no-mavlink-heartbeat/)

Source: https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/
