# 資料流

> 為任何 MAVLink 欄位或 NAMED_VALUE_FLOAT 感測器數值，建立含圖表、儀表與方塊的 UAVcast-Pro 資料流儀表板，並支援門檻值、歷史記錄與 JSON 匯入／匯出。

資料流可讓您建立自己的即時遙測儀表板。您可以新增數值方塊、折線圖、儀表、長條與狀態燈，並將每一個元件綁定到飛行控制器傳送的任何 MAVLink 數值，或來自感測器或[注入器](https://docs.uavmatrix.com/zh-tw/uavcast-pro/flight-controller/injectors/)的任何 `NAMED_VALUE_FLOAT` 訊號。儀表板儲存在無人機上，因此所有開啟網頁介面的人都會看到相同的儀表板。請在側邊欄開啟 **Data Streams**（資料流）。

常見用途：為酬載操作者提供含感測器讀數的畫面、以 RSRP 與 SINR 顯示 LTE 連線狀態的面板，或在長時間飛行時使用的電池與電源面板。

![資料流頁面，顯示 No dashboards yet 與 Create dashboard 按鈕](https://docs.uavmatrix.com/zh-tw/img/screenshots/uavcast-pro/mission-data.webp)

*建立第一個儀表板之前的資料流頁面：按一下 Create dashboard 即可開始建立。*

## 建立儀表板

1. 選擇 **Create dashboard**（若已有儀表板，則選擇 **New dashboard**），輸入 **Name**（名稱），然後選擇 **Create**。
2. 選擇 **Edit** 進入編輯模式，接著選擇 **Add widget**（新增元件），並挑選一種類型。
3. 在 **Source**（來源）分頁中搜尋訊號並加以選取。綠色圓點表示已開始接收取樣資料。
4. 在 **Display**（顯示）中設定標題、單位與小數位數，在 **Range**（範圍）中設定上下限與色彩門檻值，並在 **Chart**（圖表）中設定圖表選項。然後選擇 **Save**（儲存）。
5. 拖曳並調整元件大小，然後選擇 **Done**（完成）。

只有管理員可以建立及編輯儀表板。唯讀使用者可以檢視。

## 元件類型

| 類型 | 顯示內容 |
| --- | --- |
| **Numeric tile**（數值方塊） | 目前數值，以大字型顯示，可選擇加上前綴與後綴。 |
| **Sparkline**（迷你趨勢圖） | 數值下方的小型趨勢線。 |
| **Line chart**（折線圖） | 一或多個訊號在某段時間範圍內的變化。 |
| **Gauge**（儀表） | 以圓形刻度顯示數值，並帶有彩色門檻值。 |
| **Bar indicator**（長條指示器） | 以最小值與最大值之間的長條顯示數值。 |
| **Status**（狀態） | 依門檻值顯示的彩色狀態，例如 OK／警告／警報。 |
| **Named-value table**（具名數值表） | 每個 `NAMED_VALUE_FLOAT` 訊號，包含 **Value**（數值）、**Age**（時效）與 **Src**（來源）。**Filter**（篩選）接受子字串或 `*.glob`。 |

當超過 5 秒未收到取樣時，元件會顯示 **Stale**（過時）；若該訊號從未出現過，則顯示 *No samples yet*（尚無取樣）。

## 訊號

- **MAVLink 欄位**：飛行控制器傳送的每個數值欄位（姿態、VFR HUD、電池、GPS、起始點、RTK、故障保護、心跳與狀態值）都會自動出現，並在已知時顯示易讀的名稱與單位。
- **具名數值**：`NAMED_VALUE_FLOAT` 訊號，以 `NAME@sysid:compid` 格式顯示，例如 `LTE_RSRP@1:194`。

您可以輸入尚未傳送的訊號，並按下 Enter 將其加入，因此可以在接上感測器之前先建立儀表板。在已選取的來源上使用鉛筆圖示，即可為其設定顯示名稱。

## 圖表選項

| 選項 | 可用值 |
| --- | --- |
| **Window**（時間範圍） | **1 min**、**5 min**、**15 min**、**1 hour**，或 **Custom (seconds)**（自訂，單位為秒） |
| **Curve**（曲線） | **Linear**（線性）、**Smooth (monotone)**（平滑）、**Step**（階梯）、**Step before**（前階梯）、**Step after**（後階梯）、**Basis spline**（基底樣條） |
| 其他 | **Show legend**（顯示圖例）、**Show grid**（顯示格線）、**Line width**（線寬）、**Area fill**（區域填色）、**Show data points**（顯示資料點）、**Threshold reference lines**（門檻參考線）、**Y-axis label**（Y 軸標籤） |

## 歷史記錄

UAVcast-Pro 會在無人機上保存每個訊號的短期歷史記錄（每個訊號最多 3600 筆取樣，以 1 Hz 計約為一小時），因此即使重新整理頁面，開啟儀表板時圖表也會立即填滿資料。

## 分享儀表板

- **Export JSON**（匯出 JSON）會將儀表板複製到剪貼簿。
- **Import JSON**（匯入 JSON）會從貼上的 JSON 建立儀表板。可用來將儀表板複製到另一架無人機。
- **Duplicate**（複製）與 **Rename**（重新命名）位於工具列中；**Delete**（刪除）會移除儀表板及其元件。
- **Fullscreen**（全螢幕）會隱藏介面的其餘部分，適合在專用螢幕上使用。

Source: https://docs.uavmatrix.com/zh-tw/uavcast-pro/data-streams/
