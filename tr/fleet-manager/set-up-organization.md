# Organizasyonunuzu kurun

> UAVmatrix hesabınızla Fleet Manager'da oturum açın, drone'larınızın ve ekibinizin ait olacağı organizasyonu oluşturun ve organizasyonu değiştirin, yeniden adlandırın veya silin.

Fleet Manager'daki her şey bir organizasyona aittir: drone'lar, görevler, VPN ağı, akış bağlamaları ve ekip üyeleri. İlk drone'unuzu eşleştirmeden önce bir organizasyon oluşturun.

## Oturum açın

Fleet Manager'ın ayrı bir parolası yoktur. Sizi UAVmatrix hesabınızla oturum açtırır; bu, UAVcast-Pro lisanslarını satın almak ve yönetmek için [uavmatrix.com](https://uavmatrix.com/) adresinde kullandığınız hesaptır.

1. [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) adresine gidin ve **Sign In** (veya **Get Started**) seçin.
2. Yönlendirildiğiniz UAVmatrix sayfasında oturum açın. Henüz hesabınız yoksa orada bir hesap oluşturun.
3. Fleet Manager **Dashboard** sayfasına geri dönersiniz.

> **Lisanslarınızın sahibi olan e-posta ile oturum açın**
>
> Fleet Manager, bir drone'u yalnızca UAVcast-Pro lisansı organizasyonun bir üyesine aitse kabul eder; eşleşme e-posta ile yapılır. Lisansları satın aldığınız hesapla oturum açmak, daha sonra destek talebi oluşturmanızı önler. Bkz. [Lisanslar](https://docs.uavmatrix.com/tr/fleet-manager/licenses/).

Profil bilgileri (ad, e-posta, parola) Fleet Manager'da değil, UAVmatrix hesabınızda yönetilir. **Settings → Profile** sizi oraya yönlendirir.

## Organizasyon oluşturun

1. Kenar çubuğunun üstündeki organizasyon değiştiriciyi açın ve **Create organization** seçin. Henüz bir organizasyonunuz yoksa **Fleet** ve **Network** gibi sayfalarda da **Create Organization** düğmesi bulunan **No Organization Yet** mesajı görünür.
2. **Organization Name** alanına 2 ila 50 karakter arasında bir ad girin; örneğin şirket adınız veya "Survey Operations North". İsterseniz **Description (optional)** alanına bir açıklama ekleyin.
3. **Create** seçin.

![Organization Name ve Description alanları bulunan Create Organization iletişim kutusu](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/onboarding--create-organization.webp)

*Nordic Aerial Survey AS gibi bir şirket adıyla doldurulmuş Create Organization iletişim kutusu.*

Organizasyonun **Owner** rolünü alırsınız. Fleet Manager ayrıca arka planda organizasyon için özel bir VPN ağı oluşturur. [VPN'i etkinleştirene](https://docs.uavmatrix.com/tr/fleet-manager/network/) kadar kapalı kalır.

> **Her sahip için bir organizasyon**
>
> Her kullanıcı (sahip olarak) yalnızca bir organizasyon oluşturabilir. İkincisini oluşturmaya çalışırsanız Fleet Manager **You already own an organization** yanıtını verir. Bunun yerine, örneğin bir müşterinin veya iş ortağının organizasyonları gibi, başka pek çok organizasyonda Admin veya Viewer olarak yer alabilirsiniz.

## Organizasyonlar arasında geçiş yapın

Birden fazla organizasyonun üyesiyseniz, kenar çubuğunun üstündeki değiştirici bunları **Organizations** altında listeler. Seçtiğiniz organizasyon, **Fleet**, **Fleet Map**, **Missions**, **Network** ve Dashboard'da neyin gösterileceğini belirler. Fleet Manager, seçiminizi bu tarayıcıda hatırlar.

![İki organizasyonu listeleyen, açık kenar çubuğu organizasyon değiştiricisi](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/dashboard--organization-switcher.webp)

*Nordwind Aerial Services ve Nordwind R&D Sandbox organizasyonlarını listeleyen açık organizasyon değiştirici.*

## Organizasyonu yeniden adlandırın veya silin

**Settings → Organizations** sayfasına gidin. Sekmede, Owner veya Admin olduğunuz organizasyonlar listelenir.

- **Yeniden adlandırma veya açıklamayı değiştirme:** Owner veya Admin. **Name** veya **Description** alanını düzenleyin ve **Save Changes** seçin.
- **Silme:** yalnızca Owner. **Delete Organization** seçin ve onaylayın. Bu işlem tüm drone'ları, telemetri geçmişini, görevleri, akış bağlamalarını ve ekip üyeliklerini kaldırır; geri alınamaz.

![Ad, açıklama ve Delete Organization düğmesi bulunan Settings Organizations sekmesi](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/settings--organizations.webp)

*Owner için Settings → Organizations; Save Changes ve Delete Organization düğmeleriyle.*

> **Organizasyonu silmeden önce drone'ların eşleştirmesini kaldırın**
>
> Organizasyonu silmek drone'lara bilgi vermez. Her birinde UAVcast-Pro'da **Disconnect from Fleet** seçilene kadar drone'lar yeniden bağlanmaya çalışmaya devam eder. Fleet Manager'ın eşleştirmelerini sizin yerinize kaldırabilmesi için önce drone'ları UAV sayfalarından kaldırın (bkz. [Drone'u kaldırın veya devredin](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remove-or-transfer/)).

Organizasyonu bunun yerine başka birine devretmek için [sahipliği devredin](https://docs.uavmatrix.com/tr/fleet-manager/team/#transfer-ownership).

## Sonraki adımlar

- [İlk drone'unuzu ekleyin](https://docs.uavmatrix.com/tr/fleet-manager/pair-uav/)
- [Ekibinizi davet edin](https://docs.uavmatrix.com/tr/fleet-manager/team/)

Source: https://docs.uavmatrix.com/tr/fleet-manager/set-up-organization/
