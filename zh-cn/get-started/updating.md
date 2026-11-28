# 将 UAVcast-Pro 更新到最新版本

> 通过网页界面或命令行更新 UAVcast-Pro，安装旧版本，以及更新对设置、服务器端口和录像的影响。

可以在网页界面的**应用程序 → 更新应用**中更新 UAVcast-Pro，也可以通过 SSH 重新运行安装程序。两种方式都会保留设置、用户、许可证和录像。无人机需要能访问互联网，并且更新完成后必须重启。

> **切勿在飞行前更新**
>
> 更新会停止所有 UAVcast-Pro 服务，包括遥测和视频，并需要重启。请在地面更新，且飞机处于上锁状态。

## 通过网页界面更新

1. 进入**应用程序**。**更新应用**卡片会显示**当前版本**和**最新版本**。当有更新的版本时，会出现绿色的*有新版本 … 可用*横幅。
2. 将**选择要更新的版本**保持为最新版本，或选择其他版本。
3. 选择**更新到 …**（或**立即更新**）。**进度**会显示下载和安装步骤。此过程需要几分钟，在 Pi Zero 2 W 或 Pi 3 上会更长。
4. 出现**等待重启**横幅时，选择**立即重启**。设备将重新启动。
5. 再次打开网页界面，并检查**当前版本**。

![更新应用卡片，显示当前版本和最新版本、有新版本可用的横幅以及更新按钮](https://docs.uavmatrix.com/zh-cn/img/screenshots/uavcast-pro/application--update-available.webp)

*应用程序 → 更新应用，有更新的版本可用。*

## 通过命令行更新

再次运行安装程序。它会替换程序文件并保留数据库：

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
sudo reboot
```

要安装特定版本，请先列出版本（无需 root 权限），然后使用 `-b` 安装其中一个版本：

```bash
# 列出此设备可用的版本
curl -fsSL https://install.uavmatrix.com | bash -s -- -l

# 安装指定版本
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.1
```

## 回退到旧版本

在**选择要更新的版本**中选择旧版本，然后像往常一样进行更新，或在命令行中使用 `-b`。在较新版本中进行的设置，在旧版本中可能不存在。

## 更新会保留和替换的内容

| 保留 | 替换 |
| --- | --- |
| 设置数据库（`/opt/uavcast-pro/uavcast.db`）：地面站、摄像头、调制解调器、VPN、用户、许可证 | `/opt/uavcast-pro` 中的程序文件（`build`、`dist`、`factory`、`install`） |
| 录像和遥测日志 | systemd 服务文件 |
| ZeroTier 和 Tailscale 成员资格 | UAVcast-Pro 所依赖的系统软件包（由 apt 更新） |

从 UAVcast-Pro 6.5.3 起，在**应用程序**页面设置的自定义**服务器端口**会在更新时保留。更早的版本会将其重置为 80：从这些版本更新后，请通过 80 端口打开网页界面，并重新保存您的端口。

## 查看更新内容

每个版本的更新内容都列在[更新日志](https://docs.uavmatrix.com/zh-cn/reference/changelog/)中。在更新用于实际飞行作业的无人机之前，请先阅读更新日志。

Source: https://docs.uavmatrix.com/zh-cn/get-started/updating/
