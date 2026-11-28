# Fleet Manager sorun giderme

> Yaygın Fleet Manager sorunlarını çözün: eşleştirme hataları, PAIRING veya çevrimdışı durumda takılı kalan drone'lar, Re-pair required, eksik akışlar ve başarısız komutlar.

Gördüklerinizden başlayın. Her satır, ya aşağıdaki ya da ortak [sorun giderme](https://docs.uavmatrix.com/tr/troubleshooting/) sayfalarındaki çözüme bağlanır.

| Gördükleriniz | Olası neden | Gidilecek yer |
| --- | --- | --- |
| **Invalid pairing code**, **This pairing code has expired**, **This pairing code has already been used** | Yazım hatası, 5 dakikadan eski kod veya kodun zaten kullanılmış olması | [Eşleştirme kodu geçersiz veya süresi dolmuş](https://docs.uavmatrix.com/tr/troubleshooting/pairing-code-invalid/) |
| **License is not owned by any member of this organization** | Üye olmayan bir e-posta ile satın alınmış lisans | [Başka e-postayla satın alınan lisanslar](https://docs.uavmatrix.com/tr/fleet-manager/licenses/#licenses-bought-with-another-email) |
| **This UAV is already paired to an organization** | Drone hâlâ başka bir organizasyona ait | [Drone'u taşıma](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remove-or-transfer/#move-a-drone-to-another-organization) |
| UAVcast-Pro, **No valid license found** veya **Invalid or inactive license** gösteriyor | Lisans drone'da etkinleştirilmemiş, süresi dolmuş veya iade edilmiş | [Lisans etkinleşmiyor](https://docs.uavmatrix.com/tr/troubleshooting/license-activation-failed/) |
| **Pair Device** düğmesi yok | Viewer rolündesiniz | [Roller ve izinler](https://docs.uavmatrix.com/tr/fleet-manager/team/roles-and-permissions/) |
| Drone **PAIRING** durumunda takılı | Drone henüz aracıya bağlanmadı | [PAIRING durumunda takılı kalma](https://docs.uavmatrix.com/tr/fleet-manager/troubleshooting/#stuck-on-pairing) |
| Drone **OFFLINE** | İnternet yok, 8883 portu engelli veya UAVcast-Pro çalışmıyor | [Fleet Manager'da drone çevrimdışı](https://docs.uavmatrix.com/tr/troubleshooting/drone-offline-fleet-manager/) |
| **Re-pair required** | Eski bağlantı sertifikası | [Drone'u yeniden eşleştirme](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone) |
| Haritada **NO MAVLINK** | UAVcast-Pro, uçuş kontrolcüsünden veri almıyor | [MAVLink heartbeat yok](https://docs.uavmatrix.com/tr/troubleshooting/no-mavlink-heartbeat/) |
| Bağlama başarısız: **Failed to send configuration to drone - it may be offline** | Drone çevrimdışı veya 15 saniye içinde onaylamadı | [Bağlama kaydedilemiyor](https://docs.uavmatrix.com/tr/fleet-manager/troubleshooting/#binding-wont-save) |
| Bağlama var, yer kontrol istasyonunda telemetri veya video yok | Güvenlik duvarı, yanlış port veya akış kapalı | [Yer kontrol istasyonunda akış yok](https://docs.uavmatrix.com/tr/fleet-manager/troubleshooting/#no-stream-at-the-ground-station) |
| Yer kontrol istasyonu VPN'e katıldı ancak drone'a ulaşamıyor | Cihaz türü, drone VPN'de değil veya UDP engelli | [VPN bağlı ancak drone'a ulaşılamıyor](https://docs.uavmatrix.com/tr/troubleshooting/vpn-cant-reach-drone/) |
| Komutlar çalışmıyor, **UAVcast Upgrade Required** | Drone çevrimdışı, Viewer rolü veya eski UAVcast-Pro | [Komutlar başarısız oluyor](https://docs.uavmatrix.com/tr/fleet-manager/troubleshooting/#commands-fail) |
| UAVcast-Pro'yu uzaktan açarken **Request timed out. UAVcast may be unreachable.** | Proxy üzerinden yavaş bağlantı | [Proxy yavaş veya eksik](https://docs.uavmatrix.com/tr/fleet-manager/troubleshooting/#proxy-is-slow-or-incomplete) |
| Davet e-postası hiç gelmedi | Spam filtresi veya yanlış adres | [Davet alınmadı](https://docs.uavmatrix.com/tr/fleet-manager/troubleshooting/#invitation-not-received) |

## PAIRING durumunda takılı kalma

**PAIRING**, Fleet Manager'ın kodu kabul ettiği ve drone'un MQTT üzerinden ilk heartbeat sinyalini beklediği anlamına gelir.

1. UAVcast-Pro'nun **Fleet Management** sayfasına bakın. Hâlâ **Waiting for Manager to confirm pairing...** yazıyorsa drone sertifikasını almamıştır. İnternet bağlantısı olduğunu kontrol edin.

2. Drone'dan giden TCP 8883 bağlantısını kontrol edin:

   ```bash
   nc -vz fleet-manager.uavmatrix.com 8883
   ```

3. Aynı drone için **eski** bir kodu girdiyseniz (örneğin **Connect to Fleet Manager** seçeneğini iki kez seçtikten sonra), UAVcast-Pro bu kodu beklemiyor. Görünüyorsa **Disconnect from Fleet** seçin, yeni bir kod alın ve aynı organizasyona yeniden eşleştirin. Drone kendi kaydını korur.

Drone'un sertifikasını almak için kodun süresi dolduktan sonra 15 dakikası vardır. Bu süreden sonra yeniden eşleştirin.

## Bağlama kaydedilemiyor

Fleet Manager, bir bağlamayı yalnızca drone onayladıktan sonra kaydeder. Drone'un **ONLINE** gösterdiğini kontrol edin, ardından yeniden deneyin. Drone çevrimiçi olmasına rağmen bağlamalar hâlâ başarısız oluyorsa drone VPN'de olmayabilir: **Network → Connected Devices** altında türü **UAV** olan cihazı kontrol edin veya **Push to Drone** kullanın.

## Yer kontrol istasyonunda akış yok

1. **Network → Stream Bindings** sayfasında **Video** ve **Telemetry** anahtarlarının açık olduğunu kontrol edin ve **Ports** değerlerini not alın.
2. Yer kontrol istasyonu yazılımının tam olarak bu portları dinlediğini kontrol edin. Bir dizüstü bilgisayarda yalnızca ilk drone 5600 / 14550 portlarını kullanır; diğer her drone'un kendi portları vardır.
3. Dizüstü bilgisayarın güvenlik duvarında bu portlar için gelen UDP trafiğine izin verin. Windows'ta QGroundControl veya Mission Planner'a **Private** ve **Public** ağlarda izin verin.
4. Dizüstü bilgisayarda `tailscale status` komutunu çalıştırın ve drone'un listelendiğini kontrol edin.

Daha fazla ayrıntı: [Yer kontrol istasyonunda telemetri yok](https://docs.uavmatrix.com/tr/troubleshooting/no-telemetry-in-gcs/) ve [Yer kontrol istasyonunda video yok](https://docs.uavmatrix.com/tr/troubleshooting/no-video-in-gcs/).

## Komutlar başarısız oluyor

- Drone **ONLINE** durumunda olmalıdır.
- Komut yalnızca Owner ve Admin rolleri tarafından gönderilebilir. Viewer'lar komut düğmelerini görmez ve sunucu onların komutlarını reddeder.
- Arm et, disarm et ve uçuş öncesi kalibrasyon için UAVcast-Pro 6.3.0_rc13 veya daha yeni bir sürüm gerekir. [UAVcast-Pro'yu güncelleyin](https://docs.uavmatrix.com/tr/get-started/updating/).
- Uçuş kontrolcüsü bir komutu reddedebilir; örneğin, ön arm kontrolleri başarısız olduğunda arm etme gibi. Mesajını harita açılır penceresinde veya **Logs** sekmesinde okuyun.

## Proxy yavaş veya eksik

**Open via Proxy**, her sayfa isteğini drone'un bağlantısı üzerinden iletir; istek başına 30 saniye tanınır ve canlı (WebSocket) özellikleri taşımaz. Zayıf bir hücresel bağlantıda sayfanın yüklenmesini bekleyin veya VPN'e katılıp **Open via VPN** seçeneğini kullanın. Bkz. [UAVcast-Pro'yu uzaktan açma](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remote-uavcast/).

## Davet alınmadı

Kişiden spam klasörünü kontrol etmesini isteyin. **Team** sayfasında **Pending Invitations** altındaki e-postayı kontrol edin. Yanlışsa **Revoke** ile iptal edip yeniden davet edin. Davetler 7 gün sonra sona erer.

## Hâlâ çözülemedi

Destek düğmesinden ekran görüntüsüyle bir talep açın veya [support@uavmatrix.com](mailto:support@uavmatrix.com) adresine e-posta gönderin. Drone'un adını ve cihaz kimliğini (UAV sayfasında) ekleyin. Talepler yalnızca görüntü kabul ettiğinden, UAVcast-Pro günlük paketini (ZIP) talep numaranızla birlikte [support@uavmatrix.com](mailto:support@uavmatrix.com) adresine e-posta ile gönderin. Bkz. [Destek](https://docs.uavmatrix.com/tr/fleet-manager/support/) ve [Günlükleri toplama](https://docs.uavmatrix.com/tr/troubleshooting/collect-logs/).

Source: https://docs.uavmatrix.com/tr/fleet-manager/troubleshooting/
