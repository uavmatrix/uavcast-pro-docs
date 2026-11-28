# Ağlar

> Drone üzerindeki her ağ arayüzünü görün ve trafiği Wi-Fi'nin mi yoksa 4G/LTE modemin mi taşıyacağını seçin; böylece Wi-Fi menzili dışına çıktığınızda bağlantı hücresel ağda kalır.

Ağlar sayfası, drone üzerindeki her ağ arayüzünü (Ethernet, Wi-Fi, modem, VPN) ve hangisinin varsayılan rota olduğunu gösterir. Ayrıca her ikisi de bağlıyken Wi-Fi'nin mi yoksa hücresel modemin mi tercih edileceğini seçtiğiniz yerdir. Kenar çubuğunda **Ağlar** seçeneğini açın.

![Özet kartları, Ağ Önceliği Otomatik olarak ayarlı ve eth0 ile wlan0'ı listeleyen arayüz tablosu olan Ağlar sayfası](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/networks.webp)

*Otomatik (Sistem Varsayılanı) etkinken ve varsayılan rota Wi-Fi iken Ağlar.*

## Ağ önceliğini seçin

Wi-Fi ve modem ikisi de bağlıyken Linux, trafiği en düşük rota metriğine sahip olan üzerinden gönderir. **Ağ Önceliği**, bu metrikleri sizin için ayarlar:

| Seçenek | Ne zaman kullanılır | Etkisi |
| --- | --- | --- |
| **WiFi Önceliği (İç Mekan Modu)** | Tezgâhta veya evde, mobil veriden tasarruf etmek için. | Wi-Fi metriği 100, modem metriği 600. |
| **Modem Önceliği (Dış Mekan Modu)** | Hücresel bağlantı üzerinden her uçuştan önce. | Modem metriği 100, Wi-Fi metriği 600. |
| **Otomatik (Sistem Varsayılanı)** | UAVcast-Pro'nun hiçbir şeyi değiştirmesini istemiyorsanız. | NetworkManager'ın kendi metrikleri. |

> **Kalkıştan önce Modem Önceliğine geçin**
>
> Drone Wi-Fi önceliğiyle kalkarsa, bağlantı Wi-Fi kaybedilene kadar Wi-Fi üzerinde kalır ve havada modeme geçmek zorunda kalır. Bu da telemetri ve videoda boşluğa neden olur. Yerdeyken **Modem Önceliği (Dış Mekan Modu)** seçeneğini seçin.

Değişiklik, bağlantıları yeniden başlatmadan etkin bağlantılara uygulanır (*Değişiklikler uygulanıyor...*).

> **Hangi bağlantılar değiştirilir**
>
> Wi-Fi metriği, Raspberry Pi Imager'ın flaşlama sırasında girdiğiniz Wi-Fi'ye verdiği ad olan `preconfigured` NetworkManager bağlantısında ayarlanır. Başka bir yöntemle kurulan Wi-Fi kendi metriğini korur; Ethernet ise hiçbir zaman değiştirilmez.

## Arayüz bilgisi

Özet kartları **Aktif Arayüzler**, **Varsayılan Ağ Geçidi** (ve üzerinden geçtiği arayüz) ile **Toplam Arayüzler**'i gösterir. **Ağ Arayüzleri** her arayüzü **Ad**, **IP Adresi**, **Ağ Geçidi**, **Durum** (**Aktif**, **Pasif**, **VPN**), **Hız**, **Tip** ve hangisinin **Varsayılan** olduğu bilgileriyle listeler.

Yaygın arayüz adları:

| Ad | Nedir |
| --- | --- |
| `eth0`, `end0` | Kablolu Ethernet |
| `wlan0` | Wi-Fi |
| `ppp0`, `wwan0` | Geleneksel modem |
| `usb0`, `eth1` | HiLink modem |
| `zt…` | ZeroTier |
| `tailscale0` | Tailscale |

Source: https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/networks/
