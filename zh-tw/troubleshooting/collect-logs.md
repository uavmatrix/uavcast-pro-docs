# 為支援收集日誌

> 從應用程式的日誌功能或透過 SSH 下載包含 diagnostics.txt 的 UAVcast-Pro 日誌壓縮檔，並附上正確資訊寄送給 UAVmatrix 支援團隊。

一次日誌下載即可回答支援人員通常會詢問的大部分問題。每個壓縮檔都包含您選擇的服務日誌，以及 `diagnostics.txt` 快照：版本、作業系統與開發板、設定、產生的遙測路由器設定、序列裝置及占用這些裝置的程序，以及核心的電源與 USB 事件。密碼、金鑰與權杖皆不會被包含在內。

## 從網頁介面下載

1. 前往**應用程式**，捲動至**日誌**。
2. 在第一個清單中保留**所有日誌**，或選擇與問題相符的服務（見下表）。
3. 在第二個清單中，選擇涵蓋問題發生時段的時間範圍。預設為**最近 2 小時**。
4. 按下**下載**。瀏覽器會儲存一個 `.zip` 檔案。

![應用程式頁面的日誌卡片，日誌清單設為所有日誌，時間範圍設為最近 2 小時，並顯示下載按鈕](https://docs.uavmatrix.com/zh-tw/img/screenshots/uavcast-pro/application--logging.webp)

*應用程式 → 日誌，已選取所有日誌與最近 2 小時。*

| 問題 | 在日誌清單中選擇 |
| --- | --- |
| 飛行控制器連線、沒有心跳、沒有遙測 | **Mavlink管理器** |
| 攝影機、視訊、預覽 | **攝影機伺服器** |
| 數據機、行動網路 | **數據機管理器** |
| ZeroTier、Tailscale | **VPN管理器** |
| RTK、NTRIP | **NTRIP 用戶端** |
| 授權 | **許可證管理器** |
| 動態 DNS | **DNS管理器** |
| 安裝 | **應用安裝程式** |
| 不確定 | **所有日誌** |

只有管理員可以下載日誌。**清除所有日誌**會刪除每一個日誌檔案，且無法復原，因此請先下載。

## 從命令列

若網頁介面無法開啟，請透過 SSH 收集日誌：

```bash
sudo tar czf ~/uavcast-logs.tar.gz /opt/uavcast-pro/logs /opt/uavcast-pro/installer.log
journalctl -u uavcast-web -u uavcast-factory -u mavlink-manager -u uavcast-camera --since "2 hours ago" > ~/uavcast-journal.txt
```

將這兩個檔案複製到您的電腦，例如使用 `scp`。

## 寄送給支援團隊

請寄送電子郵件至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**，並附上：

- 日誌壓縮檔，
- 您的 UAVcast-Pro 版本（顯示於側邊欄底部），
- 您使用的開發板、作業系統、飛行控制器、攝影機與數據機，
- 您預期的結果、實際發生的情況，以及您已依照本頁面嘗試過的步驟。

您也可以在 [UAVmatrix Discord](https://discord.gg/xwqMTXh) 中提問。請勿公開張貼日誌檔案，因為其中包含 IP 位址與裝置名稱。

相關頁面：[應用程式設定](https://docs.uavmatrix.com/zh-tw/uavcast-pro/application-settings/)

Source: https://docs.uavmatrix.com/zh-tw/troubleshooting/collect-logs/
