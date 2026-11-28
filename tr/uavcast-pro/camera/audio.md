# Ses

> USB mikrofonun veya web kamerasının dahili mikrofonunun sesini UAVcast-Pro canlı önizlemesine ekleyin ve Video Portu + 2 üzerinden RTP/Opus akışı olarak yer kontrol istasyonlarına gönderin.

UAVcast-Pro, bir USB mikrofondan veya bir USB kameranın dahili mikrofonundan ses ekleyebilir. Ses Opus olarak kodlanır; bu da çok az CPU ve bant genişliği tüketir. Ses her zaman canlı önizlemede çalar; ayrıca yer kontrol istasyonlarınıza ayrı bir RTP akışı olarak da gönderebilirsiniz. Ayarı **Kamera → Kamera ayarları** sayfasındaki **Ses** kartında bulacaksınız.

## Sesi etkinleştirme

1. Bir USB mikrofon takın veya dahili mikrofonlu bir web kamerası kullanın.
2. **Kamera → Kamera ayarları** sayfasında **Ses** seçeneğini açın.
3. **Ses cihazı** seçeneğini **Otomatik (varsa kamera mikrofonu)** olarak bırakın veya bir cihaz seçin. Mikrofon gerektirmeden yolu test etmek için **Test tonu (mikrofon gerekmez)** seçeneğini kullanın.
4. Göstergeyi izleyin. Hareketli seviye ölçerli **Ses canlı** ifadesi, sesin yakalandığını gösterir.
5. **Canlı Önizleme** bölümünde oynatıcının sesini açın. Tarayıcılar önizlemeyi sessiz başlatır.

![Kamera sayfasındaki Ses kartı; Ses anahtarı kapalı ve durumu Ses kapalı](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/camera--audio.webp)

*Kamera → Ses, kapalı. Mikrofonu ve bit hızını seçmek için açın.*

Arızalı bir mikrofon video akışını hiçbir zaman kesmez. Bunun yerine gösterge, nedeniyle birlikte **Ses hatası** ifadesini gösterir.

## Yer kontrol istasyonlarına ses gönderme

**Sesi yer kontrol istasyonlarına gönder** seçeneğini açın. UAVcast-Pro bunun ardından, video alan her yer kontrol istasyonuna, o hedefin **Video Portu + 2** portunda ayrı bir RTP/Opus akışı gönderir. Varsayılan video portuyla bu `5602`'dir. Aynı bilgisayardaki iki hedefin video portları en az 3 aralıklı olmalıdır, örneğin `5600` ve `5603`.

QGroundControl ve Mission Planner sesi yok sayar. Sesi GStreamer ile oynatın:

```bash
gst-launch-1.0 udpsrc port=5602 caps="application/x-rtp, media=(string)audio, clock-rate=(int)48000, encoding-name=(string)OPUS, payload=(int)97" ! rtpopusdepay ! opusdec ! audioconvert ! autoaudiosink
```

Akış, 48 kHz Opus formatındadır ve RTP yük türü 97'dir. VLC, bu değerleri tanımlayan bir SDP dosyasıyla oynatabilir.

## Ayar referansı

| Ayar | Varsayılan | Değerler | Notlar |
| --- | --- | --- | --- |
| **Ses** | Kapalı | Açık, kapalı | Herhangi bir ses ayarını değiştirmek kamera hizmetini yeniden başlatır. |
| **Ses cihazı** | **Otomatik (varsa kamera mikrofonu)** | Otomatik, algılanan yakalama cihazları, **Test tonu (mikrofon gerekmez)** | Takılı olmayan kayıtlı bir cihaz *(bağlı değil)* olarak görünür. |
| **Bit Hızı** | `64 kbps` | 24, 32, 48, 64, 96, 128 kbps | Konuşma ve motor gürültüsü için 32–64 kbps yeterlidir. |
| **Sesi yer kontrol istasyonlarına gönder** | Kapalı | Açık, kapalı | Videosu etkin her hedefte Video Portu + 2 üzerinden RTP/Opus. |

## Sorun giderme

- *Ses yakalama cihazı bulunamadı*: Bir USB mikrofon veya dahili mikrofonlu bir kamera takın. Drone üzerinde `arecord -l` komutu yakalama cihazlarını listeler.
- **Sinyal yok**: Cihaz açık ama sessiz. Mikrofonun sessize alma anahtarını kontrol edin veya **Test tonu** seçeneğini deneyin.
- Ses önizlemede var ama yer kontrol istasyonunda yok: **Sesi yer kontrol istasyonlarına gönder** seçeneğinin açık olduğundan, hedefte **Videoyu Etkinleştir** seçeneğinin açık olduğundan ve alıcınızın Video Portu + 2 portunu dinlediğinden emin olun.

Source: https://docs.uavmatrix.com/tr/uavcast-pro/camera/audio/
