# Enjektörler

> UAVcast-Pro enjektörleriyle betiklerden, Arduino'lardan veya LTE modemden gelen sensör değerlerini HTTP, UDP veya seri üzerinden MAVLink akışına gönderin; böylece QGC ve Mission Planner bu değerleri görür.

Enjektör, UAVcast-Pro'nun dışındaki verileri (bir Python betiği, bir Arduino veya ağdaki bir sensör gibi) MAVLink akışına `NAMED_VALUE_FLOAT` (veya `NAMED_VALUE_INT`) mesajları olarak besler. Bağlı her yer kontrol istasyonu değerleri normal telemetri olarak alır: Mission Planner bunları **Status** sekmesinde, QGroundControl ise MAVLink İnceleyici'de gösterir. Ayrıca [Veri Akışları](https://docs.uavmatrix.com/tr/uavcast-pro/data-streams/) panolarında otomatik olarak görünürler. **Uçuş Kontrolcüsü → Enjektörler** bölümünü açın.

Tipik kullanımlar: eşlik eden bilgisayardaki radyasyon, gaz veya hava durumu sensörleri; bağlantı izleme için LTE sinyal değerleri (RSRP, SINR) veya kendi betiklerinizin hesapladığı değerler.

## Bir taşıma yöntemi seçin

| Tür | Veri nasıl gelir | En uygun |
| --- | --- | --- |
| **HTTP** | Gizli bir belirteçle benzersiz bir URL'ye JSON POST edilir | En kolayı. HTTP isteği yapabilen her şey. |
| **UDP** | Drone'daki bir porta `NAME=VALUE` satırları veya JSON olarak paketler | En düşük yük, güvenilir yerel ağlar. Kimlik doğrulama yok. |
| **Seri** | `/dev/tty*` aygıtından okunan satırlar | USB üzerinden bir Arduino gibi kablolu sensörler. |

Enjektörü oluşturduktan sonra türü değiştiremezsiniz.

## Enjektör oluşturma

1. **Uçuş Kontrolcüsü → Enjektörler** bölümüne gidin ve **Enjektör ekle** seçeneğini seçin.
2. Bir **Ad** girin (yalnızca arayüzde görünür) ve **Giriş türü** seçin.
3. Değerlerin uçuş kontrolcüsüyle aynı araca ait olması için **MAVLink sysid** değerini `1` olarak bırakın; başka bir gereksinim yoksa **MAVLink compid** değerini `194` (kullanıcı yükü) olarak bırakın.
4. İsteğe bağlı: bir **Ad öneki** ayarlayın; örneğin `BAL_`, böylece `RAD1` `BAL_RAD1` olarak gönderilir.
5. UDP veya Seri için dinleyici ayarlarını doldurun. Ardından **Oluştur** seçeneğini seçin.
6. Bir değer göndermek ve yer kontrol istasyonunuzda kontrol etmek için enjektörün kartında **Test sinyali gönder** seçeneğini seçin.

![Henüz enjektör yok yazan, tipik kullanımları, HTTP, UDP ve Seri taşıma yöntemlerini ve Enjektör ekle düğmesini gösteren Enjektörler sekmesi](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/flight-controller--injectors.webp)

*İlk enjektörden önce Uçuş Kontrolcüsü → Enjektörler: tipik kullanımlar ve üç taşıma yöntemi.*

## Veri gönderme

**HTTP**

Bir HTTP enjektörü oluşturduktan sonra kartı **HTTP uç noktasını** gösterir. URL `http://<drone-ip>/api/inject/<token>` biçimindedir ve normal web arayüzü portundan geçer. **URL'yi kopyala** seçeneği URL'yi kopyalar.

```bash
curl -X POST http://192.168.1.50/api/inject/<token> \
  -H "Content-Type: application/json" \
  -d '{"name":"RAD1","value":0.077}'
```

```bash
curl -X POST http://192.168.1.50/api/inject/<token> \
  -H "Content-Type: application/json" \
  -d '{"samples":[{"name":"TEMP","value":21.4},{"name":"HUM","value":48}]}'
```

Yanıt, neler olduğunu sayar: `{"accepted":2,"rateLimited":0,"rejected":0}`. Belirteç tek korumadır. Sızarsa **Token'ı yenile** seçeneğini seçin ve istemcinizi güncelleyin.

**UDP**

Enjektör, varsayılan olarak **Port** `14600` ve **Bağlanma adresi** `0.0.0.0` (tüm arayüzler) üzerinde dinler. Gönderici drone'un kendisinde çalışıyorsa `127.0.0.1` kullanın.

```bash
echo "RAD1=0.077" | nc -u -w1 192.168.1.50 14600
```

```python
import json, socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.sendto(json.dumps({"name": "RAD1", "value": 0.077}).encode(), ("192.168.1.50", 14600))
```

**Seri**

Enjektör, **Aygıt yolu** (varsayılan `/dev/ttyUSB0`) üzerinden **Baud hızı** (varsayılan `115200`) ile yeni satır sonlandırmalı satırları okur. Her satır bir örnektir: Anahtar=Değer protokolü için `NAME=VALUE` veya bir JSON nesnesi. Aygıt çıkarılırsa kendiliğinden yeniden bağlanır.

```cpp
void setup() { Serial.begin(115200); }
void loop() {
  Serial.print("LIGHT=");
  Serial.println(analogRead(A0));
  delay(200);
}
```

> **MAVLink adları 10 karakterdir**
>
> `NAMED_VALUE_FLOAT` adları, önek dahil 10 karakterle sınırlıdır. Öneki kısa tutun (en fazla 8 karakter) ve adları kısa yazın.

## Ayar başvurusu

| Ayar | Varsayılan | Değerler | Notlar |
| --- | --- | --- | --- |
| **Ad** | boş | metin | Yalnızca arayüzde görünen etiket. |
| **Giriş türü** | **HTTP** | **HTTP**, **UDP**, **Serial** | Oluşturulduktan sonra değiştirilemez. |
| **Etkin** | Açık | Açık, kapalı | Kapalıyken yapılandırma korunur ancak dinleyici durur. |
| **MAVLink sysid** | `1` | 1–255 | Uçuş kontrolcüsüyle aynı; değerleri o araçla gruplar. |
| **MAVLink compid** | `194` | 0–255 | 194, kullanıcı yükü sensörleri için yaygındır. |
| **Ad öneki** | boş | en fazla 8 ASCII karakter | Her sinyal adının önüne eklenir. |
| **Hız sınırı (sinyal başına Hz)** | `10` | saniyedeki örnek sayısı | Fazla örnekler atılır ve **Sınırlandı** olarak sayılır. Bağlantıyı kontrolden çıkmış bir göndericiye karşı korur. |
| **Protokol** (UDP, Seri) | **Anahtar=Değer (satır sınırlı)** | **Anahtar=Değer (satır sınırlı)**, **JSON** (`{name, value}`) |  |
| **Port** (UDP) | `14600` | 1–65535 |  |
| **Bağlanma adresi** (UDP) | `0.0.0.0` | IP adresi | `127.0.0.1` yalnızca yerel göndericileri kabul eder. |
| **Aygıt yolu** (Seri) | `/dev/ttyUSB0` | aygıt yolu | Bulmak için `ls /dev/tty*` komutunu çalıştırın. |
| **Baud hızı** (Seri) | `115200` |  | Gönderici ile eşleşmelidir. |

Her kart **Kabul**, **Sınırlandı** ve **Reddedildi** sayaçlarını gösterir; böylece verinin gelip gelmediğini ve geçerli olup olmadığını görebilirsiniz.

Enjektörler UAVcast-Pro servisleri içinde çalışır ve açılışta başlar; böylece web arayüzü açık olmasa bile değerler akmaya devam eder.

Source: https://docs.uavmatrix.com/tr/uavcast-pro/flight-controller/injectors/
