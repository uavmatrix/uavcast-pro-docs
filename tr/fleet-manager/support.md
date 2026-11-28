# Destek ve FleetBot

> Fleet Manager içinde yardım alın: FleetBot asistanına sorun, ekran görüntülü bir destek talebi açın, durumunu takip edin ve sistem durumunu kontrol edin.

Yardım, her Fleet Manager sayfasında tek tıkla erişilebilir: sağ alttaki yuvarlak destek düğmesi, **FleetBot** ve **Ticket** adlı iki sekmesi olan bir panel açar.

## FleetBot'a sorun

**FleetBot**, Fleet Manager'ın sayfalarını ve özelliklerini bilen bir yapay zekâ asistanıdır. "İkinci bir yer kontrol istasyonunu nasıl bağlarım?" gibi sorular sorabilirsiniz; doğru sayfaya bağlantılarla yanıt verir.

![Bir soru ve Network sayfasına bağlantı içeren yanıtın göründüğü FleetBot sekmesindeki destek paneli](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/support-bubble--fleetbot.webp)

*Destek paneli, FleetBot sekmesi; bir akış bağlamasının nasıl ekleneceğini Network → Stream Bindings bağlantısıyla yanıtlıyor.*

- Sorunuzu **Ask FleetBot...** alanına yazın ve gönderin.
- Bir sohbet en fazla 20 mesaj içerebilir; her mesaj en fazla 2.000 karakter olabilir. Sınıra ulaşırsanız yeni bir sohbet başlatın.
- FleetBot yanılabilir, özellikle sayılarda. Bu dokümanlarla çeliştiği durumlarda dokümanlar esas alınır.

> **FleetBot neleri görür**
>
> FleetBot yalnızca sohbette yazdıklarınızı alır, drone verilerinizi almaz. Mesajlar yanıt üretmek için Anthropic'in Claude yapay zekâ modeline gönderilir. Doğrulama anahtarlarını, parolaları veya lisans anahtarlarını yapıştırmayın.

## Destek talebi açın

1. Destek panelini açın ve **Ticket** sekmesini seçin.
2. Bir **Category** seçin: **Bug Report**, **Feature Request**, **General Inquiry** veya **Question**.
3. **Subject** (5 ila 200 karakter) ve **Message** (20 ila 5.000 karakter) alanlarını doldurun. Hangi drone'da olduğunu, ne yaptığınızı ve ne beklediğinizi belirtin.
4. İsteğe bağlı: bir ekran görüntüsü ekleyin. **Capture** tarayıcınız üzerinden ekranı yakalar (pencereyi siz seçersiniz), **Upload** ise en fazla 5 MB'lık bir görüntü dosyası ekler.
5. **Submit Ticket** seçin.

![Kategori, konu, mesaj ve ekran görüntüsü alanları bulunan Ticket sekmesindeki destek paneli](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/support-bubble--ticket.webp)

*PAIRING durumunda takılı kalan bir drone hakkında Bug Report olarak doldurulmuş Ticket sekmesi; isteğe bağlı ekran görüntüsü için Capture ve Upload ile.*

`SUP-7KQ2XA` gibi bir talep numarası alırsınız. Fleet Manager ayrıca bulunduğunuz sayfayı ve tarayıcınızı kaydeder; böylece destek ekibi sorunu yeniden üretebilir.

> **Drone sorunları için günlükleri ekleyin**
>
> Drone tarafındaki sorunlarda en çok günlükler yardımcı olur. Bir talep yalnızca görüntü kabul eder; bu nedenle UAVcast-Pro günlük paketini (ZIP dosyası, bkz. [Günlükleri toplama](https://docs.uavmatrix.com/tr/troubleshooting/collect-logs/)) veya drone'un **Logs** sekmesindeki **Download logs** dosyasını, konu satırında talep numaranızla birlikte (örneğin `SUP-7KQ2XA`) **[support@uavmatrix.com](mailto:support@uavmatrix.com)** adresine e-posta ile gönderin.

## Taleplerinizi takip edin

**Settings → Support** sayfası taleplerinizi durumlarıyla listeler: **Open**, **In Progress**, **Resolved** veya **Closed**. Ayrıntıları ve eklenen ekran görüntüsünü görmek için birini açın. Sorununuz çözüldüğünde **Close Ticket** seçin. Oradan **Create Support Ticket** ile de yeni bir talep oluşturabilirsiniz.

## Destek düğmesini gizleyin

Panel başlığındaki gizleme simgesini (**Hide support bubble**) seçin veya **Settings → Support** altında **Support Chat Bubble** anahtarını kapatın. Aynı yerden tekrar açabilirsiniz. Talepleri her zaman **Settings → Support** üzerinden açabilirsiniz.

## Yardım almanın diğer yolları

- **Sistem durumu:** **System → Status** etkin ve geçmiş olayları gösterir. Birçok drone aynı anda çevrimdışı olursa önce bunu kontrol edin. Bkz. [Durum göstergeleri ve bildirimler](https://docs.uavmatrix.com/tr/fleet-manager/alerts-and-status/#status-page).
- **E-posta:** [support@uavmatrix.com](mailto:support@uavmatrix.com).
- **Topluluk:** [UAVmatrix Discord](https://discord.gg/xwqMTXh).

Source: https://docs.uavmatrix.com/tr/fleet-manager/support/
