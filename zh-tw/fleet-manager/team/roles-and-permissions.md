# 角色與權限

> Fleet Manager 的 Owner、Admin 與 Viewer 角色的完整權限矩陣：配對、飛行指令、終端機、任務、VPN 與團隊。

Fleet Manager 有三種角色，依組織設定。同一個人可以在一個組織中擔任 Admin，同時在另一個組織中擔任 Viewer。

| 角色 | 簡述 |
| --- | --- |
| **Owner** | 擁有 Admin 可執行的所有操作，外加刪除組織與轉移擁有權。每個組織只有一位：建立組織的人，或擁有權被轉移給的人。 |
| **Admin** | 負責管理機隊：配對與移除無人機、傳送指令、開啟終端機、規劃與上傳任務、管理 VPN 與串流綁定，以及管理團隊。 |
| **Viewer** | 唯讀。可查看儀表板、機隊、即時地圖、飛行歷史、任務、網路與團隊，但無法變更或控制任何項目。 |

新成員會以 Admin 或 Viewer 身分受邀。Owner 角色只能透過[轉移擁有權](https://docs.uavmatrix.com/zh-tw/fleet-manager/team/#transfer-ownership)交接。

## 權限矩陣

此矩陣來自 Fleet Manager 在伺服器端強制執行的權限規則，因此隱藏的按鈕絕不會是唯一的阻擋機制。

| 操作 | Owner | Admin | Viewer |
| --- | --- | --- | --- |
| **機隊與無人機** |  |  |  |
| 查看儀表板、機隊清單、UAV 頁面與即時地圖 | ✓ | ✓ | ✓ |
| 觀看飛行歷史回放 | ✓ | ✓ | ✓ |
| 儲存、重新命名與刪除具名飛行 | ✓ | ✓ | – |
| 配對無人機（**Pair Device**） | ✓ | ✓ | – |
| 重新命名無人機、變更其地圖顏色 | ✓ | ✓ | – |
| 移除無人機 | ✓ | ✓ | – |
| **指令** |  |  |  |
| 變更飛行模式、RTL、Loiter、Circle | ✓ | ✓ | – |
| 解鎖、上鎖、強制解鎖 | ✓ | ✓ | – |
| 飛行前校準 | ✓ | ✓ | – |
| 在無人機上啟動、停止與讀取任務 | ✓ | ✓ | – |
| 重新啟動或關閉伴隨電腦 | ✓ | ✓ | – |
| UAV 頁面上的 SSH **Terminal** | ✓ | ✓ | – |
| **Open via Proxy**（透過 Fleet Manager 開啟 UAVcast-Pro 網頁介面） | ✓ | ✓ | – |
| **任務** |  |  |  |
| 查看已儲存的任務 | ✓ | ✓ | ✓ |
| 建立、編輯與刪除任務 | ✓ | ✓ | – |
| **Upload to Drone**（上傳到無人機） | ✓ | ✓ | – |
| **網路與 VPN** |  |  |  |
| 查看 Network 頁面、裝置與串流綁定 | ✓ | ✓ | ✓ |
| 查看 VPN 驗證金鑰與 **GCS Connection Command** | ✓ | ✓ | – |
| 啟用 VPN、產生驗證金鑰、**Push to Drone** | ✓ | ✓ | – |
| 重新命名、變更類型或移除 VPN 裝置 | ✓ | ✓ | – |
| 新增、暫停或移除串流綁定 | ✓ | ✓ | – |
| 刪除 VPN 網路 | ✓ | ✓ | – |
| **團隊** |  |  |  |
| 查看成員與角色 | ✓ | ✓ | ✓ |
| 邀請成員（以 Admin 或 Viewer 身分） | ✓ | ✓ | – |
| 變更成員角色（Owner 除外） | ✓ | ✓ | – |
| 移除成員（Owner 除外），撤銷邀請 | ✓ | ✓ | – |
| 轉移擁有權 | ✓ | – | – |
| **組織與設定** |  |  |  |
| 重新命名組織、編輯其說明 | ✓ | ✓ | – |
| 變更遙測保留期限、清除或刪除歷史紀錄 | ✓ | ✓ | – |
| 刪除組織 | ✓ | – | – |
| **所有人** |  |  |  |
| 使用 FleetBot、建立與關閉自己的支援工單 | ✓ | ✓ | ✓ |
| 編輯自己的個人資料（在 UAVmatrix 帳戶中） | ✓ | ✓ | ✓ |

> **Admin 可以管理其他 Admin**
>
> Admin 可以邀請新的 Admin、將其他 Admin 降為 Viewer，以及移除其他 Admin。請只將 Admin 角色交給您信任能管理整個機隊的人。Owner 是 Admin 唯一無法變更的成員。

> **Viewer 看到的內容**
>
> Viewer 看到的頁面與其他角色相同，只是沒有控制項。UAV 控制面板會向 Viewer 顯示即時狀態與記錄，但不會顯示飛行模式、任務或解鎖按鈕，也沒有 Terminal 分頁。在 **Network** 頁面上，Viewer 看不到 VPN 驗證金鑰：*Only Owners and Admins can see the VPN auth key.* Fleet Manager 也會在伺服器端檢查每個指令，因此 Viewer 無法以其他方式傳送指令。

## 為商業機隊選擇角色

| 人員 | 建議角色 |
| --- | --- |
| 機隊或營運主管 | Owner（僅一人） |
| 飛行員、技術人員、負責配對新機身的人員 | Admin |
| 即時追蹤其工作的客戶、管理階層、稽核人員 | Viewer |
| 需要飛行您無人機的外包人員 | Admin，工作結束後移除 |

## 非角色：超級管理員

UAVmatrix 員工在所有組織中擁有獨立的支援角色。此角色用於支援工作，例如為帳戶[新增額外的授權電子郵件](https://docs.uavmatrix.com/zh-tw/fleet-manager/licenses/#licenses-bought-with-another-email)。它不屬於您的組織，也無法被指派。

Source: https://docs.uavmatrix.com/zh-tw/fleet-manager/team/roles-and-permissions/
