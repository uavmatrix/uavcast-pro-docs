# 邀請團隊

> 以電子郵件邀請飛行員、操作人員與客戶加入您的 Fleet Manager 組織、變更角色、撤銷邀請，以及轉移擁有權。

每位成員都使用自己的 UAVmatrix 帳戶登入，並在您的組織中取得一個角色：**Admin** 或 **Viewer**（Owner 只有一位）。Fleet Manager 不限制成員數量，且成員不會佔用授權。請參閱[角色與權限](https://docs.uavmatrix.com/zh-tw/fleet-manager/team/roles-and-permissions/)，了解每個角色的確切權限。

所有操作都在 **Team** 頁面進行（頁面標題為 **Team Management**）。Owner 與 Admin 可以管理成員；Viewer 只能查看成員清單。

![Team Management 頁面，列出組織成員、角色與待處理邀請](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/team.webp)

*操作人員的 Team Management 頁面，共 13 位成員：1 位 Owner、4 位 Admin 與 8 位 Viewer。*

## 邀請成員

1. 在 **Team** 中，選擇 **Invite Member**。
2. 在 **Invite Team Member** 中，輸入對方的 **Email Address**，選擇 **Organization**（若您管理多個組織），並選擇 **Role**：**Admin** 或 **Viewer**。
3. 選擇 **Send Invitation**。

![Invite Team Member 對話框，包含電子郵件、組織與角色欄位](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/team--invite.webp)

*Invite Team Member 對話框，Role 設為 Viewer，適用於客戶聯絡人。*

Fleet Manager 會寄出邀請連結。在對方接受之前，邀請會列在 **Pending Invitations** 下，且有效期為 **7 天**。若某電子郵件已有待處理的邀請，您無法再寄送第二次邀請：請先撤銷舊的邀請。

> **使用對方購買授權時的電子郵件發出邀請**
>
> 若此人擁有您想配對的無人機之 UAVcast-Pro 授權，請使用其在 UAVmatrix 商店中所用的同一電子郵件發出邀請。Fleet Manager 會以電子郵件比對授權擁有者與成員。請參閱[授權](https://docs.uavmatrix.com/zh-tw/fleet-manager/licenses/)。

## 接受邀請

受邀者會開啟電子郵件中的連結。邀請頁面會顯示組織、**Invitation sent to**，以及 **Your role** 與其簡短說明。

- 已登入：選擇 **Accept Invitation**。
- 未登入：在 **Sign in to accept this invitation** 下選擇 **Sign In**。新使用者請選擇 **Create Account**，這會開啟已填入該電子郵件的 UAVmatrix 註冊頁面，完成後再回到邀請頁面。

![邀請頁面，包含組織名稱、受邀電子郵件、角色說明與 Accept Invitation 按鈕](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/invite.webp)

*受邀者看到的邀請頁面：Your role 為 Viewer，具有檢視無人機與機隊資料的唯讀權限，並可選擇 Accept Invitation。*

若頁面顯示 **Invitation Expired**、**Invitation Already Used** 或 **Already a Member**，請向 Owner 或 Admin 索取新的邀請，或直接登入。

## 變更成員角色

開啟成員旁的選單，然後選擇 **Change Role → Admin** 或 **Viewer**。變更會立即生效；對方可能需要重新載入頁面才能看到變更。Admin 可以變更其他 Admin 的角色。任何人都無法變更 Owner 的角色：請改為[轉移擁有權](https://docs.uavmatrix.com/zh-tw/fleet-manager/team/#transfer-ownership)。

![成員操作選單，包含 Change Role、Transfer Ownership 與 Remove Member](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/team--member-menu.webp)

*Owner 開啟的成員選單，顯示 Change Role、Transfer Ownership 與 Remove Member。*

## 移除成員或撤銷邀請

- **移除成員：**開啟該成員的選單並選擇 **Remove Member**。對方會立即失去存取權。Owner 無法被移除。
- **撤銷邀請：**在 **Pending Invitations** 下選擇 **Revoke**。連結會立即失效。

> **沒有確認步驟**
>
> **Remove Member** 與 **Transfer Ownership** 一經選擇就會立即生效。點擊前請先確認名稱。

移除成員不會影響無人機。但若該人員擁有您之後想配對的無人機之授權，在對方重新成為成員之前，這些無人機的配對都會失敗。

## 轉移擁有權

只有 Owner 可以執行此操作。開啟應接任者的成員選單，並選擇 **Transfer Ownership**。該成員會成為 **Owner**，而您會成為 **Admin**。

當組織的建立者離開，或您要刪除 UAVmatrix 帳戶之前，請使用此功能：Fleet Manager 不會刪除仍擁有組織的帳戶。

## 與客戶及合作夥伴合作

使用者可以是任意數量組織的成員，且在每個組織中可以有不同的角色。常見的設定如下：

- **服務供應商：**您的員工是您組織中的 Admin。每位客戶都會取得 Viewer 角色，以便在地圖上即時追蹤其飛行。
- **轉包商：**合作夥伴邀請您的飛行員以 Admin 身分加入其組織。您的飛行員可透過組織切換器在兩個組織之間切換。

Source: https://docs.uavmatrix.com/zh-tw/fleet-manager/team/
