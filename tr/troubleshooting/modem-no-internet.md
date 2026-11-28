# 4G modem bağlı, ancak internet yok

> LTE modem sinyal ve operatör gösteriyor ama drone'un interneti yok mu? Modem tipini, APN'yi, SIM PIN ve verisini, ağ önceliğini ve varsayılan rotayı kontrol edin.

**Modem** sayfası sinyal, bir operatör ve belki bir IP adresi gösteriyor; ancak drone internete ulaşamıyor: VPN bağlanmıyor, lisans kontrol edilemiyor ve video ile telemetri LTE üzerinden yer kontrol istasyonuna ulaşmıyor.

| Ne görürsünüz | Olası neden | Başlangıç |
| --- | --- | --- |
| No Modem Connected | Linux modemi görmüyor veya güç yok | [Kontrol 1](https://docs.uavmatrix.com/tr/troubleshooting/modem-no-internet/#check-1) |
| HiLink modemle ilgili bir hata veya USB çubuk için Bağlan düğmesinin olmaması | Yanlış modem tipi | [Kontrol 2](https://docs.uavmatrix.com/tr/troubleshooting/modem-no-internet/#check-2) |
| Ağa kayıtlı, ancak IPv4 adresi yok | Yanlış APN, PIN veya SIM üzerinde veri yok | [Kontrol 3](https://docs.uavmatrix.com/tr/troubleshooting/modem-no-internet/#check-3) |
| Modemin IP adresi var, ancak internet hâlâ Wi-Fi üzerinden gidiyor | Ağ önceliği Wi-Fi’yi tercih ediyor | [Kontrol 4](https://docs.uavmatrix.com/tr/troubleshooting/modem-no-internet/#check-4) |
| Evde çalışıyor, sahada çalışmıyor (ya da tersi) | Dolaşım, kapsama veya modem alt ağında bir ev ağı | [Kontrol 5](https://docs.uavmatrix.com/tr/troubleshooting/modem-no-internet/#check-5) |

![Geleneksel (PPP) seçili ve No Modem Connected paneli görünen UAVcast-Pro Modem sayfası](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/modem.webp)

*Geleneksel (PPP) seçili ve modem takılı olmayan Modem sayfası. Modem bağlıyken sağdaki kart sinyal kalitesini, durumu, operatörü ve IPv4 bilgisini gösterir.*

## Kontrol 1: Modem algılanıyor mu?

Sayfada **Modem Bağlı Değil** yazıyorsa:

1. Modemin güç ışığının yandığını ve bir USB porta sıkıca oturduğunu kontrol edin.
2. Modem, bir Raspberry Pi USB portunun sağladığından fazla akım çekebilir. Kontrol panelindeki **Power supply** satırını izleyin. **Voltage too low - use a stronger power supply** yazıyorsa önce gücü düzeltin: [Düşük gerilim ve kısıtlama](https://docs.uavmatrix.com/tr/troubleshooting/undervoltage-and-throttling/).
3. Pi üzerinde modemi görmek için `lsusb`, ModemManager'ın bulup bulmadığını görmek için `mmcli -L` komutunu çalıştırın. HiLink modem `mmcli` çıktısında görünmez; bunun yerine `ip addr` çıktısında bir ağ arayüzü olarak görünür.

Modem algılandığında kendiliğinden sayfada görünür.

## Kontrol 2: Doğru modem tipini seçin

USB modemlerin iki tipi vardır ve **Modem tipi** sizinkiyle eşleşmelidir.

|  | **HiLink** | **Geleneksel (PPP)** |
| --- | --- | --- |
| Linux onu nasıl görür | Bir ağ adaptörü (modem küçük bir yönlendiricidir) | ModemManager tarafından yönetilen bir modem |
| Kim bağlanır | Modemin kendisi, otomatik olarak | UAVcast-Pro, **Bağlan** ve **Bağlantıyı Kes** düğmeleriyle |
| Huawei örneği | E3372**h** | E3372**s** |

**Geleneksel (PPP)** seçili bir HiLink modeminiz varsa günlükte *HiLink modem detected … Please change your modem type to 'HiLink' in settings.* mesajı görünür. **Modem tipi** değerini değiştirin, hata kaybolur.

## Kontrol 3: APN, PIN ve SIM

**Geleneksel (PPP)** modem için:

1. Önce **Erişim Noktası Adı (İsteğe bağlı)** alanını boş bırakın. UAVcast-Pro, ağınızın varsayılan APN'sini ve SIM için bilinen APN'leri dener ve çalışanı hatırlar (günlükte *Found a working … it will be used from now on*).
2. Bu başarısız olursa, operatörünüzün mobil veri için verdiği APN'yi girin. Bazı operatörler ayrıca **Kullanıcı adı (İsteğe bağlı)** ve **Parola (İsteğe bağlı)** ister.
3. SIM'de PIN varsa **PIN kodu (İsteğe bağlı)** alanına girin ya da SIM'i bir telefona takarak PIN'i kapatın. **Modem Bilgileri** altındaki **Kilit Açma Gerekli** SIM'in kilitli olup olmadığını gösterir.
4. SIM'i bir telefona takın ve mobil verinin çalıştığını ve pakette veri kaldığını kontrol edin.

**HiLink** modem için APN, modemin kendi web sayfasında ayarlanır; genellikle `http://192.168.8.1` adresindedir. Pi'den açın veya modemi bir dizüstü bilgisayara takın.

> **UAVcast-Pro denemeye devam eder**
>
> Geleneksel modem açılışta bağlanır ve sinyal kaybından sonra kendiliğinden yeniden bağlanır. Bir modem adres almadan bağlanırsa UAVcast-Pro onu ham IP moduna alır ve yeniden dener. Ayarları değiştirmeden önce açılıştan sonra bir dakika bekleyin.

## Kontrol 4: Modemi varsayılan rota yapın

Pi aynı zamanda Wi-Fi veya Ethernet'e bağlıysa trafik, öncelikli arayüzden gider; bu mutlaka modem olmayabilir.

1. **Ağlar** sayfasına gidin.
2. **Ağ Önceliği** altında uçuştan önce **Modem Önceliği (Dış Mekan Modu)** seçin. **WiFi Önceliği (İç Mekan Modu)** evde hücresel veriden tasarruf sağlar ama her şeyi Wi-Fi üzerinden gönderir.
3. **Ağ Arayüzleri** bölümünde modem arayüzünün **Varsayılan** olarak işaretli olduğunu ve **Varsayılan Ağ Geçidi** değerinin modem arayüzü üzerinden *via* göründüğünü kontrol edin.

![Ağ Önceliği Otomatik olarak ayarlı ve arayüz tablosunda wlan0 varsayılan olarak görünen Ağlar sayfası](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/networks.webp)

*Otomatik (Sistem Varsayılanı) aktif ve Wi-Fi (wlan0) varsayılan rota olan Ağlar sayfası. Modem üzerinden yönlendirmek için burada Modem Önceliği (Dış Mekan Modu) seçin.*

Pi'den yalnızca modem üzerinden test edin:

```bash
ping -c 3 -I wwan0 1.1.1.1   # Traditional modem (interface name may differ)
ip route                     # the first "default via" line is the route in use
```

## Kontrol 5: Yalnızca sahada görülen sorunlar

- **Dolaşım**: Yurt dışında kullanılan bir SIM için operatörün dolaşımı açması gerekebilir. Aynı SIM'li bir telefonda kontrol edin.
- **Kapsama**: **Sinyal Kalitesi** ve **Teknoloji** değerlerine bakın. Bazı IoT SIM'leri yalnızca belirli bantlarda veya teknolojilerde çalışır.
- **Alt ağ çakışması**: HiLink modemler `192.168.8.x` adresleri dağıtır. Evinizin veya ofisinizin ağı da `192.168.8.0/24` kullanıyorsa yönlendirme bozulur. LAN'ı veya modemin alt ağını değiştirin.

## Hâlâ internet yok mu?

**Modem Yöneticisi** seçiliyken [günlükleri indirin](https://docs.uavmatrix.com/tr/troubleshooting/collect-logs/), `mmcli -m 0` ve `ip route` çıktısını ekleyin ve modem modeli ile operatörü belirterek **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresine gönderin.

İlgili: [Hücresel modem](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/cellular-modem/) · [Ağlar](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/networks/)

Source: https://docs.uavmatrix.com/tr/troubleshooting/modem-no-internet/
