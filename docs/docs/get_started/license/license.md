---
title: "Activate Your License Key"
sidebar_label: "License Activation"
description: "Activate your UAVcast-Pro license key in the web interface, check its status and device limits, and unregister a device to move the license to another one."
sidebar_position: 2
---

# License Activation

UAVcast-Pro requires an active license key to operate. Each purchase includes a unique license key that must be activated through the web interface.

## License Activation

1. Access the UAVcast-Pro web interface
2. Navigate to the License section
3. Enter your license key
4. Click Activate

:::info Internet Requirement
Your Raspberry Pi must have an active internet connection during the license activation process.
:::

## License Properties

### Status Indicators
- **Activated**: License is valid and properly registered on the current device
- **Expired**: License has reached its expiration date and is no longer valid

### Device Management

#### Device Limits
- **Allowed Devices**: Maximum number of devices that can use this license simultaneously
- **Remaining Slots**: Number of additional devices that can still be activated (Allowed Devices - Currently Registered Devices)

#### Managing Registered Devices
- View all currently registered devices
- Each device shows an "Unregister" option
- Unregistering a device frees up a license slot for use on another Raspberry Pi

:::tip Unregistering Devices
To free up a license slot:
1. Locate the device in the registered devices list
2. Click the "Unregister" link next to the device name
3. Confirm the unregistration
:::

:::note
- Unregistering a device immediately frees up the license slot
- You can re-register an unregistered device at any time if slots are available
:::
