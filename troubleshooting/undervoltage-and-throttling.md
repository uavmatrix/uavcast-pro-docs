# Undervoltage and throttling

> UAVcast-Pro warns Voltage too low or Slowed down? Size the power supply for Pi, modem and camera, fix thin cables and cooling, and stop resets.

The dashboard's **Power supply** row shows a warning, the modem drops, the flight controller link resets, or the Pi reboots in flight. On a drone, an undersized power supply causes more strange faults than any software setting.

![Dashboard status card with the Power supply row under System, reading Stable](https://docs.uavmatrix.com/img/screenshots/uavcast-pro/dashboard--status-card.webp)

*Dashboard → status card. The Power supply row is under System; here it reads Stable. Warnings replace that text, as listed below.*

| Power supply row | Meaning |
| --- | --- |
| **Stable** | No undervoltage or throttling since boot |
| **Voltage too low - use a stronger power supply** | The supply voltage is below what the Pi needs right now |
| **Voltage dropped since start-up** | It happened earlier, for example when the modem connected or the motors spun up |
| **Slowed down (heat or power)** | The CPU is running slower to protect itself from heat or low voltage |

The readings come from the Raspberry Pi firmware, so they are only available on a Raspberry Pi.

## Check 1: Size the supply for everything on it

The Pi powers the modem and USB camera through its USB ports. A 4G modem draws its peak current when it connects and when the signal is weak.

1. Use a 5 V BEC or regulator rated well above the total current of the Pi, modem, camera and anything else on the same rail. The official Raspberry Pi power supply specs list what each model needs.
2. Never power the Pi from the flight controller's TELEM or USB port.
3. If the modem draws more than the Pi can pass through, power the modem from the regulator directly, through a powered USB hub or a USB cable with separate power.

## Check 2: Cables and connectors

Thin or long cables lose voltage under load. Use short, thick power leads and a good USB cable for the modem. A cable that is fine for a phone charger can still cause undervoltage at peak current.

## Check 3: Heat

**Temperature** under **System Information** shows the CPU temperature. A Pi that runs video encoding inside a closed airframe in the sun gets hot. Add a heat sink or a small fan, and give the enclosure airflow. A Pi 5 needs active cooling for continuous encoding.

## Check 4: Check after the fix

**Voltage dropped since start-up** stays until the next boot. Reboot, run a typical mission on the bench (modem connected, camera streaming), and confirm the row stays **Stable**.

## Still seeing warnings?

The log download includes power and USB events from the kernel in `diagnostics.txt`. [Download the logs](https://docs.uavmatrix.com/troubleshooting/collect-logs/) and send them to **[support@uavmatrix.com](mailto:support@uavmatrix.com)** with a photo of your power wiring.

Related: [Hardware requirements](https://docs.uavmatrix.com/get-started/hardware-requirements/) · [Dashboard](https://docs.uavmatrix.com/uavcast-pro/dashboard/)

Source: https://docs.uavmatrix.com/troubleshooting/undervoltage-and-throttling/
