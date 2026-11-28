# Uzaktan kontrol

> Fleet Manager'ın UAV kontrol panelinden uçuş modlarını değiştirin, arm veya disarm yapın, görevleri çalıştırın ve uçuş öncesi kalibrasyon başlatın; güvenlik kontrolleriyle birlikte.

**UAV Control Panel**, Fleet Manager'ın şifreli bağlantısı üzerinden UAVcast-Pro aracılığıyla uçuş kontrolcüsüne komut gönderir. Drone'un sahip olduğu herhangi bir internet bağlantısı üzerinden çalışır, 4G dahil; VPN gerektirmez.

[Fleet](https://docs.uavmatrix.com/tr/fleet-manager/fleet/) kartındaki **Operations** düğmesiyle veya [Fleet Map](https://docs.uavmatrix.com/tr/fleet-manager/map/) üzerindeki bir drone açılır penceresindeki **Controls** ile açın. Haritada panelde ayrıca **Terminal** ve **Logs** sekmeleri bulunur.

![Flight Mode, Mission ve Actions sütunları içeren, armed bir quadcopter için UAV Control Panel](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/control-panel.webp)

*LOITER modunda, armed bir quadcopter için UAV Control Panel: RTL, Circle ve Loiter düğmeleri içeren Flight Mode, 18 yol noktalı bir keşif görevi seçili Mission ve Arm ile Disarm içeren Actions.*

Yalnızca **Owner** ve **Admin** kullanıcıları komut gönderebilir. Bkz. [Roller ve izinler](https://docs.uavmatrix.com/tr/fleet-manager/team/roles-and-permissions/).

> **Uzaktan komutlar gerçek uçakları hareket ettirir**
>
> Fleet Manager'dan gelen bir komut, yer kontrol istasyonu göndermiş gibi uçağa etki eder. Her uçuşta bir pilotun yer kontrol istasyonu veya RC verici ile kontrolde kalmasını sağlayın, uzaktan ve BVLOS operasyonları için yerel kurallara uyun ve Fleet Manager'ı tek bağlantınız değil, bir denetim ve sevk aracı olarak görün.

## Başlık

Üst bilgi; drone'un durumunu, **ARMED** ve **FAILSAFE** bayraklarını, bir **GCS Failsafe** rozetini, harita renk seçiciyi (**Change map color**, yanında **Reset to auto** ile) ve [UAV sayfasına](https://docs.uavmatrix.com/tr/fleet-manager/fleet/uav-details/) giden bir **Details** bağlantısını gösterir.

Uçuş kontrolcüsünün GCS failsafe'i kapalıysa panel uyarır: **GCS Failsafe not enabled. Without GCS failsafe, the vehicle will not return to launch if it loses connection to the ground station.** Görsel hat ötesinde uçmadan önce failsafe'i yer kontrol yazılımınızda ayarlayın (ArduPilot parametresi `FS_GCS_ENABLE`).

## Flight Mode

Açılır listeden bir mod seçin veya hızlı düğmeleri kullanın: **RTL**, **Circle** ve **Loiter** (roverlerde **Hold**). Her mod değişikliği onay ister ve mod ne kadar tehlikeliyse kontrol o kadar sıkıdır:

| Onay | Modlar |
| --- | --- |
| Basit **Change to *MODE*?** | STABILIZE, ALT_HOLD, LOITER, POSHOLD, BRAKE, FLOWHOLD, HOLD, FBWA, FBWB, CRUISE, QHOVER, QLOITER, QSTABILIZE |
| Modun ne yaptığının açıklamasıyla onay | AUTO, GUIDED, RTL, SMART_RTL, CIRCLE, FOLLOW, ZIGZAG, QRTL, TAKEOFF, AVOID_ADSB, ACRO, MANUAL |
| Onaylamak için mod adını yazın | LAND, SPORT, AUTOTUNE, FLIP, DRIFT, THROW, QLAND, QACRO, AUTOROTATE |

![Onaylamak için LAND yazmanızı isteyen mod değişikliği onay iletişim kutusu](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/control-panel--mode-confirm.webp)

*LAND için onay; bu mod, onaylamak üzere yazılmalıdır.*

Mod listeleri ArduPilot'a aittir (Copter, Plane, Rover ve Sub). PX4 uçuş kontrolcüsünde modları değiştirmek için yer kontrol istasyonunuzu kullanın.

## Mission

Kuruluşunuzda kayıtlı [görevleri](https://docs.uavmatrix.com/tr/fleet-manager/missions/) çalıştırır:

- **Select mission** kayıtlı bir görev seçer. Sayaç, geçerli ve toplam yol noktasını gösterir, örneğin `3/18`, veya **None**.
- **Start** önce görevi drone'dan okur ve seçtiğinizle karşılaştırır. Farklılarsa **Mission Not Loaded on Drone** ekranı **Upload & Start** seçeneğini sunar.
- **Stop**, **Read** (görevi drone'dan getirir) ve **Clear**.

Her işlem onay ister.

## Actions

- **Arm** ve **Disarm**. Arm iletişim kutusunda şu uyarı yer alır: **This will arm the UAV. Ensure all personnel are clear of the propellers before arming.** **Force arm (bypass pre-arm checks)** kutusunu yalnızca tezgâh üzerinde işaretleyin: güvensiz kalkışı engelleyen kontrolleri atlar.
- **Select action... → Preflight Calibration** jiroskopu kalibre eder ve ivmeölçeri dengeler. Aracı düz bir yüzeyde tamamen hareketsiz tutun, ardından **Start Calibration** seçin.

![Pervane uyarısı ve Force arm kutusu içeren arm onay iletişim kutusu](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/control-panel--arm-confirm.webp)

*Pervane uyarısı ve işaretlenmemiş Force arm (bypass pre-arm checks) kutusu içeren arm iletişim kutusu.*

Arm, disarm ve uçuş öncesi kalibrasyon için drone'da UAVcast-Pro **6.3.0_rc13** veya sonrası gerekir. Daha eski sürümlerde panel **UAVcast Upgrade Required** gösterir. Bkz. [Güncelleme](https://docs.uavmatrix.com/tr/get-started/updating/).

## Komut geçmediğinde

- Drone çevrimiçi olmalıdır. Çevrimdışı bir drone'a gönderilen komutlar başarısız olur.
- Fleet Manager, her komut için drone'un onay vermesini bekler. Uçuş kontrolcüsü reddederse, örneğin pre-arm kontrolleri başarısızken arm ederken, hata panelde ve drone'un durum mesajlarında görünür.
- Uçuş kontrolcüsünden gelen mesajlar (pre-arm hataları, mod değişiklikleri) haritadaki drone açılır penceresinde ve [Logs](https://docs.uavmatrix.com/tr/fleet-manager/fleet/uav-details/#logs) sekmesinde görünür.

Telefon boyutundaki ekranlar için bkz. [Lite görünüm](https://docs.uavmatrix.com/tr/fleet-manager/lite-view/).

Source: https://docs.uavmatrix.com/tr/fleet-manager/fleet/remote-control/
