# UAVcast-Pro nedir?

> UAVcast-Pro, bir Raspberry Pi veya Linux eşlik eden bilgisayarını MAVLink telemetrisi ve H.264 videosu için 4G/LTE bağlantısına dönüştürür. Fleet Manager ile nasıl çalıştığını görün.

UAVcast-Pro, drone'unuzdaki bir eşlik eden bilgisayar için geliştirilmiş bir yazılımdır; genellikle bir Raspberry Pi. Herhangi bir MAVLink uçuş kontrolcüsünden (ArduPilot veya PX4) MAVLink okur, bir veya iki kameradan H.264 video akıtır ve her ikisini Wi-Fi, Ethernet veya 4G/LTE modem üzerinden yer kontrol istasyonunuza gönderir. Onu, drone üzerinde çalışan bir web arayüzünden kurar ve izlersiniz.

UAVmatrix Fleet Manager, bunun eşlik eden bulut kontrol panelidir. UAVcast-Pro çalıştıran bir drone'u Fleet Manager ile eşleştirdiğinizde tüm filoyu tek bir haritada görebilir, uzak bir terminal açabilir, görev planlayabilir ve video ile telemetriyi port yönlendirmesi olmadan yer kontrol istasyonlarına yönlendirebilirsiniz. Fleet Manager, her UAVcast-Pro lisansına dahildir.

## Bileşenler nasıl birbirine bağlanır

```text
 Flight controller ──USB/UART──►  Companion computer running UAVcast-Pro
 (ArduPilot, PX4)                  │  MAVLink router, camera server, modem,
 Camera(s) ──CSI/USB────────────►  │  VPN, NTRIP client, recorder, web UI
                                   │
                                   ├── UDP 14550 (telemetry) ─┐
                                   ├── UDP 5600  (video)    ──┼─► Mission Planner / QGroundControl
                                   │                          │   over LAN, VPN or 4G
                                   └── MQTT/TLS 8883 ─────────┴─► Fleet Manager (optional)
```

- **Drone üzerinde**: UAVcast-Pro, uçuş kontrolcüsünün seri portunu yönetir ve MAVLink'i eklediğiniz her yer kontrol istasyonuna iletir. Kamera sunucusu H.264'ü kodlar ve aynı yer kontrol istasyonlarına UDP üzerinden RTP gönderir. Siz eklemedikçe gelen telemetri bağlantılarını dinleyen hiçbir şey yoktur.
- **Drone ile yer arasında**: Yerel bir ağda yer kontrol istasyonunun kendi IP adresi yeterlidir. 4G üzerinden drone'un genel bir adresi yoktur; bu nedenle iki ucu da bir VPN'e alırsınız. Lisansla birlikte gelen [Fleet Manager VPN](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/vpn/) bunu sizin yerinize yapar. UAVcast-Pro, kendi Tailscale veya ZeroTier ağınıza da katılabilir.
- **Bulutta**: Eşleştirildiğinde drone, Fleet Manager'a dışa dönük, sertifikayla doğrulanmış bir MQTT bağlantısı sürdürür. Bkz. [Drone'u Fleet Manager ile eşleştirme](https://docs.uavmatrix.com/tr/uavcast-pro/fleet-pairing/).

## Neler yapabilirsiniz

| Alan | Ne yapar | Sayfa |
| --- | --- | --- |
| Telemetri | Uçuş kontrolcüsünün portunu ve baud hızını otomatik algılar, MAVLink'i istediğiniz sayıda yer kontrol istasyonuna yönlendirir; isteğe bağlı salt okunur hedefler | [Uçuş kontrolcüsü](https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/), [Yer kontrol istasyonları](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/) |
| Video | Raspberry Pi CSI ve USB kameralar, RC ile geçişli iki kamera veya çift akış, ses, özel GStreamer pipeline'ları | [Kamera ve video](https://docs.uavmatrix.com/tr/uavcast-pro/camera/) |
| Kayıt | Her uçuşun videosunu ve telemetrisini drone üzerinde kaydeder; uçuş incelemesi oynatıcısıyla birlikte | [Kayıtlar](https://docs.uavmatrix.com/tr/uavcast-pro/camera/recordings/) |
| Uçuş haritası | Canlı harita, kokpit HUD'u, arm et/disarm et, RTL ve loiter, görev planlayıcı, MAVLink Denetçisi, günlük analizi | [Uçuş haritası](https://docs.uavmatrix.com/tr/uavcast-pro/flight-map/) |
| Bağlantı | Otomatik APN ile 4G/LTE modemler, Fleet Manager VPN veya kendi Tailscale ya da ZeroTier ağınız, dinamik DNS, Wi-Fi ve modem önceliği | [Bağlantı](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/) |
| RTK | RTCM3 düzeltmelerini uçuş kontrolcüsüne gönderen NTRIP istemcisi | [NTRIP / RTK](https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/ntrip-rtk/) |
| Özel veri | Sensörleri ve betikleri MAVLink'e köprüleyin ve grafiklerle gösterin | [Enjektörler](https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/injectors/), [Veri Akışları](https://docs.uavmatrix.com/tr/uavcast-pro/data-streams/) |

## Neye ihtiyacınız var

- 64 bit bir Linux eşlik eden bilgisayar (arm64 veya amd64). Raspberry Pi 3, 4, 5 ve Zero 2 W en yaygın tercihlerdir; x86 mini PC'ler de çalışır. NVIDIA Jetson, Orange Pi ve diğer arm64 kartlar UAVcast-Pro 6.5.3'ten itibaren desteklenir. Bkz. [Donanım gereksinimleri](https://docs.uavmatrix.com/tr/get-started/hardware-requirements/).
- Bir MAVLink uçuş kontrolcüsü: ArduPilot veya PX4. Uçuş modu düğmeleri ArduPilot'un mod adlarını izler.
- [UAVmatrix mağazasından](https://uavmatrix.com/products/) bir UAVcast-Pro lisansı. Bkz. [Lisanslama ve etkinleştirme](https://docs.uavmatrix.com/tr/get-started/license-activation/).
- Wi-Fi menzili dışındaki uçuşlar için bir 4G/LTE modem ve bir veri SIM'i.

## Sonraki adımlar

[Hızlı başlangıçBoş bir Raspberry Pi'den Mission Planner veya QGroundControl'de telemetri ve videoya kadar.](https://docs.uavmatrix.com/tr/get-started/quick-start/)[UAVcast-Pro'yu kurunRaspberry Pi OS, Debian veya Ubuntu üzerinde tek komut (arm64 ve amd64).](https://docs.uavmatrix.com/tr/get-started/installation/)[Lisansınızı etkinleştirinBir cihazda etkinleştirin, cihaz yuvalarını kontrol edin ve lisansı yeni donanıma taşıyın.](https://docs.uavmatrix.com/tr/get-started/license-activation/)

Source: https://docs.uavmatrix.com/tr/get-started/overview/
