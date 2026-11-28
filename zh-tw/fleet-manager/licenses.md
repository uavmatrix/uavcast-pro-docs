# 許可證與席位

> UAVcast-Pro 許可證與裝置插槽如何決定您能在 Fleet Manager 中配對哪些無人機，以及如何使用以其他電子郵件購買的許可證。

Fleet Manager 已包含在您的 UAVcast-Pro 許可證中。它沒有獨立的訂閱、席位或方案。您能配對的數量，取決於您在 [UAVmatrix 商店](https://uavmatrix.com/)購買的 UAVcast-Pro 許可證：

- **無人機：** 每架已配對的無人機都執行已啟用許可證的 UAVcast-Pro。每次啟用都會占用該許可證的一個 **Device Slots**（商店中顯示為「2 of 5 device slots used」）。需要更多無人機？請購買更多許可證或插槽。**Fleet → Need more devices? → View Plans** 會帶您前往商店。
- **團隊成員：** 免費。Fleet Manager 不限制可邀請的人數，成員也不需要各自持有許可證。

> Fleet Manager 已包含在 UAVcast-Pro 許可證中。每架配對的無人機都需要一個許可證。
>
> [購買 UAVcast-Pro](https://uavmatrix.com/zh-TW/checkout) · [查看方案與價格](https://uavmatrix.com/zh-TW/products)

## 配對時 Fleet Manager 會檢查什麼

輸入配對碼時，Fleet Manager 會查找該無人機上啟用的許可證，並檢查：

1. 許可證存在、有效、未過期且未退款，並且
2. 其**擁有者電子郵件**（購買該許可證的商店帳戶）屬於您要配對進入的組織的**成員**（任何角色皆可）。

兩項皆符合時，無人機即會完成配對。每次重新配對時，Fleet Manager 都會再次檢查。

| 配對精靈中的訊息 | 含義 |
| --- | --- |
| **License is not owned by any member of this organization** | 該許可證所屬的商店帳戶電子郵件，並非本組織的成員。 |
| **License has expired** | 許可證的到期日已過。 |
| **License has been refunded** | 許可證已退款。 |
| **Invalid license key** | 商店不認得無人機上的許可證。請檢查 UAVcast-Pro 中的啟用狀態。 |

UAVcast-Pro 在請求配對碼時，也會提前檢查一次許可證。若 UAVcast-Pro 顯示 **Invalid or inactive license** 而非配對碼，表示許可證已過期、已退款，或未連結至商店帳戶。

若無人機本身的啟用發生問題，請參閱[啟用您的許可證](https://docs.uavmatrix.com/zh-tw/get-started/license-activation/)與[許可證無法啟用](https://docs.uavmatrix.com/zh-tw/troubleshooting/license-activation-failed/)。

## 誰應該擁有許可證

Fleet Manager 以電子郵件進行比對，因此請先規劃好由誰購買：

- **最簡單的方式：** 組織的 Owner 以其登入 Fleet Manager 所用的電子郵件購買所有許可證。
- **多位購買者：** 任何成員持有的許可證都會計入，包括 Viewer。負責採購的同事可以是 Viewer。
- **客戶持有的無人機：** 若許可證由客戶購買，請將客戶的商店電子郵件邀請加入您的組織（Viewer 即可）。

## 以其他電子郵件購買的許可證

常見情況是：許可證以 `purchasing@company.com` 購買，但飛行員以 `anna@company.com` 登入 Fleet Manager。配對時會失敗，並顯示 **License is not owned by any member of this organization**。

您可以用以下兩種方式解決：

1. **邀請購買用的電子郵件**加入組織。該帳戶必須登入一次以接受邀請。
2. **請 UAVmatrix 支援團隊為您的帳戶新增許可證電子郵件。** 支援團隊可以為某位 Fleet Manager 使用者新增一或多個額外電子郵件。此後，由這些電子郵件持有的許可證，在配對時都會計為該使用者的許可證，適用於該使用者所屬的每個組織。

若要申請，請從支援氣泡開啟工單（類別為 **General Inquiry**），或從您登入所用的地址寄送電子郵件至 [support@uavmatrix.com](mailto:support@uavmatrix.com)，並列出購買許可證時所用的其他電子郵件。請參閱[支援](https://docs.uavmatrix.com/zh-tw/fleet-manager/support/)。

需要注意的事項：

- 電子郵件比對不區分大小寫。
- 每個額外電子郵件只能屬於一位 Fleet Manager 使用者。
- 只有 UAVmatrix 支援團隊可以新增或移除這些電子郵件，它們不會出現在您自己的設定中。
- 許可證仍保留在原本的商店帳戶中。此設定只會改變您配對時，Fleet Manager 認定的擁有者。

## 在無人機之間移動許可證

許可證是在 UAVcast-Pro 中依裝置啟用，而不是在 Fleet Manager 中啟用。若要移動許可證，請先在 UAVcast-Pro 或商店中釋放裝置插槽，接著在新無人機上啟用，然後[配對新無人機](https://docs.uavmatrix.com/zh-tw/fleet-manager/pair-uav/)。請參閱[更換伴隨電腦](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/remove-or-transfer/#replace-the-companion-computer)。

Source: https://docs.uavmatrix.com/zh-tw/fleet-manager/licenses/
