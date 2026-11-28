# UAVcast-Pro

> UAVcast-Pro web arayüzü için başvuru: kontrol paneli, uçuş kontrolcüsü, uçuş haritası, yer kontrol istasyonları, kamera, modem, VPN, Fleet Manager eşleştirme, kullanıcılar ve ayarlar.

Bu bölüm, UAVcast-Pro web arayüzünün her sayfasını uygulamanın kenar çubuğundaki sıraya göre açıklar. Her sayfada ekranın amacı, nasıl kurulacağı ve her ayarın varsayılan değeriyle birlikte listelendiği anlatılır. UAVcast-Pro'da yeniyseniz [Hızlı başlangıç](https://docs.uavmatrix.com/tr/get-started/quick-start/) bölümüyle başlayın.

## Operasyonlar

[Kontrol PaneliUçuş kontrolcüsü, GPS, bağlantılar, video ve gücün sağlık durumuna tek bakışta göz atın.](https://docs.uavmatrix.com/tr/uavcast-pro/dashboard/)[Veri AkışlarıHerhangi bir MAVLink veya sensör değeri için özel canlı panolar.](https://docs.uavmatrix.com/tr/uavcast-pro/data-streams/)[Uçuş KontrolcüsüOtomatik port ve baud algılamalı USB veya UART bağlantısı, NTRIP/RTK ve enjektörler.](https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/)[Uçuş HaritasıCanlı harita, kokpit HUD'u, arm/disarm, modlar, görevler, radyo, İnceleyici ve günlük analizi.](https://docs.uavmatrix.com/tr/uavcast-pro/flight-map/)[Yer kontrol istasyonları ve videoHedefler ile birlikte Mission Planner, QGroundControl, GStreamer, Android ve VLC kurulum adımları.](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/)

## Bağlantı

[ModemOtomatik APN destekli HiLink ve geleneksel 4G/LTE modemler.](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/cellular-modem/)[Sanal Özel AğFleet Manager VPN'i veya kendi Tailscale ya da ZeroTier ağınız.](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/vpn/)[Dinamik DNSBir sunucu adını drone'un genel IP adresine yönlendirilmiş tutun.](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/dynamic-dns/)[AğlarArayüzler ve Wi-Fi ile modem önceliği.](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/networks/)

## Medya

[Kamera ayarlarıCSI ve USB kameralar, çözünürlük, bit hızı, UDP üzerinden düşük gecikmeli H.264.](https://docs.uavmatrix.com/tr/uavcast-pro/camera/)[İki kameraRC kanal değiştirme veya çift akış.](https://docs.uavmatrix.com/tr/uavcast-pro/camera/multi-camera/)[SesÖnizlemede ve yer kontrol istasyonlarına mikrofon sesi.](https://docs.uavmatrix.com/tr/uavcast-pro/camera/audio/)[KayıtlarDrone üzerinde video ve telemetri kaydı ile uçuş incelemesi.](https://docs.uavmatrix.com/tr/uavcast-pro/camera/recordings/)

## Yönetim

[Fleet ManagementDrone'u UAVmatrix Fleet Manager ile eşleştirin.](https://docs.uavmatrix.com/tr/uavcast-pro/fleet-pairing/)[UsersAdmin girişi ve Read Only kullanıcılar.](https://docs.uavmatrix.com/tr/uavcast-pro/users/)[UygulamaPort, dil, destek için günlükler, veritabanı yedekleme ve geri yükleme.](https://docs.uavmatrix.com/tr/uavcast-pro/application-settings/)

## Portlara genel bakış

| Port | Yön | Kullanım amacı |
| --- | --- | --- |
| TCP 80 | Tarayıcı → drone | Web arayüzü (yapılandırılabilir) ve HTTP enjektörleri |
| UDP 14550 | Drone → yer kontrol istasyonu | MAVLink telemetrisi (hedef başına, yapılandırılabilir) |
| UDP 5600 | Drone → yer kontrol istasyonu | Video, kamera 1 (hedef başına, yapılandırılabilir) |
| UDP 5601 | Drone → yer kontrol istasyonu | Çift akışlı kamera 2 için video (varsayılan olarak Video Portu + 1) |
| UDP 5602 | Drone → yer kontrol istasyonu | Ses (Video Portu + 2) |
| TCP 8889, UDP 8189 | Tarayıcı → drone | Canlı önizleme (WebRTC sinyalleşmesi ve medya) |
| TCP 8883 | Drone → Fleet Manager | Fleet Manager bağlantısı (TLS üzerinden MQTT) |
| TCP 2101 | Drone → NTRIP caster | RTK düzeltmeleri (caster portu) |
| UDP 14600 | Sensör → drone | UDP enjektörü (varsayılan, yapılandırılabilir) |

Source: https://docs.uavmatrix.com/tr/uavcast-pro/
