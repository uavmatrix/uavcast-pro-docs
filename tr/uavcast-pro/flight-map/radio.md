# Radyo sekmesi

> UAVcast-Pro Radyo sekmesinde uçuş kontrolcünüzden canlı RC kanal PWM değerlerini ve RSSI'yı görün; verici anahtarlarını ve RC kamera değiştirmeyi kontrol edin.

Radyo sekmesi, uçuş kontrolcüsünün vericinizden aldığı RC girişini gösterir: her kanalın PWM değerini ve RSSI'yı (sinyal gücü). Anahtar atamalarını kontrol etmek için kullanın; örneğin [RC kamera değiştirme](https://docs.uavmatrix.com/tr/uavcast-pro/camera/multi-camera/) için kullandığınız kanalı, bir yer kontrol istasyonu bağlamadan doğrulayabilirsiniz. **Uçuş Haritası → Radyo** sayfasını açın.

![RSSI rozeti, dört ana kanal ve yardımcı kanalların bulunduğu Radyo sekmesi; hepsi 0](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/flight-map--radio.webp)

*RC alıcısı olmayan bir tezgah ünitesinde Uçuş Haritası → Radyo; her kanal 0 okuyor.*

## Ne görürsünüz

- **RSSI**: uçuş kontrolcüsünden gelen alıcı sinyal gücü. **Sinyal Yok**, **Zayıf**, **Orta**, **İyi** veya **Mükemmel** olarak derecelendirilir. RSSI'nın uçuş kontrolcüsünde ayarlanmış olması gerekir (ArduPilot'ta `RSSI_TYPE`).
- **Ana Kontroller**: **Kanal 1 - Yalpa**, **Kanal 2 - Yunuslama**, **Kanal 3 - Gaz** ve **Kanal 4 - Sapma**; Mission Planner düzeninde.
- **Yardımcı Kanallar**: kalan kanallar.

PWM değerleri genellikle 1000 (min) ile 2000 (maks) arasında değişir. Hiç hareket etmeyen bir kanal, vericide eşlenmediği veya alıcının onu göndermediği anlamına gelir.

Değerler uçuş kontrolcüsünün `RC_CHANNELS` mesajından gelir; bu nedenle yalnızca uçuş kontrolcüsü bağlantısı **Bağlı** durumdayken güncellenir.

Source: https://docs.uavmatrix.com/tr/uavcast-pro/flight-map/radio/
