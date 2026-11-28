# UAVcast-Pro'yu uzaktan açın

> Fleet Manager üzerinden, yerleşik proxy ile VPN olmadan veya doğrudan kuruluşunuzun VPN'i üzerinden, bir drone'un UAVcast-Pro ayarlarına her yerden erişin.

Drone ile aynı ağda olmadan bir drone'un UAVcast-Pro ayarlarını (kamera, modem, yer kontrol istasyonları vb.) değiştirebilirsiniz. [UAV sayfasındaki](https://docs.uavmatrix.com/tr/fleet-manager/fleet/uav-details/) **UAVcast Application** kartında iki düğme vardır:

| Düğme | Bağlantı şekli | Kullanım amacı |
| --- | --- | --- |
| **Open via Proxy** | Fleet Manager'ın drone'a olan şifreli bağlantısı üzerinden. Çevrimiçi her drone için çalışır, VPN gerekmez. | Yapılandırma değişiklikleri ve temel yönetim. |
| **Open via VPN** | Doğrudan `http://<drone VPN adresi>` adresini açar. Yalnızca drone kuruluşunuzun VPN'indeyse gösterilir; bilgisayarınızın da bu VPN'de olması gerekir. | Canlı uçuş haritası ve telemetri dahil her şey. |

Proxy, Owner ve Admin kullanıcıları içindir. Fleet Manager, Viewer'lar için bunu reddeder: **Access denied. Only administrators can access UAVcast remotely.**

## Open via Proxy

1. UAV sayfasında **Open via Proxy** seçin.
2. **Remote UAVcast Access via Proxy** iletişim kutusunu okuyun ve **Continue** seçin.
3. UAVcast-Pro, yeni bir sekmede **Application** sayfasında açılır. Drone'un UAVcast-Pro kullanıcısıyla oturum açın: proxy, Fleet Manager girişinizi iletmez. (Henüz UAVcast-Pro kullanıcısı olmayan bir drone, giriş yapmadan açılır.)

![Kullanılamayan özellikleri listeleyen Remote UAVcast Access via Proxy iletişim kutusu](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/drone-detail--proxy-warning.webp)

*Remote UAVcast Access via Proxy iletişim kutusu; kullanılamayan WebSocket özellikleri: canlı telemetri, MAVLink bağlantı durumu ve uçuş haritası.*

Proxy, canlı bağlantıları değil, sıradan sayfa isteklerini taşır. **WebSocket features unavailable** ifadesi, aşağıdakilerin proxy üzerinden çalışmadığı anlamına gelir:

- canlı telemetri ve gerçek zamanlı güncellemeler
- MAVLink bağlantı durumu
- uçuş haritası

Her istek tamamlanması için 30 saniyeniz vardır. Yavaş bir bağlantıda büyük sayfalar **Request timed out. UAVcast may be unreachable.** ile zaman aşımına uğrayabilir. Drone çevrimdışıysa **Drone is offline. UAVcast interface is not available.** mesajını görürsünüz.

> **Proxy üzerinden ağ ayarlarına dikkat edin**
>
> Proxy, drone'un kendi internet bağlantısı üzerinden çalışır. Modem, ağ önceliği veya VPN ayarlarını değiştirir ve drone internet bağlantısını kaybederse proxy de onunla birlikte kopar; düzeltmek için yerel erişime ihtiyacınız olur.

## Open via VPN

Bilgisayarınızı, kuruluşun VPN'ine yer kontrol istasyonuyla aynı şekilde katın (bkz. [Yer kontrol istasyonunu bağlayın](https://docs.uavmatrix.com/tr/fleet-manager/connect-gcs/)). Ardından **Open via VPN** drone'un arayüzünü tüm canlı özelliklerle doğrudan açar. Bir ayarı değiştirmenin ötesindeki her iş için bu daha iyi bir seçimdir.

Source: https://docs.uavmatrix.com/tr/fleet-manager/fleet/remote-uavcast/
