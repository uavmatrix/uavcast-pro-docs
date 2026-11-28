# 網頁介面無法開啟

> 安裝後無法開啟 http://device-ip 的 UAVcast-Pro？請找出正確位址，並檢查 uavcast-web 服務、伺服器連接埠與連接埠 80。

安裝程式已完成，但 `http://<device-ip>/` 逾時、連線遭拒，或顯示其他程式的頁面。

| 您會看到的畫面 | 可能原因 | 從此開始 |
| --- | --- | --- |
| 逾時，或頁面始終無法載入 | 位址錯誤，或您的電腦位於另一個網路 | [檢查 1](https://docs.uavmatrix.com/zh-tw/troubleshooting/web-interface-wont-open/#check-1) |
| 連線遭拒 | 網頁服務未執行 | [檢查 2](https://docs.uavmatrix.com/zh-tw/troubleshooting/web-interface-wont-open/#check-2) |
| 出現其他網頁，例如 nginx 或 Apache | 其他程式正在使用連接埠 80 | [檢查 3](https://docs.uavmatrix.com/zh-tw/troubleshooting/web-interface-wont-open/#check-3) |
| 先前正常，變更設定後停止 | 伺服器連接埠已變更 | [檢查 4](https://docs.uavmatrix.com/zh-tw/troubleshooting/web-interface-wont-open/#check-4) |
| 頁面可載入，但每個頁面都會跳到應用程式 | 尚未啟用授權 | [檢查 5](https://docs.uavmatrix.com/zh-tw/troubleshooting/web-interface-wont-open/#check-5) |

## 檢查 1：使用正確的位址

網頁介面預設使用**連接埠 80**，因此位址就是 `http://<device-ip>/`。

1. 找到裝置 IP。安裝程式會在結束時印出它。您也可以在裝置上執行 `hostname -I`。
2. 在使用預設主機名稱的 Raspberry Pi 上，請嘗試 `http://raspberrypi.local/`。
3. 請使用 `http://`，而非 `https://`。網頁介面不提供 HTTPS。
4. 請確認您的電腦與裝置位於同一個網路，或同一個 VPN。透過 4G 時，您必須使用無人機的 VPN 位址。

## 檢查 2：網頁服務是否正在執行？

在裝置上執行：

```bash
sudo systemctl status uavcast-web
```

應顯示 **active (running)**。若沒有，請啟動它並查看停止的原因：

```bash
sudo systemctl restart uavcast-web
journalctl -u uavcast-web --since "1 hour ago"
```

網頁介面也需要背景服務。請以相同方式檢查：`uavcast-factory`、`mavlink-manager`、`uavcast-camera` 與 `redis-server`。完整清單請見[服務與檔案](https://docs.uavmatrix.com/zh-tw/reference/services-and-files/)。

## 檢查 3：連接埠 80 已被使用

若裝置上安裝了另一個網頁伺服器，它可能佔用了連接埠 80。請找出是哪個程式在監聽：

```bash
sudo ss -ltnp | grep ':80 '
```

請停止並停用另一個伺服器（例如：`sudo systemctl disable --now nginx`），然後重新啟動 `uavcast-web`。

## 檢查 4：伺服器連接埠已變更

**應用程式 → 設定 → 伺服器連接埠**會將網頁介面移到其他連接埠，此時位址會變為 `http://<device-ip>:<port>/`。若您忘記了連接埠，請在裝置上讀取：

```bash
grep SERVER_PORT /etc/systemd/system/uavcast-web.service
```

## 檢查 5：每個頁面都跳到應用程式

在裝置上啟用授權之前，這是預期的行為。請在**應用程式 → 許可證管理器**中啟用授權。若失敗，請參閱 [UAVcast-Pro 授權無法啟用](https://docs.uavmatrix.com/zh-tw/troubleshooting/license-activation-failed/)。

## 檢查 6：安裝程式未完成

若 `uavcast-web` 不存在（`Unit uavcast-web.service could not be found`），表示安裝提前中止。請參閱 [UAVcast-Pro 安裝失敗](https://docs.uavmatrix.com/zh-tw/troubleshooting/installation-fails/)。

## 仍然無法解決？

請將 `systemctl status uavcast-web` 與 `journalctl -u uavcast-web --since yesterday` 的輸出，以及 `/opt/uavcast-pro/installer.log`，寄送至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**。

相關頁面：[在 Raspberry Pi、Debian 或 Ubuntu 上安裝 UAVcast-Pro](https://docs.uavmatrix.com/zh-tw/get-started/installation/) · [UAVcast-Pro 應用程式設定、日誌與資料庫備份](https://docs.uavmatrix.com/zh-tw/uavcast-pro/application-settings/)

Source: https://docs.uavmatrix.com/zh-tw/troubleshooting/web-interface-wont-open/
