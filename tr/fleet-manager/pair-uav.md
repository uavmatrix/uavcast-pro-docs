# İlk drone'unuzu ekleyin

> UAVcast-Pro drone'unu 8 haneli eşleştirme kodu ile Fleet Manager organizasyonunuza eşleştirin, VPN erişimini seçin ve drone'u filo haritasında canlı olarak görün.

Eşleştirme, UAVcast-Pro çalıştıran bir drone'u organizasyonunuza bağlar. Eşleştirmeden sonra drone, sertifikayla doğrulanmış bir bağlantıyı Fleet Manager ile açık tutar ve yeniden başlatmadan veya ağ değişikliğinden sonra kendiliğinden yeniden bağlanır. Her drone'u bir kez eşleştirirsiniz; işlem yaklaşık iki dakika sürer.

İki tarayıcı sekmesiyle çalışırsınız: drone'un UAVcast-Pro web arayüzü ve Fleet Manager. İkisini de açık tutun.

## Başlamadan önce

- **Etkinleştirilmiş bir lisansla kurulu UAVcast-Pro.** UAVcast-Pro, lisans olmadan eşleştirmeyi başlatmaz ve **No valid license found. Please activate your license first.** uyarısını gösterir. Bkz. [Lisansınızı etkinleştirin](https://docs.uavmatrix.com/tr/get-started/license-activation/).
- **Lisansın sahibi organizasyonunuzun bir üyesi olmalıdır.** Fleet Manager, UAVmatrix mağazasındaki lisans sahibinin e-postasını üyelerinizin e-postalarıyla karşılaştırır. Bkz. [Lisanslar](https://docs.uavmatrix.com/tr/fleet-manager/licenses/).
- **Organizasyonda Owner veya Admin rolü.** Viewer rolündeki kullanıcılar **Pair Device** düğmesini görmez. Bkz. [Roller ve izinler](https://docs.uavmatrix.com/tr/fleet-manager/team/roles-and-permissions/).
- **Drone'da internet bağlantısı**; Ethernet, Wi-Fi veya hücresel modem üzerinden, giden HTTPS (TCP 443) ve TCP **8883** açık olmalıdır. 8883 portu, Fleet Manager ile şifreli MQTT bağlantısını taşır.
- **Güncel bir UAVcast-Pro 6 sürümü.** Eşleştirme, UAVcast-Pro'da **Yönetim → Fleet Management** menüsünden başlar. Fleet Manager'dan arm et, disarm et ve Uçuş Öncesi Kalibrasyon için UAVcast-Pro 6.3.0_rc13 veya daha yeni bir sürüm gerekir; Fleet Manager eski drone'larda bunu bir sürüm rozetiyle işaretler.

## Drone'u eşleştirin

1. **UAVcast-Pro'da eşleştirme kodu alın.** Drone'un web arayüzünü açın. Kenar çubuğunda **Yönetim** altından **Fleet Management** seçin, ardından **Connect to Fleet Manager** seçin. UAVcast-Pro, 8 haneli bir **Pairing Code**, bir **Expires in** geri sayımı ve **Waiting for Manager to confirm pairing...** mesajını gösterir.

   ![Connect to Fleet Manager düğmesi bulunan UAVcast-Pro kartı](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/fleet--connect.webp)

   *Eşleştirmeden önce UAVcast-Pro → Fleet Management. Connect to Fleet Manager seçildiğinde 8 haneli kod, Expires in geri sayımı ve Waiting for Manager to confirm pairing... mesajı görünür.*

   > **Kod 5 dakika geçerlidir**
   >
   > Kodu girmeden geri sayım biterse **Connect to Fleet Manager** düğmesini yeniden seçin. Her zaman ekranda görünen kodu yazın; UAVcast-Pro yalnızca en yeni kodu bekler.

2. **Fleet Manager'da Pair Device'ı açın.** **Fleet** sayfasına gidin ve **Pair Device** seçin. **Pair UAV** sihirbazı açılır.

3. **Organizasyonu seçin.** **Organization** adımında bu drone'un ait olması gereken organizasyonu seçin ve **Continue** seçin. Listede yalnızca Owner veya Admin olduğunuz organizasyonlar görünür. Yalnızca bir organizasyonunuz varsa Fleet Manager onu otomatik seçer ve bu adımı atlar.

4. **Kodu girin.** **Pairing Code** adımında 8 rakamı yazın ve **Continue** seçin. Fleet Manager kodu doğrular ve **Confirm Device** adımına geçer.

   ![8 haneli kodun girildiği Pairing Code adımındaki Pair UAV sihirbazı](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/pair-device--code.webp)

   *Fleet → Pair Device, Pairing Code adımı; ilerleme çubuğunda Organization tamamlandı olarak görünür.*

5. **Drone'u onaylayın.** UAVcast-Pro'nun gönderdiği bilgileri kontrol edin: **Name**, **Hostname**, **OS**, **Architecture** ve **UAVcast Version**. Bilgilerin önünüzdeki drone ile eşleştiğinden emin olun, ardından **Complete Pairing** seçin. Organizasyonunuzda VPN etkinse düğme **Continue** yazar ve sonraki adım VPN olur.

   ![Ad, ana bilgisayar adı, işletim sistemi, mimari ve UAVcast sürümünü listeleyen Confirm Device adımı](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/pair-device--confirm.webp)

   *Confirm Device adımı: ad, ana bilgisayar adı, işletim sistemi, mimari ve UAVcast Version bilgilerinin önünüzdeki drone ile eşleştiğini kontrol edin.*

6. **VPN erişimini seçin (yalnızca VPN etkinse).** **VPN Connection** adımı, organizasyonunuzda [VPN etkinleştirildiğinde](https://docs.uavmatrix.com/tr/fleet-manager/network/) görünür. VPN açıkken organizasyonunuzun ağındaki yer kontrol istasyonları, port yönlendirmesi olmadan bu drone'un video ve telemetrisini 4G, Wi-Fi veya uydu üzerinden doğrudan alır.

   - **Enable VPN for this UAV** varsayılan olarak işaretlidir. UAVcast-Pro, eşleştirmeden hemen sonra organizasyonunuzun VPN'ine katılır.
   - Drone zaten bir Tailscale ağındaysa Fleet Manager, o ağın sunucusu ve IP adresiyle birlikte **Existing VPN Connection Detected** uyarısını gösterir. Kutu **Replace existing VPN with Fleet Manager network** olarak değişir ve işaretsiz gelir. Drone'un mevcut ağından ayrılmasını istiyorsanız yalnızca bu kutuyu işaretleyin.

   **Complete Pairing** seçin.

   ![Enable VPN for this UAV kutusunun işaretli olduğu VPN Connection adımı](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/pair-device--vpn.webp)

   *VPN Connection adımı; üç avantaj listelenmiş ve Enable VPN for this UAV işaretlenmiş.*

   > **Mevcut VPN'i değiştirmek SSH oturumunu kesebilir**
   >
   > Mevcut bir Tailscale bağlantısını değiştirirseniz ve drone'a olan SSH veya tarayıcı oturumunuz bu bağlantı üzerinden çalışıyorsa oturum kesilir. Devam etmeden önce drone'a yerel ağ üzerinden bağlanın ya da sonrasında yeni VPN adresini kullanın.

7. **Drone'a ad verin.** **Pairing Complete!** mesajı ve bir **UAV Name** alanı görünür. Haritada ekibinizin tanıyacağı bir ad yazın; örneğin hava aracının kuyruk numarası veya "Survey-14" gibi, ardından **Save** seçin. Ad, drone çevrimiçi olduğunda UAVcast-Pro'ya eşitlenir. Sayfasını açmak için **View UAV** seçin.

   ![UAV Name alanı ve View UAV düğmesi bulunan Pairing Complete ekranı](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/pair-device--complete.webp)

   *UAV Name alanında kuyruk numarasının düzenlendiği Pairing Complete! ekranı.*

Bu sırada her 5 saniyede bir kontrol eden UAVcast-Pro, drone'un sertifikasını ve bağlantı ayarlarını alır (VPN seçtiyseniz VPN anahtarını da). Fleet Management sayfası **Connected** durumuna geçer.

## Bağlantıyı kontrol edin

Drone, birkaç saniye içinde **Fleet** ve **Fleet Map** üzerinde görünür. Rozeti şu durumları gösterir:

| Rozet | Anlamı |
| --- | --- |
| **PAIRING** | Fleet Manager sertifikayı vermiştir ve drone'un ilk heartbeat sinyalini bekliyor. |
| **ONLINE** | Drone bağlıdır. UAVcast-Pro her 5 saniyede bir heartbeat gönderir. |
| **OFFLINE** | 20 saniyedir veri alınamıyor. Kart, drone'un en son ne zaman görüldüğünü gösterir. |

Rozet **PAIRING** durumunda kalırsa veya **OFFLINE** olursa, drone'dan 8883 portu üzerinden Fleet Manager'a ulaşabildiğini kontrol edin:

```bash
nc -vz fleet-manager.uavmatrix.com 8883
```

`succeeded!` ile biten bir satır portun açık olduğunu gösterir. Başka her çıktı, portu engelleyen bir güvenlik duvarına veya operatöre işaret eder. Bkz. [Fleet Manager'da drone çevrimdışı](https://docs.uavmatrix.com/tr/troubleshooting/drone-offline-fleet-manager/).

## Video ve telemetriyi yer kontrol istasyonuna gönderin

Eşleştirme herhangi bir akış başlatmaz. QGroundControl veya Mission Planner ile uçmak için [yer kontrol istasyonunu](https://docs.uavmatrix.com/tr/fleet-manager/connect-gcs/) VPN'e bağlayın ve bir [akış bağlama](https://docs.uavmatrix.com/tr/fleet-manager/network/stream-bindings/) ekleyin. Fleet Manager her bağlamaya kendi port bloğunu verir (video, kamera 2 ve ses için alan ve telemetri); böylece birden fazla drone aynı yer kontrol istasyonuna aynı anda akış gönderebilir. İlk drone varsayılan portları kullanır: 5600 ve 14550. Diğer portları bağlamanın **Ports** sütunundan okuyun.

## Eşleştirme başarısız olursa

| Mesaj | Neden ve çözüm |
| --- | --- |
| **Invalid pairing code** | Böyle bir kod yok. Rakamları kontrol edin veya UAVcast-Pro'da yeni bir kod alın. |
| **This pairing code has expired** | 5 dakikadan fazla zaman geçti. UAVcast-Pro'da yeniden **Connect to Fleet Manager** seçin. |
| **This pairing code has already been used** | Kod daha önce, sizin veya bir iş arkadaşınız tarafından kullanıldı. Yeniden eşleştirmeden önce drone'u **Fleet** sayfasında kontrol edin. |
| **License is not owned by any member of this organization** | Drone'daki lisans, üye olmayan bir e-posta adresine ait. Bu kişiyi davet edin veya destekten e-postayı hesabınıza eklemesini isteyin. Bkz. [Lisanslar](https://docs.uavmatrix.com/tr/fleet-manager/licenses/#licenses-bought-with-another-email). |
| **License has expired** / **License has been refunded** | Drone'daki lisans artık etkin değil. Lisansı yenileyin veya UAVcast-Pro'da başka bir lisans etkinleştirin. |
| **This UAV is already paired to an organization** | Drone başka bir organizasyona ait. Önce oradan kaldırılmalıdır. Bkz. [Drone'u kaldırın veya devredin](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remove-or-transfer/). |
| **Too many attempts. Please wait a minute and try again.** | Bir dakikada 10'dan fazla kod kontrolü veya 5'ten fazla eşleştirme denemesi yapıldı. Bir dakika bekleyin. |

Daha fazla neden ve kontrol için: [Eşleştirme kodu geçersiz veya süresi dolmuş](https://docs.uavmatrix.com/tr/troubleshooting/pairing-code-invalid/).

## Aynı drone'u yeniden eşleştirme

Drone'u **aynı** organizasyona yeniden eşleştirmek, adını, telemetri geçmişini ve akış bağlamalarını korur; yalnızca sertifikasını yeniler. Bunu, UAVcast-Pro'da Disconnect from Fleet seçtikten sonra veya Fleet Manager **Re-pair required** gösterdiğinde yapmanız gerekir. Bkz. [Drone'u yeniden eşleştirin](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone).

Source: https://docs.uavmatrix.com/tr/fleet-manager/pair-uav/
