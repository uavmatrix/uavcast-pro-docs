# 飛行歷史紀錄

> 在 Fleet Manager 地圖上回放無人機的飛行紀錄，查看飛行時間、最大高度與速度，儲存具名飛行，並設定遙測保留期限。

Fleet Manager 會在無人機連線期間，每秒記錄一次其遙測資料：位置、高度、速度、航向、電池、飛行模式、解鎖狀態與 GPS。**飛行歷史紀錄**功能會在地圖上回放這段紀錄。

## 開啟無人機的歷史紀錄

在 **Fleet Map** 上選取無人機的標記，然後在彈出視窗中選取 **History**。地圖底部會開啟 ***name* - Flight History** 抽屜。

![地圖下方的飛行歷史紀錄抽屜，包含工作階段選擇器、播放控制、統計資料與回放的飛行路徑](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/map--history.webp)

*某檢測無人機的飛行歷史紀錄：已選取已儲存的飛行 Turbine blade inspection，播放速度為 4x，並顯示 Duration、Max Alt、Max Speed 與 Avg Battery。*

## 選擇工作階段

**Select flight session** 會列出：

1. 優先顯示 **Saved flights**（帶有書籤圖示），即您的團隊已命名的飛行。
2. 接著依**日期**列出過去 30 天內有遙測紀錄的每一天，每天一個項目。

同一天的所有遙測會歸為一個工作階段，因此同一天內的多次飛行會顯示為一個項目。若要快速找回特定片段，請將您關心的部分儲存為具名飛行。

## 回放

- 可播放與暫停、以工作階段的 5 % 為單位前進或後退，或跳至開頭或結尾。拖曳時間軸即可定位。
- 播放速度：**0.5x**、**1x**（即時）、**2x**、**4x**、**8x**、**10x** 與 **20x**。
- 鍵盤操作：**Space** 播放／暫停，**←** / **→** 逐步移動，**Esc** 關閉。

在地圖上，綠色的 **Start** 與紅色的 **End** 標記會框出整段飛行。已播放的部分以青色繪製，其餘以灰色虛線表示，並有一個標示高度的無人機圖示沿路徑移動。

統計面板會顯示 **Duration**、**Max Alt**、**Max Speed** 與 **Avg Battery**，**Current Position** 則會顯示播放位置的 **Alt**、**Speed**、**Heading** 與 **Mode**。

## 儲存、重新命名與刪除飛行

Owner 與 Admin 可以儲存、重新命名與刪除具名飛行。Viewer 可以回放。

- **Save and name this flight** 會以名稱儲存目前的時間範圍（最多 100 個字元），例如「Field A 區域測繪」。兩個已儲存的飛行不能重疊：**A saved session already exists for this time range**。
- **Rename flight** 可變更名稱。
- **Delete saved flight** 只會移除名稱。**Delete Saved Flight?** 會說明遙測資料本身不會被刪除。

## 歷史紀錄的保存時間

Owner 與 Admin 可在 **Settings → History**（**Telemetry History**）中為每個組織設定保留期限：

- **Retention**：7、14、30、60 或 90 天、**6 months** 或 **1 year**。預設值與最大值皆為 1 年。
- **Prune Now** 會立即刪除超過 7、14、30、60 或 90 天的資料（預設為 30 天），並需先確認 **Prune Old History**。
- **Delete Drone History**（每架無人機旁的垃圾桶圖示）或 **Select All** → **Delete Selected (n)**，可清除所選無人機的歷史紀錄。
- 卡片會顯示 **Storage Used**、**Total Records** 與 **Retention**。

Fleet Manager 每天會移除超過保留期限的資料。超過 7 天的資料會被壓縮，因此即使大型車隊保存一年的歷史紀錄，仍然實用。

![Settings 中的 History 分頁，包含保留期限選擇器、清除選項與各無人機的歷史紀錄清單](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/settings--history.webp)

*某組織（46 架無人機）的 Settings → History：Storage Used、Total Records、Retention 為 90 天，以及每架無人機的清單與刪除按鈕。*

> **不匯出紀錄**
>
> Fleet Manager 不會將飛行歷史紀錄匯出為檔案，也不會儲存影片或飛行控制器紀錄（`.tlog`、DataFlash）。請從您的地面站軟體或飛行控制器的 SD 卡保留這些資料。關於無人機上的影片錄製，請參閱[錄製與飛行回放](https://docs.uavmatrix.com/zh-tw/guides/recording-flight-review/)。

移除無人機會刪除其完整歷史紀錄，包括已儲存的飛行。請參閱[移除或轉移無人機](https://docs.uavmatrix.com/zh-tw/fleet-manager/fleet/remove-or-transfer/)。

Source: https://docs.uavmatrix.com/zh-tw/fleet-manager/map/flight-history/
