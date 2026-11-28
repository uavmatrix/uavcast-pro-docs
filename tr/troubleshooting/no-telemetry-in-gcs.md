# QGroundControl veya Mission Planner'da telemetri yok

> Uçuş kontrolcüsü UAVcast-Pro'da bağlı ama QGroundControl veya Mission Planner hâlâ bekliyor mu? Telemetriyi Etkinleştir, IP, UDP 14550 ve VPN'i kontrol edin.

UAVcast-Pro uçuş kontrolcüsünü **Connected** olarak gösterir, ancak QGroundControl *Waiting for vehicle connection* yazar veya Mission Planner *No heartbeat packets received* mesajıyla zaman aşımına uğrar. Drone uçuş kontrolcüsünü duyuyor; yalnızca telemetri yer kontrol istasyonunuza ulaşmıyor.

UAVcast-Pro'nun kendisi **No heartbeat** gösteriyorsa, önce bunu düzeltin: [MAVLink heartbeat yok](https://docs.uavmatrix.com/tr/troubleshooting/no-mavlink-heartbeat/).

| Ne görürsünüz | Olası neden | Başlangıç |
| --- | --- | --- |
| Kontrol paneli: Ground station None set up veya Not sending | Hedef yok veya Telemetriyi Etkinleştir kapalı | [Kontrol 1](https://docs.uavmatrix.com/tr/troubleshooting/no-telemetry-in-gcs/#check-1) |
| Kontrol paneli Sending diyor, GCS hiçbir şey görmüyor | Yanlış IP, güvenlik duvarı veya GCS başka bir portu dinliyor | [Kontrol 2](https://docs.uavmatrix.com/tr/troubleshooting/no-telemetry-in-gcs/#check-2) |
| Wi-Fi üzerinde çalışıyordu, 4G üzerinde hiçbir şey yok | Hedef, VPN IP adresi yerine yerel bir IP adresi | [Kontrol 3](https://docs.uavmatrix.com/tr/troubleshooting/no-telemetry-in-gcs/#check-3) |
| TCP 5760 üzerinden bağlanıyordu, güncellemeden sonra durdu | TCP 5760, v6.5.0 sürümünde kapatıldı | [Kontrol 4](https://docs.uavmatrix.com/tr/troubleshooting/no-telemetry-in-gcs/#check-4) |
| Telemetri görünüyor, ama komutlar ve mod değişiklikleri etkisiz | Bu hedef için Read Only açık | [Kontrol 5](https://docs.uavmatrix.com/tr/troubleshooting/no-telemetry-in-gcs/#check-5) |

## Kontrol 1: Telemetri gönderiliyor mu?

1. **Kontrol Paneli**'ni açın ve durum kartındaki **Ground station** satırını okuyun.

   - **None set up**: hedef yok. 2. adımda bir tane ekleyin.
   - **Not sending**: bir hedef var ama hiçbir şey gönderilmiyor.
   - **Sending to … · n packets/s**: telemetri drone'dan çıkıyor. 2. kontrole geçin.

2. **Yer Kontrol İstasyonları** sayfasına gidin. Liste boşsa **Hedef Ekle** düğmesine basın.

3. Bilgisayarınızın kartında **Uç Noktayı Etkinleştir** ve **Telemetriyi Etkinleştir** seçeneklerini açın. Yeni bir hedefte hem video hem telemetri kapalıdır.

4. Bilgisayarın IPv4 adresini **Hedef IP veya Sunucu** alanına girin ve **Telemetri Portu** değerini `14550` olarak bırakın.

![Hedefin telemetri bölümü: Telemetriyi Etkinleştir açık, Read Only kapalı](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/ground-control--telemetry-enabled.webp)

*Yer Kontrol İstasyonları: Telemetriyi Etkinleştir açık bir hedef.*

> **Geçersiz adresler atlanır**
>
> UAVcast-Pro yalnızca `192.168.1.10` gibi IPv4 adreslerini kabul eder. Bir sunucu adı kaydetmeye çalışırsanız *Enter a valid IPv4 address, for example 192.168.1.10.* mesajını görürsünüz. Eksik veya geçersiz bir adres telemetri yönlendiricisinden çıkarılır ve Uçuş Kontrolcüsü sayfasındaki **Bağlantı kontrolü** bunu listeler.

## Kontrol 2: Yer istasyonunun dinlediğinden emin olun

UAVcast-Pro, ayarladığınız adrese ve porta UDP üzerinden MAVLink gönderir. Yer istasyonu bu portu dinlemelidir.

- **QGroundControl** varsayılan olarak UDP 14550 portunu dinler. **Telemetri Portu** değerini değiştirdiyseniz, **Application Settings → Comm Links** bölümünde aynı porta bir UDP comm link ekleyin.
- **Mission Planner**: sağ üstteki bağlantı açılır listesinden **UDP** seçin, **Connect** düğmesine basın ve `14550` portunu kabul edin.
- Bir portu yalnızca bir program dinleyebilir. MAVProxy, ikinci bir QGroundControl veya 14550 portunu tutabilecek başka bir aracı kapatın.
- Güvenlik duvarında gelen UDP 14550 trafiğine izin verin. Komutlar için [Video yok, kontrol 3](https://docs.uavmatrix.com/tr/troubleshooting/no-video-in-gcs/#check-3) sayfasına bakın.

## Kontrol 3: 4G üzerinde VPN adresini kullanın

4G üzerinden drone, `192.168.1.20` gibi yerel bir adrese ulaşamaz. Bilgisayarınızın VPN adresini (Fleet Manager VPN, Tailscale veya ZeroTier) **Hedef IP veya Sunucu** alanına yazın.

Bilgisayardan drone'un VPN adresine ping atın. Ping başarısızsa sorun VPN'dedir: [VPN bağlı ama drone'a ulaşılamıyor](https://docs.uavmatrix.com/tr/troubleshooting/vpn-cant-reach-drone/) sayfasına bakın.

## Kontrol 4: TCP 5760 artık çalışmıyor

v6.5.0 sürümünden itibaren telemetri yönlendiricisi 5760 portunda TCP bağlantılarını kabul etmez. Bu nedenle yalnızca eklediğiniz ve açtığınız yer istasyonları veri alır. Mission Planner'ı daha önce TCP 5760 üzerinden bağlıyorsanız, bilgisayarınızı hedef olarak ekleyin ve bunun yerine UDP üzerinden bağlanın.

## Kontrol 5: Komutlar yok sayılıyor

Telemetri görünüyor ama arm etme, mod değişiklikleri veya görev yüklemeleri hiçbir şey yapmıyorsa, o hedefteki **Read Only** ayarını kontrol edin. Read Only, araçta değişiklik yapacak her şeyi (komutlar, mod değişiklikleri, parametre ve görev yazmaları) engeller; böylece yer istasyonu yalnızca izleyebilir. Bu, UAVcast-Pro 6.5.3'ten itibaren geçerlidir; önceki sürümlerde Read Only parametre yazmalarını engellemez. Bazı yer istasyonları bu modda uyarı gösterir, çünkü bazı istekleri yanıtsız kalır.

## Hâlâ bir sonuç yok mu?

**Mavlink Yöneticisi** seçiliyken [günlükleri indirin](https://docs.uavmatrix.com/tr/troubleshooting/collect-logs/) ve **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresine gönderin. Hangi yer istasyonunu kullandığınızı ve IP adresini belirtin.

İlgili: [Yer Kontrol İstasyonları](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/) · [Portlar ve protokoller](https://docs.uavmatrix.com/tr/reference/ports-and-protocols/)

Source: https://docs.uavmatrix.com/tr/troubleshooting/no-telemetry-in-gcs/
