# 飛行分析

> 在 UAVcast-Pro 飛行分析中，繪製即時 MAVLink 遙測或已錄製的 .tlog 檔案圖表。最多可選取 10 個參數，比較其隨時間的變化，並在無人機上檢視飛行過程。

飛行分析可繪製 MAVLink 數值隨時間變化的圖表，資料來源可以是飛行控制器的即時資料，也可以是已錄製的 `.tlog` 檔案。您可以用它檢查振動、電池電壓驟降、高度保持或訊號數值，而無需將日誌複製到電腦上。請開啟 **Flight Map → Flight Analytics**（飛行地圖 → 飛行分析）。

![飛行分析分頁，顯示 No Log File Loaded、Open Log File 按鈕、Live 開關與 Parameters 面板](https://docs.uavmatrix.com/zh-tw/img/screenshots/uavcast-pro/flight-map--flight-analytics.webp)

*載入日誌之前的飛行分析。Open Log File 可載入 .tlog。*

## 繪製即時遙測

1. 選擇 **Live**（即時）。隨著訊息送達，參數清單會逐漸填入。若停留在 *Waiting for MAVLink Data*（等待 MAVLink 資料），請先連接飛行控制器。
2. 在 **Parameters**（參數）中搜尋並勾選要繪製的數值。一次最多可繪製 **10** 個。
3. 開啟 **Accumulate Data**（累積資料）以保留每一個資料點（*Storing all data points*，即正在儲存所有資料點）。若關閉，圖表會保留滾動視窗（*Last … points*，即最近…個資料點）。

## 分析已錄製的日誌

1. 選擇 **Open Log File**（開啟日誌檔案）。
2. 在 **Select Log File**（選擇日誌檔案）中，挑選已錄製的 `.tlog`。遙測日誌來自[錄製](https://docs.uavmatrix.com/zh-tw/uavcast-pro/camera/recordings/)（預設為每次解鎖飛行一個）。
3. 勾選要繪製的參數。頂部會顯示 **Duration**（持續時間）以及檔案中的 **Parameters**（參數）數量。

**Clear All**（全部清除）會移除所有已繪製的參數。

## 日誌的來源

遙測會依照 **Camera → Recordings → Settings**（攝影機 → 錄製 → 設定）中的 **Record telemetry**（錄製遙測）記錄在無人機上：**While armed**（解鎖時，預設）、**Always while connected**（連線期間始終）或 **Off**（關閉）。相同的 `.tlog` 檔案也可以在 Mission Planner、MAVExplorer 與 UAV Log Viewer 中開啟。

飛行地圖的 **Recordings**（錄製）側邊分頁會列出相同的遙測日誌，並顯示 **Messages**（訊息數）、**Max Alt**（最大高度）與 **Distance**（距離），並可讓您 **Download .tlog**（下載 .tlog）、**Delete**（刪除）或 **Play**（播放）日誌。播放時會將錄製的遙測資料串流至地圖上，就像無人機正在飛行一樣。

Source: https://docs.uavmatrix.com/zh-tw/uavcast-pro/flight-map/flight-analytics/
