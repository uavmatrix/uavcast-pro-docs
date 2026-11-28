# 連接地面站

> 只需一條 Tailscale 指令，即可將 QGroundControl 或 Mission Planner 筆電加入組織的 VPN，並開始接收無人機視訊與遙測。

地面站（GCS）是飛行員執行 QGroundControl、Mission Planner 或類似軟體的筆電或電腦。若要透過 Fleet Manager 接收無人機的視訊與遙測，地面站必須加入組織的私有 VPN。之後，您可以透過[串流綁定](https://docs.uavmatrix.com/zh-tw/fleet-manager/network/stream-bindings/)決定哪些無人機要串流到該地面站。

每台地面站大約需要五分鐘。

## 開始之前

- **Owner 或 Admin 角色。** Viewer 可以查看 **Network** 頁面，但無法看到驗證金鑰或連線指令，也無法啟用 VPN 或設定裝置。他們會看到 *Ask an Owner or Admin of this organization to connect a new device to the VPN.*
- **已為組織啟用 VPN。** 若 **Network** 顯示 **Enable VPN Network**，請先選擇它。請參閱[網路與 VPN](https://docs.uavmatrix.com/zh-tw/fleet-manager/network/)。
- **地面站電腦上的管理員權限**，用於安裝 Tailscale 並執行一條指令。
- 至少有一架無人機已[配對](https://docs.uavmatrix.com/zh-tw/fleet-manager/pair-uav/)並加入 VPN。

> **Fleet Manager 執行自己的 VPN 伺服器**
>
> 組織的網路使用 Tailscale 用戶端，但控制伺服器是 Fleet Manager 自己的，而不是 tailscale.com 帳戶。您不需要註冊 Tailscale。若電腦已位於其他 Tailscale 網路上，下方的指令會將其移至您組織的網路。

## 將地面站加入 VPN

1. **在地面站上安裝 Tailscale**，下載網址為 [tailscale.com/download](https://tailscale.com/download)（Windows、macOS 或 Linux）。

2. **複製連線指令。** 在 Fleet Manager 中開啟 **Network**，留在 **Devices** 分頁，找到 **Connect a Device**。在 **GCS Connection Command** 下複製指令。其格式如下：

   ```bash
   tailscale up --authkey=<your-org-key> --login-server=https://vpn-connect.uavmatrix.com
   ```

   ![Connect a Device 卡片，顯示 GCS Computer Only 警告與 tailscale up 指令](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/network--connect-device.webp)

   *Network → Devices → Connect a Device，顯示 GCS Computer Only 警告，以及指令旁的複製按鈕（驗證金鑰已模糊處理）。*

   > **僅限地面站**
   >
   > 請勿將此指令貼到 UAVcast-Pro 中，也不要在無人機上執行。無人機會在配對時加入 VPN，或透過同一頁面上的 **Push to Drone** 加入。

3. **以管理員身分執行指令。**

   - Windows：以 **Run as administrator** 開啟 **Terminal** 或 **PowerShell**，然後貼上指令。
   - macOS 與 Linux：在終端機中貼上，並在前面加上 `sudo`。

   指令執行完畢且沒有錯誤時，電腦即已連上網路。`tailscale status` 會列出它能看到的無人機與其他裝置。

4. **在 Connected Devices 中找到電腦。** 回到 Fleet Manager，電腦會以其主機名稱與 `100.x.y.z` 位址出現在 **Connected Devices** 中。若數秒內未出現，請選擇 **Sync**。新裝置的類型為 **Unknown**，橫幅會顯示有多少裝置需要設定。

5. **將其標記為地面站。** 在 **Type** 欄中選擇 **Configure**。選擇 **Ground Control Station (GCS)**，選擇 **Continue**，然後選擇 **Complete Setup**。

   ![裝置設定精靈詢問 What type of device is this，並已選取 Ground Control Station](https://docs.uavmatrix.com/zh-tw/img/screenshots/fleet-manager/network--setup-wizard.webp)

   *設定對話框：What type of device is this？已為名為 ops-laptop-03 的筆電選取 Ground Control Station (GCS)。*

完成後，電腦會顯示 **GCS** 徽章，並在您新增串流綁定時出現在 **Ground Station** 清單中。

> **以人員或職位為地面站命名**
>
> 在裝置的操作選單（**⋯** 按鈕）中使用 **Rename**，為它取一個名稱，例如「野外筆電 – Team North」。在大型機群中，綁定清單會更容易閱讀。

## 開始接收無人機

1. 前往 **Network → Stream Bindings**，然後選擇 **Add Binding**。

2. 選擇 **Drone** 與 **Ground Station**，然後選擇 **Create Binding**。無人機必須在線上。

3. 查看 **Ports** 欄中的連接埠，例如 `5600 / 14550`。

4. 在地面控制軟體中，監聽這些連接埠：

   - **QGroundControl：** UDP 14550 的遙測會自動連線。若要接收視訊，請開啟 **Application Settings → Video**（舊版位於 **General** 之下），將 **Source** 設為 **UDP h.264 Video Stream**，並將 UDP 連接埠設為綁定的視訊連接埠（新版中為 **UDP URL** `0.0.0.0:<port>`）。若要加入更多無人機，請在 **Application Settings → Comm Links** 下，為每個綁定的遙測連接埠新增 UDP 連結。
   - **Mission Planner：** 在連線下拉選單中選擇 **UDP**，選擇 **Connect**，然後輸入遙測連接埠。

更多細節，包括在單一地面站上接收多架無人機：請參閱[串流綁定](https://docs.uavmatrix.com/zh-tw/fleet-manager/network/stream-bindings/)與[串流到多個地面站](https://docs.uavmatrix.com/zh-tw/guides/multiple-ground-stations/)。

## 驗證金鑰

指令中包含組織網路的可重複使用金鑰。此金鑰有效期為 90 天，可用於任意數量的地面站。Owner 與 Admin 可以在 **Connect a Device** 中選擇重新整理按鈕，以建立新金鑰。已加入的地面站會保持連線。若卡片顯示 **No valid auth key available. Generate a new key to connect devices.**，表示金鑰已過期，請建立新的金鑰。

## 移除地面站

在 **Network → Devices** 中，開啟裝置的操作選單並選擇 **Remove Device**。這會將其從 VPN 移除，並刪除其串流綁定。若要稍後重新連線，請再次執行連線指令。

## 疑難排解

- **指令失敗或逾時：** 請確認電腦能連上 `https://vpn-connect.uavmatrix.com`，且金鑰未過期。
- **地面站已連線，但沒有遙測或視訊：** 請確認存在綁定、**Video** 與 **Telemetry** 已開啟，且地面站軟體正在監聽綁定的連接埠。Windows 防火牆常會阻擋新應用程式的入站 UDP。請參閱[地面站沒有遙測](https://docs.uavmatrix.com/zh-tw/troubleshooting/no-telemetry-in-gcs/)與[地面站沒有視訊](https://docs.uavmatrix.com/zh-tw/troubleshooting/no-video-in-gcs/)。
- **無法透過 VPN 連到無人機：** 請參閱[VPN 已連線但無法連到無人機](https://docs.uavmatrix.com/zh-tw/troubleshooting/vpn-cant-reach-drone/)。

Source: https://docs.uavmatrix.com/zh-tw/fleet-manager/connect-gcs/
