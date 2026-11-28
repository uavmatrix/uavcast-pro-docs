# UAVcast-Pro 授權無法啟用

> 修正 UAVcast-Pro 中的 Invalid license key、Maximum activations reached 與 License activation failed：檢查金鑰、網際網路、可用名額與已更換的硬體。

您在**應用程式 → 許可證管理器**中輸入金鑰，按下**驗證**，卻出現錯誤，而非顯示「授權已成功啟用」。在此裝置上啟用授權之前，每個頁面都會將您導回**應用程式**。

> 啟動無人機需要 UAVcast-Pro 許可證。請在 UAVmatrix 商店購買。
>
> [購買 UAVcast-Pro](https://uavmatrix.com/zh-TW/checkout) · [查看方案與價格](https://uavmatrix.com/zh-TW/products)

![應用程式頁面的許可證管理器，包含授權金鑰欄位、授權詳細資料與已啟動設備表格](https://docs.uavmatrix.com/zh-tw/img/screenshots/uavcast-pro/application--license-activated.webp)

*裝置已啟用授權時的應用程式 → 許可證管理器：授權詳細資料與已啟動設備表格，此裝置標示為當前。*

| 您會看到的畫面 | 可能原因 | 從此開始 |
| --- | --- | --- |
| 無效的授權金鑰，或授權金鑰格式無效 | 輸入錯誤、多餘的空白，或是其他產品的金鑰 | [檢查 1](https://docs.uavmatrix.com/zh-tw/troubleshooting/license-activation-failed/#check-1) |
| 已達到啟用上限 | 此金鑰上的所有裝置名額都已使用 | [檢查 2](https://docs.uavmatrix.com/zh-tw/troubleshooting/license-activation-failed/#check-2) |
| 先前可用，但更換 SD 卡或新開發板後又要求重新啟用 | 裝置被視為新裝置 | [檢查 3](https://docs.uavmatrix.com/zh-tw/troubleshooting/license-activation-failed/#check-3) |
| 授權啟用失敗，或沒有任何反應 | 沒有網際網路，或裝置時間錯誤 | [檢查 4](https://docs.uavmatrix.com/zh-tw/troubleshooting/license-activation-failed/#check-4) |
| 無法連線至授權服務 | UAVcast-Pro 背景服務未執行 | [檢查 5](https://docs.uavmatrix.com/zh-tw/troubleshooting/license-activation-failed/#check-5) |
| 授權狀態：已過期 | 有期限的授權已到期 | [檢查 6](https://docs.uavmatrix.com/zh-tw/troubleshooting/license-activation-failed/#check-6) |

## 檢查 1：金鑰本身

1. 從訂單電子郵件或您在 [uavmatrix.com](https://uavmatrix.com/) 上的帳戶複製金鑰，並貼到**授權金鑰**欄位中。手動輸入是最常見的錯誤來源。
2. 確認金鑰前後沒有空白。
3. 按下**驗證**。

## 檢查 2：釋出裝置名額

每個授權允許固定數量的裝置（**允許設備數**）。當**剩餘設備數**為 0 時，啟用會失敗，並顯示 **已達到啟用上限。請先停用其他裝置，或升級您的授權。**

1. 在任一已啟用此授權的裝置上，開啟**應用程式 → 許可證管理器 → 已啟動設備**。
2. 找到您不再使用的裝置，然後按下**註銷**。名額會立即釋出。
3. 啟用新裝置。

若您無法連線到任何已啟用的裝置，請將授權金鑰寄送至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**，我們可以為您釋出名額。若要增加名額，請在 [uavmatrix.com](https://uavmatrix.com/) 為此授權購買更多裝置。

## 檢查 3：您更換了 SD 卡或開發板

授權與硬體綁定，包括儲存裝置。全新的 SD 卡、新的 SSD 或新的開發板都會被視為新裝置，並佔用一個新的名額。請依照檢查 2 的方式，在移動前後於**已啟動設備**中註銷舊的項目。**此裝置已啟用授權**並不是錯誤：代表此金鑰已在這裡啟用。

## 檢查 4：網際網路連線與時間

啟用時會透過 HTTPS（連接埠 443）連線至 UAVmatrix 授權伺服器，因此裝置在啟用當下需要可用的網際網路連線。

1. 在裝置上執行 `curl -I https://uavmatrix.com`。您應該會收到 HTTP 回應，而非逾時。
2. 若您使用行動數據機，請確認它確實有網際網路連線：[數據機已連線但無網路](https://docs.uavmatrix.com/zh-tw/troubleshooting/modem-no-internet/)。
3. 使用 `date` 檢查日期。時鐘錯誤的裝置無法開啟 HTTPS 連線。沒有即時時鐘的開發板會在開機後從網際網路設定時間，因此請在開機後等待一分鐘再重試。

## 檢查 5：無法連線至授權服務

此訊息代表網頁介面無法連線至 UAVcast-Pro 自身的背景服務，而非網際網路。請重新啟動該服務後再試一次：

```bash
sudo systemctl restart uavcast-factory
sudo systemctl status uavcast-factory
```

若服務未能持續保持 **active (running)**，請在選取**許可證管理器**的情況下[收集日誌](https://docs.uavmatrix.com/zh-tw/troubleshooting/collect-logs/)。

## 檢查 6：授權已到期

授權詳細資料會顯示**許可證狀態：**與**過期日期：**。已到期的授權必須在 [uavmatrix.com](https://uavmatrix.com/) 續約。

> **64 位元作業系統**
>
> UAVcast-Pro v6 只能在 64 位元作業系統上執行。若您已經執行到這一步，代表作業系統沒有問題；若是 32 位元作業系統，安裝程式早已因 *No installation candidate* 而停止。

## 仍然失敗？

請在選取**許可證管理器**的情況下[下載日誌](https://docs.uavmatrix.com/zh-tw/troubleshooting/collect-logs/)。日誌中包含授權伺服器的回應代碼，例如沒有可用名額時的 `code 550`。請將日誌連同您金鑰的前四個與後四個字元一併寄送至 **[support@uavmatrix.com](mailto:support@uavmatrix.com)**。

若使用 Fleet Manager，即使授權能成功啟用，配對時仍可能遭到拒絕。請參閱[配對碼無效或已過期](https://docs.uavmatrix.com/zh-tw/troubleshooting/pairing-code-invalid/)。

相關頁面：[啟用您的授權](https://docs.uavmatrix.com/zh-tw/get-started/license-activation/)

Source: https://docs.uavmatrix.com/zh-tw/troubleshooting/license-activation-failed/
