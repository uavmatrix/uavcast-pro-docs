# Camera not detected

> UAVcast-Pro shows No cameras available? Check the CSI ribbon cable, rpicam-hello, camera support on Ubuntu and v4l2-ctl for USB cameras.

**Camera → Camera settings** shows **No cameras available** in **Select Camera**, the camera you want is missing from the list, or the **Action Logs** say *No camera detected*.

| What you see | Likely cause | Start at |
| --- | --- | --- |
| A Raspberry Pi CSI camera (ribbon cable) is missing | Cable, connector or the camera stack | [Check 1](https://docs.uavmatrix.com/troubleshooting/camera-not-detected/#check-1) |
| CSI camera on Ubuntu | Ubuntu has no Raspberry Pi camera stack by default | [Check 2](https://docs.uavmatrix.com/troubleshooting/camera-not-detected/#check-2) |
| A USB camera is missing | Not seen by Linux, or not a video capture device | [Check 3](https://docs.uavmatrix.com/troubleshooting/camera-not-detected/#check-3) |
| Camera listed but video never starts | Unsupported resolution or another program holds it | [Check 4](https://docs.uavmatrix.com/troubleshooting/camera-not-detected/#check-4) |

## Check 1: Raspberry Pi CSI camera

1. Power off the Pi. Re-seat the ribbon cable at both ends with the contacts facing the right way, and close the connector latches. A Pi 5 and a Pi Zero 2 W need the narrower 22-pin cable.

2. Boot and run this on the Pi:

   ```bash
   rpicam-hello --list-cameras
   ```

   On older Raspberry Pi OS images the command is `libcamera-hello --list-cameras`.

3. If the camera is not listed here, Linux can't see it. Try another cable or camera before changing anything in UAVcast-Pro.

4. If it is listed, restart the camera from the Camera page (**Restart**, or **Stop** then **Start**) and open **Select Camera** again. Each CSI camera appears as its own entry, for example *CSI Camera 0 - imx708 (libcamera)*.

> **Two CSI cameras**
>
> For two cameras the camera driver needs more memory. Since v6.2.2 the installer raises the CMA memory in `config.txt` automatically for multi-camera setups. Reboot after installing if you added the second camera later.

## Check 2: CSI camera on Ubuntu or Debian

UAVcast-Pro uses `rpicam-vid` for CSI cameras. The installer installs `rpicam-apps` (or `rpicam-apps-core`) on Raspberry Pi OS and Debian. On Ubuntu the Raspberry Pi camera stack is not packaged, and the log says *CSI camera not available: Ubuntu requires building libcamera from source. USB cameras are supported.*

Use Raspberry Pi OS 64-bit if you need a CSI camera, or use a USB camera on Ubuntu.

## Check 3: USB camera

1. Plug the camera straight into the companion computer, not through an unpowered hub.

2. Run:

   ```bash
   v4l2-ctl --list-devices
   ```

3. If the camera is missing, Linux does not see it. Check `lsusb` and try another port and cable.

4. If it is listed, restart the camera with **Restart** on the Camera page and open **Select Camera** again.

Most UVC webcams work, for example Logitech C920 and C615. Cameras that only output a format the encoder can't take, or devices that are not video capture devices (some capture cards), are not listed.

## Check 4: Listed, but video doesn't start

- If the log says *Camera … does not support …x… - streaming at …x… instead*, pick a resolution the camera supports in **Resolution**.
- Close any other program that uses the camera. Only one program can open it at a time.
- If **Enable Camera?** shows *Insufficient permissions*, update to v6.5.2 or later, which fixed this.

## Still not detected?

[Download the logs](https://docs.uavmatrix.com/troubleshooting/collect-logs/) with **All Logs** selected, add the output of `rpicam-hello --list-cameras` or `v4l2-ctl --list-devices`, and send everything to **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Related: [Camera settings](https://docs.uavmatrix.com/uavcast-pro/camera/) · [Supported hardware](https://docs.uavmatrix.com/reference/supported-hardware/)

Source: https://docs.uavmatrix.com/troubleshooting/camera-not-detected/
