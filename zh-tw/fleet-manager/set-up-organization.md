# 設定您的組織

> 使用您的 UAVmatrix 帳戶登入 Fleet Manager，建立無人機與團隊所屬的組織，並切換、重新命名或刪除該組織。

Fleet Manager 中的所有內容都隸屬於某個組織：無人機、任務、VPN 網路、串流綁定與團隊成員。請在配對第一架無人機之前先建立組織。

## 登入

Fleet Manager 沒有獨立的密碼。它會使用您的 UAVmatrix 帳戶登入，也就是您在 [uavmatrix.com](https://uavmatrix.com/) 購買與管理 UAVcast-Pro 授權時所用的同一個帳戶。

1. 前往 [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/)，並選擇 **Sign In**（或 **Get Started**）。
2. 在您被導向的 UAVmatrix 頁面登入。若您尚未有帳戶，請在該頁面建立。
3. 您會返回 Fleet Manager 的 **Dashboard**。

> **使用擁有您授權的電子郵件登入**
>
> Fleet Manager 只會在無人機的 UAVcast-Pro 授權由組織成員擁有（以電子郵件比對）時，才接受該無人機。使用您購買授權時的帳戶登入，可避免日後需要提出支援要求。請參閱[授權](https://docs.uavmatrix.com/zh-tw/fleet-manager/licenses/)。

個人資料（名稱、電子郵件、密碼）由您的 UAVmatrix 帳戶管理，而非在 Fleet Manager 中管理。**Settings → Profile** 會連結到該處。

## 建立組織

1. 開啟側邊欄頂部的組織切換器，並選擇 **Create organization**。若您尚未有任何組織，**Fleet** 與 **Network** 等頁面也會顯示 **No Organization Yet** 與 **Create Organization** 按鈕。
2. 輸入 **Organization Name**（2 到 50 個字元），例如您的公司名稱或「Survey Operations North」。若需要，可新增 **Description (optional)**。
3. 選擇 **Create**。

![建立組織對話框，包含 Organization Name 與 Description 欄位](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/onboarding--create-organization.webp)

*建立組織對話框，已填入公司名稱，例如 Nordic Aerial Survey AS。*

您會成為該組織的 **Owner**。Fleet Manager 也會在背景為該組織建立私有 VPN 網路。此網路會保持關閉，直到您[啟用 VPN](https://docs.uavmatrix.com/zh-tw/fleet-manager/network/)。

> **每位使用者只能擁有一個組織**
>
> 每位使用者只能建立（擁有）一個組織。若您嘗試建立第二個組織，Fleet Manager 會回覆 **You already own an organization**。您仍可在任意數量的其他組織中擔任 Admin 或 Viewer，例如客戶或合作夥伴的組織。

## 切換組織

若您屬於多個組織，側邊欄頂部的切換器會在 **Organizations** 下列出這些組織。您選擇的組織會決定 **Fleet**、**Fleet Map**、**Missions**、**Network** 與儀表板顯示的內容。Fleet Manager 會在此瀏覽器中記住您的選擇。

![側邊欄的組織切換器已展開，列出兩個組織](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/dashboard--organization-switcher.webp)

*組織切換器已展開，列出 Nordwind Aerial Services 與 Nordwind R&D Sandbox。*

## 重新命名或刪除組織

前往 **Settings → Organizations**。此分頁會列出您擔任 Owner 或 Admin 的組織。

- **重新命名或變更說明：**Owner 或 Admin。編輯 **Name** 或 **Description**，然後選擇 **Save Changes**。
- **刪除：**僅限 Owner。選擇 **Delete Organization** 並確認。這會移除所有無人機、其遙測紀錄、任務、串流綁定與團隊成員資格，且無法復原。

![Settings 的 Organizations 分頁，包含名稱、說明與 Delete Organization 按鈕](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/settings--organizations.webp)

*Owner 看到的 Settings → Organizations，包含 Save Changes 與 Delete Organization。*

> **刪除組織前請先取消配對無人機**
>
> 刪除組織不會通知無人機。它們會持續嘗試重新連線，直到您在每架無人機上於 UAVcast-Pro 中選擇 **Disconnect from Fleet**。請先從各無人機的 UAV 頁面移除無人機（請參閱[移除或轉移無人機](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/remove-or-transfer/)），讓 Fleet Manager 為您取消配對。

若要改將組織交給他人，請[轉移擁有權](https://docs.uavmatrix.com/zh-tw/fleet-manager/team/#transfer-ownership)。

## 後續步驟

- [新增第一架無人機](https://docs.uavmatrix.com/zh-tw/fleet-manager/pair-uav/)
- [邀請團隊](https://docs.uavmatrix.com/zh-tw/fleet-manager/team/)

Source: https://docs.uavmatrix.com/zh-tw/fleet-manager/set-up-organization/
