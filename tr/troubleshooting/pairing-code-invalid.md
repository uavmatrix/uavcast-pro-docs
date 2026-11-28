# Eşleştirme kodu geçersiz veya süresi dolmuş

> Bir UAV'yi Fleet Manager ile eşleştirirken Invalid pairing code, This pairing code has expired ve License is not owned by any member of this organization hatalarını giderin.

UAVcast-Pro'daki kodu Fleet Manager'ın **Pair Device** sihirbazına girdiniz ve kod reddedildi.

Eşleştirme şu yönde çalışır: **UAVcast-Pro kodu gösterir, siz kodu Fleet Manager'a yazarsınız.** Kod 8 haneli olup 5 dakika geçerlidir.

![Fleet Manager Pair UAV sihirbazı, This pairing code has expired hata bildirimiyle](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/pair-device--code-expired.webp)

*Fleet Manager kodu reddediyor: hata, Pairing Code adımında bir bildirim olarak görünür; burada This pairing code has expired.*

| Fleet Manager'daki hata | Neden | Çözüm |
| --- | --- | --- |
| **Pairing code must be 8 digits** / **Please enter a valid 8-digit code** | Çok az hane var veya harf girilmiş | [Kontrol 1](https://docs.uavmatrix.com/tr/troubleshooting/pairing-code-invalid/#check-1) |
| **Invalid pairing code** | Yazım hatası veya hiç var olmamış bir kod | [Kontrol 1](https://docs.uavmatrix.com/tr/troubleshooting/pairing-code-invalid/#check-1) |
| **This pairing code has expired** | 5 dakikadan fazla zaman geçti | [Kontrol 2](https://docs.uavmatrix.com/tr/troubleshooting/pairing-code-invalid/#check-2) |
| **This pairing code has already been used** | Kod bir kez kullanılmış | [Kontrol 2](https://docs.uavmatrix.com/tr/troubleshooting/pairing-code-invalid/#check-2) |
| **License is not owned by any member of this organization** | Drone'un lisansı organizasyon dışındaki bir hesaba ait | [Kontrol 3](https://docs.uavmatrix.com/tr/troubleshooting/pairing-code-invalid/#check-3) |
| **Invalid license key** / **License has expired** / **License has been refunded** | Drone'un lisansı mağazada geçerli değil | [Kontrol 4](https://docs.uavmatrix.com/tr/troubleshooting/pairing-code-invalid/#check-4) |
| **This UAV is already paired to an organization** | UAV başka bir organizasyonla eşleştirilmiş | [Kontrol 5](https://docs.uavmatrix.com/tr/troubleshooting/pairing-code-invalid/#check-5) |
| **Too many attempts. Please wait a minute and try again.** | Tekrarlanan denemelerden sonra hız sınırı | Bir dakika bekleyin |

## Kontrol 1: Güncel kodu yazın

1. UAVcast-Pro'da **Fleet Management** bölümüne gidin ve **Connect to Fleet Manager** düğmesine basın.
2. **Pairing Code** altında gösterilen 8 haneyi kopyalayın.
3. Fleet Manager'da **Fleet → Pair Device** bölümüne gidin, organizasyonu seçin ve kodu **Enter Pairing Code** alanına girin.

## Kontrol 2: Yeni bir kod alın

Kod 5 dakika geçerlidir ve yalnızca bir kez çalışır. **Expires in** değeri sıfıra ulaştığında, yeni bir kod için UAVcast-Pro'da **Connect to Fleet Manager** düğmesine tekrar basın. UAVcast-Pro hiç kod alamazsa *Unable to connect to Fleet Manager. Please check your internet connection.* mesajını gösterir: önce drone'un internet bağlantısını düzeltin.

## Kontrol 3: Lisans organizasyon dışındaki biri tarafından sahiplenilmiş

Fleet Manager yalnızca, eşleştirdiğiniz organizasyonun bir üyesi tarafından UAVcast-Pro lisansı satın alınmış bir drone'u kabul eder. Eşleşme, lisansın sahibi olan mağaza hesabının e-posta adresi üzerinden yapılır.

Şu yollardan birini uygulayın:

- Lisansı satın alan hesabı organizasyona (**Team**) davet edin, ardından yeniden eşleştirin.
- Lisans sahibinin bir üye olduğu bir organizasyonla eşleştirin.
- Lisans başka bir e-posta adresinizle satın alındıysa, **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresinden o adresi Fleet Manager kullanıcınıza lisans e-postası olarak eklemesini isteyin.

Bkz. [Fleet Manager'da lisanslar](https://docs.uavmatrix.com/tr/fleet-manager/licenses/).

## Kontrol 4: Lisans geçerli değil

Drone'da **Uygulama → Lisans Yöneticisi** bölümünü açın ve **License Status** değerini kontrol edin. Süresi dolmuş veya iade edilmiş bir lisans [uavmatrix.com](https://uavmatrix.com/) üzerinden yenilenmelidir. UAVcast-Pro'nun kendisinde etkin bir lisans yoksa kod isteyemez (*No valid license found. Please activate your license first.*): bkz. [Lisans etkinleştirilemiyor](https://docs.uavmatrix.com/tr/troubleshooting/license-activation-failed/).

## Kontrol 5: Başka yerde zaten eşleştirilmiş

Bir UAV tek bir organizasyona aittir. Taşımak için önce onu eski organizasyondan kaldırın. Aynı organizasyona yeniden eşleştirmeye izin verilir ve UAV'nin geçmişini korur. Bkz. [UAV'yi kaldırma veya aktarma](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remove-or-transfer/).

## Hâlâ reddediliyor mu?

Tam hata metnini, UAV'nin sunucu adını ve organizasyon adını **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresine gönderin.

İlgili: [UAVcast-Pro'da Fleet Manager eşleştirmesi](https://docs.uavmatrix.com/tr/uavcast-pro/fleet-pairing/) · [İlk UAV'nizi eşleştirin](https://docs.uavmatrix.com/tr/fleet-manager/pair-uav/)

Source: https://docs.uavmatrix.com/tr/troubleshooting/pairing-code-invalid/
