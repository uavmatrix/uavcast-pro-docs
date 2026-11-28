# Licensing & activation

> How to buy a UAVcast-Pro license, activate it on a drone, check device slots, renew it, and move it to a new Raspberry Pi or SD card by unregistering the old device.

UAVcast-Pro needs an activated license key on every drone. You buy a license in the UAVmatrix store, paste the key into **Application → License Manager** on the drone and select **Validate**. Each license has a number of device slots. Activating a drone uses one slot; unregistering it frees the slot for another drone.

> You need a UAVcast-Pro license to activate the drone. Buy one in the UAVmatrix store.
>
> [Buy UAVcast-Pro](https://uavmatrix.com/checkout) · [See plans and pricing](https://uavmatrix.com/products)

## Buy a license

Licenses are sold at [uavmatrix.com/products](https://uavmatrix.com/products/). Every license includes updates for its whole period and [Fleet Manager](https://docs.uavmatrix.com/fleet-manager/), including its VPN for reaching the drone over 4G.

| Plan | Device slots | Valid for |
| --- | --- | --- |
| Basic | 1 | 1 year |
| Silver | 2 | 1 year |
| Gold | 4 | 2 years |

The store page always shows the current plans and prices. There is no free trial license.

After payment you get an order confirmation email with the **license key**, five groups of four characters.

The key is also in your store account under **Licenses**, with its device slots and expiry date.

> **The license period starts at first activation**
>
> A license bought today and activated next month expires one period after the activation date, not the purchase date.

## Activate the license on a drone

The drone needs internet access while you activate it (Wi-Fi, Ethernet or the modem).

1. Open the UAVcast-Pro web interface. An unlicensed device always opens on **Application**.
2. In **License Manager**, paste the key into **Enter License Key**.
3. Select **Validate**. You see *License activated successfully* and the rest of the sidebar unlocks.

![UAVcast-Pro License Manager showing an active license with registered name, allowed and remaining devices, expiration date and the activated devices table](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/application--license-activated.webp)

*Application → License Manager after activation. The current device is marked Current in Activated Devices.*

**License Details** shows:

| Field | Meaning |
| --- | --- |
| **Registered Name** | The store account the license belongs to. |
| **License Status** | **Active**, **Inactive** or **Expired**. |
| **Allowed Devices** | Total device slots. |
| **Remaining Devices** | Free slots. |
| **Activation Date** / **Expiration Date** | When the license period started and ends. |

**Activated Devices** lists every drone on this license with its **Device Name**, **Hostname** and **Activation Date**. The drone you're on is marked **Current**. Select **Edit** to give a device a name you'll recognise.

### Activation errors

| Message | What to do |
| --- | --- |
| *Maximum activations reached. Please deactivate another device first or upgrade your license.* | All slots are in use. [Unregister a device](https://docs.uavmatrix.com/get-started/license-activation/#unregister-a-device) or add slots. |
| *Invalid license key* | Check for typos or extra spaces. Copy the key from your store account. |
| *License already activated on this device* | Nothing to do. This device already has a slot (for example after a reinstall on the same SD card). |
| *Network error! Could not fetch license details…* | The device has no internet. Check **Networks** and try again. |

## How the license is checked

- The drone checks the license with the UAVmatrix license server every **4 hours**.
- If the server can't be reached, the drone keeps its last known status. You can fly with no internet connection at all; nothing locks while you're offline.
- A device is identified by its CPU serial number and the serial number of its boot disk (SD card or SSD). Reinstalling on the same Pi and the same card keeps the same identity and slot. A new SD card or SSD counts as a **new device**.
- The license data on the drone is encrypted with that identity, so a [database backup](https://docs.uavmatrix.com/uavcast-pro/application-settings/#database) restored onto other hardware needs the license activated again.

## Unregister a device

Unregistering frees a slot immediately. You can unregister **any** device on the license from **any** drone where the license is active, not only the drone you're on.

1. Go to **Application → License Manager → Activated Devices**.
2. Find the device and select **Unregister**. You see *Device unregistered successfully*.

If you unregister the drone you're working on, it becomes unlicensed and the web interface locks to the **Application** page until you activate a key again.

> **You can't unregister from the store**
>
> The store shows registered devices but can't remove them. Unregister from UAVcast-Pro on one of the license's devices. If every device on the license is lost or wiped, email [support@uavmatrix.com](mailto:support@uavmatrix.com) with your license key.

## Move to new hardware

Use this when you replace the Pi, swap the SD card, or move from a test bench to the aircraft.

1. On the **old** device, go to **Application → License Manager** and select **Unregister** next to it. Do this before you wipe the card.
2. Install UAVcast-Pro on the new hardware. See [Installation](https://docs.uavmatrix.com/get-started/installation/).
3. Activate the same key on the new device.

If the old device is dead, unregister it from another drone on the same license, or contact support.

## Renew or upgrade

From your store account, open the license and select **Upgrade Options**:

- **Extend subscription** adds another period. If the license is still valid, the new period is added to the current expiry date; if it has expired, it starts on the renewal date. The key stays the same.
- **Add devices** adds slots to the license. An expired license must be renewed first.
- **Upgrade tier** moves the license to a plan with more slots.

The drone picks up the new expiry date and slots at its next check, within 4 hours. To refresh it right away, select **Change** in **License Manager**, enter the same key and select **Validate**.

## When a license expires

> **An expired license locks UAVcast-Pro**
>
> When a license expires, UAVcast-Pro can no longer be used on any of its drones. It does not keep running on the installed version.

When the license server reports the license as expired, the drone marks itself unlicensed: the web interface only opens **Application**, and telemetry, video, NTRIP and Dynamic DNS stop at the next restart of their services. Renew the license before the expiry date to avoid downtime, and validate the key again on the drone (or wait for its next check, within 4 hours) to unlock it.

## Licenses and Fleet Manager

Fleet Manager is included with your UAVcast-Pro license and uses the same license. A drone can only be paired with an organization if its license belongs to a member of that organization. If you bought the license with a different email than the one you sign in to Fleet Manager with, add that email in Fleet Manager (see [Licenses in Fleet Manager](https://docs.uavmatrix.com/fleet-manager/licenses/)). See [Pair a drone with Fleet Manager](https://docs.uavmatrix.com/uavcast-pro/fleet-pairing/).

Activation problems: see [License activation failed](https://docs.uavmatrix.com/troubleshooting/license-activation-failed/).

Source: https://docs.uavmatrix.com/get-started/license-activation/
