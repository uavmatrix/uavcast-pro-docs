# UAV ayrıntıları

> Fleet Manager'da bir drone'un sayfası; canlı telemetri ve eşlik eden bilgisayar sağlığını, bir SSH terminalini ve MAVLink günlüğünü, ayrıca yeniden başlatma ve kaldırma işlemlerini gösterir.

Her drone'un kendi sayfası vardır. Açmak için [Fleet](https://docs.uavmatrix.com/tr/fleet-manager/fleet/) kartındaki **Details** düğmesini, kontrol panelini veya eşleştirmenin sonundaki **View UAV** seçeneğini kullanın.

Üst bilgide ad, canlı bir durum rozeti, gerekirse **Re-pair required**, kuruluş, cihaz **ID**'si ve **Last seen** yer alır. Owner ve Admin kullanıcıları ayrıca **Rename** ve **Remove** düğmelerini görür.

Sayfada dört sekme vardır: **Overview**, **Terminal**, **Logs** ve **Actions**.

## Overview

Canlı veriler, geldikçe tarayıcıya gönderilir.

![UAVcast Application kartı ve MAVLink / Flight Controller kartı içeren UAV ayrıntıları Overview sekmesi](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/drone-detail.webp)

*AUTO modunda armed bir VTOL için Overview sekmesi: CPU Temp, CPU, Memory ve Disk içeren UAVcast Application kartı; batarya, GPS, irtifa ve yön içeren MAVLink / Flight Controller kartı.*

**UAVcast Application**, eşlik eden bilgisayarı tanımlar: bağlantı durumu (**Connected**, **Waiting for data...** veya **Connecting...**), **Hostname**, **Uptime**, **CPU Temp**, **CPU**, **Memory** ve **Disk** kullanımı, UAVcast-Pro servisleri ve durumları ile drone'un ağ adresleri (LAN ve VPN). Ayrıca [UAVcast-Pro'yu uzaktan açma](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remote-uavcast/) düğmelerini içerir: **Open via Proxy** ve drone VPN'deyse **Open via VPN**.

**MAVLink / Flight Controller**, uçuş kontrolcüsünün bildirdiklerini gösterir: **ARMED** veya **DISARMED**, **FAILSAFE** ve **GCS FAILSAFE** bayrakları, **Battery**, **GPS** (uydular ve konum), **Altitude** ve **Heading**.

> **Sıcak günlerde CPU Temp değerini izleyin**
>
> Aşırı ısınan bir Raspberry Pi yavaşlar ve video bundan ilk etkilenen olur. Uçuş sırasında **CPU Temp** yükseliyorsa [Düşük voltaj ve kısıtlama](https://docs.uavmatrix.com/tr/troubleshooting/undervoltage-and-throttling/) bölümüne bakın.

### Connected Ground Stations

Kartların altındaki **Connected Ground Stations** bölümü, bu drone'un akışlarını alan yer kontrol istasyonlarını listeler; **Video** ve **Telemetry** anahtarları ile **Pause** / **Resume** düğmelerini içerir. **Add GCS** (Owner ve Admin için) bu drone'a başka bir yer kontrol istasyonu bağlar. Bu işlem, **Network → Stream Bindings** ile aynı akış bağlamasını oluşturur; yer kontrol istasyonunda bir sonraki boş portları kullanır ve yeni hedefi drone'a gönderir. Bkz. [Akış bağlamaları](https://docs.uavmatrix.com/tr/fleet-manager/network/stream-bindings/).

## Terminal

Eşlik eden bilgisayara, Fleet Manager'ın şifreli bağlantısı üzerinden tarayıcıda açılan bir SSH oturumu. Port yönlendirmesi ve VPN gerekmez. Yalnızca Owner ve Admin kullanıcıları. Drone çevrimiçi olmalıdır.

Bir kabuk açmak için **Connect** seçin. Hızlı komut düğmeleri yaygın kontrolleri sizin için çalıştırır: `df -h`, `free -h`, `top -bn1`, `ip a`, `ip r`, `uptime`, `dmesg` ve `ps aux`. **Disconnect** oturumu kapatır.

![df -h çıktısı ve hızlı komut düğmeleri gösteren SSH oturumlu Terminal sekmesi](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/drone-detail--terminal.webp)

*Saha drone'una bağlı Terminal sekmesi; df -h hızlı komutu çalıştırıldıktan sonra.*

> **Bu, uçakta çalışan canlı bir kabuktur**
>
> Terminal, eşlik eden bilgisayarda gerçek bir kabuktur. Drone havadayken servisleri veya ağı yeniden başlatmak telemetri ve videoyu kesebilir. Bir komutun ne yaptığını bilmiyorsanız yalnızca yerdeyken kullanın.

## Logs

Drone'un Fleet Manager'a gönderdiği telemetri ve kalp atışı mesajlarının canlı görünümü; **Telemetry** ve **Heartbeat** filtreleri, **Auto-scroll**, **Pause** ve temizleme seçenekleriyle. **Download logs**, ekranda görünenleri bir metin dosyasına (`mavlink-log-<id>-<time>.txt`) kaydeder; bu dosyayı talep numaranızla birlikte destek ekibine e-postayla göndermek işinize yarar (talepler yalnızca bir görsel kabul eder).

Bu canlı bir günlüktür, uçuş günlüğü arşivi değildir. Fleet Manager, telemetriyi [uçuş geçmişi](https://docs.uavmatrix.com/tr/fleet-manager/map/flight-history/) için saklar; ancak DataFlash veya `.tlog` dosyalarını saklamaz ya da dışa aktarmaz. Bunlar uçuş kontrolcüsünde ve yer kontrol yazılımınızda kalır.

![TELEMETRY ve HEARTBEAT kayıtlarının kaydırılan bir listesi ve Telemetry, Heartbeat ve Auto-scroll anahtarları içeren Logs sekmesi](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/drone-detail--logs.webp)

*Telemetry, Heartbeat ve Auto-scroll açıkken TELEMETRY ve HEARTBEAT kayıtlarını akıtan Logs sekmesi.*

## Actions

**System Actions** bölümünde **Reboot** (eşlik eden bilgisayarı yeniden başlatın) ve **Shutdown** (eşlik eden bilgisayarı kapatın) bulunur. İkisi için de drone çevrimiçi olmalıdır. Onaylamak için işlemin adını yazarsınız.

Bu işlemler yalnızca eşlik eden bilgisayarı etkiler, uçuş kontrolcüsünü etkilemez. Kapatma işlemi uzaktan geri alınamaz: birisinin drone'un gücünü kesip yeniden açması gerekir.

![System Actions kartı ile Reboot ve Shutdown düğmeleri içeren Actions sekmesi](https://docs.uavmatrix.com/tr/img/screenshots/fleet-manager/drone-detail--actions.webp)

*Actions sekmesi; reboot yazmanızı isteyen Confirm Reboot iletişim kutusu açık.*

## Rename

**Rename** seçin, **Edit UAV** içine yeni adı girin ve kaydedin. Ad, drone çevrimiçi olduğunda UAVcast-Pro ile senkronize edilir.

## Remove

**Remove**, drone'u kuruluştan siler ve eşleştirmesini kaldırır. Bkz. [Drone'u kaldırın veya devredin](https://docs.uavmatrix.com/tr/fleet-manager/fleet/remove-or-transfer/).

Source: https://docs.uavmatrix.com/tr/fleet-manager/fleet/uav-details/
