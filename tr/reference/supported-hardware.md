# Desteklenen donanım

> UAVcast-Pro v6 ile çalışan kartlar, işletim sistemleri, uçuş kontrolcüleri, kameralar, LTE modemler ve RTK alıcıları: Raspberry Pi, Jetson ve diğer arm64 kartlar ile x86 PC'ler.

UAVcast-Pro v6, Raspberry Pi OS, Debian veya Ubuntu çalıştıran, **arm64** veya **amd64** mimarisine sahip herhangi bir 64 bit Linux bilgisayarında çalışır. Raspberry Pi dışındaki arm64 kartlar ise UAVcast-Pro 6.5.3'ten itibaren desteklenir. Aşağıdaki tablolar algılanan ve test edilen donanımları listeler. Güç kaynakları, kablolama ve satın alma önerileri için bkz. [Donanım gereksinimleri](https://docs.uavmatrix.com/tr/get-started/hardware-requirements/).

## Eşlik eden bilgisayarlar

| Kart | Mimari | TELEM için seri port | Notlar |
| --- | --- | --- | --- |
| Raspberry Pi 5 | arm64 | GPIO UART (`uart0`) | En iyi video performansı. Sürekli kodlama için aktif soğutma gerekir. |
| Raspberry Pi 4 | arm64 | GPIO UART | Önerilen genel amaçlı seçim. |
| Raspberry Pi 3 | arm64 | GPIO UART | Orta ayarlarda telemetri ve bir kamera için uygundur. |
| Raspberry Pi Zero 2 W | arm64 | GPIO UART | Çalışır, ancak kurulumu yavaştır ve video için sınırlıdır. Bir kamera, düşük çözünürlük. |
| Raspberry Pi Compute Module | arm64 | Taşıyıcı karta bağlı | Yükleyici desteği v6.3.1 sürümünde düzeltildi. |
| NVIDIA Jetson (Nano, Orin Nano, Xavier NX, AGX, TX2) | arm64 | 40 pinli konektördeki `ttyTHS*` | USB kameralar. Jetson CSI kameraları kamera sunucusu tarafından işlenmez; el ile yazılmış bir **Özel Pipeline** gerekir. |
| Orange Pi (Zero, Zero 2, 3, 4, 5, Plus) | arm64 | `ttyS*`, modele bağlı | USB kameralar. UART'ın device tree içinde etkinleştirilmesi gerekebilir. |
| Banana Pi ve diğer arm64 kartlar | arm64 | Modele bağlı | USB kameralar. |
| x86 mini PC, Intel NUC, dizüstü bilgisayar | amd64 | USB-seri adaptörü | USB kameralar. |

> **Raspberry Pi olmayan arm64 kartlar**
>
> Jetson, Orange Pi, Banana Pi ve Raspberry Pi olmayan diğer arm64 kartlar, UAVcast-Pro 6.5.3 veya daha yenisini gerektirir. Eski yükleyiciler bu kartlarda *Device is not a Raspberry Pi* hatasıyla durur.

**Yalnızca Raspberry Pi:** CSI kameralar (rpicam/libcamera) bir Raspberry Pi gerektirir. Pi üzerinde yükleyici UART'ı etkinleştirir, seri konsolu kaldırır ve Pi 3/4/Zero 2 W'de tam UART'ın boş kalması için Bluetooth'u devre dışı bırakır.

## İşletim sistemleri

| İşletim sistemi | Durum |
| --- | --- |
| Raspberry Pi OS (64 bit) | Raspberry Pi'de önerilir. CSI kameralar için gereklidir. |
| Debian (64 bit) | Desteklenir. |
| Ubuntu (64 bit), Raspberry Pi için Ubuntu dahil | Desteklenir. Bir Pi üzerindeki CSI kameralar Ubuntu'da çalışmaz, çünkü Raspberry Pi kamera yığını paketlenmemiştir; USB kameralar çalışır. |
| Herhangi bir 32 bit işletim sistemi | **Desteklenmez.** Yükleyici *No installation candidate* hatasıyla durur. |

## Uçuş kontrolcüleri

UAVcast-Pro v6, USB veya TELEM portu üzerinden çalışan her MAVLink uçuş kontrolcüsüyle çalışır: Pixhawk ve Cube ailesi kartlar, Matek, Holybro, CUAV ve diğerleri üzerindeki ArduPilot (Copter, Plane, Rover, VTOL ve diğer araç tipleri) ve PX4. Uçuş Haritası ile Fleet Manager'daki uçuş modu adları ve mod düğmeleri ArduPilot'u izler; PX4 ile modları yer kontrol istasyonunuzdan değiştirin.

## Kameralar

| Tür | Örnekler | Notlar |
| --- | --- | --- |
| Raspberry Pi CSI | Camera Module 2 ve 3, HQ Camera, diğer libcamera sensörleri (imx219, imx708 …) | Raspberry Pi OS veya Debian. İki CSI kamera: iki konektörü olan kartlarda (Pi 5, Compute Module). |
| USB (UVC) | Logitech C920, C615 ve çoğu UVC web kamerası | Herhangi bir işletim sistemi. |
| Diğer kaynaklar | IP kameralar, HDMI yakalama | **Özel Pipeline** üzerinden. |

En fazla iki kamera; dönüşümlü olarak veya aynı anda yayınlanabilir. Ses, bir USB mikrofondan veya kameranın dahili mikrofonundan alınabilir.

## LTE / 4G modemler

| Tür | Çalışma şekli | Örnekler |
| --- | --- | --- |
| **HiLink** | Modem küçük bir yönlendiricidir ve bir ağ adaptörü olarak görünür (`cdc_ether`, `huawei_cdc_ncm`, `rndis_host` sürücüleri) | Huawei E3372h, E8372h |
| **Geleneksel (PPP)** | ModemManager tarafından yönetilir; UAVcast-Pro bağlanır, APN'i seçer ve yeniden bağlanır | Huawei E3372s, USB taşıyıcılarda Quectel ve Sierra Wireless modülleri |

Geleneksel modemlerin ModemManager tarafından desteklenmesi gerekir: bkz. [ModemManager destekli aygıtlar listesi](https://www.freedesktop.org/wiki/Software/ModemManager/SupportedDevices/). Bantları operatörünüzle eşleşen bir model seçin.

## RTK GPS alıcıları

NTRIP düzeltmeleri, uçuş kontrolcüsünde RTK destekli (taşıyıcı faz) bir alıcı gerektirir. Örneğin u-blox ZED-F9P tabanlı modüller, CubePilot Here3+ veya Septentrio Mosaic. M8N, M9N veya M10 gibi standart navigasyon modülleri RTK düzeltmelerini kullanamaz.

Source: https://docs.uavmatrix.com/tr/reference/supported-hardware/
