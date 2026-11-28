# Hücresel modem (4G/LTE)

> HiLink veya geleneksel 4G/LTE USB modemi UAVcast-Pro'ya bağlayın; otomatik APN algılama, SIM PIN'i, otomatik yeniden bağlanma ve hücresel uçuşlar için modem sinyal bilgisi.

4G/LTE modem, hücresel kapsama alanının olduğu her yerde drone'a internet erişimi sağlar; böylece telemetri ve video Wi-Fi menzilinin çok ötesindeki yer kontrol istasyonunuza ulaşabilir. UAVcast-Pro, kendi kendine bağlanan **HiLink** modemleri destekler. Ayrıca **Geleneksel (PPP)** modemleri de destekler; bunları UAVcast-Pro, ModemManager üzerinden bağlar. Geleneksel modemler için APN'yi otomatik bulur, açılışta bağlanır ve kopmalardan sonra yeniden bağlanır. Kenar çubuğunda **Modem** seçeneğini açın.

![Geleneksel (PPP) seçili, APN Otomatik olarak bırakılmış ve Modem Bağlı Değil paneli olan Modem sayfası](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/modem.webp)

*Geleneksel (PPP) seçili ve APN Otomatik bırakılmış Modem sayfası; henüz modem takılı değil.*

## Modem türünüz hangisi?

|  | HiLink | Geleneksel (PPP) |
| --- | --- | --- |
| Nasıl görünür | Bir ağ kartı (`usb0` veya `eth1`). Modem kendi yönlendiricisini ve web sayfasını çalıştırır, genellikle `192.168.8.1` adresinde. | ModemManager tarafından yönetilen bir modem aygıtı. Bağlantı genellikle `ppp0` veya `wwan0` olarak görünür. |
| Bağlantıyı kim kurar | Modemin kendisi. | UAVcast-Pro, ModemManager ve NetworkManager üzerinden. |
| UAVcast-Pro'daki ayarlar | Yok. Gerekirse APN'yi modemin kendi web sayfasında ayarlayın. | APN (isteğe bağlı), kullanıcı adı, parola, PIN. |
| Örnekler | Huawei E3372h, E8372 | Huawei E3372s, Quectel EC25 / EG25, Sierra Wireless |

Emin değilseniz modemi takın ve drone üzerinde `mmcli -L` komutunu çalıştırın. ModemManager modemi listeliyorsa **Geleneksel (PPP)** seçin. Listelemiyorsa ve **Ağlar** bölümünde yeni bir ağ arayüzü görünüyorsa, modem HiLink'tir.

## Geleneksel modemi kurma

1. Bir veri SIM kartı takın ve modemi yardımcı bilgisayara bağlayın.
2. **Modem** sayfasına gidin. **Modemi etkinleştir** seçeneğini **Evet**, **Modem tipi** seçeneğini **Geleneksel (PPP)** yapın.
3. **Erişim Noktası Adı (İsteğe bağlı)** alanını boş bırakın. UAVcast-Pro APN'yi algılar.
4. SIM kartınız istiyorsa **PIN kodu (İsteğe bağlı)** alanına girin.
5. 30 ila 90 saniye bekleyin. Bağlandığında **Modem Bilgileri** operatörü, teknolojiyi ve **IPv4 Bilgileri**'ni gösterir.

Takılı bir modem otomatik olarak bağlanır. **Bağlantıyı Kes** seçeneğini seçerseniz, yeniden bağlayana kadar bağlantısız kalır; yeniden başlatmadan sonra da böyledir.

### Otomatik APN nasıl çalışır

APN alanı boşken UAVcast-Pro şu sırayla dener:

1. Bu SIM'in operatörüyle daha önce çalışan APN,
2. Ağın varsayılan APN'si (boş APN),
3. Modemin LTE'ye bağlandığı APN,
4. Mobil geniş bant sağlayıcı veritabanındaki operatörün internet APN'leri.

