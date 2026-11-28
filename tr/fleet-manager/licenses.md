# Lisanslar ve koltuklar

> UAVcast-Pro lisanslarının ve cihaz yuvalarının Fleet Manager'da hangi drone'ları eşleştirebileceğinizi nasıl belirlediğini ve başka bir e-posta ile satın alınmış lisansların nasıl kullanılacağını öğrenin.

Fleet Manager, UAVcast-Pro lisansınıza dahildir. Kendi aboneliği, koltuğu veya planı yoktur. Eşleştirebileceğiniz drone sayısı, [UAVmatrix mağazasından](https://uavmatrix.com/) aldığınız UAVcast-Pro lisanslarıyla belirlenir:

- **Drone'lar:** eşleştirilen her drone, etkinleştirilmiş bir UAVcast-Pro lisansıyla çalışır. Her etkinleştirme, lisansın mağazadaki **Device Slots** değerlerinden birini kullanır ("2 of 5 device slots used"). Daha fazla drone mu gerekiyor? Daha fazla lisans veya yuva satın alın. **Fleet → Need more devices? → View Plans** seçeneği sizi mağazaya götürür.
- **Ekip üyeleri:** ücretsiz. Fleet Manager davet edebileceğiniz kişi sayısını sınırlamaz ve üyelerin kendi lisansına ihtiyacı yoktur.

> Fleet Manager, UAVcast-Pro lisansına dahildir. Eşleştirdiğiniz her drone için bir lisans gerekir.
>
> [UAVcast-Pro satın al](https://uavmatrix.com/tr/checkout) · [Planları ve fiyatları gör](https://uavmatrix.com/tr/products)

## Fleet Manager eşleştirme sırasında neyi kontrol eder

Bir eşleştirme kodu girdiğinizde Fleet Manager, o drone'da etkinleştirilmiş lisansı bulur ve şunları kontrol eder:

1. lisans mevcut ve etkin olmalı, süresi dolmamış ve iade edilmemiş olmalıdır ve
2. **lisans sahibinin e-postası** (lisansı satın alan mağaza hesabı), eşleştirme yaptığınız organizasyonun herhangi bir rolündeki **bir üyesine** ait olmalıdır.

İkisi de doğruysa drone eşleştirilir. Drone yeniden eşleştirildiğinde Fleet Manager bu kontrolleri tekrar yapar.

| Eşleştirme sihirbazındaki mesaj | Anlamı |
| --- | --- |
| **License is not owned by any member of this organization** | Lisans, e-postası burada üye olmayan bir mağaza hesabına ait. |
| **License has expired** | Lisansın bitiş tarihi geçti. |
| **License has been refunded** | Lisans iade edildi. |
| **Invalid license key** | Mağaza, drone'daki lisansı tanımıyor. UAVcast-Pro içindeki etkinleştirmeyi kontrol edin. |

Lisans, UAVcast-Pro eşleştirme kodu istediğinde de önceden kontrol edilir. UAVcast-Pro kod yerine **Invalid or inactive license** gösterirse lisansın süresi dolmuş, iade edilmiş veya bir mağaza hesabına bağlı değildir.

Drone üzerindeki etkinleştirme sorunları için bkz. [Lisansınızı etkinleştirin](https://docs.uavmatrix.com/tr/get-started/license-activation/) ve [Lisans etkinleşmiyor](https://docs.uavmatrix.com/tr/troubleshooting/license-activation-failed/).

## Lisanslara kimin sahip olmalı

Fleet Manager e-posta ile eşleştirme yaptığı için kimin satın alacağını planlayın:

- **En basit yol:** organizasyonun Owner'ı, Fleet Manager'a giriş yaptığı e-postayla tüm lisansları satın alır.
- **Birden fazla alıcı:** Viewer'lar dahil herhangi bir üyenin lisansları sayılır. Satın alma işini yapan bir meslektaş Viewer olabilir.
- **Müşterinin sahip olduğu drone'lar:** Lisansları bir müşteri satın aldıysa, müşterinin mağaza e-postasını organizasyonunuza davet edin (Viewer yeterlidir).

## Başka bir e-postayla satın alınmış lisanslar

Yaygın bir durum: lisanslar `purchasing@company.com` ile satın alındı, ancak pilot Fleet Manager'a `anna@company.com` olarak giriş yapıyor. Eşleştirme, **License is not owned by any member of this organization** hatasıyla başarısız olur.

Bunu düzeltmenin iki yolu vardır:

1. **Satın alma e-postasını organizasyona davet edin.** Bu hesap, daveti kabul etmek için bir kez giriş yapmalıdır.
2. **UAVmatrix destek ekibinden hesabınıza bir lisans e-postası eklemesini isteyin.** Destek ekibi bir Fleet Manager kullanıcısına bir veya daha fazla ek e-posta ekleyebilir. Bu e-postalardan herhangi birine ait lisanslar, kullanıcının üye olduğu her organizasyonda eşleştirme yapılırken o kullanıcıya aitmiş gibi sayılır.

Bunu talep etmek için destek baloncuğundan (kategori **General Inquiry**) bir talep açın veya oturum açtığınız adresten [support@uavmatrix.com](mailto:support@uavmatrix.com) adresine e-posta gönderin; lisansların satın alındığı diğer e-posta adreslerini belirtin. Bkz. [Destek](https://docs.uavmatrix.com/tr/fleet-manager/support/).

Bilmeniz faydalı olanlar:

- E-postalar büyük/küçük harf duyarsız eşleştirilir.
- Her ek e-posta yalnızca bir Fleet Manager kullanıcısına ait olabilir.
- Bu e-postaları yalnızca UAVmatrix destek ekibi ekleyebilir veya kaldırabilir. Kendi ayarlarınızda görünmezler.
- Lisanslar özgün mağaza hesabında kalır. Bu değişiklik yalnızca eşleştirme yaparken Fleet Manager'ın sahip olarak kimi sayacağını değiştirir.

## Lisansları drone'lar arasında taşıma

Lisans, Fleet Manager'da değil UAVcast-Pro'da cihaz bazında etkinleştirilir. Taşımak için UAVcast-Pro'da veya mağazada cihaz yuvasını boşaltın, lisansı yeni drone'da etkinleştirin ve ardından [yeni drone'u eşleştirin](https://docs.uavmatrix.com/tr/fleet-manager/pair-uav/). Bkz. [Eşlik eden bilgisayarı değiştirme](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remove-or-transfer/#replace-the-companion-computer).

Source: https://docs.uavmatrix.com/tr/fleet-manager/licenses/
