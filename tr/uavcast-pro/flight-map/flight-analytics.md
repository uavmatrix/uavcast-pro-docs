# Uçuş Analizi

> Canlı MAVLink telemetrisini veya kaydedilmiş bir .tlog dosyasını UAVcast-Pro Uçuş Analizi ile grafikleyin. En fazla 10 parametre seçin, zaman içinde karşılaştırın ve uçuşu drone üzerinde inceleyin.

Uçuş Analizi, MAVLink değerlerini zaman içinde çizer; ya uçuş kontrolcüsünden canlı olarak ya da kaydedilmiş bir `.tlog` dosyasından. Titreşimi, batarya düşüşünü, irtifa tutmayı veya sinyal değerlerini günlükleri bir PC'ye kopyalamadan kontrol etmek için kullanın. **Uçuş Haritası → Uçuş Analizi** bölümünü açın.

![Günlük Dosyası Yüklenmedi yazan, Günlük Dosyasını Aç düğmesi, Canlı anahtarı ve Parametreler panelini gösteren Uçuş Analizi sekmesi](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/flight-map--flight-analytics.webp)

*Bir günlük yüklenmeden önce Uçuş Analizi. Günlük Dosyasını Aç bir .tlog yükler.*

## Canlı telemetriyi çizdirme

1. **Canlı** seçeneğini seçin. Mesajlar geldikçe parametre listesi dolar. *MAVLink verileri bekleniyor* yazısında kalırsa önce uçuş kontrolcüsünü bağlayın.
2. **Parametreler** alanında arama yapın ve çizdirilecek değerleri işaretleyin. Bir seferde en fazla **10** değer çizdirebilirsiniz.
3. Her noktayı tutmak için **Verileri biriktir** seçeneğini açın (*Tüm veri noktaları saklanıyor*). Kapalıyken grafik kayan bir pencere tutar (*Son … nokta*).

## Kaydedilmiş bir günlüğü analiz etme

1. **Günlük Dosyasını Aç** seçeneğini seçin.
2. **Günlük Dosyasını Seç** bölümünde kaydedilmiş bir `.tlog` seçin. Telemetri günlükleri [Kayıtlar](https://docs.uavmatrix.com/tr/uavcast-pro/camera/recordings/) bölümünden gelir (varsayılan olarak silahlanan uçuş başına bir tane).
3. Çizdirmek için parametreleri işaretleyin. **Süre** ve dosyadaki **Parametreler** sayısı üstte gösterilir.

**Tümünü Temizle**, çizdirilen tüm parametreleri kaldırır.

## Günlükler nereden gelir

Telemetri, drone'da **Kamera → Kayıtlar → Ayarlar** altındaki **Telemetriyi kaydet** seçeneğine göre kaydedilir: **Arm edildiğinde** (varsayılan), **Bağlıyken her zaman** veya **Kapalı**. Aynı `.tlog` dosyaları Mission Planner, MAVExplorer ve UAV Log Viewer'da da açılır.

Uçuş Haritası'nın **Kayıtlar** yan sekmesi aynı telemetri günlüklerini **Mesajlar**, **Maks Yük** ve **Mesafe** ile listeler ve bir günlüğü **.tlog indir**, **Sil** veya **Oynat** seçeneğiyle işlemenize olanak tanır. Oynatma, kaydedilen telemetriyi drone uçuyormuş gibi haritaya akıtır.

Source: https://docs.uavmatrix.com/tr/uavcast-pro/flight-map/flight-analytics/
