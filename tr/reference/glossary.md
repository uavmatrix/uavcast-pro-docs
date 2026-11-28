# Sözlük

> UAVcast-Pro ve Fleet Manager dokümanlarındaki terimlerin sade açıklamaları: MAVLink, GCS, heartbeat, APN, HiLink, NTRIP, RTCM, VRS, ZeroTier, Tailscale.

### AGL / AMSL

Yer seviyesinden yükseklik (burada: kalkış noktasının üzerinden) ve deniz seviyesinden yükseklik. UAVcast-Pro bu terimleri v6.5.0 sürümünden beri kullanır; REL ve MSL'nin yerini alır.

### APN (Erişim Noktası Adı)

Hücresel bir modemin bağlandığı operatörün ağ geçidinin adı. **Erişim Noktası Adı (İsteğe bağlı)** alanı boş olduğunda UAVcast-Pro bunu otomatik olarak algılar.

### ArduPilot

Çok rotorlar, uçaklar, VTOL, kara robotları ve tekneler için açık kaynaklı otopilot yazılımı. UAVcast-Pro, ArduPilot ile ve PX4 gibi diğer MAVLink uçuş kontrolcüleriyle çalışır. Uçuş modu düğmeleri ArduPilot'un mod adlarını kullanır.

### Doğrulama anahtarı

Bir cihazı tarayıcı kullanmadan tailnet'e giriş yaptıran bir Tailscale anahtarı. Fleet Manager, yer kontrol istasyonlarını organizasyonun VPN'ine eklemek için doğrulama anahtarlarını kullanır.

### Bit hızı

Video kodlayıcının saniyede ürettiği bit sayısı. Bağlantınızın yukarı yönlü hızına, pay bırakarak sığması gerekir.

### CSI kamera

Raspberry Pi'nin şerit kablo konektörüne takılan kamera; örneğin Camera Module 3.

### Hedef

UAVcast-Pro'da **Yer Kontrol İstasyonları** altındaki bir yer kontrol istasyonu kaydı: bir IP adresi, bir telemetri portu ve bir video portu.

### Çift akış

İki kamerayı aynı anda, iki video portu üzerinden yer kontrol istasyonuna yayınlamak.

### Fleet Manager

UAVmatrix'in, aynı organizasyondaki çok sayıda UAVcast-Pro drone'unu izlemek ve kontrol etmek için kullandığı web kontrol paneli.

### GCS (yer kontrol istasyonu)

Drone'u izlemek ve komut vermek için kullandığınız yazılım ve bu yazılımın çalıştığı bilgisayar: QGroundControl, Mission Planner, MAVProxy.

### GCS failsafe

Drone yer kontrol istasyonunu duymayı bıraktığında kendi başına hareket etmesini (dönüş, iniş, loiter) sağlayan bir uçuş kontrolcüsü ayarı.

### GGA

Konumunuzu içeren bir NMEA cümlesi. VRS ve en yakın mountpoint'e sahip NTRIP caster'ları, konumunuz için düzeltmeleri hesaplamak amacıyla bunu kullanır.

### H.264

UAVcast-Pro'nun gönderdiği video sıkıştırma formatı. Yaygın tüm yer kontrol istasyonları bunu çözebilir.

### Kalp atışı (heartbeat)

Uçuş kontrolcüsünün yaklaşık saniyede bir gönderdiği ve "buradayım" bilgisini veren MAVLink mesajı. *Heartbeat yok* ifadesi, bağlantının okunabilir bir MAVLink taşımadığı anlamına gelir.

### HiLink modem

Yerleşik bir yönlendiriciye sahip USB modem. Kendiliğinden bağlanır ve Linux'a bir ağ adaptörü olarak görünür.

### Enjektör

Kendi sensör değerlerinizi MAVLink `NAMED_VALUE_FLOAT` mesajlarına dönüştüren bir UAVcast-Pro dinleyicisi (HTTP, UDP veya seri).

### Anahtar kare

Kod çözücünün başlayabileceği eksiksiz bir video karesi. Daha sık anahtar kare, paket kaybından daha hızlı toparlanma sağlar. **Akış Kurtarma Hızı** ile ayarlanır.

### MAVLink

Uçuş kontrolcüleri ile yer kontrol istasyonları arasındaki mesajlaşma protokolü.

### Mountpoint

Bir NTRIP caster'ında, genellikle tek bir baz istasyonuna veya bir VRS servisine bağlı, adlandırılmış bir düzeltme akışı.

### MQTT

Drone'ların Fleet Manager ile iletişim kurmak için kullandığı mesajlaşma protokolü. 8883 portunda TLS ile şifrelenir.

### NTRIP / NTRIP caster

GNSS düzeltmelerini internet üzerinden aktarmak için kullanılan bir protokol ve bu hizmeti sağlayan sunucu.

### Eşleştirme kodu

Bir drone'u Fleet Manager'a bağladığınızda UAVcast-Pro'nun gösterdiği 8 haneli kod. 5 dakika geçerlidir ve yalnızca bir kez kullanılabilir.

### Read Only (hedef)

Telemetri alan ancak araç üzerinde hiçbir şeyi değiştiremeyen bir yer kontrol istasyonu hedefi. Bu hedeften gelen komutlar, mod değişiklikleri, parametre ve görev yazmaları engellenir. Bu, UAVcast-Pro 6.5.3'ten itibaren geçerlidir; önceki sürümlerde Read Only parametre yazmalarını engellemez.

### Read Only (kullanıcı)

Sayfaları görüntüleyebilen ancak ayarları değiştiremeyen veya drone'u kontrol edemeyen bir UAVcast-Pro kullanıcı rolü.

### RTCM3

GNSS düzeltmeleri için standart mesaj formatı.

### RTK, RTK Float, RTK Fixed

Düzeltmelerle gerçek zamanlı kinematik konumlandırma. Float yaklaşık bir çözümdür; Fixed ise santimetre düzeyinde çözümdür.

### RTP / UDP

UAVcast-Pro'nun video ve telemetri için kullandığı taşıma katmanı. Hızlıdır ve yeniden iletim yapmadığı için gecikmeyi düşük tutar.

### SERIALx_PROTOCOL / SERIALx_BAUD

Bir seri portun hangi protokolü kullanacağını (2 = MAVLink2) ve hızını belirleyen ArduPilot parametreleri.

### Akış bağlama (stream binding)

Fleet Manager'da, bir drone'un video ve telemetrisini kendi portları üzerinden tek bir yer kontrol istasyonuna gönderen bağlantı.

### sysid / compid

MAVLink sistem kimliği (hangi araç) ve bileşen kimliği (aracın hangi parçası). Uçuş kontrolcüsü genellikle sysid 1, compid 1'dir.

### Tailnet

Özel bir Tailscale ağı.

### Tailscale

WireGuard tabanlı bir VPN. UAVcast-Pro, kendi tailnet'inize veya Fleet Manager organizasyon ağına katılabilir.

### UAVnet

UAVmatrix'in uavnet.uavmatrix.com adresinde barındırdığı ZeroTier ağ denetleyicisi. Fleet Manager VPN'i lehine kullanımdan kaldırılıyor; mevcut kullanıcılar Fleet Manager'a geçmelidir.

### VRS (sanal referans istasyonu)

Bir baz istasyonları ağından konumunuz için düzeltmeleri hesaplayan bir düzeltme servisi. GGA upstream gerektirir.

### ZeroTier

Eşler arası bir VPN. UAVcast-Pro, kendi ZeroTier ağınıza katılabilir.

Source: https://docs.uavmatrix.com/tr/reference/glossary/