İnternet adresi alan ilk APN, o operatör için kaydedilir. Başka bir operatörden yeni bir SIM takarsanız yeniden algılama yapılır. Operatörünüz özel bir APN gerektiriyorsa (özel APN, M2M veya kurumsal SIM'ler), bunu yazın. Kullanıcı tarafından ayarlanan APN, denenen tek APN olur.

## HiLink modemi kurma

1. Modemi takın. LED'i sabit bir bağlantı gösterene kadar bekleyin.
2. **Modem** sayfasında **Modemi etkinleştir** seçeneğini **Evet**, **Modem tipi** seçeneğini **HiLink** yapın.
3. **Hilink Modem Bilgileri** bölümünü kontrol edin: **Arayüz** ve bir **IP Adresi** görmelisiniz.

HiLink modemler kendi kendine bağlanır, ağı seçer ve yeniden bağlanır; bu yüzden bağlan düğmesi yoktur. APN, PIN veya ağ modunu modemin kendi web sayfasında değiştirin (drone'un ağından tarayıcıyla açın; genellikle `http://192.168.8.1`).

## Ayar referansı

| Ayar | Varsayılan | Değerler | Notlar |
| --- | --- | --- | --- |
| **Modemi etkinleştir** | **Evet** | **Evet**, **Hayır** |  |
| **Modem tipi** | **Geleneksel (PPP)** | **HiLink**, **Geleneksel (PPP)** |  |
| **Erişim Noktası Adı (İsteğe bağlı)** | Boş (**Otomatik**) | Operatörünüzün APN'si | Yalnızca geleneksel modemler için. |
| **Kullanıcı adı (İsteğe bağlı)** / **Parola (İsteğe bağlı)** | Boş |  | Yalnızca geleneksel modemler için. Çoğu operatör ikisini de gerektirmez. |
| **PIN kodu (İsteğe bağlı)** | Boş | SIM PIN'i | Yalnızca geleneksel modemler için. SIM'in PIN'i yoksa boş bırakın. |

## Modem bilgisi

Geleneksel modemler için **Modem Bilgileri** şunları gösterir: **Sinyal Kalitesi**, **Teknoloji** (LTE, UMTS …), **Kilit Açma Gerekli**, **Durum**, **Üretici**, **IMEI**, ağ bilgileri (**Operatör**, **Kod**, **Kayıt**), **IPv4 Bilgileri** (**IP Adresi**, **Ağ Geçidi**, **DNS**, **MTU**) ve **Bağlantı Özellikleri** (**APN**, **IP Tipi**, **Dolaşım**).

Kontrol Paneli'ndeki **Cellular** satırı aynı sinyal özetini gösterir.

## Hücresel bağlantıyla uçmadan önce

- [Ağlar](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/networks/) sayfasında, Wi-Fi kalkışta hâlâ menzildeyken trafiğin modemde kalması için **Modem Önceliği (Dış Mekan Modu)** seçeneğini seçin.
- [VPN](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/vpn/) kullanın: hücresel operatörler, drone'a yer kontrol istasyonunuzun ulaşabileceği bir adres vermez.
- Uçuş kontrolcüsünde **YKİ Güvenli Modu** özelliğini açın.
- Sinyali yükseklikte kontrol edin: kapsama yer için planlanmıştır ve yükseldikçe sinyal değişir.

## Sorun giderme

| Belirti | Kontrol edin |
| --- | --- |
| *Modem Bağlı Değil* | Modem algılanmıyor. USB bağlantısını ve modemin güç LED'ini kontrol edin. Modem bağlanırken Pi yeniden başlıyorsa güçlü bir hub kullanın. |
| **Kilit Açma Gerekli** *kilitli* gösteriyor | SIM PIN'ini girin veya PIN'i bir telefonda devre dışı bırakın. |
| Kayıtlı, ama IP adresi yok | Yanlış APN. Otomatik yerine operatörünüzün APN'sini yazın. |
| Bağlanıyor, sonra yük altında kopuyor | Genellikle güç. Kontrol Paneli'ndeki **Power supply** satırını kontrol edin. |

**İşlem Kayıtları** her APN denemesini ve başarısız olma nedenini gösterir. Daha fazla yardım için bkz. [Modem bağlı ama internet yok](https://docs.uavmatrix.com/tr/troubleshooting/modem-no-internet/).

Source: https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/cellular-modem/
