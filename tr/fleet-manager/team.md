# Ekibinizi davet edin

> Pilotları, operatörleri ve müşterileri e-posta ile Fleet Manager organizasyonunuza davet edin, rolleri değiştirin, davetleri iptal edin ve sahipliği devredin.

Her kişi kendi UAVmatrix hesabıyla oturum açar ve organizasyonunuzda bir rol alır: **Admin** veya **Viewer** (tam olarak bir tane **Owner** vardır). Fleet Manager üye sayısını sınırlamaz ve üyeler lisans kullanmaz. Her rolün tam olarak neler yapabildiği için bkz. [Roller ve izinler](https://docs.uavmatrix.com/tr/fleet-manager/team/roles-and-permissions/).

Bunların tümü **Team** sayfasında yapılır (sayfa başlığı **Team Management**). Owner'lar ve Admin'ler üyeleri yönetebilir. Viewer'lar yalnızca üye listesini görür.

![Bir organizasyonun üyelerini, rollerini ve bekleyen davetlerini listeleyen Team Management sayfası](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/team.webp)

*13 üyeli bir operatör için Team Management: bir Owner, dört Admin ve sekiz Viewer.*

## Üye davet edin

1. **Team** sayfasında **Invite Member** seçin.
2. **Invite Team Member** penceresinde kişinin **Email Address** alanına e-postasını girin, (birden fazla organizasyon yönetiyorsanız) **Organization** seçin ve **Role** olarak **Admin** veya **Viewer** seçin.
3. **Send Invitation** seçin.

![E-posta, organizasyon ve rol alanları bulunan Invite Team Member iletişim kutusu](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/team--invite.webp)

*Bir müşteri iletişim kişisi için Role değeri Viewer olarak ayarlanmış Invite Team Member iletişim kutusu.*

Fleet Manager bir davet bağlantısını e-posta ile gönderir. Davet kabul edilene kadar **Pending Invitations** altında listelenir ve **7 gün** sonra sona erer. Zaten bekleyen bir daveti olan bir e-posta adresine ikinci bir davet gönderemezsiniz: önce eski daveti iptal edin.

> **Lisansları satın aldığı e-postayla davet edin**
>
> Bu kişi, eşleştirmek istediğiniz drone'lar için UAVcast-Pro lisanslarına sahipse, UAVmatrix mağazasında kullandığı aynı e-postayı davet edin. Fleet Manager lisans sahiplerini üyelerle e-posta ile eşleştirir. Bkz. [Lisanslar](https://docs.uavmatrix.com/tr/fleet-manager/licenses/).

## Daveti kabul edin

Davet edilen kişi e-postadaki bağlantıyı açar. Davet sayfasında organizasyon, **Invitation sent to** ve kısa bir açıklamasıyla birlikte **Your role** görünür.

- Zaten oturum açtıysanız: **Accept Invitation** seçin.
- Oturum açmadıysanız: **Sign in to accept this invitation** altında **Sign In** seçin. Yeni kullanıcılar **Create Account** seçer; bu, e-posta alanı doldurulmuş UAVmatrix kayıt sayfasını açar ve işlemi tamamladıktan sonra davete geri dönersiniz.

![Organizasyon adı, davet edilen e-posta, rol açıklaması ve Accept Invitation düğmesi bulunan davet sayfası](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/invite.webp)

*Davet edilen kişinin gördüğü davet sayfası: Your role Viewer, drone ve filo verilerine yalnızca görüntüleme erişimi ve Accept Invitation.*

Sayfada **Invitation Expired**, **Invitation Already Used** veya **Already a Member** yazıyorsa, bir Owner veya Admin'den yeni bir davet isteyin ya da yalnızca oturum açın.

## Üyenin rolünü değiştirin

Bir üyenin yanındaki menüyü açın ve **Change Role → Admin** veya **Viewer** seçin. Değişiklik hemen geçerli olur; görmek için sayfayı yeniden yüklemeleri gerekebilir. Admin'ler diğer Admin'lerin rolünü değiştirebilir. Owner'ın rolünü kimse değiştiremez: bunun yerine [sahipliği devredin](https://docs.uavmatrix.com/tr/fleet-manager/team/#transfer-ownership).

![Change Role, Transfer Ownership ve Remove Member içeren üye işlemleri menüsü](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/team--member-menu.webp)

*Owner tarafından açılmış üye menüsü; Change Role, Transfer Ownership ve Remove Member görünüyor.*

## Üyeyi kaldırın veya daveti iptal edin

- **Üyeyi kaldırın:** üyenin menüsünü açın ve **Remove Member** seçin. Erişimleri hemen kaldırılır. Owner kaldırılamaz.
- **Daveti iptal edin:** **Pending Invitations** altında **Revoke** seçin. Bağlantı çalışmayı durdurur.

> **Onay adımı yoktur**
>
> **Remove Member** ve **Transfer Ownership**, seçtiğiniz anda uygulanır. Tıklamadan önce adı kontrol edin.

Bir üyeyi kaldırmak drone'lara dokunmaz. Ancak bu kişi, daha sonra eşleştirmek istediğiniz drone'ların lisanslarına sahipse, kişi yeniden üye oluncaya kadar bu drone'ların eşleştirilmesi başarısız olur.

## Sahipliği devredin

Bunu yalnızca Owner yapabilir. Devralacak üyenin menüsünü açın ve **Transfer Ownership** seçin. Bu üye **Owner** olur, siz de **Admin** olursunuz.

Bunu, organizasyonu kuran kişi ayrıldığında veya UAVmatrix hesabınızı silmeden önce kullanın: Fleet Manager, hâlâ bir organizasyonun sahibi olan bir hesabı silmez.

## Müşteriler ve iş ortaklarıyla çalışmak

Bir kullanıcı, her birinde farklı bir rolle, istediği sayıda organizasyonun üyesi olabilir. Tipik kurulumlar şunlardır:

- **Hizmet sağlayıcı:** personeliniz organizasyonunuzda Admin'dir. Her müşteri, uçuşlarını haritada canlı takip edebilmesi için Viewer rolü alır.
- **Alt yüklenici:** bir iş ortağı, pilotunuzu kendi organizasyonunda Admin olarak davet eder. Pilotunuz, organizasyon değiştirici ile ikisi arasında geçiş yapar.

Source: https://docs.uavmatrix.com/tr/fleet-manager/team/
