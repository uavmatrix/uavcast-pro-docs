# Dinamik DNS

> UAVcast-Pro Dinamik DNS (No-IP, DynDNS, DuckDNS veya Genel URL) ile bir ana bilgisayar adını drone'un değişen genel IP adresine yönlendirilmiş tutun ve VPN'in daha iyi seçenek olduğu durumları öğrenin.

Dinamik DNS, `mydrone.ddns.net` gibi bir ana bilgisayar adını drone'un geçerli genel IP adresine yönlendirilmiş tutar. UAVcast-Pro genel IP'yi her 5 dakikada bir kontrol eder ve değiştiğinde DNS sağlayıcınızı günceller. Kenar çubuğunda **Dinamik DNS** seçeneğini açın.

> **Çoğu hücresel bağlantı yerine VPN gerektirir**
>
> Dinamik DNS yalnızca drone'un genel IP adresi gelen bağlantıları kabul edebiliyorsa işe yarar. Çoğu mobil operatör SIM kartları taşıyıcı düzeyinde NAT'ın arkasına yerleştirir; dolayısıyla genel IP drone'a değil operatöre aittir. SIM'iniz genel (çoğu zaman "statik" veya "M2M" olarak adlandırılan) bir IP adresine sahip değilse [VPN](https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/vpn/) kullanın.

Dinamik DNS, UAVcast-Pro'nun telemetri ve videoyu nereye gönderdiğini değiştirmez: bunlar her zaman [Yer Kontrol İstasyonları](https://docs.uavmatrix.com/tr/uavcast-pro/ground-stations/) sayfasındaki IP adreslerine gider. Dinamik DNS, drone'un web arayüzüne veya SSH'ye dışarıdan erişmek içindir.

## Kurulum

1. DNS sağlayıcınızla (No-IP, DynDNS veya DuckDNS) bir ana bilgisayar adı oluşturun.
2. UAVcast-Pro'da **Dinamik DNS** sayfasını açın. **Dinamik DNS Etkinleştirilsin mi?** seçeneğini **Evet** yapın.
3. **DNS Sistemi** seçeneğini seçin.
4. Hesap kullanıcı adınızı (alan **Dinamik DNS yapılandırması** olarak etiketlenmiştir), **Parola** alanını ve ana bilgisayar adını **Takma Ad** alanına girin. DuckDNS için token'ınızı kullanıcı adı alanına girin; **Parola** alanına da herhangi bir şey yazın (form bunu zorunlu tutar, DuckDNS yok sayar). Alanlar, terk ettiğinizde kaydedilir.
5. Güncelleyiciyi başlatmak için **Bağlan** seçeneğini seçin. Güncelleyici geçerli IP'yi hemen gönderir ve sonra her 5 dakikada bir kontrol eder. **Bağlantıyı Kes** güncelleyiciyi durdurur.

![Dinamik DNS Etkinleştirilsin mi? seçeneği Hayır olan, kullanıcı adı, parola ve takma ad alanları boş ve DNS Sistemi noip olan Dinamik DNS Yöneticisi](https://docs.uavmatrix.com/tr/img/screenshots/uavcast-pro/dynamic-dns.webp)

*Etkinleştirilmeden önceki Dinamik DNS Yöneticisi.*

## Ayar referansı

| Ayar | Varsayılan | Değerler | Notlar |
| --- | --- | --- | --- |
| **Dinamik DNS Etkinleştirilsin mi?** | **Hayır** | **Evet**, **Hayır** |  |
| **DNS Sistemi** | **No-IP** | **No-IP**, **DynDNS**, **DuckDNS**, **Genel** |  |
| **DNS URL'si** | Boş | Güncelleme URL'si | Yalnızca **Genel** için. Sağlayıcının DynDNS uyumlu güncelleme URL'si. |
| **Dinamik DNS yapılandırması** (kullanıcı adı) | Boş |  | DNS hesabınızın kullanıcı adı veya DuckDNS için token'ınız. Arayüz bu alanı alışılmadık biçimde etiketler; kullanıcı adıdır. |
| **Parola** | Boş |  | DNS hesabınızın parolası. Form tarafından zorunludur; DuckDNS için yok sayılır. |
| **Takma Ad** | Boş | Ana bilgisayar adı | Güncellenecek ana bilgisayar adı, örneğin `mydrone.ddns.net`. |
| Güncelleme aralığı | 5 dakika | sabit |  |

[Kontrol Paneli](https://docs.uavmatrix.com/tr/uavcast-pro/dashboard/) sayfasındaki **Dinamik DNS** satırı, güncelleyicinin çalışıp çalışmadığını gösterir. **İşlem Kayıtları** her güncellemeyi ve sağlayıcının yanıtını gösterir.

Source: https://docs.uavmatrix.com/tr/uavcast-pro/connectivity/dynamic-dns/
