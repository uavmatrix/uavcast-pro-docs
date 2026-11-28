# 未偵測到攝影機

> UAVcast-Pro 顯示沒有可用的攝影機？請檢查 CSI 排線、rpicam-hello、Ubuntu 上的攝影機支援，以及 USB 攝影機的 v4l2-ctl。

**攝影機 → 攝影機設定**中的**選擇攝影機**顯示**沒有可用的攝影機**，您要使用的攝影機不在清單中，或**操作日誌**顯示 *No camera detected*。

| 您會看到的畫面 | 可能原因 | 從此開始 |
| --- | --- | --- |
| Raspberry Pi CSI 攝影機（排線）遺失 | 排線、連接器或攝影機驅動程式堆疊 | [檢查 1](https://docs.uavmatrix.com/zh-tw/troubleshooting/camera-not-detected/#check-1) |
| Ubuntu 上的 CSI 攝影機 | Ubuntu 預設沒有 Raspberry Pi 攝影機驅動程式堆疊 | [檢查 2](https://docs.uavmatrix.com/zh-tw/troubleshooting/camera-not-detected/#check-2) |
| USB 攝影機遺失 | Linux 未識別，或不是視訊擷取裝置 | [檢查 3](https://docs.uavmatrix.com/zh-tw/troubleshooting/camera-not-detected/#check-3) |
| 已列出攝影機，但視訊未啟動 | 不支援的解析度，或其他程式正在占用攝影機 | [檢查 4](https://docs.uavmatrix.com/zh-tw/troubleshooting/camera-not-detected/#check-4) |

## 檢查 1：Raspberry Pi CSI 攝影機

1. 關閉 Pi 電源。重新插好排線兩端，確認接點方向正確，並扣緊連接器卡榫。Pi 5 與 Pi Zero 2 W 需要較窄的 22 針排線。

2. 開機後，在 Pi 上執行：

   ```bash
   rpicam-hello --list-cameras
   ```

   在較舊的 Raspberry Pi OS 映像檔上，指令為 `libcamera-hello --list-cameras`。

3. 若此處未列出攝影機，代表 Linux 無法識別它。請先嘗試更換排線或攝影機，再變更 UAVcast-Pro 中的任何設定。

4. 若已列出，請在攝影機頁面重新啟動攝影機（**重啟**，或先按**停止**再按**啟動**），然後重新開啟**選擇攝影機**。每台 CSI 攝影機都會顯示為獨立項目，例如 *CSI Camera 0 - imx708 (libcamera)*。

> **兩台 CSI 攝影機**
>
> 使用兩台攝影機時，攝影機驅動程式需要更多記憶體。自 v6.2.2 起，安裝程式會在多攝影機設定中自動提高 `config.txt` 中的 CMA 記憶體。若您是之後才加裝第二台攝影機，請在安裝後重新開機。

## 檢查 2：Ubuntu 或 Debian 上的 CSI 攝影機

UAVcast-Pro 使用 `rpicam-vid` 處理 CSI 攝影機。安裝程式會在 Raspberry Pi OS 與 Debian 上安裝 `rpicam-apps`（或 `rpicam-apps-core`）。Ubuntu 並未封裝 Raspberry Pi 攝影機驅動程式堆疊，因此日誌會顯示 *CSI camera not available: Ubuntu requires building libcamera from source. USB cameras are supported.*（Ubuntu 需要從原始碼建置 libcamera，USB 攝影機則受支援。）

若您需要 CSI 攝影機，請使用 64 位元的 Raspberry Pi OS；若使用 Ubuntu，請改用 USB 攝影機。

## 檢查 3：USB 攝影機

1. 將攝影機直接插入伴隨電腦，不要透過未供電的集線器。

2. 執行：

   ```bash
   v4l2-ctl --list-devices
   ```

3. 若攝影機遺失，代表 Linux 未識別它。請檢查 `lsusb`，並嘗試其他連接埠與傳輸線。

4. 若已列出，請在攝影機頁面按下**重啟**，然後重新開啟**選擇攝影機**。

大多數 UVC 網路攝影機皆可使用，例如 Logitech C920 與 C615。僅輸出編碼器無法處理之格式的攝影機，或不是視訊擷取裝置的裝置（部分擷取卡），則不會列出。

## 檢查 4：已列出，但視訊未啟動

- 若日誌顯示 *Camera … does not support …x… - streaming at …x… instead*，請在**解析度**中選擇攝影機支援的解析度。
- 關閉其他使用攝影機的程式。同一時間只有一個程式能開啟攝影機。
- 若**啟用攝影機？**顯示 *Insufficient permissions*（權限不足），請更新至 v6.5.2 或更新版本，該版本已修正此問題。

## 仍然未偵測到？

請[下載日誌](https://docs.uavmatrix.com/zh-tw/troubleshooting/collect-logs/)，並選取**所有日誌**，再加上 `rpicam-hello --list-cameras` 或 `v4l2-ctl --list-devices` 的輸出，然後將所有內容寄送至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**。

相關頁面：[攝影機設定](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/) · [支援的硬體](https://docs.uavmatrix.com/zh-tw/reference/supported-hardware/)

Source: https://docs.uavmatrix.com/zh-tw/troubleshooting/camera-not-detected/
