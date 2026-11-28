# UAVcast-Pro license won't activate

> Fix Invalid license key, Maximum activations reached and License activation failed in UAVcast-Pro: the key, internet, free slots and replaced hardware.

You enter the key under **Application → License Manager**, press **Validate**, and get an error instead of **License activated successfully**. Until a license is active on this device, every page sends you back to **Application**.

> You need a UAVcast-Pro license to activate the drone. Buy one in the UAVmatrix store.
>
> [Buy UAVcast-Pro](https://uavmatrix.com/checkout) · [See plans and pricing](https://uavmatrix.com/products)

![Application page License Manager with license key field, License Details and the Activated Devices table](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/application--license-activated.webp)

*Application → License Manager on an activated device: License Details and the Activated Devices table, with this device marked Current.*

| What you see | Likely cause | Start at |
| --- | --- | --- |
| Invalid license key, or Invalid license key format | Typo, extra spaces, or a key for another product | [Check 1](https://docs.uavmatrix.com/troubleshooting/license-activation-failed/#check-1) |
| Maximum activations reached | All device slots on the key are in use | [Check 2](https://docs.uavmatrix.com/troubleshooting/license-activation-failed/#check-2) |
| Worked before, asks again after a new SD card or new board | The device counts as a new device | [Check 3](https://docs.uavmatrix.com/troubleshooting/license-activation-failed/#check-3) |
| License activation failed, or nothing happens | No internet, or the wrong time on the device | [Check 4](https://docs.uavmatrix.com/troubleshooting/license-activation-failed/#check-4) |
| Cannot connect to license service | The UAVcast-Pro background service is not running | [Check 5](https://docs.uavmatrix.com/troubleshooting/license-activation-failed/#check-5) |
| License Status: Expired | A time-limited license ran out | [Check 6](https://docs.uavmatrix.com/troubleshooting/license-activation-failed/#check-6) |

## Check 1: The key itself

1. Copy the key from your order e-mail or your account on [uavmatrix.com](https://uavmatrix.com/), and paste it into the **License Key** field. Typing it by hand is the most common source of errors.
2. Make sure there are no spaces before or after the key.
3. Press **Validate**.

## Check 2: Free a device slot

Each license allows a fixed number of devices (**Allowed Devices**). When **Remaining Devices** is 0, activation fails with **Maximum activations reached. Please deactivate another device first or upgrade your license.**

1. On any device where the license is active, open **Application → License Manager → Activated Devices**.
2. Find the device you no longer use and press **Unregister**. The slot is freed straight away.
3. Activate the new device.

If you can't reach any activated device, contact **[support@uavmatrix.com](mailto:support@uavmatrix.com)** with the license key and they can free a slot. To add slots, buy more devices for the license on [uavmatrix.com](https://uavmatrix.com/).

## Check 3: You replaced the SD card or the board

The license is tied to the hardware, including the storage device. A fresh SD card, a new SSD or a new board counts as a new device and takes a new slot. Unregister the old entry in **Activated Devices** before or after you move, as in check 2. **License already activated on this device** is not an error: the key was already active here.

## Check 4: Internet access and time

Activation contacts the UAVmatrix license server over HTTPS (port 443), so the device needs working internet at that moment.

1. On the device, run `curl -I https://uavmatrix.com`. You should get an HTTP response, not a timeout.
2. If you are on a cellular modem, check that it actually has internet: [Modem connected, no internet](https://docs.uavmatrix.com/troubleshooting/modem-no-internet/).
3. Check the date with `date`. A device with a wrong clock can't open HTTPS connections. Boards without a real-time clock set the time from the internet after boot, so wait a minute after boot and try again.

## Check 5: Cannot connect to license service

This message means the web interface can't reach UAVcast-Pro's own background service, not the internet. Restart it and try again:

```bash
sudo systemctl restart uavcast-factory
sudo systemctl status uavcast-factory
```

If it doesn't stay **active (running)**, [collect the logs](https://docs.uavmatrix.com/troubleshooting/collect-logs/) with **License Manager** selected.

## Check 6: Expired license

The license details show **License Status:** and **Expiration Date:**. An expired license must be renewed on [uavmatrix.com](https://uavmatrix.com/).

> **64-bit operating system**
>
> UAVcast-Pro v6 only runs on a 64-bit OS. If you got this far, the OS is fine; on a 32-bit OS the installer already stops with *No installation candidate*.

## Still failing?

[Download the logs](https://docs.uavmatrix.com/troubleshooting/collect-logs/) with **License Manager** selected. They contain the response code from the license server, for example `code 550` for no free slots. Send them with the first and last four characters of your key to **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Using Fleet Manager? A license that activates fine can still be refused at pairing. See [Pairing code invalid or expired](https://docs.uavmatrix.com/troubleshooting/pairing-code-invalid/).

Related: [Activate your license](https://docs.uavmatrix.com/get-started/license-activation/)

Source: https://docs.uavmatrix.com/troubleshooting/license-activation-failed/
