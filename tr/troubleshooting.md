# Sorun giderme

> Video yok, MAVLink heartbeat yok, modem ve VPN sorunları, lisans hataları ve Fleet Manager eşleştirmesini düzeltin. Gördüğünüz durumdan başlayın ve kontrolleri izleyin.

Belirtiden başlayın. Aşağıdaki her sayfa, olası nedenleri sahada oluşma sırasına göre ve UAVcast-Pro ile Fleet Manager arayüzlerindeki tam etiketleri kullanan numaralı kontrollerle listeler.

> **Önce kontrol panelini kontrol edin**
>
> UAVcast-Pro'da **Kontrol Paneli**'ni açın. Durum kartı drone'un özetini tek satırda verir (**All systems normal** veya sorun ve uyarı sayısı) ve her biri için bir satır içerir: **Flight controller**, **Ground station**, **Cellular**, **VPN**, **RTK corrections**, **Video** ve **Power supply**. İlk kırmızı satır genellikle başlangıç noktasıdır.

![GPS no fix ve VPN not connected olmak üzere 2 sorun gösteren durum kartıyla UAVcast-Pro kontrol paneli](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/dashboard.webp)

*Kontrol Paneli → durum kartı. Sorunlu satırlar kırmızıya döner ve sorun rozetinde sayılır; burada GPS (no fix) ve VPN (not connected).*

## Belirtinizi bulun

| Gördükleriniz | Olası neden | Gidilecek sayfa |
| --- | --- | --- |
| Telemetri çalışıyor, ama QGroundControl veya Mission Planner'daki video alanı siyah | Bu yer kontrol istasyonu için **Videoyu Etkinleştir** kapalı, yanlış IP veya bir güvenlik duvarı | [Yer kontrol istasyonunda video yok](https://docs.uavmatrix.com/tr/troubleshooting/no-video-in-gcs/) |
| Video donuyor, gri lekeler oluşuyor veya saniyeler geride kalıyor | Bit hızı bağlantı için çok yüksek veya anahtar kareler çok seyrek | [Takılan veya gecikmeli video](https://docs.uavmatrix.com/tr/troubleshooting/choppy-or-delayed-video/) |
| Uçuş Kontrolcüsü sayfasında **No heartbeat**, **Waiting for device** veya **Detecting baud rate** yazıyor | Kablo, bağlantı, port veya baud hızı | [MAVLink heartbeat yok](https://docs.uavmatrix.com/tr/troubleshooting/no-mavlink-heartbeat/) |
| UAVcast-Pro uçuş kontrolcüsünü **Connected** gösteriyor, GCS bağlantı bekliyor | Telemetri GCS'ye gönderilmiyor veya GCS dinlemiyor | [Yer kontrol istasyonunda telemetri yok](https://docs.uavmatrix.com/tr/troubleshooting/no-telemetry-in-gcs/) |
| **Kamera Seç** içinde **No cameras available** | CSI kamera yığını eksik, şerit kablo veya USB kamera görülmüyor | [Kamera algılanmıyor](https://docs.uavmatrix.com/tr/troubleshooting/camera-not-detected/) |
| **Invalid license key**, **Maximum activations reached** veya **License activation failed** | Yanlış anahtar, boş cihaz yuvası yok veya internet yok | [Lisans etkinleşmiyor](https://docs.uavmatrix.com/tr/troubleshooting/license-activation-failed/) |
| Modem sinyal ve operatör gösteriyor ama hiçbir şey yüklenmiyor | APN, ağ önceliği veya SIM verisi | [Modem bağlı, ancak internet yok](https://docs.uavmatrix.com/tr/troubleshooting/modem-no-internet/) |
| Kurulumdan sonra tarayıcı `http://<device-ip>/` adresine ulaşamıyor | Yanlış adres, servis çalışmıyor veya port değişti | [Web arayüzü açılmıyor](https://docs.uavmatrix.com/tr/troubleshooting/web-interface-wont-open/) |
| Yükleyici bir hatayla duruyor | 32 bit işletim sistemi, internet yok veya düşük disk alanı | [Kurulum başarısız oluyor](https://docs.uavmatrix.com/tr/troubleshooting/installation-fails/) |
| ZeroTier veya Tailscale bağlı diyor, ama drone'a ping atamıyor veya açamıyorsunuz | Üye yetkili değil, yanlış ağ veya GCS VPN üzerinde değil | [VPN bağlı, ama drone'a ulaşılamıyor](https://docs.uavmatrix.com/tr/troubleshooting/vpn-cant-reach-drone/) |
| NTRIP durumu **Düzeltmeler aktarılıyor** değil veya düzeltme hiç **RTK Sabit** olmuyor | Caster ayarları, GGA veya RTK yapamayan bir alıcı | [RTK düzeltmeleri gelmiyor](https://docs.uavmatrix.com/tr/troubleshooting/rtk-corrections-not-arriving/) |
| **Voltage too low - use a stronger power supply** veya **Slowed down (heat or power)** | Zayıf güç kaynağı veya kablo, aşırı ısınma | [Düşük gerilim ve kısıtlama](https://docs.uavmatrix.com/tr/troubleshooting/undervoltage-and-throttling/) |
| Drone, Fleet Manager'da **Offline** | Drone'un interneti yok, MQTT portu engelli veya yeniden eşleştirme gerekli | [Fleet Manager'da drone çevrimdışı](https://docs.uavmatrix.com/tr/troubleshooting/drone-offline-fleet-manager/) |
| **Invalid pairing code**, **This pairing code has expired** veya **License is not owned by any member of this organization** | Kod yanlış yazılmış veya çok eski ya da lisans organizasyon dışındaki birine ait | [Eşleştirme kodu geçersiz veya süresi dolmuş](https://docs.uavmatrix.com/tr/troubleshooting/pairing-code-invalid/) |

## Hâlâ çözemediniz mi?

1. [Günlük dosyalarını toplayın](https://docs.uavmatrix.com/tr/troubleshooting/collect-logs/). İndirme, ayarlarınızın ve donanımınızın bir `diagnostics.txt` anlık görüntüsünü içerir; böylece destek ekibinin bunları sormasına gerek kalmaz.
2. UAVcast-Pro sürümünüzü, kullandığınız donanımı ve denediklerinizi yazarak **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresine gönderin. [UAVmatrix Discord](https://discord.gg/xwqMTXh) üzerinden de soru sorabilirsiniz.

Kısa cevaplar için [SSS](https://docs.uavmatrix.com/tr/troubleshooting/faq/) sayfasına bakın.

Source: https://docs.uavmatrix.com/tr/troubleshooting/
