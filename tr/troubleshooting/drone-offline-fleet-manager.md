# Drone, Fleet Manager'da Offline görünüyor

> Eşleştirilmiş UAV, Fleet Manager'da Offline veya Re-pair required gösteriyor mu? Drone'un internetini, 8883 giden portunu, UAVcast-Pro Fleet Management ayarını ve lisansı kontrol edin.

UAV eşleştirilmiştir, ancak Fleet Manager onu **Offline** olarak gösteriyor (filo haritasında gri), telemetrisi donmuş durumda veya **Re-pair required** rozeti taşıyor.

Fleet Manager, bir UAV'den 20 saniye boyunca hiçbir veri alamazsa onu offline olarak işaretler. Drone, Fleet Manager ile kendi internet bağlantısı üzerinden, şifreli bir MQTT bağlantısıyla iletişim kurar.

| Ne görürsünüz | Olası neden | Başlangıç |
| --- | --- | --- |
| Offline, ve UAVcast-Pro Fleet Management Disconnected diyor | Drone’un interneti yok veya 8883 portu engellenmiş | [Kontrol 1](https://docs.uavmatrix.com/tr/troubleshooting/drone-offline-fleet-manager/#check-1) |
| Re-pair required rozeti veya This UAV must be re-paired | Drone’un eski bir sertifikası var | [Kontrol 2](https://docs.uavmatrix.com/tr/troubleshooting/drone-offline-fleet-manager/#check-2) |
| UAVcast-Pro’yu yeniden kurduktan veya sıfırladıktan hemen sonra Offline | Eşleştirme drone üzerinde kaldırıldı | [Kontrol 3](https://docs.uavmatrix.com/tr/troubleshooting/drone-offline-fleet-manager/#check-3) |
| Online, ama konum veya batarya yok | Uçuş kontrolcüsü UAVcast-Pro’ya bağlı değil | [Kontrol 4](https://docs.uavmatrix.com/tr/troubleshooting/drone-offline-fleet-manager/#check-4) |

## Kontrol 1: Drone'un Fleet Manager bağlantısı

1. Drone üzerinde UAVcast-Pro'yu açın ve **Fleet Management** sayfasına gidin. **Fleet Connection** alanında **Connected** veya **Disconnected** ile **Last Connected** değerini görürsünüz.
2. **Disconnected** görünüyorsa drone'un internetinin olduğunu kontrol edin: kontrol panelindeki **Cellular** satırına bakın veya cihazda `curl -I https://fleet-manager.uavmatrix.com` komutunu çalıştırın. Önce bağlantıyı [Modem bağlı, ancak internet yok](https://docs.uavmatrix.com/tr/troubleshooting/modem-no-internet/) sayfasındaki adımlarla düzeltin.
3. Drone, **8883 portunda giden bir TCP bağlantısı** (TLS üzerinden MQTT) açabilmelidir. Bazı kurumsal ağlar, halka açık Wi-Fi ve birkaç IoT SIM planı yalnızca web portlarına izin verir. Başka bir ağ deneyin veya sağlayıcıdan 8883 portunu açmasını isteyin.
4. Cihazdaki tarih ve saati `date` komutuyla kontrol edin. Bağlantı sertifika kullanır ve yanlış saate sahip bir cihazda bu doğrulama başarısız olur.
5. Drone'daki lisansın hâlâ aktif olduğundan emin olun (**Uygulama → Lisans Yöneticisi**).

## Kontrol 2: Yeniden eşleştirme gerekli

Fleet Manager, drone'ların bağlanma şeklini değiştirdi; bu değişiklikten önce eşleştirilmiş UAV'lerin bir kez daha eşleştirilmesi gerekir. Hiçbir şey kaybolmaz: UAV adını ve geçmişini korur, Fleet Manager'da silmeniz gerekmez.

1. Drone üzerinde UAVcast-Pro'da **Fleet Management** sayfasını açın, **Disconnect from Fleet** düğmesine basın ve onaylayın.
2. **Connect to Fleet Manager** düğmesine basın. Geri sayımlı 8 haneli bir **Pairing Code** görünür.
3. Fleet Manager'da **Fleet → Pair Device** bölümüne gidin, organizasyonu seçin ve kodu girin.

## Kontrol 3: Drone eşleştirmesini kaybetti

Veritabanı sıfırlamasıyla yapılan bir yeniden kurulum, **Veritabanını Sıfırla** veya **Disconnect from Fleet** işlemi drone üzerindeki eşleştirmeyi kaldırır ve drone raporlamayı durdurur. Kontrol 2'deki gibi yeniden eşleştirin. Aynı organizasyona eşleştirmek mevcut UAV kaydını yeniden kullanır.

## Kontrol 4: Online, ancak telemetri yok

Konum, batarya ve uçuş modu uçuş kontrolcüsünden gelir. UAV online ancak bu alanlar boşsa UAVcast-Pro uçuş kontrolcüsünü duyamıyor demektir: bkz. [MAVLink heartbeat yok](https://docs.uavmatrix.com/tr/troubleshooting/no-mavlink-heartbeat/).

## Hâlâ offline mı?

Drone üzerinden **Tüm Günlükler** seçili olarak [günlükleri indirin](https://docs.uavmatrix.com/tr/troubleshooting/collect-logs/) ve UAV adını ile organizasyonu ekleyerek **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresine gönderin. Fleet Manager ile ilgili diğer sorunlar [Fleet Manager sorun giderme](https://docs.uavmatrix.com/tr/fleet-manager/troubleshooting/) sayfasında ele alınmıştır.

İlgili: [UAVcast-Pro'da Fleet Manager eşleştirmesi](https://docs.uavmatrix.com/tr/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/tr/troubleshooting/drone-offline-fleet-manager/
